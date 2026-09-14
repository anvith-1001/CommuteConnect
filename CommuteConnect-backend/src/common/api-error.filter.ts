import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class ApiErrorFilter implements ExceptionFilter {
  private logger = new Logger('API');

  catch(error: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();
    const req = ctx.getRequest<Request>();
    const status = error instanceof HttpException ? error.getStatus() : 500;
    const detail = error instanceof HttpException ? error.getResponse() : null;
    const message =
      typeof detail === 'string'
        ? detail
        : detail && typeof detail === 'object' && 'message' in detail
          ? detail.message
          : 'Something went wrong. Please try again.';

    if (status === 500) {
      this.logger.error(
        `Request ${res.getHeader('X-Request-ID')} failed: ${error instanceof Error ? error.name : 'UnknownError'}`,
      );
    }

    res.status(status).json({
      statusCode: status,
      message,
      path: req.path,
      requestId: res.getHeader('X-Request-ID'),
    });
  }
}