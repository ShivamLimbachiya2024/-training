const renderPage=(req,res)=>{
    res.render('FetchAPIFrontend/pagination')
}
const renderDetailsPage=(req,res)=>{
    var id=req.params.id;
    res.render('FetchAPIFrontend/detailPage',{id:id})
}
module.exports={renderPage,renderDetailsPage}