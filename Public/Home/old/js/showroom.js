$('.room-type-two').click(function() {
	// alert($('.ccc').prop('checked'))
	// $('.room-type-img').attr('src','image/xia.png');
	for(var i=0;i<$('.checkbox').length;i++){
		if($('.checkbox')[i].checked==false){

			$('.room-type-img')[i].src = 'image/shang.png';
		}else{
			$('.room-type-img')[i].src = 'image/xia.png';
		}
	}
})


function ddd(){
	var aaa=$('.active img').attr("alt");
	$(".imageTitle").html(aaa);	
}
setInterval(ddd,1);


$("#swiperone").click(function(){
		var blobk = $('#swiper-one').css('display');
		$('#secondimg').attr('checked',false);
		$('#thirdimg').attr('checked',false);
		if(blobk=='block'){
			$(".allswiper").slideToggle(300);
		}else{	
		$(".allswiper").slideDown(300);
  		$('#swiper-one').css('display','block');
  		$('#swiper-one2').css('display','none');
  		$('#swiper-one3').css('display','none');
		}
});
$("#swipertwo").click(function(){
		var blobk2 = $('#swiper-one2').css('display');
		$('#firstimg').attr('checked',false);
		$('#thirdimg').attr('checked',false);
		if(blobk2=='block'){
			$(".allswiper").slideToggle(300);
		}else{
  		$('#swiper-one').css('display','none');
  		$('#swiper-one2').css('display','block');
  		$('#swiper-one3').css('display','none');
  		$(".allswiper").slideDown(300);
  	}
});
$("#swiperthree").click(function(){
		var blobk3 = $('#swiper-one3').css('display');
		$('#firstimg').attr('checked',false);
		$('#secondimg').attr('checked',false);
		if(blobk3=='block'){
			$(".allswiper").slideToggle(300);
		}else{
  		$('#swiper-one').css('display','none');
  		$('#swiper-one2').css('display','none');
  		$('#swiper-one3').css('display','block');
  		$(".allswiper").slideDown(300);
  	}
});


function aaa(){
	// alert($('.swiper-long').css('width'));
	var i=$('.swiper-long img').length;
	var long=i*420+(i+1)*20;
	$('.swiper-long').css('width',long);
	if(i<=3){
		$('.swiper-long').css('left','30px');

		$('.swiper-left-img').css('display','none');
		$('.swiper-one-left').css('display','none');
		$('.swiper-one-right').css('display','none');
		$('.swiper-right-img').css('display','none');
	}
	else if(i>=5){
		$('.swiper-long').css('left','-410px');
	}
	else{
		var firstsrc=$('.swiper-long img')[0].src;
		$(".swiper-long").append('<img src class="aaa">');
		$('.aaa').attr('src',firstsrc);
		var i=$('.swiper-long img').length;
  	var long=i*420+(i+1)*20;
  	$('.swiper-long').css('width',long);
		$('.swiper-long').css('left','-410px');
	}
	var rightWidth=long-1320;
	$('.swiper-one-right').css('width',rightWidth);
}
aaa();
function remove(){
	var i=$('.swiper-long img').length;
	if(i>5){
		var firstimg = $('.swiper-long img')[0];
	var firstimgSrc = $('.swiper-long img')[0].src;
  	$(".swiper-long").append('<img src>');
  	$('.swiper-long img:last').attr('src',firstimgSrc);
  	$(firstimg).remove();
  	$(".swiper-long").css('left','-30px')
  	$(".swiper-long").stop().animate({left:"-410px"},500);
  	
	}
	else if(i==5) {
		var secondimg = $('.swiper-long img')[1];
	var secondimgSrc = $('.swiper-long img')[1].src;
  	$(".swiper-long").append('<img src>');
  	$('.swiper-long img:last').attr('src',secondimgSrc);
  	$(secondimg).remove();
	var lastimgSrc = $('.swiper-long img')[4].src;
	$('.swiper-long img:first').attr('src',lastimgSrc);
	$(".swiper-long").css('left','-30px');
  	$(".swiper-long").stop().animate({left:"-410px"},500);
	}
}

