const express = require('express');
const cors = require('cors');
const app=express();
const bodyParser = require("body-parser");
const fileUpload= require('express-fileupload');



app.use(express.json());
app.use(cors())
app.use(bodyParser.urlencoded({extended:true}));
app.use(fileUpload())


//Import all the routes
const user = require('./routes/user');
const article = require("./routes/article");
const logo = require("./routes/logo");


app.use('/user',user);
app.use("/article", article);
app.use('/logo',logo);

module.exports = app;