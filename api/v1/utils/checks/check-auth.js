const jwt = require('jsonwebtoken');

const checkExtranet = (req,res,next)=>{
    try{
        const token = req.headers.authorization.split(" ")[1];
        //console.log(token);
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        req.userData = decoded;
        //console.log(req.userData);
        next();

    }catch(error){
        //console.log(error);
        return res.status(401).json({
            Message: "auth Failed",
            error:error
        });
    }
}


module.exports = (req,res,next)=>{
    try{
        const token = req.headers.authorization.split(" ")[1];
        //console.log(token);
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        req.userData = decoded;
        //console.log(req.userData);
        next();

    }catch(error){
        //console.log(error);
        return res.status(401).json({
            Message: "auth Failed",
            error:error
        });
    }
    
   // next();
    
}


function isAdminus(webtoken){
    let token = webtoken;
    let decoded = jwt.verify(token, process.env.JWT_KEY);
  
    if(decoded.role === "User" || decoded.role ==='Company' ){
      return false;
    }
  
    return true;
  
  }