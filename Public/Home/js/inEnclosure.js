//$(document).ready(function(){
//	var addBtn = $('.individualization-bottom-right button');
//	var check = $('.checkbox');
//	var sureCheck = $('.checkbox button');
//	for(var i=0;i<addBtn.length;i++){
//		addBtn[i].onclick=function(){
//			var parent = $(this).parent().parent().parent();
//			parent.children('.checkbox').slideDown();
//		}
//		sureCheck[i].onclick=function(){
//			var parent = $(this).parent();
//			// parent.slideUp();
//			var inCheck = parent.children('.checkbox-append').children('.checkbox-one').children('input');
//			for(var i=0;i<inCheck.length;i++){
//				var payDiv = $('.payment-mid');
//				if(inCheck.get(i).checked==true){
//					var checkId = $(this).parent().parent().parent().parent().attr('id');
//					var checkLength = $('.payment-mid:eq('+i+')').find('#'+checkId);
//					var Id = checkLength.attr('id');
//					var title = $(this).parent().parent().find('h1').text();
//					var introduce = $(this).parent().parent().children('.individualization-top').find('p').text();
//					var price = $(this).parent().parent().children('.individualization-bottom').find('p').text().substring(4);
//					var imgUrl = $(this).parent().parent().find('img').attr('src');
//					var appnedDiv = '<div class="payment-additional-top" id='+checkId+'><div class="additional-top-left"><div class="additional"><p>额外：</p><p class="additional-delete">[删除]</p></div><div class="flower"><p class="flower-one">'+title+'</p><p class="flower-two">'+introduce+'</p></div></div><div class="additional-top-right"><img src='+imgUrl+'><div class="number2"><p class="number2-left">数量</p><button onclick="subtract()">-</button><p class="increase">1</p><button onclick="add()">+</button></div><div class="tuifang"><p class="">CNY '+price+'</p><p>退房前支付</p></div></div> </div>';
//					var allPrice = $('.tuifang2:eq('+i+')').find('p').first().text().substring(3);
//					
//					if(checkLength.length == 0){
//						$('.payment-append:eq('+i+')').append(appnedDiv);
//						$('.tuifang2:eq('+i+')').find('p').first().text('CNY'+(parseInt(allPrice)+parseInt(price)));
//					}
//					else{
//						console.log($('#'+Id).find('.increase').length)
//						var result = parseInt($('#'+Id).find('.increase').text());
//						$('#'+Id).find('.increase').text(result+1)
//					}
//
//				}
//			}
//		}
//	}
//});
//
////$(document).ready(function(){
////	var payDiv = $('.payment-mid');
////	for(var i=0;i<payDiv.length;i++){
////		var checkbox = '<div class="checkbox-one"><input type="checkbox" name=""><p>房间'+(i+1)+'</p></div>';
////		$('.checkbox-append').append(checkbox);
////	}
////});
//
//
