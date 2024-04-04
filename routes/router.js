const express = require('express');
const router = express.Router();

const { authServices } = require('../middleware/authServices')
const { renderRegister, userLogin, renderHomePage, registerUser, genForgotPass, renderFrgtPass, updateLink, renderPasspage, renderlogin, enterPass } = require('../controller/RegistrationLogin.js')
const { runeventsPrac, runDynamicTable, runkukuCube, runticTacToe } = require('../controller/JSTaskController.js')
const { runtask1, runtask2, runtask3 } = require('../controller/CssController.js')
const { listFunc, orderFunc } = require('../controller/PageController.js')
const { repListStu, stulist, stuDetailResult } = require('../controller/ReportContoller.js');
const { runQuery } = require("../controller/DeliSearchController.js");
const { renderPage, renderDetailsPage } = require('../controller/FetchApiController.js');
const { listEmp, renderFrom, test, cityfetch, submitData, subUpdateData, renderUpdateFrom, getupdateDataJson } = require('../controller/AjaxCurdContorller.js')
const { studentlist } = require('../controller/SpecificSearchquery.js')

//JS Task routes
router.get('/tasks/dynamicTable', authServices, runDynamicTable)
router.get('/tasks/eventsPrac', authServices, runeventsPrac)
router.get('/tasks/kukuCube', authServices, runkukuCube)
router.get('/tasks/ticTacToe', authServices, runticTacToe)

//CSS Task routes
router.get('/tasks/css1', authServices, runtask1)
router.get('/tasks/css2', authServices, runtask2)
router.get('/tasks/css3', authServices, runtask3)

//Dynamic grid pagination and sorting routes
router.get('/tasks/PaginationAndSortingStu', authServices, listFunc)
router.get('/list', authServices, listFunc);
router.get('/orderBy', authServices, orderFunc);

//Report grid pagination and filter routes
router.get('/tasks/AttendenceReport', authServices, repListStu)
router.get('/attenlist', authServices, repListStu)
router.get('/tasks/ExamReport', authServices, stulist)
router.get('/sturesult', authServices, stulist)
router.get('/Detail', authServices, stuDetailResult)

//Delimeter Search routes
router.get("/tasks/DelimeterSearch", authServices, runQuery);
router.get("/delsearch", authServices, runQuery);
router.post("/delsearch", authServices, runQuery);

//Fetch Api routes
router.get('/tasks/fetchApiFrontend', authServices, renderPage);
router.get('/details/:id', authServices, renderDetailsPage);

//Curd with ajax routes
router.get('/tasks/JobAppWithAjax', authServices, listEmp)
router.get('/Create', authServices, renderFrom)
router.get('/Update', authServices, renderUpdateFrom)
router.get('/getData', authServices, getupdateDataJson)
router.get('/test', authServices, test)
router.get('/cityfetch', authServices, cityfetch)
router.post('/submit', authServices, submitData)
router.post('/submitUpdate', authServices, subUpdateData)

//Specific Search routes
router.get('/studentlist', authServices, studentlist)
router.post('/studentlist', authServices, studentlist)
router.get("/tasks/SearchSpecific", authServices, studentlist);
//-----------------------------------------------------
router.get('/', renderRegister)
router.get('/passwordRender', renderPasspage)
router.get('/loginRender', renderlogin)
router.get('/ResetPass', renderFrgtPass)
router.get('/Home', authServices, renderHomePage)

router.post('/Register', registerUser)
router.post('/UpdateLink', updateLink)
router.post('/CreatePassword', enterPass)
router.post('/genereteForgotPass', genForgotPass)
router.post('/Login', userLogin)

module.exports = router;