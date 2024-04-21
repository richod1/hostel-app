const Listing=require("../models/listingModel")
const {errorHandler}=require("../util/error")

const createListing=async(req,res,next)=>{
    const list=req.params.id;
    try{
        const listing=await Listing.create(list)
        return res.status(201).json(listing)
    }catch(error){
        console.log('something went wrong at create listing...',error)
        next(error);

    }

}

const deleteListing=async(req,res,next)=>{
    const list=req.params.id;
    const listing=await Listing.findById(list)
    if(!listing){
        return next(errorHandler(404,'listing not found'))

    }
    if(req.user.id !==listing.userRef){
        return next(errorHandler(401,'You can only delete your own account'))
    }

    try{
        const deleteList=await Listing.findByIdAndDelete(list)
        res.status(200).json({data:deleteList,msg:'Listing has been deleted successfully'})

    }catch(error){
        console.log('something went wrong at deleting listing',error)
        next(error)
    }
}

module.exports={
    createListing,
    deleteListing,
}