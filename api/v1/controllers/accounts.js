const queries = require("../utils/accounts-queries");
const pool = require("../utils/db-connection");

const login = (req,res)=>{
    const email = req.body.email;
    const password = req.body.password;

    pool.query(queries.login,[email,password],(error,result)=>{
        if (error){
            return res.status(500).json({
                message:"An Error occured",
                error:error
            })
        }

        if(result.rows.length === 1){
            console.log(result)
            res.status(200).json({
                message:"Succesful Login",
                result:result.rows[0]
            })
        }

        if (result.rows.length != 1){
            return res.status(403).json({
                message:"Authentication Failed"
            })
        }
    })

}


const signup =  (req,res)=>{
    const first_name = req.body.first_name
    const last_name  = req.body.last_name
    const email = req.body.email
    const password = req.body.password

    //console.log(req.body)


    pool.query(queries.createUserWithPass,[first_name, last_name, email, password],(error,result)=>{
        if(error){
            return res.status(500).json({
                message:"An error Ocuured",
                error:error            
            })
        }

        if (result){
            return res.status(200).json({
                message:"User Created",
                result:result.rowCount
            })
        }


        
    })
}

module.exports = {
    login,
    signup,

}