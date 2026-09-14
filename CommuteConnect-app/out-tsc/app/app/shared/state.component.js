import { Component, input, output } from '@angular/core';
import * as i0 from "@angular/core";
function StateComponent_Conditional_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵdomElement(0, "span", 1);
} }
function StateComponent_Conditional_6_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵdomElementStart(0, "button", 3);
    i0.ɵɵdomListener("click", function StateComponent_Conditional_6_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.retry.emit()); });
    i0.ɵɵtext(1, "Try again");
    i0.ɵɵdomElementEnd();
} }
export class StateComponent {
    kind = input('empty', ...(ngDevMode ? [{ debugName: "kind" }] : /* istanbul ignore next */ []));
    title = input.required(...(ngDevMode ? [{ debugName: "title" }] : /* istanbul ignore next */ []));
    message = input('', ...(ngDevMode ? [{ debugName: "message" }] : /* istanbul ignore next */ []));
    retry = output();
    static ɵfac = function StateComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || StateComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: StateComponent, selectors: [["cc-state"]], inputs: { kind: [1, "kind"], title: [1, "title"], message: [1, "message"] }, outputs: { retry: "retry" }, decls: 7, vars: 6, consts: [[1, "state"], ["aria-hidden", "true", 1, "spinner"], [1, "button", "secondary"], [1, "button", "secondary", 3, "click"]], template: function StateComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵdomElementStart(0, "section", 0);
            i0.ɵɵconditionalCreate(1, StateComponent_Conditional_1_Template, 1, 0, "span", 1);
            i0.ɵɵdomElementStart(2, "h2");
            i0.ɵɵtext(3);
            i0.ɵɵdomElementEnd();
            i0.ɵɵdomElementStart(4, "p");
            i0.ɵɵtext(5);
            i0.ɵɵdomElementEnd();
            i0.ɵɵconditionalCreate(6, StateComponent_Conditional_6_Template, 2, 0, "button", 2);
            i0.ɵɵdomElementEnd();
        } if (rf & 2) {
            i0.ɵɵattribute("role", ctx.kind() === "error" ? "alert" : "status")("aria-busy", ctx.kind() === "loading");
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.kind() === "loading" ? 1 : -1);
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate(ctx.title());
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate(ctx.message());
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.kind() === "error" ? 6 : -1);
        } }, encapsulation: 2 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(StateComponent, [{
        type: Component,
        args: [{ selector: 'cc-state', template: "<section\n  class=\"state\"\n  [attr.role]=\"kind() === 'error' ? 'alert' : 'status'\"\n  [attr.aria-busy]=\"kind() === 'loading'\"\n>\n  @if (kind() === 'loading') {\n    <span class=\"spinner\" aria-hidden=\"true\"></span>\n  }\n  <h2>{{ title() }}</h2>\n  <p>{{ message() }}</p>\n  @if (kind() === 'error') {\n    <button class=\"button secondary\" (click)=\"retry.emit()\">Try again</button>\n  }\n</section>" }]
    }], null, { kind: [{ type: i0.Input, args: [{ isSignal: true, alias: "kind", required: false }] }], title: [{ type: i0.Input, args: [{ isSignal: true, alias: "title", required: true }] }], message: [{ type: i0.Input, args: [{ isSignal: true, alias: "message", required: false }] }], retry: [{ type: i0.Output, args: ["retry"] }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(StateComponent, { className: "StateComponent", filePath: "src/app/shared/state.component.ts", lineNumber: 7 }); })();