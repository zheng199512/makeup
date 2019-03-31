// $(function () {
function load() {
  $.ajax({
    type: "GET",
    url: "../../data.json",
    dataType: "json",
    success: function (res) {
      if (res.returnCode === 0) {
        var hufu = '';
        var meizhuang = '';
        var xiangfen = '';
        for (let i = 0; i < res.beans.length; i++) {
          if (res.beans[i].classify === '护肤') {
            hufu += '<div class="skin-item"><div class="skin-img"><a href="http://localhost:8080/buy.html?itemid=' + res.beans[i].id + '"><img src="' + res.beans[i].pic_url + '" alt=""></a></div><div class="skin-desc"><div class="left">￥<span>' + res.beans[i].price + '</span></div><div class="right">' + res.beans[i].name + '&nbsp;&nbsp;已售' + res.beans[i].sale_volume + '</div></div></div>'
          } else if (res.beans[i].classify === '美妆') {
            meizhuang += '<div class="skin-item"><div class="skin-img"><a href="http://localhost:8080/buy.html?itemid=' + res.beans[i].id + '"><img src="' + res.beans[i].pic_url + '" alt=""></a></div><div class="skin-desc"><div class="left">￥<span>' + res.beans[i].price + '</span></div><div class="right">' + res.beans[i].name + '&nbsp;&nbsp;已售' + res.beans[i].sale_volume + '</div></div></div>'
          } else if (res.beans[i].classify === '香氛') {
            xiangfen += '<div class="skin-item"><div class="skin-img"><a href="http://localhost:8080/buy.html?itemid=' + res.beans[i].id + '"><img src="' + res.beans[i].pic_url + '" alt=""></a></div><div class="skin-desc"><div class="left">￥<span>' + res.beans[i].price + '</span></div><div class="right">' + res.beans[i].name + '&nbsp;&nbsp;已售' + res.beans[i].sale_volume + '</div></div></div>'
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
    url: "../../list.json",
    dataType: "json",
    success: function (res) {
      var hufuList = '';
      var meizhuangList = '';
      var xiangfenList = '';
      if (res.returnCode === 0) {
        for (let i = 0; i < res.beans.length; i++) {
          if (res.beans[i].classify === '护肤') {
            hufuList += '<li><a href="http://localhost:8080/buy.html?itemid="' + res.beans[i].id + '>' + res.beans[i].name + '</a></li>';
          } else if (res.beans[i].classify === '美妆') {
            meizhuangList += '<li><a href="http://localhost:8080/buy.html?itemid="' + res.beans[i].id + '>' + res.beans[i].name + '</a></li>';
          } else if (res.beans[i].classify === '香氛') {
            xiangfenList += '<li><a href="http://localhost:8080/buy.html?itemid="' + res.beans[i].id + '>' + res.beans[i].name + '</a></li>';
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