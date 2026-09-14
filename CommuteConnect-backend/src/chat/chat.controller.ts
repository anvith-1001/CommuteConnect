import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';
import { CurrentUser, Identity } from '../auth/current-user';
import { ChatService } from './chat.service';
import { SendMessageDto } from './dto/message.dto';

@Controller('interests/:interestId/messages')
@UseGuards(AuthGuard)
@ApiTags('Chat')
@ApiBearerAuth('access-token')
export class ChatController {
  constructor(private chat: ChatService) {}

  @Get()
  list(
    @Param('interestId', ParseUUIDPipe) interestId: string,
    @CurrentUser() user: Identity,
  ) {
    return this.chat.list(interestId, user.id);
  }

  @Post()
  send(
    @Param('interestId', ParseUUIDPipe) interestId: string,
    @CurrentUser() user: Identity,
    @Body() dto: SendMessageDto,
  ) {
    return this.chat.send(interestId, user.id, dto.body);
  }
}