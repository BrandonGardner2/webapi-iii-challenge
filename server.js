const express = require("express");
const server = express();

const userRouter = require("./routes/user-router");
const postsRouter = require("./routes/posts-router");

//Middleware
server.use(express.json());

//Routing Middleware
server.use("/api/users", userRouter);
server.use("/api/posts", postsRouter);

module.exports = server;
