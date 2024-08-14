/*
// Title: Basic chat application REST API server
// Description: Basic chat application REST API server
// Author: Kiam Khan Limon
// Author email: mdlimon0175@gmail.com
// version: 1.0
// Date: 7/06/2024
*/

const auth = require("json-server-auth");
const jsonServer = require("json-server");
const express = require("express");
const http = require("http");

// app
const app = express();
// server
const server = http.createServer(app);
// socket server
const io = require("socket.io")(server);

global.io = io;

const router = jsonServer.router("db.json");

// helper function for auth user data
// const 

router.render = (req, res) => {
  const path = req.path;
  const method = req.method;
  
  // secure users data
  if(path.includes("/users")) {
    if(method === "GET") {
      const data = res.locals.data.map(({ password, ...rest }) => rest);
      return res.json(data);
    } else {
      if(res.locals.data.hasOwnProperty("password")) {
        delete res.locals.data.password
      }
      return res.json(res.locals.data);
    }
  }

  // emit event for conversation
  if(path.includes("/conversations") && (method === "POST" || method === "PUT")) {
    io.emit("conversation", res.locals.data);
  }

  // emit event for message
  if(path.includes("/messages") && method === "POST") {
    io.emit("message", res.locals.data);
  }

  return res.json(res.locals.data);
}

const middlewares = jsonServer.defaults();
const port = process.env.PORT || 9000;

// Bind the router db to the app
app.db = router.db;

app.use(middlewares);

const rules = auth.rewriter({
  users: 640,
  conversations: 660,
  messages: 660,
});

app.use(rules);
app.use(auth);
app.use(router);

// listen the server
server.listen(port);