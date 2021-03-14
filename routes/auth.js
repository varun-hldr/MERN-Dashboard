const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// User Model
const User = require("../models/User");

// Validation
const { registerValidation, loginValidation } = require("../validation");

// Register User
router.post("/register", async (req, res) => {
  // Validate Data
  const { error } = registerValidation(req.body);
  if (error) return res.json(error.details[0].message);

  //   Checking Duplicate Email
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) return res.json("Email already exist");

  //   Hashing password
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashPassword,
    role: req.body.role ? req.body.role : "user",
    isActive: req.body.isActive ? req.body.isActive : true,
  });

  try {
    const savedUser = await user.save();
    res.send({ id: savedUser._id });
  } catch (error) {
    res.send(err);
  }
});

// Login User
router.post("/login", async (req, res) => {
  // Validate Data
  const { error } = loginValidation(req.body);
  if (error) return res.json(error.details[0].message);

  //   Checking Duplicate Email
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.json("Email not found");

  //   Checking Password
  const validPassword = bcrypt.compareSync(req.body.password, user.password);
  if (!validPassword) return res.json("Invalid password");

  //   Create and assign token
  const TOKEN = jwt.sign({ user }, process.env.TOKEN_SECRET);
  res.header("auth-token", TOKEN).json(TOKEN);
});

module.exports = router;
