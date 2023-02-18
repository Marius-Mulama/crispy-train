const express = require("express")
const router = express.Router()
const passport = require("passport")


//Import Auth Conrtoller
const AccountsController = require("../controllers/auth");
const checkAuth = require("../utils/check-auth");

const CLIENT_URL = "http://localhost:3000"


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


router.post("/signup", AccountsController.signup);

router.patch("/password",checkAuth, AccountsController.changePassword);

module.exports = router;