/*! main.js */
(function() {
	var K, i, M, P, bf, aQ, az, aB, X, h, an, B, au, bd, ao, aF, a7, J, A, t, m, aZ, H, ae, aG, a9, al, q, bc, aK, aY, e, a5, u, aS, v, aA, aW, a2, aI, aJ, s, l, O, aD, c, at, aE, x, a, ax, aC, E, F, aV, w, W, V, S, a3, aN, aM, N, a6, aR, ag, a4, be, Y, U, bb, af, j, D, aU, ak, ai, g, f, d, aP, ad, G, a1, r, am, ac, av, k, b, ab, L, aj, aa, I, aT, T, aL, Z, aO, aw, R, a8, y, ay, z, bg, ba, C, Q, ar, aq, ah, a0, aX, ap, aH = {}.hasOwnProperty, n = [].slice;
	(function() {
		var bj, p, bi, bh = this;
		$(function() {
			var bk;
			bk = function(bl, bt) {
				var bs, bn, br, bp, bu, bq, bo, bm;
				bn = $("#setting_" + bt.id);
				bq = (bo = (bm = $.cookie(bt.id)) != null ? bm.toLowerCase() : void 0) != null ? bo : "";
				bs = false;
				bu = (function() {
					var bw, bv;
					bw = bt.options;
					bv = [];
					for (br in bw) {
						if (!aH.call(bw, br)) {
							continue
						}
						bp = bw[br];
						bv.push((function(bz, by) {
							var bx;
							bx = $("li[value=" + by + "]", bn);
							bx.active = function() {
								bx.addClass("active");
								return bt.value = by
							};
							bx.click(function() {
								$("li", bn).removeClass("active");
								bx.active();
								$.cookie(bt.id, by, {expires: 3650, path: "/"});
								if (bt.refresh) {
									return window.location.reload()
								} else {
									return world_draw_main()
								}
							});
							if (by === bq) {
								bs = true;
								bx.active()
							}
							return bx
						})(br, bp))
					}
					return bv
				})();
				if (!bs) {
					return bu[0].active()
				}
			};
			for (bj in $settings) {
				if (!aH.call($settings, bj)) {
					continue
				}
				p = $settings[bj];
				bk(bj, p)
			}
			return null
		})
	})();
	R = w = bg = aV = aO = aS = F = z = aj = h = a1 = aw = P = an = aY = d = aP = ad = I = null;
	(function() {
		var bh, p;
		aV = function(bm, bj) {
			var bi, bk, bl;
			bl = false;
			bk = bm;
			return bi = function() {
				var bp = this;
				bk = bm;
				if (bl) {
					return true
				}
				bl = true;
				function bo() {
					if (bk > 0) {
						bg(16, function() {
							bo(bk -= 16)
						})
					} else {
						bn()
					}
				}
				bo();
				function bn() {
					bj();
					return bl = false
				}}
		};
		aV.statuses = {};
		R = function() {
			return console.log.apply(console, arguments)
		};
		w = function() {
			return console.log.apply(console, [new Date()].concat(n.call(arguments)))
		};
		bg = function(bj, bi) {
			return setTimeout(bi, bj)
		};
		aS = function() {
			var bi, bl, bn, bm, bp, bo, bk, bj;
			bn = arguments[0], bm = 3 <= arguments.length ? n.call(arguments, 1, bp = arguments.length - 1) : (bp = 1, []), bl = arguments[bp++];
			bj = [];
			for (bo = 0, bk = bl.length; bo < bk; bo++) {
				bi = bl[bo];
				if (typeof bi === "object" && bi.length) {
					bj.push(bn.apply(null, n.call(bm).concat(n.call(bi))))
				} else {
					bj.push(bn.apply(null, n.call(bm).concat([bi])))
				}
			}
			return bj
		};
		z = function(bi) {
			if (typeof console !== "undefined" && console !== null ? console.time : void 0) {
				console.time("world");
				bi();
				return console.timeEnd("world")
			} else {
				return bi()
			}
		};
		aj = function(bi) {
			return bi[bi.length - 1]
		};
        function isArray(o) {
            return Object.prototype.toString.call(o) === '[object Array]';
        }
        F = function(bl) {
			var bj, bk, bi;
			if (isArray(bl)) {
				return bl.slice(0)
			} else {
				bk = {};
				for (bj in bl) {
					if (!aH.call(bl, bj)) {
						continue
					}
					bi = bl[bj];
					bk[bj] = bi
				}
				return bk
			}
		};
		bh = 0;
		h = function(bl) {
			var bj, bk, bi;
			bi = [];
			for (bj = bk = 0; 0 <= bl ? bk < bl : bk > bl; bj = 0 <= bl ? ++bk : --bk) {
				bi.push(bh++)
			}
			return bi
		};
		a1 = function() {
			var bl, bi, bn, bm, bk, bj;
			bl = 1 <= arguments.length ? n.call(arguments, 0) : [];
			bi = bl.pop();
			bk = bl[0], bn = bl[1];
			if (bn == null) {
				bn = {}
			}
			if (bk[bk.length - 1] !== "?") {
				bn.nonce = Date.now()
			}
			if (typeof XDomainRequest !== "undefined" && XDomainRequest !== null) {
				if (bk.indexOf("?") === -1) {
					bk = bk + "?" + $.param(bn)
				} else {
					bk = bk + "&" + $.param(bn)
				}
				bj = new XDomainRequest();
				bj.open("GET", bk);
				bj.onload = function() {
					bn = $.parseJSON(bj.responseText);
					if (!bn) {
						return bi(new Error("parse json failed"), null)
					}
					return bi(null, bn)
				};
				bj.onerror = function(bo) {
					return bi("error", null)
				};
				bj.ontimeout = function() {
				};
				bj.onprogress = function() {
				};
				bj.timeout = 60000;
				bj.send();
				return bj
			}
			bm = $.ajax({url: bk, type: "GET", dataType: "json", timeout: 60000, data: bn});
			bm.done(function(bo) {
				return bi(null, bo)
			});
			return bm.fail(function(bp, bo, br) {
				var bq;
				if (bo === "error") {
					bo = ""
				}
				bq = br || bo || "";
				return bi(new Error(bq), null)
			})
		};
		aw = function(bi) {
			var bj;
			return bj = function() {
				var bl, bk, bo, bm, bn, bq = this;
				bm = arguments[0], bl = 3 <= arguments.length ? n.call(arguments, 1, bn = arguments.length - 1) : (bn = 1, []), bk = arguments[bn++];
				bm.apply(null, n.call(bl).concat([function() {
						bp((bo = arguments[0], bl = 2 <= arguments.length ? n.call(arguments, 1) : [], bo))
					}]));
				function bp(br) {
					if (br) {
						return bi(bo)
					} else {
						return bk.apply(null, bl)
					}
				}}
		};
		P = (function() {
			var bj;
			function bi() {
				this.push_cbs = [];
				this.args = [];
				this.shift_cbs = []
			}
			bi.prototype.push = function() {
				var bl, bk, bn, bm;
				bl = 2 <= arguments.length ? n.call(arguments, 0, bm = arguments.length - 1) : (bm = 0, []), bk = arguments[bm++];
				if (bn = this.shift_cbs.shift()) {
					return this.process(bl, bn, bk)
				} else {
					this.push_cbs.push(bk);
					return this.args.push(bl)
				}
			};
			bi.prototype.unshift = function() {
				var bl, bk, bn, bm;
				bl = 2 <= arguments.length ? n.call(arguments, 0, bm = arguments.length - 1) : (bm = 0, []), bk = arguments[bm++];
				if (bn = this.shift_cbs.shift()) {
					return this.process(bl, bn, bk)
				} else {
					this.push_cbs.unshift(bk);
					return this.args.unshift(bl)
				}
			};
			bi.prototype.shift = function(bm) {
				var bl, bk;
				if (bk = this.push_cbs.shift()) {
					bl = this.args.shift();
					return this.process(bl, bm, bk)
				} else {
					return this.shift_cbs.push(bm)
				}
			};
			bj = 0;
			bi.prototype.process = function(bm, bn, bk) {
				var bo = this;
				if (++bj === 100) {
					bj = 0;
					bg(0, function() {
						bl()
					})
				} else {
					bl()
				}
				function bl() {
					bk();
					return bn.apply(null, bm)
				}}
			;
			return bi
		})();
		p = {};
		d = function() {
			var bj, bi, bk, bm, bl;
			bm = arguments[0], bj = 3 <= arguments.length ? n.call(arguments, 1, bl = arguments.length - 1) : (bl = 1, []), bi = arguments[bl++];
			if (bk = p[bm]) {
				return bk.channel.push(bj, bi)
			}
		};
		aP = function() {
			var bj, bi, bk, bm, bl;
			bm = arguments[0], bj = 3 <= arguments.length ? n.call(arguments, 1, bl = arguments.length - 1) : (bl = 1, []), bi = arguments[bl++];
			if (bk = p[bm]) {
				return bk.channel.unshift(bj, bi)
			}
		};
		ad = function(bk, bj) {
			var bi;
			if (bi = p[bk]) {
				return bi.actions.push(bj)
			} else {
				bi = p[bk] = {actions: [bj], channel: new P(), running: false};
				return(function() {
					var bl, bo = this;
					function bn() {
						if (true) {
							bi.channel.shift(function() {
								var bt, bp, bs;
								bl = arguments[0];
								bs = bi.actions;
								bt = 0, bp = bs.length;
								function bq() {
									bt++;
									bu()
								}
								function bu() {
									if (bt < bp) {
										bj = bs[bt];
										bj.apply(null, n.call(bl).concat([function(bv) {
												bq(bv)
											}]))
									} else {
										br()
									}
								}
								bu();
								function br() {
									bn(bo)
								}}
							)
						} else {
							bm()
						}
					}
					bn();
					function bm() {
						return bo
					}}
				)()
			}
		};
		I = function() {
			var bi, bo, bm, bj, bl, bn;
			bi = 3 <= arguments.length ? n.call(arguments, 0, bn = arguments.length - 2) : (bn = 0, []), bm = arguments[bn++], bo = arguments[bn++];
			bl = 2000;
			bj = aw(function(bp) {
				var bq = this;
				d("loop_until_success:error", bp, bl, function() {
					bg(bl, function() {
						bl += 2000;
						if (bl > 20000) {
							bl = 20000
						}
						return bk()
					})
				})
			});
			function bk() {
				var bp = this;
				bm(bj, function() {
					return bo()
				})
			}
			return bk()
		};
		an = aO;
		aY = a1;
		R = R;
		w = w;
		bg = bg;
		aV = aV;
		aO = aO;
		aS = aS;
		F = F;
		z = z;
		aj = aj;
		h = h;
		a1 = a1;
		aw = aw;
		P = P;
		an = an;
		aY = aY;
		d = d;
		aP = aP;
		ad = ad;
		I = I;
		return aO = function() {
			var bj, bn, bl, bk, bm, bi;
			if (arguments.length === 1) {
				aO("", arguments[0])
			} else {
				bm = arguments[0], bl = arguments[1];
				if (bi = typeof window !== "undefined" && window !== null ? window : global) {
					for (bk in bl) {
						if (!aH.call(bl, bk)) {
							continue
						}
						bn = bl[bk];
						bi[bm + bk] = bn
					}
				}
				if (bj = typeof module !== "undefined" && module !== null ? module.exports : void 0) {
					for (bk in bl) {
						if (!aH.call(bl, bk)) {
							continue
						}
						bn = bl[bk];
						bj[bk.replace(/^_/, "")] = bn
					}
				}
			}
			return this
		}
	})();
	M = K = i = null;
	at = aC = l = aE = x = E = v = aA = a2 = aI = aJ = aW = aD = a = O = s = c = ax = null;
	(function() {
		var p, bH, bF, bJ, bo, bA, bQ, by, bK, bC, bM;
		bK = h(3), bF = bK[0], p = bK[1], bH = bK[2];
		M = bF;
		K = p;
		i = bH;
		function bO(bS) {
			var bW, bX, bU, bV, bT;
			if (bS == null) {
				bS = []
			}
			bX = {};
			bU = [];
			bX[bF] = [];
			for (bV = 0, bT = bS.length; bV < bT; bV++) {
				bW = bS[bV];
				bX[bF][bW] = []
			}
			bX[p] = [];
			bX[bH] = [];
			return bX
		}
		function bz(bU, bS) {
			var bV, bT;
			bT = bU[bF];
			bV = bT.length;
			bT[bV] = [];
			return[bV, bT[bV]]
		}
		function bq(bU, bS, bV) {
			var bT;
			((bT = bU[p])[bS] != null ? (bT = bU[p])[bS] : bT[bS] = []).push(bV);
			return bV
		}
		function bp(bT, bS, bU) {
			bq(bT, bS, bU);
			bT[bH][bU](0);
			return bU
		}
		bM = bI(bo = function(bT, bV, bU, bS) {
			return bT[bF][bU][bV] = bS
		});
		bA = bI(function(bT, bV, bU, bS) {
			return bT[bF][bU].push(bV)
		});
		by = bI(bJ = function(bT, bV, bU, bS) {
			return bT[bF][bU].splice(bV, 0, bS)
		});
		bQ = bI(function(bT, bV, bU, bS) {
			return bT[bF][bU].splice(bV, 1)
		});
		function bL(bW, bX, bV) {
			var bU, bT, bS;
			bS = (function() {
				var bY;
				bY = [];
				for (bU in bV) {
					if (!aH.call(bV, bU)) {
						continue
					}
					bT = bV[bU];
					bY.push([bU, bT])
				}
				return bY
			})();
			return by(bW, bX, bS)
		}
		function bh(bW, bX, bV) {
			var bU, bT, bS;
			bS = (function() {
				var bY;
				bY = [];
				for (bU in bV) {
					if (!aH.call(bV, bU)) {
						continue
					}
					bT = bV[bU];
					bY.push([bU, bT])
				}
				return bY
			})();
			return bM(bW, bX, bS)
		}
		function bI(bT) {
			var bS;
			return bS = function() {
				var b1, bW, bZ, bV, bX, bY, bU, b0;
				if (!arguments[2].length) {
					bZ = arguments[0], b0 = arguments[1], b1 = arguments[2], bY = arguments[3], bV = arguments[4];
					bU = [[b1, bY]]
				} else {
					bZ = arguments[0], b0 = arguments[1], bU = arguments[2], bV = arguments[3]
				}
				bW = (function() {
					var b5, b4, b2, b3;
					b3 = [];
					for (b5 = 0, b4 = bU.length; b5 < b4; b5++) {
						b2 = bU[b5], b1 = b2[0], bY = b2[1];
						bT(bZ, b0, b1, bY);
						b3.push(b1)
					}
					return b3
				})();
				bX = {};
				if (bV == null) {
					bV = true
				}
				if (bV) {
					for (b1 in bW) {
						if (!bX[b1] && bV && bZ[p][b1] && b0 >= 0) {
							bw(bZ, bZ[p][b1], b0)
						}
						bX[b1] = true;
						b1
					}
				}
				return bW
			}
		}
		bC = bM;
		function bw(bW, bU, bY) {
			var bX, bT, bV, bS;
			bT = bW[bH];
			if (typeof bU === "number") {
				bT[bU].call(this, bY)
			} else {
				for (bV = 0, bS = bU.length; bV < bS; bV++) {
					bX = bU[bV];
					bw(bW, bX, bY)
				}
			}
			return this
		}
		function bP(bX, bU) {
			var bY, bV, bW, bT, bS;
			bV = bX[bF];
			if (typeof bU === "number") {
				return bV[bU]
			} else {
				bS = [];
				for (bW = 0, bT = bU.length; bW < bT; bW++) {
					bY = bU[bW];
					if (!bV[bY]) {
						bV[bY] = []
					}
					bS.push(bV[bY])
				}
				return bS
			}
		}
		function bx(bS, bW, bV) {
			var bX, bZ, b0, bT, bU, bY;
			bX = O(bS, bV);
			bT = {};
			for (b0 = bU = 0, bY = bV.length; bU < bY; b0 = ++bU) {
				bZ = bV[b0];
				bT[bV[b0]] = bX[b0][bW]
			}
			return bT
		}
		function bB(bX, bV) {
			var bY, bT, bU, bW, bS;
			bW = bX[bF];
			bU = bX[bH];
			bS = bz(bX), bY = bS[0], bT = bS[1];
			bU[bY] = function(bZ) {
				return bi(bX, bZ, function(b0) {
					return bT[b0] = bV(b0)
				})
			};
			return bY
		}
		function bi(bY, bV, bU) {
			var bT, bW, bX, bS;
			bW = bY[bF];
			for (bT = bX = bV, bS = bW[0].length; bV <= bS ? bX < bS : bX > bS; bT = bV <= bS ? ++bX : --bX) {
				bU(bT)
			}
			return null
		}
		function bN(bS, bW, bT) {
			var bX, bU, bY, b0, bZ, bV;
			b0 = bS[bF];
			bY = bS[bH];
			bV = bz(bS), bX = bV[0], bU = bV[1];
			bZ = b0[bW];
			bY[bX] = function(b9) {
				var b4, b1, b6, b5, b8, b3, b2, b7;
				b1 = bZ.length;
				b6 = bZ.slice(b9 - bT, b9);
				b5 = 0;
				for (b3 = 0, b7 = b6.length; b3 < b7; b3++) {
					b8 = b6[b3];
					b5 += b8
				}
				for (b4 = b2 = b9; b9 <= b1 ? b2 < b1 : b2 > b1; b4 = b9 <= b1 ? ++b2 : --b2) {
					b8 = bZ[b4];
					if (b6.length >= bT) {
						b5 -= b6.shift()
					}
					b5 += b8;
					b6.push(b8);
					bU[b4] = b5 / b6.length
				}
				return this
			};
			return bX
		}
		function bl(bS, bW, bT) {
			var bY, bU, bZ, b1, b0, bV, bX = this;
			b1 = bS[bF];
			bZ = bS[bH];
			bV = bz(bS), bY = bV[0], bU = bV[1];
			b0 = b1[bW];
			bZ[bY] = function(b2) {
				return bi(bS, b2, function(b4) {
					var b3, b6, b5;
					b3 = b0[b4];
					b6 = (b5 = bU[b4 - 1]) != null ? b5 : b3;
					b6 = (2 * b3 + (bT - 1) * b6) / (bT + 1);
					return bU[b4] = b6
				})
			};
			return bY
		}
		function bR(bS, bX, bT, bV) {
			var bZ, bU, b0, b2, b1, bW, bY = this;
			b2 = bS[bF];
			b0 = bS[bH];
			bW = bz(bS), bZ = bW[0], bU = bW[1];
			b1 = b2[bX];
			b0[bZ] = function(b3) {
				return bi(bS, b3, function(b5) {
					var b4, b7, b6;
					b4 = b1[b5];
					b7 = (b6 = bU[b5 - 1]) != null ? b6 : b4;
					b7 = (bV * b4 + (bT - bV) * b7) / bT;
					return bU[b5] = b7
				})
			};
			return bZ
		}
		function bs(bS, bW, bT) {
			var bY, bU, bZ, b0, bV, bX = this;
			b0 = bS[bF];
			bZ = bS[bH];
			bV = bz(bS), bY = bV[0], bU = bV[1];
			bZ[bY] = function(b1) {
				return bi(bS, b1, function(b4) {
					var b2, b3;
					b3 = Math.max(b4 - bT, 0);
					b2 = b4 + 1;
					return bU[b4] = Math.min.apply(Math, b0[bW].slice(b3, b2))
				})
			};
			return bY
		}
		function bj(bS, bW, bT) {
			var bY, bU, bZ, b0, bV, bX = this;
			b0 = bS[bF];
			bZ = bS[bH];
			bV = bz(bS), bY = bV[0], bU = bV[1];
			bZ[bY] = function(b1) {
				return bi(bS, b1, function(b4) {
					var b2, b3;
					b3 = Math.max(b4 - bT, 0);
					b2 = b4 + 1;
					return bU[b4] = Math.max.apply(Math, b0[bW].slice(b3, b2))
				})
			};
			return bY
		}
		function bD(b6, b3, b2, b8, b7) {
			var b1, bX, ca, cf, cb, bY, b5, ce, b0, b4, bZ, cc, bW, bV, bU, bT, bS, b9 = this;
			if (b2 == null) {
				b2 = 12
			}
			if (b8 == null) {
				b8 = 26
			}
			if (b7 == null) {
				b7 = 9
			}
			cc = b6[bF];
			b0 = b6[bH];
			function cd(cg) {
				return[cg, cc[cg]]
			}
			bW = cd(bl(b6, b3, b2)), bX = bW[0], bZ = bW[1];
			bV = cd(bl(b6, b3, b8)), b1 = bV[0], b4 = bV[1];
			bU = cd(bB(b6, function(cg) {
				return bZ[cg] - b4[cg]
			})), cf = bU[0], ce = bU[1];
			bT = cd(bl(b6, cf, b7)), ca = bT[0], b5 = bT[1];
			bS = bz(b6), cb = bS[0], bY = bS[1];
			b0[cb] = function(cg) {
				bw(b6, [bX, b1, cf, ca], cg);
				return bi(b6, cg, function(ch) {
					return bY[ch] = 2 * (ce[ch] - b5[ch])
				})
			};
			b0[cb](0);
			bq(b6, b3, cb);
			return[cf, ca, cb]
		}
		function bv(cr, cl, cs, ct, cE, cA) {
			var b6, cy, b4, cb, b8, cz, bY, ch, cD, cw, bS, cu, cC, ci, cq, cj, co, bT, cm, bX, cG, bU, cf, cv, ck, cg, cp, ce, cn, cc, cK, bW, cd, ca, cL, cJ, cI, cH, cF, cB, b9, b7, b5, b3, b2, b1, b0, bZ, bV = this;
			if (cs == null) {
				cs = 14
			}
			if (ct == null) {
				ct = 14
			}
			if (cE == null) {
				cE = 3
			}
			if (cA == null) {
				cA = 3
			}
			cd = cr[bF];
			bU = cr[bH];
			cK = [];
			function cx(cM) {
				cK.push(cM);
				return[cM, cd[cM]]
			}
			cm = cd[cl];
			ca = cx(bB(cr, function(cN) {
				var cM;
				return(cM = cm[cN - 1]) != null ? cM : cm[cN]
			})), ch = ca[0], ck = ca[1];
			b9 = cx(bB(cr, function(cM) {
				return Math.max(cm[cM] - ck[cM], 0)
			})), b6 = b9[0], cq = b9[1];
			b7 = cx(bB(cr, function(cM) {
				return Math.abs(cm[cM] - ck[cM])
			})), b4 = b7[0], co = b7[1];
			b5 = cx(bR(cr, b6, cs, 1)), cy = b5[0], cj = b5[1];
			b3 = cx(bR(cr, b4, cs, 1)), cb = b3[0], bT = b3[1];
			b2 = cx(bB(cr, function(cM) {
				if (bT[cM] === 0) {
					return 100
				} else {
					return cj[cM] / bT[cM] * 100
				}
			})), ci = b2[0], bW = b2[1];
			b1 = cx(bs(cr, ci, ct)), cD = b1[0], cg = b1[1];
			b0 = cx(bj(cr, ci, ct)), cz = b0[0], cf = b0[1];
			bZ = cx(bB(cr, function(cM) {
				return bW[cM] - cg[cM]
			})), bS = bZ[0], ce = bZ[1];
			cL = cx(bB(cr, function(cM) {
				return cf[cM] - cg[cM]
			})), cC = cL[0], cc = cL[1];
			cJ = cx(bN(cr, bS, cE)), cw = cJ[0], cp = cJ[1];
			cI = cx(bN(cr, cC, cE)), cu = cI[0], cn = cI[1];
			cH = cx(bB(cr, function(cM) {
				if (cn[cM] === 0) {
					return 100
				} else {
					return cp[cM] / cn[cM] * 100
				}
			})), bY = cH[0], cv = cH[1];
			cF = cx(bN(cr, bY, cA)), b8 = cF[0], cG = cF[1];
			cB = bz(cr), ci = cB[0], bX = cB[1];
			bU[ci] = function(cM) {
				return bw(cr, cK, cM)
			};
			bU[ci](0);
			bq(cr, cl, ci);
			return[bY, b8]
		}
		function bt(ci, cc, cj, cq, cp) {
			var co, b3, b8, bW, bY, bX, b7, b9, cd, ce, ch, cr, bT, bV, cf, cm, cl, ck, cg, cb, cs, bS, ca, b6, b5, b4, b2, b1, b0, bZ, bU = this;
			bW = cc[0], cd = cc[1], co = cc[2];
			if (cj == null) {
				cj = 9
			}
			if (cq == null) {
				cq = 3
			}
			if (cp == null) {
				cp = 3
			}
			ca = ci[bF];
			bT = ci[bH];
			cs = [];
			function cn(ct) {
				cs.push(ct);
				return[ct, ca[ct]]
			}
			cb = ca[cd];
			ch = ca[co];
			cf = ca[bW];
			b6 = cn(bs(ci, cd, cj)), b9 = b6[0], cg = b6[1];
			b5 = cn(bj(ci, bW, cj)), b8 = b5[0], bV = b5[1];
			b4 = cn(bB(ci, function(ct) {
				if (bV[ct] - cg[ct] < 1e-8) {
					return 100
				} else {
					return(ch[ct] - cg[ct]) / (bV[ct] - cg[ct]) * 100
				}
			})), ce = b4[0], bS = b4[1];
			b2 = cn(bR(ci, ce, cq, 1)), bX = b2[0], cl = b2[1];
			b1 = cn(bR(ci, bX, cp, 1)), b3 = b1[0], cr = b1[1];
			b0 = cn(bB(ci, function(ct) {
				return 3 * cl[ct] - 2 * cr[ct]
			})), bY = b0[0], cm = b0[1];
			bZ = bz(ci), b7 = bZ[0], ck = bZ[1];
			bT[b7] = function(ct) {
				return bw(ci, cs, ct)
			};
			bT[b7](0);
			bq(ci, bW, b7);
			bq(ci, cd, b7);
			bq(ci, co, b7);
			return[bX, b3, bY]
		}
		function bk(bT, bS, bU) {
			return bp(bT, bS, bN.apply(null, arguments))
		}
		function bm(bT, bS, bU) {
			return bp(bT, bS, bl.apply(null, arguments))
		}
		function bG(bW, bV) {
			var bX, bT, bU, bS;
			bU = bW[bF];
			bS = bz(bW), bX = bS[0], bT = bS[1];
			bU[bX] = bV;
			return bX
		}
		function bn() {
			var bS, bV, bX, bW, bZ, bY, bU, bT;
			bX = arguments[0], bW = 3 <= arguments.length ? n.call(arguments, 1, bZ = arguments.length - 1) : (bZ = 1, []), bV = arguments[bZ++];
			bT = [];
			for (bY = 0, bU = bV.length; bY < bU; bY++) {
				bS = bV[bY];
				if (typeof bS === "object" && bS.length) {
					bT.push(bX.apply(null, n.call(bW).concat(n.call(bS))))
				} else {
					bT.push(bX.apply(null, n.call(bW).concat([bS])))
				}
			}
			return bT
		}
		function bE() {
			return bn.apply(null, [bP].concat(n.call(arguments)))
		}
		function bu(bU, bW, bS, bT) {
			var bV;
			bV = bP(bU, bT);
			return bV.slice(bW, +bS + 1 || 9000000000)
		}
		function br() {
			o[DEFER_REFRESH] = true;
			return o[DEFER_REFRESH] = false
		}
		at = bO;
		aC = bM;
		l = bQ;
		aE = by;
		x = bL;
		E = bh;
		v = bG;
		aA = bm;
		a2 = bk;
		aI = bD;
		aJ = bv;
		aW = bt;
		aD = bx;
		a = bC;
		O = bP;
		s = bn;
		c = bE;
		return ax = bu
	})();
	aM = aR = a6 = aN = N = a3 = W = V = S = null;
	bf = az = aQ = aB = null;
	(function() {
		var bv, br, bw, bh, bn, p, bl, bs, bi;
		bs = h(4), bw = bs[0], bv = bs[1], bh = bs[2], br = bs[3];
		bi = [0, 1, 2], bn = bi[0], bl = bi[1], p = bi[2];
		function by(bA, bz) {
			return bA[0] - bz[0]
		}
		function bp(bz) {
			var bA;
			bA = {group: bz};
			bj(bA);
			return bA
		}
		function bj(bz) {
			bz[bv] = new aK({compare: by});
			bz[bw] = new aK({compare: by});
			bz[br] = new aK({compare: by});
			bz[bh] = new aK({compare: by});
			return bz
		}
		function bt(bD, bA, bC) {
			var bz, bB;
			bD[bA].insert(bC);
			if (!bC[bl]) {
				return
			}
			bC = [parseInt(bC[bn] / bD.group) * bD.group, bC[bl]];
			bB = bA === bw ? bh : br;
			if (bz = bD[bB].find(bC)) {
				return bz[bl] += bC[bl]
			} else {
				bz = bC;
				return bD[bB].insert(bz)
			}
		}
		function bk(bD, bA, bC) {
			var bz, bB;
			if (!bC) {
				return
			}
			bD[bA]["delete"](bC);
			if (!bC[bl]) {
				return
			}
			bC = [parseInt(bC[bn] / bD.group) * bD.group, bC[bl]];
			bB = bA === bw ? bh : br;
			bz = bD[bB].find(bC);
			bz[bl] -= bC[bl];
			if (bz[bl] < 1e-12) {
				return bD[bB]["delete"](bz)
			}
		}
		function bq(bA, bE) {
			var bC, bz, bK, bJ, bH, bG, bD, bL, bI, bB, bF;
			bB = bE.type_str, bD = bE.price_int, bL = bE.total_volume_int, bz = bE.now;
			if (bB === "bid") {
				bI = bw
			} else {
				bI = bv
			}
			bH = bA[bI];
			bF = parseInt(bL);
			bG = parseInt(bD);
			bK = [bG, bF, bz];
			bJ = bH.find([bG]);
			bk(bA, bI, bJ);
			if (bF) {
				bt(bA, bI, bK)
			}
			if (bI === bw) {
				while ((bC = bA[bv].get(0)) && bC[bn] <= bG) {
					bk(bA, bv, bC)
				}
			} else {
				while ((bC = bA[bw].get(-1)) && bC[bn] >= bG) {
					bk(bA, bw, bC)
				}
			}
			return bA
		}
		function bo(bz, bC) {
			var bD, bB, bI, bH, bF, bE, bG, bA;
			bE = bC[0], bD = bC[1], bA = bC[2];
			if (bA === "bid") {
				bG = bw
			} else {
				bG = bv
			}
			bF = bz[bG];
			bI = [bE, bD];
			bH = bF.find([bE]);
			bk(bz, bG, bH);
			if (bD) {
				bt(bz, bG, bI)
			}
			if (bG === bw) {
				while ((bB = bz[bv].get(0)) && bB[bn] <= bE) {
					bk(bz, bv, bB)
				}
			} else {
				while ((bB = bz[bw].get(-1)) && bB[bn] >= bE) {
					bk(bz, bw, bB)
				}
			}
			return bz
		}
		function bm(bD, bC) {
			var bB, bA, bz;
			bB = 0;
			while ((bz = bD[bv].get(0)) && bz[bn] < bC) {
				++bB;
				bk(bD, bv, bz)
			}
			bA = 0;
			while ((bz = bD[bw].get(-1)) && bz[bn] > bC) {
				++bA;
				bk(bD, bw, bz)
			}
			return[bB, bA]
		}
		function bu(bz, bF, bC, bI) {
			var bG, bA, bD, bB, bE, bH;
			bG = 0;
			bA = 0;
			bE = 0;
			bH = 0;
			bD = 0;
			while ((bB = bz[bv].at(bD)) && bB[bn] <= bC) {
				if (bB[p] >= bI) {
					++bD;
					++bE
				} else {
					++bG;
					bk(bz, bv, bB)
				}
			}
			bD = -1;
			while ((bB = bz[bw].at(bD)) && bB[bn] >= bF) {
				if (bB[p] >= bI) {
					--bD;
					++bH
				} else {
					++bA;
					bk(bz, bw, bB)
				}
			}
			return[bG, bA, bE, bH]
		}
		function bx(bD) {
			var bC, bB, bA, bz;
			bC = bD[bv];
			bA = bD[bw];
			bB = bC.slice(-11, -1);
			return bz = bA.slice(0, 10)
		}
		aM = bp;
		aR = bq;
		a6 = bo;
		aN = bx;
		N = bt;
		a3 = bk;
		W = bm;
		V = bu;
		S = bj;
		bf = bv;
		az = bw;
		aQ = br;
		return aB = bh
	})();
	ak = g = ai = D = j = f = aU = null;
	ag = a4 = null;
	Y = be = bb = af = U = null;
	(function() {
		function bo(bx, bC, bB, bE, bD, bw) {
			var bz, by, bA;
			bA = ah(bC, bE, bD), bz = bA[0], by = bA[1];
			if (by > bB) {
				return bj(bx, bz, bB, bw, by - bB)
			} else {
				return bj(bx, bz, by, bw, bB - by)
			}
		}
		function bm(bx, bC, bE, bz, bA, bw) {
			var by, bD, bB;
			by = a0(bC, bE);
			bD = aX(bC, bz);
			bB = aX(bC, bA);
			return bj(bx, by, bB, bw, bD - bB)
		}
		function bj(bz, bx, bA, by, bw) {
			if (bw < 0) {
				bA += bw;
				bw = -bw
			}
			if (bw === 0) {
				bw = 1
			}
			if (bz.fillStyle === bz.strokeStyle) {
				return bz.fillRect(bx, bA, by, bw)
			} else {
				if (bw > 1) {
					bz.fillRect(bx, bA, by, bw);
					return bz.strokeRect(bx + 0.5, bA + 0.5, by - 1, bw - 1)
				} else {
					if (bw === 1) {
						bz.beginPath();
						bz.moveTo(bx, bA + 0.5);
						bz.lineTo(bx + by, bA + 0.5);
						return bz.stroke()
					}
				}
			}
		}
		function bp(bx, bC, bE, bw) {
			var bz, by, bG, bF, bA, bD, bB;
			bx.beginPath();
			for (bG = bA = 0, bD = bE.length; bA < bD; bG = ++bA) {
				bF = bE[bG];
				bB = ah(bC, bG, bF), bz = bB[0], by = bB[1];
				if (bw) {
					bz += bw
				}
				if (bG) {
					bx.lineTo(bz, by)
				} else {
					bx.moveTo(bz, by)
				}
			}
			return bx.stroke()
		}
		function bs(bx, bC, bE, bz, bA, bw) {
			var by, bD, bB;
			by = a0(bC, bE);
			bD = aX(bC, bz);
			bB = aX(bC, bA);
			if (bw) {
				by += bw
			}
			bx.beginPath();
			bx.moveTo(by + 0.5, bB);
			bx.lineTo(by + 0.5, bD);
			return bx.stroke()
		}
		function bi(by, bz, bx, bw) {
			by.beginPath();
			by.moveTo(bx, bz);
			by.lineTo(bw, bz);
			return by.stroke()
		}
		function bl(bz, bw, bx, by) {
			bz.beginPath();
			bz.moveTo(bw, bx);
			bz.lineTo(bw, by);
			return bz.stroke()
		}
		ak = bp;
		g = bo;
		ai = bm;
		D = bj;
		j = bi;
		f = bs;
		aU = bl;
		function bn(bx, bD, bC) {
			var bB, bz, by, bw, bF, bG, bA, bE;
			bB = F(bD[e]);
			bw = F(bD[a5]);
			bD = ap(bB, bw);
			bG = bC(bB, bw);
			for (bA = 0, bE = bG.length; bA < bE; bA++) {
				bF = bG[bA];
				by = aX(bD, bF);
				bz = bB.w;
				bx.fillText(bF, bz - 8, by + 0.5);
				bi(bx, by + 0.5, bB.w - 4, bB.w)
			}
			return null
		}
		function bv(bx, bw) {
			return bn(bx, bw, function(bC, by) {
				var bB, bD, bE, bF, bG, bA, bz;
				bD = Math.floor(bC.h / 32);
				bG = by.h / bD;
				bF = by.y;
				bz = [];
				for (bB = bA = 0; 0 <= bD ? bA <= bD : bA >= bD; bB = 0 <= bD ? ++bA : --bA) {
					bE = bF + bB * bG;
					bz.push(parseFloat(bE.toPrecision(5)))
				}
				return bz
			})
		}
		function p(bx, bw) {
			bn(bx, bw, function(bD, by) {
				var bB, bz, bE, bF, bC, bA, bG, bI, bH;
				bE = Math.abs(bD.h / 32);
				bA = by.h / bE;
				bH = (function() {
					var bM, bK, bL, bJ;
					bL = [1, 2, 5];
					bJ = [];
					for (bM = 0, bK = bL.length; bM < bK; bM++) {
						bB = bL[bM];
						bz = bA / bB;
						bI = Math.ceil(Math.log(bz) / Math.log(10)).toFixed(2);
						bI = Math.pow(10, bI);
						bI = bB * bI;
						bJ.push(bI)
					}
					return bJ
				})();
				bG = Math.min.apply(Math, bH);
				bF = Math.ceil(by.y / bG) * bG;
				bC = [];
				while (bF < by.y + by.h) {
					bC.push(parseFloat(bF.toPrecision(5)));
					bF += bG
				}
				return bC
			});
			return null
		}
		ag = bv;
		a4 = p;
		function br(bx, bE, bD, bz) {
			var bC, bA, by, bw, bG, bH, bB, bF;
			bC = F(bE[e]);
			bw = F(bE[a5]);
			bE = ap(bC, bw, bE[u]);
			bH = bz(bC, bw);
			bx.textAlign = "center";
			for (bB = 0, bF = bH.length; bB < bF; bB++) {
				bG = bH[bB];
				by = aX(bE, bG);
				bA = bC.x;
				if (!bD || bD === "text") {
					bx.fillText(bG, bA + 50, by + 0.5)
				}
				if (!bD || bD === "hr") {
					bi(bx, by + 0.5, bA, bA + 6);
					bi(bx, by + 0.5, bA + bC.w - 6, bA + bC.w)
				}
			}
			bx.textAlign = "left";
			return null
		}
		function bk(bx, bw) {
			return br(bx, bw, null, function(bC, by) {
				var bB, bD, bE, bF, bG, bA, bz;
				bD = Math.floor(bC.h / 32);
				bG = by.h / bD;
				bF = by.y;
				bz = [];
				for (bB = bA = 0; 0 <= bD ? bA <= bD : bA >= bD; bB = 0 <= bD ? ++bA : --bA) {
					bE = bF + bB * bG;
					bz.push(parseFloat(bE.toPrecision(5)))
				}
				return bz
			})
		}
		function bh(bx, bw, by) {
			return br(bx, bw, null, function(bz, bA) {
				return by
			})
		}
		function bt(by, bw, bx) {
			br(by, bw, bx, function(bE, bz) {
				var bC, bA, bF, bG, bD, bB, bH, bJ, bI;
				bF = Math.abs(bE.h / 32);
				bB = bz.h / bF;
				bI = (function() {
					var bN, bL, bM, bK;
					bM = [1, 2, 5];
					bK = [];
					for (bN = 0, bL = bM.length; bN < bL; bN++) {
						bC = bM[bN];
						bA = bB / bC;
						bJ = Math.ceil(Math.log(bA) / Math.log(10)).toFixed(2);
						bJ = Math.pow(10, bJ);
						bJ = bC * bJ;
						bK.push(bJ)
					}
					return bK
				})();
				bH = Math.min.apply(Math, bI);
				bG = Math.ceil(bz.y / bH) * bH;
				bD = [];
				while (bG < bz.y + bz.h) {
					bD.push(parseFloat(bG.toPrecision(5)));
					bG += bH
				}
				return bD
			});
			return null
		}
		function bu(by, bw) {
			var bx;
			by.save();
			by.beginPath();
			bx = F(bw[e]);
			bx.y += 8;
			bx.h -= 16;
			by.moveTo(bx.x, bx.y);
			by.lineTo(bx.x + bx.w, bx.y);
			by.lineTo(bx.x + bx.w, bx.y + bx.h);
			by.lineTo(bx.x, bx.y + bx.h);
			return by.clip()
		}
		function bq(by, bw, bx) {
			bu(by, bw);
			bx();
			return by.restore()
		}
		Y = bk;
		be = bt;
		bb = bu;
		af = bq;
		return U = bh
	})();
	aK = null;
	(function() {
		var p;
		p = (function() {
			var bj, bi, bm, bl, bk;
			bj = 8;
			bi = bj << 1;
			bm = 0;
			bl = 1;
			bk = 0;
			function bh(bn) {
				this.options = bn != null ? bn : {};
				this.id = ++bk;
				this.min = 0;
				this.max = 0;
				this.count = 0;
				this.type = bl;
				this.total = 0;
				this.parent = null;
				this.children = [];
				this.next = null;
				this.prev = null;
				this.compare = this.options.compare;
				this.multimap = this.options.multimap;
				if (this.compare == null) {
					this.compare = function(bp, bo) {
						return bp - bo
					}
				}
			}
			bh.prototype.insert_value_ = function(bt) {
				var bo, br, bn, bq, bp, bu, bs;
				br = this.count;
				bo = this.children;
				for (bn = bs = 0; 0 <= br ? bs < br : bs > br; bn = 0 <= br ? ++bs : --bs) {
					bu = bo[bn];
					bp = this.compare(bu, bt);
					if (bp === 0) {
						if (this.multimap) {
							break
						}
						return
					} else {
						if (bp > 0) {
							break
						}
					}
				}
				if (bn === 0) {
					this.min = bt;
					bq = this;
					while ((bq = bq.parent) && this.compare(bq.min, bt) > 0) {
						bq.min = bt
					}
				}
				if (bn === br) {
					this.max = bt;
					bq = this;
					while ((bq = bq.parent) && this.compare(bq.max, bt) < 0) {
						bq.max = bt
					}
				}
				this.children.splice(bn, 0, bt);
				this.count += 1;
				bq = this;
				while (bq) {
					bq.total += 1;
					bq = bq.parent
				}
				this.rebuild_();
				return this
			};
			bh.prototype.insert_node_ = function(bo, bq) {
				var bp, bn, br;
				bp = this.count;
				for (bn = br = 0; 0 <= bp ? br < bp : br > bp; bn = 0 <= bp ? ++br : --br) {
					if (this.children[bn].min === bo) {
						break
					}
				}
				bq.parent = this;
				this.count += 1;
				this.children.splice(bn + 1, 0, bq);
				return this.rebuild_()
			};
			bh.prototype.find_node_ = function(bs) {
				var bo, bq, bn, bp, br;
				bp = this;
				while (bp.type === bm) {
					bo = bp.children;
					bq = bp.count;
					if (this.compare(bs, bo[0].min) <= 0) {
						bn = 0
					} else {
						if (this.compare(bs, bo[bq - 1].max) >= 0) {
							bn = bq - 1
						} else {
							for (bn = br = 0; 0 <= bq ? br < bq : br > bq; bn = 0 <= bq ? ++br : --br) {
								if (this.compare(bo[bn].max, bs) >= 0) {
									break
								}
							}
						}
					}
					bp = bo[bn]
				}
				return bp
			};
			bh.prototype.has = function(bo) {
				var bn;
				bn = this.find_node_(bo);
				return bn.children.indexOf(bo) !== -1
			};
			bh.prototype.replace_value = function(bt) {
				var bq, bn, br, bp, bs, bo;
				br = this.find_node_(bt);
				bq = br.children;
				for (bn = bs = 0, bo = bq.length; bs < bo; bn = ++bs) {
					bp = bq[bn];
					if (this.compare(bp, bt) === 0) {
						bq[bn] = bt
					}
				}
				return this
			};
			bh.prototype.get_node_ = function(bo) {
				var bs, bp, bq, br, bn;
				bq = this;
				if (bo >= this.total) {
					return[null, null]
				}
				if (bo < 0) {
					return[null, null]
				}
				while (bq.type === bm) {
					bp = bq.children;
					for (br = 0, bn = bp.length; br < bn; br++) {
						bs = bp[br];
						if (bo >= bs.total) {
							bo -= bs.total
						} else {
							bq = bs;
							break
						}
					}
				}
				return[bq, bo]
			};
			bh.prototype.set_min_ = function(bn) {
				var bp, bo;
				bo = this;
				bp = this.min;
				while (bo && this.compare(bo.min, bp) === 0) {
					bo.min = bn;
					bo = bo.parent
				}
				return this
			};
			bh.prototype.set_max_ = function(bn) {
				var bp, bo;
				bo = this;
				bp = this.max;
				while (bo && this.compare(bo.max, bp) === 0) {
					bo.max = bn;
					bo = bo.parent
				}
				return this
			};
			bh.prototype.inc_total_ = function() {
				var bn;
				bn = this;
				while (bn) {
					bn.total += 1;
					bn = bn.parent
				}
				return this
			};
			bh.prototype.dec_total_ = function() {
				var bn;
				bn = this;
				while (bn) {
					bn.total -= 1;
					bn = bn.parent
				}
				return this
			};
			bh.prototype.clean_node_ = function() {
				var bo, bn;
				if (this.parent) {
					this.parent.delete_node_(this);
					if (this.type === bl) {
						if ((bo = this.prev) != null) {
							bo.next = this.next
						}
						return(bn = this.next) != null ? bn.prev = this.prev : void 0
					}
				} else {
					return this.type = bl
				}
			};
			bh.prototype.delete_node_ = function(bn) {
				var bo;
				bo = this.children.indexOf(bn);
				this.children.splice(bo, 1);
				this.count -= 1;
				if (this.count === 0) {
					return this.clean_node_()
				} else {
					if (bo === 0) {
						this.set_min_(this.children[0].min)
					}
					if (bo === this.count) {
						return this.set_max_(this.children[this.count - 1].max)
					}
				}
			};
			bh.prototype.delete_value_ = function(bo) {
				var bn, bp;
				bn = this.children;
				bp = this.indexOf_(bo);
				if (bp !== -1) {
					bn.splice(bp, 1);
					this.count -= 1;
					this.dec_total_();
					if (this.count === 0) {
						this.clean_node_()
					} else {
						if (bp === 0) {
							this.set_min_(bn[0])
						}
						if (bp === this.count) {
							this.set_max_(bn[this.count - 1])
						}
					}
				}
				return this
			};
			bh.prototype.rebuild_ = function() {
				var bp, bo, bn;
				if (this.count < bi) {
					return
				}
				if (this.parent != null) {
					bo = this.slice_(bj, bi - 1);
					bo.parent = this.parent;
					this.count = bj;
					this.total = this.total - bo.total;
					this.children.splice(bj, bj);
					if (this.type === bl) {
						this.max = this.children[bj - 1]
					} else {
						this.max = this.children[bj - 1].max
					}
					this.parent.insert_node_(this.min, bo);
					if (this.type === bl) {
						if (this.next) {
							this.next.prev = bo
						}
						bo.next = this.next;
						this.next = bo
					}
				} else {
					bp = this.slice_(0, bj - 1);
					bn = this.slice_(bj, bi - 1);
					bp.parent = this;
					bn.parent = this;
					bp.next = bn;
					bn.prev = bp;
					this.count = 2;
					this.children = [bp, bn];
					this.type = bm
				}
				return this
			};
			bh.prototype.slice_ = function(bp, bw) {
				var bn, bo, bt, bq, bu, br, bv, bs;
				bt = bw - bp + 1;
				bq = new bh(this.options);
				bq.count = bt;
				bq.type = this.type;
				bo = this.children;
				if (this.type === bl) {
					bq.min = bo[bp];
					bq.max = bo[bw];
					bq.children = bo.slice(bp, +bw + 1 || 9000000000);
					bq.total = bt
				} else {
					bq.min = bo[bp].min;
					bq.max = bo[bw].max;
					bq.children = bo.slice(bp, +bw + 1 || 9000000000);
					bu = 0;
					bs = bq.children;
					for (br = 0, bv = bs.length; br < bv; br++) {
						bn = bs[br];
						bn.parent = bq;
						bu += bn.total
					}
					bq.total = bu
				}
				return bq
			};
			bh.prototype.atom = function() {
				var bn;
				bn = this;
				while (bn.type === bm) {
					bn = bn.children[0]
				}
				return bn
			};
			bh.prototype.indexOf_ = function(bt) {
				var bn, bq, bp, bs, bo, br;
				br = this.children;
				for (bn = bs = 0, bo = br.length; bs < bo; bn = ++bs) {
					bp = br[bn];
					bq = this.compare(bp, bt);
					if (bq === 0) {
						return bn
					}
					if (bq > 0) {
						return -1
					}
				}
				return -1
			};
			bh.prototype.insert = function(bo) {
				var bn;
				bn = this.find_node_(bo);
				bn.insert_value_(bo);
				return this
			};
			bh.prototype["delete"] = function(bo) {
				var bn;
				bn = this.find_node_(bo);
				return bn.delete_value_(bo)
			};
			bh.prototype.replace = function(bn) {
				this["delete"](bn);
				return this.insert(bn)
			};
			bh.prototype.get = function(bn) {
				var bo, bq, bp;
				if (bn < 0) {
					bn += this.size()
				}
				bp = this.get_node_(bn), bo = bp[0], bq = bp[1];
				if (bo) {
					return bo.children[bq]
				} else {
					return null
				}
			};
			bh.prototype.at = function(bn) {
				var bo, bq, bp;
				if (bn < 0) {
					bn += this.size()
				}
				bp = this.get_node_(bn), bo = bp[0], bq = bp[1];
				if (bo) {
					return bo.children[bq]
				} else {
					return null
				}
			};
			bh.prototype.find = function(bn) {
				return this.find_all(bn)[0]
			};
			bh.prototype.find_all = function(bu) {
				var br, bq, bp, bo, bt, bn, bs;
				bo = [];
				br = this.find_node_(bu);
				if (this.compare(bu, br.min) < 0) {
					return[]
				}
				if (this.compare(bu, br.max) > 0) {
					return[]
				}
				bs = br.children;
				for (bt = 0, bn = bs.length; bt < bn; bt++) {
					bp = bs[bt];
					bq = this.compare(bp, bu);
					if (bq === 0) {
						bo.push(bp)
					} else {
						if (bq > 0) {
							break
						}
					}
				}
				return bo
			};
			bh.prototype.slice = function(bp, bn) {
				var bq, br, bo, bt, bs;
				if (bn == null) {
					bn = this.total - 1
				}
				if (bp < 0) {
					bp += this.total
				}
				if (bn < 0) {
					bn += this.total
				}
				if (bp < 0) {
					bp = 0
				}
				if (bn >= this.total) {
					bn = this.total - 1
				}
				bs = this.get_node_(bp), br = bs[0], bt = bs[1];
				if (!br) {
					return[]
				}
				bo = bn - bp + 1;
				bq = [];
				while (bo && br) {
					if (bt < br.count) {
						bq.push(br.children[bt++]);
						--bo
					} else {
						br = br.next;
						bt = 0
					}
				}
				return bq
			};
			bh.prototype.flatten = function() {
				var bo, br, bn, bp, bq, bs;
				bp = [];
				bq = this.atom();
				while (bq) {
					br = bq.count;
					bo = bq.children;
					for (bn = bs = 0; 0 <= br ? bs < br : bs > br; bn = 0 <= br ? ++bs : --bs) {
						bp.push(bo[bn])
					}
					bq = bq.next
				}
				return bp
			};
			bh.prototype.dump = function(bu) {
				var bp, bo, bn, bt, br, bq, bs;
				if (bu == null) {
					bu = 0
				}
				bn = process.stdout;
				for (bp = bt = 0, bs = this.count; 0 <= bs ? bt < bs : bt > bs; bp = 0 <= bs ? ++bt : --bt) {
					if (this.type === bl) {
						for (bo = br = 0; 0 <= bu ? br < bu : br > bu; bo = 0 <= bu ? ++br : --br) {
							bn.write(" ")
						}
						bn.write(this.children[bp] + " ")
					} else {
						this.children[bp].dump(bu + 1)
					}
				}
				for (bo = bq = 0; 0 <= bu ? bq < bu : bq > bu; bo = 0 <= bu ? ++bq : --bq) {
					bn.write(" ")
				}
				bn.write("min: " + this.min + " max: " + this.max + " count: " + this.count + "/" + this.total + "\n");
				return this
			};
			bh.prototype.delete_if = function(bo, bn) {
			};
			bh.prototype.size = function() {
				return this.total
			};
			return bh
		})();
		aK = p;
		if (aO != null) {
			aK = aK
		}
		return typeof module !== "undefined" && module !== null ? module.exports = aK : void 0
	})();
	av = k = b = r = am = ac = ab = L = null;
	X = null;
	G = null;
	(function() {
		var bk, bl;
		bk = "1月 2月 3月 4月 5月 6月 7月 8月 9月 10月 11月 12月".split(" ");
		bl = "周日 周一 周二 周三 周四 周五 周六".split(" ");
		G = function(bq) {
			bq = bq.toString();
			if (bq.length === 1) {
				return"0" + bq
			} else {
				return bq
			}
		};
		function p(bq) {
			var br;
			br = bq.getHours();
			return br
		}
		function bn(br) {
			var bq;
			bq = br.getMinutes();
			return"" + bq + "min"
		}
		function bm(bq) {
			return bk[bq.getMonth()]
		}
		function bp(br) {
			var bq, bs;
			bs = br.getMonth();
			bq = br.getDate();
			return"" + bk[bs] + " " + bq
		}
		function bo(bq) {
			return bq.getHours() + ":" + bq.getMinutes()
		}
		function bj(bq) {
			return G(bq.getHours()) + ":" + G(bq.getMinutes()) + ":" + G(bq.getSeconds())
		}
		function bi(br) {
			var bv, bu, bt, bs, bq;
			bv = br.getFullYear();
			bq = G(br.getMonth() + 1);
			bu = G(br.getDate());
			bt = G(br.getHours());
			bs = G(br.getMinutes());
			return"" + bv + "-" + bq + "-" + bu + " " + bt + ":" + bs
		}
		function bh(br) {
			var bv, bq, bw, bu, bt, bs, by, bx;
			bq = br.getFullYear();
			bs = br.getMonth() + 1;
			bw = br.getDate();
			bu = G(br.getHours());
			bt = G(br.getMinutes());
			by = G(br.getSeconds());
			bx = bl[br.getDay()];
			bv = bk[br.getMonth()];
			return"" + bu + ":" + bt + ":" + by + " " + bv + bw + "日 " + bx
		}
		av = p;
		k = bn;
		b = bm;
		r = bp;
		am = bi;
		ac = bh;
		ab = bo;
		L = bj;
		X = bl;
		return G = G
	})();
	aL = Z = aT = T = null;
	(function() {
		aL = Z = aT = null;
		function bj(bm, bl) {
			var bk;
			if (bm[0] && bm[0].length) {
				bm = (function() {
					var bp, bo, bn;
					bn = [];
					for (bp = 0, bo = bm.length; bp < bo; bp++) {
						bk = bm[bp];
						bn.push(bj(bk, bl))
					}
					return bn
				})();
				return bj(bm, bl)
			} else {
				return bl.apply(null, bm)
			}
		}
		function p(bk) {
			return bj(bk, Math.max)
		}
		function bh(bk) {
			return bj(bk, Math.min)
		}
		function bi(bl) {
			var bk, bm;
			bm = (function() {
				var bp, bo, bn;
				bn = [];
				for (bp = 0, bo = bl.length; bp < bo; bp++) {
					bm = bl[bp];
					bn.push((function() {
						var bs, bq, br;
						br = [];
						for (bs = 0, bq = bm.length; bs < bq; bs++) {
							bk = bm[bs];
							br.push(Math.abs(bk))
						}
						return br
					})())
				}
				return bn
			})();
			return p(bm)
		}
		aL = p;
		Z = bh;
		aT = bi;
		return T = bj
	})();
	B = J = m = null;
	aZ = aF = J = t = au = a7 = A = H = bd = ao = null;
	ay = a8 = y = null;
	(function() {
		var br, bi, bk, bv, bl, bw, bu, p, bx, bt, bh, bm, bs, bj;
		bs = h(3), br = bs[0], bu = bs[1], bt = bs[2];
		B = br;
		J = bu;
		m = bt;
		bv = (bj = [0, 1, 2, 3, 4, 5, 6, 7, 8], bh = bj[0], bl = bj[1], bu = bj[2], bx = bj[3], bi = bj[4], bw = bj[5], p = bj[6], bm = bj[7], bk = bj[8], bj);
		aZ = bh;
		aF = bl;
		J = bu;
		t = bx;
		au = bi;
		a7 = bw;
		A = p;
		H = bm;
		bd = bk;
		ao = bv;
		function bq() {
			var by, bz;
			bz = {};
			by = at(bv);
			bz[br] = by;
			bz[bt] = 0;
			return bz
		}
		function bo(bz, bG) {
			var bF, bJ, bL, bH, bK, bE, bD, bI, by, bC, bB, bA;
			bF = bz[br];
			bG = F(bG);
			bG[al] = bG[al] - bG[al] % bz[bt];
			bC = bp(bz, bG[al]), bL = bC[0], bH = bC[1];
			if (bL) {
				bK = aD(bF, bH, bv);
				if (bK[bl] > bG[q]) {
					bK[bx] = bG[a9];
					bK[bl] = bG[q]
				}
				if (bK[bu] < bG[q]) {
					bK[bi] = bG[a9];
					bK[bu] = bG[q]
				}
				if (bK[bw] < bG[a9]) {
					bK[bw] = bG[a9]
				}
				if (bK[p] > bG[a9]) {
					bK[p] = bG[a9]
				}
				bK[bm] += bG[ae];
				return E(bF, bH, bK)
			} else {
				bK = {};
				bK[bh] = bG[al];
				bB = [bl, bu];
				for (bE = 0, bI = bB.length; bE < bI; bE++) {
					bJ = bB[bE];
					bK[bJ] = bG[q]
				}
				bA = [bx, bi, bw, p];
				for (bD = 0, by = bA.length; bD < by; bD++) {
					bJ = bA[bD];
					bK[bJ] = bG[a9]
				}
				bK[bm] = bG[ae];
				bK[bk] = new Date(bK[bh] * 1000);
				return x(bF, bH, bK)
			}
		}
		function bn(bB, bI) {
			var bH, bJ, bA, bK, bM, bG, bF, bE, bL, bz, by, bD, bC;
			bA = bq();
			bH = bA[br];
			for (bK = bG = 0, bL = bI.length; bG < bL; bK = ++bG) {
				bM = bI[bK];
				bM = F(bM);
				bM[bh] = parseInt(bM[bh]);
				bD = [bx, bi, bw, p];
				for (bF = 0, bz = bD.length; bF < bz; bF++) {
					bJ = bD[bF];
					bM[bJ] = parseFloat(bM[bJ])
				}
				bC = [bh, bl, bu];
				for (bE = 0, by = bC.length; bE < by; bE++) {
					bJ = bC[bE];
					bM[bJ] = parseInt(bM[bJ])
				}
				bM[bm] = parseFloat(bM[bm]);
				bM[bk] = new Date(bM[bh] * 1000);
				x(bH, bK, bM)
			}
			bA[bt] = parseInt(bB);
			return bA
		}
		function bp(bC, bB) {
			var bz, by, bA;
			bz = bC[br];
			if (!(bA = O(bz, bh))) {
				return[false, 0]
			}
			by = bA.length;
			while (by--) {
				if (bA[by] > bB) {
					continue
				}
				if (bA[by] < bB) {
					break
				}
				return[true, by]
			}
			return[false, by + 1]
		}
		ay = bq;
		a8 = bo;
		return y = bn
	})();
	q = a9 = ae = al = aG = bc = null;
	C = ba = null;
	(function() {
		var bh, p, bi, bl, bo, bn, bm;
		bm = h(7), bo = bm[0], bi = bm[1], bh = bm[2], bl = bm[3], p = bm[4], bn = bm[5];
		q = bo;
		a9 = bi;
		ae = bh;
		al = bl;
		aG = p;
		bc = bn;
		function bk(bq) {
			var bp;
			bp = {};
			bp[bo] = parseInt(bq.tid);
			bp[bi] = parseFloat(bq.price);
			bp[bh] = parseFloat(bq.amount);
			bp[bl] = parseInt(bq.date);
			bp[p] = Date.now();
			bp[bn] = bq.trade_type;
			return bp
		}
		function bj(bq) {
			var bp;
			bp = {};
			bp[bo] = parseInt(bq.tid);
			bp[bi] = parseFloat(bq.price);
			bp[bh] = parseFloat(bq.amount);
			bp[bl] = parseInt(bq.date);
			bp[p] = Date.now();
			bp[bn] = bq.trade_type;
			return bp
		}
		C = bk;
		return ba = bj
	})();
	(function() {
	})();
	ap = ar = aq = Q = a0 = aX = ah = null;
	e = a5 = u = null;
	(function() {
		return(function() {
			var bt, bn, bi, bl;
			bl = h(3), bt = bl[0], bn = bl[1], bi = bl[2];
			function bq(bu, bv, bx) {
				var bw;
				if (bx == null) {
					bx = false
				}
				bw = [];
				bw[bt] = F(bu);
				bw[bn] = F(bv);
				bw[bi] = bx;
				return bw
			}
			function bj(bx, bv) {
				var bu, bw;
				bu = bx[bt];
				bw = bx[bn];
				return(bv - bw.x) / bw.w * bu.w + bu.x
			}
			function p(bB, bw) {
				var bx, bz, bA, bv, bu, by;
				bx = bB[bt];
				bz = bB[bn];
				if (bB[bi]) {
					by = bz.y;
					bu = bz.y + bz.h;
					bv = 0;
					bA = Math.log(bu / by);
					bw = Math.log(bw / by);
					return(bw - bv) / bA * bx.h + bx.y
				} else {
					return(bw - bz.y) / bz.h * bx.h + bx.y
				}
			}
			function bm(bw, bv, bu) {
				return[bj(bw, bv), p(bw, bv)]
			}
			function bk(bv, bu) {
				return Math.round(bj(bv, bu))
			}
			function bh(bv, bu) {
				return Math.round(p(bv, bu))
			}
			function bp(bw, bv, bu) {
				return[bk(bw, bv), bh(bw, bu)]
			}
			function bs(bv, bu) {
				return Math.round(bj(bv, bu)) + 0.5
			}
			function br(bv, bu) {
				return Math.round(p(bv, bu)) + 0.5
			}
			function bo(bw, bv, bu) {
				return[bs(bw, bv), br(bw, bu)]
			}
			ap = bq;
			ar = bs;
			aq = br;
			Q = bo;
			a0 = bk;
			aX = bh;
			ah = bp;
			e = bt;
			a5 = bn;
			return u = bi
		})()
	})();
	(function() {
		var p = this;
		$(function() {
			$("#top_ticker_" + window.$hsymbol + " a").addClass("active");
			return(function() {
				var br, bn, bo, bs, bt, bj, bk, bi, bm, bh, bp = this;
				bn = [];
				bi = {};
				function bl() {
					if (true) {
						a1("http://" + $host + ":" + $port + "/ticker?sid=" + $sid, function() {
							br = arguments[0], bh = arguments[1];
							if (bh != null) {
								bj = bh.now;
								for (bs in bh) {
									if (!aH.call(bh, bs)) {
										continue
									}
									bo = bh[bs];
									bk = $("#market_" + bs);
									bm = parseFloat(bk.text());
									bt = parseFloat(bo.last).toFixed(1);
									bk.text(bt);
									if (bs === window.$symbol) {
										bk = $("#change")[0];
										if (bk.changed_at > (bj - bo.date)) {
											bk.changed_at = bj - bo.date
										}
									}
								}
							}
							bg(10000, function(bu) {
								bl(bu)
							})
						})
					} else {
						bq()
					}
				}
				function bq() {
					return null
				}}
			)()
		})
	})();
	(function() {
		window.$theme_dark = {Background: "#0A0A0A", "Background Mask": "rgba(10, 10, 10, 0.8)", "Main Text": "#CCC", "Minor Text": "#333", "Highlight Text": "#FF0", Border: "#333", Link: "#36F", "Activated Link": "#F63", "Green Stroke": "#49C043", "Green Fill": "#39A033", "Red Stroke": "#CC1414", "Red Fill": "#990F0F", "Axis Background": "rgba(10, 10, 10, 0.8)", "Axis Key Text": "#FFFFFF", "Axis Text": "#999", "Green Arrow": "rgba(0,204,0,0.6)", "Red Arrow": "rgba(204,0,0,0.6)", "Arrow Text": "rgba(255,255,0,0.8)", Cross: "rgba(255,255,255,0.4)", "Stick Line": "#CCCC00", Colors: ["#A6CEE3", "#FDBF6F", "#DF8ADF", "#1F78B4", "#B2DF8A", "#FB9A99"], "Green Area": "#004000", "Red Area": "#400000", "Minor Arrow": "#999"};
		return window.$theme_light = {Background: "#FFFFFF", "Background Mask": "rgba(255, 255, 255, 0.8)", "Main Text": "#333", "Minor Text": "#CCC", "Highlight Text": "#000", Border: "#CCC", Link: "#0D86FF", "Activated Link": "#F80", "Green Stroke": "#33A02C", "Green Fill": "#33A02C", "Red Stroke": "#E31A1C", "Red Fill": "#E31A1C", "Axis Background": "rgba(255, 255, 255, 0.8)", "Axis Key Text": "#333", "Axis Text": "#666", "Green Arrow": "rgba(51,160,44,0.8)", "Red Arrow": "rgba(227,26,28,0.8)", "Arrow Text": "#000", Cross: "rgba(0,0,0,0.4)", "Stick Line": "#0088CC", Colors: ["#24B324", "#D58E31", "#DF8ADF", "#822B82", "#B2DF8A", "#FB9A99"], "Green Area": "#80D080", "Red Area": "#D08080", "Minor Arrow": "#999"}
	})();
	aa = null;
	(function() {
		var cb, bC, cu, c0, cS, bX, c3, dn, bn, dc, bY, c8, c6, cF, bM, dg, ci, cR, bL, bu, cT, bV, bS, co, cx, c4, bE, bm, bA, cv, bR, b7, cd, bI, bW, bK, cq, dq, bU, c5, cg, b8, dm, cA, ct, ce, bx, b0, b5, cL, cU, cC, by, bO, c2, dj, bD, cE, ck, cp, bw, cy, bQ, cc, de, bP, bz, cs, cr, bv, cK, bt, cQ, bl, df, dh, bh, bJ, ch, bF, b4, cV, cf, db, dl, cz, bj, cH, cB, cw, bi, cj, bk, cY, p, cP, c1, bs, cm, bq, cX, bZ, cN, cW, ca, cl, cJ, bB, cn, c9, cZ, cI, cD, cG, dp, bH, b9, dk, di, cM, b6, c7, da, cO, bT, dr, b3, b2, b1, bN, dd, br, bp, bo, bG = this;
		$(function() {
			var dP, d7, dF, d1, dD, dC, dA, dz;
			ct = window.$them_dark;
			ce = window.$theme_light;
			if ($theme_name === "dark") {
				bx = $theme_dark;
				$("html").attr("class", "dark");
				$("#header .logo a img").attr("src", "../../img/logo_dark_bg.png")
			} else {
				bx = $theme_light;
				$("html").attr("class", "light");
				$("#header .logo a img").attr("src", "../../img/logo_light_bg.png")
			}
			$.support.cors = true;
			function dx(ea, eb, d9) {
				var ec;
				if (d9 == null) {
					d9 = {}
				}
				if (d9.mode === "session") {
					ec = {path: "/"}
				} else {
					ec = {expires: 3650, path: "/"}
				}
				return $.cookie(ea, eb, ec)
			}
			cD = $(window);
			cW = $("#main");
			cn = $("#sidebar_outer");
			ob_navbar = $("#navbar");
			ob_header = $("#header");
			cX = $("#header_outer");
			bq = $("#footer_outer");
			ob_footer = $("#footer");
			bZ = $("#leftbar_outer");
			cl = $("#nav");
			cG = $("#wrapper");
			c1 = $("#date");
			cY = $("#assist");
			cJ = $("#periods");
			c9 = $("#trades");
			bs = $("#depth");
			cZ = $("#trades_sorted");
			p = $("#before_trades");
			bk = $("#ask");
			cP = $("#bid");
			bB = $("#price");
			ca = $("#markets");
			cm = {asks: $("#asks div"), bids: $("#bids div"), gasks: $("#gasks div"), gbids: $("#gbids div")};
			cQ = cZ[0];
			cI = $("#trades_unsorted");
			bt = $("#canvas_main")[0];
			cK = $("#canvas_cross")[0];
			if (!bt.getContext) {
				cW.html('<div style="margin:6px">\n<div>对不起, 您正在使用的浏览器不支持此页面的实时行情.</div>\n<dl>\n	<dt>最低要求:</dt>\n	<dd>IE 9+, 谷歌浏览器(Chrome), 火狐(Firefox) 或 Safari.</dd>\n	<dt>推荐使用:</dt>\n	<dd>IE 10+, 谷歌浏览器(Chrome), 火狐(Firefox) 或 Safari.</dd>\n	<dt>注意:</dt>\n	<dd>IE 9 不支持实时行情模式.</dd>\n</div>');
				return
			}
			bz = bt.getContext("2d");
			bP = cK.getContext("2d");
			db = bZ.width();
			function dJ(ea, d9) {
				return ea > d9
			}
			(function() {
				function d9(ea) {
					function eb(eh, ef) {
						var ee, ed, eg, ec;
						if (ef == null) {
							ef = ""
						}
						if (ef) {
							ef = ' class_name="' + ef + '"'
						}
						ed = L(new Date());
						cY.prepend($("<div" + ef + "/>").html("[" + ed + ("] " + ea + ": ") + eh));
						eg = cY[0];
						ee = eg.childNodes;
						ec = ee.length;
						if (ec > 100) {
							while (ec-- > 50) {
								eg.removeChild(ee[ec])
							}
						}
						return this
					}
					eb.d = function() {
						if ($debug) {
							return eb.apply(null, arguments)
						}
					};
					return eb
				}
				return aa = d9
			})();
			bj = aa("Eva");
			bj("welcome%20to%20www.btctrade.com");
			c7 = {60: "1m", 180: "3m", 300: "5m", 600: '10m', 900: "15m", 1800: "30m", 3600: "1h", 7200: "2h", 14400: "4h", 21600: "6h", 43200: "12h", 86400: "1d", 259200: "3d", 604800: "1w"};
			da = {};
			for (cf in c7) {
				if (!aH.call(c7, cf)) {
					continue
				}
				b3 = c7[cf];
				da[b3] = cf
			}
			dg = {};
			cq = null;
			d1 = $("li.period a", cJ);
			for (d7 = 0, dF = d1.length; d7 < dF; d7++) {
				cz = d1[d7];
				cz = $(cz);
				dl = cz.parent();
				if (b6 = da[cz.attr("p")]) {
					dg[b6] = dl;
					(function(ea, d9) {
						return d9.click(function() {
							var ec, eb, ed = this;
							dQ(ea, function() {
								ec = arguments[0], eb = arguments[1];
								if (ec) {
									return
								}
								if (cq) {
									cq.removeClass("selected")
								}
								cq = d9;
								dg[ea].addClass("selected");
								return true
							})
						})
					})(b6, dl)
				}
			}
			bD = {};
			bQ = [];
			cM = [];
			bT = [];
			bU = window.WebSocket != null;
			c5 = 0;
			dD = h(9), cL = dD[0], bO = dD[1], by = dD[2], dj = dD[3], cC = dD[4], b0 = dD[5], cU = dD[6], c2 = dD[7], b5 = dD[8];
			cv = {};
			bA = null;
			cu = aM();
			c0 = [];
			c3 = null;
			bX = null;
			dn = 0;
			bR = null;
			cd = null;
			b7 = {};
			c4 = false;
			cA = 60;
			bu = 0;
			cT = 0;
			c8 = {price_mas: {cookie: "price_ma_cycles", params: [7, 30], names: ["MA%", "MA%"]}, volume_mas: {cookie: "volume_ma_cycles", params: [5, 10, 20], names: ["MA%", "MA%", "MA%"]}, macd: {cookie: "macd_params", params: [12, 26, 9], names: ["DIF", "DEA", "MACD"]}, stoch_rsi: {cookie: "stock_rsi_params", params: [14, 14, 3, 3], names: ["K", "D"]}, kdj: {cookie: "kdj_params", params: [9, 3, 3], names: ["K", "D", "J"]}};
			cF = null;
			bM = null;
			cR = null;
			co = $("#change");
			co[0].changed_at = 0;
			dc = {depth_hint: true, sidebar: true};
			function dX(d9) {
				switch (d9) {
					case"okcoin_ltc":
						return["okcoin", "LTCCNY", "LTC", " CNY/LTC"];
					case"okcoin_btc":
						return["okcoin", "BTCCNY", "BTC", " CNY/BTC"];
					case"bitstamp_btc":
						return["bitstamp", "BTCUSD", "BTC", " USD/BTC"];
					case"huobi_btc":
						return["huobi", "BTCCNY", "BTC", " CNY/BTC"];
					case"btcchina_btc":
						return["btcchina", "BTCCNY", "BTC", " CNY/BTC"];
					case"btce_btc":
						return["btce", "BTCUSD", "BTC", " USD/BTC"];
					case"btce_ltc":
						return["btce", "LTCUSD", "USD", " USD/LTC"];
					case"cnbtc_btc":
						return["cnbtc", "BTCCNY", "BTC", " CNY/BTC"];
					case"cnbtc_ltc":
						return["cnbtc", "LTCCNY", "LTC", " CNY/LTC"];
					case"btctrade_btc":
						return["btctrade", "BTCCNY", "BTC", " CNY/BTC"];
					case"btctrade_ltc":
						return["btctrade", "LTCCNY", "LTC", " CNY/LTC"];
					case"btctrade_ybc":
						return["btctrade", "YBCCNY", "YBC", " CNY/YBC"];
					case"btctrade_doge":
						return["btctrade", "DOGECNY", "DOGE", " CNY/DOGE"];
					case"bter_btc":
						return["bter", "BTCCNY", "BTC", " CNY/BTC"];
					case"bter_ltc":
						return["bter", "LTCCNY", "LTC", " CNY/LTC"];
					case"btc38_btc":
						return["btc38", "BTCCNY", "BTC", " CNY/BTC"];
					case"btc38_ltc":
						return["btc38", "LTCCNY", "LTC", " CNY/LTC"];
					case"796_btc":
						return["796", "BTCUSD", "BTC", " USD/BTC"];
					case"796_ltc":
						return["796", "LTCUSD", "LTC", " USD/LTC"];
					case"bitfinex_btc":
						return["bitfinex", "BTCUSD", "BTC", " USD/BTC"];
					case"bitfinex_ltc":
						return["bitfinex", "LTCUSD", "LTC", " USD/LTC"];
					default:
                        var eb = d9.split("_");
                        return [eb[0], eb[1].toUpperCase() + "CNY", eb[1].toUpperCase(), " " + eb[1].toUpperCase() + "/CNY"]
					}
			}
			dC = dX($market), bL = dC[0], cb = dC[1], bS = dC[2], dq = dC[3];
			bU && (bU = bL === "MtGox");
			cg = 0;
			dm = 1;
			b8 = 1;
			if (cb === "LTCUSD") {
				cg = 0.01;
				dm = 2
			} else {
				if (cb === "LTCCNY") {
					cg = 0.1;
					dm = 1
				} else {
					if (cb === "LTCBTC") {
						cg = 0.0001;
						b8 = 10000;
						dm = 1
					} else {
						if (cb === "XChange") {
							cg = 0.001;
							b8 = 1000;
							dm = 0
						} else {
							if (cb === "DOGECNY") {
								cg = 0.00001;
								b8 = 100000;
								dm = 0
							} else {
								if (cb === "PPCCNY") {
									cg = 0.1;
									dm = 1
								} else {
									if (cb === "XPMCNY") {
										cg = 0.1;
										dm = 1
									} else {
										if (cb === "XRPCNY") {
											cg = 0.001;
											b8 = 100;
											dm = 1
										} else {
											if (cb === "BTCCNY") {
												cg = 1;
												dm = 0
											} else {
												cg = 1;
												dm = 0
											}
										}
									}
								}
							}
						}
					}
				}
			}
			cu = aM(cg);
			cc = null;
			de = null;
			cE = 100;
			bm = 8;
			ck = parseInt((dA = $.cookie("barWidth")) != null ? dA : 7);
			bF = parseInt((dz = $.cookie("gapWidth")) != null ? dz : 3);
			bN = (ck - 1) / 2;
			bv = 0;
			cy = ck + bF;
			cH = null;
			cp = null;
			bw = null;
			dp = null;
			bH = null;
			cs = null;
			cr = null;
			dk = null;
			di = null;
			bl = false;
			cj = false;
			bi = false;
			cw = false;
			bJ = null;
			dh = null;
			bK = 0;
			df = null;
			bh = null;
			bC = false;
			function dN() {
				bC = true;
				dB("页面已锁定(双击可解锁)");
				return $("#main canvas").css("cursor", "default")
			}
			function dY() {
				bC = false;
				dB("页面已解锁(双击可锁定)");
				return $("#main canvas").css("cursor", "none")
			}
			function dW() {
				var ef, ec, ed, d9, ee, ea, eb, eg, eh, ei;
				ei = cD.height() - ob_navbar.height();
				de = cD.width() - cn.width() - db;
				cc = ei - ob_header.height();
				cW.height(ei);
				eb = [bt, cK];
				for (ee = 0, ea = eb.length; ee < ea; ee++) {
					ec = eb[ee];
					ec.width = de;
					ec.height = cc
				}
				eg = (cD.height() - ob_navbar.height()) / 2, $("#chart_depth_block").height(eg - 60), $("#chart_depth_block .scroll").height(eg - 210), $("#chart_trade_block").height(eg), $("#chat_room_block").height(eg +9), $("#chat_room_block .chat-list").height(eg - $("#chat_room_block .sys-tips").height() - 22), $(".nice-scroll").niceScroll({cursorborder: "1px solid #080808", cursorwidth: 9});
				d9 = cc - p.outerHeight(true);
				cH = Math.floor(cc / 6 - bm);
				cp = Math.floor((de - cE) / cy) + Math.floor(cE / cy) - 1;
				bw = Math.floor((de - cE) / cy);
				if (!bA) {
					return
				}
				ef = bA[B];
				ed = O(ef, au).length - 1;
				bK = ed;
				if (bJ != null) {
					bJ -= bw - bH
				} else {
					bJ = ed - bw + 1;
					if (bJ < 0) {
						bJ = 0
					}
				}
				bH = bw;
				b2();
				d3();
				return true
			}
			(function() {
				cG.dblclick(function(d9) {
					if (bC) {
						dY()
					} else {
						dN()
					}
					return true
				});
				cG.mousemove(function(ea) {
					var d9, eb;
					if (!bC) {
						d9 = ea.pageX - db;
						eb = ea.pageY - cX.height();
						dk = d9;
						di = eb;
						bh = Math.floor((d9 - bv) / cy);
						d9 = bh * cy + bN + bv;
						cs = d9;
						cr = eb;
						d3();
						if (bl) {
							b2()
						}
					}
					return true
				});
				cG.mouseout(function(d9) {
					if (!bC) {
						cs = null;
						d8()
					}
					return true
				});
				cD.mouseup(function(d9) {
					bl = false;
					return true
				});
				return cG.mousedown(function(d9) {
					bl = true;
					df = bJ + bh;
					return false
				})
			})();
			function d8() {
				var d9;
				d9 = bP;
				return d9.clearRect(0, 0, de, cc)
			}
			function dt(ee, ed, ea, eg, eb, ec) {
				var d9, ef;
				d9 = ea;
				ef = eg;
				if (eb == null) {
					eb = ee.measureText(ed).width
				}
				ee.beginPath();
				ee.textBaseline = "middle";
				if (ec === "r") {
					ee.moveTo(d9, ef);
					ee.lineTo(d9 - 5, ef + 10.5);
					ee.lineTo(d9 - 5 - eb - 6 - 5 + 0.5, ef + 10.5);
					ee.lineTo(d9 - 5 - eb - 6 - 5 + 0.5, ef - 10.5);
					ee.lineTo(d9 - 5, ef - 10.5);
					ee.lineTo(d9, ef);
					ee.fill();
					ee.stroke();
					ee.fillStyle = bx["Axis Text"];
					return ee.fillText(ed, d9 - 5 - 3 - eb, ef)
				} else {
					ee.moveTo(d9, ef);
					ee.lineTo(d9 + 5, ef + 10.5);
					ee.lineTo(d9 + 5 + eb + 6 + 5, ef + 10.5);
					ee.lineTo(d9 + 5 + eb + 6 + 5, ef - 10.5);
					ee.lineTo(d9 + 5, ef - 10.5);
					ee.lineTo(d9, ef);
					ee.fill();
					ee.stroke();
					ee.fillStyle = bx["Axis Text"];
					return ee.fillText(ed, d9 + 5 + 3, ef)
				}
			}
			function dE(ea) {
				var d9;
				if (ea > 100) {
					d9 = 5
				} else {
					d9 = 4
				}
				return ea.toPrecision(d9)
			}
			function d3() {
				var ey, ec, eo, eg, ef, ee, en, ei, ex, ev, eu, em, eb, et, er, eq, ew, eB, ea, es, eh, ep, eA, el, d9, ek, ej, ed, ez;
				if (!bA) {
					return
				}
				eq = bP;
				ec = bA[B];
				ew = dk > de - cE;
				if (ew) {
					ef = dk;
					ee = di
				} else {
					ef = cs;
					ee = cr
				}
				ey = $settings.stick_style.value;
				if (ef == null) {
					return
				}
				d8();
				eq.strokeStyle = bx.Cross;
				j(eq, ee + 0.5, 0, de);
				aU(eq, ef + 0.5, 0, cc);
				b3 = aD(ec, bJ + bh, ao);
				if (cR) {
					eg = cR[e];
					if ((eg.y + eg.h < ee && ee < eg.y)) {
						en = cR[a5];
						if (cR[u]) {
							er = en.y;
							et = en.y + en.h;
							ex = 0;
							ei = Math.log(et / er);
							eA = (ee - eg.y) / eg.h * ei + ex;
							es = Math.exp(eA) * er
						} else {
							es = (ee - eg.y) / eg.h * en.h + en.y
						}
						eh = dE(es);
						eq.font = "12px Consolas, Monospace";
						eq.fillStyle = bx["Axis Text"];
						eq.textAlign = "left";
						el = eq.measureText(eh).width;
						ek = de - cE + (cE - el - 8) / 2;
						ej = ee;
						eq.strokeStyle = bx.Cross;
						eq.fillStyle = bx["Background Mask"];
						if (ew) {
							dt(eq, eh, de - cE - 3, ej, el, "r")
						} else {
							dt(eq, eh, ek, ej, el)
						}
					}
				}
				if (bl) {
					bJ = df - bh
				}
				if (b3[au]) {
					ep = aD(ec, bJ + bh - 1, ao);
					if (ep == null) {
						ep = b3
					}
					if (ep[au] != null) {
						ea = b3[au] / ep[au] - 1
					} else {
						ea = 0
					}
					ea = ea * 100;
					ea = ea.toFixed(1);
					if (ea[0] === "-") {
						d9 = "↘"
					} else {
						if (ea > 0) {
							ea = "+" + ea;
							d9 = "↗"
						} else {
							ea = "+" + ea;
							d9 = "→"
						}
					}
					d9 = "";
					em = ["时间:" + (am(b3[bd])), "开:" + (dE(b3[t])), "高:" + (dE(b3[a7])), "低:" + (dE(b3[A])), "收:" + (dE(b3[au])), "涨幅:" + ea + "%", "振幅:" + ((((b3[a7] - b3[A]) / b3[A]) * 100).toFixed(1)) + "%", "量:" + (b3[H].toFixed(1))].join(" | ");
					eb = [em];
					eq.textBaseline = "middle";
					eq.font = "11px Consolas, Monospace";
					eq.textAlign = "left";
					el = eq.measureText(eb[1]).width;
					eq.fillStyle = bx["Background Mask"];
					ev = 16;
					eB = 4;
					eq.fillRect(0, 0, el + eB * 2, eB * 2 + eb.length * ev);
					eq.fillStyle = bx["Main Text"];
					for (eu = ed = 0, ez = eb.length; ed < ez; eu = ++ed) {
						em = eb[eu];
						eq.fillText(em, eB, eB + ev / 2 + eu * ev)
					}
					if (cR && (ey === "line" || ey === "line_o")) {
						eo = b3[au];
						eq.fillStyle = "";
						el = eq.measureText(eo).width + 8;
						ev = 24;
						eq.fillStyle = bx["Background Mask"];
						eq.strokeStyle = bx.Border;
						ee = aX(cR, eo);
						eq.textAlign = "center";
						if (ef < de / 2) {
							D(eq, ef + 4, ee, el, ev);
							eq.fillStyle = bx["Main Text"];
							eq.fillText(eo, ef + 4 + el / 2, ee + ev / 2)
						} else {
							D(eq, ef - 4, ee, -el, ev);
							eq.fillStyle = bx["Main Text"];
							eq.fillText(eo, ef - 4 - el / 2, ee + ev / 2)
						}
						eq.strokeStyle = bx["Stick Line"];
						eq.fillStyle = bx["Stick Line"];
						eq.beginPath();
						eq.arc(ef + 0.5, ee, 3, 0, 2 * Math.PI, true);
						eq.closePath();
						return eq.fill()
					}
				}
			}
			function dI(d9) {
				return 8 * Math.pow(d9, 0.3)
			}
			function d5(eb, ef, ei, eh, d9) {
				var ee, ed, ec, eg, ea;
				ea = ah(ef, ei, eh), ed = ea[0], ec = ea[1];
				eb.fillStyle = bx["Main Text"];
				eb.font = "11px Consolas, Monospace";
				eb.textBaseline = "middle";
				ee = ef[e];
				if (ed < (ee.x + ee.w / 2)) {
					eg = "← " + eh;
					eb.textAlign = "left";
					ed += 3
				} else {
					eg = eh + " →";
					ed -= 3;
					eb.textAlign = "right"
				}
				return eb.fillText(eg, ed + d9, ec)
			}
			window.world_draw_main = b2 = function() {
				var fs, ef, e6, e0, fz, eZ, eY, eJ, eI, eH, eF, eX, ew, eM, fB, eD, es, er, fk, eq, eV, et, eO, fy, fF, eU, eW, ff, eN, eT, fx, eK, fD, eG, fw, ex, fq, ep, eh, eo, fl, eu, fu, fv, fA, ez, fh, eQ, eR, fr, fC, fd, eE, ee, eC, eA, en, eL, fo, fp, ey, ft, ek, fH, fb, fn, eP, eB, ev, ed, ec, eb, fj, eS, fi, fg, fe, fc, fa, e9, e8, e7, ea, d9, fK, fJ, fI, fG, e5, e4, e3, e2, e1, em, el, ej, ei, eg, fE;
				if (!bA) {
					return
				}
				e0 = bA[B];
				ef = $settings.stick_style.value;
				eQ = bz;
				bz.clearRect(0, 0, de, cc);
				fk = O(e0, au).length - 1;
				if (bK < fk && (bJ + bw <= fk && fk <= bJ + cp)) {
					bJ += fk - bK;
					bK = fk
				}
				if (bJ > fk) {
					bJ = fk
				}
				if (bJ < 0) {
					bJ = 0
				}
				dh = bJ + cp;
				if (dh > fk) {
					dh = fk
				}
				if ($settings.main_lines.value === "mas") {
					ee = bA[bO];
					fb = bA[dj]
				} else {
					if ($settings.main_lines.value === "emas") {
						ee = bA[by];
						fb = bA[dj]
					} else {
						ee = [];
						fb = []
					}
				}
				if ($settings.indicator.value === "macd") {
					eh = bA[cC];
					em = aS(ax, e0, bJ, dh, eh), eD = em[0], fB = em[1], ex = em[2];
					ff = [eD, fB];
					eV = aT([eD, fB, ex]);
					eN = -eV;
					eW = 2 * eV
				} else {
					if ($settings.indicator.value === "stoch_rsi") {
						eL = bA[c2];
						el = aS(ax, e0, bJ, dh, eL), eA = el[0], eC = el[1];
						ff = [eA, eC];
						eN = 0;
						eW = 100
					} else {
						if ($settings.indicator.value === "kdj") {
							fx = bA[b5];
							ej = aS(ax, e0, bJ, dh, fx), cf = ej[0], eX = ej[1], eT = ej[2];
							ff = [cf, eX, eT];
							eu = aL([cf, eX, eT, [100]]);
							fA = Z([cf, eX, eT, [0]]);
							eN = fA;
							eW = eu - fA
						}
					}
				}
				ei = aS(ax, e0, bJ, dh, [H, t, au, a7, A, bd]), eP = ei[0], fr = ei[1], eY = ei[2], eO = ei[3], eG = ei[4], eM = ei[5];
				fH = aS(ax, e0, bJ, dh, fb);
				eE = aS(ax, e0, bJ, dh, ee);
				eI = cp * cy;
				bv = de - cE - bw * cy;
				eJ = {x: bv, y: cc, w: eI, h: cc};
				es = {x: 0, y: 0, w: cp, h: 0};
				fy = [];
				function fm(fL) {
					if (fL == null) {
						fL = bm
					}
					eJ.y = eJ.y + eJ.h - fL - 1;
					fy.push(eJ.y);
					eQ.strokeStyle = bx.Border;
					j(eQ, eJ.y + 0.5, 0, de);
					return eJ.y -= fL
				}
				eJ.h = -16;
				e6 = ap(eJ, es);
				fm(0);
				eJ.y -= bm;
				eJ.h = -cH;
				if ($settings.indicator.value === "none") {
					ep = null
				} else {
					es.y = eN;
					es.h = eW;
					ep = ap(eJ, es);
					fm()
				}
				if (fH.length) {
					es.y = 0;
					es.h = aL([fH, eP])
				} else {
					es.y = 0;
					es.h = aL([eP])
				}
				fn = ap(eJ, es);
				fm();
				if (cA <= 7200) {
					eQ.strokeStyle = bx.Border;
					for (eU = ed = 0, fj = eM.length; ed < fj; eU = ++ed) {
						ew = eM[eU];
						if (ew.getHours() === 0 && ew.getMinutes() === 0) {
							eH = bv + eU * cy + bN + 0.5;
							aU(eQ, eH, eJ.y + bm, eJ.y + bm - 6)
						}
					}
				}
				if (eE.length) {
					fF = [eE, eO];
					fw = [eE, eG]
				} else {
					fF = [eO];
					fw = [eG]
				}
				eu = aL(fF) * 1.01;
				fA = Z(fw) * 0.99;
				while (eu && eu < eO[eO.length - 1]) {
					eu *= 1.01
				}
				while (fA && fA > eG[eG.length - 1]) {
					fA *= 0.99
				}
				eJ.h = -eJ.y + bm + 12;
				es.y = fA;
				es.h = eu - fA;
				fl = ap(eJ, es, $settings.scale.value === "logarithmic");
				cR = fl;
				if (ep) {
					ft = ep;
					if ($settings.indicator.value === "macd") {
						fo = aX(ft, 0);
						fd = ex[0];
						for (er = ec = 0, fi = ex.length; ec < fi; er = ++ec) {
							eq = ex[er];
							if (eq > 0) {
								eQ.fillStyle = bx["Green Fill"];
								eQ.strokeStyle = bx["Green Stroke"]
							} else {
								eQ.fillStyle = bx["Red Fill"];
								eQ.strokeStyle = bx["Red Stroke"]
							}
							if (dJ(eq, fd)) {
								eQ.fillStyle = bx.Background
							}
							g(eQ, ft, fo, er, eq, ck);
							fd = eq
						}
					} else {
						if ((eg = $settings.indicator.value) === "stoch_rsi" || eg === "kdj") {
							e5 = [20, 80];
							for (eb = 0, fg = e5.length; eb < fg; eb++) {
								b3 = e5[eb];
								fo = aX(ft, b3);
								j(eQ, fo + 0.5, 0, de)
							}
						}
					}
				}
				fo = aX(fn, 0);
				fC = eY[0];
				for (er = ea = 0, fe = eY.length; ea < fe; er = ++ea) {
					eq = eY[er];
					switch (ef) {
						case"candle_stick_hlc":
							eR = (e4 = eY[er - 1]) != null ? e4 : fr[er];
							eZ = eY[er];
							break;
						default:
							eR = fr[er];
							eZ = eY[er]
					}
					fD = eG[er];
					et = eO[er];
					if (eZ > eR) {
						eQ.fillStyle = bx["Green Fill"];
						eQ.strokeStyle = bx["Green Stroke"]
					} else {
						eQ.fillStyle = bx["Red Fill"];
						eQ.strokeStyle = bx["Red Stroke"]
					}
					if (dJ(eZ, eR)) {
						eQ.fillStyle = bx.Background
					}
					g(eQ, fn, fo, er, eP[er], ck);
					if (ef === "ohlc" || ef === "candle_stick" || ef === "candle_stick_hlc") {
						f(eQ, fl, er, fD, et, bN);
						switch (ef) {
							case"ohlc":
								eH = a0(fl, er);
								eF = aX(fl, eR);
								j(eQ, eF + 0.5, eH, eH + bN);
								eF = aX(fl, eZ);
								j(eQ, eF + 0.5, eH + bN, eH + ck);
								break;
							case"candle_stick":
								ai(eQ, fl, er, eR, eZ, ck);
								break;
							case"candle_stick_hlc":
								ai(eQ, fl, er, eR, eZ, ck)
							}
					}
					fC = eq
				}
				if (ef === "line" || ef === "line_o") {
					eQ.lineWidth = 2;
					eQ.strokeStyle = bx["Stick Line"];
					ak(eQ, fl, eY, bN + 0.5);
					if (ef === "line_o") {
						eQ.fillStyle = bx.Background;
						eQ.strokeStyle = bx["Stick Line"];
						for (er = d9 = 0, fc = eY.length; d9 < fc; er = ++d9) {
							eq = eY[er];
							e3 = ah(fl, er, eq), eH = e3[0], eF = e3[1];
							eQ.beginPath();
							eQ.arc(eH + bN + 0.5, eF, 2, 0, 2 * Math.PI, true);
							eQ.closePath();
							eQ.fill();
							eQ.stroke()
						}
					}
					eQ.lineWidth = 1;
					eO = eY;
					eG = eY
				}
				eQ.lineWidth = 1;
				fz = [[fl, eE, true], [fn, fH, true]];
				if (ep) {
					fz.unshift([ep, ff, true])
				}
				for (fK = 0, fa = fz.length; fK < fa; fK++) {
					e2 = fz[fK], ft = e2[0], ev = e2[1], en = e2[2];
					if (en) {
						for (eU = fJ = 0, e9 = ev.length; fJ < e9; eU = ++fJ) {
							eB = ev[eU];
							eQ.strokeStyle = bx.Colors[eU];
							ak(eQ, ft, eB, bN + 0.5)
						}
					}
				}
				eQ.lineWidth = 1;
				fu = 0;
				fv = 0;
				for (eU = fI = 0, e8 = eO.length; fI < e8; eU = ++fI) {
					b3 = eO[eU];
					if (b3 > fu) {
						fu = b3;
						fv = eU
					}
				}
				ez = Infinity;
				fh = 0;
				for (eU = fG = 0, e7 = eG.length; fG < e7; eU = ++fG) {
					b3 = eG[eU];
					if (b3 < ez) {
						ez = b3;
						fh = eU
					}
				}
				d5(eQ, fl, fv, fu, bN);
				d5(eQ, fl, fh, ez, bN);
				(function() {
					var fN, fL, fO, fM, fS, fT, fR, fW, fP, fU, fX, fV;
					b6 = cA;
					function fQ(fY, fZ) {
						var f0;
						f0 = 3600 / 60 * fY.getTimezoneOffset();
						return(fY.getTime() / 1000 - f0) % fZ === 0
					}
					fO = {60: {cond: fQ, key_cond: function(fY) {
								return fY.getMinutes() === 0
							}, text: function(fY) {
								return ab(fY)
							}, key_text: function(fY) {
								return av(fY)
							}, over: function(fY) {
								return r(fY)
							}}, 3600: {cond: fQ, key_cond: function(fY) {
								return fY.getHours() === 0 && fY.getMinutes() === 0
							}, text: function(fY) {
								return av(fY)
							}, key_text: function(fY) {
								return r(fY)
							}, over: function(fY) {
								return r(fY)
							}}, 86400: {cond: fQ, key_cond: function(fY) {
								return false && fY.getDay() === 6
							}, text: function(fY) {
								return r(fY)
							}, key_text: function(fY) {
								return r(fY)
							}, over: function(fY) {
								return fY.getFullYear()
							}}, 604800: {cond: function(fY) {
								return fY.getDate() === 1
							}, key_cond: function(fY) {
								return fY.getMonth() === 0
							}, text: function(fY) {
								return b(fY)
							}, key_text: function(fY) {
								return fY.getFullYear()
							}, over: function(fY) {
								return fY.getFullYear()
							}}};
					if (b6 >= 86400) {
						fL = 604800;
						fM = 604800
					} else {
						fM = b6 * (80 / cy);
						if (fM <= 30 * 60) {
							fL = 60;
							fR = [10, 30]
						} else {
							if (fM <= 8 * 3600) {
								fL = 3600;
								fR = [1, 2, 3, 6, 8]
							} else {
								if (fM <= 15 * 86400) {
									fL = 86400;
									fR = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
								} else {
									fL = 604800;
									fR = 1
								}
							}
						}
						for (fX = 0, fP = fR.length; fX < fP; fX++) {
							eU = fR[fX];
							if (!(fM < fL * eU)) {
								continue
							}
							fM = fL * eU;
							break
						}
					}
					eJ = e6[e];
					if (fN = fO[fL]) {
						eQ.strokeStyle = bx.Border;
						eQ.textAlign = "center";
						eQ.textBaseline = "middle";
						eM = O(e0, bd);
						for (fT = fV = fU = bJ - 1; fU <= dh ? fV <= dh : fV >= dh; fT = fU <= dh ? ++fV : --fV) {
							if (!(ew = eM[fT])) {
								continue
							}
							eU = fT - bJ;
							if (fN.cond(ew, fM)) {
								if (fN.key_cond(ew)) {
									eQ.fillStyle = bx["Axis Text"];
									eQ.font = "bold 12px Consolas, Monospace";
									fW = fN.key_text(ew)
								} else {
									eQ.fillStyle = bx["Axis Text"];
									eQ.font = "11px Consolas, Monospace";
									fW = fN.text(ew)
								}
								eH = bv + eU * cy + bN + 0.5;
								aU(eQ, eH, eJ.y + eJ.h, eJ.y + eJ.h + 4);
								eQ.fillText(fW, eH, eJ.y + eJ.h + 8.5)
							}
						}
						if (eM[bJ]) {
							fS = fN.over(eM[bJ]);
							return c1.text(fS)
						}
					}
				})();
				eH = de - cE;
				eQ.strokeStyle = bx.Border;
				eQ.textAlign = "left";
				eQ.textBaseline = "middle";
				eQ.font = "11px Consolas, Monospace";
				eQ.fillStyle = bx["Axis Background"];
				eQ.fillRect(eH, 0, eH + cE, cc);
				eQ.fillStyle = bx["Axis Text"];
				e1 = (function() {
					var fN, fM, fL, fO;
					fM = [ep, fl, fn];
					fL = [];
					for (fO = 0, fN = fM.length; fO < fN; fO++) {
						ft = fM[fO];
						if (ft) {
							ft = ap(ft[e], ft[a5], ft[u]);
							ft[e].w = cE;
							ft[e].x = eH;
							fL.push(ft)
						} else {
							fL.push(void 0)
						}
					}
					return fL
				})(), fq = e1[0], eo = e1[1], ek = e1[2];
				for (fE = 0, eS = fy.length; fE < eS; fE++) {
					eF = fy[fE];
					j(eQ, eF + 0.5, eH, eH + cE)
				}
				be(eQ, eo, "hr");
				fp = 0;
				ey = 0;
				fs = cF && cA < 3600 && bu && cT;
				if (fs) {
					b3 = ap(eo[e], eo[a5], eo[u]);
					b3[e].x += 8;
					b3[e].w -= 8;
					b3[a5].x = 0;
					if (bL === "MtGox") {
						b3[a5].w = 500
					} else {
						if (bL === "BTCChina") {
							b3[a5].w = Math.floor(Math.min(bu, cT) / 10)
						} else {
							b3[a5].w = Math.floor(Math.min(bu, cT) / 5)
						}
					}
					eK = b3[a5].w;
					af(eQ, eo, function() {
						var fP, fN, fQ, fO, fZ, fY, fS, fL, fT, fW, fR, fM, fX, fV, fU, f1, f0;
						eQ.save();
						eQ.lineWidth = 2;
						fX = [[bf, 0, 500, bx["Green Arrow"]], [az, -1, -500, bx["Red Arrow"]]];
						for (f1 = 0, fM = fX.length; f1 < fM; f1++) {
							fV = fX[f1], fW = fV[0], fL = fV[1], fO = fV[2], fN = fV[3];
							fQ = [];
							fT = 0;
							fY = 0;
							eQ.beginPath();
							eQ.fillStyle = fN;
							eQ.strokeStyle = fN;
							fZ = b3[e].x;
							for (eU = f0 = fL; fL <= fO ? f0 <= fO : f0 >= fO; eU = fL <= fO ? ++f0 : --f0) {
								if (!(fP = cu[fW].at(eU))) {
									break
								}
								fR = fP[1];
								fS = fP[0];
								fT += fR;
								fU = ah(b3, fT, fS), eH = fU[0], eF = fU[1];
								if (eU === fL) {
									eQ.moveTo(b3[e].x, eF)
								}
								eQ.fillRect(fZ, eF - 1, eH - fZ + 1, 2);
								fZ = eH;
								if (fT > eK) {
									ey += eK - (fT - fR);
									fp += fS * (eK - (fT - fR));
									break
								} else {
									ey += fR;
									fp += fS * fR
								}
							}
						}
						return eQ.restore()
					})
				}
				if (ep) {
					if ($settings.indicator.value === "macd") {
						Y(eQ, fq)
					} else {
						U(eQ, fq, [0, 20, 80, 100])
					}
				}
				be(eQ, eo, "text");
				be(eQ, ek);
				if (fs) {
					eJ = eo[e];
					(function() {
						var fM, fL;
						fM = cF[a9];
						fL = fM;
						eF = aX(fl, fM);
						eH = eJ.x;
						eQ.strokeStyle = bx["Arrow Text"];
						eQ.fillStyle = bx["Arrow Text"];
						d4(eQ, eH, eF);
						eQ.fillStyle = bx["Minor Arrow"];
						eF = aX(fl, fp / ey);
						d4(eQ, eH, eF);
						return
					})();
					af(eQ, ek, function() {
						var fL, fN, fM;
						eQ.font = "11px Consolas, Monospace";
						fN = aj(O(e0, H));
						fM = ah(fn, dh - bJ + 1, fN), eH = fM[0], eF = fM[1];
						fL = eQ.measureText(fN.toFixed(5));
						eQ.fillStyle = bx["Background Mask"];
						eQ.fillRect(eJ.x + 12, eF - 6, fL.width, 12);
						eQ.fillStyle = bx["Highlight Text"];
						eQ.fillText("←", eJ.x, eF);
						return eQ.fillText(fN.toFixed(5), eJ.x + 12, eF)
					})
				}
				return null
			};
			function d4(ea, d9, eb) {
				ea.beginPath();
				ea.moveTo(d9, eb);
				ea.lineTo(d9 + 6, eb + 3);
				ea.lineTo(d9 + 6, eb - 3);
				return ea.fill()
			}
			b1 = aV(150, function() {
				return z(dW)
			});
			cN = $("#loading");
			ci = 1;
			function dZ() {
				ci++;
				if (ci) {
					return cN.fadeIn("fast")
				}
			}
			function d6() {
				ci--;
				if (!ci) {
					return cN.fadeOut()
				}
			}
			function dB(d9) {
				$("#notify .inner").text(d9);
				return $("#notify").fadeIn("fast").delay(400).fadeOut()
			}
			function dV(ee) {
				var eb, ec, eg, ef, ea, ed, d9;
				ef = null;
				ec = 0;
				for (ed = 0, d9 = ee.length; ed < d9; ed++) {
					eb = ee[ed];
					if (eb.price_currency === bS) {
						eb.tid = parseInt(eb.tid);
						ef = eb.tid;
						if(isNaN(bM)) continue;
						if (bD[eb.tid] || eb.tid <= bM) {
							continue
						}
						ea = C(eb);
						for (b6 in cv) {
							if (!aH.call(cv, b6)) {
								continue
							}
							eg = cv[b6];
							a8(eg, ea)
						}
						bD[ef] = ea;
						bQ.push(ea);
						bT.push(ea);
						while (bT.length > 200) {
							bT.shift()
						}
						++ec
					}
				}
				return[ef, ec]
			}
			function dQ(ec, d9) {
				var eb, ed, ee = this;
				dv(ec, $sid, function() {
					ea((eb = arguments[0], ed = arguments[1], eb))
				});
				function ea(eg) {
					if (eg) {
						return d9(bj("switch failed " + eb.message))
					} else {
						ef()
					}
					function ef() {
						cA = ec;
						dx("step", cA, {mode: "session"});
						bA = ed;
						bJ = null;
						dh = null;
						dW();
						d9(null)
					}}
			}
			function dv(ec, ea, eg) {
				var ed, ef, eb, eh, ee = this;
				bj("switch to " + c7[ec]);
				if (cv[ec] && !cv[ec].is_simple) {
					bg(16, function() {
						eb = cv[ec];
						cd = ec;
						bR = b7[ec];
						d9()
					})
				} else {
					bj("get history data from server for " + c7[ec]);
					eh = {symbol: $symbol, interval: ec, last: 0};
					dZ();
					if (!cd && de / cy < 180) {
						eh.mode = "simple"
					}
					a1($host + "index/index/chart/", eh, function() {
						ef = arguments[0], ed = arguments[1];
						d6();
						if (ef) {
							return eg(ef)
						}
						if (!ed) {
							return eg(new Error("error, history data is empty"))
						}
						cd = ec;
						bR = b7[ec] = ed;
						dU();
						eb = cv[ec];
						eb.is_simple = eh.mode === "simple";
						d9()
					})
				}
				function d9() {
					return eg(null, eb)
				}}
			function dU() {
				var eg, eb, ec, ee, ef, ea, ed, d9;
				b6 = cd;
				ee = bR;
				ef = y(b6, ee);
				eb = eg = ef[B];
				ef[cL] = aj(O(eg, J));
				bj("apply " + bQ.length + " txes");
				for (ed = 0, d9 = bQ.length; ed < d9; ed++) {
					ea = bQ[ed];
					if (ea[q] > ef[cL]) {
						a8(ef, ea)
					}
				}
				ef[bO] = (function() {
					var ej, eh, ek, ei;
					ek = c8.price_mas.params;
					ei = [];
					for (ej = 0, eh = ek.length; ej < eh; ej++) {
						ec = ek[ej];
						ei.push(a2(eg, au, ec))
					}
					return ei
				})();
				ef[by] = (function() {
					var ej, eh, ek, ei;
					ek = c8.price_mas.params;
					ei = [];
					for (ej = 0, eh = ek.length; ej < eh; ej++) {
						ec = ek[ej];
						ei.push(aA(eg, au, ec))
					}
					return ei
				})();
				ef[dj] = (function() {
					var ej, eh, ek, ei;
					ek = c8.volume_mas.params;
					ei = [];
					for (ej = 0, eh = ek.length; ej < eh; ej++) {
						ec = ek[ej];
						ei.push(a2(eg, H, ec))
					}
					return ei
				})();
				ef[cC] = aI.apply(null, [eg, au].concat(n.call(c8.macd.params)));
				ef[c2] = aJ.apply(null, [eg, au].concat(n.call(c8.stoch_rsi.params)));
				ef[b5] = aW.apply(null, [eg, [a7, A, au]].concat(n.call(c8.kdj.params)));
				bA = cv[b6] = ef;
				return cj = true
			}
			function dy(d9) {
				return bM = d9
			}
			cD.resize(function() {
				if (bC) {
					dY()
				}
				return b1()
			});
			cY.hover(function() {
				return cY.height(320)
			}, function() {
				return cY.height(32)
			});
			cG.mousewheel(function(d9, ea) {
				if (ea > 0) {
					ck += 2
				} else {
					ck -= 2
				}
				if (ck < 3) {
					ck = 3
				}
				if (ck > 27) {
					ck = 27
				}
				bF = Math.round(ck * 0.2);
				if (bF < 3) {
					bF = 3
				}
				if (ck === 3) {
					bF = 2
				}
				cy = ck + bF;
				bN = (ck - 1) / 2;
				dx("barWidth", ck);
				dx("gapWidth", bF);
				dW();
				return false
			});
			$("#switch_theme").click(function() {
				var d9;
				d9 = $(this).text();
				$.cookie("theme", d9, {expires: 365, path: "/"});
				window.location.reload();
				return true
			});
			$("#close_ad").click(function() {
				bZ.hide();
				db = 0;
				dW();
				return true
			});
			$("#show_qr").click(function() {
				var d9;
				d9 = $("#qr");
				if (d9.is(":visible")) {
					$(this).text("Show QR Code");
					d9.hide()
				} else {
					$(this).text("Hide QR Code");
					d9.show()
				}
				return true
			});
			$("#close_qr").click(function() {
				$("#show_qr").text("Show QR Code");
				$("#qr").hide();
				return true
			});
			cx = $("#settings");
			$("#btn_settings").click(function() {
				if (cx.is(":visible")) {
					cx.hide()
				} else {
					cx.show()
				}
				return true
			});
			$("#close_settings").click(function() {
				if (cx.is(":visible")) {
					cx.hide()
				} else {
					cx.show()
				}
				return true
			});
			dP = function(eb, ea) {
				var ec, d9, eg, ee;
				ea.default_params = ea.params;
				ec = ea.cookie;
				d9 = $("input[name=" + eb + "]");
				d9.change(function() {
					var ei, ek, ej, eh;
					ek = [];
					for (ej = 0, eh = d9.length; ej < eh; ej++) {
						ei = d9[ej];
						b3 = $(ei).val();
						if (b3.match(/^\d+$/)) {
							ek.push(parseInt(b3))
						} else {
							if (eb === "price_mas" && b3 === "") {
								continue
							} else {
								alert(b3 + " is not integer.");
								return
							}
						}
					}
					$.cookie(ec, JSON.stringify(ek), {expires: 3650, path: "/"});
					c8[eb].params = ek;
					cv = {};
					cv[cd] = bR;
					return dU()
				});
				function ed() {
					var ek, ej, em, el, ei, eh;
					em = c8[eb].params;
					eh = [];
					for (ek = el = 0, ei = d9.length; el < ei; ek = ++el) {
						ej = d9[ek];
						eh.push($(ej).val(em[ek]))
					}
					return eh
				}
				$("#indicator_" + eb + " button").click(function() {
					c8[eb].params = c8[eb].default_params;
					ed();
					return $(d9[0]).change()
				});
				if (ee = $.cookie(ec)) {
					try {
						eg = JSON.parse(ee);
						c8[eb].params = eg
					} catch (ef) {
					}
				}
				return ed()
			};
			for (cB in c8) {
				if (!aH.call(c8, cB)) {
					continue
				}
				cV = c8[cB];
				dP(cB, cV)
			}
			function dO(d9) {
				return d9.toString().replace(/\.\d+/, "<g>$&</g>")
			}
			function d0(d9, eb) {
				var ee, ed, ea, ec;
				if (eb == null) {
					eb = "green"
				}
				if (eb === "green") {
					ee = "<i class=icon-arrow-up>"
				} else {
					ee = "<i class=icon-arrow-down>"
				}
				ec = d9[ae].toPrecision(7).substr(0, 7).split("."), ea = ec[0], ed = ec[1];
				if (ed != null) {
					ed = "." + ed
				} else {
					ed = ""
				}
				return'<tr>\n	<td class=t style="padding-left: 10px;">' + (L(new Date(d9[al] * 1000))) + "</td>\n	<td class=" + eb + ">" + (parseFloat(d9[a9].toFixed(6))) + "</td>\n	<td class=v>" + ea + "<g>" + ed + "</g></td>\n</tr>"
			}
			bY = true;
			function dH() {
				var ef, eh, ei, ek, el, ea, ec, eg, ej, ee, ed, eb, d9, en, em = [];
				bT.sort(function(ep, eo) {
					return eo[q] - ep[q]
				});
				//ec = ((ee = cZ[0].children[0]) != null ? ee.className : void 0) || "green";
				ec = "green";
				while (eg = bT.pop()) {
					if (eg[q] > bM) {
						bT.push(eg);
						break
					}
					el = ((ed = cM[0]) != null ? ed[a9] : void 0) || eg[a9];
					cM.unshift(eg);
					if (window.$market.toLowerCase().indexOf("bitstamp") === 0) {
						if (eg[a9] < el) {
							ec = "red"
						} else {
							if (eg[a9] > el) {
								ec = "green"
							}
						}
					} else {
						if (eg[bc] === "bid") {
							ec = "red"
						} else {
							if (eg[bc] === "ask") {
								ec = "green"
							}
						}
					}
					if (bY) {
						cZ.prepend($(d0(eg, ec)))
					} else {
						em.push($(d0(eg, ec)).height(0))
					}
				}
				(function(eq) {
					var ep = eq.shift(), eo = arguments;
					if (ep && !bY) {
						cZ.prepend(ep);
						ep.animate({height: 14}, 300, function() {
							eo.callee(eq)
						})
					}
				})(em);
				ea = cM.length - 1;
				ek = Math.min(100, ea);
				ej = bT;
				eh = [];
				if (el == null) {
					el = (eb = (d9 = cM[0]) != null ? d9[a9] : void 0) != null ? eb : (en = ej[0]) != null ? en[a9] : void 0
				}
				ei = ej.length;
				while (ei--) {
					eg = ej[ei];
					if (window.$market.toLowerCase().indexOf("bitstamp") === 0) {
						if (eg[a9] < el) {
							ec = "red"
						} else {
							if (eg[a9] > el) {
								ec = "green"
							}
						}
					} else {
						if (eg[bc] === "bid") {
							ec = "green"
						} else {
							if (eg[bc] === "ask") {
								ec = "red"
							}
						}
					}
					el = eg[a9];
					eh.push(d0(eg, ec))
				}
				cI.html(eh.reverse().join(""));
				while (cM.length > 200) {
					cM.pop()
				}
				//ef = cQ.children;
				ef = 0;
				while (ef.length > 200) {
					cQ.removeChild(ef[ef.length - 1])
				}
				if (cF = bT[0] || cM[0]) {
					bB.text(cF[a9].toString()).attr("class", ec);
					document.title = cF[a9] + currency_sign + " " + window.default_title;
					if (!bY) {
						W(cu, cF[a9])
					}
					bY = false
				}
				cj = true;
				return null
			}
			function dG(eb) {
				var d9, ea;
				ea = eb[0], d9 = eb[1];
				return"<div>" + (ea.toPrecision(7).substr(0, 6)) + " " + (d9.toPrecision(7).substr(0, 6)) + "</div>"
			}
			function dM(eb) {
				var d9, ea;
				ea = eb[0], d9 = eb[1];
				return"<div>" + (ea.toPrecision(7).substr(0, 6)) + " " + (d9.toPrecision(7).substr(0, 6)) + "</div>"
			}
			cS = 15;
			function dw() {
				var ee, eh, ef, eg, el, ek, eb, em, ej, ei, ed, ec, ea, d9;
				eb = cu;
				eh = eb[bf];
				eg = eb[az];
				eh = eh.slice(0, cS - 1);
				eg = eg.slice(-cS, -1);
				ds("asks", eh);
				ds("bids", eg);
				el = eb[aQ].slice(0, cS - 1);
				ej = [];
				em = 0;
				for (ed = 0, ea = el.length; ed < ea; ed++) {
					ee = el[ed];
					em += ee[1];
					ej.push([ee[0], em])
				}
				ds("gasks", ej);
				ek = eb[aB].slice(-cS, -1);
				ei = [];
				em = 0;
				ek.reverse();
				for (ec = 0, d9 = ek.length; ec < d9; ec++) {
					ef = ek[ec];
					em += ef[1];
					ei.push([ef[0], em])
				}
				ei.reverse();
				ds("gbids", ei);
				if (ej.length) {
					bu = ej[ej.length - 1][1]
				}
				if (ei.length) {
					cT = ei[0][1]
				}
				return null
			}
			function du(ee, eg, ei) {
				var ef, eh, ej, eb, ea, ed, d9, ec;
				if (ei == null) {
					ei = dG
				}
				ea = [[bk, ee], [cP, eg]];
				for (ed = 0, d9 = ea.length; ed < d9; ed++) {
					ec = ea[ed], eb = ec[0], eh = ec[1];
					ej = (function() {
						var em, ek, el;
						el = [];
						for (em = 0, ek = eh.length; em < ek; em++) {
							ef = eh[em];
							el.push(ei(ef))
						}
						return el
					})();
					eb.html(ej.join(""))
				}
				return null
			}
			function dL() {
				co[0].changed_at = 0;
				return co.text(0)
			}
			function dR(ea) {
				var d9;
				return d9 = ea.toPrecision(9).substr(0, 9).replace(/(.[^.])(0+)$/, "$1<g>$2</g>")
			}
			function dT(ea) {
				var d9;
				return d9 = ea.toPrecision(6).substr(0, 6).replace(/(.[^.])(0+)$/, "$1<g>$2</g>")
			}
			bI = {};
			bn = {};
			bV = null;
			bW = {};
			function d2(ej, ep) {
				var ek, ee, en, ed, eo, ei, ec, el, em, eg, eh, ef, ea, eb, d9;
				ek = cm[ej];
				eo = ej.indexOf("ask") !== -1;
				if (eo) {
					ep = ep
				} else {
					ep = ep.slice(-cS)
				}
				ee = en = ej[0] === "g";
				ep = (function() {
					var es, er, et, eq;
					eq = [];
					for (es = 0, er = ep.length; es < er; es++) {
						et = ep[es], eg = et[0], ef = et[1];
						eq.push([eg, ef])
					}
					return eq
				})();
				if (en) {
					ep.reverse();
					ep = (function() {
						var es, er, et, eq;
						eq = [];
						for (es = 0, er = ep.length; es < er; es++) {
							et = ep[es], eg = et[0], ef = et[1];
							ei = parseInt(eg);
							eh = (eg * b8).toFixed(dm);
							ef = Math.round(ef);
							ea = ef.toString();
							if (em === ei) {
								eh = eh.replace(/(\d+)\./, "<h>$&</h>")
							}
							em = ei;
							ea = ef;
							eq.push([eh, ea])
						}
						return eq
					})();
					ep.reverse()
				} else {
					ep.reverse();
					ep = (function() {
						var es, er, et, eq;
						eq = [];
						for (es = 0, er = ep.length; es < er; es++) {
							et = ep[es], eg = et[0], ef = et[1];
							ei = parseInt(eg);
							eh = dR(eg);
							ea = dT(ef);
							if (em === ei) {
								eh = eh.replace(/(\d+)\./, "<h>$&</h>")
							}
							em = ei;
							eq.push([eh, dO(ea)])
						}
						return eq
					})();
					ep.reverse()
				}
				if (eo) {
					ec = 0
				} else {
					ec = cS - ep.length;
					if (ec < 0) {
						ec = 0
					}
				}
				for (ed = eb = 0, d9 = cS - 1; 0 <= d9 ? eb <= d9 : eb >= d9; ed = 0 <= d9 ? ++eb : --eb) {
					b3 = ep[ed - ec];
					el = cS - 1 - ed;
					if (b3 != null) {
						eg = b3[0], ef = b3[1];
						ek[el].innerHTML = "" + eg + " " + ef
					} else {
						ek[el].innerHTML = "&nbsp;"
					}
				}
				return cj = true
			}
			bE = {};
			function ds(ee, ek) {
				var ef, eh, eo, ed, ec, el, em, ea, ei, ej, eg, ep, en, eb, eq, d9;
				eo = ee[0] === "g";
				eh = ee.indexOf("ask") !== -1;
				if (bE[ee] == null) {
					bE[ee] = {}
				}
				ei = bE[ee];
				em = $("#" + ee + "%20.table");
				ed = Date.now();
				ec = [];
				for (el in ei) {
					if (!aH.call(ei, el)) {
						continue
					}
					ej = ei[el];
					ec.push(parseFloat(el))
				}
				ek.reverse();
				ec.sort(function(es, er) {
					return er - es
				});
				eg = -1;
				ep = function(ex, ev) {
					var es, eu, ew, ey, ez, et, er;
					if (eo) {
						ey = (ex * b8).toFixed(dm);
						es = Math.round(ev)
					} else {
						ey = ex.toPrecision(9);
						es = ev.toPrecision(6).substr(0, 6)
					}
					ex = parseFloat(ey);
					ev = parseFloat(es);
					if (ei[ex]) {
						ez = ei[ex];
						if (!eo && ev !== ez.amount) {
							if (ev > ez.amount) {
								ez.ob_amount.css("color", "#6C6")
							} else {
								if (ev < ez.amount) {
									ez.ob_amount.css("color", "#F66")
								}
							}
							setTimeout(function() {
								return ez.ob_amount.css("color", "inherit")
							}, 1800)
						}
					} else {
						ez = $("<div class=row><span class=price></span> <span class=amount></span></div>");
						if (ec.length) {
							ez.addClass("new");
							setTimeout(function() {
								return ez.removeClass("new")
							}, 1800)
						}
						eu = false;
						for (et = 0, er = ec.length; et < er; et++) {
							ew = ec[et];
							if (ex > ew) {
								ei[ew].before(ez);
								eu = true;
								break
							}
						}
						if (!eu) {
							em.append(ez)
						}
						ei[ex] = ez;
						ez.ob_price = $(".price", ez);
						ez.ob_amount = $(".amount", ez)
					}
					if (!eo) {
						ey = dR(ex);
						es = dO(dT(ev))
					}
					if (eg === parseInt(ex)) {
						ey = ey.replace(/(\d+)\./, "<h>$&</h>")
					}
					ez.ob_amount.html(es);
					ez.ob_price.html(ey);
					eg = parseInt(ex);
					ez.price = ex;
					ez.amount = ev;
					return ez.found_at = ed
				};
				for (eb = 0, eq = ek.length; eb < eq; eb++) {
					d9 = ek[eb], el = d9[0], ef = d9[1];
					ep(el, ef)
				}
				en = function(er, es) {
					if (es.found_at < ed) {
						es.addClass("remove");
						es.removeClass("new");
						delete ei[er];
						return setTimeout(function() {
							return es.remove()
						}, 1800)
					}
				};
				for (el in ei) {
					if (!aH.call(ei, el)) {
						continue
					}
					ea = ei[el];
					en(el, ea)
				}
				ek.reverse();
				cj = true;
				return this
			}
			(function() {
				var eb = this;
				function ea() {
					if (true) {
						if (cj) {
							b2();
							cj = false
						}
						bg(80, function(ec) {
							ea(ec)
						})
					} else {
						d9()
					}
				}
				ea();
				function d9() {
					return null
				}}
			)();
			(function() {
				var eb = this;
				function ea() {
					if (true) {
						if (bi) {
							dH();
							$("#chart_trade_block").getNiceScroll().resize();
							bi = false
						}
						if (cw) {
							dw();
							cw = false
						}
						bg(120, function(ec) {
							ea(ec)
						})
					} else {
						d9()
					}
				}
				ea();
				function d9() {
					return null
				}}
			)();
			(function() {
				$("#main").show();
				return $("#footer").show()
			})();
			dW();
			function dK() {
				var ea;
				if (true) {
					b6 = parseInt((ea = $.cookie("step")) != null ? ea : 900);
					dQ(b6, function() {
						d9((ch = arguments[0], b9 = arguments[1], ch))
					});
					function d9(eb) {
						if (eb) {
							bj("retry after 5 seconds");
							bg(5000, function(ec) {
								dK(ec)
							})
						} else {
							dg[b6].addClass("selected");
							cq = dg[b6];
							return dS()
						}
					}}
				else {
					dS()
				}
			}
			dK();
			function dS() {
				dy(aj(O(bA[B], J)));
				b4 = 10000;
				bj("Initialize Depth Digger");
				c6 = true;
				(function(ea) {
					ea = aa("Depth");
					(function() {
						var el, ek, ei, en, ef, eb, ej, ed, eh, ep, eg, eo, em = this;
						eh = "https://data.mtgox.com/api/1/" + cb + "/depth/fetch?";
						ep = "http://" + $host + ":" + $port + "/depth?symbol=" + $symbol + "&sid=" + $sid;
						eh = ep;
						ed = "";
						function ee() {
							if (true) {
								a1(eh, function() {
									ch = arguments[0], b9 = arguments[1];
									if (ch) {
										ea("fetch depth failed");
										bg(15000, function() {
											return ee();
											eq()
										})
									} else {
										eq()
									}
									function eq() {
										var ex, ev, et, es, er, ey, ew, eu;
										if (b9 != null ? b9["return"] : void 0) {
											eh = ep;
											ew = b9["return"], el = ew.asks, ek = ew.bids, eg = ew.time, eb = ew.now;
											ei = JSON.stringify(b9["return"]);
											if (ed !== ei) {
												dL();
												ed = ei
											}
											ej = [["ask", el], ["bid", ek]];
											S(cu);
											for (ex = 0, es = ej.length; ex < es; ex++) {
												eu = ej[ex], cB = eu[0], eo = eu[1];
												for (ev = 0, er = eo.length; ev < er; ev++) {
													b3 = eo[ev];
													b3[2] = cB;
													a6(cu, b3)
												}
											}
											ef = 0;
											en = parseInt(eg);
											while ((b3 = c0[0]) && parseInt(b3[3]) < en) {
												++ef;
												c0.shift()
											}
											ea.d("remove " + ef + " depth");
											for (et = 0, ey = c0.length; et < ey; et++) {
												b3 = c0[et];
												a6(cu, b3)
											}
											ea.d("apply " + c0.length + " depth");
											ea.d("load " + el.length + " asks and " + ek.length + " bids");
											dn = eb;
											cw = true
										}
										if (bU) {
											bg(60000, function(ez) {
												ee(ez)
											})
										} else {
											bg(15000, function(ez) {
												ee(ez)
											})
										}
									}}
								)
							} else {
								ec()
							}
						}
						function ec() {
							return null
						}}
					)();
					return null
				})(bj);
				(function() {
					var ef, ee, eb, eg, ea, ed, ec, ei, eh = this;
					if (bL === "MtGox") {
						return
					}
					bg(5000, function() {
						function ej() {
							if (true) {
								if (bU) {
									bg(1000, function() {
										return ej();
										el()
									})
								} else {
								}
								function el() {
									ec = "http://" + $host + ":" + $port + "/sdepth?symbol=" + $symbol + "&sid=" + $sid + "&now=" + dn;
									a1(ec, function() {
										ch = arguments[0], b9 = arguments[1];
										if (ch) {
											bg(1000, function() {
												return ej();
												em()
											})
										} else {
											em()
										}
										function em() {
											var es, eq, eo, en, er, ep;
											if (b9 != null ? b9["return"] : void 0) {
												bj.d("sdepth");
												er = b9["return"], ef = er.asks, ee = er.bids, ea = er.now;
												if (ef.length) {
													eb = ef[ef.length - 1][0];
													W(cu, eb)
												}
												if (ee.length) {
													eg = ee[0][0];
													W(cu, eg)
												}
												ed = [["ask", ef], ["bid", ee]];
												for (es = 0, eo = ed.length; es < eo; es++) {
													ep = ed[es], cB = ep[0], ei = ep[1];
													for (eq = 0, en = ei.length; eq < en; eq++) {
														b3 = ei[eq];
														b3[2] = cB;
														a6(cu, b3)
													}
												}
												dL();
												dn = ea;
												cw = true
											}
											bg(1000, function(et) {
												ej(et)
											})
										}}
									)
								}}
							else {
								ek()
							}
						}
						ej();
						function ek() {
							return null
						}}
					)
				})();
				if ($test) {
					return
				}
				function d9(eb) {
					var ec, ea, ed = this;
					bj("get history trades");
					a1($host + "index/index/trades/", {symbol: $symbol, last: 0}, function() {
						var eg, ee, ef;
						ch = arguments[0], b9 = arguments[1];
						if (ch) {
							bj(ch);
							return eb()
						}
						ef = b9.reverse();
						for (eg = 0, ee = ef.length; eg < ee; eg++) {
							ec = ef[eg];
							if (ec.tid <= bM) {
								ea = ba(ec);
								bT.push(ea)
							}
						}
						bi = true;
						eb(ed)
					})
				}
				bj("Initialize FullSync System");
				cO = false;
				(dr = function(ec) {
					var eg, ed, eb, ee, ea, ef = this;
					ec = aa("FullSync");
					d9(function() {
						function ei() {
							if (true) {
								eg = "";
								a1($host + "index/index/trades/", {symbol: $symbol, last: bM}, function() {
									ch = arguments[0], b9 = arguments[1];
									if (ch) {
										bg(b4, function() {
											return ei();
											ej()
										})
									} else {
										ej()
									}
									function ej() {
										var el;
										ed = (function() {
											var ep, en, eo, em;
											eo = b9.reverse();
											em = [];
											for (ep = 0, en = eo.length; ep < en; ep++) {
												el = eo[ep];
												el.price = el.price;
												el.amount = el.amount;
												el.price_currency = bS;
												em.push(el)
											}
											return em
										})();
										b9 = {result: "success", "return": ed};
										if (b9.result !== "success") {
											ec("failed, " + b9.error)
										}
										ed = b9["return"];
										if (ed.length === 0) {
											bg(b4, function() {
												return ei();
												ek()
											})
										} else {
											ek()
										}
										function ek() {
											var em;
											em = dV(ed), ee = em[0], eb = em[1];
											if (eb > 0) {
												co[0].changed_at = 0;
												if (bU) {
													ec("found " + eb + " missed trade" + (eb > 1 ? "s" : "") + eg)
												} else {
													ec("found " + eb + " trade" + (eb > 1 ? "s" : "") + eg)
												}
											}
											if (ee) {
												dy(ee);
												while ((ea = bQ[0]) && ea[aG] < Date.now() - 30 * 1000) {
													delete bD[ea[q]];
													bQ.shift()
												}
												bi = true
											}
											bg(b4, function(en) {
												ei(en)
											})
										}}
								}
								)
							} else {
								eh()
							}
						}
						ei();
						function eh() {
							return null
						}}
					)
				})(bj);
				if (bU) {
					bj("Initialize Real-time System");
					(function(ed) {
						var ec, ea, eb;
						ed = aa("Realtime");
						eb = "../../../https@socketio.mtgox.com\mtgox@currency=" + bS;
						eb = "wss_3a//websocket.mtgox.com@currency=" + bS;
						(ea = function() {
							var ee;
							ee = new WebSocket(eb);
							ee.dead = false;
							ee.onmessage = function(ef) {
								var el, ek, en, em, ej, eh, eg, ei;
								if (ee != null ? ee.dead : void 0) {
									return
								}
								try {
									el = JSON.parse(ef.data);
									switch (el.op) {
										case"remark":
											if (el.message === "Now online (no channels)") {
												eg = ["trades", "depth"];
												ei = [];
												for (ej = 0, eh = eg.length; ej < eh; ej++) {
													em = eg[ej];
													ei.push(ee.send(JSON.stringify({op: "mtgox.subscribe", type: em})))
												}
												return ei
											}
											break;
										case"private":
											c5 = Date.now();
											co[0].changed_at = 0;
											switch (el.channel_name) {
												case"depth." + cb:
													while (c0.length > 900) {
														c0.shift()
													}
													ek = el.depth;
													en = [parseFloat(ek.price), parseInt(ek.total_volume_int) / 100000000, ek.type_str, parseInt(ek.now)];
													c0.push(en);
													a6(cu, en);
													return cw = true;
												case"trade.btc":
													dV([el.trade]);
													return bi = true
												}
										}
								} catch (eo) {
									ch = eo;
									return ec(ee)
								}
							};
							return ee.onerror = function(ef) {
								return ec(ee)
							}
						})();
						return ec = function(ee) {
							var ef = this;
							ee.dead = true;
							ee.close();
							ee = null;
							bg(5000, function() {
								return ea()
							})
						}
					})(bj)
				} else {
					bj("<b>Realtime System only works on IE 10+, chrome, FF</b>")
				}
				(function() {
					var ec = this;
					function eb() {
						if (true) {
							bg(1000, function() {
								eb(co.text(co[0].changed_at++))
							})
						} else {
							ea()
						}
					}
					eb();
					function ea() {
						return null
					}}
				)();
				(function() {
					var ec, ea, ee = this;
					ea = $("#now");
					function ed() {
						if (true) {
							bg(1000, function() {
								ec = new Date();
								ed(ea.text(ac(ec)))
							})
						} else {
							eb()
						}
					}
					ed();
					function eb() {
						return null
					}}
				)();
				cY.click(function() {
					try {
						bj("------");
						if (bQ.length) {
							bj("cached txes length: " + bQ.length + ", first is " + (L(new Date(bQ[0][al] * 1000))))
						}
						bj("sorted txes length: " + cM.length);
						bj("last tid: " + bM + " " + (L(new Date(bM / 1000))));
						if (c0.length) {
							bj("depth cache length " + c0.length + ", first is " + (L(new Date(parseInt(c0[0].now) / 1000))))
						}
						bj("depth ask length " + (cu[bf].size()));
						bj("depth bid length " + (cu[az].size()));
						bj("realtime active at " + (L(new Date(c5))));
						bj("-- STATUS --")
					} catch (ea) {
						ch = ea;
						bj(ch.message)
					}
					return true
				});
				return dQ(cA, function() {
					return d6()
				})
			}}
		)
	})()
}).call(this);
/*!
 * jQuery Cookie Plugin v1.3.1
 * https://github.com/carhartl/jquery-cookie
 *
 * Copyright 2013 Klaus Hartl
 * Released under the MIT license
 */
