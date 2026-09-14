import { Component, forwardRef, input, viewChild, } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import flatpickr from 'flatpickr';
import * as i0 from "@angular/core";
const _c0 = ["picker"];
function DatePickerComponent_Conditional_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵdomElementStart(0, "div", 3);
    i0.ɵɵtext(1);
    i0.ɵɵdomElementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵdomProperty("id", ctx_r0.fieldId() + "-help");
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r0.message, " ");
} }
function DatePickerComponent_Conditional_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵdomElementStart(0, "div", 5);
    i0.ɵɵtext(1);
    i0.ɵɵdomElementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵdomProperty("id", ctx_r0.fieldId() + "-help");
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r0.hint(), " ");
} }
export class DatePickerComponent {
    fieldId = input.required(...(ngDevMode ? [{ debugName: "fieldId" }] : /* istanbul ignore next */ []));
    label = input.required(...(ngDevMode ? [{ debugName: "label" }] : /* istanbul ignore next */ []));
    hint = input('', ...(ngDevMode ? [{ debugName: "hint" }] : /* istanbul ignore next */ []));
    control = input(null, ...(ngDevMode ? [{ debugName: "control" }] : /* istanbul ignore next */ []));
    enableTime = input(false, ...(ngDevMode ? [{ debugName: "enableTime" }] : /* istanbul ignore next */ []));
    minDate = input(...(ngDevMode ? [undefined, { debugName: "minDate" }] : /* istanbul ignore next */ []));
    maxDate = input(...(ngDevMode ? [undefined, { debugName: "maxDate" }] : /* istanbul ignore next */ []));
    inputElement = viewChild.required('picker');
    picker;
    value = '';
    disabled = false;
    onChange = () => undefined;
    onTouched = () => undefined;
    get invalid() {
        const control = this.control();
        return !!control && control.invalid && control.touched;
    }
    get message() {
        const errors = this.control()?.errors || {};
        if (errors['required']) {
            return `Please choose ${this.label().toLowerCase()}.`;
        }
        if (errors['future']) {
            return 'Choose a departure time in the future.';
        }
        if (errors['birthDate']) {
            return 'Enter a valid date of birth in the past.';
        }
        return 'Please check this date.';
    }
    ngAfterViewInit() {
        this.picker = flatpickr(this.inputElement().nativeElement, {
            allowInput: true,
            disableMobile: true,
            dateFormat: this.enableTime() ? 'Y-m-d\\TH:i' : 'Y-m-d',
            altInput: true,
            altFormat: this.enableTime() ? 'D, j M Y at h:i K' : 'j M Y',
            enableTime: this.enableTime(),
            minDate: this.minDate(),
            maxDate: this.maxDate(),
            minuteIncrement: 5,
            defaultDate: this.value || undefined,
            parseDate: (value, format) => {
                const match = value.match(/^(\d{4})-(\d{2})-(\d{2})(?:T(\d{2}):(\d{2}))?$/);
                if (match) {
                    return new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]), Number(match[4] || 0), Number(match[5] || 0));
                }
                return flatpickr.parseDate(value, format) || new Date(Number.NaN);
            },
            onReady: (_dates, _value, instance) => {
                if (instance.altInput) {
                    instance.input.id = `${this.fieldId()}-value`;
                    instance.altInput.id = this.fieldId();
                    instance.altInput.autocomplete = 'off';
                    const compactScreen = window.matchMedia('(max-width: 760px)').matches;
                    instance.altInput.inputMode = compactScreen ? 'none' : 'text';
                    instance.altInput.readOnly = compactScreen;
                    instance.altInput.setAttribute('data-1p-ignore', 'true');
                    instance.altInput.setAttribute('data-lpignore', 'true');
                    instance.altInput.setAttribute('aria-describedby', `${this.fieldId()}-help`);
                    instance.altInput.addEventListener('input', () => {
                        const entered = instance.altInput.value.trim();
                        const internalFormat = this.enableTime() ? 'Y-m-d\\TH:i' : 'Y-m-d';
                        const displayFormat = this.enableTime() ? 'D, j M Y at h:i K' : 'j M Y';
                        const isInternal = this.enableTime()
                            ? /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(entered)
                            : /^\d{4}-\d{2}-\d{2}$/.test(entered);
                        const parsed = isInternal
                            ? flatpickr.parseDate(entered, internalFormat)
                            : flatpickr.parseDate(entered, displayFormat);
                        this.value = parsed ? flatpickr.formatDate(parsed, internalFormat) : '';
                        instance.input.value = this.value;
                        this.onChange(this.value);
                    });
                }
            },
            onChange: (_dates, value) => {
                this.value = value;
                this.onChange(value);
                this.onTouched();
            },
            onValueUpdate: (_dates, value) => {
                this.value = value;
                this.onChange(value);
            },
            onClose: () => this.onTouched(),
        });
        this.picker.set('clickOpens', !this.disabled);
    }
    ngOnDestroy() {
        this.picker?.destroy();
    }
    writeValue(value) {
        this.value = value || '';
        this.picker?.setDate(this.value, false);
    }
    registerOnChange(fn) {
        this.onChange = fn;
    }
    registerOnTouched(fn) {
        this.onTouched = fn;
    }
    setDisabledState(disabled) {
        this.disabled = disabled;
        this.picker?.set('clickOpens', !disabled);
        this.inputElement()?.nativeElement.toggleAttribute('disabled', disabled);
    }
    static ɵfac = function DatePickerComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || DatePickerComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: DatePickerComponent, selectors: [["cc-date-picker"]], viewQuery: function DatePickerComponent_Query(rf, ctx) { if (rf & 1) {
            i0.ɵɵviewQuerySignal(ctx.inputElement, _c0, 5);
        } if (rf & 2) {
            i0.ɵɵqueryAdvance();
        } }, inputs: { fieldId: [1, "fieldId"], label: [1, "label"], hint: [1, "hint"], control: [1, "control"], enableTime: [1, "enableTime"], minDate: [1, "minDate"], maxDate: [1, "maxDate"] }, features: [i0.ɵɵProvidersFeature([
                {
                    provide: NG_VALUE_ACCESSOR,
                    useExisting: forwardRef(() => DatePickerComponent),
                    multi: true,
                },
            ])], decls: 7, vars: 9, consts: [["picker", ""], [1, "field"], [3, "for"], [1, "field-help", "field-error", 3, "id"], ["type", "text", "autocomplete", "off", "data-1p-ignore", "true", "data-lpignore", "true", 3, "id", "disabled", "placeholder"], [1, "field-help", 3, "id"]], template: function DatePickerComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵdomElementStart(0, "div", 1)(1, "label", 2);
            i0.ɵɵtext(2);
            i0.ɵɵdomElementEnd();
            i0.ɵɵconditionalCreate(3, DatePickerComponent_Conditional_3_Template, 2, 2, "div", 3);
            i0.ɵɵdomElement(4, "input", 4, 0);
            i0.ɵɵconditionalCreate(6, DatePickerComponent_Conditional_6_Template, 2, 2, "div", 5);
            i0.ɵɵdomElementEnd();
        } if (rf & 2) {
            i0.ɵɵadvance();
            i0.ɵɵdomProperty("htmlFor", ctx.fieldId());
            i0.ɵɵadvance();
            i0.ɵɵtextInterpolate(ctx.label());
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.invalid ? 3 : -1);
            i0.ɵɵadvance();
            i0.ɵɵdomProperty("id", ctx.fieldId())("disabled", ctx.disabled)("placeholder", ctx.enableTime() ? "Choose date and time" : "Choose a date");
            i0.ɵɵattribute("aria-invalid", ctx.invalid)("aria-describedby", ctx.fieldId() + "-help");
            i0.ɵɵadvance(2);
            i0.ɵɵconditional(!ctx.invalid ? 6 : -1);
        } }, encapsulation: 2 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(DatePickerComponent, [{
        type: Component,
        args: [{ selector: 'cc-date-picker', providers: [
                    {
                        provide: NG_VALUE_ACCESSOR,
                        useExisting: forwardRef(() => DatePickerComponent),
                        multi: true,
                    },
                ], template: "<div class=\"field\">\n  <label [for]=\"fieldId()\">{{ label() }}</label>\n  @if (invalid) {\n    <div [id]=\"fieldId() + '-help'\" class=\"field-help field-error\">\n      {{ message }}\n    </div>\n  }\n  <input\n    #picker\n    [id]=\"fieldId()\"\n    type=\"text\"\n    autocomplete=\"off\"\n    data-1p-ignore=\"true\"\n    data-lpignore=\"true\"\n    [disabled]=\"disabled\"\n    [placeholder]=\"enableTime() ? 'Choose date and time' : 'Choose a date'\"\n    [attr.aria-invalid]=\"invalid\"\n    [attr.aria-describedby]=\"fieldId() + '-help'\"\n  />\n  @if (!invalid) {\n    <div [id]=\"fieldId() + '-help'\" class=\"field-help\">\n      {{ hint() }}\n    </div>\n  }\n</div>\n" }]
    }], null, { fieldId: [{ type: i0.Input, args: [{ isSignal: true, alias: "fieldId", required: true }] }], label: [{ type: i0.Input, args: [{ isSignal: true, alias: "label", required: true }] }], hint: [{ type: i0.Input, args: [{ isSignal: true, alias: "hint", required: false }] }], control: [{ type: i0.Input, args: [{ isSignal: true, alias: "control", required: false }] }], enableTime: [{ type: i0.Input, args: [{ isSignal: true, alias: "enableTime", required: false }] }], minDate: [{ type: i0.Input, args: [{ isSignal: true, alias: "minDate", required: false }] }], maxDate: [{ type: i0.Input, args: [{ isSignal: true, alias: "maxDate", required: false }] }], inputElement: [{ type: i0.ViewChild, args: ['picker', { isSignal: true }] }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(DatePickerComponent, { className: "DatePickerComponent", filePath: "src/app/shared/date-picker.component.ts", lineNumber: 25 }); })();