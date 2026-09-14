const errorHints: Record<string, string> = {
  SELF_SIGNED_CERT_IN_CHAIN:
    'The database certificate is not trusted. Download the Supabase CA certificate from Database Settings and set DATABASE_SSL_CA_FILE to its path.',
  DEPTH_ZERO_SELF_SIGNED_CERT:
    'The database certificate is not trusted. Configure DATABASE_SSL_CA_FILE with the Supabase CA certificate.',
  UNABLE_TO_VERIFY_LEAF_SIGNATURE:
    'The certificate chain could not be verified. Check that DATABASE_SSL_CA_FILE contains the Supabase CA certificate.',
  UNABLE_TO_GET_ISSUER_CERT_LOCALLY:
    'The certificate issuer is not trusted. Configure DATABASE_SSL_CA_FILE with the Supabase CA certificate.',
  DATABASE_CA_FILE_UNREADABLE:
    'The CA certificate file could not be read. Save the downloaded certificate at the DATABASE_SSL_CA_FILE path, relative to the backend directory.',
  ERR_TLS_CERT_ALTNAME_INVALID:
    'The certificate does not match the database hostname. Copy the exact connection string from Supabase Connect.',
  ENOTFOUND:
    'The database hostname could not be resolved. Check the connection string and network access.',
  ECONNREFUSED:
    'The database refused the connection. Check that the database is running and the host and port are correct.',
  ETIMEDOUT:
    'The database connection timed out. Check network access and Supabase project availability.',
  '28P01':
    'Database authentication failed. Check the database password and URL-encode special characters in it.',
  '3D000': 'The database does not exist. Check the database name in DATABASE_URL.',
  '42501':
    'The database role lacks permission to create or migrate the schema. Use the migration database role.',
  '42P07':
    'A migration tried to create a table that already exists. Check migration history before changing existing tables.',
};

export function migrationErrorMessage(error: unknown): string {
  const candidate = error as { code?: unknown; driverError?: { code?: unknown } } | null;
  const rawCode = candidate?.code ?? candidate?.driverError?.code;
  const code =
    typeof rawCode === 'string' && /^[A-Z0-9_]+$/.test(rawCode) ? rawCode : 'UNKNOWN';
  const hint =
    errorHints[code] ??
    'Check the database connection settings and migration state. Raw database errors are omitted to protect credentials.';

  return `Migration failed [${code}]. ${hint}`;
}