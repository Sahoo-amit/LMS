import express from 'express'
import { auth, authTeacher } from '../middlewares/auth.middleware.js'
import { createCheckoutSession, stripeWebhook, getPurchasedCourse, getAllPurchasedCourse, getAllPurchasedCourseByTeacher } from '../controllers/payment.controller.js'

const router = express.Router()

router.post("/checkout/create-checkout-session", auth, createCheckoutSession)
router.post("/webhook", express.raw({ type: "application/json" }), stripeWebhook)
router.get("/course/:courseId/get_course", auth, getPurchasedCourse)
router.get("/", auth, getAllPurchasedCourse)
router.get("/getCourse", auth, authTeacher, getAllPurchasedCourseByTeacher)

export default router