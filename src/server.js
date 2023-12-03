// server.js

const express = require("express");
const bodyParser = require('body-parser');
const cors = require("cors");
const path = require("path");
const session = require("express-session");
const authRoutes = require("./routes/authRoutes"); // Assuming you've got this file in the routes directory
const storeRoutes = require("./routes/store"); // And this one too

const app = express();

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

// Use store-related routes
app.use("/store",storeRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
