const taskModel = require("../models/task.model");
const taskLogModel = require("../models/taskLog.model");
const getSubordinates = require("../utils/getSubOrdinates");
const validTransitions = require("../utils/taskStatusFlow");

const createTask = async (req, res) => {
  try {
    const { title, description, assignTo, priority, dueDate } = req.body;

    console.log('[createTask] request by user:', req.user && { id: req.user.id, role: req.user.role });
    console.log('[createTask] payload assignTo (raw):', assignTo);
    const assignToId = assignTo ? assignTo.toString().trim() : null;
    console.log('[createTask] payload assignTo (normalized):', assignToId);

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
      console.log('[createTask] computed allowedIds:', allowedIds);

      // allow assigning to self or any subordinate
      if (assignToId !== req.user.id && !allowedIds.includes(assignToId)) {
        console.log('[createTask] assignTo not in allowedIds and not self; rejecting');
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
      // include tasks they assigned and tasks assigned to their subordinates
      const subordinates = await getSubordinates(req.user.id);
      const allowedIds = subordinates.map((u) => u._id.toString());
      // include self in allowedIds to catch tasks assigned directly to the admin/manager
      allowedIds.push(req.user.id);

      tasks = await taskModel
        .find({
          $or: [
            { assignBy: req.user.id },
            { assignTo: { $in: allowedIds } },
          ],
        })
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
    if (!task) return res.status(404).json({ message: 'Task not found' });

    const oldStatus = task.status;
    const newStatus = req.body.status;

    // Authorization: only allow assignee, creator, or permitted managers/admins/superadmin
    const currentUser = req.user;
    let permitted = false;

    if (currentUser.role === 'Super Admin') permitted = true;
    if (currentUser.id === task.assignTo?.toString()) permitted = true;
    if (currentUser.id === task.assignBy?.toString()) permitted = true;

    // Admin or Manager can act if the task is within their subordinates
    if (!permitted && (currentUser.role === 'Admin' || currentUser.role === 'Manager')) {
      const subs = await getSubordinates(currentUser.id);
      const subIds = subs.map((u) => u._id.toString());
      if (subIds.includes(task.assignTo?.toString()) || subIds.includes(task.assignBy?.toString())) {
        permitted = true;
      }
    }

    if (!permitted) {
      return res.status(403).json({ message: 'Forbidden: cannot update this task' });
    }

    // If status update provided, validate transition
    if (newStatus) {
      if (!validTransitions[oldStatus].includes(newStatus)) {
        return res.status(400).json({ message: 'Invalid status transition' });
      }
      task.status = newStatus;

      await task.save();

      // Log change
      await taskLogModel.create({
        taskId: task._id,
        changedBy: req.user.id,
        oldStatus,
        newStatus,
      });
    }

    // allow patching other fields (assignTo etc.)
    const updatable = ['title', 'description', 'priority', 'dueDate'];
    updatable.forEach((f) => {
      if (req.body[f] !== undefined) task[f] = req.body[f];
    });
    if (req.body.assignTo) task.assignTo = req.body.assignTo;

    await task.save();

    res.status(200).json({ message: 'Task updated successfully', success: true, task });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteTask = async (req, res) => {
  const id = req.params.id;
  try {
    const task = await taskModel.findById(id);
    if (!task) return res.status(404).json({ message: 'Task not found' });

    const currentUser = req.user;
    let permitted = false;
    if (currentUser.role === 'Super Admin') permitted = true;
    if (currentUser.id === task.assignBy?.toString()) permitted = true;
    // Admin/Manager can delete if task is within their subordinates
    if (!permitted && (currentUser.role === 'Admin' || currentUser.role === 'Manager')) {
      const subs = await getSubordinates(currentUser.id);
      const subIds = subs.map((u) => u._id.toString());
      if (subIds.includes(task.assignTo?.toString()) || subIds.includes(task.assignBy?.toString())) {
        permitted = true;
      }
    }

    if (!permitted) return res.status(403).json({ message: 'Forbidden: cannot delete this task' });

    await taskModel.findByIdAndDelete(id);

    res.status(200).json({ message: 'Task deleted successfully', success: true });
  } catch (error) {
    res.status(500).json({ message: error.message });
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
