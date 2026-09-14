import { databaseSslOptions } from './ssl-options';
import { migrationErrorMessage } from './migration-error';

describe('Database TLS configuration and migration diagnostics', () => {
  it('does not read a CA file for local non-TLS connections', () => {
    expect(
      databaseSslOptions({ DATABASE_SSL: 'false', DATABASE_SSL_CA_FILE: '/missing' }),
    ).toBe(false);
  });

  it('keeps certificate verification enabled by default', () => {
    expect(databaseSslOptions({ DATABASE_SSL: 'true' })).toEqual({
      rejectUnauthorized: true,
    });
  });

  it('reports unreadable certificate files with an actionable code', () => {
    expect(() =>
      databaseSslOptions({
        DATABASE_SSL: 'true',
        DATABASE_SSL_CA_FILE: '/missing/commuteconnect-ca.cer',
      }),
    ).toThrow('Cannot read the configured database CA certificate.');
  });

  it('explains an untrusted certificate without exposing raw errors', () => {
    const message = migrationErrorMessage({
      code: 'SELF_SIGNED_CERT_IN_CHAIN',
      message: 'password=secret',
    });

    expect(message).toContain('DATABASE_SSL_CA_FILE');
    expect(message).not.toContain('password=secret');
  });

  it('omits sensitive contents from unknown errors', () => {
    expect(
      migrationErrorMessage(new Error('postgresql://user:secret@host/db')),
    ).not.toContain('secret@host');
  });
});