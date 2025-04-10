import express from 'express'
import {auth} from '../middlewares/auth.middleware.js'
import { getCourseProgress, updateLectureProgress, markAsCompleted, markAsInCompleted } from '../controllers/courseProgress.controller.js'

const router = express.Router()

router.get("/:courseId", auth, getCourseProgress)
router.patch("/:courseId/lecture/:lectureId", auth, updateLectureProgress);
router.patch("/:courseId/complete", auth, markAsCompleted)
router.patch("/:courseId/incomplete", auth, markAsInCompleted)

export default router