import { AbstractControl, ValidationErrors } from '@angular/forms';

export function meaningful(control: AbstractControl): ValidationErrors | null {
  return typeof control.value === 'string' && control.value.trim().length >= 2
    ? null
    : { whitespace: true };
}

export function future(control: AbstractControl): ValidationErrors | null {
  const value = typeof control.value === 'string' ? control.value : '';
  const timestamp = new Date(value).getTime();

  return value && Number.isFinite(timestamp) && timestamp > Date.now()
    ? null
    : { future: true };
}

export function birthDate(control: AbstractControl): ValidationErrors | null {
  const v = control.value;
  const date = new Date(v + 'T00:00:00Z');

  return /^\d{4}-\d{2}-\d{2}$/.test(v) &&
    Number.isFinite(date.getTime()) &&
    date.toISOString().slice(0, 10) === v &&
    date < new Date() &&
    date.getUTCFullYear() >= 1900
    ? null
    : { birthDate: true };
}