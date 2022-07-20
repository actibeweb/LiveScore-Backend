const express = require("express");
const router = express.Router();

const { isAuthenticatedUser } = require("../middlewares/checkUserAuth");

const { createMatch,getAllMatches,getMatchById,updateMatch,deleteMatch } = require("../controllers/match-controller");

router.post("/create", isAuthenticatedUser, createMatch);
router.get("/get", isAuthenticatedUser, getAllMatches);
router.get("/get/:id", isAuthenticatedUser, getMatchById);
router.put("/update/:id", isAuthenticatedUser, updateMatch);
router.delete("/delete/:id", isAuthenticatedUser, deleteMatch);

module.exports = router;
