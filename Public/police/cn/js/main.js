
// 滚动动画
if (!(/msie [6|7|8|9]/i.test(navigator.userAgent))){
    new WOW().init();
};

jQuery(function($) {
	//导航悬浮
	$(document).ready( function() {
		$(".navbar-wrapper").stickUp();
	});
	//响应式导航
	$(".nav-btn").click(function(){
		$(".nav").slideToggle();
	});
	//友情链接按钮
	$(".footer-link .btn").click(function(){
		$(".footer-link ul").slideToggle();
	});
});