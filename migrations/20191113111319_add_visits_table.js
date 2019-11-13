exports.up = function(knex) {
  return knex.schema.createTable("visits", table => {
    table.increments("id");
    table.timestamps(true, true);
    table
      .integer("link_id")
      .references("id")
      .inTable("links");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("visits");
};
