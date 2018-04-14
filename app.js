const   express     = require('express'),
        request     = require('request'),
        bodyParser  = require("body-parser"),
        mongoose    = require("mongoose")

const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));


mongoose.connect("mongodb://localhost/yelpcamp");

let campSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});

let Camp = mongoose.model("Camp", campSchema);

// Camp.create({
//     name: "Granite Hill",
//     image: "https://img.hipcamp.com/image/upload/c_limit,f_auto,h_1200,q_60,w_1920/v1444773347/campground-photos/cdxdho9t8v62cfzgkmtm.jpg",
//     description: "beautiful, but no services"
// });


app.get("/", function(req, res){
    res.render("home");
});

//Index 
app.get("/camps", function(req, res){
    Camp.find({}, function(err, allcamps){
        if(err){
            console.log(err)
        } else {
            res.render("index", {camps: allcamps})
        }
    })
});

// CREATE
app.post("/camps", function(req, res){
    let name = req.body.name;
    let image = req.body.image;
    let desc = req.body.description;
    let newCamp = {name: name, image: image, description: desc};
        Camp.create(newCamp, function(err, newlyCreated){
            if(err){
                console.log(err)
            }else{
                res.redirect("/camps"); 
            }
        })

});

//NEW
app.get("/camps/new", function(req, res) {
    res.render("new");
})

//SHOW
app.get("/camps/:id", function(req, res){
    Camp.findById (req.params.id, function(err, foundCamp){
        if(err){
                console.log(err)
        } else{ res.render("show", {camp: foundCamp})
        }
    })
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