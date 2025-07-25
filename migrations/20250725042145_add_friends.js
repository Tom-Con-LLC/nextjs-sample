exports.up = function (knex) {
  return knex.schema.createTable("friends", function (table) {
    table.increments();
    table.string("name", 20);
    table.string("description", 1024);
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("friends");
};
