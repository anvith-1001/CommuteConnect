import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, IsNull, Repository } from 'typeorm';
import * as argon2 from 'argon2';
import { Interest, Post, Session, User } from '../database/entities';
import { UpdateProfileDto } from './dto/profile.dto';

export const publicUser = (user: User) => ({
  id: user.id,
  name: user.name,
  email: user.email,
  dob: user.dob,
  sex: user.sex,
});

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private users: Repository<User>,
    private db: DataSource,
  ) {}

  async me(id: string) {
    const user = await this.users.findOneBy({ id, deletedAt: IsNull() });

    if (!user) {
      throw new NotFoundException('Account not found.');
    }

    return publicUser(user);
  }

  async update(id: string, dto: UpdateProfileDto) {
    const date = new Date(dto.dob + 'T00:00:00Z');

    if (
      !Number.isFinite(date.getTime()) ||
      date.toISOString().slice(0, 10) !== dto.dob ||
      date >= new Date() ||
      date.getUTCFullYear() < 1900
    ) {
      throw new BadRequestException('Enter a valid date of birth in the past.');
    }

    const user = await this.users.findOneBy({ id, deletedAt: IsNull() });

    if (!user) {
      throw new NotFoundException('Account not found.');
    }

    Object.assign(user, dto);

    return publicUser(await this.users.save(user));
  }

  async remove(id: string, password: string): Promise<void> {
    await this.db.transaction(async (manager) => {
      const user = await manager
        .getRepository(User)
        .createQueryBuilder('user')
        .addSelect('user.passwordHash')
        .setLock('pessimistic_write')
        .where('user.id = :id', { id })
        .andWhere('user.deletedAt IS NULL')
        .getOne();

      if (!user || !(await argon2.verify(user.passwordHash, password))) {
        throw new UnauthorizedException('Password is incorrect.');
      }

      await manager.delete(Interest, { userId: id });
      await manager.delete(Post, { ownerId: id });
      await manager.delete(Session, { userId: id });
      user.passwordHash = await argon2.hash(`deleted-${user.id}-${Date.now()}`);
      user.dob = null;
      user.sex = null;
      user.deletedAt = new Date();
      await manager.save(user);
    });
  }
}