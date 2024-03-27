const express = require('express'); 
const delRouter = express.Router();
const query = require("../../controller/Delimeterquery");
delRouter.get("/tasks/DelimeterSearch", query.runQuery);
delRouter.get("/", query.runQuery);
delRouter.post("/tasks/DelimeterSearch", query.runQuery);
delRouter.post("/", query.runQuery);
module.exports=delRouter

