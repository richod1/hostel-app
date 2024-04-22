const {signin,signup,google,signOut} =require("../controllers/authController")
const express=require("express")
const router=express.Router();


router.post("/signup",signup)
router.post("/signin",signin)
router.post("/google",google)
router.get("/signout",signOut)

module.exports=router;