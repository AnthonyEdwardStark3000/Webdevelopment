const express= require('express');
const app=express();
const bodyParser=require('body-parser');
app.use(bodyParser.urlencoded(
  {
    extended: true
  }
));

app.get("/",function(req,res)
{
res.sendFile(__dirname+"/index.html");
console.log(__dirname);
});

app.listen(3000,function()
{
  console.log("server started at port 3000");
});

//respond when an post occurs
app.post("/",function(req,res)
{
  // console.log(req.body);
    // console.log(req.body.num1);
        // console.log(req.body.num2);
        var a=Number(req.body.num1);
        var b=Number(req.body.num2);
        var c=a+b;
  res.send("Thank you "+c);
})


function calculate( num1, num2)
{
  console.log(num1+num2);
}
