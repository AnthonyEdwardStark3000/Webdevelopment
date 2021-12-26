const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));

app.get("/",function(req,res)
{
  console.log("Started");
  res.sendFile(__dirname+"/index.html");
});

app.listen(3000,function(req,res)
{
  console.log("app started at port 3000");
})
