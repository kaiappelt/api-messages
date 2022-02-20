require('dotenv/config');

let NODE_ENV = process.env.NODE_ENV;
let DB_TYPE = process.env.DB_TYPE;
let DB_URL = process.env.DB_URL_APP;

let ENTITIES = process.env.ENTITIES;
let MIGRATIONS = process.env.MIGRATIONS;
let MIGRATIONS_DIR = process.env.MIGRATIONS_DIR;

if (NODE_ENV == 'test') {
  DB_URL = process.env.DB_URL_TESTS
}

module.exports = {
  type: DB_TYPE,
  url: DB_URL,

  entities: [ENTITIES],
  migrations: [MIGRATIONS],
  cli: {
    migrationsDir: MIGRATIONS_DIR,
  },
  extra: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
  synchronize: false,
};