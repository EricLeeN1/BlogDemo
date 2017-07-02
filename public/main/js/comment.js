/**
 * Created by Eric on 2017/7/2.
 */
/*提交*/
$("#comments-submit").on('click', function () {
    $.ajax({
        type: 'POST',
        url: '/api/comment/post',
        data: {
            contentid: $("#content-id").val(),
            content: $("#message-count").val()
        },
        success: function (responseData) {
            $("#media-list").val('');
            renderComment(responseData.data.comments.reverse());
        }
    })
});
function renderComment(comments) {
    var html = '';
    for (var i = 0; i < comments.length; i++) {
        html += '<li class="media">' +
            '<div class="media-left">' +
            '<a href="#">' +
            '<img class="media-object" style="height: 64px;width: 64px;background-color:#999;" src=""alt="...">' +
            '</a>' +
            '</div>' +
            '<div class="media-body">' +
            '<h4 class="media-heading clearfix">' + comments[i].username +
            '<small class="pull-right">' + comments[i].postTime + '</small>' +
            '</h4>' +
            '<P>' + comments[i].content + '</P>' +
            '</div>' +
            '</li>';
    }
    $("#media-list").html(html);
}