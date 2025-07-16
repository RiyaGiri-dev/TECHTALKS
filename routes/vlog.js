const express = require("express");
const router = express.Router();
const Vlog = require("../models/vlog");

function requireLogin(req, res, next) {
  if (!req.session.userId) {
    return res.redirect("/auth/login"); // adjust if no auth
  }
  next();
}

// List all vlogs
router.get("/", async (req, res) => {
  const vlogs = await Vlog.find().sort({ createdAt: -1 });
  res.render("vlog/index", { vlogs });
});

// New vlog form
router.get("/new", requireLogin, (req, res) => {
  res.render("vlog/new");
});

// Create vlog
router.post("/new", requireLogin, async (req, res) => {
  const { title, content } = req.body;
  await Vlog.create({
    title,
    content,
    author: req.session.username
  });
  res.redirect("/vlog");
});

// Delete vlog
router.post("/:id/delete", requireLogin, async (req, res) => {
  const vlog = await Vlog.findById(req.params.id);
  if (vlog && vlog.author === req.session.username) {
    await Vlog.findByIdAndDelete(req.params.id);
    res.redirect("/vlog");
  } else {
    res.status(403).send("Unauthorized");
  }
});

module.exports = router;
