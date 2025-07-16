const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const User = require("../models/user");

// GET register
router.get("/register", (req, res) => {
  res.render("register");
});

// POST register
router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  const existingUser = await User.findOne({ email });
  if (existingUser) return res.send("User already exists!");
  const user = new User({ username, email, password });
  await user.save();
  req.session.userId = user._id;
  res.redirect("/vlog");
});

// GET login
router.get("/login", (req, res) => {
  res.render("login");
});

// POST login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.send("No user found");

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.send("Wrong password!");

  req.session.userId = user._id;
  res.redirect("/vlog");
});

// Logout
router.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
});
router.get("/", (req, res) => {
  res.render("auth");
});

module.exports = router;
