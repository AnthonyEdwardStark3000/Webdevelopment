const express = require('express');
const articleRouter = require('./routes/articles.js');
const mongoose = require('mongoose');
const app = express();

mongoose.connect('mongodb://localhost/blog',{useNewUrlParser:true})
app.set('view engine', 'ejs');

app.use(express.urlencoded({extended:false}));
app.use("/article",articleRouter);
app.get("/",function(req,res){
  // res.send("Hi");
  const articles=[
    {
    name:"One",
    mrp:"100",
    createdon: new Date(),
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit."
  },
  {
  name:"Two",
  mrp:"200",
  createdon: new Date(),
  description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit."
  },
  {
  name:"Three",
  mrp:"300",
  createdon: new Date(),
  description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit."
  },
];
  res.render("articles/index",{ articles: articles});
  console.log("Get req");
});
app.listen(3000,function(req,res){
  console.log("App started at port 3000");
});
