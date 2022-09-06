const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const schema = new Schema(
    {
        srno:{
            type:Number,
            required:true
        },
        name:{
            type:String,
            required:true
        },
        brand:{
            type:String,
            required:true
        },
        imagepath:{
            type:String
        },
        description:{
            type:String,
            required:true
        },
        price:{
            type:String,
            required:true
        },
        
    }
);
const women = mongoose.model("women", schema);
module.exports = women;