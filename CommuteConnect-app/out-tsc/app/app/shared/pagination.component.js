import { Component, input, output } from '@angular/core';
import * as i0 from "@angular/core";
function PaginationComponent_Conditional_0_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵdomElementStart(0, "nav", 0)(1, "button", 1);
    i0.ɵɵdomListener("click", function PaginationComponent_Conditional_0_Template_button_click_1_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.change.emit(ctx_r1.page() - 1)); });
    i0.ɵɵtext(2, " Previous ");
    i0.ɵɵdomElementEnd();
    i0.ɵɵdomElementStart(3, "span");
    i0.ɵɵtext(4);
    i0.ɵɵdomElementEnd();
    i0.ɵɵdomElementStart(5, "button", 1);
    i0.ɵɵdomListener("click", function PaginationComponent_Conditional_0_Template_button_click_5_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.change.emit(ctx_r1.page() + 1)); });
    i0.ɵɵtext(6, " Next ");
    i0.ɵɵdomElementEnd()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵdomProperty("disabled", ctx_r1.page() <= 1);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate2("Page ", ctx_r1.page(), " of ", ctx_r1.totalPages());
    i0.ɵɵadvance();
    i0.ɵɵdomProperty("disabled", ctx_r1.page() >= ctx_r1.totalPages());
} }
export class PaginationComponent {
    page = input(1, ...(ngDevMode ? [{ debugName: "page" }] : /* istanbul ignore next */ []));
    totalPages = input(0, ...(ngDevMode ? [{ debugName: "totalPages" }] : /* istanbul ignore next */ []));
    change = output();
    static ɵfac = function PaginationComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || PaginationComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: PaginationComponent, selectors: [["cc-pagination"]], inputs: { page: [1, "page"], totalPages: [1, "totalPages"] }, outputs: { change: "change" }, decls: 1, vars: 1, consts: [["aria-label", "Pagination", 1, "pagination"], [1, "button", "secondary", 3, "click", "disabled"]], template: function PaginationComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵconditionalCreate(0, PaginationComponent_Conditional_0_Template, 7, 4, "nav", 0);
        } if (rf & 2) {
            i0.ɵɵconditional(ctx.totalPages() > 1 ? 0 : -1);
        } }, encapsulation: 2 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(PaginationComponent, [{
        type: Component,
        args: [{ selector: 'cc-pagination', template: "@if (totalPages() > 1) {\n  <nav class=\"pagination\" aria-label=\"Pagination\">\n    <button\n      class=\"button secondary\"\n      [disabled]=\"page() <= 1\"\n      (click)=\"change.emit(page() - 1)\"\n    >\n      Previous\n    </button>\n    <span>Page {{ page() }} of {{ totalPages() }}</span>\n    <button\n      class=\"button secondary\"\n      [disabled]=\"page() >= totalPages()\"\n      (click)=\"change.emit(page() + 1)\"\n    >\n      Next\n    </button>\n  </nav>\n}" }]
    }], null, { page: [{ type: i0.Input, args: [{ isSignal: true, alias: "page", required: false }] }], totalPages: [{ type: i0.Input, args: [{ isSignal: true, alias: "totalPages", required: false }] }], change: [{ type: i0.Output, args: ["change"] }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(PaginationComponent, { className: "PaginationComponent", filePath: "src/app/shared/pagination.component.ts", lineNumber: 7 }); })();