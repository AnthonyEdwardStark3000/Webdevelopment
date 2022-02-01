// Express
const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.static(__dirname))

// Socket.io
var http = require("http");
var server = http.createServer();
server.listen(4000);
  // var socketio = require("socket.io")(http, {
  //   cors: {
  //     origin:"*"
  //   }
  // });
var socketio = require("socket.io");
var io = socketio(server);

// Socket.io



app.get("/",function(req,res){
  res.sendFile(__dirname+"/index.html")
});

io.on("connect",function(){
  console.log("New connection");
});

app.listen(3000,function(){
  console.log("Server started at port 3000");
  })
// })
