import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../utils/api';
import { Commute, Interest, Page } from '../../core/models';
import { errorMessage } from '../../core/errors';
import { CommuteCardComponent } from '../../shared/commute-card.component';
import { PaginationComponent } from '../../shared/pagination.component';
import { StateComponent } from '../../shared/state.component';

@Component({
  imports: [RouterLink, CommuteCardComponent, PaginationComponent, StateComponent],
  templateUrl: './history.component.html',
})
export class HistoryComponent {
  private api = inject(ApiService);

  tab = signal<'posts' | 'interests'>('posts');

  cards = signal<Commute[]>([]);

  page = signal(1);

  totalPages = signal(0);

  loading = signal(true);

  error = signal('');

  private request = 0;

  constructor() {
    void this.load(1);
  }

  selectTab(tab: 'posts' | 'interests'): void {
    this.tab.set(tab);
    void this.load(1);
  }

  async load(page: number): Promise<void> {
    const request = ++this.request;
    this.page.set(page);
    this.loading.set(true);
    this.error.set('');

    try {
      let result: Page<Commute> | Page<Interest>;
      let cards: Commute[];

      if (this.tab() === 'posts') {
        result = await this.api.getMyCommutes('history', page);
        cards = result.data;
      } else {
        result = await this.api.getMyInterests('history', page);
        cards = result.data.flatMap((interest) => (interest.post ? [interest.post] : []));
      }

      if (request === this.request) {
        this.cards.set(cards);
        this.totalPages.set(result.totalPages);
      }
    } catch (error) {
      if (request === this.request) {
        this.error.set(errorMessage(error));
      }
    } finally {
      if (request === this.request) {
        this.loading.set(false);
      }
    }
  }
}