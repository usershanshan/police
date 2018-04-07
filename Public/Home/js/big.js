function test() {
		console.log("请求准备发送");
		$.ajax({
			type : "POST", 
			url : getRoomDateList_url, 
			dataType : "json",
			data : {},
			success : function(res) {
				for(var i=0;i<res.length;i++){
						var c = '';
						res[i]['c'] = ''
						if(res[i]['status'] == 'off'){
							res[i]['c'] = ' disable'
						}
					}
				if(res[0].week == '星期日'){
					for(var i=0;i<35;i++){
						var aaa = "<div class='calendar-one"+res[i].c+"' onclick='salert("+i+")' data-aa="+i+"><p class='wek' style='display:none;'>"+res[i].week+"</p><p class='yea' style='display:none;'>"+res[i].date+"</p><p class='mouth'>"+res[i].m+"月</p><p class='day'>"+res[i].d+"</p><div class='calendar-one-bottom'><p>￥"+res[i].money+"</p></div></div>";
						$(".calendar-bottom").append(aaa);
					}
				}
				else if(res[0].week == '星期一'){
					var aDiv = "<div class='calendar-one disable' onclick='salert(0)' data-aa='0'><p class='wek'></p><p class='yea'></p><p class='mouth'>不可用</p><p class='day'>不可用</p><div class='calendar-one-bottom'><p>不可用</p></div></div>"
					$(".calendar-bottom").append(aDiv);
					for(var i=1;i<35;i++){
						var aaa = "<div class='calendar-one "+res[i-1].c+"' onclick='salert("+i+")' data-aa="+i+"><p class='wek' style='display:none;'>"+res[i-1].week+"</p><p class='yea' style='display:none;'>"+res[i-1].date+"</p><p class='mouth'>"+res[i-1].m+"月</p><p class='day'>"+res[i-1].d+"</p><div class='calendar-one-bottom'><p>￥"+res[i-1].money+"</p></div></div>";
						$(".calendar-bottom").append(aaa);
					}
				}
				else if(res[0].week == '星期二'){
					for(var i=0;i<2;i++){
						var aDiv = "<div class='calendar-one disable' onclick='salert("+i+")' data-aa="+i+"><p class='wek'></p><p class='yea'></p><p class='mouth'>不可用</p><p class='day'>不可用</p><div class='calendar-one-bottom'><p>不可用</p></div></div>"
						$(".calendar-bottom").append(aDiv);
					}
					for(var i=2;i<35;i++){
						var aaa = "<div class='calendar-one"+res[i-2].c+"' onclick='salert("+i+")' data-aa="+i+"><p class='wek' style='display:none;'>"+res[i-2].week+"</p><p class='yea' style='display:none;'>"+res[i-2].date+"</p><p class='mouth'>"+res[i-2].m+"月</p><p class='day'>"+res[i-2].d+"</p><div class='calendar-one-bottom'><p>￥"+res[i-2].money+"</p></div></div>";
						$(".calendar-bottom").append(aaa);
					}
				}
				else if(res[0].week == '星期三'){
					for(var i=0;i<3;i++){
						var aDiv = "<div class='calendar-one disable' onclick='salert("+i+")' data-aa="+i+"><p class='wek'></p><p class='yea'></p><p class='mouth'>不可用</p><p class='day'>不可用</p><div class='calendar-one-bottom'><p>不可用</p></div></div>"
						$(".calendar-bottom").append(aDiv);
					}
					for(var i=3;i<35;i++){
						var aaa = "<div class='calendar-one"+res[i-3].c+"' onclick='salert("+i+")' data-aa="+i+"><p class='wek' style='display:none;'>"+res[i-3].week+"</p><p class='yea' style='display:none;'>"+res[i-3].date+"</p><p class='mouth'>"+res[i-3].m+"月</p><p class='day'>"+res[i-3].d+"</p><div class='calendar-one-bottom'><p>￥"+res[i-3].money+"</p></div></div>";
						$(".calendar-bottom").append(aaa);
					}
				}
				else if(res[0].week == '星期四'){
					for(var i=0;i<4;i++){
						var aDiv = "<div class='calendar-one disable' onclick='salert("+i+")' data-aa="+i+"><p class='wek'></p><p class='yea'></p><p class='mouth'>不可用</p><p class='day'>不可用</p><div class='calendar-one-bottom'><p>不可用</p></div></div>"
						$(".calendar-bottom").append(aDiv);
					}
					for(var i=4;i<35;i++){
						var aaa = "<div class='calendar-one"+res[i-4].c+"' onclick='salert("+i+")' data-aa="+i+"><p class='wek' style='display:none;'>"+res[i-4].week+"</p><p class='yea' style='display:none;'>"+res[i-4].date+"</p><p class='mouth'>"+res[i-4].m+"月</p><p class='day'>"+res[i-4].d+"</p><div class='calendar-one-bottom'><p>￥"+res[i-4].money+"</p></div></div>";
						$(".calendar-bottom").append(aaa);
					}
				}
				else if(res[0].week == '星期五'){
					for(var i=0;i<5;i++){
						var aDiv = "<div class='calendar-one disable' onclick='salert("+i+")' data-aa="+i+"><p class='wek'></p><p class='yea'></p><p class='mouth'>不可用</p><p class='day'>不可用</p><div class='calendar-one-bottom'><p>不可用</p></div></div>"
						$(".calendar-bottom").append(aDiv);
					}
					for(var i=5;i<35;i++){
						var aaa = "<div class='calendar-one"+res[i-5].c+"' onclick='salert("+i+")' data-aa="+i+"><p class='wek' style='display:none;'>"+res[i-5].week+"</p><p class='yea' style='display:none;'>"+res[i-5].date+"</p><p class='mouth'>"+res[i-5].m+"月</p><p class='day'>"+res[i-5].d+"</p><div class='calendar-one-bottom'><p>￥"+res[i-5].money+"</p></div></div>";
						$(".calendar-bottom").append(aaa);
					}
				}
				else if(res[0].week == '星期六'){
					for(var i=0;i<6;i++){
						var aDiv = "<div class='calendar-one disable' onclick='salert("+i+")' data-aa="+i+"><p class='wek'></p><p class='yea'></p><p class='mouth'>不可用</p><p class='day'>不可用</p><div class='calendar-one-bottom'><p>不可用</p></div></div>"
						$(".calendar-bottom").append(aDiv);
					}
					for(var i=6;i<35;i++){
						var aaa = "<div class='calendar-one"+res[i-6].c+"' onclick='salert("+i+")' data-aa="+i+"><p class='wek' style='display:none;'>"+res[i-6].week+"</p><p class='yea' style='display:none;'>"+res[i-6].date+"</p><p class='mouth'>"+res[i-6].m+"月</p><p class='day'>"+res[i-6].d+"</p><div class='calendar-one-bottom'><p>￥"+res[i-6].money+"</p></div></div>";
						$(".calendar-bottom").append(aaa);
					}
				}
			},
		});
	 }



