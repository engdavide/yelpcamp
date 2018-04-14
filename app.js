const express = require('express');
const request = require('request');

const app = express();
app.set("view engine", "ejs");

app.get("/", function(req, res){
    res.render("home");
});

app.get("/results", function(req, res){
    let query = req.query.search;
    let url = "http://www.omdbapi.com/?s=" + query + "&apikey=thewdb";
   request(url, function(error, response, body){
       if(!error && response.statusCode ==200){
           let data = JSON.parse(body);
           res.render("results", {data: data});
       }
   }) ;
});


app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Yelp Camp is up!!");
});