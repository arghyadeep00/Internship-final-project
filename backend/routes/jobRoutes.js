import express from "express";
import { allJobs, applyJob, postJob } from "../controllers/jobController.js";
import { verifyToken, authorize } from "../middleware/authMiddleware.js";
const router = express.Router();

router.post("/job/post-job", verifyToken, authorize("admin"), postJob);
router.get("/job/all-jobs", verifyToken, authorize("admin", "user"), allJobs);
router.post("/job/apply-job", verifyToken, authorize("user"), applyJob);

export default router;
