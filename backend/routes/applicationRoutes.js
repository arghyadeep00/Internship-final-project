import express from "express";
import {
  submitApplication,
  allApplicants,
  applications,
  updateStatus,
  searchApplication,
} from "../controllers/applicationController.js";
import { verifyToken, authorize } from "../middleware/authMiddleware.js";
const router = express.Router();

router.post("/", verifyToken, submitApplication);
router.get("/all-applicants", verifyToken, authorize("admin"), allApplicants);
router.get("/applications", verifyToken, authorize("admin"), applications);
router.patch("/update-status", verifyToken, authorize("admin"), updateStatus);

router.patch("/update-status", verifyToken, authorize("admin"), updateStatus);

router.get(
  "/search-application",
  verifyToken,
  authorize("admin"),
  searchApplication,
);

export default router;
