// Express
const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.listen(3000,function(){
    console.log("App started at 3000");
});
app.use(express.static(__dirname)); //for setting the file to serve on request
app.use(bodyParser.json())

// Mongoose
const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
     "_id": Number,
     productname: String,
     price:Number
});
const Products = mongoose.model("products",productSchema);
// mongoose.connect("mongodb://localhost:27017/Onlineshopping",{useNewUrl:true});

// Index
app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
});

app.get("/getproducts",function(req,res){
    console.log("Get request");
    mongoose.connect("mongodb://localhost/Onlineshopping");
    console.log("Connection successful");
    Products.find({productname: {$regex: req.query.s}},function(err,data){
        if(err)
        {   
            console.log(err);
            res.status(500);
            res.send(err);
        }
        else
        {
            console.log(data);
            res.send(data);
            mongoose.connection.close();
        }
    } );
    // res.headersSent(Connection = 'close');
}
);
// // Insert a Product

app.post("/insertproduct",function(req,res){
    mongoose.connect("mongodb://localhost/Onlineshopping");
    // console.log(req.body);
    var newProd = new Products({
        _id: req.body._id,
        productname: req.body.productname,
        price: req.body.price
    });
    newProd.save(function(err){
        if(err)
        {
            console.log(err);
            res.status(500);
            res.send(err);
        }
        else
        {
            console.log("Data inserted");
            res.send("Data Inserted Successfully");
            mongoose.connection.close();
        }
    });
});
