const Affiliate = require("../models/affiliate");
const cloudinary = require("cloudinary");
exports.updateAffiliate =async(req,res)=>{
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
        existing = await Affiliate.find();
    } catch (err) {
        console.log(err);
        return res.status(200).json({err:"Error in finding affiliates"})
    }

    if (existing.length > 0) {
        try {
          await Affiliate.findOneAndUpdate(existing[0]._id, req.body);
        } catch (err) {
          console.log(err);
          return res.status(200).json({ err: "Error in updating Affiliate" });
        }
      } else {
        try {
          await Affiliate.create(req.body);
        } catch (err) {
          console.log(err);
          return res.status(200).json({ err: "Error in creating Affiliate" });
        }
      }
        res.status(200).json({ message: "Affiliate updated successfully" });
}


exports.getAffiliate = async (req, res) => {
    let affiliate;
    try {
        affiliate = await Affiliate.findOne();
    } catch (err) {
        console.log(err);
        return res.status(200).json({ err: "Error in getting affiliate" });
    }
    res.status(200).json(affiliate);
}