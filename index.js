
//loads .env file contents into process.env by default
require('dotenv').config()
const express=require('express')
const cors=require('cors')
const router=require('./routes/routes')
require('./DB/connection')

//creating sever inatstance 
const pfserver=express()


//configyre cors into server
pfserver.use(cors())

//configuring jason conversion on server

pfserver.use(express.json())

//confiquring routes to server
pfserver.use(router)
//serving uploaded file to client side

pfserver.use('/uploads',express.static('./uploads'))
const PORT=3000

//calling listern methode to implement lidtern made for server to run
pfserver.listen(PORT,()=>{
    console.log(`server is running ${PORT}`)
})

//setting responce for base-url get requist

pfserver.get('/',(req,res)=>{
    res.status(200).send("<h1>the get requst Hit </h1>")
})