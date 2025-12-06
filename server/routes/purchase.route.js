import express from 'express'
import { auth, authTeacher, authAdmin } from '../middlewares/auth.middleware.js'
import { createCheckoutSession, getPurchasedCourse, getAllPurchasedCourse, getAllPurchasedCourseByTeacher, getPurchasedCourseByStudentId } from '../controllers/payment.controller.js'

const router = express.Router()

router.post("/checkout/create-checkout-session", auth, createCheckoutSession)
router.get("/course/:courseId/get_course", auth, getPurchasedCourse)
router.get("/", auth, authAdmin, getAllPurchasedCourse)
router.get("/getCourse", auth, authTeacher, getAllPurchasedCourseByTeacher)
router.get('/purchasedCourse', auth, getPurchasedCourseByStudentId)

export default router