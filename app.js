const express = require("express");
const morgan = require("morgan");
const cors = require('cors')
const dotenv = require("dotenv")
const app = express();



app.use(morgan('dev'));
app.use(express.json());
app.use(cors());
dotenv.config();

//Routes
app.use("/",(req,res)=>{
    res.status(200).json({
        message: "Up and Running"
    })
})


app.use('*',(req,res)=>{
    res.status(404).json({
        error: "Error Occured, Resource Not Found"
    });
});


module.exports= app;


