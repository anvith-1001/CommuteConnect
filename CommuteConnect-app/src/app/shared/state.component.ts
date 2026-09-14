import { Component, input, output } from '@angular/core';

@Component({
  selector: 'cc-state',
  templateUrl: './state.component.html',
})
export class StateComponent {
  kind = input<'loading' | 'empty' | 'error'>('empty');

  title = input.required<string>();

  message = input('');

  retry = output<void>();
}