const bcrypt=require("bcryptjs")
const User=require("../models/userModel")
const Listing=require("../models/listingModel")
const {errorHandler}=require("../util/error")


const test=(req,res)=>{
    res.status(201).json({
        message:'Api is working'
    })
}


const updateUser=async(req,res,next)=>{
    if(req.user.id !== req.params.id){
        return next(errorHandler(401,'You can only update your account'));
    }
    const {username,email}=req.body;

    try{
        if(req.body.password){
            req.body.password=bcrypt.hashSync(password,10);
        }
        
        const updatedUser=await User.findByIdUpdate(req.params.id,{
            $:{
                username:username,
                email:email,
                password:req.body.password,
                avatar:req.body.avatar,
            }
        },{new:true})

        const {password,...rest}=updatedUser._doc;
        res.status(200).json(rest);

    }catch(error){
        console,log("something went wrong at updateUser...",error)
        next(error)
    }
}

const deleteUser=async(req,res,next)=>{
    if(req.user,id !== req.params.id)
    return next(errorHandler(401,'You can only delete your account'))


    try{
        await User.findByIdAndDelete(req.bodparams.id)
        res.clearCookie('access_token');
        res.status(200).json('User has been deleted!')

    }catch(err){
        console.log('something went wront at delete user',err)
        next(err)

    }
}

const getUserListings=async(req,res,next)=>{
    if(req.user.id===req.params.id){
        try{
            const listings=await Listing.find({userRef:req.params.id});
            res.status(200).json(listings)

        }catch(err){
            consoloe.log('something went wrong at get user listings',err)
            next(err)
        }
    }else{
        return next(errorHandler(401,'You can view your own listings!'))
    }
}

const getUser=async(req,res,next)=>{
    try{
        const user=await User.findOne(req.params.id);
        if(!user){
            return next(errorHandler(404,'Use5r not found'))

            const {password:pass,...rest}=user._id;
            res.status(200).json(rest);
        }

    }catch(err){
        console.log('something went wrong at get user')
        next(err)
    }
}

module.exports={
    getUser,
    getUserListings,
    deleteUser,
    updateUser,
    test,

}