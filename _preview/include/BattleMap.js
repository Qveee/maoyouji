//得到DOM对象元素函数
function $(element) {
	//try {
		var el = petWin.document.all(element);
		/*if (el == null) {
			el = document.all(element);
			if (el == null) {
				el = petWin.document.getElementById(element);
				if (el == null) {
					el = document.getElementById(element);
				}
			}
		}*/
		return el;
	//} catch(e) {
	//	alert("$:" + e);
	//	return null;
	//}
}

//删除DOM对象
function $R(element) {
	//try {
		element.parentNode.removeChild(element);
	//} catch(e) {
	//	alert("$R:" + e);
	//}
}

//隐藏DOM对象
function $H(element) {
	//try {
		//element.style.visibility = "hidden";
		element.style.display = "none";
	//} catch(e) {
	//	alert("$H:" + e);
	//}
}

//显示DOM对象
function $S(element) {
	//try {
		element.style.display = "";
		//element.style.visibility = "visible";
	//} catch(e) {
	//	alert("$S:" + e);
	//}
}

//输出debug信息
function outputDebugMsg(msg) {
	var dbg = document.all("testdebug");
	if (dbg) {
		dbg.innerHTML += msg + "<br>";
	}
}

//清除debug信息
function clearDebugMsg(msg) {
	var dbg = document.all("testdebug");
	if (dbg) {
		dbg.innerHTML = "";
	}
}

//各种位置常量
BMInfoL = [7, 416];	//角色信息栏Left
BMInfoT = [45, 45];	//角色信息栏Top
BMStatusL = [144, 444];		//角色状态栏Left
BMStatusT = [100, 100];		//角色状态栏Top
BMImageL = [165, 358];	//角色图片Left
BMImageB = [155, 155];	//角色图片Bottom
BMTaskL = [30, 440];	//角色图标栏Left
BMTaskT = [100, 100];	//角色图标栏Top
BMCastL = [238, 300];	//角色施法条Left
BMCastT = [210, 210];	//角色施法条Top

//全局变量
BMAnimList = [];	//动画列表 (每项保存数据 [角色id, 结束是否删除, 外部区域id, 动画区域id, 初始x, 初始y, 初始o, 当前x, 当前y, 当前o, 步长x, 步长y, 步长o, 过期时间])
BMCastList = [];	//施法列表 (每项保存数据 [角色id, 步长w, 过期时间])
BMAnimTimer = null;		//动画循环
BMAnimInt = 100;	//动画帧间隔 (ms)
BMAnimIndex = 0;	//动画编号
BMBuffList = [];	//Buff列表 (每项保存数据 [角色id, 缓冲idx, buff名, 过期时间])
BMOnBattle = false;		//战斗中标志

//创建地图
function bmCreateMap(src) {
	try {
		//清除数据
		bmClearMap();
		
		//生成地图代码
		var tmpstr = "";
			
		//背景图片
		if (src != null && "" != src && _getCombatPic() > 0) {
			tmpstr += "<img src=\"img/blank.gif\" width=\"615\" height=\"385\" style=\"margin-left:3px;filter:alpha(opacity=" + _getCombatPic() + ");\" onload=\"p.cachePic(this,'" + src + "');\">";
		}
		
		//右下方逃跑按钮
		tmpstr += "<INPUT TYPE=\"button\" value=\"逃跑\" style=\"position:absolute; left:545px; top:329px; visibility:visible; z-index:15; font-size:9pt; padding-top:2px; padding-left:2px; background-color:#5AA2BA; border:0px solid #FFFFFF; cursor:hand; color:#E9F2F5;\" onclick=\"p.cmd('tao'); return false;\" hidefocus=\"true\">";
		
		//右下方返回按钮
		tmpstr += "<INPUT TYPE=\"button\" value=\"返回\" style=\"position:absolute; left:580px; top:329px; visibility:visible; z-index:15; font-size:9pt; padding-top:2px; padding-left:2px; background-color:#5AA2BA; border:0px solid #FFFFFF; cursor:hand; color:#E9F2F5;\" onclick=\"p.backCJ(); return false;\" hidefocus=\"true\">";
		
		//将地图加入场景
		getOutReader().insertAdjacentHTML("beforeend", tmpstr);
		
		//设置下一次更新
		BMAnimTimer = setTimeout("bmMainLoop()", BMAnimInt);
		
		BMOnBattle = true;
	} catch(e) {
		//alert("bmCreateMap:" + e);
	}
}

