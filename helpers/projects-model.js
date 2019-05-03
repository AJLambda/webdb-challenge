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
  return db("projects").where({ "projects.id": id });
}

function findProjectActions(projectId) {
  return db("actions")
    .select(
      "actions.id as action_id",
      "actions.actions_description as action_description",
      "actions.action_notes",
      "actions.completed as action_completed"
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
