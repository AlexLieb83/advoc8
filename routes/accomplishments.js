const express = require("express");
const router = express.Router();
const { ensureAuth } = require("../middleware/auth");
const { findById } = require("../models/Accomplishment");
const Accomplishment = require("../models/Accomplishment");

// @desc    Show Add Page
// @route   GET /accomplishments/add
router.get("/add", ensureAuth, (req, res) => {
  res.render("accomplishments/add");
});

// @desc    Process Add Form
// @route   POST /accomplishments
router.post("/", ensureAuth, async (req, res) => {
  try {
    req.body.user = req.user.id;
    await Accomplishment.create(req.body);
    res.redirect("/dashboard");
  } catch (error) {
    console.error(error);
    res.render("error/500");
  }
});

// @desc    Show All Accomplishments Page
// @route   GET /accomplishments
router.get("/", ensureAuth, async (req, res) => {
  try {
    const accomplishments = await Accomplishment.find({})
      .populate("user")
      .sort({ createdAt: "desc" })
      .lean();

    res.render("accomplishments/index", {
      accomplishments,
    });
  } catch (error) {
    console.error(error);
    res.render("error/500");
  }
});

// @desc    Show Single Accomplishment
// @route   GET /accomplishments/:id
router.get("/:id", ensureAuth, async (req, res) => {
  try {
    let accomplishment = await Accomplishment.findById(req.params.id)
      .populate("user")
      .lean();

    if (!accomplishment) {
      return res.render("error/404");
    }

    res.render("accomplishments/show", {
      accomplishment,
    });
  } catch (error) {
    console.error(error);
    res.render("error/404");
  }
});

//@desc  Show Edit Page
//@Route GET /accomplishments/edit/:id
router.get("/edit/:id", ensureAuth, async (req, res) => {
  try {
    const accomplishment = await Accomplishment.findById(req.params.id)
      .populate("user")
      .lean();

    if (!accomplishment) {
      return res.render("error/404");
    } else {
      res.render("accomplishments/edit", {
        accomplishment,
      });
    }
  } catch (err) {
    console.error(err);
    res.render("error/500");
  }
});

// @desc    Update Accomplishment
// @route   PUT /accomplishments/:id
router.put("/:id", ensureAuth, async (req, res) => {
  try {
    let accomplishment = await Accomplishment.findById(req.params.id).lean();

    if (!accomplishment) {
      return res.render("error/404");
    }

    if (accomplishment.user != req.user.id) {
      res.redirect("/accomplishments");
    } else {
      accomplishment = await Accomplishment.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        {
          new: true,
          runValidators: true,
        },
      );
      res.redirect("/dashboard");
    }
  } catch (error) {
    console.error(error);
    res.render("error/500");
  }
});

// @desc    Delete Accomplishment
// @route   DELETE /accomplishments/:id
router.delete("/:id", ensureAuth, async (req, res) => {
  try {
    await Accomplishment.remove({ _id: req.params.id });
    res.redirect("/dashboard");
  } catch (error) {
    console.error(error);
    return res.render("error/500");
  }
});

// @desc    User Accomplishments
// @route   GET /accomplishments/user/:userId
router.get("/user/:userId", ensureAuth, async (req, res) => {
  try {
    const accomplishments = await Accomplishment.find({
      user: req.params.userId,
    })
      .populate("user")
      .lean();

    res.render("accomplishments/index", {
      accomplishments,
    });
  } catch (error) {
    console.error(error);
    res.render("error/500");
  }
});

module.exports = router;
