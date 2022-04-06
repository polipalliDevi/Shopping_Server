const express= require('express');
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const bcrypt = require("bcrypt");
const jwt= require("jsonwebtoken");
const {SECRETE}= require("../keys");


const User = require("../models/userSchema");
const router=express.Router();


router.use(bodyparser())


//login
router.post("/",async(req,res)=>{
    console.log(req.body);
    try {
        const {email,password}=req.body;
        console.log(email,password)
        var exist=email;
        if(email){
            const Email=await User.findOne({
                email:email               
            });
            exist=Email;
            if(!Email){
                return res.status(401).json({
                    status: "failed",
                    message: "invalid email"
                });
            }
        } 
        bcrypt.compare(password,exist.password).then((result)=>{
            if(result){
                var token =jwt.sign({
                    exp:Math.floor(Date.now()/1000)+ 60*60,
                    data:String (exist._id)
                },SECRETE)
                res.status(200).json({
                    status:"success",
                    message:"login successfully",
                    token
                })
            }else{
                res.status(401).json({
                    status:"failed",
                    message:"not authenticated"
                });
            }
        });

    } catch (error) {
        res.json({
            status:"fail",
            message:error.message
        })
    }

})

module.exports = router;