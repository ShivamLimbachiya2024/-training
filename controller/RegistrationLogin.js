const jwt = require("jsonwebtoken");
const { verifyAndInsertUser, encryptAndInsertPass, updateTimeStamp } = require("../service/RegisterDBOperations");
const { fetchActCode, fetchUserPass, fetchSalt, fetchCreatedtime, checkUserStatus } = require("../service/RegisterCheckQueries");
const md5 = require("md5");

const renderRegister = (req, res) => {
    res.render("RegisterLoginView/RegisterFrom");
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
        res.render("RegisterLoginView/passPage");
    } else {
        res.render("RegisterLoginView/expiredLink");
    }
};
const renderFrgtPass = (req, res) => {
    res.render("RegisterLoginView/frgrtPass");
};
const renderlogin = (req, res) => {
    res.render("RegisterLoginView/Login");
};
const renderHomePage = (req, res) => {
    res.render("RegisterLoginView/ReqWithToken");
};
const registerUser = async (req, res) => {
    var userJson = req.body;
    try {
        var resobj = await verifyAndInsertUser(userJson);
        res.send(resobj);
    } catch (error) {
        console.log(error);
    }
};
const enterPass = (req, res) => {
    encryptAndInsertPass(req.body);
    res.send("User is Now Active!");
};
const updateLink = (req, res) => {
    updateTimeStamp(req.body.email);
    res.send();
};
const genForgotPass = async (req, res) => {
    let activationLink;
    var failObj = { status: 400, actCode: "", email: req.body.username };
    var succesObj = { status: 200, actCode: "", email: req.body.username };
    try {
        const isUserExist = await checkUserStatus(req.body.username);
        if (isUserExist == 'active') {
            succesObj['actCode'] = await fetchActCode(req.body.username);
            await updateTimeStamp(req.body.username);
            res.send(succesObj);
        } else {
            res.send(failObj);
        }
    } catch (error) {
        console.log(error);
    }
};
const userLogin = async (req, res) => {
    var userJson = req.body;
    const succesObj = { status: 200, token: "" };
    const failObj = { status: 400, token: "" };
    try {
        var isUserExist = await checkUserStatus(userJson.username);
    } catch (error) {
        console.log(error);
    }
    if (isUserExist == 'active') {
        try {
            var userSalt = await fetchSalt(userJson.username);
            var pass = await fetchUserPass(userJson.username);
        } catch (error) {
            console.log(error);
        }
        var stringToHash = userSalt + userJson.pass;
        var hash = md5(stringToHash);
        if (pass == hash) {
            let jwtSecretKey = process.env.JWT_SECRET_KEY;
            const token = jwt.sign(userJson, jwtSecretKey, {
                expiresIn: 86400,
            });
            succesObj["token"] = token;
            res.cookie("token", token);
            res.send(succesObj);
        } else {
            res.send(failObj);
        }
    } else {
        res.send(failObj);
    }
};

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
};
