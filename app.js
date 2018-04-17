const   express                 = require('express'),
        request                 = require('request'),
        bodyParser              = require("body-parser"),
        mongoose                = require("mongoose"),
        passport                = require("passport"),
        LocalStrategy           = require("passport-local"),
        passportLocalMongoose   = require("passport-local-mongoose"),
        Camp                    = require("./models/camps"),
        Comment                 = require("./models/comment"),
        User                    = require("./models/user");
        
const commentRoutes = require("./routes/comments"),
        campRoutes = require("./routes/camps"),
        indexRoutes = require("./routes/index");
        

        

const app = express();


app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));

//PASSPORT CONFIG
app.use(require("express-session")({
    secret: "secret",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


mongoose.connect("mongodb://localhost/yelpcamp");

// Camp.create({
//     name: "Granite Hill",
//     image: "https://img.hipcamp.com/image/upload/c_limit,f_auto,h_1200,q_60,w_1920/v1444773347/campground-photos/cdxdho9t8v62cfzgkmtm.jpg",
//     description: "beautiful, but no services"
// });


//Cool way to apply this pass through to all routes.
app.use(function(req,res,next){
    res.locals.currentUser = req.user;
    next();
})


app.use("/camps/:id/comments/", commentRoutes);
app.use("/camps", campRoutes);
app.use(indexRoutes);


app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Yelp Camp is up!!");
});




