  const express = require('express');
  const router = express.Router();
  const article = require('./../models/articles');
  router.get("/new",function(req,res){
    res.render("articles/new");
  });

  router.get("/:id",function(req,res){

  });
  router.post("/",async function(req,res){
    const article = new Article({
      name: req.body.name,
      description: req.body.description,
      mrp: req.body.mrp
    });
    try {
      article= await article.save();
      res.redirect(`/article/${article.id}`);
    } catch (e) {
      res.render('articles/new',{article: article});
    console.log(e);
    }
  });
  module.exports = router;
