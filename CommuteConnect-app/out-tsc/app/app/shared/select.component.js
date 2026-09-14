import { Component, ElementRef, HostListener, forwardRef, inject, input, signal, } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import * as i0 from "@angular/core";
const _forTrack0 = ($index, $item) => $item.value;
function SelectComponent_Conditional_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵdomElementStart(0, "div", 2);
    i0.ɵɵtext(1);
    i0.ɵɵdomElementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵdomProperty("id", ctx_r0.fieldId() + "-help");
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" Please choose ", ctx_r0.label().toLowerCase(), ". ");
} }
function SelectComponent_Conditional_8_For_2_Conditional_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵdomElementStart(0, "span", 9);
    i0.ɵɵtext(1, "\u2713");
    i0.ɵɵdomElementEnd();
} }
function SelectComponent_Conditional_8_For_2_Template(rf, ctx) { if (rf & 1) {
    const _r2 = i0.ɵɵgetCurrentView();
    i0.ɵɵdomElementStart(0, "button", 8);
    i0.ɵɵdomListener("click", function SelectComponent_Conditional_8_For_2_Template_button_click_0_listener() { const option_r3 = i0.ɵɵrestoreView(_r2).$implicit; const ctx_r0 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r0.choose(option_r3)); });
    i0.ɵɵdomElementStart(1, "span");
    i0.ɵɵtext(2);
    i0.ɵɵdomElementEnd();
    i0.ɵɵconditionalCreate(3, SelectComponent_Conditional_8_For_2_Conditional_3_Template, 2, 0, "span", 9);
    i0.ɵɵdomElementEnd();
} if (rf & 2) {
    const option_r3 = ctx.$implicit;
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵclassProp("selected", option_r3.value === ctx_r0.value);
    i0.ɵɵattribute("aria-selected", option_r3.value === ctx_r0.value);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(option_r3.label);
    i0.ɵɵadvance();
    i0.ɵɵconditional(option_r3.value === ctx_r0.value ? 3 : -1);
} }
function SelectComponent_Conditional_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵdomElementStart(0, "div", 5);
    i0.ɵɵrepeaterCreate(1, SelectComponent_Conditional_8_For_2_Template, 4, 5, "button", 7, _forTrack0);
    i0.ɵɵdomElementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵdomProperty("id", ctx_r0.fieldId() + "-options");
    i0.ɵɵadvance();
    i0.ɵɵrepeater(ctx_r0.options());
} }
function SelectComponent_Conditional_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵdomElementStart(0, "div", 6);
    i0.ɵɵtext(1);
    i0.ɵɵdomElementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵdomProperty("id", ctx_r0.fieldId() + "-help");
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r0.hint(), " ");
} }
export class SelectComponent {
    fieldId = input.required(...(ngDevMode ? [{ debugName: "fieldId" }] : /* istanbul ignore next */ []));
    label = input.required(...(ngDevMode ? [{ debugName: "label" }] : /* istanbul ignore next */ []));
    options = input.required(...(ngDevMode ? [{ debugName: "options" }] : /* istanbul ignore next */ []));
    control = input(null, ...(ngDevMode ? [{ debugName: "control" }] : /* istanbul ignore next */ []));
    placeholder = input('Select an option', ...(ngDevMode ? [{ debugName: "placeholder" }] : /* istanbul ignore next */ []));
    hint = input('', ...(ngDevMode ? [{ debugName: "hint" }] : /* istanbul ignore next */ []));
    host = inject((ElementRef));
    open = signal(false, ...(ngDevMode ? [{ debugName: "open" }] : /* istanbul ignore next */ []));
    value = '';
    disabled = false;
    onChange = () => undefined;
    onTouched = () => undefined;
    get selectedLabel() {
        return this.options().find((option) => option.value === this.value)?.label || '';
    }
    get invalid() {
        const control = this.control();
        return !!control && control.invalid && control.touched;
    }
    toggle() {
        if (!this.disabled) {
            this.open.update((open) => !open);
        }
    }
    choose(option) {
        this.value = option.value;
        this.onChange(option.value);
        this.onTouched();
        this.open.set(false);
    }
    writeValue(value) {
        this.value = value || '';
    }
    registerOnChange(fn) {
        this.onChange = fn;
    }
    registerOnTouched(fn) {
        this.onTouched = fn;
    }
    setDisabledState(disabled) {
        this.disabled = disabled;
        if (disabled) {
            this.open.set(false);
        }
    }
    ngOnDestroy() {
        this.open.set(false);
    }
    closeOutside(event) {
        if (!this.host.nativeElement.contains(event.target)) {
            this.open.set(false);
        }
    }
    close() {
        this.open.set(false);
    }
    static ɵfac = function SelectComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || SelectComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: SelectComponent, selectors: [["cc-select"]], hostBindings: function SelectComponent_HostBindings(rf, ctx) { if (rf & 1) {
            i0.ɵɵlistener("pointerdown", function SelectComponent_pointerdown_HostBindingHandler($event) { return ctx.closeOutside($event); }, i0.ɵɵresolveDocument)("keydown.escape", function SelectComponent_keydown_escape_HostBindingHandler() { return ctx.close(); });
        } }, inputs: { fieldId: [1, "fieldId"], label: [1, "label"], options: [1, "options"], control: [1, "control"], placeholder: [1, "placeholder"], hint: [1, "hint"] }, features: [i0.ɵɵProvidersFeature([
                {
                    provide: NG_VALUE_ACCESSOR,
                    useExisting: forwardRef(() => SelectComponent),
                    multi: true,
                },
            ])], decls: 10, vars: 17, consts: [[1, "field", "custom-select"], [3, "id"], [1, "field-help", "field-error", 3, "id"], ["type", "button", "role", "combobox", 1, "select-trigger", 3, "click", "blur", "id", "disabled"], ["aria-hidden", "true", 1, "select-chevron"], ["role", "listbox", 1, "select-options", 3, "id"], [1, "field-help", 3, "id"], ["type", "button", "role", "option", 3, "selected"], ["type", "button", "role", "option", 3, "click"], ["aria-hidden", "true", 1, "select-check"]], template: function SelectComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵdomElementStart(0, "div", 0)(1, "label", 1);
            i0.ɵɵtext(2);
            i0.ɵɵdomElementEnd();
            i0.ɵɵconditionalCreate(3, SelectComponent_Conditional_3_Template, 2, 2, "div", 2);
            i0.ɵɵdomElementStart(4, "button", 3);
            i0.ɵɵdomListener("click", function SelectComponent_Template_button_click_4_listener() { return ctx.toggle(); })("blur", function SelectComponent_Template_button_blur_4_listener() { return ctx.onTouched(); });
            i0.ɵɵdomElementStart(5, "span");
            i0.ɵɵtext(6);
            i0.ɵɵdomElementEnd();
            i0.ɵɵdomElement(7, "span", 4);
            i0.ɵɵdomElementEnd();
            i0.ɵɵconditionalCreate(8, SelectComponent_Conditional_8_Template, 3, 1, "div", 5);
            i0.ɵɵconditionalCreate(9, SelectComponent_Conditional_9_Template, 2, 2, "div", 6);
            i0.ɵɵdomElementEnd();
        } if (rf & 2) {
            i0.ɵɵclassProp("is-open", ctx.open());
            i0.ɵɵadvance();
            i0.ɵɵdomProperty("id", ctx.fieldId() + "-label");
            i0.ɵɵadvance();
            i0.ɵɵtextInterpolate(ctx.label());
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.invalid ? 3 : -1);
            i0.ɵɵadvance();
            i0.ɵɵdomProperty("id", ctx.fieldId())("disabled", ctx.disabled);
            i0.ɵɵattribute("aria-labelledby", ctx.fieldId() + "-label")("aria-controls", ctx.fieldId() + "-options")("aria-expanded", ctx.open())("aria-invalid", ctx.invalid)("aria-describedby", ctx.fieldId() + "-help");
            i0.ɵɵadvance();
            i0.ɵɵclassProp("placeholder", !ctx.selectedLabel);
            i0.ɵɵadvance();
            i0.ɵɵtextInterpolate1(" ", ctx.selectedLabel || ctx.placeholder(), " ");
            i0.ɵɵadvance(2);
            i0.ɵɵconditional(ctx.open() ? 8 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(!ctx.invalid ? 9 : -1);
        } }, encapsulation: 2 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(SelectComponent, [{
        type: Component,
        args: [{ selector: 'cc-select', providers: [
                    {
                        provide: NG_VALUE_ACCESSOR,
                        useExisting: forwardRef(() => SelectComponent),
                        multi: true,
                    },
                ], template: "<div class=\"field custom-select\" [class.is-open]=\"open()\">\n  <label [id]=\"fieldId() + '-label'\">{{ label() }}</label>\n  @if (invalid) {\n    <div [id]=\"fieldId() + '-help'\" class=\"field-help field-error\">\n      Please choose {{ label().toLowerCase() }}.\n    </div>\n  }\n  <button\n    class=\"select-trigger\"\n    type=\"button\"\n    role=\"combobox\"\n    [id]=\"fieldId()\"\n    [disabled]=\"disabled\"\n    [attr.aria-labelledby]=\"fieldId() + '-label'\"\n    [attr.aria-controls]=\"fieldId() + '-options'\"\n    [attr.aria-expanded]=\"open()\"\n    [attr.aria-invalid]=\"invalid\"\n    [attr.aria-describedby]=\"fieldId() + '-help'\"\n    (click)=\"toggle()\"\n    (blur)=\"onTouched()\"\n  >\n    <span [class.placeholder]=\"!selectedLabel\">\n      {{ selectedLabel || placeholder() }}\n    </span>\n    <span class=\"select-chevron\" aria-hidden=\"true\"></span>\n  </button>\n\n  @if (open()) {\n    <div class=\"select-options\" role=\"listbox\" [id]=\"fieldId() + '-options'\">\n      @for (option of options(); track option.value) {\n        <button\n          type=\"button\"\n          role=\"option\"\n          [class.selected]=\"option.value === value\"\n          [attr.aria-selected]=\"option.value === value\"\n          (click)=\"choose(option)\"\n        >\n          <span>{{ option.label }}</span>\n          @if (option.value === value) {\n            <span class=\"select-check\" aria-hidden=\"true\">\u2713</span>\n          }\n        </button>\n      }\n    </div>\n  }\n\n  @if (!invalid) {\n    <div [id]=\"fieldId() + '-help'\" class=\"field-help\">\n      {{ hint() }}\n    </div>\n  }\n</div>\n" }]
    }], null, { fieldId: [{ type: i0.Input, args: [{ isSignal: true, alias: "fieldId", required: true }] }], label: [{ type: i0.Input, args: [{ isSignal: true, alias: "label", required: true }] }], options: [{ type: i0.Input, args: [{ isSignal: true, alias: "options", required: true }] }], control: [{ type: i0.Input, args: [{ isSignal: true, alias: "control", required: false }] }], placeholder: [{ type: i0.Input, args: [{ isSignal: true, alias: "placeholder", required: false }] }], hint: [{ type: i0.Input, args: [{ isSignal: true, alias: "hint", required: false }] }], closeOutside: [{
            type: HostListener,
            args: ['document:pointerdown', ['$event']]
        }], close: [{
            type: HostListener,
            args: ['keydown.escape']
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(SelectComponent, { className: "SelectComponent", filePath: "src/app/shared/select.component.ts", lineNumber: 29 }); })();