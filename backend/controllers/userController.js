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