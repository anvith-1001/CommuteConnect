import { JwtService } from '@nestjs/jwt';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { DataSource, IsNull } from 'typeorm';
import { Server, Socket } from 'socket.io';
import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';
import { Session, User } from '../database/entities';
import { ChatService } from './chat.service';
import { ChatJoinDto, ChatSendDto } from './dto/socket.dto';

interface AuthenticatedSocket extends Socket {
  data: { userId?: string };
}

@WebSocketGateway({
  namespace: '/chat',
  path: '/socket.io',
  cors: {
    origin: process.env.FRONTEND_ORIGINS?.split(',') || [],
    credentials: true,
  },
})
export class ChatGateway implements OnGatewayConnection {
  private readonly messageWindowMs = 60000;

  private readonly messageLimit = 20;

  private readonly messageWindows = new Map<string, number[]>();

  @WebSocketServer()
  server: Server;

  constructor(
    private jwt: JwtService,
    private db: DataSource,
    private chat: ChatService,
  ) {}

  async handleConnection(client: AuthenticatedSocket): Promise<void> {
    try {
      const token = client.handshake.auth?.token;
      const payload = await this.jwt.verifyAsync(token, {
        algorithms: ['HS256'],
        issuer: 'commuteconnect-api',
        audience: 'commuteconnect-app',
      });
      const [session, user] = await Promise.all([
        this.db.getRepository(Session).findOneBy({
          id: payload.sid,
          userId: payload.sub,
        }),
        this.db.getRepository(User).findOneBy({
          id: payload.sub,
          deletedAt: IsNull(),
        }),
      ]);

      if (
        payload.type !== 'access' ||
        !session ||
        session.revokedAt ||
        session.expiresAt <= new Date() ||
        !user
      ) {
        throw new Error();
      }

      client.data.userId = payload.sub;
      client.emit('chat:ready');
    } catch {
      client.disconnect(true);
    }
  }

  @SubscribeMessage('chat:join')
  async join(
    @ConnectedSocket() client: AuthenticatedSocket,
    @MessageBody() payload: unknown,
  ) {
    const dto = this.validPayload(ChatJoinDto, payload);

    if (
      !client.data.userId ||
      !dto
    ) {
      return { ok: false };
    }

    await this.chat.assertAccess(dto.interestId, client.data.userId!);
    await client.join(this.room(dto.interestId));

    return { ok: true };
  }

  @SubscribeMessage('chat:send')
  async send(
    @ConnectedSocket() client: AuthenticatedSocket,
    @MessageBody() payload: unknown,
  ) {
    const dto = this.validPayload(ChatSendDto, payload);

    if (
      !client.data.userId ||
      !dto
    ) {
      return { ok: false };
    }

    if (!this.canSend(client.data.userId)) {
      return { ok: false, code: 'RATE_LIMITED' };
    }

    const message = await this.chat.send(
      dto.interestId,
      client.data.userId!,
      dto.body,
    );
    this.server.to(this.room(dto.interestId)).emit('chat:message', message);

    return { ok: true };
  }

  private room(interestId: string): string {
    return `interest:${interestId}`;
  }

  private validPayload<T extends object>(
    type: new () => T,
    payload: unknown,
  ): T | null {
    if (!payload || typeof payload !== 'object' || Array.isArray(payload)) {
      return null;
    }

    const dto = plainToInstance(type, payload);
    const errors = validateSync(dto, {
      whitelist: true,
      forbidNonWhitelisted: true,
      forbidUnknownValues: true,
    });

    return errors.length ? null : dto;
  }

  private canSend(userId: string): boolean {
    const now = Date.now();
    const active = (this.messageWindows.get(userId) || []).filter(
      (timestamp) => now - timestamp < this.messageWindowMs,
    );

    if (active.length >= this.messageLimit) {
      this.messageWindows.set(userId, active);

      return false;
    }

    active.push(now);
    this.messageWindows.set(userId, active);

    return true;
  }
}