//清除地图
function bmClearMap() {
	BMOnBattle = false;
	
	if (BMAnimTimer) {
		clearTimeout(BMAnimTimer);
	}
	
	for (var i = 0; i < BMAnimList.length; i ++) {
		BMAnimList[i] = null;
	}
	BMAnimList = null;
	BMAnimList = [];
	
	for (var i = 0; i < BMCastList.length; i ++) {
		BMCastList[i] = null;
	}
	BMCastList = null;
	BMCastList = [];
	
	for (var i = 0; i < BMBuffList.length; i ++) {
		BMBuffList[i] = null;
	}
	BMBuffList = null;
	BMBuffList = [];
	
	BMAnimIndex = 0;
}

//创建角色 (角色图片、状态栏、施法条、图标栏。参数type为角色类型，0:玩家，1:怪物)
function bmCreateChar(id, name, lv, hp, maxhp, hpwidth, sp, maxsp, spwidth, imgsrc, type) {
	try {
		if (BMOnBattle) {
			if (type >= 0 && type <= 1) {
				var tmpflip = "";
				if (type == 0) {
					tmpflip = "filter:fliph;";
				}
				
				//生成角色代码
				var tmpstr = "";
				
				//创建角色图片
				tmpstr += "<div id=\"BM" + id + "\" name=\"BM" + id + "\" otype=\"" + type + "\" oleft=\"" + BMImageL[type] + "\" obottom=\"" + BMImageB[type] + "\" style=\"position:absolute; width:200px; height:200px; left:" + BMImageL[type] + "px; bottom:" + BMImageB[type] + "px; z-index:10;\"><img src=\"" + imgsrc + "\" style=\"" + tmpflip + " position:absolute; left:0px; bottom:0px;\" id=\"BM" + id + "img\" name=\"BM" + id + "img\"></div>";
				
				//创建信息栏
				tmpstr += "<div style=\"height:65px; width:200px; position:absolute; left:" + BMInfoL[type] + "px; top:" + BMInfoT[type] + "px; visibility:visible; z-index:7; background-color:#74B8C8; padding:5px 10px; filter:alpha(opacity=60);\"></div>"
				+ "<div style=\"height:75px; width:200px; position:absolute; left:" + BMInfoL[type] + "px; top:" + BMInfoT[type] + "px; z-index:8; padding:5px 10px;\">"
				+ " " + name + "  等级:" + lv + "<br>"
				+ " <table border='0' cellpadding='0' cellspacing='0'><tr>"
				+ "  <td width=20><b><font color='#004E5E' face=arial>HP</font></b></td>"
				+ "  <td width=3></td>"
				+ "  <td width=92>"
				+ "   <table width='92' border='0' cellpadding='0' cellspacing='1' bgcolor=#4797B2><tr>"
				+ "    <td width='100%' bgcolor=#247410 width=90>"
				+ "     <table style='width:" + hpwidth + "px; height:10px;' bgcolor='#89E773' id='BM" + id + "hp' name='BM" + id + "hp'  border='0' cellpadding='0' cellspacing='0'><tr><td></td></tr></table>"
				+ "    </td>"
				+ "   </tr></table>"
				+ "  </td>"
				+ "  <td width=5></td>"
				+ "	 <td align=left><font face=arial style='font-size:7.5pt;'><span id='BM" + id + "hpno' name='BM" + id + "hpno'>" + hp + "</span>/" + maxhp + "</font></td>"
				+ "	</table>"
				+ " <table border='0' cellpadding='0' cellspacing='0'><tr>"
				+ "	 <td width=20><b><font color='#004E5E' face=arial>SP</font></b></td>"
				+ "	 <td width=3></td>"
				+ "	 <td width=92>"
				+ "   <table width='92' border='0' cellpadding='0' cellspacing='1' bgcolor=#4797B2><tr>"
				+ "    <td width='100%' bgcolor=#035B9C width=90>"
				+ "     <table style='width:" + spwidth + "px; height:10;px' bgcolor=#63B2FF id='BM" + id + "sp' name='BM" + id + "sp'  border='0' cellpadding='0' cellspacing='0'><tr><td></td></tr></table>"
				+ "    </td>"
				+ "   </tr></table>"
				+ "	 </td>"
				+ "	 <td width=5></td>"
				+ "	 <td align=left><font face=arial style='font-size:7.5pt;'><span id='BM" + id + "spno' name='BM" + id + "spno'>" + sp + "</span>/" + maxsp + "</font></td>"
				+ "	</table>"
				+ "</div>";
				
				//创建施法条
				tmpstr += "<div id=\"BM" + id + "cast\" name=\"BM" + id + "cast\" style=\"display:none; position:absolute; left:" + BMCastL[type] + "px; top:" + BMCastT[type] + "px; z-index:9999;\">"
				+ "<span id=\"BM" + id + "castname\" name=\"BM" + id + "castname\"></span>"
				+ " <table width=\"200\" bgcolor=\"aaaaaa\" height=\"8\" cellpadding=\"0\" cellspacing=\"0\">"
				+ "  <tr><td>"
				+ "   <table id=\"BM" + id + "castbar\" name=\"BM" + id + "castbar\" bgcolor=\"red\" width=\"1\" bgcolor=\"aaaaaa\" height=\"8\" cellpadding=\"0\" cellspacing=\"0\">"
				+ "    <tr><td></td></tr>"
				+ "   </table>"
				+ "  </td></tr>"
				+ " </table>"
				+ "</div>";
				
				//创建图标栏
				tmpstr += "<img src=\"img/blank.gif\" id=\"BM" + id + "task\" name=\"BM" + id + "task\" style=\"position:absolute; left:" + BMTaskL[type] + "px; top:" + BMTaskT[type] + "px; z-index:15;\">";
				
				//创建状态栏
				tmpstr += "<span id=\"BM" + id + "status\" name=\"BM" + id + "_status\" style=\"position:absolute; left:" + BMStatusL[type] + "px; top:" + BMStatusT[type] + "px; z-index:11; color:#FF0000; font-size:9pt;\"></span>";
				
				//加入场景
				getOutReader().insertAdjacentHTML("beforeend", tmpstr);
			}
		}
	} catch(e) {
		//alert("bmCreateChar:" + e);
	}
}

