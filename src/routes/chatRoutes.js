// routes/chatRoutes.js

const express = require('express');
const router = express.Router();
const path = require('path');
const session = require('express-session');
const cookieParser = require('cookie-parser');

// Use cookieParser middleware
router.use(cookieParser());

router.get("/chat", (req, res) => {
  // Access cookies like this:
  const userCookie = req.cookies.user;
  console.log(userCookie); // This will log the 'user' cookie value
  res.sendFile(path.join(__dirname, "../../client/pages/chat.html"));
});

// Additional chat-related routes can go here

module.exports = router;
