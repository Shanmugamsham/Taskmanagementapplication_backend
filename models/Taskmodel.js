const mongoose=require("mongoose")



const taskSchema= new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
      },
    name:{
        type:String,
        require:[true,"Please add a task"]
    },
    completed:{
        type:Boolean,
        require:true,
        default:false

    }


},{timesstamps:true})

const Task=mongoose.model("Task",taskSchema)


module.exports=Task