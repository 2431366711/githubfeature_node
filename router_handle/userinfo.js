const db = require('../db/index')
exports.getUserinfo = function(req,res){
    const sql = `select * from users where id=?`
    db.query(sql,req.user.id,(err,results)=>{
        if(err) return res.cc(err)
        if(results.length !==1) return res.cc('获取用户信息失败')
        res.send({
            status:0,
            message:'获取用户基本信息成功',
            data:results[0]
        })
    })
}

exports.updateUserinfo = (req,res)=>{
    const sql = `update users set ? where username=?`
    db.query(sql,[req.body,req.body.username],(err,results)=>{
        if(err) return res.cc(err)
        if(results.affectedRows !==1) return res.cc('修改用户基本信息失败')
        res.send({
            status:0,
            message:'修改用户基本信息成功'
        })
    })

}

exports.updatePassword =  (req,res)=>{
   let sql = 'select * from users where id=?'
   db.query(sql,req.user.id,(err,results)=>{
    if(err) return res.cc(err)
    if(results.length!==1) return res.cc('用户不存在')
    const bcrypt = require("bcryptjs")
    const compareResult = bcrypt.compareSync(req.body.oldpassword,results[0].password)
    if(!compareResult) return res.cc('原密码错误')
    sql = `update users set password=? where id=?`
    const newpassword = bcrypt.hashSync(req.body.newpassword,10)
    db.query(sql,[newpassword,req.user.id],(err,results)=>{
        if(err) return res.cc(err)
        if(results.affectedRows!==1) return res.cc("更新密码失败")
        res.send({
            status:0,
            message:'更新密码成功'
        })
    })
   })

}


exports.addImage = (req,res)=>{
    let sql = 'update users set image=? where id=?'
    db.query(sql,[req.body.image,req.user.id],(err,results)=>{
        if(err) return res.cc(err)
        if(results.affectedRows!==1) return res.cc("更新图片失败")
        res.send({
            status:0,
            message:'更新图片成功'
        })
    })
}
