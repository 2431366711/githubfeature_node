//注册函数
const bcrypt = require('bcryptjs')
const db = require('../db/index')
const config = require("../config")
const jwt = require("jsonwebtoken")

exports.register = (req,res)=>{

    const userinfo = req.body

    const db= require("../db/index")
    let sql = "select * from users where username=?"
    db.query(sql,[userinfo.username],function(err,results){
        if(err){
            return res.send({status:1,message:err.message})
        }
        if(results.length>0){
            return res.cc('用户名被占用，请更换其他用户名！')
        }
      userinfo.password = bcrypt.hashSync(userinfo.password,10)
       sql = 'insert into users set ?'
       db.query(sql,{username:userinfo.username,password:userinfo.password,nickname:userinfo.nickname,sex:userinfo.sex},function(err,results){
        if(err){
            return res.send({status:1,message:err.message})
        }
        if(results.affectedRows !==1){
            return res.send({status:1,message:'注册用户失败'})
        }
        res.send({status:0,message:'注册成功'})
    })
    })
    
   
}
//登录函数
exports.login = (req,res)=>{
    const userinfo = req.body
    const sql = `select * from users where username=?` 
    db.query(sql,userinfo.username,function(err,results){
        if(err) return res.cc(err)
        if(results.length!=1){
            return res.cc('登录失败')
        }
        const compareResult = bcrypt.compareSync(userinfo.password, results[0].password)
        if(!compareResult){
            return res.cc("登录失败")
        }
        const user = { ...results[0], password: ''}
        const tokenstr = jwt.sign(user,config.jwtSecretKey,{
            expiresIn:'10h'
        })
        res.send({
            status:0,
            message:'登录成功',
            token: 'Bearer '+tokenstr
        })

    })

}

exports.getArticle = (req,res)=>{
    let sql = 'select * from articles'
    db.query(sql,(err,results)=>{
        if(err) return res.cc(err)
        // if(results.length!==1) return res.cc('获取文章失败')
        res.send({
            status:0,
            message:'获取文章成功',
            data:results.reverse()
        })
    })
}

exports.getUserinfo = (req,res)=>{
    let sql = 'select * from users where id=?'
    db.query(sql,req.params.id,(err,results)=>{
        if(err) return res.cc(err)
        // if(results.length!==1) return res.cc('获取文章失败')
        res.send({
            status:0,
            message:'获取用户信息成功',
            data:results[0]
        })
    })
}

exports.getoneArticle = (req,res)=>{
    let sql = 'select * from articles where username=?'
    db.query(sql,req.params.username,(err,results)=>{
        if(err) return res.cc(err)
        // if(results.length!==1) return res.cc('获取文章失败')
        res.send({
            status:0,
            message:'获取文章成功',
            data:results.reverse()
        })
    })
}

exports.getidArticle = (req,res)=>{
    let sql = 'select * from articles where idarticles=?'
    db.query(sql,req.params.idarticles,(err,results)=>{
        if(err) return res.cc(err)
        // if(results.length!==1) return res.cc('获取文章失败')
        res.send({
            status:0,
            message:'获取文章成功',
            data:results[0]
        })
    })
}

exports.getidComment = (req,res)=>{
    let sql = 'select * from comment where idarticles=?'
    db.query(sql,req.params.idarticles,(err,results)=>{
        if(err) return res.cc(err)
        // if(results.length!==1) return res.cc('获取评论失败')
        res.send({
            status:0,
            message:'获取评论成功',
            data:results.reverse()
        })
    })
}