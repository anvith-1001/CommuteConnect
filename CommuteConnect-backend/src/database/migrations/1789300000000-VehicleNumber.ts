import { MigrationInterface, QueryRunner } from 'typeorm';

export class VehicleNumber1789300000000 implements MigrationInterface {
  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE commuteconnect.posts
        ADD COLUMN "vehicleNumber" varchar(20) NOT NULL DEFAULT 'UNAVAILABLE';

      ALTER TABLE commuteconnect.posts
        ALTER COLUMN "vehicleNumber" DROP DEFAULT,
        ADD CONSTRAINT posts_vehicle_number_format
          CHECK ("vehicleNumber" ~ '^[A-Z0-9]{4,20}$');
    `);
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE commuteconnect.posts
        DROP CONSTRAINT posts_vehicle_number_format,
        DROP COLUMN "vehicleNumber";
    `);
  }
}