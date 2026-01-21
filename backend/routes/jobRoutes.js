import express from "express";
import { postJob } from "../controllers/jobController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";

const router = express.Router();

router.post("/job/post-job", authMiddleware, adminMiddleware, postJob);

export default router;
