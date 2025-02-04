const User = require('../models/User');

const createUser = async (userData) => {
  try {
    const newUser = await User.create(userData);
    return newUser;
  } catch (error) {
    throw new Error('Error creating user');
  }
};

const getAllUsers = async () => {
  try {
    const users = await User.find();
    return users;
  } catch (error) {
    throw new Error('Error fetching users');
  }
};

const getUserById = async (userId) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  } catch (error) {
    throw new Error('Error fetching user');
  }
};

const updateUser = async (userId, updatedData) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(userId, updatedData, { new: true });
    return updatedUser;
  } catch (error) {
    throw new Error('Error updating user');
  }
};

const deleteUser = async (userId) => {
  try {
    const deletedUser = await User.findByIdAndDelete(userId);
    return deletedUser;
  } catch (error) {
    throw new Error('Error deleting user');
  }
};

module.exports = { createUser, getAllUsers, getUserById, updateUser, deleteUser };
