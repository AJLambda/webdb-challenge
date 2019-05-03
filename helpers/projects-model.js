const db = require("../data/dbConfig.js");

module.exports = {
  find,
  findById,
  findProjectActions,
  add
};

function find() {
  return db("projects");
}

function findById(id) {
  return db("projects")
    .select(
      "projects.id",
      "projects.project_name as name",
      "projects.project_description as description",
      "projects.completed"
    )
    .where({ "projects.id": id });
}

function findProjectActions(projectId) {
  return db("actions")
    .select(
      "actions.id as id",
      "actions.actions_description as description",
      "actions.action_notes as notes",
      "actions.completed as completed"
    )
    .where({ project_id: projectId });
}

function add(project) {
  return db("projects")
    .insert(project, "id")
    .then(([id]) => {
      return findById(id);
    });
}
