import mongoose, { Schema }  from "mongoose";

const reviewSchema = new mongoose.Schema({
    email: {
        type : String,
        required : true,
        unique : true
    },
    name : {
        type : String,
        required : true
    },
    rating: {
        type : Number,
        required : true
    },
    comment : {
        type : String,
        required : true
    },
    date : {
        type : Date,
        required : true,
        default : Date.now()
    },
    isApproved :{
        type : Boolean,
        default : false,
        required : true
    },
    profilePicture:{
        type: String,
        required: true,
        default : "https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg"
    }
})

const Review = mongoose.model("reviews",reviewSchema);

export default Review;