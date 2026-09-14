import { Component, input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import * as i0 from "@angular/core";
const _c0 = a0 => ["/commutes", a0];
function CommuteCardComponent_Conditional_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 3);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r0.post().deletedAt ? "Cancelled" : ctx_r0.post().rideStatus === "completed" ? "Completed" : "Past", " ");
} }
function CommuteCardComponent_Conditional_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 10);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵclassProp("muted", ctx_r0.post().deletedAt);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r0.post().deletedAt ? "Cancelled" : ctx_r0.post().rideStatus === "in_progress" ? "On ride" : ctx_r0.post().availableSeats + " seats left", " ");
} }
function CommuteCardComponent_Conditional_18_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 8);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r0.post().notes);
} }
function CommuteCardComponent_Conditional_20_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 10);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    let tmp_1_0;
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate((tmp_1_0 = ctx_r0.post().myInterest) == null ? null : tmp_1_0.status);
} }
export class CommuteCardComponent {
    post = input.required(...(ngDevMode ? [{ debugName: "post" }] : /* istanbul ignore next */ []));
    history = input(false, ...(ngDevMode ? [{ debugName: "history" }] : /* istanbul ignore next */ []));
    static ɵfac = function CommuteCardComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || CommuteCardComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: CommuteCardComponent, selectors: [["cc-commute-card"]], inputs: { post: [1, "post"], history: [1, "history"] }, decls: 24, vars: 20, consts: [[1, "commute-card"], [1, "card-top"], [1, "eyebrow"], [1, "badge", "muted"], [1, "badge", 3, "muted"], [3, "routerLink"], ["aria-hidden", "true", 1, "route-arrow"], [1, "departure"], [1, "card-notes"], [1, "card-bottom"], [1, "badge"], [1, "text-link", 3, "routerLink"], ["src", "/commute-icon.svg", "alt", "", "aria-hidden", "true", 1, "inline-commute-icon"]], template: function CommuteCardComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "article", 0)(1, "div", 1)(2, "span", 2);
            i0.ɵɵtext(3);
            i0.ɵɵpipe(4, "date");
            i0.ɵɵelementEnd();
            i0.ɵɵconditionalCreate(5, CommuteCardComponent_Conditional_5_Template, 2, 1, "span", 3)(6, CommuteCardComponent_Conditional_6_Template, 2, 3, "span", 4);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(7, "h2")(8, "a", 5);
            i0.ɵɵtext(9);
            i0.ɵɵelementStart(10, "span", 6);
            i0.ɵɵtext(11, "\u2192");
            i0.ɵɵelementEnd();
            i0.ɵɵtext(12);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(13, "p", 7);
            i0.ɵɵtext(14);
            i0.ɵɵpipe(15, "date");
            i0.ɵɵelementStart(16, "span");
            i0.ɵɵtext(17);
            i0.ɵɵelementEnd()();
            i0.ɵɵconditionalCreate(18, CommuteCardComponent_Conditional_18_Template, 2, 1, "p", 8);
            i0.ɵɵelementStart(19, "div", 9);
            i0.ɵɵconditionalCreate(20, CommuteCardComponent_Conditional_20_Template, 2, 1, "span", 10);
            i0.ɵɵelementStart(21, "a", 11);
            i0.ɵɵtext(22, " View commute ");
            i0.ɵɵelement(23, "img", 12);
            i0.ɵɵelementEnd()()();
        } if (rf & 2) {
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(4, 10, ctx.post().departureAt, "EEE, d MMM"));
            i0.ɵɵadvance(2);
            i0.ɵɵconditional(ctx.history() ? 5 : 6);
            i0.ɵɵadvance(3);
            i0.ɵɵproperty("routerLink", i0.ɵɵpureFunction1(16, _c0, ctx.post().id));
            i0.ɵɵadvance();
            i0.ɵɵtextInterpolate1(" ", ctx.post().origin, " ");
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate1(" ", ctx.post().destination, " ");
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind2(15, 13, ctx.post().departureAt, "shortTime"), " ");
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate1("\u00B7 ", ctx.post().owner.name);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.post().notes ? 18 : -1);
            i0.ɵɵadvance(2);
            i0.ɵɵconditional(ctx.post().myInterest ? 20 : -1);
            i0.ɵɵadvance();
            i0.ɵɵproperty("routerLink", i0.ɵɵpureFunction1(18, _c0, ctx.post().id));
        } }, dependencies: [RouterLink, DatePipe], encapsulation: 2 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(CommuteCardComponent, [{
        type: Component,
        args: [{ selector: 'cc-commute-card', imports: [DatePipe, RouterLink], template: "<article class=\"commute-card\">\n  <div class=\"card-top\">\n    <span class=\"eyebrow\">{{ post().departureAt | date: 'EEE, d MMM' }}</span>\n    @if (history()) {\n      <span class=\"badge muted\">\n        {{\n          post().deletedAt\n            ? 'Cancelled'\n            : post().rideStatus === 'completed'\n              ? 'Completed'\n              : 'Past'\n        }}\n      </span>\n    } @else {\n      <span class=\"badge\" [class.muted]=\"post().deletedAt\">\n        {{\n          post().deletedAt\n            ? 'Cancelled'\n            : post().rideStatus === 'in_progress'\n              ? 'On ride'\n              : post().availableSeats + ' seats left'\n        }}\n      </span>\n    }\n  </div>\n  <h2>\n    <a [routerLink]=\"['/commutes', post().id]\">\n      {{ post().origin }}\n      <span class=\"route-arrow\" aria-hidden=\"true\">\u2192</span>\n      {{ post().destination }}\n    </a>\n  </h2>\n  <p class=\"departure\">\n    {{ post().departureAt | date: 'shortTime' }}\n    <span>\u00B7 {{ post().owner.name }}</span>\n  </p>\n  @if (post().notes) {\n    <p class=\"card-notes\">{{ post().notes }}</p>\n  }\n  <div class=\"card-bottom\">\n    @if (post().myInterest) {\n      <span class=\"badge\">{{ post().myInterest?.status }}</span>\n    }\n    <a class=\"text-link\" [routerLink]=\"['/commutes', post().id]\">\n      View commute\n   \n    </a>\n  </div>\n</article>\n" }]
    }], null, { post: [{ type: i0.Input, args: [{ isSignal: true, alias: "post", required: true }] }], history: [{ type: i0.Input, args: [{ isSignal: true, alias: "history", required: false }] }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(CommuteCardComponent, { className: "CommuteCardComponent", filePath: "src/app/shared/commute-card.component.ts", lineNumber: 11 }); })();