const express = require('express'); 
const {listFunc,stulist,stuDetailResult}=require('../../controller/ReportContoller/controller');
const {authServices}=require('../../controller/controller')
const reportRouter = express.Router();
reportRouter.get('/tasks/AttendenceReport',authServices,listFunc)
reportRouter.get('/attenlist',authServices,listFunc)
reportRouter.get('/tasks/ExamReport',authServices,stulist)
reportRouter.get('/sturesult',authServices,stulist)
reportRouter.get('/Detail',authServices,stuDetailResult)
module.exports = reportRouter;