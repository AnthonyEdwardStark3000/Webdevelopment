const http = require("http");
const fs = require("fs");
const server = http.createServer(function(req,res){
  // res.write("I would like to say");
  fs.readFile("test.txt","utf8",function(err,data){
    if(err)
    {
      // console.log(err);
      res.writeHead(500);
      res.write("Error reading the file");
    }
    else {
      res.write(data);
      console.log(data);
    }
    res.end();
    });
});

  server.listen(3000,function(){
    console.log("App started at port 3000");
  });
