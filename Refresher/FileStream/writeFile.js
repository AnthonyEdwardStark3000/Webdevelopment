const fs = require("fs");
const content="Additional line";
fs.writeFile("test.txt",content,"utf8",function(err){
  if(err)
  {
    console.log(err);
  }
  else {
    console.log("Done");
  }
});
