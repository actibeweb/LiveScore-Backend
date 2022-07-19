const mongoose = require("mongoose");

const affiliateSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
      },
      link: {
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
})
module.exports = mongoose.model("Affiliate", affiliateSchema);