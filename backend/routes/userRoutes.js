import express from "express";
import User from "../models/User.js";
import { verifyToken, authorize } from "../middleware/authMiddleware.js";
import {
  avatar,
  education,
  personal,
  profile,
  resume,
  skills,
} from "../controllers/userController.js";
import uploadImage from "../middleware/imageUploadMiddleware.js";
const router = express.Router();

router.put(
  "/avatar",
  verifyToken,
  authorize("user"),
  uploadImage.single("image"),
  avatar,
);
router.put("/profile", verifyToken, authorize("user"), profile);
router.put("/personal", verifyToken, authorize("user"), personal);
router.put("/skills", verifyToken, authorize("user"), skills);
router.put("/education", verifyToken, authorize("user"), education);
router.put("/resume", verifyToken, authorize("user"), resume);

export default router;
