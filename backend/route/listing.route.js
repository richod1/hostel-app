const { createListing,deleteListing,updateListing,getListing,getListings}=require("../controllers/listingController")
const {verifyToken}=require("../util/verifyUser")
const express=require("express")
const router=express.Router();

router.post('/create',verifyToken,createListing)
router.post('/update/:id',verifyToken,updateListing)
router.delete('/delete/:id',verifyToken,deleteListing)
router.get("/get/:id",getListing)
router.get("/get",getListings)

module.exports=router;