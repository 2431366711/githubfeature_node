const joi = require('joi');
const username = joi.string().alphanum().min(3).max(10).required()
const nickname = joi.string().alphanum().min(3).max(10).required()
const password = joi.string().required().pattern(/^[\S]{6,12}$/)
const sex = joi.required()
const emloyee = joi.string()
const company = joi.string()
const emial = joi.string().email()
const phone = joi.string()
const github = joi.string()
const weixin = joi.string()
const introduction = joi.string()
const id = joi.number().integer().min(1).required()
const image = joi.string().required()
const reg_login_schmea = {
    body:{
        username,
        password,
        nickname,
        sex
    }
}
const reg_login_schema1 ={
    body:{
        username,
        password
    }
}
const reg_user_content = {
     body:{
        username,
        nickname,
        emloyee,
        github,
        company,
        weixin,
        emial,
        phone,
        introduction
     }
}
const user_password ={
    oldpassword : password,
    newpassword : joi.not(joi.ref('oldPwd')).concat(password)

} 
const uerinfo_id = {
    params:{
        id
    }
}
const article_username = {
    params:{
        username
    }
}
const user_image = {
    body:{
        image
    }
}
module.exports = {
    reg_login_schmea ,
    reg_login_schema1,
    reg_user_content,
    user_password,
    uerinfo_id,
    article_username,
    user_image
}