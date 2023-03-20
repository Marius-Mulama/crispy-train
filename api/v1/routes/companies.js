const express = require("express");
const router = express.Router()

const checkAuth = require("../utils/checks/check-auth");


//Import Controller
const CompanyController = require("../controllers/companies")


router.get("/",checkAuth, CompanyController.companies_get_all);

router.get("/:slug", CompanyController.companies_get_one);

router.get("/:id/jobs", CompanyController.companies_get_jobs);


router.post("/create",checkAuth, CompanyController.create_company);

router.patch("/modify/:id", CompanyController.modify_company);



module.exports = router;