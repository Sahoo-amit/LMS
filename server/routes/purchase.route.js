import express from 'express'
import { auth, authTeacher, authAdmin } from '../middlewares/auth.middleware.js'
import { createCheckoutSession, stripeWebhook, getPurchasedCourse, getAllPurchasedCourse, getAllPurchasedCourseByTeacher, getPurchasedCourseByStudentId, getMyIp } from '../controllers/payment.controller.js'

const router = express.Router()

router.post("/checkout/create-checkout-session", auth, createCheckoutSession)
router.post("/webhook", express.raw({ type: "application/json" }), stripeWebhook)
router.get("/course/:courseId/get_course", auth, getPurchasedCourse)
router.get("/", auth, authAdmin, getAllPurchasedCourse)
router.get("/my-ip",getMyIp)
router.get("/getCourse", auth, authTeacher, getAllPurchasedCourseByTeacher)
router.get('/purchasedCourse', auth, getPurchasedCourseByStudentId)

export default router