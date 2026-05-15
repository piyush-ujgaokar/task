const userModel = require("../models/auth.model")
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const blackListModel = require("../models/blackList.Model")



async function createSuperAdmin(req,res){

    const {name,email,password}=req.body

   try {
     const IsSuperAdminAlreadyExists=await userModel.findOne({
        role:"Super Admin"
    })

    if(IsSuperAdminAlreadyExists){
        return res.status(400).json({message:'Super Admin already exists'})
    }

    const hashPassword=await bcrypt.hash(password,10)

    const superAdmin=await userModel.create({
        name,
        email,
        password:hashPassword,
        role:"Super Admin"
    })

    res.status(201).json({
        message:'Super Admin created successfully',
        user:{
            id:superAdmin._id,
            name:superAdmin.name,
            email:superAdmin.email,
            role:superAdmin.role
        }
    })} catch (error) {
    res.status(500).json({message:'Internal Server Error',error})
   }

}

async function registerUser(req,res){

    const {name,email,password,role,reportsTo}=req.body

    if(!name || !email || !password || !role){
        return res.status(400).json({message:'All fields are required'})
    }

    try {
        const isUserAlreadyExists=await userModel.findOne({email})

    if(isUserAlreadyExists){
        return res.status(400).json({message:'User already exists'})
    }

    const hashPassword=await bcrypt.hash(password,10)

    const user=await userModel.create({
        name,
        email,
        password:hashPassword,
        role,
        reportsTo
    })

    const token=jwt.sign({id:user._id,role:user.role},process.env.JWT_SECRET_KEY,{expiresIn:'5d'})

    res.cookie("token",token)

    res.status(201).json({
        message:'User registered successfully',
        user:{
            id:user._id,
            name:user.name,
            email:user.email,
            role:user.role,
            reportsTo:user.reportsTo
        }
    })}catch (error) {
        res.status(500).json({message:'Internal Server Error',error})
    }
}

async function loginUser(req,res){

    const {email,password}=req.body

    if(!email || !password){
        return res.status(400).json({message:'All fields are required'})
    }

   try {
     const isUserExists=await userModel.findOne({email})

    if(!isUserExists){
        return res.status(400).json({message:'User not found'})
    }

    const isPasswordValid=bcrypt.compare(password,isUserExists.password)

    if(!isPasswordValid){
        return res.status(400).json({message:'Invalid credentials'})
    }

    const token=jwt.sign({id:isUserExists._id,role:isUserExists.role},process.env.JWT_SECRET_KEY,{expiresIn:'5d'})

    res.cookie("token",token)

    res.status(200).json({
        message:'Login successful',
        user:{  
            id:isUserExists._id,
            name:isUserExists.name,
            email:isUserExists.email,
            role:isUserExists.role
        }
    })}catch (error) {
        res.status(500).json({message:'Internal Server Error',error: error.message})
   }

}

async function logoutUser(req,res){
    
    const token=req.cookies.token

    if(!token){
        return res.status(400).json({message:'No token found'})
    }

    const isBlackListed=await blackListModel.findOne({token})

    if(isBlackListed){
        return res.status(400).json({message:'Token already blacklisted'})
    }

    await blackListModel.create({token})
    res.clearCookie("token")
    res.status(200).json({message:'Logout successful'})


}

async function getMe(req,res){

    const userId=req.user.id
    try {
        const user=await userModel.findById(userId).select('-password')
        if(!user){
            return res.status(404).json({message:'User not found'})
        }

        res.status(200).json({
            message:'User fetched successfully',
            user:{
                id:user._id,
                name:user.name,
                email:user.email,
                role:user.role,
                reportsTo:user.reportsTo
            }
        })
    } catch (error) {
        res.status(500).json({message:'Internal Server Error',error})
    }   
}



module.exports={
    registerUser,
    createSuperAdmin,
    loginUser,
    logoutUser,
    getMe
}