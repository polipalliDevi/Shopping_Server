const express= require('express');
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const bcrypt = require("bcrypt");

const User = require("../models/userSchema");

const router=express.Router();

router.use(bodyparser());

//registering user

router.post("/",async (req,res)=>{
    console.log(req.body)
    try {
        const{name,email,password,phone,city}=req.body;
        const existingUser=await User.findOne({email:email});
        if(existingUser){
            return res.send("email already exists")
        }
        bcrypt.hash(password,10,async(err,hash)=>{
            if(err){
                res.status(400).json({
                    status:"failed",
                    message:"invalid details"
                });
            };
            const user = await User.create({
                name,
                email,
                password: hash,
                phone,
                city
            });
            res.status(200).json({
                status:"success",
                user
            })
        })
    } catch (error) {
        res.json({
            status: "fail", 
            message: error.message
        })
    }
})


module.exports=router;