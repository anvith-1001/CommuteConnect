import { HttpErrorResponse } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { AuthResult, User } from './models';
import { ApiService, LoginRequest, RegisterRequest } from '../utils/api';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private api = inject(ApiService);

  private readonly userState = signal<User | null>(null);

  private readonly tokenState = signal<string | null>(null);

  readonly user = this.userState.asReadonly();

  readonly token = this.tokenState.asReadonly();

  readonly signedIn = computed(() => !!this.user());

  private refreshInFlight: Promise<boolean> | null = null;

  private apply(result: AuthResult): void {
    this.userState.set(result.user);
    this.tokenState.set(result.accessToken);
  }

  async login(data: LoginRequest): Promise<void> {
    const result = await this.api.login(data);

    this.apply(result);
  }

  async register(data: RegisterRequest): Promise<void> {
    const result = await this.api.register(data);

    this.apply(result);
  }

  refresh(): Promise<boolean> {
    if (this.refreshInFlight) {
      return this.refreshInFlight;
    }

    this.refreshInFlight = this.api
      .refreshSession()
      .then((result) => {
        if (!result) {
          this.clear();

          return false;
        }

        this.apply(result);

        return true;
      })
      .catch((error: unknown) => {
        if (
          this.signedIn() &&
          error instanceof HttpErrorResponse &&
          (error.status === 0 || error.status >= 500)
        ) {
          return true;
        }

        this.clear();

        return false;
      })
      .finally(() => {
        this.refreshInFlight = null;
      });

    return this.refreshInFlight;
  }

  async logout(): Promise<void> {
    await this.api.logout();

    this.clear();
  }

  clear(): void {
    this.userState.set(null);
    this.tokenState.set(null);
  }

  setUser(user: User): void {
    this.userState.set(user);
  }
}