import express from "express";
import {
  getAllApplications,
  updateApplicationStatus,
} from "../controllers/adminController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";

const router = express.Router();

router.get(
  "/applications",
  authMiddleware,
  adminMiddleware,
  getAllApplications
);

router.put(
  "/applications/:id/status",
  authMiddleware,
  adminMiddleware,
  updateApplicationStatus
);

export default router;
