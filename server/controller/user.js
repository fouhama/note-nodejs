import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import validatior from "validator";
import User from "../models/User.js";

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET_KEY, { expiresIn: "3d" });
};
export const register = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }
  if (!validatior.isEmail(email)) {
    return res.status(400).json({ message: "Invalid email" });
  }
  if (!validatior.isStrongPassword(password)) {
    return res.status(400).json({ message: "Password must be Strong" });
  }

  try {
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({ message: "Email already exist" });
    }

    const slat = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, slat);
    const savedUser = await User({
      email,
      password: hashedPassword,
    }).save();
    const token = generateToken(savedUser._id);
    res.status(201).json({ success: true, token });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Email and password are required",
    });
  }
  if (!validatior.isEmail(email)) {
    return res.status(400).json({
      success: false,
      message: "Invalid email",
    });
  }
  try {
    const emailExist = await User.findOne({ email });
    if (!emailExist) {
      return res.status(400).json({
        success: false,
        message: "invalide  email or password",
      });
    }
    const checkPassword = await bcrypt.compare(password, emailExist.password);
    if (!checkPassword) {
      return res.status(400).json({
        success: false,
        message: "invalide  email or password",
      });
    }

    const token = generateToken(emailExist._id);
    res.status(200).json({ success: true, token });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
