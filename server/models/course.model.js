import mongoose from 'mongoose'

const reviewSchema = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    rating: {type: Number},
    comment: {type: String},
    createdAt: {type: Date, default: Date.now}
})

const courseSchema = new mongoose.Schema({
    title: {type: String, required: true},
    subtitle: {type: String},
    courseLevel: {type: String, enum:["Beginner","Medium","Advance"]},
    enrolledStudents: [{type: mongoose.Schema.Types.ObjectId, ref: "User"}],
    price: {type: Number},
    category: {type: String},
    description: {type: String},
    image: {type: String},
    teacher: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    isPublished: {type: Boolean, default: false},
    lectures: [{type: mongoose.Schema.Types.ObjectId, ref: "Lecture"}],
    reviews: [reviewSchema],
    averageRating: { type: Number, default: 0 }
},{timestamps: true})

export const Course = mongoose.model('Course', courseSchema)