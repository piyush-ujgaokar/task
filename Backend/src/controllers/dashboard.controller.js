const usermodel =require("../models/auth.model")

const taskModel = require("../models/task.model")

const getDashboardStatus =async (req, res) => {
    try {

      const user =req.user

      let status = {}

      // SUPER ADMIN

      if (user.role === "Super Admin") {

        const totalUsers =
          await userModel.countDocuments()

        const totalAdmins =
          await userModel.countDocuments({
            role: "Admin"
          })

        const totalManagers =
          await userModel.countDocuments({
            role: "Manager"
          })

        const totalEmployees =
          await userModel.countDocuments({
            role: "Employee"
          })

        const totalTasks =
          await taskModel.countDocuments()

        const completedTasks =
          await taskModel.countDocuments({
            status: "Done"
          })

        const pendingTasks =
          await taskModel.countDocuments({
            status: "To Do"
          })

        status = {totalUsers,totalAdmins,totalManagers,totalEmployees,totalTasks,completedTasks,
          pendingTasks
        }
      }

      // ADMIN

      else if (user.role === "Admin") {

        const totalManagers =await userModel.countDocuments({
            role: "Manager"
          })

        const totalEmployees =await userModel.countDocuments({
            role: "Employee"
          })

        const totalTasks =await taskModel.countDocuments()

        status = {totalManagers,totalEmployees,totalTasks}
      }

      // MANAGER

      else if (user.role === "Manager") {

        const teamMembers =await userModel.countDocuments({
            reportsTo: user.id
          })

        const teamTasks =await taskModel.countDocuments({
            assignedBy: user.id
          })

        status = {teamMembers,teamTasks}
      }

      // EMPLOYEE

      else {

        const myTasks =await taskModel.countDocuments({
            assignedTo: user.id
          })

        const completedTasks =await taskModel.countDocuments({
            assignedTo: user.id,
            status: "Done"
          })

        status = {myTasks,completedTasks}
      }

      res.status(200).json({
        success: true,
        status
      })

    } catch (error) {

      console.log(error)
      res.status(500).json({
        message: error.message
      })
    }
}

module.exports = {
  getDashboardStatus
}