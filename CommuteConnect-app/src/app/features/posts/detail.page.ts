import { Component, computed, inject, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ApiService } from '../../utils/api';
import { AuthService } from '../../core/auth.service';
import { Commute, Interest, Page } from '../../core/models';
import { errorMessage } from '../../core/errors';
import { StateComponent } from '../../shared/state.component';
import { PaginationComponent } from '../../shared/pagination.component';
import { ChatComponent } from '../chat/chat.component';
import {
  MapPickerComponent,
  MapPointKind,
} from '../../shared/map-picker.component';
import { Coordinates } from '../../core/models';

@Component({
  imports: [
    DatePipe,
    RouterLink,
    StateComponent,
    PaginationComponent,
    ChatComponent,
    MapPickerComponent,
  ],
  templateUrl: './detail.page.html',
  styleUrl: './detail.page.css',
})
export class DetailPage {
  private api = inject(ApiService);

  auth = inject(AuthService);

  private route = inject(ActivatedRoute);

  id = this.route.snapshot.paramMap.get('id')!;

  post = signal<Commute | null>(null);

  applicants = signal<Page<Interest> | null>(null);

  loading = signal(true);

  error = signal('');

  actionError = signal('');

  notice = signal('');

  busy = signal(false);

  confirmDelete = signal(false);

  applicantsError = signal('');

  applicantsLoading = signal(false);

  applicantPage = signal(1);

  selectedChatId = signal<string | null>(null);

  chatOpen = signal(false);

  otpInterestId = signal<string | null>(null);

  startAfterOtp = signal(false);

  passengerOtpOpen = signal(false);

  mapMode = signal<'view' | null>(null);

  otp = signal('');

  otpError = signal('');

  isOwner = computed(() => this.post()?.ownerId === this.auth.user()?.id);

  acceptedApplicants = computed(
    () =>
      this.applicants()?.data.filter((interest) => interest.status === 'accepted') || [],
  );

  reviewApplicants = computed(
    () =>
      this.applicants()?.data.filter((interest) => interest.status !== 'accepted') || [],
  );

  unverifiedApplicants = computed(() =>
    this.acceptedApplicants().filter((interest) => !interest.boardedAt),
  );

  selectedChat = computed(() => {
    if (!this.chatOpen()) {
      return null;
    }

    if (!this.isOwner()) {
      const interest = this.post()?.myInterest;

      return interest?.status === 'accepted' ? interest : null;
    }

    return (
      this.acceptedApplicants().find(
        (interest) => interest.id === this.selectedChatId(),
      ) || null
    );
  });

  selectedChatName = computed(() => {
    const chat = this.selectedChat();

    if (!chat) {
      return '';
    }

    return this.isOwner()
      ? chat.user?.name || 'Passenger'
      : this.post()?.owner.name || 'Driver';
  });

  otpInterest = computed(() =>
    this.acceptedApplicants().find(
      (interest) => interest.id === this.otpInterestId(),
    ) || null,
  );

  get active() {
    const p = this.post();

    return (
      !!p &&
      !p.deletedAt &&
      p.rideStatus !== 'completed' &&
      (new Date(p.departureAt) > new Date() || p.rideStatus === 'in_progress')
    );
  }

  get isHistory() {
    return !this.active;
  }

  constructor() {
    this.route.queryParamMap.subscribe((params) => {
      const conversationId = params.get('conversation');

      if (conversationId) {
        this.selectedChatId.set(conversationId);
        this.chatOpen.set(true);
      }
    });

    void this.load();
  }

  async load() {
    this.loading.set(true);
    this.error.set('');

    try {
      this.post.set(await this.api.getCommute(this.id));

      if (this.isOwner()) {
        await this.loadApplicants(this.applicantPage());
      }
    } catch (e) {
      this.error.set(errorMessage(e));
    } finally {
      this.loading.set(false);
    }
  }

