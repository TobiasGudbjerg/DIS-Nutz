const express = require("express");
const storeRoutes = express.Router();

const cookieParser = require("cookie-parser");
storeRoutes.use(cookieParser());

storeRoutes.post("/checkout", (req, res) => {
  
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
