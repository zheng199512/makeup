var imgWidth = $('.slider-item').width();
var imgHeight = $('.slider-item').height();
window.onresize = function () { //监听窗口变化
  window.location.reload();
  imgWidth = $('.slider-item').width();
  imgHeight = $('.slider-item').height();
}
var sliderContent = $('#img-container');

$('.slider-item').css({
  'width': imgWidth
});
$('#slider-container').css({
  'height': imgHeight
})
$('#img-container').css('width', imgWidth * 5);
$('#img-container').css('left', -imgWidth);
var index = 1;
var size = $('.slider-item').length - 2;

var t = setInterval(function () {
  index++;
  move(index);
}, 3000);

$('.img-container').hover(function () {
  clearInterval(t);
}, function () {
  t = setInterval(function () {
    index++;
    move(index);
  }, 10000);
});

// $('.btn-next').on('click', function () {
//   index++;
//   move(index);
// });
// $('.btn-prev').on('click', function () {
//   index--;
//   move(index);
// })

function move() {
  if (index == (size + 1)) {
    sliderContent.stop().css({
      left: 0
    });
    index = 1;
  }
  if (index == 0) {
    sliderContent.stop().css({
      left: -imgWidth
    });
    index = 5;
  }
  sliderContent.stop().animate({
    left: -index * imgWidth
  }, 1000);
}