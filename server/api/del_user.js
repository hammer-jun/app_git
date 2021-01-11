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
    if(req.body.name  != undefined )
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
    let sql = `
        delete from user where name = ?
    `
    pool.query(sql,[name],(err,result,fileds)=>
    {
        if(err){
            console.error(err);
            return res.send(return_obj.fail("200","数据库请求错误"));
        }
        console.log(result);
        if(result.affectedRows === 0)
        {
            return res.send(return_obj.fail("201","不存在该用户"));
        }else{
            return res.send(return_obj.success(
                {
                "msg":"删除用户成功"
            }))
        }
    })
})

module.exports = router;