const multer  = require('multer')

const fs = require("fs")

//TODO create different paths for different types of uploads

const storage = multer.diskStorage({
    destination: function(req,file,cb){


        const path = "./uploads/profiles/"
        fs.mkdirSync(path, { recursive: true })

        cb(null,path);
    },
    filename: function(req,file,cb){
        //cb(null, file.filename);

        cb(null, Date.now() + file.originalname);
    }

});


module.exports = storage;