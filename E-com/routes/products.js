const {Product} = require('../models/product');
const express = require('express');
const router = express.Router();
const { Category } = require('../models/category');
const mongoose = require("mongoose");
router.get("/", async function(req, res){

  let filter ={};
  if(req.query.categories)
  {
    filter = {category:req.query.categories.split(',')};
  }

    const productList = await Product.find(filter).populate('category') ;
    // .select('name image -_id');

    if(!productList) {
        res.status(500).json({success: false})
    }
    res.send(productList);
});

router.get("/:id",async function(req,res){
  const product = await Product.findById(req.params.id).populate('category');
  // ,function(err,data){
  //   if(err)
  //   {
  //     console.log(err);
  //     res.status(500);
  //     res.send("Unable to find the category");
  //   }
  // });
  if(!product)
  {
    res.status(500);
    res.send("Unable to find the category");
  }
  else {
    res.send(product);
  }
});

router.post("/", async function(req, res){
  let category = Product.findOne({category:req.body.category},function(err){
    if(err)
    {
      console.log(err);
      res.status(500);
      res.send("Invalid Category");
    }
  });
    const product = new Product({
        name: req.body.name,
        description: req.body.description,
        richDescription: req.body.richDescription,
        image: req.body.image,
        brand:req.body.brand,
        price:req.body.price,
        category: req.body.category,
        countInStock: req.body.countInStock,
        rating: req.body.rating,
        numReviews: req.body.numReviews,
        isFeatured: req.body.isFeatured
    })
     await product.save(function(err,data){
      if(err)
      {
        console.log(err);
        res.status(500);
      }
      else {
        res.send(data);
      }
    });
});

router.put('/:id',async function(req, res){
    if(!mongoose.isValidObjectId(req.params.id)) {
       return res.status(400);
       res.send("Invalid Product Id");
    }
    const category = await Category.findById(req.body.category);
    if(!category)
    {
    return res.status(400);
    res.send("Invalid Category");
    }

    const product = await Product.findByIdAndUpdate(
        req.params.id,
        {
            name: req.body.name,
            description: req.body.description,
            richDescription: req.body.richDescription,
            image: req.body.image,
            brand: req.body.brand,
            price: req.body.price,
            category: req.body.category,
            countInStock: req.body.countInStock,
            rating: req.body.rating,
            numReviews: req.body.numReviews,
            isFeatured: req.body.isFeatured,
        },
        { new: true}
    );

    if(!product)
    {
      return res.status(500).send('the product cannot be updated!');
    }
    res.send(product);
});
router.delete("/:id",function(req,res){
  Product.deleteOne({_id:req.params.id},function(err,data){
    if(err)
    {
      res.status(500);
      res.send(err);
    }
    else {
      res.send("Product has been deleted Successfully");
    }
  });
});

// router.get("/get/count",async function(req,res){
//   const productCount = await Product.countDocuments((count)=> count)
//   if(!productCount)
//   {
//     res.status(500);
//   }
//   else {
//     res.send(productCount);
//   }
//
// }).clone();
router.get(`/get/count`, async (req, res) =>{
    const productCount = await Product.countDocuments(function (count) {
      return count;
    }).clone();
    if(!productCount) {
        res.status(500).json({success: false})
    }
    res.send({
        productCount: productCount
    });
});
router.get(`/get/featured/:count`, async (req, res) =>{
  const count = req.params.count ? req.params.count :0;
    const products = await Product.find({isFeatured: true}).limit(+count);
    if(!products) {
        res.status(500).json({success: false})
    }
    res.send(products);
});
module.exports =router;
