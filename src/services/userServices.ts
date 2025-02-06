import User, { IUser } from "../models/User";

// Define types for user data and the response object
interface UserData {
  name: string;
  email: string;
  password: string;
  // add any other fields based on the User model
}

interface UpdateUserData {
  name?: string;
  email?: string;
  password?: string;
  // add any other optional fields based on the User model
}

// Create a new user function
const createUser = async (userData: UserData): Promise<IUser> => {
  try {
    return await User.create(userData);
  } catch (error: any) {
    throw new Error(`Error creating user: ${error.message}`);
  }
};

// Get all users function
const getAllUsers = async (): Promise<IUser[]> => {
  try {
    return await User.find();
  } catch (error: any) {
    throw new Error(`Error fetching users: ${error.message}`);
  }
};

// Get user by ID function
const getUserById = async (userId: string): Promise<IUser> => {
  try {
    const user = await User.findById(userId);
    if (!user) throw new Error("User not found");
    return user;
  } catch (error: any) {
    throw new Error(`Error fetching user: ${error.message}`);
  }
};

// Update a user function
const updateUser = async (
  userId: string,
  updatedData: UpdateUserData
): Promise<IUser> => {
  try {
    const updatedUser = await User.findByIdAndUpdate(userId, updatedData, { new: true });
    if (!updatedUser) throw new Error("User not found");
    return updatedUser;
  } catch (error: any) {
    throw new Error(`Error updating user: ${error.message}`);
  }
};

// Delete a user function
const deleteUser = async (userId: string): Promise<IUser> => {
  try {
    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) throw new Error("User not found");
    return deletedUser;
  } catch (error: any) {
    throw new Error(`Error deleting user: ${error.message}`);
  }
};

export {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser
};
