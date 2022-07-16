const express = require('express');
const cors = require('cors');
const app=express();
app.use(express.json());
app.use(cors())

//Import all the routes
const user = require('./routes/user');
const article = require("./routes/article");

app.use('/user',user);
app.use("/article", article);

module.exports = app;