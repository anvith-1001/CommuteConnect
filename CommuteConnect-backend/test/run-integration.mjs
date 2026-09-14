import EmbeddedPostgres from 'embedded-postgres';
import { mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { spawn } from 'node:child_process';
import { randomBytes } from 'node:crypto';

const root = await mkdtemp(join(tmpdir(), 'commuteconnect-test-'));

const password = randomBytes(24).toString('hex');

const port = Number(process.env.TEST_PORT || 55439);

const pg = new EmbeddedPostgres({
  databaseDir: join(root, 'data'),
  user: 'commute_test',
  password,
  port,
  persistent: false,
  createPostgresUser: false,
  authMethod: 'scram-sha-256',
  postgresFlags: ['-h', '127.0.0.1', '-k', root],
  onLog: () => {},
  onError: () => {},
});

let started = false;

let resultCode = 0;

try {
  await pg.initialise();
  await pg.start();
  started = true;
  await pg.createDatabase('commuteconnect_test');
  const code = await new Promise((resolve, reject) => {
    const child = spawn(
      process.execPath,
      [
        'node_modules/jest/bin/jest.js',
        '--config',
        'test/jest-integration.json',
        '--runInBand',
      ],
      {
        stdio: 'inherit',
        env: {
          ...process.env,
          CC_ISOLATED_TEST: 'true',
          NODE_ENV: 'test',
          DATABASE_URL: `postgresql://commute_test:${password}@127.0.0.1:${port}/commuteconnect_test`,
          DATABASE_SSL: 'false',
          JWT_SECRET: randomBytes(48).toString('hex'),
          FRONTEND_ORIGINS: 'http://localhost:4200',
        },
      },
    );
    child.on('error', reject);
    child.on('exit', resolve);
  });
  resultCode = code ?? 1;
} catch (error) {
  console.error(error);
  resultCode = 1;
} finally {
  if (started) {
    await pg.stop();
  }

  await rm(root, { recursive: true, force: true });
}

process.exit(resultCode);