import {Course} from '../models/course.model.js'
import {Lecture} from "../models/lecture.model.js"
import { deleteMediaFromCloudinary, deleteVideoFromCloudinary, uploadMedia } from '../config/cloudinary.js';

export const createCourse = async (req, res) => {
  const { title, category } = req.body;
  try {
    const course = await Course.create({ title, category, teacher: req.user._id });
    res.status(200).json({ course, message: "Course created." });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Failed to create a course." });
  }
};

export const updateCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, subtitle, description, category, courseLevel, price } = req.body;
    const thumbnail = req.file;
    let course = await Course.findById(id);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    let image;
    if (thumbnail) {
      if (course.image) {
        const publicId = course.image.split("/").pop().split(".")[0];
        await deleteMediaFromCloudinary(publicId);
      }
      image = await uploadMedia(thumbnail.path);
    }
    const updateData = {
      title,
      subtitle,
      description,
      category,
      courseLevel,
      price,
      image: image?.secure_url,
    };
    course = await Course.findByIdAndUpdate(id, updateData, { new: true });
    return res
      .status(200)
      .json({ course, message: "Course created successfully." });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Failed to update course." });
  }
};

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
        const course = await Course.findById(id).populate("teacher","username email",).populate("lectures");
        if(!course){
            return res.status(404).json({message: "Course not found."})
        }
        res.status(200).json({course})
    } catch (error) {
        console.log(error)
    }
}

export const getCourseByTeacherId = async(req, res)=>{
    try {
        const teacherID = req.params.id
        if(!teacherID){
            return res.status(400).json("Teacher ID is required.")
        }
        const course = await Course.find({teacher:teacherID})
        if(!course){
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

export const createLecture = async(req, res)=> {
    try {
       const {lectureTitle} = req.body
       const lecture = await Lecture.create({lectureTitle})
       const { courseId } = req.params;
       const course = await Course.findById(courseId);
       if (!course) {
         return res.status(404).json({ message: "Course not found." });
       }
       course.lectures.push(lecture._id);
       await course.save();
       res.status(200).json({ lecture, message: "Lecture created successfully." });
    } catch (error) {
        console.log(error)
    }
}

export const getLecture = async(req, res)=>{
    try {
        const {id} = req.params
        const course = await Course.findById(id).populate("lectures")
        if(!course){
            return res.status(404).json({message: "Course not found."})
        }
        res.status(200).json({lectures: course.lectures})
    } catch (error) {
        console.log(error)
    }
}

export const editLecture = async(req, res)=>{
    try {
        const {lectureTitle, videoInfo, isPreviewFree} = req.body
        const {courseId, lectureId} = req.params
        const lecture = await Lecture.findById(lectureId)
        if(!lecture){
            return res.status(404).json({message:"Lecture not found."})
        }
        if (lectureTitle) lecture.lectureTitle = lectureTitle
        if (videoInfo?.videoUrl) lecture.videoUrl = videoInfo.videoUrl
        if (videoInfo?.publicId) lecture.publicId = videoInfo.publicId
        lecture.isPreviewFree = isPreviewFree
        await lecture.save()

        const course = await Course.findById(courseId)
        if(course && !course.lectures.includes(lecture._id)){
            course.lectures.push(lecture._id)
            await course.save()
        }
        return res.status(200).json({lecture, message:"Lecture updated successfully."})
    } catch (error) {
        console.log(error)
    }
}

export const removeLecture = async(req, res)=>{
    try {
        const id = req.params.id
        const lecture = await Lecture.findByIdAndDelete(id)
        if(!lecture){
            return res.status(404).json({message:"Lecture not found."})
        }
        if(lecture.publicId){
            await deleteVideoFromCloudinary(lecture.publicId)
        }
        await Course.updateOne(
            {lectures:id},
            {$pull:{lectures:id}}
        )
        res.status(200).json({message:"Lecture removed successfully."})
    } catch (error) {
        console.log(error)
    }
}

export const getLectureById = async(req, res)=>{
    try {
        const {id} = req.params
        const lecture = await Lecture.findById(id)
        if(!lecture){
            return res.status(404).json({message:"Lecture not found."})
        }
        res.status(200).json(lecture)
    } catch (error) {
        console.log(error)
    }
}

export const publishCourse = async(req, res)=>{
    try {
        const {id} = req.params
        const {publish} = req.query
        const course = await Course.findById(id)
        if(!course){
            return res.status(404).json({message:"Course not found."})
        }
        course.isPublished = publish === "true"
        await course.save()

        const statusMessage = course.isPublished ? "Published" : "Unpublished";
        return res.status(200).json({
          message: `Course is ${statusMessage}`
        });
    } catch (error) {
        console.log(error)
    }
}

export const getPublishCourse = async(req, res)=>{
    try {
        const courses = await Course.find({isPublished:true})
        if(!courses){
            return res.status(404).json({message: "No course is published."})
        }
        res.status(200).json(courses)
    } catch (error) {
        console.log(error)
    }
}