function remove2(){
	var i=$('.swiper-long img').length;
	
	if(i>5){
		var lastimg = $('.swiper-long img')[i-1];
	var lastimgSrc = $('.swiper-long img')[i-1].src;
  	$(".swiper-long").prepend('<img src>');
  	$('.swiper-long img:first').attr('src',lastimgSrc);
  	$(lastimg).remove();
  	$(".swiper-long").css('left','-850px')
  	$(".swiper-long").stop().animate({left:"-410px"},500);
  	
	}
	else if(i==5) {
		var secondimg = $('.swiper-long img')[3];
	var secondimgSrc = $('.swiper-long img')[3].src;
  	$(".swiper-long").prepend('<img src>');
  	$('.swiper-long img:first').attr('src',secondimgSrc);
  	$(secondimg).remove();
	var lastimgSrc = $('.swiper-long img')[0].src;
	$('.swiper-long img:last').attr('src',lastimgSrc);
	$(".swiper-long").css('left','-850px')
  	$(".swiper-long").stop().animate({left:"-410px"},500); 
	}
	
}


function bbb(){
	// alert($('.swiper-long').css('width'));
	var i=$('.swiper-long2 img').length;
	var long=i*420+(i+1)*20;
	$('.swiper-long2').css('width',long);
	if(i<=3){
		$('.swiper-long2').css('left','30px');

		$('.swiper-left-img2').css('display','none');
		$('.swiper-one-left2').css('display','none');
		$('.swiper-one-right2').css('display','none');
		$('.swiper-right-img2').css('display','none');
	}
	else if(i>=5){
		$('.swiper-long2').css('left','-410px');
	}
	else{
		var firstsrc=$('.swiper-long2 img')[0].src;
		$(".swiper-long2").append('<img src class="aaa">');
		$('.aaa').attr('src',firstsrc);
		var i=$('.swiper-long2 img').length;
  	var long=i*420+(i+1)*20;
  	$('.swiper-long2').css('width',long);
		$('.swiper-long2').css('left','-410px');
	}
	var rightWidth=long-1320;
	$('.swiper-one-right2').css('width',rightWidth);
}
bbb();
function remove3(){
	var i=$('.swiper-long2 img').length;
	if(i>5){
		var firstimg = $('.swiper-long2 img')[0];
	var firstimgSrc = $('.swiper-long2 img')[0].src;
  	$(".swiper-long2").append('<img src>');
  	$('.swiper-long2 img:last').attr('src',firstimgSrc);
  	$(firstimg).remove();
  	$(".swiper-long2").css('left','-30px')
  	$(".swiper-long2").stop().animate({left:"-410px"},500);
  	
	}
	else if(i==5) {
		var secondimg = $('.swiper-long2 img')[1];
	var secondimgSrc = $('.swiper-long2 img')[1].src;
  	$(".swiper-long2").append('<img src>');
  	$('.swiper-long2 img:last').attr('src',secondimgSrc);
  	$(secondimg).remove();
	var lastimgSrc = $('.swiper-long2 img')[4].src;
	$('.swiper-long2 img:first').attr('src',lastimgSrc);
	$(".swiper-long2").css('left','-30px');
  	$(".swiper-long2").stop().animate({left:"-410px"},500);
	}
}

