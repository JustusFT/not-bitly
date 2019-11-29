const knex = require('knex')({
  client: 'postgresql',
  connection:
    process.env.NODE_ENV == 'development'
      ? {
          user: process.env.DB_USER,
          password: process.env.DB_PASSWORD
        }
      : process.env.DATABASE_URL
});

Promise.all([
  knex.raw('DROP DATABASE not_bitly_development'),
  knex.raw('DROP DATABASE not_bitly_production')
])
  .then(() => {
    console.log('dropped database');
  })
  .finally(() => {
    knex.destroy();
  });
