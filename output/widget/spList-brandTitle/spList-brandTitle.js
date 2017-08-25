define('widget/spList-brandTitle/spList-brandTitle', function(require, exports, module) {

  "use strict";
  
  var $ = require('node_modules/jquery/dist/jquery');
  // 领券
  var out;
  function hide() {
      $(".coupon_box").fadeOut();
  }
  $(".listBrandTitle a").mouseover(function () {
      $(".coupon_box").fadeIn();
  }).mouseleave(function () {
      out = setTimeout(hide, 300);
  });
  $(".coupon_box").mouseover(function () {
      clearTimeout(out);
  }).mouseleave(function () {
      $(".coupon_box").fadeOut();
  });
  $(".coupon_box").click(function (event) {
      event.stopPropagation();
      event.preventDefault();
      alert("领券成功");
  });

});
