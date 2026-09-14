import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../utils/api';
import { errorMessage } from '../../core/errors';
import { CommuteCardComponent } from '../../shared/commute-card.component';
import { PaginationComponent } from '../../shared/pagination.component';
import { StateComponent } from '../../shared/state.component';
import * as i0 from "@angular/core";
const _forTrack0 = ($index, $item) => $item.id;
function HistoryComponent_Conditional_15_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "cc-state", 7);
} }
function HistoryComponent_Conditional_16_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "cc-state", 10);
    i0.ɵɵlistener("retry", function HistoryComponent_Conditional_16_Template_cc_state_retry_0_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.load(ctx_r1.page())); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵproperty("message", ctx_r1.error());
} }
function HistoryComponent_Conditional_17_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "cc-state", 9);
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵproperty("message", ctx_r1.tab() === "posts" ? "Past and cancelled commutes will appear here." : "Past, declined, and withdrawn interests will appear here.");
} }
function HistoryComponent_Conditional_18_For_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "cc-commute-card", 12);
} if (rf & 2) {
    const post_r4 = ctx.$implicit;
    i0.ɵɵproperty("post", post_r4)("history", true);
} }
function HistoryComponent_Conditional_18_Template(rf, ctx) { if (rf & 1) {
    const _r3 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 11);
    i0.ɵɵrepeaterCreate(1, HistoryComponent_Conditional_18_For_2_Template, 1, 2, "cc-commute-card", 12, _forTrack0);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "cc-pagination", 13);
    i0.ɵɵlistener("change", function HistoryComponent_Conditional_18_Template_cc_pagination_change_3_listener($event) { i0.ɵɵrestoreView(_r3); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.load($event)); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵrepeater(ctx_r1.cards());
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("page", ctx_r1.page())("totalPages", ctx_r1.totalPages());
} }
export class HistoryComponent {
    api = inject(ApiService);
    tab = signal('posts', ...(ngDevMode ? [{ debugName: "tab" }] : /* istanbul ignore next */ []));
    cards = signal([], ...(ngDevMode ? [{ debugName: "cards" }] : /* istanbul ignore next */ []));
    page = signal(1, ...(ngDevMode ? [{ debugName: "page" }] : /* istanbul ignore next */ []));
    totalPages = signal(0, ...(ngDevMode ? [{ debugName: "totalPages" }] : /* istanbul ignore next */ []));
    loading = signal(true, ...(ngDevMode ? [{ debugName: "loading" }] : /* istanbul ignore next */ []));
    error = signal('', ...(ngDevMode ? [{ debugName: "error" }] : /* istanbul ignore next */ []));
    request = 0;
    constructor() {
        void this.load(1);
    }
    selectTab(tab) {
        this.tab.set(tab);
        void this.load(1);
    }
    async load(page) {
        const request = ++this.request;
        this.page.set(page);
        this.loading.set(true);
        this.error.set('');
        try {
            let result;
            let cards;
            if (this.tab() === 'posts') {
                result = await this.api.getMyCommutes('history', page);
                cards = result.data;
            }
            else {
                result = await this.api.getMyInterests('history', page);
                cards = result.data.flatMap((interest) => (interest.post ? [interest.post] : []));
            }
            if (request === this.request) {
                this.cards.set(cards);
                this.totalPages.set(result.totalPages);
            }
        }
        catch (error) {
            if (request === this.request) {
                this.error.set(errorMessage(error));
            }
        }
        finally {
            if (request === this.request) {
                this.loading.set(false);
            }
        }
    }
    static ɵfac = function HistoryComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || HistoryComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: HistoryComponent, selectors: [["ng-component"]], decls: 19, vars: 7, consts: [["aria-labelledby", "history-title", 1, "profile-history"], ["routerLink", "/profile", 1, "text-link"], [1, "page-heading", "history-page-heading"], ["id", "history-title"], [1, "history-heading"], ["aria-label", "History section", 1, "segmented"], ["type", "button", 3, "click"], ["kind", "loading", "title", "Loading history\u2026"], ["kind", "error", "title", "Couldn\u2019t load history", 3, "message"], ["title", "No history yet", 3, "message"], ["kind", "error", "title", "Couldn\u2019t load history", 3, "retry", "message"], [1, "card-grid"], [3, "post", "history"], [3, "change", "page", "totalPages"]], template: function HistoryComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "section", 0)(1, "a", 1);
            i0.ɵɵtext(2, "\u2190 Profile");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(3, "header", 2)(4, "div")(5, "h1", 3);
            i0.ɵɵtext(6, "History");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(7, "p");
            i0.ɵɵtext(8, "Your past posts and closed interests.");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(9, "div", 4)(10, "div", 5)(11, "button", 6);
            i0.ɵɵlistener("click", function HistoryComponent_Template_button_click_11_listener() { return ctx.selectTab("posts"); });
            i0.ɵɵtext(12, " My Posts ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(13, "button", 6);
            i0.ɵɵlistener("click", function HistoryComponent_Template_button_click_13_listener() { return ctx.selectTab("interests"); });
            i0.ɵɵtext(14, " My Interests ");
            i0.ɵɵelementEnd()()();
            i0.ɵɵconditionalCreate(15, HistoryComponent_Conditional_15_Template, 1, 0, "cc-state", 7)(16, HistoryComponent_Conditional_16_Template, 1, 1, "cc-state", 8)(17, HistoryComponent_Conditional_17_Template, 1, 1, "cc-state", 9)(18, HistoryComponent_Conditional_18_Template, 4, 2);
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            i0.ɵɵadvance(11);
            i0.ɵɵclassProp("selected", ctx.tab() === "posts");
            i0.ɵɵattribute("aria-pressed", ctx.tab() === "posts");
            i0.ɵɵadvance(2);
            i0.ɵɵclassProp("selected", ctx.tab() === "interests");
            i0.ɵɵattribute("aria-pressed", ctx.tab() === "interests");
            i0.ɵɵadvance(2);
            i0.ɵɵconditional(ctx.loading() ? 15 : ctx.error() ? 16 : !ctx.cards().length ? 17 : 18);
        } }, dependencies: [RouterLink, CommuteCardComponent, PaginationComponent, StateComponent], encapsulation: 2 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(HistoryComponent, [{
        type: Component,
        args: [{ imports: [RouterLink, CommuteCardComponent, PaginationComponent, StateComponent], template: "<section class=\"profile-history\" aria-labelledby=\"history-title\">\n  <a class=\"text-link\" routerLink=\"/profile\">\u2190 Profile</a>\n  <header class=\"page-heading history-page-heading\">\n    <div>\n      <h1 id=\"history-title\">History</h1>\n      <p>Your past posts and closed interests.</p>\n    </div>\n  </header>\n  <div class=\"history-heading\">\n    <div class=\"segmented\" aria-label=\"History section\">\n      <button\n        type=\"button\"\n        [class.selected]=\"tab() === 'posts'\"\n        [attr.aria-pressed]=\"tab() === 'posts'\"\n        (click)=\"selectTab('posts')\"\n      >\n        My commutes\n      </button>\n      <button\n        type=\"button\"\n        [class.selected]=\"tab() === 'interests'\"\n        [attr.aria-pressed]=\"tab() === 'interests'\"\n        (click)=\"selectTab('interests')\"\n      >\n        My interests\n      </button>\n    </div>\n  </div>\n\n  @if (loading()) {\n    <cc-state kind=\"loading\" title=\"Loading history\u2026\" />\n  } @else if (error()) {\n    <cc-state\n      kind=\"error\"\n      title=\"Couldn\u2019t load history\"\n      [message]=\"error()\"\n      (retry)=\"load(page())\"\n    />\n  } @else if (!cards().length) {\n    <cc-state\n      title=\"No history yet\"\n      [message]=\"\n        tab() === 'posts'\n          ? 'Past and cancelled commutes will appear here.'\n          : 'Past, declined, and withdrawn interests will appear here.'\n      \"\n    />\n  } @else {\n    <div class=\"card-grid\">\n      @for (post of cards(); track post.id) {\n        <cc-commute-card [post]=\"post\" [history]=\"true\" />\n      }\n    </div>\n    <cc-pagination [page]=\"page()\" [totalPages]=\"totalPages()\" (change)=\"load($event)\" />\n  }\n</section>" }]
    }], () => [], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(HistoryComponent, { className: "HistoryComponent", filePath: "src/app/features/profile/history.component.ts", lineNumber: 14 }); })();