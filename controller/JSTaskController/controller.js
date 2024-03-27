const runDynamicTable=(req,res)=>{
    res.render('JSViews/DynamicTable')
}
const runeventsPrac=(req,res)=>{
    res.render('JSViews/eventsPrac')
}
const runkukuCube=(req,res)=>{
    res.render('JSViews/kukuCube')
}
const runticTacToe=(req,res)=>{
    res.render('JSViews/ticTacToe')
}
module.exports={runeventsPrac,runDynamicTable,runkukuCube,runticTacToe}