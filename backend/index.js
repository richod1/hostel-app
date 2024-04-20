const express=require("express")
const cors=require("cors")
const BodyParser=require("body-parser")
const port=process.env.PORT||3000
require("dotenv").config()
const app=express()
// database connection
const mongoose=require("mongoose")

app.use(cors())
app.use(BodyParser.json({extends:true}))
app.use(express.json())


app.get('/api',(req,res)=>{
    res.status(200).json({message:"api is ready"})
})


app.listen(port,(err)=>{
mongoose.connect(`${process.env.MONGO_URL}`).then(()=>{
    console.log(`Database connected successfully`)
}).catch(err=>console.log(`Database failed to connect`,err))
    
if(err) throw new Error('server is asleep')
    console.log(`server is up on port ${port}`)
})



