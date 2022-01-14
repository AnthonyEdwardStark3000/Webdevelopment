const express = require("express");
const app = express();
const router = express.Router();
app.use("/admin",router);

app.get("/",function(req,res){
  res.sendFile(__dirname+"/index.html");
});

app.get("/contact",function(req,res){
  res.sendFile(__dirname+"/contact.html");
});

app.get("/about",function(req,res){
  res.sendFile(__dirname+"/about.html");
});

router.get("/check",function(req,res){
  res.sendFile(__dirname+"/check.html");
});

app.listen(3000,function(req,res){
    console.log("Server started at port 3000");
});
