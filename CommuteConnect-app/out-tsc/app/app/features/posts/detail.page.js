import { Component, computed, inject, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ApiService } from '../../utils/api';
import { AuthService } from '../../core/auth.service';
import { errorMessage } from '../../core/errors';
import { StateComponent } from '../../shared/state.component';
import { PaginationComponent } from '../../shared/pagination.component';
import { ChatComponent } from '../chat/chat.component';
import { MapPickerComponent, } from '../../shared/map-picker.component';
import * as i0 from "@angular/core";
const _c0 = a0 => ["/commutes", a0, "edit"];
const _forTrack0 = ($index, $item) => $item.id;
function DetailPage_Conditional_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 2);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r0.actionError());
} }
function DetailPage_Conditional_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "cc-state", 3);
} }
function DetailPage_Conditional_5_Template(rf, ctx) { if (rf & 1) {
    const _r2 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "cc-state", 8);
    i0.ɵɵlistener("retry", function DetailPage_Conditional_5_Template_cc_state_retry_0_listener() { i0.ɵɵrestoreView(_r2); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.load()); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵproperty("message", ctx_r0.error());
} }
function DetailPage_Conditional_6_Conditional_25_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div")(1, "span", 11);
    i0.ɵɵtext(2, "AVAILABLE SEATS");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "strong");
    i0.ɵɵtext(4);
    i0.ɵɵelementStart(5, "span", 23);
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const p_r3 = i0.ɵɵnextContext();
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate1(" ", p_r3.availableSeats, " ");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("of ", p_r3.seats);
} }
function DetailPage_Conditional_6_Conditional_26_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div")(1, "span", 11);
    i0.ɵɵtext(2, "VIA STOP");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "strong");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const p_r3 = i0.ɵɵnextContext();
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(p_r3.via);
} }
function DetailPage_Conditional_6_Conditional_28_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 24);
    i0.ɵɵlistener("click", function DetailPage_Conditional_6_Conditional_28_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r4); const ctx_r0 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r0.mapMode.set("view")); });
    i0.ɵɵtext(1, " View origin on map ");
    i0.ɵɵelementEnd();
} }
function DetailPage_Conditional_6_Conditional_29_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 20)(1, "span", 11);
    i0.ɵɵtext(2, "VEHICLE PLATE");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "strong");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const p_r3 = i0.ɵɵnextContext();
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(p_r3.vehicleNumber);
} }
function DetailPage_Conditional_6_Conditional_30_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 21)(1, "h2");
    i0.ɵɵtext(2, "Notes");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "p", 25);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const p_r3 = i0.ɵɵnextContext();
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(p_r3.notes);
} }
function DetailPage_Conditional_6_Conditional_31_Conditional_0_Conditional_5_Template(rf, ctx) { if (rf & 1) {
    const _r6 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 32);
    i0.ɵɵlistener("click", function DetailPage_Conditional_6_Conditional_31_Conditional_0_Conditional_5_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r6); const ctx_r0 = i0.ɵɵnextContext(4); return i0.ɵɵresetView(ctx_r0.openStartRideVerification()); });
    i0.ɵɵtext(1, " Start ride ");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(4);
    i0.ɵɵproperty("disabled", ctx_r0.busy());
} }
function DetailPage_Conditional_6_Conditional_31_Conditional_0_Conditional_6_Conditional_3_Template(rf, ctx) { if (rf & 1) {
    const _r8 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 34);
    i0.ɵɵlistener("click", function DetailPage_Conditional_6_Conditional_31_Conditional_0_Conditional_6_Conditional_3_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r8); const ctx_r0 = i0.ɵɵnextContext(5); return i0.ɵɵresetView(ctx_r0.openOtpVerification()); });
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(1, "svg", 35);
    i0.ɵɵelement(2, "path", 36);
    i0.ɵɵelementEnd();
    i0.ɵɵnamespaceHTML();
    i0.ɵɵelementStart(3, "span");
    i0.ɵɵtext(4, "Verify passenger");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "span", 37);
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(5);
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate(ctx_r0.unverifiedApplicants().length);
} }
function DetailPage_Conditional_6_Conditional_31_Conditional_0_Conditional_6_Template(rf, ctx) { if (rf & 1) {
    const _r7 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 31)(1, "button", 32);
    i0.ɵɵlistener("click", function DetailPage_Conditional_6_Conditional_31_Conditional_0_Conditional_6_Template_button_click_1_listener() { i0.ɵɵrestoreView(_r7); const ctx_r0 = i0.ɵɵnextContext(4); return i0.ɵɵresetView(ctx_r0.endRide()); });
    i0.ɵɵtext(2, " End ride ");
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(3, DetailPage_Conditional_6_Conditional_31_Conditional_0_Conditional_6_Conditional_3_Template, 7, 1, "button", 33);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(4);
    i0.ɵɵadvance();
    i0.ɵɵproperty("disabled", ctx_r0.busy());
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(ctx_r0.unverifiedApplicants().length ? 3 : -1);
} }
function DetailPage_Conditional_6_Conditional_31_Conditional_0_Template(rf, ctx) { if (rf & 1) {
    const _r5 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 27)(1, "a", 28);
    i0.ɵɵtext(2, " Edit commute ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "button", 29);
    i0.ɵɵlistener("click", function DetailPage_Conditional_6_Conditional_31_Conditional_0_Template_button_click_3_listener() { i0.ɵɵrestoreView(_r5); const ctx_r0 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r0.confirmDelete.set(true)); });
    i0.ɵɵtext(4, " Delete commute ");
    i0.ɵɵelementEnd()();
    i0.ɵɵconditionalCreate(5, DetailPage_Conditional_6_Conditional_31_Conditional_0_Conditional_5_Template, 2, 1, "button", 30)(6, DetailPage_Conditional_6_Conditional_31_Conditional_0_Conditional_6_Template, 4, 2, "div", 31);
} if (rf & 2) {
    const p_r3 = i0.ɵɵnextContext(2);
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("routerLink", i0.ɵɵpureFunction1(3, _c0, p_r3.id));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("disabled", ctx_r0.busy());
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(p_r3.rideStatus === "scheduled" && ctx_r0.acceptedApplicants().length ? 5 : p_r3.rideStatus === "in_progress" ? 6 : -1);
} }
function DetailPage_Conditional_6_Conditional_31_Conditional_1_Template(rf, ctx) { if (rf & 1) {
    const _r9 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "section", 26)(1, "h2");
    i0.ɵɵtext(2, "Cancel this commute?");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "p");
    i0.ɵɵtext(4, " Passengers will see it as cancelled. It will remain in everyone\u2019s history. ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "div", 27)(6, "button", 29);
    i0.ɵɵlistener("click", function DetailPage_Conditional_6_Conditional_31_Conditional_1_Template_button_click_6_listener() { i0.ɵɵrestoreView(_r9); const ctx_r0 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r0.remove()); });
    i0.ɵɵtext(7, " Yes, cancel commute ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "button", 38);
    i0.ɵɵlistener("click", function DetailPage_Conditional_6_Conditional_31_Conditional_1_Template_button_click_8_listener() { i0.ɵɵrestoreView(_r9); const ctx_r0 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r0.confirmDelete.set(false)); });
    i0.ɵɵtext(9, " Keep commute ");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(6);
    i0.ɵɵproperty("disabled", ctx_r0.busy());
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("disabled", ctx_r0.busy());
} }
function DetailPage_Conditional_6_Conditional_31_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵconditionalCreate(0, DetailPage_Conditional_6_Conditional_31_Conditional_0_Template, 7, 5);
    i0.ɵɵconditionalCreate(1, DetailPage_Conditional_6_Conditional_31_Conditional_1_Template, 10, 2, "section", 26);
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵconditional(ctx_r0.active ? 0 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r0.confirmDelete() ? 1 : -1);
} }
function DetailPage_Conditional_6_Conditional_32_Conditional_0_Conditional_0_Template(rf, ctx) { if (rf & 1) {
    const _r10 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 38);
    i0.ɵɵlistener("click", function DetailPage_Conditional_6_Conditional_32_Conditional_0_Conditional_0_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r10); const ctx_r0 = i0.ɵɵnextContext(4); return i0.ɵɵresetView(ctx_r0.withdraw()); });
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(4);
    i0.ɵɵproperty("disabled", ctx_r0.busy());
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r0.busy() ? "Updating\u2026" : "Withdraw interest", " ");
} }
function DetailPage_Conditional_6_Conditional_32_Conditional_0_Conditional_1_Template(rf, ctx) { if (rf & 1) {
    const _r11 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 41);
    i0.ɵɵlistener("click", function DetailPage_Conditional_6_Conditional_32_Conditional_0_Conditional_1_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r11); const ctx_r0 = i0.ɵɵnextContext(4); return i0.ɵɵresetView(ctx_r0.interest()); });
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const p_r3 = i0.ɵɵnextContext(3);
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵproperty("disabled", ctx_r0.busy() || p_r3.availableSeats === 0);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", p_r3.availableSeats === 0 ? "No seats available" : ctx_r0.busy() ? "Sending\u2026" : "I\u2019m interested", " ");
} }
function DetailPage_Conditional_6_Conditional_32_Conditional_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵconditionalCreate(0, DetailPage_Conditional_6_Conditional_32_Conditional_0_Conditional_0_Template, 2, 2, "button", 39)(1, DetailPage_Conditional_6_Conditional_32_Conditional_0_Conditional_1_Template, 2, 2, "button", 40);
} if (rf & 2) {
    const p_r3 = i0.ɵɵnextContext(2);
    i0.ɵɵconditional((p_r3.myInterest == null ? null : p_r3.myInterest.status) === "pending" || (p_r3.myInterest == null ? null : p_r3.myInterest.status) === "accepted" ? 0 : !p_r3.myInterest || p_r3.myInterest.status === "withdrawn" ? 1 : -1);
} }
function DetailPage_Conditional_6_Conditional_32_Conditional_1_Conditional_0_Template(rf, ctx) { if (rf & 1) {
    const _r13 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 44);
    i0.ɵɵlistener("click", function DetailPage_Conditional_6_Conditional_32_Conditional_1_Conditional_0_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r13); const ctx_r0 = i0.ɵɵnextContext(4); return i0.ɵɵresetView(ctx_r0.passengerOtpOpen.set(true)); });
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(1, "svg", 35);
    i0.ɵɵelement(2, "path", 36);
    i0.ɵɵelementEnd();
    i0.ɵɵnamespaceHTML();
    i0.ɵɵelementStart(3, "span");
    i0.ɵɵtext(4, "View ride code");
    i0.ɵɵelementEnd()();
} }
function DetailPage_Conditional_6_Conditional_32_Conditional_1_Conditional_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 43);
    i0.ɵɵtext(1, "Your pickup code has been verified.");
    i0.ɵɵelementEnd();
} }
function DetailPage_Conditional_6_Conditional_32_Conditional_1_Template(rf, ctx) { if (rf & 1) {
    const _r12 = i0.ɵɵgetCurrentView();
    i0.ɵɵconditionalCreate(0, DetailPage_Conditional_6_Conditional_32_Conditional_1_Conditional_0_Template, 5, 0, "button", 42)(1, DetailPage_Conditional_6_Conditional_32_Conditional_1_Conditional_1_Template, 2, 0, "p", 43);
    i0.ɵɵelementStart(2, "button", 44);
    i0.ɵɵlistener("click", function DetailPage_Conditional_6_Conditional_32_Conditional_1_Template_button_click_2_listener() { i0.ɵɵrestoreView(_r12); const ctx_r0 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r0.openChat()); });
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(3, "svg", 35);
    i0.ɵɵelement(4, "path", 45);
    i0.ɵɵelementEnd();
    i0.ɵɵnamespaceHTML();
    i0.ɵɵelementStart(5, "span");
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const p_r3 = i0.ɵɵnextContext(2);
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵconditional((p_r3.myInterest == null ? null : p_r3.myInterest.rideOtp) && !(p_r3.myInterest == null ? null : p_r3.myInterest.boardedAt) && ctx_r0.active ? 0 : (p_r3.myInterest == null ? null : p_r3.myInterest.boardedAt) ? 1 : -1);
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate1("Chat with ", p_r3.owner.name);
} }
function DetailPage_Conditional_6_Conditional_32_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵconditionalCreate(0, DetailPage_Conditional_6_Conditional_32_Conditional_0_Template, 2, 1);
    i0.ɵɵconditionalCreate(1, DetailPage_Conditional_6_Conditional_32_Conditional_1_Template, 7, 2);
} if (rf & 2) {
    const p_r3 = i0.ɵɵnextContext();
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵconditional(ctx_r0.active ? 0 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional((p_r3.myInterest == null ? null : p_r3.myInterest.status) === "accepted" ? 1 : -1);
} }
function DetailPage_Conditional_6_Conditional_33_Conditional_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "cc-state", 46);
} }
function DetailPage_Conditional_6_Conditional_33_Conditional_2_Template(rf, ctx) { if (rf & 1) {
    const _r14 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "cc-state", 49);
    i0.ɵɵlistener("retry", function DetailPage_Conditional_6_Conditional_33_Conditional_2_Template_cc_state_retry_0_listener() { i0.ɵɵrestoreView(_r14); const ctx_r0 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r0.loadApplicants(ctx_r0.applicantPage())); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(3);
    i0.ɵɵproperty("message", ctx_r0.applicantsError());
} }
function DetailPage_Conditional_6_Conditional_33_Conditional_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "cc-state", 48);
} }
function DetailPage_Conditional_6_Conditional_33_Conditional_4_Conditional_0_For_4_Conditional_6_Template(rf, ctx) { if (rf & 1) {
    const _r16 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 27)(1, "button", 55);
    i0.ɵɵlistener("click", function DetailPage_Conditional_6_Conditional_33_Conditional_4_Conditional_0_For_4_Conditional_6_Template_button_click_1_listener() { i0.ɵɵrestoreView(_r16); const i_r17 = i0.ɵɵnextContext().$implicit; const ctx_r0 = i0.ɵɵnextContext(5); return i0.ɵɵresetView(ctx_r0.decide(i_r17.id, "accepted")); });
    i0.ɵɵtext(2, " Accept ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "button", 38);
    i0.ɵɵlistener("click", function DetailPage_Conditional_6_Conditional_33_Conditional_4_Conditional_0_For_4_Conditional_6_Template_button_click_3_listener() { i0.ɵɵrestoreView(_r16); const i_r17 = i0.ɵɵnextContext().$implicit; const ctx_r0 = i0.ɵɵnextContext(5); return i0.ɵɵresetView(ctx_r0.decide(i_r17.id, "declined")); });
    i0.ɵɵtext(4, " Decline ");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const p_r3 = i0.ɵɵnextContext(5);
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("disabled", ctx_r0.busy() || p_r3.availableSeats === 0);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("disabled", ctx_r0.busy());
} }
function DetailPage_Conditional_6_Conditional_33_Conditional_4_Conditional_0_For_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "li", 53)(1, "div")(2, "strong");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "span", 54);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd()();
    i0.ɵɵconditionalCreate(6, DetailPage_Conditional_6_Conditional_33_Conditional_4_Conditional_0_For_4_Conditional_6_Template, 5, 2, "div", 27);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const i_r17 = ctx.$implicit;
    const ctx_r0 = i0.ɵɵnextContext(5);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i_r17.user == null ? null : i_r17.user.name);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i_r17.status);
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r0.active && i_r17.status === "pending" ? 6 : -1);
} }
function DetailPage_Conditional_6_Conditional_33_Conditional_4_Conditional_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "h2");
    i0.ɵɵtext(1, "Interested passengers");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(2, "ul", 52);
    i0.ɵɵrepeaterCreate(3, DetailPage_Conditional_6_Conditional_33_Conditional_4_Conditional_0_For_4_Template, 7, 3, "li", 53, _forTrack0);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(4);
    i0.ɵɵadvance(3);
    i0.ɵɵrepeater(ctx_r0.reviewApplicants());
} }
function DetailPage_Conditional_6_Conditional_33_Conditional_4_Conditional_2_Template(rf, ctx) { if (rf & 1) {
    const _r18 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "section", 51)(1, "h2", 56);
    i0.ɵɵtext(2, "Passengers");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "button", 44);
    i0.ɵɵlistener("click", function DetailPage_Conditional_6_Conditional_33_Conditional_4_Conditional_2_Template_button_click_3_listener() { i0.ɵɵrestoreView(_r18); const ctx_r0 = i0.ɵɵnextContext(4); return i0.ɵɵresetView(ctx_r0.openChat()); });
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(4, "svg", 35);
    i0.ɵɵelement(5, "path", 45);
    i0.ɵɵelementEnd();
    i0.ɵɵnamespaceHTML();
    i0.ɵɵelementStart(6, "span");
    i0.ɵɵtext(7, "Open conversations");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "span", 37);
    i0.ɵɵtext(9);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(4);
    i0.ɵɵadvance(9);
    i0.ɵɵtextInterpolate(ctx_r0.acceptedApplicants().length);
} }
function DetailPage_Conditional_6_Conditional_33_Conditional_4_Template(rf, ctx) { if (rf & 1) {
    const _r15 = i0.ɵɵgetCurrentView();
    i0.ɵɵconditionalCreate(0, DetailPage_Conditional_6_Conditional_33_Conditional_4_Conditional_0_Template, 5, 0);
    i0.ɵɵelementStart(1, "cc-pagination", 50);
    i0.ɵɵlistener("change", function DetailPage_Conditional_6_Conditional_33_Conditional_4_Template_cc_pagination_change_1_listener($event) { i0.ɵɵrestoreView(_r15); const ctx_r0 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r0.loadApplicants($event)); });
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(2, DetailPage_Conditional_6_Conditional_33_Conditional_4_Conditional_2_Template, 10, 1, "section", 51);
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(3);
    i0.ɵɵconditional(ctx_r0.reviewApplicants().length ? 0 : -1);
    i0.ɵɵadvance();
    i0.ɵɵproperty("page", ctx_r0.applicantPage())("totalPages", ctx_r0.applicants().totalPages);
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r0.acceptedApplicants().length ? 2 : -1);
} }
function DetailPage_Conditional_6_Conditional_33_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "section", 22);
    i0.ɵɵconditionalCreate(1, DetailPage_Conditional_6_Conditional_33_Conditional_1_Template, 1, 0, "cc-state", 46)(2, DetailPage_Conditional_6_Conditional_33_Conditional_2_Template, 1, 1, "cc-state", 47)(3, DetailPage_Conditional_6_Conditional_33_Conditional_3_Template, 1, 0, "cc-state", 48)(4, DetailPage_Conditional_6_Conditional_33_Conditional_4_Template, 3, 4);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    let tmp_3_0;
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r0.applicantsLoading() ? 1 : ctx_r0.applicantsError() ? 2 : !((tmp_3_0 = ctx_r0.applicants()) == null ? null : tmp_3_0.data == null ? null : tmp_3_0.data.length) ? 3 : 4);
} }
function DetailPage_Conditional_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "article", 9)(1, "div", 10)(2, "p", 11);
    i0.ɵɵtext(3);
    i0.ɵɵpipe(4, "date");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "span", 12);
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(7, "h1", 13)(8, "span", 14);
    i0.ɵɵtext(9);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "span", 15);
    i0.ɵɵtext(11, "\u2192");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(12, "span", 14);
    i0.ɵɵtext(13);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(14, "p", 16);
    i0.ɵɵtext(15, "Offered by ");
    i0.ɵɵelementStart(16, "strong");
    i0.ɵɵtext(17);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(18, "div", 17)(19, "div")(20, "span", 11);
    i0.ɵɵtext(21, "DEPARTURE");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(22, "strong");
    i0.ɵɵtext(23);
    i0.ɵɵpipe(24, "date");
    i0.ɵɵelementEnd()();
    i0.ɵɵconditionalCreate(25, DetailPage_Conditional_6_Conditional_25_Template, 7, 2, "div");
    i0.ɵɵconditionalCreate(26, DetailPage_Conditional_6_Conditional_26_Template, 5, 1, "div");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(27, "div", 18);
    i0.ɵɵconditionalCreate(28, DetailPage_Conditional_6_Conditional_28_Template, 2, 0, "button", 19);
    i0.ɵɵconditionalCreate(29, DetailPage_Conditional_6_Conditional_29_Template, 5, 1, "div", 20);
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(30, DetailPage_Conditional_6_Conditional_30_Template, 5, 1, "div", 21);
    i0.ɵɵconditionalCreate(31, DetailPage_Conditional_6_Conditional_31_Template, 2, 2)(32, DetailPage_Conditional_6_Conditional_32_Template, 2, 2);
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(33, DetailPage_Conditional_6_Conditional_33_Template, 5, 1, "section", 22);
} if (rf & 2) {
    const p_r3 = ctx;
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(4, 13, p_r3.departureAt, "EEEE, d MMMM y"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1(" ", p_r3.deletedAt ? "Cancelled" : p_r3.rideStatus === "in_progress" ? "On ride" : ctx_r0.active ? "Upcoming" : "Past commute", " ");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(p_r3.origin);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(p_r3.destination);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(p_r3.owner.name);
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(24, 16, p_r3.departureAt, "shortTime"));
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(!ctx_r0.isHistory ? 25 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(p_r3.via ? 26 : -1);
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(p_r3.originLat || p_r3.originLng ? 28 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(p_r3.vehicleNumber ? 29 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(p_r3.notes ? 30 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r0.isOwner() ? 31 : 32);
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(ctx_r0.isOwner() ? 33 : -1);
} }
function DetailPage_Conditional_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 5);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r0.notice());
} }
function DetailPage_Conditional_8_Conditional_11_For_2_Template(rf, ctx) { if (rf & 1) {
    const _r20 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 67);
    i0.ɵɵlistener("click", function DetailPage_Conditional_8_Conditional_11_For_2_Template_button_click_0_listener() { const interest_r21 = i0.ɵɵrestoreView(_r20).$implicit; const ctx_r0 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r0.selectedChatId.set(interest_r21.id)); });
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const interest_r21 = ctx.$implicit;
    const ctx_r0 = i0.ɵɵnextContext(3);
    i0.ɵɵclassProp("selected", ctx_r0.selectedChatId() === interest_r21.id);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", (interest_r21.user == null ? null : interest_r21.user.name) || "Passenger", " ");
} }
function DetailPage_Conditional_8_Conditional_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 63);
    i0.ɵɵrepeaterCreate(1, DetailPage_Conditional_8_Conditional_11_For_2_Template, 2, 3, "button", 66, _forTrack0);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵrepeater(ctx_r0.acceptedApplicants());
} }
function DetailPage_Conditional_8_Conditional_12_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "cc-chat", 64);
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("interestId", ctx.id)("participantName", ctx_r0.selectedChatName())("readOnly", ctx_r0.isHistory);
} }
function DetailPage_Conditional_8_Conditional_13_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 65);
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(1, "svg", 35);
    i0.ɵɵelement(2, "path", 45);
    i0.ɵɵelementEnd();
    i0.ɵɵnamespaceHTML();
    i0.ɵɵelementStart(3, "p");
    i0.ɵɵtext(4, "Select a passenger to open your private conversation.");
    i0.ɵɵelementEnd()();
} }
function DetailPage_Conditional_8_Template(rf, ctx) { if (rf & 1) {
    const _r19 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 57);
    i0.ɵɵlistener("click", function DetailPage_Conditional_8_Template_div_click_0_listener() { i0.ɵɵrestoreView(_r19); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.closeChat()); });
    i0.ɵɵelementStart(1, "section", 58);
    i0.ɵɵlistener("click", function DetailPage_Conditional_8_Template_section_click_1_listener($event) { return $event.stopPropagation(); });
    i0.ɵɵelementStart(2, "header", 59)(3, "div")(4, "p", 11);
    i0.ɵɵtext(5, "PRIVATE CONVERSATION");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "h2", 60);
    i0.ɵɵtext(7, "Messages");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(8, "button", 61);
    i0.ɵɵlistener("click", function DetailPage_Conditional_8_Template_button_click_8_listener() { i0.ɵɵrestoreView(_r19); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.closeChat()); });
    i0.ɵɵtext(9, " \u00D7 ");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(10, "div", 62);
    i0.ɵɵconditionalCreate(11, DetailPage_Conditional_8_Conditional_11_Template, 3, 0, "div", 63);
    i0.ɵɵconditionalCreate(12, DetailPage_Conditional_8_Conditional_12_Template, 1, 3, "cc-chat", 64)(13, DetailPage_Conditional_8_Conditional_13_Template, 5, 0, "div", 65);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    let tmp_2_0;
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(11);
    i0.ɵɵconditional(ctx_r0.isOwner() ? 11 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional((tmp_2_0 = ctx_r0.selectedChat()) ? 12 : 13, tmp_2_0);
} }
function DetailPage_Conditional_9_Conditional_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 71);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r0.otpError(), " ");
} }
function DetailPage_Conditional_9_Conditional_11_For_2_Template(rf, ctx) { if (rf & 1) {
    const _r23 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 67);
    i0.ɵɵlistener("click", function DetailPage_Conditional_9_Conditional_11_For_2_Template_button_click_0_listener() { const interest_r24 = i0.ɵɵrestoreView(_r23).$implicit; const ctx_r0 = i0.ɵɵnextContext(3); ctx_r0.otpInterestId.set(interest_r24.id); ctx_r0.otp.set(""); return i0.ɵɵresetView(ctx_r0.otpError.set("")); });
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const interest_r24 = ctx.$implicit;
    const ctx_r0 = i0.ɵɵnextContext(3);
    i0.ɵɵclassProp("selected", ctx_r0.otpInterestId() === interest_r24.id);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", (interest_r24.user == null ? null : interest_r24.user.name) || "Passenger", " ");
} }
function DetailPage_Conditional_9_Conditional_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 72);
    i0.ɵɵrepeaterCreate(1, DetailPage_Conditional_9_Conditional_11_For_2_Template, 2, 3, "button", 66, _forTrack0);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵrepeater(ctx_r0.unverifiedApplicants());
} }
function DetailPage_Conditional_9_Template(rf, ctx) { if (rf & 1) {
    const _r22 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 57);
    i0.ɵɵlistener("click", function DetailPage_Conditional_9_Template_div_click_0_listener() { i0.ɵɵrestoreView(_r22); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.closeOtpVerification()); });
    i0.ɵɵelementStart(1, "section", 68);
    i0.ɵɵlistener("click", function DetailPage_Conditional_9_Template_section_click_1_listener($event) { return $event.stopPropagation(); });
    i0.ɵɵelementStart(2, "header", 59)(3, "div")(4, "p", 11);
    i0.ɵɵtext(5, "RIDE VERIFICATION");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "h2", 69);
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(8, "button", 70);
    i0.ɵɵlistener("click", function DetailPage_Conditional_9_Template_button_click_8_listener() { i0.ɵɵrestoreView(_r22); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.closeOtpVerification()); });
    i0.ɵɵtext(9, " \u00D7 ");
    i0.ɵɵelementEnd()();
    i0.ɵɵconditionalCreate(10, DetailPage_Conditional_9_Conditional_10_Template, 2, 1, "p", 71);
    i0.ɵɵconditionalCreate(11, DetailPage_Conditional_9_Conditional_11_Template, 3, 0, "div", 72);
    i0.ɵɵelementStart(12, "form", 73);
    i0.ɵɵlistener("submit", function DetailPage_Conditional_9_Template_form_submit_12_listener($event) { const passenger_r25 = i0.ɵɵrestoreView(_r22); const ctx_r0 = i0.ɵɵnextContext(); $event.preventDefault(); return i0.ɵɵresetView(ctx_r0.verifyOtp(passenger_r25.id)); });
    i0.ɵɵelementStart(13, "label", 74);
    i0.ɵɵtext(14, "Six-digit passenger code");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(15, "div")(16, "input", 75);
    i0.ɵɵlistener("input", function DetailPage_Conditional_9_Template_input_input_16_listener($event) { i0.ɵɵrestoreView(_r22); const ctx_r0 = i0.ɵɵnextContext(); ctx_r0.otp.set($event.target.value); return i0.ɵɵresetView(ctx_r0.otpError.set("")); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(17, "button", 76);
    i0.ɵɵtext(18, " Verify passenger ");
    i0.ɵɵelementEnd()()()()();
} if (rf & 2) {
    const passenger_r25 = ctx;
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(7);
    i0.ɵɵtextInterpolate1(" Verify ", (passenger_r25.user == null ? null : passenger_r25.user.name) || "passenger", " ");
    i0.ɵɵadvance(3);
    i0.ɵɵconditional(ctx_r0.otpError() ? 10 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r0.unverifiedApplicants().length > 1 ? 11 : -1);
    i0.ɵɵadvance(5);
    i0.ɵɵproperty("value", ctx_r0.otp());
    i0.ɵɵadvance();
    i0.ɵɵproperty("disabled", ctx_r0.busy() || ctx_r0.otp().length !== 6);
} }
function DetailPage_Conditional_10_Template(rf, ctx) { if (rf & 1) {
    const _r26 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 57);
    i0.ɵɵlistener("click", function DetailPage_Conditional_10_Template_div_click_0_listener() { i0.ɵɵrestoreView(_r26); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.passengerOtpOpen.set(false)); });
    i0.ɵɵelementStart(1, "section", 77);
    i0.ɵɵlistener("click", function DetailPage_Conditional_10_Template_section_click_1_listener($event) { return $event.stopPropagation(); });
    i0.ɵɵelementStart(2, "header", 59)(3, "div")(4, "p", 11);
    i0.ɵɵtext(5, "SAFE RIDE CODE");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "h2", 78);
    i0.ɵɵtext(7, "Your pickup code");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(8, "button", 79);
    i0.ɵɵlistener("click", function DetailPage_Conditional_10_Template_button_click_8_listener() { i0.ɵɵrestoreView(_r26); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.passengerOtpOpen.set(false)); });
    i0.ɵɵtext(9, " \u00D7 ");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(10, "div", 80)(11, "strong");
    i0.ɵɵtext(12);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "p");
    i0.ɵɵtext(14, "Share this code only with the driver when you meet.");
    i0.ɵɵelementEnd()()()();
} if (rf & 2) {
    i0.ɵɵadvance(12);
    i0.ɵɵtextInterpolate(ctx);
} }
function DetailPage_Conditional_11_Template(rf, ctx) { if (rf & 1) {
    const _r27 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "cc-map-picker", 81);
    i0.ɵɵlistener("closed", function DetailPage_Conditional_11_Template_cc_map_picker_closed_0_listener() { i0.ɵɵrestoreView(_r27); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.mapMode.set(null)); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵproperty("mode", ctx)("initialPoints", ctx_r0.mapPoints());
} }
export class DetailPage {
    api = inject(ApiService);
    auth = inject(AuthService);
    route = inject(ActivatedRoute);
    id = this.route.snapshot.paramMap.get('id');
    post = signal(null, ...(ngDevMode ? [{ debugName: "post" }] : /* istanbul ignore next */ []));
    applicants = signal(null, ...(ngDevMode ? [{ debugName: "applicants" }] : /* istanbul ignore next */ []));
    loading = signal(true, ...(ngDevMode ? [{ debugName: "loading" }] : /* istanbul ignore next */ []));
    error = signal('', ...(ngDevMode ? [{ debugName: "error" }] : /* istanbul ignore next */ []));
    actionError = signal('', ...(ngDevMode ? [{ debugName: "actionError" }] : /* istanbul ignore next */ []));
    notice = signal('', ...(ngDevMode ? [{ debugName: "notice" }] : /* istanbul ignore next */ []));
    busy = signal(false, ...(ngDevMode ? [{ debugName: "busy" }] : /* istanbul ignore next */ []));
    confirmDelete = signal(false, ...(ngDevMode ? [{ debugName: "confirmDelete" }] : /* istanbul ignore next */ []));
    applicantsError = signal('', ...(ngDevMode ? [{ debugName: "applicantsError" }] : /* istanbul ignore next */ []));
    applicantsLoading = signal(false, ...(ngDevMode ? [{ debugName: "applicantsLoading" }] : /* istanbul ignore next */ []));
    applicantPage = signal(1, ...(ngDevMode ? [{ debugName: "applicantPage" }] : /* istanbul ignore next */ []));
    selectedChatId = signal(null, ...(ngDevMode ? [{ debugName: "selectedChatId" }] : /* istanbul ignore next */ []));
    chatOpen = signal(false, ...(ngDevMode ? [{ debugName: "chatOpen" }] : /* istanbul ignore next */ []));
    otpInterestId = signal(null, ...(ngDevMode ? [{ debugName: "otpInterestId" }] : /* istanbul ignore next */ []));
    startAfterOtp = signal(false, ...(ngDevMode ? [{ debugName: "startAfterOtp" }] : /* istanbul ignore next */ []));
    passengerOtpOpen = signal(false, ...(ngDevMode ? [{ debugName: "passengerOtpOpen" }] : /* istanbul ignore next */ []));
    mapMode = signal(null, ...(ngDevMode ? [{ debugName: "mapMode" }] : /* istanbul ignore next */ []));
    otp = signal('', ...(ngDevMode ? [{ debugName: "otp" }] : /* istanbul ignore next */ []));
    otpError = signal('', ...(ngDevMode ? [{ debugName: "otpError" }] : /* istanbul ignore next */ []));
    isOwner = computed(() => this.post()?.ownerId === this.auth.user()?.id, ...(ngDevMode ? [{ debugName: "isOwner" }] : /* istanbul ignore next */ []));
    acceptedApplicants = computed(() => this.applicants()?.data.filter((interest) => interest.status === 'accepted') || [], ...(ngDevMode ? [{ debugName: "acceptedApplicants" }] : /* istanbul ignore next */ []));
    reviewApplicants = computed(() => this.applicants()?.data.filter((interest) => interest.status !== 'accepted') || [], ...(ngDevMode ? [{ debugName: "reviewApplicants" }] : /* istanbul ignore next */ []));
    unverifiedApplicants = computed(() => this.acceptedApplicants().filter((interest) => !interest.boardedAt), ...(ngDevMode ? [{ debugName: "unverifiedApplicants" }] : /* istanbul ignore next */ []));
    selectedChat = computed(() => {
        if (!this.chatOpen()) {
            return null;
        }
        if (!this.isOwner()) {
            const interest = this.post()?.myInterest;
            return interest?.status === 'accepted' ? interest : null;
        }
        return (this.acceptedApplicants().find((interest) => interest.id === this.selectedChatId()) || null);
    }, ...(ngDevMode ? [{ debugName: "selectedChat" }] : /* istanbul ignore next */ []));
    selectedChatName = computed(() => {
        const chat = this.selectedChat();
        if (!chat) {
            return '';
        }
        return this.isOwner()
            ? chat.user?.name || 'Passenger'
            : this.post()?.owner.name || 'Driver';
    }, ...(ngDevMode ? [{ debugName: "selectedChatName" }] : /* istanbul ignore next */ []));
    otpInterest = computed(() => this.acceptedApplicants().find((interest) => interest.id === this.otpInterestId()) || null, ...(ngDevMode ? [{ debugName: "otpInterest" }] : /* istanbul ignore next */ []));
    get active() {
        const p = this.post();
        return (!!p &&
            !p.deletedAt &&
            p.rideStatus !== 'completed' &&
            (new Date(p.departureAt) > new Date() || p.rideStatus === 'in_progress'));
    }
    get isHistory() {
        return !this.active;
    }
    constructor() {
        this.route.queryParamMap.subscribe((params) => {
            const conversationId = params.get('conversation');
            if (conversationId) {
                this.selectedChatId.set(conversationId);
                this.chatOpen.set(true);
            }
        });
        void this.load();
    }
    async load() {
        this.loading.set(true);
        this.error.set('');
        try {
            this.post.set(await this.api.getCommute(this.id));
            if (this.isOwner()) {
                await this.loadApplicants(this.applicantPage());
            }
        }
        catch (e) {
            this.error.set(errorMessage(e));
        }
        finally {
            this.loading.set(false);
        }
    }
    async loadApplicants(page) {
        this.applicantPage.set(page);
        this.applicantsLoading.set(true);
        this.applicantsError.set('');
        try {
            this.applicants.set(await this.api.getPostInterests(this.id, page));
        }
        catch (e) {
            this.applicantsError.set(errorMessage(e));
        }
        finally {
            this.applicantsLoading.set(false);
        }
    }
    async act(action, message) {
        if (this.busy()) {
            return;
        }
        this.busy.set(true);
        this.actionError.set('');
        this.notice.set('');
        try {
            await action();
            this.confirmDelete.set(false);
            this.notice.set(message);
            await this.load();
        }
        catch (e) {
            this.actionError.set(errorMessage(e));
        }
        finally {
            this.busy.set(false);
        }
    }
    interest() {
        const post = this.post();
        if (!post) {
            return;
        }
        void this.act(() => this.api.expressInterest(this.id), 'Your interest has been sent. The driver can now review it.');
    }
    withdraw() {
        const i = this.post()?.myInterest;
        if (i) {
            void this.act(() => this.api.withdrawInterest(i.id), 'Your interest has been withdrawn.');
        }
    }
    decide(id, status) {
        void this.act(() => this.api.decideInterest(id, status), status === 'accepted'
            ? 'Passenger accepted. A seat has been reserved.'
            : 'Interest declined.');
    }
    remove() {
        void this.act(() => this.api.deleteCommute(this.id), 'Commute cancelled. It is now in your history.');
    }
    openChat() {
        this.selectedChatId.set(null);
        this.chatOpen.set(true);
    }
    closeChat() {
        this.chatOpen.set(false);
        this.selectedChatId.set(null);
    }
    openStartRideVerification() {
        const accepted = this.acceptedApplicants();
        if (accepted.some((interest) => !!interest.boardedAt)) {
            this.startRide();
            return;
        }
        const passenger = this.unverifiedApplicants()[0];
        if (!passenger) {
            return;
        }
        this.otp.set('');
        this.otpError.set('');
        this.startAfterOtp.set(true);
        this.otpInterestId.set(passenger.id);
    }
    openOtpVerification(interestId) {
        const passenger = interestId
            ? this.unverifiedApplicants().find((item) => item.id === interestId)
            : this.unverifiedApplicants()[0];
        if (!passenger) {
            return;
        }
        this.otp.set('');
        this.otpError.set('');
        this.startAfterOtp.set(false);
        this.otpInterestId.set(passenger.id);
    }
    closeOtpVerification() {
        this.otpInterestId.set(null);
        this.startAfterOtp.set(false);
        this.otp.set('');
        this.otpError.set('');
    }
    async verifyOtp(interestId) {
        if (this.busy()) {
            return;
        }
        const shouldStart = this.startAfterOtp();
        this.busy.set(true);
        this.actionError.set('');
        this.notice.set('');
        this.otpError.set('');
        try {
            await this.api.verifyRideOtp(interestId, this.otp());
        }
        catch (e) {
            this.otpError.set(errorMessage(e));
            this.busy.set(false);
            return;
        }
        try {
            this.closeOtpVerification();
            await this.load();
            if (shouldStart) {
                try {
                    await this.api.startRide(this.id);
                    this.notice.set('Ride started. Passengers notified.');
                    await this.load();
                }
                catch (e) {
                    this.actionError.set(errorMessage(e));
                }
            }
            else {
                this.notice.set('Passenger verified for this ride.');
            }
        }
        finally {
            this.busy.set(false);
        }
    }
    startRide() {
        void this.act(() => this.api.startRide(this.id), 'Ride started. Passengers notified.');
    }
    endRide() {
        void this.act(() => this.api.endRide(this.id), 'Ride ended. Passengers notified.');
    }
    mapPoints() {
        const post = this.post();
        if (!post) {
            return {};
        }
        return {
            ...(post.originLat || post.originLng
                ? { origin: { lat: post.originLat, lng: post.originLng } }
                : {}),
        };
    }
    static ɵfac = function DetailPage_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || DetailPage)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: DetailPage, selectors: [["ng-component"]], decls: 12, vars: 7, consts: [[1, "narrow"], ["routerLink", "/commutes", 1, "text-link"], ["role", "alert", 1, "error-banner"], ["kind", "loading", "title", "Loading commute\u2026"], ["kind", "error", "title", "Couldn\u2019t load this commute", 3, "message"], ["role", "status", 1, "success-banner"], [1, "chat-backdrop"], [3, "mode", "initialPoints"], ["kind", "error", "title", "Couldn\u2019t load this commute", 3, "retry", "message"], ["id", "ride-details", 1, "panel", "detail-panel"], [1, "card-top"], [1, "eyebrow"], ["id", "ride-status", 1, "badge"], [1, "route-heading"], [1, "route-point"], [1, "route-arrow"], [1, "subtle", "driver-name"], [1, "detail-facts"], [1, "detail-secondary-row"], ["type", "button", 1, "button", "secondary", "view-map-btn"], [1, "vehicle-number"], [1, "notes-box"], ["id", "passengers", 1, "applicants-section"], [1, "small", "subtle"], ["type", "button", 1, "button", "secondary", "view-map-btn", 3, "click"], [1, "notes"], ["aria-label", "Confirm cancellation", 1, "confirm-box"], [1, "actions"], [1, "button", "secondary", 3, "routerLink"], [1, "button", "danger", 3, "click", "disabled"], ["type", "button", 1, "button", 3, "disabled"], [1, "ride-actions"], ["type", "button", 1, "button", 3, "click", "disabled"], ["type", "button", "aria-label", "Verify another passenger", 1, "icon-action"], ["type", "button", "aria-label", "Verify another passenger", 1, "icon-action", 3, "click"], ["aria-hidden", "true", "viewBox", "0 0 24 24"], ["d", "M7 11h10M9 7h6M8 15h8M5 3h14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H9l-4 3v-3a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z"], [1, "action-count"], [1, "button", "secondary", 3, "click", "disabled"], [1, "button", "secondary", 3, "disabled"], [1, "button", "full", 3, "disabled"], [1, "button", "full", 3, "click", "disabled"], ["type", "button", 1, "icon-action"], [1, "success-banner"], ["type", "button", 1, "icon-action", 3, "click"], ["d", "M21 12a8 8 0 0 1-8 8H7l-4 2 1.5-4A8 8 0 1 1 21 12Z"], ["kind", "loading", "title", "Loading passengers\u2026"], ["kind", "error", "title", "Couldn\u2019t load passengers", 3, "message"], ["title", "No interest yet", "message", "People who want to join your commute will appear here."], ["kind", "error", "title", "Couldn\u2019t load passengers", 3, "retry", "message"], [3, "change", "page", "totalPages"], ["id", "conversations", "aria-labelledby", "conversation-title", 1, "owner-conversations"], [1, "applicant-list"], [1, "panel", "applicant"], [1, "badge"], [1, "button", 3, "click", "disabled"], ["id", "conversation-title"], [1, "chat-backdrop", 3, "click"], ["role", "dialog", "aria-modal", "true", "aria-labelledby", "chat-dialog-title", 1, "chat-dialog", 3, "click"], [1, "chat-dialog-heading"], ["id", "chat-dialog-title"], ["type", "button", "aria-label", "Close conversation", 1, "icon-button", 3, "click"], [1, "chat-dialog-content"], ["aria-label", "Choose a passenger", 1, "chat-user-picker"], [3, "interestId", "participantName", "readOnly"], [1, "chat-placeholder"], ["type", "button", 3, "selected"], ["type", "button", 3, "click"], ["role", "dialog", "aria-modal", "true", "aria-labelledby", "otp-dialog-title", 1, "otp-dialog", 3, "click"], ["id", "otp-dialog-title"], ["type", "button", "aria-label", "Close OTP verification", 1, "icon-button", 3, "click"], ["role", "alert", 1, "error-banner", "otp-error"], ["aria-label", "Choose a passenger to verify", 1, "otp-passenger-picker"], [1, "otp-verification", 3, "submit"], ["for", "ride-otp"], ["id", "ride-otp", "inputmode", "numeric", "autocomplete", "one-time-code", "maxlength", "6", "pattern", "[0-9]{6}", 3, "input", "value"], ["type", "submit", 1, "button", 3, "disabled"], ["role", "dialog", "aria-modal", "true", "aria-labelledby", "ride-code-title", 1, "otp-dialog", "ride-code-dialog", 3, "click"], ["id", "ride-code-title"], ["type", "button", "aria-label", "Close ride code", 1, "icon-button", 3, "click"], [1, "ride-code-content"], [3, "closed", "mode", "initialPoints"]], template: function DetailPage_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "section", 0)(1, "a", 1);
            i0.ɵɵtext(2, "\u2190 Browse commutes");
            i0.ɵɵelementEnd();
            i0.ɵɵconditionalCreate(3, DetailPage_Conditional_3_Template, 2, 1, "p", 2);
            i0.ɵɵconditionalCreate(4, DetailPage_Conditional_4_Template, 1, 0, "cc-state", 3)(5, DetailPage_Conditional_5_Template, 1, 1, "cc-state", 4)(6, DetailPage_Conditional_6_Template, 34, 19);
            i0.ɵɵconditionalCreate(7, DetailPage_Conditional_7_Template, 2, 1, "p", 5);
            i0.ɵɵelementEnd();
            i0.ɵɵconditionalCreate(8, DetailPage_Conditional_8_Template, 14, 2, "div", 6);
            i0.ɵɵconditionalCreate(9, DetailPage_Conditional_9_Template, 19, 5, "div", 6);
            i0.ɵɵconditionalCreate(10, DetailPage_Conditional_10_Template, 15, 1, "div", 6);
            i0.ɵɵconditionalCreate(11, DetailPage_Conditional_11_Template, 1, 2, "cc-map-picker", 7);
        } if (rf & 2) {
            let tmp_1_0;
            let tmp_4_0;
            let tmp_5_0;
            let tmp_6_0;
            i0.ɵɵadvance(3);
            i0.ɵɵconditional(ctx.actionError() ? 3 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.loading() ? 4 : ctx.error() ? 5 : (tmp_1_0 = ctx.post()) ? 6 : -1, tmp_1_0);
            i0.ɵɵadvance(3);
            i0.ɵɵconditional(ctx.notice() ? 7 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.chatOpen() ? 8 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional((tmp_4_0 = ctx.otpInterest()) ? 9 : -1, tmp_4_0);
            i0.ɵɵadvance();
            i0.ɵɵconditional((tmp_5_0 = ctx.passengerOtpOpen() && ((tmp_5_0 = ctx.post()) == null ? null : tmp_5_0.myInterest == null ? null : tmp_5_0.myInterest.rideOtp)) ? 10 : -1, tmp_5_0);
            i0.ɵɵadvance();
            i0.ɵɵconditional((tmp_6_0 = ctx.mapMode()) ? 11 : -1, tmp_6_0);
        } }, dependencies: [RouterLink,
            StateComponent,
            PaginationComponent,
            ChatComponent,
            MapPickerComponent,
            DatePipe], styles: ["[_nghost-%COMP%] {\n  display: block;\n}\n\n.narrow[_ngcontent-%COMP%] {\n  width: min(100%, 1120px);\n  padding-block: clamp(20px, 4vh, 44px);\n}\n\n.detail-panel[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 20px;\n  padding-block: 24px;\n}\n\n.detail-panel[_ngcontent-%COMP%]    > *[_ngcontent-%COMP%] {\n  margin-block: 0;\n}\n\n.route-heading[_ngcontent-%COMP%] {\n  font-size: clamp(2rem, 5vw, 4rem);\n  line-height: 1.02;\n}\n\n.detail-facts[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));\n  gap: 1px;\n  padding: 0;\n  overflow: hidden;\n  background: var(--line);\n}\n\n.detail-facts[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%] {\n  min-width: 0;\n  padding: 18px;\n  background: var(--surface-soft);\n}\n\n.detail-facts[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%], \n.route-point[_ngcontent-%COMP%], \n.notes[_ngcontent-%COMP%] {\n  overflow-wrap: anywhere;\n}\n\n.detail-secondary-row[_ngcontent-%COMP%], \n.pickup-action[_ngcontent-%COMP%], \n.actions[_ngcontent-%COMP%] {\n  margin: 0;\n}\n\n.notes-box[_ngcontent-%COMP%] {\n  margin: 0;\n}\n\n.applicants-section[_ngcontent-%COMP%], \n.owner-conversations[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 18px;\n  padding-block: 26px;\n  border-top: 1px solid var(--line);\n}\n\n.applicants-section[_ngcontent-%COMP%]    > *[_ngcontent-%COMP%], \n.owner-conversations[_ngcontent-%COMP%]    > *[_ngcontent-%COMP%] {\n  margin-block: 0;\n}\n\n.chat-backdrop[_ngcontent-%COMP%] {\n  position: fixed;\n  inset: 0;\n  z-index: 10000;\n  display: grid;\n  padding: 20px;\n  background: rgb(17 17 17 / 44%);\n  backdrop-filter: blur(8px);\n  overscroll-behavior: contain;\n  place-items: center;\n}\n\n.chat-dialog[_ngcontent-%COMP%] {\n  display: flex;\n  width: min(680px, 100%);\n  height: auto;\n  max-height: calc(100dvh - 40px);\n  min-height: 0;\n  flex-direction: column;\n  overflow: hidden;\n  border: 1px solid var(--line);\n  border-radius: 22px;\n  background: #fff;\n  box-shadow: 0 24px 80px rgb(17 17 17 / 24%);\n}\n\n.otp-dialog[_ngcontent-%COMP%] {\n  width: min(520px, 100%);\n  overflow: hidden;\n  border: 1px solid var(--line);\n  border-radius: 22px;\n  background: #fff;\n  box-shadow: 0 24px 80px rgb(17 17 17 / 24%);\n}\n\n.ride-actions[_ngcontent-%COMP%], \n.conversation-actions[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 10px;\n}\n\n.icon-action[_ngcontent-%COMP%] {\n  display: inline-flex;\n  width: fit-content;\n  min-height: 46px;\n  align-items: center;\n  gap: 10px;\n  padding: 10px 15px;\n  border: 1px solid var(--line);\n  border-radius: 13px;\n  background: var(--surface);\n  color: var(--ink);\n  font-weight: 650;\n  transition:\n    border-color 160ms ease,\n    background 160ms ease,\n    transform 160ms ease;\n}\n\n.icon-action[_ngcontent-%COMP%]:hover {\n  border-color: var(--ink);\n  background: var(--surface-soft);\n  transform: translateY(-1px);\n}\n\n.icon-action[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%], \n.chat-placeholder[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n  width: 21px;\n  height: 21px;\n  fill: none;\n  stroke: currentColor;\n  stroke-linecap: round;\n  stroke-linejoin: round;\n  stroke-width: 1.8;\n}\n\n.action-count[_ngcontent-%COMP%] {\n  display: grid;\n  min-width: 22px;\n  height: 22px;\n  padding-inline: 5px;\n  border-radius: 999px;\n  background: var(--ink);\n  color: white;\n  font-size: 0.7rem;\n  place-items: center;\n}\n\n.chat-dialog-heading[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 18px;\n  padding: 18px 20px;\n  border-bottom: 1px solid var(--line);\n}\n\n.chat-dialog-heading[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%], \n.chat-dialog-heading[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0;\n}\n\n.chat-dialog-content[_ngcontent-%COMP%] {\n  display: flex;\n  min-height: 0;\n  flex: 0 1 auto;\n  flex-direction: column;\n  overflow: hidden;\n}\n\n.chat-user-picker[_ngcontent-%COMP%], \n.otp-passenger-picker[_ngcontent-%COMP%] {\n  display: flex;\n  flex: 0 0 auto;\n  gap: 8px;\n  padding: 12px 20px;\n  overflow-x: auto;\n  border-bottom: 1px solid var(--line);\n  scrollbar-width: thin;\n}\n\n.chat-user-picker[_ngcontent-%COMP%]   button[_ngcontent-%COMP%], \n.otp-passenger-picker[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  min-height: 38px;\n  padding: 8px 14px;\n  border: 1px solid var(--line);\n  border-radius: 999px;\n  background: white;\n  color: var(--muted);\n  font: inherit;\n  font-size: 0.82rem;\n  font-weight: 650;\n  white-space: nowrap;\n}\n\n.chat-user-picker[_ngcontent-%COMP%]   button.selected[_ngcontent-%COMP%], \n.otp-passenger-picker[_ngcontent-%COMP%]   button.selected[_ngcontent-%COMP%] {\n  border-color: var(--ink);\n  background: var(--ink);\n  color: white;\n}\n\n.chat-placeholder[_ngcontent-%COMP%] {\n  display: grid;\n  min-height: 150px;\n  flex: 0 0 auto;\n  align-content: center;\n  justify-items: center;\n  gap: 12px;\n  padding: 28px;\n  color: var(--muted);\n  text-align: center;\n}\n\n.chat-placeholder[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n  width: 34px;\n  height: 34px;\n}\n\n.chat-placeholder[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  max-width: 330px;\n  margin: 0;\n}\n\n.otp-verification[_ngcontent-%COMP%] {\n  margin: 0;\n  padding: 14px 20px;\n  border-bottom: 1px solid var(--line);\n}\n\n.otp-error[_ngcontent-%COMP%] {\n  margin: 10px 0 0;\n}\n\n.ride-code-content[_ngcontent-%COMP%] {\n  display: grid;\n  justify-items: center;\n  gap: 10px;\n  padding: 28px 24px 32px;\n  text-align: center;\n}\n\n.ride-code-content[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  font-size: clamp(2.4rem, 10vw, 4rem);\n  letter-spacing: 0.18em;\n}\n\n.ride-code-content[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  max-width: 340px;\n  margin: 0;\n  color: var(--muted);\n}\n\n@media (max-width: 680px) {\n  .narrow[_ngcontent-%COMP%] {\n    padding: 16px;\n  }\n\n  .detail-panel[_ngcontent-%COMP%] {\n    gap: 16px;\n    padding-block: 18px;\n  }\n\n  .detail-facts[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n\n  .detail-secondary-row[_ngcontent-%COMP%], \n   .pickup-buttons[_ngcontent-%COMP%], \n   .actions[_ngcontent-%COMP%] {\n    align-items: stretch;\n    flex-direction: column;\n  }\n\n  .detail-secondary-row[_ngcontent-%COMP%]   .button[_ngcontent-%COMP%], \n   .pickup-buttons[_ngcontent-%COMP%]   .button[_ngcontent-%COMP%], \n   .actions[_ngcontent-%COMP%]   .button[_ngcontent-%COMP%] {\n    width: 100%;\n  }\n\n  .chat-backdrop[_ngcontent-%COMP%] {\n    padding: 10px;\n  }\n\n  .chat-dialog[_ngcontent-%COMP%] {\n    width: 100%;\n    height: auto;\n    max-height: calc(100dvh - 20px);\n    border-radius: 20px;\n  }\n\n  .otp-dialog[_ngcontent-%COMP%] {\n    width: calc(100vw - 32px);\n  }\n\n  .chat-dialog-heading[_ngcontent-%COMP%] {\n    padding-top: max(14px, env(safe-area-inset-top));\n  }\n\n  .otp-verification[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%] {\n    display: grid;\n    grid-template-columns: minmax(0, 1fr) auto;\n  }\n\n  .ride-actions[_ngcontent-%COMP%] {\n    display: grid;\n    grid-template-columns: 1fr;\n  }\n\n  .ride-actions[_ngcontent-%COMP%]   .button[_ngcontent-%COMP%], \n   .ride-actions[_ngcontent-%COMP%]   .icon-action[_ngcontent-%COMP%], \n   .owner-conversations[_ngcontent-%COMP%]   .icon-action[_ngcontent-%COMP%] {\n    width: 100%;\n  }\n\n  .chat-user-picker[_ngcontent-%COMP%], \n   .otp-passenger-picker[_ngcontent-%COMP%] {\n    padding-inline: 16px;\n  }\n}"] });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(DetailPage, [{
        type: Component,
        args: [{ imports: [
                    DatePipe,
                    RouterLink,
                    StateComponent,
                    PaginationComponent,
                    ChatComponent,
                    MapPickerComponent,
                ], template: "<section class=\"narrow\">\n  <a class=\"text-link\" routerLink=\"/commutes\">\u2190 Browse commutes</a>\n  @if (actionError()) {\n    <p class=\"error-banner\" role=\"alert\">{{ actionError() }}</p>\n  }\n  @if (loading()) {\n    <cc-state kind=\"loading\" title=\"Loading commute\u2026\" />\n  } @else if (error()) {\n    <cc-state\n      kind=\"error\"\n      title=\"Couldn\u2019t load this commute\"\n      [message]=\"error()\"\n      (retry)=\"load()\"\n    />\n  } @else if (post(); as p) {\n    <article id=\"ride-details\" class=\"panel detail-panel\">\n      <div class=\"card-top\">\n        <p class=\"eyebrow\">{{ p.departureAt | date: 'EEEE, d MMMM y' }}</p>\n        <span id=\"ride-status\" class=\"badge\">\n          {{\n            p.deletedAt\n              ? 'Cancelled'\n              : p.rideStatus === 'in_progress'\n                ? 'On ride'\n                : active\n                  ? 'Upcoming'\n                  : 'Past commute'\n          }}\n        </span>\n      </div>\n      <h1 class=\"route-heading\">\n        <span class=\"route-point\">{{ p.origin }}</span>\n        <span class=\"route-arrow\">\u2192</span>\n        <span class=\"route-point\">{{ p.destination }}</span>\n      </h1>\n      <p class=\"subtle driver-name\">Offered by <strong>{{ p.owner.name }}</strong></p>\n      <div class=\"detail-facts\">\n        <div>\n          <span class=\"eyebrow\">DEPARTURE</span>\n          <strong>{{ p.departureAt | date: 'shortTime' }}</strong>\n        </div>\n        @if (!isHistory) {\n          <div>\n            <span class=\"eyebrow\">AVAILABLE SEATS</span>\n            <strong>\n              {{ p.availableSeats }}\n              <span class=\"small subtle\">of {{ p.seats }}</span>\n            </strong>\n          </div>\n        }\n        @if (p.via) {\n          <div>\n            <span class=\"eyebrow\">VIA STOP</span>\n            <strong>{{ p.via }}</strong>\n          </div>\n        }\n      </div>\n      <div class=\"detail-secondary-row\">\n        @if (p.originLat || p.originLng) {\n          <button class=\"button secondary view-map-btn\" type=\"button\" (click)=\"mapMode.set('view')\">\n            View origin on map\n          </button>\n        }\n        @if (p.vehicleNumber) {\n          <div class=\"vehicle-number\">\n            <span class=\"eyebrow\">VEHICLE PLATE</span>\n            <strong>{{ p.vehicleNumber }}</strong>\n          </div>\n        }\n      </div>\n      @if (p.notes) {\n        <div class=\"notes-box\">\n          <h2>Notes</h2>\n          <p class=\"notes\">{{ p.notes }}</p>\n        </div>\n      }\n      @if (isOwner()) {\n        @if (active) {\n          <div class=\"actions\">\n            <a class=\"button secondary\" [routerLink]=\"['/commutes', p.id, 'edit']\">\n              Edit commute\n            </a>\n            <button\n              class=\"button danger\"\n              (click)=\"confirmDelete.set(true)\"\n              [disabled]=\"busy()\"\n            >\n              Delete commute\n            </button>\n          </div>\n          @if (p.rideStatus === 'scheduled' && acceptedApplicants().length) {\n            <button\n              class=\"button\"\n              type=\"button\"\n              (click)=\"openStartRideVerification()\"\n              [disabled]=\"busy()\"\n            >\n              Start ride\n            </button>\n          } @else if (p.rideStatus === 'in_progress') {\n            <div class=\"ride-actions\">\n              <button class=\"button\" type=\"button\" (click)=\"endRide()\" [disabled]=\"busy()\">\n                End ride\n              </button>\n              @if (unverifiedApplicants().length) {\n                <button\n                  class=\"icon-action\"\n                  type=\"button\"\n                  aria-label=\"Verify another passenger\"\n                  (click)=\"openOtpVerification()\"\n                >\n                  <svg aria-hidden=\"true\" viewBox=\"0 0 24 24\">\n                    <path d=\"M7 11h10M9 7h6M8 15h8M5 3h14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H9l-4 3v-3a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z\" />\n                  </svg>\n                  <span>Verify passenger</span>\n                  <span class=\"action-count\">{{ unverifiedApplicants().length }}</span>\n                </button>\n              }\n            </div>\n          }\n        }\n        @if (confirmDelete()) {\n          <section class=\"confirm-box\" aria-label=\"Confirm cancellation\">\n            <h2>Cancel this commute?</h2>\n            <p>\n              Passengers will see it as cancelled. It will remain in everyone\u2019s history.\n            </p>\n            <div class=\"actions\">\n              <button class=\"button danger\" (click)=\"remove()\" [disabled]=\"busy()\">\n                Yes, cancel commute\n              </button>\n              <button\n                class=\"button secondary\"\n                (click)=\"confirmDelete.set(false)\"\n                [disabled]=\"busy()\"\n              >\n                Keep commute\n              </button>\n            </div>\n          </section>\n        }\n      } @else {\n        @if (active) {\n          @if (\n            p.myInterest?.status === 'pending' || p.myInterest?.status === 'accepted'\n          ) {\n            <button class=\"button secondary\" (click)=\"withdraw()\" [disabled]=\"busy()\">\n              {{ busy() ? 'Updating\u2026' : 'Withdraw interest' }}\n            </button>\n          } @else if (!p.myInterest || p.myInterest.status === 'withdrawn') {\n            <button\n              class=\"button full\"\n              (click)=\"interest()\"\n              [disabled]=\"busy() || p.availableSeats === 0\"\n            >\n              {{\n                p.availableSeats === 0\n                  ? 'No seats available'\n                  : busy()\n                    ? 'Sending\u2026'\n                    : 'I\u2019m interested'\n              }}\n            </button>\n          }\n        }\n        @if (p.myInterest?.status === 'accepted') {\n          @if (p.myInterest?.rideOtp && !p.myInterest?.boardedAt && active) {\n            <button\n              class=\"icon-action\"\n              type=\"button\"\n              (click)=\"passengerOtpOpen.set(true)\"\n            >\n              <svg aria-hidden=\"true\" viewBox=\"0 0 24 24\">\n                <path d=\"M7 11h10M9 7h6M8 15h8M5 3h14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H9l-4 3v-3a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z\" />\n              </svg>\n              <span>View ride code</span>\n            </button>\n          } @else if (p.myInterest?.boardedAt) {\n            <p class=\"success-banner\">Your pickup code has been verified.</p>\n          }\n          <button class=\"icon-action\" type=\"button\" (click)=\"openChat()\">\n            <svg aria-hidden=\"true\" viewBox=\"0 0 24 24\">\n              <path d=\"M21 12a8 8 0 0 1-8 8H7l-4 2 1.5-4A8 8 0 1 1 21 12Z\" />\n            </svg>\n            <span>Chat with {{ p.owner.name }}</span>\n          </button>\n        }\n      }\n    </article>\n    @if (isOwner()) {\n      <section id=\"passengers\" class=\"applicants-section\">\n        @if (applicantsLoading()) {\n          <cc-state kind=\"loading\" title=\"Loading passengers\u2026\" />\n        } @else if (applicantsError()) {\n          <cc-state\n            kind=\"error\"\n            title=\"Couldn\u2019t load passengers\"\n            [message]=\"applicantsError()\"\n            (retry)=\"loadApplicants(applicantPage())\"\n          />\n        } @else if (!applicants()?.data?.length) {\n          <cc-state\n            title=\"No interest yet\"\n            message=\"People who want to join your commute will appear here.\"\n          />\n        } @else {\n          @if (reviewApplicants().length) {\n            <h2>Interested passengers</h2>\n            <ul class=\"applicant-list\">\n              @for (i of reviewApplicants(); track i.id) {\n                <li class=\"panel applicant\">\n                  <div>\n                    <strong>{{ i.user?.name }}</strong>\n                    <span class=\"badge\">{{ i.status }}</span>\n                  </div>\n                  @if (active && i.status === 'pending') {\n                    <div class=\"actions\">\n                      <button\n                        class=\"button\"\n                        (click)=\"decide(i.id, 'accepted')\"\n                        [disabled]=\"busy() || p.availableSeats === 0\"\n                      >\n                        Accept\n                      </button>\n                      <button\n                        class=\"button secondary\"\n                        (click)=\"decide(i.id, 'declined')\"\n                        [disabled]=\"busy()\"\n                      >\n                        Decline\n                      </button>\n                    </div>\n                  }\n                </li>\n              }\n            </ul>\n          }\n          <cc-pagination\n            [page]=\"applicantPage()\"\n            [totalPages]=\"applicants()!.totalPages\"\n            (change)=\"loadApplicants($event)\"\n          />\n\n          @if (acceptedApplicants().length) {\n            <section\n              id=\"conversations\"\n              class=\"owner-conversations\"\n              aria-labelledby=\"conversation-title\"\n            >\n              <h2 id=\"conversation-title\">Passengers</h2>\n              <button class=\"icon-action\" type=\"button\" (click)=\"openChat()\">\n                <svg aria-hidden=\"true\" viewBox=\"0 0 24 24\">\n                  <path d=\"M21 12a8 8 0 0 1-8 8H7l-4 2 1.5-4A8 8 0 1 1 21 12Z\" />\n                </svg>\n                <span>Open conversations</span>\n                <span class=\"action-count\">{{ acceptedApplicants().length }}</span>\n              </button>\n            </section>\n          }\n        }\n      </section>\n    }\n  }\n  @if (notice()) {\n    <p class=\"success-banner\" role=\"status\">{{ notice() }}</p>\n  }\n</section>\n@if (chatOpen()) {\n  <div class=\"chat-backdrop\" (click)=\"closeChat()\">\n    <section\n      class=\"chat-dialog\"\n      role=\"dialog\"\n      aria-modal=\"true\"\n      aria-labelledby=\"chat-dialog-title\"\n      (click)=\"$event.stopPropagation()\"\n    >\n      <header class=\"chat-dialog-heading\">\n        <div>\n          <p class=\"eyebrow\">PRIVATE CONVERSATION</p>\n          <h2 id=\"chat-dialog-title\">Messages</h2>\n        </div>\n        <button\n          class=\"icon-button\"\n          type=\"button\"\n          aria-label=\"Close conversation\"\n          (click)=\"closeChat()\"\n        >\n          \u00D7\n        </button>\n      </header>\n\n      <div class=\"chat-dialog-content\">\n        @if (isOwner()) {\n          <div class=\"chat-user-picker\" aria-label=\"Choose a passenger\">\n            @for (interest of acceptedApplicants(); track interest.id) {\n              <button\n                type=\"button\"\n                [class.selected]=\"selectedChatId() === interest.id\"\n                (click)=\"selectedChatId.set(interest.id)\"\n              >\n                {{ interest.user?.name || 'Passenger' }}\n              </button>\n            }\n          </div>\n        }\n        @if (selectedChat(); as conversation) {\n          <cc-chat\n            [interestId]=\"conversation.id\"\n            [participantName]=\"selectedChatName()\"\n            [readOnly]=\"isHistory\"\n          />\n        } @else {\n          <div class=\"chat-placeholder\">\n            <svg aria-hidden=\"true\" viewBox=\"0 0 24 24\">\n              <path d=\"M21 12a8 8 0 0 1-8 8H7l-4 2 1.5-4A8 8 0 1 1 21 12Z\" />\n            </svg>\n            <p>Select a passenger to open your private conversation.</p>\n          </div>\n        }\n      </div>\n    </section>\n  </div>\n}\n@if (otpInterest(); as passenger) {\n  <div class=\"chat-backdrop\" (click)=\"closeOtpVerification()\">\n    <section\n      class=\"otp-dialog\"\n      role=\"dialog\"\n      aria-modal=\"true\"\n      aria-labelledby=\"otp-dialog-title\"\n      (click)=\"$event.stopPropagation()\"\n    >\n      <header class=\"chat-dialog-heading\">\n        <div>\n          <p class=\"eyebrow\">RIDE VERIFICATION</p>\n          <h2 id=\"otp-dialog-title\">\n            Verify {{ passenger.user?.name || 'passenger' }}\n          </h2>\n        </div>\n        <button\n          class=\"icon-button\"\n          type=\"button\"\n          aria-label=\"Close OTP verification\"\n          (click)=\"closeOtpVerification()\"\n        >\n          \u00D7\n        </button>\n      </header>\n      @if (otpError()) {\n        <p class=\"error-banner otp-error\" role=\"alert\">\n          {{ otpError() }}\n        </p>\n      }\n      @if (unverifiedApplicants().length > 1) {\n        <div class=\"otp-passenger-picker\" aria-label=\"Choose a passenger to verify\">\n          @for (interest of unverifiedApplicants(); track interest.id) {\n            <button\n              type=\"button\"\n              [class.selected]=\"otpInterestId() === interest.id\"\n              (click)=\"otpInterestId.set(interest.id); otp.set(''); otpError.set('')\"\n            >\n              {{ interest.user?.name || 'Passenger' }}\n            </button>\n          }\n        </div>\n      }\n      <form\n        class=\"otp-verification\"\n        (submit)=\"$event.preventDefault(); verifyOtp(passenger.id)\"\n      >\n        <label for=\"ride-otp\">Six-digit passenger code</label>\n        <div>\n          <input\n            id=\"ride-otp\"\n            inputmode=\"numeric\"\n            autocomplete=\"one-time-code\"\n            maxlength=\"6\"\n            pattern=\"[0-9]{6}\"\n            [value]=\"otp()\"\n            (input)=\"otp.set($any($event.target).value); otpError.set('')\"\n          />\n          <button\n            class=\"button\"\n            type=\"submit\"\n            [disabled]=\"busy() || otp().length !== 6\"\n          >\n            Verify passenger\n          </button>\n        </div>\n      </form>\n    </section>\n  </div>\n}\n@if (passengerOtpOpen() && post()?.myInterest?.rideOtp; as rideOtp) {\n  <div class=\"chat-backdrop\" (click)=\"passengerOtpOpen.set(false)\">\n    <section\n      class=\"otp-dialog ride-code-dialog\"\n      role=\"dialog\"\n      aria-modal=\"true\"\n      aria-labelledby=\"ride-code-title\"\n      (click)=\"$event.stopPropagation()\"\n    >\n      <header class=\"chat-dialog-heading\">\n        <div>\n          <p class=\"eyebrow\">SAFE RIDE CODE</p>\n          <h2 id=\"ride-code-title\">Your pickup code</h2>\n        </div>\n        <button\n          class=\"icon-button\"\n          type=\"button\"\n          aria-label=\"Close ride code\"\n          (click)=\"passengerOtpOpen.set(false)\"\n        >\n          \u00D7\n        </button>\n      </header>\n      <div class=\"ride-code-content\">\n        <strong>{{ rideOtp }}</strong>\n        <p>Share this code only with the driver when you meet.</p>\n      </div>\n    </section>\n  </div>\n}\n@if (mapMode(); as mode) {\n  <cc-map-picker\n    [mode]=\"mode\"\n    [initialPoints]=\"mapPoints()\"\n    (closed)=\"mapMode.set(null)\"\n  />\n}\n", styles: [":host {\n  display: block;\n}\n\n.narrow {\n  width: min(100%, 1120px);\n  padding-block: clamp(20px, 4vh, 44px);\n}\n\n.detail-panel {\n  display: grid;\n  gap: 20px;\n  padding-block: 24px;\n}\n\n.detail-panel > * {\n  margin-block: 0;\n}\n\n.route-heading {\n  font-size: clamp(2rem, 5vw, 4rem);\n  line-height: 1.02;\n}\n\n.detail-facts {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));\n  gap: 1px;\n  padding: 0;\n  overflow: hidden;\n  background: var(--line);\n}\n\n.detail-facts > div {\n  min-width: 0;\n  padding: 18px;\n  background: var(--surface-soft);\n}\n\n.detail-facts strong,\n.route-point,\n.notes {\n  overflow-wrap: anywhere;\n}\n\n.detail-secondary-row,\n.pickup-action,\n.actions {\n  margin: 0;\n}\n\n.notes-box {\n  margin: 0;\n}\n\n.applicants-section,\n.owner-conversations {\n  display: grid;\n  gap: 18px;\n  padding-block: 26px;\n  border-top: 1px solid var(--line);\n}\n\n.applicants-section > *,\n.owner-conversations > * {\n  margin-block: 0;\n}\n\n.chat-backdrop {\n  position: fixed;\n  inset: 0;\n  z-index: 10000;\n  display: grid;\n  padding: 20px;\n  background: rgb(17 17 17 / 44%);\n  backdrop-filter: blur(8px);\n  overscroll-behavior: contain;\n  place-items: center;\n}\n\n.chat-dialog {\n  display: flex;\n  width: min(680px, 100%);\n  height: auto;\n  max-height: calc(100dvh - 40px);\n  min-height: 0;\n  flex-direction: column;\n  overflow: hidden;\n  border: 1px solid var(--line);\n  border-radius: 22px;\n  background: #fff;\n  box-shadow: 0 24px 80px rgb(17 17 17 / 24%);\n}\n\n.otp-dialog {\n  width: min(520px, 100%);\n  overflow: hidden;\n  border: 1px solid var(--line);\n  border-radius: 22px;\n  background: #fff;\n  box-shadow: 0 24px 80px rgb(17 17 17 / 24%);\n}\n\n.ride-actions,\n.conversation-actions {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 10px;\n}\n\n.icon-action {\n  display: inline-flex;\n  width: fit-content;\n  min-height: 46px;\n  align-items: center;\n  gap: 10px;\n  padding: 10px 15px;\n  border: 1px solid var(--line);\n  border-radius: 13px;\n  background: var(--surface);\n  color: var(--ink);\n  font-weight: 650;\n  transition:\n    border-color 160ms ease,\n    background 160ms ease,\n    transform 160ms ease;\n}\n\n.icon-action:hover {\n  border-color: var(--ink);\n  background: var(--surface-soft);\n  transform: translateY(-1px);\n}\n\n.icon-action svg,\n.chat-placeholder svg {\n  width: 21px;\n  height: 21px;\n  fill: none;\n  stroke: currentColor;\n  stroke-linecap: round;\n  stroke-linejoin: round;\n  stroke-width: 1.8;\n}\n\n.action-count {\n  display: grid;\n  min-width: 22px;\n  height: 22px;\n  padding-inline: 5px;\n  border-radius: 999px;\n  background: var(--ink);\n  color: white;\n  font-size: 0.7rem;\n  place-items: center;\n}\n\n.chat-dialog-heading {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 18px;\n  padding: 18px 20px;\n  border-bottom: 1px solid var(--line);\n}\n\n.chat-dialog-heading h2,\n.chat-dialog-heading p {\n  margin: 0;\n}\n\n.chat-dialog-content {\n  display: flex;\n  min-height: 0;\n  flex: 0 1 auto;\n  flex-direction: column;\n  overflow: hidden;\n}\n\n.chat-user-picker,\n.otp-passenger-picker {\n  display: flex;\n  flex: 0 0 auto;\n  gap: 8px;\n  padding: 12px 20px;\n  overflow-x: auto;\n  border-bottom: 1px solid var(--line);\n  scrollbar-width: thin;\n}\n\n.chat-user-picker button,\n.otp-passenger-picker button {\n  min-height: 38px;\n  padding: 8px 14px;\n  border: 1px solid var(--line);\n  border-radius: 999px;\n  background: white;\n  color: var(--muted);\n  font: inherit;\n  font-size: 0.82rem;\n  font-weight: 650;\n  white-space: nowrap;\n}\n\n.chat-user-picker button.selected,\n.otp-passenger-picker button.selected {\n  border-color: var(--ink);\n  background: var(--ink);\n  color: white;\n}\n\n.chat-placeholder {\n  display: grid;\n  min-height: 150px;\n  flex: 0 0 auto;\n  align-content: center;\n  justify-items: center;\n  gap: 12px;\n  padding: 28px;\n  color: var(--muted);\n  text-align: center;\n}\n\n.chat-placeholder svg {\n  width: 34px;\n  height: 34px;\n}\n\n.chat-placeholder p {\n  max-width: 330px;\n  margin: 0;\n}\n\n.otp-verification {\n  margin: 0;\n  padding: 14px 20px;\n  border-bottom: 1px solid var(--line);\n}\n\n.otp-error {\n  margin: 10px 0 0;\n}\n\n.ride-code-content {\n  display: grid;\n  justify-items: center;\n  gap: 10px;\n  padding: 28px 24px 32px;\n  text-align: center;\n}\n\n.ride-code-content strong {\n  font-size: clamp(2.4rem, 10vw, 4rem);\n  letter-spacing: 0.18em;\n}\n\n.ride-code-content p {\n  max-width: 340px;\n  margin: 0;\n  color: var(--muted);\n}\n\n@media (max-width: 680px) {\n  .narrow {\n    padding: 16px;\n  }\n\n  .detail-panel {\n    gap: 16px;\n    padding-block: 18px;\n  }\n\n  .detail-facts {\n    grid-template-columns: 1fr;\n  }\n\n  .detail-secondary-row,\n  .pickup-buttons,\n  .actions {\n    align-items: stretch;\n    flex-direction: column;\n  }\n\n  .detail-secondary-row .button,\n  .pickup-buttons .button,\n  .actions .button {\n    width: 100%;\n  }\n\n  .chat-backdrop {\n    padding: 10px;\n  }\n\n  .chat-dialog {\n    width: 100%;\n    height: auto;\n    max-height: calc(100dvh - 20px);\n    border-radius: 20px;\n  }\n\n  .otp-dialog {\n    width: calc(100vw - 32px);\n  }\n\n  .chat-dialog-heading {\n    padding-top: max(14px, env(safe-area-inset-top));\n  }\n\n  .otp-verification > div {\n    display: grid;\n    grid-template-columns: minmax(0, 1fr) auto;\n  }\n\n  .ride-actions {\n    display: grid;\n    grid-template-columns: 1fr;\n  }\n\n  .ride-actions .button,\n  .ride-actions .icon-action,\n  .owner-conversations .icon-action {\n    width: 100%;\n  }\n\n  .chat-user-picker,\n  .otp-passenger-picker {\n    padding-inline: 16px;\n  }\n}\n"] }]
    }], () => [], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(DetailPage, { className: "DetailPage", filePath: "src/app/features/posts/detail.page.ts", lineNumber: 29 }); })();