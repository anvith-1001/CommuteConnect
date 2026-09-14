import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  forwardRef,
  input,
  viewChild,
} from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import flatpickr from 'flatpickr';
import { Instance } from 'flatpickr/dist/types/instance';

@Component({
  selector: 'cc-date-picker',
  templateUrl: './date-picker.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DatePickerComponent),
      multi: true,
    },
  ],
})
export class DatePickerComponent
  implements AfterViewInit, OnDestroy, ControlValueAccessor
{
  fieldId = input.required<string>();

  label = input.required<string>();

  hint = input('');

  control = input<FormControl | null>(null);

  enableTime = input(false);

  minDate = input<string | Date | undefined>();

  maxDate = input<string | Date | undefined>();

  private inputElement = viewChild.required<ElementRef<HTMLInputElement>>('picker');

  private picker?: Instance;

  private value = '';

  disabled = false;

  onChange: (value: string) => void = () => undefined;

  onTouched: () => void = () => undefined;

  get invalid(): boolean {
    const control = this.control();

    return !!control && control.invalid && control.touched;
  }

  get message(): string {
    const errors = this.control()?.errors || {};

    if (errors['required']) {
      return `Please choose ${this.label().toLowerCase()}.`;
    }

    if (errors['future']) {
      return 'Choose a departure time in the future.';
    }

    if (errors['birthDate']) {
      return 'Enter a valid date of birth in the past.';
    }

    return 'Please check this date.';
  }

  ngAfterViewInit(): void {
    this.picker = flatpickr(this.inputElement().nativeElement, {
      allowInput: true,
      disableMobile: true,
      dateFormat: this.enableTime() ? 'Y-m-d\\TH:i' : 'Y-m-d',
      altInput: true,
      altFormat: this.enableTime() ? 'D, j M Y at h:i K' : 'j M Y',
      enableTime: this.enableTime(),
      minDate: this.minDate(),
      maxDate: this.maxDate(),
      minuteIncrement: 5,
      defaultDate: this.value || undefined,
      parseDate: (value, format) => {
        const match = value.match(/^(\d{4})-(\d{2})-(\d{2})(?:T(\d{2}):(\d{2}))?$/);

        if (match) {
          return new Date(
            Number(match[1]),
            Number(match[2]) - 1,
            Number(match[3]),
            Number(match[4] || 0),
            Number(match[5] || 0),
          );
        }

        return flatpickr.parseDate(value, format) || new Date(Number.NaN);
      },
      onReady: (_dates, _value, instance) => {
        if (instance.altInput) {
          instance.input.id = `${this.fieldId()}-value`;
          instance.altInput.id = this.fieldId();
          instance.altInput.autocomplete = 'off';
          const compactScreen = window.matchMedia('(max-width: 760px)').matches;

          instance.altInput.inputMode = compactScreen ? 'none' : 'text';
          instance.altInput.readOnly = compactScreen;
          instance.altInput.setAttribute('data-1p-ignore', 'true');
          instance.altInput.setAttribute('data-lpignore', 'true');
          instance.altInput.setAttribute('aria-describedby', `${this.fieldId()}-help`);
          instance.altInput.addEventListener('input', () => {
            const entered = instance.altInput!.value.trim();
            const internalFormat = this.enableTime() ? 'Y-m-d\\TH:i' : 'Y-m-d';
            const displayFormat = this.enableTime() ? 'D, j M Y at h:i K' : 'j M Y';
            const isInternal = this.enableTime()
              ? /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(entered)
              : /^\d{4}-\d{2}-\d{2}$/.test(entered);
            const parsed = isInternal
              ? flatpickr.parseDate(entered, internalFormat)
              : flatpickr.parseDate(entered, displayFormat);

            this.value = parsed ? flatpickr.formatDate(parsed, internalFormat) : '';
            instance.input.value = this.value;
            this.onChange(this.value);
          });
        }
      },
      onChange: (_dates, value) => {
        this.value = value;
        this.onChange(value);
        this.onTouched();
      },
      onValueUpdate: (_dates, value) => {
        this.value = value;
        this.onChange(value);
      },
      onClose: () => this.onTouched(),
    });
    this.picker.set('clickOpens', !this.disabled);
  }

  ngOnDestroy(): void {
    this.picker?.destroy();
  }

  writeValue(value: string | null): void {
    this.value = value || '';
    this.picker?.setDate(this.value, false);
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(disabled: boolean): void {
    this.disabled = disabled;
    this.picker?.set('clickOpens', !disabled);
    this.inputElement()?.nativeElement.toggleAttribute('disabled', disabled);
  }
}