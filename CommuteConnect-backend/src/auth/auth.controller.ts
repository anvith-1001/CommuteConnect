import {
  Body,
  Controller,
  ForbiddenException,
  HttpCode,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Throttle } from '@nestjs/throttler';
import { Request, Response } from 'express';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './dto/auth.dto';
import { refreshCookieOptions } from './refresh-cookie';

@Controller('auth')
@Throttle({ default: { limit: 10, ttl: 60000 } })
@ApiTags('Authentication')
export class AuthController {
  constructor(
    private auth: AuthService,
    private config: ConfigService,
  ) {}

  private checkOrigin(req: Request) {
    const origin = req.headers.origin;

    if (
      origin &&
      !this.config.get<string>('FRONTEND_ORIGINS')!.split(',').includes(origin)
    ) {
      throw new ForbiddenException('This origin is not allowed.');
    }

    if (req.headers['sec-fetch-site'] === 'cross-site') {
      throw new ForbiddenException('Cross-site authentication requests are not allowed.');
    }
  }

  private options() {
    return refreshCookieOptions(this.config.get('NODE_ENV') === 'production');
  }

  private send(res: Response, result: Awaited<ReturnType<AuthService['login']>>) {
    const { refreshToken, ...body } = result;
    res.cookie('cc_refresh', refreshToken, this.options());

    return body;
  }

  @Post('register')
  async register(
    @Body() dto: RegisterDto,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    this.checkOrigin(req);

    return this.send(res, await this.auth.register(dto));
  }

  @Post('login')
  @HttpCode(200)
  async login(
    @Body() dto: LoginDto,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    this.checkOrigin(req);

    return this.send(res, await this.auth.login(dto));
  }

  @Post('refresh')
  @HttpCode(200)
  async refresh(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    this.checkOrigin(req);
    res.setHeader('Cache-Control', 'no-store');

    if (!req.cookies?.cc_refresh) {
      res.status(204);

      return;
    }

    return this.send(res, await this.auth.refresh(req.cookies?.cc_refresh));
  }

  @Post('logout')
  @HttpCode(204)
  async logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    this.checkOrigin(req);
    await this.auth.logout(req.cookies?.cc_refresh);
    res.clearCookie('cc_refresh', this.options());
  }
}