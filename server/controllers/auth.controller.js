import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const register = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({ message: "Email already exists!" });
    }
    const salt = await bcrypt.genSalt(10);
    const hash_password = await bcrypt.hash(password, salt);
    const user = await User.create({ username, email, password: hash_password });
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
    const isMatched = await bcrypt.compare(password, userExist.password)
    if(!isMatched){
        return res.status(400).json("Invalid credentials.")
    }
    res.status(200).json({ userExist, token: await userExist.generateToken() });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
};