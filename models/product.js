import mongoose, { Schema } from "mongoose";

const productScheme = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    price : {
        type : Number,
        required : true
    },
    description : {
        type : String,
        required : true
    }

})

const Product = mongoose.model("Product",productScheme)

export default Product;