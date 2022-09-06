var express = require("express");
const mongoose = require("mongoose");
let body_parser = require("body-parser");
var app = express();
app.use(body_parser.json({limit: '50mb'}));
app.use(body_parser.urlencoded({limit: '50mb', extended: true}));  
mongoose.connect("mongodb://localhost:27017/Shoprite")
app.use(express.json());
app.use(express.static("public"));

const db = mongoose.connection;
db.on("error", error=> console.log(error));
db.on("open", ()=> console.log("Connection Successful"));


app.use((req, res, next)=>{
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Headers","*");
    if(req.method =="OPTIONS")
    {
        res.header("Access-Control-Allow-Methods","POST, GET, PUT, PATCH, DELETE");
        return res.status(200).json({}); 
    }
    next();
});

app.get("/", function(req, res){
    res.send("Hello, welcome to Shoprite");
    res.end();
});

app.get("/hello", function(req, res){
    
    res.send("This is hello page");
    res.end();
});

app.use("/admin", require("./Routes/admin"));

app.listen(8081, function(){
    console.log("Node server started");
});