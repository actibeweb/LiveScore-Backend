const mongoose = require("mongoose");

const matchSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
    enum: [
      "soccer",
      "basketball",
      "tennis",
      "cricket",
      "hockey",
      "baseball",
      "rugby",
      "motosports",
      "mmaFight",
    ],
  },
  home: {
    type: String,
    required: true,
  },
  homeLogo: {
    public_id: {
      type: String,
      // required: true,
    },
    url: {
      type: String,
      // required: true,
    },
  },
  away: {
    type: String,
    required: true,
  },
  awayLogo: {
    public_id: {
      type: String,
      // required: true,
    },
    url: {
      type: String,
      // required: true,
    },
  },
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  competition: {
    type: String,
    required: true,
  },
  round: {
    type: String,
  },
  season: {
    type: String,
    required: true,
  },
  venue: {
    type: String,
    required: true,
  },
  attendance: {
    type: Number,
    required: true,
  },
  referee: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model("Match", matchSchema);
