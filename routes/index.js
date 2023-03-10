const express = require("express");
const router = express.Router();
const { ensureAuth, ensureGuest } = require("../middleware/auth");

const Accomplishment = require("../models/Accomplishment");

// @desc    Login/Landing Page
// @route   GET /
router.get("/", ensureGuest, (req, res) => {
  res.render("login", {
    layout: "login",
  });
});

// @desc    Dashboard Page
// @route   GET /dashboard
router.get("/dashboard", ensureAuth, async (req, res) => {
  try {
    const accomplishments = await Accomplishment.find({
      user: req.user.id,
    }).lean();
    res.render("dashboard", {
      name: req.user.firstName,
      accomplishments,
    });
  } catch (error) {
    console.error(error);
    res.render("error/500");
  }
});

module.exports = router;
