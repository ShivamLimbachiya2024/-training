const con = require('../../modules/connection');
const repListStu = (req, res) => {
    var pageNum=req.query.page;
    var month=req.query.month;
    if (pageNum==null ||pageNum<1) {
        pageNum=1;
    }
    if (month==null ||month<1) {
        month=1;
    }
    var pageStart=pageNum-1;
    var noOfrecords=20;
    var start=pageStart*noOfrecords;
    var lastPage;
    con.query("select count(distinct(sid)) as count from attendence",(err,result)=>{
            if (!err) {
                lastPage=Math.ceil(result[0].count/noOfrecords);
            }  
    })
    
    con.query(`
    SELECT a.sid,s.fname,count(a.sid) as No_days_Present,ROUND(count(a.sid)/0.31,2) as Percentage from attendence as a 
    LEFT JOIN Student_Master_feb26 as s 
    on a.sid=s.sid  where p_or_a = 1 and MONTH(atten_date)=${month}
    group by sid
    limit ${start},${noOfrecords}`, (err, result) => {
        if (err) {
            console.log(err);
        }
        res.render('ReportViews/simple', { 
            data: result,
            pageNum:pageNum,
            lastPage:lastPage,
            month:month
        });
    })
}
const stulist=(req,res)=>{
    var pageNum=req.query.page;
    if (pageNum==null ||pageNum<1) {
        pageNum=1;
    }
    var pageStart=pageNum-1;
    var noOfrecords=20;
    var start=pageStart*noOfrecords;
    var lastPage;
    con.query("select count(sid) as count from Student_Master_feb26",(err,result)=>{
            if (!err) {
                lastPage=Math.ceil(result[0].count/noOfrecords);
            }  
    })
    
    con.query(`
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
    limit ${start},${noOfrecords}`, (err, result) => {
        if (err) {
            console.log(err);
        }
        res.render('ReportViews/stulist', { 
            data: result,
            pageNum:pageNum,
            lastPage:lastPage
        });
    })
    
}
const stuDetailResult=(req,res)=>{
    const stuId=req.query.stuid
    if (stuId<0) {
        res.send("Data Not found!")
    }
    con.query(`
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
    `, (err, result) => {
        if (err) {
            console.log(err);
        }
        if (result.length==0) {
            res.send("Data Not found!")
        }
        res.render('ReportViews/resultDetail', { 
            data: result
        });
    })
    
}

module.exports = {stulist,repListStu,stuDetailResult}