const express = require("express");
const BodyParser = require('body-parser');
const cors = require("cors");
const path = require("path");
const { response } = require("express")
const axios = require("axios")

const app = express();

const customerRoute = require("./routes/customer");
const storeRoutes = require("./routes/store");

const http = require("http").Server(app);
const io = require("socket.io")(http);

const chatLog = require("./db/chat.js");

// Middlewares

app.use(cors());
app.use(express.json());
app.use(BodyParser.json())
app.use(BodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, "../client")));

// Send client files from server

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/pages/home.html"));
});

app.get("/global.css", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/styles/global.css"));
});

app.get("/chat", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/pages/chat.html"));
});

app.get("/store", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/pages/store.html"));
});

app.get("/home.js", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/scripts/home.js"));
});

// app.get("/chatlog", (req, res) => {
//   res.send(chatLog);
// });

// API

app.use("/customer", customerRoute);
app.use("/store", storeRoutes);

// Start server

app.listen(3000, () => {
  console.log("Server open on port 3000");
});

// Socket IO

/*
io.on("connection", (socket) => {
  socket.on("chat message", (msg) => {
    io.emit("chat message", msg);
    chatLog.push(msg);
  });
  socket.on("user joined", (username) => {
    console.log(username + " joined the chat");
    io.emit("chat message", username + " joined the chat");
  });
});

http.listen(3000, "localhost", () => {
  console.log(`Socket.IO server running at http://localhost:3000/`);
});
*/