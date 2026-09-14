import { Component, input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Commute } from '../core/models';

@Component({
  selector: 'cc-commute-card',
  imports: [DatePipe, RouterLink],
  templateUrl: './commute-card.component.html',
})
export class CommuteCardComponent {
  post = input.required<Commute>();

  history = input(false);
}