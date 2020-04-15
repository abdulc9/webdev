var express=require("express");
var router=express.Router();
var User         =require("../models/user");
var passport=require("passport");
router.get("/",function(req,res){
    res.render("landing");
});

router.get("/register",function(req,res){
    res.render("register");
});
router.post("/register",function(req,res){
   var username=new User({username:req.body.username});
    User.register(username,req.body.password,function(err,user)
    {
        if(err){
    console.log(err)
        req.flash("error",err.message);
        return res.redirect("register");
            
        }
        passport.authenticate("local")(req,res,function(){
           req.flash("success","welcome to yelp camp "+user.username);
            res.redirect("/campground");
        });
    });
});
router.get("/login",function(req,res){
    res.render("login");
});
router.post("/login",passport.authenticate("local",{
    successRedirect:"/campground",
    failureRedirect:"/login"
    
}),
    function(req,res){
    
});
router.get("/logout",function(req,res){
    req.logout();
    req.flash("success","logged u out");
    res.redirect("/campground");
});

    module.exports=router;