import mongoose from 'mongoose'

const courseSchema = new mongoose.Schema({
    title: {type: String, required: true},
    subtitle: {type: String},
    courseLevel: {type: String, enum:["Beginner","Medium","Advance"]},
    enrolledStudents: [{type: mongoose.Schema.Types.ObjectId, ref: "User"}],
    price: {type: Number},
    rating: {type: Number, required: false},
    category: {type: String},
    description: {type: String},
    image: {type: String},
    teacher: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    isPublished: {type: Boolean, default: false},
    lectures: [{type: mongoose.Schema.Types.ObjectId, ref: "Lecture"}]
},{timestamps: true})

export const Course = mongoose.model('Course', courseSchema)