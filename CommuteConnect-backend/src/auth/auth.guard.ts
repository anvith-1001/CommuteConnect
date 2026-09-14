import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { DataSource, IsNull } from 'typeorm';
import { Session, User } from '../database/entities';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwt: JwtService,
    private db: DataSource,
  ) {}

  async canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();

    try {
      const header = req.headers.authorization;

      if (typeof header !== 'string' || !header.startsWith('Bearer ')) {
        throw new Error();
      }

      const payload = await this.jwt.verifyAsync(header.slice(7), {
        algorithms: ['HS256'],
        issuer: 'commuteconnect-api',
        audience: 'commuteconnect-app',
      });

      if (
        payload.type !== 'access' ||
        typeof payload.sub !== 'string' ||
        typeof payload.sid !== 'string'
      ) {
        throw new Error();
      }

      const session = await this.db
        .getRepository(Session)
        .findOneBy({ id: payload.sid, userId: payload.sub });

      if (!session || session.revokedAt || session.expiresAt <= new Date()) {
        throw new Error();
      }

      const activeUser = await this.db.getRepository(User).exists({
        where: { id: payload.sub, deletedAt: IsNull() },
      });

      if (!activeUser) {
        throw new Error();
      }

      req.user = { id: payload.sub, sessionId: payload.sid };

      return true;
    } catch {
      throw new UnauthorizedException('Your session has expired. Please sign in again.');
    }
  }
}