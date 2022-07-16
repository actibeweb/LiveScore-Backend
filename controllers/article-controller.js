const Article = require("../models/article");

exports.createArticle = async (req, res) => {
  const { title, content } = req.body;
  let article;
  try {
    article = await Article.create({ title, content });
  } catch (err) {
    console.log(err);
    return res.status(200).json({ err: "Errot in creating article" });
  }
  res.status(200).json({ article });
};
