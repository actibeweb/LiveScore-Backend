const Terms = require("../models/terms");


exports.updateTerms = async (req, res, next) => {
    let existing;
    try {
        existing = await Terms.find();
    } catch (err) {
        console.log(err);
        return res.status(200).json({ err: "Fetching terms failed" });
    }
    if (existing.length > 0) {
        try {
        existing = await Terms.findByIdAndUpdate(existing[0]._id, req.body);
        } catch (err) {
        console.log(err);
        return res.status(200).json({ err: "Updating terms failed" });
        }
    } else {
        try {
        existing = await Terms.create(req.body);
        } catch (err) {
        console.log(err);
        return res.status(200).json({ err: "Updating terms failed" });
        }
    }
    res.status(200).json({ msg: "Terms updated successfully" });
}

exports.getTerms = async (req, res, next) => {
    let terms;
    try {
        terms = await Terms.findOne();
    } catch (err) {
        console.log(err);
        return res.status(200).json({ err: "Fetching terms failed" });
    }
    res.status(200).json(terms);
}