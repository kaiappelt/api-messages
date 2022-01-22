require("dotenv/config");

module.exports = {
  type: "postgres",
  url: "postgres://ubbpdsxrkmqpnh:6f820abb5284cca65a16ab5e624b00f605271c9d5cc543533c15453a43f2c1b3@ec2-44-198-214-172.compute-1.amazonaws.com:5432/d61qq2n55fgocc",
  // host: process.env.DB_HOST,
  // port: process.env.DB_PORT,
  // username: process.env.DB_USERNAME,
  // password: process.env.PASSWORD,
  // database: process.env.DB_DATABASE,
  entities: ["./dist/features/**/entities/*.js"],
  migrations: ["./dist/core/infra/typeorm/migrations/*.js"],
  cli: {
    migrationsDir: "./dist/core/infra/typeorm/migrations",
  },
  synchronize: false,
  extra: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
};