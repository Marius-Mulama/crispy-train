const express = require("express");
const fs = require('fs')
const path = require('path')
const morgan = require("morgan");
const cors = require('cors')
const dotenv = require("dotenv");
const cookieSession = require("cookie-session");
const passport = require("passport");
require("./passport")
const app = express();

// create a write stream (in append mode)
var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })

//Write to log file and dev console
app.use(morgan('combined', { stream: accessLogStream }));
app.use(morgan("dev"));

app.use(express.json());
dotenv.config();

//Setting cors
app.use(
    cors({
      origin: "http://localhost:3000",
      methods: "GET,POST,PUT,DELETE",
      credentials: true,
    })
  );

//Set Cookie Sessions
app.use(cookieSession(
    {
        name:"session",
        keys:["Marius"],
        maxAge: 24*60*60*100
    }
))

//Initialize Passport js for authentications
app.use(passport.initialize())
app.use(passport.session())

//Routes
const authRoute = require("./api/v1/routes/auth")




//Others
app.use("/auth", authRoute);


app.use('*',(req,res)=>{
    res.status(404).json({
        error: "Error Occured, Resource Not Found"
    });
});


module.exports= app;


