const con = require('../../modules/connection');
const md5 = require('md5');
const { checkUserStatus,fetchSalt,fetchActCode } = require('./checkQueries');

const verifyAndInsertUser = async (userJson) => {
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
        try {
            await insertUser(userJson,userTimeZone,userSalt,activationLink);
        } catch (error) {
            return failObj;
        }
        return succesObj
    }else if(countUser == "notActive") {
        try {
            var oldActCode=await fetchActCode(userJson.email);
        } catch (error) {
            console.log(error);
        }
        succesObj.actCode=oldActCode;
        return succesObj;        
    }else if (countUser == "active") {
        return failObj;
    }

}
const encryptAndInsertPass=async(passObj)=>{
    try {
        var salt=await fetchSalt(passObj.email)
        var stringToHash=salt+passObj.password;
        var hash=md5(stringToHash)
        await insertPass(hash,passObj)
    } catch (error) {
        console.log(error);
    }
}
const randomAlphaNumeric = length => {
    let s = '';
    Array.from({ length }).some(() => {
        s += Math.random().toString(36).slice(2);
        return s.length >= length;
    });
    return s.slice(0, length);
};

const insertUser=(userJson,userTimeZone,userSalt,activationLink)=>{
    return new Promise((resolve, reject) => {
        var sql = `INSERT INTO userData (timezone, salt, fname, lname, dob, gender, email,phone, state, city, activation_link) 
                VALUES ('${userTimeZone}', '${userSalt}', '${userJson.fname}', '${userJson.lname}', '${userJson.dob}', '${userJson.gender}', '${userJson.email}', '${userJson.phone}', '${userJson.state}', '${userJson.city}', '${activationLink}');`;
        con.query(sql, (err, result) => {
            if (err) {
                return reject(err)
            }
            return resolve()
        })
    })
}
const insertPass=(hash,passObj)=>{
    return new Promise((resolve, reject) => {
        var sql = `UPDATE userData SET active_Status = '1', Upassword = '${hash}' WHERE email = '${passObj.email}';`
        con.query(sql,(err,result)=>{
            if (err) {
                return reject(err);
            }
            return resolve()
        })
    })
}

const updateTimeStamp=(email)=>{
    return new Promise((resolve, reject) => {
        var sql=`UPDATE userData SET createdAt = CURRENT_TIMESTAMP() WHERE email = '${email}' `
        con.query(sql,(err,result)=>{
            if (err) {
                return reject(err)
            }
            return resolve()
        })
    })
}

module.exports = { verifyAndInsertUser,updateTimeStamp ,encryptAndInsertPass}
