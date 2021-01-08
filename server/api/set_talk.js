'use strict'

const express = require("express");
const moment = require("moment");
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
    //可以修改的参数有 content user_name
    if(req.body.content || req.body.user_name && req.body.id){
        
        next()
    }else{
        return res.send(return_obj.fail("104","缺少参数"));
    }
})

//业务处理
router.post("/",(req,res,next)=>{
    let param = {};
    let id = req.body.id;
    if(req.body.content){
        param.content = req.body.content
    }
    if(req.body.name){
        param.user_name = req.body.name
    }
    param.create_date = moment().format("YYYY-MM-DD hh-mm-ss");
    let sql = `
    update talk set ? where id_talk = ?
    `
    pool.query(sql,[param,id],(err,result,fields)=>{
        if(err){
            console.error(err);
            return res.send(return_obj.fail("200","调用数据库出错"));
        }
        if(result.affectedRows === 0){
            return res.send(return_obj.fail("201","找不到对应的说说"));
        }
        res.send(return_obj.success({
            'msg':"更新说说成功"
        }))
    })
    
})

module.exports = router;