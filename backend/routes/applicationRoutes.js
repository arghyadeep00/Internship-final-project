import express from "express";
import {
  submitApplication,
  allApplicants,
  applications,
  updateStatus,
  searchApplication,
  recentApplications,
  totalApplications,
  shortListed,
  rejected,
  pending,
} from "../controllers/applicationController.js";
import { verifyToken, authorize } from "../middleware/authMiddleware.js";
const router = express.Router();

router.post("/", verifyToken, submitApplication);
router.get("/all-applicants", verifyToken, authorize("admin"), allApplicants);
router.get("/applications", verifyToken, authorize("admin"), applications);
router.patch("/update-status", verifyToken, authorize("admin"), updateStatus);
router.get(
  "/recent-applications",
  verifyToken,
  authorize("admin"),
  recentApplications,
);

router.get(
  "/search-application",
  verifyToken,
  authorize("admin"),
  searchApplication,
);

router.get(
  "/total-applications",
  verifyToken,
  authorize("admin"),
  totalApplications,
);
router.get("/pending", verifyToken, authorize("admin"), pending);
router.get("/shortlisted", verifyToken, authorize("admin"), shortListed);
router.get("/rejected", verifyToken, authorize("admin"), rejected);

export default router;
