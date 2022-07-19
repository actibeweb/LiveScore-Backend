const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");

app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

//Import all the routes
const user = require("./routes/user");
const article = require("./routes/article");
const logo = require("./routes/logo");
const category = require("./routes/category");
const about = require("./routes/about");
const contact = require("./routes/contact");
const terms = require("./routes/terms");
const affiliate = require("./routes/affiliate")
const adsense = require("./routes/adsense")

app.use("/user", user);
app.use("/article", article);
app.use("/logo", logo);
app.use("/category", category);
app.use("/about", about);
app.use("/contact", contact);
app.use("/terms", terms);
app.use("/affiliate",affiliate);
app.use("/adsense",adsense);

module.exports = app;
