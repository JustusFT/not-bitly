const knex = require('knex')({
  client: 'postgresql',
  connection: {
    // TODO use env var
    user: 'postgres',
    password: 'postgres'
  }
});

knex.raw('CREATE DATABASE not_bitly_development').then(() => {
  console.log('done');
});
