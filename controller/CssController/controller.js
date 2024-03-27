const runtask1=(req,res)=>{
    res.render('CSSTask/Main.ejs')
}
const runtask2=(req,res)=>{
    res.render('CSSTask/Practical2.ejs')
}
const runtask3=(req,res)=>{
    res.render('CSSTask/Practical3.ejs')
}
module.exports={runtask1,runtask2,runtask3}