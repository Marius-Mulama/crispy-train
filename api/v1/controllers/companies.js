const pool = require("../utils/database/db-connection")
const queries = require("../utils/database/company-queries")


const companies_get_all = (req,res,next)=>{
    pool.query(queries.viewAllCompanies,[], (error,results)=>{
        if(error){
            return res.status(500).json({
                message:"An Error Occured"
            });
        }

        //console.log(results.rows)

        console.log(results)

        return res.status(200).json({
            count: results.rows.length,
            results: results.rows
        });
    });
}

const companies_get_one = (req,res)=>{
    const slug = req.params.slug

    pool.query(queries.viewSingleCompany,[slug],(error, results)=>{
        if(error){
            return res.status(500).json({
                message: "An Error Occured"
            });
        }

        console.log(results)

        return res.status(200).json({
            count: results.rows.length,
            result: results.rows[0]
        })

    })
    
}


const companies_get_jobs = (req,res)=>{
    return res.status(200).json({
        message:"Get all jobs available in the comany"
    })
}

const create_company = (req,res)=>{
    const name = req.body.name
    const description = req.body.description;
    const location = req.body.location
    const website = String(req.body.website)

    pool.query(queries.createCompany,[name,description,location,website],(error, results)=>{
        if(error){
            let infoMessage = "Error Occured"

            if(error.code == "23505"){
                infoMessage = "A company with the same name already exists";
            }

            //console.log(error.detail)
            return res.status(500).json({
                message:infoMessage,
                error:error
            })
        }


        res.status(201).json({
            message:"Created Succesfully",
            //result:results
        })
    })

}

//TODO Modify Company
const modify_company = (req,res)=>{
    return res.status(200).json({
        message:"Modify company"
    })
}


module.exports = {
    companies_get_all,
    companies_get_one,
    companies_get_jobs,
    create_company,
    modify_company,

}