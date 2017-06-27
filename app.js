// 应用程序的启动(入口)文件
//加载express模块
const express = require('express');
//加载模板处理模块
const swig = require('swig');
//创建app应用=>NodeJS http.createserver();
const app = express();

/**
 * 设置静态文件托管目录
 *  app.use('/public',express.static(__dirname+'/public'));
 *    当用户访问的URL以/public开始，那么直接返回对应__dirname+'/public'下的文件
 */
app.use('/public', express.static(__dirname + '/public'));
/**配置应用模板
 * 定义当前应用所使用的的模板引擎
 *  app.engine('html',swig.renderFile);
 *    第一个参数：末班引擎的名称，同时也是模板文件的后缀，第二个参数表示用于解析处理模板内容的方法；
 *  app.set('views', './views');
 *    设置模板文件存放的目录，第一个参数必须是views,第二个参数是目录
 *  app.set('view engine', 'html');
 *    注册所使用的的模板引擎，第一个参数必须是view engine,第二个参数和app.engine这个方法中定义的模板引擎的名称(第一个参数)是一致的
 *  swig.setDefaults({ cache: false });
 *    开发过程中，需要取消模板缓存的限制
 */
app.engine('html', swig.renderFile);
app.set('views', './views');
app.set('view engine', 'html');
swig.setDefaults({ cache: false });
/**
 * 首页
 *    req request对象
 *    res response对象
 *    next 函数
 */
app.get('/', (req, res, next) => {
    // res.send('<h1>欢迎光临我的博客</h1>');

    /**
     * 读取views目录下的指定文件，解析并返回给客户端
     *  第一个参数：表示模板的文件，相对于views目录 views/index.html
     *  第二个参数：传递给模板使用的数据
     * */
    res.render('index');
});
app.get('/main.css', (req, res, next) => {
    res.setHeader('content-type', 'text/css');
    res.send("body {background:red;}");
})


//监听http请求
app.listen(8081);

// 用户发送http请求->url->解析路由->找到匹配的规则->执行指定的绑定函数，返回对应内容值用户
// /public->静态->直接读取指定目录下的文件，返回给用户
// 动态->处理业务逻辑，加载模板，解析模板->返回数据给用户