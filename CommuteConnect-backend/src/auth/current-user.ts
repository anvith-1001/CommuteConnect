import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export interface Identity {
  id: string;
  sessionId: string;
}

export const CurrentUser = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): Identity =>
    ctx.switchToHttp().getRequest().user,
);