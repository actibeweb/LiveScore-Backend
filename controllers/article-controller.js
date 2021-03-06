const Article = require("../models/article");
const cloudinary = require("cloudinary");

exports.createArticle = async (req, res) => {
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
  let article;
  try {
    article = await Article.create(req.body);
  } catch (err) {
    console.log(err);
    return res.status(200).json({ err: "Errot in creating article" });
  }
  res.status(200).json(article);
};

exports.getArticles = async (req, res) => {
  let articles = [];
  try {
    articles = await Article.find();
  } catch (err) {
    return res.status(200).json({ err: "Fetching Products Failed" });
  }
  res.status(200).json(articles);
};

exports.getArticleById = async (req, res) => {
  const articleId = req.params.id;
  let article;
  try {
    article = await Article.findById(articleId);
  } catch (err) {
    console.log(err);
    return res.status(200).json({ err: "Fetching Article Failed" });
  }
  if (!article) {
    return res.status(200).json({ err: "Could not find article for this id" });
  }
  res.status(200).json(article);
};

exports.updateArticle = async (req, res) => {
  const articleId = req.params.id;
  let article;
  try {
    article = await Article.findById(articleId);
  } catch (err) {
    console.log(err);
    return res
      .status(200)
      .json({ err: "Something went wrong in getting Article" });
  }
  if (!article) {
    return res.status(200).json({ err: "Could not find article for this id" });
  }

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

  try {
    article = await Article.findByIdAndUpdate(articleId, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });
  } catch (err) {
    console.log(err);
    return res.status(200).json({ err: "Error in Updating product" });
  }
  res.status(200).json(article);
};

exports.deleteArticle = async (req, res) => {
  const articleId = req.params.id;
  let article;
  try {
    article = await Article.findById(articleId);
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ err: "Something went wrong in delete Article" });
  }
  if (!article) {
    return res
      .status(500)
      .json({ message: "Could not find article for this id" });
  }
  try {
    await article.remove();
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Article could not be deleted" });
  }
  res.status(200).json({ message: "Article deleted successfully" });
};
