const jwt = require('jsonwebtoken');

const queries = require("../utils/accounts-queries");
const pool = require("../utils/db-connection");
const { checksignup } = require("../utils/do-checks");

const login = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  pool.query(queries.login, [email, password], (error, result) => {
    if (error) {
      return res.status(500).json({
        message: "An Error occured",
        error: error,
      });
    }

    if (result.rows.length === 1) {
      const token = generateJWT(result.rows[0])
    
      //console.log(result);
      res.status(200).json({
        message: "Succesful Login",
        result: result.rows[0],
        token: token
      });
    }

    if (result.rows.length != 1) {
      return res.status(403).json({
        message: "Authentication Failed",
      });
    }
  });
};

const signup = (req, res) => {
  const email = String(req.body.email).toLowerCase();
  const password = String(req.body.password);

  const issues = checksignup(email, password);

  if (issues.length > 0) {
    return res.status(409).json({
      message: issues,
    });
  }

  pool.query(queries.createUserWithPass, [email, password], (error, result) => {
    if (error) {
      return res.status(500).json({
        message: "An error Ocuured",
        error: error,
      });
    }

    if (result) {
      pool.query(queries.checkIfExists, [email], (error, result) => {
        if (error) {
          return res.status(200);
        }

        if (result) {
          return res.status(201).json({
            message: "User Created",
            result: result.rowCount,
          });
        }
      });
    }
  });
};

const changePassword = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  pool.query(queries.changePassword, [email, password], (error, result) => {
    if (error) {
      return res.status(409).json({
        message: "Error Occured while updating password try again",
        error: error,
      });
    }

    if (result) {
      return res.status(200).json({
        message: "PAssword was updated succesfully",
        result: result.rowCount,
      });
    }
  });
};

function generateJWT(data){
  const token = jwt.sign(
    {
      email: data.email,
      identifier: data.uuid,
      verified: data.verified,
      fullname: data.full_name
    },
    process.env.JWT_KEY,
    {
      expiresIn: "720h",
    } 
    );

    return token
}

module.exports = {
  login,
  signup,
  changePassword,
};
