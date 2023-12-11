const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const outfitModel = require("../models/Fits.js");
const UserModel = require("../models/userSchema");
const verifyToken = require("./user.js");

//getting all the outfits to show up on the main page
router.get("/", async (req, res) => {
  try {
    const response = await outfitModel.find({});
    res.json(response);
  } catch (err) {
    res.json(err);
  }
});

router.post("/", async (req, res) => {
  const outfitPost = new outfitModel(req.body);

  try {
    const response = await outfitPost.save();
    res.json(response);
  } catch (err) {
    res.json(err);
  }
});

router.put("/", async (req, res) => {
  try {
    const outfitPost = await outfitModel.findById(req.body.outfitsID);
    // const user = await UserModel.findById(req.body.userID);
    const user = await UserModel.findById(req.body.token);

    user.savedPosts.push(outfitPost);

    await user.save();

    res.json({ savedPosts: user.savedPosts });
  } catch (err) {
    res.json(err);
  }
});

//getting a list of all the posts ids
router.get("/savedPosts/ids", async (req, res) => {
  try {
    //get the user id to send to body
    // const user = await UserModel.findById(req.body.userID);
    const user = await UserModel.findById(req.body.token);
    res.json({ savedPosts: user?.savedPosts });
  } catch (err) {
    res.json(err);
  }
});

router.get("/savedPosts", async (req, res) => {
  try {
    //get the user id to send to body
    // const user = await UserModel.findById(req.body.userID);
    const user = await UserModel.findById(req.body.token);
    const savedPosts = await outfitModel.find({
      _id: { $in: user.savedPosts },
    });
    res.json({ savedPosts });
  } catch (err) {
    res.json(err);
  }
});
module.exports = router;
exports.outfitsRouter = router;
