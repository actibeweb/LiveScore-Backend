const AdSense = require("../models/adsense");
const cloudinary = require("cloudinary");
exports.updateAdSense =async(req,res)=>{
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
  
    let existing=[];

    try {
        existing = await AdSense.find();
    } catch (err) {
        console.log(err);
        return res.status(200).json({err:"Error in finding affiliates"})
    }

    if (existing.length > 0) {
        try {
          await AdSense.findOneAndUpdate(existing[0]._id, req.body);
        } catch (err) {
          console.log(err);
          return res.status(200).json({ err: "Error in updating Affiliate" });
        }
      } else {
        try {
          await AdSense.create(req.body);
        } catch (err) {
          console.log(err);
          return res.status(200).json({ err: "Error in creating Affiliate" });
        }
      }
        res.status(200).json({ message: "Affiliate updated successfully" });
}


exports.getAdSense = async (req, res) => {
    let affiliate;
    try {
        affiliate = await AdSense.findOne();
    } catch (err) {
        console.log(err);
        return res.status(200).json({ err: "Error in getting affiliate" });
    }
    res.status(200).json(affiliate);
}