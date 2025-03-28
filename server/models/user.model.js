import mongoose from "mongoose";
import jwt from "jsonwebtoken";

const userSchema = mongoose.Schema(
  {
    username: { type: String, require: true },
    email: { type: String, require: true },
    password: { type: String, require: true },
    verifyOTP: { type: String, default: "" },
    verifyOTPExpire: { type: Number, default: 0 },
    isVerified: { type: Boolean, default: false },
    resetOTP: { type: String, default: 0 },
    resetOTPExpire: { type: Number, default: 0 },
    role: { type: String, enum: ["student", "teacher"], default: "student" },
  },
  { timestamps: true }
);

userSchema.methods.generateToken = async function () {
  try {
    return jwt.sign(
      {
        _id: this._id,
        email: this.email,
        role: this.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );
  } catch (error) {
    console.log(error)
  }
};

export const User = mongoose.model("User",userSchema)