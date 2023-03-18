const express = require("express");
const router = express.Router()

const checkAuth = require("../utils/checks/check-auth");

//Import Controller
const ProjectsController = require("../controllers/projects")


//Add Project
router.post("/", checkAuth, ProjectsController.addProject);


//Update Project
router.patch("/update/:id",checkAuth, ProjectsController.updateProject);


//Delete Project
router.delete("/delete/:id",checkAuth, ProjectsController.deleteProject)


//TODO Get projects done by a user

module.exports = router