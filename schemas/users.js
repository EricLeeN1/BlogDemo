const mongoose = require('mongoose');
//定义一个用户的表结构
const Schema = mongoose.Schema;

new mongoose.Schema({
    //用户名
    username: String,
    //密码
    password: String
})