const express = require('express');
const {authServices}=require('../../controller/controller')
const {runtask1,runtask2,runtask3}=require('../../controller/CssController/controller')
const cssrouter = express.Router(); 
cssrouter.get('/tasks/css1',authServices,runtask1)
cssrouter.get('/tasks/css2',authServices,runtask2)
cssrouter.get('/tasks/css3',authServices,runtask3)
module.exports=cssrouter