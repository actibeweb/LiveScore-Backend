const mongoose = require("mongoose");

const aboutSchema = new mongoose.Schema({
  headingMain: {
    type: String,
    required: true,
  },
  headingOne: {
    type: String,
    required: true,
  },
  headingTwo: {
    type: String,
    required: true,
  },
  contentOne: {
    type: String,
    required: true,
  },
  contentTwo: {
    type: String,
    required: true,
  },
  image: {
    public_id: {
      type: String,
      // required: true,
    },
    url: {
      type: String,
      // required: true,
    },
  },
});

module.exports = mongoose.model("About", aboutSchema);