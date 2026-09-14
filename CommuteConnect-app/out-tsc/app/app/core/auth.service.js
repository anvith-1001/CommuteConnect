import { HttpErrorResponse } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { ApiService } from '../utils/api';
import * as i0 from "@angular/core";
export class AuthService {
    api = inject(ApiService);
    userState = signal(null, ...(ngDevMode ? [{ debugName: "userState" }] : /* istanbul ignore next */ []));
    tokenState = signal(null, ...(ngDevMode ? [{ debugName: "tokenState" }] : /* istanbul ignore next */ []));
    user = this.userState.asReadonly();
    token = this.tokenState.asReadonly();
    signedIn = computed(() => !!this.user(), ...(ngDevMode ? [{ debugName: "signedIn" }] : /* istanbul ignore next */ []));
    refreshInFlight = null;
    apply(result) {
        this.userState.set(result.user);
        this.tokenState.set(result.accessToken);
    }
    async login(data) {
        const result = await this.api.login(data);
        this.apply(result);
    }
    async register(data) {
        const result = await this.api.register(data);
        this.apply(result);
    }
    refresh() {
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
            .catch((error) => {
            if (this.signedIn() &&
                error instanceof HttpErrorResponse &&
                (error.status === 0 || error.status >= 500)) {
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
    async logout() {
        await this.api.logout();
        this.clear();
    }
    clear() {
        this.userState.set(null);
        this.tokenState.set(null);
    }
    setUser(user) {
        this.userState.set(user);
    }
    static ɵfac = function AuthService_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AuthService)(); };
    static ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: AuthService, factory: AuthService.ɵfac, providedIn: 'root' });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AuthService, [{
        type: Injectable,
        args: [{ providedIn: 'root' }]
    }], null, null); })();