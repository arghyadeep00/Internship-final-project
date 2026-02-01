import express from 'express'
import { interviewSchedule } from '../controllers/interviewController.js';
import { authorize, verifyToken } from '../middleware/authMiddleware.js';
const router = express.Router();

router.post("/schedule", verifyToken, authorize("admin"), interviewSchedule)







export default router;