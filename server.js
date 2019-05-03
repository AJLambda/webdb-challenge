const express = require("express");

const helmet = require("helmet");
const server = express();

const parser = express.json();
server.use(parser);
server.use(helmet());

const Projects = require("./helpers/projects-model");
// const Actions = require("./helpers/actions-model");

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

module.exports = server;
