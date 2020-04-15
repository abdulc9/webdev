var express=require("express");
var router=express.Router();
var Campground=require("../models/campground.js");
var Comment=require("../models/comment.js");
var middleware=require("../middleware");
router.get("/campground/:id/comments/new",middleware.isloggedin,function(req,res){
    Campground.findById(req.params.id,function(err,campground){
        if(err)
        console.log(err);
        else
        res.render("comment/new",{campground:campground});    
    })
    
})
router.post("/campground/:id/comments",middleware.isloggedin,function(req,res){
    Campground.findById(req.params.id,function(err,campground)
    {
        if(err)
        res.redirect("/campground");
        else
        {
            Comment.create(req.body.comment,function(err,comment){
                if(err){
                req.flash("error","no comment present");
                console.log(err);
                }
                else
                comment.author.id=req.user._id;
                comment.author.username=req.user.username;
                comment.save();
                campground.comments.push(comment);
                campground.save();
                req.flash("success","successfully added comment");
                res.redirect("/campground/"+campground._id);
            
            });
        };
    });
});
router.get("/campground/:id/comments/:comment_id/edit",middleware.checkCommentOwnership,function(req,res){
    Comment.findById(req.params.comment_id,function(err,foundcomment){
    if(err)
    res.redirect("back")
    else
    res.render("comment/edit",{campground_id:req.params.id,comment:foundcomment});
})
})
router.put("/campground/:id/comments/:comment_id",middleware.checkCommentOwnership,function(req,res){
    
    Comment.findByIdAndUpdate(req.params.comment_id,req.body.comment,function(err,updatedcomment){
        if(err)
        res.redirect("back")
        else{
          res.redirect("/campground/"+req.params.id)  
        }
    })
})
router.delete("/campground/:id/comments/:comment_id",middleware.checkCommentOwnership,function(req,res){
    Comment.findByIdAndRemove(req.params.comment_id,function(err){
        if(err)
        res.redirect("back")
        else
        {
            req.flash("success","comment deleted")
         res.redirect("/campground/"+req.params.id)   
        }
    })
})
/*function isloggedin(req,res,next){
    if(req.isAuthenticated())
        return next();
    res.redirect("/login");    
    }
function checkCommentOwnership(req,res,next){
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
        else
        res.redirect("back");
    }
})
else
res.redirect("back");
}*/    
    module.exports=router;