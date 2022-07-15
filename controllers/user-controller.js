const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res, next) => {
  const { email, password } = req.body;
  //   console.log(email,password);
  let existingUser;
  try {
    existingUser = await User.findOne({ email });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: "Signing up failed,Please Try again later" });
  }
  if (existingUser) {
    return res
      .status(422)
      .json({ message: "User already exists. Please try to login" });
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const createUser = new User({
    email,
    password: hashedPassword,
  });
  try {
    await createUser.save();
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: "Signing up falied, Please try again later" });
  }
  res.status(201).json({ success: true, userId: createUser._id });
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  let existingUser;
  try {
    existingUser = await User.findOne({ email });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ err: "Login failed, Please try again later." });
  }
  if (!existingUser) {
    return res.status(401).json({ err: "Admin not found." });
  }

  const isMatch = await bcrypt.compare(password, existingUser.password);
  if (!isMatch) {
    return res.status(401).json({ err: "Invalid Password." });
  }
  let token;
  try {
    token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET, {
      expiresIn: "365d",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ err: "JWT error." });
  }
  res.status(201).json({ existingUser, token });
};
