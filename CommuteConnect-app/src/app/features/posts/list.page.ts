import { Component, DestroyRef, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { debounceTime, distinctUntilChanged, map } from 'rxjs';
import { ApiService } from '../../utils/api';
import { AuthService } from '../../core/auth.service';
import { Commute, Page } from '../../core/models';
import { errorMessage } from '../../core/errors';
import { FieldComponent } from '../../shared/field.component';
import { StateComponent } from '../../shared/state.component';
import { PaginationComponent } from '../../shared/pagination.component';
import { CommuteCardComponent } from '../../shared/commute-card.component';

@Component({
  imports: [
    ReactiveFormsModule,
    RouterLink,
    FieldComponent,
    StateComponent,
    PaginationComponent,
    CommuteCardComponent,
  ],
  templateUrl: './list.page.html',
})
export class ListPage {
  private api = inject(ApiService);

  auth = inject(AuthService);

  firstName = computed(() => this.auth.user()?.name.trim().split(/\s+/)[0] || 'there');

  private fb = inject(FormBuilder);

  private destroyRef = inject(DestroyRef);

  form = this.fb.nonNullable.group({
    origin: ['', Validators.maxLength(120)],
    destination: ['', Validators.maxLength(120)],
  });

  result = signal<Page<Commute> | null>(null);

  loading = signal(false);

  error = signal('');

  page = signal(1);

  searched = signal(false);

  private query = { origin: '', destination: '' };

  private lastQuery = '';

  private request = 0;

  constructor() {
    this.form.valueChanges
      .pipe(
        debounceTime(400),
        map(
          (value) => `${value.origin?.trim() || ''}|${value.destination?.trim() || ''}`,
        ),
        distinctUntilChanged(),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe(() => this.search(false));
  }

  search(markTouched = true): void {
    if (markTouched) {
      this.form.markAllAsTouched();
    }

    if (this.form.invalid) {
      return;
    }

    const values = this.form.getRawValue();
    this.query = {
      origin: values.origin.trim(),
      destination: values.destination.trim(),
    };

    if (!this.query.origin && !this.query.destination) {
      this.request += 1;
      this.lastQuery = '';
      this.searched.set(false);
      this.loading.set(false);
      this.error.set('');
      this.result.set(null);

      return;
    }

    const queryKey = `${this.query.origin}|${this.query.destination}`;

    if (queryKey === this.lastQuery && this.searched()) {
      return;
    }

    this.lastQuery = queryKey;
    this.searched.set(true);
    void this.load(1);
  }

  swap(): void {
    const { origin, destination } = this.form.getRawValue();

    this.form.setValue(
      { origin: destination, destination: origin },
      { emitEvent: false },
    );
    this.lastQuery = '';
    this.search(false);
  }

  clear(): void {
    this.form.reset();
    this.query = { origin: '', destination: '' };
    this.lastQuery = '';
    this.request += 1;
    this.page.set(1);
    this.searched.set(false);
    this.loading.set(false);
    this.error.set('');
    this.result.set(null);
  }

  async load(page: number): Promise<void> {
    const request = ++this.request;
    this.page.set(page);
    this.loading.set(true);
    this.error.set('');

    try {
      const result = await this.api.getCommutes({ ...this.query, page });

      if (request === this.request) {
        this.result.set(result);
      }
    } catch (e) {
      if (request === this.request) {
        this.error.set(errorMessage(e));
      }
    } finally {
      if (request === this.request) {
        this.loading.set(false);
      }
    }
  }
}