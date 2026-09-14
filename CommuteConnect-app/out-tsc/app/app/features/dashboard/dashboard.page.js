import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../utils/api';
import { errorMessage } from '../../core/errors';
import { CommuteCardComponent } from '../../shared/commute-card.component';
import { StateComponent } from '../../shared/state.component';
import * as i0 from "@angular/core";
const _forTrack0 = ($index, $item) => $item.id;
function DashboardPage_Conditional_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "cc-state", 2);
} }
function DashboardPage_Conditional_9_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "cc-state", 6);
    i0.ɵɵlistener("retry", function DashboardPage_Conditional_9_Template_cc_state_retry_0_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.load()); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵproperty("message", ctx_r1.error());
} }
function DashboardPage_Conditional_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "cc-state", 4);
} }
function DashboardPage_Conditional_11_For_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "cc-commute-card", 7);
} if (rf & 2) {
    const post_r3 = ctx.$implicit;
    i0.ɵɵproperty("post", post_r3);
} }
function DashboardPage_Conditional_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 5);
    i0.ɵɵrepeaterCreate(1, DashboardPage_Conditional_11_For_2_Template, 1, 1, "cc-commute-card", 7, _forTrack0);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵrepeater(ctx_r1.cards());
} }
export class DashboardPage {
    api = inject(ApiService);
    cards = signal([], ...(ngDevMode ? [{ debugName: "cards" }] : /* istanbul ignore next */ []));
    loading = signal(true, ...(ngDevMode ? [{ debugName: "loading" }] : /* istanbul ignore next */ []));
    error = signal('', ...(ngDevMode ? [{ debugName: "error" }] : /* istanbul ignore next */ []));
    constructor() {
        void this.load();
    }
    async load() {
        this.loading.set(true);
        this.error.set('');
        try {
            const [commutes, interests] = await Promise.all([
                this.api.getMyCommutes('current', 1, 50),
                this.api.getMyInterests('current', 1, 50),
            ]);
            const joinedCommutes = interests.data.flatMap((interest) => interest.post ? [interest.post] : []);
            this.cards.set([...commutes.data, ...joinedCommutes].sort((left, right) => new Date(left.departureAt).getTime() - new Date(right.departureAt).getTime()));
        }
        catch (error) {
            this.error.set(errorMessage(error));
        }
        finally {
            this.loading.set(false);
        }
    }
    static ɵfac = function DashboardPage_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || DashboardPage)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: DashboardPage, selectors: [["ng-component"]], decls: 12, vars: 1, consts: [[1, "page-heading"], ["routerLink", "/commutes/new", 1, "button"], ["kind", "loading", "title", "Loading your dashboard\u2026"], ["kind", "error", "title", "Couldn\u2019t load your dashboard", 3, "message"], ["title", "No upcoming commutes", "message", "Offer a commute or find a ride for your next journey."], [1, "card-grid"], ["kind", "error", "title", "Couldn\u2019t load your dashboard", 3, "retry", "message"], [3, "post"]], template: function DashboardPage_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "section", 0)(1, "div")(2, "h1");
            i0.ɵɵtext(3, "My dashboard");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(4, "p");
            i0.ɵɵtext(5, "Your upcoming commutes and active interests.");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(6, "a", 1);
            i0.ɵɵtext(7, "+ Offer a commute");
            i0.ɵɵelementEnd()();
            i0.ɵɵconditionalCreate(8, DashboardPage_Conditional_8_Template, 1, 0, "cc-state", 2)(9, DashboardPage_Conditional_9_Template, 1, 1, "cc-state", 3)(10, DashboardPage_Conditional_10_Template, 1, 0, "cc-state", 4)(11, DashboardPage_Conditional_11_Template, 3, 0, "div", 5);
        } if (rf & 2) {
            i0.ɵɵadvance(8);
            i0.ɵɵconditional(ctx.loading() ? 8 : ctx.error() ? 9 : !ctx.cards().length ? 10 : 11);
        } }, dependencies: [RouterLink, CommuteCardComponent, StateComponent], encapsulation: 2 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(DashboardPage, [{
        type: Component,
        args: [{ imports: [RouterLink, CommuteCardComponent, StateComponent], template: "<section class=\"page-heading\">\n  <div>\n    <h1>My dashboard</h1>\n    <p>Your upcoming commutes and active interests.</p>\n  </div>\n  <a class=\"button\" routerLink=\"/commutes/new\">+ Offer a commute</a>\n</section>\n\n@if (loading()) {\n  <cc-state kind=\"loading\" title=\"Loading your dashboard\u2026\" />\n} @else if (error()) {\n  <cc-state\n    kind=\"error\"\n    title=\"Couldn\u2019t load your dashboard\"\n    [message]=\"error()\"\n    (retry)=\"load()\"\n  />\n} @else if (!cards().length) {\n  <cc-state\n    title=\"No upcoming commutes\"\n    message=\"Offer a commute or find a ride for your next journey.\"\n  />\n} @else {\n  <div class=\"card-grid\">\n    @for (post of cards(); track post.id) {\n      <cc-commute-card [post]=\"post\" />\n    }\n  </div>\n}" }]
    }], () => [], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(DashboardPage, { className: "DashboardPage", filePath: "src/app/features/dashboard/dashboard.page.ts", lineNumber: 13 }); })();