import {
  BadRequestException,
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { DataSource, IsNull } from 'typeorm';
import { isUUID } from 'class-validator';
import * as argon2 from 'argon2';
import { createHash, randomBytes, randomUUID, timingSafeEqual } from 'crypto';
import { Session, User } from '../database/entities';
import { LoginDto, RegisterDto } from './dto/auth.dto';
import { publicUser } from '../users/users.service';

const hash = (value: string) => createHash('sha256').update(value).digest('hex');

@Injectable()
export class AuthService {
  private dummyHash = argon2.hash('invalid-account-password', {
    type: argon2.argon2id,
    memoryCost: 19456,
    timeCost: 2,
    parallelism: 1,
  });

  constructor(
    private db: DataSource,
    private jwt: JwtService,
  ) {}

  async register(dto: RegisterDto) {
    const date = new Date(dto.dob + 'T00:00:00Z');

    if (
      !Number.isFinite(date.getTime()) ||
      date.toISOString().slice(0, 10) !== dto.dob ||
      date >= new Date() ||
      date.getUTCFullYear() < 1900
    ) {
      throw new BadRequestException('Enter a valid date of birth in the past.');
    }

    const passwordHash = await argon2.hash(dto.password, {
      type: argon2.argon2id,
      memoryCost: 19456,
      timeCost: 2,
      parallelism: 1,
    });
    let user: User;

    try {
      user = await this.db.getRepository(User).save(
        this.db.getRepository(User).create({
          name: dto.name,
          email: dto.email,
          dob: dto.dob,
          sex: dto.sex,
          passwordHash,
        }),
      );
    } catch (error) {
      if ((error as { code?: string }).code === '23505') {
        throw new ConflictException(
          'An account with this email already exists. Sign in instead.',
        );
      }

      throw error;
    }

    return this.createSession(user);
  }

  async login(dto: LoginDto) {
    const user = await this.db
      .getRepository(User)
      .createQueryBuilder('user')
      .addSelect('user.passwordHash')
      .where('user.email = :email', { email: dto.email })
      .andWhere('user.deletedAt IS NULL')
      .getOne();
    // Perform equivalent password work even when the account does not exist.
    const stored = user?.passwordHash || (await this.dummyHash);
    const valid = await argon2.verify(stored, dto.password);

    if (!user || !valid) {
      throw new UnauthorizedException('Email or password is incorrect.');
    }

    return this.createSession(user);
  }

  private access(userId: string, sessionId: string) {
    return this.jwt.signAsync(
      { sub: userId, sid: sessionId, type: 'access' },
      {
        expiresIn: '15m',
        issuer: 'commuteconnect-api',
        audience: 'commuteconnect-app',
        algorithm: 'HS256',
      },
    );
  }

  private async createSession(user: User) {
    const id = randomUUID();
    const refreshToken = id + '.' + randomBytes(32).toString('hex');
    await this.db.getRepository(Session).save({
      id,
      userId: user.id,
      tokenHash: hash(refreshToken),
      expiresAt: new Date(Date.now() + 7 * 86400000),
      revokedAt: null,
    });

    return {
      accessToken: await this.access(user.id, id),
      user: publicUser(user),
      refreshToken,
    };
  }

  async refresh(token: string | undefined) {
    if (
      !token ||
      !isUUID(token.split('.')[0]) ||
      !/^[0-9a-f-]{36}\.[0-9a-f]{64}$/.test(token)
    ) {
      throw new UnauthorizedException('Please sign in again.');
    }

    return this.db.transaction(async (manager) => {
      const session = await manager.findOne(Session, {
        where: { id: token.split('.')[0] },
        lock: { mode: 'pessimistic_write' },
      });

      if (
        !session ||
        session.revokedAt ||
        session.expiresAt <= new Date() ||
        !timingSafeEqual(
          Buffer.from(session.tokenHash, 'hex'),
          Buffer.from(hash(token), 'hex'),
        )
      ) {
        throw new UnauthorizedException('Please sign in again.');
      }

      const user = await manager.findOneBy(User, {
        id: session.userId,
        deletedAt: IsNull(),
      });

      if (!user) {
        throw new UnauthorizedException('Please sign in again.');
      }
      const refreshToken = session.id + '.' + randomBytes(32).toString('hex');
      session.tokenHash = hash(refreshToken);
      await manager.save(session);

      return {
        accessToken: await this.access(user.id, session.id),
        user: publicUser(user),
        refreshToken,
      };
    });
  }

  async logout(token: string | undefined) {
    if (
      token &&
      isUUID(token.split('.')[0]) &&
      /^[0-9a-f-]{36}\.[0-9a-f]{64}$/.test(token)
    ) {
      await this.db
        .getRepository(Session)
        .update(
          { id: token.split('.')[0], tokenHash: hash(token) },
          { revokedAt: new Date() },
        );
    }
  }
}