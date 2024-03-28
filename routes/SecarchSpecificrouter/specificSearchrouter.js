const express = require('express'); 
const {authServices}=require('../../controller/controller')
const spfSearchRouter = express.Router();
const query = require("../../controller/SpecificSearchquery");
spfSearchRouter.get("/tasks/SearchSpecific",authServices, query.runQuery); 
spfSearchRouter.get("/input",authServices, query.runQuery); 
spfSearchRouter.post("/tasks/SearchSpecific",authServices, query.runQuery);
spfSearchRouter.post("/input",authServices, query.runQuery);
module.exports=spfSearchRouter