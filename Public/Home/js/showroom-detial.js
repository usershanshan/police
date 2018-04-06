function calendar() {
	var i = $('.calendar-one').length;
	var width = 98*i+i*1;
	$('.calendar-all').css('width',width)
}
function test() {
		console.log("请求准备发送");
		$.ajax({
			type : "POST", 
			url : getRoomDateList_url, 
			dataType : "json",
			data : {},
			success : function(res) {
				for(var i=0;i<res.length;i++){
					var aaa = "<div class='calendar-one' onclick='salert("+i+")' data-aa="+i+"><p class='year2' style='display:none;'>"+res[i].date+"</p><p class='year' style='display:none;'>"+res[i].y+"</p><p class='week'>"+res[i].week+"</p><p class='day'>"+res[i].d+"</p><p class='mouth'>"+res[i].m+"</p><div class='calendar-one-bottom'><p>￥"+res[i].money+"</p></div></div>";
					$(".calendar-all").append(aaa);
					if(res[i].status=='off'){
						$('.calendar-one')[i].className="calendar-one disable";
					}
					//console.log(res)
				}
				calendar();
				$('.rili_right').click(function(){
					$('.rili_left').css('opacity',1);
					var left=parseInt($('.calendar-all').css('left'));
					var width = parseInt($('.calendar-all').css('width'));
					if(left <= -width){
						$('.calendar-all').css('left',-width);
						$('.rili_right').css('opacity',0.5)
					}else{
						$('.calendar-all').stop(true,true).animate({left:'-=693'},300);
					}
				})
				$('.rili_left').click(function(){
					$('.rili_right').css('opacity',1);
					var left=parseInt($('.calendar-all').css('left'));
					if(left >= 0){
						$('.calendar-all').css('left','0');
						$('.rili_left').css('opacity',0.5);
					}else{
						$('.calendar-all').stop(true,true).animate({left:'+=693'},300);
					}
				})
			},
		});
	 }
test();



	var arr3 = [];
	var arr = [];
	var arr2 = [];
