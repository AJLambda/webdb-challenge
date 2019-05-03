const db = require("../data/dbConfig.js");

module.exports = {
  find,
  findById,
  add
};

function find() {
  return db("actions");
}

function findById(id) {
  return db("actions").where({ id });
}

function add(action) {
  return db("actions")
    .insert(action, "id")
    .then(([id]) => {
      return findById(id);
    });
}
