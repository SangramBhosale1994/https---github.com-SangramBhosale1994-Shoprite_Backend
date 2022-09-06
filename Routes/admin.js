var express = require("express");
var bodyparser = require("body-parser");
let fs = require("fs");
const men = require("../Models/men")
const women = require("../Models/women");
var jsonparser = bodyparser.json();
const router = express.Router();


router.post("/login/", async (req, res) => {
    let body = req.body;
    let status = "";
    if (body.data.username == "admin" && body.data.password == "admin") {
        status = "Successful"
    }
    else {
        status = "Failed"
    }
    let data = {
        "data":
        {
            "status": status
        }
    }
    res.end(JSON.stringify(data));
});

//-----Men-----//

router.post("/savemen", async (req, res) => {
    let body = req.body;

    let imagepath = "";
    if (body.data.photo != "") {
        let base64image = body.data.photo.replace(/^data:image\/jpeg;base64,/, "");
        base64image = base64image.replace(/^data:image\/png;base64,/, "");
        base64image = base64image.replace(/^data:image\/webp;base64,/, "");
        imagepath = "men/" + Math.random().toString(36).substring(2, 7) + ".png";
        fs.writeFile("public/" + imagepath, base64image, 'base64', function (err) {
            console.log("Error image saving-" + err);
        });
    }

    let mens = new men({
        srno: body.data.srno,
        name: body.data.name,
        brand: body.data.brand,
        imagepath: imagepath,
        description: body.data.description,
        price: body.data.price,

    });
    if (body.data.id == "") {
        mens.save().then(result => {
            console.log("success");
            res.end(JSON.stringify(result));
        }, err => {
            console.log("fail");
            res.end(JSON.stringify(err));
        });
    }
    else {
        result = await men.findByIdAndUpdate(body.data.id, {
            srno: body.data.srno,
            name: body.data.name,
            brand: body.data.brand,
            imagepath: body.data.imagepath,
            description: body.data.description,
            price: body.data.price,
        });
        if (imagepath != "") {
            result = await men.findByIdAndUpdate(body.data.id, {
                imagepath: body.data.imagepath
            });
        }
        res.end(JSON.stringify(result));
    }
});


router.post("/mens", async (req, res) => {
    let mens = await men.find();
    for (let i = 0; i<mens.length; i++) {
        mens[i]["srno"] = i+1;
    }
    res.json({ data: mens });
    
});

router.post("/men", async (req, res) => {
    let body = req.body;
    let mens = await men.findById(body.data.id);
    res.json({ data: mens });
});

router.post("/deletemen", async (req, res) => {
    let body = req.body;
    await men.findByIdAndDelete(body.data.id);
    let data = {
        "data":
        {
            "status": "success"
        }
    }
    res.end(JSON.stringify(data));
});


//-----Women-----//

router.post("/savewomen", async (req, res) => {
    let body = req.body;

    let imagepath = "";
    if (body.data.photo != "") {
        let base64image = body.data.photo.replace(/^data:image\/jpeg;base64,/, "");
        base64image = base64image.replace(/^data:image\/png;base64,/, "");
        base64image = base64image.replace(/^data:image\/webp;base64,/, "");
        imagepath = "women/" + Math.random().toString(36).substring(2, 7) + ".png";
        fs.writeFile("public/" + imagepath, base64image, 'base64', function (err) {
            console.log("Error image saving-" + err);
        });
    }

    let woman = new women({
        srno: body.data.srno,
        name: body.data.name,
        brand: body.data.brand,
        imagepath: imagepath,
        description: body.data.description,
        price: body.data.price,

    });
    if (body.data.id == "") {
        woman.save().then(result => {
            console.log("success");
            res.end(JSON.stringify(result));
        }, err => {
            console.log("fail");
            res.end(JSON.stringify(err));
        });
    }
    else {
        result = await women.findByIdAndUpdate(body.data.id, {
            srno: body.data.srno,
            name: body.data.name,
            brand: body.data.brand,
            description: body.data.description,
            price: body.data.price,
        });
        if (imagepath != "") {
            result = await women.findByIdAndUpdate(body.data.id, {
                imagepath: imagepath
            });
        }
        res.end(JSON.stringify(result));
    }
});


router.post("/womens", async (req, res) => {
    let body = req.body;
    let womens = await women.find();
    for (let i = 0; i < womens.length; i++) {
        womens[i]["srno"] = i + 1;
    }
    res.json({ data: womens });
});

router.post("/women", async (req, res) => {
    let body = req.body;
    let womens = await women.findById(body.data.id);
    res.json({ data: womens });
});

router.post("/deletewomen", async (req, res) => {
    let body = req.body;
    await women.findByIdAndDelete(body.data.id);
    let data = {
        "data":
        {
            "status": "success"
        }
    }
    res.end(JSON.stringify(data));
});

module.exports=router;