const jwt = require('jsonwebtoken');

const queries = require("../utils/accounts-queries");
const pool = require("../utils/db-connection");

//TODO


const viewProfile = (req,res)=>{
  res.status(200).json({
    message:`View User Profile for user ${req.params.slug}`
  })
}


const updateProfile = (req,res)=>{
  res.status(200).json({
    message:"Update User Profile"
  })
}



module.exports = {
  viewProfile,
  updateProfile,
};
