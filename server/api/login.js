const express = require("express");
const verify_login = require("../middleware/verify_login.js")
const verify_no_login = require("../middleware/verify_no_login.js");
const return_obj = require("../tool/return_obj.js");
const router = express.Router();

//使用登录状态验证中间件
router.post("/", verify_no_login);

//进行参数检查
router.post("/", function (req, res, next) {
    if ("name" in req.body && "password" in req.body) {
        var name_reg = new RegExp("^[\u4E00-\u9FA5A-Za-z0-9_]{2,18}$")
        var password_reg = new RegExp("^[a-zA-Z0-9]{6,18}$")
        if (name_reg.test(req.body.name) && password_reg.test(req.body.password)) {
            next();
        } else {
            res.send(return_obj.fail("101", "输入错误"));
        }
    } else {
        res.send(return_obj.fail("100", "缺少输入"))
    }
})

//查询数据库
router.post("/", function (req, res) {
    if (req.body.name === 'root') {
        if (req.body.password === '123456') {
            req.session.is_login = true;
            req.session.name = req.body.name;
            return res.send(return_obj.success({
                msg: "登录成功",
                name: req.body.name
            }));
        } else {
            return res.send(return_obj.fail("105", "用户账号密码不正确"));
        }
    } else {
        return res.send(return_obj.fail("104", "用户名不存在"));
    }
})

module.exports = router;