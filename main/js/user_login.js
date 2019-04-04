$(function () {

  function uuid() {
    var s = [];
    var hexDigits = "0123456789abcdef";
    for (var i = 0; i < 36; i++) {
      s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
    s[8] = s[13] = s[18] = s[23] = "-";

    var uuid = s.join("");
    return uuid;
  }

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
      "uid": phone,
      "upwd": password
    }
    if (telReg.test(phone)) {
      $('.login-msg').addClass('success').removeClass('error').text('');
      $.ajax({
        type: "POST",
        url: "http://39.96.88.244:8080/ShoppingSite/login.form",
        data: userLogin,
        success: function (res) {
          console.log(res);
          if (res.returnCode === 0) {
            alert('登录成功');
            $('.login-register').addClass('hide').removeClass('show');
            $('.logo .login').text('用户名：' + res.bean.phone);
            sessionStorage.setItem('user', phone);
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
    console.log(uuid());
    var regPass = $('.register-password').val();
    var reRegPass = $('.register-password-confirm').val();
    var regData = {
      "uid": uuid(),
      "upwd": regPass,
      "phonenum": regPhone+'asd'
    }
    if (telReg.test(regPhone)) {
      if (regPass !== reRegPass) {
        $('.register-msg').addClass('error').removeClass('success').text('两次密码不一致');
      } else {
        $.ajax({
          type: "POST",
          url: "http://39.96.88.244:8080/ShoppingSite/Signin.form",
          data: regData,
          dataType: "json",
          success: function (res) {
            console.log(res);
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