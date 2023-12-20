const express = require("express");
const storeRoutes = express.Router();
const path = require("path");
const session = require('express-session');
const cookieParser = require('cookie-parser');
app.use(cookieParser());

const accountSid = 'AC6ad8c21167afce2ed9caa64fdc3317b1';
const auth = '758687400ba02d7f42fea4ea443903b';
const authToken = auth + '0'
const client = require('twilio')(accountSid, authToken);


// const cookieParser = require("cookie-parser");
// storeRoutes.use(cookieParser());

storeRoutes.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../../client/pages/store.html"));
});
storeRoutes.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../../client/pages/order.html"));
});


storeRoutes.post("/checkout", (req, res) => {
  const bagItems = req.session.bagItems || [];
  console.log(bagItems)
  
  if (bagItems.length === 0) {
    return res.status(400).send("No bag items to checkout.");
  }

  // Process checkout with bagItems
  console.log("Checkout items:", bagItems);

  const phonenumber = req.cookies.telephone;
  if (!phonenumber) {
    console.log("Telephone cookie is not set.");
    return res.status(400).send("Telephone number is missing.");
  }
  let order = req.session.bagItems

  let phonenumberS = "+47" + phonenumber;
  
  let message = `Your order has been received! Your order will be ready in 10 minutes.\nOrder Details:\n${order}`;
  
  client.messages
    .create({
        body: message,
        messagingServiceSid: 'MGc7c78d76b29a769c368622d0c696c50c',
        to: phonenumberS
    })
    .then(message => console.log(message.sid))
    .catch(error => {
      console.error("Error sending message:", error);
      res.status(500).send("Error in sending message.");
    });

  res.status(201).json({ message: "Checkout successful" });
});


module.exports = storeRoutes;
