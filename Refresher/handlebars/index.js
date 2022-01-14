const express = require("express");
const expresshandlebars = require("express-handlebars");
const app = express();

app.engine("hbs",expresshandlebars.engine());
app.set("view engine","hbs");


app.get("/",function(req,res){
  res.render("index",
  {studentID:1,studentName:"Stark", marks:100,
   pass: this.marks>=50, subjects:[
    { subjectName:"Maths",marks:90 },
    { subjectName:"English",marks:80 },
    { subjectName:"Computer",marks:100 },
  ]});
  console.log(typeof(this.Marks));
});

app.listen(3000,function(){
  console.log("Server started at port 3000");
});
