const express = require("express")
const router = express.Router()


//Import Accounts Conrtoller
const AccountsController = require("../controllers/accounts");
const checkAuth = require("../utils/check-auth");


router.get("/", (req,res)=>{
    res.status(200).json({
        message:"default accounts route"
    })
});


router.get("/my-profile",checkAuth, AccountsController.viewProfile);

router.patch("/update",checkAuth, AccountsController.updateProfile);

router.post("/experience",checkAuth, AccountsController.addExperience)

router.patch("/experience",checkAuth, AccountsController.updateExperience)

router.get("/myprofile",checkAuth, AccountsController.getMyProfile);

router.patch("/roles", checkAuth,AccountsController.updateRole);


//router.get("experince", checkAuth, AccountsController.viewExperience)

module.exports = router;
