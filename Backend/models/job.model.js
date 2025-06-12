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
        required:true
    },
    Position:{
        type:Number,
        required:true
    },
    company:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Company',
        required:true
    },
    created_by:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    application:[
        {
        type:mongoose.Schema.Types.ObjectId,
        ref:'Application'
    }

    ]
},{timestamps:true});
export const job=mongoose.model("Job", jobSchema);