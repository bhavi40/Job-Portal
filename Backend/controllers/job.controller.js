import {Job} from "../models/job.model";
export const postJob=async (req,res)=>{
    try{
        const {title,description, requirements, salary, location, jobType, experience, position, companyID}=req.body;
        const userId=req.id;
        if (!title || !description || !requirements || !salary || !location || !jobType || !experience || !position || !companyID){
            return res.status(400).json({
                message:"Something is missing.",
                success:false
            })
        }
        const job=await Job.create({
            title,
            description,
            requirements : requirements.split(","),
            salary:Number(salary), 
            location, 
            jobType, 
            experienceLevel:experience,
            position, 
            company:companyID,
            created_by:userId

        });
        return res.status(200).json({
            message:"New job created successfully.",
            job,
            success:true
        });
    }catch(error){
        console.log(error)
    }
}

//getall jobs
export const getAllJobs=async (req,res)=>{
    try{
        const keyword=req.query.keyword || "";
        const query={
            
        }

    }catch(error){
        console.log(error)
    }
}