const User=require("../models/userModel")
const jwt=require("jsonwebtoken")
const bcrypt=require("bcryptjs")
const {errorHandler}=require("../util/error")


// signUp
const signUp=async(req,res,next)=>{
    const {username,email,password}=req.body;
    try{
        const user=await User.findOne({email})
        if(user){
            return res.status(401).json({message:"User alreadt Exist with these credentials"})
        }
        const hashedPassword=await bcrypt.hashSync(password,10);
        const newUser=new User({username,email,password:hashedPassword})

        await newUser.save();
        res.status(201).json({message:"User created successfully"})

    }catch(err){
        console.log('something went wrong at signup..')
        next(err);
    }
}


const signIn=async(req,res,next)=>{
    const {email,password}=req.body;
    try{
        const validUser=await User.findOne({email});
        if(!validUser){
return next(errorHandler(401,'wrong credentials!'))
        }

        const validPassword=await bcrypt.compareSync(password,validUser.password)
        if(!validPassword) return next(errorHandler(401,'wrong credentials!'))

        const token=jwt.sign({id:validUser._id},process.env.JWT_SECRET,{
            expiresIn:'2d'
        })

        const {password:pass,...rest}=validUser._doc

        res.cookie('access_token',token,{httpOnly:true})
        .status(200)
        .json(rest)
    }catch(error){
        console.log("somtheng went wrong at the signup..",error)
        next(error)

    }
}

module.exports={
    signUp,
    signIn,
}