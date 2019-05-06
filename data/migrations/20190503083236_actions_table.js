exports.up = function(knex, Promise) {
  return knex.schema.createTable("actions", tbl => {
    // a unique Id (PK)
    tbl.increments().unique();

    // a description of what needs to be done.
    tbl.string("actions_description", 255).notNullable();

    //  a notes column to add additional information.
    tbl.text("action_notes", 255);

    // a foreign key
    tbl
      .integer("project_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("projects")
      .onDelete("RESTRICT")
      .onUpdate("CASCADE");

    //  a flag that indicates if the project is complete or not.
    tbl.boolean("completed").defaultTo(0); //  the database will return 1 for true and 0 for false
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("actions");
};
