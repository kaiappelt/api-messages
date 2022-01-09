# api-messages
Back-End de um sistema de recados com cadastro e autenticação de usuários, utilizando Node.js com Typescript, TypeORM, PostgreSQL.

# Acesso aos arquivos:
main.ts: shared/infra/http/main.ts
routes: shared/infra/http/routes/index.ts

Conexão com banco de dados: shared/infra/typeorm/index.ts
Migrations: shared/infra/typeorm/migrations

Nos módulos da api (src/modules), foram separadas as responsabilidades nas camadas:
domain, infra e services. Também está desacoplada a dependência das funções de ORM nos repositories e services utilizando conceitos de injeção de dependências e inversão de dependências.

# domain: 
Contém as interfaces/estrutura dos arquivos utilizados;

# infra: 
Contém os controllers e routes em infra/http e repositórios e entidade em infra/typeorm;

# services:
Serviços no qual a controller vai consumir;


