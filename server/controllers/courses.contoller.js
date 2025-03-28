import {Course} from '../models/course.model.js'

export const getCourses = async(req, res)=>{
    try {
        const courses = await Course.find({})
        res.status(200).json(courses)
    } catch (error) {
        console.log(error)
    }
}

export const getSingleCourse = async(req, res)=>{
    try {
        const {id} = req.params
        const course = await Course.findById(id)
        res.status(200).json({course})
    } catch (error) {
        console.log(error)
    }
}

export const addCourse = async(req, res)=>{
    const {title, image, description, category, price, teacher, video, videoPreview} = req.body
    try {
        const course = await Course.create({title, image, description, category, price, teacher:req.user._id, video, videoPreview})
        res.status(200).json(course)
    } catch (error) {
        console.log(error)
    }
}

export const getCourseByTeacherId = async(req, res)=>{
    try {
        const teacherID = req.user._id
        if(!teacherID){
            return res.status(400).json("Teacher ID is required.")
        }
        const course = await Course.find({teacher:teacherID})
        if(!course || course.length === 0){
            return res.status(400).json("Course not found.")
        }
        res.status(200).json(course)
    } catch (error) {
        console.log(error)
    }
}

export const deleteCourse = async(req, res)=>{
    try {
        const {id} = req.params
        const course = await Course.findByIdAndDelete(id)
        if(!course){
            return res.status(400).json("Failed to delete course.")
        }
        res.status(200).json("Deleted successfully.")
    } catch (error) {
        console.log(error)
    }
}

export const updateCourse = async(req, res)=>{
    try {
        const {id} = req.params
        const newData = req.body
        const updatedCourse = await Course.findByIdAndUpdate(id, newData, {new:true})
        if(!updatedCourse){
            return res.status(400).json("Updation failed.")
        }
        res.status(200).json("Updation successful.")
    } catch (error) {
        console.log(error)
    }
}