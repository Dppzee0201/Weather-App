const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/",function(req,res){
  res.sendFile(__dirname + "/index.html");
})

app.post("/", function(req,res){
  const city = req.body.cityName;
  const key = "bae50234b7eb497bbdc53229220309&q="
  const url="https://api.weatherapi.com/v1/current.json?key="+ key +""+ city +""
  https.get(url, function(response){
    console.log(response.statusCode);

    response.on("data", function(data){
      const weatherData = JSON.parse(data)
      const temp= weatherData.current.temp_c
      const condition = weatherData.current.condition.text
      const code =weatherData.current.condition.code
      const icon = "http://cdn.weatherapi.com/weather/64x64/day/122.png"

      // http://cdn.weatherapi.com/weather/64x64/night/122.png
      res.write("<p>The currrent condition in "+ city +" is " + condition +".</p>");
      res.write("<h1>The temperature in "+ city +" is " + temp + " degrees Celcius.</h1>");
      res.write("<img src=" + icon + ">");

      res.send()
    })
  })
})




app.listen(3000, function(){
  console.log("server is running on port 3000.");
})
