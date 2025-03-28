import express from 'express'
import { getCourses, getSingleCourse, addCourse, deleteCourse, updateCourse, getCourseByTeacherId } from '../controllers/courses.contoller.js'
import { auth, authTeacher } from '../middlewares/auth.middleware.js'

const router = express.Router()

router.get('/get_course', getCourses)
router.get('/get_course/:id', getSingleCourse)
router.post('/add_course', auth, authTeacher, addCourse)
router.get('/courseby_teacher/:id', auth, authTeacher, getCourseByTeacherId)
router.delete('/delete_course/:id', auth, authTeacher, deleteCourse)
router.put('/update_course/:id', auth, authTeacher, updateCourse)

export default router