// 应用程序的启动(入口)文件
//加载express模块
const express = require('express');
//创建app应用=>NodeJS http.createserver();
const app = express();

/**
 * 首页
 *    req request对象
 *    res response对象
 *    next 函数
 */
app.get('/', (req, res, next) => {
    res.send('<h1>欢迎光临我的博客</h1>');
})


//监听http请求
app.listen(8081);