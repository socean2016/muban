define('widget/detail/detail-pro/detail-pro', function(require, exports, module) {

  "use strict";
  
  var $ = require('node_modules/jquery/dist/jquery');
  
  $(function () {
  	$(".detail_title").bind("click", "span", function () {
  		var spanCss = $(this).find("span");
  
  		if (!spanCss.hasClass("down")) {
  			$(this).find("span").addClass("down");
  			$(this).parent().find(".detail_content").slideUp();
  		} else {
  			$(this).find("span").removeClass("down");
  			$(this).parent().find(".detail_content").slideDown();
  		}
  	});
  });

});