function salert(count) {
	var aDiv = $('.calendar-one');
	var bDiv = $('.calendar-one-bottom');
	
	var year = $('.calendar-one .year2');
	var price = $('.calendar-one-bottom p');
	
	for(var i=0;i<aDiv.length;i++){
		
		arr.push(aDiv[i]);
		// console.log(aDiv[i].getAttribute("data-aa"));
	}
	for(var i=0;i<bDiv.length;i++){
		
		arr3.push(bDiv[i]);
		// console.log(aDiv[i].getAttribute("data-aa"));
	}
	// console.log(arr);
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
			aDiv.css('borderColor','#27374d').css('color','#27374d');
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
			aDiv.css('borderColor','#27374d').css('color','#27374d');
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
			aDiv.css('borderColor','#27374d').css('color','#27374d');
			$('.calendar-one-bottom').css('backgroundColor','#27374d');
			$('.disable').css('borderColor','#27374d');
			arr[arr2[0]].style.borderColor = '#d9b664';
			arr[arr2[0]].style.color = '#d9b664';
			$('.calendar-one-bottom')[arr2[0]].style.backgroundColor = '#d9b664';
		}
		else{
			$('.disable').css('opacity',0.2);
			aDiv.css('borderColor','#27374d').css('color','#27374d');
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
			aDiv.css('borderColor','#27374d').css('color','#27374d');
			$('.calendar-one-bottom').css('backgroundColor','#27374d')
			$('.disable').css('borderColor','#27374d');
			arr[arr2[0]].style.borderColor = '#d9b664';
			arr[arr2[0]].style.color = '#d9b664';
			$('.calendar-one-bottom')[arr2[0]].style.backgroundColor = '#d9b664';
			
		}else if(filternewary.length>1 && unm>0 && arr[arr2[1]].className != useridName){
			arr2.shift();
			$('.disable').css('opacity',0.2);
			aDiv.css('borderColor','#27374d').css('color','#27374d');
			$('.calendar-one-bottom').css('backgroundColor','#27374d')
			$('.disable').css('borderColor','#27374d');
			arr[arr2[0]].style.borderColor = '#d9b664';
			arr[arr2[0]].style.color = '#d9b664';
			$('.calendar-one-bottom')[arr2[0]].style.backgroundColor = '#d9b664';

		}
		else if(filternewary.length>1 && unm>0){
			arr2.pop();
			$('.disable').css('opacity',0.2);
			aDiv.css('borderColor','#27374d').css('color','#27374d');
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
				aDiv.css('borderColor','#27374d').css('color','#27374d');
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
		// 获取入住退房时间
		$('.first-ruzhu').text('入住：'+year[star].innerText);
		$('.first-tuifang').text('入住：'+year[end-1].innerText)
		var arrey = [];
		for(var i=0;i<price.length;i++){
			arrey.push(price[i].innerText);
		}
		var newarrey=arrey.slice(star,end);
		var y=0
		var x=0
		for(var i=0;i<newarrey.length;i++){
			y+=parseInt(newarrey[i].substring(1));
			x=parseInt(newarrey[i].substring(1));
		}
		y= y-x;
		$('.first-heji').text('合计：￥'+y);		
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

//设置位置
function point(){
	var myDate = new Date();
	var moo=myDate.getMonth()+1;
	var day=myDate.getDate();
	var opt1 = $('#select-one option');
	var opt2 = $('#select-two option');
	var sel1 =[];
	var sel2 = [];
	for(var i=0;i<opt1.length;i++){
		sel1.push(parseInt((opt1[i].innerText)));
	}
	for(var i=0;i<opt2.length;i++){
		sel2.push(parseInt((opt2[i].innerText)));
	}
	var num = sel1.indexOf(moo);
	var num2 = sel2.indexOf(day);
	$("#select-one option")[num].selected = true;
	$("#select-two option")[num2].selected = true;
	$('.calendar-all').css('left','0');
	
	
}
point();

function monchange(){
	var month = $('.mouth');
	var mon = [];
	var sel = parseInt($("#select-one option:selected").val());
	for(var i=0;i<month.length;i++){
		mon.push(parseInt(month[i].innerText));	
	}
	var myDate = new Date();
	var moo=myDate.getMonth()+1;
	if(sel<moo){
		layer.msg('抱歉,当前月份无法选择');
	}else{
		var num = mon.indexOf(sel)
		var left = num*99
		$('.calendar-all').stop(true,true).animate({left:-left},300);
	}
}

function daychange(){
	var month = $('.mouth');
	var day = $('.day');
	var mon = [];
	var day2=[];
	var sel = parseInt($("#select-one").val());
	for(var i=0;i<month.length;i++){
		mon.push(parseInt(month[i].innerText));	
	}
	var num = mon.indexOf(sel);
	var left1 = num*99
	//以上是找月份
	var num2 = mon.indexOf(sel+1);
	var sel2 = parseInt($("#select-two option:selected").val());
	for(var i=0;i<day.length;i++){
		day2.push(parseInt(day[i].innerText));
	}
	var allday = day2.slice(num,num2);
	var myDate = new Date();
	var moo=myDate.getDate();
	var yue = myDate.getMonth();
	if(sel == yue){
		if(sel2<moo){
			layer.msg('抱歉,当前日期无法选择');
		}else{
			var nnn = allday.indexOf(sel2);
			if(nnn==-1){
				layer.msg('抱歉,当前日期无法选择');
			}else{
				var left = nnn*99+left1
				$('.calendar-all').stop(true,true).animate({left:-left},300);
			}
		}
	}else{
		var nnn = allday.indexOf(sel2);
		if(nnn==-1){
			layer.msg('抱歉,当前日期无法选择');
		}else{
			var left = nnn*99+left1
			$('.calendar-all').stop(true,true).animate({left:-left},300);
		}
	}
	
} 






