//主循环
function bmMainLoop() {
	try {
		if (BMAnimTimer) {
			clearTimeout(BMAnimTimer);
		}
		
		if (BMOnBattle) {
			//outputDebugMsg("bmMainLoop:" + BMAnimList.length + "," + BMCastList.length);
			var i = 0;
			
			//循环更新动画列表中各对象
			while(i < BMAnimList.length) {
				var tmp = BMAnimList[i];
				var now = getNow();
				if (tmp[13] > now) {		//当前动画未到期
					var tmpaid = $(tmp[3]);
					//if (tmpaid) {		//动画对象存在
						//计算当前动画对象位置、透明度、宽度
						var tmpx = false;
						tmpx = tmp[7] + tmp[10];
						tmpy = tmp[8] + tmp[11];
						var tmpc = false;
						if (tmp[6]) {
							tmpc = tmp[9] + tmp[12];
						}
						//更新动画对象
						bmUpdateDOM(tmpaid, tmpx, tmpy, tmpc);
						
						//更新动画对象数据
						BMAnimList[i][7] = tmpx;
						BMAnimList[i][8] = tmpy;
						BMAnimList[i][9] = tmpc;
						
						i ++;
					//}
				} else {	//动画到期
					bmRemoveAnim(i);
				}
			}
			
			//循环更新施法列表中各对象
			i = 0;
			while(i < BMCastList.length) {
				var tmp = BMCastList[i];
				var now = getNow();
				var cid = tmp[0];
				var dw = tmp[1];
				var delay = tmp[2];
				var dom = $("BM" + cid + "cast");
				var bar = $("BM" + cid + "castbar");
				var name = $("BM" + cid + "castname");
				
				//判断动画是否到时
				if (delay > now) {
					//更新施法条
					bar.style.width = (parseInt(bar.style.width) + dw) + "px";
					
					i ++;
				} else {
					//从施法列表中移除动画
					BMCastList.splice(i, 1);
					
					//更新施法条
					bar.style.width = "1px";
					name.innerHTML = "";
					$H(dom);
				}
			}
			
			//循环更新Buff列表中个对象
			i = 0;
			while(i < BMBuffList.length) {
				var tmp = BMBuffList[i];
				var now = getNow();
				var cid = tmp[0];
				var chid = tmp[1];
				var delay = tmp[3];
				
				//判断buff是否到时
				if (delay > now) {
					i ++;
				} else {
					//到时移除buff
					var dom = $("BM" + cid + "cache" + chid);
					$R(dom);
					BMBuffList.splice(i, 1);
				}
			}
			
			//设置下一次更新
			BMAnimTimer = setTimeout("bmMainLoop()", BMAnimInt);
		}
	} catch(e) {
		//alert("bmMainLoop:" + e);
	}
}

