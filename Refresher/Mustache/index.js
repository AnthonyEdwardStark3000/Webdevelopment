const express = require("express");
const mustacheExpress = require("mustache-express");
const app = express();
app.engine("mustache",mustacheExpress());
app.set("view engine","mustache");


app.get("/",function(req,res){
  res.render("index",{studentID:1,studentName:"Stark", marks:100,
   pass: this.marks>=50, subjects:[
    { subjectName:"Maths",marks:90 },{ subjectName:"English",marks:80 },{ subjectName:"Computer",marks:100 },
  ]});
  console.log(typeof(this.Marks));
});

app.listen(3000,function(){
  console.log("Server started at port 3000");
});
