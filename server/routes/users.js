const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt"); //hash password=
const User = require("../models/userSchema");
const router = express.Router();
const SECRET_KEY = "joycesecret";
//USER ROUTES

router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    //checking if user exists
    const user = await User.findOne({ email });
    if (user) {
      return res.json({ message: "user already exists" });
    }
    //creating the user
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: "user created successfully" });
  } catch (error) {
    res.status(500).json({ error: "error signing up" });
  }
});

//get registered users
router.get("/register", async (req, res) => {
  try {
    const users = await User.find();
    res.status(201).json(users);
  } catch (error) {
    res.status(500).json({ error: "unable to get users" });
  }
});

//get login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "invalid email" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "invalid password" });
    }
    const token = jwt.sign({ userId: user._id }, SECRET_KEY, {
      expiresIn: "1hr",
    });
    // res.json({ token, userID: user._id });
    res.json({ message: "Login successful" });
  } catch (error) {
    res.status(500).json({ error: "error signing in" });
  }
});

module.exports = router;
