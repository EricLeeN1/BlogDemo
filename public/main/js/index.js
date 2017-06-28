/**
 * Created by Administrator on 2017/6/28.
 */
$(function () {
   var $loginForm = $('#loginForm');
   var $registerForm = $('#registerForm');
   //切换到注册面板
   $loginForm.find('a').on('click',function () {
       $registerForm.show();
       $loginForm.hide();
   });
   //切换到登录面板
    $registerForm.find('a').on('click',function () {
        $loginForm.show();
        $registerForm.hide();
    });
    //注册
    $registerForm.find()
});