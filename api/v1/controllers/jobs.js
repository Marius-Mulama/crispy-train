const pool = require("../utils/database/db-connection");
const queries = require("../utils/database/jobs-queries");

const getOpenJobs = (req,res)=>{
    return res.status(200).json({
        message:"Get All Open Jobs 12234"
    })
}

const getJobsByCompany = (req,res)=>{
    return res.status(200).json({
        message:"Get All Open Jobs by company"
    })
}

const createJob = (req,res)=>{
    const companyId = 1;
    //title, description, deadline, skills,company_id, posted_by

    const title = req.body.title;
    const description = req.body.description;
    const deadline = req.body.deadline;
    const skills = req.body.skills;
    const posted_by = req.body.posted_by;
    
   
}


const updateJob = (req,res)=>{
    return res.status(200).json({
        message:"Update Job"
    })
}

module.exports = {
    getOpenJobs,
    getJobsByCompany,
    createJob,
    updateJob,

}