require('dotenv/config');

module.exports = {
    type: "postgres",
    url: "postgres://tgleszvufrznjd:97883aa375dbe8504b065a440203d337d1cbd72a3ab040e712cb23313b18572f@ec2-54-196-105-177.compute-1.amazonaws.com:5432/d6o8144lsb7s2f",

    entities: ["./dist/modules/**/entities/*.ts"],
    migrations: ["./dist/shared/infra/typeorm/migrations/*.ts"],
    cli: {
      "migrationsDir": "./dist/shared/infra/typeorm/migrations"
    },
    synchronize: false,
    extra: {
        ssl: {
            rejectUnauthorized: false,
        },
    },
};