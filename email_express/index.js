const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const https = require('https');
const app = express();

app.use(express.static("publicStyles"));

app.use(bodyParser.urlencoded({
  extended: true
}));

app.post("/",function(req,res)
{
  const firstname=req.body.firstName;
  const lastname=req.body.lastName;
  const mail=req.body.email;
  // res.write("Login successfull");
  // res.write("<h1>Welcome"+username+"</h1>");

  const userdata ={
    members:[
      {
        email_address: mail,
        status: "subscribed",
        merge_fields: {
          FNAME: firstname,
          LNAME: lastname,
        }
      }
    ]
  };

  const JSONformatUserdata=JSON.stringify(userdata);
  const url="https://us20.api.mailchimp.com/3.0/lists/13f87affbe";

  const option= {
    method: "POST",
    auth: "suresh:dd1c28153d0cb2fe20b97404e5bcb0ee-us20"
  }

  const request=https.request(url, option,function(response)
{
    response.on("data",function(data)
    {
      console.log(JSON.parse(data));
    });

    console.log("Request status:\t"+response.statusCode);

    if(response.statusCode==200)
    {
    res.sendFile(__dirname+"/success.html");
    }
    else {
      res.sendFile(__dirname+"/failure.html");
    }
});

app.post("/failure",function(req,res)
{
 res.redirect("/");
});


request.write(JSONformatUserdata);
request.end();

  console.log(JSONformatUserdata);
  console.log("login successful\t:"+firstname,lastname,mail);

});

app.get("/",function(req,res)
{
  // res.write("Hi");
  res.sendFile(__dirname+"/signup.html")
});
app.listen(process.env.PORT||3000,function(req,res)
{
  console.log("Listening at port 3000");
});

// Api key generated using the site mailchimp
// aca2ff1c3273e2bf9e00a0d49d35413b-us20
//dd1c28153d0cb2fe20b97404e5bcb0ee-us20


// Audience/List id
// 13f87affbe.
