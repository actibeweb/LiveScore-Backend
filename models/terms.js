const mongoose = require("mongoose");


const termsSchema = new mongoose.Schema({
    content:{
        type:String,
        required:true,
    }
})

module.exports = mongoose.model("Terms", termsSchema);