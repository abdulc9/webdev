var express=require("express");
var app=express();
var methodOverride=require("method-override")
var mongoose=require("mongoose");
var bodyparser=require("body-parser");
var Campground=require("./models/campground.js");
var Comment=require("./models/comment.js");
var passport=require("passport");
var flash=require("connect-flash");
var LocalStrategy=require("passport-local");
var User         =require("./models/user");
var seedDb=require("./seed");
var commentRoutes=require("./routes/campground"),
    campgroundRoutes=require("./routes/comment"),
    indexRoutes=require("./routes/index");

app.use(bodyparser.urlencoded({extended:true}));

var c="mongodb+srv://abdul:abdul@yelpcamp.9jqm3.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
mongoose.connect(c);
app.use(methodOverride("_method"));
app.use(flash());
app.use(require("express-session")({
    secret:"reckon live on",
    resave:false,
    saveUninitialized:false
}));
app.use(passport.initialize());
app.use(passport.session()); 
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req,res,next){
    res.locals.currentUser=req.user;
    res.locals.error=req.flash("error")
    res.locals.success=req.flash("success")
    next();
})

app.set("view engine","ejs");
app.use(express.static(__dirname + "/public"));
app.use(commentRoutes);
app.use(indexRoutes);
app.use(campgroundRoutes);


var port=process.env.PORT || 5000

app.listen(port ,function(){
    console.log("server is listening");
});
