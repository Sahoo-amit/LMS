import express from 'express'
import { auth } from '../middlewares/auth.middleware.js'
import { createCheckoutSession, stripeWebhook, getPurchasedCourse, getAllPurchasedCourse } from '../controllers/payment.controller.js'

const router = express.Router()

router.post("/checkout/create-checkout-session", auth, createCheckoutSession)
router.post("/webhook", express.raw({ type: "application/json" }), stripeWebhook)
router.get("/course/:courseId/get_course", auth, getPurchasedCourse)
router.get("/", auth, getAllPurchasedCourse)

export default router