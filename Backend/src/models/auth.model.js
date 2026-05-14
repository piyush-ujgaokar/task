const mongoose=require('mongoose')


const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:['Super Admin','Admin','Manager','Employee'],
        required:true,
        default:'Employee'
    },
    reportsTo:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    isActive:{
        type:Boolean,
        default:true
    }
},{
    timestamps:true
})

const userModel=mongoose.model('user',userSchema)


module.exports=userModel


