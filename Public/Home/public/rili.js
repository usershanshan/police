var aDiv = $('.calendar-one');
		var arr = [];
		var arr2 = [];
		function salert(count) {
			for(var i=0;i<aDiv.length;i++){
				
				arr.push(aDiv[i]);
				// console.log(aDiv[i].getAttribute("data-aa"));
			}
			var user = document.getElementsByClassName('calendar-one')[count];
			var userid1=user.getAttribute('data-aa');
			// alert(typeof(userid1));
			// 把string类型转换成数字类型
			var userid=parseInt(userid1);
			var useridName = "calendar-one disable";
			// alert(useridName);

			if(arr2.length>1){
				arr2 = [];
				arr2.push(userid);
				if(arr[arr2[0]].className==useridName){
					arr2=[];
					// alert('b'+arr2.length);
				}else{
					// arr2=arr2;
					aDiv.css('backgroundColor','#789');
					$('.disable').css('backgroundColor','red');
					arr[arr2[0]].style.backgroundColor = 'blue';
					// alert('a'+arr2.length);
				}
				
			}
			else if(arr2.length==1){
				arr2.push(userid);
				if(arr[arr2[1]].className==useridName){
					var unm = parseInt(arr2[1]-arr2[0]);
					if(unm>0){
						// arr2 = arr2;
						arr[arr2[0]].style.backgroundColor = 'blue';
						arr[arr2[1]].style.backgroundColor = 'blue';
						// alert('a'+arr2.length)	
					}else{
						arr2.pop();	
					}
					

					// alert(unm);
				}else if(arr2[1]==arr2[0]){
					arr2.pop();	
				}
				else{
					aDiv.css('backgroundColor','#789');
					$('.disable').css('backgroundColor','red');
					arr[arr2[0]].style.backgroundColor = 'blue';
					
				}
			}
			else{
				arr2.push(userid);
				if(arr[arr2[0]].className==useridName){
					arr2=[];
					// alert(arr2.length);
				}
				else{
					aDiv.css('backgroundColor','#789');
					$('.disable').css('backgroundColor','red');
					arr[arr2[0]].style.backgroundColor = 'blue';
					
				}
			}
			// 获取数组区间
			if(arr2.length==1){
				arr[arr2[0]].style.backgroundColor = 'blue';
			}else{
				if(arr2[0]>arr2[1]){
					var star = arr2[1];
					var end = Number(arr2[0])+Number(1);
				}else{
					var star = arr2[0];
					var end = Number(arr2[1])+Number(1);
				}
				// alert(end);
				var newary=arr.slice(star,end);
				var filternewary = $.grep(newary,function(value){
				            return value.className == useridName;
				        });
				var unm = parseInt(arr2[1]-arr2[0]);
				if(filternewary.length>0 && unm<0){
					arr2.shift();
					aDiv.css('backgroundColor','#789');
					$('.disable').css('backgroundColor','red');
					arr[arr2[0]].style.backgroundColor = 'blue';
					
				}else if(filternewary.length>1 && unm>0 && arr[arr2[1]].className != useridName){
					arr2.shift();
					aDiv.css('backgroundColor','#789');
					$('.disable').css('backgroundColor','red');
					arr[arr2[0]].style.backgroundColor = 'blue';
				}
				else if(filternewary.length>1 && unm>0){
					arr2.pop();
					aDiv.css('backgroundColor','#789');
					$('.disable').css('backgroundColor','red');
					arr[arr2[0]].style.backgroundColor = 'blue';
				}
				else if(filternewary.length==1){
					// arr2.pop();
					// aDiv.css('backgroundColor','#789');
					// $('.disable').css('backgroundColor','red');
					// arr[arr2[0]].style.backgroundColor = 'blue';
					if(arr[arr2[1]].className == useridName){
						for(var i=0;i<newary.length;i++){
							newary[i].style.backgroundColor = 'blue';
						}
						// alert(filternewary.length);
					}
					else{
						arr2.shift();
						aDiv.css('backgroundColor','#789');
						$('.disable').css('backgroundColor','red');
						arr[arr2[0]].style.backgroundColor = 'blue';
					}
					
				}
				else{
					for(var i=0;i<newary.length;i++){
						newary[i].style.backgroundColor = 'blue';
					}
					// alert(filternewary.length);
				}
			}