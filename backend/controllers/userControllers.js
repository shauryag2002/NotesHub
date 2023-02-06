const User = require("../models/User");
const asyncHandler = require("express-async-handler");
const { generateToken } = require("../utils/generateToken");
const loginUser = asyncHandler(async (req, res) => {
  const { password, email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    res
      .status(404)
      .json({ error: true, message: "Incorrect email or password" });
  }
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      pic: user.pic,
      token: generateToken(user._id),
    });
  }
});
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, pic, password } = req.body;
  const user = await User.create({ name, email, pic, password });
  if (!user) {
    res.status(404).json({ error: true, message: "User not created" });
  }
  res.status(200).json({ error: false, user });
});
const updateUser = asyncHandler(async (req, res) => {
  const { name, email, pic, password } = req.body;
  const user = await User.findById(req.params.id);
  user.name = name;
  user.email = email;
  user.pic = pic;
  user.password = password;
  const update = await user.save();
  res.status(200).json({ user });
});
exports.updateUser = updateUser;
exports.loginUser = loginUser;
exports.registerUser = registerUser;
