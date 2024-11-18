import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";

dotenv.config();

mongoose
  .connect(process.env.MONGO_DB_URL)
  .then(() => {
    console.log("MongoDb is connected");
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();
// const cors = require("cors");

app.use(express.json());

app.listen(3000, () => {
  console.log("server is running on port 3000!!");
});
app.use(
  cors({
    // origin: "http://localhost:3000", // React app's URL
    credentials: true, // Enable sending cookies if needed
  })
);

app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);

// middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
