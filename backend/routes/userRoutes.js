const express = require("express");
const mongoose = require("mongoose");
const {
  loginUser,
  registerUser,
  updateUser,
} = require("../controllers/userControllers");
const router = express.Router();
const User = require("../models/User");
router.post("/login", loginUser);
router.post("/register", registerUser);
router.put("/update/:id", updateUser);
module.exports = router;
