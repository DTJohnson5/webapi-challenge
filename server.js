const express = require("express");
const server = express();

const aRouter = require("./actions/actionsRouter.js");
const tRouter = require("./projects/projectRouter.js");

server.use(express.json());
server.use(logger);
server.use("/actions", aRouter);
server.use("/projects", tRouter);


server.get("/", (req, res) => {
  res.status(200).json({ api: "I've got a lovely bunch of coconuts.. a dededidee..." });
});


function logger(req, res, next) {
  console.log(
    `[${new Date().toISOString()}] ${req.method} to ${req.url} from ${req.get(
      "host"
    )}`
  );
  next();
}

module.exports = server;