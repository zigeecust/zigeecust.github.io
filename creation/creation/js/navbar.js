// (function ($) {
$(function () {
  // Mobile nav
  var $content = $('.carousel'),           // 获取正文
    $sidebar = $('.sidebar'),             // 获取边栏
    isMobileNavAnim = false,              // 动画执行状态位
    mobileNavAnimDuration = 200;          // 设定动画时间

  var startMobileNavAnim = function () {  // 指定状态位
    isMobileNavAnim = true;
  };

  var stopMobileNavAnim = function () {   // 指定时间后清除状态位
    setTimeout(function () {
      isMobileNavAnim = false;
    }, mobileNavAnimDuration);
  };

  /* 边框栏缩进/显示按钮 */
  $('.navbar-toggle').on('click', function () {
    if (isMobileNavAnim) return;          // 如果正处于动画中，不重复执行
    startMobileNavAnim();                 // 状态位：动画开始
    $content.toggleClass('on');
    $sidebar.toggleClass('on');
    stopMobileNavAnim();                  // 动画结束（超时）后设定状态位：动画结束
  });

  /* 点击正文 去除边栏 */
  $($content).on('click', function () {   
    if (isMobileNavAnim || !$content.hasClass('on')) return;
    $content.removeClass('on');
    $sidebar.removeClass('on');
  });

  /* 默认显示边栏 */
  $(window).bind("load", function () {
  if (window.matchMedia("(min-width: 768px)").matches) {
    $content.addClass('on');
    $sidebar.addClass('on');
  }
})

})(jQuery);