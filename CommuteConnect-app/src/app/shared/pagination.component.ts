import { Component, input, output } from '@angular/core';

@Component({
  selector: 'cc-pagination',
  templateUrl: './pagination.component.html',
})
export class PaginationComponent {
  page = input(1);

  totalPages = input(0);

  change = output<number>();
}