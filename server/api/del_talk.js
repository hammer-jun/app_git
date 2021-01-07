'use strict'

const express = require("express");
const async = require("async");
const verify_login = require("../middleware/verify_login");
const verify_no_login = require("../middleware/verify_no_login");
const return_obj = require("../tool/return_obj");
const pool = require("../tool/pool");

const router = express.Router();


//验证登录
router.post("/",verify_login);

//参数检查
router.post("/",(req,res,next)=>{
    if(req.body.id){
        return next()
    }
    return res.send(return_obj.fail("104","输入不正确"));
})

//业务处理
router.post("/",(req,res,next)=>{
    let id = req.body.id;
    let sql = `
    delete from article where id_article = ?
    `
    pool.query(sql,[id],(err,result,fields)=>{
        if(err){
            console.error(err);
            return res.send(return_obj.fail("200","调用数据库出错"));
        }
        console.log(result);
        if(result.affectedRows === 0){
            return res.send(return_obj.fail("201","找不到说说"));
        }else{
            return res.send(return_obj.success({
                "msg":"删除说说成功"
            }))
        }
    })
})

module.exports = router;