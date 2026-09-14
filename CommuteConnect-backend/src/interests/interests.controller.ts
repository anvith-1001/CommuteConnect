import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';
import { CurrentUser, Identity } from '../auth/current-user';
import { HistoryDto, PaginationDto } from '../common/pagination.dto';
import { DecisionDto } from './dto/decision.dto';
import { ExpressInterestDto } from './dto/express-interest.dto';
import { VerifyRideOtpDto } from '../posts/dto/ride.dto';
import { InterestsService } from './interests.service';

@Controller()
@UseGuards(AuthGuard)
@ApiTags('Interests')
@ApiBearerAuth('access-token')
export class InterestsController {
  constructor(private interests: InterestsService) {}

  @Post('posts/:id/interests')
  express(
    @Param('id', ParseUUIDPipe) id: string,
    @CurrentUser() u: Identity,
    @Body() dto: ExpressInterestDto,
  ) {
    return this.interests.express(id, u.id, dto);
  }

  @Get('posts/:id/interests')
  list(
    @Param('id', ParseUUIDPipe) id: string,
    @CurrentUser() u: Identity,
    @Query() q: PaginationDto,
  ) {
    return this.interests.forPost(id, u.id, q);
  }

  @Get('interests/mine')
  mine(@CurrentUser() u: Identity, @Query() q: HistoryDto) {
    return this.interests.mine(u.id, q);
  }

  @Patch('interests/:id/decision')
  decide(
    @Param('id', ParseUUIDPipe) id: string,
    @CurrentUser() u: Identity,
    @Body() dto: DecisionDto,
  ) {
    return this.interests.decide(id, u.id, dto.status);
  }

  @Patch('interests/:id/withdraw')
  withdraw(@Param('id', ParseUUIDPipe) id: string, @CurrentUser() u: Identity) {
    return this.interests.withdraw(id, u.id);
  }

  @Patch('interests/:id/verify-otp')
  verifyOtp(
    @Param('id', ParseUUIDPipe) id: string,
    @CurrentUser() u: Identity,
    @Body() dto: VerifyRideOtpDto,
  ) {
    return this.interests.verifyOtp(id, u.id, dto.otp);
  }
}