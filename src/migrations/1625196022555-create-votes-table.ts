import {MigrationInterface, QueryRunner} from "typeorm";

export class createVotesTable1625196022555 implements MigrationInterface {
    name = 'createVotesTable1625196022555'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "votes" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "value" integer NOT NULL, "username" character varying NOT NULL, "commentId" integer, CONSTRAINT "PK_f3d9fd4a0af865152c3f59db8ff" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "post" DROP CONSTRAINT "FK_57e75616264342b9a2637cfbfb9"`);
        await queryRunner.query(`ALTER TABLE "post" ALTER COLUMN "username" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "votes" ADD CONSTRAINT "FK_79326ff26ef790424d820d54a72" FOREIGN KEY ("username") REFERENCES "users"("username") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "votes" ADD CONSTRAINT "FK_554879cbc33538bf15d6991f400" FOREIGN KEY ("commentId") REFERENCES "comments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "post" ADD CONSTRAINT "FK_57e75616264342b9a2637cfbfb9" FOREIGN KEY ("username") REFERENCES "users"("username") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "post" DROP CONSTRAINT "FK_57e75616264342b9a2637cfbfb9"`);
        await queryRunner.query(`ALTER TABLE "votes" DROP CONSTRAINT "FK_554879cbc33538bf15d6991f400"`);
        await queryRunner.query(`ALTER TABLE "votes" DROP CONSTRAINT "FK_79326ff26ef790424d820d54a72"`);
        await queryRunner.query(`ALTER TABLE "post" ALTER COLUMN "username" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "post" ADD CONSTRAINT "FK_57e75616264342b9a2637cfbfb9" FOREIGN KEY ("username") REFERENCES "users"("username") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`DROP TABLE "votes"`);
    }

}
