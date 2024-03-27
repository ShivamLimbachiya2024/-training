const express = require('express');
const pageRouter = express.Router(); 
const {listFunc,orderFunc,homeFunc}=require('../../controller/pagecontroller/controller')
pageRouter.get('/tasks/PaginationAndSortingStu',homeFunc)
pageRouter.get('/list',listFunc);
pageRouter.get('/orderBy',orderFunc);
module.exports=pageRouter