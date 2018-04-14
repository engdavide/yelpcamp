const express = require('express');
const request = require('request'); //Don't need this just yet
const bodyParser = require("body-parser");

const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));

let arrCamps = [
    {name: "Salmon Creek", image: "https://www.nps.gov/havo/planyourvisit/images/Namakanipaio_960.jpg"},
    {name: "Pine Mountain", image: "https://www.nps.gov/havo/planyourvisit/images/Kulanaokuaiki-Campground_NPSJayRobinson_600_1.jpg"},
    {name: "Smoky Hills", image: "https://www.nps.gov/havo/planyourvisit/images/namakanipaio_cabin_600.jpg"},
    {name: "Birddog's Paradise", image: "https://www.nps.gov/havo/planyourvisit/images/Night-sky-at-Kulanaokuaiki-with-Kilauea-glow_JacobWFrank_960.jpg"},
    {name: "KOA Utah", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Coulter_Campground.JPG/1200px-Coulter_Campground.JPG"},
    {name: "Salmon Creek", image: "https://www.nps.gov/havo/planyourvisit/images/Namakanipaio_960.jpg"},
    {name: "Pine Mountain", image: "https://www.nps.gov/havo/planyourvisit/images/Kulanaokuaiki-Campground_NPSJayRobinson_600_1.jpg"},
    {name: "Smoky Hills", image: "https://www.nps.gov/havo/planyourvisit/images/namakanipaio_cabin_600.jpg"},
    {name: "Birddog's Paradise", image: "https://www.nps.gov/havo/planyourvisit/images/Night-sky-at-Kulanaokuaiki-with-Kilauea-glow_JacobWFrank_960.jpg"},
    {name: "KOA Utah", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Coulter_Campground.JPG/1200px-Coulter_Campground.JPG"}
    ];

app.get("/", function(req, res){
    res.render("home");
});

app.get("/camps", function(req, res){
    res.render("camps", {camps: arrCamps});
});

app.post("/camps", function(req, res){
    let name = req.body.name;
    let image = req.body.image;
    let newCamp = {name: name, image: image};
    arrCamps.push(newCamp);
    res.redirect("/camps"); 
});

app.get("/camps/new", function(req, res) {
    res.render("new");
})

// app.get("/camps", function(req, res){
//     let query = req.query.search;
//     let url = "http://www.omdbapi.com/?s=" + query + "&apikey=thewdb";
//   request(url, function(error, response, body){
//       if(!error && response.statusCode ==200){
//           let data = JSON.parse(body);
//           res.render("results", {data: data});
//       }
//   }) ;
// });


app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Yelp Camp is up!!");
});