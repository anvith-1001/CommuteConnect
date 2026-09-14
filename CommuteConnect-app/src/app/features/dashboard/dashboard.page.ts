import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../utils/api';
import { Commute } from '../../core/models';
import { errorMessage } from '../../core/errors';
import { CommuteCardComponent } from '../../shared/commute-card.component';
import { StateComponent } from '../../shared/state.component';

@Component({
  imports: [RouterLink, CommuteCardComponent, StateComponent],
  templateUrl: './dashboard.page.html',
})
export class DashboardPage {
  private api = inject(ApiService);

  cards = signal<Commute[]>([]);

  loading = signal(true);

  error = signal('');

  constructor() {
    void this.load();
  }

  async load(): Promise<void> {
    this.loading.set(true);
    this.error.set('');

    try {
      const [commutes, interests] = await Promise.all([
        this.api.getMyCommutes('current', 1, 50),
        this.api.getMyInterests('current', 1, 50),
      ]);
      const joinedCommutes = interests.data.flatMap((interest) =>
        interest.post ? [interest.post] : [],
      );

      this.cards.set(
        [...commutes.data, ...joinedCommutes].sort(
          (left, right) =>
            new Date(left.departureAt).getTime() - new Date(right.departureAt).getTime(),
        ),
      );
    } catch (error) {
      this.error.set(errorMessage(error));
    } finally {
      this.loading.set(false);
    }
  }
}