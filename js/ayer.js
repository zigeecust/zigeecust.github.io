(function ($) {
  //
  // Search
  var $searchWrap = $('.search-form-wrap'),
    isSearchAnim = false,
    searchAnimDuration = 200;

  var startSearchAnim = function () {
    isSearchAnim = true;
  };

  var stopSearchAnim = function (callback) {
    setTimeout(function () {
      isSearchAnim = false;
      callback && callback();
    }, searchAnimDuration);
  };

  $('.nav-item-search').on('click', function () {
    if (isSearchAnim) return;
    startSearchAnim();
    $searchWrap.addClass('on');
    stopSearchAnim(function () {
      $('.local-search-input').focus();
    });
  });

  $(document).mouseup(function (e) {
    var _con = $('.local-search');
    if (!_con.is(e.target) && _con.has(e.target).length === 0) {
      $searchWrap.removeClass('on');
    }
  });

  //
  // 移动设备侦测
  var isMobile = {
    Android: function () {
      return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function () {
      return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function () {
      return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function () {
      return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function () {
      return navigator.userAgent.match(/IEMobile/i);
    },
    any: function () {
      return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
  };

  //
  // 建议在移动端不初始化，其实 /search.xml 文件还挺大的，
  if ($('.local-search').size()) {
    $.getScript('/js/search.js', function () {
      searchFunc("/search.xml", 'local-search-input', 'local-search-result');
    });
  }

  //
  // Share
  $('body').on('click', function () {
    $('.article-share-box.on').removeClass('on');
  }).on('click', '.article-share-link', function (e) {
    e.stopPropagation();

    var $this = $(this),
      url = $this.attr('data-url'),
      encodedUrl = encodeURIComponent(url),
      id = 'article-share-box-' + $this.attr('data-id'),
      offset = $this.offset();

    if ($('#' + id).length) {
      var box = $('#' + id);

      if (box.hasClass('on')) {
        box.removeClass('on');
        return;
      }
    } else {
      var html = [
        '<div id="' + id + '" class="article-share-box">',
        '<input class="article-share-input" value="' + url + '">',
        '<div class="article-share-links">',
        '<a href="https://twitter.com/intent/tweet?url=' + encodedUrl + '" class="article-share-twitter" target="_blank" title="Twitter"></a>',
        '<a href="https://www.facebook.com/sharer.php?u=' + encodedUrl + '" class="article-share-facebook" target="_blank" title="Facebook"></a>',
        '<a href="http://pinterest.com/pin/create/button/?url=' + encodedUrl + '" class="article-share-pinterest" target="_blank" title="Pinterest"></a>',
        '<a href="https://plus.google.com/share?url=' + encodedUrl + '" class="article-share-google" target="_blank" title="Google+"></a>',
        '</div>',
        '</div>'
      ].join('');

      var box = $(html);
      $('body').append(box);
    }
    $('.article-share-box.on').hide();

    box.css({
      top: offset.top + 25,
      left: offset.left
    }).addClass('on');
  }).on('click', '.article-share-box', function (e) {
    e.stopPropagation();
  }).on('click', '.article-share-box-input', function () {
    $(this).select();
  }).on('click', '.article-share-box-link', function (e) {
    e.preventDefault();
    e.stopPropagation();

    window.open(this.href, 'article-share-box-window-' + Date.now(), 'width=500,height=450');
  });

  //
  // fancybox
  if ($.fancybox) {
    $('[data-fancybox]').fancybox({
      protect: true
    });
  }

  //
  // lazyload
  $("img.lazy").lazyload({
    effect: "fadeIn"
  });

  //
  // justifiedGallery
  $('#gallery').justifiedGallery({
    rowHeight: 200,
    margins: 5
  });

  //
  $(document).ready(function ($) {
    $('.anchor').click(function (event) {
      event.preventDefault();
      $('main').animate({ scrollTop: $(this.hash).offset().top }, 'smooth');
    });
  });

  // To top
  (function ($) {
    // When to show the scroll link
    // higher number = scroll link appears further down the page
    var upperLimit = 1000;

    // Our scroll link element
    var scrollElem = $('#totop');

    // Scroll to top speed
    var scrollSpeed = 1600;

    // Show and hide the scroll to top link based on scroll position
    scrollElem.hide();
    $('.content').scroll(function () {
      var scrollTop = $('.content').scrollTop();
      if (scrollTop > upperLimit) {
        $(scrollElem).stop().fadeTo(300, 1); // fade back in
      } else {
        $(scrollElem).stop().fadeTo(300, 0); // fade out
      }
    });

    // Scroll to top animation on click
    $(scrollElem).click(function () {
      $('.content').animate({ scrollTop: 0 }, scrollSpeed); return false;
    });
  })(jQuery);

  // Mobile nav
  var $content = $('.content'),           // 获取正文
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
    $aplayer = $('.aplayer-body');        // 获取播放器
    $aplayer.toggleClass('on');
    stopMobileNavAnim();                  // 动画结束（超时）后设定状态位：动画结束
  });

  /* 点击正文 去除边栏 */
  $($content).on('click', function () {   
    if (isMobileNavAnim || !$content.hasClass('on')) return;
    $content.removeClass('on');
    $sidebar.removeClass('on');
    $aplayer = $('.aplayer-body');        // 获取播放器
    $aplayer.removeClass('on');
  });

  if (window.matchMedia("(min-width: 768px)").matches) {
    $content.addClass('on');
    $sidebar.addClass('on');
    $aplayer = $('.aplayer-body');        // 获取播放器
    $aplayer.addClass('on');
  }

  // 打赏按钮
  $('#reward-btn').on('click', function () {
    $('#mask').fadeIn(100)
    $('#reward').fadeIn(100)
  });
  $('#reward .close, #mask').on('click', function () {
    $('#mask').fadeOut(100)
    $('#reward').fadeOut(100)
  })
})(jQuery);