  async loadApplicants(page: number) {
    this.applicantPage.set(page);
    this.applicantsLoading.set(true);
    this.applicantsError.set('');

    try {
      this.applicants.set(await this.api.getPostInterests(this.id, page));

    } catch (e) {
      this.applicantsError.set(errorMessage(e));
    } finally {
      this.applicantsLoading.set(false);
    }
  }

  async act(action: () => Promise<unknown>, message: string) {
    if (this.busy()) {
      return;
    }

    this.busy.set(true);
    this.actionError.set('');
    this.notice.set('');

    try {
      await action();
      this.confirmDelete.set(false);
      this.notice.set(message);
      await this.load();
    } catch (e) {
      this.actionError.set(errorMessage(e));
    } finally {
      this.busy.set(false);
    }
  }

  interest() {
    const post = this.post();

    if (!post) {
      return;
    }

    void this.act(
      () => this.api.expressInterest(this.id),
      'Your interest has been sent. The driver can now review it.',
    );
  }

  withdraw() {
    const i = this.post()?.myInterest;

    if (i) {
      void this.act(
        () => this.api.withdrawInterest(i.id),
        'Your interest has been withdrawn.',
      );
    }
  }

  decide(id: string, status: 'accepted' | 'declined') {
    void this.act(
      () => this.api.decideInterest(id, status),
      status === 'accepted'
        ? 'Passenger accepted. A seat has been reserved.'
        : 'Interest declined.',
    );
  }

  remove() {
    void this.act(
      () => this.api.deleteCommute(this.id),
      'Commute cancelled. It is now in your history.',
    );
  }

  openChat(): void {
    this.selectedChatId.set(null);
    this.chatOpen.set(true);
  }

  closeChat(): void {
    this.chatOpen.set(false);
    this.selectedChatId.set(null);
  }

  openStartRideVerification(): void {
    const accepted = this.acceptedApplicants();

    if (accepted.some((interest) => !!interest.boardedAt)) {
      this.startRide();

      return;
    }

    const passenger = this.unverifiedApplicants()[0];

    if (!passenger) {
      return;
    }

    this.otp.set('');
    this.otpError.set('');
    this.startAfterOtp.set(true);
    this.otpInterestId.set(passenger.id);
  }

  openOtpVerification(interestId?: string): void {
    const passenger = interestId
      ? this.unverifiedApplicants().find((item) => item.id === interestId)
      : this.unverifiedApplicants()[0];

    if (!passenger) {
      return;
    }

    this.otp.set('');
    this.otpError.set('');
    this.startAfterOtp.set(false);
    this.otpInterestId.set(passenger.id);
  }

  closeOtpVerification(): void {
    this.otpInterestId.set(null);
    this.startAfterOtp.set(false);
    this.otp.set('');
    this.otpError.set('');
  }

  async verifyOtp(interestId: string): Promise<void> {
    if (this.busy()) {
      return;
    }

    const shouldStart = this.startAfterOtp();
    this.busy.set(true);
    this.actionError.set('');
    this.notice.set('');
    this.otpError.set('');

    try {
      await this.api.verifyRideOtp(interestId, this.otp());
    } catch (e) {
      this.otpError.set(errorMessage(e));
      this.busy.set(false);

      return;
    }

    try {
      this.closeOtpVerification();
      await this.load();

      if (shouldStart) {
        try {
          await this.api.startRide(this.id);
          this.notice.set('Ride started. Passengers notified.');
          await this.load();
        } catch (e) {
          this.actionError.set(errorMessage(e));
        }
      } else {
        this.notice.set('Passenger verified for this ride.');
      }
    } finally {
      this.busy.set(false);
    }
  }

  startRide(): void {
    void this.act(
      () => this.api.startRide(this.id),
      'Ride started. Passengers notified.',
    );
  }

  endRide(): void {
    void this.act(() => this.api.endRide(this.id), 'Ride ended. Passengers notified.');
  }

  mapPoints(): Partial<Record<MapPointKind, Coordinates>> {
    const post = this.post();

    if (!post) {
      return {};
    }

    return {
      ...(post.originLat || post.originLng
        ? { origin: { lat: post.originLat, lng: post.originLng } }
        : {}),
    };
  }
}