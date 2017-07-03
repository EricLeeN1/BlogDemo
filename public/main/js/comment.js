/**
 * Created by Eric on 2017/7/2.
 */
var prepage = 2,
    page = 1,
    pages = 0,
    comments=[];

/*提交*/
$("#comments-submit").on('click', function() {
    $.ajax({
        type: 'POST',
        url: '/api/comment/post',
        data: {
            contentid: $("#content-id").val(),
            content: $("#message-count").val()
        },
        success: function(responseData) {
            $("#media-list").val('');
            comments = responseData.data.comments.reverse();
            renderComment();
        }
    })
});

/**
 * 每次页面重载的时候获取一下该文章的所有评论 
 */
$.ajax({
    url: '/api/comment',
    data: {
        contentid: $("#content-id").val()
    },
    success: function(responseData) {
        comments = responseData.data.reverse();
        renderComment();
    }
});
$('.pager').delegate('a','click',function () {
    if ($(this).parent().hasClass('previous')) {
        page--;
    }else {
        page++;
    }
    renderComment();
});
function renderComment() {

    $("#comments-all-number").html(comments.length);
    pages = Math.max(Math.ceil(comments.length / prepage),1);
    var start = Math.max(0,((page - 1) * prepage)),
        end = Math.min(start + prepage,comments.length);

    var $lis = $('.pager li');
    var html = '';
    $lis.eq(1).html(page + '/' + pages);
    if (page<=1) {
        page=1;
        $lis.eq(0).html('<span>没有上一页了</span>');
    }else{
        $lis.eq(0).html('<a href="javascript:;"><span aria-hidden="true">&larr;</span>上一页</a>');
    }
    if (page>=pages) {
        page=pages;
        $lis.eq(2).html('<span>没有下一页了</span>');
    }else{
        $lis.eq(2).html('<a href="javascript:;"><span aria-hidden="true">&rarr;</span>下一页</a>')
    }
    if (comments.length==0) {
       html = '<li class="text-warning">还没有留言!</li>';
    }else{
        for (var i = start; i < end; i++) {
            html += '<li class="media">' +
                '<div class="media-left">' +
                '<a href="#">' +
                '<img class="media-object" style="height: 64px;width: 64px;background-color:#999;" src=""alt="...">' +
                '</a>' +
                '</div>' +
                '<div class="media-body">' +
                '<h4 class="media-heading clearfix">' + comments[i].username +
                '<small class="pull-right">' + formatDate(comments[i].postTime) + '</small>' +
                '</h4>' +
                '<P>' + comments[i].content + '</P>' +
                '</div>' +
                '</li>';
        }
    }
    $("#media-list").html(html);
};

function formatDate(d) {
    var date1 = new Date(d);
    return date1.getFullYear() + '年' + (date1.getMonth() + 1) + '月' + date1.getDate() + '日' +
        date1.getHours() + ':' + date1.getMinutes() + ':' + date1.getSeconds();
}