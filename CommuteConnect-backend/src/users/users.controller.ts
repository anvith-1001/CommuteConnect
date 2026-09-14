import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Patch,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';
import { CurrentUser, Identity } from '../auth/current-user';
import { refreshCookieOptions } from '../auth/refresh-cookie';
import { UsersService } from './users.service';
import { DeleteAccountDto, UpdateProfileDto } from './dto/profile.dto';

@Controller('users')
@UseGuards(AuthGuard)
@ApiTags('Users')
@ApiBearerAuth('access-token')
export class UsersController {
  constructor(
    private users: UsersService,
    private config: ConfigService,
  ) {}

  @Get('me')
  me(@CurrentUser() user: Identity) {
    return this.users.me(user.id);
  }

  @Patch('me')
  update(@CurrentUser() user: Identity, @Body() dto: UpdateProfileDto) {
    return this.users.update(user.id, dto);
  }

  @Delete('me')
  @HttpCode(204)
  async remove(
    @CurrentUser() user: Identity,
    @Body() dto: DeleteAccountDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    await this.users.remove(user.id, dto.password);
    response.clearCookie(
      'cc_refresh',
      refreshCookieOptions(this.config.get('NODE_ENV') === 'production'),
    );
  }
}