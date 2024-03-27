const express = require('express'); 
const {listFunc,stulist,stuDetailResult}=require('../../controller/ReportContoller/controller')
const reportRouter = express.Router();
reportRouter.get('/tasks/AttendenceReport',listFunc)
reportRouter.get('/attenlist',listFunc)
reportRouter.get('/tasks/ExamReport',stulist)
reportRouter.get('/sturesult',stulist)
reportRouter.get('/Detail',stuDetailResult)
module.exports = reportRouter;