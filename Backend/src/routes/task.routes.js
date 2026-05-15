const express = require("express");

const {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
  getTaskById,
} = require("../controllers/task.controller");

const { authUser } = require("../middleware/auth.middleware");

const router = express.Router();

router.post("/", authUser, createTask);

router.get("/", authUser, getTasks);

router.patch("/:id", authUser, updateTask);

router.delete("/:id", authUser, deleteTask);

router.get("/:id",authUser,getTaskById)

module.exports = router;
