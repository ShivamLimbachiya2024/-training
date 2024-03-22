const express = require('express');
const app=express();
const userRoute = require('./routes/router.js');
require('dotenv').config()
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use('/public',express.static('public'))

app.set('view engine','ejs')

app.use('/',userRoute);
app.listen( process.env.PORT||8080,()=>{
    console.log("Server is listening on 8080...");
})