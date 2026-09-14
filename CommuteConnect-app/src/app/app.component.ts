import { DatePipe } from '@angular/common';
import {
  Component,
  HostListener,
  OnDestroy,
  effect,
  inject,
  signal,
} from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from './core/auth.service';
import { errorMessage } from './core/errors';
import { AppNotification } from './core/models';
import { ApiService } from './utils/api';

@Component({
  selector: 'app-root',
  imports: [DatePipe, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnDestroy {
  auth = inject(AuthService);

  private router = inject(Router);

  private api = inject(ApiService);

  private notificationTimer?: ReturnType<typeof setInterval>;

  private knownNotificationIds = new Set<string>();

  private notificationsInitialized = false;

  busy = signal(false);

  confirmSignOut = signal(false);

  error = signal('');

  notifications = signal<AppNotification[]>([]);

  unreadNotifications = signal(0);

  notificationsOpen = signal(false);

  notificationsLoading = signal(false);

  notificationsError = signal('');

  confirmClearNotifications = signal(false);

  browserNotificationPermission = signal<NotificationPermission | 'unsupported'>(
    'Notification' in window ? Notification.permission : 'unsupported',
  );

  constructor() {
    effect(() => {
      if (this.auth.signedIn()) {
        this.startNotificationPolling();
      } else {
        this.stopNotificationPolling();
        this.notifications.set([]);
        this.unreadNotifications.set(0);
        this.knownNotificationIds.clear();
        this.notificationsInitialized = false;
      }
    });
  }

  ngOnDestroy(): void {
    this.stopNotificationPolling();
  }

  @HostListener('document:keydown.escape')
  closeDialog(): void {
    this.notificationsOpen.set(false);
    this.confirmClearNotifications.set(false);

    if (!this.busy()) {
      this.confirmSignOut.set(false);
    }
  }

  toggleNotifications(event: MouseEvent): void {
    event.stopPropagation();
    this.notificationsOpen.update((open) => !open);

    if (this.notificationsOpen()) {
      void this.loadNotifications();
    }
  }

  @HostListener('document:click')
  closeNotifications(): void {
    this.notificationsOpen.set(false);
  }

  async openNotification(notification: AppNotification): Promise<void> {
    this.notificationsOpen.set(false);

    if (!notification.readAt) {
      this.markNotificationRead(notification.id);

      try {
        await this.api.readNotification(notification.id);
      } catch {
        void this.loadNotifications(false);
      }
    }

    const fragment = this.notificationTarget(notification);

    await this.router.navigate(['/commutes', notification.postId], {
      fragment,
      queryParams:
        notification.type === 'new_message'
          ? { conversation: notification.interestId }
          : undefined,
    });

    requestAnimationFrame(() => {
      document.getElementById(fragment)?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    });
  }

  private notificationTarget(notification: AppNotification): string {
    switch (notification.type) {
      case 'interest_received':
        return 'passengers';

      case 'new_message':
        return 'conversations';

      case 'ride_started':
      case 'ride_ended':
        return 'ride-status';

      case 'interest_accepted':
      default:
        return 'ride-details';
    }
  }

  async markAllNotificationsRead(event: MouseEvent): Promise<void> {
    event.stopPropagation();

    try {
      await this.api.readAllNotifications();
      this.notifications.update((items) =>
        items.map((item) => ({
          ...item,
          readAt: item.readAt || new Date().toISOString(),
        })),
      );
      this.unreadNotifications.set(0);
    } catch (e) {
      this.notificationsError.set(errorMessage(e));
    }
  }

  async enableBrowserNotifications(event: MouseEvent): Promise<void> {
    event.stopPropagation();

    if (!('Notification' in window)) {
      return;
    }

    this.browserNotificationPermission.set(await Notification.requestPermission());
  }

  async clearNotifications(event: MouseEvent): Promise<void> {
    event.stopPropagation();

    try {
      await this.api.clearNotifications();
      this.notifications.set([]);
      this.unreadNotifications.set(0);
      this.knownNotificationIds.clear();
      this.confirmClearNotifications.set(false);
    } catch (e) {
      this.notificationsError.set(errorMessage(e));
    }
  }

  async logout() {
    this.busy.set(true);
    this.error.set('');

    try {
      await this.auth.logout();
      this.confirmSignOut.set(false);
      await this.router.navigate(['/login']);
    } catch (e) {
      this.error.set(errorMessage(e));
    } finally {
      this.busy.set(false);
    }
  }

  private startNotificationPolling(): void {
    if (this.notificationTimer) {
      return;
    }

    void this.loadNotifications();
    this.notificationTimer = setInterval(() => {
      void this.loadNotifications(false);
    }, 20000);
  }

  private stopNotificationPolling(): void {
    if (this.notificationTimer) {
      clearInterval(this.notificationTimer);
      this.notificationTimer = undefined;
    }
  }

  private async loadNotifications(showLoading = true): Promise<void> {
    if (showLoading) {
      this.notificationsLoading.set(true);
    }

    this.notificationsError.set('');

    try {
      const feed = await this.api.getNotifications();
      this.showBrowserNotifications(feed.data);
      this.notifications.set(feed.data);
      this.unreadNotifications.set(feed.unreadCount);
    } catch (e) {
      if (showLoading) {
        this.notificationsError.set(errorMessage(e));
      }
    } finally {
      this.notificationsLoading.set(false);
    }
  }

  private markNotificationRead(id: string): void {
    this.notifications.update((items) =>
      items.map((item) =>
        item.id === id ? { ...item, readAt: new Date().toISOString() } : item,
      ),
    );
    this.unreadNotifications.update((count) => Math.max(0, count - 1));
  }

  private showBrowserNotifications(items: AppNotification[]): void {
    if (
      this.notificationsInitialized &&
      this.browserNotificationPermission() === 'granted'
    ) {
      for (const item of items) {
        if (!item.readAt && !this.knownNotificationIds.has(item.id)) {
          const notification = new Notification(item.title, {
            body: item.body,
            tag: item.id,
          });
          notification.onclick = () => {
            window.focus();
            void this.openNotification(item);
            notification.close();
          };
        }
      }
    }

    for (const item of items) {
      this.knownNotificationIds.add(item.id);
    }

    this.notificationsInitialized = true;
  }
}