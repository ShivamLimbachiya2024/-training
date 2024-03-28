const express = require('express'); 
const {listEmp,renderFrom,test,cityfetch,submitData,subUpdateData,renderUpdateFrom,getupdateDataJson}=require('../../controller/AjaxCurdContorller/controller')
const ajaxcurdRouter = express.Router();
const {authServices}=require('../../controller/controller') 
ajaxcurdRouter.get('/tasks/JobAppWithAjax',authServices,listEmp)
ajaxcurdRouter.get('/Create',authServices,renderFrom)
ajaxcurdRouter.get('/Update',authServices,renderUpdateFrom)
ajaxcurdRouter.get('/getData',authServices,getupdateDataJson)
ajaxcurdRouter.get('/test',authServices,test)
ajaxcurdRouter.get('/cityfetch',authServices,cityfetch)
ajaxcurdRouter.post('/submit',authServices,submitData)
ajaxcurdRouter.post('/submitUpdate',authServices,subUpdateData)
module.exports = ajaxcurdRouter;