const express = require("express");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const {MONGO_URL,SECRETE} = require('./keys')
const jwt=require("jsonwebtoken")
const port =process.env.PORT || 5000;
const cors =require('cors')


const app=express();
app.use(bodyparser.json())
app.use(cors())

//importing register router
const registerRoute=require('./routes/register')
//importing login router
const loginRoute=require('./routes/login');
//importing product router 
const productRouter = require("./routes/product")

//importing userProduct router
const userProductROuter = require("./routes/userProduct")


mongoose.connect(MONGO_URL)
const db =mongoose.connection;

db.on("error", console.error.bind(console, "connection error: "));

db.once("open", function () {
  console.log("Connected successfully");
});
//authentication 
app.use("/api", (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  //console.log(req.headers.authorization)
  var token = req.headers.authorization.split("test ")[1];
  console.log(token)
  //console.log(token)
  if (!token) {
    return res.status(401).json({
      status: "failed",
      message: "Token is missing",
    });
  }
  //verify the token
  jwt.verify(token, SECRETE, async  (err, decoded)=> {
    if (err) {
      return res.status(401).json({
        status: "failed",
        message: "Invalid token",
      });
    }
    console.log(decoded)
    req.user = decoded.data;
    next();
  });
});
//register
app.use('/register',registerRoute);
//login
app.use('/login',loginRoute);
//product 
app.use('/api/products',productRouter)

app.use("/api/userproducts",userProductROuter)

//listening to port
app.listen(port,()=>{
    console.log("server started")
})

//{"productName":"" Laptops","price":109.95,"description":"Your perfect pack for everyday use and walks in the forest.,"category":"men's clothing","img":"https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg"}