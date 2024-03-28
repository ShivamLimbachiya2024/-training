const express = require('express'); 
const {authServices}=require('../../controller/controller')
const {studentlist}=require('../../controller/SpecificSearchquery')
const spfSearchRouter = express.Router();
const query = require("../../controller/SpecificSearchquery");
spfSearchRouter.get('/studentlist',authServices,studentlist)
spfSearchRouter.post('/studentlist',authServices,studentlist)
spfSearchRouter.get("/tasks/SearchSpecific",authServices, studentlist); 
spfSearchRouter.post("/tasks/SearchSpecific",authServices, studentlist);
module.exports=spfSearchRouter