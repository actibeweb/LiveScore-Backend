const Contact = require("../models/contact");

exports.createContact = async (req, res, next) => {
  let contact;

  try {
    contact = await Contact.create(req.body);
  } catch (err) {
    console.log(err);
    return res.status(200).json({ err: "Saving details to database failed" });
  }
  res.status(201).json(contact);
};

exports.getAllContact = async (req, res, next) => {
  let contacts;

  try {
    contacts = await Contact.find();
  } catch (err) {
    console.log(err);
    return res.status(200).json({ err: "Fetching contacts failed" });
  }
  res.status(200).json(contacts);
};
