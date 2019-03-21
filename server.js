const express = require("express");
const helmet = require("helmet");

const server = express();

const userRouter = require("./routes/user-router");
const postsRouter = require("./routes/posts-router");

//Middleware
function upperCaseName(req, res, next) {
  if (req.body.name) {
    req.body.name = req.body.name.toUpperCase();
  }
  next();
}

server.use(helmet());
server.use(express.json());
server.use(upperCaseName);

//Routing Middleware
server.use("/api/users", userRouter);
server.use("/api/posts", postsRouter);

module.exports = server;
