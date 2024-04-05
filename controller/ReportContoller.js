const con = require('../modules/connection');
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

const repListStu = async(req, res) => {
    var pageNum = req.query.page;
    var month = req.query.month;
    var noOfrecords = 20;  
    var lastPage;
    const totalRecSql =`select count(distinct(sid)) as count from attendence`
    let countRec = await runQuery(totalRecSql);
    lastPage = Math.ceil(countRec[0].count / noOfrecords);
    if (month == null || month < 1 || month > 3) {
        month = 1;
    }
    if (pageNum == null || pageNum < 1 || pageNum>lastPage) {
        pageNum = 1;
    }
    var pageStart = pageNum - 1;
    var start = pageStart * noOfrecords;
    const attReportSql = `
        SELECT a.sid,s.fname,count(a.sid) as No_days_Present,ROUND(count(a.sid)/0.31,2) as Percentage from attendence as a 
        LEFT JOIN Student_Master_feb26 as s 
        on a.sid=s.sid  where p_or_a = 1 and MONTH(atten_date)=${month}
        group by sid
        limit ${start},${noOfrecords}`
    const result=await runQuery(attReportSql)
    res.render('ReportViews/simple', {
        data: result,
        pageNum: pageNum,
        lastPage: lastPage,
        month: month
    });
}
const stulist = async (req, res) => {
    var pageNum = req.query.page;
    var noOfrecords = 20;
    var lastPage;
    const totalRecSql =`select count(sid) as count from Student_Master_feb26`
    const totalRec=await runQuery(totalRecSql)
    lastPage = Math.ceil(totalRec[0].count / noOfrecords);
    if (pageNum == null || pageNum < 1 || pageNum > lastPage) {
        pageNum = 1;
    }
    var pageStart = pageNum - 1;
    var start = pageStart * noOfrecords;
    const resultSql = `
    select *,(TerminalTheoryMarks+PrimilaryTheory+FinalTheory) as TotalTheoryMarks,
(TerminalTheoryMarks+PrimilaryTheory+FinalTheory+TerminalPracticalMarks+PrimilaryPractical+FinalPractical) as total
from 
(select exam.sid as StuId , Student_Master_feb26.fname as sname ,
	sum(case when exam.exam_id=1 then exam.theory_marks else 0 end) as TerminalTheoryMarks,
	sum(case when exam.exam_id=1 then exam.pratical_marks else 0 end) as TerminalPracticalMarks,
	sum(case when exam.exam_id=2 then exam.theory_marks else 0 end) as PrimilaryTheory,
    sum(case when exam.exam_id=2 then exam.pratical_marks else 0 end) as PrimilaryPractical,
    sum(case when exam.exam_id=3 then exam.theory_marks else 0 end) as FinalTheory,
    sum(case when exam.exam_id=3 then exam.pratical_marks else 0 end) as FinalPractical
from exam
left join Student_Master_feb26 on exam.sid=Student_Master_feb26.sid
left join Subject_ on exam.sub_id = Subject_.sub_id
left join exam_type on exam.exam_id=exam_type.e_id
group by StuId) as t
    limit ${start},${noOfrecords}`;
    const result = await runQuery(resultSql)
    res.render('ReportViews/stulist', {
        data: result,
        pageNum: pageNum,
        lastPage: lastPage
    });

}
const stuDetailResult = async (req, res) => {
    const stuId = req.query.stuid
    if (stuId < 0) {
        res.send("Data Not found!")
    }
    const resultStuSql = `
    select *,(TerminalTheoryMarks+PrimilaryTheory+FinalTheory) as TotalTheoryMarks,(TerminalPracticalMarks+PrimilaryPractical+FinalPractical) as TotalPracticalMarks,
    (TerminalTheoryMarks+PrimilaryTheory+FinalTheory+TerminalPracticalMarks+PrimilaryPractical+FinalPractical) as total
    from 
    (select Subject_.Subj_name as SubjectName,
        sum(case when exam.exam_id=1 then exam.theory_marks else 0 end) as TerminalTheoryMarks,
        sum(case when exam.exam_id=1 then exam.pratical_marks else 0 end) as TerminalPracticalMarks,
        sum(case when exam.exam_id=2 then exam.theory_marks else 0 end) as PrimilaryTheory,
        sum(case when exam.exam_id=2 then exam.pratical_marks else 0 end) as PrimilaryPractical,
        sum(case when exam.exam_id=3 then exam.theory_marks else 0 end) as FinalTheory,
        sum(case when exam.exam_id=3 then exam.pratical_marks else 0 end) as FinalPractical
    from exam
    left join Student_Master_feb26 on exam.sid=Student_Master_feb26.sid
    left join Subject_ on exam.sub_id = Subject_.sub_id
    left join exam_type on exam.exam_id=exam_type.e_id where exam.sid=${stuId}
    group by Subject_.Subj_name ) as t;    
    `
    const result = await runQuery(resultStuSql)
    if (result.length==0) {
        res.send("Data Not Found!")
    } else {
        res.render('ReportViews/resultDetail', {
            data: result
        }); 
    }
    
}

module.exports = { stulist, repListStu, stuDetailResult }