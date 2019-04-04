// $(function () {
function load() {
  if(sessionStorage.getItem('user')){
    $('.logo .login').text('用户名：' + sessionStorage.getItem('user'));
  }
  $.ajax({
    type: "GET",
    url: "http://39.96.88.244:8080/ShoppingSite/getProductList.form",
    dataType: "json",
    success: function (res) {
      if (res.code === 200) {
        var hufu = '';
        var meizhuang = '';
        var xiangfen = '';
        for (let i = 0; i < res.data.length; i++) {
          if (res.data[i].type === '护肤') {
            hufu += '<div class="skin-item"><div class="skin-img"><a href="../../../buy/WEB-INF/jsp/buy.html?itemid=' + res.data[i].id + '"><img src="' + res.data[i].imgsrc + '"alt=""></a></div><div class="skin-desc"><div class="left">￥<span>' + res.data[i].price + '</span></div><div class="right">' + res.data[i].name + '&nbsp;&nbsp;已售' + res.data[i].volume + '</div></div></div>'
          } else if (res.data[i].type === '美妆') {
            meizhuang += '<div class="skin-item"><div class="skin-img"><a href="../../../buy/WEB-INF/jsp/buy.html?itemid=' + res.data[i].id + '"><img src="' + res.data[i].imgsrc + '" alt=""></a></div><div class="skin-desc"><div class="left">￥<span>' + res.data[i].price + '</span></div><div class="right">' + res.data[i].name + '&nbsp;&nbsp;已售' + res.data[i].volume + '</div></div></div>'
          } else if (res.data[i].type === '香氛') {
            xiangfen += '<div class="skin-item"><div class="skin-img"><a href="../../../buy/WEB-INF/jsp/buy.html?itemid=' + res.data[i].id + '"><img src="' + res.data[i].imgsrc + '" alt=""></a></div><div class="skin-desc"><div class="left">￥<span>' + res.data[i].price + '</span></div><div class="right">' + res.data[i].name + '&nbsp;&nbsp;已售' + res.data[i].volume + '</div></div></div>'
          }
        }
        $('#hufu-content').html(hufu)
        $('#meizhuang-content').html(meizhuang)
        $('#xiangfen-content').html(xiangfen)

      }
    }
  });
}

function list() {
  $.ajax({
    type: "GET",
    url: "http://39.96.88.244:8080/ShoppingSite/getList.form",
    dataType: "json",
    success: function (res) {
      var hufuList = '';
      var meizhuangList = '';
      var xiangfenList = '';
      if (res.code === 200) {
        for (let i = 0; i < res.data.length; i++) {
          if (res.data[i].classify === '护肤') {
            hufuList += '<li><a href="../../../buy/WEB-INF/jsp/buy.html?itemid="' + res.data[i].id + '>' + res.data[i].name + '</a></li>';
          } else if (res.data[i].classify === '美妆') {
            meizhuangList += '<li><a href="../../../buy/WEB-INF/jsp/buy.html?itemid="' + res.data[i].id + '>' + res.data[i].name + '</a></li>';
          } else if (res.data[i].classify === '香氛') {
            xiangfenList += '<li><a href="../../../buy/WEB-INF/jsp/buy.html?itemid="' + res.data[i].id + '>' + res.data[i].name + '</a></li>';
          }
        }
        $('#hufu-list').html(hufuList);
        $('#meizhuang-list').html(meizhuangList);
        $('#xiangfen-list').html(xiangfenList);
      }
    }
  });
}

load();
list();