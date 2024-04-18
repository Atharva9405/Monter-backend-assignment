const bcrypt = require("bcrypt");
const { sendOTPEmail, generateOTP } = require("../utils/sendOtpEmail");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const otp = generateOTP();
    const newUser = new User({ email, password: hashedPassword, otp });
    await newUser.save();
    await sendOTPEmail(email, otp);
    console.log(otp);
    res
      .status(201)
      .json({ message: "User registered. Please verify your account." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const verifyUser = async (req, res) => {
  const { email, otp, location, age, work } = req.body;
  try {
    const user = await User.findOne({ email, otp });
    if (!user) {
      return res.status(400).json({ error: "Invalid OTP" });
    }
    user.isVerified = true;
    user.location = location;
    user.age = age;
    user.work = work;
    await user.save();
    res.status(200).json({ message: "Account verified" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Invalid email or password" });
    }
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(400).json({ error: "Invalid email or password" });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({
      message: "User Logged in successfully",
      token: token,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getUserDetails = async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json({
      email: user.email,
      isVerified: user.isVerified,
      location: user.location,
      age: user.age,
      work: user.work,
    });
  } catch (err) {
    res.status(401).json({ error: "Invalid token" });
  }
};

module.exports = { registerUser, verifyUser, loginUser, getUserDetails };
