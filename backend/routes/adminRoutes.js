import express from "express";
import {
  adminLogin,
  adminRegister,
  getAllApplications,
  updateApplicationStatus,
  fetchUser,
} from "../controllers/adminController.js";
import { verifyToken, authorize } from "../middleware/authMiddleware.js";
const router = express.Router();

// registration admin
router.post("/register", adminRegister);
// admin login
router.post("/login", adminLogin);

router.get(
  "/applications",
  verifyToken,
  authorize("admin"),
  getAllApplications,
);

router.put(
  "/applications/:id/status",
  verifyToken,
  authorize("admin"),
  updateApplicationStatus,
);

router.get("/fetch-user/:id", verifyToken, authorize("admin"), fetchUser);

export default router;
