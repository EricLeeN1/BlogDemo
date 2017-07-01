var mongoose = require('mongoose');
//定义一个分类的表结构
// var Schema = mongoose.Schema;

module.exports = new mongoose.Schema({

    //关联字段-分类的id
    category:{
        //类型
        type:mongoose.Schema.Types.ObjectId,
        //引用
        ref:'Content'
    },
    //内容标题
    title: String,

    //简介
    description:{
        type:String,
        default:''
    },

    //内容
    content:{
        type:String,
        default:''
    }
});