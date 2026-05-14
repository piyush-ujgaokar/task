const mongoose=require('mongoose')


const taskLogSchema=new mongoose.Schema({
    taskId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'task',
        required:true
    },
    changedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        required:true
    },
    oldStatus:{
        type:String,
    },
    newStatus:{
        type:String,
    },
    changedAt:{
        type:Date,
        default:Date.now
    }
})


const taskLogModel=mongoose.model('taskLog', taskLogSchema)


module.exports=taskLogModel