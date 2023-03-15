const express = require("express");
const fs = require("fs");
const path = require("path");
const morgan = require("morgan");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieSession = require("cookie-session");
const passport = require("passport");
require("./passport");
const app = express();

// create a write stream (in append mode)
var accessLogStream = fs.createWriteStream(path.join(__dirname, "access.log"), {
  flags: "a",
});

//Write to log file and dev console
app.use(morgan("combined", { stream: accessLogStream }));
app.use(morgan("dev"));

app.use(express.json());
dotenv.config();

//Setting cors
app.use(
  cors({
    origin: ["http://localhost:3000", "https://talents-pool.netlify.app"],
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

//Set Cookie Sessions
app.use(
  cookieSession({
    name: "session",
    keys: ["Marius"],
    maxAge: 24 * 60 * 60 * 100,
    sameSite: "none",
    domain: ["http://localhost:3000", "https://talents-pool.netlify.app"],
  })
);

//Initialize Passport js for authentications
app.use(passport.initialize());
app.use(passport.session());

//Routes
const authRoute = require("./api/v1/routes/auth");
const companyRoute = require("./api/v1/routes/companies");
const jobsRoute = require("./api/v1/routes/jobs");
const accountsRoute = require("./api/v1/routes/accounts");
const pool = require("./api/v1/utils/database/db-connection");

//Others
app.use("/auth", authRoute);
app.use("/companies", companyRoute);
app.use("/jobs", jobsRoute);
app.use("/accounts", accountsRoute)

app.use("/testdb", (req, res) => {
  pool
    .connect()
    .then(()=>{
        res.status(200).json({
            message: "Succesfull RdS COnnection from Server",
          })
    }
      
    )
    .catch((error) => {
      res.status(500).json({
        message: "WE had an Issue connecting to the server",
      });
    });
});

app.use("*", (req, res) => {
  res.status(404).json({
    error: "Error Occured, Resource Not Found",
  });
});

module.exports = app;
