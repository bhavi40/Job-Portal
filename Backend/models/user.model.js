import mongoose from "mongoose";

const userSchema= new mongoose.Schema({
    fullname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    PhoneNumber:{
        type:Number,
        required:true
    },
    Password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:['Student','Recruiter'],
        required:true
    },
    profile:{
        bio:{type:String},
        skills:[{type:String}],
        resume:{type:String}, //URL to resume file
        resumeOriginalName:{type:String},
        Company:{type:mongoose.Schema.Types.ObjectId, ref:'Company'}, //Company table
        profilePhoto:{
            type:String,
            default:""
        }

    },

},{timestamps:true});

export const User=mongoose.model('User',userSchema);
