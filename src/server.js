// server.js

const express = require("express");
const bodyParser = require('body-parser');
const cors = require("cors");
const path = require("path");
const session = require("express-session");
const authRoutes = require("./routes/authRoutes"); 
const storeRoutes = require("./routes/store"); 
const chatRoutes = require("./routes/chatRoutes"); 
const http = require("http"); 
const { Server } = require("socket.io"); 
const sharedsession = require("express-socket.io-session");

const app = express();
const httpServer = http.createServer(app);
const io = new Server(httpServer); 

app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false, maxAge: 3600000 }
}));

const sessionMiddleware = session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false, maxAge: 3600000 }
});

io.use(sharedsession(sessionMiddleware, {
  autoSave: true
}));

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


// Serve static files from the `client` directory
app.use(express.static(path.join(__dirname, "../client")));

// Use the authentication routes
app.use(authRoutes); 

// Use the chat routes
app.use(chatRoutes);

// Use allergies-related routes
app.use("/store",storeRoutes);

// Socket.IO setup
io.on("connection", (socket) => {
  console.log("A user connected");
  let username = socket.handshake.session.username;
  if (username) {
    console.log('Socket connected for user:', username);
  } else {
    console.log('Anonymous socket connection');
  }

  socket.on("chat message", (msg) => {
    io.emit("chat message", msg);
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});


const PORT = 3000;
httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
