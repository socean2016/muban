define('widget/detail/detail-like-swiper/detail-like-swiper', function(require, exports, module) {

  "use strict";
  
  var $ = require('node_modules/jquery/dist/jquery');
  
  $(function () {
  	$(".detail-swiper-title").on("click", ".tab-like", function () {
  		$(this).css("color", "#000");
  		$(".tab-recent").css("color", "#888");
  		$(".tab1").css("height", "auto");
  		$(".tab2").css("height", "0px");
  	});
  
  	$(".detail-swiper-title").on("click", ".tab-recent", function () {
  		$(this).css("color", "#000");
  		$(".tab-like").css("color", "#888");
  		$(".tab1").css("height", "0px");
  		$(".tab2").css("height", "auto");
  	});
  	//猜你喜欢轮播，后期写入ajax success
  	if ($('#swiper-container2 .swiper-wrapper .swiper-slide').length >= 4) {
  		var swiper1 = new Swiper('#swiper-container2', {
  			//slidesPerView: 'auto',
  			nextButton: '#swiper-container2 .swiper-button-next',
  			prevButton: '#swiper-container2 .swiper-button-prev',
  			slidesPerView: 4,
  			loop: true
  		});
  	}
  	if ($('#swiper-container3 .swiper-wrapper .swiper-slide').length >= 4) {
  		var swiper2 = new Swiper('#swiper-container3', {
  			//slidesPerView: 'auto',
  			nextButton: '#swiper-container3 .swiper-button-next',
  			prevButton: '#swiper-container3 .swiper-button-prev',
  			slidesPerView: 4,
  			loop: true
  		});
  	}
  });

});
