const taskModel = require("../models/task.model");
const taskLogModel = require("../models/taskLog.model");
const getSubordinates = require("../utils/getSubOrdinates");
const validTransitions = require("../utils/taskStatusFlow");

const createTask = async (req, res) => {
  try {
    const { title, description, assignTo, priority, dueDate } = req.body;

    // EMPLOYEE CANNOT ASSIGN

    if (req.user.role === "Employee") {
      return res.status(403).json({
        message: "Employees cannot assign tasks",
      });
    }

    // SUPER ADMIN

    if (req.user.role !== "Super Admin") {
      const subordinates = await getSubordinates(req.user.id);

      const allowedIds = subordinates.map((user) => user._id.toString());

      if (!allowedIds.includes(assignTo)) {
        return res.status(403).json({
          message: "Cannot assign outside hierarchy",
        });
      }
    }

    const task = await taskModel.create({
      title,
      description,
      assignBy: req.user.id,
      assignTo,
      priority,
      dueDate,
    });

    res.status(201).json({
        message: "Task created successfully",
      success: true,
      task,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getTasks = async (req, res) => {
  try {
    let tasks = [];

    // SUPER ADMIN

    if (req.user.role === "Super Admin") {
      tasks = await taskModel.find().populate("assignTo", "name email");
    }

    // EMPLOYEE
    else if (req.user.role === "Employee") {
      tasks = await taskModel
        .find({ assignTo: req.user.id })
        .populate("assignTo", "name email");
    }

    // ADMIN + MANAGER
    else {
      tasks = await taskModel
        .find({ assignBy: req.user.id })
        .populate("assignTo", "name email");
    }

    res.status(200).json({
      message: "Tasks fetched successfully",
      success: true,
      tasks,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// const updateTask = async (req, res) => {
//   const id = req.params.id;

//   try {
//     const task = await taskModel.findByIdAndUpdate(id, req.body, { new: true });

//     res.status(200).json({
//       message: "Task updated successfully",
//       success: true,
//       task,
//     });
//   } catch (error) {
//     res.status(500).json({
//       message: error.message,
//     });
//   }
// };

const updateTask = async (req, res) => {
  try {
    const task = await taskModel.findById(req.params.id);
    const oldStatus = task.status;
    const newStatus = req.body.status;

    // VALIDATE FLOW

    if (!validTransitions[oldStatus].includes(newStatus)) {
      return res.status(400).json({
        message: "Invalid status transition",
      });
    }

    task.status = newStatus;

    await task.save();

    // CREATE LOG

    await taskLogModel.create({
      taskId: task._id,
      changedBy: req.user.id,
      oldStatus,
      newStatus,
    });

    res.status(200).json({
      message: "Task updated successfully",
      success: true,
      task,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const deleteTask = async (req, res) => {
  const id = req.params.id;
  try {
    await taskModel.findByIdAndDelete(id);

    res.status(200).json({
      message: "Task deleted successfully",
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getTaskById = async (req, res) => {
  try {
    const task = await taskModel.findById(req.params.id).populate("assignTo", "name email")
.populate("assignBy", "name email");

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    res.status(200).json({
        message: "Task fetched successfully",
      success: true,
      task,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
  getTaskById
};
