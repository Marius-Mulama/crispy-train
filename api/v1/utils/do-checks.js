function checksignup(email, password){
    const mail  =  email;
    const pass = password;

    const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if(!mail.match(validRegex)){
        return "Invalid email address";
    }

    if(pass.length < 6){
        return "Password should be atleast 6 characters long"
    }


    return ""

}

module.exports={
    checksignup,
}