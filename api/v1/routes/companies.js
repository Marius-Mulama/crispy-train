const express = require("express");
const router = express.Router()


//Import Controller
const CompanyController = require("../controllers/companies")


router.get("/", CompanyController.companies_get_all);

router.get("/:id", CompanyController.companies_get_one);

router.get("/:id/jobs", CompanyController.companies_get_jobs);


router.post("/create", CompanyController.create_company);


//TO Be changed to the ones commented
router.get("/modify/:id", CompanyController.modify_company);
//router.put("/modify/:id", CompanyController.modify_company);



module.exports = router;