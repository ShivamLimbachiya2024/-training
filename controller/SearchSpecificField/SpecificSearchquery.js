const con = require("../../modules/connection");
const studentlist = (req, res) => {
    var studentid = Number(req.body.studentid);
    var { fname, lname, email, phoneno, city } = req.body;
    let recordsinonepage = 200;
    var pagenumber = req.query.pageid;
    let totalPage;
    if (req.query.fname || req.query.lname || req.query.city) {
        fname = req.query.fname;
        lname = req.query.lname;
        city = req.query.city;
    }

    if (pagenumber <= 0 || pagenumber == null) {
        pagenumber = 1;
    }

    if (pagenumber == 1) {
        var start = 0;
    } else {
        var start = (pagenumber - 1) * recordsinonepage;
    }

    var selectForPage = `select count(*) as count from Student_Master_feb26 ` ;
    if (studentid || fname || lname || email || phoneno || city) {
        selectForPage = `select count(*) as count from Student_Master_feb26 where sid like '${studentid}' or fname like '${fname}' or email like '${email}' or lname like '${lname}' or phone like '${phoneno}' or city like '${city}' ` ;
    }
    con.query(selectForPage,(err,result)=>{
        totalPage=result[0].count
    })

    var select = `select sid As StudentID,fname As FirstName ,lname As LastName, email As Email,phone As MobileNumber,age as Age, gender As Gender, city As City,zipcode As PinCode from Student_Master_feb26 limit ${start},${recordsinonepage} ` ;
    if (studentid || fname || lname || email || phoneno || city) {
        select = `select sid As StudentID, fname As FirstName, lname As LastName, email As Email, phone As MobileNumber,age as Age, gender As Gender, city As City, zipcode As PinCode from Student_Master_feb26 where sid like '${studentid}' or fname like '${fname}' or email like '${email}' or lname like '${lname}' or phone like '${phoneno}' 
                or city like '${city}' limit ${start},${recordsinonepage} ` ;
    }
    Math.ceil(totalPage/recordsinonepage)
    con.query(select, (err, row, col) => {
        if (err) {
            throw err;
        } else {
            res.render("SpfSearchView/table", {
                row: row,
                col: col,
                pageid: pagenumber,
                fname: fname,
                city: city,
                lname: lname,
                totalPage:Math.ceil(totalPage/recordsinonepage)
            });
        }
    });
};
module.exports = { studentlist };
