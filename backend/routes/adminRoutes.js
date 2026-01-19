import express from "express";
import {
  adminLogin,
  adminRegister,
  getAllApplications,
  updateApplicationStatus,
} from "../controllers/adminController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";

const router = express.Router();

// registration admin
router.post("/register", adminRegister);
// admin login
router.post('/login',adminLogin)

router.get(
  "/applications",
  authMiddleware,
  adminMiddleware,
  getAllApplications,
);

router.put(
  "/applications/:id/status",
  authMiddleware,
  adminMiddleware,
  updateApplicationStatus,
);

export default router;
