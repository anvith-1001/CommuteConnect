import { MigrationInterface, QueryRunner } from 'typeorm';

export class Notifications1789400000000 implements MigrationInterface {
  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TYPE commuteconnect.notifications_type_enum AS ENUM (
        'interest_accepted',
        'new_message'
      );

      CREATE TABLE commuteconnect.notifications (
        id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        "userId" uuid NOT NULL
          REFERENCES commuteconnect.users(id) ON DELETE CASCADE,
        type commuteconnect.notifications_type_enum NOT NULL,
        "postId" uuid NOT NULL
          REFERENCES commuteconnect.posts(id) ON DELETE CASCADE,
        "interestId" uuid NOT NULL
          REFERENCES commuteconnect.interests(id) ON DELETE CASCADE,
        title varchar(120) NOT NULL,
        body varchar(240) NOT NULL,
        "readAt" timestamptz,
        "createdAt" timestamptz NOT NULL DEFAULT now()
      );

      CREATE INDEX notifications_user_unread
        ON commuteconnect.notifications("userId", "createdAt" DESC)
        WHERE "readAt" IS NULL;

      REVOKE ALL ON commuteconnect.notifications FROM PUBLIC;

      DO $$
      BEGIN
        IF EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'anon') THEN
          EXECUTE 'REVOKE ALL ON commuteconnect.notifications FROM anon';
        END IF;

        IF EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'authenticated') THEN
          EXECUTE 'REVOKE ALL ON commuteconnect.notifications FROM authenticated';
        END IF;
      END $$;
    `);
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP TABLE commuteconnect.notifications;
      DROP TYPE commuteconnect.notifications_type_enum;
    `);
  }
}