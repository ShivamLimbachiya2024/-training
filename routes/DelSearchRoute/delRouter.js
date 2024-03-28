const express = require('express'); 
const {authServices}=require('../../controller/controller')
const delRouter = express.Router();
const query = require("../../controller/Delimeterquery");
delRouter.get("/tasks/DelimeterSearch",authServices, query.runQuery);
delRouter.get("/",authServices, query.runQuery);
delRouter.post("/tasks/DelimeterSearch",authServices, query.runQuery);
delRouter.post("/",authServices, query.runQuery);
module.exports=delRouter

