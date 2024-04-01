const { json } = require("express");
const jwt = require("jsonwebtoken");
const {
    checkUserExist,
    insertUser,
    insertPass,
    fetchCreatedtime,
    updateTimeStamp,
} = require("./DBOperations");
const { fetchActCode,checkUserStatus, fetchUserPass, fetchSalt } = require("./checkQueries");
const md5 = require("md5");
const renderRegister = (req, res) => {
    res.render("RegisterFrom");
};
const registerUser = async (req, res) => {
    var userJson = req.body;
    try {
        var resobj = await insertUser(userJson);
        res.send(resobj);
    } catch (error) {
        console.log(error);
    }
};
const enterPass = (req, res) => {
    insertPass(req.body);
    res.send("User is Now Active!");
};
const renderPasspage = async (req, res) => {
    var email = req.query.email;
    try {
        var createAt = await fetchCreatedtime(email);
    } catch (error) {
        console.log(error);
    }
    var dateDiff = new Date() - new Date(createAt);
    if (dateDiff < 10000) {
        res.render("passPage");
    } else {
        res.render("expiredLink");
    }
};
const renderFrgtPass = (req, res) => {
    res.render("frgrtPass");
};
const updateLink = (req, res) => {
    updateTimeStamp(req.body.email);
    res.send();
};
const renderlogin = (req, res) => {
    res.render("Login");
};
const genForgotPass = async (req, res) => {
    const isUserExist = await checkUserExist(req.body);
    let activationLink;
    var failObj = { status: 400, actCode: "", email: req.body.username };
    var succesObj = {
        status: 200,
        actCode: activationLink,
        email: req.body.username,
    };
    if (isUserExist == 1) {
        activationLink = await fetchActCode(req.body.username);
        updateTimeStamp(req.body.username);
        res.send(succesObj);
    } else {
        res.send(failObj);
    }
};
const userLogin = async (req, res) => {
    var userJson = req.body;
    const succesObj = { status: 200, token: "" };
    const failObj = { status: 400, token: "" };
    try {
        const isUserExist = await checkUserExist(userJson);
    } catch (error) {
        console.log(error);
    }
    if (isUserExist == 1) {
        try {
            const userSalt = await fetchSalt(userJson.username);
            const pass = await fetchUserPass(userJson.username);
        } catch (error) {
            console.log(error);
        }
        var stringToHash = userSalt + userJson.pass;
        var hash = md5(stringToHash);
        if (pass == hash) {
            let jwtSecretKey = process.env.JWT_SECRET_KEY;
            const token = jwt.sign(userJson, jwtSecretKey,{expiresIn: 86400 });
            succesObj["token"] = token;
            res.cookie("token",token)
            res.send(succesObj);
        } else {
            res.send(failObj);
        }
    } else {
        res.send(failObj);
    }
};
const renderHomePage=(req,res)=>{
    res.render('ReqWithToken');
}
const authServices=async(req,res,next)=>{
    var token = req.cookies.token
    if (typeof token==='undefined') {
        res.render('Login')
    }else{
        var jwtSecretKey=process.env.JWT_SECRET_KEY;
        const decode = jwt.verify(token,jwtSecretKey);
        try {
            var userStatus=await checkUserStatus(decode.username)
        } catch (error) {
            console.log(error);
        }
        if (userStatus=="active") {
            next()
        }else{
            res.redirect('Login')
        }
    }
}
module.exports = {
    renderRegister,
    genForgotPass,
    userLogin,
    renderlogin,
    updateLink,
    renderFrgtPass,
    registerUser,
    renderPasspage,
    enterPass,
    renderHomePage,
    authServices
};
