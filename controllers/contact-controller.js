const Contact = require("../models/contact");
const ContactPage = require("../models/contactPage");
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

exports.updateContactPage = async (req, res, next) => {
  let existing;
  try {
    existing = await ContactPage.find();
  } catch (err) {
    console.log(err);
    return res.status(200).json({ err: "Fetching contact page failed" });
  }
  if (existing.length > 0) {
    try {
      existing = await ContactPage.findByIdAndUpdate(existing[0]._id, req.body);
    } catch (err) {
      console.log(err);
      return res.status(200).json({ err: "Updating contact page failed" });
    }
  } else {
    try {
      existing = await ContactPage.create(req.body);
    } catch (err) {
      console.log(err);
      return res.status(200).json({ err: "Updating contact page failed" });
    }
  }
  res.status(200).json({ msg: "Contact page updated successfully" });
};

exports.getContactPage = async (req, res, next) => {
  let contactPage;
  try {
    contactPage = await ContactPage.findOne();
  } catch (err) {
    console.log(err);
    return res.status(200).json({ err: "Fetching contact page failed" });
  }
  res.status(200).json(contactPage);
};
