const joi = require('joi');
const username = joi.string().alphanum().min(3).max(10).required()
const idarticles = joi.number().integer().min(1).required()
const iduser = joi.number().integer().min(1).required()
const content = joi.string().required()
const title = joi.string().required()
const commentid = joi.number().integer().min(1).required()
const comment_add = {
    body:{
        content,
        idarticles,
        title
    }
}
const comment_id = {
    params:{
        idarticles
    }
}
const comment_commentid = {
    params:{
        commentid
    }
}
const id_user = {
    params:{
        iduser
    }
}
module.exports = {
    comment_add,comment_id,comment_commentid,id_user
}