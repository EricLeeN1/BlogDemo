/**
 * Created by Eric on 2017/7/2.
 */
var prepage = 2,
    page = 1,
    pages = 0;

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
            renderComment(responseData.data.comments.reverse());
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
        renderComment(responseData.data.reverse());
    }
});

function renderComment(comments) {
    $("#comments-all-number").html(comments.length);
    var pages = Math.ceil(comments.length / prepage);
    var start = (page - 1) * prepage,
        end = start + prepage;

    var $lis = $('.pager li');
    $lis.eq(1).html(page + '/' + pages);
    var html = '';
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
    $("#media-list").html(html);
};

function formatDate(d) {
    var date1 = new Date(d);
    return date1.getFullYear() + '年' + (date1.getMonth() + 1) + '月' + date1.getDate() + '日' +
        date1.getHours() + ':' + date1.getMinutes() + ':' + date1.getSeconds();
}