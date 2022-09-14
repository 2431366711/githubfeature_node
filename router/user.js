const express = require('express')
const router = express.Router()
const useHandler = require("../router_handle/user")
const expressJoi = require("@escook/express-joi")
const {reg_login_schmea,reg_login_schema1,uerinfo_id,article_username} = require("../schema/user")
const {get_idarticles} = require('../schema/article')
//注册
router.post("/register",expressJoi(reg_login_schmea),useHandler.register)
//登录
router.post("/login",expressJoi(reg_login_schema1),useHandler.login)
//拿去文章
router.get("/article",useHandler.getArticle)
router.get("/userinfo/:id",expressJoi(uerinfo_id),useHandler.getUserinfo)
router.get("/article/:username",expressJoi(article_username),useHandler.getoneArticle)
router.get("/article/id/:idarticles",expressJoi(get_idarticles),useHandler.getidArticle)
router.get("/comment/id/:idarticles",expressJoi(get_idarticles),useHandler.getidComment)
//将路由共享出去
module.exports = router