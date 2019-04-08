$(function () {
  $('.search-button').click(function (e) {
    e.preventDefault();
    var name = $('.search-input-value').val();
    $('#search-item').addClass('show').removeClass('hide');
    
    $.ajax({
      type: "POST",
      url: "http://39.96.88.244:8080/ShoppingSite/Search.form",
      dataType: "json",
      data:{word:name},
      success: function (res) {
        if (res.code === 200) {
          var a = '';
          for (let i = 0; i < res.data.length; i++) {

            if (res.data[i].name.indexOf(name) >= 0) {
              var index = res.data[i].name.indexOf(name);
              var long = name.length;
              var mark = res.data[i].name.slice(0, index) + '<span style="color:red;">' + res.data[i].name.slice(index, index + long) + '</span>' + res.data[i].name.slice(index + long);
              a += '<div class="skin-item"><div class="skin-img"><a href="../../../buy/WEB-INF/jsp/buy.html?itemid=' + res.data[i].id + '"><img src="' + res.data[i].imgsrc + '"alt=""></a></div><div class="skin-desc"><div class="left">￥<span>' + res.data[i].price + '</span></div><div class="right">' + mark + '&nbsp;&nbsp;已售' + res.data[i].volume + '</div></div></div>'
            }else{
              a="没有匹配记录"
            }

          }
        }
        $('#search-content').html(a);
      }
    });
  });
})