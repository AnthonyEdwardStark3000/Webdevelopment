const http = require("http");
const fs = require("fs");
const server = http.createServer(function(req,res){
  console.log("Inside request");
  fs.readFile("index.html","utf8",function(err,data){
    if(err)
    {
      console.log(err);
      res.writeHead(500);
      res.write("Error reading the file");
    }
    else {
      console.log(data);
      res.setHeader("content-type","text/html");
      res.write(data);
    }
    res.end();
    });
});

  server.listen(3000,function(){
    console.log("App started at port 3000");
  });
