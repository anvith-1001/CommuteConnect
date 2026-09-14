import {
  Component,
  computed,
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

import { AuthService } from '../../core/auth.service';
import { errorMessage } from '../../core/errors';

import { FieldComponent } from '../../shared/field.component';
import { DatePickerComponent } from '../../shared/date-picker.component';
import { SelectComponent } from '../../shared/select.component';

import {
  birthDate,
  meaningful,
} from '../../shared/validators';

@Component({
  imports: [
    ReactiveFormsModule,
    RouterLink,
    FieldComponent,
    DatePickerComponent,
    SelectComponent,
  ],
  templateUrl: './auth.page.html',
  styleUrl: './auth.page.css',
})
export class AuthPage {
  private fb = inject(FormBuilder);

  private route = inject(ActivatedRoute);

  private router = inject(Router);

  private auth = inject(AuthService);

  register =
    this.route.snapshot.routeConfig?.path === 'register';

  busy = signal(false);

  error = signal('');

  currentStep = signal(0);

  readonly totalSteps = 5;

  maxDob = new Date()
    .toISOString()
    .slice(0, 10);

  sexOptions = [
    {
      value: 'female',
      label: 'Female',
    },
    {
      value: 'male',
      label: 'Male',
    },
    {
      value: 'other',
      label: 'Other',
    },
    {
      value: 'prefer_not_to_say',
      label: 'Prefer not to say',
    },
  ];

  form = this.fb.nonNullable.group({
    name: [
      '',
      this.register
        ? [
            Validators.required,
            meaningful,
            Validators.maxLength(100),
          ]
        : [],
    ],

    email: [
      '',
      [
        Validators.required,
        Validators.email,
        Validators.maxLength(254),
      ],
    ],

    password: [
      '',
      [
        Validators.required,
        Validators.minLength(
          this.register ? 12 : 1,
        ),
        Validators.maxLength(128),
      ],
    ],

    dob: [
      '',
      this.register
        ? [
            Validators.required,
            birthDate,
          ]
        : [],
    ],

    sex: [
      '',
      this.register
        ? [
            Validators.required,
          ]
        : [],
    ],
  });

  progressPercentage = computed(() => {
    return (
      ((this.currentStep() + 1) /
        this.totalSteps) *
      100
    );
  });

  currentStepTitle = computed(() => {
    switch (this.currentStep()) {
      case 0:
        return 'About you';

      case 1:
        return 'Your email';

      case 2:
        return 'Security';

      case 3:
        return 'Birthday';

      case 4:
        return 'One last detail';

      default:
        return '';
    }
  });

  currentStepHeading = computed(() => {
    switch (this.currentStep()) {
      case 0:
        return 'What should we call you?';

      case 1:
        return 'What’s your email?';

      case 2:
        return 'Create a password';

      case 3:
        return 'When were you born?';

      case 4:
        return 'How do you identify?';

      default:
        return 'Create your account';
    }
  });

  currentStepDescription = computed(() => {
    switch (this.currentStep()) {
      case 0:
        return 'Start with your name.';

      case 1:
        return 'We’ll use this to sign you in.';

      case 2:
        return 'Keep your account protected with a strong password.';

      case 3:
        return 'This helps us keep CommuteConnect appropriate for everyone.';

      case 4:
        return 'That’s everything we need to get you on your way.';

      default:
        return '';
    }
  });

  isLastStep(): boolean {
    return (
      this.currentStep() ===
      this.totalSteps - 1
    );
  }

  handleRegisterSubmit(): void {
    if (this.busy()) {
      return;
    }

    if (this.isLastStep()) {
      void this.submit();
      return;
    }

    this.nextStep();
  }

  nextStep(): void {
    const control =
      this.currentStepControl();

    control.markAsTouched();

    if (control.invalid) {
      return;
    }

    this.error.set('');

    if (!this.isLastStep()) {
      this.currentStep.update(
        (step) => step + 1,
      );
    }
  }

  previousStep(): void {
    if (
      this.busy() ||
      this.currentStep() === 0
    ) {
      return;
    }

    this.error.set('');

    this.currentStep.update(
      (step) => step - 1,
    );
  }

  private currentStepControl() {
    switch (this.currentStep()) {
      case 0:
        return this.form.controls.name;

      case 1:
        return this.form.controls.email;

      case 2:
        return this.form.controls.password;

      case 3:
        return this.form.controls.dob;

      case 4:
        return this.form.controls.sex;

      default:
        return this.form.controls.name;
    }
  }

  async submit(): Promise<void> {
    if (this.busy()) {
      return;
    }

    if (this.register) {
      const control =
        this.currentStepControl();

      control.markAsTouched();

      if (control.invalid) {
        return;
      }
    }

    this.form.markAllAsTouched();

    if (this.form.invalid) {
      return;
    }

    this.busy.set(true);

    this.error.set('');

    try {
      const value =
        this.form.getRawValue();

      if (this.register) {
        await this.auth.register({
          ...value,
          name: value.name.trim(),
        });
      } else {
        await this.auth.login({
          email: value.email,
          password: value.password,
        });
      }

      const returnUrl =
        this.route.snapshot.queryParamMap.get(
          'returnUrl',
        );

      await this.router.navigateByUrl(
        returnUrl?.startsWith('/') &&
          !returnUrl.startsWith('//')
          ? returnUrl
          : '/commutes',
        {
          replaceUrl: true,
        },
      );
    } catch (e) {
      this.error.set(
        errorMessage(e),
      );
    } finally {
      this.busy.set(false);
    }
  }
}