var arr3 = [];
var arr = [];
var arr2 = [];
function salert(count) {
	var aDiv = $('.calendar-one');
	var bDiv = $('.calendar-one-bottom');
	for(var i=0;i<aDiv.length;i++){
		arr.push(aDiv[i]);
	}
	for(var i=0;i<bDiv.length;i++){
		arr3.push(bDiv[i]);
	}
	var user = document.getElementsByClassName('calendar-one')[count];
	var userid1=user.getAttribute('data-aa');
	// alert(typeof(userid1));
	// 把string类型转换成数字类型
	var userid=parseInt(userid1);
	var useridName = "calendar-one disable";
	if(arr2.length>1){
		arr2 = [];
		arr2.push(userid);
		if(arr[arr2[0]].className==useridName){
			arr2=[];
		}else{
			$('.disable').css('opacity',0.2);
			aDiv.css('backgroundColor','#d6dee8').css('color','#27374d');
			$('.calendar-one-bottom').css('backgroundColor','#27374d');
			$('.disable').css('borderColor','#27374d');
			arr[arr2[0]].style.borderColor = '#d9b664';
			arr[arr2[0]].style.color = '#d9b664';
			$('.calendar-one-bottom')[arr2[0]].style.backgroundColor = '#d9b664';
		}	
	}
	else if(arr2.length==1){
		arr2.push(userid);
		if(arr[arr2[1]].className==useridName){
			var unm = parseInt(arr2[1]-arr2[0]);
			if(unm>0){
				arr[arr2[0]].style.borderColor = '#d9b664';
				arr[arr2[1]].style.borderColor = '#cccccc';
			}else{
				arr2.pop();
			}
		}else if(arr2[1]==arr2[0]){
			arr2.pop();	
		}
		else{
			$('.disable').css('opacity',0.2);
			aDiv.css('backgroundColor','#d6dee8').css('color','#27374d');
			$('.calendar-one-bottom').css('backgroundColor','#27374d');
			$('.disable').css('borderColor','#27374d');
			arr[arr2[0]].style.borderColor = '#d9b664';
			arr[arr2[0]].style.color = '#d9b664';
			$('.calendar-one-bottom')[arr2[0]].style.backgroundColor = '#d9b664';
		}
	}
	else{
		arr2.push(userid);
		if(arr[arr2[0]].className==useridName){
			arr2=[];
		}
		else if(arr[arr2[0]+1].className==useridName){
			$('.disable').css('opacity',0.2);
			aDiv.css('backgroundColor','#d6dee8').css('color','#27374d');
			$('.calendar-one-bottom').css('backgroundColor','#27374d');
			$('.disable').css('borderColor','#27374d');
			arr[arr2[0]].style.borderColor = '#d9b664';
			arr[arr2[0]].style.color = '#d9b664';
			$('.calendar-one-bottom')[arr2[0]].style.backgroundColor = '#d9b664';
		}
		else{
			$('.disable').css('opacity',0.2);
			aDiv.css('backgroundColor','#d6dee8').css('color','#27374d');
			$('.calendar-one-bottom').css('backgroundColor','#27374d');
			$('.disable').css('borderColor','#27374d');
			arr[arr2[0]].style.borderColor = '#d9b664';
			arr[arr2[0]].style.color = '#d9b664';
			$('.calendar-one-bottom')[arr2[0]].style.backgroundColor = '#d9b664';
		}
	}
	// 获取数组区间
	if(arr2.length==1){
		arr[arr2[0]].style.borderColor = '#d9b664';
	}else{
		if(arr2[0]>arr2[1]){
			var star = arr2[1];
			var end = Number(arr2[0])+Number(1);
		}else{
			var star = arr2[0];
			var end = Number(arr2[1])+Number(1);
		}
		var newary=arr.slice(star,end);
		var newary2=arr3.slice(star,end);
		var filternewary = $.grep(newary,function(value){
		            return value.className == useridName;
		        });
		var unm = parseInt(arr2[1]-arr2[0]);
		if(filternewary.length>0 && unm<0){
			arr2.shift();
			$('.disable').css('opacity',0.2);
			aDiv.css('backgroundColor','#d6dee8').css('color','#27374d');
			$('.calendar-one-bottom').css('backgroundColor','#27374d')
			$('.disable').css('borderColor','#27374d');
			arr[arr2[0]].style.borderColor = '#d9b664';
			arr[arr2[0]].style.color = '#d9b664';
			$('.calendar-one-bottom')[arr2[0]].style.backgroundColor = '#d9b664';
			
		}else if(filternewary.length>1 && unm>0 && arr[arr2[1]].className != useridName){
			arr2.shift();
			$('.disable').css('opacity',0.2);
			aDiv.css('backgroundColor','#d6dee8').css('color','#27374d');
			$('.calendar-one-bottom').css('backgroundColor','#27374d')
			$('.disable').css('borderColor','#27374d');
			arr[arr2[0]].style.borderColor = '#d9b664';
			arr[arr2[0]].style.color = '#d9b664';
			$('.calendar-one-bottom')[arr2[0]].style.backgroundColor = '#d9b664';

		}
		else if(filternewary.length>1 && unm>0){
			arr2.pop();
			$('.disable').css('opacity',0.2);
			aDiv.css('backgroundColor','#d6dee8').css('color','#27374d');
			$('.calendar-one-bottom').css('backgroundColor','#27374d');
			$('.disable').css('borderColor','#27374d');
			arr[arr2[0]].style.borderColor = '#d9b664';
			arr[arr2[0]].style.color = '#d9b664';
			$('.calendar-one-bottom')[arr2[0]].style.backgroundColor = '#d9b664';
		}
		else if(filternewary.length==1){
			if(arr[arr2[1]].className == useridName){
				for(var i=0;i<newary.length;i++){
					newary[i].style.backgroundColor = '#ffffff';
					newary[i].style.borderColor = '#d9b664';
					newary[i].style.color = '#d9b664';
					newary[i].style.opacity = 1;
				}
				for(var i=0;i<newary2.length;i++){
					newary2[i].style.backgroundColor = '#d9b664';
				}
			}
			else{
				arr2.shift();
				$('.disable').css('opacity',0.2);
				aDiv.css('backgroundColor','#d6dee8').css('color','#27374d');
				$('.calendar-one-bottom').css('backgroundColor','#27374d')
				$('.disable').css('borderColor','#27374d');
				arr[arr2[0]].style.borderColor = '#d9b664';
				arr[arr2[0]].style.color = '#d9b664';
				$('.calendar-one-bottom')[arr2[0]].style.backgroundColor = '#d9b664';
			}
		}
		else{
			for(var i=0;i<newary.length;i++){
				newary[i].style.backgroundColor = '#ffffff';
				newary[i].style.borderColor = '#d9b664';
				newary[i].style.color = '#d9b664';
				newary[i].style.opacity = 1;
			}
			for(var i=0;i<newary2.length;i++){
				newary2[i].style.backgroundColor = '#d9b664';
			}
		}
		$('.stay-one')[0].innerText = $('.wek')[star].innerText;
		$('.stay-one')[1].innerText = $('.wek')[end-1].innerText;
		$('.stay-two')[0].innerText = $('.day')[star].innerText;
		$('.stay-two')[1].innerText = $('.day')[end-1].innerText;
		$('.stay-three')[0].innerText = $('.mouth')[star].innerText;
		$('.stay-three')[1].innerText = $('.mouth')[end-1].innerText;
		$('.stay-fore')[0].innerText = $('.yea')[star].innerText;
		$('.stay-fore')[1].innerText = $('.yea')[end-1].innerText;
	}


	if(arr2.length>1){
		$('.all-price').slideDown(300);
		$('.right-reserve').removeClass('add')
		$(".checkin").animate({height:"580px"},300);
	}else{
		$('.all-price').slideUp(300);
		$('.right-reserve').addClass('add')
		$(".checkin").animate({height:"550px"},300);
	}
}

