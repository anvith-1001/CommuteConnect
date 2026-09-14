import {
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  forwardRef,
  inject,
  input,
  signal,
} from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';

export interface SelectOption {
  value: string;
  label: string;
}

@Component({
  selector: 'cc-select',
  templateUrl: './select.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true,
    },
  ],
})
export class SelectComponent implements ControlValueAccessor, OnDestroy {
  fieldId = input.required<string>();

  label = input.required<string>();

  options = input.required<SelectOption[]>();

  control = input<FormControl | null>(null);

  placeholder = input('Select an option');

  hint = input('');

  private host = inject(ElementRef<HTMLElement>);

  open = signal(false);

  value = '';

  disabled = false;

  onChange: (value: string) => void = () => undefined;

  onTouched: () => void = () => undefined;

  get selectedLabel(): string {
    return this.options().find((option) => option.value === this.value)?.label || '';
  }

  get invalid(): boolean {
    const control = this.control();

    return !!control && control.invalid && control.touched;
  }

  toggle(): void {
    if (!this.disabled) {
      this.open.update((open) => !open);
    }
  }

  choose(option: SelectOption): void {
    this.value = option.value;
    this.onChange(option.value);
    this.onTouched();
    this.open.set(false);
  }

  writeValue(value: string | null): void {
    this.value = value || '';
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(disabled: boolean): void {
    this.disabled = disabled;

    if (disabled) {
      this.open.set(false);
    }
  }

  ngOnDestroy(): void {
    this.open.set(false);
  }

  @HostListener('document:pointerdown', ['$event'])
  closeOutside(event: PointerEvent): void {
    if (!this.host.nativeElement.contains(event.target as Node)) {
      this.open.set(false);
    }
  }

  @HostListener('keydown.escape')
  close(): void {
    this.open.set(false);
  }
}