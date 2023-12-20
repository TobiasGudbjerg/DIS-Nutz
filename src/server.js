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

const app = express();
const httpServer = http.createServer(app);
const io = new Server(httpServer); 

app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false, maxAge: 3600000 }
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
  
  socket.on("chat message", (data) => {
    io.emit("chat message", { user: data.user, message: data.message });
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});


const PORT = 3000;
httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
