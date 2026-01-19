import express from "express";
import {
  register,
  login,
  logout,
  authMe,
} from "../controllers/authController.js";
import upload from "../middleware/multer.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", upload.single("resume"), register);
// router.get("/me", authMe);
router.get("/me", authMiddleware, authMe);
router.post("/login", login);
router.post("/logout", logout);

export default router;
