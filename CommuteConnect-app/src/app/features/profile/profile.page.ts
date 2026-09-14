import { DatePipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/auth.service';
import { errorMessage } from '../../core/errors';
import { ApiService } from '../../utils/api';
import { DatePickerComponent } from '../../shared/date-picker.component';
import { FieldComponent } from '../../shared/field.component';
import { birthDate, meaningful } from '../../shared/validators';
import { SelectComponent } from '../../shared/select.component';

@Component({
  imports: [
    DatePipe,
    RouterLink,
    ReactiveFormsModule,
    DatePickerComponent,
    FieldComponent,
    SelectComponent,
  ],
  templateUrl: './profile.page.html',
})
export class ProfilePage {
  private fb = inject(FormBuilder);

  private api = inject(ApiService);

  auth = inject(AuthService);

  private router = inject(Router);

  busy = signal(false);

  deleting = signal(false);

  confirmDelete = signal(false);

  error = signal('');

  notice = signal('');

  editing = signal(false);

  maxDob = new Date().toISOString().slice(0, 10);

  sexOptions = [
    { value: 'female', label: 'Female' },
    { value: 'male', label: 'Male' },
    { value: 'other', label: 'Other' },
    { value: 'prefer_not_to_say', label: 'Prefer not to say' },
  ];

  profileForm = this.fb.nonNullable.group({
    name: [
      this.auth.user()?.name || '',
      [Validators.required, meaningful, Validators.maxLength(100)],
    ],
    dob: [this.auth.user()?.dob || '', [Validators.required, birthDate]],
    sex: [this.auth.user()?.sex || '', Validators.required],
  });

  deleteForm = this.fb.nonNullable.group({
    password: ['', [Validators.required, Validators.maxLength(128)]],
  });

  get sexLabel(): string {
    const value = this.auth.user()?.sex;

    return this.sexOptions.find((option) => option.value === value)?.label || 'Not set';
  }

  edit(): void {
    const user = this.auth.user();

    if (user) {
      this.profileForm.reset({
        name: user.name,
        dob: user.dob,
        sex: user.sex,
      });
    }

    this.error.set('');
    this.notice.set('');
    this.editing.set(true);
  }

  cancelEdit(): void {
    this.editing.set(false);
    this.error.set('');
  }

  async save(): Promise<void> {
    this.profileForm.markAllAsTouched();

    if (this.profileForm.invalid || this.busy()) {
      return;
    }

    this.busy.set(true);
    this.error.set('');
    this.notice.set('');

    try {
      const user = await this.api.updateProfile(this.profileForm.getRawValue());
      this.auth.setUser(user);
      this.notice.set('Your profile has been updated.');
      this.editing.set(false);
    } catch (error) {
      this.error.set(errorMessage(error));
    } finally {
      this.busy.set(false);
    }
  }

  async deleteAccount(): Promise<void> {
    this.deleteForm.markAllAsTouched();

    if (this.deleteForm.invalid || this.deleting()) {
      return;
    }

    this.deleting.set(true);
    this.error.set('');

    try {
      await this.api.deleteAccount(this.deleteForm.controls.password.value);
      this.auth.clear();
      await this.router.navigate(['/login']);
    } catch (error) {
      this.error.set(errorMessage(error));
    } finally {
      this.deleting.set(false);
    }
  }
}