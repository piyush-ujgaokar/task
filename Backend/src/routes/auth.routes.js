const express=require('express')
const {registerUser, createSuperAdmin, loginUser, logoutUser}=require('../controllers/auth.controller')
const {authUser}=require('../middleware/auth.middleware')
const {authorizeRole}=require('../middleware/role.middleware')
const { create } = require('../models/auth.model')

const router=express.Router()

router.post('/create-super-admin',createSuperAdmin)
router.post('/register',authUser, authorizeRole('Super Admin'),registerUser)

router.post('/login',loginUser)
router.get('/logout',authUser,logoutUser)


module.exports=router
