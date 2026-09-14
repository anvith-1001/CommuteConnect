import { DatePipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/auth.service';
import { errorMessage } from '../../core/errors';
import { ApiService } from '../../utils/api';
import { DatePickerComponent } from '../../shared/date-picker.component';
import { FieldComponent } from '../../shared/field.component';
import { birthDate, meaningful } from '../../shared/validators';
import { SelectComponent } from '../../shared/select.component';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
function ProfilePage_Conditional_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 3);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r0.error());
} }
function ProfilePage_Conditional_23_Template(rf, ctx) { if (rf & 1) {
    const _r2 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 18);
    i0.ɵɵlistener("click", function ProfilePage_Conditional_23_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r2); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.edit()); });
    i0.ɵɵtext(1, " Edit profile ");
    i0.ɵɵelementEnd();
} }
function ProfilePage_Conditional_24_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "dl", 12)(1, "div")(2, "dt");
    i0.ɵɵtext(3, "Name");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "dd");
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(6, "div")(7, "dt");
    i0.ɵɵtext(8, "Email");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "dd");
    i0.ɵɵtext(10);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(11, "div")(12, "dt");
    i0.ɵɵtext(13, "Date of birth");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(14, "dd");
    i0.ɵɵtext(15);
    i0.ɵɵpipe(16, "date");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(17, "div")(18, "dt");
    i0.ɵɵtext(19, "Sex");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(20, "dd");
    i0.ɵɵtext(21);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    let tmp_1_0;
    let tmp_2_0;
    let tmp_3_0;
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate((tmp_1_0 = ctx_r0.auth.user()) == null ? null : tmp_1_0.name);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate((tmp_2_0 = ctx_r0.auth.user()) == null ? null : tmp_2_0.email);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(16, 4, (tmp_3_0 = ctx_r0.auth.user()) == null ? null : tmp_3_0.dob, "d MMMM y"));
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate(ctx_r0.sexLabel);
} }
function ProfilePage_Conditional_25_Template(rf, ctx) { if (rf & 1) {
    const _r3 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "form", 19);
    i0.ɵɵlistener("ngSubmit", function ProfilePage_Conditional_25_Template_form_ngSubmit_0_listener() { i0.ɵɵrestoreView(_r3); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.save()); });
    i0.ɵɵelement(1, "cc-field", 20);
    i0.ɵɵelementStart(2, "p", 21)(3, "span", 22);
    i0.ɵɵtext(4, "Email");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "strong");
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "span", 23);
    i0.ɵɵtext(8, "Your sign-in email cannot be edited.");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(9, "div", 24);
    i0.ɵɵelement(10, "cc-date-picker", 25)(11, "cc-select", 26);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(12, "div", 27)(13, "button", 28);
    i0.ɵɵtext(14);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(15, "button", 18);
    i0.ɵɵlistener("click", function ProfilePage_Conditional_25_Template_button_click_15_listener() { i0.ɵɵrestoreView(_r3); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.cancelEdit()); });
    i0.ɵɵtext(16, " Cancel ");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    let tmp_4_0;
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵproperty("formGroup", ctx_r0.profileForm);
    i0.ɵɵadvance();
    i0.ɵɵproperty("control", ctx_r0.profileForm.controls.name)("maxLength", 100);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate((tmp_4_0 = ctx_r0.auth.user()) == null ? null : tmp_4_0.email);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("control", ctx_r0.profileForm.controls.dob)("maxDate", ctx_r0.maxDob);
    i0.ɵɵadvance();
    i0.ɵɵproperty("control", ctx_r0.profileForm.controls.sex)("options", ctx_r0.sexOptions);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("disabled", ctx_r0.busy());
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r0.busy() ? "Saving\u2026" : "Save profile", " ");
} }
function ProfilePage_Conditional_35_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 29);
    i0.ɵɵlistener("click", function ProfilePage_Conditional_35_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r4); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.confirmDelete.set(true)); });
    i0.ɵɵtext(1, " Delete my account ");
    i0.ɵɵelementEnd();
} }
function ProfilePage_Conditional_36_Template(rf, ctx) { if (rf & 1) {
    const _r5 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "form", 30);
    i0.ɵɵlistener("ngSubmit", function ProfilePage_Conditional_36_Template_form_ngSubmit_0_listener() { i0.ɵɵrestoreView(_r5); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.deleteAccount()); });
    i0.ɵɵelement(1, "cc-field", 31);
    i0.ɵɵelementStart(2, "div", 27)(3, "button", 32);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "button", 33);
    i0.ɵɵlistener("click", function ProfilePage_Conditional_36_Template_button_click_5_listener() { i0.ɵɵrestoreView(_r5); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.confirmDelete.set(false)); });
    i0.ɵɵtext(6, " Cancel ");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵproperty("formGroup", ctx_r0.deleteForm);
    i0.ɵɵadvance();
    i0.ɵɵproperty("control", ctx_r0.deleteForm.controls.password);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("disabled", ctx_r0.deleting());
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r0.deleting() ? "Deleting\u2026" : "Permanently delete account", " ");
    i0.ɵɵadvance();
    i0.ɵɵproperty("disabled", ctx_r0.deleting());
} }
function ProfilePage_Conditional_37_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 17);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r0.notice());
} }
export class ProfilePage {
    fb = inject(FormBuilder);
    api = inject(ApiService);
    auth = inject(AuthService);
    router = inject(Router);
    busy = signal(false, ...(ngDevMode ? [{ debugName: "busy" }] : /* istanbul ignore next */ []));
    deleting = signal(false, ...(ngDevMode ? [{ debugName: "deleting" }] : /* istanbul ignore next */ []));
    confirmDelete = signal(false, ...(ngDevMode ? [{ debugName: "confirmDelete" }] : /* istanbul ignore next */ []));
    error = signal('', ...(ngDevMode ? [{ debugName: "error" }] : /* istanbul ignore next */ []));
    notice = signal('', ...(ngDevMode ? [{ debugName: "notice" }] : /* istanbul ignore next */ []));
    editing = signal(false, ...(ngDevMode ? [{ debugName: "editing" }] : /* istanbul ignore next */ []));
    maxDob = new Date().toISOString().slice(0, 10);
    sexOptions = [
        { value: 'female', label: 'Female' },
        { value: 'male', label: 'Male' },
        { value: 'other', label: 'Other' },
        { value: 'prefer_not_to_say', label: 'Prefer not to say' },
    ];
    profileForm = this.fb.nonNullable.group({
        name: [
            this.auth.user()?.name || '',
            [Validators.required, meaningful, Validators.maxLength(100)],
        ],
        dob: [this.auth.user()?.dob || '', [Validators.required, birthDate]],
        sex: [this.auth.user()?.sex || '', Validators.required],
    });
    deleteForm = this.fb.nonNullable.group({
        password: ['', [Validators.required, Validators.maxLength(128)]],
    });
    get sexLabel() {
        const value = this.auth.user()?.sex;
        return this.sexOptions.find((option) => option.value === value)?.label || 'Not set';
    }
    edit() {
        const user = this.auth.user();
        if (user) {
            this.profileForm.reset({
                name: user.name,
                dob: user.dob,
                sex: user.sex,
            });
        }
        this.error.set('');
        this.notice.set('');
        this.editing.set(true);
    }
    cancelEdit() {
        this.editing.set(false);
        this.error.set('');
    }
    async save() {
        this.profileForm.markAllAsTouched();
        if (this.profileForm.invalid || this.busy()) {
            return;
        }
        this.busy.set(true);
        this.error.set('');
        this.notice.set('');
        try {
            const user = await this.api.updateProfile(this.profileForm.getRawValue());
            this.auth.setUser(user);
            this.notice.set('Your profile has been updated.');
            this.editing.set(false);
        }
        catch (error) {
            this.error.set(errorMessage(error));
        }
        finally {
            this.busy.set(false);
        }
    }
    async deleteAccount() {
        this.deleteForm.markAllAsTouched();
        if (this.deleteForm.invalid || this.deleting()) {
            return;
        }
        this.deleting.set(true);
        this.error.set('');
        try {
            await this.api.deleteAccount(this.deleteForm.controls.password.value);
            this.auth.clear();
            await this.router.navigate(['/login']);
        }
        catch (error) {
            this.error.set(errorMessage(error));
        }
        finally {
            this.deleting.set(false);
        }
    }
    static ɵfac = function ProfilePage_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || ProfilePage)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: ProfilePage, selectors: [["ng-component"]], decls: 38, vars: 5, consts: [[1, "settings-page"], [1, "settings-title"], [1, "eyebrow"], ["role", "alert", 1, "error-banner"], [1, "settings-layout"], ["aria-label", "Profile sections", 1, "settings-nav"], ["href", "#account", 1, "active"], ["routerLink", "/history"], [1, "settings-content"], ["id", "account", 1, "settings-section", "profile-details"], [1, "settings-section-heading"], ["type", "button", 1, "button", "secondary"], [1, "account-rows"], [1, "editor", "settings-form", 3, "formGroup"], ["id", "delete-account", 1, "settings-section", "danger-zone"], ["type", "button", 1, "button", "danger"], [3, "formGroup"], ["role", "status", 1, "success-banner"], ["type", "button", 1, "button", "secondary", 3, "click"], [1, "editor", "settings-form", 3, "ngSubmit", "formGroup"], ["fieldId", "profile-name", "label", "Full name", "autocomplete", "name", 3, "control", "maxLength"], [1, "field"], [1, "field-label"], [1, "field-help"], [1, "form-row"], ["fieldId", "profile-dob", "label", "Date of birth", "formControlName", "dob", "minDate", "1900-01-01", 3, "control", "maxDate"], ["fieldId", "profile-sex", "label", "Sex", "formControlName", "sex", 3, "control", "options"], [1, "actions"], ["type", "submit", 1, "button", 3, "disabled"], ["type", "button", 1, "button", "danger", 3, "click"], [3, "ngSubmit", "formGroup"], ["fieldId", "delete-password", "label", "Enter your password to confirm", "type", "password", "autocomplete", "current-password", 3, "control"], ["type", "submit", 1, "button", "danger", 3, "disabled"], ["type", "button", 1, "button", "secondary", 3, "click", "disabled"]], template: function ProfilePage_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "section", 0)(1, "header", 1)(2, "p", 2);
            i0.ɵɵtext(3, "SETTINGS");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(4, "h1");
            i0.ɵɵtext(5, "Account & privacy");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(6, "p");
            i0.ɵɵtext(7, "Manage your account details and data.");
            i0.ɵɵelementEnd()();
            i0.ɵɵconditionalCreate(8, ProfilePage_Conditional_8_Template, 2, 1, "p", 3);
            i0.ɵɵelementStart(9, "div", 4)(10, "nav", 5)(11, "a", 6);
            i0.ɵɵtext(12, "Account");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(13, "a", 7);
            i0.ɵɵtext(14, "View history");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(15, "div", 8)(16, "section", 9)(17, "header", 10)(18, "div")(19, "h2");
            i0.ɵɵtext(20, "Account");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(21, "p");
            i0.ɵɵtext(22, "Your CommuteConnect identity.");
            i0.ɵɵelementEnd()();
            i0.ɵɵconditionalCreate(23, ProfilePage_Conditional_23_Template, 2, 0, "button", 11);
            i0.ɵɵelementEnd();
            i0.ɵɵconditionalCreate(24, ProfilePage_Conditional_24_Template, 22, 7, "dl", 12)(25, ProfilePage_Conditional_25_Template, 17, 10, "form", 13);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(26, "section", 14)(27, "header", 10)(28, "div")(29, "h2");
            i0.ɵɵtext(30, "Delete account");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(31, "p");
            i0.ɵɵtext(32, "Remove your account and operational data.");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(33, "p");
            i0.ɵɵtext(34, " This permanently removes your commutes, interests, conversations, and sessions. Your name and email are retained as a limited legal record. Your date of birth and sex are removed. ");
            i0.ɵɵelementEnd();
            i0.ɵɵconditionalCreate(35, ProfilePage_Conditional_35_Template, 2, 0, "button", 15)(36, ProfilePage_Conditional_36_Template, 7, 5, "form", 16);
            i0.ɵɵelementEnd()()();
            i0.ɵɵconditionalCreate(37, ProfilePage_Conditional_37_Template, 2, 1, "p", 17);
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            i0.ɵɵadvance(8);
            i0.ɵɵconditional(ctx.error() ? 8 : -1);
            i0.ɵɵadvance(15);
            i0.ɵɵconditional(!ctx.editing() ? 23 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(!ctx.editing() ? 24 : 25);
            i0.ɵɵadvance(11);
            i0.ɵɵconditional(!ctx.confirmDelete() ? 35 : 36);
            i0.ɵɵadvance(2);
            i0.ɵɵconditional(ctx.notice() ? 37 : -1);
        } }, dependencies: [RouterLink,
            ReactiveFormsModule, i1.ɵNgNoValidate, i1.NgControlStatus, i1.NgControlStatusGroup, i1.FormGroupDirective, i1.FormControlName, DatePickerComponent,
            FieldComponent,
            SelectComponent,
            DatePipe], encapsulation: 2 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ProfilePage, [{
        type: Component,
        args: [{ imports: [
                    DatePipe,
                    RouterLink,
                    ReactiveFormsModule,
                    DatePickerComponent,
                    FieldComponent,
                    SelectComponent,
                ], template: "<section class=\"settings-page\">\n  <header class=\"settings-title\">\n    <p class=\"eyebrow\">SETTINGS</p>\n    <h1>Account & privacy</h1>\n    <p>Manage your account details and data.</p>\n  </header>\n\n  @if (error()) {\n    <p class=\"error-banner\" role=\"alert\">{{ error() }}</p>\n  }\n\n  <div class=\"settings-layout\">\n    <nav class=\"settings-nav\" aria-label=\"Profile sections\">\n      <a class=\"active\" href=\"#account\">Account</a>\n      <a routerLink=\"/history\">View history</a>\n    </nav>\n\n    <div class=\"settings-content\">\n      <section id=\"account\" class=\"settings-section profile-details\">\n        <header class=\"settings-section-heading\">\n          <div>\n            <h2>Account</h2>\n            <p>Your CommuteConnect identity.</p>\n          </div>\n          @if (!editing()) {\n            <button class=\"button secondary\" type=\"button\" (click)=\"edit()\">\n              Edit profile\n            </button>\n          }\n        </header>\n\n        @if (!editing()) {\n          <dl class=\"account-rows\">\n            <div>\n              <dt>Name</dt>\n              <dd>{{ auth.user()?.name }}</dd>\n            </div>\n            <div>\n              <dt>Email</dt>\n              <dd>{{ auth.user()?.email }}</dd>\n            </div>\n            <div>\n              <dt>Date of birth</dt>\n              <dd>{{ auth.user()?.dob | date: 'd MMMM y' }}</dd>\n            </div>\n            <div>\n              <dt>Sex</dt>\n              <dd>{{ sexLabel }}</dd>\n            </div>\n          </dl>\n        } @else {\n          <form\n            class=\"editor settings-form\"\n            [formGroup]=\"profileForm\"\n            (ngSubmit)=\"save()\"\n          >\n            <cc-field\n              fieldId=\"profile-name\"\n              label=\"Full name\"\n              [control]=\"profileForm.controls.name\"\n              autocomplete=\"name\"\n              [maxLength]=\"100\"\n            />\n\n            <p class=\"field\">\n              <span class=\"field-label\">Email</span>\n              <strong>{{ auth.user()?.email }}</strong>\n              <span class=\"field-help\">Your sign-in email cannot be edited.</span>\n            </p>\n\n            <div class=\"form-row\">\n              <cc-date-picker\n                fieldId=\"profile-dob\"\n                label=\"Date of birth\"\n                formControlName=\"dob\"\n                [control]=\"profileForm.controls.dob\"\n                minDate=\"1900-01-01\"\n                [maxDate]=\"maxDob\"\n              />\n              <cc-select\n                fieldId=\"profile-sex\"\n                label=\"Sex\"\n                formControlName=\"sex\"\n                [control]=\"profileForm.controls.sex\"\n                [options]=\"sexOptions\"\n              />\n            </div>\n\n            <div class=\"actions\">\n              <button class=\"button\" type=\"submit\" [disabled]=\"busy()\">\n                {{ busy() ? 'Saving\u2026' : 'Save profile' }}\n              </button>\n              <button class=\"button secondary\" type=\"button\" (click)=\"cancelEdit()\">\n                Cancel\n              </button>\n            </div>\n          </form>\n        }\n      </section>\n\n      <section id=\"delete-account\" class=\"settings-section danger-zone\">\n        <header class=\"settings-section-heading\">\n          <div>\n            <h2>Delete account</h2>\n            <p>Remove your account and operational data.</p>\n          </div>\n        </header>\n        <p>\n          This permanently removes your commutes, interests, conversations, and sessions.\n          Your name and email are retained as a limited legal record. Your date of birth\n          and sex are removed.\n        </p>\n\n        @if (!confirmDelete()) {\n          <button class=\"button danger\" type=\"button\" (click)=\"confirmDelete.set(true)\">\n            Delete my account\n          </button>\n        } @else {\n          <form [formGroup]=\"deleteForm\" (ngSubmit)=\"deleteAccount()\">\n            <cc-field\n              fieldId=\"delete-password\"\n              label=\"Enter your password to confirm\"\n              type=\"password\"\n              autocomplete=\"current-password\"\n              [control]=\"deleteForm.controls.password\"\n            />\n            <div class=\"actions\">\n              <button class=\"button danger\" type=\"submit\" [disabled]=\"deleting()\">\n                {{ deleting() ? 'Deleting\u2026' : 'Permanently delete account' }}\n              </button>\n              <button\n                class=\"button secondary\"\n                type=\"button\"\n                (click)=\"confirmDelete.set(false)\"\n                [disabled]=\"deleting()\"\n              >\n                Cancel\n              </button>\n            </div>\n          </form>\n        }\n      </section>\n    </div>\n  </div>\n\n  @if (notice()) {\n    <p class=\"success-banner\" role=\"status\">{{ notice() }}</p>\n  }\n</section>\n" }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(ProfilePage, { className: "ProfilePage", filePath: "src/app/features/profile/profile.page.ts", lineNumber: 24 }); })();