const express = require('express');
const bodyParser = require('body-parser');
const app =express();
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get("/",function(req,res)
{
  // res.send("Hi");
  res.sendFile(__dirname+"/index.html");
});

app.post('/',function(req,res)
{
console.log("Post response triggered");
var a=Number(req.body.height);
var b=Number(req.body.weight);
var c=b/(a*a);
var youAre="";
if(c<=100)
{
youAre="Normal";
}
else {
  youAre="Obese";
}
res.send("Your BMI is:"+c+"\t and you are\t"+youAre+"\t in weight");
console.log("Response sent\t"+c+"\t"+youAre);
});

app.listen(3000,function(req,res)
{
  console.log("Listening at port 3000");
});
