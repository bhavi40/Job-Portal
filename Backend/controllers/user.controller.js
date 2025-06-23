import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


export const register=async(req,res)=>{
    try{
       const {fullname, email, phoneNumber, password, role}=req.body;
       if (!fullname || !email || !phoneNumber || !password || !role)
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
        phoneNumber,
        password:hashedPassword,
        role
       });
       return res.status(200).json({
        message:'Account Created Successfully.',
        success:true
       });

    }catch(error){
        console.log(error);

    }
}

//login function
export const login= async(req,res)=>{
    try{
        const {email, password, role}=req.body;
        if (!email || !password ||!role){
            return res.status(400).json({
                message:'Something is missing.',
                success:false
            });
        };
        //check user there or not
        let user= await User.findOne({email})
        if(!user){
            return res.status(400).json({
                message:'Incorrect Email or Password',
                success:false
            })
        }
        //check password matches or not
        const isPasswordMatch= await bcrypt.compare(password,user.password)
        if(!isPasswordMatch){
            return res.status(400).json({
                message:'Incorrect Email or Password',
                success:false
            })
        }
        //check role correct or not
        if (role != user.role){
            return res.status(400).json({
                message:"Account doesn't exist with Current role",
                success:false
            });
        }
        //Generating Token- u can decide what info to keep
        const tokenData={
            UserID:user._id //_id is automatically generated mongodb, it acts as primary key
        }
        const token=await jwt.sign(tokenData,process.env.SECRET_KEY,{expiresIn:'1d'})//expires in 1day

        user={
            _id:user._id,
            fullname:user.fullname,
            email:user.email,
            phoneNumber:user.phoneNumber,
            role:user.role,
            profile:user.profile
        }
        //token is stored in cookies
        return res.status(200).cookie("token",token, {maxAge:1*24*60*60*1000, httpsOnly:true, sameSite:'strict'}).json({
            message:`Welcome back ${user.fullname}`,
            user,
            success:true
        })

    }catch(error){
        console.log(error);

    }
}

export const logout=async(req,res)=>{
    try{
        //emptying the token
        return res.status(200).cookie("token"," ",{maxAge:0}).json({
            message:"Logged Out Successfully",
            success:true
        })
    }catch(error){
      console.log(error);
    }
}

//if user edits anything in fronend this will help you to handle that logic
export const updateProfile=async (req,res)=>{
    try{
        const {fullname,email,phoneNumber,bio,skills}=req.body;
        const file=req.file;

       //cloudinary code will be here for resume

       //skills will be in string format, we have to convert it into array
       let skillsArray;
       if(skills){
          skillsArray=skills.split(",");
       }
       //for updating as well we need to authenticate
       const userId=req.id; //middleware authentication

       let user=await User.findByIdAndUpdate(userId);
       if(!user){
        return res.status(400).json({
            message:'User not found.',
            success:false
        })
       }
        if(fullname) user.fullname=fullname
        if(email) user.email=email
        if(phoneNumber) user.phoneNumber=phoneNumber
        if(bio) user.profile.bio=bio
        if(skills) user.profile.skills=skillsArray

        //resume code later

        await user.save();

        user={
            _id:user._id,
            fullname:user.fullname,
            email:user.email,
            phoneNumber:user.phoneNumber,
            role:user.role,
            profile:user.profile
        }

        return res.status(200).json({
            message:"Profile Updated Succesfully.",
            user,
            success:true
        });

    }catch(error){
        console.log(error);
    }
}