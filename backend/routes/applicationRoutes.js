import express from "express";
import {
  submitApplication,
  getMyApplications,
} from "../controllers/applicationController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, submitApplication);
router.get("/my", authMiddleware, getMyApplications);

export default router;
