const express = require("express");
const mongoose = require("mongoose");
const outfitModel = require("../models/Fits.js");
const UserModel = require("../models/userSchema");

const router = express.Router();
// const verifyToken = require("./users").verifyToken;

//getting all the outfits to show up on the main page
// router.get("/", async (req, res) => {
//   try {
//     //making an api request
//     const response = await outfitModel.find({});
//     res.json(response);
//   } catch (err) {
//     res.json(err);
//   }
// });

router.get("/", async (req, res) => {
  try {
    const userId = req.params.userId; // Fetch the user ID from the token or authentication mechanism
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Fetch posts for the logged-in user
    const userPosts = await outfitModel.find({ userOwner: userId });

    res.json({ userPosts });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

//creating a new outfit post
router.post("/", async (req, res) => {
  console.log("Received Data:", req.body);

  //creating a outfitPost from all the req.body like image, description, date tags
  const outfitPost = new outfitModel(req.body);

  try {
    const response = await outfitPost.save();
    res.json(response);
  } catch (err) {
    res.json(err);
  }
});

//get all the saved posts

router.get("/posts/:userId", async (req, res) => {
  try {
    //get the user id to send to body
    const user = await UserModel.findById(req.params.userId);
    console.log("only getting the user _id field: ", user._id);

    const userId = user._id;

    const posts = await outfitModel.find({
      _id: { $in: user.posts },
    });
    console.log("specific user posts: ", user.posts);
    res.json({ userId, posts });
  } catch (err) {
    res.json(err);
  }
});

// Backend route to add a post ID to a user's posts array
router.put("/:userId/addpost", async (req, res) => {
  try {
    const { postId } = req.body;
    const user = await UserModel.findByIdAndUpdate(
      req.params.userId,
      { $push: { posts: postId } },
      { new: true }
    );
    res.json(user);
  } catch (err) {
    res.json(err);
  }
});

// //save a outfit post -- fails in postman
// //this is for editing a post
// router.put("/", async (req, res) => {
//   console.log(req.body);
//   //getting the post ID
//   const outfitPost = await outfitModel.findById(req.body.postsID);
//   console.log(outfitPost);
//   //getting the user ID
//   const user = await UserModel.findById(req.body.userID);
//   // const user = await UserModel.findById(req.body.token);
//   console.log(user);
//   try {
//     user.posts.push(outfitPost);
//     //save user to collection
//     await user.save();
//     res.json({ posts: user.posts });
//   } catch (err) {
//     res.json(err);
//   }
// });

// //getting a list of all the posts ids
// router.get("/posts/ids/:userId", verifyToken, async (req, res) => {
//   try {
//     //get the user id to send to body
//     const user = await UserModel.findById(req.params.userId);
//     // const user = await UserModel.findById(req.params.token);
//     res.json({ posts: user?.posts });
//   } catch (err) {
//     res.json(err);
//   }
// });

module.exports = router;
// exports.outfitsRouter = router;
