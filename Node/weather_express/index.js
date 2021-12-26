const express = require('express');
const https = require('https');
const bodyParser= require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));

app.get("/",function(req,res)
{
res.sendFile(__dirname+"/index.html");
  console.log("Loaded");
});



  // res.sendFile(__dirname+"/index.html");


app.post("/",function(req,res)
{
  const country=req.body.place;
  console.log("Post:"+country);
  const url="https://api.openweathermap.org/data/2.5/weather?q="+country+"&appid=e257c97f99ca01b38637e665c6cff365";

  https.get(url,function(response){
    console.log(response.statusCode);
    response.on("data",function(data){
      // console.log(data);
      console.log("The data received is\t:");
      console.log(JSON.parse(data));

      const weatherReport = JSON.parse(data);
      const temperatureNow = weatherReport.main.temp;
      const country = weatherReport.name;
      const weatherDescription = weatherReport.weather[0].description;
      const icon=weatherReport.weather[0].icon;
      const imageUrl="http://openweathermap.org/img/wn/"+icon+"@2x.png";

      console.log("the temperature is:"+temperatureNow);
      console.log("the country you have searched for is:"+country);
      console.log("The description can be said as:"+weatherDescription);

      res.write(
    "<h1>The temperature now at\t"+country+ "\tis\t:" +temperatureNow+"<br>And it can be described as an :" +weatherDescription+"</h1>");
      res.write("<img src="+imageUrl+">");
      // res.send();

      console.log("You have searched for the location\t:"+req.body.place);
      console.log("Post responded with 400");
      res.write(temperatureNow+"°C"+"\tat\t"+country+"\tis\t"+weatherDescription);
}

);
}
);
}
);
app.listen(3000,function(req,res)
{
  console.log("App started at port 3000");
});
