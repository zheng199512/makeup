  // 美容师的pass
  function pass(obj, id) {
    $.ajax({
      type: "POST",
      url: "url",
      data: "data",
      dataType: "dataType",
      success: function (res) {
        if (res.code === 200) {
          alert('已通过');
          $(obj).text('已通过');
        }
      }
    });

  }
  // 美容师的nopass
  function nopass(obj, id) {

    $.ajax({
      type: "POST",
      url: "url",
      data: "data",
      dataType: "dataType",
      success: function (res) {
        if (res.code === 200) {
          alert('已拒绝');
          $(obj).text('已拒绝');
        }
      }
    });
  }

  // 违约状态修改
  function changeStatus(obj, id) {
    $.ajax({
      type: "POST",
      url: "url",
      data: "data",
      dataType: "dataType",
      success: function (res) {
        if (res.code === 200) {
          alert('success');
          if ($(obj).text() === "违约") {
            $(obj).text("未违约")
          }else{
            $(obj).text("违约")
          }
        }
      }
    });
  }

  // 初始化数据列表
  function init() {
    $.ajax({
      type: "GET",
      url: "http://39.96.88.244:8080/ShoppingSite/getProductList.form",
      dataType: "json",
      success: function (res) {
        if (res.code === 200) {
          let a = '';
          for (let i = 0; i < res.data.length; i++) {
            if (res.data[i].num < 10) {
              a += '<div class="product-content clearfix"><ul><li><span>' + res.data[i].id + '</span></li><li><span>' + res.data[i].name + '</span></li><li><span>' + res.data[i].price + '</span></li><li><span title="' + res.data[i].imgsrc + '">' + res.data[i].imgsrc + '</span></li><li><span>' + res.data[i].type + '</span></li><li><span style="color:red;">' + res.data[i].count + '</span></li><li><span>' + res.data[i].volume + '</span></li><li><b onclick="deletePro(' + res.data[i].id + ')" >删除</b></li></ul></div>';
            } else {
              a += '<div class="product-content clearfix"><ul><li><span>' + res.data[i].id + '</span></li><li><span>' + res.data[i].name + '</span></li><li><span>' + res.data[i].price + '</span></li><li><span title="' + res.data[i].imgsrc + '">' + res.data[i].imgsrc + '</span></li><li><span>' + res.data[i].type + '</span></li><li><span>' + res.data[i].count + '</span></li><li><span>' + res.data[i].volume + '</span></li><li><b onclick="deletePro(' + res.data[i].id + ')" >删除</b></li></ul></div>';
            }
          }
          $('.test').html(a);
        }
      }
    });
  }
  // 删除
  function deletePro(id) {
    if (confirm('确认删除？')) {
      $.ajax({
        type: "GET",
        url: "http://39.96.88.244:8080/ShoppingSite/delProduct.form?name=" + id,
        success: function (res) {
          if (res.code === 200) {
            alert('删除成功');
            init();
          }
        }
      });
    }
  }

  $(function () {
    //shanchu


    init();
    //筛选分类
    $('.search-button').click(function (e) {
      e.preventDefault();
      var classifyName = $('.search-text').val();
      if (classifyName.length == 0) {
        alert('输入为空');
        init();
      } else {
        $.ajax({
          type: "GET",
          url: "http://39.96.88.244:8080/ShoppingSite/getProductList.form",
          dataType: "json",
          success: function (res) {
          if (res.code === 200) {
            let a = '';
            for (let i = 0; i < res.data.length; i++) {
              if (res.data[i].type === classifyName) {
                if (res.data[i].count < 10) {
                  a += '<div class="product-content clearfix"><ul><li><span>' + res.data[i].id + '</span></li><li><span>' + res.data[i].name + '</span></li><li><span>' + res.data[i].price + '</span></li><li><span title="' + res.data[i].imgsrc + '">' + res.data[i].imgsrc + '</span></li><li><span>' + res.data[i].type + '</span></li><li><span style="color:red;">' + res.data[i].count + '</span></li><li><span>' + res.data[i].volume + '</span></li><li><b onclick="deletePro(' + res.data[i].name + ')" >删除</b>&nbsp;<b onclick="editPro(' + res.data[i].id + ')" >修改</b></li></ul></div>';
                } else {
                  a += '<div class="product-content clearfix"><ul><li><span>' + res.data[i].id + '</span></li><li><span>' + res.data[i].name + '</span></li><li><span>' + res.data[i].price + '</span></li><li><span title="' + res.data[i].imgsrc + '">' + res.data[i].imgsrc + '</span></li><li><span>' + res.data[i].type + '</span></li><li><span>' + res.data[i].count + '</span></li><li><span>' + res.data[i].volume + '</span></li><li><b onclick="deletePro(' + res.data[i].name + ')">删除</b>&nbsp;<b onclick="editPro(' + res.data[i].id + ')" >修改</b></li></ul></div>';
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
      $('.facer-apply').addClass('hide').removeClass('show');
      $('.facer-error').addClass('hide').removeClass('show');
    })

    $('.add').click(function (e) {
      e.preventDefault();
      $('.content').addClass('hide').removeClass('show');
      $('.add-pro').addClass('show').removeClass('hide');
      $('.sale_record').addClass('hide').removeClass('show');
      $('.facer-apply').addClass('hide').removeClass('show');
      $('.facer-error').addClass('hide').removeClass('show');

    });
    // 获取销售记录
    $('.sale').click(function (e) {
      e.preventDefault();
      $('.content').addClass('hide').removeClass('show');
      $('.add-pro').addClass('hide').removeClass('show');
      $('.sale_record').addClass('show').removeClass('hide');
      $('.facer-apply').addClass('hide').removeClass('show');
      $('.facer-error').addClass('hide').removeClass('show');

      $.ajax({
        type: "GET",
        url: "http://39.96.88.244:8080/ShoppingSite/getRecords.form",
        dataType: "json",
        success: function (res) {
          if (res.code === 200) {
            let a = '';
            for (let i = 0; i < res.data.length; i++) {
              a += '<div class="sale_content clearfix"><ul> <li><span>'+res.data[i].pro_id+'</span></li><li><span>'+res.data[i].user_id+'</span></li><li><span>'+res.data[i].name+'</span></li><li><span>'+res.data[i].count+'</span></li><li><span>'+res.data[i].price+'</span></li><li><span>'+res.data[i].time+'</span></li></ul></div>'
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
          url: "http://39.96.88.244:8080/ShoppingSite/Upload.form",
          data: formData,
          // 告诉jQuery不要去处理发送的数据
          processData: false,
          // 告诉jQuery不要去设置Content-Type请求头
          contentType: false,
          enctype: 'multipart/form-data',
          success: function (res) {
            if (res.code === 0) {
              alert('上传成功');
              window.location = './admin.html'
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
    // 美容师管理
    $('.facer').click(function (e) {
      e.preventDefault();
      $('.content').addClass('hide').removeClass('show');
      $('.add-pro').addClass('hide').removeClass('show');
      $('.sale_record').addClass('hide').removeClass('show');
      $('.facer-apply').addClass('show').removeClass('hide');
      $('.facer-error').addClass('hide').removeClass('show');
      // 加载数据
      $.ajax({
        type: "GET",
        url: "http://39.96.88.244:8080/ShoppingSite/getApply.form",
        dataType: "json",
        success: function (res) {
          if (res.code == 200) {
            var a = '';
            for (let i = 0; i < res.data.length; i++) {
              a +=
                '<div class="facer-content"><ul><li>' + res.data[i].apply_id + '</li><li>' + res.data[i].facer_name + '</li><li>' + res.data[i].facer_phone + '</li><li>' + res.data[i].level + '</li><li><b onclick="pass(this,' + res.data[i].apply_id + ')">通过</b>&nbsp<b onclick="nopass(this,' + res.data[i].apply_id + ')">拒绝</b></li></ul></div>';
            }
            $('.facer-content-load').html(a);
          }
        }
      });
    });
    $('.facer-err').click(function (e) {
      e.preventDefault();
      $('.content').addClass('hide').removeClass('show');
      $('.add-pro').addClass('hide').removeClass('show');
      $('.sale_record').addClass('hide').removeClass('show');
      $('.facer-apply').addClass('hide').removeClass('show');
      $('.facer-error').addClass('show').removeClass('hide');
      // 加载状态
      $.ajax({
        type: "GET",
        url: "http://39.96.88.244:8080/ShoppingSite/getFacer.form",
        dataType: "json",
        success: function (res) {

          var a = '';
          if (res.code === 200) {
            for (let i = 0; i < res.data.length; i++) {
              if (res.data[i].error_status === 0) {
                a += '<div class="facer-err-content"><ul><li>' + res.data[i].facer_id + '</li><li>' + res.data[i].facer_name + '</li><li>' + res.data[i].facer_Sex + '</li><li>' + res.data[i].facer_phone + '</li><li><b onclick="changeStatus(this,' + res.data[i].facer_id + ')">未违约</b></li></ul> </div>'
              } else if (res.data[i].error_status === 1) {
                a += '<div class="facer-err-content"><ul><li>' + res.data[i].facer_id + '</li><li>' + res.data[i].facer_name + '</li><li>' + res.data[i].facer_Sex + '</li><li>' + res.data[i].facer_phone + '</li><li><b onclick="changeStatus(this,' + res.data[i].facer_id + ')">违约</b></li></ul> </div>'
              }
            }
          }
          $('.facer-err-zheng').html(a);
        }
      });


    });

  });