import { INestApplication, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import { randomUUID } from 'crypto';
import { Request, Response, NextFunction } from 'express';
import { ApiErrorFilter } from './common/api-error.filter';
import { setupSwagger } from './common/swagger';

export function setup(app: INestApplication) {
  const config = app.get(ConfigService);
  const environment = config.get<string>('NODE_ENV') || 'development';
  app.setGlobalPrefix('api');

  // Render terminates TLS at its reverse proxy; trust exactly that hop.
  if (config.get('NODE_ENV') === 'production') {
    app.getHttpAdapter().getInstance().set('trust proxy', 1);
  }

  app.use(
    helmet(environment === 'development' ? { contentSecurityPolicy: false } : undefined),
  );
  app.use(cookieParser());
  app.use((_req: Request, res: Response, next: NextFunction) => {
    res.setHeader('X-Request-ID', randomUUID());
    res.setHeader('Cache-Control', 'no-store');
    next();
  });
  app.enableCors({
    origin: config.get<string>('FRONTEND_ORIGINS')!.split(','),
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Authorization', 'Content-Type'],
  });
  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true }),
  );
  app.useGlobalFilters(new ApiErrorFilter());
  setupSwagger(app, environment);
  app.enableShutdownHooks();
}