import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';
import { CurrentUser, Identity } from '../auth/current-user';
import { HistoryDto } from '../common/pagination.dto';
import { SavePostDto, SearchPostsDto, UpdatePostDto } from './dto/post.dto';
import { PostsService } from './posts.service';

@Controller('posts')
@UseGuards(AuthGuard)
@ApiTags('Posts')
@ApiBearerAuth('access-token')
export class PostsController {
  constructor(private posts: PostsService) {}

  @Get()
  list(@CurrentUser() u: Identity, @Query() q: SearchPostsDto) {
    return this.posts.list(u.id, q);
  }

  @Get('mine')
  mine(@CurrentUser() u: Identity, @Query() q: HistoryDto) {
    return this.posts.mine(u.id, q);
  }

  @Get(':id')
  get(@Param('id', ParseUUIDPipe) id: string, @CurrentUser() u: Identity) {
    return this.posts.get(id, u.id);
  }

  @Post()
  create(@Body() dto: SavePostDto, @CurrentUser() u: Identity) {
    return this.posts.create(u.id, dto);
  }

  @Put(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdatePostDto,
    @CurrentUser() u: Identity,
  ) {
    return this.posts.update(id, u.id, dto);
  }

  @Patch(':id/ride/start')
  startRide(@Param('id', ParseUUIDPipe) id: string, @CurrentUser() u: Identity) {
    return this.posts.startRide(id, u.id);
  }

  @Patch(':id/ride/end')
  endRide(@Param('id', ParseUUIDPipe) id: string, @CurrentUser() u: Identity) {
    return this.posts.endRide(id, u.id);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id', ParseUUIDPipe) id: string, @CurrentUser() u: Identity) {
    return this.posts.remove(id, u.id);
  }
}