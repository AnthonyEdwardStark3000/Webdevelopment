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

//update
app.put("/updateproduct",function(req,res){
    console.log(req.body);
    mongoose.connect("mongodb://localhost/Onlineshopping");
    Products.findOne({_id:req.body._id},function(err,data){
        if(err)
        {
            console.log(err);
            res.status(500);
            res.send(err);
            mongoose.connection.close();
        }
        else
        {
            data.productname = req.body.productname;
            data.price = req.body.price;
            data.save(function(error){               
                if(error)
                {
                    console.log(error);
                    res.status(500);
                    res.send(error);
                    mongoose.connection.close();
                }
                else
                {
                    console.log("Data updated successfully");
                    mongoose.connection.close();
                    res.send("Data updated");
                }
            });
        }
    });
});

//Delete
app.delete("/deleteProduct",function(req,res){
    mongoose.connect("mongodb://localhost/Onlineshopping");
    Products.remove({_id:req.query._id},function(err,data)
    {   
        if(err)
        {
            console.log(err);
            res.status(500);
            res.send(err);
            mongoose.connection.close();
        }
        else
        {
            console.log("Product has been deleted Successfully");
            res.send("Product has been deleted Successfully");
            mongoose.connection.close();
            console.log(data);
        }
    })
})
