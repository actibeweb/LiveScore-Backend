const Logo = require("../models/logo");
const cloudinary = require("cloudinary");

exports.updateLogo = async (req, res) => {
  let imageLink = {};
  try {
    const result = await cloudinary.v2.uploader.upload(req.body.image, {
      folder: "logo",
      fetch_format: "auto",
    });

    imageLink = {
      public_id: result.public_id,
      url: result.secure_url,
    };
  } catch (err) {
    console.log(err);
    return res.status(200).json({ err: "Error in uploading image" });
  }
  console.log(imageLink);
  let logos = [];
  try {
    logos = await Logo.find();
  } catch (err) {
    console.log(err);
  }
  
  let logo;
  try {
    if (logos.length > 0) {
      logo = await Logo.findOneAndUpdate(logos[0]._id, imageLink);
    } else {
      logo = await Logo.create(imageLink);
    }
  } catch (err) {
    console.log(err);
    return res.status(200).json({ err: "Error in updating logo" });
  }

  res.status(200).json(logo);
};

exports.getLogo = async (req, res) => {
  let logo;
  try {
    logo = await Logo.findOne();
  } catch (err) {
    console.log(err);
    return res.status(200).json({ err: "Error in getting logo" });
  }
  res.status(200).json(logo);
};
