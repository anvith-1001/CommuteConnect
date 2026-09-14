import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DataSource, EntityManager } from 'typeorm';
import { createHmac } from 'crypto';
import {
  Interest,
  InterestStatus,
  Notification,
  NotificationType,
  Post,
  RideStatus,
} from '../database/entities';
import { HistoryDto, pageResult } from '../common/pagination.dto';
import { SavePostDto, SearchPostsDto, UpdatePostDto } from './dto/post.dto';

@Injectable()
export class PostsService {
  constructor(private db: DataSource) {}

  validate(dto: SavePostDto) {
    if (dto.origin.toLowerCase() === dto.destination.toLowerCase()) {
      throw new BadRequestException('Origin and destination must be different.');
    }

    if (new Date(dto.departureAt) <= new Date()) {
      throw new BadRequestException('Choose a departure time in the future.');
    }

    const hasVia = !!dto.via;
    const hasViaCoordinates = dto.viaLat !== undefined && dto.viaLng !== undefined;

    if (hasVia !== hasViaCoordinates) {
      throw new BadRequestException('A via point needs its name and map pin.');
    }
  }

  async create(userId: string, dto: SavePostDto) {
    this.validate(dto);
    const post = await this.db
      .getRepository(Post)
      .save({ ownerId: userId, ...dto, departureAt: new Date(dto.departureAt) });

    return this.get(post.id, userId);
  }

  async locked(manager: EntityManager, id: string) {
    const post = await manager.findOne(Post, {
      where: { id },
      lock: { mode: 'pessimistic_write' },
    });

    if (!post) {
      throw new NotFoundException('Commute not found.');
    }

    return post;
  }

  ensureOwner(post: Post, userId: string) {
    if (post.ownerId !== userId) {
      throw new ForbiddenException('You can only change your own commutes.');
    }
  }

  ensureActive(post: Post) {
    if (post.deletedAt || post.departureAt <= new Date()) {
      throw new ConflictException('This commute is no longer open.');
    }
  }

  async accepted(manager: EntityManager, postId: string) {
    return manager.countBy(Interest, { postId, status: InterestStatus.ACCEPTED });
  }

  async update(id: string, userId: string, dto: UpdatePostDto) {
    await this.db.transaction(async (manager) => {
      const post = await this.locked(manager, id);
      this.ensureOwner(post, userId);
      this.ensureActive(post);
      const accepted = await this.accepted(manager, id);

      if (dto.seats < accepted) {
        throw new ConflictException(
          `There are already ${accepted} accepted passengers. Seats cannot be reduced below this number.`,
        );
      }

      post.seats = dto.seats;
      await manager.save(post);
    });

    return this.get(id, userId);
  }

  async remove(id: string, userId: string) {
    await this.db.transaction(async (manager) => {
      const post = await this.locked(manager, id);
      this.ensureOwner(post, userId);

      if (!post.deletedAt) {
        post.deletedAt = new Date();
        await manager.save(post);
      }
    });
  }

  async startRide(id: string, userId: string) {
    return this.db.transaction(async (manager) => {
      const post = await this.locked(manager, id);
      this.ensureOwner(post, userId);

      if (post.deletedAt || post.rideStatus !== RideStatus.SCHEDULED) {
        throw new ConflictException('This ride cannot be started.');
      }

      if (post.departureAt.getTime() - Date.now() > 7200000) {
        throw new ConflictException('The ride can be started up to two hours early.');
      }

      const passengers = await manager.findBy(Interest, {
        postId: id,
        status: InterestStatus.ACCEPTED,
      });

      if (!passengers.some((interest) => interest.boardedAt)) {
        throw new ConflictException('Verify at least one passenger OTP first.');
      }

      post.rideStatus = RideStatus.IN_PROGRESS;
      post.startedAt = new Date();
      const saved = await manager.save(post);
      await manager.save(
        Notification,
        passengers.map((interest) => ({
          userId: interest.userId,
          type: NotificationType.RIDE_STARTED,
          postId: post.id,
          interestId: interest.id,
          title: 'Your ride has started',
          body: `${post.origin} to ${post.destination}`.slice(0, 240),
        })),
      );

      return saved;
    });
  }

  async endRide(id: string, userId: string) {
    return this.db.transaction(async (manager) => {
      const post = await this.locked(manager, id);
      this.ensureOwner(post, userId);

      if (post.rideStatus !== RideStatus.IN_PROGRESS) {
        throw new ConflictException('Only a ride in progress can be ended.');
      }

      const passengers = await manager.findBy(Interest, {
        postId: id,
        status: InterestStatus.ACCEPTED,
      });
      post.rideStatus = RideStatus.COMPLETED;
      post.endedAt = new Date();
      const saved = await manager.save(post);
      await manager.save(
        Notification,
        passengers.map((interest) => ({
          userId: interest.userId,
          type: NotificationType.RIDE_ENDED,
          postId: post.id,
          interestId: interest.id,
          title: 'Your ride has ended',
          body: `${post.origin} to ${post.destination}`.slice(0, 240),
        })),
      );

      return saved;
    });
  }

