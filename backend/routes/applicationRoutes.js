import express from "express";
import {
  submitApplication,
  allApplicants,
} from "../controllers/applicationController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, submitApplication);
router.get("/all-applicants", authMiddleware, adminMiddleware, allApplicants);

export default router;
