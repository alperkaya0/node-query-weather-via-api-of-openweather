const express = require("express");
const app = express();
const https = require("https");
const parser = require("body-parser");

app.use(parser.urlencoded({extended:true}));

app.get("/", function(req,res) {
    res.sendFile(__dirname+"/index.html");
});

app.post("/weather",function(req,res) {
    let city = req.body.cityName;
    let apiKey = "";
    let unit = "metric";
    let url = "https://api.openweathermap.org/data/2.5/weather?appid="+apiKey+"&q="+city+"&units="+unit;
    https.get(url, (response) => {
        response.on("data", (data) => {
            let resobj = JSON.parse(data);
            let description = resobj.weather[0].description;
            let temp = resobj.main.temp;
            let icon = resobj.weather[0].icon;
            let iconUrl = "https://openweathermap.org/img/wn/"+icon+"@2x.png";
            res.write("<body><center><h1>The temperature at "+city+" is "+temp+" degrees.</h1>");
            res.write("<h1>The weather is currently "+description+"."+"</h1>");
            res.write("<img src=\""+iconUrl+"\"></center></body>")
            res.send();
        })  
    });
});

app.get("/styles.css", function(req,res){
    res.sendFile(__dirname+"/styles.css")
});

app.get("/favicon.ico", function(req,res) {
    res.sendFile(__dirname+"/favicon.ico");
});

app.listen(3000,function() {
    console.log("Server is started at port 3000. http://localhost:3000")
});
