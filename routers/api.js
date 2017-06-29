var express = require('express');
var router = express.Router();
var User = require('../models/User');

//统一返回格式
var responseData;
router.use(function(req, res, next) {
    responseData = {
        msgcode: 0,
        msg: ''
    };
    next();
});
/*
 * 用户注册
 *   注册逻辑
 *   1.用户名不能为空
 *   2.密码不能为空
 *   3.两次输入密码一致
 *   4.邮箱格式正确
 *   5.电话号码格式正确
 *
 *   1.用户名是否已经被注册
 *      数据库查询
 * */
router.post('/user/register', function(req, res, next) {
    // res.send('API - User');
    // console.log(req.body);
    var username = req.body.username;
    var password = req.body.password;
    var repassword = req.body.repassword;
    var email = req.body.email;
    var phone = req.body.phone;
    //用户是否为空
    if (username == '') {
        responseData.msgcode = 1;
        responseData.msg = '用户名不能为空';
        res.json(responseData);
        return;
    }
    //密码不能为空
    if (password == '') {
        responseData.msgcode = 2;
        responseData.msg = '密码不能为空';
        res.json(responseData);
        return;
    }
    //两次输入密码是否一致
    if (password != repassword) {
        responseData.msgcode = 3;
        responseData.msg = '两次输入密码不一致';
        res.json(responseData);
        return;
    }
    //邮箱格式是否正确
    if (email == '') {
        responseData.msgcode = 4;
        responseData.msg = '邮箱格式不正确';
        res.json(responseData);
        return;
    }
    //手机号码格式是否正确
    if (phone == '') {
        responseData.msgcode = 5;
        responseData.msg = '手机号码格式不正确';
        res.json(responseData);
        return;
    }
    //用户名是否已经被注册了，如果数据库中已经存在和我们要注册的同名的数据，表示该用户已经被注册了
    User.findOne({
        username: username
    }).then(function(userInfo) {
        console.log('11' + userInfo);
        if (userInfo) {
            //表示数据库中有该记录
            responseData.msgcode = 6;
            responseData.msg = '用户名已经被注册了';
            res.json(responseData);
            return;
        }
        //保存用户注册的信息到数据库中
        // console.log(typeof username);
        // console.log(typeof password);
        var user = new User({
            username: username,
            password: password,
        });
        console.log("user" + user);
        return user.save();
    }).then(function(newUserInfo) {
        console.log('新信息:' + newUserInfo);
        responseData.msg = '注册成功';
        res.json(responseData);
    });
});
module.exports = router;