import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db";

const app = express();

// Load environment variables from .env file
dotenv.config();

// set up cors
app.use(cors({ origin: process.env.CLIENT_ORIGIN, credentials: true }));

// Import routes
import userRoutes from "./routes/user.route";
import propertyRoutes from "./routes/property.route";

// Middleware to parse incoming JSON requests
app.use(express.json());
app.use(express.urlencoded({ extended: false }))


// Connect to MongoDB and start the server
connectDB();

const PORT = process.env.PORT || 4000;

// API Routes
app.use("/api", userRoutes);
app.use("/api/property", propertyRoutes);

// Start the server with app.listen instead of server.listen
app.listen(PORT, () => console.log(`server is running on ${PORT}`));
