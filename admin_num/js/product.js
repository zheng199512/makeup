// 删除
function deletePro(id) {
  if (confirm('确认删除？')) {
    $.ajax({
      type: "GET",
      url: "HTTP://localhost:8080/delete=" + id,
      success: function (res) {
        if (res.returnCode === 0) {
          alert('删除成功');
        }
      }
    });
  }
}
//修改
function editPro(id) {
  $.ajax({
    type: "GET",
    url: "../../data_edit.json",
    dataType: "json",
    success: function (res) {
      if (res.returnCode === 0) {
        $('.content').addClass('hide').removeClass('show');
        $('.add-pro').addClass('show').removeClass('hide');
        $('.add-pro .name').val(res.bean.name);
        $('.add-pro .price').val(res.bean.price);
        $('.add-pro .num').val(res.bean.num);
        $('.add-pro #classify').val(res.bean.classify);
      }
    }
  });
}

$(function () {
  //shanchu

  // 初始化数据列表
  function init() {
    $.ajax({
      type: "GET",
      url: "../../data.json",
      dataType: "json",
      success: function (res) {
        if (res.returnCode === 0) {
          let a = '';
          for (let i = 0; i < res.beans.length; i++) {
            if (res.beans[i].num < 10) {
              a += '<div class="product-content clearfix"><ul><li><span>' + res.beans[i].id + '</span></li><li><span>' + res.beans[i].name + '</span></li><li><span>' + res.beans[i].price + '</span></li><li><span title="' + res.beans[i].pic_url + '">' + res.beans[i].pic_url + '</span></li><li><span>' + res.beans[i].classify + '</span></li><li><span style="color:red;">' + res.beans[i].num + '</span></li><li><span>' + res.beans[i].sale_volume + '</span></li><li><b onclick="deletePro(' + res.beans[i].id + ')" >删除</b>&nbsp;<b onclick="editPro(' + res.beans[i].id + ')">修改</b></li></ul></div>';
            } else {
              a += '<div class="product-content clearfix"><ul><li><span>' + res.beans[i].id + '</span></li><li><span>' + res.beans[i].name + '</span></li><li><span>' + res.beans[i].price + '</span></li><li><span title="' + res.beans[i].pic_url + '">' + res.beans[i].pic_url + '</span></li><li><span>' + res.beans[i].classify + '</span></li><li><span>' + res.beans[i].num + '</span></li><li><span>' + res.beans[i].sale_volume + '</span></li><li><b onclick="deletePro(' + res.beans[i].id + ')" >删除</b>&nbsp;<b onclick="editPro(' + res.beans[i].id + ')">修改</b></li></ul></div>';
            }
          }
          $('.test').html(a);
        }
      }
    });
  }
  init();
  //筛选分类
  $('.search-button').click(function (e) {
    e.preventDefault();
    var classifyName = $('.search-text').val();
    console.log(classifyName);
    console.log(classifyName.length);
    if (classifyName.length == 0) {
      alert('输入为空');
      init();
    } else {
      $.ajax({
        type: "GET",
        url: "../../data.json",
        dataType: "json",
        success: function (res) {
          if (res.returnCode === 0) {
            let a = '';
            for (let i = 0; i < res.beans.length; i++) {
              if (res.beans[i].classify === classifyName) {
                if (res.beans[i].num < 10) {
                  a += '<div class="product-content clearfix"><ul><li><span>' + res.beans[i].id + '</span></li><li><span>' + res.beans[i].name + '</span></li><li><span>' + res.beans[i].price + '</span></li><li><span title="' + res.beans[i].pic_url + '">' + res.beans[i].pic_url + '</span></li><li><span>' + res.beans[i].classify + '</span></li><li><span style="color:red;">' + res.beans[i].num + '</span></li><li><span>' + res.beans[i].sale_volume + '</span></li><li><b onclick="deletePro(' + res.beans[i].id + ')" >删除</b>&nbsp;<b onclick="editPro(' + res.beans[i].id + ')" >修改</b></li></ul></div>';
                } else {
                  a += '<div class="product-content clearfix"><ul><li><span>' + res.beans[i].id + '</span></li><li><span>' + res.beans[i].name + '</span></li><li><span>' + res.beans[i].price + '</span></li><li><span title="' + res.beans[i].pic_url + '">' + res.beans[i].pic_url + '</span></li><li><span>' + res.beans[i].classify + '</span></li><li><span>' + res.beans[i].num + '</span></li><li><span>' + res.beans[i].sale_volume + '</span></li><li><b onclick="deletePro(' + res.beans[i].id + ')">删除</b>&nbsp;<b onclick="editPro(' + res.beans[i].id + ')" >修改</b></li></ul></div>';
                }

              }
            }
            $('.test').html(a);
          }
        }
      });
    }
  });

  $('.manage').click(function (e) {
    e.preventDefault();
    $('.content').addClass('show').removeClass('hide');
    $('.add-pro').addClass('hide').removeClass('show');
    $('.sale_record').addClass('hide').removeClass('show');
  })

  $('.add').click(function (e) {
    e.preventDefault();
    $('.content').addClass('hide').removeClass('show');
    $('.add-pro').addClass('show').removeClass('hide');
    $('.sale_record').addClass('hide').removeClass('show');
  });
  // 获取销售记录
  $('.sale').click(function (e) {
    e.preventDefault();
    $('.content').addClass('hide').removeClass('show');
    $('.add-pro').addClass('hide').removeClass('show');
    $('.sale_record').addClass('show').removeClass('hide');

    $.ajax({
      type: "GET",
      url: "../../data_sale.json",
      dataType: "json",
      success: function (res) {
        if (res.returnCode === 0) {
          let a = '';
          for (let i = 0; i < res.beans.length; i++) {
            a += '<div class="sale_content clearfix"><ul> <li><span>'+res.beans[i].id+'</span></li><li><span>'+res.beans[i].user_id+'</span></li><li><span>'+res.beans[i].product_name+'</span></li><li><span>'+res.beans[i].nums+'</span></li><li><span>'+res.beans[i].price+'</span></li><li><span>'+res.beans[i].time+'</span></li></ul></div>'
          }
          $('.sale-main-main').html(a);
        }
      }
    });

  });

  // 检测输入的格式
  var nameFlag = false;
  var priceFlag = false;
  var numFlag = false;
  // var picFlag=false;

  $('.add-pro .name').blur(function (e) {
    e.preventDefault();
    var name = $('.add-pro .name').val();
    if (name.length == 0) {
      $('.add-pro .name-msg').text('请输入名称').addClass('error').removeClass('success');
      nameFlag = false;
    } else {
      $('.add-pro .name-msg').text('成功').addClass('success').removeClass('error');
      nameFlag = true;
    }
  });

  $('.add-pro .price').blur(function (e) {
    e.preventDefault();
    var price = $('.add-pro .price').val();
    if (Number(price) == 'NaN' || Number(price) == '0') {
      $('.add-pro .price-msg').text('请输入数字').addClass('error').removeClass('success');
      priceFlag = false;
    } else {
      $('.add-pro .price-msg').text('成功').addClass('success').removeClass('error');
      priceFlag = true;
    }
  })

  $('.add-pro .num').blur(function (e) {
    e.preventDefault();
    var num = $('.add-pro .num').val();
    if (Number(num) == 'NaN' || Number(num) == '0') {
      $('.add-pro .num-msg').text('请输入数字').addClass('error').removeClass('success');
      numFlag = false;
    }
    if (num.indexOf('.') > -1) {
      $('.add-pro .num-msg').text('请输入整数').addClass('error').removeClass('success');
      numFlag = false;
    } else {
      $('.add-pro .num-msg').text('成功').addClass('success').removeClass('error');
      numFlag = true;
    }
  })

  $('.add-pro .add-button').click(function (e) {
    e.preventDefault();
    var formData = new FormData();
    var name = $('.add-pro .name').val();
    var price = Number($('.add-pro .price').val()).toFixed(2);
    var pic = $("#pic")[0].files[0];
    var classify = $('#classify').val();
    var num = Number($('.add-pro .num').val());

    if (name.length !== 0 && price.length !== 0 && num.length !== 0) {
      nameFlag = true;
      numFlag = true;
      priceFlag = true;
    }

    if (nameFlag && numFlag && priceFlag) {
      $('.add-pro .msg add-button-msg').text('').addClass('success').removeClass('error');
      formData.append("name", name);
      formData.append("prics", price);
      formData.append("pic", pic);
      formData.append("classify", classify);
      formData.append("num", num);

      $.ajax({
        type: "POST",
        url: "http://localhost:8080/admin_upload",
        data: formData,
        // 告诉jQuery不要去处理发送的数据
        processData: false,
        // 告诉jQuery不要去设置Content-Type请求头
        contentType: false,
        success: function (res) {
          if (res.returnCode === 0) {
            alert('上传成功');
            window.location = 'http://127.0.0.1:5500/WEB-INF/admin.html'
          }
        },
        error: function (res) {
          alert('上传失败！');
        }
      });
    } else {
      $('.add-pro  .add-button-msg').text('请补充表单').addClass('error').removeClass('success');
    }

  });






});