import 'reflect-metadata';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { RegisterDto } from '../auth/dto/auth.dto';
import { SavePostDto } from '../posts/dto/post.dto';
import { validateEnvironment } from './config';

const baseEnvironment = {
  DATABASE_URL: 'postgresql://test:test@localhost/test',
  JWT_SECRET: 'x'.repeat(48),
};

describe('Configuration and request boundaries', () => {
  it('rejects short signing secrets', () => {
    const environment = {
      ...baseEnvironment,
      JWT_SECRET: 'short',
    };

    expect(() => validateEnvironment(environment)).toThrow();
  });

  it('rejects wildcard or path-based origins', () => {
    const environment = {
      ...baseEnvironment,
      FRONTEND_ORIGINS: 'https://example.com/path',
    };

    expect(() => validateEnvironment(environment)).toThrow();
  });

  it('requires verified TLS and HTTPS in production', () => {
    const environment = {
      ...baseEnvironment,
      NODE_ENV: 'production',
      DATABASE_SSL: 'false',
    };

    expect(() => validateEnvironment(environment)).toThrow();
  });

  it('accepts explicit secure production settings', () => {
    const environment = {
      ...baseEnvironment,
      NODE_ENV: 'production',
      DATABASE_SSL: 'true',
      FRONTEND_ORIGINS: 'https://commute.example.com',
    };

    expect(validateEnvironment(environment)).toBeDefined();
  });

  it('rejects null notes instead of passing a database constraint violation', async () => {
    const request = plainToInstance(SavePostDto, {
      origin: 'Home',
      destination: 'Work',
      departureAt: '2030-01-01T09:00:00Z',
      seats: 2,
      vehicleNumber: 'KA01AB1234',
      notes: null,
    });

    const errors = await validate(request);

    expect(errors.some((error) => error.property === 'notes')).toBe(true);
  });

  it('requires timezone information for departure', async () => {
    const request = plainToInstance(SavePostDto, {
      origin: 'Home',
      destination: 'Work',
      departureAt: '2030-01-01T09:00:00',
      seats: 2,
      vehicleNumber: 'KA01AB1234',
    });

    const errors = await validate(request);

    expect(errors.some((error) => error.property === 'departureAt')).toBe(true);
  });

  it('enforces signup password length despite inherited login validators', async () => {
    const request = plainToInstance(RegisterDto, {
      name: 'Name',
      email: 'name@example.test',
      password: 'short',
      dob: '1990-01-01',
      sex: 'male',
    });

    const errors = await validate(request);

    expect(errors.some((error) => error.property === 'password')).toBe(true);
  });
});