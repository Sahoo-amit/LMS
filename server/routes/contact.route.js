import express from 'express'
import { getAllMessages, sendMessage, deleteMessage } from '../controllers/contact.controller.js'
import { auth, authAdmin } from '../middlewares/auth.middleware.js'

const router = express.Router()

router.post("/send_message",sendMessage)
router.get("/get_contact", auth, authAdmin, getAllMessages)
router.delete("/delete_message", auth, authAdmin, deleteMessage)

export default router