# api-messages

Back-End de um sistema de recados com cadastro e autenticação de usuários, utilizando Node.js com Typescript, TypeORM, PostgreSQL.

# Acesso aos arquivos:

##### main.ts: core/presentation/http/main.ts

##### routes: core/presentation/http/routes/index.ts

##### Conexão com banco de dados: core/infra/database/index.ts

##### Migrations: core/infra/database/migrations

##### Para executar os testes, utilizar outro banco PostgreSQL separado do que executa a aplicação. Inserir os dados dos bancos no .env.

DB_TYPE=postgres
DB_URL_APP=
DB_URL_TESTS=
