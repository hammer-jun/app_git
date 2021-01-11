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
router.post("/",(req,res,next)=>
{
    if(req.body.name != undefined &&
        req.body.password != undefined)
        {
        next()
    }else{
        return res.send(return_obj.fail("104","缺少参数"))
    }
})

//业务处理
router.post("/",(req,res,next)=>
{
    let name = req.body.name;
    let password = req.body.password;
    let sql = `
        update user set password = ? where name = ?
    `
    pool.query(sql,[password,name],(err,result,fileds)=>
    {
        if(err){
            console.error(err);
            return res.send(return_obj.fail("200","调用数据库发生错误"));
        }
        if(result.affectedRows === 0)
        {
            return res.send(return_obj.fail("201","找不到对应的用户"));
        }
        res.send(return_obj.success(
            {
            'msg':"更新用户信息成功"
        }))
    })
})

module.exports = router;