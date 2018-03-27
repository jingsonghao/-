


$(document) .ready(function (e) {
  widthFunctions();
  //当前状态
  e('ul.nav-sidebar') .find('a') .each(function () {
    var LOCATION_URL = String(window.location.href.split('#')[0].split('?')[0]);
    var CURRENT_URL = e(this) [0].href.split('#')[0].split('?')[0];
    if (LOCATION_URL == CURRENT_URL) {
      e(this) .parent() .addClass('active');
      e(this) .parents('ul') .add(this) .each(function () {
        e(this) .show() .parent() .addClass('opened')
      })
    }
  });
  //导航动画
  e('.nav-sidebar a') .on('click',function () {
    if (e(this) .parent() .find('ul') .size() != 0) {
      e(this) .parent() .siblings() .find('ul') .slideUp('slow');
      e(this) .parent() .siblings() .removeClass('opened').find('ul').slideUp('slow');
      e(this) .parent() .siblings().find('li') .removeClass('opened');
      e(this) .parent() .hasClass('opened') ? e(this) .parent() .removeClass('opened')  : e(this) .parent() .addClass('opened');
      e(this) .parent() .find('ul') .first() .finish() .slideToggle();
      e(this) .parent() .parent() .parent() .hasClass('opened') || e('.nav a') .not(this) .parent() .find('ul') .slideUp('slow', function () {
        e(this) .parent() .removeClass('opened')
      })
    } else{
      e(this) .parent() .parent() .parent() .hasClass('opened') || e('.nav a') .not(this) .parent() .find('ul') .slideUp('slow', function () {
        e(this) .parent() .removeClass('opened')
      })
    }
  });
});

function widthFunctions() {
  var r = $(window) .height();
  /*菜单高于可是窗时外部盒子的高度*/
  $('.sidebar-menu') .css('height', r-171);
  $('.sidebar') .css('height', r-169);
}
$(window) .bind('resize', widthFunctions);

//隱藏和显示左侧菜单
$('#main-menu-toggle') .on('click',function (event) {
  event.stopPropagation();
  $('.sidebar') .hasClass('sidebar-hidel') ? $('.sidebar') .removeClass('sidebar-hidel') : $('.sidebar') .addClass('sidebar-hidel');
});

function reSidebarhidel(){
  $('.sidebar') .removeClass('sidebar-hidel');
}
$('body').bind("click",reSidebarhidel);
$('.sidebar').mouseenter(function () {
  $('body').unbind("click");
});
$('.sidebar').mouseleave(function () {
  $('body').bind("click",reSidebarhidel);
});
//隱藏和显示左侧菜单 end
