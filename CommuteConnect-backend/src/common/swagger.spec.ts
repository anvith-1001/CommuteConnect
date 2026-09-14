import { SwaggerModule } from '@nestjs/swagger';
import { setupSwagger } from './swagger';

describe('Swagger documentation', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('registers /docs in development', () => {
    const document = { openapi: '3.0.0', paths: {} };
    const create = jest
      .spyOn(SwaggerModule, 'createDocument')
      .mockReturnValue(document as never);
    const setup = jest.spyOn(SwaggerModule, 'setup').mockImplementation();
    const app = {} as never;

    setupSwagger(app, 'development');

    expect(create).toHaveBeenCalledWith(app, expect.any(Object));
    expect(setup).toHaveBeenCalledWith(
      'docs',
      app,
      document,
      expect.objectContaining({ customSiteTitle: expect.any(String) }),
    );
  });

  it.each(['production', 'test'])('does not register docs in %s', (environment) => {
    const create = jest.spyOn(SwaggerModule, 'createDocument');
    const setup = jest.spyOn(SwaggerModule, 'setup');

    setupSwagger({} as never, environment);

    expect(create).not.toHaveBeenCalled();
    expect(setup).not.toHaveBeenCalled();
  });
});