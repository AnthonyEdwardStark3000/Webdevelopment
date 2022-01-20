const {Product} = require('../models/product');
const express = require('express');
const router = express.Router();

router.get("/", async function(req, res){
    const productList = await Product.find().select('name image -_id');

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

// router.put("/:id",function(req,res){
//     Product.findOne({_id:req.params.id},function(err,data){
//     if(err)
//     {
//       console.log(err);
//       res.status(500);
//       res.send("Updation of Data failed");
//     }
//     else {
//       data.name= req.body.name,
//       data.description= req.body.description,
//       data.richDescription= req.body.richDescription,
//       data.image= req.body.image,
//       data.brand=req.body.brand,
//       data.price=req.body.price,
//       data.category= req.body.category,
//       data.countInStock= req.body.countInStock,
//       data.rating= req.body.rating,
//       data.numReviews= req.body.numReviews,
//       data.isFeatured= req.body.isFeatured
//
//       data.save(function(err,data){
//         if(err)
//         {
//           console.log(err);
//           res.status(500);
//           res.send("Updation failed");
//         }
//         else {
//           res.send(data);
//         }
//       });
//     }
//   });
// });

module.exports =router;
