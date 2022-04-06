const mongoose =require('mongoose');
const {Schema}= mongoose;

const userProSchema= new Schema({   
    userId:{type:Schema.Types.ObjectId,ref:"User"}, 
    productName:{type:String,required:true},
    cost:{type:Number,required:true},
    img:{type:String,required:true},
    content:{type:String,required:true},
    type: {type:String,required:true}
})

const UserProduct = mongoose.model("userproducts",userProSchema);
module.exports = UserProduct;