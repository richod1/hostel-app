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

const signInwithGoogle=async(req,res,next)=>{
    const {email}=req.body.email;
    try{
        const user=await User.findOne({email})
        if(user){
            const token=jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:'2d'})
            const {password:pass,...rest}=user._doc;

            res.status(200).cookie('access_token',token,{httpOnly:true}).json(rest)
        }else{
            const generatedPassword=Math.random().toString(36).slice(-8) * Math.random().toString(36).slice(-8);
            const hashedPassword=bcrypt.hashSync(generatedPassword,10);
            const newUser=new User({
                email,password:hashedPassword,
                avatar:req.body.photo
            })

            await newUser.save();
            const token=jwt.sign({id:newUser._id},process.env.JWT_SECRET,{expiresIn:'2d'})
            const {password:pass,...rest}=newUser._doc;

            res.cookie('access_token',token,{httpOnly:true}).status(201).json(rest)
        }
    }catch(err){
        console.log('something went wrong at signInwithGoogle...',err)
        next(err)

    }
}

const signOut=async(req,res,next)=>{
    try{
        res.clearCokkie('access_token');
        res.status(200).json('User has been loged out!')

    }catch(err){
        console.log('something went wront at signOut!',err)
        next(err)

    }
}

module.exports={
    signUp,
    signIn,
    signInwithGoogle,
}