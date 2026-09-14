import { Controller, Get, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { DataSource } from 'typeorm';
import { ApiTags } from '@nestjs/swagger';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { InterestsModule } from './interests/interests.module';
import { ChatModule } from './chat/chat.module';
import { NotificationsModule } from './notifications/notifications.module';
import { validateEnvironment } from './common/config';
import dataSource from './database/data-source';

@Controller('health')
@ApiTags('Health')
class HealthController {
  constructor(private db: DataSource) {}

  @Get()
  async health() {
    await this.db.query('SELECT 1');

    return { status: 'ok' };
  }
}

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, validate: validateEnvironment }),
    TypeOrmModule.forRoot({ ...dataSource.options }),
    ThrottlerModule.forRoot([{ ttl: 60000, limit: 120 }]),
    AuthModule,
    UsersModule,
    PostsModule,
    InterestsModule,
    ChatModule,
    NotificationsModule,
  ],
  controllers: [HealthController],
  providers: [{ provide: APP_GUARD, useClass: ThrottlerGuard }],
})
export class AppModule {}