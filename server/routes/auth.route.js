import express from 'express'
import { register, login, forgot_password, reset_password, verifyOTP } from '../controllers/auth.controller.js'

const router = express.Router()

router.post('/signup', register)
router.post('/signin', login)
router.post('/forgot_password', forgot_password)
router.post('/reset_password', reset_password)
router.post('/verify_otp', verifyOTP)

export default router;