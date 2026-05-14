const express =require("express")

const {getUsers} = require("../controllers/user.controller")

const {authUser} = require("../middleware/auth.middleware")
const { updateUser } = require("../controllers/user.controller")
const { deleteUser } = require("../controllers/user.controller")

const router =express.Router()

router.get("/",authUser,getUsers)
router.patch("/:id",authUser,updateUser)
router.delete("/:id",authUser,deleteUser)



module.exports = router