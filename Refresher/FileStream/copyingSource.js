const fs = require("fs");
const data ="Every failure teaches an new lesson and moves us a step forward towards success";
fs.readFile("test.txt","utf8",function(err,data){
  if(err)
  {
    console.log(err);
  }
  else {
    fs.writeFile("test.txt",data,"utf8",function(err){
      if(err)
      {
        console.log(err);
      }
      else {
        console.log("Copied the file successfully");
      }
    })
  }
});