//更新对象位置、透明度、宽度、高度数据
function bmUpdateDOM(d, x, y, c) {
	try {
		if (x) {
			d.style.left = x + "px";
		}
		if (y) {
			d.style.bottom = y + "px";
		}
		if (c) {
			if (c < 0) {
				c = 0;
			} else if (c > 100) {
				c = 100;
			}
			d.style.filter = "alpha(opacity=" + c + ")";
		}
	} catch(e) {
		//alert("bmUpdateDOM:" + e);
	}
}

//清除指定动画对象
function bmRemoveAnim(idx) {
	try {
		if (idx < BMAnimList.length) {
			var tmp = BMAnimList[idx];
			if (tmp) {
				var del = tmp[1];
				var cid = tmp[0];
				var did = $(tmp[2]);
				var aid = $(tmp[3]);
				var ox = tmp[4];
				var oy = tmp[5];
				var oc = tmp[6];
				
				//从动画列表中删除此动画
				BMAnimList.splice(idx, 1);
				
				//判断结束状态更新动画对象
				//if (did && aid) {
					if (del) {		//缓冲动画结束后删除
						aid.innerHTML = "";
						$R(did);
					} else {		//结束后恢复原样
						$S(aid);
						$S(did);
						bmUpdateDOM(aid, ox, oy, oc);
					}
				//}
			}
		}
	} catch(e) {
		//alert("bmRemoveAnim:" + e);
	}
}

//插入动画对象
function bmAddAnim(cid, domid, aid, ox, oy, oc, dx, dy, dc, delay, html) {
	//outputDebugMsg("bmAddAnim: " + cid + "," + domid + "," + aid + "," + ox + "," + oy + "," + oc + "," + dx + "," + dy + "," + dc + "," + delay + "," + html);
	try {
		if (BMOnBattle) {
			
			if (html) {		//如果需要使用缓存区
				var animid = bmGetAnimID();
				//outputDebugMsg("bmAddAnim: (animid)" + animid);
				var cdomid = "BM" + cid + "cache" + animid;
				var tmpstr = "<div id=\"" + cdomid + "\" name=\"" + cdomid + "\" style=\"position:absolute; left:0px; bottom:0px; z-index:" + (100 + animid) + ";\">" + html + "</div>";
				
				//加入场景
				getOutReader().insertAdjacentHTML("beforeend", tmpstr);
				
				var cache = $(cdomid);
				//if (cache) {
					bmUpdateDOM(cache, ox, oy, oc);
					
					//加入动画列表
					BMAnimList.push([cid, true, cdomid, cdomid, ox, oy, oc, ox, oy, oc, dx, dy, dc, delay]);
				//}
			} else {	//不需要动画缓存区
				BMAnimList.push([cid, false, domid, aid, ox, oy, oc, ox, oy, oc, dx, dy, dc, delay]);
			}
		}
	} catch(e) {
		//alert("bmAddAnim:" + e);
	}
}

//插入施法对象
function bmAddCast(cid, cname, cdelay) {
	//outputDebugMsg("bmAddCast:" + BMCastList.length);
	try {
		if (BMOnBattle) {
			var dom = $("BM" + cid + "cast");
			var bar = $("BM" + cid + "castbar");
			var name = $("BM" + cid + "castname");
			
			//if (dom && bar && name) {
				//计算动画参数更新施法条
				bar.style.width = "1px";
				name.innerHTML = cname;
				$S(dom);
				
				var dw = Math.floor(200 * BMAnimInt / cdelay);
				var delay = getNow() + cdelay;
	
				//如果列表中动画存在，更新列表中旧数据
				var len = BMCastList.length;
				var exist = false;
				for (var i = 0; i < len; i ++) {
					var tmp = BMCastList[i];
					if (cid == tmp[0]) {
						BMCastList[i][2] = delay;
						BMCastList[i][1] = dw;
						exist = true;
						break;
					}
				}
				
				//列表中不存在动画，则插入新动画到施法列表
				if (!exist) {
					BMCastList.push([cid, dw, delay]);
				}
			//}
		}
	} catch(e) {
		//alert("bmAddCast:" + e);
	}
}

