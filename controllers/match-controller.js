const Match = require("../models/match");

exports.createMatch = async (req, res, next) => {
  let match;
  try {
    match = await Match.create(req.body);
  } catch (err) {
    console.log(err);
    return res.status(200).json({ err: "Error creating match" });
  }
  return res.status(200).json(match);
};