  async list(userId: string, q: SearchPostsDto) {
    const builder = this.db
      .getRepository(Post)
      .createQueryBuilder('post')
      .where('post.deletedAt IS NULL')
      .andWhere('post.departureAt > :now', { now: new Date() })
      .andWhere('post.rideStatus = :rideStatus', {
        rideStatus: RideStatus.SCHEDULED,
      })
      .andWhere(
        `(
          SELECT COUNT(*)
          FROM commuteconnect.interests accepted_interest
          WHERE accepted_interest."postId" = post.id
            AND accepted_interest.status = :acceptedStatus
        ) < post.seats`,
        { acceptedStatus: InterestStatus.ACCEPTED },
      );

    // position() treats % and _ as literal search text, not LIKE wildcards.
    if (q.origin) {
      builder.andWhere(
        `(position(lower(:origin) in lower(post.origin)) > 0
          OR similarity(lower(post.origin), lower(:origin)) >= 0.25)`,
        { origin: q.origin },
      );
    }

    if (q.destination) {
      builder.andWhere(
        `(position(lower(:destination) in lower(post.destination)) > 0
          OR similarity(lower(post.destination), lower(:destination)) >= 0.25)`,
        { destination: q.destination },
      );
    }

    const [posts, total] = await builder
      .orderBy('post.departureAt', 'ASC')
      .addOrderBy('post.id', 'ASC')
      .skip((q.page - 1) * q.limit)
      .take(q.limit)
      .getManyAndCount();

    return pageResult(await this.present(posts, userId), total, q);
  }

  async mine(userId: string, q: HistoryDto) {
    const builder = this.db
      .getRepository(Post)
      .createQueryBuilder('post')
      .where('post.ownerId = :userId', { userId });

    if (q.view === 'current') {
      builder.andWhere(
        'post.deletedAt IS NULL AND post.rideStatus != :completed AND (post.departureAt > :now OR post.rideStatus = :inProgress)',
        {
          now: new Date(),
          completed: RideStatus.COMPLETED,
          inProgress: RideStatus.IN_PROGRESS,
        },
      );
    } else {
      builder.andWhere(
        '(post.deletedAt IS NOT NULL OR post.rideStatus = :completed OR (post.departureAt <= :now AND post.rideStatus = :scheduled))',
        {
          now: new Date(),
          completed: RideStatus.COMPLETED,
          scheduled: RideStatus.SCHEDULED,
        },
      );
    }

    const [posts, total] = await builder
      .orderBy('post.departureAt', q.view === 'current' ? 'ASC' : 'DESC')
      .addOrderBy('post.id', 'ASC')
      .skip((q.page - 1) * q.limit)
      .take(q.limit)
      .getManyAndCount();

    return pageResult(await this.present(posts, userId), total, q);
  }

  async get(id: string, userId: string) {
    const post = await this.db.getRepository(Post).findOneBy({ id });

    if (!post) {
      throw new NotFoundException('Commute not found.');
    }

    if (
      post.deletedAt &&
      post.ownerId !== userId &&
      !(await this.db.getRepository(Interest).existsBy({ postId: id, userId }))
    ) {
      throw new NotFoundException('Commute not found.');
    }

    return (await this.present([post], userId))[0];
  }

  async present(posts: Post[], userId: string) {
    if (!posts.length) {
      return [];
    }

    const ids = posts.map((p) => p.id);
    const owners = await this.db
      .getRepository(Post)
      .createQueryBuilder('post')
      .innerJoin('post.owner', 'owner')
      .select('post.id', 'id')
      .addSelect('owner.name', 'name')
      .where('post.id IN (:...ids)', { ids })
      .getRawMany();
    const interests = await this.db
      .getRepository(Interest)
      .createQueryBuilder('i')
      .where('i.postId IN (:...ids)', { ids })
      .andWhere('(i.status = :status OR i.userId = :userId)', {
        status: InterestStatus.ACCEPTED,
        userId,
      })
      .getMany();

    return posts.map((post) => {
      const postInterests = interests.filter((interest) => interest.postId === post.id);
      const myInterest = postInterests.find((interest) => interest.userId === userId);

      return {
        ...post,
        vehicleNumber:
          post.ownerId === userId || myInterest?.status === InterestStatus.ACCEPTED
            ? post.vehicleNumber
            : null,
        owner: { id: post.ownerId, name: owners.find((o) => o.id === post.id)?.name },
        availableSeats:
          post.seats -
          postInterests.filter((interest) => interest.status === InterestStatus.ACCEPTED)
            .length,
        myInterest: myInterest
          ? {
              ...myInterest,
              rideOtp:
                myInterest.status === InterestStatus.ACCEPTED && !myInterest.boardedAt
                  ? this.rideOtp(myInterest.id)
                  : null,
            }
          : null,
      };
    });
  }

  private rideOtp(interestId: string): string {
    const digest = createHmac('sha256', process.env.JWT_SECRET!)
      .update(interestId)
      .digest();

    return (digest.readUInt32BE(0) % 1000000).toString().padStart(6, '0');
  }
}