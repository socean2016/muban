define('widget/detail/detail-info/detail-info', function(require, exports, module) {

  "use strict";
  
  var $ = require("node_modules/jquery/dist/jquery");
  
  $(function () {
  	//选择颜色
  	$("body").on("click", ".detail-proColor li", function () {
  		if ($(this).hasClass("limg_ison")) return false;
  		if ($(this).hasClass("non_color")) return false;
  		$(this).addClass("limg_ison").siblings("li").removeClass("limg_ison");
  		$(".sort_select_btn").removeClass("on");
  		$("#detailProChima").hide().prev("span").find("i").html("<i>选择尺码<b>国际码</b></i>");
  		return false;
  	});
  
  	//尺码选择
  	$("body").on("click", ".sort_select > li", function () {
  		$(".add-wish-btn").removeClass("on").find("ul").hide();
  		$(".sort_select_btn").find("ul").hide();
  		if (!$(this).hasClass("on")) {
  			$(this).addClass("on").children("ul").show();
  		} else {
  			$(this).removeClass("on").children("ul").hide();
  		}
  		return false;
  	});
  
  	$("body").on("mouseenter", ".sort_select ul li", function () {
  		if ($(this).hasClass("cmOver")) {
  			return false;
  		} else {
  			$(this).addClass("curr").siblings().removeClass("curr");
  		}
  	});
  	$("body").on("click", ".sort_select ul li", function () {
  
  		if ($(this).hasClass("cmOver")) {
  			return false;
  		} else {
  			var thisText = $(this).find("p").text(),
  			    parentUL = $(this).closest(".sort_select_btn");
  			parentUL.find("span > i").html(thisText);
  			parentUL.find("ul").hide();
  			parentUL.removeClass("on").addClass("over");
  			return false;
  		}
  	});
  	$("body").on("click", ".select_list > li", function () {
  		$(this).addClass("curr").siblings().removeClass("curr");
  	});
  	//未选择尺码提示
  	$("body").on("click", ".add-bag-btn", function () {
  		if (!$(".sort_select_btn").hasClass("over")) {
  			$(".attention").show();
  		} else {
  			$(".attention").hide();
  		}
  	});
  
  	//愿望清单下拉
  	$("body").on("click", function () {
  		if ($(".sort_select_btn").hasClass("on")) {
  			$(".sort_select_btn").removeClass("on").find("ul").hide();
  		}
  		if ($(".add-wish-btn").hasClass("on")) {
  			$(".add-wish-btn").removeClass("on").find("ul").hide();
  		}
  	});
  	$("body").on("click", ".add-wish > li", function () {
  		if (!$(this).hasClass("on")) {
  			if ($(this).find("em").hasClass("star")) {
  				$(this).removeClass("on").children("ul").hide();
  				$(".add-wish-btn").find("span > em").removeClass("star").addClass("fa-angle-down");
  				$(".add-wish-btn").find("span > i").html("加入愿望清单");
  			} else $(this).addClass("on").children("ul").show();
  		} else {
  			$(this).removeClass("on").children("ul").hide();
  			initCreate();
  		}
  
  		if ($("#wishList li").length == 11) {
  			$(".create_wish").css({ "color": "#ccc" });
  			$(".create_wish b strong").css({ "color": "#ccc" });
  		}
  		return false;
  	});
  	$("body").on("mouseenter", ".add-wish ul li", function () {
  		$(this).addClass("curr").siblings().removeClass("curr");
  	});
  	$("body").on("click", ".add-wish ul li", function () {
  		if (!$(this).hasClass("create_wish")) {
  			var thisText = $(this).text(),
  			    parentUL = $(this).closest(".add-wish-btn");
  			parentUL.find("span > i").html("已加入愿望清单");
  			parentUL.find("span > em").addClass("star").removeClass("fa-angle-down");
  			parentUL.find("ul").hide();
  			parentUL.removeClass("on");
  			initCreate();
  			return false;
  		}
  	});
  	//创建愿望清单
  	$("body").on({
  		"mouseenter": function mouseenter() {
  			$(this).removeClass("curr");
  		},
  		"click": function click() {
  			if ($("#wishList li").length == 11) {
  				return false;
  			} else {
  
  				$(".add-wish-btn").find("ul").show();
  				$(".add-wish-btn").find("span > i").html("创建愿望清单");
  				$(".add-wish-btn").find("span > em").removeClass("star").addClass("fa-angle-down");
  				$(".add-wish-btn").removeClass("on");
  				$(this).find("b").hide();
  				$(this).find("input").show().focus();
  				$(this).find("a").show();
  				return false;
  			}
  		}
  	}, ".create_wish");
  
  	$("body").on("click", ".create_sure", function () {
  		$(".create_name").blur();
  		var $createName = $(".create_name").val();
  		$(".add-wish-btn").find("span > i").html("已加入愿望清单");
  		$(".add-wish-btn").find("span > em").removeClass("fa-angle-down").addClass("star");
  		$(".add-wish-btn").find("ul").hide();
  		$(".create_wish").before(" <li>" + $createName + "</li>");
  		initCreate();
  		return false;
  	});
  	var initCreate = function initCreate() {
  		if ($("#wishList").css("display") == "none") {
  
  			$(".create_wish").find("b").show();
  			$(".create_wish").find("input").hide();
  			$(".create_wish").find("a").hide();
  		}
  	};
  	//未登陆加入愿望清单
  	$("body").on({
  		"mouseenter": function mouseenter() {
  			$(this).removeClass("curr");
  		},
  		"click": function click() {
  			$(".add-wish-btn").find("span > i").html("加入愿望清单");
  			$(".add-wish-btn").find("span > em").removeClass("star").addClass("fa-angle-down");
  			return false;
  		}
  	}, ".no_login");
  	var scrollShop = function scrollShop() {
  		var addwishBtn = $(".detail-btn .add-wish-btn");
  		var w_scroll_top = $(this).scrollTop();
  		var offsetTop = addwishBtn.offset().top;
  		if (addwishBtn.offset().top - w_scroll_top < 10) {
  			if ($(".shop-box").find(".sort_select").length == 0) {
  				$(".shop-box").append($(".sort_select"));
  				$(".shop-box").append($(".size-guide"));
  				var str = $(".detail-item-gold").html();
  				$(".shop-box .shop-box-title p").html(str);
  			}
  			$(".shopbox").show();
  		}
  		if (addwishBtn.offset().top - w_scroll_top > 10) {
  			if ($(".select_size").find(".sort_select").length == 0) {
  				$(".select_size").append($(".sort_select"));
  				$(".select_size").append($(".size-guide"));
  			}
  			$(".shopbox").hide();
  		}
  	};
  	scrollShop();
  	$(window).scroll(scrollShop);
  
  	//尺码弹层
  
  	$("body").on("click", ".size-guide", function () {
  		// $(".content-box").mCustomScrollbar({
  		// 	axis:"x",
  		// 	advanced:{autoExpandHorizontalScroll:true},
  		// 	mouseWheel:false
  		// });
  		// $(".content-box2").mCustomScrollbar({
  		// 	axis:"x",
  		// 	advanced:{autoExpandHorizontalScroll:true},
  		// 	mouseWheel:false
  		// });
  		// $(".content-box3").mCustomScrollbar({
  		// 	axis:"x",
  		// 	advanced:{autoExpandHorizontalScroll:true},
  		// 	mouseWheel:false
  		// });
  
  		$(".alert-size").show();
  	});
  	$("body").on("click", ".size-box h3 a", function () {
  		$(".alert-size").hide();
  	});
  	//footer slideDown
  	$("body").on("click", ".js-accordion dt", function (e) {
  		//$('body').quickOn('click',".js-accordion dt", function(e){
  		e.preventDefault();
  		if ($('.acc-angle').css('display') == 'block') {
  			if ($(this).find('.acc-angle').hasClass('fa-angle-up')) {
  				$(this).find('.acc-angle').removeClass('fa-angle-up').addClass('fa-angle-down');
  			} else {
  				$(this).find('.acc-angle').removeClass('fa-angle-down').addClass('fa-angle-up').parent().parent().siblings().find('.acc-angle').addClass('fa-angle-down').removeClass('fa-angle-up');
  			}
  			$(this).siblings('dd').slideToggle().parent().siblings().find('dd').slideUp();
  		}
  	});
  
  	$("body").on({
  		"mouseover": function mouseover() {
  			$(this).siblings("em").stop(true).fadeIn();
  		},
  		"mouseout": function mouseout() {
  			$(this).siblings("em").stop(true).fadeOut();
  		}
  	}, ".thumbnail");
  
  	$("body").on("click", ".select_comment a", function () {
  		$(this).addClass("cur").siblings("a").removeClass("cur");
  		var that = $(this).parent().siblings("ul").find("li");
  		if ($(this).hasClass("onlypic")) {
  			for (var i = 0; i < that.length; i++) {
  				if (that.eq(i).find("span").length == 1) {
  					that.eq(i).slideUp();
  				}
  			};
  		} else {
  			that.slideDown();
  		}
  	});
  });

});
