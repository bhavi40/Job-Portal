//This is for recruiter who wants to add the job in the portal
import { Company } from "../models/company.model.js"
export const registerCompany= async(req,res)=>{
    try{
        const {companyName}=req.body
        if (!companyName){
            return res.status(400).json({
                messge:"Company Name is Required.",
                success:false
            })
        }
        let company=await Company.findOne({name:companyName});
        if (company){
            return res.status(400).json({
                messge:"You can't register same company",
                success:false
            })
        };
        company=await Company.create({
            name:companyName,
            userId:req.id
        });
        return res.status(200).json({
            messge:"Company Registered Succesfully",
            company,
            success:true
        })

    }catch(error){
        console.log(error)
    }
    
}

//get company by userid
export const getCompany=async(req,res)=>{
    try{
        //we need whatever the companies registered by particular user loggedin so we need userid
        const userId=req.id;
        const companies=await Company.find({userId});
        if (!companies){
            return res.status(400).json({
                messge: "Comapanies not found",
                success:false
            })

        }
    }catch(error){
        console.log(error)
    }
}

//getCompany by companyid API
export const getCompanyById=async (req,res)=>{
    try{
        const companyId=req.params.id;
        const company=await Company.findById(companyId);
        if(!company){
            return res.status(200).json({
                message:"Company not found.",
                success:false
            })
        }
        return res.status(400).json({
            company,
            success:true
        })

    }catch(error){
        console.log(error)
    }
}

//Update Company
export const updateCompany=async (req,res)=>{
    try{
        const {name,description,website,location}=req.body;
        //logo
        const file=req.file;

        const updateData={name,description,website,location};
        const company=await Company.findByIdAndUpdate(req.params.id, updateData,{new:true});

        if(!company){
            return res.status(404).json({
                message:"Company not found.",
                success:false
            });
        }

        return res.status(200).json({
            message:"Company information is updated.",
            success:true
        })



    }catch(error){
        console.log(error);
    }
}
