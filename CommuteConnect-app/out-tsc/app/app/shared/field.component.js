import { Component, input } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
function FieldComponent_Conditional_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 2);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵproperty("id", ctx_r0.fieldId() + "-help");
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r0.message, " ");
} }
function FieldComponent_Conditional_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "textarea", 3);
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵproperty("id", ctx_r0.fieldId())("formControl", ctx_r0.control());
    i0.ɵɵattribute("maxlength", ctx_r0.maxLength())("aria-invalid", ctx_r0.invalid)("aria-describedby", ctx_r0.fieldId() + "-help")("placeholder", ctx_r0.placeholder());
} }
function FieldComponent_Conditional_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "input", 4);
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵproperty("id", ctx_r0.fieldId())("formControl", ctx_r0.control())("min", ctx_r0.min())("max", ctx_r0.max());
    i0.ɵɵattribute("aria-invalid", ctx_r0.invalid)("aria-describedby", ctx_r0.fieldId() + "-help")("placeholder", ctx_r0.placeholder());
} }
function FieldComponent_Conditional_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "input", 5);
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵproperty("id", ctx_r0.fieldId())("type", ctx_r0.type())("formControl", ctx_r0.control());
    i0.ɵɵattribute("autocomplete", ctx_r0.autocomplete())("min", ctx_r0.min())("max", ctx_r0.max())("maxlength", ctx_r0.maxLength())("aria-invalid", ctx_r0.invalid)("aria-describedby", ctx_r0.fieldId() + "-help")("placeholder", ctx_r0.placeholder());
} }
function FieldComponent_Conditional_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 6);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵproperty("id", ctx_r0.fieldId() + "-help");
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r0.hint(), " ");
} }
export class FieldComponent {
    fieldId = input.required(...(ngDevMode ? [{ debugName: "fieldId" }] : /* istanbul ignore next */ []));
    label = input.required(...(ngDevMode ? [{ debugName: "label" }] : /* istanbul ignore next */ []));
    control = input.required(...(ngDevMode ? [{ debugName: "control" }] : /* istanbul ignore next */ []));
    type = input('text', ...(ngDevMode ? [{ debugName: "type" }] : /* istanbul ignore next */ []));
    autocomplete = input('off', ...(ngDevMode ? [{ debugName: "autocomplete" }] : /* istanbul ignore next */ []));
    hint = input('', ...(ngDevMode ? [{ debugName: "hint" }] : /* istanbul ignore next */ []));
    placeholder = input('', ...(ngDevMode ? [{ debugName: "placeholder" }] : /* istanbul ignore next */ []));
    min = input(null, ...(ngDevMode ? [{ debugName: "min" }] : /* istanbul ignore next */ []));
    max = input(null, ...(ngDevMode ? [{ debugName: "max" }] : /* istanbul ignore next */ []));
    maxLength = input(null, ...(ngDevMode ? [{ debugName: "maxLength" }] : /* istanbul ignore next */ []));
    get invalid() {
        return this.control().invalid && this.control().touched;
    }
    get message() {
        const e = this.control().errors || {};
        if (e['required']) {
            return `Please enter ${this.label().toLowerCase()}.`;
        }
        if (e['email']) {
            return 'Enter a valid email address.';
        }
        if (e['minlength']) {
            return `Use at least ${e['minlength'].requiredLength} characters.`;
        }
        if (e['maxlength']) {
            return `Use no more than ${e['maxlength'].requiredLength} characters.`;
        }
        if (e['min'] || e['max']) {
            return `Choose a number between ${this.min()} and ${this.max()}.`;
        }
        if (e['future']) {
            return 'Choose a departure time in the future.';
        }
        if (e['birthDate']) {
            return 'Enter a valid date of birth in the past.';
        }
        if (e['whitespace']) {
            return 'Enter at least two non-space characters.';
        }
        if (e['pattern'] && this.label() === 'Vehicle number') {
            return 'Vehicle number must contain 4–20 letters and numbers.';
        }
        return 'Please check this value.';
    }
    static ɵfac = function FieldComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || FieldComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: FieldComponent, selectors: [["cc-field"]], inputs: { fieldId: [1, "fieldId"], label: [1, "label"], control: [1, "control"], type: [1, "type"], autocomplete: [1, "autocomplete"], hint: [1, "hint"], placeholder: [1, "placeholder"], min: [1, "min"], max: [1, "max"], maxLength: [1, "maxLength"] }, decls: 8, vars: 5, consts: [[1, "field"], [3, "for"], [1, "field-help", "field-error", 3, "id"], ["rows", "4", 3, "id", "formControl"], ["type", "number", 3, "id", "formControl", "min", "max"], [3, "id", "type", "formControl"], [1, "field-help", 3, "id"]], template: function FieldComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "label", 1);
            i0.ɵɵtext(2);
            i0.ɵɵelementEnd();
            i0.ɵɵconditionalCreate(3, FieldComponent_Conditional_3_Template, 2, 2, "div", 2);
            i0.ɵɵconditionalCreate(4, FieldComponent_Conditional_4_Template, 1, 6, "textarea", 3)(5, FieldComponent_Conditional_5_Template, 1, 7, "input", 4)(6, FieldComponent_Conditional_6_Template, 1, 10, "input", 5);
            i0.ɵɵconditionalCreate(7, FieldComponent_Conditional_7_Template, 2, 2, "div", 6);
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            i0.ɵɵadvance();
            i0.ɵɵproperty("for", ctx.fieldId());
            i0.ɵɵadvance();
            i0.ɵɵtextInterpolate(ctx.label());
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.invalid ? 3 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.type() === "textarea" ? 4 : ctx.type() === "number" ? 5 : 6);
            i0.ɵɵadvance(3);
            i0.ɵɵconditional(!ctx.invalid ? 7 : -1);
        } }, dependencies: [ReactiveFormsModule, i1.DefaultValueAccessor, i1.NumberValueAccessor, i1.NgControlStatus, i1.MinValidator, i1.MaxValidator, i1.FormControlDirective], encapsulation: 2 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(FieldComponent, [{
        type: Component,
        args: [{ selector: 'cc-field', imports: [ReactiveFormsModule], template: "<div class=\"field\">\n  <label [for]=\"fieldId()\">{{ label() }}</label>\n  @if (invalid) {\n    <div [id]=\"fieldId() + '-help'\" class=\"field-help field-error\">\n      {{ message }}\n    </div>\n  }\n  @if (type() === 'textarea') {\n    <textarea\n      [id]=\"fieldId()\"\n      [formControl]=\"control()\"\n      rows=\"4\"\n      [attr.maxlength]=\"maxLength()\"\n      [attr.aria-invalid]=\"invalid\"\n      [attr.aria-describedby]=\"fieldId() + '-help'\"\n      [attr.placeholder]=\"placeholder()\"\n    ></textarea>\n  } @else if (type() === 'number') {\n    <input\n      type=\"number\"\n      [id]=\"fieldId()\"\n      [formControl]=\"control()\"\n      [min]=\"min()\"\n      [max]=\"max()\"\n      [attr.aria-invalid]=\"invalid\"\n      [attr.aria-describedby]=\"fieldId() + '-help'\"\n      [attr.placeholder]=\"placeholder()\"\n    />\n  } @else {\n    <input\n      [id]=\"fieldId()\"\n      [type]=\"type()\"\n      [formControl]=\"control()\"\n      [attr.autocomplete]=\"autocomplete()\"\n      [attr.min]=\"min()\"\n      [attr.max]=\"max()\"\n      [attr.maxlength]=\"maxLength()\"\n      [attr.aria-invalid]=\"invalid\"\n      [attr.aria-describedby]=\"fieldId() + '-help'\"\n      [attr.placeholder]=\"placeholder()\"\n    />\n  }\n  @if (!invalid) {\n    <div [id]=\"fieldId() + '-help'\" class=\"field-help\">\n      {{ hint() }}\n    </div>\n  }\n</div>\n" }]
    }], null, { fieldId: [{ type: i0.Input, args: [{ isSignal: true, alias: "fieldId", required: true }] }], label: [{ type: i0.Input, args: [{ isSignal: true, alias: "label", required: true }] }], control: [{ type: i0.Input, args: [{ isSignal: true, alias: "control", required: true }] }], type: [{ type: i0.Input, args: [{ isSignal: true, alias: "type", required: false }] }], autocomplete: [{ type: i0.Input, args: [{ isSignal: true, alias: "autocomplete", required: false }] }], hint: [{ type: i0.Input, args: [{ isSignal: true, alias: "hint", required: false }] }], placeholder: [{ type: i0.Input, args: [{ isSignal: true, alias: "placeholder", required: false }] }], min: [{ type: i0.Input, args: [{ isSignal: true, alias: "min", required: false }] }], max: [{ type: i0.Input, args: [{ isSignal: true, alias: "max", required: false }] }], maxLength: [{ type: i0.Input, args: [{ isSignal: true, alias: "maxLength", required: false }] }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(FieldComponent, { className: "FieldComponent", filePath: "src/app/shared/field.component.ts", lineNumber: 9 }); })();