const http = require("http");
const fs = require("fs");
const server = http.createServer(function(req,res){
    var filename;
    if(req.url=="/home")
    {
      filename= "home.html";
    }
    if(req.url=="/contact")
    {
      filename= "contact.html";
    }
    if(req.url=="/about")
    {
      filename= "about.html";
    }
    fs.readFile(filename,"utf8",function(err,data){
      if(err)
      {
        console.log(err);
        res.writeHead(500);
        res.write("Unable to open the file");
      }
      else {
        res.setHeader("content-type","text/html");
        res.write(data);
      }
      res.end();
    });

});

server.listen(3000,function(){
  console.log("App started at port 3000");
});
