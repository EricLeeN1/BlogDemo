/**
 * Created by Administrator on 2017/6/28.
 */
$(function() {
    var $loginForm = $('#loginForm');
    var $registerForm = $('#registerForm');
    var $userInfo = $('#userInfo');
    //切换到注册面板
    $loginForm.find('a.text-info').on('click', function() {
        $registerForm.show();
        $loginForm.hide();
    });
    //切换到登录面板
    $registerForm.find('a.text-info').on('click', function() {
        $loginForm.show();
        $registerForm.hide();
    });
    //注册
    $registerForm.find('button.btn').on('click', function() {
        //通过ajax提交请求
        $.ajax({
            url: '/api/user/register',
            type: 'POST',
            data: {
                username: $registerForm.find('input[name="user-reg"]').val(),
                password: $registerForm.find('input[name="pass-reg"]').val(),
                repassword: $registerForm.find('input[name="pass2-reg"]').val(),
                email: $registerForm.find('input[name="email-reg"]').val(),
                phone: $registerForm.find('input[name="phone-reg"]').val()
            },
            dataType: 'json',
            success: function(result) {
                console.log(result);
                if (result.msgcode == 0) {
                    //注册成功
                    $registerForm.find('h4.text-center').removeClass('text-danger').addClass('text-success').html(result.msg);
                    setTimeout(function() {
                        $loginForm.show();
                        $registerForm.hide();
                    }, 1000);
                } else {
                    $registerForm.find('h4.text-center').removeClass('text-success').addClass('text-danger').html(result.msg);
                }
            }
        })
    });
    //登录
    $loginForm.find('button.btn').on('click', function() {
        $.ajax({
            type: 'POST',
            url: '/api/user/login',
            data: {
                username: $loginForm.find('input[name="user"]').val(),
                password: $loginForm.find('input[name="pass"]').val(),
                email: $loginForm.find('input[name="email"]').val(),
                phone: $loginForm.find('input[name="phone"]').val()
            },
            dataType: 'json',
            success: function(result) {
                console.log(result);
                if (!result.msgcode) {
                    //登陆成功
                    $loginForm.find('h4.text-center').removeClass('text-danger').addClass('text-success').html(result.msg);
                    //显示登录用户的信息
                    setTimeout(function() {
                        $registerForm.hide();
                        $loginForm.hide();
                        $userInfo.attr('data-id', result.userInfo._id)
                        $userInfo.find('h2').html('<small>用户名称:' + result.userInfo.username + '</small>');
                        $userInfo.find('h2+p').html('你好,欢迎光临我的博客!');
                        $userInfo.show();
                    }, 1000);
                }else {
                    $loginForm.find('h4.text-center').removeClass('text-success').addClass('text-danger').html(result.msg);
                }
            }
        });
    });
});