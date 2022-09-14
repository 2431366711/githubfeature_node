const db = require('../db/index')
exports.addComment = (req,res)=>{
   const commentinfo ={
    iduser:req.user.id,
    idarticles:req.body.idarticles,
    content:req.body.content,
    date:new Date(),
    username:req.user.username,
    title:req.body.title
   }
   const sql = `insert into comment set ?`
   db.query(sql,commentinfo,(err,results)=>{
      if(err) return res.cc(err)
      if(results.affectedRows !==1) return res.cc('发布评论失败')
      res.send({
          status:0,
          message:'发布评论成功'
      })
  })
   
   
}

exports.deleteComment = (req,res)=>{
   const sql =   'DELETE FROM comment WHERE commentid=?'
   db.query(sql, req.params.commentid,(err,results)=>{
     if(err) return res.cc(err)
     
     res.send({
         status:0,
         message:'删除评论成功',
        
     })
 })
}

exports.getComment = (req,res)=>{
   const sql = `select * from comment where idarticles=?`
   db.query(sql,req.params.idarticles,(err,results)=>{
       if(err) return res.cc(err)
       if(results.length === 0 ) return res.cc('暂无内容')
       res.send({
           status:0,
           message:'获取评论成功',
           data:results.reverse()
       })
   })

}

exports.getIdComment = (req,res)=>{
    const sql = `select * from comment where iduser=?`
   db.query(sql,req.user.id,(err,results)=>{
       if(err) return res.cc(err)
       if(results.length === 0 ) return res.cc('暂无内容')
       res.send({
           status:0,
           message:'获取评论成功',
           data:results.reverse()
       })
   })
}