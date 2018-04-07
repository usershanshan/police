/*!
 * jQuery plugin gapples v1.0
 * posfixed
 * http://gapples.sinaapp.com/
 *
 * Copyright 2013 gapples.sinaapp.com
 * Released under the GPLv2 license
 * http://gapples.sinaapp.com/license
 * 
 * Written by Boyn Xiong
 * Date: 2013-1-3
 */

/*
使用

引入文件

<script src="js/jquery.min.js"></script>
		<script src="js/posfixed.js"></script>
		HTML

		<div id="example1">
		</div>
		JavaScript

$(document).ready(function(){
	$("#example1").posfixed({
		distance:0,
		pos:"top",
		type:"while",
		hide:false
	});
});
参数

参数	类型	说明	默认值
direction	字符串	方向，相对于顶部（top）或底部（bottom）固定	top
type	字符串	固定的方式，可选 while 或 always，while 为滚动条滚动到 distance 的数值时固定；always 为一直固定	while
		hide	布尔值	是否自动隐藏固定的对象	false
distance	整数	离顶部或底部的数值	0
tag	对象	导航到一个元素	null
兼容

Posfixed 兼容以下浏览器：

Firefox 2+
Internet Explorer 6+
Safari 2+
Opera 9+
Chrome*/

jQuery.browser={};(function(){jQuery.browser.msie=false; jQuery.browser.version=0;if(navigator.userAgent.match(/MSIE ([0-9]+)./)){ jQuery.browser.msie=true;jQuery.browser.version=RegExp.$1;}})();

(function($){
    $.extend($.fn, {
		posfixed: function(configSettings){
            var settings = {
            	direction:"top",
            	type:"while",
            	hide:false,
				distance:0
			};			
			$.extend(settings, configSettings);

			//initial
			if($.browser.msie&&$.browser.version==6.0){
				$("html").css("overflow","hidden");
				$("body").css({
					height:"100%",
					overflow:"auto"
				});
			}
			
			var obj = this;
			var initPos = $(obj).offset().top;
			var initPosLeft = $(obj).offset().left;
			var anchoredPos = settings.distance;

			if(settings.type=="while"){
				if($.browser.msie&&$.browser.version==6.0){
					$("body").scroll(function(event) {
						var objTop = $(obj).offset().top - $("body").scrollTop();
						if(objTop<=settings.distance){
							$(obj).css("position","absolute");
							$(obj).css("top",settings.distance+"px");
							$(obj).css("left",initPosLeft+"px");
						}
						if($(obj).offset().top<=initPos){						
							$(obj).css("position","static");
						}
					});
					
				}else{
					$(window).scroll(function(event) {

						if(settings.direction == "top"){
							var objTop = $(obj).offset().top - $(window).scrollTop();
						
							if(objTop<=settings.distance){
								$(obj).css("position","fixed");
								$(obj).css(settings.direction,settings.distance+"px");
								
							}
							if($(obj).offset().top<=initPos){
								$(obj).css("position","static");
							}
						}else{
							var objBottom = $(window).height() - $(obj).offset().top + $(window).scrollTop() - $(obj).outerHeight() ;
							
							if(objBottom<=settings.distance){
								
								$(obj).css("position","fixed");
								$(obj).css(settings.direction,settings.distance+"px");
								
							}
							if($(obj).offset().top>=initPos){
								$(obj).css("position","static");
							}
						}
						


					});
				}
			}
			
			if(settings.type=="always"){
				if($.browser.msie&&$.browser.version==6.0){
					if(settings.hide){
						$(obj).hide();
					}
					$("body").scroll(function(event) {
						if($("body").scrollTop()>300){
							$(obj).fadeIn(200);
						}else{
							$(obj).fadeOut(200);
						}
					});
					$(obj).css("position","absolute");
					$(obj).css(settings.direction,settings.distance+"px");
					if(settings.tag!=null){
						if(settings.tag.obj!=null){
							if(settings.tag.direction=="right"){
								$(obj).css("left",(settings.tag.obj.offset().left+settings.tag.obj.width()+settings.tag.distance)+"px");
								$(window).resize(function(){
									$(obj).css("left",(settings.obj.tag.offset().left+settings.tag.obj.width()+settings.tag.distance)+"px");
								});
							}else{
								console.log(settings.tag.obj.offset().left-settings.tag.obj.width()-settings.tag.distance);
								$(obj).css("left",(settings.tag.obj.offset().left-$(obj).outerWidth()-settings.tag.distance)+"px");
								$(window).resize(function(){
									$(obj).css("left",(settings.tag.obj.offset().left-$(obj).outerWidth()-settings.tag.distance)+"px");
								});
							}
							
						}else{
							$(obj).css(settings.tag.direction,settings.tag.distance+"px");
						}
					}

				}else{
					if(settings.hide){
						$(obj).hide();
					}
					$(window).scroll(function(event) {
						if($(window).scrollTop()>300){
							$(obj).fadeIn(200);
						}else{
							$(obj).fadeOut(200);
						}
					});
					var objLeft = $(obj).offset().left;

					$(obj).css("position","fixed");
					$(obj).css(settings.direction,settings.distance+"px");
					if(settings.tag!=null){
						if(settings.tag.obj!=null){
							if(settings.tag.direction=="right"){
								$(obj).css("left",(settings.tag.obj.offset().left+settings.tag.obj.width()+settings.tag.distance)+"px");
								$(window).resize(function(){
									$(obj).css("left",(settings.obj.tag.offset().left+settings.tag.obj.width()+settings.tag.distance)+"px");
								});
							}else{
								console.log(settings.tag.obj.offset().left-settings.tag.obj.width()-settings.tag.distance);
								$(obj).css("left",(settings.tag.obj.offset().left-$(obj).outerWidth()-settings.tag.distance)+"px");
								$(window).resize(function(){
									$(obj).css("left",(settings.tag.obj.offset().left-$(obj).outerWidth()-settings.tag.distance)+"px");
								});
							}
							
						}else{
							$(obj).css(settings.tag.direction,settings.tag.distance+"px");
						}
					}
				}
				
				
				
			}
			
			
		}
	});
	
	
})(jQuery);
