import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import authRoutes from "./routes/auth.js";
import clientRoutes from "./routes/client.js";
import appointmentRoutes from "./routes/appointment.js";
import serviceRoutes from "./routes/service.js";
import credentials from "./middleware/credentials.js";
import { corsOptions } from "./config/corsOptions.js";
import verifyJWT from "./middleware/verifyJWT.js";

/* CONFIGURATIONS */

const __filename = fileURLToPath(import.meta.url); // Jó kérdés mire jós
const __dirname = path.dirname(__filename);

dotenv.config();
const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Handle options credentials check - before CORS!
// and fetch cookies credentials requirement
app.use(credentials);

app.use(cors(corsOptions));
app.use(cookieParser());

const saltRounds = 10;

/* DATABASE CONNECTION */
const connectDB = async () => {
  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(process.env.MONGODB_URL);
  }
  catch (err) {
    console.log("Failed to connect to MongoDB", err);
  }
}
connectDB();

app.listen(process.env.PORT, () => {
  console.log("Server is running on port " + process.env.PORT);
})

/* ROUTES */
app.use("/auth", authRoutes);

app.use(verifyJWT);
app.use("/client", clientRoutes);
app.use("/service", serviceRoutes);
app.use("/appointment", appointmentRoutes);