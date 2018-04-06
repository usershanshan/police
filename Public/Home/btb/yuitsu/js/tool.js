(function(d, e) {
	var c = d.document, e = d.jQuery, b = [], a = null, f = 99999;
	e.extend({getParmByName: function(l) {
			var j = d.location.href, h = j.indexOf("?"), g;
			if (h >= 0) {
				g = j.substr(h + 1).split("#")[0].split("&");
				for (var k = 0; k < g.length; k++) {
					if (g[k].split("=")[0] == l) {
						return g[k].split("=")[1] || ""
					}
				}
			}
			return null
		}, getLocalParm: function(l) {
			var j = d.location.href, h = j.indexOf("#"), g;
			if (h >= 0) {
				g = j.substr(h + 1).split("&");
				for (var k = 0; k < g.length; k++) {
					if (g[k].split("=")[0] == l) {
						return g[k].split("=")[1] || ""
					}
				}
			}
			return null
		}, setLocalParm: function(k, m) {
			if (typeof k == "object" && k instanceof Object) {
				for (var j in k) {
					arguments.callee(j, k[j])
				}
				return
			}
			var i = d.location.href, h = i.indexOf("#"), k = k.toLowerCase(), g, l = new RegExp("(" + k + "=[^&]*)");
			if (h >= 0) {
				g = i.substr(h + 1);
				if (g.match(l)) {
					d.location.href = i.replace(l, k + "=" + m)
				} else {
					if (g == "") {
						d.location.href = i + k + "=" + m
					} else {
						d.location.href = i + "&" + k + "=" + m
					}
				}
			} else {
				d.location.href = i + "#" + k + "=" + m
			}
		}, history: (function() {
			var k = {put: function(n, m, l) {
					(m || d).location.hash = l ? this.encoder(n) : n
				}, get: function(n) {
					var m = ((n || d).location.hash).replace(/^#/, "");
					try {
						return e.browser.mozilla ? m : decodeURIComponent(m)
					} catch (l) {
						return m
					}
				}, query: function(m, o) {
					if (!m) {
						return""
					}
					var q = arguments.length == 2 ? o : this.get(), p = q.split("&"), n = 0, l = p.length;
					if (!l) {
						return""
					}
					for (; n < l && !new RegExp("^" + m + "=([a-zA-Z0-9_\\-]*)$").test(p[n]); n++) {
					}
					if (n == l) {
						return""
					}
					return RegExp.$1
				}, setParam: function() {
					var m = this.get(), o = "", l = arguments;
					if ("object" === typeof l[0]) {
						if (l[1]) {
							for (name in l[0]) {
								o += name + "=" + l[0][name] + "&"
							}
							o = o.slice(0, -1)
						} else {
							for (name in l[0]) {
								var n = new RegExp("(.*&?" + name + "=)([^&]*)(&.*)?", "g");
								if (n.test(m)) {
									m = m.replace(n, "$1" + l[0][name] + "$3")
								} else {
									m = !!m ? m + "&" + name + "=" + l[0][name] : name + "=" + l[0][name]
								}
							}
							o = m
						}
						this.put(o)
					} else {
						if ("string" === typeof l[0]) {
							if (l[2]) {
								o = l[0] + "=" + l[1]
							} else {
								var n = new RegExp("(.*&?" + l[0] + "=)([^&]*)(&.*)?", "g");
								if (n.test(m)) {
									o = m.replace(n, "$1" + l[1] + "$3")
								} else {
									o = !!m ? m + "&" + l[0] + "=" + l[1] : l[0] + "=" + l[1]
								}
							}
							this.put(o)
						}
					}
				}, encoder: encodeURIComponent};
			var i = {id: "__jQuery_history", init: function() {
					var l = '<iframe id="' + this.id + '" style="display:none" src="javascript:false;" />';
					e("body").prepend(l);
					return this
				}, _document: function() {
					return e("#" + this.id)[0].contentWindow.document
				}, put: function(m) {
					var l = this._document();
					l.open();
					l.close();
					k.put(m, l)
				}, get: function() {
					return k.get(this._document())
				}};
			function j(m) {
				m = e.extend({unescape: false}, m || {});
				k.encoder = n(m.unescape);
				function n(o) {
					if (o === true) {
						return function(p) {
							return p
						}
					}
					if (typeof o == "string" && (o = l(o.split(""))) || typeof o == "function") {
						return function(p) {
							return o(encodeURIComponent(p))
						}
					}
					return encodeURIComponent
				}
				function l(p) {
					var o = new RegExp(e.map(p, encodeURIComponent).join("|"), "ig");
					return function(q) {
						return q.replace(o, decodeURIComponent)
					}
				}}
			var h = {};
			h.base = {callback: undefined, listenOn: {}, type: undefined, query: function(l) {
					return k.query(l)
				}, setParam: function(n, m, l) {
					k.setParam.call(k, n, m, l)
				}, getParam: function(n) {
					var m = [], p = n.split(" "), o = 0, l = p.length;
					for (; o < l; o++) {
						m.push(k.query(p[o]))
					}
					return m
				}, isChanged: function(p, m) {
					var o = p.split(" "), n = 0, l = o.length;
					for (; n < l && k.query(o[n]) == k.query(o[n], m); n++) {
					}
					return n < l
				}, fire: function(m, l) {
					if (g.isChanged(m, l)) {
						g.listenOn[m].apply(g, g.getParam(m))
					}
				}, check: function() {
				}, load: function(l) {
				}, init: function(m, l) {
					j(l);
					g.callback = m;
					g._options = l;
					g._init()
				}, listen: function(m, l) {
					if ("function" === typeof arguments[0]) {
						g.listenOn["*"] = l
					} else {
						g.listenOn[m] = l
					}
					g._listen();
					return g
				}, _init: function() {
				}, _listen: function() {
				}, _options: {}};
			h.timer = {_appState: undefined, _appInterval: null, _init: function() {
					var l = k.get();
					g._appState = l;
					g.callback(l);
					setInterval(g.check, 100)
				}, check: function() {
					var l = k.get();
					if (l != g._appState) {
						g._appState = l;
						g.callback(l)
					}
				}, load: function(l) {
					if (l != g._appState) {
						k.put(l);
						g._appState = l;
						g.callback(l)
					}
				}, _listen: function() {
					var l = k.get();
					g._appState = l;
					clearInterval(g._appInterval);
					e(c).off("ready").on("ready", function() {
						for (var m in g.listenOn) {
							g.listenOn[m].apply(g, g.getParam(m))
						}
					});
					g._appInterval = setInterval(function() {
						l = k.get();
						if (l != g._appState) {
							for (var m in g.listenOn) {
								g.fire(m, g._appState)
							}
							g._appState = l
						}
					}, 100)
				}};
			h.iframeTimer = {_appState: undefined, _appInterval: null, _init: function() {
					var l = k.get();
					g._appState = l;
					i.init().put(l);
					g.callback(l);
					setInterval(g.check, 100)
				}, check: function() {
					var m = i.get(), l = k.get();
					if (l != m) {
						if (l == g._appState) {
							g._appState = m;
							k.put(m);
							g.callback(m)
						} else {
							g._appState = l;
							i.put(l);
							g.callback(l)
						}
					}
				}, load: function(l) {
					if (l != g._appState) {
						k.put(l);
						i.put(l);
						g._appState = l;
						g.callback(l)
					}
				}, _listen: function() {
					var l = k.get();
					g._appState = l;
					i.init().put(l);
					e(c).off("ready").on("ready", function() {
						for (var m in g.listenOn) {
							g.listenOn[m].apply(g, g.getParam(m))
						}
					});
					clearInterval(g._appInterval);
					g._appInterval = setInterval(function() {
						var o = i.get(), n = k.get();
						if (n != o) {
							if (n == g._appState) {
								for (var m in g.listenOn) {
									g.fire(m, g._appState)
								}
								g._appState = o;
								k.put(o)
							} else {
								for (var m in g.listenOn) {
									g.fire(m, g._appState)
								}
								g._appState = n;
								i.put(n)
							}
						}
					}, 100)
				}};
			h.hashchangeEvent = {_appState: undefined, _init: function() {
					g.callback(k.get());
					e(d).bind("hashchange", g.check)
				}, check: function() {
					g.callback(k.get())
				}, load: function(l) {
					k.put(l)
				}, _listen: function() {
					var l = k.get();
					g._appState = l;
					e(c).ready(function() {
						for (var m in g.listenOn) {
							g.listenOn[m].apply(g, g.getParam(m))
						}
					});
					e(d).off("hashchange").on("hashchange", function() {
						for (var m in g.listenOn) {
							g.fire(m, g._appState)
						}
						g._appState = k.get()
					})
				}};
			var g = e.extend({}, h.base);
			if (e.browser.msie && (e.browser.version < 8 || c.documentMode < 8)) {
				g.type = "iframeTimer"
			} else {
				if ("onhashchange" in d) {
					g.type = "hashchangeEvent"
				} else {
					g.type = "timer"
				}
			}
			g.hash = k;
			e.extend(g, h[g.type]);
			return g
		})(), goToTop: function(g) {
			if (e(".go-to-top").length) {
				e("body,html").animate({scrollTop: 0}, 300, "swing");
				return
			}
			var h = e("body").append('<div class="go-to-top"><a href="javascript:" title="返回顶部">返回顶部</a></div>').find(".go-to-top");
			e.isType(g, "string") && h.addClass(g);
			e(d).scroll(function() {
				if (e(c).scrollTop() > 300) {
					h.fadeIn()
				} else {
					h.fadeOut()
				}
			});
			h.children("a").click(function() {
				e("body,html").animate({scrollTop: 0}, 300, "swing")
			})
		}, dateFormat: function(m, i) {
			var o = {format: "Y-m-d H:i:s", microsecond: new Date().getTime()}, h, g, j = [];
			g = {Y: function(p) {
					return p.getFullYear()
				}, y: function(p) {
					return(p.getFullYear() + "").substr(2)
				}, m: function(p) {
					return p.getMonth() + 1 < 10 ? "0" + (p.getMonth() + 1) : p.getMonth() + 1
				}, n: function(p) {
					return p.getMonth() + 1
				}, d: function(p) {
					return p.getDate() < 10 ? "0" + p.getDate() : p.getDate()
				}, j: function(p) {
					return p.getDate()
				}, w: function(p) {
					return p.getDay()
				}, l: function(p) {
					return["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"][p.getDay()]
				}, g: function(p) {
					return p.getHours() > 12 ? p.getHours() - 12 : p.getHours()
				}, G: function(p) {
					return p.getHours()
				}, h: function(q) {
					var p;
					return(p = q.getHours() > 12 ? q.getHours() - 12 : q.getHours()) < 10 ? "0" + p : p
				}, H: function(p) {
					return p.getHours() < 10 ? "0" + p.getHours() : p.getHours()
				}, i: function(p) {
					return p.getMinutes() < 10 ? "0" + p.getMinutes() : p.getMinutes()
				}, s: function(p) {
					return p.getSeconds() < 10 ? "0" + p.getSeconds() : p.getSeconds()
				}};
			if (arguments.length == 1) {
				if (/^\d+$/.test(arguments[0])) {
					o.microsecond = arguments[0]
				} else {
					if (typeof arguments[0] === "string") {
						o.format = arguments[0]
					}
				}
			}
			if (arguments.length == 2) {
				o.format = m;
				o.microsecond = i
			}
			h = new Date();
			h.setTime(parseInt(o.microsecond));
			j.push(o.format);
			j.key = "";
			for (var n in g) {
				l(j, n)
			}
			return k(j);
			function l(s, q) {
				for (var p = 0; p < s.length; p++) {
					if (s[p] instanceof Array) {
						arguments.callee(s[p], q)
					} else {
						var r = [];
						r = s[p].split(q);
						if (r.length > 1) {
							r.key = q;
							s[p] = r
						}
					}
				}
			}
			function k(q) {
				for (var p = 0; p < q.length; p++) {
					if (q[p] instanceof Array) {
						q[p] = arguments.callee(q[p])
					}
				}
				return q.join(g[q.key] && g[q.key](h) || "")
			}}
		, getBasePath: function() {
			var j = c.getElementsByTagName("head")[0], l = "", k;
			for (var h = 0, g = j.childNodes.length; h < g; h++) {
				if (j.childNodes[h].nodeType != 1 || j.childNodes[h].nodeName.toLowerCase() != "script") {
					continue
				}
				k = /^(?:(?:http|https):\/\/[^\/]+)?([\w\W]*)static\/common\/js\/tool\.js$/.exec(j.childNodes[h].src);
				if (k && k[1]) {
					l = k[1];
					break
				}
			}
			return l
		}, miniDialog: function(h) {
			var o = {width: 300, position: "fixed", top: null, left: null, className: "", id: "miniDialog", unique: false, back: true, header: true, openBtn: true, btns: [{value: "关闭", className: "dialog-cancel", callBack: function(i) {
							return false
						}}], beforeOpen: function() {
				}, afterOpen: function(i) {
				}, beforeClose: function() {
				}, afterClose: function() {
				}, title: "提示信息", content: "", destroy: true, autoCenter: false, allowMove: true, autoSize: true}, q = e.extend({}, o), B = null, z = {close: r, destroy: A, setPosition: g, open: p}, C = ["error", "warn", "succ"], j = "";
			if ("[object String]" === Object.prototype.toString.call(h) && e.inArray(h, C) !== -1) {
				j = h;
				h = arguments[1]
			}
			if ("[object Object]" === Object.prototype.toString.call(h)) {
				e.extend(q, h)
			} else {
				if ("[object String]" === Object.prototype.toString.call(h)) {
					e.extend(q, {content: h})
				}
			}
			if (!!j) {
				q.content = '<div class="dialog-model ' + j + '"><i class="ico-tips"></i>' + q.content + "</div>"
			}
			if (q.beforeOpen() === false) {
				return false
			}
			if (q.unique && c.getElementById(q.id) != null && q.destroy == true) {
				return false
			} else {
				if (c.getElementById(q.id) != null && q.destroy == false) {
					q.back && e("#" + q.id + "-back").css({display: "block", width: 996 >= e("body").width() ? 996 : e("body").width(), height: e(c).height(), "z-index": f++});
					e("#" + q.id).css({top: k("top"), left: k("left"), display: "block", "z-index": f++})
				} else {
					e("body").append(l().replace("${title}", q.title).replace("${content}", q.content));
					var v = e("body").find("#" + q.id + " .dialog-button")[0] || null;
					if (v) {
						for (var w = 0; w < q.btns.length; w++) {
							(function() {
								var i = c.createElement("input"), x;
								i.type = "button";
								i.className = "dialog-btn";
								i.value = q.btns[w].value;
								e(i).addClass(q.btns[w].className);
								x = q.btns[w].callBack;
								if (typeof x == "function") {
									e(i).bind("click", function(y) {
										x(z) === false && r(y)
									})
								}
								v.appendChild(i)
							})()
						}
					}
					e("#" + q.id).addClass(q.className);
					q.back && e("#" + q.id + "-back").css({display: "block", width: 996 >= e("body").width() ? 996 : e("body").width(), height: e(c).height(), "z-index": f++});
					e("#" + q.id).css({display: "block", width: q.width, "z-index": f++, position: "absolute", overflow: "hidden", visibility: "hidden", top: 0, left: 0}).css({top: k("top"), left: k("left"), visibility: "visible"});
					q.afterOpen(z);
					e(d).bind("resize", function() {
						q.back && e("#" + q.id + "-back").css({width: 996 >= e("body").width() ? 996 : e("body").width(), height: e(c).height()})
					});
					if (q.autoCenter) {
						e(d).bind("resize scroll", function() {
							g()
						})
					}
					if (q.autoSize) {
					}
					if (q.allowMove) {
						var u = e("#" + q.id).find(".dialog-header").addClass("dialog-move")[0], t = false, n, m;
						e(u).bind("mousedown", function(i) {
							i.preventDefault();
							n = i.pageX;
							m = i.pageY;
							e(c).bind("mousemove", s);
							t = true
						});
						e(c).bind("mouseup", function(i) {
							if (t == true) {
								e(c).unbind("mousemove", s);
								t = false
							}
						});
						function s(y) {
							var x = parseInt(e("#" + q.id).css("left")) + y.pageX - n, i = parseInt(e("#" + q.id).css("top")) + y.pageY - m;
							if (y.pageX - n == 0 && y.pageY - m == 0) {
								return
							}
							if (e(c).width() < x + e("#" + q.id).width()) {
								x = e(c).width() - e("#" + q.id).width()
							}
							if (x < 0) {
								x = 0
							}
							if (e(c).height() < i + e("#" + q.id).height()) {
								i = e(c).height() - e("#" + q.id).height()
							}
							if (i < 0) {
								i = 0
							}
							e("#" + q.id).css({top: i, left: x});
							n = y.pageX;
							m = y.pageY
						}}
					e("#" + q.id + " .dialog-close").bind("click", r)
				}
			}
			return z;
			function k(i) {
				if (i == "left") {
					return(q.position == "fixed" ? e(c).scrollLeft() : 0) + (q.left == null ? (e(d).width() - e("#" + q.id).width()) / 2 : parseInt(q.left))
				} else {
					return(q.position == "fixed" ? e(c).scrollTop() : 0) + (q.top == null ? (e(d).height() - e("#" + q.id).height()) / 2 : parseInt(q.top))
				}
			}
			function l() {
				var i = "";
				if (e.browser.msie && parseInt(e.browser.version) <= 8) {
					i = "ie-lower"
				}
				var x = "";
				if (q.back) {
					x += '<div id="' + q.id + '-back" class="dialog-mask" style="display:none;"></div>'
				}
				x += '<div id="' + q.id + '" class="' + i + ' dialog-outer" style="display: none;"><table width="100%" border="0" cellspacing="0" cellpadding="0"><tbody><tr><!--<td class="dialog-cl"></td>--><td class="dialog-main">';
				if (q.header) {
					x += '<div class="dialog-header"><div class="dialog-title">${title}</div><a href="javascript:;" onclick="return false" class="dialog-close"></a></div>'
				}
				x += '<div class="dialog-content">${content}</div>';
				if (q.openBtn) {
					x += '<div class="dialog-button"></div>'
				}
				x += '</td><!--<td class="dialog-cr">--></td></tr></tbody></table></div>';
				return x
			}
			function r(i) {
				if (i) {
					i.preventDefault()
				}
				if (q.beforeClose() === false) {
					return false
				}
				if (q.destroy === false) {
					e("#" + q.id + "-back").hide();
					e("#" + q.id).hide()
				} else {
					A()
				}
				q.afterClose()
			}
			function A() {
				e("#" + q.id + " .dialog-ok,#" + q.id + " .dialog-cancel,#" + q.id + " .dialog-close").unbind();
				e(d).unbind("resize scroll", g);
				e("#" + q.id + " .dialog-button input").unbind();
				e("#" + q.id + " .dialog-close").unbind();
				e("#" + q.id + "-back").remove();
				e("#" + q.id).remove()
			}
			function g() {
				clearTimeout(B);
				e("#" + q.id).stop();
				B = setTimeout(function() {
					var x, i;
					i = e(c).scrollTop() + (q.top == null ? (e(d).height() - e("#" + q.id).height()) / 2 : parseInt(q.top));
					x = e(c).scrollLeft() + (q.left == null ? (e(d).width() - e("#" + q.id).width()) / 2 : parseInt(q.left));
					e("#" + q.id).animate({top: i, left: x})
				}, 1000)
			}
			function p() {
				q.back && e("#" + q.id + "-back").css({display: "block", width: 996 >= e("body").width() ? 996 : e("body").width(), height: e(c).height(), "z-index": f++});
				e("#" + q.id).css({top: k("top"), left: k("left"), display: "block", "z-index": f++})
			}}
		, loginDialog: function(p) {
			if (typeof p == "function") {
				p = {success: p}
			}
			var j = {width: 600, url: "../../do/user/login", success: function(q) {
					q.close()
				}, rsuccess: function(q) {
					q.close()
				}, rerror: function(q) {
					q.close()
				}, error: function(q) {
				}, className: "login-dialog", id: "loginDialog", back: true, title: '<ul class="login-type clearfix"><li class=""><a href="javascript:;">帐号登录</a></li><li class=""><a href="javascript:;">用户注册</a></li></ul>', hasTip: true, openBtn: false, unique: true, beforeClose: function() {
					e("#ajax_login_fail,#ajaxLoginForm .text,#ajax_login_code,#ajax_login_look,#login_dialog_bt,input[name='code'],#remain_me").unbind();
					e("#" + h.id).undelegate()
				}, afterClose: function() {
				}, hasTip:false, top: 150, selected: 0};
			var h = e.extend(j, p);
			function g() {
				var q = "";
				q += '<div id="' + h.id + '_wrap"><div class="login_box clearfix">' + (h.hasTip ? '<p class="login-tip"><i class="ico-login-dialog"></i>为了继续您的操作，请先登录</p>' : "") + '<div class="login_form"><form id="ajaxLoginForm" class=""><div class="item"><div class="w-inp clearfix"><i class="ico-login ico-phone"></i><label class="placeholder" for="username">请输入登录手机号</label><input type="text" name="username" class="text" maxlength="18" autocomplete="off" /></div><p id="ajax_login_fail" class="w-err"></p></div><div class="item"><div class="w-inp clearfix"><i class="ico-login ico-pass"></i><label class="placeholder" for="password">密码</label><input type="password" name="password" class="text"></div></div><div class="item clearfix"><a href="javascript:;" class="remember-me on">记住我的登录状态</a></div><div class="item clearfix"><span class="l w-login-bt"><a href="javascript:" id="login_dialog_bt" class="btn-login">登录</a></span><span class="l"><a href="../../getpass.html" class="forget-pass" target="_blank">忘记密码？</a></span></div></form><form id="ajaxRegisterForm"><div class="item"><div class="w-inp clearfix"><i class="ico-login ico-phone"></i><label class="placeholder register-phone" for="rusername">请输入登录手机号</label><input type="text" name="rusername" class="text register-phone" maxlength="18" autocomplete="off" /><a class="btn-getCode" href="javascript:;">获取验证码</a></div><p id="ajax_register_fail" class="w-err"></p></div><div class="item"><div class="w-inp clearfix"><i class="ico-login ico-code"></i><label class="placeholder" for="valideCode">验证码</label><input type="text" name="valideCode" class="text" autocomplete="off"></div></div><div class="item"><div class="w-inp clearfix"><i class="ico-login ico-pass"></i><label class="placeholder" for="rpassword">登录密码</label><input type="password" name="rpassword" class="text"></div></div><div class="item clearfix"><p class="remember-me on">我已阅读并接受<a href="../../aboutus.html#id=service_clause" target="_blank">《服务条款》</a></p></div><div class="item clearfix"><span class="l w-login-bt"><a href="javascript:" id="register_dialog_bt" class="btn-login">注册</a></span><span class="l"><a target="_blank" href="javascript:;" class="go-login">已有帐号？马上登录</a></span></div></form></div><div class="connect-login"><p>使用第三方网站账号登录</p><a class="btn-connect qq" href="javascript:"><i class="ico-app ico-qq"></i>QQ 登录</a><a class="btn-connect sina" href="javascript:"><i class="ico-app ico-weibo"></i>微博登录</a></div></div>';
				return q
			}
			h.content = g();
			var l = this.miniDialog(h);
			var k = (d.screen.availWidth - 700) / 2, i = (d.screen.availHeight - 500) / 2;
			m(h.selected | 0);
			e("#" + h.id).delegate(".dialog-title .login-type a", "click", function() {
				var r = e(this).parent(), q = r.index();
				m(q)
			}).delegate(".remember-me", "click", function() {
				e(this).toggleClass("on")
			}).delegate("#ajaxRegisterForm .remember-me a", "click", function(q) {
				q.stopPropagation()
			}).delegate(".go-login", "click", function() {
				m(0);
				return false
			}).delegate(".qq", "click", function() {
				d.open("../../do/user/openlogin@type=qq", "newwin", "top=" + i + ",left=" + k + ",width=700,height=500")
			}).delegate(".sina", "click", function() {
				d.open("../../do/user/openlogin@type=sina", "newwin", "top=" + i + ",left=" + k + ",width=700,height=500")
			}).delegate("#login_dialog_bt", "click", n).delegate("#ajaxRegisterForm .btn-getCode", "click", function() {
				var r = arguments;
				if (r.callee.getting > 0) {
					e.alert("亲，您的操作过于频繁哦", e(this));
					return false
				}
				var s = e('#ajaxRegisterForm input[name="rusername"]'), q = s.val();
				if (!q) {
					e.alert("亲，手机号码不能为空哦", s);
					s.focus();
					return false
				}
				if (!/^(13[0-9]|147|15[^4\D]|18[^14\D])\d{8}$/.test(q)) {
					e.alert("亲，您填写的手机号码格式有误哦", s);
					s.focus().select();
					return false
				}
				r.callee.getting = 1;
				e.openLoading("正在努力发送短信，请耐心等待");
				e.post("../../do/user/regcode", {phone: q}, function(w) {
					e.closeLoading();
					if (w.success) {
						e.openSuccess(w.error || "短信发送成功，请注意及时查收哦！", 3000);
						r.callee.getting = 2;
						var t = 119, u = null, v = e("#ajaxRegisterForm .btn-getCode");
						(function() {
							u = setInterval(function() {
								if (t) {
									v.text("等待" + t + "秒");
									t--
								} else {
									v.text("获取验证码");
									clearInterval(u);
									r.callee.getting = 0
								}
							}, 1000)
						})()
					} else {
						r.callee.getting = 0;
						e.openError(w.error || "抱歉！未知错误，请稍后重试", 2000)
					}
				}, "json").error(function() {
					r.callee.getting = 0;
					e.openError("抱歉！未知错误，请稍后重试", 2000)
				})
			}).delegate("#register_dialog_bt", "click", o).delegate('#ajaxRegisterForm input[name="valideCode"], #ajaxRegisterForm input[name="rpassword"]', "keyup", function(q) {
				if (q.keyCode == 13) {
					o()
				}
			});
			function m(q) {
				var r = e(".dialog-title .login-type li").eq(q);
				if (r.hasClass("on")) {
					return false
				}
				r.addClass("on").siblings().removeClass("on");
				e("#" + h.id + " form").removeClass("on").eq(q).addClass("on")
			}
			e("#ajaxLoginForm input[type='text'], #ajaxLoginForm input[type='password']").bind("keyup", function(q) {
				if (q.keyCode == 13) {
					n()
				}
			});
			e("#ajaxLoginForm .text, #ajaxRegisterForm .text").focus(function() {
				e(this).parent().addClass("focus-in")
			}).blur(function() {
				e(this).parent().removeClass("focus-in")
			}).keyup(function() {
				if (e(this).val() != "") {
					e(this).parent().addClass("text-hide")
				} else {
					e(this).parent().removeClass("text-hide")
				}
			});
			function n() {
				var r = {}, s = e("#ajaxLoginForm input[name='username']"), q = e("#ajaxLoginForm input[name='password']");
				r.phone = s.val();
				r.password = q.val();
				if (!r.phone) {
					e.alert("亲，手机号码不能为空哦", s);
					s.focus();
					return false
				}
				if (!/^(13[0-9]|147|15[^4\D]|18[^14\D])\d{8}$/.test(r.phone)) {
					e.alert("亲，您填写的手机号码格式有误哦", s);
					s.focus().select();
					return false
				}
				if (!r.password) {
					e.alert("亲，密码不能为空哦", q);
					q.focus();
					return false
				}
				if (!/^[a-zA-Z0-9_]{6,32}$/.test(r.password)) {
					e.alert("亲，您填写的密码格式有误哦", q);
					q.focus().select();
					return false
				}
				r.remember = e("#ajaxLoginForm input.remember-me").hasClass("on") ? 1 : 0;
				e.post(h.url, r, function(t) {
					if (t.success === true) {
						h.success(l)
					} else {
						e("#ajax_login_fail").text(t.error || "抱歉！未知错误，请重试").slideDown("fast");
						h.error(l)
					}
				}, "json")
			}
			function o() {
				var t = arguments;
				var x = e('#ajaxRegisterForm input[name="rusername"]'), q = x.val(), w = e("#ajaxRegisterForm .remember-me");
				if (!w.hasClass("on")) {
					e.alert("亲，要先阅读并接受《服务条款》哦", w);
					return false
				}
				if (!q) {
					e.alert("亲，手机号码不能为空哦", x);
					x.focus();
					return false
				}
				if (!/^(13[0-9]|147|15[^4\D]|18[^14\D])\d{8}$/.test(q)) {
					e.alert("亲，您填写的手机号码格式有误哦", x);
					x.focus().select();
					return false
				}
				var s = e('#ajaxRegisterForm input[name="valideCode"]'), v = s.val(), r = e('#ajaxRegisterForm input[name="rpassword"]'), u = r.val();
				if (!v) {
					e.alert("亲，验证码不能为空哦", s);
					s.focus();
					return false
				}
				if (!/^\d{6}$/.test(v)) {
					e.alert("亲，您填写的验证码格式有误哦", s);
					s.focus().select();
					return false
				}
				if (!u) {
					e.alert("亲，密码不能为空哦", r);
					s.focus();
					return false
				}
				if (!/^[a-zA-Z0-9_]{6,32}$/.test(u)) {
					e.alert("亲，您填写的密码格式有误哦", r);
					r.focus().select();
					return false
				}
				t.callee.getting = true;
				e.openLoading();
				e.post("../../do/user/register", {code: v, pwd: u}, function(y) {
					t.callee.getting = false;
					e.closeLoading();
					if (y.success) {
						e.openSuccess(y.error || "恭喜亲，您已成为比特币中文网的一员！", 2000, function() {
						});
						h.rsuccess(l)
					} else {
						h.rerror(l)
					}
				}, "json").error(function() {
					t.callee.getting = false;
					e.openError("抱歉！未知错误，请稍后重试", 2000)
				})
			}}
		, needLogin: function(m, h, j, g, l) {
			var k = this;
			if (typeof j == "function") {
				l = g;
				g = j
			}
			i();
			function i(n) {
				e.ajax({url: h, type: m, dataType: "json", data: j, success: function(o) {
						if (!o.success && o.errorCode == "1") {
							k.loginDialog({success: i, afterClose: (typeof l == "function" ? l : function() {
								})});
							return
						}
						if (n && n.close) {
							n.close()
						}
						g(o)
					}})
			}}
		, openLoading: function(h) {
			var k = this;
			var l = {id: "loading_" + (new Date()).getTime(), back: false, content: "正在获取数据", model: "gtl_ico_clear"}, i = e(c).width(), g = e(c).height(), m = "", j;
			if (typeof h === "string") {
				j = e.extend(l, {content: h})
			} else {
				j = e.extend(l, h)
			}
			clearTimeout(a);
			k.closeSuccess();
			if (j.back) {
				m += '<div id="' + j.id + '_back" style="position:absolute;width:' + i + "px;height:" + g + "px;opacity: .5;filter: alpha(opacity=50);background: #90928A;top: 0px;left: 0px;z-index:" + (f++) + ';"></div>'
			}
			m += '<div id="' + j.id + '" class="loading-wrap" style="top:' + (e(c).scrollTop() + (e(d).height() - 60) / 2) + "px;z-index:" + (f++) + ';"><span class="loading-outspan" style="z-index:' + (f++) + ';"><span class="' + j.model + '"></span>' + (j.model == "gtl_ico_clear" ? '<img src="/images/loading_2.gif">' : "") + j.content + '<span class="gtl_end"></span></span></div>';
			e("body").append(m);
			b.push(j.id);
			if (j.timeout > 0) {
				a = setTimeout(function() {
					k.closeSuccess();
					if ("function" === typeof j.callback) {
						j.callback()
					}
				}, j.timeout)
			}
		}, closeLoading: function() {
			var g = b[0];
			e("#" + g + "_back, #" + g).remove();
			b.splice(0, 1)
		}, openSuccess: function(i, h, j) {
			var g = {content: i || "操作成功", model: "gtl_ico_succ", timeout: h || 0, callback: j};
			this.openLoading(g)
		}, closeSuccess: function() {
			e.closeLoading()
		}, openError: function(i, h) {
			var g = {content: i || "操作失败", model: "gtl_ico_error", timeout: h || 0};
			this.openLoading(g)
		}, closeError: function() {
			e.closeLoading()
		}, alert: function(t, r, u, l, m) {
			var p = {width: "auto", timeout: 3000, callBack: function() {
				}, offset: 10, tip: "提示", attachTo: null, style: {maxWidth: 300, position: "absolute", top: 13, left: "50%", marginLeft: 550, opacity: 1}}, w = this, q = arguments, g = {}, k = "", i = {};
			if (w.isType(q[0], "object") && q.length == 1) {
				w.extend(true, g, p, q[0])
			} else {
				if (w.isType(q[0], "string")) {
					var t = q[0], j = Array.prototype.slice.call(q, 1);
					w.extend(true, g, p, {tip: t, timeout: n(j, "number"), callBack: n(j, "function"), attachTo: n(j, "object"), style: {position: n(j, "string")}})
				}
			}
			if (g.attachTo && w.isType(g.attachTo, "object")) {
				g.style.marginLeft = 0;
				g.style.top = g.attachTo.offset().top - 20;
				g.style.left = g.attachTo.offset().left + g.attachTo.width() - 20
			}
			for (var h in g.style) {
				if (h == "opacity") {
					continue
				}
				i[h] = g.style[h]
			}
			k = ['<div class="js-alert-box"><p class="js-alert-tip">', g.tip, "</p></div>"].join("");
			var o = null;
			clearTimeout(q.callee.delay);
			if (!w.isType(g.timeout, "number")) {
				g.timeout = 3000
			}
			if (e(".js-alert-box").length) {
				o = e(".js-alert-box");
				if (o.css("display") == "block") {
					o.css(i).find(".js-alert-tip").html(g.tip);
					s()
				} else {
					o.animate({opacity: g.style.opacity, top: g.style.top}, 300, function() {
						s()
					})
				}
			} else {
				var v = g.style.top - g.offset;
				i.top = v;
				o = e("body").append(k).find(".js-alert-box").css({width: g.width, zIndex: ++f}).css(i).animate({opacity: g.style.opacity, top: g.style.top}, 300, function() {
					s()
				})
			}
			function n(x, y) {
				return w.grep(x, function(A, z) {
					return w.isType(A, y)
				})[0]
			}
			function s() {
				q.callee.delay = setTimeout(function() {
					o.animate({opacity: 0, top: g.style.top - g.offset}, 300, function() {
						o.remove()
					})
				}, g.timeout)
			}}
		, isType: function(h, g) {
			return Object.prototype.toString.call(h).slice(8, -1).toLowerCase() === g.toLowerCase()
		}, LunarMaker: (function() {
			var p = new Array(19416, 19168, 42352, 21717, 53856, 55632, 21844, 22191, 39632, 21970, 19168, 42422, 42192, 53840, 53909, 46415, 54944, 44450, 38320, 18807, 18815, 42160, 46261, 27216, 27968, 43860, 11119, 38256, 21234, 18800, 25958, 54432, 59984, 27285, 23263, 11104, 34531, 37615, 51415, 51551, 54432, 55462, 46431, 22176, 42420, 9695, 37584, 53938, 43344, 46423, 27808, 46416, 21333, 19887, 42416, 17779, 21183, 43432, 59728, 27296, 44710, 43856, 19296, 43748, 42352, 21088, 62051, 55632, 23383, 22176, 38608, 19925, 19152, 42192, 54484, 53840, 54616, 46400, 46752, 38310, 38335, 18864, 43380, 42160, 45690, 27216, 27968, 44870, 43872, 38256, 19189, 18800, 25776, 29859, 59984, 27480, 23232, 43872, 38613, 37600, 51552, 55636, 54432, 55888, 30034, 22176, 43959, 9680, 37584, 51893, 43344, 46240, 47780, 44368, 21977, 19360, 42416, 20854, 21183, 43312, 31060, 27296, 44368, 23378, 19296, 42726, 42208, 53856, 60005, 54576, 23200, 30371, 38608, 19195, 19152, 42192, 53430, 53855, 54560, 56645, 46496, 22224, 21938, 18864, 42359, 42160, 43600, 45653, 27951, 44448, 19299, 37759, 18936, 18800, 25776, 26790, 59999, 27424, 42692, 43759, 37600, 53987, 51552, 54615, 54432, 55888, 23893, 22176, 42704, 21972, 21200, 43448, 43344, 46240, 46758, 44368, 21920, 43940, 42416, 21168, 45683, 26928, 29495, 27296, 44368, 19285, 19311, 42352, 21732, 53856, 59752, 54560, 55968, 27302, 22239, 19168, 43476, 42192, 53584, 62034, 54560);
			var u = new Array(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);
			var r = "正二三四五六七八九十冬腊".split("");
			var B = new Array("甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸");
			var C = new Array("子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥");
			var v = new Array("鼠", "牛", "虎", "兔", "龙", "蛇", "马", "羊", "猴", "鸡", "狗", "猪");
			var y = new Array("小寒", "大寒", "立春", "雨水", "惊蛰", "春分", "清明", "谷雨", "立夏", "小满", "芒种", "夏至", "小暑", "大暑", "立秋", "处暑", "白露", "秋分", "寒露", "霜降", "立冬", "小雪", "大雪", "冬至");
			var h = new Array(0, 21208, 42467, 63836, 85337, 107014, 128867, 150921, 173149, 195551, 218072, 240693, 263343, 285989, 308563, 331033, 353350, 375494, 397447, 419210, 440795, 462224, 483532, 504758);
			var j = new Array("日", "一", "二", "三", "四", "五", "六", "七", "八", "九", "十");
			var i = new Array("初", "十", "廿", "卅", "　");
			var l = new Array("JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC");
			var D = {"2011-11-22": "", "2011-11-23": "小雪", "2012-1-20": "", "2012-1-21": "大寒", "2012-5-20": "小满", "2012-5-21": "", "2012-12-6": "", "2012-12-7": "大雪", "2013-2-3": "", "2013-2-4": "立春", "2013-7-22": "大暑", "2013-7-23": "", "2013-12-21": "", "2013-12-22": "冬至", "2014-3-5": "", "2014-3-6": "惊蛰", "2015-1-5": "", "2015-1-6": "小寒", "2016-6-6": "", "2016-6-7": "大雪", "2017-7-22": "大暑", "2017-7-23": "", "2017-12-21": "", "2017-12-22": "冬至", "2018-2-18": "", "2018-2-19": "雨水", "2018-3-20": "", "2018-3-21": "春分", "2019-2-4": "立春", "2019-2-5": "", "2019-6-21": "夏至", "2019-6-22": "", "2020-7-6": "小暑", "2020-7-7": "", "2020-8-22": "处暑", "2020-8-23": "", "2020-12-6": "", "2020-12-7": "大雪"};
			var A = new Array("0101 元旦节", "0214 情人节", "0305 雷锋日", "0308 妇女节", "0312 植树节", "0401 愚人节", "0501 劳动节", "0502 劳动节", "0503 劳动节", "0504 青年节", "0601 儿童节", "0605 环保日", "0606 爱眼日", "0701 建党节", "0801 建军节", "0910 教师节", "1001 国庆节", "1002 国庆节", "1003 国庆节", "1120 彝族年", "1121 彝族年", "1122 彝族年", "1224 平安夜", "1225 圣诞节");
			var w = new Array("0101 春节", "0102 春节", "0103 春节", "0115 元宵节", "0505 端午节", "0624 火把节", "0625 火把节", "0626 火把节", "0707 情人节", "0715 中元节", "0815 中秋节", "0909 重阳节", "1208 腊八节", "1224 小年", "0100 除夕");
			var n = new Array("0520 母亲节", "0630 父亲节", "1144 感恩节");
			function q(H) {
				var F, G = 348;
				for (F = 32768; F > 8; F >>= 1) {
					G += (p[H - 1900] & F) ? 1 : 0
				}
				return(G + m(H))
			}
			function m(F) {
				if (g(F)) {
					return((p[F - 1899] & 15) == 15 ? 30 : 29)
				} else {
					return(0)
				}
			}
			function g(G) {
				var F = p[G - 1900] & 15;
				return(F == 15 ? 0 : F)
			}
			function s(G, F) {
				return((p[G - 1900] & (65536 >> F)) ? 30 : 29)
			}
			function o(G, F) {
				if (F == 1) {
					return(((G % 4 == 0) && (G % 100 != 0) || (G % 400 == 0)) ? 29 : 28)
				} else {
					return(u[F])
				}
			}
			function E(F) {
				return(B[F % 10] + C[F % 12])
			}
			function z(H, G) {
				var F = new Date((31556925974.7 * (H - 1900) + h[G] * 60000) + Date.UTC(1900, 0, 6, 2, 5));
				return(F.getUTCDate())
			}
			function x(G) {
				var F;
				switch (G) {
					case 10:
						F = "初十";
						break;
					case 20:
						F = "二十";
						break;
						break;
					case 30:
						F = "叁十";
						break;
						break;
					default:
						F = i[Math.floor(G / 10)];
						F += j[G % 10]
				}
				return(F)
			}
			function k(F) {
				return r[F]
			}
			function t(I) {
				var H, G = 0, F = 0;
				var J = (Date.UTC(I.getFullYear(), I.getMonth(), I.getDate()) - Date.UTC(1900, 0, 31)) / 86400000;
				for (H = 1900; H < 2100 && J > 0; H++) {
					F = q(H);
					J -= F
				}
				if (J < 0) {
					J += F;
					H--
				}
				this.year = H;
				G = g(H);
				this.isLeap = false;
				for (H = 1; H < 13 && J > 0; H++) {
					if (G > 0 && H == (G + 1) && this.isLeap == false) {
						--H;
						this.isLeap = true;
						F = m(this.year)
					} else {
						F = s(this.year, H)
					}
					if (this.isLeap == true && H == (G + 1)) {
						this.isLeap = false
					}
					J -= F
				}
				if (J == 0 && G > 0 && H == G + 1) {
					if (this.isLeap) {
						this.isLeap = false
					} else {
						this.isLeap = true;
						--H
					}
				}
				if (J < 0) {
					J += F;
					--H
				}
				this.month = H;
				this.day = J + 1
			}
			return{getLunarDate: function(ak) {
					var S = new t(ak);
					var Q = ak.getFullYear();
					var X = ak.getMonth();
					var ah = ak.getDate();
					var aj = new Date(Q, X, 1, 0, 0, 0, 0);
					var ae = o(Q, X);
					var ab = aj.getDay();
					var af, H, O;
					if (X < 2) {
						af = E(Q - 1900 + 36 - 1)
					} else {
						af = E(Q - 1900 + 36)
					}
					var Z = z(Q, 2);
					var aa = z(Q, X * 2);
					H = E((Q - 1900) * 12 + X + 12);
					var W = Date.UTC(Q, X, 1, 0, 0, 0, 0) / 86400000 + 25567 + 10;
					if (X == 1 && ah >= Z) {
						af = E(Q - 1900 + 36)
					}
					if (ah >= aa) {
						H = E((Q - 1900) * 12 + X + 13)
					}
					O = E(W + ah - 1);
					var G = z(Q, X * 2) - 1;
					var F = z(Q, X * 2 + 1) - 1;
					var ad = "";
					if (ak.getDate() == G + 1) {
						ad = y[X * 2]
					} else {
						if (ak.getDate() == F + 1) {
							ad = y[X * 2 + 1]
						}
					}
					if (D[[Q, X + 1, ah].join("-")] != undefined) {
						ad = D[[Q, X + 1, ah].join("-")]
					}
					var R = "", V, T;
					for (ac in A) {
						if (A[ac].match(/^(\d{2})(\d{2})([\s\*])(.+)$/)) {
							if (Number(RegExp.$1) == (X + 1) && Number(RegExp.$2) == ah) {
								R += RegExp.$4 + " "
							}
						}
					}
					for (ac in n) {
						if (n[ac].match(/^(\d{2})(\d)(\d)([\s\*])(.+)$/)) {
							if (Number(RegExp.$1) == (X + 1)) {
								V = Number(RegExp.$2);
								T = Number(RegExp.$3);
								if (((ab > T) ? 7 : 0) + 7 * (V - 1) + T - ab == ah - 1) {
									R += RegExp.$5 + " "
								}
							}
						}
					}
					var Y = "";
					var N, ag, I, P = 1, M, ai = 0, V, T;
					var L = [];
					var K = new Array(3);
					var U = 0;
					var J = 0;
					for (var ac = 0; ac < ae; ac++) {
						aj = new Date(Q, X, ac + 1);
						N = new t(aj);
						L.push(N);
						if (P > ai) {
							ag = N.year;
							I = N.month;
							P = N.day;
							M = N.isLeap;
							ai = M ? m(ag) : s(ag, I);
							if (U == 0) {
								J = I
							}
							K[U++] = ac - P + 1
						}
						P++
					}
					for (ac in w) {
						if (w[ac].match(/^(\d{2})(.{2})([\s\*])(.+)$/)) {
							V = Number(RegExp.$1) - J;
							if (V == -11) {
								V = 1
							}
							if (V >= 0 && V < U) {
								T = K[V] + Number(RegExp.$2) - 1;
								if (T >= 0 && T < ae && T == ah - 1 && L[T].isLeap != true) {
									Y += RegExp.$4 + " "
								}
							}
						}
					}
					return{lYear: S.year, lMonth: (S.isLeap ? "闰" : "") + k(S.month - 1) + "月", lDay: x(S.day), cYear: af, cMonth: H, cDay: O, solarTerm: ad, sFestival: R, lFestival: Y, aYear: v[(S.year - 4) % 12], getLunarDay: function() {
							return !!ad ? ad : (!!Y ? Y : (!!R ? R : ("初一" == x(S.day) ? (S.isLeap ? "闰" : "") + k(S.month - 1) + "月" : x(S.day))))
						}}
				}}
		})(), detectZoom: function() {
			var g = function() {
				var l, j;
				function m(t, s) {
					var q = c.createElement("style");
					c.getElementsByTagName("head")[0].appendChild(q);
					var p = c.createElement("div");
					p.innerHTML = "test";
					p.id = "mq_dummyElement";
					c.body.appendChild(p);
					q.sheet.insertRule("@media(" + t + ":" + s + "){#mq_dummyElement{text-decoration:underline}}", 0);
					var o = getComputedStyle(p, null).textDecoration == "underline";
					q.sheet.deleteRule(0);
					c.body.removeChild(p);
					c.getElementsByTagName("head")[0].removeChild(q);
					return o
				}
				function h(t, r, p, o, s, u) {
					var q = (p + o) / 2;
					if (s == 0 || o - p < u) {
						return q
					}
					if (m(t, q + r)) {
						return h(t, r, q, o, s - 1, u)
					} else {
						return h(t, r, p, q, s - 1, u)
					}
				}
				var k = {msie: function(o) {
						if (o == 7) {
							var p = c.body.getBoundingClientRect();
							return((p.right - p.left) / c.body.offsetWidth)
						} else {
							if (o == 8) {
								return(screen.deviceXDPI / screen.logicalXDPI)
							} else {
								if (o >= 9) {
									return(screen.deviceXDPI / screen.systemXDPI)
								}
							}
						}
					}, webkit: function(o) {
						var p = Math.max(c.documentElement.clientWidth, c.documentElement.scrollWidth, c.documentElement.offsetWidth);
						return(c.width / p)
					}, mozilla: function(o) {
						if (o > "1.9.1" && o < "1.9.2") {
							return(screen.width / h("min-device-width", "px", 0, 6000, 20, 0.0001))
						} else {
							if (parseFloat(o) >= 4) {
								return(Math.round(1000 * h("min--moz-device-pixel-ratio", "", 0, 10, 20, 0.0001)) / 1000)
							} else {
							}
						}
					}};
				j = e.browser.version;
				for (var n in e.browser) {
					if (n != "version") {
						l = n
					}
				}
				function i(s, t, r) {
					if (!e(".page-resize").length) {
						e("body").append(['<div class="page-resize">', '<span class="page-resize-text">网页内容已被<span id="js_id_type"></span>', "，为了获得更好的浏览体验，请您还原网页为默认大小：&nbsp;按下", '<span class="key-wrap" id="js_id_key1"><span class="key-name">Ctrl</span></span>和', '<span class="key-wrap" id="js_id_key2"><span class="key-name">0</span></span></span>', '<a href="javascript:;" class="page-resize-link" id="js_id_resize_noshow">不再显示</a>', '<a href="javascript:;" class="btn-close" id="js_resize_close">关闭</a></div>'].join(""));
						e(c).delegate("#js_resize_close", "click", function() {
							e(".page-resize").hide()
						}).delegate("#js_id_resize_noshow", "click", function() {
							e(".page-resize").hide();
							e.cookie("js_id_resize_noshow", true)
						})
					}
					var p = e(".page-resize"), o = s > 1 ? 2 : s < 1 ? 0 : 1, q = ["缩小", "", "放大"];
					p.find("#js_id_type").text(q[o]);
					if (o == 1) {
						p.hide()
					} else {
						p.show()
					}
				}
				return(function() {
					if (e.cookie("js_id_resize_noshow")) {
						return false
					}
					var o = k[l](j);
					i(o)
				})
			}();
			g();
			e(d).on("resize", g)
		}});
	(function() {
		var g = /\+/g;
		function i(k) {
			if (h.raw) {
				return k
			}
			return decodeURIComponent(k.replace(g, " "))
		}
		function j(k) {
			if (k.indexOf('"') === 0) {
				k = k.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, "\\")
			}
			k = i(k);
			try {
				return h.json ? JSON.parse(k) : k
			} catch (l) {
			}
		}
		var h = e.cookie = function(r, q, w) {
			if (q !== undefined) {
				w = e.extend({}, h.defaults, w);
				if (typeof w.expires === "number") {
					var s = w.expires, v = w.expires = new Date();
					v.setDate(v.getDate() + s)
				}
				q = h.json ? JSON.stringify(q) : String(q);
				return(c.cookie = [h.raw ? r : encodeURIComponent(r), "=", h.raw ? q : encodeURIComponent(q), w.expires ? "; expires=" + w.expires.toUTCString() : "", w.path ? "; path=" + w.path : "", w.domain ? "; domain=" + w.domain : "", w.secure ? "; secure" : ""].join(""))
			}
			var u = c.cookie.split("; ");
			var x = r ? undefined : {};
			for (var p = 0, n = u.length; p < n; p++) {
				var o = u[p].split("=");
				var k = i(o.shift());
				var m = o.join("=");
				if (r && r === k) {
					x = j(m);
					break
				}
				if (!r) {
					x[k] = j(m)
				}
			}
			return x
		};
		h.defaults = {};
		e.removeCookie = function(l, k) {
			if (e.cookie(l) !== undefined) {
				e.cookie(l, "", e.extend({}, k, {expires: -1}));
				return true
			}
			return false
		}
	})();
	(function(g) {
		if (e.browser.msie && e.browser.version < 9) {
			g(d, c)
		}
	})(function(A, G) {
		function z() {
			var g = H.elements;
			return"string" == typeof g ? g.split(" ") : g
		}
		function D(h) {
			var g = y[h[x]];
			g || (g = {}, E++, h[x] = E, y[E] = g);
			return g
		}
		function w(h, g, i) {
			g || (g = G);
			if (F) {
				return g.createElement(h)
			}
			i || (i = D(g));
			g = i.cache[h] ? i.cache[h].cloneNode() : u.test(h) ? (i.cache[h] = i.createElem(h)).cloneNode() : i.createElem(h);
			return g.canHaveChildren && !J.test(h) ? i.frag.appendChild(g) : g
		}
		function I(h, g) {
			if (!g.cache) {
				g.cache = {}, g.createElem = h.createElement, g.createFrag = h.createDocumentFragment, g.frag = g.createFrag()
			}
			h.createElement = function(i) {
				return !H.shivMethods ? g.createElem(i) : w(i, h, g)
			};
			h.createDocumentFragment = Function("h,f", "return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&(" + z().join().replace(/[\w\-]+/g, function(i) {
				g.createElem(i);
				g.frag.createElement(i);
				return'c("' + i + '")'
			}) + ");return n}")(H, g.frag)
		}
		function v(h) {
			h || (h = G);
			var g = D(h);
			if (H.shivCSS && !C && !g.hasCSS) {
				var j, i = h;
				j = i.createElement("p");
				i = i.getElementsByTagName("head")[0] || i.documentElement;
				j.innerHTML = "x<style>article,aside,dialog,figcaption,figure,footer,header,hgroup,main,nav,section{display:block}mark{background:#FF0;color:#000}template{display:none}</style>";
				j = i.insertBefore(j.lastChild, i.firstChild);
				g.hasCSS = !!j
			}
			F || I(h, g);
			return h
		}
		var B = A.html5 || {}, J = /^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i, u = /^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i, C, x = "_html5shiv", E = 0, y = {}, F;
		(function() {
			try {
				var h = G.createElement("a");
				h.innerHTML = "<xyz></xyz>";
				C = "hidden" in h;
				var g;
				if (!(g = 1 == h.childNodes.length)) {
					G.createElement("a");
					var j = G.createDocumentFragment();
					g = "undefined" == typeof j.cloneNode || "undefined" == typeof j.createDocumentFragment || "undefined" == typeof j.createElement
				}
				F = g
			} catch (i) {
				F = C = !0
			}
		})();
		var H = {elements: B.elements || "abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output progress section summary template time video", version: "3.7.0", shivCSS: !1 !== B.shivCSS, supportsUnknownElements: F, shivMethods: !1 !== B.shivMethods, type: "default", shivDocument: v, createElement: w, createDocumentFragment: function(i, g) {
				i || (i = G);
				if (F) {
					return i.createDocumentFragment()
				}
				for (var g = g || D(i), m = g.frag.cloneNode(), l = 0, k = z(), j = k.length; l < j; l++) {
					m.createElement(k[l])
				}
				return m
			}};
		A.html5 = H;
		v(G)
	});
	e.fn.extend({toggleInt: function(m, n) {
			var k;
			if (isNaN(m = parseInt(m))) {
				return this
			}
			n = parseInt(n) || 1000;
			n = n < 100 ? 100 : n;
			for (var j = 0, h = this.length; j < h; j++) {
				k = this[j];
				if (isNaN(parseInt(k.innerHTML))) {
					continue
				}
				g(k, m, n)
			}
			return this;
			function g(v, l, p) {
				var u = parseInt(k.innerHTML), s, r, q, o, i, t = 0;
				o = 20;
				s = l - u;
				s = s < 0 ? -s : s;
				q = s / p * o;
				q = q < 1 ? 1 : Math.floor(q);
				if (q == 1) {
					o = Math.floor(p / s)
				}
				i = Math.floor(p / o) + (p % o === 0 ? 0 : 1);
				q = (l - u) < 0 ? -q : q;
				r = setInterval(function() {
					t++;
					if (t === i) {
						k.innerHTML = l;
						clearInterval(r);
						return
					}
					u = u + q;
					k.innerHTML = u
				}, o)
			}}
		, textToHtml: function(k) {
			var n = {headSpace: "1em", OtherSpace: "&nbsp;", htmlTag: false}, j, o, l, m, g;
			k = e.extend(n, k);
			if (!this.length || this.length == 0) {
				return""
			}
			j = this[0];
			o = e(j).val().replace(/^(?:[\s\r\t\f\n]*\n)?([\w\W]*?)[\s\n\r\f\t]*$/, "$1").split(/\n/);
			if (o.length == 1 && o[0] == "") {
				return""
			}
			g = k.headSpace.match(/^([\d\.]*)([a-zA-Z]*)$/);
			for (var h = 0; h < o.length; h++) {
				m = o[h].replace(/^(\s*)[\w\W]*$/, "$1").match(/\s/g);
				l = (m ? m.length : 0);
				o[h] = o[h].replace(/^\s*([\w\W]*)$/, "$1").replace(/\s/g, k.OtherSpace);
				o[h].replace(/<script([^>]*)>([^<]*)<\/script>/g, "&lt;script$1&gt;$2&lt;/script&gt;");
				if (!k.htmlTag) {
					o[h] = o[h].replace(/</g, "&lt;").replace(/>/g, "&gt;")
				}
				if (l > 0) {
					o[h] = '<p style="text-indent:' + (parseFloat(g[1]) * l) + g[2] + '">' + o[h] + "</p>"
				} else {
					o[h] = "<p>" + o[h] + "</p>"
				}
			}
			return o.join("")
		}, input: function(j) {
			var k = e.browser.msie;
			for (var h = 0, g = this.length; h < g; h++) {
				if (k) {
					(function(i) {
						i.attachEvent("onpropertychange", function(l) {
							j.call(i, d.event)
						})
					})(this[h])
				} else {
					this[h].addEventListener("input", j, false)
				}
			}
			return this
		}})
})(window, window.jQuery);