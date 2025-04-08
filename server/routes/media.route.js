import express from "express"
import upload from '../config/multer.js'
import { uploadMedia } from "../config/cloudinary.js"

const router = express.Router()

router.route("/upload_video").post(upload.single("video"), async(req,res)=>{
    try {
        const result = await uploadMedia(req.file.path)
        res.status(200).json({result, message: "File uploaded successfully."})
    } catch (error) {
        console.log(error)
    }
})
export default router