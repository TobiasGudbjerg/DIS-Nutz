// routes/order.js

const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const session = require('express-session');


router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../../client/pages/order.html"));
  });


module.exports = router;