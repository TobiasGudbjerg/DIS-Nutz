// routes/chatRoutes.js

const express = require('express');
const router = express.Router();
const path = require('path');
const session = require('express-session');
const cookieParser = require('cookie-parser');

// Use cookieParser middleware
router.use(cookieParser());

router.get("/chat", (req, res) => {
    // Here you can access cookies using req.cookies
    const userCookie = req.cookies.user; // Example of accessing a 'user' cookie

    // You can also access session data
    if (req.session.username) {
        console.log("Logged in user:", req.session.username);
    }

    res.sendFile(path.join(__dirname, "../../client/pages/chat.html"));
});

// Additional chat-related routes can go here

module.exports = router;
