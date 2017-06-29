var mongoose = require('mongoose');
//定义一个用户的表结构
// var Schema = mongoose.Schema;

module.exports = new mongoose.Schema({
    //用户名
    username: String,
    //密码
    password: String,

    // //email
    // email: string,

    // //phone
    // phone: string
});