const express = require("express");
const mongoose = require("mongoose");
const outfitModel = require("../models/Fits.js");
const UserModel = require("../models/userSchema");

const router = express.Router();

const verifyToken = require("./users").verifyToken;

//getting all the outfits to show up on the main page
router.get("/", async (req, res) => {
  try {
    //making an api request
    const response = await outfitModel.find({});
    res.json(response);
  } catch (err) {
    res.json(err);
  }
});

//creating a new outfit post
router.post("/", verifyToken, async (req, res) => {
  //creating a outfitPost from all the req.body like image, description, date tags
  const outfitPost = new outfitModel(req.body);

  try {
    const response = await outfitPost.save();
    res.json(response);
  } catch (err) {
    res.json(err);
  }
});

//save a outfit post -- fails in postman
router.put("/", verifyToken, async (req, res) => {
  console.log(req.body);
  //getting the post ID
  const outfitPost = await outfitModel.findById(req.body.postsID);
  console.log(outfitPost);
  //getting the user ID
  const user = await UserModel.findById(req.body.userID);
  // const user = await UserModel.findById(req.body.token);
  console.log(user);
  try {
    user.posts.push(outfitPost);
    //save user to collection
    await user.save();
    res.json({ posts: user.posts });
  } catch (err) {
    res.json(err);
  }
});

//getting a list of all the posts ids
router.get("/posts/ids/:userId", verifyToken, async (req, res) => {
  try {
    //get the user id to send to body
    const user = await UserModel.findById(req.params.userId);
    // const user = await UserModel.findById(req.params.token);
    res.json({ posts: user?.posts });
  } catch (err) {
    res.json(err);
  }
});

//get all the saved posts

router.get("/posts/:userId", verifyToken, async (req, res) => {
  try {
    //get the user id to send to body
    const user = await UserModel.findById(req.params.userId);
    // const user = await UserModel.findById(req.params.token);
    const posts = await outfitModel.find({
      _id: { $in: user.posts },
    });
    res.json({ posts });
  } catch (err) {
    res.json(err);
  }
});

module.exports = router;
// exports.outfitsRouter = router;
