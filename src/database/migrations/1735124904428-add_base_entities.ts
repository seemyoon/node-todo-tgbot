import { MigrationInterface, QueryRunner } from "typeorm";

export class AddBaseEntities1735124904428 implements MigrationInterface {
    name = 'AddBaseEntities1735124904428'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Task" ("id" SERIAL NOT NULL, "title" text NOT NULL, "isCompleted" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_95d9364b8115119ba8b15a43592" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "Task"`);
    }

}
