import {MigrationInterface, QueryRunner} from "typeorm";

export class createVotesTable1626167162551 implements MigrationInterface {
    name = 'createVotesTable1626167162551'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "votes" ADD "postId" integer`);
        await queryRunner.query(`ALTER TABLE "votes" ADD CONSTRAINT "FK_b5b05adc89dda0614276a13a599" FOREIGN KEY ("postId") REFERENCES "post"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "votes" DROP CONSTRAINT "FK_b5b05adc89dda0614276a13a599"`);
        await queryRunner.query(`ALTER TABLE "votes" DROP COLUMN "postId"`);
    }

}