(function(a){if(typeof define==="function"&&define.amd){define(["jquery"],a)}else{a(jQuery)}}(function(e){var a=/\+/g;function d(g){return g}function b(g){return decodeURIComponent(g.replace(a," "))}function f(g){if(g.indexOf('"')===0){g=g.slice(1,-1).replace(/\\"/g,'"').replace(/\\\\/g,"\\")}try{return c.json?JSON.parse(g):g}catch(h){}}var c=e.cookie=function(q,p,v){if(p!==undefined){v=e.extend({},c.defaults,v);if(typeof v.expires==="number"){var r=v.expires,u=v.expires=new Date();u.setDate(u.getDate()+r)}p=c.json?JSON.stringify(p):String(p);return(document.cookie=[c.raw?q:encodeURIComponent(q),"=",c.raw?p:encodeURIComponent(p),v.expires?"; expires="+v.expires.toUTCString():"",v.path?"; path="+v.path:"",v.domain?"; domain="+v.domain:"",v.secure?"; secure":""].join(""))}var g=c.raw?d:b;var s=document.cookie.split("; ");var w=q?undefined:{};for(var n=0,k=s.length;n<k;n++){var m=s[n].split("=");var h=g(m.shift());var j=g(m.join("="));if(q&&q===h){w=f(j);break}if(!q){w[h]=f(j)}}return w};c.defaults={};e.removeCookie=function(h,g){if(e.cookie(h)!==undefined){e.cookie(h,"",e.extend({},g,{expires:-1}));return true}return false}}));
/*!
 * jQuery Color Animations v@VERSION
 * https://github.com/jquery/jquery-color
 *
 * Copyright 2013 jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * Date: @DATE
 */
(function(p,d){var k="backgroundColor borderBottomColor borderLeftColor borderRightColor borderTopColor color columnRuleColor outlineColor textDecorationColor textEmphasisColor",h=/^([\-+])=\s*(\d+\.?\d*)/,g=[{re:/rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,parse:function(q){return[q[1],q[2],q[3],q[4]]}},{re:/rgba?\(\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,parse:function(q){return[q[1]*2.55,q[2]*2.55,q[3]*2.55,q[4]]}},{re:/#([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})/,parse:function(q){return[parseInt(q[1],16),parseInt(q[2],16),parseInt(q[3],16)]}},{re:/#([a-f0-9])([a-f0-9])([a-f0-9])/,parse:function(q){return[parseInt(q[1]+q[1],16),parseInt(q[2]+q[2],16),parseInt(q[3]+q[3],16)]}},{re:/hsla?\(\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,space:"hsla",parse:function(q){return[q[1],q[2]/100,q[3]/100,q[4]]}}],e=p.Color=function(r,s,q,t){return new p.Color.fn.parse(r,s,q,t)},j={rgba:{props:{red:{idx:0,type:"byte"},green:{idx:1,type:"byte"},blue:{idx:2,type:"byte"}}},hsla:{props:{hue:{idx:0,type:"degrees"},saturation:{idx:1,type:"percent"},lightness:{idx:2,type:"percent"}}}},n={"byte":{floor:true,max:255},percent:{max:1},degrees:{mod:360,floor:true}},m=e.support={},b=p("<p>")[0],a,l=p.each;b.style.cssText="background-color:rgba(1,1,1,.5)";m.rgba=b.style.backgroundColor.indexOf("rgba")>-1;l(j,function(q,r){r.cache="_"+q;r.props.alpha={idx:3,type:"percent",def:1}});function i(r,t,s){var q=n[t.type]||{};if(r==null){return(s||!t.def)?null:t.def}r=q.floor?~~r:parseFloat(r);if(isNaN(r)){return t.def}if(q.mod){return(r+q.mod)%q.mod}return 0>r?0:q.max<r?q.max:r}function f(q){var s=e(),r=s._rgba=[];q=q.toLowerCase();l(g,function(x,y){var v,w=y.re.exec(q),u=w&&y.parse(w),t=y.space||"rgba";if(u){v=s[t](u);s[j[t].cache]=v[j[t].cache];r=s._rgba=v._rgba;return false}});if(r.length){if(r.join()==="0,0,0,0"){p.extend(r,a.transparent)}return s}return a[q]}e.fn=p.extend(e.prototype,{parse:function(w,u,q,v){if(w===d){this._rgba=[null,null,null,null];return this}if(w.jquery||w.nodeType){w=p(w).css(u);u=d}var t=this,s=p.type(w),r=this._rgba=[];if(u!==d){w=[w,u,q,v];s="array"}if(s==="string"){return this.parse(f(w)||a._default)}if(s==="array"){l(j.rgba.props,function(x,y){r[y.idx]=i(w[y.idx],y)});return this}if(s==="object"){if(w instanceof e){l(j,function(x,y){if(w[y.cache]){t[y.cache]=w[y.cache].slice()}})}else{l(j,function(y,z){var x=z.cache;l(z.props,function(A,B){if(!t[x]&&z.to){if(A==="alpha"||w[A]==null){return}t[x]=z.to(t._rgba)}t[x][B.idx]=i(w[A],B,true)});if(t[x]&&p.inArray(null,t[x].slice(0,3))<0){t[x][3]=1;if(z.from){t._rgba=z.from(t[x])}}})}return this}},is:function(s){var q=e(s),t=true,r=this;l(j,function(u,w){var x,v=q[w.cache];if(v){x=r[w.cache]||w.to&&w.to(r._rgba)||[];l(w.props,function(y,z){if(v[z.idx]!=null){t=(v[z.idx]===x[z.idx]);return t}})}return t});return t},_space:function(){var q=[],r=this;l(j,function(s,t){if(r[t.cache]){q.push(s)}});return q.pop()},transition:function(r,x){var s=e(r),t=s._space(),u=j[t],v=this.alpha()===0?e("transparent"):this,w=v[u.cache]||u.to(v._rgba),q=w.slice();s=s[u.cache];l(u.props,function(B,D){var A=D.idx,z=w[A],y=s[A],C=n[D.type]||{};if(y===null){return}if(z===null){q[A]=y}else{if(C.mod){if(y-z>C.mod/2){z+=C.mod}else{if(z-y>C.mod/2){z-=C.mod}}}q[A]=i((y-z)*x+z,D)}});return this[t](q)},blend:function(t){if(this._rgba[3]===1){return this}var s=this._rgba.slice(),r=s.pop(),q=e(t)._rgba;return e(p.map(s,function(u,w){return(1-r)*q[w]+r*u}))},toRgbaString:function(){var r="rgba(",q=p.map(this._rgba,function(s,t){return s==null?(t>2?1:0):s});if(q[3]===1){q.pop();r="rgb("}return r+q.join()+")"},toHslaString:function(){var r="hsla(",q=p.map(this.hsla(),function(s,t){if(s==null){s=t>2?1:0}if(t&&t<3){s=Math.round(s*100)+"%"}return s});if(q[3]===1){q.pop();r="hsl("}return r+q.join()+")"},toHexString:function(q){var r=this._rgba.slice(),s=r.pop();if(q){r.push(~~(s*255))}return"#"+p.map(r,function(t){t=(t||0).toString(16);return t.length===1?"0"+t:t}).join("")},toString:function(){return this._rgba[3]===0?"transparent":this.toRgbaString()}});e.fn.parse.prototype=e.fn;function c(t,s,r){r=(r+1)%1;if(r*6<1){return t+(s-t)*r*6}if(r*2<1){return s}if(r*3<2){return t+(s-t)*((2/3)-r)*6}return t}j.hsla.to=function(u){if(u[0]==null||u[1]==null||u[2]==null){return[null,null,null,u[3]]}var q=u[0]/255,x=u[1]/255,y=u[2]/255,A=u[3],z=Math.max(q,x,y),v=Math.min(q,x,y),B=z-v,C=z+v,t=C*0.5,w,D;if(v===z){w=0}else{if(q===z){w=(60*(x-y)/B)+360}else{if(x===z){w=(60*(y-q)/B)+120}else{w=(60*(q-x)/B)+240}}}if(B===0){D=0}else{if(t<=0.5){D=B/C}else{D=B/(2-C)}}return[Math.round(w)%360,D,t,A==null?1:A]};j.hsla.from=function(w){if(w[0]==null||w[1]==null||w[2]==null){return[null,null,null,w[3]]}var v=w[0]/360,u=w[1],t=w[2],r=w[3],x=t<=0.5?t*(1+u):t+u-t*u,y=2*t-x;return[Math.round(c(y,x,v+(1/3))*255),Math.round(c(y,x,v)*255),Math.round(c(y,x,v-(1/3))*255),r]};l(j,function(r,t){var s=t.props,q=t.cache,v=t.to,u=t.from;e.fn[r]=function(A){if(v&&!this[q]){this[q]=v(this._rgba)}if(A===d){return this[q].slice()}var x,z=p.type(A),w=(z==="array"||z==="object")?A:arguments,y=this[q].slice();l(s,function(B,D){var C=w[z==="object"?B:D.idx];if(C==null){C=y[D.idx]}y[D.idx]=i(C,D)});if(u){x=e(u(y));x[q]=y;return x}else{return e(y)}};l(s,function(w,x){if(e.fn[w]){return}e.fn[w]=function(B){var D=p.type(B),A=(w==="alpha"?(this._hsla?"hsla":"rgba"):r),z=this[A](),C=z[x.idx],y;if(D==="undefined"){return C}if(D==="function"){B=B.call(this,C);D=p.type(B)}if(B==null&&x.empty){return this}if(D==="string"){y=h.exec(B);if(y){B=C+parseFloat(y[2])*(y[1]==="+"?1:-1)}}z[x.idx]=B;return this[A](z)}})});e.hook=function(r){var q=r.split(" ");l(q,function(s,t){p.cssHooks[t]={set:function(x,y){var v,w,u="";if(y!=="transparent"&&(p.type(y)!=="string"||(v=f(y)))){y=e(v||y);if(!m.rgba&&y._rgba[3]!==1){w=t==="backgroundColor"?x.parentNode:x;while((u===""||u==="transparent")&&w&&w.style){try{u=p.css(w,"backgroundColor");w=w.parentNode}catch(z){}}y=y.blend(u&&u!=="transparent"?u:"_default")}y=y.toRgbaString()}try{x.style[t]=y}catch(z){}}};p.fx.step[t]=function(u){if(!u.colorInit){u.start=e(u.elem,t);u.end=e(u.end);u.colorInit=true}p.cssHooks[t].set(u.elem,u.start.transition(u.end,u.pos))}})};e.hook(k);p.cssHooks.borderColor={expand:function(r){var q={};l(["Top","Right","Bottom","Left"],function(t,s){q["border"+s+"Color"]=r});return q}};a=p.Color.names={aqua:"#00ffff",black:"#000000",blue:"#0000ff",fuchsia:"#ff00ff",gray:"#808080",green:"#008000",lime:"#00ff00",maroon:"#800000",navy:"#000080",olive:"#808000",purple:"#800080",red:"#ff0000",silver:"#c0c0c0",teal:"#008080",white:"#ffffff",yellow:"#ffff00",transparent:[null,null,null,0],_default:"#ffffff"}}(jQuery));
/*! Copyright (c) 2013 Brandon Aaron (http://brandonaaron.net)
 * Licensed under the MIT License (LICENSE.txt).
 *
 * Thanks to: http://adomas.org/javascript-mouse-wheel/ for some pointers.
 * Thanks to: Mathias Bank(http://www.mathias-bank.de) for a scope bug fix.
 * Thanks to: Seamus Leahy for adding deltaX and deltaY
 *
 * Version: 3.1.3
 *
 * Requires: 1.2.2+
 */
(function(a) {
	if (typeof define === "function" && define.amd) {
		define(["jquery"], a)
	} else {
		if (typeof exports === "object") {
			module.exports = a
		} else {
			a(jQuery)
		}
	}
}(function(e) {
	var d = ["wheel", "mousewheel", "DOMMouseScroll", "MozMousePixelScroll"];
	var g = "onwheel" in document || document.documentMode >= 9 ? ["wheel"] : ["mousewheel", "DomMouseScroll", "MozMousePixelScroll"];
	var f, a;
	if (e.event.fixHooks) {
		for (var b = d.length; b; ) {
			e.event.fixHooks[d[--b]] = e.event.mouseHooks
		}
	}
	e.event.special.mousewheel = {setup: function() {
			if (this.addEventListener) {
				for (var h = g.length; h; ) {
					this.addEventListener(g[--h], c, false)
				}
			} else {
				this.onmousewheel = c
			}
		}, teardown: function() {
			if (this.removeEventListener) {
				for (var h = g.length; h; ) {
					this.removeEventListener(g[--h], c, false)
				}
			} else {
				this.onmousewheel = null
			}
		}};
	e.fn.extend({mousewheel: function(h) {
			return h ? this.bind("mousewheel", h) : this.trigger("mousewheel")
		}, unmousewheel: function(h) {
			return this.unbind("mousewheel", h)
		}});
	function c(h) {
		var i = h || window.event, n = [].slice.call(arguments, 1), q = 0, k = 0, j = 0, m = 0, l = 0, p;
		h = e.event.fix(i);
		h.type = "mousewheel";
		if (i.wheelDelta) {
			q = i.wheelDelta
		}
		if (i.detail) {
			q = i.detail * -1
		}
		if (i.deltaY) {
			j = i.deltaY * -1;
			q = j
		}
		if (i.deltaX) {
			k = i.deltaX;
			q = k * -1
		}
		if (i.wheelDeltaY !== undefined) {
			j = i.wheelDeltaY
		}
		if (i.wheelDeltaX !== undefined) {
			k = i.wheelDeltaX * -1
		}
		m = Math.abs(q);
		if (!f || m < f) {
			f = m
		}
		l = Math.max(Math.abs(j), Math.abs(k));
		if (!a || l < a) {
			a = l
		}
		p = q > 0 ? "floor" : "ceil";
		q = Math[p](q / f);
		k = Math[p](k / a);
		j = Math[p](j / a);
		n.unshift(h, q, k, j);
		return(e.event.dispatch || e.event.handle).apply(this, n)
	}}
));
