# 博客系统案例

## (1)、后台功能需求分析

    一、登录
    二、分类管理
      1.分类列表
      2.添加分类
      3.修改分类
      4.删除分类
      5.查看分类下所有博文
    三、内容管理
      1.内容列表
        1).所有内容
        2).按分类查看
      2.添加内容
      3.修改内容
      4.删除内容
      5.查看内容下的所有评论
    四、评论管理
      1.评论列表
        1).所有评论
        2).查看指定博文的评论
      2.删除评论

## (2)、技术框架

    NodeJS
    Express
    Mongodb
    第三方模块&&中间件
      bodyParser:解析post请求数据
      cookies:读/写cookie
      swig:模板解析引擎
      mongoose:操作mongodb数据
      markdown:markdown语法解析生成模块

## 项目结构分析

### 目录结构

    db--数据库存储目录
    models--数据库模型文件目录
    public--公共文件目录(css/js/images...)
    routers--路由文件目录
    schemas--数据库结构文件(schemas)目录
    views--模板视图文件目录
    app.js--应用(启动)入口文件