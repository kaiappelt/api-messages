import { Connection, QueryRunner } from 'typeorm';
import connect from './src/core/infra/database/index';

let connection: Connection;
beforeAll(async () => {
  connection = await connect();

  const queryRunner: QueryRunner = connection.createQueryRunner();

  await queryRunner.query("TRUNCATE users, messages");
});

afterAll(async () => {
  await connection.close();
});