const express = require("express")
const router = express.Router()


//Import Accounts Conrtoller
const AccountsController = require("../controllers/accounts");


router.get("/", (req,res)=>{
    res.status(200).json({
        message:"default accounts route"
    })
});

router.get("/:slug", AccountsController.viewProfile);

router.get("/update", AccountsController.updateProfile);

module.exports = router;
