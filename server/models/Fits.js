const mongoose = require("mongoose");

const fitsSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
  tags: {
    type: [String], // Assuming multiple tags can be associated, hence an array of strings
    default: [],
  },
  imageUrl: {
    type: String,
    required: true,
  },
  userOwner: {
    //id of the user who created the recipe
    type: mongoose.Types.ObjectId,
    // type: String,
    ref: "User",
    required: true,
  },
});

const fitsModel = mongoose.model("outfits", fitsSchema);

module.exports = fitsModel;
