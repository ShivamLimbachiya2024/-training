const {updateBasic,updateEDU, updateWork,updateTech,updateRef,updateLang,fetchStates,fetchALLDAta, fetchCity, insertBasic, insertEDU, insertWork, insertlang, insertTech, insertRefrence, fetchBasicDetails, fetchEducationDetails, fetchWorkDetails, fetchRefDetails, fetchtech, fetchLanguage } = require('./DatabaseOP');
const listEmp = async(req, res) => {
    var data=await fetchALLDAta();
    res.render('AjaxCurdView/ListEMP',{data:data});
}
const renderFrom = (req, res) => {
    res.render('AjaxCurdView/form');
}
const renderUpdateFrom = async (req, res) => {
    res.render('AjaxCurdView/form')
}
const getupdateDataJson = async(req,res)=>{
    const empId = req.query.id;
    var oldJsonData = new Object();
    var basicDetails = await fetchBasicDetails(empId)
    var educationDetails = await fetchEducationDetails(empId)
    var workDetails = await fetchWorkDetails(empId)
    var langDetails = await fetchLanguage(empId)
    var techDetails = await fetchtech(empId)
    var refDetails = await fetchRefDetails(empId)
    var oldJsonData = basicDetails
    oldJsonData['educationDetails']=educationDetails;
    oldJsonData['workDetails']=workDetails;
    Object.assign(oldJsonData,langDetails);
    Object.assign(oldJsonData,techDetails);
    oldJsonData['refDetails']=refDetails;
    res.send(oldJsonData);
}
const test = async (req, res) => {
    const states = await fetchStates()
    res.send(states)
}
const cityfetch = async (req, res) => {
    const cities = await fetchCity(req.query.state)
    res.send(cities)
}
const subUpdateData=(req,res)=>{
    updateBasic(req.body);
    updateEDU(req.body);
    updateWork(req.body);
    updateRef(req.body);
    updateLang(req.body);
    updateTech(req.body);
    res.send("DATA Updated!");
}
const submitData = async (req, res) => {
    var empPK = await insertBasic(req.body);
    await insertEDU(req.body, empPK);
    await insertWork(req.body, empPK);
    await insertlang(req.body, empPK);
    await insertTech(req.body, empPK);
    await insertRefrence(req.body, empPK);  
    res.send("DATA Submitted");
}
module.exports = { listEmp, renderFrom,getupdateDataJson, test, cityfetch, submitData,subUpdateData, renderUpdateFrom }