const express = require("express");
const storeRoutes = express.Router();
const path = require("path");

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

  let phonenumber = req.session.telephone 
  let phonenumberS = (phonenumber).toString();
  console.log(phonenumberS)
  let order = req.session.bagItems
  
  let message = `Your order has been received! Your order will be ready in 10 minutes.\nOrder Details:\n${order}`;
  
  client.messages
    .create({
        body: message ,
        messagingServiceSid: 'MGc7c78d76b29a769c368622d0c696c50c',
        to: "+47" + phonenumberS
    })
    .then(message => console.log(message.sid))
    .done();

  // Når vi finner ut av det

  res.status(201).json({ message: "Checkout successful" });
});



module.exports = storeRoutes;
