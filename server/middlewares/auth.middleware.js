import jwt from 'jsonwebtoken'
import {User} from '../models/user.model.js'

export const auth = async(req, res, next)=>{
    const token = req.header("Authorization")
    try {
        const updatedToken = token.replace("Bearer","").trim()
        const isVerified = jwt.verify(updatedToken, process.env.JWT_SECRET);
        const userData = await User.findOne({email: isVerified.email})
        if (userData === null) {
          return res.status(409).json({ msg: `User not found` });
        }
        req.user = userData;
        req.token = isVerified;
        next();
    } catch (error) {
        console.log(error)
    }
}

export const authTeacher = async (req, res, next) => {
  try {
    if (req.user.role !== "teacher") {
      return res.status(409).json({ msg: `Access denied.` });
    }
    next();
  } catch (error) {
    console.log(error);
  }
};