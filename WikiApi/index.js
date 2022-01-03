const express = require('express');
const app =express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const ObjectID = require('mongodb').ObjectID;

app.set('view engine','ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.use(bodyParser.json());  //POST JSON Parse

mongoose.connect("mongodb://localhost:27017/WikiAPI",{useNewUrlParser: true});
const articleSchema ={
  title:String,
  content:String
};
const Article = mongoose.model("Article", articleSchema);
//----------------------------------------------------Targeting every item----------------------------------------------------

app.route("/articles")
.get(function(req,res)
{
  Article.find(function(err,foundArticles){
    console.log(foundArticles);
    if(!err){
      res.send(foundArticles);
    }
    else {
      res.send(err);
    }
  });
})
.post(function(req,res){
  console.log("app.use(bodyParser.json()); To make this work");
  console.log("Title :"+req.body.title);
  console.log("Content :"+req.body.content);

  const newArticle = new Article({
    title: req.body.title,
    content: req.body.content
  });
  newArticle.save(function(err){
    if(err)
    {
      res.send(err);
    }
    else {
      res.send("Insertion of the Data entered is Successful");
    }
  });
})
.delete(function(req,res)   //Delete everything
{
  Article.deleteMany(function(err)
  {
    if(err)
    {
      res.send(err);
    }
    else {
      res.send("Every data has been deleted successfully");
    }
  })
});
//----------------------------------------------------Targeting specific item----------------------------------------------------
app.route("/articles/:articleTitle")
.get(function(req,res)
{
  Article.findOne({title :req.params.articleTitle},function(err,result){
    if(err)
    {
      res.send(err);
    }
    else {
      res.send(result);
    }
  })
})

.put(function(req, res){
       Article.replaceOne(
           { title: req.params.articleTitle },
           { title: req.body.title, content: req.body.content },
           function(err){
               if (!err) {
                   res.send("Successfully updated the article");
               } else {
                   res.send(err);
               }
           }
       );
   })

.patch(function(req,res)
{
    Article.update(
      { title: req.params.articleTitle},
      { $set: req.body},
      function(err)
      {
        if(!err)
        {
          res.send("Successfully updated the data entered");
        }
        else {
          res.send(err);
        }
      }
    )
});
app.listen(3000,function(req,res){
  console.log("App started at port 3000");
});
