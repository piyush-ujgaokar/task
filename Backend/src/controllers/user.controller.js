const userModel =require("../models/auth.model")

const getUsers =async (req, res) => {

    try {
      const currentUser =req.user

      let users = []

      // SUPER ADMIN

      if (currentUser.role ==="Super Admin") {
        users =
          await userModel.find().select("-password")
      }

      // ADMIN

      else if (currentUser.role ==="Admin") {
        users =await userModel.find({
            role: {
              $in: [
                "Manager",
                "Employee"
              ]
            }
          }).select("-password")
      }

      // MANAGER

      else if (currentUser.role ==="Manager") {
        users =await userModel.find({
            reportsTo:currentUser.id
          }).select("-passwordHash")
      }

      // EMPLOYEE

      else {

        users =await userModel.find({
            _id:currentUser.id
          }).select("-passwordHash")
      }

      res.status(200).json({
        message: "Users fetched successfully",
        success: true,
        users
      })

    } catch (error) {
      console.log(error)
      res.status(500).json({
        message: error.message
      })
    }
}


const updateUser =async (req, res) => {

    try {
      const { id } =req.params

      const updatedUser =await userModel.findByIdAndUpdate(
          id,
          req.body,
          { new: true }
        )

      res.status(200).json({
        message: "User updated successfully",
        success: true,
        updatedUser
      })

    } catch (error) {
      res.status(500).json({
        message: error.message
      })
    }
}


const deleteUser = async (req, res) => {

    try {
      const { id } =req.params
      await userModel.findByIdAndDelete(id)

      res.status(200).json({
        message: "User deleted successfully",
        success: true,
      })

    } catch (error) {
      res.status(500).json({
        message: error.message
      })
    }
}




module.exports = {
  getUsers,
  updateUser,
  deleteUser
}