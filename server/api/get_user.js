'use strict'

const express = require("express");
const async = require("async");
const verify_login = require("../middleware/verify_login");
const verify_no_login = require("../middleware/verify_no_login");
const return_obj = require("../tool/return_obj");
const pool = require("../tool/pool");

const router = express.Router();


//验证登录
router.get("/",verify_login);


//参数检查
router.get("/",(req,res,next)=>{
    next()
})

//业务处理
router.get("/",(req,res,next)=>{
    let name = "%"
    if(req.query.name){
        name = "%" + req.query.name + "%"
    }
    let sql = `
        select * from user 
        where
            name like ?
    `
    pool.query(sql,[name],(err,result,fileds)=>{
        if(err){
            console.error(err);
            return res.send(return_obj.fail("200","调用数据库出错"));
        }
        return res.send(return_obj.success({
            "msg":"获取用户信息成功",
            "data":result
        }))
    })
})

module.exports = router;