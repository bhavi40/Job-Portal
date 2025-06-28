import { Job } from "../models/job.model.js"; 


//this controller is admins for posting jobs
export const postJob=async (req,res)=>{
    try{
        const {title, description, requirements, salary, location, jobType, experience, position, companyId}=req.body;
        const userId=req.id;
        if (!title || !description || !requirements || !salary || !location || !jobType || !experience || !position || !companyId){
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
            company:companyId,
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

//This is for students which handles the search functionality- For ex. if we type a react dev in search box we get all jobs of reactdev
export const getAllJobs=async (req,res)=>{
    try{
        //this keyword will come from query and fetches keyword related jobs, if keyword is not provided it will give you all the jobs
        const keyword=req.query.keyword || "";
        //This is mangodb search query- or means means it will return jobs where either the title OR the description contains the search keyword.
        const query={
            $or:[
                {title:{$regex:keyword, $options:"i"}},
                {requirements:{$regex:keyword, $options:"i"}},
                {description:{$regex:keyword, $options:"i"}},

            ]
        };
        //Based on query it will find you job in the job model.
        const jobs=await Job.find(query).populate({
            path: "company"
        }).sort({createdAt:-1});
        if(!jobs){
            return res.status(400).json({
                message:"Jobs not found",
                success:false
            })
        }
        return res.status(200).json({
            jobs,
            success:true
        })


    }catch(error){
        console.log(error)
    }
}

//students to fetch the job from jobid
export const getJobById=async(req,res)=>{
    try{
        //here we are asking for one specfic job so we are using params, where as in earlier controller we used query there we are getting many jobs based on the keyword.
        const jobId=req.params.id;
        const job=await Job.findById(jobId);
        if(!job){
            return res.status(400).json({
                message:"Jobs not found",
                success:false
            })
        };
        return res.status(200).json({
            job,
            success:true
        })
    }catch(error){
        console.log(error)
    }

}

//How many jobs created by the admin
export const getAdminJobs=async (req,res)=>{
    try{
        const adminId=req.id;
        const jobs= await Job.find({created_by:adminId});
        if(!jobs){
             return res.status(400).json({
                message:"Jobs not found",
                success:false
            })
        };
        return res.status(200).json({
            jobs,
            success:true
        })

    }catch(error){
        console.log(error)
    }
}