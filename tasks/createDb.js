const knex = require('knex')({
  client: 'postgresql',
  connection: {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
  }
});

knex.raw('CREATE DATABASE not_bitly_development').then(() => {
  console.log('done');
});
