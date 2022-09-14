const express = require('express')
const router = express.Router()
const useHandler = require("../router_handle/comment")
const expressJoi = require("@escook/express-joi")
const {comment_add,comment_id,comment_commentid,id_user} = require('../schema/comment')
router.post("/add",expressJoi(comment_add),useHandler.addComment)
router.get("/:idarticles",expressJoi(comment_id),useHandler.getComment)
router.get("/",useHandler.getIdComment)
router.get("/delete/:commentid",expressJoi(comment_commentid),useHandler.deleteComment)
//将路由共享出去
module.exports = router