exports.up = function(knex) {
  return (
    knex.schema
      .createTable('links', table => {
        table.increments('id');
        table.text('original_url').notNullable();
        table.string('hashid', 255).notNullable();
        table.unique('hashid');
      })
      // Generate the hash id when inserting a new link
      .raw(`CREATE extension pg_hashids;`)
      .raw(
        `
          CREATE FUNCTION links_set_hashid() RETURNS trigger AS $$
            BEGIN
                NEW.hashid := id_encode(NEW.id, '??', 3);
                RETURN NEW;
            END;
          $$ LANGUAGE plpgsql;
        `,
        [
          // TODO use env var
          '7ReZakJpZ9Zmczvf'
        ]
      ).raw(`
        CREATE TRIGGER links_before_insert
        BEFORE INSERT ON links
        FOR EACH ROW
        EXECUTE PROCEDURE links_set_hashid()
      `)
  );
};

exports.down = function(knex) {
  return knex.schema.dropTable('links').raw(`
    DROP EXTENSION pg_hashids;
    DROP FUNCTION links_set_hashid();
  `);
};
