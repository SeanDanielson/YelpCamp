// LIBRARIES
var express = require("express"),
    bodyParser = require("body-parser"),
    mongoose = require('mongoose'),
    passport = require("passport"),
    flash = require('connect-flash'),
    LocalStrategy = require("passport-local"),
    methodOverride = require("method-override"),
    seedDB = require("./seeds");

// ROUTE IMPORTS
var commentRoutes = require("./routes/comments"),
    campgroundRoutes = require("./routes/campgrounds"),
    indexRoutes = require("./routes/index");

// MODEL IMPORTS
var Campground = require("./models/campground");
var Comment = require("./models/comment");
var User = require("./models/user")

// EXPRESS APP
var app = express();

// seedDB();

// MONGOOSE CONFIG
mongoose.set('useUnifiedTopology', true);
mongoose.set('useFindAndModify', false);
// mongoose.connect("mongodb://localhost/yelp_camp", { useNewUrlParser: true });
mongoose.connect(process.env.DATABASEURL, { useNewUrlParser: true });


// EXPRESS/ BODY-PARSER CONFIG
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());

app.set("view engine", "ejs");

// PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "This is quite the secret",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

// ROUTES
app.use(indexRoutes);
app.use("/campgrounds/:id/comments",commentRoutes);
app.use("/campgrounds", campgroundRoutes);

app.listen(process.env.PORT, process.env.IP, function () {
    console.log("server listening...");
});