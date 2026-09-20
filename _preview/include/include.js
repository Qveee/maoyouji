function openOption(a){
	var winObj=_getWin("option");
	onOpenWin(winObj);

	try{
		_clickPos();
		with(winObj.style){
			top=p.eventY+60;
			left=p.eventX;
		}
	}catch(x){err(x);}

	var o="<table height=2 cellpadding='0' cellspacing='0'><tr><td></td></tr></table>";
	o+="<input id=gameSysButton type=button value=系统 style='font-size:9pt;' onclick=\"_optionButtonChange('sys');\">";
	o+="<input id=gameOptionButton type=button value=功能 style='font-size:9pt;' onclick=\"_optionButtonChange('option');\">";
	o+="<input id=gameSetButton type=button value=设置 style='font-size:9pt;' onclick=\"_optionButtonChange('set');\">";
	o+="<input id=gameHelpButton type=button value=帮助 style='font-size:9pt;' onclick=\"_optionButtonChange('help');\">";
	o+="<input id=gameHuoDongButton type=button value=活动 style='font-size:9pt;' onclick=\"_optionButtonChange('huodong');\">";
	o+="<hr size=1 width='98%' align=left>";

	o+="<div id=gameHelp style=\"display:none;\">"
		o+="<div style='background-color:#E1E1E1;height:28px;margin-right:5px;padding-top:4px;padding-left:5px;'>";//hr
		o+="<a href=# onclick=\"openOnlineHelp();return false;\">【线上帮助】</a> (线上热心玩家来帮你)"
		o+="</div>";

		o+="<div style='height:28px;margin-right:5px;padding-top:4px;padding-left:5px;'>";//hr
		o+="<a href=http://pet.imop.com/ target=_blank>【官方网站】</a> (猫游记官方网站)"
		o+="</div>";

		o+="<div style='background-color:#E1E1E1;height:28px;margin-right:5px;padding-top:4px;padding-left:5px;'>";//hr
		o+="<a href=./forum/load.html target=_blank>【官方论坛】</a> (猫游记官方论坛)"
		o+="</div>";

		o+="<div style='height:28px;margin-right:5px;padding-top:4px;padding-left:5px;'>";//hr
		o+="<a href=http://www.pet.imop.com/list/0-1.htm target=_blank>【更新日志】</a> (查看游戏更新日志)"
		o+="</div>";

		o+="<div style='background-color:#E1E1E1;height:28px;margin-right:5px;padding-top:4px;padding-left:5px;'>";//hr
		o+="<a  href=http://www.pet.imop.com/guide/map.html target=_blank>【地图】</a> (游戏地图查看)"
		o+="</div>";

		o+="<div style='height:28px;margin-right:5px;padding-top:4px;padding-left:5px;'>";//hr
		o+="<a href=/help/emote.htm target=_blank>【表情】</a> (游戏中可用表情列表)"
		o+="</div>";
	o+="</div>"
	o+="<div id=gameSysOption style=\"display:none;\">"

		
		o+="<div style='background-color:#E1E1E1;height:28px;margin-right:5px;padding-top:4px;padding-left:5px;'>";//hr
		o+="<a href=# onclick=\"showFriend('infoReaderOut');;return false;\">【游戏重要的信息】</a>"
		o+="</div>";

		o+="<div style='height:28px;margin-right:5px;padding-top:4px;padding-left:5px;'>";//hr
		o+="<a href=# onclick=\"showFriend('thingReaderOut');return false;\">【游戏事件&公告】</a>"
		o+="</div>";



		o+="<div style='background-color:#E1E1E1;height:28px;margin-right:5px;padding-top:4px;padding-left:5px;'>";//hr
		o+="<a href=# onclick=\"showPMes();return false;\">【留言箱】</a> (游戏留言箱)"
		o+="</div>";

		o+="<div style='height:28px;margin-right:5px;padding-top:4px;padding-left:5px;'>";//hr
		o+="<a href=# onclick=\"yaoyan();return false;\">【发送匿名消息】</a> (将损失 <font color=red>50%</font> 的HP和SP)"
		o+="</div>";


		//o+="<div style='height:28px;margin-right:5px;padding-top:4px;padding-left:5px;'>";//hr
		//o+="<a href=# onclick=\"openBlindWin();return false;\">【屏蔽列表】</a> (被屏蔽用户列表)"
		//o+="</div>";

		//o+="<div style='background-color:#E1E1E1;height:28px;margin-right:5px;padding-top:4px;padding-left:5px;'>";//hr
		//o+="<a href=# onclick='delCut();return false;'>【清理快捷栏】</a> (整理快捷栏图标)"
		//o+="</div>";

		//o+="<div style='height:28px;margin-right:5px;padding-top:4px;padding-left:5px;'>";//hr
		//o+="<a href=# onclick=\"yaoyan();return false;\">【发送谣言】</a> (将损失 <font color=red>50%</font> 的HP和SP)"
		//o+="</div>";

		//o+="<div style='background-color:#E1E1E1;height:28px;margin-right:5px;padding-top:4px;padding-left:5px;'>";//hr
		//o+="<a href=# onclick=\"changeName('');return false;\">【宠物改名】</a> (消耗一个<font color=green>转生之炎</font>)"
		//o+="</div>";

		//o+="<div style='height:28px;margin-right:5px;padding-top:4px;padding-left:5px;'>";//hr
		//o+="<a href=# onclick=\"cmd('foo setAutoReply');return false;\">【自动回复】</a> (接收到信息后自动回复)"
		//o+="</div>";

		//o+="<div style='background-color:#E1E1E1;background-color:#E1E1E1;height:28px;margin-right:5px;padding-top:4px;padding-left:5px;'>";//hr
		//o+="<a href=# onclick=\"cmd('follow none');return false;\">【取消跟随】</a> (不跟随任何人)"
		//o+="</div>";

		//o+="<div style='height:28px;margin-right:5px;padding-top:4px;padding-left:5px;'>";//hr
		//o+="<a href=./topten.jsp target=_blank>【玩家排行】</a> (查看玩家排行榜)"
		//o+="</div>";

		//o+="<div style='background-color:#E1E1E1;height:28px;margin-right:5px;padding-top:4px;padding-left:5px;'>";//hr
		//o+="<a href=./turnMP.jsp target=_blank>【MP兑换】</a> (大杂烩MP兑入/出)"
		//o+="</div>";

		//o+="<div style='background-color:#E1E1E1;height:28px;margin-right:5px;padding-top:4px;padding-left:5px;'>";//hr
		//o+="<a href=./ChangeItem.jsp target=_blank>【道具兑换】</a> (大杂烩道具兑入/出)"
		//o+="</div>";



		//o+="<div style='height:28px;margin-right:5px;padding-top:4px;padding-left:5px;'>";//hr
		//o+="<a href=./ChangeItem.jsp target=_blank>【道具兑换】</a> (大杂烩<->游戏道具兑换)"
		//o+="</div>";
		
		//o+="<div style='height:28px;margin-right:5px;padding-top:4px;padding-left:5px;'>";//hr
		//o+="<a href=# onclick=\"showInputDetail();return false;\">【个人信息设置】</a> (二级密码的设置)"
		//o+="</div>";

		o+="<div style='background-color:#E1E1E1;height:28px;margin-right:5px;padding-top:4px;padding-left:5px;'>";//hr
		o+="<a href=# onclick=\"if(p.getPageState()=='zone'){cmd('lookatt');}else{cmd('look');};return false;\">【切换战斗画面】</a>"
		o+="</div>";
		
		o+="<div style='background-color:#E1E1E1;height:28px;margin-right:5px;padding-top:4px;padding-left:5px;'>";//hr
		o+="<a href=# onclick=\"if(getTimePrizeCloseDesc()==''||confirm(getTimePrizeCloseDesc())){actionWin_my.location.href='action.jsp?action=changerole&';} \">【切换角色】</a> ";
		//o+="<a href=action.jsp?action=changerole& target=actionWin_my>【切换角色】</a> "
		o+="</div>";

		o+="<div style='height:28px;margin-right:5px;padding-top:4px;padding-left:5px;'>";//hr
		//o+="<a href=action.jsp?action=logout& target=actionWin_my>【退出游戏】</a>"
		o+="<a href=# onclick=\"if(getTimePrizeCloseDesc()==''||confirm(getTimePrizeCloseDesc())){actionWin_my.location.href='action.jsp?action=logout&';} \">【退出游戏】</a> ";
		
		o+="</div>";

	o+="</div>"

	o+="<div id=gameOption style=\"display:none;\">"

		
		//o+="<div style='background-color:#E1E1E1;height:28px;margin-right:5px;padding-top:4px;padding-left:5px;'>";//hr
		//o+="<a href=# onclick=\"showFriend('infoReaderOut');;return false;\">【游戏重要的信息】</a>"
		//o+="</div>";

		//o+="<div style='height:28px;margin-right:5px;padding-top:4px;padding-left:5px;'>";//hr
		//o+="<a href=# onclick=\"showFriend('thingReaderOut');return false;\">【游戏事件&公告】</a>"
		//o+="</div>";



		//o+="<div style='background-color:#E1E1E1;height:28px;margin-right:5px;padding-top:4px;padding-left:5px;'>";//hr
		//o+="<a href=# onclick=\"showPMes();return false;\">【留言箱】</a> (游戏留言箱)"
		//o+="</div>";

		o+="<div style='height:28px;margin-right:5px;padding-top:4px;padding-left:5px;'>";//hr
		o+="<a href=# onclick=\"openBlindWin();return false;\">【屏蔽列表】</a> (被屏蔽用户列表)"
		o+="</div>";

		o+="<div style='background-color:#E1E1E1;height:28px;margin-right:5px;padding-top:4px;padding-left:5px;'>";//hr
		o+="<a href=# onclick='delCut();return false;'>【清理快捷栏】</a> (整理快捷栏图标)"
		o+="</div>";
		
		//o+="<div style='background-color:#E1E1E1;height:28px;margin-right:5px;padding-top:4px;padding-left:5px;'>";//hr
		//o+="<a href=# onclick=\"changeName('');return false;\">【宠物改名】</a> (消耗一个<font color=green>转生之炎</font>)"
		//o+="</div>";

		o+="<div style='height:28px;margin-right:5px;padding-top:4px;padding-left:5px;'>";//hr
		o+="<a href=# onclick=\"cmd('foo setAutoReply');return false;\">【自动回复】</a> (接收到信息后自动回复)"
		o+="</div>";

		o+="<div style='background-color:#E1E1E1;background-color:#E1E1E1;height:28px;margin-right:5px;padding-top:4px;padding-left:5px;'>";//hr
		o+="<a href=# onclick=\"cmd('follow none');return false;\">【取消跟随】</a> (不跟随任何人)"
		o+="</div>";

		o+="<div style='height:28px;margin-right:5px;padding-top:4px;padding-left:5px;'>";//hr
		o+="<a href=./topten.jsp target=_blank>【玩家排行】</a> (查看玩家排行榜)"
		o+="</div>";

		o+="<div style='background-color:#E1E1E1;height:28px;margin-right:5px;padding-top:4px;padding-left:5px;'>";//hr
		o+="<a href=./turnMP.jsp target=_blank>【MM兑换】</a> (平台MM道具兑入/出)"
		o+="</div>";

       o+="<div style='background-color:#E1E1E1;height:28px;margin-right:5px;padding-top:4px;padding-left:5px;'>";//hr
		o+="<a href=./turnMaoYan.jsp target=_blank>【猫眼兑换】</a> (MM兑换猫眼)"
		o+="</div>";
		//o+="<div style='background-color:#E1E1E1;height:28px;margin-right:5px;padding-top:4px;padding-left:5px;'>";//hr
		//o+="<a href=./ChangeItem.jsp target=_blank>【道具兑换】</a> (大杂烩道具兑入/出)"
		//o+="</div>";

		//o+="<div style='height:28px;margin-right:5px;padding-top:4px;padding-left:5px;'>";//hr
		//o+="<a href=# onclick=\"cmd('droppet');return false;\">【丢弃宠物】</a> (丢弃目前携带的宠物)"
		//o+="</div>";

		//o+="<div style='height:28px;margin-right:5px;padding-top:4px;padding-left:5px;'>";//hr
		//o+="<a href=./ChangeItem.jsp target=_blank>【道具兑换】</a> (大杂烩<->游戏道具兑换)"
		//o+="</div>";
		
		//o+="<div style='height:28px;margin-right:5px;padding-top:4px;padding-left:5px;'>";//hr
		//o+="<a href=# onclick=\"showInputDetail();return false;\">【个人信息设置】</a> (二级密码的设置)"
		//o+="</div>";
		
		//o+="<div style='background-color:#E1E1E1;height:28px;margin-right:5px;padding-top:4px;padding-left:5px;'>";//hr
		//o+="<a href=action.jsp?action=logout& target=actionWin_my>【退出游戏】</a>"
		//o+="</div>";

	o+="</div>"


	o+="<div id=gameSet style=\"display:none;\">"
		o+="<div style='background-color:#E1E1E1;height:28px;margin-right:5px;padding-top:4px;padding-left:5px;'>";//hr
		o+="<a href=# onclick=\"if(confirm('确认要重置所有参数?')){actionWin_my.location.href='action.jsp;jsessionid='+sessionId+'?action=reSet';};return false;\">【重置设置】</a> (重置游戏设置)";
		o+="</div>";
		o+="<div style='height:28px;margin-right:5px;padding-top:4px;padding-left:5px;'>";//hr
		o+="<span onclick=\"combatDisply();return false;\" style=\"cursor:hand;\">战斗效果: <font color=red><b><span id=\"combatDisply_d\">"
		if(huaLi){
			o+="开";
		}else{
			o+="关";
		}
		o+="</span></b></font>  (战斗中宠物动作)</span>";
		o+="</div>";
		o+="<div style='background-color:#E1E1E1;height:46px;margin-right:5px;padding-top:4px;padding-left:5px;'>";//hr
		o+="战斗背景透明度:<br><font color=red>";
		if(_getCombatPic()==0){
			o+="<INPUT TYPE='radio' NAME='combatPicO' checked value=0 onclick='selCombatPic(this.value);'>关";
		}else{
			o+="<INPUT TYPE='radio' NAME='combatPicO' value=0 onclick='selCombatPic(this.value);'>关";
		}
		if(_getCombatPic()==25){
			o+="<INPUT TYPE='radio' NAME='combatPicO' checked value=25 onclick='selCombatPic(this.value);'>25%";
		}else{
			o+="<INPUT TYPE='radio' NAME='combatPicO' value=25 onclick='selCombatPic(this.value);'>25%";
		}
		if(_getCombatPic()==50){
			o+="<INPUT TYPE='radio' NAME='combatPicO' checked value=50 onclick='selCombatPic(this.value);'>50%";
		}else{
			o+="<INPUT TYPE='radio' NAME='combatPicO' value=50 onclick='selCombatPic(this.value);'>50%";
		}
		if(_getCombatPic()==75){
			o+="<INPUT TYPE='radio' NAME='combatPicO' checked value=75 onclick='selCombatPic(this.value);'>75%";
		}else{
			o+="<INPUT TYPE='radio' NAME='combatPicO' value=75 onclick='selCombatPic(this.value);'>75%";
		}
		if(_getCombatPic()==100){
			o+="<INPUT TYPE='radio' NAME='combatPicO' checked value=100 onclick='selCombatPic(this.value);'>开";
		}else{
			o+="<INPUT TYPE='radio' NAME='combatPicO' value=100 onclick='selCombatPic(this.value);'>开";
		}
		o+="</font>";
		o+="";
		o+="</div>";
		o+="<div style='height:28px;margin-right:5px;padding-top:3px;padding-left:5px;'>";//hr
		o+="<INPUT TYPE='checkbox' NAME='' ";
		if(getAutoCenter()){
			o+="checked";
		}
		o+=" onchange='setAutoCenter(this.checked);' onclick='if(!this.checked){setAutoAlert(this);}'>启用地图自动居中<br>"
		o+="</div>";

		o+="<div style='background-color:#E1E1E1;height:28px;margin-right:5px;padding-top:3px;padding-left:5px;'>";//hr
		o+="快捷键: <INPUT TYPE='radio' NAME='kuaijiejian' onclick='changeKuaiJie(1);' "+(kuaiJieJian==1?"checked":"")+">alt+[1~0] <INPUT TYPE='radio' NAME='kuaijiejian' onclick='changeKuaiJie(2);' "+(kuaiJieJian==2?"checked":"")+">1~0 <INPUT TYPE='radio' NAME='kuaijiejian' onclick='changeKuaiJie(0);' "+(kuaiJieJian==0?"checked":"")+">关闭"
		o+="</div>";

		o+="<div style='height:28px;margin-right:5px;padding-top:3px;padding-left:5px;'>";//hr
		o+="功能按钮: <INPUT TYPE='radio' NAME='gongnegNa' onclick='showToolsButton=1;cmd(\"l\");' "+(showToolsButton==1?"checked":"")+">点击出现 <INPUT TYPE='radio' NAME='gongnegNa' onclick='showToolsButton=2;cmd(\"l\");' "+(showToolsButton==2?"checked":"")+">直接表示"
		o+="</div>";

		o+="<div style='background-color:#E1E1E1;height:28px;margin-right:5px;padding-top:3px;padding-left:5px;'>";//hr
		o+="显示PK按钮: <INPUT TYPE='radio' NAME='kaiqiPK' onclick='openPKButton=1;cmd(\"l\");' "+(openPKButton==1?"checked":"")+">是 <INPUT TYPE='radio' NAME='kaiqiPK' onclick='openPKButton=0;cmd(\"l\");' "+(openPKButton==0?"checked":"")+">否"
		o+="</div>";


		o+="<div style='height:28px;margin-right:5px;padding-top:4px;padding-bottom:4px;padding-left:5px;'>";//hr
		o+="收听频道: (取消即可不收听该频道内容)<br>"
		o+="<INPUT TYPE=checkbox id=channel_0 "+(getChannel(0)==0?"":"checked")+" onclick='changeChannel(0);'>公聊 "
		o+="<INPUT TYPE=checkbox id=channel_1 "+(getChannel(1)==0?"":"checked")+" onclick='changeChannel(1);'>匿名消息 "
		o+="<INPUT TYPE=checkbox id=channel_2 "+(getChannel(2)==0?"":"checked")+" onclick='changeChannel(2);'>大逃杀 "
		o+="<INPUT TYPE=checkbox id=channel_3 "+(getChannel(3)==0?"":"checked")+" onclick='changeChannel(3);'>公会 "
		o+="</div>";

		o+="<div style='background-color:#E1E1E1;height:28px;margin-right:5px;padding-top:4px;padding-left:5px;'>";//hr
		o+="<INPUT TYPE=checkbox id=noautofightwin "+(noautofightwin?"checked":"")+" onclick='noautofightwin=this.checked;'>禁止自动切换到战斗场景"
		o+="</div>";

		o+="<div style='height:28px;margin-right:5px;padding-top:4px;padding-left:5px;'>";//hr
		o+="<INPUT TYPE=checkbox "+(noShowTipWin?"checked":"")+" onclick='noShowTipWin=this.checked;'>进入游戏时不显示技巧提示"
		o+="</div>";

		o+="<div style='background-color:#E1E1E1;height:28px;margin-right:5px;padding-top:4px;padding-left:5px;'>";//hr
		o+="<INPUT TYPE=checkbox "+(bosskey?"checked":"")+" onclick='bosskey=this.checked;'>使用老板键 ( <font color=red>~</font> 键为老板键)"
		o+="</div>";

		o+="<div style='background-color:#E1E1E1;height:28px;margin-right:5px;padding-top:3px;padding-left:5px;'>";//hr
		o+="地图上显示宠物形象: <INPUT TYPE='radio' NAME='kaiqiDISPLAY' onclick='openDISPLAYButton=1;cmd(\"l\");' "+(openDISPLAYButton==1?"checked":"")+">是 <INPUT TYPE='radio' NAME='kaiqiDISPLAY' onclick='openDISPLAYButton=0;cmd(\"l\");' "+(openDISPLAYButton==0?"checked":"")+">否"
		o+="</div>";


		//o+="<div style='height:28px;margin-right:5px;padding-top:4px;padding-left:5px;'>";//hr
		//o+="<INPUT TYPE=checkbox "+(openDisSecondCode?"checked":"")+" onclick='openDisSecondCode=this.checked;'>不显示二级密码输入"
		//o+="</div>";

		o+="<div style='background-color:#E1E1E1;height:28px;margin-right:5px;padding-top:3px;padding-left:5px;'>";//hr
		o+="<INPUT TYPE=checkbox "+(openAlertOnWindowClose?"checked":"")+" onclick='openAlertOnWindowClose=this.checked;'>提示退出"
		o+="</div>";

		o+="<INPUT TYPE=button value=确定,保存设置 class=smallFont style=\"margin-bottom:8px;margin-top:14px;\" onclick=\"_saveSet();offOpenWin('option');\">";
	o+="</div>"
o+="<div id=gameHuoDong style=\"display:none;\">"
		o+="<div style='background-color:#E1E1E1;height:28px;margin-right:5px;padding-top:4px;padding-left:5px;'>";//hr
		o+="<a href=# onclick=\"openWenDa();return false;\">【问答活动】</a><br>"
		o+="<a href=# onclick=\"openZhuan();return false;\">【转转奖励】</a><br>"
		o+="<a href=# onclick=\"cmd('showhuodonginfo 0 1');return false;\">【活动介绍】</a><br>"
		o+="<a href=# onclick=\"cmd('liandan showliandan');return false;\">【炼丹炉】</a><br>"
		o+="<a href=# onclick=\"cmd('dianquancmd dianquan_show');return false;\">【点劵使用】</a><br>"
		o+="</div>";

		
	o+="</div>"

	_openWin("option",o);

	_optionButtonChange(a);
}

function openAd(){
	try{
	if(location!=top.location){
	if(screen.width>800){
		top.document.getElementById("frameTop").rows="76,*";
	}
	}
	}catch(x){
		
	}
}