function selectMonth(){
	var sel2 =parseInt($("#selectMonth option:selected").val());
	var mydate = new Date();
	var dangqian = mydate.getMonth()+1;
	//console.log(dangqian,sel2)
	if(sel2==dangqian){
		$('.calendar-bottom').empty();
		arr3 = [];
		arr = [];
		arr2 = [];
		test();
		
	}
	else if(sel2<dangqian){
		layer.msg('抱歉,当前月份无法选择');
	}
	else{
		$.ajax({
				type : "POST", 
				url : getRoomDateList_url, 
				dataType : "json",
				data : {},
				success : function(res) {
					$('.calendar-bottom').empty();
					arr3 = [];
					arr = [];
					arr2 = [];
					var month = [];
					for(var i=0;i<res.length;i++){
						var c = '';
						month.push(res[i].m)
						res[i]['c'] = ''
						if(res[i]['status'] == 'off'){
							res[i]['c'] = ' disable'
						}
					}
					var sel =$("#selectMonth option:selected").val();
					var num = parseInt(month.indexOf(sel));
					console.log(num)
					var xq = res[num].week; 
					if(xq=='星期日'){
						for(var i=0;i<35;i++){
							var aaa = "<div class='calendar-one"+res[num].c+"' onclick='salert("+i+")' data-aa="+i+"><p class='wek' style='display:none;'>"+res[num].week+"</p><p class='yea' style='display:none;'>"+res[num].date+"</p><p class='mouth'>"+res[num].m+"月</p><p class='day'>"+res[num].d+"</p><div class='calendar-one-bottom'><p>￥"+res[num].money+"</p></div></div>";
							$(".calendar-bottom").append(aaa);
							num++;
						}
					}
					else if(xq=='星期一'){
						for(var i=0;i<1;i++){ 
							var aDiv = "<div class='calendar-one"+res[num-1].c+"' onclick='salert("+i+")' data-aa="+i+"><p class='wek' style='display:none;'>"+res[num-1].week+"</p><p class='yea' style='display:none;'>"+res[num-1].date+"</p><p class='mouth'>"+res[num-1].m+"月</p><p class='day'>"+res[num-1].d+"</p><div class='calendar-one-bottom'><p>￥"+res[num-1].money+"</p></div></div>";
							$(".calendar-bottom").append(aDiv);
							num++;
						}
						var num = parseInt(month.indexOf(sel));
						for(var i=1;i<35;i++){
							var aaa = "<div class='calendar-one"+res[num].c+"' onclick='salert("+i+")' data-aa="+i+"><p class='wek' style='display:none;'>"+res[num].week+"</p><p class='yea' style='display:none;'>"+res[num].date+"</p><p class='mouth'>"+res[num].m+"月</p><p class='day'>"+res[num].d+"</p><div class='calendar-one-bottom'><p>￥"+res[num].money+"</p></div></div>";
							$(".calendar-bottom").append(aaa);
							num++;
						}
					}
					else if(xq=='星期二'){
						for(var i=0;i<2;i++){ 
							var aDiv = "<div class='calendar-one"+res[num-2].c+"' onclick='salert("+i+")' data-aa="+i+"><p class='wek' style='display:none;'>"+res[num-2].week+"</p><p class='yea' style='display:none;'>"+res[num-2].date+"</p><p class='mouth'>"+res[num-2].m+"月</p><p class='day'>"+res[num-2].d+"</p><div class='calendar-one-bottom'><p>￥"+res[num-2].money+"</p></div></div>";
							$(".calendar-bottom").append(aDiv);
							num++;
						}
						var num = parseInt(month.indexOf(sel));
						for(var i=2;i<35;i++){
							var aaa = "<div class='calendar-one"+res[num].c+"' onclick='salert("+i+")' data-aa="+i+"><p class='wek' style='display:none;'>"+res[num].week+"</p><p class='yea' style='display:none;'>"+res[num].date+"</p><p class='mouth'>"+res[num].m+"月</p><p class='day'>"+res[num].d+"</p><div class='calendar-one-bottom'><p>￥"+res[num].money+"</p></div></div>";
							$(".calendar-bottom").append(aaa);
							num++;
						}
					}
					else if(xq=='星期三'){
						for(var i=0;i<3;i++){ 
							var aDiv = "<div class='calendar-one"+res[num-3].c+"' onclick='salert("+i+")' data-aa="+i+"><p class='wek' style='display:none;'>"+res[num-3].week+"</p><p class='yea' style='display:none;'>"+res[num-3].date+"</p><p class='mouth'>"+res[num-3].m+"月</p><p class='day'>"+res[num-3].d+"</p><div class='calendar-one-bottom'><p>￥"+res[num-3].money+"</p></div></div>";
							$(".calendar-bottom").append(aDiv);
							num++;
						}
						var num = parseInt(month.indexOf(sel));
						for(var i=3;i<35;i++){
							var aaa = "<div class='calendar-one"+res[num].c+"' onclick='salert("+i+")' data-aa="+i+"><p class='wek' style='display:none;'>"+res[num].week+"</p><p class='yea' style='display:none;'>"+res[num].date+"</p><p class='mouth'>"+res[num].m+"月</p><p class='day'>"+res[num].d+"</p><div class='calendar-one-bottom'><p>￥"+res[num].money+"</p></div></div>";
							$(".calendar-bottom").append(aaa);
							num++;
						}
					}
					else if(xq=='星期四'){
						for(var i=0;i<4;i++){ 
							var aDiv = "<div class='calendar-one"+res[num-4].c+"' onclick='salert("+i+")' data-aa="+i+"><p class='wek' style='display:none;'>"+res[num-4].week+"</p><p class='yea' style='display:none;'>"+res[num-4].date+"</p><p class='mouth'>"+res[num-4].m+"月</p><p class='day'>"+res[num-4].d+"</p><div class='calendar-one-bottom'><p>￥"+res[num-4].money+"</p></div></div>";
							$(".calendar-bottom").append(aDiv);
							num++;
						}
						var num = parseInt(month.indexOf(sel));
						for(var i=4;i<35;i++){
							var aaa = "<div class='calendar-one"+res[num].c+"' onclick='salert("+i+")' data-aa="+i+"><p class='wek' style='display:none;'>"+res[num].week+"</p><p class='yea' style='display:none;'>"+res[num].date+"</p><p class='mouth'>"+res[num].m+"月</p><p class='day'>"+res[num].d+"</p><div class='calendar-one-bottom'><p>￥"+res[num].money+"</p></div></div>";
							$(".calendar-bottom").append(aaa);
							num++;
						}
					}
					else if(xq=='星期五'){
						for(var i=0;i<5;i++){ 
							var aDiv = "<div class='calendar-one"+res[num-5].c+"' onclick='salert("+i+")' data-aa="+i+"><p class='wek' style='display:none;'>"+res[num-5].week+"</p><p class='yea' style='display:none;'>"+res[num-5].date+"</p><p class='mouth'>"+res[num-5].m+"月</p><p class='day'>"+res[num-5].d+"</p><div class='calendar-one-bottom'><p>￥"+res[num-5].money+"</p></div></div>";
							$(".calendar-bottom").append(aDiv);
							num++;
						}
						var num = parseInt(month.indexOf(sel));
						for(var i=5;i<35;i++){
							var aaa = "<div class='calendar-one"+res[num].c+"' onclick='salert("+i+")' data-aa="+i+"><p class='wek' style='display:none;'>"+res[num].week+"</p><p class='yea' style='display:none;'>"+res[num].date+"</p><p class='mouth'>"+res[num].m+"月</p><p class='day'>"+res[num].d+"</p><div class='calendar-one-bottom'><p>￥"+res[num].money+"</p></div></div>";
							$(".calendar-bottom").append(aaa);
							num++;
						}
					}
					else if(xq=='星期六'){
						for(var i=0;i<6;i++){ 
							var aDiv = "<div class='calendar-one"+res[num-6].c+"' onclick='salert("+i+")' data-aa="+i+"><p class='wek' style='display:none;'>"+res[num-6].week+"</p><p class='yea' style='display:none;'>"+res[num-6].date+"</p><p class='mouth'>"+res[num-6].m+"月</p><p class='day'>"+res[num-6].d+"</p><div class='calendar-one-bottom'><p>￥"+res[num-6].money+"</p></div></div>";
							$(".calendar-bottom").append(aDiv);
							num++;
						}
						var num = parseInt(month.indexOf(sel));
						for(var i=6;i<35;i++){
							var aaa = "<div class='calendar-one"+res[num].c+"' onclick='salert("+i+")' data-aa="+i+"><p class='wek' style='display:none;'>"+res[num].week+"</p><p class='yea' style='display:none;'>"+res[num].date+"</p><p class='mouth'>"+res[num].m+"月</p><p class='day'>"+res[num].d+"</p><div class='calendar-one-bottom'><p>￥"+res[num].money+"</p></div></div>";
							$(".calendar-bottom").append(aaa);
							num++;
						}
					}
				},
			});
	}
}


//设置select为当前月
$(document).ready(function(){
	test();
	var mydate = new Date();
	var month = mydate.getMonth();
	$("#selectMonth option")[month].selected = true;
});






































