define('widget/spList-leftMenu/spList-leftMenu', function(require, exports, module) {

  'use strict';
  
  var $ = require('node_modules/jquery/dist/jquery');
  require('static/js/jscroll');
  /*点击出现蒙版*/
  // $(".categroy_box li a,.item_list a.isCheck,.spList-navtitle label,.sort_menu li").bind("click",function(){
  //     $(".listing-loading").removeClass("hide");
  // })
  // 下拉筛选
  function showAll(ele, ele_class) {
      var $nextUl = $(ele).next("ul"); //找到下一级ul
      var $nextAllUl = $nextUl.find("ul"); //所有下级ul
      var $clearBtn = $(ele).parents(".item_list").siblings(".clear_box").find(".item_clear"); //清除按钮
      // 判断是否选中
      if (!$(ele).hasClass(ele_class)) {
          $(ele).addClass(ele_class);
          $clearBtn.removeClass("hide");
          $nextUl.slideDown();
      } else {
          $(ele).removeClass(ele_class);
          $clearBtn.addClass("hide");
          $nextUl.find("." + ele_class).removeClass(ele_class);
          $nextUl.slideUp();
          $nextAllUl.slideUp();
      }
  }
  // 清楚全部
  function clearAll() {
      var activeNum = $(".spList-leftMenu .active").length;
      if (activeNum > 0) {
          $(".spList-leftMenu .clear_all").fadeIn().removeClass("hide");
      } else {
          $(".spList-leftMenu .clear_all").fadeOut().addClass("hide");
      }
  }
  // 清除部分
  function clearPart(ele) {
      var $clearBtn = $(ele).parents(".item_list").siblings(".clear_box").find(".item_clear");
      var selectUl = $(ele).parents(".select_item");
      if (selectUl.find(".active").length > 0) {
          $clearBtn.removeClass("hide");
      } else {
          $clearBtn.addClass("hide");
      }
  }
  // 分类筛选
  $(".categroy_box li a").click(function () {
      if ($(this).hasClass("disabled")) {
          return false;
      }; //不可点状态
      showAll(this, "active");
      clearPart(this);
      clearAll();
  });
  //品类总开关
  $(".clear_box .item_title").click(function () {
      if ($(this).hasClass("disabled")) {
          return false;
      }; //不可点状态
      var $nextItemList = $(this).parent(".clear_box").next(".item_list"); //下边ul
      var activeNum = $(".item_list .active").length; //active 数量 判断是否显示清除
      if ($(this).hasClass("cur")) {
          $(this).removeClass("cur");
          $nextItemList.slideUp(); //收起列表
          $(this).next(".item_clear").addClass("hide"); //收起清除
      } else {
          $(this).addClass("cur");
          $nextItemList.slideDown();
          if (activeNum == 0) {
              //判断是否显示清除
              $(this).next(".item_clear").addClass("hide");
          } else {
              $(this).next(".item_clear").removeClass("hide");
          }
      }
  });
  // 其他盒子选择
  $(".item_list a.isCheck").click(function () {
      if ($(this).hasClass("disabled")) {
          return false;
      }; //不可点状态
      !$(this).hasClass("active") ? $(this).addClass("active") : $(this).removeClass("active");
      // 判断清楚是否出现
      clearPart(this);
      clearAll();
  });
  // 点击清楚全部按钮
  $(".clear_all").click(function () {
      $(".nav_box").find(".active").removeClass("active");
      $(".nav_box").find(".item_clear").addClass("hide");
      $(".categroy_box li a").siblings("ul").slideUp();
      $(this).fadeOut().addClass("hide");
      return false;
  });
  // 点击清楚部分按钮
  $(".item_clear").click(function () {
      $(this).addClass("hide");
      $(this).parent().siblings().find(".active").removeClass("active");
      $(this).parent().siblings(".item_list").find(".categroy_box ul").slideUp();
      clearAll();
  });
  // 尺码超过一行 居中显示
  $(".item-img").hover(function () {
      $(this).find(".item_size").stop().fadeIn(400);
      $(this).find(".img-sec,.img-fir").stop().addClass("hover");
      var itemSizeH = $(this).find(".item_size").height();
      if (itemSizeH < 35) {
          $(this).find(".item_size em").addClass("one");
      } else {
          return;
      }
  }, function () {
      $(this).find(".item_size").stop().fadeOut(400);
      $(this).find(".img-sec,.img-fir").stop().removeClass("hover");
  });

});
