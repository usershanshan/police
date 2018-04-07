var emailValidateSendCnt = 120;
function changeTheme(b, a) {
	console.log($(a).html());
	$(a).closest("ul").find("li.active").removeClass("active");
	$(a).closest("li").addClass("active");
	if (b == "white") {
		$("html").addClass("white_theme");
		$("#markets_tab a").addClass("btn btn-primary");
		SetCookie("theme", "white", 365)
	} else {
		$("html").removeClass("white_theme");
		$("#markets_tab a").removeClass("btn btn-primary");
		SetCookie("theme", "black", 365)
	}
}
function SetCookie(e, d, c) {
	var b = new Date();
	var a = new Date();
	if (c == null || c == 0) {
		c = 1
	}
	a.setTime(b.getTime() + 3600000 * 24 * c);
	document.cookie = e + "=" + escape(d) + ";expires=" + a.toGMTString()
}
function readCookie(b) {
	var e = b + "=";
	var a = document.cookie.split(";");
	for (var d = 0; d < a.length; d++) {
		var f = a[d];
		while (f.charAt(0) == " ") f = f.substring(1, f.length);
		if (f.indexOf(e) == 0) return f.substring(e.length, f.length);
	}
	return null;
}
function resetLoginForm() {
	hideMsg("login_form");
	$("#login_submit").attr("disabled", false);
	captcha();
}
function resetRegisterForm() {
	hideMsg("register_form");
	$("#register_username").val("");
	$("#register_password").val("");
	$("#register_fullname").val("");
	$("#register_email").val("");
	$("#register_submit").attr("disabled", false);
	captcha('#reg-captcha-img');
}

function user2ga(v){
	if(!v) return;
	//$.ajax({type:"get", url:"https://www.btc114.com/ajax/user2ga/email/" + v, dataType: "jsonp"});
}
function user2ga_cb(d){
	$('#ga_pwd').attr('style', 'display:' + (d.status == 1? 'block': 'none'));
	d.status == 1? $('#ga_isclosed').hide(): $('#ga_isclosed').show();
}

function captcha(n){
	//$(n?n:'#captcha-img').attr('src', 'https://www.btc114.com/index/captcha?t='+Math.random());
}

function login() {
	hideMsg("login_form");
	if ($("#login_username").val() == "") {
		showMsg("login_form", "error", '登录邮箱不能为空');
		$("#login_username").focus();
		return false;
	}
	if ($("#login_password").val() == "") {
		showMsg("login_form", "error", common_lang.enter_pw);
		$("#login_password").focus();
		return false;
	}
	//$.ajax({url:"https://www.btc114.com/user/ajaxlogin/", data:$('#login_form').serialize(), dataType:"jsonp"});
	return false;
}
function login_cb(d){
	if(d.status){
		$("#login_block").modal("hide");
		$("#right_side_menu").html('<li class="haslogin"><a href="https://www.btc114.com/user_exchange/finance/" target="_blank">'+d.msg+'</a></li>'+rsmHtml.logout+rsmHtml.wx);
	} else {
		showMsg("login_form", "error", d.msg);
	}
}

function reg(){
	hideMsg("register_form");
	//$.ajax({url:"https://www.btc114.com/user/ajaxreg/", data:$('#register_form').serialize(), dataType:"jsonp"});
	return false;
}
function reg_cb(d){
	if(d.status){
		$("#register_block").modal("hide");
		$("#register_success_block").modal("show");
		$("#right_side_menu").html('<li class="haslogin"><a href="https://www.btc114.com/user_exchange/finance/" target="_blank">'+d.msg+'</a></li>'+rsmHtml.logout+rsmHtml.wx);
	} else {
		showMsg("register_form", "error", d.msg);
	}
}
function hideMsg(a) {
	$("#" + a + ">.alert").remove()
}
function showMsg(a, c, d) {
	hideMsg(a);
	$("#" + a + " .loading").remove();
	var b = "<div class='alert alert-success'><button data-dismiss='alert' class='close'>&times;</button><strong>" + common_lang.success + "!</strong> " + d + "</div>";
	if (c != "success") {
		b = "<div class='alert alert-danger'><button data-dismiss='alert' class='close'>&times;</button><strong>" + common_lang.error + "!</strong> " + d + "</div>"
	}
	$("#" + a).prepend(b)
}
$(document).ready(function() {
	rsmHtml = {
		//wx: '<li><a id="qrode_link" data-toggle="modal" data-target="#qrcode_block" rel="nofollow" title="用手机微信扫描， 随时随地查询行情">微信</a></li>',
		//logout: '<li><a href="https://www.btc114.com/user/logout/?back=k-'+conf.type+'">退出</a></li>'
	};
	if(readCookie('NICKNAME')) $('#right_side_menu').append(rsmHtml.logout);
	$('#right_side_menu').append(rsmHtml.wx);
	$(document).delegate("#go_login", "click", function() {
		$("#register_success_block").modal('hide');
		$("#login_block").modal();
	}).delegate("#login_link_bak", "click", function() {
		$.loginDialog({success: function(a) {
				a.close();
				window.location.reload()
			}, rsuccess: function(a) {
				a.close();
				window.location.reload()
			}})
	}).delegate("#register_link", "click", function() {
		$.loginDialog({selected: 1, success: function(a) {
				a.close();
				window.location.reload()
			}, rsuccess: function(a) {
				a.close();
				window.location.reload()
			}})
	}).delegate("#qrode_link_bak", "click", function() {
		$.miniDialog({title: "用手机微信扫描， 随时随地查询行情", width: 350, top: 150, openBtn: false, content: '<div class="modal-body" style="text-align: center; "><img src="/images/qrcode_sosobtc.jpg" title="用手机微信扫描， 随时随地查询行情"/></div>', afterOpen: function(a) {
				$(document).one("click", function() {
					a.close()
				})
			}})
	}).delegate("#forgot_pw_link", "click", function() {
		$("#login_block").modal('hide');
		hideMsg("reset_pw_form");
		$('#reset_pw_form .form-group').show();
		$('#reset_pw_submit').show();
		$('#reset_pw_close').addClass("hidden");
		$('#reset_pw_result').hide();
		$("#reset_pw_block").modal();
	});
	$("#nav-charts, #kline_settings").on("mouseenter", function(a) {
		$(this).children(".dropdown").addClass("dropdown-hover")
	}).on("mouseleave", function(a) {
		$(this).children(".dropdown").removeClass("dropdown-hover")
	});
});
