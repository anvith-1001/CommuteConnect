import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DataSource } from 'typeorm';
import {
  Interest,
  InterestStatus,
  Notification,
  NotificationType,
  Post,
  RideStatus,
} from '../database/entities';
import { PostsService } from '../posts/posts.service';
import { HistoryDto, PaginationDto, pageResult } from '../common/pagination.dto';
import { createHmac, timingSafeEqual } from 'crypto';
import { ExpressInterestDto } from './dto/express-interest.dto';

@Injectable()
export class InterestsService {
  constructor(
    private db: DataSource,
    private posts: PostsService,
  ) {}

  async express(postId: string, userId: string, dto: ExpressInterestDto) {
    const hasPickupLat = dto.pickupLat !== undefined;
    const hasPickupLng = dto.pickupLng !== undefined;

    if (hasPickupLat !== hasPickupLng) {
      throw new BadRequestException(
        'Pickup latitude and longitude must be provided together.',
      );
    }

    return this.db.transaction(async (manager) => {
      const post = await this.posts.locked(manager, postId);
      this.posts.ensureActive(post);

      if (post.ownerId === userId) {
        throw new ForbiddenException('You cannot express interest in your own commute.');
      }

      const existing = await manager.findOneBy(Interest, { postId, userId });

      if (existing && existing.status !== InterestStatus.WITHDRAWN) {
        throw new ConflictException(
          'You have already expressed interest in this commute.',
        );
      }

      if ((await this.posts.accepted(manager, postId)) >= post.seats) {
        throw new ConflictException('This commute has no seats available.');
      }

      const interest = await manager.save(Interest, {
        ...existing,
        postId,
        userId,
        status: InterestStatus.PENDING,
        pickupLat:
          dto.pickupLat !== undefined && dto.pickupLng !== undefined
            ? dto.pickupLat
            : post.originLat,
        pickupLng:
          dto.pickupLat !== undefined && dto.pickupLng !== undefined
            ? dto.pickupLng
            : post.originLng,
      });

      await manager.save(Notification, {
        userId: post.ownerId,
        type: NotificationType.INTEREST_RECEIVED,
        postId,
        interestId: interest.id,
        title: 'New ride request',
        body: `${post.origin} to ${post.destination}`.slice(0, 240),
      });

      return interest;
    });
  }

  async decide(
    id: string,
    ownerId: string,
    status: InterestStatus.ACCEPTED | InterestStatus.DECLINED,
  ) {
    return this.db.transaction(async (manager) => {
      const candidate = await manager.findOneBy(Interest, { id });

      if (!candidate) {
        throw new NotFoundException('Interest not found.');
      }

      const post = await this.posts.locked(manager, candidate.postId);
      this.posts.ensureOwner(post, ownerId);
      this.posts.ensureActive(post);
      const interest = await manager.findOneByOrFail(Interest, { id });

      if (interest.status !== InterestStatus.PENDING) {
        throw new ConflictException('Only pending interest can be accepted or declined.');
      }

      if (
        status === InterestStatus.ACCEPTED &&
        (await this.posts.accepted(manager, post.id)) >= post.seats
      ) {
        throw new ConflictException('The last seat has already been taken.');
      }

      interest.status = status;
      const saved = await manager.save(interest);

      if (status === InterestStatus.ACCEPTED) {
        await manager.save(Notification, {
          userId: interest.userId,
          type: NotificationType.INTEREST_ACCEPTED,
          postId: post.id,
          interestId: interest.id,
          title: 'Your seat is confirmed',
          body: `${post.origin} to ${post.destination}`.slice(0, 240),
        });
      }

      return saved;
    });
  }

  async withdraw(id: string, userId: string) {
    return this.db.transaction(async (manager) => {
      const candidate = await manager.findOneBy(Interest, { id });

      if (!candidate) {
        throw new NotFoundException('Interest not found.');
      }

      const post = await this.posts.locked(manager, candidate.postId);
      const interest = await manager.findOneByOrFail(Interest, { id });

      if (interest.userId !== userId) {
        throw new ForbiddenException('You can only withdraw your own interest.');
      }

      this.posts.ensureActive(post);

      if (![InterestStatus.PENDING, InterestStatus.ACCEPTED].includes(interest.status)) {
        throw new ConflictException('This interest is no longer active.');
      }

      interest.status = InterestStatus.WITHDRAWN;

      return manager.save(interest);
    });
  }