function remove4(){
	var i=$('.swiper-long2 img').length;
	
	if(i>5){
		var lastimg = $('.swiper-long2 img')[i-1];
	var lastimgSrc = $('.swiper-long2 img')[i-1].src;
  	$(".swiper-long2").prepend('<img src>');
  	$('.swiper-long2 img:first').attr('src',lastimgSrc);
  	$(lastimg).remove();
  	$(".swiper-long2").css('left','-850px')
  	$(".swiper-long2").stop().animate({left:"-410px"},500);
  	
	}
	else if(i==5) {
		var secondimg = $('.swiper-long2 img')[3];
	var secondimgSrc = $('.swiper-long2 img')[3].src;
  	$(".swiper-long2").prepend('<img src>');
  	$('.swiper-long2 img:first').attr('src',secondimgSrc);
  	$(secondimg).remove();
	var lastimgSrc = $('.swiper-long2 img')[0].src;
	$('.swiper-long2 img:last').attr('src',lastimgSrc);
	$(".swiper-long2").css('left','-850px')
  	$(".swiper-long2").stop().animate({left:"-410px"},500); 
	}
	
}


function ccc(){
	// alert($('.swiper-long').css('width'));
	var i=$('.swiper-long3 img').length;
	var long=i*420+(i+1)*20;
	$('.swiper-long3').css('width',long);
	if(i<=3){
		$('.swiper-long3').css('left','30px');

		$('.swiper-left-img3').css('display','none');
		$('.swiper-one-left3').css('display','none');
		$('.swiper-one-right3').css('display','none');
		$('.swiper-right-img3').css('display','none');
	}
	else if(i>=5){
		$('.swiper-long3').css('left','-410px');
	}
	else{
		var firstsrc=$('.swiper-long3 img')[0].src;
		$(".swiper-long3").append('<img src class="aaa">');
		$('.aaa').attr('src',firstsrc);
		var i=$('.swiper-long3 img').length;
  	var long=i*420+(i+1)*20;
  	$('.swiper-long3').css('width',long);
		$('.swiper-long3').css('left','-410px');
	}
	var rightWidth=long-1320;
	$('.swiper-one-right3').css('width',rightWidth);
}
ccc();
function remove5(){
	var i=$('.swiper-long3 img').length;
	if(i>5){
		var firstimg = $('.swiper-long3 img')[0];
	var firstimgSrc = $('.swiper-long3 img')[0].src;
  	$(".swiper-long3").append('<img src>');
  	$('.swiper-long3 img:last').attr('src',firstimgSrc);
  	$(firstimg).remove();
  	$(".swiper-long3").css('left','-30px')
  	$(".swiper-long3").stop().animate({left:"-410px"},500);
  	
	}
	else if(i==5) {
		var secondimg = $('.swiper-long3 img')[1];
	var secondimgSrc = $('.swiper-long3 img')[1].src;
  	$(".swiper-long3").append('<img src>');
  	$('.swiper-long3 img:last').attr('src',secondimgSrc);
  	$(secondimg).remove();
	var lastimgSrc = $('.swiper-long3 img')[4].src;
	$('.swiper-long3 img:first').attr('src',lastimgSrc);
	$(".swiper-long3").css('left','-30px');
  	$(".swiper-long3").stop().animate({left:"-410px"},500);
	}
}

function remove6(){
	var i=$('.swiper-long3 img').length;
	
	if(i>5){
		var lastimg = $('.swiper-long3 img')[i-1];
	var lastimgSrc = $('.swiper-long3 img')[i-1].src;
  	$(".swiper-long3").prepend('<img src>');
  	$('.swiper-long3 img:first').attr('src',lastimgSrc);
  	$(lastimg).remove();
  	$(".swiper-long3").css('left','-850px')
  	$(".swiper-long3").stop().animate({left:"-410px"},500);
  	
	}
	else if(i==5) {
		var secondimg = $('.swiper-long3 img')[3];
	var secondimgSrc = $('.swiper-long3 img')[3].src;
  	$(".swiper-long3").prepend('<img src>');
  	$('.swiper-long3 img:first').attr('src',secondimgSrc);
  	$(secondimg).remove();
	var lastimgSrc = $('.swiper-long3 img')[0].src;
	$('.swiper-long3 img:last').attr('src',lastimgSrc);
	$(".swiper-long3").css('left','-850px')
  	$(".swiper-long3").stop().animate({left:"-410px"},500); 
	}
	
}
