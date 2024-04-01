const con = require('../modules/connection');
const md5 = require('md5');
const { checkUserStatus,fetchSalt,fetchActCode } = require('./checkQueries');
const insertUser = async (userJson) => {
    var userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    var userSalt = randomAlphaNumeric(4);
    var activationLink = randomAlphaNumeric(8);

    var failObj = { status: 400, actCode: '' ,email:userJson.email}
    var succesObj = { status: 200, actCode: activationLink ,email:userJson.email}

    try {
        var countUser = await checkUserStatus(userJson.email)
    } catch (error) {
        console.log(error);
    }
    if (countUser == 'Not Exist') {
        var sql = `INSERT INTO userData (timezone, salt, fname, lname, dob, gender, email,phone, state, city, activation_link) 
                    VALUES ('${userTimeZone}', '${userSalt}', '${userJson.fname}', '${userJson.lname}', '${userJson.dob}', '${userJson.gender}', '${userJson.email}', '${userJson.phone}', '${userJson.state}', '${userJson.city}', '${activationLink}');`;
        con.query(sql, (err, result) => {
            if (err) {
                throw err
            }
        })
        return succesObj
    }
    if (countUser == "notActive") {
        try {
            var oldActCode=await fetchActCode(userJson.email);
        } catch (error) {
            console.log(error);
        }
        succesObj.actCode=oldActCode;
        return succesObj;        
    }
    if (countUser == "active") {
        return failObj;
    }

}
const fetchCreatedtime=(email)=>{
    return new Promise((resolve, reject) => {
        var sql=`Select createdAt from userData where email='${email}'`
        con.query(sql,(err,result)=>{
            if (err) {
                throw err
            }
            return resolve(result[0].createdAt)
        })
    })
}
const insertPass=async(passObj)=>{
    try {
        var salt=await fetchSalt(passObj.email)
    } catch (error) {
        console.log(error);
    }
    var stringToHash=salt+passObj.password;
    var hash=md5(stringToHash)
    var sql = `UPDATE userData SET active_Status = '1', Upassword = '${hash}' WHERE email = '${passObj.email}';`
    con.query(sql,(err,result)=>{
        if (err) {
            throw err;
        }
    })
}
const randomAlphaNumeric = length => {
    let s = '';
    Array.from({ length }).some(() => {
        s += Math.random().toString(36).slice(2);
        return s.length >= length;
    });
    return s.slice(0, length);
};

const updateTimeStamp=(email)=>{
    var sql=`UPDATE userData SET createdAt = CURRENT_TIMESTAMP() WHERE email = '${email}' `
    con.query(sql,(err,result)=>{
        if (err) {
            throw err
        }
    })
}
const checkUserExist=(userJson)=>{
    const email=userJson.username 
    return new Promise((resolve, reject) => {
        var sql = `SELECT count(userid) as count FROM userData where email='${email}' and active_Status=1;`
        con.query(sql,(err,result)=>{
            if (err) {
                throw err
            }
            return resolve(result[0].count)
        })
    })
}
module.exports = { insertUser,checkUserExist,updateTimeStamp,fetchCreatedtime ,insertPass}