  async forPost(postId: string, userId: string, q: PaginationDto) {
    const post = await this.db.getRepository(Post).findOneBy({ id: postId });

    if (!post) {
      throw new NotFoundException('Commute not found.');
    }

    this.posts.ensureOwner(post, userId);
    const [rows, total] = await this.db
      .getRepository(Interest)
      .createQueryBuilder('i')
      .innerJoin('i.user', 'user')
      .addSelect(['user.id', 'user.name'])
      .where('i.postId = :postId', { postId })
      .orderBy('i.createdAt', 'DESC')
      .addOrderBy('i.id', 'ASC')
      .skip((q.page - 1) * q.limit)
      .take(q.limit)
      .getManyAndCount();

    return pageResult(rows, total, q);
  }

  async mine(userId: string, q: HistoryDto) {
    const builder = this.db
      .getRepository(Interest)
      .createQueryBuilder('i')
      .innerJoinAndSelect('i.post', 'post')
      .where('i.userId = :userId', { userId });
    const active =
      'post.deletedAt IS NULL AND post.rideStatus != :completed AND (post.departureAt > :now OR post.rideStatus = :inProgress) AND i.status IN (:...active)';
    builder.andWhere(q.view === 'current' ? `(${active})` : `NOT (${active})`, {
      now: new Date(),
      active: [InterestStatus.PENDING, InterestStatus.ACCEPTED],
      completed: RideStatus.COMPLETED,
      inProgress: RideStatus.IN_PROGRESS,
    });
    const [rows, total] = await builder
      .orderBy('post.departureAt', q.view === 'current' ? 'ASC' : 'DESC')
      .addOrderBy('i.id', 'ASC')
      .skip((q.page - 1) * q.limit)
      .take(q.limit)
      .getManyAndCount();
    const posts = await this.posts.present(
      rows.map((i) => i.post),
      userId,
    );

    return pageResult(
      rows.map((i) => ({
        ...i,
        rideOtp:
          i.status === InterestStatus.ACCEPTED && !i.boardedAt
            ? this.rideOtp(i.id)
            : null,
        post: posts.find((p) => p.id === i.postId),
      })),
      total,
      q,
    );
  }

  async verifyOtp(id: string, ownerId: string, otp: string) {
    const result = await this.db.transaction(async (manager) => {
      const candidate = await manager.findOneBy(Interest, { id });

      if (!candidate) {
        throw new NotFoundException('Passenger not found.');
      }

      const post = await this.posts.locked(manager, candidate.postId);
      const interest = await manager.findOne(Interest, {
        where: { id },
        lock: { mode: 'pessimistic_write' },
      });

      if (!interest) {
        throw new NotFoundException('Passenger not found.');
      }

      interest.post = post;
      this.posts.ensureOwner(post, ownerId);

      if (post.deletedAt || post.rideStatus === RideStatus.COMPLETED) {
        throw new ConflictException('This ride is no longer accepting OTPs.');
      }

      if (interest.status !== InterestStatus.ACCEPTED) {
        throw new ConflictException('Only accepted passengers have a ride OTP.');
      }

      if (interest.boardedAt) {
        return { interest, error: null };
      }

      const now = new Date();
      const attemptWindowExpired =
        !interest.otpAttemptedAt ||
        now.getTime() - interest.otpAttemptedAt.getTime() > 900000;

      if (attemptWindowExpired) {
        interest.otpAttempts = 0;
      }

      if (interest.otpAttempts >= 5) {
        return { interest: null, error: 'locked' as const };
      }

      interest.otpAttempts += 1;
      interest.otpAttemptedAt = now;
      const expected = Buffer.from(this.rideOtp(interest.id));
      const supplied = Buffer.from(otp);

      if (expected.length !== supplied.length || !timingSafeEqual(expected, supplied)) {
        await manager.save(interest);

        return { interest: null, error: 'invalid' as const };
      }

      interest.boardedAt = now;
      interest.otpAttempts = 0;

      return { interest: await manager.save(interest), error: null };
    });

    if (result.error === 'locked') {
      throw new ConflictException('Too many OTP attempts. Try again in 15 minutes.');
    }

    if (result.error === 'invalid') {
      throw new ForbiddenException('The ride OTP is incorrect.');
    }

    return result.interest;
  }

  private rideOtp(interestId: string): string {
    const digest = createHmac('sha256', process.env.JWT_SECRET!)
      .update(interestId)
      .digest();
    const value = digest.readUInt32BE(0) % 1000000;

    return value.toString().padStart(6, '0');
  }
}