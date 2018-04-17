const express = require('express');
const router = express.Router();
const passport = require('passport');

const Camp = require('../models/camps');
const Comment = require ('../models/comment');
const User = require('../models/user');

router.get("/", function(req, res){
    res.render("home");
});

// AUTH routes


//show regis form
router.get("/register", function(req, res){
    res.render("register");
});

router.post("/register", function(req, res){
    let newUser = ({username: req.body.username});
    User.register(newUser, req.body.password, function(err, userCB){
        if(err){
            console.log(err);
            return res.render("register")
        }
        passport.authenticate("local")(req, res, function(){
            res.redirect("/camps");
        });
    });
});


//LOGIN

router.get("/login", function(req, res){
    res.render("login");
});

router.post("/login", passport.authenticate("local",
    {
        successRedirect: "/camps",
        failureRedirect: "/login"
    }), function(req, res){
        
});

//LOGOUT

router.get("/logout", function(req,res){
    req.logout();
    res.redirect("/camps");
});

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router;