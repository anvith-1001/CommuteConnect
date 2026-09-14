import {
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';
import { CurrentUser, Identity } from '../auth/current-user';
import { NotificationsService } from './notifications.service';

@Controller('notifications')
@UseGuards(AuthGuard)
@ApiTags('Notifications')
@ApiBearerAuth('access-token')
export class NotificationsController {
  constructor(private notifications: NotificationsService) {}

  @Get()
  list(@CurrentUser() user: Identity) {
    return this.notifications.list(user.id);
  }

  @Patch('read-all')
  @HttpCode(204)
  readAll(@CurrentUser() user: Identity) {
    return this.notifications.readAll(user.id);
  }

  @Patch('conversations/:interestId/read')
  @HttpCode(204)
  readConversation(
    @Param('interestId', ParseUUIDPipe) interestId: string,
    @CurrentUser() user: Identity,
  ) {
    return this.notifications.readConversation(user.id, interestId);
  }

  @Patch(':id/read')
  read(@Param('id', ParseUUIDPipe) id: string, @CurrentUser() user: Identity) {
    return this.notifications.read(id, user.id);
  }

  @Delete()
  @HttpCode(204)
  clear(@CurrentUser() user: Identity) {
    return this.notifications.clear(user.id);
  }
}