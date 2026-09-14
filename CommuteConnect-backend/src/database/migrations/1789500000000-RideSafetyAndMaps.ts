import { MigrationInterface, QueryRunner } from 'typeorm';

export class RideSafetyAndMaps1789500000000 implements MigrationInterface {
  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TYPE commuteconnect.notifications_type_enum ADD VALUE IF NOT EXISTS 'interest_received';
      ALTER TYPE commuteconnect.notifications_type_enum ADD VALUE IF NOT EXISTS 'ride_started';
      ALTER TYPE commuteconnect.notifications_type_enum ADD VALUE IF NOT EXISTS 'ride_ended';

      CREATE TYPE commuteconnect.posts_ride_status_enum AS ENUM (
        'scheduled',
        'in_progress',
        'completed'
      );

      ALTER TABLE commuteconnect.posts
        ADD COLUMN via varchar(120),
        ADD COLUMN "originLat" double precision,
        ADD COLUMN "originLng" double precision,
        ADD COLUMN "destinationLat" double precision,
        ADD COLUMN "destinationLng" double precision,
        ADD COLUMN "viaLat" double precision,
        ADD COLUMN "viaLng" double precision,
        ADD COLUMN "rideStatus" commuteconnect.posts_ride_status_enum NOT NULL DEFAULT 'scheduled',
        ADD COLUMN "startedAt" timestamptz,
        ADD COLUMN "endedAt" timestamptz;

      UPDATE commuteconnect.posts
      SET "originLat" = 0,
          "originLng" = 0,
          "destinationLat" = 0,
          "destinationLng" = 0;

      ALTER TABLE commuteconnect.posts
        ALTER COLUMN "originLat" SET NOT NULL,
        ALTER COLUMN "originLng" SET NOT NULL,
        ALTER COLUMN "destinationLat" SET NOT NULL,
        ALTER COLUMN "destinationLng" SET NOT NULL;

      ALTER TABLE commuteconnect.interests
        ADD COLUMN "pickupLat" double precision,
        ADD COLUMN "pickupLng" double precision,
        ADD COLUMN "boardedAt" timestamptz,
        ADD COLUMN "otpAttempts" integer NOT NULL DEFAULT 0,
        ADD COLUMN "otpAttemptedAt" timestamptz;

      UPDATE commuteconnect.interests
      SET "pickupLat" = 0,
          "pickupLng" = 0;
    `);
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE commuteconnect.interests
        DROP COLUMN "otpAttemptedAt",
        DROP COLUMN "otpAttempts",
        DROP COLUMN "boardedAt",
        DROP COLUMN "pickupLng",
        DROP COLUMN "pickupLat";

      ALTER TABLE commuteconnect.posts
        DROP COLUMN "endedAt",
        DROP COLUMN "startedAt",
        DROP COLUMN "rideStatus",
        DROP COLUMN "viaLng",
        DROP COLUMN "viaLat",
        DROP COLUMN "destinationLng",
        DROP COLUMN "destinationLat",
        DROP COLUMN "originLng",
        DROP COLUMN "originLat",
        DROP COLUMN via;

      DROP TYPE commuteconnect.posts_ride_status_enum;
    `);
  }
}