import dotenv from "dotenv";
import connectDB from "./config/db";
import app from "./app";

// Load environment variables
dotenv.config();

// Connect to database
connectDB();

// Define the port with a fallback
const PORT: number = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

// Start the server
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
