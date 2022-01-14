const express = require("express");
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));
app.get("/",function(req,res){
  console.log("Requested URL:"+req.url);
  console.log("Requested method:"+req.method);
  console.log("Requested header:");
  console.log(req.headers);
  console.log("Requested query:");
  console.log(req.query);
  console.log("Requested body:");
  console.log(req.body);
  res.header("content-type","text/html");
  res.status(200);
  // res.send("Hello");
  res.sendFile(__dirname+"/index.html");
});

app.get("/login",function(req,res){
  console.log("INside");
  console.log(req.query.newitem);
  if(req.query.username==="admin" && req.query.password==="admin")
  {
    res.send("LOgged in");
  }
  else {
    res.send("Error");
  }
  // console.log("Getting the name:"+req.query.name);
  // res.send("Logged in");
});

app.post("/login",function(req,res){
  console.log(req.body.username);
  if(req.body.username==="admin" && req.body.password==="admin")
  {
    res.send("Logged in");
  }
  else {
    res.send("invalid login credentials");
  }
});

app.listen(3000,function(req,res){
  console.log("App started at port 3000");
});
