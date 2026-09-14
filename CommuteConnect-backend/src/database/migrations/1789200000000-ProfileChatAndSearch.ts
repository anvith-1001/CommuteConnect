import { MigrationInterface, QueryRunner } from 'typeorm';

export class ProfileChatAndSearch1789200000000 implements MigrationInterface {
  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE EXTENSION IF NOT EXISTS pg_trgm;

      ALTER TABLE commuteconnect.users
        ALTER COLUMN dob DROP NOT NULL,
        ALTER COLUMN sex DROP NOT NULL,
        ADD COLUMN "deletedAt" timestamptz;

      CREATE TABLE commuteconnect.messages (
        id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        "interestId" uuid NOT NULL
          REFERENCES commuteconnect.interests(id) ON DELETE CASCADE,
        "senderId" uuid NOT NULL
          REFERENCES commuteconnect.users(id) ON DELETE CASCADE,
        body text NOT NULL CHECK (length(trim(body)) BETWEEN 1 AND 1000),
        "createdAt" timestamptz NOT NULL DEFAULT now()
      );

      CREATE INDEX messages_interest_created
        ON commuteconnect.messages("interestId", "createdAt", id);

      CREATE INDEX messages_sender
        ON commuteconnect.messages("senderId");

      CREATE INDEX posts_origin_trgm
        ON commuteconnect.posts USING gin (lower(origin) gin_trgm_ops);

      CREATE INDEX posts_destination_trgm
        ON commuteconnect.posts USING gin (lower(destination) gin_trgm_ops);

      REVOKE ALL ON commuteconnect.messages FROM PUBLIC;

      DO $$
      BEGIN
        IF EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'anon') THEN
          EXECUTE 'REVOKE ALL ON commuteconnect.messages FROM anon';
        END IF;

        IF EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'authenticated') THEN
          EXECUTE 'REVOKE ALL ON commuteconnect.messages FROM authenticated';
        END IF;
      END $$;
    `);
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP INDEX commuteconnect.posts_destination_trgm;
      DROP INDEX commuteconnect.posts_origin_trgm;
      DROP TABLE commuteconnect.messages;

      ALTER TABLE commuteconnect.users
        DROP COLUMN "deletedAt",
        ALTER COLUMN sex SET NOT NULL,
        ALTER COLUMN dob SET NOT NULL;
    `);
  }
}