const express = require("express");
const storeRoutes = express.Router();
const path = require("path");
const accountSid = 'AC6ad8c21167afce2ed9caa64fdc3317b1';
const authToken = 'd80117152d9bf89e72d4c4ab6b97cb38';
const client = require('twilio')(accountSid, authToken);


// const cookieParser = require("cookie-parser");
// storeRoutes.use(cookieParser());

storeRoutes.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../../client/pages/store.html"));
});


storeRoutes.post("/checkout", (req, res) => {
  const bagItems = req.session.bagItems || [];
  console.log(bagItems)
  
  if (bagItems.length === 0) {
    return res.status(400).send("No bag items to checkout.");
  }

  // Process checkout with bagItems
  console.log("Checkout items:", bagItems);
  
  client.messages
    .create({
        body: 'hei',
        messagingServiceSid: 'MGc7c78d76b29a769c368622d0c696c50c',
        to: '+4792227563'
    })
    .then(message => console.log(message.sid))
    .done();

  // Når vi finner ut av det

  res.status(201).json({ message: "Checkout successful" });
});



module.exports = storeRoutes;
