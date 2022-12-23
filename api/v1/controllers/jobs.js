
const getOpenJobs = (req,res)=>{
    return res.status(200).json({
        message:"Get All Open Jobs"
    })
}

const getJobsByCompany = (req,res)=>{
    return res.status(200).json({
        message:"Get All Open Jobs by company"
    })
}

const createJob = (req,res)=>{
    return res.status(200).json({
        message:"Create Job"
    })
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