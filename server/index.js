import express from 'express'
import { config } from "dotenv"
import { connectDB } from './config/db.js';
import authRouter from './routes/auth.route.js'
import courseRouter from './routes/course.route.js'
import paymentRouter from './routes/payment.route.js'
import cors from 'cors'

config();

const app = express()

const corsOption = {
  origin: "http://localhost:8000",
  credentials: true,
};
app.use(cors(corsOption))
app.use(express.json())

app.use('/api/auth',authRouter)
app.use('/api/courses',courseRouter)
app.use('/api/payment', paymentRouter)
const PORT = process.env.PORT || 4000
connectDB()
app.listen(PORT, ()=>{
    console.log(`Server is listening on ${PORT}`)
})