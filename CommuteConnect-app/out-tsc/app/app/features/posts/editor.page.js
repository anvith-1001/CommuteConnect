import { Component, inject, signal, } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators, } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink, } from '@angular/router';
import { ApiService } from '../../utils/api';
import { AuthService } from '../../core/auth.service';
import { errorMessage } from '../../core/errors';
import { FieldComponent } from '../../shared/field.component';
import { StateComponent } from '../../shared/state.component';
import { DatePickerComponent } from '../../shared/date-picker.component';
import { MapPickerComponent, } from '../../shared/map-picker.component';
import { future, meaningful, } from '../../shared/validators';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
function EditorPage_Conditional_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "cc-state", 3);
} }
function EditorPage_Conditional_10_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "cc-state", 7);
    i0.ɵɵlistener("retry", function EditorPage_Conditional_10_Template_cc_state_retry_0_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.load()); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵproperty("message", ctx_r1.loadError());
} }
function EditorPage_Conditional_11_Conditional_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 9);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r1.error(), " ");
} }
function EditorPage_Conditional_11_Conditional_2_Conditional_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "section", 14)(1, "div", 21)(2, "span", 22);
    i0.ɵɵtext(3, "ORIGIN");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "h2");
    i0.ɵɵtext(5, "Where are you leaving from?");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "p");
    i0.ɵɵtext(7, " Enter the place where your commute begins. ");
    i0.ɵɵelementEnd()();
    i0.ɵɵelement(8, "cc-field", 23);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(8);
    i0.ɵɵproperty("control", ctx_r1.form.controls.origin)("maxLength", 120);
} }
function EditorPage_Conditional_11_Conditional_2_Conditional_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "section", 14)(1, "div", 21)(2, "span", 22);
    i0.ɵɵtext(3, "DESTINATION");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "h2");
    i0.ɵɵtext(5, "Where are you going?");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "p");
    i0.ɵɵtext(7, " Enter your final destination. ");
    i0.ɵɵelementEnd()();
    i0.ɵɵelement(8, "cc-field", 24);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(8);
    i0.ɵɵproperty("control", ctx_r1.form.controls.destination)("maxLength", 120);
} }
function EditorPage_Conditional_11_Conditional_2_Conditional_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "section", 14)(1, "div", 21)(2, "span", 22);
    i0.ɵɵtext(3, "VIA");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "h2");
    i0.ɵɵtext(5, "Going through somewhere?");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "p");
    i0.ɵɵtext(7, " Add a main area or landmark along your route. Leave it empty if you're going directly. ");
    i0.ɵɵelementEnd()();
    i0.ɵɵelement(8, "cc-field", 25);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(8);
    i0.ɵɵproperty("control", ctx_r1.form.controls.via)("maxLength", 120);
} }
function EditorPage_Conditional_11_Conditional_2_Conditional_8_Conditional_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 28);
    i0.ɵɵtext(1, " Origin selected ");
    i0.ɵɵelementEnd();
} }
function EditorPage_Conditional_11_Conditional_2_Conditional_8_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "section", 14)(1, "div", 21)(2, "span", 22);
    i0.ɵɵtext(3, "MAP");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "h2");
    i0.ɵɵtext(5, "Pin your origin");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "p");
    i0.ɵɵtext(7, " Choose the starting point where passengers will meet you. ");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(8, "div", 26)(9, "button", 27);
    i0.ɵɵlistener("click", function EditorPage_Conditional_11_Conditional_2_Conditional_8_Template_button_click_9_listener() { i0.ɵɵrestoreView(_r4); const ctx_r1 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r1.openMap()); });
    i0.ɵɵtext(10);
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(11, EditorPage_Conditional_11_Conditional_2_Conditional_8_Conditional_11_Template, 2, 0, "span", 28);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(10);
    i0.ɵɵtextInterpolate1(" ", ctx_r1.hasRequiredMapPoints() ? "Change origin pin" : "Pin on map", " ");
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r1.hasRequiredMapPoints() ? 11 : -1);
} }
function EditorPage_Conditional_11_Conditional_2_Conditional_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "section", 14)(1, "div", 21)(2, "span", 22);
    i0.ɵɵtext(3, "DEPARTURE");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "h2");
    i0.ɵɵtext(5, "When are you leaving?");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "p");
    i0.ɵɵtext(7, " Choose the date and time for this commute. ");
    i0.ɵɵelementEnd()();
    i0.ɵɵelement(8, "cc-date-picker", 29);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(8);
    i0.ɵɵproperty("control", ctx_r1.form.controls.departureAt)("enableTime", true)("minDate", "today");
} }
function EditorPage_Conditional_11_Conditional_2_Conditional_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "section", 14)(1, "div", 21)(2, "span", 22);
    i0.ɵɵtext(3, "VEHICLE");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "h2");
    i0.ɵɵtext(5, "Which vehicle are you driving?");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "p");
    i0.ɵɵtext(7, " Your vehicle number is only shared with accepted passengers. ");
    i0.ɵɵelementEnd()();
    i0.ɵɵelement(8, "cc-field", 30);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(8);
    i0.ɵɵproperty("control", ctx_r1.form.controls.vehicleNumber)("maxLength", 20);
} }
function EditorPage_Conditional_11_Conditional_2_Conditional_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "section", 14)(1, "div", 21)(2, "span", 22);
    i0.ɵɵtext(3, "SEATS");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "h2");
    i0.ɵɵtext(5, "How many seats are available?");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "p");
    i0.ɵɵtext(7, " Enter the number of passenger seats you're offering. ");
    i0.ɵɵelementEnd()();
    i0.ɵɵelement(8, "cc-field", 31);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(8);
    i0.ɵɵproperty("control", ctx_r1.form.controls.seats)("min", 1)("max", 8);
} }
function EditorPage_Conditional_11_Conditional_2_Conditional_12_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "section", 14)(1, "div", 21)(2, "span", 22);
    i0.ɵɵtext(3, "NOTES");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "h2");
    i0.ɵɵtext(5, "Anything else passengers should know?");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "p");
    i0.ɵɵtext(7, " Pickup details, luggage space or anything useful. This is optional. ");
    i0.ɵɵelementEnd()();
    i0.ɵɵelement(8, "cc-field", 32);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(8);
    i0.ɵɵproperty("control", ctx_r1.form.controls.notes)("maxLength", 1000);
} }
function EditorPage_Conditional_11_Conditional_2_Conditional_15_Template(rf, ctx) { if (rf & 1) {
    const _r5 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 33);
    i0.ɵɵlistener("click", function EditorPage_Conditional_11_Conditional_2_Conditional_15_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r5); const ctx_r1 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r1.previousStep()); });
    i0.ɵɵtext(1, " Back ");
    i0.ɵɵelementEnd();
} }
function EditorPage_Conditional_11_Conditional_2_Conditional_19_Template(rf, ctx) { if (rf & 1) {
    const _r6 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 27);
    i0.ɵɵlistener("click", function EditorPage_Conditional_11_Conditional_2_Conditional_19_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r6); const ctx_r1 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r1.nextStep()); });
    i0.ɵɵtext(1, " Continue ");
    i0.ɵɵelementEnd();
} }
function EditorPage_Conditional_11_Conditional_2_Conditional_20_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "button", 20);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(3);
    i0.ɵɵproperty("disabled", ctx_r1.busy());
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r1.busy() ? "Posting\u2026" : "Post commute", " ");
} }
function EditorPage_Conditional_11_Conditional_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 10)(1, "div", 11);
    i0.ɵɵelement(2, "div", 12);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span", 13);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd()();
    i0.ɵɵconditionalCreate(5, EditorPage_Conditional_11_Conditional_2_Conditional_5_Template, 9, 2, "section", 14);
    i0.ɵɵconditionalCreate(6, EditorPage_Conditional_11_Conditional_2_Conditional_6_Template, 9, 2, "section", 14);
    i0.ɵɵconditionalCreate(7, EditorPage_Conditional_11_Conditional_2_Conditional_7_Template, 9, 2, "section", 14);
    i0.ɵɵconditionalCreate(8, EditorPage_Conditional_11_Conditional_2_Conditional_8_Template, 12, 2, "section", 14);
    i0.ɵɵconditionalCreate(9, EditorPage_Conditional_11_Conditional_2_Conditional_9_Template, 9, 3, "section", 14);
    i0.ɵɵconditionalCreate(10, EditorPage_Conditional_11_Conditional_2_Conditional_10_Template, 9, 2, "section", 14);
    i0.ɵɵconditionalCreate(11, EditorPage_Conditional_11_Conditional_2_Conditional_11_Template, 9, 3, "section", 14);
    i0.ɵɵconditionalCreate(12, EditorPage_Conditional_11_Conditional_2_Conditional_12_Template, 9, 2, "section", 14);
    i0.ɵɵelementStart(13, "div", 15)(14, "div");
    i0.ɵɵconditionalCreate(15, EditorPage_Conditional_11_Conditional_2_Conditional_15_Template, 2, 0, "button", 16);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(16, "div", 17)(17, "a", 18);
    i0.ɵɵtext(18, " Cancel ");
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(19, EditorPage_Conditional_11_Conditional_2_Conditional_19_Template, 2, 0, "button", 19)(20, EditorPage_Conditional_11_Conditional_2_Conditional_20_Template, 2, 2, "button", 20);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(2);
    i0.ɵɵstyleProp("width", ctx_r1.progress(), "%");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate2(" Step ", ctx_r1.step(), " of ", ctx_r1.totalSteps, " ");
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r1.step() === 1 ? 5 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r1.step() === 2 ? 6 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r1.step() === 3 ? 7 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r1.step() === 4 ? 8 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r1.step() === 5 ? 9 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r1.step() === 6 ? 10 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r1.step() === 7 ? 11 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r1.step() === 8 ? 12 : -1);
    i0.ɵɵadvance(3);
    i0.ɵɵconditional(ctx_r1.step() > 1 ? 15 : -1);
    i0.ɵɵadvance(4);
    i0.ɵɵconditional(ctx_r1.step() < ctx_r1.totalSteps ? 19 : 20);
} }
function EditorPage_Conditional_11_Conditional_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "section", 14)(1, "div", 21)(2, "span", 22);
    i0.ɵɵtext(3, "SEATS");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "h2");
    i0.ɵɵtext(5, "Passenger seats");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "p");
    i0.ɵɵtext(7, " Update the total number of passenger seats available. ");
    i0.ɵɵelementEnd()();
    i0.ɵɵelement(8, "cc-field", 34);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "div", 15);
    i0.ɵɵelement(10, "div");
    i0.ɵɵelementStart(11, "div", 17)(12, "a", 18);
    i0.ɵɵtext(13, " Cancel ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(14, "button", 20);
    i0.ɵɵtext(15);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(8);
    i0.ɵɵproperty("control", ctx_r1.form.controls.seats)("min", 1)("max", 8);
    i0.ɵɵadvance(6);
    i0.ɵɵproperty("disabled", ctx_r1.busy());
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r1.busy() ? "Saving\u2026" : "Save changes", " ");
} }
function EditorPage_Conditional_11_Template(rf, ctx) { if (rf & 1) {
    const _r3 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "form", 8);
    i0.ɵɵlistener("ngSubmit", function EditorPage_Conditional_11_Template_form_ngSubmit_0_listener() { i0.ɵɵrestoreView(_r3); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.save()); })("keydown.enter", function EditorPage_Conditional_11_Template_form_keydown_enter_0_listener($event) { i0.ɵɵrestoreView(_r3); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.handleEnter($event)); });
    i0.ɵɵconditionalCreate(1, EditorPage_Conditional_11_Conditional_1_Template, 2, 1, "p", 9);
    i0.ɵɵconditionalCreate(2, EditorPage_Conditional_11_Conditional_2_Template, 21, 14)(3, EditorPage_Conditional_11_Conditional_3_Template, 16, 5);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵproperty("formGroup", ctx_r1.form);
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r1.error() ? 1 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(!ctx_r1.id ? 2 : 3);
} }
function EditorPage_Conditional_12_Template(rf, ctx) { if (rf & 1) {
    const _r7 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "cc-map-picker", 35);
    i0.ɵɵlistener("pointSelected", function EditorPage_Conditional_12_Template_cc_map_picker_pointSelected_0_listener($event) { i0.ɵɵrestoreView(_r7); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.setMapPoint($event)); })("closed", function EditorPage_Conditional_12_Template_cc_map_picker_closed_0_listener() { i0.ɵɵrestoreView(_r7); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.closeMap()); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵproperty("initialPoints", ctx_r1.mapPoints());
} }
export class EditorPage {
    fb = inject(FormBuilder);
    route = inject(ActivatedRoute);
    router = inject(Router);
    api = inject(ApiService);
    auth = inject(AuthService);
    originalDeparture = '';
    originalLocalDeparture = '';
    totalSteps = 8;
    step = signal(1, ...(ngDevMode ? [{ debugName: "step" }] : /* istanbul ignore next */ []));
    loading = signal(false, ...(ngDevMode ? [{ debugName: "loading" }] : /* istanbul ignore next */ []));
    loadError = signal('', ...(ngDevMode ? [{ debugName: "loadError" }] : /* istanbul ignore next */ []));
    error = signal('', ...(ngDevMode ? [{ debugName: "error" }] : /* istanbul ignore next */ []));
    busy = signal(false, ...(ngDevMode ? [{ debugName: "busy" }] : /* istanbul ignore next */ []));
    mapOpen = signal(false, ...(ngDevMode ? [{ debugName: "mapOpen" }] : /* istanbul ignore next */ []));
    id = this.route.snapshot.paramMap.get('id');
    form = this.fb.nonNullable.group({
        origin: [
            '',
            [
                Validators.required,
                meaningful,
                Validators.maxLength(120),
            ],
        ],
        destination: [
            '',
            [
                Validators.required,
                meaningful,
                Validators.maxLength(120),
            ],
        ],
        via: [
            '',
            [
                Validators.maxLength(120),
            ],
        ],
        originLat: [0],
        originLng: [0],
        destinationLat: [0],
        destinationLng: [0],
        viaLat: [0],
        viaLng: [0],
        departureAt: [
            '',
            [
                Validators.required,
                future,
            ],
        ],
        seats: [
            1,
            [
                Validators.required,
                Validators.min(1),
                Validators.max(8),
            ],
        ],
        vehicleNumber: [
            '',
            [
                Validators.required,
                Validators.pattern(/^[A-Za-z0-9]{4,20}$/),
            ],
        ],
        notes: [
            '',
            [
                Validators.maxLength(1000),
            ],
        ],
    });
    constructor() {
        if (this.id) {
            void this.load();
        }
    }
    progress() {
        return (this.step() /
            this.totalSteps) * 100;
    }
    nextStep() {
        if (this.busy() ||
            !this.validateStep(this.step())) {
            return;
        }
        if (this.step() <
            this.totalSteps) {
            this.error.set('');
            this.step.update(value => value + 1);
        }
    }
    handleEnter(event) {
        const keyboardEvent = event;
        const target = keyboardEvent.target;
        if (keyboardEvent.isComposing) {
            return;
        }
        if (target instanceof HTMLTextAreaElement &&
            keyboardEvent.shiftKey) {
            return;
        }
        keyboardEvent.preventDefault();
        if (this.id ||
            this.step() === this.totalSteps) {
            void this.save();
            return;
        }
        this.nextStep();
    }
    previousStep() {
        if (this.step() <= 1) {
            return;
        }
        this.error.set('');
        this.step.update(value => value - 1);
    }
    openMap() {
        this.error.set('');
        this.mapOpen.set(true);
    }
    closeMap() {
        this.mapOpen.set(false);
    }
    validateStep(step) {
        this.error.set('');
        switch (step) {
            case 1: {
                const control = this.form.controls.origin;
                control.markAsTouched();
                control.updateValueAndValidity();
                return control.valid;
            }
            case 2: {
                const control = this.form.controls.destination;
                control.markAsTouched();
                control.updateValueAndValidity();
                if (control.invalid) {
                    return false;
                }
                const origin = this.form.controls.origin.value
                    .trim()
                    .toLowerCase();
                const destination = control.value
                    .trim()
                    .toLowerCase();
                if (origin ===
                    destination) {
                    this.error.set('Origin and destination must be different.');
                    return false;
                }
                return true;
            }
            case 3: {
                const control = this.form.controls.via;
                control.markAsTouched();
                control.updateValueAndValidity();
                return control.valid;
            }
            case 4: {
                if (!this.hasOriginPoint()) {
                    this.error.set('Pin your commute origin before continuing.');
                    return false;
                }
                return true;
            }
            case 5: {
                const control = this.form.controls.departureAt;
                control.markAsTouched();
                control.updateValueAndValidity();
                return control.valid;
            }
            case 6: {
                const control = this.form.controls.vehicleNumber;
                control.markAsTouched();
                control.updateValueAndValidity();
                return control.valid;
            }
            case 7: {
                const control = this.form.controls.seats;
                control.markAsTouched();
                control.updateValueAndValidity();
                return control.valid;
            }
            case 8: {
                const control = this.form.controls.notes;
                control.markAsTouched();
                control.updateValueAndValidity();
                return control.valid;
            }
            default:
                return false;
        }
    }
    hasOriginPoint() {
        return (this.form.controls.originLat.value !== 0 &&
            this.form.controls.originLng.value !== 0);
    }
    hasRequiredMapPoints() {
        return this.hasOriginPoint();
    }
    async load() {
        if (!this.id) {
            return;
        }
        this.loading.set(true);
        this.loadError.set('');
        try {
            const post = await this.api.getCommute(this.id);
            if (post.ownerId !==
                this.auth.user()?.id) {
                this.loadError.set('You can only edit your own commutes.');
                return;
            }
            if (post.deletedAt ||
                new Date(post.departureAt) <=
                    new Date()) {
                this.loadError.set('Past and cancelled commutes cannot be edited.');
                return;
            }
            const departure = new Date(post.departureAt);
            const local = new Date(departure.getTime() -
                departure.getTimezoneOffset() *
                    60000)
                .toISOString()
                .slice(0, 16);
            this.originalDeparture =
                post.departureAt;
            this.originalLocalDeparture =
                local;
            this.form.setValue({
                origin: post.origin,
                destination: post.destination,
                via: post.via || '',
                originLat: post.originLat,
                originLng: post.originLng,
                destinationLat: post.destinationLat,
                destinationLng: post.destinationLng,
                viaLat: post.viaLat || 0,
                viaLng: post.viaLng || 0,
                departureAt: local,
                seats: post.seats,
                vehicleNumber: post.vehicleNumber || '',
                notes: post.notes || '',
            });
        }
        catch (e) {
            this.loadError.set(errorMessage(e));
        }
        finally {
            this.loading.set(false);
        }
    }
    async save() {
        if (this.id) {
            const seats = this.form.controls.seats;
            seats.markAsTouched();
            seats.updateValueAndValidity();
            if (seats.invalid ||
                this.busy()) {
                return;
            }
            this.busy.set(true);
            this.error.set('');
            try {
                const post = await this.api.updateCommute(this.id, seats.value);
                await this.router.navigate([
                    '/commutes',
                    post.id,
                ]);
            }
            catch (e) {
                this.error.set(errorMessage(e));
            }
            finally {
                this.busy.set(false);
            }
            return;
        }
        if (this.step() !==
            this.totalSteps) {
            return;
        }
        if (!this.validateStep(this.totalSteps)) {
            return;
        }
        if (this.busy()) {
            return;
        }
        this.form.controls.origin
            .updateValueAndValidity();
        this.form.controls.destination
            .updateValueAndValidity();
        this.form.controls.via
            .updateValueAndValidity();
        this.form.controls.departureAt
            .updateValueAndValidity();
        this.form.controls.vehicleNumber
            .updateValueAndValidity();
        this.form.controls.seats
            .updateValueAndValidity();
        this.form.controls.notes
            .updateValueAndValidity();
        if (this.form.invalid) {
            this.error.set('Some commute details are invalid. Go back and check your answers.');
            return;
        }
        if (!this.hasRequiredMapPoints()) {
            this.error.set('Pin your commute origin before posting.');
            this.step.set(4);
            return;
        }
        const value = this.form.getRawValue();
        const origin = value.origin.trim();
        const destination = value.destination.trim();
        const via = value.via.trim();
        if (origin.toLowerCase() ===
            destination.toLowerCase()) {
            this.error.set('Origin and destination must be different.');
            this.step.set(2);
            return;
        }
        this.busy.set(true);
        this.error.set('');
        try {
            const draft = {
                ...value,
                origin,
                destination,
                via: via || undefined,
                viaLat: via
                    ? value.viaLat
                    : undefined,
                viaLng: via
                    ? value.viaLng
                    : undefined,
                vehicleNumber: value.vehicleNumber
                    .trim()
                    .toUpperCase(),
                notes: value.notes.trim(),
                departureAt: value.departureAt ===
                    this.originalLocalDeparture
                    ? this.originalDeparture
                    : new Date(value.departureAt).toISOString(),
            };
            const post = await this.api.createCommute(draft);
            await this.router.navigate([
                '/commutes',
                post.id,
            ]);
        }
        catch (e) {
            this.error.set(errorMessage(e));
        }
        finally {
            this.busy.set(false);
        }
    }
    mapPoints() {
        const value = this.form.getRawValue();
        return {
            ...(this.hasOriginPoint()
                ? {
                    origin: {
                        lat: value.originLat,
                        lng: value.originLng,
                    },
                }
                : {}),
        };
    }
    setMapPoint(selection) {
        if (selection.kind !== 'origin') {
            return;
        }
        this.form.controls.originLat.setValue(selection.coordinates.lat);
        this.form.controls.originLng.setValue(selection.coordinates.lng);
        this.form.controls.destinationLat.setValue(selection.coordinates.lat);
        this.form.controls.destinationLng.setValue(selection.coordinates.lng);
        this.form.controls.viaLat.setValue(selection.coordinates.lat);
        this.form.controls.viaLng.setValue(selection.coordinates.lng);
    }
    static ɵfac = function EditorPage_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || EditorPage)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: EditorPage, selectors: [["ng-component"]], decls: 13, vars: 4, consts: [[1, "narrow", "editor-page"], ["routerLink", "/dashboard", 1, "text-link", "dashboard-link"], [1, "page-heading"], ["kind", "loading", "title", "Loading your commute\u2026"], ["kind", "error", "title", "Couldn\u2019t open this commute", 3, "message"], [1, "editor", 3, "formGroup"], ["mode", "route", 3, "initialPoints"], ["kind", "error", "title", "Couldn\u2019t open this commute", 3, "retry", "message"], [1, "editor", 3, "ngSubmit", "keydown.enter", "formGroup"], ["role", "alert", 1, "error-banner"], [1, "wizard-progress"], [1, "progress-track"], [1, "progress-value"], [1, "progress-text"], [1, "wizard-step"], [1, "wizard-navigation"], ["type", "button", 1, "button", "secondary"], [1, "nav-right"], ["routerLink", "/dashboard", 1, "button", "secondary"], ["type", "button", 1, "button"], ["type", "submit", 1, "button", 3, "disabled"], [1, "step-copy"], [1, "step-label"], ["fieldId", "origin", "label", "Origin", "placeholder", "e.g. Indiranagar", 3, "control", "maxLength"], ["fieldId", "destination", "label", "Destination", "placeholder", "e.g. Electronic City", 3, "control", "maxLength"], ["fieldId", "via", "label", "Via (optional)", "placeholder", "e.g. Malleswaram", 3, "control", "maxLength"], [1, "map-action"], ["type", "button", 1, "button", 3, "click"], [1, "map-success"], ["fieldId", "departure", "label", "Departure date and time", "formControlName", "departureAt", "hint", "Enter the time in your local timezone.", 3, "control", "enableTime", "minDate"], ["fieldId", "vehicle-number", "label", "Vehicle number", "placeholder", "e.g. KA01AB1234", "hint", "Use 4\u201320 letters and numbers.", 3, "control", "maxLength"], ["fieldId", "seats", "label", "Passenger seats", "type", "number", "hint", "Between 1 and 8 seats.", 3, "control", "min", "max"], ["fieldId", "notes", "label", "Notes (optional)", "type", "textarea", "placeholder", "Anything passengers should know\u2026", 3, "control", "maxLength"], ["type", "button", 1, "button", "secondary", 3, "click"], ["fieldId", "seats", "label", "Passenger seats", "type", "number", 3, "control", "min", "max"], ["mode", "route", 3, "pointSelected", "closed", "initialPoints"]], template: function EditorPage_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "section", 0)(1, "a", 1);
            i0.ɵɵtext(2, " \u2190 My dashboard ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(3, "header", 2)(4, "div")(5, "h1");
            i0.ɵɵtext(6);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(7, "p");
            i0.ɵɵtext(8);
            i0.ɵɵelementEnd()()();
            i0.ɵɵconditionalCreate(9, EditorPage_Conditional_9_Template, 1, 0, "cc-state", 3)(10, EditorPage_Conditional_10_Template, 1, 1, "cc-state", 4)(11, EditorPage_Conditional_11_Template, 4, 3, "form", 5);
            i0.ɵɵelementEnd();
            i0.ɵɵconditionalCreate(12, EditorPage_Conditional_12_Template, 1, 1, "cc-map-picker", 6);
        } if (rf & 2) {
            i0.ɵɵadvance(6);
            i0.ɵɵtextInterpolate(ctx.id ? "Edit commute" : "Offer a commute");
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate1(" ", ctx.id ? "Update the number of passenger seats available." : "", " ");
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.loading() ? 9 : ctx.loadError() ? 10 : 11);
            i0.ɵɵadvance(3);
            i0.ɵɵconditional(ctx.mapOpen() ? 12 : -1);
        } }, dependencies: [ReactiveFormsModule, i1.ɵNgNoValidate, i1.NgControlStatus, i1.NgControlStatusGroup, i1.FormGroupDirective, i1.FormControlName, RouterLink,
            FieldComponent,
            StateComponent,
            DatePickerComponent,
            MapPickerComponent], styles: ["[_nghost-%COMP%] {\n  display: block;\n}\n\n*[_ngcontent-%COMP%], \n*[_ngcontent-%COMP%]::before, \n*[_ngcontent-%COMP%]::after {\n  box-sizing: border-box;\n}\n\n\n\n.editor-page[_ngcontent-%COMP%] {\n  display: flex;\n  width: 100%;\n  max-width: 1280px;\n\n  margin: 0 auto;\n\n  height: 100%;\n  min-height: 0;\n  flex-direction: column;\n  padding: clamp(16px, 3vh, 28px) clamp(16px, 3vw, 40px);\n  overflow: hidden;\n}\n\n\n\n.dashboard-link[_ngcontent-%COMP%] {\n  display: inline-block;\n\n  margin-bottom: 0.75rem;\n}\n\n\n\n.page-heading[_ngcontent-%COMP%] {\n  margin-bottom: 1rem;\n}\n\n.page-heading[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%] {\n  display: flex;\n\n  align-items: flex-end;\n\n  justify-content: space-between;\n\n  gap: 2rem;\n}\n\n.page-heading[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  margin: 0;\n\n  font-size:\n    clamp(\n      2.5rem,\n      4.5vw,\n      3.5rem\n    );\n\n  line-height: 1;\n\n  letter-spacing: -0.045em;\n}\n\n.page-heading[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  max-width: 420px;\n\n  margin: 0 0 0.3rem;\n\n  font-size: 1rem;\n\n  line-height: 1.45;\n\n  color:\n    var(\n      --text-secondary,\n      #666\n    );\n}\n\n\n\n.editor[_ngcontent-%COMP%] {\n  display: flex;\n  min-height: 0;\n  flex: 1;\n  flex-direction: column;\n  border-top:\n    1px solid\n    var(\n      --border,\n      #ddd\n    );\n\n  padding-top: 1rem;\n}\n\n\n\n.wizard-progress[_ngcontent-%COMP%] {\n  margin-bottom: 1rem;\n}\n\n.progress-track[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 3px;\n\n  overflow: hidden;\n\n  border-radius: 999px;\n\n  background:\n    var(\n      --border,\n      #ddd\n    );\n}\n\n.progress-value[_ngcontent-%COMP%] {\n  height: 100%;\n\n  border-radius: inherit;\n\n  background:\n    var(\n      --text-primary,\n      #111\n    );\n\n  transition:\n    width\n    200ms\n    ease;\n}\n\n.progress-text[_ngcontent-%COMP%] {\n  display: block;\n\n  margin-top: 0.65rem;\n\n  font-size: 0.82rem;\n\n  color:\n    var(\n      --text-secondary,\n      #666\n    );\n}\n\n\n\n.wizard-step[_ngcontent-%COMP%] {\n  width: min(100%, 820px);\n\n  min-height: 0;\n  flex: 1;\n\n  animation:\n    _ngcontent-%COMP%_step-in\n    160ms\n    ease;\n}\n\n@keyframes _ngcontent-%COMP%_step-in {\n  from {\n    opacity: 0;\n    transform: translateY(4px);\n  }\n\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n\n\n\n.step-copy[_ngcontent-%COMP%] {\n  max-width: 720px;\n\n  margin-bottom: 1rem;\n}\n\n.step-label[_ngcontent-%COMP%] {\n  display: block;\n\n  margin-bottom: 0.55rem;\n\n  font-size: 0.7rem;\n\n  font-weight: 650;\n\n  letter-spacing: 0.12em;\n\n  color:\n    var(\n      --text-secondary,\n      #666\n    );\n}\n\n.step-copy[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin: 0;\n\n  font-size:\n    clamp(\n      1.7rem,\n      2.8vw,\n      2.4rem\n    );\n\n  line-height: 1.1;\n\n  letter-spacing: -0.03em;\n}\n\n.step-copy[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin:\n    0.65rem\n    0\n    0;\n\n  font-size: 0.95rem;\n\n  line-height: 1.5;\n\n  color:\n    var(\n      --text-secondary,\n      #666\n    );\n}\n\n\n\n.map-action[_ngcontent-%COMP%] {\n  display: flex;\n\n  align-items: center;\n\n  gap: 1rem;\n}\n\n.map-success[_ngcontent-%COMP%] {\n  font-size: 0.85rem;\n\n  color:\n    var(\n      --text-secondary,\n      #666\n    );\n}\n\n\n\n.error-banner[_ngcontent-%COMP%] {\n  margin:\n    1rem\n    0\n    0;\n\n  padding:\n    0.75rem\n    0.9rem;\n\n  border:\n    1px solid\n    var(\n      --danger-border,\n      #d7bcbc\n    );\n\n  border-radius: 10px;\n\n  font-size: 0.85rem;\n\n  color:\n    var(\n      --danger,\n      #9c3030\n    );\n}\n\n\n\n.wizard-navigation[_ngcontent-%COMP%] {\n  display: flex;\n\n  width: min(100%, 820px);\n\n  align-items: center;\n\n  justify-content: space-between;\n\n  gap: 1rem;\n\n  margin-top: 1rem;\n\n  padding-top: 1rem;\n\n  border-top:\n    1px solid\n    var(\n      --border,\n      #ddd\n    );\n}\n\n.nav-right[_ngcontent-%COMP%] {\n  display: flex;\n\n  align-items: center;\n\n  gap: 0.75rem;\n\n  margin-left: auto;\n}\n\n\n\n@media (max-width: 900px) {\n  .editor-page[_ngcontent-%COMP%] {\n    padding:\n      1.5rem\n      1.75rem\n      2rem;\n  }\n\n  .page-heading[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%] {\n    flex-direction: column;\n\n    align-items: flex-start;\n\n    gap: 0.75rem;\n  }\n\n  .page-heading[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n    max-width: 600px;\n\n    margin-bottom: 0;\n  }\n\n  .wizard-step[_ngcontent-%COMP%] {\n    min-height: 240px;\n  }\n}\n\n\n\n@media (max-width: 640px) {\n  .editor-page[_ngcontent-%COMP%] {\n    padding:\n      1rem\n      1rem\n      1.5rem;\n  }\n\n  .dashboard-link[_ngcontent-%COMP%] {\n    margin-bottom: 1rem;\n\n    font-size: 0.85rem;\n  }\n\n  .page-heading[_ngcontent-%COMP%] {\n    margin-bottom: 1.25rem;\n  }\n\n  .page-heading[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n    font-size: 2.4rem;\n  }\n\n  .page-heading[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n    font-size: 0.88rem;\n  }\n\n  .editor[_ngcontent-%COMP%] {\n    padding-top: 1rem;\n  }\n\n  .wizard-progress[_ngcontent-%COMP%] {\n    margin-bottom: 1.5rem;\n  }\n\n  .wizard-step[_ngcontent-%COMP%] {\n    min-height: 220px;\n  }\n\n  .step-copy[_ngcontent-%COMP%] {\n    margin-bottom: 1.25rem;\n  }\n\n  .step-label[_ngcontent-%COMP%] {\n    font-size: 0.64rem;\n  }\n\n  .step-copy[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n    font-size: 1.75rem;\n  }\n\n  .step-copy[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n    font-size: 0.88rem;\n  }\n\n  .map-action[_ngcontent-%COMP%] {\n    align-items: stretch;\n\n    flex-direction: column;\n  }\n\n  .map-action[_ngcontent-%COMP%]   .button[_ngcontent-%COMP%] {\n    width: 100%;\n  }\n\n  .wizard-navigation[_ngcontent-%COMP%] {\n    margin-top: 1rem;\n\n    padding-top: 0.85rem;\n  }\n\n  .wizard-navigation[_ngcontent-%COMP%]   .button[_ngcontent-%COMP%] {\n    min-height: 42px;\n\n    padding:\n      0.65rem\n      0.9rem;\n  }\n}\n\n\n\n@media (max-width: 420px) {\n  .editor-page[_ngcontent-%COMP%] {\n    padding-left: 0.85rem;\n    padding-right: 0.85rem;\n  }\n\n  .page-heading[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n    font-size: 2.1rem;\n  }\n\n  .nav-right[_ngcontent-%COMP%] {\n    gap: 0.45rem;\n  }\n\n  .wizard-navigation[_ngcontent-%COMP%]   .button[_ngcontent-%COMP%] {\n    padding-left: 0.75rem;\n    padding-right: 0.75rem;\n\n    font-size: 0.82rem;\n  }\n}\n\n\n\n@media (max-height: 800px) and (min-width: 641px) {\n  .editor-page[_ngcontent-%COMP%] {\n    padding-top: 1rem;\n    padding-bottom: 1rem;\n  }\n\n  .dashboard-link[_ngcontent-%COMP%] {\n    margin-bottom: 0.8rem;\n  }\n\n  .page-heading[_ngcontent-%COMP%] {\n    margin-bottom: 1rem;\n  }\n\n  .page-heading[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n    font-size: 3rem;\n  }\n\n  .editor[_ngcontent-%COMP%] {\n    padding-top: 1rem;\n  }\n\n  .wizard-progress[_ngcontent-%COMP%] {\n    margin-bottom: 1.25rem;\n  }\n\n  .wizard-step[_ngcontent-%COMP%] {\n    min-height: 210px;\n  }\n\n  .step-copy[_ngcontent-%COMP%] {\n    margin-bottom: 1.1rem;\n  }\n\n  .wizard-navigation[_ngcontent-%COMP%] {\n    margin-top: 1rem;\n  }\n}\n\n@media (prefers-reduced-motion: reduce) {\n  .wizard-step[_ngcontent-%COMP%] {\n    animation: none;\n  }\n\n  .progress-value[_ngcontent-%COMP%] {\n    transition: none;\n  }\n}"] });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(EditorPage, [{
        type: Component,
        args: [{ imports: [
                    ReactiveFormsModule,
                    RouterLink,
                    FieldComponent,
                    StateComponent,
                    DatePickerComponent,
                    MapPickerComponent,
                ], template: "<section class=\"narrow editor-page\">\n  <a class=\"text-link dashboard-link\" routerLink=\"/dashboard\">\n    \u2190 My dashboard\n  </a>\n\n  <header class=\"page-heading\">\n    <div>\n      <h1>{{ id ? 'Edit commute' : 'Offer a commute' }}</h1>\n\n      <p>\n        {{\n          id\n            ? 'Update the number of passenger seats available.'\n            : ''\n        }}\n      </p>\n    </div>\n  </header>\n\n  @if (loading()) {\n    <cc-state\n      kind=\"loading\"\n      title=\"Loading your commute\u2026\"\n    />\n  } @else if (loadError()) {\n    <cc-state\n      kind=\"error\"\n      title=\"Couldn\u2019t open this commute\"\n      [message]=\"loadError()\"\n      (retry)=\"load()\"\n    />\n  } @else {\n    <form\n      class=\"editor\"\n      [formGroup]=\"form\"\n      (ngSubmit)=\"save()\"\n      (keydown.enter)=\"handleEnter($event)\"\n    >\n      @if (error()) {\n        <p class=\"error-banner\" role=\"alert\">\n          {{ error() }}\n        </p>\n      }\n\n      @if (!id) {\n        <!-- progress -->\n        <div class=\"wizard-progress\">\n          <div class=\"progress-track\">\n            <div\n              class=\"progress-value\"\n              [style.width.%]=\"progress()\"\n            ></div>\n          </div>\n\n          <span class=\"progress-text\">\n            Step {{ step() }} of {{ totalSteps }}\n          </span>\n        </div>\n\n        <!-- STEP 1 -->\n        @if (step() === 1) {\n          <section class=\"wizard-step\">\n            <div class=\"step-copy\">\n              <span class=\"step-label\">ORIGIN</span>\n\n              <h2>Where are you leaving from?</h2>\n\n              <p>\n                Enter the place where your commute begins.\n              </p>\n            </div>\n\n            <cc-field\n              fieldId=\"origin\"\n              label=\"Origin\"\n              [control]=\"form.controls.origin\"\n              [maxLength]=\"120\"\n              placeholder=\"e.g. Indiranagar\"\n            />\n          </section>\n        }\n\n        <!-- STEP 2 -->\n        @if (step() === 2) {\n          <section class=\"wizard-step\">\n            <div class=\"step-copy\">\n              <span class=\"step-label\">DESTINATION</span>\n\n              <h2>Where are you going?</h2>\n\n              <p>\n                Enter your final destination.\n              </p>\n            </div>\n\n            <cc-field\n              fieldId=\"destination\"\n              label=\"Destination\"\n              [control]=\"form.controls.destination\"\n              [maxLength]=\"120\"\n              placeholder=\"e.g. Electronic City\"\n            />\n          </section>\n        }\n\n        <!-- STEP 3 -->\n        @if (step() === 3) {\n          <section class=\"wizard-step\">\n            <div class=\"step-copy\">\n              <span class=\"step-label\">VIA</span>\n\n              <h2>Going through somewhere?</h2>\n\n              <p>\n                Add a main area or landmark along your route.\n                Leave it empty if you're going directly.\n              </p>\n            </div>\n\n            <cc-field\n              fieldId=\"via\"\n              label=\"Via (optional)\"\n              [control]=\"form.controls.via\"\n              [maxLength]=\"120\"\n              placeholder=\"e.g. Malleswaram\"\n            />\n          </section>\n        }\n\n        <!-- STEP 4 -->\n        @if (step() === 4) {\n          <section class=\"wizard-step\">\n            <div class=\"step-copy\">\n              <span class=\"step-label\">MAP</span>\n\n              <h2>Pin your origin</h2>\n\n              <p>\n                Choose the starting point where passengers will meet you.\n              </p>\n            </div>\n\n            <div class=\"map-action\">\n              <button\n                class=\"button\"\n                type=\"button\"\n                (click)=\"openMap()\"\n              >\n                {{\n                  hasRequiredMapPoints()\n                    ? 'Change origin pin'\n                    : 'Pin on map'\n                }}\n              </button>\n\n              @if (hasRequiredMapPoints()) {\n                <span class=\"map-success\">\n                  Origin selected\n                </span>\n              }\n            </div>\n          </section>\n        }\n\n        <!-- STEP 5 -->\n        @if (step() === 5) {\n          <section class=\"wizard-step\">\n            <div class=\"step-copy\">\n              <span class=\"step-label\">DEPARTURE</span>\n\n              <h2>When are you leaving?</h2>\n\n              <p>\n                Choose the date and time for this commute.\n              </p>\n            </div>\n\n            <cc-date-picker\n              fieldId=\"departure\"\n              label=\"Departure date and time\"\n              formControlName=\"departureAt\"\n              [control]=\"form.controls.departureAt\"\n              [enableTime]=\"true\"\n              [minDate]=\"'today'\"\n              hint=\"Enter the time in your local timezone.\"\n            />\n          </section>\n        }\n\n        <!-- STEP 6 -->\n        @if (step() === 6) {\n          <section class=\"wizard-step\">\n            <div class=\"step-copy\">\n              <span class=\"step-label\">VEHICLE</span>\n\n              <h2>Which vehicle are you driving?</h2>\n\n              <p>\n                Your vehicle number is only shared with accepted passengers.\n              </p>\n            </div>\n\n            <cc-field\n              fieldId=\"vehicle-number\"\n              label=\"Vehicle number\"\n              [control]=\"form.controls.vehicleNumber\"\n              [maxLength]=\"20\"\n              placeholder=\"e.g. KA01AB1234\"\n              hint=\"Use 4\u201320 letters and numbers.\"\n            />\n          </section>\n        }\n\n        <!-- STEP 7 -->\n        @if (step() === 7) {\n          <section class=\"wizard-step\">\n            <div class=\"step-copy\">\n              <span class=\"step-label\">SEATS</span>\n\n              <h2>How many seats are available?</h2>\n\n              <p>\n                Enter the number of passenger seats you're offering.\n              </p>\n            </div>\n\n            <cc-field\n              fieldId=\"seats\"\n              label=\"Passenger seats\"\n              type=\"number\"\n              [control]=\"form.controls.seats\"\n              [min]=\"1\"\n              [max]=\"8\"\n              hint=\"Between 1 and 8 seats.\"\n            />\n          </section>\n        }\n\n        <!-- STEP 8 -->\n        @if (step() === 8) {\n          <section class=\"wizard-step\">\n            <div class=\"step-copy\">\n              <span class=\"step-label\">NOTES</span>\n\n              <h2>Anything else passengers should know?</h2>\n\n              <p>\n                Pickup details, luggage space or anything useful.\n                This is optional.\n              </p>\n            </div>\n\n            <cc-field\n              fieldId=\"notes\"\n              label=\"Notes (optional)\"\n              type=\"textarea\"\n              [control]=\"form.controls.notes\"\n              [maxLength]=\"1000\"\n              placeholder=\"Anything passengers should know\u2026\"\n            />\n          </section>\n        }\n\n        <div class=\"wizard-navigation\">\n          <div>\n            @if (step() > 1) {\n              <button\n                class=\"button secondary\"\n                type=\"button\"\n                (click)=\"previousStep()\"\n              >\n                Back\n              </button>\n            }\n          </div>\n\n          <div class=\"nav-right\">\n            <a\n              class=\"button secondary\"\n              routerLink=\"/dashboard\"\n            >\n              Cancel\n            </a>\n\n            @if (step() < totalSteps) {\n              <button\n                class=\"button\"\n                type=\"button\"\n                (click)=\"nextStep()\"\n              >\n                Continue\n              </button>\n            } @else {\n              <button\n                class=\"button\"\n                type=\"submit\"\n                [disabled]=\"busy()\"\n              >\n                {{ busy() ? 'Posting\u2026' : 'Post commute' }}\n              </button>\n            }\n          </div>\n        </div>\n      } @else {\n        <section class=\"wizard-step\">\n          <div class=\"step-copy\">\n            <span class=\"step-label\">SEATS</span>\n\n            <h2>Passenger seats</h2>\n\n            <p>\n              Update the total number of passenger seats available.\n            </p>\n          </div>\n\n          <cc-field\n            fieldId=\"seats\"\n            label=\"Passenger seats\"\n            type=\"number\"\n            [control]=\"form.controls.seats\"\n            [min]=\"1\"\n            [max]=\"8\"\n          />\n        </section>\n\n        <div class=\"wizard-navigation\">\n          <div></div>\n\n          <div class=\"nav-right\">\n            <a\n              class=\"button secondary\"\n              routerLink=\"/dashboard\"\n            >\n              Cancel\n            </a>\n\n            <button\n              class=\"button\"\n              type=\"submit\"\n              [disabled]=\"busy()\"\n            >\n              {{ busy() ? 'Saving\u2026' : 'Save changes' }}\n            </button>\n          </div>\n        </div>\n      }\n    </form>\n  }\n</section>\n\n@if (mapOpen()) {\n  <cc-map-picker\n    mode=\"route\"\n    [initialPoints]=\"mapPoints()\"\n    (pointSelected)=\"setMapPoint($event)\"\n    (closed)=\"closeMap()\"\n  />\n}\n", styles: [":host {\n  display: block;\n}\n\n*,\n*::before,\n*::after {\n  box-sizing: border-box;\n}\n\n/* page */\n\n.editor-page {\n  display: flex;\n  width: 100%;\n  max-width: 1280px;\n\n  margin: 0 auto;\n\n  height: 100%;\n  min-height: 0;\n  flex-direction: column;\n  padding: clamp(16px, 3vh, 28px) clamp(16px, 3vw, 40px);\n  overflow: hidden;\n}\n\n/* dashboard link */\n\n.dashboard-link {\n  display: inline-block;\n\n  margin-bottom: 0.75rem;\n}\n\n/* heading */\n\n.page-heading {\n  margin-bottom: 1rem;\n}\n\n.page-heading > div {\n  display: flex;\n\n  align-items: flex-end;\n\n  justify-content: space-between;\n\n  gap: 2rem;\n}\n\n.page-heading h1 {\n  margin: 0;\n\n  font-size:\n    clamp(\n      2.5rem,\n      4.5vw,\n      3.5rem\n    );\n\n  line-height: 1;\n\n  letter-spacing: -0.045em;\n}\n\n.page-heading p {\n  max-width: 420px;\n\n  margin: 0 0 0.3rem;\n\n  font-size: 1rem;\n\n  line-height: 1.45;\n\n  color:\n    var(\n      --text-secondary,\n      #666\n    );\n}\n\n/* form */\n\n.editor {\n  display: flex;\n  min-height: 0;\n  flex: 1;\n  flex-direction: column;\n  border-top:\n    1px solid\n    var(\n      --border,\n      #ddd\n    );\n\n  padding-top: 1rem;\n}\n\n/* progress */\n\n.wizard-progress {\n  margin-bottom: 1rem;\n}\n\n.progress-track {\n  width: 100%;\n  height: 3px;\n\n  overflow: hidden;\n\n  border-radius: 999px;\n\n  background:\n    var(\n      --border,\n      #ddd\n    );\n}\n\n.progress-value {\n  height: 100%;\n\n  border-radius: inherit;\n\n  background:\n    var(\n      --text-primary,\n      #111\n    );\n\n  transition:\n    width\n    200ms\n    ease;\n}\n\n.progress-text {\n  display: block;\n\n  margin-top: 0.65rem;\n\n  font-size: 0.82rem;\n\n  color:\n    var(\n      --text-secondary,\n      #666\n    );\n}\n\n/* step */\n\n.wizard-step {\n  width: min(100%, 820px);\n\n  min-height: 0;\n  flex: 1;\n\n  animation:\n    step-in\n    160ms\n    ease;\n}\n\n@keyframes step-in {\n  from {\n    opacity: 0;\n    transform: translateY(4px);\n  }\n\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n\n/* text */\n\n.step-copy {\n  max-width: 720px;\n\n  margin-bottom: 1rem;\n}\n\n.step-label {\n  display: block;\n\n  margin-bottom: 0.55rem;\n\n  font-size: 0.7rem;\n\n  font-weight: 650;\n\n  letter-spacing: 0.12em;\n\n  color:\n    var(\n      --text-secondary,\n      #666\n    );\n}\n\n.step-copy h2 {\n  margin: 0;\n\n  font-size:\n    clamp(\n      1.7rem,\n      2.8vw,\n      2.4rem\n    );\n\n  line-height: 1.1;\n\n  letter-spacing: -0.03em;\n}\n\n.step-copy p {\n  margin:\n    0.65rem\n    0\n    0;\n\n  font-size: 0.95rem;\n\n  line-height: 1.5;\n\n  color:\n    var(\n      --text-secondary,\n      #666\n    );\n}\n\n/* map */\n\n.map-action {\n  display: flex;\n\n  align-items: center;\n\n  gap: 1rem;\n}\n\n.map-success {\n  font-size: 0.85rem;\n\n  color:\n    var(\n      --text-secondary,\n      #666\n    );\n}\n\n/* error */\n\n.error-banner {\n  margin:\n    1rem\n    0\n    0;\n\n  padding:\n    0.75rem\n    0.9rem;\n\n  border:\n    1px solid\n    var(\n      --danger-border,\n      #d7bcbc\n    );\n\n  border-radius: 10px;\n\n  font-size: 0.85rem;\n\n  color:\n    var(\n      --danger,\n      #9c3030\n    );\n}\n\n/* navigation */\n\n.wizard-navigation {\n  display: flex;\n\n  width: min(100%, 820px);\n\n  align-items: center;\n\n  justify-content: space-between;\n\n  gap: 1rem;\n\n  margin-top: 1rem;\n\n  padding-top: 1rem;\n\n  border-top:\n    1px solid\n    var(\n      --border,\n      #ddd\n    );\n}\n\n.nav-right {\n  display: flex;\n\n  align-items: center;\n\n  gap: 0.75rem;\n\n  margin-left: auto;\n}\n\n/* tablet */\n\n@media (max-width: 900px) {\n  .editor-page {\n    padding:\n      1.5rem\n      1.75rem\n      2rem;\n  }\n\n  .page-heading > div {\n    flex-direction: column;\n\n    align-items: flex-start;\n\n    gap: 0.75rem;\n  }\n\n  .page-heading p {\n    max-width: 600px;\n\n    margin-bottom: 0;\n  }\n\n  .wizard-step {\n    min-height: 240px;\n  }\n}\n\n/* mobile */\n\n@media (max-width: 640px) {\n  .editor-page {\n    padding:\n      1rem\n      1rem\n      1.5rem;\n  }\n\n  .dashboard-link {\n    margin-bottom: 1rem;\n\n    font-size: 0.85rem;\n  }\n\n  .page-heading {\n    margin-bottom: 1.25rem;\n  }\n\n  .page-heading h1 {\n    font-size: 2.4rem;\n  }\n\n  .page-heading p {\n    font-size: 0.88rem;\n  }\n\n  .editor {\n    padding-top: 1rem;\n  }\n\n  .wizard-progress {\n    margin-bottom: 1.5rem;\n  }\n\n  .wizard-step {\n    min-height: 220px;\n  }\n\n  .step-copy {\n    margin-bottom: 1.25rem;\n  }\n\n  .step-label {\n    font-size: 0.64rem;\n  }\n\n  .step-copy h2 {\n    font-size: 1.75rem;\n  }\n\n  .step-copy p {\n    font-size: 0.88rem;\n  }\n\n  .map-action {\n    align-items: stretch;\n\n    flex-direction: column;\n  }\n\n  .map-action .button {\n    width: 100%;\n  }\n\n  .wizard-navigation {\n    margin-top: 1rem;\n\n    padding-top: 0.85rem;\n  }\n\n  .wizard-navigation .button {\n    min-height: 42px;\n\n    padding:\n      0.65rem\n      0.9rem;\n  }\n}\n\n/* very small mobile */\n\n@media (max-width: 420px) {\n  .editor-page {\n    padding-left: 0.85rem;\n    padding-right: 0.85rem;\n  }\n\n  .page-heading h1 {\n    font-size: 2.1rem;\n  }\n\n  .nav-right {\n    gap: 0.45rem;\n  }\n\n  .wizard-navigation .button {\n    padding-left: 0.75rem;\n    padding-right: 0.75rem;\n\n    font-size: 0.82rem;\n  }\n}\n\n/* shorter laptop screens */\n\n@media (max-height: 800px) and (min-width: 641px) {\n  .editor-page {\n    padding-top: 1rem;\n    padding-bottom: 1rem;\n  }\n\n  .dashboard-link {\n    margin-bottom: 0.8rem;\n  }\n\n  .page-heading {\n    margin-bottom: 1rem;\n  }\n\n  .page-heading h1 {\n    font-size: 3rem;\n  }\n\n  .editor {\n    padding-top: 1rem;\n  }\n\n  .wizard-progress {\n    margin-bottom: 1.25rem;\n  }\n\n  .wizard-step {\n    min-height: 210px;\n  }\n\n  .step-copy {\n    margin-bottom: 1.1rem;\n  }\n\n  .wizard-navigation {\n    margin-top: 1rem;\n  }\n}\n\n@media (prefers-reduced-motion: reduce) {\n  .wizard-step {\n    animation: none;\n  }\n\n  .progress-value {\n    transition: none;\n  }\n}\n"] }]
    }], () => [], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(EditorPage, { className: "EditorPage", filePath: "src/app/features/posts/editor.page.ts", lineNumber: 49 }); })();