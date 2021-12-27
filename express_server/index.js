const express = require("express");
const app =express();

app.get('/',function(req,res)
{
  // console.log(res);
  res.send("<h1>Hi for the express</h1>");
  res.send(res);
});

app.get("/contact",function(req,res)
{
  res.send("Hello from the contact page");
  console.log("Contact");
});

app.get("/home",function(req,res)
{
    res.send("Hello from the home page");
  console.log("Home");
});

app.get("/a",function(req,res)
{
    res.send("Hello from the a page");
  console.log("a");
});

app.listen(3000,
  function()
{
  console.log("Listening to the port 3000");
});
