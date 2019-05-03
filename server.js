const express = require("express");

const helmet = require("helmet");
const server = express();

const parser = express.json();
server.use(parser);
server.use(helmet());

const Projects = require("./helpers/projects-model");
const Actions = require("./helpers/actions-model");

server.get("/", (req, res) => {
  res.status(200).json({ message: "hello" });
});

// get all projects
server.get("/api/projects", async (req, res) => {
  try {
    const projects = await Projects.find();
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving the projects" });
  }
});

// get a project by Id
server.get("/api/projects/:id", async (req, res) => {
  try {
    const project = await Projects.findById(req.params.id);
    const actions = await Projects.findProjectActions(req.params.id);
    if (project) {
      res.status(200).json({ project, actions });
    } else {
      res.status(404).json({ message: "We could not find the project" });
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

// // get a project by Id, return project with action
// server.get("/api/projects/:id/actions", async (req, res) => {
//   try {
//     const action = await Projects.findProjectWithActions(req.params.id);
//     if (action) {
//       res.status(200).json(action);
//     } else {
//       res
//         .status(404)
//         .json({ message: "We could not find the actions for the project" });
//     }
//   } catch (error) {
//     res.status(500).json(error);
//   }
// });

// post a project
server.post("/api/projects", async (req, res) => {
  const project = req.body;

  if (project.project_name) {
    try {
      const inserted = await Projects.add(project);
      res.status(201).json(inserted);
    } catch (error) {
      res.status(500).json({ message: "Error creating the project" });
    }
  } else {
    res.status(400).json({ message: "Please provide name of the project" });
  }
});

// get all actions
server.get("/api/actions", async (req, res) => {
  try {
    const actions = await Actions.find();
    res.status(200).json(actions);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving the actions" });
  }
});

// post an action
server.post("/api/actions", async (req, res) => {
  const action = req.body;

  if (action.actions_description && action.project_id) {
    try {
      const inserted = await Actions.add(action);
      res.status(201).json(inserted);
    } catch (error) {
      res.status(500).json({ message: "Error creating the action" });
    }
  } else {
    res
      .status(400)
      .json({ message: "Please provide name and ID of the action" });
  }
});

module.exports = server;
