import express from "express";
import { config } from "dotenv";
import { connectDB } from "./config/db.js";
import authRouter from "./routes/auth.route.js";
import courseRouter from "./routes/course.route.js";
import mediaRouter from "./routes/media.route.js";
import purchaseRouter from "./routes/purchase.route.js";
import progressRouter from "./routes/progress.route.js";
import contactRouter from "./routes/contact.route.js";
import cors from "cors";
import { stripeWebhook } from "./controllers/payment.controller.js";

const FRONTEND_URL = "https://lms-ntj1.onrender.com";

config();
const app = express();

// ⭐ MUST COME BEFORE express.json()
app.post(
  "/api/purchase/webhook",
  express.raw({ type: "application/json" }),
  stripeWebhook
);

// CORS
app.use(
  cors({
    origin: FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// ⭐ JSON parser AFTER webhook
app.use(express.json());

// ROUTES
app.use("/api/media", mediaRouter);
app.use("/api/auth", authRouter);
app.use("/api/purchase", purchaseRouter);
app.use("/api/courses", courseRouter);
app.use("/api/progress", progressRouter);
app.use("/api/contact", contactRouter);

// START SERVER
const PORT = process.env.PORT || 4000;
connectDB();
app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});
