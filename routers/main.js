const express = require('express');
const router = express.Router();
const Category = require('../models/Category');
const Content = require('../models/Content');
const User = require('../models/User');
var data = {};

/**
 *处理通用数据
 */
router.use(function (req, res, next) {
    data = {
        userInfo: req.userInfo,
        categories: []
    };
    Category.find().then(function (categories) {
        data.categories = categories;
        next();
    })
});

router.get('/', function (req, res, next) {

    data.page = Number(req.query.page || 1);
    data.category = req.query.category || '';
    data.limit = 10
    data.pages = 0;
    data.count = 0;
    var where = {};
    if (data.category) {
        where.category = data.category;
    }
    //读取所有的分类信息
    Content.where(where).count().then(function (count) {
        data.count = count;
        // 计算总页数
        data.pages = Math.ceil(data.count / data.limit);
        //取值不能超过pages
        data.page = Math.min(data.page, data.pages);
        //取值不能小于1
        data.page = Math.max(data.page, 1);

        var skip = (data.page - 1) * data.limit;
        return Content.where(where).find().limit(data.limit).skip(skip).populate(['category', 'user']).sort({
            addTime: -1
        });
    }).then(function (contents) {
        data.contents = contents;
        res.render('main/index', data);
    });
});
router.get('/view', function (req, res) {
    var contentId = req.query.contentid || '';
    Content.findOne({
        _id: contentId
    }).then(function (content) {
        data.content = content;
        content.views++;
        content.save();
        User.findOne({
            _id:data.content.user
        }).then(function (userInfo) {
            data.content.user = userInfo;
            res.render('main/view', data);
        });
    })
});
module.exports = router;