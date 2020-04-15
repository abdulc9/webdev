var express=require("express");
var router=express.Router();
var Campground=require("../models/campground.js");
var middleware=require("../middleware")
router.get("/campground",function(req,res){
    Campground.find({},function(err,allcampground){
        if(err)
        console.log(err);
        else
        res.render("campground/index",{campgrounds:allcampground});
    })
});

router.post("/campground",middleware.isloggedin,function(req,res){
    var name=req.body.name;
    var image=req.body.image;
    var desc=req.body.description;
    var author={
      id:req.user._id,
      username:req.user.username
    };
    var obj={name:name,image:image,description:desc,author:author};
    Campground.create(obj,function(err,campground)
    {
    
    if(err)
    console.log(err);
    else
    {
    console.log(campground);
    res.redirect("/campground");
    }
    });
});
router.get("/campground/new",middleware.isloggedin,function(req,res){
    res.render("campground/new");
});

router.get("/campground/:id", function(req, res){
    //find the campground with provided ID
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log(err);
        } else {
            //render show template with that campgroun
            res.render("campground/show", {campground: foundCampground});
        }
    });
});
router.get("/campground/:id/edit",middleware.checkCampgroundOwnership,function(req,res){
    Campground.findById(req.params.id,function(err,foundCampground){
        if(err)
        res.redirect("/campground");
        else
        {
            res.render("campground/edit",{campground:foundCampground})
        }
    })
})
router.put("/campground/:id",middleware.checkCampgroundOwnership,function(req,res){
    Campground.findByIdAndUpdate(req.params.id,req.body.campground,function(err,updatedCampground){
        if(err)
        res.redirect("/campground");
        else
        res.redirect("/campground/"+req.params.id);
    })
})
router.delete("/campground/:id",middleware.checkCampgroundOwnership,function(req,res){
    Campground.findByIdAndRemove(req.params.id,function(err){
    if(err)
    res.redirect("/campground")
    
    else
    res.redirect("/campground")
})
})
/*function isloggedin(req,res,next){
    if(req.isAuthenticated())
        return next();
    res.redirect("/login");    
    }
function checkCampgroundOwnership(req,res,next){
    if(req.isAuthenticated())
Campground.findById(req.params.id,function(err,foundCampground){
    if(err)
    res.redirect("back");
    else
    {
        if(foundCampground.author.id.equals(req.user._id))
        {
            next()
        }
        else
        res.send("back");
    }
})
else
res.redirect("back");
}    */
module.exports=router;