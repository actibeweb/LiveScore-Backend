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

  const createUser = new User({
    email,
    password,
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
      .status(200)
      .json({ err: "Login failed, Please try again later." });
  }
  if (!existingUser) {
    return res.status(201).json({ err: "Admin not found." });
  }


  if (password.trim()!==existingUser.password.trim()) {
    console.log(password.trim(),existingUser.password.trim());
    return res.status(201).json({ err: "Invalid Password." });
  }
  let token;
  try {
    token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET, {
      expiresIn: "365d",
    });
  } catch (err) {
    console.log(err);
    return res.status(200).json({ err: "JWT error." });
  }
  res.status(201).json({ existingUser, token });
};
exports.getDetails = async (req, res, next) => {
  let details= {};
  try {
    details = await User.findOne();
  } catch (err) {
    console.log(err);
    return res.status(200).json({ err: "Fetching terms failed" });
  }
  res.status(200).json(details);
}
exports.updateDetails = async (req, res, next) => {
  let existing;
  try {
    existing = await User.find();
  } catch (err) {
    console.log(err);
    return res.status(200).json({ err: "Fetching User failed" });
  }
  if (existing.length > 0) {
    try {
    existing = await User.findByIdAndUpdate(existing[0]._id, req.body);
    } catch (err) {
    console.log(err);
    return res.status(200).json({ err: "Updating credentials failed" });
    }
  } else {
    try {
    existing = await User.create(req.body);
    } catch (err) {
    console.log(err);
    return res.status(200).json({ err: "Updating credentials failed" });
    }
  }
  res.status(200).json({ msg: "Credentials updated successfully" });
}