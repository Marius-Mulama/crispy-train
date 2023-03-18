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

    if(!position || !position.trim()){
        issues = "Position Field is empty"
    }else if(!company || !company.trim()){
        issues = "Position Field is empty"
    }else if(!start_date || !start_date.trim()){
        issues = "Start Date is empty"
    }else if(!location || !location.trim()){
        issues = "Location Field is empty"
    }

    return issues;
}


function checkProject(title, description, link){
    let issues = "";

    if(!title || !title.trim()){
        issues = "Title Field is empty"
    }else if(!description || !description.trim()){
        issues = "Description Field is empty"
    }

    
    try{
        let url = new URL(link)
    }catch(_){
        issues = "Invalid URL LINK"
    }

    return issues;
}

module.exports={
    checksignup,
    checkExperience,
    checkProject,
}