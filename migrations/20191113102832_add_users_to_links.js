exports.up = function(knex) {
  return knex.schema.table("links", table => {
    table
      .integer("user_id")
      .references("id")
      .inTable("users");
  });
};

exports.down = function(knex) {
  return knex.schema.table("links", table => {
    table.dropColumn("user_id");
  });
};
