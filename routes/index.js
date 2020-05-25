var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");

// Root
router.get("/", function (req, res) {
    res.render("landing");
});

// Show register route
router.get("/register", (req, res) =>{
    res.render("register");
});

// register user route
router.post("/register", (req, res) => {
    var newUser = new User({username: req.body.username });
    User.register(newUser, req.body.password, (err, user) => {
        if(err){
            req.flash("error", err.message);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, () => {
            res.redirect("/campgrounds");
        });
    });
});

// Login show route
router.get("/login", (req, res) => {
    res.render("login");
});

// Login logic route
router.post("/login", passport.authenticate("local",
    {
     successRedirect : "/campgrounds",
     failureRedirect: "/login"
    }), (req, res) => {});

// Logout route
router.get("/logout", (req, res) => {
    req.logout();
    req.flash("success", "Logged You Out");
    res.redirect("/campgrounds");
});

module.exports = router;