const express = require("express");
const app = express();

app.get("/",function(req,res){
  res.send("Hi");
});

app.listen(3000,function(req,res){
  console.log("Server started at port 3000");
});
