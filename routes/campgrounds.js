var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var middleware = require("../middleware");

// INDEX ROUTE - show existing campgrounds
router.get("/", function (req, res) {
    // Get all campgrounds from DB
    Campground.find({}, function (err, campgrounds) {
        if (err)
            console.log(err);
        else {
            res.render("campgrounds/index", { campgrounds: campgrounds });
        }
    })
});

// CREATE ROUTE - create new campground and save to DB
router.post("/", middleware.isLoggedIn, function (req, res) {
    // get data from form and add to campgrounds array
    // redirect back to campgrounds page
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    Campground.create(
        {
            name: name,
            image: image,
            description: description,
            author: author
        }, function (err, campground) {
            if (err) {
                console.log("error");
            }
            else {
                console.log("Newly created campground: ")
                console.log(campground);
            }
        });
    res.redirect("/campgrounds");
});

// NEW - Show form to create new campgrounds
router.get("/new", middleware.isLoggedIn, function (req, res) {
    res.render("campgrounds/new");
});

// SHOW - show information about campground with a certain id
router.get("/:id", function (req, res) {
    // find the campground with the provided ID
    Campground.findById(req.params.id).populate("comments").exec(function (err, foundCampground) {
        if (err)
            console.log(err);
        else {
            res.render("campgrounds/show", { campground: foundCampground });
        }
    });
});

// EDIT
router.get("/:id/edit", middleware.checkCampgroundOwnership, (req, res) => {
    Campground.findById(req.params.id, (err, foundCampground) => {
        res.render("campgrounds/edit", { campground: foundCampground });
    })
});

// UPDATE
router.put("/:id", middleware.checkCampgroundOwnership, (req, res) => {
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, (err, updatedCampground) => {
        if (err) {
            res.redirect("/campgrounds");
        }
        else
            res.redirect("/campgrounds/" + updatedCampground._id);
    });
});

//DESTROY
router.delete("/:id", middleware.checkCampgroundOwnership, (req, res) => {
    Campground.findByIdAndDelete(req.params.id, (err) => {
        if (err)
            res.redirect("/campgrounds");
        else
            res.redirect("/campgrounds");
    });
});

module.exports = router;