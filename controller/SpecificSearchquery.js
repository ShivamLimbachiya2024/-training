const con = require("../modules/connection");
const runQuery = (sql) => {
    return new Promise((resolve, reject) => {
        con.query(sql, (err, result) => {
            if (err) {
                console.log(err);
                return reject(err)
            }
            return resolve(result)
        })
    })
}
const studentlist = async (req, res) => {
    var studentid = Number(req.body.studentid);
    var { fname, lname, email, phoneno, city } = req.body;
    let recordsinonepage = 20;
    var pagenumber = req.query.pageid;
    let totalPage;
    let selectForPage = `select count(*) as count from Student_Master_feb26 `;
    if (studentid || fname || lname || email || phoneno || city) {
        selectForPage = `select count(*) as count from Student_Master_feb26 where sid like '${studentid}' or fname like '${fname}' or email like '${email}' or lname like '${lname}' or phone like '${phoneno}' or city like '${city}' `;
    }
    if (req.query.fname || req.query.lname || req.query.city) {
        fname = req.query.fname;
        lname = req.query.lname;
        city = req.query.city;
        selectForPage = `select count(*) as count from Student_Master_feb26 where sid like '${studentid}' or fname like '${fname}' or email like '${email}' or lname like '${lname}' or phone like '${phoneno}' or city like '${city}' `;
    }
    console.log(selectForPage);
    let resultCount = await runQuery(selectForPage);
    totalPage = Math.ceil(resultCount[0].count / recordsinonepage)
    if (pagenumber <= 0 || pagenumber == null || pagenumber > totalPage) {
        pagenumber = 1;
    }

    var start = (pagenumber - 1) * recordsinonepage;

    var select = `select sid As StudentID,fname As FirstName ,lname As LastName, email As Email,phone As MobileNumber,age as Age, gender As Gender, city As City,zipcode As PinCode from Student_Master_feb26 limit ${start},${recordsinonepage} `;
    if (studentid || fname || lname || email || phoneno || city) {
        select = `select sid As StudentID, fname As FirstName, lname As LastName, email As Email, phone As MobileNumber,age as Age, gender As Gender, city As City, zipcode As PinCode from Student_Master_feb26 where sid like '${studentid}' or fname like '${fname}' or email like '${email}' or lname like '${lname}' or phone like '${phoneno}' 
                or city like '${city}' limit ${start},${recordsinonepage + start} `;
    }

    const result = await runQuery(select)
    if (result.length == 0) {
        res.send("Data not found")
    } else {
        res.render("SpfSearchView/table", {
            data: result,
            pageid: pagenumber,
            fname: fname,
            city: city,
            lname: lname,
            totalPage: totalPage
        });
    }
};
module.exports = { studentlist };
