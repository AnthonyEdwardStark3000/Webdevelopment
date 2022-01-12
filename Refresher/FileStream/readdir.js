const fs = require("fs");
fs.readdir("D:\\My programs\Webdevelopment\Node\Refresher",function(err,data){
  if(err)
  {
    console.log(err);
  }
  else {
    console.log(data);
  }
});
