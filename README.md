# Api Rest - NodeJs
### Stack: Vue, Bootstrap, Express, Postgres
### Host: Heroku | Database: ElephantSQL

---
### Instalação

- Código fonte:
>git clone https://github.com/izichtl/crudNodejsTeste.git

- Instale as dependências:
>npm install

- Crie e configure o banco de dados:
> siga os passos listados abaixo

- Teste as rotas de usuário:
> npm test

- Rode a aplicação:
> npm start
---
### Configuração do banco de dados - ElephantSQL

- Cadastre-se ==> www.elephantsql.com

- Crie uma database ==> /Instance

- Crie a tablela users ==> /SQLBrowser

>CREATE TABLE users ( user_id serial PRIMARY KEY, user_name VARCHAR(255) NOT NULL, user_email VARCHAR(255) UNIQUE NOT NULL);

- Copie URL de conexão do Postgres e subistitua no arquivo .env

---
### Rotas

- GET /user Retorna todos os usuários.

- POST /user Cadastra usuário.

- PUT /user/:user_id Atualiza usuário

- DELETE /user/:user_id Remove usuário pelo id.
---
### Padrão JSON
user_name | Deve conter apenas letras.

user_email  | Deve ser um padrão válido de email.

>{
"user_name": "Nome do Usuário",
"user_email": "Email do Usuário"
}
---

#### Falta fazer
- Tratar retorno Front-end. 
- Tratar erros de cadastro. 
---
Desenvolvido por izichtl@gmail.com 