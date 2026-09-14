import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function setupSwagger(app: INestApplication, environment: string): void {
  if (environment !== 'development') {
    return;
  }

  const configuration = new DocumentBuilder()
    .setTitle('CommuteConnect API')
    .setDescription(
      'Development documentation for authentication, commutes, interests, and chat.',
    )
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description: 'Enter the access token returned by login or registration.',
      },
      'access-token',
    )
    .build();
  const document = SwaggerModule.createDocument(app, configuration);

  SwaggerModule.setup('docs', app, document, {
    customSiteTitle: 'CommuteConnect API documentation',
    swaggerOptions: {
      displayRequestDuration: true,
      persistAuthorization: false,
    },
  });
}