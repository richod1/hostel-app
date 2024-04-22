const {signUp,signIn,signInwithGoogle,signOut} =require("../controllers/authController")
const express=require("express")
const router=express.Router();


router.post("/signup",signUp)
router.post("/signin",signIn)
router.post("/google",signInwithGoogle)
router.get("/signout",signOut)

module.exports=router;