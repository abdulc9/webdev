var mongoose=require("mongoose");
var Campground=require("./models/campground");
var Comment=require("./models/comment");
var data=[{name:"cosmic"
,image:"https://images.pexels.com/photos/699558/pexels-photo-699558.jpeg?auto=compress&cs=tinysrgb&h=350"
,description:"very  nice place"},
{name:"nightly"
,image:"https://images.pexels.com/photos/618848/pexels-photo-618848.jpeg?auto=compress&cs=tinysrgb&h=350"
,description:"too good"},
{name:"mountain view",image:"https://images.pexels.com/photos/93858/pexels-photo-93858.jpeg?auto=compress&cs=tinysrgb&h=350",
description:"adventrous"    
}
    ];

function seedDb()
{
Campground.remove({},function(err){
    if(err)
    console.log(err);
    /*console.log("removed");
    data.forEach(function(seed){
    Campground.create(seed,function(err,campground){
        if(err)
        {
            console.log(err);
        }
    
        else
        console.log("added data");
        Comment.create({text:"i wish i be there",
            author:"monosa"
        },function(err,comment){
            if(err)
            console.log(err);
            else{
            campground.comments.push(comment);
            campground.save();
            console.log("created new one");
        }
            
        })
        
    })
    
})*/
});
}

module.exports=seedDb;