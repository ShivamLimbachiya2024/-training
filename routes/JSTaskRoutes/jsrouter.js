const express = require('express');
const {authServices}=require('../../controller/controller')
const JSrouter = express.Router(); 
const {runeventsPrac,runDynamicTable,runkukuCube,runticTacToe}=require('../../controller/JSTaskController/controller')
JSrouter.get('/tasks/dynamicTable',authServices,runDynamicTable)
JSrouter.get('/tasks/eventsPrac',authServices,runeventsPrac)
JSrouter.get('/tasks/kukuCube',authServices,runkukuCube)
JSrouter.get('/tasks/ticTacToe',authServices,runticTacToe)
module.exports=JSrouter