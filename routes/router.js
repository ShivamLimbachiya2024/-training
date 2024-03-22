const express = require('express'); 
const {renderRegister,userLogin,registerUser,genForgotPass,renderFrgtPass,updateLink,renderPasspage,renderlogin,enterPass}=require('../controller/controller.js')
const router = express.Router(); 
router.get('/',renderRegister)
router.get('/passwordRender',renderPasspage)
router.get('/loginRender',renderlogin)
router.get('/ResetPass',renderFrgtPass)

router.post('/Register',registerUser)
router.post('/UpdateLink',updateLink)
router.post('/CreatePassword',enterPass)
router.post('/genereteForgotPass',genForgotPass)
router.post('/Login',userLogin)
module.exports = router;