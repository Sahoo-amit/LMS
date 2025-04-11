import mongoose from "mongoose";
import jwt from "jsonwebtoken";

const userSchema = mongoose.Schema(
  {
    username: { type: String, require: true },
    email: { type: String, require: true },
    password: { type: String, require: true },
    resetOTP: { type: String, default: 0 },
    resetOTPExpire: { type: Number, default: 0 },
    role: { type: String, enum: ["student", "teacher", "admin"], default: "student" },
    enrolledCourse : [{type: mongoose.Schema.Types.ObjectId, ref:"Course"}],
    photoUrl : {type: String, default: ""}
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