const   express                 = require('express'),
        request                 = require('request'),
        bodyParser              = require("body-parser"),
        mongoose                = require("mongoose"),
        Camp                    = require("./models/camps"),
        Comment                 = require("./models/comment"),
        User                    = require("./models/user"),
        passport                = require("passport")
        LocalStrategy           = require("passport-local"),
        passportLocalMongoose   = require("passport-local-mongoose")
        

const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));

app.use(passport.initialize());
app.use(passport.session());
app.use(require("express-session")({
    secret: "123456",
    resave: false,
    saveUnitialized: false
}));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

mongoose.connect("mongodb://localhost/yelpcamp");

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
            res.render("camps/index", {camps: allcamps})
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
    res.render("camps/new");
})

//SHOW
app.get("/camps/:id", function(req, res){
    Camp.findById (req.params.id).populate("comments").exec(function(err, foundCamp){
            if(err){
                    console.log(err);
            } else{ res.render("camps/show", {camp: foundCamp});
            }
    });
});


//comment routes

app.get("/camps/:id/comments/new", function(req, res){
    Camp.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
        } else {
            res.render("comments/new", {camp: campground});
        }
    })

});

app.post("/camps/:id/comments", function(req, res){
    Camp.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
            res.redirect("/camps/"+ campground._id);
        } else {
                Comment.create(req.body.comment, function(err, comment){
                    if(err){
                        console.log(err);
                    } else {
                        campground.comments.push(comment);
                        campground.save();
                        res.redirect("/camps/" + campground._id);
                    }
                })
        }
            
    })
})


// AUTH routes


app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Yelp Camp is up!!");
});