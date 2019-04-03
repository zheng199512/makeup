$(function () {
  function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg); //获取url中"?"符后的字符串并正则匹配
    var context = "";

    if (r != null)
      context = r[2];
    reg = null;
    r = null;
    return context == null || context == "" || context == "undefined" ? "" : context;
  }
  // 商品的id
  var itemid = GetQueryString("itemid");



  function buyLoad() {
    $.ajax({
      type: "GET",
      url: "../../item.json",
      dataType: "json",
      success: function (res) {
        if (res.returnCode === 0) {
          var pic = '<img src="' + res.bean.pic_url + '" alt="">';

          $('.top-img').html(pic);
          $('.buy-name').text(res.bean.name);
          $('.buy-price .item-price').text(res.bean.price.toFixed(2));
          $('.item-num').text(res.bean.num);
        }
      }
    });
  }
  buyLoad();


  $('.buy-num .num-left').click(function (e) {
    e.preventDefault();
    var num = Number($('.buy-num .num-mid').text());
    if (num > 0) {
      num--;
      $('.buy-num .num-mid').text(num);
    } else {
      $('.buy-num .num-mid').text(0);
    }


  });
  $('.buy-num .num-right').click(function (e) {
    e.preventDefault();
    var num = Number($('.buy-num .num-mid').text());
    if (num >= Number($('.item-num').text()) - 1) {
      console.log(num);
      $('.buy-num .num-mid').text(Number($('.item-num').text()));
    } else {
      num++;
      $('.buy-num .num-mid').text(num);
    }
  });

  $('.buy-button .button').click(function (e) {
    e.preventDefault();
    if (sessionStorage.getItem('user')) {
      alert('请先登录');
    } else {
      var user = sessionStorage.getItem('user');
      var nums = Number($('.buy-num .num-mid').text());
      var producetId = itemid;
      var price = Number($('.buy-price .item-price').text()) * nums;

      var data = {
        "nums": nums,
        "producetId": producetId,
        "user": user,
        "price": price.toFixed(2)
      }

      $.ajax({
        type: "POST",
        url: "url",
        data: data,
        success: function (res) {
          if (res.returnCode === 0) {
            alert('购买成功');
          }
        }
      });

    }

  });

})