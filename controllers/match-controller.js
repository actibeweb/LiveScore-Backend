const Match = require("../models/match");
const cloudinary = require("cloudinary");

exports.createMatch = async (req, res, next) => {
  let homeLink = {};

  try {
    const result = await cloudinary.v2.uploader.upload(req.body.homeLogo, {
      folder: "logo",
      fetch_format: "auto",
    });

    homeLink = {
      public_id: result.public_id,
      url: result.secure_url,
    };
  } catch (err) {
    console.log(err);
    return res.status(200).json({ err: "Error in uploading image" });
  }

  // console.log(homeLink);
  req.body.homeLogo = homeLink;
  let awayLink = {};
  try {
    const result = await cloudinary.v2.uploader.upload(req.body.awayLogo, {
      folder: "logo",
      fetch_format: "auto",
    });

    awayLink = {
      public_id: result.public_id,
      url: result.secure_url,
    };
  } catch (err) {
    console.log(err);
    return res.status(200).json({ err: "Error in uploading image" });
  }
  // console.log(awayLink);
  req.body.awayLogo = awayLink;
  let match;
  try {
    match = await Match.create(req.body);
  } catch (err) {
    console.log(err);
    return res.status(200).json({ err: "Error creating match" });
  }
  return res.status(200).json(match);
};

exports.getAllMatches = async (req, res, next) => {
  let matches = [];
  try {
    matches = await Match.find().sort({ _id: -1 });
  } catch (err) {
    console.log(err);
    return res.status(200).json({ err: "Error getting matches" });
  }
  return res.status(200).json(matches);
};

exports.getMatchById = async (req, res, next) => {
  const matchId = req.params.id;
  let match;
  try {
    match = await Match.findById(matchId);
  } catch (err) {
    console.log(err);
    return res.status(200).json({ err: "Fetching Match Failed" });
  }
  if (!match) {
    return res.status(200).json({ err: "Could not find match for this id" });
  }
  res.status(200).json(match);
};

exports.updateMatch = async (req, res, next) => {
  let homeLink = {};

  try {
    const result = await cloudinary.v2.uploader.upload(req.body.homeLogo, {
      folder: "logo",
      fetch_format: "auto",
    });

    homeLink = {
      public_id: result.public_id,
      url: result.secure_url,
    };
  } catch (err) {
    console.log(err);
    return res.status(200).json({ err: "Error in uploading image" });
  }

  // console.log(homeLink);
  req.body.homeLogo = homeLink;
  let awayLink = {};
  try {
    const result = await cloudinary.v2.uploader.upload(req.body.awayLogo, {
      folder: "logo",
      fetch_format: "auto",
    });

    awayLink = {
      public_id: result.public_id,
      url: result.secure_url,
    };
  } catch (err) {
    console.log(err);
    return res.status(200).json({ err: "Error in uploading image" });
  }
  // console.log(awayLink);
  req.body.awayLogo = awayLink;
  const matchId = req.params.id;
  let match;
  try {
    match = await Match.findById(matchId);
  } catch (err) {
    console.log(err);
    return res
      .status(200)
      .json({ err: "Something went wrong in getting Match" });
  }
  if (!match) {
    return res.status(200).json({ err: "Could not find match for this id" });
  }
  try {
    match = await Match.findByIdAndUpdate(matchId, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });
  } catch (err) {
    console.log(err);
    return res.status(200).json({ err: "Error in Updating Match" });
  }
  res.status(200).json(match);
};

exports.deleteMatch = async (req, res, next) => {
  const matchId = req.params.id;
  let match;
  try {
    match = await Match.findById(matchId);
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ err: "Something went wrong in delete Match" });
  }
  if (!match) {
    return res
      .status(500)
      .json({ message: "Could not find match for this id" });
  }
  try {
    await match.remove();
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Match could not be deleted" });
  }
  res.status(200).json({ message: "Match deleted successfully" });
};

exports.getMatchesByFilter = async (req, res, next) => {
  let matches = [];
  console.log(req.params.category);
  console.log(req.body);
  try {
    matches = await Match.find({
      category: req.params.category,
      date: req.body.date,
    });
  } catch (err) {
    console.log(err);
    return res.status(200).json({ err: "Error getting matches" });
  }
  return res.status(200).json(matches);
};
