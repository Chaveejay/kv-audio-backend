import Product from "../models/product.js";
import { isItAdmin } from "./userController.js";

export function addProduct(req,res){
    console.log(req.user)

    if(req.user ==null){
        res.status(401).json({
            message: "Please login and try again"
        });
        return;
    }

    if(req.user.role != "admin"){
        res.status(403).json({
            message : "You are not authorized to perform this action"
        })
        return
    }

    const data = req.body;
    const newProduct = new Product(data);

    newProduct.save().then(()=>{
        res.json({
            message : "Product added successfully"
        })
    }).catch((error)=>{
        res.status(500).json({
            error : "Product adding failed"
        })
    })
}

export async function viewProduct(req,res){

    try{
    if(isItAdmin(req)){
            
         const products = await Product.find();
        res.json(products)
        }
    else {
        const products =await Product.find({availability:true});
            res.json(products)
    }
    }catch(error){
        res.json({
            error : "Failed to get products"
        })
    }
}

export async function updateProduct(req,res){
try{
    if(isItAdmin(req)){
        const key = req.params.key;
        const data = req.body;

        const result =await Product.updateOne({
           key : key
        },data)
        if(result.modifiedCount >0){
        res.json({
            message : "Product updated successfully"
        })
    }
    else{
        res.json({
            message : "You didn't update any fields of the product"
        })
    }
    }else{
        res.json({
            message : "You are not authorized to perform this action"
        })
    }

}catch(e){
    res.json({
        message :"Failed to update products"
    })
}
}

export async function deleteProduct(req,res) {
    try{
        const key =req.params.key;
        if(isItAdmin(req)){ 
            const result = await Product.deleteOne({
                key : key
            })
            if(result.deletedCount >0){
                res.json({
                    message : "Product deleted successfully"
                })
            }
            else{
                res.json({
                    message : "You didn't delete any product"
                })
            }

        }else{
            res.json({
                message : "You are not authorized to delete products"
            })
        }

    }catch(e){
        res.json(e.message)
    }
}