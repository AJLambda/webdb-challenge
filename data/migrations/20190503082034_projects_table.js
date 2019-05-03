//  A project can contain multiple actions and has:
exports.up = function(knex, Promise) {
  return knex.schema.createTable("projects", tbl => {
    // a unique Id (PK)
    tbl.increments();

    // a name
    tbl
      .string("project_name", 128)
      .notNullable()
      .unique();

    // a description.
    tbl.string("project_description", 255);

    //  a flag that indicates if the project is complete or not.
    tbl.boolean("completed").defaultTo(0); //  the database will return 1 for true and 0 for false
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("projects");
};
