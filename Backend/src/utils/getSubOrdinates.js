const userModel = require("../models/auth.model");

const getSubordinates = async (userId) => {
  const directUsers = await userModel.find({
    reportsTo: userId,
  });

  let allUsers = [...directUsers];

  for (let user of directUsers) {
    const nestedUsers = await getSubordinates(user._id);

    allUsers = [...allUsers, ...nestedUsers];
  }

  return allUsers;
};

module.exports = getSubordinates;
