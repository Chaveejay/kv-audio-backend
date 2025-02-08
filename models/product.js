import mongoose, { Schema } from "mongoose";

const productScheme = new mongoose.Schema({

    key: {
        type : String,
        required: true,
        unique : true
    },
    name : {
        type : String,
        required : true
    },
    category : {
        type: String,
        required : true,
        default : "uncategorized"
    },
    price : {
        type : Number,
        required : true
    },
    dimentions : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    availability : {
        type : Boolean,
        required : true,
        default : true
    },
    image:{
        type: [String],
        required : true,
        default : ["https://media.istockphoto.com/id/1396814518/vector/image-coming-soon-no-photo-no-thumbnail-image-available-vector-illustration.jpg?s=612x612&w=0&k=20&c=hnh2OZgQGhf0b46-J2z7aHbIWwq8HNlSDaNp2wn_iko="]
    }

})

const Product = mongoose.model("Product",productScheme)

export default Product;