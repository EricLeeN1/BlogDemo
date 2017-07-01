const express = require('express');
const router = express.Router();
const Category = require('../models/Category');

router.get('/', function(req, res, next) {

    //读取所有的分类信息
    Category.find().then(function (categories) {
        res.render('main/index', {
            userInfo: req.userInfo,
            categories:categories
        });
    });
});
module.exports = router;