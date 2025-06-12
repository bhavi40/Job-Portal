import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const register=async(req,res)=>{
    try{
       const {fullname, email, phonenumber, password, role}=req.body;
       if (!fullname || !email || !phonenumber || !password || !role)
        {
            return res.status(400).json({
                message:"Something is missing",
                success:false
            });
       };
       //checking while signup if that mailid already exists or not
       const user=await User.findOne({email});
       if(user){
         return res.status(400).json({
            message:"User already exists with this email. ",
            success:false
         });
       }
       //Hide or hash the password
       const hashedPassword=await bcrypt.hash(password, 10);

       await User.create({
        fullname,
        email,
        phonenumber,
        password:hashedPassword,
        role
       })

    }catch{

    }
}