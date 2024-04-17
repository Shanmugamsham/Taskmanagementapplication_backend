
const Task =require("../models/Taskmodel")



const createtask=async (req,res,next)=>{

    try {

        const task= await Task.create(req.body)
        res.status(200).json(task)
        
    } catch (error) {
        res.status(500).json({msg:"server error"})
        
    }

}

const gettask=async (req,res,next)=>{
  try {
       
    const {id}=req.params
    
    const task=await Task.find({user:id})
    if(!task){
        res.status(404).json({msg:"no task found"})
    }
    res.status(200).json(task)
    
  } catch (error) {
    res.status(500).json({msg:"server error"})
  }


}


const deletetask=async (req,res,next)=>{
    try {
       
        const {id}=req.params
        const task=await Task.findByIdAndDelete(id)
        if(!task){
            res.status(404).json({msg:"no task found to delete"})
        }
        res.status(200).send("task deletes")
        
      } catch (error) {
        res.status(500).json({msg:"server error"})
      }
    
}



const updatetask=async (req,res,next)=>{
      
    try {
        const {id}=req.params
        const task=await Task.findByIdAndUpdate({_id:id},req.body,{new:true,runValidators:true})

        if(!task){
            res.status(404).json({msg:"no task found to update"})
        }
        res.status(200).json(task)
    } catch (error) {
        
    }

}

module.exports={
    createtask,
    gettask,
    deletetask,
    updatetask
}