const jwt = require("jsonwebtoken");
const { Pool } = require("pg");

const queries = require("../utils/database/accounts-queries");
const pool = require("../utils/database/db-connection");
const { checkExperience } = require("../utils/checks/do-checks");

//TODO
const viewProfile = (req, res) => {
  res.status(200).json({
    message: `View User Profile for user ${req.params.slug}`,
  });
};

const updateProfile = (req, res) => {
  const user_id = getUserId(req.headers.authorization.split(" ")[1]);
  const first_name = req.body.firstname;
  const last_name = req.body.lastname;

  if(!first_name.trim()){
    return res.status(401).json({
      error: "Input Error",
      message: "First Name is Mandatory",
    });
  }


  pool.query(queries.updateProfile,
    [first_name, last_name, user_id],
    (error,result)=>{
      if (error) {
        let infoMessage = "Error Occured";

        console.log(error)

        return res.status(500).json({
          message: infoMessage,
          error:error
        });
      }

      return res.status(201).json({
        message: "Profile Updated Sucessfully",
        result: result,
      });
    }
    )

};

//TODO
const updateEmail = (req,res)=>{
  res.status(200).json({
    message: "Update User Email",
  });
}

//TODO
const addProfilePic = (req,res)=>{
  res.status(200).json({
    message: "Add or Update Profile Picture",
  });
}

const addExperience = (req, res) => {

  const user_id = getUserId(req.headers.authorization.split(" ")[1]);
  const position = String(req.body.position);
  const company = String(req.body.company);
  const description = String(req.body.description);
  const start_date = String(req.body.start_date);
  let end_date = req.body.end_date;
  const location = req.body.location;

  if(!end_date){
    end_date = null;
  }


  const issues = checkExperience(position, company, start_date, location);

  if (issues) {
    return res.status(401).json({
      error: "Input Error",
      message: issues,
    });
  }

  pool.query(
    queries.addExperience,
    [user_id, position, company, description, start_date, end_date, location],
    (error, result) => {
      if (error) {
        let infoMessage = "Error Occured";

        console.log(error)

        return res.status(500).json({
          message: infoMessage,
          //error:error
        });
      }

      return res.status(201).json({
        message: "Experience Added Sucessfully",
        result: result,
      });
    }
  );
};


const updateExperience = (req, res) => {

  const id = req.body.id;
  const user_id = getUserId(req.headers.authorization.split(" ")[1]);
  const position = String(req.body.position);
  const company = String(req.body.company);
  const description = String(req.body.description);
  const start_date = String(req.body.start_date);
  let end_date = req.body.end_date;
  const location = req.body.location;


  

  if(!end_date){
    end_date = null;
  }


  let issues = checkExperience(position, company, start_date, location);

  if(!id){
    issues = "Experience Id is Empty"
  }

  if (issues) {
    return res.status(401).json({
      error: "Input Error",
      message: issues,
    });
  }


  pool.query(
    queries.updateExperience,
    [position, company, description, start_date, end_date, location, id, user_id],
    (error, result) => {
      if (error) {
        let infoMessage = "Error Occured";

        console.log(error)

        return res.status(500).json({
          message: infoMessage,
          //error:error
        });
      }

      return res.status(201).json({
        message: "Experience Updated Sucessfully",
        result: result,
      });
    }
  );
};

const getMyProfile = (req,res)=>{
  const user_id = getUserId(req.headers.authorization.split(" ")[1]);


  pool.query(
    queries.getMyProfile,
    [user_id],
    (error, result) => {
      if (error) {
        let infoMessage = "Error Occured";

        console.log(error)

        return res.status(500).json({
          message: infoMessage,
          //error:error
        });
      }

      if(result){
        const resultJson = result.rows;

        return res.status(200).json({
          full_name:resultJson[0].fullname,
          email:resultJson[0].email,
          slug:resultJson[0].slug,
          experience:result.rows.map((resultJson)=>{
            return {
              "company":resultJson.company,
              "position":resultJson.position,
              "description":resultJson.description,
              "location": resultJson.location,
              "start":resultJson.start_date,
              "end":resultJson.end_date
            }
  
          })
  
          //result: result.rows,
        });

      }
    }
  );


}

const updateRole = (req,res)=>{
  //Check  if data is coming from  admin account
  if(!isAdminus(req.headers.authorization.split(" ")[1])){
    return res.status(403).json({
      error:"You dont have the facilities for that"
    })
  }


  const email = req.body.email;
  const tier = req.body.tier;

  let role = "";

  if(tier === 1){
    role = "Adminus"
  }else if(tier === 2){
    role = "Company"
  }else{
    role = "User"
  }

pool.query(queries.changeRole,[role, email], (error, result) => {
  if (error) {

    return res.status(500).json({
      error:error
    });
  }

  if(result){
    const resultJson = result.rows;

    return res.status(201).json({
      message: "Role updated",
      result: resultJson,
    });

  }
});

}


function getUserId(webtoken){
  let token = webtoken;
  let decoded = jwt.verify(token, process.env.JWT_KEY);

  return decoded.id;
}

function isAdminus(webtoken){
  let token = webtoken;
  let decoded = jwt.verify(token, process.env.JWT_KEY);

  if(decoded.role === "User" || decoded.role ==='Company' ){
    return false;
  }

  return true;

}

module.exports = {
  viewProfile,
  updateProfile,
  addExperience,
  updateExperience,
  getMyProfile,
  updateRole,
  updateEmail,
  addProfilePic,
};
