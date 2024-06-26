const {
    updateBasic,
    updateEDU,
    updateWork,
    updateTech,
    updateRef,
    updateLang,
    fetchStates,
    fetchALLDAta,
    fetchCity,
    insertBasic,
    insertEDU,
    insertWork,
    insertlang,
    insertTech,
    insertRefrence,
    fetchBasicDetails,
    fetchEducationDetails,
    fetchWorkDetails,
    fetchRefDetails,
    fetchtech,
    fetchLanguage,
} = require("../service/AjaxDatabaseOP");
const listEmp = async (req, res) => {
    var data = await fetchALLDAta();
    res.render("AjaxCurdView/ListEMP", { data: data });
};
const renderFrom = (req, res) => {
    res.render("AjaxCurdView/form");
};
const renderUpdateFrom = async (req, res) => {
    res.render("AjaxCurdView/form");
};
const getupdateDataJson = async (req, res) => {
    const empId = req.query.id;
    var oldJsonData = new Object();
    try {
        var basicDetails = await fetchBasicDetails(empId);
        var educationDetails = await fetchEducationDetails(empId);
        var workDetails = await fetchWorkDetails(empId);
        var langDetails = await fetchLanguage(empId);
        var techDetails = await fetchtech(empId);
        var refDetails = await fetchRefDetails(empId);
        var oldJsonData = basicDetails;
        oldJsonData["educationDetails"] = educationDetails;
        oldJsonData["workDetails"] = workDetails;
        Object.assign(oldJsonData, langDetails);
        Object.assign(oldJsonData, techDetails);
        oldJsonData["refDetails"] = refDetails;
        res.send(oldJsonData);
    } catch (error) {
        console.log(error);
    }
};
const test = async (req, res) => {
    try {
        const states = await fetchStates();
        res.send(states);
    } catch (error) {
        console.log(error);
    }
};
const cityfetch = async (req, res) => {
    try {
        const cities = await fetchCity(req.query.state);
        res.send(cities);
    } catch (error) {
        console.log(error);
    }
};
const subUpdateData = async (req, res) => {
    try {
        await updateBasic(req.body);
        await updateEDU(req.body);
        await updateWork(req.body);
        await updateRef(req.body);
        await updateLang(req.body);
        await updateTech(req.body);
    } catch (error) {
        console.log(error);
    }
    res.send("DATA Updated!");
};
const submitData = async (req, res) => {
    try {
        var empPK = await insertBasic(req.body);
        await insertEDU(req.body, empPK);
        await insertWork(req.body, empPK);
        await insertlang(req.body, empPK);
        await insertTech(req.body, empPK);
        await insertRefrence(req.body, empPK);
    } catch (error) {
        console.log(error);
    }
    res.send("DATA Submitted");
};
module.exports = {
    listEmp,
    renderFrom,
    getupdateDataJson,
    test,
    cityfetch,
    submitData,
    subUpdateData,
    renderUpdateFrom,
};
