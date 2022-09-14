const express = require('express')
const app = express()
//配置跨域问题
const cors = require('cors')
app.use(cors())
const bodyparse= require("body-parser")
app.use(bodyparse.urlencoded({extended:false}))
app.use(bodyparse.json())
//配置解析表单数据的中间件
app.use(express.urlencoded({ extended: false }))


app.use(function(req,res,next){
    res.cc=function(err,status=1){
        res.send({
            status,
            message:err instanceof Error ?err.message:err
        })
    }
    next()
})


const expressJWT = require('express-jwt')
const config = require('./config')

app.use(expressJWT({ secret: config.jwtSecretKey }).unless({ path: [/^\/api/] }))




//导入注册用户路由模块
const useRouter = require("./router/user")
app.use('/api',useRouter)
const userinfoRouter = require('./router/userinfo')
app.use('/my', userinfoRouter)
const articleRouter = require('./router/article')
app.use('/my/article', articleRouter)
const commentRoute = require('./router/comment')
app.use('/my/comment', commentRoute)


const joi = require('joi');
app.use(function(err,req,res,next){
    if(err instanceof joi.ValidationError){
        return res.cc(err)
    }
    if (err.name === 'UnauthorizedError') return res.cc('身份认证失败！')
    res.cc(err)
})


app.listen(3007,function(){
    console.log('api server running at http://127.0.0.1:3007')
})