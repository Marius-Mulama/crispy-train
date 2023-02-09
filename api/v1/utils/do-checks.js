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


function checkExperience(position, company, start_date , location){
    let issues = "";

    if(!position){
        issues = "Position Field is empty"
    }else if(!company){
        issues = "Position Field is empty"
    }else if(!start_date){
        issues = "Start Date is empty"
    }else if(!location){
        issues = "Location Field is empty"
    }

    return issues;
}

module.exports={
    checksignup,
    checkExperience,
}