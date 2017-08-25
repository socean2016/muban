define('widget/home-bannerSwiper/home-bannerSwiper.es6', function(require, exports, module) {

  'use strict';
  
  '';
  var swiper = require('static/js/swiper');
  //banner轮播图
  var swiper = new Swiper('.loop-swiper', {
      pagination: '.swiper-pagination',
      slidesPerView: 'auto',
      centeredSlides: true,
      paginationClickable: true,
      loop: true,
      autoplay: 3000,
      autoplayDisableOnInteraction: false
  });

});
