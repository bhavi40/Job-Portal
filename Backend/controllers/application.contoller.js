import { Application } from "../models/application.model.js";
import { Job } from "../models/job.model.js";

export const applyJob=async (req,res) =>{
    try{
        const userId=req.id;
        const jobId=req.params.id;
        if (!jobId){
            return res.status(200).json({
                message:"Job Id is required",
                success:false
            })
        }
        //check if userid applied or not
        const existingApplication=await Application.findOne({job:jobId,applicant:userId})
        if(existingApplication){
            return res.status(400).json({
                message:"You have already Applied for this jobs",
                success:false
            })

        }
        //check if job exists or not 
        const job=await Job.findById(jobId);
        if (!job){
            return res.status(400).json({
                message:'Job not found',
                success:false
            })
        }

        //create a new application
        const newApplication= await Application.create({
            job:jobId,
            applicant:userId
        })

        job.applications.push(newApplication._id);
        await job.save();
        return res.status(201).json({
            message:"Job applied successfully",
            success:true

        })

    }catch(error){
        console.log(error)
    }
}

// get all jobs user applied
export const getAppliedJobs=async (req,res)=>{
    try{

    }catch(error){
        console.log(error)
    }

}