
const db = require('../db/index')
exports.addArticle = (req, res) => { 
   
    const articleinfo ={
        ...req.body,
        date:new Date(),
        username:req.user.username,
        userid:req.user.id
    }
    const sql = `insert into articles set ?`
 
    db.query(sql,articleinfo,(err,results)=>{
        if(err) return res.cc(err)
        if(results.affectedRows !==1) return res.cc('发布文章失败')
        res.send({
            status:0,
            message:'发布文章成功'
        })
    })
}

exports.getMyArticle = (req,res)=>{
    const username = req.user.username
    const sql = `select * from articles where username=?`
    db.query(sql,username,(err,results)=>{
        if(err) return res.cc(err)
        if(results.length === 0 ) return res.cc('暂无内容')
        res.send({
            status:0,
            message:'获取用户文章成功',
            data:results.reverse()
        })
    })
}

exports.getIdArticle = (req,res)=>{

    const sql = `select * from articles where idarticles=?`
    db.query(sql, req.params.idarticles,(err,results)=>{
        if(err) return res.cc(err)
        if(results.length === 0 ) return res.cc('暂无内容')
        res.send({
            status:0,
            message:'获取用户文章成功',
            data:results[0]
        })
    })
}

exports.deleteArticle = (req,res)=>{
    let sql =   'DELETE FROM comment WHERE idarticles=?'
    db.query(sql, req.params.idarticles,(err,results)=>{
        if(err) return res.cc(err)
        
  sql =   'DELETE FROM articles WHERE idarticles=?'
  db.query(sql, req.params.idarticles,(err,results)=>{
    if(err) return res.cc(err)
    
    res.send({
        status:0,
        message:'删除用户文章成功',
       
    })
})


    })
    
      
   


}