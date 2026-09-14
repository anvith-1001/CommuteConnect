import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, IsNull } from 'typeorm';
import { Notification } from '../database/entities';

@Injectable()
export class NotificationsService {
  constructor(private db: DataSource) {}

  async list(userId: string) {
    const repository = this.db.getRepository(Notification);
    const [data, unreadCount] = await Promise.all([
      repository.find({
        where: { userId },
        order: { createdAt: 'DESC' },
        take: 20,
      }),
      repository.countBy({ userId, readAt: IsNull() }),
    ]);

    return { data, unreadCount };
  }

  async read(id: string, userId: string) {
    const repository = this.db.getRepository(Notification);
    const notification = await repository.findOneBy({ id, userId });

    if (!notification) {
      throw new NotFoundException('Notification not found.');
    }

    if (!notification.readAt) {
      notification.readAt = new Date();
      await repository.save(notification);
    }

    return notification;
  }

  async readAll(userId: string) {
    await this.db
      .getRepository(Notification)
      .createQueryBuilder()
      .update()
      .set({ readAt: new Date() })
      .where('"userId" = :userId AND "readAt" IS NULL', { userId })
      .execute();
  }

  async readConversation(userId: string, interestId: string) {
    await this.db
      .getRepository(Notification)
      .createQueryBuilder()
      .update()
      .set({ readAt: new Date() })
      .where('"userId" = :userId AND "interestId" = :interestId AND "readAt" IS NULL', {
        userId,
        interestId,
      })
      .execute();
  }

  async clear(userId: string) {
    await this.db.getRepository(Notification).delete({ userId });
  }
}