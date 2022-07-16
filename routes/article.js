const express = require("express");
const router = express.Router();

const {
  createArticle,
  getArticles,
  getArticleById,
  updateArticle,
  deleteArticle,
} = require("../controllers/article-controller");

const { isAuthenticatedUser } = require("../middlewares/checkUserAuth");

router.post("/create", isAuthenticatedUser, createArticle);
router.get("/getAllArticles", getArticles);
router.get("/getArticleById/:id", getArticleById);
router.put("/updateArticle/:id", isAuthenticatedUser, updateArticle);
router.delete("/deleteArticle/:id", isAuthenticatedUser, deleteArticle);
