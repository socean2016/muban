define('widget/detail/detail-swiper/detail-swiper', function(require, exports, module) {

  'use strict';
  
  var $ = require('node_modules/jquery/dist/jquery');
  $(function () {
  	//var w_scroll_new = $("#hiddenScroll").val();
  	//window.scrollTo(0, w_scroll_new);
  	//判断左侧商品图片导航栏是否需要滚动
  	var isScrollPagination = function isScrollPagination() {
  		var $jsSwiperPagination = $('#detail-swiper-container .js-swiper-pagination');
  		var translate;
  		var length = $jsSwiperPagination.find('.swiper-pagination-bullet').length;
  		var showPagination = 5;
  		if (length > showPagination) {
  			// 如果商品图片总数超过可显示个数，增加Pagination的上下滑动功能;
  			var swiperPaginationBullet = function swiperPaginationBullet() {
  				var index = $jsSwiperPagination.find('.swiper-pagination-bullet-active').index();
  				if (index >= 2) {
  					var num = index > length - showPagination ? length - showPagination : index - 1;
  					translate = num * -110;
  					$jsSwiperPagination.css('transform', 'translate(0,' + translate + 'px)');
  				} else if (translate < 0) {
  					translate = (index - 1) * -110 < 0 ? 0 : (index - 1) * -110;
  					$jsSwiperPagination.css('transform', 'translate(0,' + translate + 'px)');
  				}
  			};
  			$('.pagination-button-next').click(function () {
  				//detailSwiper.slideNext();
  				swiperPaginationBullet();
  			});
  			$('.pagination-button-prev').click(function () {
  				//detailSwiper.slidePrev();
  				swiperPaginationBullet();
  			});
  			$("body").on("click", ".swiper-pagination-bullet", function () {
  				swiperPaginationBullet();
  			});
  		}
  	};
  	var detailCon = ["/static/img/detail/bigimg01.jpg", "/static/img/detail/bigimg02.jpg", "/static/img/detail/bigimg03.jpg", "/static/img/detail/bigimg04.jpg", "/static/img/detail/bigimg05.jpg", "/static/img/detail/bigimg06.jpg"];
  	var thumb = ['/static/img/detail/thumb01.jpg', '/static/img/detail/thumb02.jpg', '/static/img/detail/thumb03.jpg', '/static/img/detail/thumb04.jpg', '/static/img/detail/thumb05.jpg', '/static/img/detail/thumb06.jpg'];
  	var detailSwiper = new Swiper('#detail-swiper-container', {
  		//loop : true,
  		prevButton: '.pagination-button-prev',
  		nextButton: '.pagination-button-next',
  		direction: 'vertical',
  		onlyExternal: true,
  		pagination: '#detail-swiper-container .swiper-pagination',
  		paginationClickable: true,
  		paginationBulletRender: function paginationBulletRender(detailSwiper, index, className) {
  			return '<div class=' + className + '><img width="70" height="93" src=' + thumb[index] + ' /></div>';
  		}
  		// onSlideChangeStart:function(){
  		// 	zoomImg($("#detail-swiper-container .swiper-slide a img").eq(detailSwiper.activeIndex));
  		// }
  	});
  	isScrollPagination();
  	var zoomImg = function zoomImg(ele) {
  		if (ele) {
  			var imgHeight = ele.height(),
  			    imgWidth = ele.width(),
  			    imgTop = ele.offset().top,
  			    imgLeft = ele.offset().left,
  			    picWidth = $(".detail-pic-box .detail-con").width() + 15,
  			    //右侧产品详情结构，未分离
  			picHeight = $(".detail-pic-box .detail-con").height(),
  			    picLeft = $(".detail-pic-box .detail-con").offset().left,
  			    picTop = $(".detail-pic-box .detail-con").offset().top,
  			    mouseBox = $("<div>").attr({ "id": "mouseBox" }).css({
  				"position": "absolute",
  				"z-index": "99",
  				"background": "rgba(255,255,255,.5)",
  				"width": parseInt(imgWidth * 0.3),
  				"height": parseInt(imgHeight * 0.3),
  				"top": imgTop,
  				"left": imgLeft,
  				"border": "1px solid #ccc",
  				"cursor": "crosshair",
  				"display": "none"
  			}),
  			    picBox = $("<div>").attr({ "id": "picBox" }).css({
  				"width": picWidth,
  				"height": picHeight,
  				"z-index": "99",
  				"position": "absolute",
  				"left": picLeft,
  				"top": picTop,
  				"background-color": "#fff",
  				//"background-image":"url("+detailCon.detail.images.swiperBig[n]+")",
  				"border": "1px solid #ccc",
  				"background-repeat": "no-repeat",
  				"display": "none"
  			}).html("正在加载大图，请稍后...");
  			$("body").append(mouseBox, picBox);
  			ele.bind("mouseover", function (e) {
  				mouseBox.fadeIn();
  				picBox.fadeIn();
  				var n = detailSwiper.activeIndex;
  				var BigIMG = new Image();
  				BigIMG.src = detailCon[n];
  				if (BigIMG.complete) {
  					picBox.css({ "background-image": "url(" + BigIMG.src + ")" }).html("");
  				} else {
  					BigIMG.onload = function () {
  						picBox.css({ "background-image": "url(" + BigIMG.src + ")" }).html("");
  					};
  				}
  				console.log("mouseover");
  			});
  			// mouseBox.bind("mouseout",function(){
  			// 	mouseBox.stop(true).fadeOut(100);
  			// 	picBox.stop(true).fadeOut(100);
  			// 	return false;
  			// });
  			console.log(ele);
  			$(document).on("mousemove", function (e) {
  				var x = e.pageX,
  				    y = e.pageY,
  				    bgLeft = (1080 - picWidth) * (x - imgLeft - imgWidth * 0.15) / (imgWidth * 0.7),
  				    bgTop = 1440 * (y - imgTop - imgHeight * 0.15) / imgHeight * 0.75;
  				if (x < imgLeft || x > imgLeft + imgWidth || y < imgTop || y > imgTop + imgHeight) {
  					mouseBox.hide();
  					picBox.hide();
  					console.log("mouseout");
  					return false;
  				}
  				if (x <= imgLeft + imgWidth * 0.15) {
  					mouseBox.css({ "left": imgLeft });
  					picBox.css({ "background-position-x": "0px" });
  				} else if (x >= imgLeft + imgWidth * 0.85) {
  					mouseBox.css({ "left": imgLeft + imgWidth * 0.7 });
  				} else {
  					mouseBox.css({ "left": x - imgWidth * 0.15 });
  					picBox.css({ "background-position-x": -bgLeft });
  				}
  				if (y <= imgTop + imgHeight * 0.15) {
  					mouseBox.css({ "top": imgTop });
  				} else if (y >= imgTop + imgHeight * 0.85) {
  					mouseBox.css({ "top": imgTop + imgHeight * 0.7 });
  				} else {
  					mouseBox.css({ "top": y - imgHeight * 0.15 });
  					picBox.css({ "background-position-y": -bgTop });
  				}
  			});
  			window.onresize = function () {
  				mouseBox.remove();
  				picBox.remove();
  				zoomImg(ele);
  			};
  		}
  	};
  	zoomImg($("#detail-swiper-container .swiper-slide a img"));
  });

});
