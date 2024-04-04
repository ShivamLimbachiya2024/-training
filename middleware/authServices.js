const {checkUserStatus}=require('../service/RegisterCheckQueries');
const jwt = require("jsonwebtoken");
const authServices=async(req,res,next)=>{
    var token = req.cookies.token
    if (typeof token==='undefined') {
        res.render('RegisterLoginView/Login')
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
module.exports = {authServices}