import dotenv from "dotenv";
import connectDB from "./config/db";
import app from "./app";

dotenv.config();
connectDB();

const PORT: number = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.listen(PORT, () => 
    console.log(`🚀 Server running on http://localhost:${PORT}`));