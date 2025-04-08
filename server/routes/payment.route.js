import express from "express";
import Stripe from "stripe";
import { config } from "dotenv";
config();

const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

router.post("/create-checkout-session", async (req, res) => {
  try {
    const { courseId, courseName, price, userId } = req.body;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      success_url: "http://localhost:8000/success",
      cancel_url: "http://localhost:8000/cancel",
      metadata: {
        courseId,
        userId,
      },
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: courseName,
            },
            unit_amount: price * 100,
          },
          quantity: 1,
        },
      ],
    });

    res.json({ id: session.id });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    res.status(500).json({ error: error.message });
  }
});


router.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  async (req, res) => {
    const sig = req.headers["stripe-signature"];
    let event;

    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } catch (err) {
      console.error("Webhook signature verification failed.", err);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      const courseId = session.metadata.courseId;
      const userId = session.metadata.userId;

      try {
        // Update user to store enrolled course
        await User.findByIdAndUpdate(userId, {
          $addToSet: { enrolledCourse: courseId },
        });

        console.log(`Course ${courseId} added to user ${userId}`);
      } catch (error) {
        console.error("Error updating user with purchased course:", error);
      }
    }

    res.json({ received: true });
  }
);


export default router;
