const express = require('express');
const cors = require('cors');
const app=express();
app.use(express.json());
app.use(cors())

//Import all the routes
const user = require('./routes/user');

app.use('/user',user);
app.use('/',(req,res)=>{
    res.send("Server is running");
})

module.exports = app;