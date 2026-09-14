import { Module } from '@nestjs/common';
import { PostsModule } from '../posts/posts.module';
import { InterestsController } from './interests.controller';
import { InterestsService } from './interests.service';

@Module({
  imports: [PostsModule],
  controllers: [InterestsController],
  providers: [InterestsService],
})
export class InterestsModule {}