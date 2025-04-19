import express from 'express'
import upload from '../config/multer.js'
import { createCourse, editLecture, updateCourse, getCourses, getSingleCourse, getCourseByTeacherId, deleteCourse, createLecture, getLecture, removeLecture, getLectureById, publishCourse, getPublishCourse, getAllCourseForAdmin, submitReview, updateReview, getAllReviewsForAllCourses } from '../controllers/courses.contoller.js'
import { auth, authAdmin, authTeacher } from '../middlewares/auth.middleware.js'

const router = express.Router()

router.get('/get_course', getCourses)
router.get('/get_course/:id', auth, getSingleCourse)
router.post('/createcourse', auth, authTeacher, createCourse)
router.get('/courseby_teacher', auth, authTeacher, getCourseByTeacherId)
router.delete('/delete_course/:id', auth, authTeacher, deleteCourse)
router.put('/update_course/:id', auth, authTeacher, upload.single("image"), updateCourse)
router.post("/:courseId/lecture", auth, authTeacher, createLecture);
router.get("/lectures/:id", auth, authTeacher, getLecture)
router.post("/:courseId/lecture/:lectureId", auth, authTeacher, editLecture)
router.get("/lecture/:id", auth, getLectureById)
router.delete("/lecture/:id", auth, authTeacher, removeLecture)
router.put("/:id", auth, authTeacher, publishCourse)
router.get("/published_course", getPublishCourse)
router.post("/:id/review", auth, submitReview)
router.put('/:id/review/update', auth, updateReview)
router.get("/getReviews", getAllReviewsForAllCourses)
router.get("/admin_details", auth, authAdmin, getAllCourseForAdmin)

export default router