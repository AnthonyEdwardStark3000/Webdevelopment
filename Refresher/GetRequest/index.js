const http =require("http");
const fs = require("fs");
const querystring = require("querystring");
const server = http.createServer(function(req,res){
  console.log(req.url);
  if(req.url=="/")
  {
    fs.readFile("login.html","utf8",function(err,data){
      if(err)
      {
        console.log(err);
      }
      else {
        res.write(data);
      }
      res.end();
    });
    // res.
  }
  else if (req.url.startsWith("/login")) {
    // var q = querystring.parse(req.url.split("?")[1]);
    // if(q.name == "admin" && u.password == "admin")
    //    {
    fs.readFile("index.html","utf8",function(err,data)
    {
    if (err) {
      res.write(err);
    }
    else {
      res.write(data);
      res.end();
    }
  });
  // else {
  //   res.write("Invalid login credentials");
  // }
  }

  else
  {
    res.write("No page");
    res.end();
  }
      // }
});
// res.end();
server.listen(3000,function(){
  console.log("App started at the port 3000");
});
