import Stripe from 'stripe'
import { Course } from "../models/course.model.js"
import { CoursePurchase } from '../models/coursePurchase.model.js';
import { Lecture } from '../models/lecture.model.js';
import { User } from '../models/user.model.js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const createCheckoutSession = async(req,res)=>{
    try {
        const userId = req.id;
        const {courseId} = req.body
        const course = await Course.findById(courseId)
        if(!course){
            return res.status(404).json({message: "Course not found."})
        }
        const newPurchase = new CoursePurchase({
          courseId,
          userId,
          status: "pending",
          amount: course.price
        });
        const session = await stripe.checkout.sessions.create({
          payment_method_types: ["amazon_pay", "card"],
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
          success_url: `${process.env.FRONTEND_URL}/course_progess/${courseId}`,
          cancel_url: `${process.env.FRONTEND_URL}/course_details/${courseId}`,
          metadata:{
            courseId: courseId.toString(),
            userId: userId.toString(),
          }
        });
        if(!session.url){
            return res.status(400).json({message:"Error"})
        }
        newPurchase.paymentId = session.id
        await newPurchase.save()

        res.status(200).json({url: session.url})
    } catch (error) {
        console.log(error)
    }
}

export const stripeWebhook = async (req, res) => {
  let event;
  try {
    const payloadString = JSON.stringify(req.body, null, 2);
    const secret = process.env.WEBHOOK_ENDPOINT_SECRET;
    const header = stripe.webhooks.generateTestHeaderString({
      payload: payloadString,
      secret,
    });
    event = stripe.webhooks.constructEvent(payloadString, header, secret);
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
}

export const getPurchasedCourse = async(req,res)=>{
  try {
    const {courseId} = req.params
    const userId = req.id
    const course = await Course.findById(courseId).populate({path: "teacher"}).populate({path: "lectures"})
    const purchasedCourse = await CoursePurchase.findOne({userId, courseId})
    if(!course){
      return res.status(404).json({message: "Course not found."})
    }
    return res.status(200).json({course, purchasedCourse: !!purchasedCourse})
  } catch (error) {
    console.log(error)
  }
}

export const getAllPurchasedCourse = async (req, res) => {
  try {
    const purchasedCourses = await CoursePurchase.find({
      status: "completed",
    }).populate("courseId");

    if (!purchasedCourses || purchasedCourses.length === 0) {
      return res.status(404).json({ purchasedCourse: [] });
    }

    // Filter to get unique courseId
    const seenCourses = new Set();
    const uniqueCourses = [];

    for (const purchase of purchasedCourses) {
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
