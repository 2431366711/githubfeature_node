const joi = require('joi')
const title = joi.string().required()
const content = joi.string().required()
const type = joi.string().required()
const idarticles = joi.number().integer().min(1).required()
const username = joi.string().required()
const add_article_schema = {
    body:{
        title,
        content,
        type
    }
}
const get_idarticles=  {
    params: { idarticles, },
}
const get_username=  {
    params: { username, },
}
const post_idarticle = {
    body:{
        idarticles
    }
}
module.exports = {add_article_schema,
    get_idarticles,get_username,post_idarticle}