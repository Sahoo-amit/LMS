import mongoose from 'mongoose'

const courseSchema = new mongoose.Schema({
    title: {type: String, required: true},
    price: {type: Number, required: true},
    rating: {type: Number, required: false},
    category: {type: String, required: true},
    description: {type: String, required: true},
    image: {type: String, required: true},
    video: {type: String, required: true},
    videoPreview: {type: String, required: true},
    teacher: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true}
})

export const Course = mongoose.model('Course', courseSchema)