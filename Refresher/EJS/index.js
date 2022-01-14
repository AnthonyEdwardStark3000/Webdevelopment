const express = require("express");
const app = express();

app.set("view engine","ejs");

app.get("/",function(req,res){
  res.render("index",{studentID:1,studentName:"Stark",Marks:100, subjects:[
    { subjectName:"Maths",marks:90 },{ subjectName:"English",marks:80 },{ subjectName:"Computer",marks:100 },
]});
});

app.listen(3000,function(req,res){
  console.log("App started at port 3000");
});
