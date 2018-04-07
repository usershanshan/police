function calendar() {
	var i = $('.calendar-one').length;
	var width = 98*i+i*1;
	$('.calendar-all').css('width',width)
}
calendar();

var aDiv = $('.calendar-one');
var bDiv = $('.calendar-one-bottom');
var arr3 = [];
var arr = [];
var arr2 = [];
function salert(count) {
	for(var i=0;i<aDiv.length;i++){
		
		arr.push(aDiv[i]);
		// console.log(aDiv[i].getAttribute("data-aa"));
	}
	for(var i=0;i<bDiv.length;i++){
		
		arr3.push(bDiv[i]);
		// console.log(aDiv[i].getAttribute("data-aa"));
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