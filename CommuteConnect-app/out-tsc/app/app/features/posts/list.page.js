import { Component, DestroyRef, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { debounceTime, distinctUntilChanged, map } from 'rxjs';
import { ApiService } from '../../utils/api';
import { AuthService } from '../../core/auth.service';
import { errorMessage } from '../../core/errors';
import { FieldComponent } from '../../shared/field.component';
import { StateComponent } from '../../shared/state.component';
import { PaginationComponent } from '../../shared/pagination.component';
import { CommuteCardComponent } from '../../shared/commute-card.component';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
const _forTrack0 = ($index, $item) => $item.id;
function ListPage_Conditional_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 5);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" We couldn\u2019t load your commute search. ", ctx_r0.error(), " ");
} }
function ListPage_Conditional_28_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "cc-state", 16);
} }
function ListPage_Conditional_29_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "cc-state", 17);
} }
function ListPage_Conditional_30_For_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "cc-commute-card", 20);
} if (rf & 2) {
    const post_r3 = ctx.$implicit;
    i0.ɵɵproperty("post", post_r3);
} }
function ListPage_Conditional_30_Template(rf, ctx) { if (rf & 1) {
    const _r2 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "p", 18);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(2, "div", 19);
    i0.ɵɵrepeaterCreate(3, ListPage_Conditional_30_For_4_Template, 1, 1, "cc-commute-card", 20, _forTrack0);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "cc-pagination", 21);
    i0.ɵɵlistener("change", function ListPage_Conditional_30_Template_cc_pagination_change_5_listener($event) { i0.ɵɵrestoreView(_r2); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.load($event)); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r0.result().total, " upcoming commutes \u00B7 Times shown in your local timezone ");
    i0.ɵɵadvance(2);
    i0.ɵɵrepeater(ctx_r0.result().data);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("page", ctx_r0.page())("totalPages", ctx_r0.result().totalPages);
} }
export class ListPage {
    api = inject(ApiService);
    auth = inject(AuthService);
    firstName = computed(() => this.auth.user()?.name.trim().split(/\s+/)[0] || 'there', ...(ngDevMode ? [{ debugName: "firstName" }] : /* istanbul ignore next */ []));
    fb = inject(FormBuilder);
    destroyRef = inject(DestroyRef);
    form = this.fb.nonNullable.group({
        origin: ['', Validators.maxLength(120)],
        destination: ['', Validators.maxLength(120)],
    });
    result = signal(null, ...(ngDevMode ? [{ debugName: "result" }] : /* istanbul ignore next */ []));
    loading = signal(false, ...(ngDevMode ? [{ debugName: "loading" }] : /* istanbul ignore next */ []));
    error = signal('', ...(ngDevMode ? [{ debugName: "error" }] : /* istanbul ignore next */ []));
    page = signal(1, ...(ngDevMode ? [{ debugName: "page" }] : /* istanbul ignore next */ []));
    searched = signal(false, ...(ngDevMode ? [{ debugName: "searched" }] : /* istanbul ignore next */ []));
    query = { origin: '', destination: '' };
    lastQuery = '';
    request = 0;
    constructor() {
        this.form.valueChanges
            .pipe(debounceTime(400), map((value) => `${value.origin?.trim() || ''}|${value.destination?.trim() || ''}`), distinctUntilChanged(), takeUntilDestroyed(this.destroyRef))
            .subscribe(() => this.search(false));
    }
    search(markTouched = true) {
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
    swap() {
        const { origin, destination } = this.form.getRawValue();
        this.form.setValue({ origin: destination, destination: origin }, { emitEvent: false });
        this.lastQuery = '';
        this.search(false);
    }
    clear() {
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
    async load(page) {
        const request = ++this.request;
        this.page.set(page);
        this.loading.set(true);
        this.error.set('');
        try {
            const result = await this.api.getCommutes({ ...this.query, page });
            if (request === this.request) {
                this.result.set(result);
            }
        }
        catch (e) {
            if (request === this.request) {
                this.error.set(errorMessage(e));
            }
        }
        finally {
            if (request === this.request) {
                this.loading.set(false);
            }
        }
    }
    static ɵfac = function ListPage_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || ListPage)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: ListPage, selectors: [["ng-component"]], decls: 31, vars: 14, consts: [[1, "commute-home"], [1, "commute-welcome"], ["routerLink", "/commutes/new", 1, "button"], ["aria-hidden", "true"], ["src", "/commute-icon.svg", "alt", "", "aria-hidden", "true", 1, "inline-commute-icon", "inverted"], ["role", "alert", 1, "error-banner"], [1, "home-section-heading"], [1, "search-bar", "panel", 3, "ngSubmit", "formGroup"], [1, "route-search-fields"], ["fieldId", "origin", "label", "From", "placeholder", "e.g. Indiranagar", 3, "control", "maxLength"], ["type", "button", "aria-label", "Swap origin and destination", "title", "Swap route", 1, "swap-route", 3, "click", "disabled"], ["fieldId", "destination", "label", "To", "placeholder", "e.g. Whitefield", 3, "control", "maxLength"], [1, "search-actions"], ["type", "submit", 1, "button", 3, "disabled"], ["type", "button", 1, "button", "secondary", 3, "click", "disabled"], ["aria-live", "polite", 1, "search-behavior"], ["kind", "loading", "title", "Finding commutes\u2026"], ["title", "No commutes found", "message", "Try a different origin or destination, or offer a commute of your own."], [1, "results-caption"], [1, "card-grid"], [3, "post"], [3, "change", "page", "totalPages"]], template: function ListPage_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "section", 0)(1, "header", 1)(2, "h1");
            i0.ɵɵtext(3);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(4, "p");
            i0.ɵɵtext(5, "Where would you like to go today?");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(6, "a", 2)(7, "span", 3);
            i0.ɵɵtext(8, "\uFF0B");
            i0.ɵɵelementEnd();
            i0.ɵɵtext(9, " Offer a commute ");
            i0.ɵɵelement(10, "img", 4);
            i0.ɵɵelementEnd()();
            i0.ɵɵconditionalCreate(11, ListPage_Conditional_11_Template, 2, 1, "p", 5);
            i0.ɵɵelementStart(12, "div", 6)(13, "h2");
            i0.ɵɵtext(14, "Find your ride");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(15, "form", 7);
            i0.ɵɵlistener("ngSubmit", function ListPage_Template_form_ngSubmit_15_listener() { return ctx.search(); });
            i0.ɵɵelementStart(16, "div", 8);
            i0.ɵɵelement(17, "cc-field", 9);
            i0.ɵɵelementStart(18, "button", 10);
            i0.ɵɵlistener("click", function ListPage_Template_button_click_18_listener() { return ctx.swap(); });
            i0.ɵɵtext(19, " \u21C4 ");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(20, "cc-field", 11);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(21, "div", 12)(22, "button", 13);
            i0.ɵɵtext(23, "Search");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(24, "button", 14);
            i0.ɵɵlistener("click", function ListPage_Template_button_click_24_listener() { return ctx.clear(); });
            i0.ɵɵtext(25, " Clear ");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(26, "p", 15);
            i0.ɵɵtext(27);
            i0.ɵɵelementEnd()()();
            i0.ɵɵconditionalCreate(28, ListPage_Conditional_28_Template, 1, 0, "cc-state", 16)(29, ListPage_Conditional_29_Template, 1, 0, "cc-state", 17)(30, ListPage_Conditional_30_Template, 6, 3);
        } if (rf & 2) {
            let tmp_12_0;
            i0.ɵɵclassProp("has-results", ctx.searched());
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate1("Welcome, ", ctx.firstName(), ".");
            i0.ɵɵadvance(8);
            i0.ɵɵconditional(ctx.searched() && ctx.error() ? 11 : -1);
            i0.ɵɵadvance(4);
            i0.ɵɵproperty("formGroup", ctx.form);
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("control", ctx.form.controls.origin)("maxLength", 120);
            i0.ɵɵadvance();
            i0.ɵɵproperty("disabled", !ctx.form.controls.origin.value && !ctx.form.controls.destination.value);
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("control", ctx.form.controls.destination)("maxLength", 120);
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("disabled", ctx.loading());
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("disabled", ctx.loading() || !ctx.form.controls.origin.value && !ctx.form.controls.destination.value);
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate1(" ", ctx.loading() ? "Updating results\u2026" : "Results update as you type.", " ");
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.searched() && ctx.loading() ? 28 : ctx.searched() && !ctx.error() && !((tmp_12_0 = ctx.result()) == null ? null : tmp_12_0.data == null ? null : tmp_12_0.data.length) ? 29 : ctx.searched() && !ctx.error() && ((tmp_12_0 = ctx.result()) == null ? null : tmp_12_0.data == null ? null : tmp_12_0.data.length) ? 30 : -1);
        } }, dependencies: [ReactiveFormsModule, i1.ɵNgNoValidate, i1.NgControlStatusGroup, i1.FormGroupDirective, RouterLink,
            FieldComponent,
            StateComponent,
            PaginationComponent,
            CommuteCardComponent], encapsulation: 2 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ListPage, [{
        type: Component,
        args: [{ imports: [
                    ReactiveFormsModule,
                    RouterLink,
                    FieldComponent,
                    StateComponent,
                    PaginationComponent,
                    CommuteCardComponent,
                ], template: "<section class=\"commute-home\" [class.has-results]=\"searched()\">\n  <header class=\"commute-welcome\">\n    <h1>Welcome, {{ firstName() }}.</h1>\n    <p>Where would you like to go today?</p>\n    <a class=\"button\" routerLink=\"/commutes/new\">\n      <span aria-hidden=\"true\">\uFF0B</span>\n      Offer a commute\n      <img class=\"inline-commute-icon inverted\" src=\"/commute-icon.svg\" alt=\"\" aria-hidden=\"true\" />\n    </a>\n  </header>\n\n  @if (searched() && error()) {\n    <p class=\"error-banner\" role=\"alert\">\n      We couldn\u2019t load your commute search. {{ error() }}\n    </p>\n  }\n\n  <div class=\"home-section-heading\">\n    <h2>Find your ride</h2>\n  </div>\n\n  <form class=\"search-bar panel\" [formGroup]=\"form\" (ngSubmit)=\"search()\">\n    <div class=\"route-search-fields\">\n      <cc-field\n        fieldId=\"origin\"\n        label=\"From\"\n        placeholder=\"e.g. Indiranagar\"\n        [control]=\"form.controls.origin\"\n        [maxLength]=\"120\"\n      />\n      <button\n        class=\"swap-route\"\n        type=\"button\"\n        aria-label=\"Swap origin and destination\"\n        title=\"Swap route\"\n        (click)=\"swap()\"\n        [disabled]=\"!form.controls.origin.value && !form.controls.destination.value\"\n      >\n        \u21C4\n      </button>\n      <cc-field\n        fieldId=\"destination\"\n        label=\"To\"\n        placeholder=\"e.g. Whitefield\"\n        [control]=\"form.controls.destination\"\n        [maxLength]=\"120\"\n      />\n    </div>\n    <div class=\"search-actions\">\n      <button class=\"button\" type=\"submit\" [disabled]=\"loading()\">Search</button>\n      <button\n        class=\"button secondary\"\n        type=\"button\"\n        (click)=\"clear()\"\n        [disabled]=\"\n          loading() || (!form.controls.origin.value && !form.controls.destination.value)\n        \"\n      >\n        Clear\n      </button>\n    </div>\n    <p class=\"search-behavior\" aria-live=\"polite\">\n      {{ loading() ? 'Updating results\u2026' : 'Results update as you type.' }}\n    </p>\n  </form>\n</section>\n\n@if (searched() && loading()) {\n  <cc-state kind=\"loading\" title=\"Finding commutes\u2026\" />\n} @else if (searched() && !error() && !result()?.data?.length) {\n  <cc-state\n    title=\"No commutes found\"\n    message=\"Try a different origin or destination, or offer a commute of your own.\"\n  />\n} @else if (searched() && !error() && result()?.data?.length) {\n  <p class=\"results-caption\">\n    {{ result()!.total }} upcoming commutes \u00B7 Times shown in your local timezone\n  </p>\n  <div class=\"card-grid\">\n    @for (post of result()!.data; track post.id) {\n      <cc-commute-card [post]=\"post\" />\n    }\n  </div>\n  <cc-pagination\n    [page]=\"page()\"\n    [totalPages]=\"result()!.totalPages\"\n    (change)=\"load($event)\"\n  />\n}\n" }]
    }], () => [], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(ListPage, { className: "ListPage", filePath: "src/app/features/posts/list.page.ts", lineNumber: 26 }); })();