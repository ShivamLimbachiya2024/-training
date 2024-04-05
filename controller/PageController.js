const mysql = require('mysql');
const con = require('../modules/connection');
const homeFunc = (req, res) => {
    res.render('PageViews/index')
}
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
const listFunc = async(req, res) => {
    var pageNum = req.query.page;
    var noOfrecords = 200;
    let lastPage;
    const totalRecSql = "select count(*) as count from Student_Master_feb26"
    try {
        let totalRec = await runQuery(totalRecSql);
        lastPage = Math.ceil(totalRec[0].count / noOfrecords);
        if (pageNum == null || pageNum < 1 || pageNum > lastPage || pageNum == '') {
            pageNum = 1;
        }
        var pageStart = pageNum - 1;
        var start = pageStart * noOfrecords;
        const limitRecSql = `SELECT * FROM Student_Master_feb26 limit ${start},${noOfrecords}`
        let limitRec = await runQuery(limitRecSql);
        res.render('PageViews/simple', {
            data: limitRec,
            pageNum: pageNum,
            lastPage: lastPage
        });
    } catch (error) {
        res.send("Internal Server Error!");
    }
}
const orderFunc = async(req, res) => {
    var pageNum = req.query.page;
    var sortBy = req.query.sortBy;
    var order = req.query.order;
    let lastPage;
    var noOfrecords = 200;
    const totalRecSql = "select count(*) as count from Student_Master_feb26"
    try {
        let totalRec = await runQuery(totalRecSql);
        lastPage = Math.ceil(totalRec[0].count / noOfrecords);
        if (pageNum == null || pageNum < 1 || pageNum > lastPage || pageNum == '') {
            pageNum = 1;
        }
        const sortArr = ['fname', 'lname', 'city', 'countrycode', 'age']
        const orderArr = ['asc', 'desc']
        var pageStart = pageNum - 1;
        var noOfrecords = 200;
        var start = pageStart * noOfrecords;
        if (!sortArr.includes(sortBy) || !orderArr.includes(order)) {
            await listFunc(req, res)
            return
        }
        let recSql = `SELECT * FROM Student_Master_feb26 order by ${sortBy} ${order} limit ${start},${noOfrecords}`
        let result = await runQuery(recSql);
        res.render('PageViews/orderBy', {
            data: result,
            pageNum: pageNum,
            lastPage: lastPage,
            sortBy: sortBy,
            order: order
        });
    } catch (error) {
        res.send("Internal Server Error!");
    }
    
}

module.exports = { listFunc, orderFunc, homeFunc }