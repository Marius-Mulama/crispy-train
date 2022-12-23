const express = require("express");
const router = express.Router();

const JobsController = require("../controllers/jobs")


//Get All Open jobs
router.get("/", JobsController.getOpenJobs)

//Get Jobs by company
router.get("/:id/jobs", JobsController.getJobsByCompany);

//These routes tO be changed to the ones commented

//Create Job
router.get("/create", JobsController.createJob);
//router.post("/create", JobsController.createJob);

//Update job
router.get("/modify/:id", JobsController.updateJob);
//router.patch("/modify/:id", JobsController.updateJob);




module.exports = router;

