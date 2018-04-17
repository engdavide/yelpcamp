const express = require('express');
const router = express.Router({mergeParams: true}); //if passing a value up to the app page

const Camp = require('../models/camps');
const Comment = require ('../models/comment');

//comment routes

router.get("/new", isLoggedIn, function(req, res){
    Camp.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
        } else {
            res.render("comments/new", {camp: campground});
        }
    })

});

router.post("/", isLoggedIn, function(req, res){
    Camp.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
            res.redirect("/camps/"+ campground._id);
        } else {
                Comment.create(req.body.comment, function(err, comment){
                    if(err){
                        console.log(err);
                    } else {
                        comment.author.id = req.user._id;
                        comment.author.username = req.user.username;
                        comment.save();
                        campground.comments.push(comment);
                        campground.save();
                        res.redirect("/camps/" + campground._id);
                    }
                })
        }
            
    })
})

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}



module.exports = router;