define('static/js/jscroll', function(require, exports, module) {

  var $ = require('node_modules/jquery/dist/jquery')
  $.fn.extend({//添加滚轮事件
  	mousewheel:function(Func){
  		return this.each(function(){
  			var _self = this;
  		    _self.D = 0;//滚动方向
  			var isIE = /msie/.test(navigator.userAgent.toLowerCase());
  			var isSafari = /safari/.test(navigator.userAgent.toLowerCase());
  			if (isIE || isSafari) {
  			   _self.onmousewheel=function(){_self.D = event.wheelDelta;event.returnValue = false;Func && Func.call(_self);};
  			}else{
  			   _self.addEventListener("DOMMouseScroll",function(e){
  					_self.D = e.detail>0?-1:1;
  					e.preventDefault();
  					Func && Func.call(_self);
  			   },false); 
  			}
  		});
  	}
  });
  $.fn.extend({
  	jscroll:function(j){
  		return this.each(function(){
  			j = j || {}
  			j.Bar = j.Bar||{};//2级对象
  			j.Btn = j.Btn||{};//2级对象
  			j.Bar.Bg = j.Bar.Bg||{};//3级对象
  			j.Bar.Bd = j.Bar.Bd||{};//3级对象
  			j.Btn.uBg = j.Btn.uBg||{};//3级对象
  			j.Btn.dBg = j.Btn.dBg||{};//3级对象
  			var jun = { W:"15px"
  						,BgUrl:""
  						,Bg:"#efefef"//滚轮底色
  						,Bar:{  Pos:"up"
  								,Bd:{Out:"#b5b5b5",Hover:"#ccc"}//滚轮边框颜色
  								,Bg:{Out:"#fff",Hover:"#fff",Focus:"#b6b5b5"}}
  						,Btn:{  btn:true
  								,uBg:{Out:"#ccc",Hover:"#b6b5b5",Focus:"orange"}
  								,dBg:{Out:"#ccc",Hover:"#b6b5b5",Focus:"orange"}}
  						,Fn:function(){}}
  			j.W = j.W||jun.W;
  			j.BgUrl = j.BgUrl||jun.BgUrl;
  			j.Bg = j.Bg||jun.Bg;
  				j.Bar.Pos = j.Bar.Pos||jun.Bar.Pos;
  					j.Bar.Bd.Out = j.Bar.Bd.Out||jun.Bar.Bd.Out;
  					j.Bar.Bd.Hover = j.Bar.Bd.Hover||jun.Bar.Bd.Hover;
  					j.Bar.Bg.Out = j.Bar.Bg.Out||jun.Bar.Bg.Out;
  					j.Bar.Bg.Hover = j.Bar.Bg.Hover||jun.Bar.Bg.Hover;
  					j.Bar.Bg.Focus = j.Bar.Bg.Focus||jun.Bar.Bg.Focus;
  				j.Btn.btn = j.Btn.btn!=undefined?j.Btn.btn:jun.Btn.btn;
  					j.Btn.uBg.Out = j.Btn.uBg.Out||jun.Btn.uBg.Out;
  					j.Btn.uBg.Hover = j.Btn.uBg.Hover||jun.Btn.uBg.Hover;
  					j.Btn.uBg.Focus = j.Btn.uBg.Focus||jun.Btn.uBg.Focus;
  					j.Btn.dBg.Out = j.Btn.dBg.Out||jun.Btn.dBg.Out;
  					j.Btn.dBg.Hover = j.Btn.dBg.Hover||jun.Btn.dBg.Hover;
  					j.Btn.dBg.Focus = j.Btn.dBg.Focus||jun.Btn.dBg.Focus;
  			j.Fn = j.Fn||jun.Fn;
  			var _self = this;
  			var Stime,Sp=0,Isup=0;
  			$(_self).css({overflow:"hidden",position:"relative",padding:"0px"});
  			var dw = $(_self).width(), dh = $(_self).height()-1;
  			var sw = j.W ? parseInt(j.W) : 21;
  			var sl = dw - sw
  			var bw = j.Btn.btn==true ? sw : 0;
  			if($(_self).children(".jscroll-c").height()==null){//存在性检测
  		$(_self).wrapInner("<div class='jscroll-c' style='top:0px;z-index:99;zoom:1;position:relative'></div>");
  			$(_self).children(".jscroll-c").prepend("<div style='height:0px;overflow:hidden'></div>");
  			$(_self).append("<div class='jscroll-e' unselectable='on' style=' height:100%;top:0px;right:0;-moz-user-select:none;position:absolute;overflow:hidden;z-index:100;'><div class='jscroll-u' style='position:absolute;top:0px;width:100%;left:0;background:blue;overflow:hidden'></div><div class='jscroll-h'  unselectable='on' style='background:green;position:absolute;left:1px;-moz-user-select:none;'></div><div class='jscroll-d' style='position:absolute;bottom:0px;width:100%;left:0;background:blue;overflow:hidden'></div></div>");
  			}
  			var jscrollc = $(_self).children(".jscroll-c");
  			var jscrolle = $(_self).children(".jscroll-e");
  			var jscrollh = jscrolle.children(".jscroll-h");
  			var jscrollu = jscrolle.children(".jscroll-u");
  			var jscrolld = jscrolle.children(".jscroll-d");
  			if($.support.msie){document.execCommand("BackgroundImageCache", false, true);}
  			jscrollc.css({"padding-right":sw});
  			jscrolle.css({width:sw,background:j.Bg,"background-image":j.BgUrl});
  			jscrollh.css({top:bw,background:j.Bar.Bg.Out,"background-image":j.BgUrl,"border-color":j.Bar.Bd.Out,width:sw-2});
  			jscrollu.css({height:bw,background:j.Btn.uBg.Out,"background-image":j.BgUrl});
  			jscrolld.css({height:bw,background:j.Btn.dBg.Out,"background-image":j.BgUrl});
  			jscrollh.hover(function(){if(Isup==0)$(this).css({background:j.Bar.Bg.Hover,"background-image":j.BgUrl,"border-color":j.Bar.Bd.Hover})},function(){if(Isup==0)$(this).css({background:j.Bar.Bg.Out,"background-image":j.BgUrl,"border-color":j.Bar.Bd.Out})})
  			jscrollu.hover(function(){if(Isup==0)$(this).css({background:j.Btn.uBg.Hover,"background-image":j.BgUrl})},function(){if(Isup==0)$(this).css({background:j.Btn.uBg.Out,"background-image":j.BgUrl})})
  			jscrolld.hover(function(){if(Isup==0)$(this).css({background:j.Btn.dBg.Hover,"background-image":j.BgUrl})},function(){if(Isup==0)$(this).css({background:j.Btn.dBg.Out,"background-image":j.BgUrl})})
  			var sch = jscrollc.height();
  			//var sh = Math.pow(dh,2) / sch ;//Math.pow(x,y)x的y次方
  			var sh = (dh-2*bw)*dh / sch
  			//if(sh<10){sh=10}
  			var wh = sh/6//滚动时候跳动幅度
  		//	sh = parseInt(sh);
  			var curT = 0,allowS=false;
  			jscrollh.height(sh);
  			if(sch<=dh){jscrollc.css({padding:0});jscrolle.css({display:"none"})}else{allowS=true;}
  			if(j.Bar.Pos!="up"){
  			curT=dh-sh-bw;
  			setT();
  			}
  			jscrollh.bind("mousedown",function(e){
  				j['Fn'] && j['Fn'].call(_self);
  				Isup=1;
  				jscrollh.css({background:j.Bar.Bg.Focus,"background-image":j.BgUrl})
  				var pageY = e.pageY ,t = parseInt($(this).css("top"));
  				$(document).mousemove(function(e2){
  					 curT =t+ e2.pageY - pageY;//pageY浏览器可视区域鼠标位置，screenY屏幕可视区域鼠标位置
  						setT();
  				});
  				$(document).mouseup(function(){
  					Isup=0;
  					jscrollh.css({background:j.Bar.Bg.Out,"background-image":j.BgUrl,"border-color":j.Bar.Bd.Out})
  					$(document).unbind();
  				});
  				return false;
  			});
  			jscrollu.bind("mousedown",function(e){
  			j['Fn'] && j['Fn'].call(_self);
  				Isup=1;
  				jscrollu.css({background:j.Btn.uBg.Focus,"background-image":j.BgUrl})
  				_self.timeSetT("u");
  				$(document).mouseup(function(){
  					Isup=0;
  					jscrollu.css({background:j.Btn.uBg.Out,"background-image":j.BgUrl})
  					$(document).unbind();
  					clearTimeout(Stime);
  					Sp=0;
  				});
  				return false;
  			});
  			jscrolld.bind("mousedown",function(e){
  			j['Fn'] && j['Fn'].call(_self);
  				Isup=1;
  				jscrolld.css({background:j.Btn.dBg.Focus,"background-image":j.BgUrl})
  				_self.timeSetT("d");
  				$(document).mouseup(function(){
  					Isup=0;
  					jscrolld.css({background:j.Btn.dBg.Out,"background-image":j.BgUrl})
  					$(document).unbind();
  					clearTimeout(Stime);
  					Sp=0;
  				});
  				return false;
  			});
  			_self.timeSetT = function(d){
  				var self=this;
  				if(d=="u"){curT-=wh;}else{curT+=wh;}
  				setT();
  				Sp+=2;
  				var t =500 - Sp*50;
  				if(t<=0){t=0};
  				Stime = setTimeout(function(){self.timeSetT(d);},t);
  			}
  			jscrolle.bind("mousedown",function(e){
  					j['Fn'] && j['Fn'].call(_self);
  							curT = curT + e.pageY - jscrollh.offset().top - sh/2;
  							asetT();
  							return false;
  			});
  			function asetT(){				
  						if(curT<bw){curT=bw;}
  						if(curT>dh-sh-bw){curT=dh-sh-bw;}
  						jscrollh.stop().animate({top:curT},100);
  						var scT = -((curT-bw)*sch/(dh-2*bw));
  						jscrollc.stop().animate({top:scT},1000);
  			};
  			function setT(){				
  						if(curT<bw){curT=bw;}
  						if(curT>dh-sh-bw){curT=dh-sh-bw;}
  						jscrollh.css({top:curT});
  						var scT = -((curT-bw)*sch/(dh-2*bw));
  						jscrollc.css({top:scT});
  			};
  			$(_self).mousewheel(function(){
  					if(allowS!=true) return;
  					j['Fn'] && j['Fn'].call(_self);
  						if(this.D>0){curT-=wh;}else{curT+=wh;};
  						setT();
  			})
  		});
  	}
  });
  var img = 'data:image/gif;base64,R0lGODlhDwAHAIABAMzMzAAAACH/C1hNUCBEYXRhWE1QPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxMzggNzkuMTU5ODI0LCAyMDE2LzA5LzE0LTAxOjA5OjAxICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxNyAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo5REQ3N0ZGMzRFNzgxMUU3OTA0REM2M0NDOUZBQzJBNSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo5REQ3N0ZGNDRFNzgxMUU3OTA0REM2M0NDOUZBQzJBNSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjlERDc3RkYxNEU3ODExRTc5MDREQzYzQ0M5RkFDMkE1IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjlERDc3RkYyNEU3ODExRTc5MDREQzYzQ0M5RkFDMkE1Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+Af/+/fz7+vn49/b19PPy8fDv7u3s6+rp6Ofm5eTj4uHg397d3Nva2djX1tXU09LR0M/OzczLysnIx8bFxMPCwcC/vr28u7q5uLe2tbSzsrGwr66trKuqqainpqWko6KhoJ+enZybmpmYl5aVlJOSkZCPjo2Mi4qJiIeGhYSDgoGAf359fHt6eXh3dnV0c3JxcG9ubWxramloZ2ZlZGNiYWBfXl1cW1pZWFdWVVRTUlFQT05NTEtKSUhHRkVEQ0JBQD8+PTw7Ojk4NzY1NDMyMTAvLi0sKyopKCcmJSQjIiEgHx4dHBsaGRgXFhUUExIREA8ODQwLCgkIBwYFBAMCAQAAIfkEAQAAAQAsAAAAAA8ABwAAAhSMYQfLic7aSSHKSu1yWXNofYpVAAA7';
  $(".scroll_box").jscroll({
  	W:"7px",
  	BgUrl:"url("+img+")",
  	Bg:"-0px 1px repeat-y",
  	Bar:{Bd:{Out:"7px 7px repeat",Hover:"0 0 repeat"},Bg:{Out:"7px 7px repeat",Hover:"7px 7px repeat",Focus:"7px 7px repeat"}},
  	Btn:{btn:false}	
  });
  
  for(var i=0;i<$(".type>div").length;i++){
  	$(".type>div").eq(i).find("ul").addClass("attribute_items"+i)
  	if(parseInt($(".attribute_items"+i).height())>199){
  		$('.attribute_items'+i).jscroll({
  			W:"7px",
  			BgUrl:"url("+img+")",
  			Bg:"-0px 1px repeat-y",
  			Bar:{Bd:{Out:"7px 7px repeat",Hover:"0 0 repeat"},Bg:{Out:"7px 7px repeat",Hover:"7px 7px repeat",Focus:"7px 7px repeat"}},
  			Btn:{btn:false}	
  		});
  	}
  }
  
  
  // 品牌搜索
  function searchBrand(){
  	var brand = $(".brand_search input").val();
  	var i=brand.length;
  	if(brand == ""){
  		$(".brand li a").show();	
  	}else{
  		$(".brand li a").each(function(){
  			var brandName = $(this).text().toLowerCase().substring(0,i);
  			if (brandName.indexOf(brand) != -1) {
  					$(this).show();
  			}else {
  				$(this).hide();
  			}
  		})
  	}
  }
  $('.brand_search').bind('input propertychange', function() {
  	searchBrand();
  	$(".brand").jscroll({
  		W:"7px",
  		BgUrl:"url("+img+")",
  		Bg:"-0px 1px repeat-y",
  		Bar:{Bd:{Out:"7px 7px repeat",Hover:"0 0 repeat"},Bg:{Out:"7px 7px repeat",Hover:"7px 7px repeat",Focus:"7px 7px repeat"}},
  		Btn:{btn:false}	
  	});
  	$(".brand .jscroll-c").css({"top":"0"});
  });

});