//移除施法对象
function bmRemoveCast(cid) {
	try {
		var len = BMCastList.length;
		for (var i = 0; i < len; i ++) {
			var tmp = BMCastList[i];
			if (tmp[0] == cid) {
				BMCastList.splice(i, 1);
				
				//更新施法条
				var dom = $("BM" + cid + "cast");
				var bar = $("BM" + cid + "castbar");
				var name = $("BM" + cid + "castname");
				
				//if (dom && bar && name) {
					name.innerHTML = "";
					bar.style.width = "1px";
					$H(dom);
				//}
				
				return true;
			}
		}
		return false;
	} catch(e) {
		//alert("bmRemoveCast:" + e);
		return false;
	}
}

//插入Buff
function bmAddBuff(cid, bname, bimg, bdelay) {
	try {
		//得到角色信息
		var dom = $("BM" + cid);
		//if (dom) {
			var delay = getNow() + bdelay;
			
			//如果列表中存在此buff，则直接更新过期时间
			var len = BMBuffList.length;
			var exist = false;
			for (var i = 0; i < len; i ++) {
				var tmp = BMBuffList[i];
				if (cid == tmp[0] && bname == tmp[2]) {
					BMBuffList[i][3] = delay;
					exist = true;
					break;
				}
			}
			
			//列表中不存在此buff，则插入新动画到buff列表
			if (!exist) {
				var animid = bmGetAnimID();
				var cdomid = "BM" + cid + "cache" + animid;
				var tmpstr = "<div id=\"" + cdomid + "\" name=\"" + cdomid + "\" style=\"position:absolute; left:0px; bottom:0px; z-index:" + (100 + animid) + "; filter:alpha(opacity=50); \"><img src=\"" + bimg + "\" style /></div>";
				
				//加入场景
				dom.insertAdjacentHTML("beforeend", tmpstr);
				
				//加入buff列表
				BMBuffList.push([cid, animid, bname, delay]);
			}
		//}
	} catch(e) {
		//alert("bmAddBuff:" + e);
	}
}

//移除Buff
function bmRemoveBuff(cid, bname) {
	var len = BMBuffList.length;
	for (var i = 0;i < len; i ++) {
		var tmp = BMBuffList[i];
		if (tmp[0] == cid && tmp[2] == bname) {
			var chid = tmp[1];
			
			BMBuffList.splice(i, 1);
			
			var dom = $("BM" + cid + "cache" + chid);
			//if (dom) {
				$R(dom);
			//}
			return true;
		}
	}
	return false;
}

//得到动画ID
function bmGetAnimID() {
	return BMAnimIndex ++;
}

//更新角色HP
function bmUpdateHP(cid, hpwidth, hp) {
	try {
		//outputDebugMsg("bmUpdateHP:" + cid + "," + hpwidth + "," + hp);
		if (BMOnBattle) {
			var w = $("BM" + cid + "hp");
			var n = $("BM" + cid + "hpno");
			//if (w) {
				if (hpwidth < 0) {
					w.style.width = "0px";
				} else {
					w.style.width = hpwidth + "px";
				}
			//}
			//if (n) {
				n.innerHTML = hp;
			//}
		}
	} catch(e) {
		//alert("bmUpdateHP:" + e);
	}
}

//更新角色SP
function bmUpdateSP(cid, spwidth, sp) {
	try {
		//outputDebugMsg("bmUpdateSP:" + cid + "," + spwidth + "," + sp);
		if (BMOnBattle) {
			var w = $("BM" + cid + "sp");
			var n = $("BM" + cid + "spno");
			//if (w) {
				if (spwidth < 0) {
					w.style.width = "0px";
				} else {
					w.style.width = spwidth + "px";
				}
			//}
			//if (n) {
				n.innerHTML = sp;
			//}
		}
	} catch(e) {
		//alert("bmUpdateSP:" + e);
	}
}

//设置task图片
function bmSetTaskImg(cid, imgsrc) {
	if (BMOnBattle) {
		var t = $("BM" + cid + "task");
		//if (t) {
			_cachePic(t, imgsrc);
		//}
	}
}

