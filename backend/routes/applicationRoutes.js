import express from "express";
import {
  submitApplication,
  allApplicants,
} from "../controllers/applicationController.js";
import { verifyToken, authorize } from "../middleware/authMiddleware.js";
const router = express.Router();

router.post("/", verifyToken, submitApplication);
router.get("/all-applicants", verifyToken, authorize("admin"), allApplicants);

export default router;
