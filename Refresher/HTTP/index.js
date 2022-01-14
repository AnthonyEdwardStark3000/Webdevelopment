const http = require("http");
const server = http.createServer(function(req,res){
  console.log("Request received");
  res.setHeader("Content-type","text/html");
  res.writeHead(200);
  res.write("<h1>HI</h1>");
  res.write("Requested URL is:"+req.url+"Requested method is:"+req.method);
  res.write("\nRequested headers:"+req.headers["accept-encoding"])
  res.end();
});

server.listen(3000,function(){
  console.log("App started at port 3000");
});
