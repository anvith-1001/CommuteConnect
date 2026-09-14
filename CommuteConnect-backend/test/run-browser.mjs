import EmbeddedPostgres from 'embedded-postgres';
import { mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawn } from 'node:child_process';
import { randomBytes } from 'node:crypto';

const backend = resolve(dirname(fileURLToPath(import.meta.url)), '..');

const frontend = resolve(backend, '../CommuteConnect-app');

const root = await mkdtemp(join(tmpdir(), 'commuteconnect-browser-'));

const password = randomBytes(24).toString('hex');

const port = Number(process.env.TEST_PORT || 55439);

const db = new EmbeddedPostgres({
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

const env = {
  ...process.env,
  NODE_ENV: 'test',
  PORT: '3300',
  DATABASE_URL: `postgresql://commute_test:${password}@127.0.0.1:${port}/commuteconnect_test`,
  DATABASE_SSL: 'false',
  JWT_SECRET: randomBytes(48).toString('hex'),
  FRONTEND_ORIGINS: 'http://localhost:4300',
};

const children = [];

function start(args, cwd) {
  const child = spawn(process.execPath, args, { cwd, env, stdio: 'inherit' });
  children.push(child);

  return child;
}

function finish(child) {
  return new Promise((resolve, reject) => {
    child.on('exit', (code) =>
      code === 0 ? resolve() : reject(new Error(`Process failed: ${code}`)),
    );
    child.on('error', reject);
  });
}

async function ready(url) {
  for (let i = 0; i < 120; i++) {
    try {
      if ((await fetch(url)).ok) {
        return;
      }
    } catch {}

    await new Promise((r) => setTimeout(r, 500));
  }

  throw new Error('Local test server did not become ready.');
}

let started = false;

let resultCode = 0;

try {
  await db.initialise();
  await db.start();
  started = true;
  await db.createDatabase('commuteconnect_test');
  await finish(start(['dist/database/migrate.js'], backend));
  start(['dist/main.js'], backend);
  await ready('http://localhost:3300/api/health');
  start(
    [
      'node_modules/@angular/cli/bin/ng.js',
      'serve',
      '--host',
      'localhost',
      '--port',
      '4300',
      '--proxy-config',
      'tests/proxy.conf.json',
    ],
    frontend,
  );
  await ready('http://localhost:4300');
  await finish(start(['node_modules/@playwright/test/cli.js', 'test'], frontend));
} catch (error) {
  console.error(error);
  resultCode = 1;
} finally {
  for (const child of children) {
    if (child.exitCode === null) {
      child.kill('SIGTERM');
      await new Promise((resolve) => {
        child.once('exit', resolve);
        setTimeout(resolve, 3000).unref();
      });

      if (child.exitCode === null) {
        child.kill('SIGKILL');
      }
    }
  }

  if (started) {
    await db.stop();
  }

  await rm(root, { recursive: true, force: true });
}

process.exit(resultCode);