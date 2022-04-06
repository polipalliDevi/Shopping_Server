const mongoose =require('mongoose');
const {Schema}= mongoose;
 
const productSchema= new Schema({   
    productNumber:{type:Number,required:true}, 
    title:{type:String,required:true},
    price:{type:Number,required:true},
    image:{type:String,required:true},
    description:{type:String,required:true},
    category: {type:String,required:true},
    // rating:[{rate:{type:Number,required:true},
    //     count:{type:Number,required:true}}]
})

const Product = mongoose.model("products",productSchema);
module.exports = Product;