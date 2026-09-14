import { DatePipe } from '@angular/common';
import { Component, HostListener, effect, inject, signal, } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from './core/auth.service';
import { errorMessage } from './core/errors';
import { ApiService } from './utils/api';
import * as i0 from "@angular/core";
const _c0 = () => ({ exact: true });
const _forTrack0 = ($index, $item) => $item.id;
function AppComponent_Conditional_6_Conditional_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 16);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r1.unreadNotifications() > 99 ? "99+" : ctx_r1.unreadNotifications(), " ");
} }
function AppComponent_Conditional_6_Conditional_11_Conditional_4_Template(rf, ctx) { if (rf & 1) {
    const _r3 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 27);
    i0.ɵɵlistener("click", function AppComponent_Conditional_6_Conditional_11_Conditional_4_Template_button_click_0_listener($event) { i0.ɵɵrestoreView(_r3); const ctx_r1 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r1.markAllNotificationsRead($event)); });
    i0.ɵɵtext(1, " Mark all read ");
    i0.ɵɵelementEnd();
} }
function AppComponent_Conditional_6_Conditional_11_Conditional_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 23);
    i0.ɵɵtext(1, "Loading\u2026");
    i0.ɵɵelementEnd();
} }
function AppComponent_Conditional_6_Conditional_11_Conditional_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 24);
    i0.ɵɵtext(1, "Couldn\u2019t load notifications.");
    i0.ɵɵelementEnd();
} }
function AppComponent_Conditional_6_Conditional_11_Conditional_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 23);
    i0.ɵɵtext(1, "You\u2019re all caught up.");
    i0.ɵɵelementEnd();
} }
function AppComponent_Conditional_6_Conditional_11_Conditional_8_For_2_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "li")(1, "button", 27);
    i0.ɵɵlistener("click", function AppComponent_Conditional_6_Conditional_11_Conditional_8_For_2_Template_button_click_1_listener() { const notification_r5 = i0.ɵɵrestoreView(_r4).$implicit; const ctx_r1 = i0.ɵɵnextContext(4); return i0.ɵɵresetView(ctx_r1.openNotification(notification_r5)); });
    i0.ɵɵelementStart(2, "span")(3, "strong");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "small");
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(7, "time");
    i0.ɵɵtext(8);
    i0.ɵɵpipe(9, "date");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const notification_r5 = ctx.$implicit;
    i0.ɵɵclassProp("unread", !notification_r5.readAt);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(notification_r5.title);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(notification_r5.body);
    i0.ɵɵadvance();
    i0.ɵɵattribute("datetime", notification_r5.createdAt);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind2(9, 6, notification_r5.createdAt, "short"), " ");
} }
function AppComponent_Conditional_6_Conditional_11_Conditional_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "ol", 25);
    i0.ɵɵrepeaterCreate(1, AppComponent_Conditional_6_Conditional_11_Conditional_8_For_2_Template, 10, 9, "li", 28, _forTrack0);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance();
    i0.ɵɵrepeater(ctx_r1.notifications());
} }
function AppComponent_Conditional_6_Conditional_11_Conditional_9_Conditional_1_Template(rf, ctx) { if (rf & 1) {
    const _r6 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1, "Clear every notification?");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(2, "button", 27);
    i0.ɵɵlistener("click", function AppComponent_Conditional_6_Conditional_11_Conditional_9_Conditional_1_Template_button_click_2_listener($event) { i0.ɵɵrestoreView(_r6); const ctx_r1 = i0.ɵɵnextContext(4); return i0.ɵɵresetView(ctx_r1.clearNotifications($event)); });
    i0.ɵɵtext(3, " Yes, clear ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "button", 27);
    i0.ɵɵlistener("click", function AppComponent_Conditional_6_Conditional_11_Conditional_9_Conditional_1_Template_button_click_4_listener() { i0.ɵɵrestoreView(_r6); const ctx_r1 = i0.ɵɵnextContext(4); return i0.ɵɵresetView(ctx_r1.confirmClearNotifications.set(false)); });
    i0.ɵɵtext(5, " Cancel ");
    i0.ɵɵelementEnd();
} }
function AppComponent_Conditional_6_Conditional_11_Conditional_9_Conditional_2_Template(rf, ctx) { if (rf & 1) {
    const _r7 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 27);
    i0.ɵɵlistener("click", function AppComponent_Conditional_6_Conditional_11_Conditional_9_Conditional_2_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r7); const ctx_r1 = i0.ɵɵnextContext(4); return i0.ɵɵresetView(ctx_r1.confirmClearNotifications.set(true)); });
    i0.ɵɵtext(1, " Clear notifications ");
    i0.ɵɵelementEnd();
} }
function AppComponent_Conditional_6_Conditional_11_Conditional_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 26);
    i0.ɵɵconditionalCreate(1, AppComponent_Conditional_6_Conditional_11_Conditional_9_Conditional_1_Template, 6, 0)(2, AppComponent_Conditional_6_Conditional_11_Conditional_9_Conditional_2_Template, 2, 0, "button", 22);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r1.confirmClearNotifications() ? 1 : 2);
} }
function AppComponent_Conditional_6_Conditional_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "section", 17)(1, "div", 21)(2, "h2");
    i0.ɵɵtext(3, "Notifications");
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(4, AppComponent_Conditional_6_Conditional_11_Conditional_4_Template, 2, 0, "button", 22);
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(5, AppComponent_Conditional_6_Conditional_11_Conditional_5_Template, 2, 0, "p", 23)(6, AppComponent_Conditional_6_Conditional_11_Conditional_6_Template, 2, 0, "p", 24)(7, AppComponent_Conditional_6_Conditional_11_Conditional_7_Template, 2, 0, "p", 23)(8, AppComponent_Conditional_6_Conditional_11_Conditional_8_Template, 3, 0, "ol", 25);
    i0.ɵɵconditionalCreate(9, AppComponent_Conditional_6_Conditional_11_Conditional_9_Template, 3, 1, "div", 26);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(4);
    i0.ɵɵconditional(ctx_r1.unreadNotifications() ? 4 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r1.notificationsLoading() ? 5 : ctx_r1.notificationsError() ? 6 : !ctx_r1.notifications().length ? 7 : 8);
    i0.ɵɵadvance(4);
    i0.ɵɵconditional(ctx_r1.notifications().length ? 9 : -1);
} }
function AppComponent_Conditional_6_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "nav", 4)(1, "a", 9)(2, "span", 10);
    i0.ɵɵtext(3, "Find a commute");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "span", 11);
    i0.ɵɵtext(5, "Find");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(6, "div", 12);
    i0.ɵɵlistener("click", function AppComponent_Conditional_6_Template_div_click_6_listener($event) { return $event.stopPropagation(); });
    i0.ɵɵelementStart(7, "button", 13);
    i0.ɵɵlistener("click", function AppComponent_Conditional_6_Template_button_click_7_listener($event) { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.toggleNotifications($event)); });
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(8, "svg", 14);
    i0.ɵɵelement(9, "path", 15);
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(10, AppComponent_Conditional_6_Conditional_10_Template, 2, 1, "span", 16);
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(11, AppComponent_Conditional_6_Conditional_11_Template, 10, 3, "section", 17);
    i0.ɵɵelementEnd();
    i0.ɵɵnamespaceHTML();
    i0.ɵɵelementStart(12, "a", 18)(13, "span", 10);
    i0.ɵɵtext(14, "My dashboard");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(15, "span", 11);
    i0.ɵɵtext(16, "Dashboard");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(17, "a", 19);
    i0.ɵɵtext(18, "Profile");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(19, "button", 20);
    i0.ɵɵlistener("click", function AppComponent_Conditional_6_Template_button_click_19_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.confirmSignOut.set(true)); });
    i0.ɵɵtext(20, " Sign out ");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("routerLinkActiveOptions", i0.ɵɵpureFunction0(5, _c0));
    i0.ɵɵadvance(6);
    i0.ɵɵattribute("aria-expanded", ctx_r1.notificationsOpen());
    i0.ɵɵadvance(3);
    i0.ɵɵconditional(ctx_r1.unreadNotifications() ? 10 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r1.notificationsOpen() ? 11 : -1);
    i0.ɵɵadvance(8);
    i0.ɵɵproperty("disabled", ctx_r1.busy());
} }
function AppComponent_Conditional_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 5);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r1.error());
} }
function AppComponent_Conditional_10_Template(rf, ctx) { if (rf & 1) {
    const _r8 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 29);
    i0.ɵɵlistener("click", function AppComponent_Conditional_10_Template_div_click_0_listener() { i0.ɵɵrestoreView(_r8); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.confirmSignOut.set(false)); });
    i0.ɵɵelementStart(1, "section", 30);
    i0.ɵɵlistener("click", function AppComponent_Conditional_10_Template_section_click_1_listener($event) { return $event.stopPropagation(); });
    i0.ɵɵelementStart(2, "p", 31);
    i0.ɵɵtext(3, "ACCOUNT");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "h2", 32);
    i0.ɵɵtext(5, "Sign out of CommuteConnect?");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "p");
    i0.ɵɵtext(7, "You\u2019ll need to sign in again to view your commutes and conversations.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "div", 33)(9, "button", 34);
    i0.ɵɵlistener("click", function AppComponent_Conditional_10_Template_button_click_9_listener() { i0.ɵɵrestoreView(_r8); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.logout()); });
    i0.ɵɵtext(10);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "button", 35);
    i0.ɵɵlistener("click", function AppComponent_Conditional_10_Template_button_click_11_listener() { i0.ɵɵrestoreView(_r8); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.confirmSignOut.set(false)); });
    i0.ɵɵtext(12, " Cancel ");
    i0.ɵɵelementEnd()()()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(9);
    i0.ɵɵproperty("disabled", ctx_r1.busy());
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r1.busy() ? "Signing out\u2026" : "Sign out", " ");
    i0.ɵɵadvance();
    i0.ɵɵproperty("disabled", ctx_r1.busy());
} }
export class AppComponent {
    auth = inject(AuthService);
    router = inject(Router);
    api = inject(ApiService);
    notificationTimer;
    knownNotificationIds = new Set();
    notificationsInitialized = false;
    busy = signal(false, ...(ngDevMode ? [{ debugName: "busy" }] : /* istanbul ignore next */ []));
    confirmSignOut = signal(false, ...(ngDevMode ? [{ debugName: "confirmSignOut" }] : /* istanbul ignore next */ []));
    error = signal('', ...(ngDevMode ? [{ debugName: "error" }] : /* istanbul ignore next */ []));
    notifications = signal([], ...(ngDevMode ? [{ debugName: "notifications" }] : /* istanbul ignore next */ []));
    unreadNotifications = signal(0, ...(ngDevMode ? [{ debugName: "unreadNotifications" }] : /* istanbul ignore next */ []));
    notificationsOpen = signal(false, ...(ngDevMode ? [{ debugName: "notificationsOpen" }] : /* istanbul ignore next */ []));
    notificationsLoading = signal(false, ...(ngDevMode ? [{ debugName: "notificationsLoading" }] : /* istanbul ignore next */ []));
    notificationsError = signal('', ...(ngDevMode ? [{ debugName: "notificationsError" }] : /* istanbul ignore next */ []));
    confirmClearNotifications = signal(false, ...(ngDevMode ? [{ debugName: "confirmClearNotifications" }] : /* istanbul ignore next */ []));
    browserNotificationPermission = signal('Notification' in window ? Notification.permission : 'unsupported', ...(ngDevMode ? [{ debugName: "browserNotificationPermission" }] : /* istanbul ignore next */ []));
    constructor() {
        effect(() => {
            if (this.auth.signedIn()) {
                this.startNotificationPolling();
            }
            else {
                this.stopNotificationPolling();
                this.notifications.set([]);
                this.unreadNotifications.set(0);
                this.knownNotificationIds.clear();
                this.notificationsInitialized = false;
            }
        });
    }
    ngOnDestroy() {
        this.stopNotificationPolling();
    }
    closeDialog() {
        this.notificationsOpen.set(false);
        this.confirmClearNotifications.set(false);
        if (!this.busy()) {
            this.confirmSignOut.set(false);
        }
    }
    toggleNotifications(event) {
        event.stopPropagation();
        this.notificationsOpen.update((open) => !open);
        if (this.notificationsOpen()) {
            void this.loadNotifications();
        }
    }
    closeNotifications() {
        this.notificationsOpen.set(false);
    }
    async openNotification(notification) {
        this.notificationsOpen.set(false);
        if (!notification.readAt) {
            this.markNotificationRead(notification.id);
            try {
                await this.api.readNotification(notification.id);
            }
            catch {
                void this.loadNotifications(false);
            }
        }
        const fragment = this.notificationTarget(notification);
        await this.router.navigate(['/commutes', notification.postId], {
            fragment,
            queryParams: notification.type === 'new_message'
                ? { conversation: notification.interestId }
                : undefined,
        });
        requestAnimationFrame(() => {
            document.getElementById(fragment)?.scrollIntoView({
                behavior: 'smooth',
                block: 'center',
            });
        });
    }
    notificationTarget(notification) {
        switch (notification.type) {
            case 'interest_received':
                return 'passengers';
            case 'new_message':
                return 'conversations';
            case 'ride_started':
            case 'ride_ended':
                return 'ride-status';
            case 'interest_accepted':
            default:
                return 'ride-details';
        }
    }
    async markAllNotificationsRead(event) {
        event.stopPropagation();
        try {
            await this.api.readAllNotifications();
            this.notifications.update((items) => items.map((item) => ({
                ...item,
                readAt: item.readAt || new Date().toISOString(),
            })));
            this.unreadNotifications.set(0);
        }
        catch (e) {
            this.notificationsError.set(errorMessage(e));
        }
    }
    async enableBrowserNotifications(event) {
        event.stopPropagation();
        if (!('Notification' in window)) {
            return;
        }
        this.browserNotificationPermission.set(await Notification.requestPermission());
    }
    async clearNotifications(event) {
        event.stopPropagation();
        try {
            await this.api.clearNotifications();
            this.notifications.set([]);
            this.unreadNotifications.set(0);
            this.knownNotificationIds.clear();
            this.confirmClearNotifications.set(false);
        }
        catch (e) {
            this.notificationsError.set(errorMessage(e));
        }
    }
    async logout() {
        this.busy.set(true);
        this.error.set('');
        try {
            await this.auth.logout();
            this.confirmSignOut.set(false);
            await this.router.navigate(['/login']);
        }
        catch (e) {
            this.error.set(errorMessage(e));
        }
        finally {
            this.busy.set(false);
        }
    }
    startNotificationPolling() {
        if (this.notificationTimer) {
            return;
        }
        void this.loadNotifications();
        this.notificationTimer = setInterval(() => {
            void this.loadNotifications(false);
        }, 20000);
    }
    stopNotificationPolling() {
        if (this.notificationTimer) {
            clearInterval(this.notificationTimer);
            this.notificationTimer = undefined;
        }
    }
    async loadNotifications(showLoading = true) {
        if (showLoading) {
            this.notificationsLoading.set(true);
        }
        this.notificationsError.set('');
        try {
            const feed = await this.api.getNotifications();
            this.showBrowserNotifications(feed.data);
            this.notifications.set(feed.data);
            this.unreadNotifications.set(feed.unreadCount);
        }
        catch (e) {
            if (showLoading) {
                this.notificationsError.set(errorMessage(e));
            }
        }
        finally {
            this.notificationsLoading.set(false);
        }
    }
    markNotificationRead(id) {
        this.notifications.update((items) => items.map((item) => item.id === id ? { ...item, readAt: new Date().toISOString() } : item));
        this.unreadNotifications.update((count) => Math.max(0, count - 1));
    }
    showBrowserNotifications(items) {
        if (this.notificationsInitialized &&
            this.browserNotificationPermission() === 'granted') {
            for (const item of items) {
                if (!item.readAt && !this.knownNotificationIds.has(item.id)) {
                    const notification = new Notification(item.title, {
                        body: item.body,
                        tag: item.id,
                    });
                    notification.onclick = () => {
                        window.focus();
                        void this.openNotification(item);
                        notification.close();
                    };
                }
            }
        }
        for (const item of items) {
            this.knownNotificationIds.add(item.id);
        }
        this.notificationsInitialized = true;
    }
    static ɵfac = function AppComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AppComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: AppComponent, selectors: [["app-root"]], hostBindings: function AppComponent_HostBindings(rf, ctx) { if (rf & 1) {
            i0.ɵɵlistener("keydown.escape", function AppComponent_keydown_escape_HostBindingHandler() { return ctx.closeDialog(); }, i0.ɵɵresolveDocument)("click", function AppComponent_click_HostBindingHandler() { return ctx.closeNotifications(); }, i0.ɵɵresolveDocument);
        } }, decls: 16, vars: 3, consts: [["href", "#main", 1, "skip-link"], [1, "site-header"], ["routerLink", "/commutes", 1, "brand"], ["src", "/commute-icon.svg", "alt", "", "aria-hidden", "true", 1, "brand-mark"], ["aria-label", "Main navigation"], ["role", "alert", 1, "error-banner"], ["id", "main", "tabindex", "-1"], [1, "dialog-backdrop"], [1, "site-footer"], ["routerLink", "/commutes", "routerLinkActive", "active", "aria-label", "Find a commute", 3, "routerLinkActiveOptions"], [1, "nav-label-wide"], [1, "nav-label-compact"], [1, "notification-menu", 3, "click"], ["type", "button", "aria-label", "Notifications", 1, "notification-button", 3, "click"], ["aria-hidden", "true", "viewBox", "0 0 24 24"], ["d", "M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4"], [1, "notification-count"], ["aria-label", "Notifications", 1, "notification-popover"], ["routerLink", "/dashboard", "routerLinkActive", "active", "aria-label", "My dashboard"], ["routerLink", "/profile", "routerLinkActive", "active"], ["type", "button", 1, "nav-button", 3, "click", "disabled"], [1, "notification-heading"], ["type", "button"], [1, "notification-state"], ["role", "alert", 1, "notification-state"], [1, "notification-list"], [1, "notification-footer"], ["type", "button", 3, "click"], [3, "unread"], [1, "dialog-backdrop", 3, "click"], ["role", "dialog", "aria-modal", "true", "aria-labelledby", "sign-out-title", 1, "confirm-dialog", 3, "click"], [1, "eyebrow"], ["id", "sign-out-title"], [1, "actions"], ["type", "button", 1, "button", "danger", 3, "click", "disabled"], ["type", "button", "autofocus", "", 1, "button", "secondary", 3, "click", "disabled"]], template: function AppComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "a", 0);
            i0.ɵɵtext(1, "Skip to content");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(2, "header", 1)(3, "a", 2);
            i0.ɵɵelement(4, "img", 3);
            i0.ɵɵtext(5, " CommuteConnect ");
            i0.ɵɵelementEnd();
            i0.ɵɵconditionalCreate(6, AppComponent_Conditional_6_Template, 21, 6, "nav", 4);
            i0.ɵɵelementEnd();
            i0.ɵɵconditionalCreate(7, AppComponent_Conditional_7_Template, 2, 1, "p", 5);
            i0.ɵɵelementStart(8, "main", 6);
            i0.ɵɵelement(9, "router-outlet");
            i0.ɵɵelementEnd();
            i0.ɵɵconditionalCreate(10, AppComponent_Conditional_10_Template, 13, 3, "div", 7);
            i0.ɵɵelementStart(11, "footer", 8)(12, "span");
            i0.ɵɵtext(13, "CommuteConnect");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(14, "span");
            i0.ɵɵtext(15, "A little company for your commute.");
            i0.ɵɵelementEnd()();
        } if (rf & 2) {
            i0.ɵɵadvance(6);
            i0.ɵɵconditional(ctx.auth.signedIn() ? 6 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.error() ? 7 : -1);
            i0.ɵɵadvance(3);
            i0.ɵɵconditional(ctx.confirmSignOut() ? 10 : -1);
        } }, dependencies: [RouterOutlet, RouterLink, RouterLinkActive, DatePipe], encapsulation: 2 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AppComponent, [{
        type: Component,
        args: [{ selector: 'app-root', imports: [DatePipe, RouterOutlet, RouterLink, RouterLinkActive], template: "<a class=\"skip-link\" href=\"#main\">Skip to content</a>\n<header class=\"site-header\">\n  <a class=\"brand\" routerLink=\"/commutes\">\n    <img class=\"brand-mark\" src=\"/commute-icon.svg\" alt=\"\" aria-hidden=\"true\" />\n    CommuteConnect\n  </a>\n  @if (auth.signedIn()) {\n    <nav aria-label=\"Main navigation\">\n      <a\n        routerLink=\"/commutes\"\n        routerLinkActive=\"active\"\n        [routerLinkActiveOptions]=\"{ exact: true }\"\n        aria-label=\"Find a commute\"\n      >\n        <span class=\"nav-label-wide\">Find a commute</span>\n        <span class=\"nav-label-compact\">Find</span>\n      </a>\n      <div class=\"notification-menu\" (click)=\"$event.stopPropagation()\">\n        <button\n          class=\"notification-button\"\n          type=\"button\"\n          aria-label=\"Notifications\"\n          [attr.aria-expanded]=\"notificationsOpen()\"\n          (click)=\"toggleNotifications($event)\"\n        >\n          <svg aria-hidden=\"true\" viewBox=\"0 0 24 24\">\n            <path d=\"M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4\" />\n          </svg>\n          @if (unreadNotifications()) {\n            <span class=\"notification-count\">\n              {{ unreadNotifications() > 99 ? '99+' : unreadNotifications() }}\n            </span>\n          }\n        </button>\n        @if (notificationsOpen()) {\n          <section class=\"notification-popover\" aria-label=\"Notifications\">\n            <div class=\"notification-heading\">\n              <h2>Notifications</h2>\n              @if (unreadNotifications()) {\n                <button type=\"button\" (click)=\"markAllNotificationsRead($event)\">\n                  Mark all read\n                </button>\n              }\n            </div>\n            @if (notificationsLoading()) {\n              <p class=\"notification-state\">Loading\u2026</p>\n            } @else if (notificationsError()) {\n              <p class=\"notification-state\" role=\"alert\">Couldn\u2019t load notifications.</p>\n            } @else if (!notifications().length) {\n              <p class=\"notification-state\">You\u2019re all caught up.</p>\n            } @else {\n              <ol class=\"notification-list\">\n                @for (notification of notifications(); track notification.id) {\n                  <li [class.unread]=\"!notification.readAt\">\n                    <button type=\"button\" (click)=\"openNotification(notification)\">\n                      <span>\n                        <strong>{{ notification.title }}</strong>\n                        <small>{{ notification.body }}</small>\n                      </span>\n                      <time [attr.datetime]=\"notification.createdAt\">\n                        {{ notification.createdAt | date: 'short' }}\n                      </time>\n                    </button>\n                  </li>\n                }\n              </ol>\n            }\n            @if (notifications().length) {\n              <div class=\"notification-footer\">\n                @if (confirmClearNotifications()) {\n                  <span>Clear every notification?</span>\n                  <button type=\"button\" (click)=\"clearNotifications($event)\">\n                    Yes, clear\n                  </button>\n                  <button type=\"button\" (click)=\"confirmClearNotifications.set(false)\">\n                    Cancel\n                  </button>\n                } @else {\n                  <button type=\"button\" (click)=\"confirmClearNotifications.set(true)\">\n                    Clear notifications\n                  </button>\n                }\n              </div>\n            }\n          </section>\n        }\n      </div>\n      <a\n        routerLink=\"/dashboard\"\n        routerLinkActive=\"active\"\n        aria-label=\"My dashboard\"\n      >\n        <span class=\"nav-label-wide\">My dashboard</span>\n        <span class=\"nav-label-compact\">Dashboard</span>\n      </a>\n      <a routerLink=\"/profile\" routerLinkActive=\"active\">Profile</a>\n      <button\n        class=\"nav-button\"\n        type=\"button\"\n        (click)=\"confirmSignOut.set(true)\"\n        [disabled]=\"busy()\"\n      >\n        Sign out\n      </button>\n    </nav>\n  }\n</header>\n@if (error()) {\n  <p class=\"error-banner\" role=\"alert\">{{ error() }}</p>\n}\n<main id=\"main\" tabindex=\"-1\"><router-outlet /></main>\n@if (confirmSignOut()) {\n  <div class=\"dialog-backdrop\" (click)=\"confirmSignOut.set(false)\">\n    <section\n      class=\"confirm-dialog\"\n      role=\"dialog\"\n      aria-modal=\"true\"\n      aria-labelledby=\"sign-out-title\"\n      (click)=\"$event.stopPropagation()\"\n    >\n      <p class=\"eyebrow\">ACCOUNT</p>\n      <h2 id=\"sign-out-title\">Sign out of CommuteConnect?</h2>\n      <p>You\u2019ll need to sign in again to view your commutes and conversations.</p>\n      <div class=\"actions\">\n        <button\n          class=\"button danger\"\n          type=\"button\"\n          (click)=\"logout()\"\n          [disabled]=\"busy()\"\n        >\n          {{ busy() ? 'Signing out\u2026' : 'Sign out' }}\n        </button>\n        <button\n          class=\"button secondary\"\n          type=\"button\"\n          (click)=\"confirmSignOut.set(false)\"\n          [disabled]=\"busy()\"\n          autofocus\n        >\n          Cancel\n        </button>\n      </div>\n    </section>\n  </div>\n}\n<footer class=\"site-footer\">\n  <span>CommuteConnect</span>\n  <span>A little company for your commute.</span>\n</footer>\n" }]
    }], () => [], { closeDialog: [{
            type: HostListener,
            args: ['document:keydown.escape']
        }], closeNotifications: [{
            type: HostListener,
            args: ['document:click']
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(AppComponent, { className: "AppComponent", filePath: "src/app/app.component.ts", lineNumber: 21 }); })();