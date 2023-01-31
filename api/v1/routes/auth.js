const express = require("express")
const router = express.Router()
const passport = require("passport")


//Import Accounts Conrtoller
const AccountsController = require("../controllers/accounts");

const CLIENT_URL = "https://talents-pool.netlify.app/"


router.get("/login/success",(req,res)=>{
    if(req.user){
        res.status(200).json({
            sucess: true,
            message: "success",
            user:req.user,
            cookies: req.cookies,
        })
    }

})


router.get("/login/failed",(req,res)=>{
    res.status(401).json({
        sucess: false,
        message: "failure"
    })
})



router.get("/logout", (req,res)=>{
    req.logout()
    res.redirect(CLIENT_URL)
})


router.get("/google", passport.authenticate("google",{scope:["profile"]}))

router.get("/google/callback", passport.authenticate("google", {
    successRedirect: CLIENT_URL,
    failureRedirect: "/login/failed"
}))

//From here holds routes for non social logins

router.post("/login", AccountsController.login);


router.post("/signup", AccountsController.signup)

module.exports = router;