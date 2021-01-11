'use strict'

const express = require("express");
const async = require("async");
const verify_login = require("../middleware/verify_login");
const verify_no_login = require("../middleware/verify_no_login");
const return_obj = require("../tool/return_obj");
const pool = require("../tool/pool");

const router = express.Router();

//检验登录
router.post("/",verify_login);

//参数检查
router.post("/",(req,res,next)=>
{
    if(req.body.name  != undefined &&
        req.body.password != undefined)
        {
        next();
    }else{
        return res.send(return_obj.fail("100","输入不正确"));
    }
})

//业务处理
router.post("/",(req,res,next)=>
{
    let name = req.body.name;
    let password = req.body.password;
    let sql = `
        insert into user(name,password) value(?,?)
    `
    pool.query(sql,[name,password],(err,result,fileds)=>
    {
        if(err){
            console.error(err);
            return res.send(return_obj.fail("200","数据库请求错误"));
        }
        console.log(result);
        return res.send(return_obj.success(
            {
            "msg":"添加新用户成功"
        }))
    })
})

module.exports = router;