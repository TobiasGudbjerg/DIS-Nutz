// routes/chatRoutes.js

const express = require('express');
const router = express.Router();
const path = require('path');
const session = require('express-session');
const cookieParser = require('cookie-parser');

router.use(cookieParser());

router.get("/chat", (req, res) => {
  const userCookie = req.cookies.user;
  console.log(userCookie);
  res.sendFile(path.join(__dirname, "../../client/pages/chat.html"));
});

module.exports = router;
