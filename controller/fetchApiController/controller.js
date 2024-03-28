const renderHomePage=(req,res)=>{
    res.render('fetchAPIFrontend/pagination')
}
const renderDetailsPage=(req,res)=>{
    var id=req.params.id;
    res.render('fetchAPIFrontend/detailPage',{id:id})
}
module.exports={renderHomePage,renderDetailsPage}