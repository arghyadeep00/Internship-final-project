import express from "express";
import User from "../models/User.js";
import authMiddleware from "../middleware/authMiddleware.js";
import userMiddleware from "../middleware/userMiddleware.js";
import {
  avatar,
  education,
  personal,
  profile,
  resume,
  skills,
} from "../controllers/userController.js";
const router = express.Router();

router.put("/avatar", authMiddleware, userMiddleware, avatar);
router.put("/profile", authMiddleware, userMiddleware, profile);
router.put("/personal", authMiddleware, userMiddleware, personal);
router.put("/skills", authMiddleware, userMiddleware, skills);
router.put("/education", authMiddleware, userMiddleware, education);
router.put("/resume", authMiddleware, userMiddleware, resume);

export default router;
