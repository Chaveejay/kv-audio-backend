import Inquiry from '../models/inquiry.js'
import { isItAdmin, isItCustomer } from './userController.js'

export async function addInquiry(req,res) {
    try{
    if(isItCustomer(req)){
        console.log(req.user)
        const data = req.body;
        data.email = req.user.email;
        data.phone = req.user.phone;

        let id = 0;
        const inquiries = await Inquiry.find().sort({id:-1}).limit(1);
        if(inquiries.length == 0){
            id =1;
        }else{
            id = inquiries[0].id +1;
        }
        data.id =id;
        

        const newInquiry = Inquiry (data)

        const response = await newInquiry.save();
        res.json ({
            message : "Inquiry sent successfully",
            id  : response.id
        })

    }else{
        res.json ({
            message : "Only customers can send inquiries"
        })
    }
}catch(e){
    res.json(e.message)
}
}

export async function getInquiries(req,res){
    try{
        if(isItCustomer(req)){
            const inquiries = await Inquiry.find({email:req.user.email})
            if (inquiries.length>0){
            res.json(inquiries)
            }
            else{
                res.json({
                    message : "There are no inquiries"
                })
            }
        }else if(isItAdmin(req)){
            const inquiries = await Inquiry.find();
            if (inquiries.length>0){
            res.json(inquiries)
            }
            else{
                res.json({
                    message : "There are no inquiries"
                })
            }
        }else{
            res.json({
                message : "Please login to view inquiries"
            })
        }
    }
    catch(e){
        res.json(e.message)
    }
}

export async function deleteInquiry(req,res) {
    try{
        
        if(isItAdmin(req)){ 
            const id =req.params.id;
            const result = await Inquiry.deleteOne({
                id : id
            })
            if(result.deletedCount >0){
                res.json({
                    message : "Inquiry deleted successfully"
                })
            }
            else{
                res.json({
                    message : "No inquiry found"
                })
            }

        }else if(isItCustomer(req)){
            const id =req.params.id;
            const result = await Inquiry.deleteOne({
                id : id,email :req.user.email
            })
            if(result.deletedCount >0){
                res.json({
                    message : "Inquiry deleted successfully"
                })
            }
            else{
                res.json({
                    message : "No inquiry found"
                })
            }
           
        }else{
            res.json({
                message : "You are not authorized to perform this action"
            })
        }

    }catch(e){
        res.json(e.message)
    }
}

export async function updateInquiry(req,res){

    try{
  
      if(isItAdmin(req)){
        const id = req.params.id;
        const data = req.body;
  
        await Inquiry.updateOne({id:id},data)
        res.json({
          message : "Inquiry updated successfully"
        })
      }else if(isItCustomer(req)){
        const id = req.params.id;
        const data = req.body;
  
        const inquiry = await Inquiry.findOne({id:id});
        if(inquiry == null){
          res.status(404).json({
            message : "Inquiry not found"
          })
          return;
        }else{
          if(inquiry.email == req.user.email){
  
  
  
            await Inquiry.updateOne({id:id},{message : data.message})
            res.json({
              message : "Inquiry updated successfully"
            })
            return;
          }else{
            res.status(403).json({
              message : "You are not authorized to perform this action"
            })
            return
          }
        }
      }else{
        res.status(403).json({
          message : "You are not authorized to perform this action"
        })
      }
  
    }catch(e){
      res.status(500).json({
        message : "Failed to update inquiry"
      })
    }
  }