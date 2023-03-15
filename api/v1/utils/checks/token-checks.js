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