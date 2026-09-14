import { DatePipe } from '@angular/common';
import { Component, OnDestroy, OnInit, inject, input, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Socket, io } from 'socket.io-client';
import { ChatMessage } from '../../core/models';
import { AuthService } from '../../core/auth.service';
import { errorMessage } from '../../core/errors';
import { ApiService, CHAT_SOCKET_PATH, CHAT_SOCKET_URL } from '../../utils/api';
import { StateComponent } from '../../shared/state.component';

@Component({
  selector: 'cc-chat',
  imports: [DatePipe, ReactiveFormsModule, StateComponent],
  templateUrl: './chat.component.html',
})
export class ChatComponent implements OnInit, OnDestroy {
  interestId = input.required<string>();

  participantName = input('');

  readOnly = input(false);

  private api = inject(ApiService);

  auth = inject(AuthService);

  private fb = inject(FormBuilder);

  private socket?: Socket;

  messages = signal<ChatMessage[]>([]);

  loading = signal(true);

  sending = signal(false);

  connected = signal(false);

  error = signal('');

  form = this.fb.nonNullable.group({
    body: ['', [Validators.required, Validators.maxLength(1000)]],
  });

  ngOnInit(): void {
    void this.open();
  }

  ngOnDestroy(): void {
    this.connected.set(false);
    this.socket?.disconnect();
  }

  async open(): Promise<void> {
    this.loading.set(true);
    this.error.set('');

    try {
      this.messages.set(await this.api.getMessages(this.interestId()));
      await this.api.readConversationNotifications(this.interestId());

      if (!this.readOnly()) {
        this.connect();
      }
    } catch (error) {
      this.error.set(errorMessage(error));
    } finally {
      this.loading.set(false);
    }
  }

  send(): void {
    this.form.markAllAsTouched();

    if (this.form.invalid || this.sending() || !this.socket?.connected) {
      return;
    }

    this.sending.set(true);
    this.error.set('');
    this.socket.emit(
      'chat:send',
      {
        interestId: this.interestId(),
        body: this.form.controls.body.value,
      },
      (response: { ok?: boolean; code?: string }) => {
        this.sending.set(false);

        if (response?.ok) {
          this.form.reset();
        } else {
          this.error.set(
            response?.code === 'RATE_LIMITED'
              ? 'You’re sending messages too quickly. Wait a moment and try again.'
              : 'Message could not be sent. Please try again.',
          );
        }
      },
    );
  }

  handleEnter(event: Event): void {
    const keyboardEvent = event as KeyboardEvent;

    if (keyboardEvent.shiftKey || keyboardEvent.isComposing) {
      return;
    }

    keyboardEvent.preventDefault();
    this.send();
  }

  private connect(): void {
    this.socket?.disconnect();
    this.socket = io(CHAT_SOCKET_URL, {
      path: CHAT_SOCKET_PATH,
      auth: { token: this.auth.token() },
      transports: ['websocket', 'polling'],
    });
    this.socket.on('chat:ready', () => {
      this.socket?.emit(
        'chat:join',
        { interestId: this.interestId() },
        (response: { ok?: boolean }) => this.connected.set(!!response?.ok),
      );
    });
    this.socket.on('chat:message', (message: ChatMessage) => {
      this.messages.update((messages) =>
        messages.some((item) => item.id === message.id)
          ? messages
          : [...messages, message],
      );

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
}