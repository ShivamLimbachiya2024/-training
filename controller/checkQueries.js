const con = require('../modules/connection');
const checkUserExist=(email)=>{
    return new Promise((resolve, reject) => {
        var sql=`select count(*) as count from userData where email = '${email}'`;
        con.query(sql,(err,result)=>{
            if (err) {
                throw err
            }
            return resolve(result[0].count);
        })
    })
}
const checkActiveStatus=(email)=>{
    return new Promise((resolve, reject) => {
        var sql=`select count(*) as count from userData where email = '${email}' and active_Status=1`;
        con.query(sql,(err,result)=>{
            if (err) {
                throw err
            }
            return resolve(result[0].count);
        })
    })
}
const checkUserStatus = async(email)=>{
    var isExistUser=await checkUserExist(email)
    var isUserActive=await checkActiveStatus(email)
    if (isExistUser==0) {
        return "Not Exist";
    }
    if (isUserActive==1) {
        return "active"
    }
    if (isExistUser==1 && isUserActive==0) {
        return "notActive"
    }
}
const fetchSalt=(email)=>{
    var sql = `Select salt from userData where email='${email}'`
    return new Promise((resolve, reject) => {
        con.query(sql,(err,result)=>{
            if(err){
                throw err
            }
            return resolve(result[0].salt)
        })
    })
}
const fetchActCode=(email)=>{
    var sql = `Select activation_link from userData where email='${email}'`
    return new Promise((resolve, reject) => {
        con.query(sql,(err,result)=>{
            if(err){
                throw err
            }
            return resolve(result[0].activation_link)
        })
    })
}
const fetchUserPass=(email)=>{
    var sql = `Select Upassword from userData where email='${email}'`
    return new Promise((resolve, reject) => {
        con.query(sql,(err,result)=>{
            if(err){
                throw err
            }
            return resolve(result[0].Upassword)
        })
    })
    
}
module.exports={checkUserStatus,fetchUserPass,fetchActCode,fetchSalt}