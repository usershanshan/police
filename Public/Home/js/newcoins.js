"use strict";

/**
 * 获得传参
 */
var UrlParse = function() {
	this.host = location.host;
	//this.GET  = _GET();
	// alert(document.scripts[document.scripts.length-1].src.split("\?"));
	this.url = location.herf;
	this.hash = location.hash;
	this.port = location.port;
	this.script_name = location.pathname;
	this.quartyString = document.scripts[document.scripts.length-1].src.split("\?").toString();
	this.protocol = location.protocol;
	this.GET = this.parseArguement();
}
UrlParse.prototype = {
	parseArguement:function (){
		var pos;
		var arg = new Object();
		var quire = document.scripts[document.scripts.length-1].src.split("\?").toString();
		var pair = quire.split("&");
		var argName,argValue;
		if(pair.length > 0){
			for(var i=0;i < pair.length ;i++){
				pos = pair[i].indexOf("=");
				if(pos == -1) continue;
					argName  = pair[i].substring(0,pos);
					argValue = pair[i].substring(pos+1);
					arg[argName] = argValue;
			}
		}else{
			de = quire.indexOf("=");
			if(de != -1){
				argName  = pair[i].substring(0,de);
				argValue = pair[i].substring(de+1);
				arg[argName] = argValue;
			}
		}
		return arg;
	}
 }

 var Url = new UrlParse();

function Coins() {
	this.name = 'Coins';
	this.markets();
	if(Url.GET.type=='on'){
		var $this = this;
		setInterval(function() {
			$this.markets();
		}, 10000);
	}

};


Coins.prototype.markets = function($this) {
	if(Url.GET.type=='on'){
		var time = 10;
		var isInterval = setInterval(function() {
			$('#coins_timer').html(time + '秒后刷新');
			time --;
			if (time == 0) {
				clearInterval(isInterval);
			}
		}, 1000);
	}
	var toptype=$("select[name=toptype]").val()==undefined?'24_ups':$("select[name=toptype]").val();

	// $.ajax({
	// 	type:'get',
	// 	url:'/coins/top5up',
	// 	data:{toptype:toptype},
	// 	dataType:'html',
	// 	success:function(html){
	// 		$("ul.top5").html(html);
	// 	}
	// });
	$.get('/index.php/Home/index/markets?t=' + Math.random(), function(result) {
		var result = result.data;
		// trade district
		for (var item in result) {
			for (var i = 0; i < result[item].length; i++) {
				// current
				if (result[item][i].new_price_status == 1) {
					$('#coins_' + result[item][i].coin_from + '_' + result[item][i].coin_to + '_current').attr('class', 'buy');
					$('#coins_' + result[item][i].coin_from + '_' + result[item][i].coin_to + '_current').text(result[item][i].current + '↑');
				} else if (result[item][i].new_price_status == 2) {
					$('#coins_' + result[item][i].coin_from + '_' + result[item][i].coin_to + '_current').attr('class', 'buy');
					$('#coins_' + result[item][i].coin_from + '_' + result[item][i].coin_to + '_current').text(result[item][i].current);
				} else {
					$('#coins_' + result[item][i].coin_from + '_' + result[item][i].coin_to + '_current').attr('class', 'sell');
					$('#coins_' + result[item][i].coin_from + '_' + result[item][i].coin_to + '_current').text(result[item][i].current + '↓');
				}

				// count
				$('#coins_' + result[item][i].coin_from + '_' + result[item][i].coin_to + '_count').text(result[item][i].count);

				// sum
				$('#coins_' + result[item][i].coin_from + '_' + result[item][i].coin_to + '_sum').text(result[item][i].sum);

				// total_value
				$('#coins_' + result[item][i].coin_from + '_' + result[item][i].coin_to + '_total_value').text(result[item][i].total_value);

				// 24_ups
				if (result[item][i]['24_ups'] > 0) {
					$('#coins_' + result[item][i].coin_from + '_' + result[item][i].coin_to + '_24_ups').attr('class', 'buy');
					$('#coins_' + result[item][i].coin_from + '_' + result[item][i].coin_to + '_24_ups').text('+' + (result[item][i]['24_ups'] * 100).toFixed(2) + '%');
				} else if (result[item][i]['24_ups'] == 0) {
					$('#coins_' + result[item][i].coin_from + '_' + result[item][i].coin_to + '_24_ups').attr('class', 'buy');
					$('#coins_' + result[item][i].coin_from + '_' + result[item][i].coin_to + '_24_ups').text((result[item][i]['24_ups'] * 100).toFixed(2) + '%');
				} else {
					$('#coins_' + result[item][i].coin_from + '_' + result[item][i].coin_to + '_24_ups').attr('class', 'sell');
					$('#coins_' + result[item][i].coin_from + '_' + result[item][i].coin_to + '_24_ups').text((result[item][i]['24_ups'] * 100).toFixed(2) + '%');
				}

				// 7_ups
				if (result[item][i]['7_ups'] > 0) {
					$('#coins_' + result[item][i].coin_from + '_' + result[item][i].coin_to + '_7_ups').attr('class', 'buy');
					$('#coins_' + result[item][i].coin_from + '_' + result[item][i].coin_to + '_7_ups').text('+' + (result[item][i]['7_ups'] * 100).toFixed(2) + '%');
				} else if (result[item][i]['7_ups'] == 0) {
					$('#coins_' + result[item][i].coin_from + '_' + result[item][i].coin_to + '_7_ups').attr('class', 'buy');
					$('#coins_' + result[item][i].coin_from + '_' + result[item][i].coin_to + '_7_ups').text((result[item][i]['7_ups'] * 100).toFixed(2) + '%');
				} else {
					$('#coins_' + result[item][i].coin_from + '_' + result[item][i].coin_to + '_7_ups').attr('class', 'sell');
					$('#coins_' + result[item][i].coin_from + '_' + result[item][i].coin_to + '_7_ups').text((result[item][i]['7_ups'] * 100).toFixed(2) + '%');
				}

			}
		}
	});

};



