import express from "express";
import {
  allJobs,
  applyJob,
  postJob,
  fetchAppliedJobs,
  updateStatus,
} from "../controllers/jobController.js";
import { verifyToken, authorize } from "../middleware/authMiddleware.js";
const router = express.Router();

router.post("/job/post-job", verifyToken, authorize("admin"), postJob);
router.get("/job/all-jobs", verifyToken, authorize("admin", "user"), allJobs);
router.post("/job/apply-job", verifyToken, authorize("user"), applyJob);
router.get(
  "/job/fetch-applied-jobs",
  verifyToken,
  authorize("user"),
  fetchAppliedJobs,
);

router.patch(
  "/job/update-status",
  verifyToken,
  authorize("admin"),
  updateStatus,
);

export default router;
