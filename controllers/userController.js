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

export function viewUser(req,res){
    User.find().then((results)=>{
        res.json(results);
    }).catch((error)=>{
        res.status(500).json({
            error : "Can't find users"
        })
    })
}


