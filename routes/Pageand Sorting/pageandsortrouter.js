const express = require('express');
const {authServices}=require('../../controller/controller')
const pageRouter = express.Router(); 
const {listFunc,orderFunc,homeFunc}=require('../../controller/pagecontroller/controller')
pageRouter.get('/tasks/PaginationAndSortingStu',authServices,homeFunc)
pageRouter.get('/list',authServices,listFunc);
pageRouter.get('/orderBy',authServices,orderFunc);
module.exports=pageRouter