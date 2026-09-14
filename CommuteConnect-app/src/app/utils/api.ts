// Centralized functions
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import {
  AuthResult,
  ChatMessage,
  Commute,
  Coordinates,
  Interest,
  NotificationFeed,
  Page,
  PostDraft,
  User,
} from '../core/models';
import { CHAT_SERVER_URL } from '../generated-config';

export const API_BASE_URL = '/api';

const AUTH_BASE_URL = `${API_BASE_URL}/auth`;

const POSTS_BASE_URL = `${API_BASE_URL}/posts`;

const INTERESTS_BASE_URL = `${API_BASE_URL}/interests`;

const NOTIFICATIONS_BASE_URL = `${API_BASE_URL}/notifications`;

export const CHAT_SOCKET_URL = `${CHAT_SERVER_URL}/chat`;

export const CHAT_SOCKET_PATH = '/socket.io';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest extends LoginRequest {
  name: string;
  dob: string;
  sex: string;
}

export function isApiRequest(url: string): boolean {
  return url.startsWith(`${API_BASE_URL}/`);
}

export function isAuthRequest(url: string): boolean {
  return url.startsWith(`${AUTH_BASE_URL}/`);
}

@Injectable({ providedIn: 'root' })
export class ApiService {
  private http = inject(HttpClient);

  login(data: LoginRequest): Promise<AuthResult> {
    return firstValueFrom(this.http.post<AuthResult>(`${AUTH_BASE_URL}/login`, data));
  }

  register(data: RegisterRequest): Promise<AuthResult> {
    return firstValueFrom(this.http.post<AuthResult>(`${AUTH_BASE_URL}/register`, data));
  }

  refreshSession(): Promise<AuthResult | null> {
    return firstValueFrom(
      this.http.post<AuthResult | null>(`${AUTH_BASE_URL}/refresh`, {}),
    );
  }

  logout(): Promise<void> {
    return firstValueFrom(this.http.post<void>(`${AUTH_BASE_URL}/logout`, {}));
  }

  getCurrentUser(): Promise<User> {
    return firstValueFrom(this.http.get<User>(`${API_BASE_URL}/users/me`));
  }

  updateProfile(data: Pick<User, 'name' | 'dob' | 'sex'>): Promise<User> {
    return firstValueFrom(this.http.patch<User>(`${API_BASE_URL}/users/me`, data));
  }

  deleteAccount(password: string): Promise<void> {
    return firstValueFrom(
      this.http.delete<void>(`${API_BASE_URL}/users/me`, { body: { password } }),
    );
  }

  getCommutes(params: { origin: string; destination: string; page: number }) {
    return firstValueFrom(this.http.get<Page<Commute>>(POSTS_BASE_URL, { params }));
  }

  getMyCommutes(view: string, page: number, limit = 12) {
    return firstValueFrom(
      this.http.get<Page<Commute>>(`${POSTS_BASE_URL}/mine`, {
        params: { view, page, limit },
      }),
    );
  }

  getCommute(id: string) {
    return firstValueFrom(this.http.get<Commute>(`${POSTS_BASE_URL}/${id}`));
  }

  createCommute(draft: PostDraft) {
    return firstValueFrom(this.http.post<Commute>(POSTS_BASE_URL, draft));
  }

  updateCommute(id: string, seats: number) {
    return firstValueFrom(this.http.put<Commute>(`${POSTS_BASE_URL}/${id}`, { seats }));
  }

  deleteCommute(id: string) {
    return firstValueFrom(this.http.delete<void>(`${POSTS_BASE_URL}/${id}`));
  }

  expressInterest(postId: string, pickup?: Coordinates | null) {
    const body: { pickupLat?: number; pickupLng?: number } = {};

    if (pickup?.lat != null && pickup?.lng != null) {
      body.pickupLat = pickup.lat;
      body.pickupLng = pickup.lng;
    }

    return firstValueFrom(
      this.http.post<Interest>(`${POSTS_BASE_URL}/${postId}/interests`, body),
    );
  }

  withdrawInterest(id: string) {
    return firstValueFrom(
      this.http.patch<Interest>(`${INTERESTS_BASE_URL}/${id}/withdraw`, {}),
    );
  }

  decideInterest(id: string, status: 'accepted' | 'declined') {
    return firstValueFrom(
      this.http.patch<Interest>(`${INTERESTS_BASE_URL}/${id}/decision`, { status }),
    );
  }

  getPostInterests(postId: string, page = 1) {
    return firstValueFrom(
      this.http.get<Page<Interest>>(`${POSTS_BASE_URL}/${postId}/interests`, {
        params: { page },
      }),
    );
  }

  getMyInterests(view: string, page: number, limit = 12) {
    return firstValueFrom(
      this.http.get<Page<Interest>>(`${INTERESTS_BASE_URL}/mine`, {
        params: { view, page, limit },
      }),
    );
  }

  getMessages(interestId: string): Promise<ChatMessage[]> {
    return firstValueFrom(
      this.http.get<ChatMessage[]>(`${INTERESTS_BASE_URL}/${interestId}/messages`),
    );
  }

  getNotifications(): Promise<NotificationFeed> {
    return firstValueFrom(this.http.get<NotificationFeed>(NOTIFICATIONS_BASE_URL));
  }

  readNotification(id: string): Promise<void> {
    return firstValueFrom(
      this.http.patch<void>(`${NOTIFICATIONS_BASE_URL}/${id}/read`, {}),
    );
  }

  readAllNotifications(): Promise<void> {
    return firstValueFrom(
      this.http.patch<void>(`${NOTIFICATIONS_BASE_URL}/read-all`, {}),
    );
  }

  readConversationNotifications(interestId: string): Promise<void> {
    return firstValueFrom(
      this.http.patch<void>(
        `${NOTIFICATIONS_BASE_URL}/conversations/${interestId}/read`,
        {},
      ),
    );
  }

  clearNotifications(): Promise<void> {
    return firstValueFrom(this.http.delete<void>(NOTIFICATIONS_BASE_URL));
  }

  async getRoute(points: Coordinates[]): Promise<Coordinates[]> {
    if (points.length < 2) {
      return points;
    }

    try {
      const coordinates = points.map((point) => `${point.lng},${point.lat}`).join(';');
      const response = await firstValueFrom(
        this.http.get<{
          routes?: Array<{ geometry?: { coordinates?: [number, number][] } }>;
        }>(`https://router.project-osrm.org/route/v1/driving/${coordinates}`, {
          params: { overview: 'full', geometries: 'geojson' },
        }),
      );

      const routePoints = (response?.routes?.[0]?.geometry?.coordinates || []).map(
        ([lng, lat]) => ({
          lat,
          lng,
        }),
      );

      return routePoints.length >= 2 ? routePoints : points;
    } catch {
      return points;
    }
  }

  verifyRideOtp(interestId: string, otp: string): Promise<Interest> {
    return firstValueFrom(
      this.http.patch<Interest>(`${INTERESTS_BASE_URL}/${interestId}/verify-otp`, {
        otp,
      }),
    );
  }

  startRide(postId: string): Promise<Commute> {
    return firstValueFrom(
      this.http.patch<Commute>(`${POSTS_BASE_URL}/${postId}/ride/start`, {}),
    );
  }

  endRide(postId: string): Promise<Commute> {
    return firstValueFrom(
      this.http.patch<Commute>(`${POSTS_BASE_URL}/${postId}/ride/end`, {}),
    );
  }
}