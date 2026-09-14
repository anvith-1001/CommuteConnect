import { migrationErrorMessage } from './migration-error';

async function migrate() {
  // Load configuration inside the error boundary, including the optional CA file.
  const { default: dataSource } = await import('./data-source');

  try {
    await dataSource.initialize();
    await dataSource.query('CREATE SCHEMA IF NOT EXISTS commuteconnect');

    const migrations = await dataSource.runMigrations({ transaction: 'all' });

    console.info(
      migrations.length
        ? `Applied ${migrations.length} migration(s) successfully.`
        : 'Database is up to date. No migrations needed.',
    );
  } finally {
    if (dataSource.isInitialized) {
      await dataSource.destroy();
    }
  }
}

void migrate().catch((error: unknown) => {
  console.error(migrationErrorMessage(error));
  process.exitCode = 1;
});