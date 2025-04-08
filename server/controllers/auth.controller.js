import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import {
  deleteMediaFromCloudinary,
  uploadMedia,
} from "../config/cloudinary.js";

export const register = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({ message: "Email already exists!" });
    }
    const salt = await bcrypt.genSalt(10);
    const hash_password = await bcrypt.hash(password, salt);
    const user = await User.create({
      username,
      email,
      password: hash_password,
    });
    res.status(200).json({ user, token: await user.generateToken() });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const userExist = await User.findOne({ email });
    if (!userExist) {
      return res.status(400).json({ message: "User not exists!" });
    }
    const isMatched = await bcrypt.compare(password, userExist.password);
    if (!isMatched) {
      return res.status(400).json("Invalid credentials.");
    }
    res.status(200).json({ userExist, token: await userExist.generateToken() });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

export const forgot_password = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json("User not found. Login first!");
    }
    const otp = crypto.randomInt(100000, 999999);
    const otpExpires = Date.now() + 10 * 60 * 1000;
    user.resetOTP = otp;
    user.resetOTPExpire = otpExpires;
    await user.save();
    const transport = nodemailer.createTransport({
      service: "gmail",
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Password Reset OTP",
      text: `Your OTP for password reset is: ${otp}. This OTP is valid for 10 minutes.`,
    };

    await transport.sendMail(mailOptions);
    res.status(200).json("OTP sent successfully.");
  } catch (error) {
    console.log(error);
    res.status(500).json("Internal Server Error");
  }
};

export const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const user = await User.findOne({ email });

    if (!user) return res.status(400).json("User not found");
    if (!user.resetOTP || user.resetOTPExpire < Date.now())
      return res.status(400).json("OTP expired.");
    if (user.resetOTP != parseInt(otp))
      return res.status(400).json("Invalid OTP");

    user.resetOTP = undefined;
    user.resetOTPExpire = undefined;
    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "15m",
    });

    res.status(200).json({ message: "OTP verified successfully.", token });
  } catch (error) {
    console.error(error);
    res.status(500).json("Internal Server Error");
  }
};

export const reset_password = async (req, res) => {
  try {
    const { token, newPassword } = req.body;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) return res.status(400).json("User not found");

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    res.status(200).json("Password successfully updated.");
  } catch (error) {
    console.error(error);
    res.status(500).json("Internal Server Error");
  }
};

export const getUserData = async(req, res)=>{
  try {
    const id = req.params.id
    const user = await User.findById(id).select("-password")
    if(!user){
      return res.status(400).json("Not found")
    }
    res.status(200).json(user)
  } catch (error) {
    console.log(error)
  }
}

export const updateProfile = async (req, res) => {
  try {
    const id = req.params.id;
    const { username } = req.body;
    const profilePic = req.file;
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: "User not found" });

    let profileUrl = user.photoUrl; // Default to existing image

    if (profilePic) {
      if (user.photoUrl) {
        const publicId = user.photoUrl.split("/").pop().split(".")[0];
        await deleteMediaFromCloudinary(publicId);
      }
      const cloudRes = await uploadMedia(profilePic.path);
      profileUrl = cloudRes.secure_url;
    }

    const updateData = {};
    if (username) updateData.username = username;
    if (profileUrl) updateData.photoUrl = profileUrl;

    const newData = await User.findByIdAndUpdate(id, updateData, {
      new: true,
    }).select("-password");
    res.status(200).json(newData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};