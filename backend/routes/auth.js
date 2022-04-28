const express = require('express');
const router = express.Router();
const { signout, signup, signin, isSignedIn } = require('../controllers/auth');
const { check } = require('express-validator');

router.post("/signup",[
    check("name").isLength({min: 3}).withMessage("Name should be of atleast 3 characters"),
    check("password").isLength({ min: 5}).withMessage("password should be of atleast 5 characters"),
    check("email").isEmail().withMessage("Invalid email")
],signup);


router.post("/signin",[
    check("password").isLength({ min: 1}).withMessage("password field can not be empty"),
    check("email").isEmail().withMessage("Invalid email")
],signin);


router.get("/test", isSignedIn,(req,res)=>{
    res.send("Authenticated")
})


router.get("/signout",signout);

module.exports = router;