const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const schema = new Schema(
    {
        srno:{
            type:Number,
            
        },
        name:{
            type:String,
            required:true
        },
        brand:{
            type:String,
            required:true
        },
        imagepath1:{
            type:String
        },
        imagepath2:{
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
const men = mongoose.model("men", schema);
module.exports = men;