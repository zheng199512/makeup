$(function () {
  $('.logo .right').click(function (e) {
    e.preventDefault();
    $('.login-register').addClass('show').removeClass('hide');
  });
  $('.login-register .right').click(function (e) {
    e.preventDefault();
    $('.login-register').addClass('hide').removeClass('show');
  });

  var telReg = /^1(3|4|5|7|8)\d{9}$/;

  $('.login-button').click(function (e) {
    e.preventDefault();
    var phone = $('.login-phone').val();
    var password = $('.login-password').val();
    var userLogin = {
      "phone": phone,
      "password": password
    }
    if (telReg.test(phone)) {
      $('.login-msg').addClass('success').removeClass('error').text('');
      $.ajax({
        type: "GET",
        url: "../../login_success.json",
        data: userLogin,
        success: function (res) {
          if (res.returnCode === 0) {
            alert('登录成功');
            $('.login-register').addClass('hide').removeClass('show');
            $('.logo .login').text('用户名：' + res.bean.phone);
          } else {
            $('.login-msg').addClass('error').removeClass('success').text('用户名或密码错误');
          }
        }
      });
    } else {
      // 验证不通过
      $('.login-msg').addClass('error').removeClass('success').text('手机号码不正确');
    }
  });


  $('.register-button').click(function (e) {
    e.preventDefault();
    var regPhone = $('.register-phone').val();
    var regPass = $('.register-password').val();
    var reRegPass = $('.register-password-confirm').val();
    var regData = {
      "phone": regPhone,
      "password": regPass
    }
    if (telReg.test(regPhone)) {
      if (regPass !== reRegPass) {
        $('.register-msg').addClass('error').removeClass('success').text('两次密码不一致');
      } else {
        $.ajax({
          type: "GET",
          url: "http://",
          data: regData,
          dataType: "json",
          success: function (res) {
            if (res.returnCode === 0) {
              alert('注册成功，请登录');
            } else {
              alert('注册失败');
            }
          }
        });
      }
    } else {
      $('.register-msg').addClass('error').removeClass('success').text('手机号码不正确');
    }
  });

})