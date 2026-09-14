import {
  Component,
  inject,
  signal,
} from '@angular/core';

import {
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import {
  ActivatedRoute,
  Router,
  RouterLink,
} from '@angular/router';

import { ApiService } from '../../utils/api';
import { AuthService } from '../../core/auth.service';
import { errorMessage } from '../../core/errors';

import { FieldComponent } from '../../shared/field.component';
import { StateComponent } from '../../shared/state.component';
import { DatePickerComponent } from '../../shared/date-picker.component';

import {
  MapPickerComponent,
  MapSelection,
} from '../../shared/map-picker.component';

import {
  future,
  meaningful,
} from '../../shared/validators';

@Component({
  imports: [
    ReactiveFormsModule,
    RouterLink,
    FieldComponent,
    StateComponent,
    DatePickerComponent,
    MapPickerComponent,
  ],
  templateUrl: './editor.page.html',
  styleUrl: './editor.page.css',
})
export class EditorPage {
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private api = inject(ApiService);
  private auth = inject(AuthService);

  private originalDeparture = '';
  private originalLocalDeparture = '';

  readonly totalSteps = 8;

  readonly step = signal(1);
  readonly loading = signal(false);
  readonly loadError = signal('');
  readonly error = signal('');
  readonly busy = signal(false);
  readonly mapOpen = signal(false);

  readonly id =
    this.route.snapshot.paramMap.get('id');

  form = this.fb.nonNullable.group({
    origin: [
      '',
      [
        Validators.required,
        meaningful,
        Validators.maxLength(120),
      ],
    ],

    destination: [
      '',
      [
        Validators.required,
        meaningful,
        Validators.maxLength(120),
      ],
    ],

    via: [
      '',
      [
        Validators.maxLength(120),
      ],
    ],

    originLat: [0],
    originLng: [0],

    destinationLat: [0],
    destinationLng: [0],

    viaLat: [0],
    viaLng: [0],

    departureAt: [
      '',
      [
        Validators.required,
        future,
      ],
    ],

    seats: [
      1,
      [
        Validators.required,
        Validators.min(1),
        Validators.max(8),
      ],
    ],

    vehicleNumber: [
      '',
      [
        Validators.required,
        Validators.pattern(
          /^[A-Za-z0-9]{4,20}$/,
        ),
      ],
    ],

    notes: [
      '',
      [
        Validators.maxLength(1000),
      ],
    ],
  });

  constructor() {
    if (this.id) {
      void this.load();
    }
  }

  progress(): number {
    return (
      this.step() /
      this.totalSteps
    ) * 100;
  }

  nextStep(): void {
    if (
      this.busy() ||
      !this.validateStep(this.step())
    ) {
      return;
    }

    if (
      this.step() <
      this.totalSteps
    ) {
      this.error.set('');

      this.step.update(
        value => value + 1,
      );
    }
  }

  handleEnter(event: Event): void {
    const keyboardEvent = event as KeyboardEvent;
    const target = keyboardEvent.target;

    if (keyboardEvent.isComposing) {
      return;
    }

    if (
      target instanceof HTMLTextAreaElement &&
      keyboardEvent.shiftKey
    ) {
      return;
    }

    keyboardEvent.preventDefault();

    if (
      this.id ||
      this.step() === this.totalSteps
    ) {
      void this.save();

      return;
    }

    this.nextStep();
  }

  previousStep(): void {
    if (
      this.step() <= 1
    ) {
      return;
    }

    this.error.set('');

    this.step.update(
      value => value - 1,
    );
  }

  openMap(): void {
    this.error.set('');
    this.mapOpen.set(true);
  }

  closeMap(): void {
    this.mapOpen.set(false);
  }

  private validateStep(
    step: number,
  ): boolean {
    this.error.set('');

    switch (step) {
      case 1: {
        const control =
          this.form.controls.origin;

        control.markAsTouched();
        control.updateValueAndValidity();

        return control.valid;
      }

      case 2: {
        const control =
          this.form.controls.destination;

        control.markAsTouched();
        control.updateValueAndValidity();

        if (control.invalid) {
          return false;
        }

        const origin =
          this.form.controls.origin.value
            .trim()
            .toLowerCase();

        const destination =
          control.value
            .trim()
            .toLowerCase();

        if (
          origin ===
          destination
        ) {
          this.error.set(
            'Origin and destination must be different.',
          );

          return false;
        }

        return true;
      }

      case 3: {
        const control =
          this.form.controls.via;

        control.markAsTouched();
        control.updateValueAndValidity();

        return control.valid;
      }

      case 4: {
        if (!this.hasOriginPoint()) {
          this.error.set(
            'Pin your commute origin before continuing.',
          );

          return false;
        }

        return true;
      }

      case 5: {
        const control =
          this.form.controls.departureAt;

        control.markAsTouched();
        control.updateValueAndValidity();

        return control.valid;
      }

      case 6: {
        const control =
          this.form.controls.vehicleNumber;

        control.markAsTouched();
        control.updateValueAndValidity();

        return control.valid;
      }

      case 7: {
        const control =
          this.form.controls.seats;

        control.markAsTouched();
        control.updateValueAndValidity();

        return control.valid;
      }

      case 8: {
        const control =
          this.form.controls.notes;

        control.markAsTouched();
        control.updateValueAndValidity();

        return control.valid;
      }

      default:
        return false;
    }
  }

  hasOriginPoint(): boolean {
    return (
      this.form.controls.originLat.value !== 0 &&
      this.form.controls.originLng.value !== 0
    );
  }

  hasRequiredMapPoints(): boolean {
    return this.hasOriginPoint();
  }

  async load(): Promise<void> {
    if (!this.id) {
      return;
    }

    this.loading.set(true);
    this.loadError.set('');

    try {
      const post =
        await this.api.getCommute(
          this.id,
        );

      if (
        post.ownerId !==
        this.auth.user()?.id
      ) {
        this.loadError.set(
          'You can only edit your own commutes.',
        );

        return;
      }

      if (
        post.deletedAt ||
        new Date(post.departureAt) <=
          new Date()
      ) {
        this.loadError.set(
          'Past and cancelled commutes cannot be edited.',
        );

        return;
      }

      const departure =
        new Date(
          post.departureAt,
        );

      const local =
        new Date(
          departure.getTime() -
            departure.getTimezoneOffset() *
              60000,
        )
          .toISOString()
          .slice(0, 16);

      this.originalDeparture =
        post.departureAt;

      this.originalLocalDeparture =
        local;

      this.form.setValue({
        origin:
          post.origin,

        destination:
          post.destination,

        via:
          post.via || '',

        originLat:
          post.originLat,

        originLng:
          post.originLng,

        destinationLat:
          post.destinationLat,

        destinationLng:
          post.destinationLng,

        viaLat:
          post.viaLat || 0,

        viaLng:
          post.viaLng || 0,

        departureAt:
          local,

        seats:
          post.seats,

        vehicleNumber:
          post.vehicleNumber || '',

        notes:
          post.notes || '',
      });
    } catch (e) {
      this.loadError.set(
        errorMessage(e),
      );
    } finally {
      this.loading.set(false);
    }
  }

  async save(): Promise<void> {
    if (this.id) {
      const seats =
        this.form.controls.seats;

      seats.markAsTouched();
      seats.updateValueAndValidity();

      if (
        seats.invalid ||
        this.busy()
      ) {
        return;
      }

      this.busy.set(true);
      this.error.set('');

      try {
        const post =
          await this.api.updateCommute(
            this.id,
            seats.value,
          );

        await this.router.navigate([
          '/commutes',
          post.id,
        ]);
      } catch (e) {
        this.error.set(
          errorMessage(e),
        );
      } finally {
        this.busy.set(false);
      }

      return;
    }

    if (
      this.step() !==
      this.totalSteps
    ) {
      return;
    }

    if (
      !this.validateStep(
        this.totalSteps,
      )
    ) {
      return;
    }

    if (this.busy()) {
      return;
    }

    this.form.controls.origin
      .updateValueAndValidity();

    this.form.controls.destination
      .updateValueAndValidity();

    this.form.controls.via
      .updateValueAndValidity();

    this.form.controls.departureAt
      .updateValueAndValidity();

    this.form.controls.vehicleNumber
      .updateValueAndValidity();

    this.form.controls.seats
      .updateValueAndValidity();

    this.form.controls.notes
      .updateValueAndValidity();

    if (this.form.invalid) {
      this.error.set(
        'Some commute details are invalid. Go back and check your answers.',
      );

      return;
    }

    if (
      !this.hasRequiredMapPoints()
    ) {
      this.error.set(
        'Pin your commute origin before posting.',
      );

      this.step.set(4);

      return;
    }

    const value =
      this.form.getRawValue();

    const origin =
      value.origin.trim();

    const destination =
      value.destination.trim();

    const via =
      value.via.trim();

    if (
      origin.toLowerCase() ===
      destination.toLowerCase()
    ) {
      this.error.set(
        'Origin and destination must be different.',
      );

      this.step.set(2);

      return;
    }

    this.busy.set(true);
    this.error.set('');

    try {
      const draft = {
        ...value,

        origin,

        destination,

        via:
          via || undefined,

        viaLat:
          via
            ? value.viaLat
            : undefined,

        viaLng:
          via
            ? value.viaLng
            : undefined,

        vehicleNumber:
          value.vehicleNumber
            .trim()
            .toUpperCase(),

        notes:
          value.notes.trim(),

        departureAt:
          value.departureAt ===
          this.originalLocalDeparture
            ? this.originalDeparture
            : new Date(
                value.departureAt,
              ).toISOString(),
      };

      const post =
        await this.api.createCommute(
          draft,
        );

      await this.router.navigate([
        '/commutes',
        post.id,
      ]);
    } catch (e) {
      this.error.set(
        errorMessage(e),
      );
    } finally {
      this.busy.set(false);
    }
  }

  mapPoints() {
    const value =
      this.form.getRawValue();

    return {
      ...(
        this.hasOriginPoint()
          ? {
              origin: {
                lat:
                  value.originLat,

                lng:
                  value.originLng,
              },
            }
          : {}
      ),
    };
  }

  setMapPoint(
    selection: MapSelection,
  ): void {
    if (selection.kind !== 'origin') {
      return;
    }

    this.form.controls.originLat.setValue(selection.coordinates.lat);
    this.form.controls.originLng.setValue(selection.coordinates.lng);
    this.form.controls.destinationLat.setValue(selection.coordinates.lat);
    this.form.controls.destinationLng.setValue(selection.coordinates.lng);
    this.form.controls.viaLat.setValue(selection.coordinates.lat);
    this.form.controls.viaLng.setValue(selection.coordinates.lng);
  }
}