const About = require("../models/about");
const cloudinary = require("cloudinary");
exports.updateAbout = async (req, res) => {
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
  req.body.image = imageLink;

  let existing = [];
  try {
    existing = await About.find();
  } catch (err) {
    console.log(err);
    return res.status(200).json({ err: "Error in getting about" });
  }
  if (existing.length > 0) {
    try {
      await About.findOneAndUpdate(existing[0]._id, req.body);
    } catch (err) {
      console.log(err);
      return res.status(200).json({ err: "Error in updating about" });
    }
  } else {
    try {
      await About.create(req.body);
    } catch (err) {
      console.log(err);
      return res.status(200).json({ err: "Error in creating about" });
    }
  }
    res.status(200).json({ message: "About updated successfully" });
};

exports.getAbout = async (req, res) => {
    let about;
    try {
        about = await About.findOne();
    } catch (err) {
        console.log(err);
        return res.status(200).json({ err: "Error in getting about" });
    }
    res.status(200).json(about);
}