import express from 'express'
import { register, login, forgot_password, reset_password, verifyOTP, updateProfile, getUserData, getAllUser, updateRole, deleteUser } from '../controllers/auth.controller.js'
import {auth, authAdmin} from '../middlewares/auth.middleware.js'
import upload from '../config/multer.js'

const router = express.Router()

router.post('/signup', register)
router.post('/signin', login)
router.post('/forgot_password', forgot_password)
router.post('/reset_password', reset_password)
router.post('/verify_otp', verifyOTP)
router.get("/allUser", auth, authAdmin, getAllUser)
router.put("/updateRole/:id", auth, authAdmin, updateRole)
router.delete("/deleteUser/:id", auth, authAdmin, deleteUser)
router.get('/getProfile/:id', auth, getUserData)
router.put("/update_profile/:id", auth, upload.single("profileUrl"), updateProfile);
export default router;