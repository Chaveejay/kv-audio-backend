import User from "../models/user.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';

dotenv.config();

export function registerUser(req,res){

    const data =req.body;

    data.password = bcrypt.hashSync(data.password,10);

    const newUser = new User (data);

    newUser.save().then(()=>{
        res.json({
            message : "User Registered Successfully"
        })
    }).catch((error)=>{
        res.status(500).json({
            error : "Failed to Register User"
        })
    })
}

export function loginUser(req,res){
    const data = req.body;

    User.findOne({
        email : data.email
    }).then((user)=>{
        if(user==null){
            res.status(404).json({
                error : "User Not found"  
            });
        }else{
            
        const isPasswordCorrect = bcrypt.compareSync(data.password,user.password)

        if(isPasswordCorrect){

            const token = jwt.sign({
                firstName : user.firstName,
                lastName : user.lastName,
                phone : user.phone,
                email : user.email,
                role : user.role,
                profilePicture : user.profilePicture
                
            },process.env.JWT_SECRET_KEY)

            res.json({
                message : "Login Success",
                token : token
            })
        }else{
            res.json({
                error : "Login Failed"
            })
        }
    }
        
    });
}


export async function viewUser(req,res) {
    try{
    const viewUser = await User.find();
    res.json(viewUser)
    }catch{
        res.status(500).json({
             error : "Can't find users"
            })
    }

}

export function isItAdmin(req){
    let isAdmin =false;
    if(req.user !=null){
        if(req.user.role == "admin"){
            isAdmin = true;
        }
    }
    return isAdmin;
}

export function isItCustomer(req){
    let isCustomer =false;
    if(req.user !=null){
        if(req.user.role == "customer"){
            isCustomer = true;
        }
    }
    return isCustomer;
}

