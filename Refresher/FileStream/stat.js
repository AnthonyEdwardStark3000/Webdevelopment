const fs = require("fs");
fs.stat("test.txt",function(err,data){
  if(err)
  {
    console.log(err);
  }
  else
  {
    console.log(data);
  }
})
