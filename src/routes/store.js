const express = require("express");
const storeRoutes = express.Router();
const path = require("path");

const cookieParser = require("cookie-parser");
storeRoutes.use(cookieParser());

storeRoutes.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../../client/pages/store.html"));
});

storeRoutes.post("/checkout", (req, res) => {
  const username = req.cookies.user; // Access the username from the cookie

  console.log('User:', username);
  
  console.log(req.cookies);
  const bag = req.cookies.bagItems;
  const bagSplit = bag.split(",");

  bagSplit.forEach((item) => {
    console.log(item);
  });

  console.log(bagSplit);

  res.status(201).json({});
});

module.exports = storeRoutes;
