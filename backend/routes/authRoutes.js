import express from "express";
import {
  register,
  login,
  logout,
  authMe,
} from "../controllers/authController.js";
import upload from "../middleware/multer.js";
import { verifyToken } from "../middleware/authMiddleware.js";
const router = express.Router();

router.post("/register", upload.single("resume"), register);
// router.get("/me", authMe);
router.get("/me", verifyToken, authMe);
router.post("/login", login);
router.post("/logout", logout);

export default router;
