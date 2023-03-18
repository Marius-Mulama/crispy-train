const { Pool } = require("pg");
const jwt = require("jsonwebtoken");


const queries = require("../utils/database/project-queries");
const pool = require("../utils/database/db-connection");
const { checkProject } = require("../utils/checks/do-checks");


const addProject =(req,res)=> {
    const user_id = getUserId(req.headers.authorization.split(" ")[1]);
    const title = req.body.title;
    const description = req.body.description;
    const link = String(req.body.link);
    const tech = req.body.technologies

    const issues = checkProject(title,description,link)

    if(issues){
        return res.status(400).json({
            message:"Error Occured",
            error:issues
        })
    }



    pool.query(queries.addProject,[user_id, title, description, link, tech], (error,result)=>{

        if(error){
            return res.status(500).json({
                message:"Error Adding project to dataase",
                error:error
            })
        }


        if(result){
            return res.status(200).json({
                message:"Project Added Successfully",
                result:result
            })
        }

    })




}

const updateProject = (req,res)=>{
    const user_id = getUserId(req.headers.authorization.split(" ")[1]);
    const project_id = req.params.id
    const title = req.body.title;
    const description = req.body.description;
    const link = String(req.body.link);
    const tech = String(req.body.technologies)

    console.log(project_id)


    const issues = checkProject(title,description,link)

    if(issues){
        return res.status(400).json({
            message:"Error Occured",
            error:issues
        })
    }


    pool.query(queries.updateProject,[title, description, link, tech,project_id,user_id], (error,result)=>{

        if(error){
            return res.status(500).json({
                message:"Error Occured while changing project details",
                error:error
            })
        }


        if(result){
            return res.status(200).json({
                message:"Project Modified Successfully",
                result:result
            })
        }

    })



    


}

const deleteProject = (req,res)=>{
    const user_id = getUserId(req.headers.authorization.split(" ")[1]);
    const project_id = req.params.id

    pool.query(queries.deleteProject,[user_id,project_id],(error,result)=>{
        if(error){
            return res.status(500).json({
                message:"Error Occured while deleting project",
                error:error
            })
        }


        if(result){
            return res.status(200).json({
                message:"Project Deleted Successfully",
                result:result
            })
        }
    })
}


function getUserId(webtoken){
    let token = webtoken;
    let decoded = jwt.verify(token, process.env.JWT_KEY);

    console.log(typeof(decoded.id))
  
    return decoded.id;
  }



module.exports={
    addProject,
    updateProject,
    deleteProject,
    
}