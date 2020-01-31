# Adonis API application - Case of Study

Projeto desenvolvido com o objetivo de aperfeiçoar os conhecimentos adquiridos com AdonisJs. Neste projeto, será possível visualizar diversas features que o framework oferece e também algumas outras integrações, como por exemplo, a captura de erros em produção utilizando Sentry.

Principais features relacionadas a este caso de estudo

- Utilização de Jobs para disparo de e-mail em fila pelo Redis
- Banco de dados relacional Postgres
- Tratamento de exceções
- Tratamento de exceções em produção com Sentry
- Utilização de Hooks
- Utilização de Validators


## Setup

Para a execução do projeto, será necessário um banco de dados Postgres, um banco Redis, uma conta na plataforma Sentry, e um serviço de disparo de e-mail. Em posse destes dados, basta configura-los no arquivo .env. 

obs: todos os valores hoje expostos no arquivo .env são apenas valores de teste.

Comandos

```bash
yarn
adonis serve --dev
```

### Migrations

Execute o seguinte comando para rodar as migrações na base de dados
```js
adonis migration:run
```
## Author
Gabriel Grazionale Gomes Fernand
