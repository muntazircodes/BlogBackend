const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registerUser = async (userData) => {
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

const loginUser = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error("Invalid email or password");

  // Compare hashed passwords
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Invalid email or password");

  // Generate JWT token
  const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "1h" });

  return { token, user };
};

module.exports = { registerUser, loginUser };
