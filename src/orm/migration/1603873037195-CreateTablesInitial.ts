import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateTablesInitial1603873037195 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "Users", 
            columns: [
            {
                name:"id",
                type:"int",
                isGenerated: true,
                isPrimary: true,
                generationStrategy: "increment"
            },
            {
                name: "Username",
                type: "varchar",
                length:"40",
                isUnique: true
            },
            {
                name: "FirstName",
                type: "varchar",
                length:"256"
            },
            {
                name: "LastName",
                type:"varchar",
                length:"256"
            },
            {
                name: "Email",
                type: "varchar",
                length: "256"
            },
            {
                name: "PasswordMD5",
                type: "varchar",
                length:"256"

            }]
        }), true);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("Users");
    }

}
