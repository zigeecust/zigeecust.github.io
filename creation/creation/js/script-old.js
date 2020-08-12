$(document).ready(function () {

  var curPage = 1; // 当前页面
  var numOfPages = $(".skw-page").length; // 页面总数
  var animTime = 1000; // 动画持续时间
  var scrolling = false; // 状态位：是否执行动画中
  var pgPrefix = ".skw-page-"; // 页面类名命名法

  var activeIndex = 0; // curPage
  var limit = 0; // numOfPages
  var disabled = false;
  var $stage = undefined;
  var $controls = undefined; // 侧边栏按钮控件
  var canvas = false;

  var SPIN_FORWARD_CLASS = 'js-spin-fwd';
  var SPIN_BACKWARD_CLASS = 'js-spin-bwd';
  var DISABLE_TRANSITIONS_CLASS = 'js-transitions-disabled';
  var SPIN_DUR = 1000;

  /* 翻页操作 */
  function pagination() {
    scrolling = true;

    $(pgPrefix + curPage).removeClass("inactive").addClass("active");
    $(pgPrefix + (curPage - 1)).addClass("inactive");
    $(pgPrefix + (curPage + 1)).removeClass("active");

    setTimeout(function () {
      scrolling = false;
    }, animTime);
  };

  // 上翻
  function navigateUp() {
    if (curPage === 1) return;
    curPage--;
    pagination();
  };

  // 下翻
  function navigateDown() {
    if (curPage === numOfPages) return;
    curPage++;
    pagination();
  };

  // 鼠标滚轮操作
  $(document).on("mousewheel DOMMouseScroll", function (e) {
    if (scrolling) return;
    if (e.originalEvent.wheelDelta > 0 || e.originalEvent.detail < 0) {
      navigateUp();
    } else {
      navigateDown();
    }
  });

  // 键盘操作
  $(document).on("keydown", function (e) {
    if (scrolling) return;
    if (e.which === 38) {
      navigateUp();
    } else if (e.which === 40) {
      navigateDown();
    }
  });

  // 侧边栏按钮操作
  $controls.on('click', function (e) {
    e.preventDefault();
    if (disabled) return;
    var $el = $(e.target);
    var toIndex = parseInt($el.attr('data-index'), 10);
    spin(toIndex - activeIndex);
  });



  /* 侧边栏 */
  // 增加侧边栏HTML控件
  var appendControls = function appendControls() {
    for (var i = 0; i < numOfPages; i++) {
      $('.carousel__control').append('<a href="#" data-index="' + i + '"></a>');
    }

    var height = $('.carousel__control').children().last().outerHeight();

    $('.carousel__control').css('height', 30 + numOfPages * height);
    $controls = $('.carousel__control').children();
    $controls.eq(activeIndex).addClass('active');
  };

  var setIndexes = function setIndexes() {
    $('.spinner').children().each(function (i, el) {
      $(el).attr('data-index', i);        // 标记？
      limit++; // 计数，不必
    });
  };

  var duplicateSpinner = function duplicateSpinner() {
    var $el = $('.spinner').parent();
    var html = $('.spinner').parent().html();
    $el.append(html);
    $('.spinner').last().addClass('spinner--right');
    $('.spinner--right').removeClass('spinner--left');
  };

  var paintFaces = function paintFaces() {
    $('.spinner__face').each(function (i, el) {
      var $el = $(el);
      var color = $(el).attr('data-bg');
      $el.children().css('backgroundImage', 'url(' + getBase64PixelByColor(color) + ')');
    });
  };

  var getBase64PixelByColor = function getBase64PixelByColor(hex) {
    if (!canvas) {
      canvas = document.createElement('canvas');
      canvas.height = 1;
      canvas.width = 1;
    }
    if (canvas.getContext) {
      var ctx = canvas.getContext('2d');
      ctx.fillStyle = hex;
      ctx.fillRect(0, 0, 1, 1);
      return canvas.toDataURL();
    }
    return false;
  };

  var prepareDom = function prepareDom() {
    setIndexes();
    paintFaces();
    duplicateSpinner();
    appendControls();       // 增加HTML中的侧边栏控件
  };

  var spin = function spin() {
    var inc = arguments.length <= 0 || arguments[0] === undefined ? 1 : arguments[0];

    if (disabled) return;
    if (!inc) return;
    activeIndex += inc;
    disabled = true;

    if (activeIndex >= limit) {
      activeIndex = 0;
    }

    if (activeIndex < 0) {
      activeIndex = limit - 1;
    }

    var $activeEls = $('.spinner__face.js-active');
    var $nextEls = $('.spinner__face[data-index=' + activeIndex + ']');
    $nextEls.addClass('js-next');

    if (inc > 0) {
      $stage.addClass(SPIN_FORWARD_CLASS);
    } else {
      $stage.addClass(SPIN_BACKWARD_CLASS);
    }

    $controls.removeClass('active');
    $controls.eq(activeIndex).addClass('active');

    setTimeout(function () {
      spinCallback(inc);
    }, SPIN_DUR, inc);
  };

  var spinCallback = function spinCallback(inc) {

    $('.js-active').removeClass('js-active');
    $('.js-next').removeClass('js-next').addClass('js-active');
    $stage.addClass(DISABLE_TRANSITIONS_CLASS).removeClass(SPIN_FORWARD_CLASS).removeClass(SPIN_BACKWARD_CLASS);

    $('.js-active').each(function (i, el) {
      var $el = $(el);
      $el.prependTo($el.parent());
    });
    setTimeout(function () {
      $stage.removeClass(DISABLE_TRANSITIONS_CLASS);
      disabled = false;
    }, 100);
  };

  var attachListeners = function attachListeners() {

    document.onkeyup = function (e) {
      switch (e.keyCode) {
        case 38:
          spin(-1);
          break;
        case 40:
          spin(1);
          break;
      }
    };

    $controls.on('click', function (e) {
      e.preventDefault();
      if (disabled) return;
      var $el = $(e.target);
      var toIndex = parseInt($el.attr('data-index'), 10);
      spin(toIndex - activeIndex);
    });
  };

  var assignEls = function assignEls() {
    $stage = $('.carousel__stage');
  };

  var init = function init() {
    assignEls();
    prepareDom();
    attachListeners();
  };

  $(function () {
    init();
  });

});