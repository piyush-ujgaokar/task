const TaskLog = require("../models/taskLog.model");

const getTaskLogs = async (req, res) => {
  try {
    const logs = await TaskLog.find({taskId: req.params.taskId}).populate(
        "changedBy", 
        "name email"
    );

    res.status(200).json({
        message: "Task logs retrieved successfully",
      success: true,
      logs,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getTaskLogs,
};
