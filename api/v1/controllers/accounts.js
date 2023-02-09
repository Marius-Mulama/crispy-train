const jwt = require("jsonwebtoken");

const queries = require("../utils/accounts-queries");
const pool = require("../utils/db-connection");
const { checkExperience } = require("../utils/do-checks");

//TODO

const viewProfile = (req, res) => {
  res.status(200).json({
    message: `View User Profile for user ${req.params.slug}`,
  });
};

//TODO
const updateProfile = (req, res) => {
  res.status(200).json({
    message: "Update User Profile",
  });
};

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

  // UPDATE experience SET position=$1, company=$2,description=$3, 
  // start_date=$4, end_date=$5 , location=$6 WHERE id=$7 AND user_id =$8 "

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


function getUserId(webtoken){
  let token = webtoken;
  let decoded = jwt.verify(token, process.env.JWT_KEY);

  return decoded.id;
}

//TODO Add function to vaildate dates

module.exports = {
  viewProfile,
  updateProfile,
  addExperience,
  updateExperience,
};
