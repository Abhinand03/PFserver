const mongoose=require('mongoose')
const conectionstring=process.env.DATABASE
mongoose.connect(conectionstring).then(()=>{
    console.log("MongoDB Atlas connection successfull");
}).catch((err)=>{
    console.log("MongoDB connectin failed");
    console.log(err);
})