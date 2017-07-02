const express = require('express');
const router = express.Router();
const Category = require('../models/Category');
const Content = require('../models/Content');


/**
 * 
 */
router.get('/', function(req, res, next) {

    var data = {
        page: Number(req.query.page || 1),
        category: req.query.category || '',
        limit: 2,
        pages: 0,
        count: 0,
        userInfo: req.userInfo,
        categories: []
    };
    var where = {};
    if (data.category) {
        where.category = data.category;
    }
    //读取所有的分类信息
    Category.find().then(function(categories) {
        data.categories = categories;
        return Content.where(where).count();
    }).then(function(count) {
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
    }).then(function(contents) {
        data.contents = contents;
        res.render('main/index', data);
    });
});
module.exports = router;