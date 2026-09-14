import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

interface DatabaseEnvironment {
  DATABASE_SSL?: string;
  DATABASE_SSL_CA_FILE?: string;
}

export function databaseSslOptions(environment: DatabaseEnvironment) {
  if (environment.DATABASE_SSL !== 'true') {
    return false;
  }

  const certificatePath = environment.DATABASE_SSL_CA_FILE?.trim();

  if (!certificatePath) {
    return { rejectUnauthorized: true };
  }

  try {
    const ca = readFileSync(resolve(certificatePath), 'utf8');

    return {
      rejectUnauthorized: true,
      ca,
    };
  } catch {
    const error = new Error('Cannot read the configured database CA certificate.');

    Object.assign(error, { code: 'DATABASE_CA_FILE_UNREADABLE' });

    throw error;
  }
}