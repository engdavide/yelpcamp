const express = require('express');
const router = express.Router();
const Camp = require('../models/camps')
const User = require('../models/user')

//Index 
router.get("/", function(req, res){
    Camp.find({}, function(err, allcamps){
        if(err){
            console.log(err)
        } else {
            res.render("camps/index", {camps: allcamps});
        }
    })
});

// CREATE
router.post("/", isLoggedIn, function(req, res){
    let name = req.body.name;
    let image = req.body.image;
    let desc = req.body.description;
    let newCamp = {name: name, image: image, description: desc};
        Camp.create(newCamp, function(err, newlyCreated){
            if(err){
                console.log(err);
            }else{
                newlyCreated.author.id = req.user._id;
                newlyCreated.author.username = req.user.username;
                newlyCreated.save();
                res.redirect("/camps"); 
            }
        })

});

//NEW
router.get("/new", isLoggedIn, function(req, res) {
    res.render("camps/new");
})

//SHOW
router.get("/:id", function(req, res){
    Camp.findById (req.params.id).populate("comments").exec(function(err, foundCamp){
            if(err){
                    console.log(err);
            } else{ res.render("camps/show", {camp: foundCamp, user: User});
            }
    });
});

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}


module.exports = router;