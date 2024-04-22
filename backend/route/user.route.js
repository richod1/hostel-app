const {getUser,
    getUserListings,
    deleteUser,
    updateUser,
    test}=require("../controllers/userController")

const express=require("express")
const router=express.Router();
const {verifyToken}=require("../util/verifyUser")


router.get('/test',test);
router.post('/update/:id',verifyToken,updateUser)
router.delete('/delete/:id',verifyToken,deleteUser)
router.get('/listings/:id',verifyToken,getUserListings)
router.get('/:id',verifyToken,getUser)


module.exports=router;