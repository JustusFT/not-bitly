exports.up = function(knex) {
  return knex.schema.createTable('links', table => {
    table.increments('id');
    table.text('original_url').notNullable();
    table.string('hashid', 255);
    table.unique('hashid');
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('links');
};
