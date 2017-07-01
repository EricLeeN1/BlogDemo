var express = require('express');
var router = express.Router();
var User = require('../models/User');
var Category = require('../models/Category');

// router.get('/user', (req, res, next) => {
//     res.send('ADMIN - User');
// });
router.use(function(req, res, next) {
    if (!req.userInfo.isAdmin) {
        //如果当前用户不是管理员
        res.send('对不起，只有管理员才可以进入后台管理');
        return;
    }
    next();
});
router.get('/', function(req, res, next) {
    res.render('admin/index', {
        userInfo: req.userInfo
    });
});
/*
 * 用户管理
 * */
router.get('/user', function(req, res) {
    /*
     * 数据库中读取所有的用户数据
     *
     * limit(Num):限制获取的数据条数
     *
     * skip(2):忽略数据的条数
     *
     * 每页显示2条
     * 1: 1-2 skip :0 -> (当前页数-1)*limit
     * 2: 3-4 skip :2
     * */
    var page = Number(req.query.page || 1);
    var limit = 4;

    var pages = 0;
    User.count().then(function(count) {
        // 计算总页数
        pages = Math.ceil(count / limit);
        //取值不能超过pages
        page = Math.min(page, pages);
        //取值不能小于1
        page = Math.max(page, 1);

        var skip = (page - 1) * limit;

        User.find().limit(limit).skip(skip).then(function(users) {
            // console.log(users);
            res.render('admin/user_index', {
                userInfo: req.userInfo,
                users: users,

                count: count,
                pages: pages,
                limit: limit,
                page: page
            });
        });
    });
});
/**
 * 分类首页
 * 
 */
router.get('/category', function(req, res) {
    var page = Number(req.query.page || 1);
    var limit = 10;

    var pages = 0;
    Category.count().then(function(count) {
        // 计算总页数
        pages = Math.ceil(count / limit);
        //取值不能超过pages
        page = Math.min(page, pages);
        //取值不能小于1
        page = Math.max(page, 1);

        var skip = (page - 1) * limit;
        /*
        1：升序
        -1：降序*/
        Category.find().sort({_id:-1}).limit(limit).skip(skip).then(function(categories) {
            // console.log(users);
            res.render('admin/category_index', {
                userInfo: req.userInfo,
                categories: categories,

                count: count,
                pages: pages,
                limit: limit,
                page: page
            });
        });
    })
});
/**
 * 添加分类
 */
router.get('/category/add', function(req, res) {
    res.render('admin/category_add', {
        userInfo: req.userInfo
    });
});
/**
 * 分类的保存
 */
router.post('/category/add', function(req, res) {
    // console.log(req.body.name);
    var name = req.body.name || '';
    if (name == '') {
        res.render('admin/error', {
            userInfo: req.userInfo,
            msg: '名称不能为空!'
        });
        return;
    }
    //数据库中是否已经存在同名分类名称
    Category.findOne({
        name: name
    }).then(function(rs) {
        if (rs) {
            //数据库中已经存在该分类了
            res.render('admin/error', {
                userInfo: req.userInfo,
                msg: '分类已经存在了'
            });
            return Promise.reject();
        } else {
            //数据库中不存在该分类。可以保存
            return new Category({
                name: name
            }).save();
        }
    }).then(function(newCategory) {
        res.render('admin/success', {
            userInfo: req.userInfo,
            msg: '分类保存成功',
            url: '/admin/category'
        });
    });
});
/*
* 分类修改
* */
router.get('/category/edit',function (req,res) {
   //获取要修改的分类的信息，并且用表单的形式展现出来
    var id = req.query.id || '';
    //获取要修改的分类信息
    Category.findOne({
        _id:id
    }).then(function (category) {
        if (!category) {
            res.render('admin/error',{
                userInfo:req.userInfo,
                msg:'分类信息不存在'
            });
        }else {
            res.render('admin/category_edit',{
                userInfo:req.userInfo,
                category:category
            });
        }
    });
});
/*
* 分类修改的保存
* */
router.post('/category/edit', function(req, res) {
    //获取要修改的分类的信息，并且用表单的形式展现出来
    var id = req.query.id || '';
    //获取post提交的名字
    var name = req.body.name || '';
    Category.findOne({
        _id: id
    }).then(function(category) {
        if (!category) {
            //数据库中不存在该分类
            res.render('admin/error', {
                userInfo: req.userInfo,
                msg: '分类信息不存在'
            });
            return Promise.reject();
        } else {
            //当用户没有做任何的修改提交的时候
            if (name == category.name) {
                res.render('admin/success', {
                    userInfo: req.userInfo,
                    msg: '修改成功',
                    url:'/admin/category'
                });
                return Promise.reject();
            }else {
                return Category.findOne({
                    _id:{$ne:id},
                    name:name
                });
            }
        }
    }).then(function(sameCategory) {
        if (sameCategory) {
            //数据库中已经存在该分类了
            res.render('admin/error', {
                userInfo: req.userInfo,
                msg: '数据库中已经存在同名分类'
            });
            return Promise.reject();
        }else{
            return Category.update({
                _id:id
            },{
                name:name
            });
        }
    }).then(function () {
        res.render('admin/success', {
            userInfo: req.userInfo,
            msg: '修改成功',
            url:'/admin/category'
        });
    });
});
/*
* 分类删除
* */
router.get('/category/delete',function (req,res) {
    //获取要删除的分类的信息，并且用表单的形式展现出来
    var id = req.query.id || '';
    Category.findOne({
        _id: id
    }).then(function (category) {
        if (!category) {
            //数据库中不存在该分类
            res.render('admin/error', {
                userInfo: req.userInfo,
                msg: '分类信息不存在'
            });
            return Promise.reject();
        }else {
            Category.remove({
                _id:id
            }).then(function () {
                res.render('admin/success', {
                    userInfo: req.userInfo,
                    msg: '删除成功',
                    url:'/admin/category'
                });
            });
        }
    });
});
module.exports = router;