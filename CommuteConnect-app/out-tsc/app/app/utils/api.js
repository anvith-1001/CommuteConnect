// Centralized functions
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { CHAT_SERVER_URL } from '../generated-config';
import * as i0 from "@angular/core";
export const API_BASE_URL = '/api';
const AUTH_BASE_URL = `${API_BASE_URL}/auth`;
const POSTS_BASE_URL = `${API_BASE_URL}/posts`;
const INTERESTS_BASE_URL = `${API_BASE_URL}/interests`;
const NOTIFICATIONS_BASE_URL = `${API_BASE_URL}/notifications`;
export const CHAT_SOCKET_URL = `${CHAT_SERVER_URL}/chat`;
export const CHAT_SOCKET_PATH = '/socket.io';
export function isApiRequest(url) {
    return url.startsWith(`${API_BASE_URL}/`);
}
export function isAuthRequest(url) {
    return url.startsWith(`${AUTH_BASE_URL}/`);
}
export class ApiService {
    http = inject(HttpClient);
    login(data) {
        return firstValueFrom(this.http.post(`${AUTH_BASE_URL}/login`, data));
    }
    register(data) {
        return firstValueFrom(this.http.post(`${AUTH_BASE_URL}/register`, data));
    }
    refreshSession() {
        return firstValueFrom(this.http.post(`${AUTH_BASE_URL}/refresh`, {}));
    }
    logout() {
        return firstValueFrom(this.http.post(`${AUTH_BASE_URL}/logout`, {}));
    }
    getCurrentUser() {
        return firstValueFrom(this.http.get(`${API_BASE_URL}/users/me`));
    }
    updateProfile(data) {
        return firstValueFrom(this.http.patch(`${API_BASE_URL}/users/me`, data));
    }
    deleteAccount(password) {
        return firstValueFrom(this.http.delete(`${API_BASE_URL}/users/me`, { body: { password } }));
    }
    getCommutes(params) {
        return firstValueFrom(this.http.get(POSTS_BASE_URL, { params }));
    }
    getMyCommutes(view, page, limit = 12) {
        return firstValueFrom(this.http.get(`${POSTS_BASE_URL}/mine`, {
            params: { view, page, limit },
        }));
    }
    getCommute(id) {
        return firstValueFrom(this.http.get(`${POSTS_BASE_URL}/${id}`));
    }
    createCommute(draft) {
        return firstValueFrom(this.http.post(POSTS_BASE_URL, draft));
    }
    updateCommute(id, seats) {
        return firstValueFrom(this.http.put(`${POSTS_BASE_URL}/${id}`, { seats }));
    }
    deleteCommute(id) {
        return firstValueFrom(this.http.delete(`${POSTS_BASE_URL}/${id}`));
    }
    expressInterest(postId, pickup) {
        const body = {};
        if (pickup?.lat != null && pickup?.lng != null) {
            body.pickupLat = pickup.lat;
            body.pickupLng = pickup.lng;
        }
        return firstValueFrom(this.http.post(`${POSTS_BASE_URL}/${postId}/interests`, body));
    }
    withdrawInterest(id) {
        return firstValueFrom(this.http.patch(`${INTERESTS_BASE_URL}/${id}/withdraw`, {}));
    }
    decideInterest(id, status) {
        return firstValueFrom(this.http.patch(`${INTERESTS_BASE_URL}/${id}/decision`, { status }));
    }
    getPostInterests(postId, page = 1) {
        return firstValueFrom(this.http.get(`${POSTS_BASE_URL}/${postId}/interests`, {
            params: { page },
        }));
    }
    getMyInterests(view, page, limit = 12) {
        return firstValueFrom(this.http.get(`${INTERESTS_BASE_URL}/mine`, {
            params: { view, page, limit },
        }));
    }
    getMessages(interestId) {
        return firstValueFrom(this.http.get(`${INTERESTS_BASE_URL}/${interestId}/messages`));
    }
    getNotifications() {
        return firstValueFrom(this.http.get(NOTIFICATIONS_BASE_URL));
    }
    readNotification(id) {
        return firstValueFrom(this.http.patch(`${NOTIFICATIONS_BASE_URL}/${id}/read`, {}));
    }
    readAllNotifications() {
        return firstValueFrom(this.http.patch(`${NOTIFICATIONS_BASE_URL}/read-all`, {}));
    }
    readConversationNotifications(interestId) {
        return firstValueFrom(this.http.patch(`${NOTIFICATIONS_BASE_URL}/conversations/${interestId}/read`, {}));
    }
    clearNotifications() {
        return firstValueFrom(this.http.delete(NOTIFICATIONS_BASE_URL));
    }
    async getRoute(points) {
        if (points.length < 2) {
            return points;
        }
        try {
            const coordinates = points.map((point) => `${point.lng},${point.lat}`).join(';');
            const response = await firstValueFrom(this.http.get(`https://router.project-osrm.org/route/v1/driving/${coordinates}`, {
                params: { overview: 'full', geometries: 'geojson' },
            }));
            const routePoints = (response?.routes?.[0]?.geometry?.coordinates || []).map(([lng, lat]) => ({
                lat,
                lng,
            }));
            return routePoints.length >= 2 ? routePoints : points;
        }
        catch {
            return points;
        }
    }
    verifyRideOtp(interestId, otp) {
        return firstValueFrom(this.http.patch(`${INTERESTS_BASE_URL}/${interestId}/verify-otp`, {
            otp,
        }));
    }
    startRide(postId) {
        return firstValueFrom(this.http.patch(`${POSTS_BASE_URL}/${postId}/ride/start`, {}));
    }
    endRide(postId) {
        return firstValueFrom(this.http.patch(`${POSTS_BASE_URL}/${postId}/ride/end`, {}));
    }
    static ɵfac = function ApiService_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || ApiService)(); };
    static ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: ApiService, factory: ApiService.ɵfac, providedIn: 'root' });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ApiService, [{
        type: Injectable,
        args: [{ providedIn: 'root' }]
    }], null, null); })();