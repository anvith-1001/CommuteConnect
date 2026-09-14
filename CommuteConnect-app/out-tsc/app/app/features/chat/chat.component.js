import { DatePipe } from '@angular/common';
import { Component, inject, input, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { io } from 'socket.io-client';
import { AuthService } from '../../core/auth.service';
import { errorMessage } from '../../core/errors';
import { ApiService, CHAT_SOCKET_PATH, CHAT_SOCKET_URL } from '../../utils/api';
import { StateComponent } from '../../shared/state.component';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
const _forTrack0 = ($index, $item) => $item.id;
function ChatComponent_Conditional_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 2);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r0.error());
} }
function ChatComponent_Conditional_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "cc-state", 3);
} }
function ChatComponent_Conditional_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 4);
    i0.ɵɵtext(1, "Say hello and agree on a safe, public pickup point.");
    i0.ɵɵelementEnd();
} }
function ChatComponent_Conditional_7_For_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "li")(1, "div", 9)(2, "strong");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "time");
    i0.ɵɵtext(5);
    i0.ɵɵpipe(6, "date");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(7, "p");
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    let tmp_11_0;
    const message_r2 = ctx.$implicit;
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵclassProp("mine", message_r2.senderId === ((tmp_11_0 = ctx_r0.auth.user()) == null ? null : tmp_11_0.id));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(message_r2.sender.name);
    i0.ɵɵadvance();
    i0.ɵɵattribute("datetime", message_r2.createdAt);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind2(6, 6, message_r2.createdAt, "short"), " ");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(message_r2.body);
} }
function ChatComponent_Conditional_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "ol", 5);
    i0.ɵɵrepeaterCreate(1, ChatComponent_Conditional_7_For_2_Template, 9, 9, "li", 8, _forTrack0);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵrepeater(ctx_r0.messages());
} }
function ChatComponent_Conditional_8_Template(rf, ctx) { if (rf & 1) {
    const _r3 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "form", 10);
    i0.ɵɵlistener("ngSubmit", function ChatComponent_Conditional_8_Template_form_ngSubmit_0_listener() { i0.ɵɵrestoreView(_r3); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.send()); });
    i0.ɵɵelementStart(1, "label", 11);
    i0.ɵɵtext(2, "Message");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "div", 12)(4, "textarea", 13);
    i0.ɵɵlistener("keydown.enter", function ChatComponent_Conditional_8_Template_textarea_keydown_enter_4_listener($event) { i0.ɵɵrestoreView(_r3); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.handleEnter($event)); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "button", 14);
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵproperty("formGroup", ctx_r0.form);
    i0.ɵɵadvance(5);
    i0.ɵɵproperty("disabled", ctx_r0.sending() || !ctx_r0.connected());
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r0.sending() ? "Sending\u2026" : ctx_r0.connected() ? "Send" : "Connecting\u2026", " ");
} }
function ChatComponent_Conditional_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 7);
    i0.ɵɵtext(1, " This ride has ended. The conversation is available as history. ");
    i0.ɵɵelementEnd();
} }
export class ChatComponent {
    interestId = input.required(...(ngDevMode ? [{ debugName: "interestId" }] : /* istanbul ignore next */ []));
    participantName = input('', ...(ngDevMode ? [{ debugName: "participantName" }] : /* istanbul ignore next */ []));
    readOnly = input(false, ...(ngDevMode ? [{ debugName: "readOnly" }] : /* istanbul ignore next */ []));
    api = inject(ApiService);
    auth = inject(AuthService);
    fb = inject(FormBuilder);
    socket;
    messages = signal([], ...(ngDevMode ? [{ debugName: "messages" }] : /* istanbul ignore next */ []));
    loading = signal(true, ...(ngDevMode ? [{ debugName: "loading" }] : /* istanbul ignore next */ []));
    sending = signal(false, ...(ngDevMode ? [{ debugName: "sending" }] : /* istanbul ignore next */ []));
    connected = signal(false, ...(ngDevMode ? [{ debugName: "connected" }] : /* istanbul ignore next */ []));
    error = signal('', ...(ngDevMode ? [{ debugName: "error" }] : /* istanbul ignore next */ []));
    form = this.fb.nonNullable.group({
        body: ['', [Validators.required, Validators.maxLength(1000)]],
    });
    ngOnInit() {
        void this.open();
    }
    ngOnDestroy() {
        this.connected.set(false);
        this.socket?.disconnect();
    }
    async open() {
        this.loading.set(true);
        this.error.set('');
        try {
            this.messages.set(await this.api.getMessages(this.interestId()));
            await this.api.readConversationNotifications(this.interestId());
            if (!this.readOnly()) {
                this.connect();
            }
        }
        catch (error) {
            this.error.set(errorMessage(error));
        }
        finally {
            this.loading.set(false);
        }
    }
    send() {
        this.form.markAllAsTouched();
        if (this.form.invalid || this.sending() || !this.socket?.connected) {
            return;
        }
        this.sending.set(true);
        this.error.set('');
        this.socket.emit('chat:send', {
            interestId: this.interestId(),
            body: this.form.controls.body.value,
        }, (response) => {
            this.sending.set(false);
            if (response?.ok) {
                this.form.reset();
            }
            else {
                this.error.set(response?.code === 'RATE_LIMITED'
                    ? 'You’re sending messages too quickly. Wait a moment and try again.'
                    : 'Message could not be sent. Please try again.');
            }
        });
    }
    handleEnter(event) {
        const keyboardEvent = event;
        if (keyboardEvent.shiftKey || keyboardEvent.isComposing) {
            return;
        }
        keyboardEvent.preventDefault();
        this.send();
    }
    connect() {
        this.socket?.disconnect();
        this.socket = io(CHAT_SOCKET_URL, {
            path: CHAT_SOCKET_PATH,
            auth: { token: this.auth.token() },
            transports: ['websocket', 'polling'],
        });
        this.socket.on('chat:ready', () => {
            this.socket?.emit('chat:join', { interestId: this.interestId() }, (response) => this.connected.set(!!response?.ok));
        });
        this.socket.on('chat:message', (message) => {
            this.messages.update((messages) => messages.some((item) => item.id === message.id)
                ? messages
                : [...messages, message]);
            if (message.senderId !== this.auth.user()?.id) {
                void this.api.readConversationNotifications(this.interestId());
            }
        });
        this.socket.on('connect_error', () => {
            this.connected.set(false);
            this.error.set('Live chat could not connect. Please refresh and try again.');
        });
        this.socket.on('disconnect', () => this.connected.set(false));
    }
    static ɵfac = function ChatComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || ChatComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: ChatComponent, selectors: [["cc-chat"]], inputs: { interestId: [1, "interestId"], participantName: [1, "participantName"], readOnly: [1, "readOnly"] }, decls: 10, vars: 4, consts: [["aria-label", "Commute conversation", 1, "chat-panel", "panel"], [1, "chat-heading"], ["role", "alert", 1, "error-banner"], ["kind", "loading", "title", "Loading conversation\u2026"], [1, "chat-empty"], ["aria-live", "polite", 1, "message-list"], [1, "message-form", 3, "formGroup"], [1, "chat-read-only"], [3, "mine"], [1, "message-meta"], [1, "message-form", 3, "ngSubmit", "formGroup"], ["for", "chat-message"], [1, "message-composer"], ["id", "chat-message", "formControlName", "body", "rows", "2", "maxlength", "1000", "placeholder", "Message fellow commuter...", 3, "keydown.enter"], ["type", "submit", 1, "button", 3, "disabled"]], template: function ChatComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "section", 0)(1, "div", 1)(2, "h2");
            i0.ɵɵtext(3);
            i0.ɵɵelementEnd()();
            i0.ɵɵconditionalCreate(4, ChatComponent_Conditional_4_Template, 2, 1, "p", 2);
            i0.ɵɵconditionalCreate(5, ChatComponent_Conditional_5_Template, 1, 0, "cc-state", 3)(6, ChatComponent_Conditional_6_Template, 2, 0, "p", 4)(7, ChatComponent_Conditional_7_Template, 3, 0, "ol", 5);
            i0.ɵɵconditionalCreate(8, ChatComponent_Conditional_8_Template, 7, 3, "form", 6)(9, ChatComponent_Conditional_9_Template, 2, 0, "p", 7);
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate1(" ", ctx.participantName() ? "Chat with " + ctx.participantName() : "Plan your pickup", " ");
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.error() ? 4 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.loading() ? 5 : !ctx.messages().length ? 6 : 7);
            i0.ɵɵadvance(3);
            i0.ɵɵconditional(!ctx.readOnly() ? 8 : 9);
        } }, dependencies: [ReactiveFormsModule, i1.ɵNgNoValidate, i1.DefaultValueAccessor, i1.NgControlStatus, i1.NgControlStatusGroup, i1.MaxLengthValidator, i1.FormGroupDirective, i1.FormControlName, StateComponent, DatePipe], encapsulation: 2 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ChatComponent, [{
        type: Component,
        args: [{ selector: 'cc-chat', imports: [DatePipe, ReactiveFormsModule, StateComponent], template: "<section class=\"chat-panel panel\" aria-label=\"Commute conversation\">\n  <div class=\"chat-heading\">\n    <h2>\n      {{ participantName() ? 'Chat with ' + participantName() : 'Plan your pickup' }}\n    </h2>\n  </div>\n\n  @if (error()) {\n    <p class=\"error-banner\" role=\"alert\">{{ error() }}</p>\n  }\n\n  @if (loading()) {\n    <cc-state kind=\"loading\" title=\"Loading conversation\u2026\" />\n  } @else if (!messages().length) {\n    <p class=\"chat-empty\">Say hello and agree on a safe, public pickup point.</p>\n  } @else {\n    <ol class=\"message-list\" aria-live=\"polite\">\n      @for (message of messages(); track message.id) {\n        <li [class.mine]=\"message.senderId === auth.user()?.id\">\n          <div class=\"message-meta\">\n            <strong>{{ message.sender.name }}</strong>\n            <time [attr.datetime]=\"message.createdAt\">\n              {{ message.createdAt | date: 'short' }}\n            </time>\n          </div>\n          <p>{{ message.body }}</p>\n        </li>\n      }\n    </ol>\n  }\n\n  @if (!readOnly()) {\n    <form class=\"message-form\" [formGroup]=\"form\" (ngSubmit)=\"send()\">\n      <label for=\"chat-message\">Message</label>\n      <div class=\"message-composer\">\n        <textarea\n          id=\"chat-message\"\n          formControlName=\"body\"\n          rows=\"2\"\n          maxlength=\"1000\"\n          placeholder=\"Message fellow commuter...\"\n          (keydown.enter)=\"handleEnter($event)\"\n        ></textarea>\n        <button class=\"button\" type=\"submit\" [disabled]=\"sending() || !connected()\">\n          {{ sending() ? 'Sending\u2026' : connected() ? 'Send' : 'Connecting\u2026' }}\n        </button>\n      </div>\n    </form>\n  } @else {\n    <p class=\"chat-read-only\">\n      This ride has ended. The conversation is available as history.\n    </p>\n  }\n\n</section>\n" }]
    }], null, { interestId: [{ type: i0.Input, args: [{ isSignal: true, alias: "interestId", required: true }] }], participantName: [{ type: i0.Input, args: [{ isSignal: true, alias: "participantName", required: false }] }], readOnly: [{ type: i0.Input, args: [{ isSignal: true, alias: "readOnly", required: false }] }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(ChatComponent, { className: "ChatComponent", filePath: "src/app/features/chat/chat.component.ts", lineNumber: 16 }); })();