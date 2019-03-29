$(function () {

  let reg = /^[a-zA-Z]{1,30}$/;

  function check(target, val, successMsg, errorMsg) {
    if (reg.test(val)) {
      $(target).removeClass('error').addClass('success').text(successMsg);
      return true;
    } else {
      $(target).removeClass('success').addClass('error').text(errorMsg);
      return false;
    }
  }

  let userFlag = false;
  let passFlag = false;

  $('.pannel .username').blur(function (e) {
    e.preventDefault();
    userFlag = check('.usernamemsg', $('.pannel .username').val(), '用户名格式正确', '用户名格式错误');
  });
  $('.pannel .password').blur(function (e) {
    e.preventDefault();
    passFlag = check('.passmsg', $('.pannel .password').val(), '密码格式正确', '密码格式错误');
  });

  //登录
  $('#ok').click(function (e) {
    e.preventDefault();
    console.log(userFlag)
    console.log(passFlag)
    if (userFlag && passFlag) {
      let data = {
        "username": $('.pannel .username').val(),
        "password": $('.pannel .password').val()
      }
      /*
        后端返回json数据格式(0表示登录成功，-999表示登录失败)：
        {
          returnCode:0
        }
      */
      $.ajax({
        type: "POST",
        url: "http://localhost:8080/admin_login",
        data: data,
        dataType: 'json',
        success: function (result) {
          if (result.returnCode === 0) {
            window.location = '../WEB-INF/jsp/admin_register.html'
          } else {
            $('.pannel .msg').removeClass('success').addClass('error').text('用户名或密码错误');
          }
        },
        error: function () {
          window.location = 'http://127.0.0.1:5500/WEB-INF/jsp/error.html'
        }
      });
    } else {
      $('.pannel .msg').removeClass('success').addClass('error').text('用户名或密码错误');
    }
  });
  //注册
  $('#register').click(function (e) {
    e.preventDefault();
    console.log(userFlag)
    console.log(passFlag)
    if (userFlag && passFlag) {
      let data = {
        "username": $('.pannel .username').val(),
        "password": $('.pannel .password').val()
      }
      /*
        后端返回json数据格式(0表示注册成功，-999表示注册失败)：
        {
          returnCode:0
        }
      */
      $.ajax({
        type: "POST",
        url: "http://localhost:8080/admin_register",
        data: data,
        dataType: 'json',
        success: function (result) {
          if (result.returnCode === 0) {
            alert('注册成功,跳转登录界面...');
            window.location = '../WEB-INF/jsp/admin_login.html'
          } else {
            $('.pannel .msg').removeClass('success').addClass('error').text('已存在该用户名');
          }
        },
        error: function () {
          window.location = 'http://127.0.0.1:5500/WEB-INF/jsp/error.html'
        }
      });
    } else {
      $('.pannel .msg').removeClass('success').addClass('error').text('用户名或密码错误');
    }
  });


});