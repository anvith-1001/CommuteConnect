import { Component, computed, inject, signal, } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators, } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink, } from '@angular/router';
import { AuthService } from '../../core/auth.service';
import { errorMessage } from '../../core/errors';
import { FieldComponent } from '../../shared/field.component';
import { DatePickerComponent } from '../../shared/date-picker.component';
import { SelectComponent } from '../../shared/select.component';
import { birthDate, meaningful, } from '../../shared/validators';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
function AuthPage_Conditional_25_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 9);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r0.error(), " ");
} }
function AuthPage_Conditional_26_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 10)(1, "div", 16)(2, "span");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "span");
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(6, "div", 17);
    i0.ɵɵelement(7, "div", 18);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate2(" Step ", ctx_r0.currentStep() + 1, " of ", ctx_r0.totalSteps, " ");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", ctx_r0.currentStepTitle(), " ");
    i0.ɵɵadvance();
    i0.ɵɵattribute("aria-valuemin", 1)("aria-valuemax", ctx_r0.totalSteps)("aria-valuenow", ctx_r0.currentStep() + 1)("aria-label", "Registration progress: " + ctx_r0.currentStepTitle());
    i0.ɵɵadvance();
    i0.ɵɵstyleProp("width", ctx_r0.progressPercentage(), "%");
} }
function AuthPage_Conditional_33_Case_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 20);
    i0.ɵɵelement(1, "cc-field", 24);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵproperty("control", ctx_r0.form.controls.name)("maxLength", 100);
} }
function AuthPage_Conditional_33_Case_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 20);
    i0.ɵɵelement(1, "cc-field", 25);
    i0.ɵɵelementStart(2, "p", 26);
    i0.ɵɵtext(3, " Your email is visible only to you. ");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵproperty("control", ctx_r0.form.controls.email)("maxLength", 254);
} }
function AuthPage_Conditional_33_Case_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 20);
    i0.ɵɵelement(1, "cc-field", 27);
    i0.ɵɵelementStart(2, "p", 26);
    i0.ɵɵtext(3, " Choose something unique that you don't use elsewhere. ");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵproperty("control", ctx_r0.form.controls.password)("maxLength", 128);
} }
function AuthPage_Conditional_33_Case_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 20);
    i0.ɵɵelement(1, "cc-date-picker", 28);
    i0.ɵɵelementStart(2, "p", 26);
    i0.ɵɵtext(3, " Your date of birth is visible only to you. ");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵproperty("control", ctx_r0.form.controls.dob)("maxDate", ctx_r0.maxDob);
} }
function AuthPage_Conditional_33_Case_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 20);
    i0.ɵɵelement(1, "cc-select", 29);
    i0.ɵɵelementStart(2, "p", 26);
    i0.ɵɵtext(3, " Your sex is visible only to you. ");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵproperty("control", ctx_r0.form.controls.sex)("options", ctx_r0.sexOptions);
} }
function AuthPage_Conditional_33_Conditional_7_Template(rf, ctx) { if (rf & 1) {
    const _r2 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 30);
    i0.ɵɵlistener("click", function AuthPage_Conditional_33_Conditional_7_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r2); const ctx_r0 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r0.previousStep()); });
    i0.ɵɵtext(1, " Back ");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("disabled", ctx_r0.busy());
} }
function AuthPage_Conditional_33_Conditional_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0, " Please wait\u2026 ");
} }
function AuthPage_Conditional_33_Conditional_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0, " Create account ");
} }
function AuthPage_Conditional_33_Conditional_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0, " Continue ");
} }
function AuthPage_Conditional_33_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 19);
    i0.ɵɵconditionalCreate(1, AuthPage_Conditional_33_Case_1_Template, 2, 2, "div", 20)(2, AuthPage_Conditional_33_Case_2_Template, 4, 2, "div", 20)(3, AuthPage_Conditional_33_Case_3_Template, 4, 2, "div", 20)(4, AuthPage_Conditional_33_Case_4_Template, 4, 2, "div", 20)(5, AuthPage_Conditional_33_Case_5_Template, 4, 2, "div", 20);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "div", 21);
    i0.ɵɵconditionalCreate(7, AuthPage_Conditional_33_Conditional_7_Template, 2, 1, "button", 22);
    i0.ɵɵelementStart(8, "button", 23);
    i0.ɵɵconditionalCreate(9, AuthPage_Conditional_33_Conditional_9_Template, 1, 0)(10, AuthPage_Conditional_33_Conditional_10_Template, 1, 0)(11, AuthPage_Conditional_33_Conditional_11_Template, 1, 0);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    let tmp_2_0;
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵattribute("data-step", ctx_r0.currentStep());
    i0.ɵɵadvance();
    i0.ɵɵconditional((tmp_2_0 = ctx_r0.currentStep()) === 0 ? 1 : tmp_2_0 === 1 ? 2 : tmp_2_0 === 2 ? 3 : tmp_2_0 === 3 ? 4 : tmp_2_0 === 4 ? 5 : -1);
    i0.ɵɵadvance(6);
    i0.ɵɵconditional(ctx_r0.currentStep() > 0 ? 7 : -1);
    i0.ɵɵadvance();
    i0.ɵɵproperty("disabled", ctx_r0.busy());
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r0.busy() ? 9 : ctx_r0.isLastStep() ? 10 : 11);
} }
function AuthPage_Conditional_34_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "cc-field", 25)(1, "cc-field", 31);
    i0.ɵɵelementStart(2, "button", 32);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵproperty("control", ctx_r0.form.controls.email)("maxLength", 254);
    i0.ɵɵadvance();
    i0.ɵɵproperty("control", ctx_r0.form.controls.password)("maxLength", 128);
    i0.ɵɵadvance();
    i0.ɵɵproperty("disabled", ctx_r0.busy());
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r0.busy() ? "Please wait\u2026" : "Sign in", " ");
} }
export class AuthPage {
    fb = inject(FormBuilder);
    route = inject(ActivatedRoute);
    router = inject(Router);
    auth = inject(AuthService);
    register = this.route.snapshot.routeConfig?.path === 'register';
    busy = signal(false, ...(ngDevMode ? [{ debugName: "busy" }] : /* istanbul ignore next */ []));
    error = signal('', ...(ngDevMode ? [{ debugName: "error" }] : /* istanbul ignore next */ []));
    currentStep = signal(0, ...(ngDevMode ? [{ debugName: "currentStep" }] : /* istanbul ignore next */ []));
    totalSteps = 5;
    maxDob = new Date()
        .toISOString()
        .slice(0, 10);
    sexOptions = [
        {
            value: 'female',
            label: 'Female',
        },
        {
            value: 'male',
            label: 'Male',
        },
        {
            value: 'other',
            label: 'Other',
        },
        {
            value: 'prefer_not_to_say',
            label: 'Prefer not to say',
        },
    ];
    form = this.fb.nonNullable.group({
        name: [
            '',
            this.register
                ? [
                    Validators.required,
                    meaningful,
                    Validators.maxLength(100),
                ]
                : [],
        ],
        email: [
            '',
            [
                Validators.required,
                Validators.email,
                Validators.maxLength(254),
            ],
        ],
        password: [
            '',
            [
                Validators.required,
                Validators.minLength(this.register ? 12 : 1),
                Validators.maxLength(128),
            ],
        ],
        dob: [
            '',
            this.register
                ? [
                    Validators.required,
                    birthDate,
                ]
                : [],
        ],
        sex: [
            '',
            this.register
                ? [
                    Validators.required,
                ]
                : [],
        ],
    });
    progressPercentage = computed(() => {
        return (((this.currentStep() + 1) /
            this.totalSteps) *
            100);
    }, ...(ngDevMode ? [{ debugName: "progressPercentage" }] : /* istanbul ignore next */ []));
    currentStepTitle = computed(() => {
        switch (this.currentStep()) {
            case 0:
                return 'About you';
            case 1:
                return 'Your email';
            case 2:
                return 'Security';
            case 3:
                return 'Birthday';
            case 4:
                return 'One last detail';
            default:
                return '';
        }
    }, ...(ngDevMode ? [{ debugName: "currentStepTitle" }] : /* istanbul ignore next */ []));
    currentStepHeading = computed(() => {
        switch (this.currentStep()) {
            case 0:
                return 'What should we call you?';
            case 1:
                return 'What’s your email?';
            case 2:
                return 'Create a password';
            case 3:
                return 'When were you born?';
            case 4:
                return 'How do you identify?';
            default:
                return 'Create your account';
        }
    }, ...(ngDevMode ? [{ debugName: "currentStepHeading" }] : /* istanbul ignore next */ []));
    currentStepDescription = computed(() => {
        switch (this.currentStep()) {
            case 0:
                return 'Start with your name.';
            case 1:
                return 'We’ll use this to sign you in.';
            case 2:
                return 'Keep your account protected with a strong password.';
            case 3:
                return 'This helps us keep CommuteConnect appropriate for everyone.';
            case 4:
                return 'That’s everything we need to get you on your way.';
            default:
                return '';
        }
    }, ...(ngDevMode ? [{ debugName: "currentStepDescription" }] : /* istanbul ignore next */ []));
    isLastStep() {
        return (this.currentStep() ===
            this.totalSteps - 1);
    }
    handleRegisterSubmit() {
        if (this.busy()) {
            return;
        }
        if (this.isLastStep()) {
            void this.submit();
            return;
        }
        this.nextStep();
    }
    nextStep() {
        const control = this.currentStepControl();
        control.markAsTouched();
        if (control.invalid) {
            return;
        }
        this.error.set('');
        if (!this.isLastStep()) {
            this.currentStep.update((step) => step + 1);
        }
    }
    previousStep() {
        if (this.busy() ||
            this.currentStep() === 0) {
            return;
        }
        this.error.set('');
        this.currentStep.update((step) => step - 1);
    }
    currentStepControl() {
        switch (this.currentStep()) {
            case 0:
                return this.form.controls.name;
            case 1:
                return this.form.controls.email;
            case 2:
                return this.form.controls.password;
            case 3:
                return this.form.controls.dob;
            case 4:
                return this.form.controls.sex;
            default:
                return this.form.controls.name;
        }
    }
    async submit() {
        if (this.busy()) {
            return;
        }
        if (this.register) {
            const control = this.currentStepControl();
            control.markAsTouched();
            if (control.invalid) {
                return;
            }
        }
        this.form.markAllAsTouched();
        if (this.form.invalid) {
            return;
        }
        this.busy.set(true);
        this.error.set('');
        try {
            const value = this.form.getRawValue();
            if (this.register) {
                await this.auth.register({
                    ...value,
                    name: value.name.trim(),
                });
            }
            else {
                await this.auth.login({
                    email: value.email,
                    password: value.password,
                });
            }
            const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
            await this.router.navigateByUrl(returnUrl?.startsWith('/') &&
                !returnUrl.startsWith('//')
                ? returnUrl
                : '/commutes', {
                replaceUrl: true,
            });
        }
        catch (e) {
            this.error.set(errorMessage(e));
        }
        finally {
            this.busy.set(false);
        }
    }
    static ɵfac = function AuthPage_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AuthPage)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: AuthPage, selectors: [["ng-component"]], decls: 39, vars: 11, consts: [[1, "auth-layout"], [1, "auth-intro"], [1, "eyebrow"], ["aria-hidden", "true", 1, "route-illustration"], [1, "route-place"], [1, "route-dot"], [1, "route-line"], [1, "auth-note"], [1, "panel", "auth-panel"], ["role", "alert", 1, "error-banner"], [1, "registration-progress"], [1, "auth-heading"], [1, "subtle"], ["novalidate", "", 3, "ngSubmit", "formGroup"], [1, "auth-switch"], [3, "routerLink"], [1, "progress-meta"], ["role", "progressbar", 1, "progress-track"], [1, "progress-value"], [1, "registration-step"], [1, "step-content"], [1, "step-actions"], ["type", "button", 1, "button", "step-back", 3, "disabled"], ["type", "submit", 1, "button", "step-primary", 3, "disabled"], ["fieldId", "name", "label", "Full name", "autocomplete", "name", 3, "control", "maxLength"], ["fieldId", "email", "label", "Email", "type", "email", "autocomplete", "email", 3, "control", "maxLength"], [1, "privacy-note"], ["fieldId", "password", "label", "Password", "type", "password", "autocomplete", "new-password", "hint", "Use at least 12 characters.", 3, "control", "maxLength"], ["fieldId", "dob", "label", "Date of birth", "formControlName", "dob", "minDate", "1900-01-01", 3, "control", "maxDate"], ["fieldId", "sex", "label", "Sex", "formControlName", "sex", 3, "control", "options"], ["type", "button", 1, "button", "step-back", 3, "click", "disabled"], ["fieldId", "password", "label", "Password", "type", "password", "autocomplete", "current-password", 3, "control", "maxLength"], ["type", "submit", 1, "button", "full", 3, "disabled"]], template: function AuthPage_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "section", 0)(1, "div", 1)(2, "p", 2);
            i0.ɵɵtext(3, "GOING THE SAME WAY");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(4, "h1");
            i0.ɵɵtext(5, " Your route. ");
            i0.ɵɵelement(6, "br");
            i0.ɵɵtext(7, " Better together. ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(8, "p");
            i0.ɵɵtext(9, " Find someone heading your way or make room for one more. ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(10, "div", 3)(11, "div", 4);
            i0.ɵɵelement(12, "span", 5);
            i0.ɵɵelementStart(13, "span");
            i0.ɵɵtext(14, "From home");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(15, "div", 6)(16, "span");
            i0.ɵɵtext(17, "Share the way");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(18, "div", 4);
            i0.ɵɵelement(19, "span", 5);
            i0.ɵɵelementStart(20, "span");
            i0.ɵɵtext(21, "To work");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(22, "p", 7);
            i0.ɵɵtext(23, " One route. Fewer empty seats. ");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(24, "div", 8);
            i0.ɵɵconditionalCreate(25, AuthPage_Conditional_25_Template, 2, 1, "p", 9);
            i0.ɵɵconditionalCreate(26, AuthPage_Conditional_26_Template, 8, 9, "div", 10);
            i0.ɵɵelementStart(27, "div", 11)(28, "h2");
            i0.ɵɵtext(29);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(30, "p", 12);
            i0.ɵɵtext(31);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(32, "form", 13);
            i0.ɵɵlistener("ngSubmit", function AuthPage_Template_form_ngSubmit_32_listener() { return ctx.register ? ctx.handleRegisterSubmit() : ctx.submit(); });
            i0.ɵɵconditionalCreate(33, AuthPage_Conditional_33_Template, 12, 5)(34, AuthPage_Conditional_34_Template, 4, 6);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(35, "p", 14);
            i0.ɵɵtext(36);
            i0.ɵɵelementStart(37, "a", 15);
            i0.ɵɵtext(38);
            i0.ɵɵelementEnd()()()();
        } if (rf & 2) {
            i0.ɵɵclassProp("login-mode", !ctx.register);
            i0.ɵɵadvance(25);
            i0.ɵɵconditional(ctx.error() ? 25 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.register ? 26 : -1);
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate1(" ", ctx.register ? ctx.currentStepHeading() : "Welcome back", " ");
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate1(" ", ctx.register ? ctx.currentStepDescription() : "Sign in to find people going your way.", " ");
            i0.ɵɵadvance();
            i0.ɵɵproperty("formGroup", ctx.form);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.register ? 33 : 34);
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate1(" ", ctx.register ? "Already have an account?" : "New to CommuteConnect?", " ");
            i0.ɵɵadvance();
            i0.ɵɵproperty("routerLink", ctx.register ? "/login" : "/register");
            i0.ɵɵadvance();
            i0.ɵɵtextInterpolate1(" ", ctx.register ? "Sign in" : "Create an account", " ");
        } }, dependencies: [ReactiveFormsModule, i1.ɵNgNoValidate, i1.NgControlStatus, i1.NgControlStatusGroup, i1.FormGroupDirective, i1.FormControlName, RouterLink,
            FieldComponent,
            DatePickerComponent,
            SelectComponent], styles: ["[_nghost-%COMP%] {\n  display: block;\n\n  width: 100%;\n\n  \n\n\n\n\n  height: 100%;\n\n  min-height: 0;\n\n  overflow: hidden;\n}\n\n.auth-layout[_ngcontent-%COMP%] {\n  width: 100%;\n\n  \n\n\n\n\n  height: 100%;\n\n  min-height: 0;\n\n  display: grid;\n\n  \n\n\n\n\n\n\n\n  grid-template-columns:\n    minmax(420px, 0.9fr)\n    minmax(480px, 1.1fr);\n\n  align-items: stretch;\n\n  overflow: hidden;\n}\n\n\n\n\n\n.auth-intro[_ngcontent-%COMP%] {\n  position: relative;\n\n  min-width: 0;\n  min-height: 0;\n\n  display: flex;\n  flex-direction: column;\n\n  justify-content: center;\n\n  padding:\n    clamp(36px, 5vh, 72px)\n    clamp(42px, 5vw, 92px);\n\n  overflow: hidden;\n\n  border-right:\n    1px solid\n    color-mix(\n      in srgb,\n      currentColor 12%,\n      transparent\n    );\n}\n\n.eyebrow[_ngcontent-%COMP%] {\n  margin: 0 0 18px;\n\n  font-size: 0.72rem;\n\n  font-weight: 700;\n\n  line-height: 1;\n\n  letter-spacing: 0.16em;\n\n  opacity: 0.52;\n}\n\n.auth-intro[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  width: 100%;\n\n  max-width: 580px;\n\n  margin: 0;\n\n  \n\n\n\n  font-size:\n    clamp(\n      3.4rem,\n      5vw,\n      5.3rem\n    );\n\n  font-weight: 650;\n\n  line-height: 0.94;\n\n  letter-spacing: -0.065em;\n\n  text-wrap: balance;\n}\n\n.auth-intro[_ngcontent-%COMP%]    > p[_ngcontent-%COMP%]:not(\n    .eyebrow,\n    .auth-note\n  ) {\n  width: 100%;\n\n  max-width: 390px;\n\n  margin:\n    clamp(24px, 3vh, 36px)\n    0\n    0;\n\n  font-size:\n    clamp(\n      0.95rem,\n      1.25vw,\n      1.12rem\n    );\n\n  line-height: 1.55;\n\n  opacity: 0.58;\n}\n\n\n\n\n\n.route-illustration[_ngcontent-%COMP%] {\n  width: 100%;\n\n  max-width: 430px;\n\n  margin-top:\n    clamp(\n      30px,\n      5vh,\n      58px\n    );\n\n  \n\n\n\n  flex-shrink: 1;\n}\n\n.route-place[_ngcontent-%COMP%] {\n  display: flex;\n\n  align-items: center;\n\n  gap: 13px;\n\n  font-size: 0.9rem;\n\n  font-weight: 600;\n}\n\n.route-dot[_ngcontent-%COMP%] {\n  width: 9px;\n  height: 9px;\n\n  flex: 0 0 auto;\n\n  border-radius: 50%;\n\n  background: currentColor;\n}\n\n.route-line[_ngcontent-%COMP%] {\n  position: relative;\n\n  min-height:\n    clamp(\n      42px,\n      6vh,\n      64px\n    );\n\n  margin-left: 4px;\n\n  padding-left: 26px;\n\n  display: flex;\n\n  align-items: center;\n}\n\n.route-line[_ngcontent-%COMP%]::before {\n  content: '';\n\n  position: absolute;\n\n  left: 0;\n\n  top: 7px;\n  bottom: 7px;\n\n  width: 2px;\n\n  border-radius: 999px;\n\n  background: currentColor;\n\n  opacity: 0.14;\n}\n\n.route-line[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  font-size: 0.75rem;\n\n  letter-spacing: 0.04em;\n\n  text-transform: uppercase;\n\n  opacity: 0.4;\n}\n\n.auth-note[_ngcontent-%COMP%] {\n  margin:\n    clamp(\n      24px,\n      4vh,\n      40px\n    )\n    0\n    0;\n\n  font-size: 0.82rem;\n\n  opacity: 0.4;\n}\n\n\n\n\n\n.auth-panel[_ngcontent-%COMP%] {\n  width: 100%;\n\n  min-width: 0;\n  min-height: 0;\n\n  position: relative;\n\n  display: flex;\n\n  flex-direction: column;\n\n  justify-content: center;\n\n  padding:\n    clamp(32px, 5vh, 64px)\n    clamp(48px, 7vw, 120px);\n\n  overflow: hidden;\n}\n\n.auth-heading[_ngcontent-%COMP%] {\n  margin-bottom:\n    clamp(\n      22px,\n      3vh,\n      30px\n    );\n}\n\n.auth-heading[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin:\n    0\n    0\n    10px;\n\n  font-size:\n    clamp(\n      1.9rem,\n      2.6vw,\n      2.6rem\n    );\n\n  font-weight: 650;\n\n  line-height: 1.08;\n\n  letter-spacing: -0.045em;\n}\n\n.auth-heading[_ngcontent-%COMP%]   .subtle[_ngcontent-%COMP%] {\n  margin: 0;\n\n  font-size: 1rem;\n\n  line-height: 1.5;\n\n  opacity: 0.55;\n}\n\n\n\n\n\n.registration-progress[_ngcontent-%COMP%] {\n  width: 100%;\n\n  margin-bottom:\n    clamp(\n      32px,\n      5vh,\n      52px\n    );\n}\n\n.progress-meta[_ngcontent-%COMP%] {\n  display: flex;\n\n  justify-content: space-between;\n\n  align-items: center;\n\n  gap: 20px;\n\n  margin-bottom: 12px;\n\n  font-size: 0.78rem;\n\n  font-weight: 650;\n\n  line-height: 1.2;\n\n  opacity: 0.55;\n}\n\n.progress-meta[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:last-child {\n  min-width: 0;\n\n  overflow: hidden;\n\n  text-overflow: ellipsis;\n\n  white-space: nowrap;\n\n  text-align: right;\n}\n\n.progress-track[_ngcontent-%COMP%] {\n  width: 100%;\n\n  height: 3px;\n\n  overflow: hidden;\n\n  border-radius: 999px;\n\n  background:\n    color-mix(\n      in srgb,\n      currentColor 13%,\n      transparent\n    );\n}\n\n.progress-value[_ngcontent-%COMP%] {\n  height: 100%;\n\n  border-radius: inherit;\n\n  background: currentColor;\n\n  transition:\n    width\n    400ms\n    cubic-bezier(\n      0.22,\n      1,\n      0.36,\n      1\n    );\n}\n\n\n\n\n\n.registration-step[_ngcontent-%COMP%] {\n  width: 100%;\n\n  \n\n\n\n  min-height: 150px;\n\n  animation:\n    _ngcontent-%COMP%_step-enter\n    340ms\n    cubic-bezier(\n      0.22,\n      1,\n      0.36,\n      1\n    );\n}\n\n.step-content[_ngcontent-%COMP%] {\n  width: 100%;\n}\n\n.privacy-note[_ngcontent-%COMP%] {\n  margin:\n    14px\n    0\n    0;\n\n  font-size: 0.8rem;\n\n  line-height: 1.5;\n\n  opacity: 0.46;\n}\n\n\n\n\n\n.step-actions[_ngcontent-%COMP%] {\n  width: 100%;\n\n  display: grid;\n\n  grid-template-columns:\n    auto\n    minmax(0, 1fr);\n\n  align-items: stretch;\n\n  gap: 12px;\n\n  margin-top:\n    clamp(\n      24px,\n      4vh,\n      38px\n    );\n}\n\n.step-actions[_ngcontent-%COMP%]   .button[_ngcontent-%COMP%] {\n  min-height: 52px;\n\n  border-radius: 12px;\n}\n\n\n\n\n\n\n\n\n.step-back[_ngcontent-%COMP%] {\n  min-width: 104px;\n\n  padding:\n    0\n    24px;\n\n  background: transparent !important;\n\n  color: #111111 !important;\n\n  border:\n    1.5px\n    solid\n    #111111 !important;\n\n  box-shadow: none !important;\n}\n\n.step-back[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background:\n    rgba(\n      0,\n      0,\n      0,\n      0.045\n    ) !important;\n}\n\n.step-back[_ngcontent-%COMP%]:active:not(:disabled) {\n  transform: scale(0.985);\n}\n\n.step-back[_ngcontent-%COMP%]:disabled {\n  color:\n    rgba(\n      17,\n      17,\n      17,\n      0.35\n    ) !important;\n\n  border-color:\n    rgba(\n      17,\n      17,\n      17,\n      0.2\n    ) !important;\n}\n\n.step-primary[_ngcontent-%COMP%] {\n  width: 100%;\n}\n\n.auth-switch[_ngcontent-%COMP%] {\n  margin:\n    clamp(\n      24px,\n      4vh,\n      36px\n    )\n    0\n    0;\n\n  text-align: center;\n\n  font-size: 0.88rem;\n\n  line-height: 1.5;\n}\n\n.auth-switch[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  margin-left: 5px;\n\n  font-weight: 650;\n}\n\n.error-banner[_ngcontent-%COMP%] {\n  flex: 0 0 auto;\n\n  margin:\n    0\n    0\n    20px;\n}\n\n@media (min-width: 901px) {\n  .login-mode[_ngcontent-%COMP%]   .auth-panel[_ngcontent-%COMP%] {\n    padding-top: clamp(20px, 3vh, 36px);\n    padding-bottom: clamp(20px, 3vh, 36px);\n  }\n\n  .login-mode[_ngcontent-%COMP%]   .auth-heading[_ngcontent-%COMP%] {\n    margin-bottom: 18px;\n  }\n\n  .login-mode[_ngcontent-%COMP%]   form[_ngcontent-%COMP%] {\n    gap: 14px;\n  }\n\n  .login-mode[_ngcontent-%COMP%]   .auth-switch[_ngcontent-%COMP%] {\n    margin-top: 16px;\n  }\n}\n\n\n\n\n\n@keyframes _ngcontent-%COMP%_step-enter {\n  from {\n    opacity: 0;\n\n    transform:\n      translateX(18px);\n  }\n\n  to {\n    opacity: 1;\n\n    transform:\n      translateX(0);\n  }\n}\n\n\n\n\n\n@media (\n  min-width: 901px\n) and (\n  max-height: 800px\n) {\n  .auth-intro[_ngcontent-%COMP%] {\n    padding-top: 30px;\n    padding-bottom: 30px;\n  }\n\n  .auth-intro[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n    font-size:\n      clamp(\n        3.1rem,\n        4.6vw,\n        4.65rem\n      );\n  }\n\n  .auth-intro[_ngcontent-%COMP%]    > p[_ngcontent-%COMP%]:not(\n      .eyebrow,\n      .auth-note\n    ) {\n    margin-top: 20px;\n  }\n\n  .route-illustration[_ngcontent-%COMP%] {\n    margin-top: 26px;\n  }\n\n  .route-line[_ngcontent-%COMP%] {\n    min-height: 40px;\n  }\n\n  .auth-note[_ngcontent-%COMP%] {\n    margin-top: 22px;\n  }\n\n  .auth-panel[_ngcontent-%COMP%] {\n    padding-top: 28px;\n    padding-bottom: 28px;\n  }\n\n  .registration-progress[_ngcontent-%COMP%] {\n    margin-bottom: 28px;\n  }\n\n  .auth-heading[_ngcontent-%COMP%] {\n    margin-bottom: 20px;\n  }\n\n  .registration-step[_ngcontent-%COMP%] {\n    min-height: 132px;\n  }\n\n  .step-actions[_ngcontent-%COMP%] {\n    margin-top: 20px;\n  }\n\n  .auth-switch[_ngcontent-%COMP%] {\n    margin-top: 20px;\n  }\n}\n\n\n\n\n\n@media (\n  max-width: 1100px\n) and (\n  min-width: 901px\n) {\n  .auth-layout[_ngcontent-%COMP%] {\n    grid-template-columns:\n      minmax(350px, 0.82fr)\n      minmax(440px, 1.18fr);\n  }\n\n  .auth-intro[_ngcontent-%COMP%] {\n    padding-left: 42px;\n    padding-right: 42px;\n  }\n\n  .auth-intro[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n    font-size:\n      clamp(\n        3rem,\n        5.1vw,\n        4.4rem\n      );\n  }\n\n  .auth-panel[_ngcontent-%COMP%] {\n    padding-left: 52px;\n    padding-right: 52px;\n  }\n}\n\n\n\n\n\n@media (\n  max-width: 960px\n) {\n  [_nghost-%COMP%] {\n    \n\n\n\n\n\n\n    height: auto;\n\n    min-height: 100%;\n\n    overflow: visible;\n  }\n\n  .auth-layout[_ngcontent-%COMP%] {\n    height: auto;\n\n    min-height: 100%;\n\n    display: block;\n\n    overflow: visible;\n  }\n\n  \n\n\n\n  .auth-intro[_ngcontent-%COMP%] {\n    display: none;\n  }\n\n  .auth-intro[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n    max-width: 500px;\n\n    font-size:\n      clamp(\n        2.8rem,\n        12vw,\n        4.5rem\n      );\n\n    line-height: 0.96;\n  }\n\n  .auth-intro[_ngcontent-%COMP%]    > p[_ngcontent-%COMP%]:not(\n      .eyebrow,\n      .auth-note\n    ) {\n    max-width: 430px;\n\n    margin-top: 18px;\n  }\n\n  \n\n\n\n  .route-illustration[_ngcontent-%COMP%], \n   .auth-note[_ngcontent-%COMP%] {\n    display: none;\n  }\n\n  .auth-panel[_ngcontent-%COMP%] {\n    width: min(100%, 640px);\n\n    min-height: auto;\n\n    display: block;\n\n    margin: 0 auto;\n\n    padding:\n      32px\n      max(\n        22px,\n        env(\n          safe-area-inset-right\n        )\n      )\n      max(\n        36px,\n        env(\n          safe-area-inset-bottom\n        )\n      )\n      max(\n        22px,\n        env(\n          safe-area-inset-left\n        )\n      );\n\n    overflow: visible;\n  }\n\n  .registration-progress[_ngcontent-%COMP%] {\n    margin-bottom: 32px;\n  }\n\n  .auth-heading[_ngcontent-%COMP%] {\n    margin-bottom: 26px;\n  }\n\n  .registration-step[_ngcontent-%COMP%] {\n    min-height: 145px;\n  }\n}\n\n\n\n\n\n@media (\n  max-width: 520px\n) {\n  .auth-intro[_ngcontent-%COMP%] {\n    padding-top:\n      max(\n        22px,\n        env(\n          safe-area-inset-top\n        )\n      );\n\n    padding-bottom: 24px;\n  }\n\n  .eyebrow[_ngcontent-%COMP%] {\n    margin-bottom: 14px;\n\n    font-size: 0.66rem;\n  }\n\n  .auth-intro[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n    font-size:\n      clamp(\n        2.55rem,\n        12.5vw,\n        3.8rem\n      );\n  }\n\n  .auth-intro[_ngcontent-%COMP%]    > p[_ngcontent-%COMP%]:not(\n      .eyebrow,\n      .auth-note\n    ) {\n    margin-top: 16px;\n\n    font-size: 0.92rem;\n  }\n\n  .auth-panel[_ngcontent-%COMP%] {\n    padding-top: 28px;\n  }\n\n  .progress-meta[_ngcontent-%COMP%] {\n    font-size: 0.72rem;\n  }\n\n  .auth-heading[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n    font-size: 1.85rem;\n  }\n\n  .auth-heading[_ngcontent-%COMP%]   .subtle[_ngcontent-%COMP%] {\n    font-size: 0.94rem;\n  }\n\n  \n\n\n\n  .step-actions[_ngcontent-%COMP%] {\n    grid-template-columns:\n      88px\n      minmax(0, 1fr);\n\n    gap: 10px;\n  }\n\n  .step-back[_ngcontent-%COMP%] {\n    min-width: 0;\n\n    padding:\n      0\n      12px;\n  }\n}\n\n\n\n\n\n@media (\n  max-width: 360px\n) {\n  .auth-intro[_ngcontent-%COMP%], \n   .auth-panel[_ngcontent-%COMP%] {\n    padding-left:\n      max(\n        16px,\n        env(\n          safe-area-inset-left\n        )\n      );\n\n    padding-right:\n      max(\n        16px,\n        env(\n          safe-area-inset-right\n        )\n      );\n  }\n\n  .step-actions[_ngcontent-%COMP%] {\n    grid-template-columns:\n      78px\n      minmax(0, 1fr);\n\n    gap: 8px;\n  }\n}\n\n\n\n\n\n@media (\n  prefers-reduced-motion:\n    reduce\n) {\n  .registration-step[_ngcontent-%COMP%] {\n    animation: none;\n  }\n\n  .progress-value[_ngcontent-%COMP%] {\n    transition: none;\n  }\n\n  .step-back[_ngcontent-%COMP%]:active:not(:disabled) {\n    transform: none;\n  }\n}"] });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AuthPage, [{
        type: Component,
        args: [{ imports: [
                    ReactiveFormsModule,
                    RouterLink,
                    FieldComponent,
                    DatePickerComponent,
                    SelectComponent,
                ], template: "<section\n  class=\"auth-layout\"\n  [class.login-mode]=\"!register\"\n>\n  <div class=\"auth-intro\">\n    <p class=\"eyebrow\">GOING THE SAME WAY</p>\n\n    <h1>\n      Your route.\n      <br />\n      Better together.\n    </h1>\n\n    <p>\n      Find someone heading your way or make room for one more.\n    </p>\n\n    <div class=\"route-illustration\" aria-hidden=\"true\">\n      <div class=\"route-place\">\n        <span class=\"route-dot\"></span>\n        <span>From home</span>\n      </div>\n\n      <div class=\"route-line\">\n        <span>Share the way</span>\n      </div>\n\n      <div class=\"route-place\">\n        <span class=\"route-dot\"></span>\n        <span>To work</span>\n      </div>\n    </div>\n\n    <p class=\"auth-note\">\n      One route. Fewer empty seats.\n    </p>\n  </div>\n\n  <div class=\"panel auth-panel\">\n    @if (error()) {\n      <p class=\"error-banner\" role=\"alert\">\n        {{ error() }}\n      </p>\n    }\n\n    @if (register) {\n      <div class=\"registration-progress\">\n        <div class=\"progress-meta\">\n          <span>\n            Step {{ currentStep() + 1 }} of {{ totalSteps }}\n          </span>\n\n          <span>\n            {{ currentStepTitle() }}\n          </span>\n        </div>\n\n        <div\n          class=\"progress-track\"\n          role=\"progressbar\"\n          [attr.aria-valuemin]=\"1\"\n          [attr.aria-valuemax]=\"totalSteps\"\n          [attr.aria-valuenow]=\"currentStep() + 1\"\n          [attr.aria-label]=\"'Registration progress: ' + currentStepTitle()\"\n        >\n          <div\n            class=\"progress-value\"\n            [style.width.%]=\"progressPercentage()\"\n          ></div>\n        </div>\n      </div>\n    }\n\n    <div class=\"auth-heading\">\n      <h2>\n        {{\n          register\n            ? currentStepHeading()\n            : 'Welcome back'\n        }}\n      </h2>\n\n      <p class=\"subtle\">\n        {{\n          register\n            ? currentStepDescription()\n            : 'Sign in to find people going your way.'\n        }}\n      </p>\n    </div>\n\n    <form\n      [formGroup]=\"form\"\n      (ngSubmit)=\"register ? handleRegisterSubmit() : submit()\"\n      novalidate\n    >\n      @if (register) {\n        <div\n          class=\"registration-step\"\n          [attr.data-step]=\"currentStep()\"\n        >\n          @switch (currentStep()) {\n            @case (0) {\n              <div class=\"step-content\">\n                <cc-field\n                  fieldId=\"name\"\n                  label=\"Full name\"\n                  [control]=\"form.controls.name\"\n                  autocomplete=\"name\"\n                  [maxLength]=\"100\"\n                />\n              </div>\n            }\n\n            @case (1) {\n              <div class=\"step-content\">\n                <cc-field\n                  fieldId=\"email\"\n                  label=\"Email\"\n                  [control]=\"form.controls.email\"\n                  type=\"email\"\n                  autocomplete=\"email\"\n                  [maxLength]=\"254\"\n                />\n\n                <p class=\"privacy-note\">\n                  Your email is visible only to you.\n                </p>\n              </div>\n            }\n\n            @case (2) {\n              <div class=\"step-content\">\n                <cc-field\n                  fieldId=\"password\"\n                  label=\"Password\"\n                  [control]=\"form.controls.password\"\n                  type=\"password\"\n                  autocomplete=\"new-password\"\n                  hint=\"Use at least 12 characters.\"\n                  [maxLength]=\"128\"\n                />\n\n                <p class=\"privacy-note\">\n                  Choose something unique that you don't use elsewhere.\n                </p>\n              </div>\n            }\n\n            @case (3) {\n              <div class=\"step-content\">\n                <cc-date-picker\n                  fieldId=\"dob\"\n                  label=\"Date of birth\"\n                  formControlName=\"dob\"\n                  [control]=\"form.controls.dob\"\n                  minDate=\"1900-01-01\"\n                  [maxDate]=\"maxDob\"\n                />\n\n                <p class=\"privacy-note\">\n                  Your date of birth is visible only to you.\n                </p>\n              </div>\n            }\n\n            @case (4) {\n              <div class=\"step-content\">\n                <cc-select\n                  fieldId=\"sex\"\n                  label=\"Sex\"\n                  formControlName=\"sex\"\n                  [control]=\"form.controls.sex\"\n                  [options]=\"sexOptions\"\n                />\n\n                <p class=\"privacy-note\">\n                  Your sex is visible only to you.\n                </p>\n              </div>\n            }\n          }\n        </div>\n\n        <div class=\"step-actions\">\n          @if (currentStep() > 0) {\n            <button\n              class=\"button step-back\"\n              type=\"button\"\n              [disabled]=\"busy()\"\n              (click)=\"previousStep()\"\n            >\n              Back\n            </button>\n          }\n\n          <button\n            class=\"button step-primary\"\n            type=\"submit\"\n            [disabled]=\"busy()\"\n          >\n            @if (busy()) {\n              Please wait\u2026\n            } @else if (isLastStep()) {\n              Create account\n            } @else {\n              Continue\n            }\n          </button>\n        </div>\n      } @else {\n        <cc-field\n          fieldId=\"email\"\n          label=\"Email\"\n          [control]=\"form.controls.email\"\n          type=\"email\"\n          autocomplete=\"email\"\n          [maxLength]=\"254\"\n        />\n\n        <cc-field\n          fieldId=\"password\"\n          label=\"Password\"\n          [control]=\"form.controls.password\"\n          type=\"password\"\n          autocomplete=\"current-password\"\n          [maxLength]=\"128\"\n        />\n\n        <button\n          class=\"button full\"\n          type=\"submit\"\n          [disabled]=\"busy()\"\n        >\n          {{ busy() ? 'Please wait\u2026' : 'Sign in' }}\n        </button>\n      }\n    </form>\n\n    <p class=\"auth-switch\">\n      {{\n        register\n          ? 'Already have an account?'\n          : 'New to CommuteConnect?'\n      }}\n\n      <a [routerLink]=\"register ? '/login' : '/register'\">\n        {{\n          register\n            ? 'Sign in'\n            : 'Create an account'\n        }}\n      </a>\n    </p>\n  </div>\n</section>\n", styles: [":host {\n  display: block;\n\n  width: 100%;\n\n  /*\n   * The application already has a header and footer.\n   * Keep the authentication page inside the available viewport\n   * instead of allowing it to increase the document height.\n   */\n  height: 100%;\n\n  min-height: 0;\n\n  overflow: hidden;\n}\n\n.auth-layout {\n  width: 100%;\n\n  /*\n   * Keep the auth screen fixed inside the visible application area.\n   * This prevents the authentication page itself from creating\n   * vertical scrolling on desktop.\n   */\n  height: 100%;\n\n  min-height: 0;\n\n  display: grid;\n\n  /*\n   * Give the left side enough physical space so the headline\n   * never collapses into:\n   *\n   * Better\n   * togeth\n   * er.\n   */\n  grid-template-columns:\n    minmax(420px, 0.9fr)\n    minmax(480px, 1.1fr);\n\n  align-items: stretch;\n\n  overflow: hidden;\n}\n\n/* -------------------------------------------------------------------------- */\n/* LEFT SIDE                                                                  */\n/* -------------------------------------------------------------------------- */\n\n.auth-intro {\n  position: relative;\n\n  min-width: 0;\n  min-height: 0;\n\n  display: flex;\n  flex-direction: column;\n\n  justify-content: center;\n\n  padding:\n    clamp(36px, 5vh, 72px)\n    clamp(42px, 5vw, 92px);\n\n  overflow: hidden;\n\n  border-right:\n    1px solid\n    color-mix(\n      in srgb,\n      currentColor 12%,\n      transparent\n    );\n}\n\n.eyebrow {\n  margin: 0 0 18px;\n\n  font-size: 0.72rem;\n\n  font-weight: 700;\n\n  line-height: 1;\n\n  letter-spacing: 0.16em;\n\n  opacity: 0.52;\n}\n\n.auth-intro h1 {\n  width: 100%;\n\n  max-width: 580px;\n\n  margin: 0;\n\n  /*\n   * Large, but deliberately capped so \"Better together.\"\n   * stays intact at normal desktop widths.\n   */\n  font-size:\n    clamp(\n      3.4rem,\n      5vw,\n      5.3rem\n    );\n\n  font-weight: 650;\n\n  line-height: 0.94;\n\n  letter-spacing: -0.065em;\n\n  text-wrap: balance;\n}\n\n.auth-intro > p:not(\n    .eyebrow,\n    .auth-note\n  ) {\n  width: 100%;\n\n  max-width: 390px;\n\n  margin:\n    clamp(24px, 3vh, 36px)\n    0\n    0;\n\n  font-size:\n    clamp(\n      0.95rem,\n      1.25vw,\n      1.12rem\n    );\n\n  line-height: 1.55;\n\n  opacity: 0.58;\n}\n\n/* -------------------------------------------------------------------------- */\n/* ROUTE ILLUSTRATION                                                         */\n/* -------------------------------------------------------------------------- */\n\n.route-illustration {\n  width: 100%;\n\n  max-width: 430px;\n\n  margin-top:\n    clamp(\n      30px,\n      5vh,\n      58px\n    );\n\n  /*\n   * Prevent the illustration from growing enough to push\n   * the page below the viewport.\n   */\n  flex-shrink: 1;\n}\n\n.route-place {\n  display: flex;\n\n  align-items: center;\n\n  gap: 13px;\n\n  font-size: 0.9rem;\n\n  font-weight: 600;\n}\n\n.route-dot {\n  width: 9px;\n  height: 9px;\n\n  flex: 0 0 auto;\n\n  border-radius: 50%;\n\n  background: currentColor;\n}\n\n.route-line {\n  position: relative;\n\n  min-height:\n    clamp(\n      42px,\n      6vh,\n      64px\n    );\n\n  margin-left: 4px;\n\n  padding-left: 26px;\n\n  display: flex;\n\n  align-items: center;\n}\n\n.route-line::before {\n  content: '';\n\n  position: absolute;\n\n  left: 0;\n\n  top: 7px;\n  bottom: 7px;\n\n  width: 2px;\n\n  border-radius: 999px;\n\n  background: currentColor;\n\n  opacity: 0.14;\n}\n\n.route-line span {\n  font-size: 0.75rem;\n\n  letter-spacing: 0.04em;\n\n  text-transform: uppercase;\n\n  opacity: 0.4;\n}\n\n.auth-note {\n  margin:\n    clamp(\n      24px,\n      4vh,\n      40px\n    )\n    0\n    0;\n\n  font-size: 0.82rem;\n\n  opacity: 0.4;\n}\n\n/* -------------------------------------------------------------------------- */\n/* RIGHT SIDE                                                                 */\n/* -------------------------------------------------------------------------- */\n\n.auth-panel {\n  width: 100%;\n\n  min-width: 0;\n  min-height: 0;\n\n  position: relative;\n\n  display: flex;\n\n  flex-direction: column;\n\n  justify-content: center;\n\n  padding:\n    clamp(32px, 5vh, 64px)\n    clamp(48px, 7vw, 120px);\n\n  overflow: hidden;\n}\n\n.auth-heading {\n  margin-bottom:\n    clamp(\n      22px,\n      3vh,\n      30px\n    );\n}\n\n.auth-heading h2 {\n  margin:\n    0\n    0\n    10px;\n\n  font-size:\n    clamp(\n      1.9rem,\n      2.6vw,\n      2.6rem\n    );\n\n  font-weight: 650;\n\n  line-height: 1.08;\n\n  letter-spacing: -0.045em;\n}\n\n.auth-heading .subtle {\n  margin: 0;\n\n  font-size: 1rem;\n\n  line-height: 1.5;\n\n  opacity: 0.55;\n}\n\n/* -------------------------------------------------------------------------- */\n/* REGISTRATION PROGRESS                                                      */\n/* -------------------------------------------------------------------------- */\n\n.registration-progress {\n  width: 100%;\n\n  margin-bottom:\n    clamp(\n      32px,\n      5vh,\n      52px\n    );\n}\n\n.progress-meta {\n  display: flex;\n\n  justify-content: space-between;\n\n  align-items: center;\n\n  gap: 20px;\n\n  margin-bottom: 12px;\n\n  font-size: 0.78rem;\n\n  font-weight: 650;\n\n  line-height: 1.2;\n\n  opacity: 0.55;\n}\n\n.progress-meta span:last-child {\n  min-width: 0;\n\n  overflow: hidden;\n\n  text-overflow: ellipsis;\n\n  white-space: nowrap;\n\n  text-align: right;\n}\n\n.progress-track {\n  width: 100%;\n\n  height: 3px;\n\n  overflow: hidden;\n\n  border-radius: 999px;\n\n  background:\n    color-mix(\n      in srgb,\n      currentColor 13%,\n      transparent\n    );\n}\n\n.progress-value {\n  height: 100%;\n\n  border-radius: inherit;\n\n  background: currentColor;\n\n  transition:\n    width\n    400ms\n    cubic-bezier(\n      0.22,\n      1,\n      0.36,\n      1\n    );\n}\n\n/* -------------------------------------------------------------------------- */\n/* FORM STEPS                                                                 */\n/* -------------------------------------------------------------------------- */\n\n.registration-step {\n  width: 100%;\n\n  /*\n   * Enough room to keep every step in the same visual position,\n   * without making the card unnecessarily tall.\n   */\n  min-height: 150px;\n\n  animation:\n    step-enter\n    340ms\n    cubic-bezier(\n      0.22,\n      1,\n      0.36,\n      1\n    );\n}\n\n.step-content {\n  width: 100%;\n}\n\n.privacy-note {\n  margin:\n    14px\n    0\n    0;\n\n  font-size: 0.8rem;\n\n  line-height: 1.5;\n\n  opacity: 0.46;\n}\n\n/* -------------------------------------------------------------------------- */\n/* BUTTONS                                                                    */\n/* -------------------------------------------------------------------------- */\n\n.step-actions {\n  width: 100%;\n\n  display: grid;\n\n  grid-template-columns:\n    auto\n    minmax(0, 1fr);\n\n  align-items: stretch;\n\n  gap: 12px;\n\n  margin-top:\n    clamp(\n      24px,\n      4vh,\n      38px\n    );\n}\n\n.step-actions .button {\n  min-height: 52px;\n\n  border-radius: 12px;\n}\n\n/*\n * IMPORTANT:\n * Your global .button class gives the text a light/white color.\n * Since Back has a transparent background, its text disappeared.\n *\n * Explicitly set the text and border here.\n */\n.step-back {\n  min-width: 104px;\n\n  padding:\n    0\n    24px;\n\n  background: transparent !important;\n\n  color: #111111 !important;\n\n  border:\n    1.5px\n    solid\n    #111111 !important;\n\n  box-shadow: none !important;\n}\n\n.step-back:hover:not(:disabled) {\n  background:\n    rgba(\n      0,\n      0,\n      0,\n      0.045\n    ) !important;\n}\n\n.step-back:active:not(:disabled) {\n  transform: scale(0.985);\n}\n\n.step-back:disabled {\n  color:\n    rgba(\n      17,\n      17,\n      17,\n      0.35\n    ) !important;\n\n  border-color:\n    rgba(\n      17,\n      17,\n      17,\n      0.2\n    ) !important;\n}\n\n.step-primary {\n  width: 100%;\n}\n\n.auth-switch {\n  margin:\n    clamp(\n      24px,\n      4vh,\n      36px\n    )\n    0\n    0;\n\n  text-align: center;\n\n  font-size: 0.88rem;\n\n  line-height: 1.5;\n}\n\n.auth-switch a {\n  margin-left: 5px;\n\n  font-weight: 650;\n}\n\n.error-banner {\n  flex: 0 0 auto;\n\n  margin:\n    0\n    0\n    20px;\n}\n\n@media (min-width: 901px) {\n  .login-mode .auth-panel {\n    padding-top: clamp(20px, 3vh, 36px);\n    padding-bottom: clamp(20px, 3vh, 36px);\n  }\n\n  .login-mode .auth-heading {\n    margin-bottom: 18px;\n  }\n\n  .login-mode form {\n    gap: 14px;\n  }\n\n  .login-mode .auth-switch {\n    margin-top: 16px;\n  }\n}\n\n/* -------------------------------------------------------------------------- */\n/* ANIMATION                                                                  */\n/* -------------------------------------------------------------------------- */\n\n@keyframes step-enter {\n  from {\n    opacity: 0;\n\n    transform:\n      translateX(18px);\n  }\n\n  to {\n    opacity: 1;\n\n    transform:\n      translateX(0);\n  }\n}\n\n/* -------------------------------------------------------------------------- */\n/* SHORTER DESKTOP SCREENS                                                    */\n/* -------------------------------------------------------------------------- */\n\n@media (\n  min-width: 901px\n) and (\n  max-height: 800px\n) {\n  .auth-intro {\n    padding-top: 30px;\n    padding-bottom: 30px;\n  }\n\n  .auth-intro h1 {\n    font-size:\n      clamp(\n        3.1rem,\n        4.6vw,\n        4.65rem\n      );\n  }\n\n  .auth-intro > p:not(\n      .eyebrow,\n      .auth-note\n    ) {\n    margin-top: 20px;\n  }\n\n  .route-illustration {\n    margin-top: 26px;\n  }\n\n  .route-line {\n    min-height: 40px;\n  }\n\n  .auth-note {\n    margin-top: 22px;\n  }\n\n  .auth-panel {\n    padding-top: 28px;\n    padding-bottom: 28px;\n  }\n\n  .registration-progress {\n    margin-bottom: 28px;\n  }\n\n  .auth-heading {\n    margin-bottom: 20px;\n  }\n\n  .registration-step {\n    min-height: 132px;\n  }\n\n  .step-actions {\n    margin-top: 20px;\n  }\n\n  .auth-switch {\n    margin-top: 20px;\n  }\n}\n\n/* -------------------------------------------------------------------------- */\n/* TABLETS                                                                    */\n/* -------------------------------------------------------------------------- */\n\n@media (\n  max-width: 1100px\n) and (\n  min-width: 901px\n) {\n  .auth-layout {\n    grid-template-columns:\n      minmax(350px, 0.82fr)\n      minmax(440px, 1.18fr);\n  }\n\n  .auth-intro {\n    padding-left: 42px;\n    padding-right: 42px;\n  }\n\n  .auth-intro h1 {\n    font-size:\n      clamp(\n        3rem,\n        5.1vw,\n        4.4rem\n      );\n  }\n\n  .auth-panel {\n    padding-left: 52px;\n    padding-right: 52px;\n  }\n}\n\n/* -------------------------------------------------------------------------- */\n/* MOBILE / IOS / ANDROID                                                     */\n/* -------------------------------------------------------------------------- */\n\n@media (\n  max-width: 960px\n) {\n  :host {\n    /*\n     * On mobile the browser's dynamic address/navigation bars make a\n     * genuinely fixed desktop-style viewport undesirable.\n     *\n     * Allow the content to scroll only when the phone genuinely\n     * doesn't have enough vertical room.\n     */\n    height: auto;\n\n    min-height: 100%;\n\n    overflow: visible;\n  }\n\n  .auth-layout {\n    height: auto;\n\n    min-height: 100%;\n\n    display: block;\n\n    overflow: visible;\n  }\n\n  /*\n   * The marketing section becomes compact on phones instead of consuming\n   * half of the screen before the user reaches the form.\n   */\n  .auth-intro {\n    display: none;\n  }\n\n  .auth-intro h1 {\n    max-width: 500px;\n\n    font-size:\n      clamp(\n        2.8rem,\n        12vw,\n        4.5rem\n      );\n\n    line-height: 0.96;\n  }\n\n  .auth-intro > p:not(\n      .eyebrow,\n      .auth-note\n    ) {\n    max-width: 430px;\n\n    margin-top: 18px;\n  }\n\n  /*\n   * Hide the large decorative route on mobile.\n   * Registration information should be the priority.\n   */\n  .route-illustration,\n  .auth-note {\n    display: none;\n  }\n\n  .auth-panel {\n    width: min(100%, 640px);\n\n    min-height: auto;\n\n    display: block;\n\n    margin: 0 auto;\n\n    padding:\n      32px\n      max(\n        22px,\n        env(\n          safe-area-inset-right\n        )\n      )\n      max(\n        36px,\n        env(\n          safe-area-inset-bottom\n        )\n      )\n      max(\n        22px,\n        env(\n          safe-area-inset-left\n        )\n      );\n\n    overflow: visible;\n  }\n\n  .registration-progress {\n    margin-bottom: 32px;\n  }\n\n  .auth-heading {\n    margin-bottom: 26px;\n  }\n\n  .registration-step {\n    min-height: 145px;\n  }\n}\n\n/* -------------------------------------------------------------------------- */\n/* SMALL PHONES                                                               */\n/* -------------------------------------------------------------------------- */\n\n@media (\n  max-width: 520px\n) {\n  .auth-intro {\n    padding-top:\n      max(\n        22px,\n        env(\n          safe-area-inset-top\n        )\n      );\n\n    padding-bottom: 24px;\n  }\n\n  .eyebrow {\n    margin-bottom: 14px;\n\n    font-size: 0.66rem;\n  }\n\n  .auth-intro h1 {\n    font-size:\n      clamp(\n        2.55rem,\n        12.5vw,\n        3.8rem\n      );\n  }\n\n  .auth-intro > p:not(\n      .eyebrow,\n      .auth-note\n    ) {\n    margin-top: 16px;\n\n    font-size: 0.92rem;\n  }\n\n  .auth-panel {\n    padding-top: 28px;\n  }\n\n  .progress-meta {\n    font-size: 0.72rem;\n  }\n\n  .auth-heading h2 {\n    font-size: 1.85rem;\n  }\n\n  .auth-heading .subtle {\n    font-size: 0.94rem;\n  }\n\n  /*\n   * Still keep Back + Continue beside each other where possible,\n   * but don't let the Back button consume too much space.\n   */\n  .step-actions {\n    grid-template-columns:\n      88px\n      minmax(0, 1fr);\n\n    gap: 10px;\n  }\n\n  .step-back {\n    min-width: 0;\n\n    padding:\n      0\n      12px;\n  }\n}\n\n/* -------------------------------------------------------------------------- */\n/* VERY SMALL PHONES                                                          */\n/* -------------------------------------------------------------------------- */\n\n@media (\n  max-width: 360px\n) {\n  .auth-intro,\n  .auth-panel {\n    padding-left:\n      max(\n        16px,\n        env(\n          safe-area-inset-left\n        )\n      );\n\n    padding-right:\n      max(\n        16px,\n        env(\n          safe-area-inset-right\n        )\n      );\n  }\n\n  .step-actions {\n    grid-template-columns:\n      78px\n      minmax(0, 1fr);\n\n    gap: 8px;\n  }\n}\n\n/* -------------------------------------------------------------------------- */\n/* REDUCED MOTION                                                             */\n/* -------------------------------------------------------------------------- */\n\n@media (\n  prefers-reduced-motion:\n    reduce\n) {\n  .registration-step {\n    animation: none;\n  }\n\n  .progress-value {\n    transition: none;\n  }\n\n  .step-back:active:not(:disabled) {\n    transform: none;\n  }\n}\n"] }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(AuthPage, { className: "AuthPage", filePath: "src/app/features/auth/auth.page.ts", lineNumber: 41 }); })();