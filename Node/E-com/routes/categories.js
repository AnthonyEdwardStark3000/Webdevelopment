const {Category} = require('../models/category');
const express = require('express');
const router = express.Router();

router.get(`/`, async function(req, res){
    const categoryList = await Category.find();
    if(!categoryList)
    {
        res.status(500).json({success: false})
    }
    res.send(categoryList);
});

router.post("/",async function(req,res){
  let category = new Category({
    name:req.body.name,
    icon:req.body.icon,
    color:req.body.color
  });
  category = await category.save();

  if(!category)
  {
    return res.status(404).send("Error");
  }
  res.send(category);
});

router.get("/:id",async function(req,res){
  Category.findOne({_id:req.params.id},function(err,data){
    if(err)
    {
      // res.send(err);
      res.status(404);
      res.send("Data not found");
      console.log(err);
    }
    else {
      res.send(data);
    }
  })
});

router.put("/:id",function(req,res){
  Category.findOne({_id:req.params.id},function(err,data){
    if(err)
    {
      console.log(err);
      res.status(500);
      res.send("Updation of Data failed");
    }
    else {
      data.name= req.body.name,
      data.color= req.body.color,
      data.icon = req.body.icon
      data.save(function(err,data){
        if(err)
        {
          console.log(err);
          res.send(err);
        }
        else {
          res.send(data);
        }
      });
    }
  });
});

router.delete("/:id",function(req,res){
  Category.deleteOne({_id:req.params.id},function(err,data){
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

module.exports =router;
