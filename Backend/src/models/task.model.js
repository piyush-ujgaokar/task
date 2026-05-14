const mongoose=require('mongoose')



const taskSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    assignBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        required:true
    },
    assignTo:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        required:true
    },
    status:{
        type:String,
        enum:['to-do','inProgress','done','completed'],
        default:'to-do'
    },
    printority:{
        type:String,
        enum:['low','medium','high'],
        default:'medium'
    },
    dueDate:{
        type:Date,
        required:true
    },
},{
    timestamps:true
})

const taskModel=mongoose.model('task',taskSchema)


module.exports=taskModel