//更新角色图片
function bmSetCharImg(cid, imgsrc) {
	if (BMOnBattle) {
		var t = $("BM" + cid + "img");
		//if (t) {
			_cachePic(t, imgsrc);
		//}
	}
}

//更新状态栏
function bmSetStatus(cid, status) {
	if (BMOnBattle) {
		var dom = $("BM" + cid + "status");
		//if (dom) {
			//outputDebugMsg("bmSetStatus: " + cid + "," + status);
			dom.innerHTML = status;
			//$S(dom);
		//}
	}
}

//动画接口 - 设置攻击数字
function bmSetHitNum(cid, num) {
	try {
		if (BMOnBattle) {
			//outputDebugMsg("setHit: " + cid + "," + num);
			
			//得到角色数据
			var dom = $("BM" + cid);
			//if (dom) {
				var ox = parseInt(dom.oleft);
				var oy = parseInt(dom.obottom) + 100;
				var oc = 100;
				var dx = 0;
				var dy = 6;
				var dc = -8;
				var delay = getNow() + 1200;
				var tmpstr = "<span style=\"font-weight:bold; color:#FF0000; font-size:18pt;\">" + num + "</span>";
				
				//插入动画
				bmAddAnim(cid, false, false, ox, oy, oc, dx, dy, dc, delay, tmpstr);
			//}
		}
	} catch(e) {
		//alert("bmSetHitNum:" + e);
	}
}

//动画接口 - 攻击
function bmSetAttack(cid, tarid, castname, castimg) {
	try {
		//outputDebugMsg("bmSetAttack:" + cid + "," + tarid + "," + castname + "," + castimg);
		
		if (BMOnBattle) {
			//得到角色和目标数据
			var domid = "BM" + cid;
			var dom = $(domid);
			var tdomid = "BM" + tarid;
			var tdom = $(tdomid);
			
			//if (dom && tdom) {
				//得到角色和目标位置信息
				var domt = parseInt(dom.otype);
				var domx = parseInt(dom.oleft);
				var domy = parseInt(dom.obottom);
				var tdomt = parseInt(tdom.otype);
				var tdomx = parseInt(tdom.oleft);
				var tdomy = parseInt(tdom.obottom);
				
				if (castname && castimg) {		//法术攻击
					//计算初始位置、差值
					var ox = domx;
					if (domt == 0) {
						ox += 50;
					} else if (domt == 1) {
						ox -= 50;
					}
					var oc = 100;
					var dx = Math.floor((tdomx - ox) / 6);
					var dy = Math.floor((tdomy - domy) / 6);
					var dc = -15;
					var delay = getNow() + 700;
					
					//动画内容
					var tmpstr = "<img style=\"filter:fliph;\" src=\"" + castimg + "\" />";
					
					//插入动画
					bmAddAnim(cid, false, false, ox, domy, oc, dx, dy, dc, delay, tmpstr);
				} else {	//普通攻击
					//计算差值
					var disx = tdomx - domx;
					if (domt == 0) {
						disx -= 50;
					} else {
						disx += 50;
					}
					var dx = Math.floor(disx / 2);
					var dy = Math.floor((tdomy - domy) / 2);
					var delay = getNow() + 200;
				
					//插入动画
					bmAddAnim(cid, domid, domid, domx, domy, false, dx, dy, false, delay, false);
				}
			//}	// if (dom && tdom);
		}	// if (BMOnBattle)
	} catch(e) {
		//alert("bmSetAttack:" + e);
	}
}

//动画接口 - 失败
function bmSetLost(cid) {
	try {
		//outputDebugMsg("bmSetLost:" + cid);
		if (BMOnBattle) {
			//得到角色数据
			var domid = "BM" + cid;
			var dom = $(domid);
			//if (dom) {
				var domt = parseInt(dom.otype);
				var domx = parseInt(dom.oleft);
				var domy = parseInt(dom.obottom);
				
				var dx = -50;
				if (domt == 1) {
					dx = 50;
				}
				var dc = -30;
				var delay = getNow() + 300;
				
				//插入动画
				bmAddAnim(cid, domid, domid, domx, domy, 100, dx, 0, dc, delay, false);
			//}
		}
	} catch(e) {
		//alert("bmSetLost:" + e);
	}
}