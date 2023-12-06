const express = require("express");
const storeRoutes = express.Router();
const path = require("path");

// const cookieParser = require("cookie-parser");
// storeRoutes.use(cookieParser());

storeRoutes.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../../client/pages/store.html"));
});


storeRoutes.post("/checkout", (req, res) => {
  const bagItems = req.session.bagItems || [];
  
  if (bagItems.length === 0) {
    return res.status(400).send("No bag items to checkout.");
  }

  // Process checkout with bagItems
  console.log("Checkout items:", bagItems);

  // Når vi finner ut av det

  res.status(201).json({ message: "Checkout successful" });
});




module.exports = storeRoutes;
