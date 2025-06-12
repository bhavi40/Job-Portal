import mongoose, { Types } from "mongoose";

const jobSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    Description:{
        type:String,
        required:true
    },
    requirments:[{
        type:String
    }],
    salary:{
        type:String,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    jobType:{
        type:String,
        require:true
    },
})