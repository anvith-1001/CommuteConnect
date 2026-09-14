import { Component, input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'cc-field',
  imports: [ReactiveFormsModule],
  templateUrl: './field.component.html',
})
export class FieldComponent {
  fieldId = input.required<string>();

  label = input.required<string>();

  control = input.required<FormControl>();

  type = input('text');

  autocomplete = input('off');

  hint = input('');

  placeholder = input('');

  min = input<string | number | null>(null);

  max = input<string | number | null>(null);

  maxLength = input<number | null>(null);

  get invalid() {
    return this.control().invalid && this.control().touched;
  }

  get message() {
    const e = this.control().errors || {};

    if (e['required']) {
      return `Please enter ${this.label().toLowerCase()}.`;
    }

    if (e['email']) {
      return 'Enter a valid email address.';
    }

    if (e['minlength']) {
      return `Use at least ${e['minlength'].requiredLength} characters.`;
    }

    if (e['maxlength']) {
      return `Use no more than ${e['maxlength'].requiredLength} characters.`;
    }

    if (e['min'] || e['max']) {
      return `Choose a number between ${this.min()} and ${this.max()}.`;
    }

    if (e['future']) {
      return 'Choose a departure time in the future.';
    }

    if (e['birthDate']) {
      return 'Enter a valid date of birth in the past.';
    }

    if (e['whitespace']) {
      return 'Enter at least two non-space characters.';
    }

    if (e['pattern'] && this.label() === 'Vehicle number') {
      return 'Vehicle number must contain 4–20 letters and numbers.';
    }

    return 'Please check this value.';
  }
}