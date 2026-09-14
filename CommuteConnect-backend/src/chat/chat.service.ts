import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DataSource } from 'typeorm';
import {
  Interest,
  InterestStatus,
  Message,
  Notification,
  NotificationType,
  RideStatus,
} from '../database/entities';

@Injectable()
export class ChatService {
  constructor(private db: DataSource) {}

  async assertAccess(interestId: string, userId: string): Promise<Interest> {
    const interest = await this.db.getRepository(Interest).findOne({
      where: { id: interestId },
      relations: { post: true },
    });

    if (!interest) {
      throw new NotFoundException('Conversation not found.');
    }

    if (interest.status !== InterestStatus.ACCEPTED) {
      throw new ForbiddenException('Chat is available after an interest is accepted.');
    }

    if (interest.userId !== userId && interest.post.ownerId !== userId) {
      throw new ForbiddenException('You do not have access to this conversation.');
    }

    return interest;
  }

  async list(interestId: string, userId: string) {
    await this.assertAccess(interestId, userId);

    const messages = await this.db
      .getRepository(Message)
      .createQueryBuilder('message')
      .innerJoin('message.sender', 'sender')
      .addSelect(['sender.id', 'sender.name'])
      .where('message.interestId = :interestId', { interestId })
      .orderBy('message.createdAt', 'DESC')
      .addOrderBy('message.id', 'DESC')
      .take(100)
      .getMany();

    return messages.reverse();
  }

  async send(interestId: string, userId: string, body: string) {
    const interest = await this.assertAccess(interestId, userId);

    if (
      interest.post.deletedAt ||
      interest.post.rideStatus === RideStatus.COMPLETED ||
      (interest.post.departureAt <= new Date() &&
        interest.post.rideStatus !== RideStatus.IN_PROGRESS)
    ) {
      throw new ForbiddenException('This conversation is now read-only.');
    }

    const normalized = body.trim();

    if (!normalized || normalized.length > 1000) {
      throw new BadRequestException(
        'Message must contain between 1 and 1000 characters.',
      );
    }

    const message = await this.db.getRepository(Message).save({
      interestId,
      senderId: userId,
      body: normalized,
    });

    const recipientId =
      interest.userId === userId ? interest.post.ownerId : interest.userId;
    await this.db.getRepository(Notification).save({
      userId: recipientId,
      type: NotificationType.NEW_MESSAGE,
      postId: interest.postId,
      interestId,
      title: 'New message',
      body: normalized.slice(0, 240),
    });

    return this.db
      .getRepository(Message)
      .createQueryBuilder('message')
      .innerJoin('message.sender', 'sender')
      .addSelect(['sender.id', 'sender.name'])
      .where('message.id = :id', { id: message.id })
      .getOneOrFail();
  }
}