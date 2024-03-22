const { json } = require('express');
const jwt = require('jsonwebtoken');
const { checkUserExist, insertUser, insertPass, fetchCreatedtime, updateTimeStamp } = require('./DBOperations');
const { fetchActCode, fetchUserPass,fetchSalt } = require('./checkQueries');
const md5 = require('md5');
const renderRegister = (req, res) => {
    res.render('RegisterFrom')
}
const registerUser = async (req, res) => {
    var userJson = req.body;
    var resobj = await insertUser(userJson);
    res.send(resobj)
}
const enterPass = (req, res) => {
    insertPass(req.body)
    res.send("User is Now Active!")
}
const renderPasspage = async (req, res) => {
    var actCode = req.query.actcode;
    var email = req.query.email;
    var createAt = await fetchCreatedtime(email)
    var dateDiff = new Date - new Date(createAt)
    if (dateDiff < 10000) {
        res.render('passPage')
    } else {
        res.render('expiredLink')
    }
}
const renderFrgtPass = (req, res) => {
    res.render('frgrtPass')
}
const updateLink = (req, res) => {
    updateTimeStamp(req.body.email)
    res.send()
}
const renderlogin = (req, res) => {
    res.render('Login')
}
const genForgotPass = async (req, res) => {
    const isUserExist = await checkUserExist(req.body)
    let activationLink;
    var failObj = { status: 400, actCode: '', email: req.body.username }
    var succesObj = { status: 200, actCode: activationLink, email: req.body.username }
    if (isUserExist == 1) {
        activationLink = await fetchActCode(req.body.username)
        updateTimeStamp(req.body.username)
        res.send(succesObj)
    } else {
        res.send(failObj)
    }

}
const userLogin = async (req, res) => {
    var userJson = req.body;
    const succesObj={status:200,token:""}
    const failObj={status:400,token:""}
    const isUserExist = await checkUserExist(userJson);
    if (isUserExist == 1) {
        const userSalt = await fetchSalt(userJson.username)
        var stringToHash = userSalt + userJson.pass;
        var hash = md5(stringToHash)
        const pass=await fetchUserPass(userJson.username)
        if(pass==hash){
            let jwtSecretKey = process.env.JWT_SECRET_KEY;
            const token = jwt.sign(userJson, jwtSecretKey);
            succesObj['token']=token
            res.send(succesObj)
        }else{
            res.send(failObj)
        }
    }else{
        res.send(failObj)
    }
}
module.exports = { renderRegister, genForgotPass, userLogin, renderlogin, updateLink, renderFrgtPass, registerUser, renderPasspage, enterPass }