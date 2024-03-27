const express = require('express');
const {runtask1,runtask2,runtask3}=require('../../controller/CssController/controller')
const cssrouter = express.Router(); 
cssrouter.get('/tasks/css1',runtask1)
cssrouter.get('/tasks/css2',runtask2)
cssrouter.get('/tasks/css3',runtask3)
module.exports=cssrouter