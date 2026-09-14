import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import * as i0 from "@angular/core";
export class NotFoundPage {
    static ɵfac = function NotFoundPage_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || NotFoundPage)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: NotFoundPage, selectors: [["ng-component"]], decls: 7, vars: 0, consts: [[1, "state"], ["routerLink", "/commutes", 1, "button"]], template: function NotFoundPage_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "section", 0)(1, "h1");
            i0.ɵɵtext(2, "We couldn\u2019t find that page.");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(3, "p");
            i0.ɵɵtext(4, "The link may have changed.");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(5, "a", 1);
            i0.ɵɵtext(6, "Find a commute");
            i0.ɵɵelementEnd()();
        } }, dependencies: [RouterLink], encapsulation: 2 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(NotFoundPage, [{
        type: Component,
        args: [{ imports: [RouterLink], template: "<section class=\"state\">\n  <h1>We couldn\u2019t find that page.</h1>\n  <p>The link may have changed.</p>\n  <a class=\"button\" routerLink=\"/commutes\">Find a commute</a>\n</section>" }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(NotFoundPage, { className: "NotFoundPage", filePath: "src/app/shared/not-found.page.ts", lineNumber: 8 }); })();