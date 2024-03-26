const express = require('express');
const app=express();
const userRoute = require('./routes/router.js');
const cookieParser = require('cookie-parser');
require('dotenv').config()
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(cookieParser())
app.use('/public',express.static('public'))

app.set('view engine','ejs')

app.use('/',userRoute);
app.listen( process.env.PORT||8080,()=>{
    console.log("Server is listening on 8080...");
})