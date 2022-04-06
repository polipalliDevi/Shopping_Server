const express=require('express');
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const router=express.Router();

router.use(bodyparser());

//Model-Product

const Product=require("../models/productSchema")

router.post('/',async function(req,res){
    try {
        const {productNumber,title,price,description,category,image}=req.body;
        const product=await Product.create({
            productNumber,
            title,
            price,
            description,
            category,
            image
            
        })
        console.log(product)
        return res.status(200).json({
            status:"success",
            message:"product created",
            product
        })
    } catch (error) {
        res.status(500).json({
            status:"failed",
            error:error.message,

        })
    }

})

//getting all products
router.get('/',async function(req,res){    
    try {
        const products= await Product.find()
        //console.log(products);
        return res.status(200).json({
            status:"sucess",
            products
        })

    } catch (error) {
        res.status(500).json({
            status:"failed",
            error:error.message
        })
    }

})

router.get('/:id',async function(req,res){    
    try {
        const product= await Product.findOne({_id:req.id})
        console.log(product);
        return res.status(200).json({
            status:"sucess",
            product
        })

    } catch (error) {
        res.status(500).json({
            status:"failed",
            error:error.message
        })
    }

})



module.exports=router;
