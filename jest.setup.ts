import { Connection } from 'typeorm';
import connect from './src/core/infra/typeorm/index';

let connection: Connection;
beforeAll(async () => {
  connection = await connect();
});

afterAll(async () => {
  await connection.close();
});