var Coins = new Coins();

/**
 * TOP5选择查询
 *
 */
// $("select[name=toptype]").on("change",function(){

// 	var toptype=$("select[name=toptype]").val();
// 	$.ajax({
// 		type:'get',
// 		url:'/coins/top5up',
// 		data:{toptype:toptype},
// 		dataType:'html',
// 		success:function(html){
// 			$("ul.top5").html(html);
// 		}
// 	});

// });


/*
 *table 表格排序
 * 使用说明  :
 * 方法1:
 *     new TableSorter("tb1");
 *     效果:
 *         id为tb1的table的第一行任意单元格都可以点击进行排序.
 *
 *         方法2:
 *             new TableSorter("tb1", 0, 1, 3);
 *             效果:
 *                 id为tb1的table的第一行0,1,3单元格可以进行点击排序.
 *                 */



TableSorter.prototype = {
    $ : function(element)//简写document.getElementById
    {
        return document.getElementById(element);
    },
    Init : function(args)//初始化表格的信息和操作
    {
	        this.Rows = [];
	        this.Header = [];
	        this.ViewState = [];
	        this.LastSorted = null;
	        this.NormalCss = "header";
	        this.SortAscCss = "SortAscCss";
	        this.SortDescCss = "SortDescCss";
	        for(var x = 0; x < this.Table.rows.length; x++){
	            this.Rows.push(this.Table.rows[x]);
	        }
	        this.Header = this.Rows.shift().cells;
	        for(var x = 0; x < (args.length ? args.length : this.Header.length); x++){
	            var rowIndex = args.length ? args[x] : x;
	            if(rowIndex >= this.Header.length){
	                continue;
	            }
	            this.ViewState[rowIndex] = false;
	            this.Header[rowIndex].style.cursor = "pointer";
	            this.Header[rowIndex].onclick = this.GetFunction(this, "Sort", rowIndex);
	        }
	    },
    GetFunction : function(variable,method,param)//取得指定对象的指定方法.
    {
        return function(){
            variable[method](param);
        }
    },
    Sort : function(column)//执行排序.
    {
	        if(this.LastSorted){
	            this.LastSorted.className = this.NormalCss;
				this.LastSorted.style.color="#333";
				this.LastSorted.childNodes[1].style.borderTopColor="#848484";
				this.LastSorted.childNodes[2].style.borderBottomColor="#848484";
			}
	        var SortAsNumber = true;
	        for(var x = 0; x < this.Rows.length && SortAsNumber; x++){
	            SortAsNumber = this.IsNumeric($(this.Rows[x].cells[column]).children(0).html());
			}

	        this.Rows.sort(function(row1, row2){
				var result;
				var value1,value2;
				value1 = $(row1.cells[column]).children(0).html().replace(/%/, "");
				value2 = $(row2.cells[column]).children(0).html().replace(/%/, "");
				if(value1 == value2){
					return 0;
				}
				if(SortAsNumber){
					result = parseFloat(value1) > parseFloat(value2);
				}else{
					result = value1 > value2;
				}
				result = result ? -1 : 1;
				return result;
			})
			this.Header[column].style.color="#f60";
	        if(this.ViewState[column]){

	            this.Rows.reverse();
	            this.ViewState[column] = false;
	            this.Header[column].className = this.SortDescCss;
				this.Header[column].childNodes[1].style.borderTopColor = '#848484';
				this.Header[column].childNodes[2].style.borderBottomColor = '#f60';
			}else{
	            this.ViewState[column] = true;
	            this.Header[column].className = this.SortAscCss;
				this.Header[column].childNodes[1].style.borderTopColor = '#f60';
				this.Header[column].childNodes[2].style.borderBottomColor = '#848484';
			}
	        this.LastSorted = this.Header[column];
	        var frag = document.createDocumentFragment();
	        for(var x = 0; x < this.Rows.length; x++){
			    frag.appendChild(this.Rows[x]);
			}
	        this.Table.tBodies[0].appendChild(frag);
	        this.OnSorted(this.Header[column], this.ViewState[column]);
	    },
    IsNumeric : function(num)//验证是否是数字类型.
    {
		num=num.replace(/\s+/, "").replace(/[+-]/, "").replace(/%/,"").replace(/[↑↓]/,"");
        return /^\d+(\.\d+)?$/.test(num);
    },
    OnSorted : function(cell, IsAsc)//排序完后执行的方法.cell:执行排序列的表头单元格,IsAsc:是否为升序排序.
    {
        return;
    }
}

function TableSorter(table)
{
    this.Table = this.$(table);
    if(this.Table.rows.length <= 1)
    {
        return;
    }
    var args = [];
    if(arguments.length > 1){
	    for(var x = 1; x < arguments.length; x++){
            args.push(arguments[x]);
		}
    }
    this.Init(args);
}

new TableSorter("click-sort1", 2,3, 4, 5, 6,7);
// new TableSorter("click-sort2", 2,3, 4, 5, 6,7);
// new TableSorter("click-sort3", 2,3, 4, 5, 6,7);
//new TableSorter("click-sort4", 2,3, 4, 5, 6,7);
//new TableSorter("click-sort5", 2,3, 4, 5, 6,7);
