const express = require("express");
const passport = require("passport");
const router = express.Router();

// @desc    Auth with Google
// @route   GET /
router.get("/google", passport.authenticate("google", { scope: ["profile"] }));

// @desc    Google Auth Callback
// @route   GET /auth/google/callback
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    res.redirect("/dashboard");
  },
);

// @desc    Logout
// @route   /auth/logout
router.get("/logout", (req, res, next) => {
  req.logout(function (error) {
    if (error) return next(err);
    res.redirect("/");
  });
});

module.exports = router;
