const Category = require("../models/categories");

exports.updateCategory = async (req, res) => {
  const { categories } = req.body;
  let existingCategories = [];
  try {
    existingCategories = await Category.find();
  } catch (err) {
    console.log(err);
    return res.status(200).json({ err: "Error in getting categories" });
  }
  if (existingCategories.length > 0) {
    try {
      await Category.findOneAndUpdate(existingCategories[0]._id, {
        categories,
      });
    } catch (err) {
      console.log(err);
      return res.status(200).json({ err: "Error in updating categories" });
    }
  } else {
    try {
      await Category.create({ categories });
    } catch (err) {
      console.log(err);
      return res.status(200).json({ err: "Error in creating categories" });
    }
  }
  res.status(200).json({ message: "Categories updated successfully" });
};

exports.getAllCategories = async (req, res) => {
  let categories = [];
  try {
    categories = await Category.findOne();
  } catch (err) {
    console.log(err);
    return res.status(200).json({ err: "Error in getting categories" });
  }
  res.status(200).json(categories);
};
