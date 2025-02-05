const User = require("../models/User");

const createUser = async (userData) => {
  try {
    return await User.create(userData);
  } catch (error) {
    throw new Error(`Error creating user: ${error.message}`);
  }
};

const getAllUsers = async () => {
  try {
    return await User.find();
  } catch (error) {
    throw new Error(`Error fetching users: ${error.message}`);
  }
};

const getUserById = async (userId) => {
  try {
    const user = await User.findById(userId);
    if (!user) throw new Error("User not found");
    return user;
  } catch (error) {
    throw new Error(`Error fetching user: ${error.message}`);
  }
};

const updateUser = async (userId, updatedData) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(userId, updatedData, { new: true });
    if (!updatedUser) throw new Error("User not found");
    return updatedUser;
  } catch (error) {
    throw new Error(`Error updating user: ${error.message}`);
  }
};

const deleteUser = async (userId) => {
  try {
    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) throw new Error("User not found");
    return deletedUser;
  } catch (error) {
    throw new Error(`Error deleting user: ${error.message}`);
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};
