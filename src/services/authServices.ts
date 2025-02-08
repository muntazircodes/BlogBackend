import User, { IUser } from "../models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config(); 


interface UserData {
  name: string;
  email: string;
  password: string;
}

interface AuthResponse {
  token: string;
  user: IUser;
}


const registerUser = async (userData: UserData): Promise<IUser> => {
  const { name, email, password } = userData;

  // Check if user exists
  const existingUser = await User.findOne({ email });
  if (existingUser) throw new Error("User already exists");

  // Hash password before saving
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create new user with hashed password
  const newUser = new User({ name, email, password: hashedPassword });
  await newUser.save();

  return newUser;
};
// Login User function
const loginUser = async (email: string, password: string): Promise<string> => {
  const user = await User.findOne({ email });
  if (!user) throw new Error("Invalid email or password");

  // Compare hashed passwords
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Invalid email or password");

  // Generate JWT token
  const token = jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_SECRET as string,
    { expiresIn: "1h" }
  );

  return token;
};

export { registerUser, loginUser };
