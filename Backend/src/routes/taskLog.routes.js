const express = require("express");
const { getTaskLogs } = require("../controllers/taskLog.controller");
const { authUser } = require("../middleware/auth.middleware");

const router = express.Router();

router.get("/:taskId", authUser, getTaskLogs);

module.exports = router;
