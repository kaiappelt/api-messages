# api-messages
Back-End de um sistema de recados com cadastro e autenticação de usuários, utilizando Node.js com Typescript, TypeORM, PostgreSQL.

# Acesso aos arquivos:
##### main.ts: core/presentation/http/main.ts
#####routes: core/presentation/http/routes/index.ts

##### Conexão com banco de dados: core/infra/typeorm/index.ts
##### Migrations: core/infra/typeorm/migrations

Nos módulos da api (src/modules), foram separadas as responsabilidades nas camadas:
domain, infra e presentation. Também está desacoplada a dependência das funções de ORM nos repositories e services utilizando conceitos de injeção de dependências e inversão de dependências.

