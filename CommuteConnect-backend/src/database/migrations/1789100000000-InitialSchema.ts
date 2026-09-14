import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialSchema1789100000000 implements MigrationInterface {
  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE SCHEMA IF NOT EXISTS commuteconnect;

      CREATE TYPE commuteconnect.users_sex_enum AS ENUM (
        'female',
        'male',
        'other',
        'prefer_not_to_say'
      );

      CREATE TYPE commuteconnect.interests_status_enum AS ENUM (
        'pending',
        'accepted',
        'declined',
        'withdrawn'
      );

      CREATE TABLE commuteconnect.users (
        id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        name varchar(100) NOT NULL,
        email varchar(254) NOT NULL UNIQUE,
        "passwordHash" varchar NOT NULL,
        dob date NOT NULL,
        sex commuteconnect.users_sex_enum NOT NULL,
        "createdAt" timestamptz NOT NULL DEFAULT now(),

        CONSTRAINT normalized_email CHECK (
          email = lower(trim(email))
        )
      );

      CREATE TABLE commuteconnect.posts (
        id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        "ownerId" uuid NOT NULL
          REFERENCES commuteconnect.users(id) ON DELETE CASCADE,
        origin varchar(120) NOT NULL,
        destination varchar(120) NOT NULL,
        "departureAt" timestamptz NOT NULL,
        seats integer NOT NULL CHECK (seats BETWEEN 1 AND 8),
        notes text NOT NULL DEFAULT '' CHECK (length(notes) <= 1000),
        "deletedAt" timestamptz,
        "createdAt" timestamptz NOT NULL DEFAULT now(),
        "updatedAt" timestamptz NOT NULL DEFAULT now(),

        CONSTRAINT different_locations CHECK (
          lower(trim(origin)) <> lower(trim(destination))
        )
      );

      CREATE TABLE commuteconnect.interests (
        id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        "postId" uuid NOT NULL
          REFERENCES commuteconnect.posts(id) ON DELETE CASCADE,
        "userId" uuid NOT NULL
          REFERENCES commuteconnect.users(id) ON DELETE CASCADE,
        status commuteconnect.interests_status_enum NOT NULL DEFAULT 'pending',
        "createdAt" timestamptz NOT NULL DEFAULT now(),
        "updatedAt" timestamptz NOT NULL DEFAULT now(),

        UNIQUE ("postId", "userId")
      );

      CREATE TABLE commuteconnect.sessions (
        id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        "userId" uuid NOT NULL
          REFERENCES commuteconnect.users(id) ON DELETE CASCADE,
        "tokenHash" varchar NOT NULL,
        "expiresAt" timestamptz NOT NULL,
        "revokedAt" timestamptz,
        "createdAt" timestamptz NOT NULL DEFAULT now()
      );

      CREATE INDEX posts_owner
        ON commuteconnect.posts("ownerId");

      CREATE INDEX posts_departure
        ON commuteconnect.posts("departureAt", id)
        WHERE "deletedAt" IS NULL;

      CREATE INDEX interests_user
        ON commuteconnect.interests("userId", status);

      CREATE INDEX interests_post
        ON commuteconnect.interests("postId", status);

      CREATE INDEX sessions_user
        ON commuteconnect.sessions("userId");

      CREATE INDEX sessions_expiry
        ON commuteconnect.sessions("expiresAt");

      REVOKE ALL ON SCHEMA commuteconnect FROM PUBLIC;
      REVOKE ALL ON ALL TABLES IN SCHEMA commuteconnect FROM PUBLIC;
    `);

    // Private schema: browser Supabase roles never receive database access.
    await queryRunner.query(`
      DO $$
      BEGIN
        IF EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'anon') THEN
          EXECUTE 'REVOKE ALL ON SCHEMA commuteconnect FROM anon';
          EXECUTE 'REVOKE ALL ON ALL TABLES IN SCHEMA commuteconnect FROM anon';
        END IF;

        IF EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'authenticated') THEN
          EXECUTE 'REVOKE ALL ON SCHEMA commuteconnect FROM authenticated';
          EXECUTE 'REVOKE ALL ON ALL TABLES IN SCHEMA commuteconnect FROM authenticated';
        END IF;
      END $$;
    `);
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP TABLE commuteconnect.sessions;
      DROP TABLE commuteconnect.interests;
      DROP TABLE commuteconnect.posts;
      DROP TABLE commuteconnect.users;

      DROP TYPE commuteconnect.interests_status_enum;
      DROP TYPE commuteconnect.users_sex_enum;
    `);
  }
}