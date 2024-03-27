const mysql = require('mysql');
const con = require('../../modules/connection');
const homeFunc=(req, res)=>{
    res.render('PageViews/index')
}
const listFunc = (req, res) => {
    var pageNum=req.query.page;
    if (pageNum==null) {
        pageNum=1;
    }
    var pageStart=pageNum-1;
    var noOfrecords=200;
    var start=pageStart*noOfrecords;
    var lastPage;
    
    con.query("select count(*) as count from Student_Master_feb26",(err,result)=>{
        if (!err) {
            lastPage=Math.ceil(result[0].count/200);

        }
        
    })
    con.query(`SELECT * FROM Student_Master_feb26 limit ${start},${noOfrecords}`, (err, result) => {
        if (err) {
            console.log(err);
        }
        res.render('PageViews/simple', { 
            data: result,
            pageNum:pageNum ,
            lastPage:lastPage
        });
    })
}
const orderFunc = (req, res) => {
   
    var pageNum=req.query.page;
    var sortBy=req.query.sortBy;
    var order=req.query.order;
    if (pageNum==null) {
        pageNum=1;
    }
    var pageStart=pageNum-1;
    var noOfrecords=200;
    var start=pageStart*noOfrecords;
    var lastPage;
    
    con.query("select count(*) as count from Student_Master_feb26",(err,result)=>{
        if (!err) {
            lastPage=Math.ceil(result[0].count/200);

        }
        
    })
    con.query(`SELECT * FROM Student_Master_feb26 order by ${sortBy} ${order} limit ${start},${noOfrecords}`, (err, result) => {
        if (err) {
            console.log(err);
        }
        res.render('PageViews/orderBy', { 
            data: result,
            pageNum:pageNum ,
            lastPage:lastPage, 
            sortBy:sortBy,
            order:order
        });
    })
}

module.exports = { listFunc,orderFunc,homeFunc}