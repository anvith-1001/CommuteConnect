import { MigrationInterface, QueryRunner } from 'typeorm';

export class ActiveUserEmail1789600000000 implements MigrationInterface {
  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE commuteconnect.users
        DROP CONSTRAINT IF EXISTS users_email_key;

      CREATE UNIQUE INDEX users_active_email
        ON commuteconnect.users(email)
        WHERE "deletedAt" IS NULL;
    `);
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP INDEX IF EXISTS commuteconnect.users_active_email;

      ALTER TABLE commuteconnect.users
        ADD CONSTRAINT users_email_key UNIQUE (email);
    `);
  }
}