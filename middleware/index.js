var middlewareObj={};
var Campground=require("../models/campground");
var Comment=require("../models/comment");
middlewareObj.checkCommentOwnership=function(req,res,next){
   if(req.isAuthenticated())
Comment.findById(req.params.comment_id,function(err,foundComment){
    if(err)
    res.redirect("back");
    else
    {
        if(foundComment.author.id.equals(req.user._id))
        {
            next()
        }
        else{
        res.flash("error","u dont hv permission to do that")
        res.redirect("back");
    }
    }
})
else{
res.flash("error","u need to be logged in")
res.redirect("back");
}
}
middlewareObj.checkCampgroundOwnership=function(req,res,next){
     if(req.isAuthenticated())
Campground.findById(req.params.id,function(err,foundCampground){
    if(err)
    {
    req.flash("error","campground not found")
    res.redirect("back");
    }
    else
    {
        if(foundCampground.author.id.equals(req.user._id))
        {
            next()
        }
        else{
     
        res.send("back");
    }
    }
})
else{
req.flash("error","u need to be logged in to ")    
res.redirect("back");
}
}  
middlewareObj.isloggedin=function(req,res,next){
    if(req.isAuthenticated())
        return next();
        req.flash("error","you need to be logged in to do that")
    res.redirect("/login");    
    
}

module.exports=middlewareObj;