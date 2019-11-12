exports.up = function(knex) {
  return knex.schema.createTable("users", table => {
    table.increments("id");
    table.string("email", 255).notNullable();
    table.unique("email");
    table.specificType("password", "CHAR(60)").notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("users");
};
