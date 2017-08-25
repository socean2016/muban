define('widget/header/header', function(require, exports, module) {

  'use strict';
  
  var $ = require('node_modules/jquery/dist/jquery');
  var Snap = require('node_modules/snapsvg/dist/snap.svg');
  require('node_modules/lazysizes/lazysizes');
  //header 滚轮效果
  //页面滚动pc-header fixed
  // pageScrollTop 页面滚动的距离
  // pagePrevScrollTop 页面上次滚动的距离
  var pageScrollTop = 0;
  var pagePrevScrollTop = 0;
  var pcHeaderHeight = 118; //这里定死了，
  var scrollNowDirection = '';
  var scrollPrevDirection = '';
  $(window).scroll(function () {
  	pageScrollTop = $(this).scrollTop();
  	if (pagePrevScrollTop <= pageScrollTop) {
  		//下滚
  		scrollNowDirection = 'down';
  	} else {
  		//上滚
  		scrollNowDirection = 'up';
  	}
  	pagePrevScrollTop = pageScrollTop;
  	if (scrollNowDirection === scrollPrevDirection) {
  		scrollPrevDirection = scrollNowDirection;
  		if (pageScrollTop <= 0) {
  			$('.pc-header').removeClass('fixed-pc-header');
  			$('.fixed-header-box').hide();
  		}
  	} else {
  		scrollPrevDirection = scrollNowDirection;
  		if (scrollNowDirection === 'up') {
  			if (pageScrollTop <= 0) {
  				$('.pc-header').removeClass('fixed-pc-header');
  				$('.fixed-header-box').hide();
  			} else {
  				$('.fixed-header-box').show();
  				$('.pc-header').addClass('fixed-pc-header').css({ top: -180 });
  				$('.fixed-pc-header').stop().animate({ top: 0 }, "800");
  			}
  		} else {
  			if (pageScrollTop >= $('.pc-header').height()) {
  				$('.fixed-pc-header').stop().animate({ top: -180 }, "800", function () {
  					$('.pc-header').removeClass('fixed-pc-header');
  					$('.pc-header').css({ height: pcHeaderHeight });
  					$('.fixed-header-box').hide();
  				});
  			}
  		}
  	}
  });
  
  // 个人中心
  var oPersonCenterTime = null;
  $(document).on('mouseover', '.mine, .mine-box', function () {
  	clearTimeout(oPersonCenterTime);
  	oPersonCenterTime = setTimeout(function () {
  		$('.mine-box').fadeIn('fast');
  		$('.mine-angle').fadeIn('fast');
  	}, 200);
  });
  $(document).on('mouseout', '.mine, .mine-box', function () {
  	clearTimeout(oPersonCenterTime);
  	oPersonCenterTime = setTimeout(function () {
  		$('.mine-box').fadeOut('fast');
  		$('.mine-angle').fadeOut('fast');
  	}, 200);
  });
  
  // 购物袋
  var oBagTime = null;
  $(document).on('mouseover', '.bag, .shop-cart', function () {
  	clearTimeout(oBagTime);
  	oBagTime = setTimeout(function () {
  		$('.shop-cart').fadeIn('fast');
  		$('.bag-angle').fadeIn('fast');
  	}, 200);
  });
  $(document).on('mouseout', '.bag, .shop-cart', function () {
  	clearTimeout(oBagTime);
  	oBagTime = setTimeout(function () {
  		$('.shop-cart').fadeOut('fast');
  		$('.bag-angle').fadeOut('fast');
  	}, 200);
  });
  
  //运动扩展
  $.extend($.easing, {
  	easeOutExpo: function easeOutExpo(x, t, b, c, d) {
  		return t == d ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
  	},
  	easeOutBounce: function easeOutBounce(x, t, b, c, d) {
  		if ((t /= d) < 1 / 2.75) {
  			return c * (7.5625 * t * t) + b;
  		} else if (t < 2 / 2.75) {
  			return c * (7.5625 * (t -= 1.5 / 2.75) * t + .75) + b;
  		} else if (t < 2.5 / 2.75) {
  			return c * (7.5625 * (t -= 2.25 / 2.75) * t + .9375) + b;
  		} else {
  			return c * (7.5625 * (t -= 2.625 / 2.75) * t + .984375) + b;
  		}
  	}
  });
  
  // logo-nav 男 女 儿童 运动
  var aSexA = $('.sex li a');
  var oNavbarUp = $('.up-triangle');
  var aNavbarRow = $('.navbar .list-item');
  var oNavbarDetail = $('.navbar-detail'); //
  var aDetailItem = $('.navbar-detail .detail-item');
  var navTime = null;
  var box = $('.navbar-detail');
  
  //女士为0；男士为1，儿童为2 
  //init--------------------------------------------------------------
  var moveIndex = 0; //页面进来后选中哪个
  var selectInitSex = moveIndex; //记录初始值
  aSexA.eq(moveIndex).addClass('on');
  aNavbarRow.eq(moveIndex).css({ "z-index": "10", "display": "inline-block" });
  aDetailItem.eq(moveIndex).css({ "display": "block" });
  oNavbarUp.css({ 'left': 36 + moveIndex * 76 + 'px' }, 200);
  
  //男女儿童与各自的list联动
  aSexA.each(function (index, element) {
  	$(element).mouseenter(function () {
  		if ($(this).hasClass('on')) return;
  		aSexA.each(function (idx, ele) {
  			$(ele).removeClass('on');
  			aNavbarRow.eq(idx).hide();
  			aNavbarRow.eq(idx).css({ "z-index": "0" });
  			aDetailItem.eq(idx).hide();
  		});
  		switch (index) {
  			case 0:
  				oNavbarUp.animate({
  					'left': 36 + 'px'
  				}, 200);
  				aSexA.eq(index).addClass('on');
  				// aNavbarRow.eq(index).css({"z-index":"1","display":"inline-block"});
  				aNavbarRow.eq(index).fadeIn('slow').css({ "z-index": "10", "display": "inline-block" });
  				aDetailItem.eq(index).show();
  				selectInitSex = 0;
  				break;
  			case 1:
  				oNavbarUp.animate({
  					'left': 112 + 'px'
  				}, 200);
  				aSexA.eq(index).addClass('on');
  				aDetailItem.eq(index).show();
  				// aNavbarRow.eq(index).css({"z-index":"1","display":"inline-block"});	
  				aNavbarRow.eq(index).fadeIn('slow').css({ "z-index": "10", "display": "inline-block" });
  				aDetailItem.eq(index).show();
  				selectInitSex = 1;
  				break;
  			case 2:
  				oNavbarUp.animate({
  					'left': 188 + 'px'
  				}, 200);
  				aSexA.eq(index).addClass('on');
  				aDetailItem.eq(index).show();
  				// aNavbarRow.eq(index).css({"z-index":"1","display":"inline-block"});	
  				aNavbarRow.eq(index).fadeIn('slow').css({ "z-index": "10", "display": "inline-block" });
  				aDetailItem.eq(index).show();
  				selectInitSex = 2;
  				break;
  		}
  	});
  });
  
  //男女儿童各自的list与detail联动
  var box_show = function box_show(hei, oBarLine, oBarLineWidth, oLeft) {
  	if (oBarLine) {
  		oBarLine.css({ 'width': oBarLineWidth });
  		oBarLine.stop().animate({ left: oLeft }, "fast", "easeOutExpo");
  	}
  	box.stop().animate({
  		height: hei,
  		opacity: 1
  	}, 400);
  };
  var box_hide = function box_hide(oBarLine, oBarLineWidth, oLeft) {
  	if (oBarLine) {
  		oBarLine.css({ 'width': oBarLineWidth });
  		oBarLine.stop().animate({ left: oLeft }, "fast", "easeOutExpo");
  	}
  	box.stop().animate({
  		height: 0,
  		opacity: 0
  	}, 400);
  };
  function navDetailMove(list, lista, DetailList) {
  	var oBarLine = list.find('.navbar-line');
  
  	for (var i = 0; i < lista.length; i++) {
  		(function (index) {
  			$(lista[index]).on('mouseenter', function () {
  				clearTimeout(navTime);
  				navTime = setTimeout(function () {
  					$('.pc-header').siblings().addClass('page-blur');
  					var oBarLineWidth = lista.eq(index).find('a').width();
  					var oBarLineLeft = lista.eq(index).find('a').offset().left;
  					var oLeft = oBarLineLeft - list.offset().left;
  					DetailList.find(".cont").hide().eq(index).show();
  					var _height = DetailList.find(".cont").eq(index).height() + 40;
  					box_show(_height, oBarLine, oBarLineWidth, oLeft);
  				}, 100);
  			});
  			$(lista[index]).on('mouseleave', function () {
  				clearTimeout(navTime);
  				navTime = setTimeout(function () {
  					$('.pc-header').siblings().removeClass('page-blur');
  					DetailList.find(".cont").hide();
  					box_hide(oBarLine, 0, 0);
  				}, 100);
  			});
  		})(i);
  	}
  
  	DetailList.find(".cont").hover(function () {
  		$('.pc-header').siblings().addClass('page-blur');
  		var _index = DetailList.find(".cont").index($(this));
  		lista.eq(_index).find('a em').show();
  		clearTimeout(navTime);
  		$(this).show();
  		var _height = $(this).height() + 40;
  		box_show(_height);
  	}, function () {
  		$('.pc-header').siblings().removeClass('page-blur');
  		var _index = DetailList.find(".cont").index($(this));
  		lista.eq(_index).find('a em').fadeOut('slow');
  		navTime = setTimeout(function () {
  			$(this).hide();
  			box_hide(oBarLine, 0, 0);
  		}, 50);
  	});
  }
  var list0 = aNavbarRow.eq(0);
  var lista0 = list0.find('span');
  var DetailList0 = aDetailItem.eq(0);
  var list1 = aNavbarRow.eq(1);
  var lista1 = list1.find('span');
  var DetailList1 = aDetailItem.eq(1);
  var list2 = aNavbarRow.eq(2);
  var lista2 = list2.find('span');
  var DetailList2 = aDetailItem.eq(2);
  navDetailMove(list0, lista0, DetailList0);
  navDetailMove(list1, lista1, DetailList1);
  navDetailMove(list2, lista2, DetailList2);
  
  //移除后的回复原状态
  $('.pc-header').on('mouseleave', function () {
  	if (moveIndex === selectInitSex) {
  		return;
  	}
  	aSexA.each(function (idx, ele) {
  		$(ele).removeClass('on');
  		aNavbarRow.eq(idx).hide();
  		aNavbarRow.eq(idx).css({ "z-index": "0" });
  		aDetailItem.eq(idx).hide();
  	});
  	switch (moveIndex) {
  		case 0:
  			oNavbarUp.animate({
  				'left': 36 + 'px'
  			}, 200);
  			aSexA.eq(moveIndex).addClass('on');
  			aNavbarRow.eq(moveIndex).fadeIn('slow').css({ "z-index": "10", "display": "inline-block" });
  			aDetailItem.eq(moveIndex).show();
  			break;
  		case 1:
  			oNavbarUp.animate({
  				'left': 112 + 'px'
  			}, 200);
  			aSexA.eq(moveIndex).addClass('on');
  			aNavbarRow.eq(moveIndex).fadeIn('slow').css({ "z-index": "10", "display": "inline-block" });
  			aDetailItem.eq(moveIndex).show();
  			break;
  		case 2:
  			oNavbarUp.animate({
  				'left': 188 + 'px'
  			}, 200);
  			aSexA.eq(moveIndex).addClass('on');
  			aNavbarRow.eq(moveIndex).fadeIn('slow').css({ "z-index": "10", "display": "inline-block" });
  			aDetailItem.eq(moveIndex).show();
  			break;
  	}
  });
  
  /* =====  search Svg 运动 ===== */
  var $search = $(".search"),
      $screenwidth = $(window).width(),
      $input = $(".search-input"),
      $close = $(".search-close"),
      $svg = $(".search-svg"),
      $cover = $(".cover"),
      $path = $(".search-svg__path")[0],
      initD = $svg.data("init"),
      midD = $svg.data("mid"),
      finalD = $svg.data("active"),
      backDelay = 400,
      midAnim = 200,
      bigAnim = 400,
      animating = false;
  $('body').on("click", ".search:not(.active)", function () {
  	if (animating) return;
  	animating = true;
  	$search.addClass("active");
  	$input.focus();
  	$(".searchList").css({ "margin-top": "32px" });
  	$(".search").css({ "z-index": "200" });
  	//$input.animate({ marginTop: "2px" }, 1000);
  	Snap($path).animate({ "path": midD }, midAnim, mina.backin, function () {
  		Snap($path).animate({ "path": finalD }, bigAnim, mina.easeinout, function () {
  			$input.addClass("visible");
  			$close.addClass("visible");
  			animating = false;
  		});
  	});
  	return false;
  });
  function blurinput() {
  	if (animating) return;
  	animating = true;
  	$(".search-list").hide();
  	$input.removeClass("visible");
  	$close.removeClass("visible");
  	$search.removeClass("active");
  	$input.attr("value", "");
  	//$input.animate({ marginTop: "-200px" }, 1000);
  	setTimeout(function () {
  		Snap($path).animate({ "path": midD }, bigAnim, mina.easeinout, function () {
  			Snap($path).animate({ "path": initD }, midAnim, mina.easeinout, function () {
  				animating = false;
  			});
  		});
  	}, backDelay);
  	$(".search").css({ "z-index": "100" });
  	$(".searchList").hide();
  	$(".hisdiv").remove();
  	$(".proType").remove();
  	$('.search-input').blur();
  	$(".searchList").css({ "margin-top": "32px" });
  	return false;
  }
  $('body').on("click", ".search-close", function () {
  	blurinput();
  });

});
