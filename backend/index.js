import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import FoodRouter from "./routes/foodRoutes.js";
import UserRouter from "./routes/userRoutes.js";
import cors from "cors";
dotenv.config();

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || origin === 'http://localhost:5173') {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
};

mongoose.connect(`${process.env.DB_URI}`);

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));

app.use("/api/v1/food", FoodRouter);
app.use("/api/v1/user", UserRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
