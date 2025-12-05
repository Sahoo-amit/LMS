import Stripe from "stripe";
import { Course } from "../models/course.model.js";
import { CoursePurchase } from "../models/coursePurchase.model.js";
import { Lecture } from "../models/lecture.model.js";
import { User } from "../models/user.model.js";
import fetch from "node-fetch";
const FRONTEND_URL = "https://lms-ntj1.onrender.com";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const getMyIp = async (req, res) => {
  const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
  res.json({ ip });
};

export const createCheckoutSession = async (req, res) => {
  try {
    console.log("Checkout request:", req.body);
    console.log("User ID from middleware:", req.id);
    const userId = req.id;
    const { courseId } = req.body;
    const userIP = req.headers["x-forwarded-for"] || req.socket.remoteAddress;

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found." });
    }

    const newPurchase = new CoursePurchase({
      courseId,
      userId,
      status: "pending",
      amount: course.price,
      purchaseIp: userIP,
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "INR",
            product_data: {
              name: course.title,
              images: [course.image],
            },
            unit_amount: course.price * 100,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${FRONTEND_URL}/my_enrollment`,
      cancel_url: `${FRONTEND_URL}/course_details`,
      metadata: {
        courseId: courseId.toString(),
        userId: userId.toString(),
        userIP: userIP,
      },
    });

    if (!session.url) {
      return res.status(400).json({ message: "Error creating session." });
    }

    newPurchase.paymentId = session.id;
    await newPurchase.save();

    res.status(200).json({ url: session.url });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const stripeWebhook = async (req, res) => {
  console.log("🔥 Stripe webhook triggered");
  let event;
  try {
    const payloadString = JSON.stringify(req.body, null, 2);
    const secret = process.env.WEBHOOK_ENDPOINT_SECRET;
    const sig = req.headers["stripe-signature"];
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.WEBHOOK_ENDPOINT_SECRET
    );
  } catch (error) {
    console.error("Webhook error:", error.message);
    return res.status(400).send(`Webhook error: ${error.message}`);
  }
  if (event.type === "checkout.session.completed") {
    console.log("check session complete is called");
    try {
      const session = event.data.object;

      const purchase = await CoursePurchase.findOne({
        paymentId: session.id,
      }).populate({ path: "courseId" });

      if (!purchase) {
        return res.status(404).json({ message: "Purchase not found" });
      }

      if (session.amount_total) {
        purchase.amount = session.amount_total / 100;
      }
      if (session.metadata?.userIP) {
        purchase.purchaseIp = session.metadata.userIP;
      }
      purchase.status = "completed";
      if (purchase.courseId && purchase.courseId.lectures.length > 0) {
        await Lecture.updateMany(
          { _id: { $in: purchase.courseId.lectures } },
          { $set: { isPreviewFree: true } }
        );
      }
      await purchase.save();
      await User.findByIdAndUpdate(
        purchase.userId,
        { $addToSet: { enrolledCourse: purchase.courseId._id } },
        { new: true }
      );

      await Course.findByIdAndUpdate(
        purchase.courseId._id,
        { $addToSet: { enrolledStudents: purchase.userId } },
        { new: true }
      );
    } catch (error) {
      console.error("Error handling event:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
  res.status(200).send();
};

export const getPurchasedCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const userId = req.id;
    const course = await Course.findById(courseId)
      .populate({ path: "teacher" })
      .populate({ path: "lectures" });
    const purchasedCourse = await CoursePurchase.findOne({
      userId,
      courseId,
    }).populate("status");
    if (!course) {
      return res.status(404).json({ message: "Course not found." });
    }
    return res.status(200).json({ course, purchasedCourse: !!purchasedCourse });
  } catch (error) {
    console.log(error);
  }
};

export const getAllPurchasedCourse = async (req, res) => {
  try {
    const purchasedCourses = await CoursePurchase.find({
      status: "completed",
    }).populate({
      path: "courseId",
      populate: {
        path: "teacher",
        select: "username email",
      },
    });

    if (!purchasedCourses || purchasedCourses.length === 0) {
      return res.status(404).json({ purchasedCourse: [] });
    }

    const seenCourses = new Set();
    const uniqueCourses = [];

    for (const purchase of purchasedCourses) {
      const course = purchase.courseId;
      if (!course) continue;

      const courseId = course._id.toString();
      if (!seenCourses.has(courseId)) {
        seenCourses.add(courseId);
        uniqueCourses.push(course);
      }
    }

    return res.status(200).json({ purchasedCourses: uniqueCourses });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const getAllPurchasedCourseByTeacher = async (req, res) => {
  try {
    const id = req.id;
    const purchasedCourses = await CoursePurchase.find({
      status: "completed",
    }).populate({
      path: "courseId",
      match: { teacher: id },
    });
    const filteredCourses = purchasedCourses.filter((p) => p.courseId !== null);
    if (filteredCourses.length === 0) {
      return res.status(200).json({ purchasedCourse: [] });
    }
    const seenCourses = new Set();
    const uniqueCourses = [];

    for (const purchase of filteredCourses) {
      const courseId = purchase.courseId._id.toString();
      if (!seenCourses.has(courseId)) {
        seenCourses.add(courseId);
        uniqueCourses.push(purchase);
      }
    }

    return res.status(200).json({ purchasedCourse: uniqueCourses });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const getPurchasedCourseByStudentId = async (req, res) => {
  try {
    const studentId = req.params.studentId || req.id;

    const purchasedCourses = await CoursePurchase.find({
      userId: studentId,
      status: "completed",
    }).populate({
      path: "courseId",
      select: "-enrolledStudents",
      populate: { path: "teacher", select: "username email" },
    });

    if (!purchasedCourses || purchasedCourses.length === 0) {
      return res.status(200).json({ purchasedCourse: [] });
    }

    const seenCourses = new Set();
    const uniqueCourses = [];

    for (const purchase of purchasedCourses) {
      const courseId = purchase.courseId?._id?.toString();
      if (courseId && !seenCourses.has(courseId)) {
        seenCourses.add(courseId);
        uniqueCourses.push({
          courseId: purchase.courseId,
          purchaseIP: purchase.purchaseIp || null,
        });
      }
    }

    return res.status(200).json({ purchasedCourse: uniqueCourses });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};
