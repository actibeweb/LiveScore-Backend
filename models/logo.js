const mongoose = require("mongoose");

const logoSchema = new mongoose.Schema({
    public_id: {
        type: String,
        // required: true,
      },
      url: {
        type: String,
        // required: true,
      },
})

module.exports = mongoose.model("Logo", logoSchema);