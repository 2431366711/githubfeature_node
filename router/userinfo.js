const express = require('express')
const router = express.Router()
const userinfo_handle = require("../router_handle/userinfo")
const expressJoi = require("@escook/express-joi")
const {reg_user_content,user_password,user_image} = require("../schema/user")
//获取user信息
router.get("/userinfo",userinfo_handle.getUserinfo)
//提交user信息
router.post("/updateuserinfo",expressJoi(reg_user_content),userinfo_handle.updateUserinfo)
//修改密码
router.post('/updatepwd', expressJoi(user_password),userinfo_handle.updatePassword)
router.post("/image",expressJoi(user_image),userinfo_handle.addImage)

//将路由共享出去
module.exports = router