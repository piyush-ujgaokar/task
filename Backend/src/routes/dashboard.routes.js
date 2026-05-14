const express =require("express")

const {getDashboardStatus} = require("../controllers/dashboard.controller")

const {authUser} = require("../middleware/auth.middleware")

const router = express.Router()

router.get("/status",authUser,getDashboardStatus)

module.exports = router