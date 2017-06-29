/**
 * Created by Administrator on 2017/6/28.
 */
$(function () {
   var $loginForm = $('#loginForm');
   var $registerForm = $('#registerForm');
   //切换到注册面板
   $loginForm.find('a.text-info').on('click',function () {
       $registerForm.show();
       $loginForm.hide();
   });
   //切换到登录面板
    $registerForm.find('a.text-info').on('click',function () {
        $loginForm.show();
        $registerForm.hide();
    });
    //注册
    $registerForm.find('button.btn').on('click',function () {
        //通过ajax提交请求
        $.ajax({
            url:'/api/user/register',
            type:'POST',
            data:{
                username:$registerForm.find('input[name="user-reg"]').val(),
                password:$registerForm.find('input[name="pass-reg"]').val(),
                repassword:$registerForm.find('input[name="pass2-reg"]').val(),
                email:$registerForm.find('input[name="email-reg"]').val(),
                phone:$registerForm.find('input[name="phone-reg"]').val()
            },
            dataType:'json',
            success:function (result) {
                console.log(result);
            }
        })
    })
});