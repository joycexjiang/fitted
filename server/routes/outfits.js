const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const outfitModel = require("../models/Fits.js");

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
  {
    userId, outfitId;
  }
  try {
    const response = await outfitPost.save();
    res.json(response);
  } catch (err) {
    res.json(err);
  }
});

module.exports = router;
exports.outfitsRouter = router;
