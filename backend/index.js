import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/authRoutes.js";
import applicationRoutes from "./routes/applicationRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import otpRoutes from "./routes/otpRoutes.js";
import conn from "./config/db.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

conn(); // db connection function
app.use(express.json());
app.use(cookieParser());

app.use(cors({ origin: "http://localhost:5173", credentials: true }));


app.use("/api/auth", authRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api", otpRoutes);

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
