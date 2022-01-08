import {MigrationInterface, QueryRunner, TableColumn, TableForeignKey} from "typeorm";

export class AddUserIdToMessages1641668908586 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            "messages",
            new TableColumn({
                name: "user_id",
                type: "uuid",
                isNullable: true
            }),
        );

        await queryRunner.createForeignKey(
            "messages",
            new TableForeignKey({
                name: "userMessageId",
                columnNames: ["user_id"],
                referencedTableName: "users",
                referencedColumnNames: ["id"],
                onDelete: "CASCADE",
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey("messages", "userMessageId");

        await queryRunner.dropColumn("messages", "user_id");
    }

}
