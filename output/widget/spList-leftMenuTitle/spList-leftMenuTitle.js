define('widget/spList-leftMenuTitle/spList-leftMenuTitle', function(require, exports, module) {

  "use strict";
  
  var $ = require('node_modules/jquery/dist/jquery');
  // 新品/促销
  $(".spList-navtitle label").click(function () {
      $(this).find("input").addClass("checked");
      $(this).siblings().find("input").removeClass("checked");
  });
  // 列表排版
  $(".spList-navtitle .navtitle-right .columnImg a.four").click(function () {
      $(this).addClass("cur").siblings().removeClass("cur");
      $(".list-items .list-item").removeClass().addClass("four list-item");
  });
  $(".spList-navtitle .navtitle-right .columnImg a.three").click(function () {
      $(this).addClass("cur").siblings().removeClass("cur");
      $(".list-items .list-item").removeClass().addClass("three list-item");
  });
  $(".spList-navtitle .navtitle-right .columnImg a.two").click(function () {
      $(this).addClass("cur").siblings().removeClass("cur");
      $(".list-items .list-item").removeClass().addClass("two list-item");
  });
  //排序方式
  $(".sort_select .sort_select_btn").click(function () {
      $(this).next().fadeIn();
      $(".sort_menu li").click(function () {
          var text = $(this).find("a").html();
          $(this).parent().siblings().find("i").html(text);
          $(this).parent().fadeOut();
      });
  });
  $(document).bind("click", function (e) {
      var target = $(e.target);
      if (target.closest(".sort_select_btn,.sort_menu").length == 0) {
          $(".sort_menu").fadeOut();
      };
      e.stopPropagation();
  });

});
