const express=require("express")
const cors=require("cors")
const BodyParser=require("body-parser")
const port=process.env.PORT||3000
require("dotenv").config()
const path=require("node:path")
const cookieParser=require("cookie-parser")
const app=express()
// database connection
const mongoose=require("mongoose")
const authRouter=require("./route/auth.route")
const userRouter=require("./route/user.route")
const listingRouter=require("./route/listing.route")


app.use(cors())
app.use(BodyParser.json({extends:true}))
app.use(express.json())
app.use(cookieParser())


app.get('/api',(req,res)=>{
    res.status(200).json({message:"api is ready"})
})


app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/listing', listingRouter);

app.use(express.static(path.join(__dirname,'/client/dist')))

app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname,'client','dist','index.html'))
})

app.use((err,req,next)=>{
    const statusCode=err.statusCode || 500;
    const message=err.message || 'Internal Server Error';
    return res.status(statusCode),json({
        success:false,
        statusCode,
        message,
    })
})



app.listen(port,(err)=>{
mongoose.connect(`${process.env.MONGO_URL}`).then(()=>{
    console.log(`Database connected successfully`)
}).catch(err=>console.log(`Database failed to connect`,err))
    
if(err) throw new Error('server is asleep')
    console.log(`server is up on port ${port}`)
})



