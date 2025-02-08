import Review from "../models/review.js";

export function addReview(req,res){

    if(req.user== null){
        res.status(401).json({
            message : "Please login and try again"
        })
        return
    }
    
    const data = req.body;

    data.name = req.user.firstName + " "+ req.user.lastName;
    data.profilePicture = req.user.profilePicture;
    data.email = req.user.email;
    data.profilePicture = req.user.profilePicture;

    const newReview = new Review(data)

    newReview.save().then(()=>{
        res.json({
            message : "Review Added Successfully"
        })
    }).catch(()=>{
        res.status(500).json({
            error : "Review Addition failed"
        })
    })
}

export async function getReviews(req,res){
    const user = req.user;
    try{
    if (user.role == "admin"){
        const reviews = await Review.find()
        res.json(reviews);
    }
    else{
        const reviews = await Review.find({isApproved:true})
        res.json(reviews);
    }
}catch(error){
    res.status(500).json({
        error : "Faild to get reviews"
    })
}
}

export async function deleteReviews(req,res){
    const email = req.params.email;

    try{
    if (req.user ==null){
        res.status(401).json({
                message : "Please login and try again"
           });
    }
    else if (req.user.role == "admin"){
        const result = await Review.deleteOne({
            email : email
        })
        if(result.deletedCount>0){ res.json({
            message : "Review deleted Successfully"
        })}
        else{
            res.json({
                message : "Review not found or already deleted"
            })
        }
    }
    else if (req.user.role == "customer"){
        if(req.user.email == email){
            const result = await Review.deleteOne({
                email : email
            })
            if(result.deletedCount>0){ res.json({
                message : "Review deleted Successfully"
            })}
            else{
                res.json({
                    message : "Review not found or already deleted"
                })
            }
            
        }else{
            res.json({ error: "You don't have access to perform this action"})
        }
    }
}catch(err){
    res.json(err.message)
}
}

export async function approveReview(req,res){
    const email = req.params.email;
    try{
    if(req.user.role == "admin"){
        const result = await Review.updateOne({
            email: email
        },{
            isApproved : true
        });
    
        if (result.modifiedCount > 0) {
            return res.json({ message: "Review updated successfully" });
        }
    
        return res.status(404).json({ error: "Review not found or already approved" });

        
    }else{

        return res.status(403).json({
            error : "Unauthorized Action"
        }) 
}
    
}catch{
    res.status(500).json({
        error : "There is an error updating review"
    })
}
}
   
