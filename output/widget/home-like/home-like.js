define('widget/home-like/home-like.es6', function(require, exports, module) {

  'use strict';
  
  var _ref;
  
  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
  
  var $ = require('node_modules/jquery/dist/jquery');
  var swiper = require('static/js/swiper');
  // 猜你喜欢
  var likeSwiper = new Swiper('.like-swiper', (_ref = {
      slidesPerView: 'auto',
      centeredSlides: true,
      loop: true,
      nextButton: '.swiper-button-next',
      prevButton: '.swiper-button-prev',
      spaceBetween: 30
  }, _defineProperty(_ref, 'slidesPerView', 'auto'), _defineProperty(_ref, 'slidesPerGroup', 5), _ref));
  //猜你喜欢左侧右侧
  var WindowWidth = $(window).width();
  var likeBlurLeft = $('.likeBlurLeft');
  var likeBlurRight = $('.likeBlurRight');
  if (WindowWidth > 1200) {
      likeBlurLeft.css({ 'width': (WindowWidth - 1200) / 2 + 20 + 'px' }).show();
      likeBlurRight.css({ 'width': (WindowWidth - 1200) / 2 + 20 + 'px' }).show();
  } else {
      likeBlurLeft.hide();
      likeBlurRight.hide();
  }
  $(window).resize(function () {
      var WindowWidth = $(window).width();
      if (WindowWidth > 1200) {
          likeBlurLeft.css({ 'width': (WindowWidth - 1200) / 2 + 20 + 'px' }).show();
          likeBlurRight.css({ 'width': (WindowWidth - 1200) / 2 + 20 + 'px' }).show();
      } else {
          likeBlurLeft.hide();
          likeBlurRight.hide();
      }
  });

});
