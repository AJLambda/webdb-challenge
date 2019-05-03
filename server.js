const express = require("express");

const helmet = require("helmet");
const server = express();

const parser = express.json();
server.use(parser);
server.use(helmet());

server.get("/", (req, res) => {
  res.status(200).json({ message: "hello" });
});

module.exports = server;
