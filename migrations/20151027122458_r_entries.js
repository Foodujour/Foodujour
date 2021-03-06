exports.up = function(knex, Promise) {
  return knex.schema.createTable('entries', function (ent) {
    ent.increments('id').primary();
    ent.integer('meal_id').notNullable();
    ent.string('name', 255).notNullable();
    ent.integer('rating');
    ent.string('notes', 255);
    ent.string('image', 255);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('entries');
};
