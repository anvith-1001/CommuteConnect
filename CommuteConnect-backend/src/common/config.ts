export function validateEnvironment(env: Record<string, unknown>) {
  const secret = String(env.JWT_SECRET || '');

  if (Buffer.byteLength(secret) < 32) {
    throw new Error('JWT_SECRET must contain at least 32 bytes.');
  }

  const database = String(env.DATABASE_URL || '');

  if (!/^postgres(ql)?:\/\//.test(database)) {
    throw new Error('DATABASE_URL must be a PostgreSQL URL.');
  }

  const origins = String(env.FRONTEND_ORIGINS || 'http://localhost:4200')
    .split(',')
    .map((x) => x.trim());

  for (const origin of origins) {
    const url = new URL(origin);

    if (url.origin !== origin || !['http:', 'https:'].includes(url.protocol)) {
      throw new Error('FRONTEND_ORIGINS must contain exact HTTP origins.');
    }
  }

  if (
    env.NODE_ENV === 'production' &&
    (secret.includes('change-me') ||
      origins.some((x) => !x.startsWith('https://')) ||
      env.DATABASE_SSL !== 'true')
  ) {
    throw new Error(
      'Production requires a strong secret, HTTPS origins, and verified database TLS.',
    );
  }

  return {
    ...env,
    JWT_SECRET: secret,
    DATABASE_URL: database,
    FRONTEND_ORIGINS: origins.join(','),
  };
}