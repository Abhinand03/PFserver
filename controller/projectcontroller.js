const projects=require('../Models/projectModel')

exports.addProjects=async(req,res)=>{
    const userId=req.payload
    const {title,overview,languges,github,demo}=req.body
    const image=req.file.filename
    console.log(title,overview,languges,github,demo,userId,image)
    try{
        const existingproject=await projects.findOne({github})
        if(existingproject){
            res.status(406).json("project already added")
        }
        else{
            const newpProject = new projects({
                title,overview,languges,github,demo,image,userId
            })
            await newpProject.save()
            res.status(200).json(newpProject)
        }
    }
    catch (err){
        console.log(err);
        res.status(401).json(err)
        
    }

    // res.status(200).json("Success")
}


exports.homeprojects=async (req,res)=>{
    try{
        const result=await projects.find().limit(3)
        if(result){
            res.status(200).json(result)
        }
        else{
            res.status(401).json("no project avilable")
        }
    }
    catch(err){
        console.log(err);
        res.status(406).json(err)
    }
}

exports.allprojects=async (req,res)=>{
    console.log("inside all project");
    const search=req.query.search;
    try{
        const query={
            languges:{$regex:search,$options:'i'}
        }
        const result=await projects.find(query)
        if(result){
            res.status(200).json(result)
        }
        else{
            res.status(401).json("no project avilable")
        }
    }
    catch(err){
        console.log(err);
        res.status(406).json(err)
    }
}

exports.userprojects=async (req,res)=>{
    const userId=req.payload
    try{
        const result=await projects.find({userId})
        if(result){
            res.status(200).json(result)
        }
        else{
            res.status(401).json("no project avilable")
        }
    }
    catch(err){
        console.log(err);
        res.status(406).json(err)
    }
}

exports.editProject=async(req,res)=>{
    const {title,overview,languges,demo,github,image}=req.body
    const userId=req.payload
    // console.log(req.file);
    const projectimage=req.file?req.file.filename:image
    const {pid}=req.params
    try{
        const updateProject= await projects.findByIdAndUpdate({_id:pid},
            {title,overview,languges,github,demo,image:projectimage,userId},{new:true}
        )
        await updateProject.save()
        res.status(200).json(updateProject)
    }
    catch(err){
        console.log(err);
        res.status(406).json(err)

    }

}

exports.removeProject=async(req,res)=>{
    const {pid}=req.params
    try{
     const result = await projects.findByIdAndDelete({_id:pid})   
     res.status(200).json(result)
    }
    catch(err){
        console.log(err);
        res.status(406).json(err)
    }
}