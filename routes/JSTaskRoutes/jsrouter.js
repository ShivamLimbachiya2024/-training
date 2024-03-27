const express = require('express');
const JSrouter = express.Router(); 
const {runeventsPrac,runDynamicTable,runkukuCube,runticTacToe}=require('../../controller/JSTaskController/controller')
JSrouter.get('/tasks/dynamicTable',runDynamicTable)
JSrouter.get('/tasks/eventsPrac',runeventsPrac)
JSrouter.get('/tasks/kukuCube',runkukuCube)
JSrouter.get('/tasks/ticTacToe',runticTacToe)
module.exports=JSrouter