const express = require('express'); 
const {renderHomePage,renderDetailsPage}=require('../../controller/fetchApiController/controller');
const {authServices}=require('../../controller/controller')
const frontRouter = express.Router();
frontRouter.get('/tasks/fetchApiFrontend',authServices,renderHomePage);
frontRouter.get('/details/:id',authServices,renderDetailsPage);
module.exports = frontRouter;