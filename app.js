// 应用程序的启动(入口)文件
//加载express模块
var express = require('express');
//创建app应用=>NodeJS http.createserver();
var app = express();

//监听http请求
app.listen(8081);