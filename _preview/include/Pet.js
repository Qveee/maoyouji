var p=this;
var debug=false;
var petHost="http://"+location.host+"/";
var action=petHost+"action.jsp;jsessionid="+sessionId+"?";
var eventX=1;
var eventY=1;





function _clickPos(){
	try{
	p.eventX=p.event.x+p.document.body.scrollLeft;
	p.eventY=p.event.y+p.document.body.scrollTop;
	}catch(x){err(x);}
}
document.onclick=function(){
	_clickPos();
}


//new select:start
var listChatChannel="-1";
function _onChangeSelect(value){
	if(value=="-5"){//私聊
		selTalkTo();
		selectOption(listChatChannel);
	}else if(value=="-6"){//---------
		setTalkTo(-1);
		selectOption(listChatChannel);
	}else if(value=="-1"){//区域
		setTalkTo(-1);
		listChatChannel=value;
		getObj("chatChannel").value="";
		selectOption(listChatChannel);
	}else if(value=="-2"){//世界
		setTalkTo(-1);
		listChatChannel=value;
		getObj("chatChannel").value="all";
		selectOption(listChatChannel);
	}else if(value=="-3"){//公会
		setTalkTo(-1);
		listChatChannel=value;
		getObj("chatChannel").value="party";
		selectOption(listChatChannel);
	}else if(value=="-4"){//队伍
		setTalkTo(-1);
		listChatChannel=value;
		getObj("chatChannel").value="rank";
		selectOption(listChatChannel);
	}else if(value=="-11"){//教官
		setTalkTo(-1);
		listChatChannel=value;
		getObj("chatChannel").value="teacher";
		selectOption(listChatChannel);
	}else if(value=="-7"){//战场
		setTalkTo(-1);
		listChatChannel=value;
		getObj("chatChannel").value="zhanchang";
		selectOption(listChatChannel);
	}else if(value=="-8"){//我方
		setTalkTo(-1);
		listChatChannel=value;
		getObj("chatChannel").value="myzhanchang";
		selectOption(listChatChannel);
	}else{
		getObj("chatChannel").value="";
		setTalkTo(value);
	}
	focusMes();
}
//new select:start

	function setRoomText(s){
		thisRoomText.innerHTML=s;
		// alert(document.getElementById('thisRoomText').innerHTML);
	}

	//种族图片改变
	function changeRace(file,title){
		_petRace.src=file;
		_petRace.title=title;
	}

	//外部信息
	function setMaxHP(n){
		hpLine_left_max_no.innerHTML=n;
	}
	function setMaxSP(n){
		mpLine_left_max_no.innerHTML=n;
	}
	function setExp(nowExp,doubleExpTo,nextExp){
		var strTitle="升级所需经验:"+(nextExp-nowExp)
		+(doubleExpTo>1?"\n双倍经验范围:"+parseInt((doubleExpTo/2)):"");
		needUpLvExp.title=strTitle;
		needUpLvExp_div.title=strTitle;
		if (doubleExpTo>0){
			nowExpTo.innerHTML="&nbsp;&nbsp;(+"+parseInt(doubleExpTo/2)+")";
		}else{
			nowExpTo.innerHTML="";
		}
		var i=Math.floor(nowExp/nextExp*100);
		if(i<0||isNaN(i)){
			i=0;
		}
		expBai.innerHTML=i;
	}
	function setLv(lv){
		//alert('yyf-lv'+lv);
		// try{timeoutLeverUP =
		// window.setTimeout(showLeverUp,1000);}catch(err){}
		// try{window.setTimeout(closeLeverUp,2000);}catch(err){}
		nowLv.innerHTML=lv;
	}
	///////////////////
	function loadMyIM(){
		
		var o="<table border=0 width=100%><tr><td align=center>好友</td><td align=center>事迹</td><td align=center>好感度</td></tr>";
			var hiUrl="http://hi.imop.com/profile2.do?name=";
		for(var i=0;i<myIM.length;i++){
			if(myIM[i][2]){
				
				o+="<tr><td align=center><a href=# onclick=\"p.talkTo("+myIM[i][0]+",'"+myIM[i][1]+"');return false;\"><font color=000000>"+myIM[i][1]+"</font></a></td>";
			o+="<td align=center>[<a href=# onClick=friendEvent("+myIM[i][0]+");return false;><font color=blue>事迹</font></a>]</td><td align=center>"+myIM[i][3]+"</td></tr>";
			// o+="<td align=center>[<a href=friendevents.jsp?fid="+myIM[i][0]+"
			// target=_blank><font color=blue>事迹</font></a>]</td><td
			// align=center>"+myIM[i][3]+"</td></tr>";
			}
		}

	 for(var i=0;i<myIM.length;i++){
	if(!myIM[i][2]) {
				
				o+="<tr><td align=center><font color=999999>"+myIM[i][1]+"</font></td>";
			o+="<td align=center>[<a href=# onClick=friendEvent("+myIM[i][0]+");return false;><font color=blue>事迹</font></a>]</td><td align=center>"+myIM[i][3]+"</td></tr>";
			// o+="<td align=center>[<a href=friendevents.jsp?fid="+myIM[i][0]+"
			// target=_blank><font color=blue>事迹</font></a>]</td><td
			// align=center>"+myIM[i][3]+"</td></tr>";
			
			}
		}
		
		showMyIM.innerHTML=o;
	}
	function imEvent(i,userId){
		if(hasIM(userId)){
			if(i>0){
				if(getIMState(userId)==false){
					var n=getIMName(userId);
					addCM("<a href=# onclick=\"p.talkTo("+userId+",'"+n+"');return false;\"><u><font color=red>"+n+"</u></a>上线了!</font><br>");
					addRM("<a href=# onclick=\"p.talkTo("+userId+",'"+n+"');return false;\"><u><font color=red>"+n+"</a>上线了!</font><br>");
					setIMState(userId,true);
				}
			}else{
				if(getIMState(userId)==true){
					addCM("<font color=red>"+getIMName(userId)+"离开了!</font><br>");
					setIMState(userId,false);
				}
			}
		}
	}

	function getIMState(tId){
		for(var i=0;i<myIM.length;i++){
			if(tId==myIM[i][0]){
				return myIM[i][2];
			}
		}
		return false;
	}

	function setIMState(tId,state){
		for(var i=0;i<myIM.length;i++){
			if(tId==myIM[i][0]){
				myIM[i][2]=state;
				loadMyIM();
			}
		}
		return "";
	}
	function getIMName(tId){
		for(var i=0;i<myIM.length;i++){
			if(tId==myIM[i][0]){
				return myIM[i][1];
			}
		}
		return "";
	}
	//是否有此好友
	function hasIM(tId){


		for(var i=0;i<myIM.length;i++){
			if(checkInt(tId)){
				if(tId==myIM[i][0]){
					return true;
				}
			}else{
				if(tId==myIM[i][1]){
					return true;
				}

			}
		}
		return false;
	}
	//删除
	function removeIMUser(){
		var input=prompt('请输入要在好友中删除的JR名字',"");
		if(input!=null){
			cmd("foo im remove "+input);
		}
	}
	//增加
	function addIMUser(){
		var input=prompt('请输入要在增加的好友名字',"");
		if(input!=null){
			cmd("foo im add "+input);
		}
	}

	////////////////////////////////////////////
	function getInnerReader(){
		if(document.petWin.document.all.innerReader==undefined){
			return document.all("innerReader");
		}else{
			return document.petWin.document.all.innerReader;
		}
	}
	function getOutReader(){
		return document.petWin.document.body;
	}
	function getReader(){
		if(getInnerReader()!=null){
			return getInnerReader();
		}else{
			return getOutReader();
		}
	}
	function addMessage(pos,mes,pingbi){
		if(pingbi==null)
			pingbi=false;
		//取页面js的值
		if(pingBiZhanDouInfo)
		{
			pingbi=pingBiZhanDouInfo;
		}
		try{
			//检测频道
			if((mes.indexOf(message_PUB_Tag)!=-1 || mes.indexOf("0000FF") != -1) &&getChannel(0)==0&&pos=="chatReader"){
				return;
			}else if(mes.indexOf(message_BR_Tag)!=-1&&getChannel(2)==0){
				return;
			}else if(mes.indexOf(message_RUMOR_Tag)!=-1&&getChannel(1)==0){
				return;
			}else if(mes.indexOf(message_PARTY_Tag)!=-1&&getChannel(3)==0){
				return;
			}
			//检测频道
			var posObj=null;

			if(pos=='chatReader'){
				if(mes.indexOf(message_MY_Tag)!=-1&&mes.indexOf(message_MY_Tag+":")==-1){
					posObj=chatMyReader;
					pos='chatMyReader';
					showOnChat();
				}else{
					posObj=chatReader;
				}
			}else if(pos=='infoReader'){
				posObj=infoReader;
			}else if(pos=='npcChatReader'){
				posObj=document.all("npcChatReader");
			}else if(pos=='thingReader'){
				posObj=thingReader;
			}else if(pos=='chatMyReader'){
				
				if(mes.indexOf("#008800")!=-1){
					showOnChat();
				}
				
				posObj=chatMyReader;
			}else if (pos=='npcTaskReader'){
				posObj=document.all("npcTaskReader");
			}else{
				//roomReader				
				 posObj=getReader();
				
			
			}
			if(posObj!=null){		
				if(pos=='roomReader' && pingbi)
				{					   
					 
				}else{
					posObj.insertAdjacentHTML("beforeEnd",mes);
					tryCls(posObj);
					
				}			
			   				
				if(pos=='chatReader'){
					goDown(chatReaderTable);
				}else if(pos=='chatMyReader'){
					goDown(chatReaderMyTable);
				}else if(pos=='thingReader'){
					goDown(thingReaderTable);
				}else if(pos=='infoReader'){
					goDown(infoReaderTable);
				}else{
					goDown(posObj);
				}
				//加入事件
				if(pos!="thingReader"&&pos!="chatReader"){
					if(mes.indexOf(message_PUBM_Tag)!=-1){
						addMessage("chatReader",mes);
					}else if(mes.indexOf(message_THING_Tag)!=-1||mes.indexOf(message_BR_Tag)!=-1){
						addMessage("thingReader",mes);
						addMessage("chatReader",mes);
					}
				}
				//事件记录
				if(pos!="thingReader"){
					if(mes.indexOf(message_EVENT_Tag)!=-1){
						addMessage("thingReader",mes);
					}
				}
			}
		}catch(x){}
	}
	function goDown(posObj){
		posObj.scrollTop=6500;
	}
	function clsMes(s){
		document.all(s).innerHTML="";
	}
	function cls(){
		if(getOutReader()!=null){
			getOutReader().innerHTML="";
		}
	}
	function tryCls(posObj){
		if(posObj.scrollHeight>3000){
			var now=posObj.innerHTML;
			posObj.innerHTML=(now.substring(now.length/2,now.length));
		}
	}

	function setInput(s){
		try{
			document.mesForm.input.value=s;
		}catch(x){err("setInput()"+x);}
	}
	function setInputCmd(s){
		try{
			document.mesForm.inputCommand.value=s;
		}catch(x){err("setInputCmd()"+x);}
	}
	function getInputCmd(s){
		try{
			return document.mesForm.inputCommand.value;
		}catch(x){err("getInputCmd()"+x);}
	}
	function setItemName(s){
		try{
			document.mesForm.itemname.value=s;
		}catch(x){err("setItemName()"+x);}
	}
	function setItemIndex(s){
		try{
			document.mesForm.itemindex.value=s;
		}catch(x){err("setItemIndex()"+x);}
	}
	//090202 add by lc
function setItemType(s){
		try{
			document.mesForm.itemtype.value=s;
		}catch(x){err("setItemType()"+x);}
	}
	function getItemName(){
		try{
			return document.mesForm.itemname.value;
		}catch(x){err("getItemName()"+x);}
	}
	function getItemIndex(){
		try{
			return document.mesForm.itemindex.value;
		}catch(x){err("getItemIndex()"+x);}
	}
function getItemType(){
		try{
			return document.mesForm.itemtype.value;
		}catch(x){err("getItemType()"+x);}
	}
	//090202 upt by lc
	function messageSubmit(){
		try{
			if(!init){
				alert('载入中,请稍后发送信息!');
				return;
			}
			var target;
			var mainFrm=document.actionWin_1.document;
			if(mainFrm.readyState!="complete"){
				mainFrm=document.actionWin_2.document;
				if(mainFrm.readyState!="complete"){
					mainFrm=document.actionWin_3.document;
						if(mainFrm.readyState!="complete"){
							alert('慢点! 先歇歇吧!');
							return;
						}else{
							target="actionWin_3";
						}
				}else{
					target="actionWin_2";
				}
			}else{
				target="actionWin_1";
			}
			if(getInput().trim()!=""||getInputCmd()!=""||(getItemIndex()!=""&&getItemType()!="")){
				checkWorker();
				
				document.mesForm.target=target;

				if(getInputCmd()!=""){
					document.mesForm.submit();
				}else{
					setInputCmd(getInput());
					document.mesForm.submit();
					setInput("");
					setItemIndex("");
                    setItemType("");
				}
				setInputCmd("");
			}

			focusMes();
		}catch(x){err("messageSubmit()"+x);}
	}
	function secondMessageSubmit(){
		try{
			var target;
			var mainFrm=document.actionWin_1.document;
			if(mainFrm.readyState!="complete"){
				mainFrm=document.actionWin_2.document;
				if(mainFrm.readyState!="complete"){
					mainFrm=document.actionWin_3.document;
						if(mainFrm.readyState!="complete"){
							alert('慢点! 先歇歇吧!');
							return;
						}else{
							target="actionWin_3";
						}
				}else{
					target="actionWin_2";
				}
			}else{
				target="actionWin_1";
			}
			if(getSecondInput().trim()!=""||getInputCmd()!=""){
				document.secondcodemesForm.target=target;				
				document.secondcodemesForm.submit();
			}			
		}catch(x){err("secondMessageSubmit()"+x);}
	}
	function getSecondInput(){
		try{
			return document.secondcodemesForm.secondcodeinput.value;
		}catch(x){err("getSecondInput()"+x);}
	}
	function getInput(){
		try{
			return document.mesForm.input.value;
		}catch(x){err("getInput()"+x);}
	}
	function checkWorker(){
		var mainFrm=document.workerWin.document;
		if(mainFrm.readyState!="interactive"){
			err("checkWorker()Worker异常停止");
		}
	}
	function focusMes(){
		try{
			var r = document.mesForm.input.createTextRange();
			r.collapse(false);
			r.select();
			// document.mesForm.input.focus();
		}catch(x){err("focusMes()"+x);}
	}

	function cmd(cmdStr){		
		try{
			if (cmdStr.length>=3 && cmdStr.substring(0,3)=="da"){
				p.cancelCompose();
			}
			//'gto '+room  yyf add 08 02 24
			if(isDoubleOpen && cmdStr.length>=3 && cmdStr.substring(0,3)=="gto"){
				gto(cmdStr);
				return;
			}
			if(isDoubleOpen && cmdStr.length>=3 && cmdStr.substring(0,3)=="gto"){
				gto(cmdStr);
				return;
			}
			// yyf add end			
			setInputCmd(command_Tag+cmdStr);			
			messageSubmit();
		}catch(x){err("cmd()"+x);}
	}
	
	function loadWorker(){
		try{
			p.addRM("<font color=green>载入中....</font> ");
			var pStr="";
			if(server_Port!=80){
				pStr=":"+server_Port+"";
			}
			document.workerWin.location.href="http://"+location.hostname+pStr+"/io/"+myUserId+"&"+validateParam;
			p.addRM("<font color=green>载入完成!</font><br>");
		}catch(x){err("loadWorker()"+x);}
	}
	var init=false;
	function initWorker(){
		init=true;
		cmd("foo login");
		// cmd("look");
		// cmd("checkq");
	}
	function err(x){
		if(debug){
			alert("异常产生:"+x+"!");
		}
	}
//petInfo// ////////////////////
	function go(u){
		petWin.location.href=u;
	}
//
// /state///////////////////////
var _state1_opacity_left=100;
var _state1_opacity_right=100;

function state(obj,side,num){
	try{

		if(num!='x'){
			obj.innerHTML=num;
		}
		obj.style.display="";
		if(!huaLi){return;}
		obj.style.top=delPx(obj.style.top)-6;

		if(side=="left"){
			_state1_opacity_left-=8;
			obj.style.filter='alpha(opacity='+(_state1_opacity_left)+')';
		}else if(side=="right"){
			_state1_opacity_right-=8;
			obj.style.filter='alpha(opacity='+(_state1_opacity_right)+')';
		}
		if((side=="left"&&_state1_opacity_left>0)||side=="right"&&_state1_opacity_right>0){
			setTimeout("try{state(petWin."+obj.id+",'"+side+"','x');}catch(x){if(debug)alert(x);}",100);
		}else{
			if(side=="left"){
				_state1_opacity_left=100;
			}else if(side=="right"){
				_state1_opacity_right=100;
			}
			obj.style.top=135;
			obj.style.display="none";
			obj.style.filter='alpha(opacity=100)';
		}
	}catch(x){if(debug)alert(x);}
}
/////////////////
// set line
var petIsDie;
function  petDie(){
	getObj("_petRace").style.filter="Gray";
	petIsDie=true;
}

function setLine(objStr,num,nowNum){
	if(objStr=="hpLine_left"&&nowNum==0){
		petDie();
	}else if(petIsDie){
		if(nowNum>0){
			getObj("_petRace").style.filter="";
			petIsDie=false;
		}
	}

	try{
		_setLine(objStr,num,nowNum);
		petWin.document.all(objStr+"_no").innerHTML=nowNum;
		var obj=petWin.document.all(objStr);
		var t=num;
		if(t<0){
			obj.style.width=0;
		}else{
			obj.style.width=t;
		}
	}catch(x){err(x);}
}
function _setLine(objStr,num,nowNum){
	try{
		var obj=document.all(objStr);
		var t=num;
		if(t<0){
			obj.style.width=0;
		}else{
			obj.style.width=t;
		}

		document.all(objStr+"_no").innerHTML=nowNum;
	}catch(x){err(x);}
}
//p.setLine(p.petWin.hpLine_right,"+FMath.getBarWidth(enemy.getHP(),enemy.getMaxHP(),90)+",'-');
// ////////////////
// att2(obj,30,"img/slug/5[2].gif",true,side);
function att1(obj,side){
	try{
		if(!huaLi){return;}
		if(side=="left"){
			obj.style.left=getLeftFighterX()+130;
			setTimeout("try{petWin."+obj.id+".style.left="+getLeftFighterX()+";}catch(x){if(debug)alert(x);}",100);
		}else if(side=="right"){
			obj.style.left=getRightFighterX()-130;
			setTimeout("try{petWin."+obj.id+".style.left="+getRightFighterX()+";}catch(x){if(debug)alert(x);}",100);
		}
	}catch(x){err(x);}
}

//slug// /////
function att2(obj,speed,slug,fan,side,notMoveMy){
	try{
		if(!huaLi){return;}
		var _tOld=delPx(obj.style.left);

		if(!notMoveMy){
			if(side=='left'){
				obj.style.left=delPx(obj.style.left)+50;
			}else if(side=='right'){
				obj.style.left=delPx(obj.style.left)-50;
			}
		}
		var slugObj=petWin.document.all(obj.id+"s");
		_cachePic(slugObj,slug);

		slugObj.style.left=_tOld;

		if(side=='left'){
			_attLeft(slugObj,speed,fan,side);
		}else if(side=='right'){
			_attRight(slugObj,speed,fan,side);
		}
		
		if(!notMoveMy){
			if(side=='left'){
				setTimeout("try{petWin."+obj.id+".style.left="+148+";}catch(x){if(debug)alert(x);}",100);
			}else{
				setTimeout("try{petWin."+obj.id+".style.left="+308+";}catch(x){if(debug)alert(x);}",100);
			}
		}
	}catch(x){err(x);}
}
var _opacity_left=100;
function _attLeft(obj,speed){
	try{
		if(!huaLi){return;}
		obj.style.display="";
		obj.style.left=delPx(obj.style.left)+20;

		_opacity_left-=7;

		obj.style.filter='alpha(opacity='+(_opacity_left)+') fliph';

		if(_opacity_left>0){
			setTimeout("try{_attLeft(petWin."+obj.id+","+speed+");}catch(x){if(debug)alert(x);}",speed);
		}else{
			_opacity_left=100;
			obj.style.display="none";
		}
	}catch(x){err(x);}
}
var _opacity_right=100;
function _attRight(obj,speed){
	try{
		
		if(!huaLi){return;}
		obj.style.display="";
		obj.style.left=delPx(obj.style.left)-20;

		_opacity_right-=7;

		obj.style.filter='alpha(opacity='+(_opacity_right)+')';
		
		if(_opacity_right>0){
			setTimeout("try{_attRight(petWin."+obj.id+","+speed+");}catch(x){if(debug)alert(x);}",speed);
		}else{
			_opacity_right=100;
			obj.style.display="none";
		}
		

	}catch(x){err(x);}
}
//////////////


function changePic(obj,pic){
	//obj.src=pic;
	_cachePic(obj,pic);
}

function win(obj){
	try{
		if(obj.side=='left'){
			if(obj.src.indexOf("180.gif")!=-1){
				changePic(obj,'img/pet/win/'+Math.round(Math.random()*1)+'.gif');
			}
		}
	}catch(x){err(x);}
}
function lost(obj){
	//if(Math.round(Math.random()*1)==0){
		try{
			setTimeout("try{fly(petWin."+obj.id+");}catch(x){if(debug)alert(x);}",200);
		}catch(x){err(x);}
	//}else{
	//	changePic(obj,'img/pet/lost/'+Math.round(Math.random()*2)+'.gif');
	// }
}

function test(obj){
	try{
		setTimeout("try{shake(petWin."+obj.id+",11);}catch(x){if(debug)alert(x);}",200);
	}catch(x){err(x);}
}

var _opacity=100;
function fly(obj){
	try{
		if(!huaLi){obj.style.display='none';return;}
		var side="right";
		if(obj.id=="fighter_1"){
			side="left";
		}
		if(side=="right"){
			obj.style.left=delPx(obj.style.left)+20;
		}else{
			obj.style.left=delPx(obj.style.left)-20;
		}
		_opacity-=5;
		if(side=="right"){
			obj.style.filter='alpha(opacity='+(_opacity)+')';
		}else{
			obj.style.filter='alpha(opacity='+(_opacity)+') fliph';
		}
		if(_opacity>0){
			setTimeout("try{fly(petWin."+obj.id+");}catch(x){if(debug)alert(x);}",5);
		}else{
			if(side=="right"){
				obj.style.left=delPx(obj.style.left)-(100/5*20);
			}else{
				obj.style.left=delPx(obj.style.left)+(100/5*20);
			}
			_opacity=100;
		}
	}catch(x){err(x);}
}
function delPx(pos){
	return (parseInt(pos.substring(0,pos.length-2)));
}

/////////////////////////////////
// 场景描述相关
function roomDesc(str){
	try{
		//petWin.roomDescStr.innerHTML=str;
		setRoomText(str);
		
		// petWin.roomDescStr.innerHTML="<iframe width=100% height=100%
		// src=map/maoyin.html frameborder=0></iframe>";
	}catch(x){err(x);}
}
function selectGo(room){
	if(room!=null&&room!=""){
		cmd('gto '+room);
	}
}


function delUser(id){
	try{
		var allUsers=petWin.playerList.getElementsByTagName("dt");
		for(var i=0;i<allUsers.length;i++){
			if(allUsers[i].userid==id){
				var s_node = petWin.document.getElementById("user_"+id);
				var parentE = petWin.playerList;
				parentE.removeChild(s_node);
			}
		}
	}catch(x){err(x);}
}
function _hasUser(id){ //是否在在线列表存在
	try{
		var allUsers=petWin.playerList.getElementsByTagName("dt");
		for(var i=0;i<allUsers.length;i++){
			if(allUsers[i].userid==id){
				return true;
			}
		}
	}catch(x){err(x);}
	return false;
}
function addUser(id,str){
	if(id!=myId){
	try{
		if(!_hasUser(id)){
			petWin.playerList.insertAdjacentHTML("beforeEnd",str);
		}
	}catch(x){err(x);}
	}
}
function addNpcs(s){
	try{
		petWin.npcList.innerHTML=s;
	}catch(x){err(x);}
}


function _getToolsBar(){
	var obj=document.all("toolsbar");
	if(obj==null){
		var obj=document.createElement('toolsbar');
		obj.id="toolsBar";
		with(obj.style){
			position="absolute";
			zIndex=999999;
			left=1;
			top=1;
			display="none";
		}
		document.body.appendChild(obj);
	}
	return obj;
}
function showParentMenu(body){//显示菜单
	try{
		var obj=_getToolsBar();
		obj.innerHTML=body;
		with(obj.style){
			top=event.y+document.body.scrollTop;
			left=event.x+document.body.scrollLeft;
			display='';
		}
	}catch(x){err(x);}
}
function hideParentMenu(){//隐藏菜单
	try{
		_getToolsBar().style.display='none';
	}catch(x){err(x);}
}
function showMenu(body){//显示菜单
	try{
		var obj=_getToolsBar();
		obj.innerHTML=body;
		with(obj.style){
			top=petWin.event.y+petWin.document.body.scrollTop+91;
			left=petWin.event.x+petWin.document.body.scrollLeft+26;
			display='';
		}
	}catch(x){err(x);}
}
function hideMenu(){//显示菜单
	hideParentMenu();
}
//action
function userAction(userId,userName){
	//clear
	var allDt=petWin.document.getElementsByTagName("dt");
	for(var i=0;i<allDt.length;i++){
		allDt[i].style.color="#000000";
	}
	//set
	var _t=petWin.document.getElementById("user_"+userId);
	_t.style.color="#FF0000";

	var o="";
	if(myName!=userName){
		//petWin.menuDiv.innerHTML="<nobr>"
		o+="<nobr>"
		+"<input type=button value='查看' onclick=\"p.showPetInfo('"+userName+"','"+userName+"');p.hideMenu();\" class=smallFont>"
		+"<input type=button value='交谈' onclick=\"p.talkTo("+userId+",'"+userName+"');p.hideMenu();\" class=smallFont>"
		+"<input type=button value='跟随' onclick=\"p.cmd('follow "+userName+"');p.hideMenu();\" class=smallFont>"
		+"<input type=button value='交易' onclick=\"p.cmd('deal "+userName+"');p.hideMenu();\" class=smallFont>"
		+(openPKButton==1?"<input type=button value='攻击' onclick=\"p.cmd('bar34 "+userId+"');p.hideMenu();\" class=smallFont>":"")
		+"</nobr>";
	}else{
		o+="<nobr>"
		+"<input type=button value='查看' onclick=\"p.cmd('l "+userName+"');p.hideMenu();\" class=smallFont>"
		+"</nobr>";
	}
	showMenu(o);
}

var _canTalk=false;
var _noKill=false;
function npcAction(npcIndex,npcName,code){
	//clear
	var allDt=petWin.document.getElementsByTagName("dt");
	for(var i=0;i<allDt.length;i++){
		allDt[i].style.color="#000000";
	}
	//set
	var _t=petWin.document.getElementById("npc_"+npcIndex);
	_t.style.color="#FF0000";

		var str="<nobr>"
		+"<input type=button value='查看' onclick=\"p.showPetInfo("+npcIndex+",'"+npcName+"',"+code+",[false,false,"+_canTalk+","+!_noKill+"]);p.hideMenu();\" class=smallFont>";
		if(_canTalk){
			str+="<input type=button value='交谈' onclick=\"p.cmd('talk "+npcIndex+"');p.hideMenu();p.hideWelcome();\" class=smallFont>";
		}
		if(!_noKill){
			str+="<input type=button value='攻击' onclick=\"p.cmd('45sr34 "+npcIndex+" "+code+"');p.hideMenu();\" style=\"display:none\">"
			str+="<input type=button value='攻击' onclick=\"p.cmd('bar34 "+npcIndex+" "+code+"');p.hideMenu();\" class=smallFont>"
		}
		+"</nobr>";

		// petWin.menuDiv.innerHTML=str;
	showMenu(str);
}

function showMP(mp){
	 topMP.innerHTML=mp;
}
function showMM(mm){
	 topMM.innerHTML=mm;
}

var enemyHashCode=-1;
// page state
function cps(state){
	changePageState(state);
}

function changePageBody(b){
	getOutReader().insertAdjacentHTML("beforeEnd",b);
}

function changePageState(state){
	petWin.pageState=state;
	hideMenu();

	if("zone"==state){
		changePageBody(_getDiv());
	}

	//map
	try{
		if("combat"==state){
			document.all("mapWin").style.display="none";
			// document.all("innerReader").style.display="none";
			with(document.all("innerReader").style){
				height=80;
				width=508+110;
				left= (-16+pLeft);
				top= (270+pTop+70-15);
			}
			goDown(document.all("innerReader"));
			
			with(document.all("chatReaderMyOut1").style){
				height=27;
				width=200;
				left= 630;
				top= 470;
			}
			with(document.all("inputid").style){
				width=102;
			}
		}else{
			document.all("mapWin").style.display="";
			// document.all("innerReader").style.display="";
			with(document.all("innerReader").style){
				height=80;
				width=453;
				left= (-23+pLeft);
				top= (376+pTop-51);
			}
			goDown(document.all("innerReader"));
			with(document.all("chatReaderMyOut1").style){
				width=440;
				left= 457;
			}
			with(document.all("inputid").style){
				width=265;
			}
		}
		
	}catch(x){}
	//
}
function getPageState(){
	return petWin.pageState;
}

//toolsBar// ///
var _canUse=false;
var _canEquip=false; // 是否可以加到快捷
var _canEquip2="false";// 是否可装备
var _canFuHua=false;	// 是否可以孵化
var _canFenJie=false;	// 是否可以分解
var _toolName='';// 道具名
var _toolPath='';// 道具path
var _toolImg='';// 道具图
var _canShow=false; // 是否可以展示
var _canXiu=false; // 是否可以xiu
var _isSHLEgg=false;// 是不是守护灵蛋
var _canFeed=false;// 是否可以喂食
function toolsBar(toolIndex,tr){
	//var alltr=petWin.showItems.getElementsByTagName("tr");
	var alltr=_getWin("tools").document.all("showItems").getElementsByTagName("tr");
	for(var i=0;i<alltr.length;i++){
		alltr[i].style.color="";
		alltr[i].style.backgroundColor="";
	}
	tr.style.color="#FF0000";
	tr.style.backgroundColor="#F5F2AD";
	var str="";
	str+="<nobr>";

	str+="<input type=button value='说明' onclick=\"cmd('helptools "+toolIndex+"');hideParentMenu();return false;\" class=smallFont>";
	// str+="<input type=button value='转让'
	// onclick=\"turnItem('"+_toolName+"',"+toolIndex+");hideParentMenu();return
	// false;\" class=smallFont>";
	try{
		if(petWin.npcList.innerHTML!=""){
			str+="<input type=button value='转让' onclick=\"cmd('foo give "+toolIndex+"');hideParentMenu();return false;\" class=smallFont>";
		}
	}catch(x){}
	//alert(_isSHLEgg);
	if(_isSHLEgg){
		str+="<input type=button value='孵化' onclick=\"cmd('shlfuhua "+toolIndex+"');hideParentMenu();return false;\" class=smallFont>";
	}else
	if(_canUse){
		if(_toolPath == xinshoutask){
			str+="<input type=button value='使用' style='border:solid; border-color:#FF0000' onclick=\"cmd('use "+toolIndex+"');hideParentMenu();return false;\" class=smallFont>";
		}
		else{
			str+="<input type=button value='使用' onclick=\"cmd('use "+toolIndex+"');hideParentMenu();return false;\" class=smallFont>";
		}	
	}
	if(_canEquip2!="false"){
		if(_toolPath == xinshoutask){
			str+="<input type=button value='"+(_canEquip2==""?"装备":_canEquip2)+"' style='border:solid; border-color:#FF0000' onclick=\"cmd('equip "+toolIndex+"');hideParentMenu();return false;\" class=smallFont>";
		}
		else{
			str+="<input type=button value='"+(_canEquip2==""?"装备":_canEquip2)+"' onclick=\"cmd('equip "+toolIndex+"');hideParentMenu();return false;\" class=smallFont>";
		}	
		
	}
	if(_canEquip){
		str+="<input type=button value='快捷' onclick=\"putCut('use}}"+_toolPath+"','"+_toolImg+"');hideParentMenu();return false;\" class=smallFont>";
	}
	if(_canShow){
		str+="<input type=button value='展示' onclick=\"cmd('reveal "+toolIndex+"');hideParentMenu();return false;\" class=smallFont>";
	}
	//是否可以喂食
	if(_canFeed){
		str+="<input type=button value='喂食' onclick=\"cmd('weishizuoqi "+toolIndex+"');hideParentMenu();return false;\" class=smallFont>";
	}
	/*
	if (_canFenJie){
		str+="<input type=button value='分解' onclick=\"cmd('fenJie "+toolIndex+"');hideParentMenu();return false;\" class=smallFont>";
	}
	*/
	// if(getRoom()=="道具店" || getRoom()=="小卖店"|| getRoom()=="当铺"){
	str+="<input type=button value='丢弃' onclick=\"dropItem('"+_toolName+"',"+toolIndex+");hideParentMenu();return false;\" class=smallFont>";
	// }
	if(getRoom()=="小卖店"|| getRoom()=="仓库"){
		str+="<input type=button value='寄存' onclick=\"storeItemsPop('"+_toolName+"',"+toolIndex+");hideParentMenu();return false;\" class=smallFont>";
	}
	if(getRoom()=="道具店" ||getRoom()=="装备店" || getRoom()=="小卖店"|| getRoom()=="当铺"||getRoom()=="云5" || getRoom()=="武器店"){
		if(_toolPath == xinshoutask){
		str+="<input type=button value='卖掉' style='border:solid; border-color:#FF0000' onclick=\"cmd('sellvalue "+toolIndex+"');hideParentMenu();return false;\" class=smallFont>";
		}else{
			str+="<input type=button value='卖掉' onclick=\"cmd('sellvalue "+toolIndex+"');hideParentMenu();return false;\" class=smallFont>";
		}
	}
	//if((getRoom()=="装备店"||getRoom()=="炎3"||getRoom()=="小卖店")&&_toolName.indexOf("未被鉴定的")!=-1){
	//	str+="<input type=button value='鉴定' onclick=\"cmd('jianding "+toolIndex+"');hideParentMenu();return false;\" class=smallFont>";
	// }
	if(getRoom()=="炼造屋"){
		str+="<input type=button value='精炼' onclick=\"cmd('refine "+toolIndex+"');hideParentMenu();return false;\" class=smallFont>";
		if (_canFenJie){
			str+="<input type=button value='分解' onclick=\"cmd('fenJie "+toolIndex+"');hideParentMenu();return false;\" class=smallFont>";
		}
	}
	if(getRoom()=="道具店"){
		str+="<input type=button value='寄卖' onclick=\"consign('"+_toolName+"',"+toolIndex+");hideParentMenu();return false;\" class=smallFont>";
	}
	if(isDeal()){
		str+="<input type=button value='交易' onclick=\"addToDeal('"+_toolName+"',"+toolIndex+",'');hideParentMenu();return false;\" class=smallFont>";
	}
	/*
	if(isCompose()){
		str+="<input type=button value='添加合成' onclick=\"addToPlus('"+_toolName+"',"+toolIndex+",'');offOpenWin('tools');return false;\" class=smallFont>";
	}

	if (_canFuHua  && (getRoom()=="休息室" || getRoom()=="宠物研究所")){
		str+="<input type=button value='孵化' onclick=\"putToFuHua('"+_toolPath+"',"+toolIndex+",'');offOpenWin('tools');return false;\" class=smallFont>";
	}
	*/
       if (_canXiu){
       str+="<input type=button value=' 秀 ' onclick=\"showItemName("+toolIndex+",'tool');hideParentMenu();return false;\" class=smallFont>";
       }
	str+="</nobr>";
	showParentMenu(str);
}
function inputSellItemNum(toolName,oneJiage,unit){
	var input=prompt('['+toolName+'] 收购价格 '+oneJiage+'/'+unit+',您要卖掉几'+unit+'?','全部');
	if(input!=null){
		cmd('sell '+toolName+' '+input);
		return;
	}
}
function storeItemsPop(toolName,index){
	var input=prompt('请输入要寄存 ['+toolName+'] 的数量','全部');
	if(input!=null){
		cmd('cunItems '+index+' '+input);
		// alert('cunItems '+index+' '+input);
		return;
	}
}
function getStoreItemsPop(toolName,index,curpage){
	var input=prompt('请输入要取回 ['+toolName+'] 的数量','全部');
	if(input!=null){
		cmd('getItems '+index+' '+input+' '+curpage);
		return;
	}
}
///////////////
function putCut(cmdStr,imgStr,index){
	if(index=='0'){
		index='9';
	}else if(index<10){
		index-=1;
	}
	if(checkInt(index)){
		//index=parseInt(index)-1;
		index=parseInt(index);
	}
	if(index=='自动'){
		cmd("putcut "+cmdStr+" "+imgStr);
		return;
	}
	if(index!=0){
		if(!checkChar(index)||parseInt(index)<0||parseInt(index)>51){

			var input=prompt('请输入要放置到快捷栏的格数(1-51或者字母)输入是字母的将会安放到浮动快捷栏中','自动');
			if(input!=null){
				putCut(cmdStr,imgStr,input);
				return;
			}else{
				return;
			}
		}
	}
	cmd("putcut "+cmdStr+" "+imgStr+" "+index);
}

function checkChar(str) {
	if(str==null||str==""){
		//alert("请输入数字!");
		return false;
	}
	var digits = "abcdefghijklmABCDEFGHIJKLM";
	var i = 0;
	var strlen = str.length;
	while((i<strlen)){
		var zimu = str.charAt(i);
		if(digits.indexOf(zimu) == -1) {
			//alert("请输入正确的数字!");
			return false;
		}
		i++;
	}
	return true;
}

function cutLine(id){
	
           for(var s = 1;s<=4;s++)
           {
                if(s==id)
                {
                     document.getElementById("cutlinetable"+s).style.display = 'block';
 	                 document.getElementById('cutlinenum'+s).style.display = 'block';
                }else{
              	       document.getElementById("cutlinetable"+s).style.display = 'none';
	       			   document.getElementById('cutlinenum'+s).style.display = 'none';
                    }
           }

      
}



//竞技场
function jingJiputCut(cmdStr,imgStr,index){

	if(index=='0'){
		index='9';
	}else if(index<10){
		index-=1;
	}
	if(checkInt(index)){
		//index=parseInt(index)-1;
		index=parseInt(index);
	}
	if(index=='自动'){
		cmd("JingJiChang putcut "+cmdStr+" "+imgStr);
		return;
	}
	if(index!=0){
		if(!checkInt(index)||parseInt(index)<0||parseInt(index)>6){

			var input=prompt('请输入要放置到快捷栏的格数(1-6)','自动');
			if(input!=null){
				jingJiputCut(cmdStr,imgStr,input);
				return;
			}else{
				return;
			}
		}
	}
	cmd("JingJiChang putcut "+cmdStr+" "+imgStr+" "+index);
}

function loadPetWin(){
	petWin.location.href="petwin.html";
}

//out String// /for 场景
function _getUser(userId,userName,lookStr,isWapUser,isWinner,dotaAno,isEYun,isVIPTag,eYun,ispartypk,flagColor){ //update  by zjm
	var isInRank=inRank(userId);
	var o= "<dt id='user_"+userId+"' userid='"+userId+"'>";
	o+=(isWapUser=="true"?"<img src='/img/button/wap_user.gif' title='WAP用户'> ":"");
	if (isVIPTag)
	{
		o+= "<img src='/img/button/viptag.gif' title='VIP用户'> ";
	}
	if(showToolsButton==1){
		o+="<a style='cursor:hand' onclick=\"p.userAction("+userId+",'"+userName+"');return false;\">";
	}else if(showToolsButton==2){
	    if(flagColor!=null && !flagColor<1)
	    {
	    	o+=	"<img src=img/npc/duoqi/"+flagColor+".gif border=0>";
	    }
	
		o+="<a href=# hidefocus=true class=black onclick=\"p.showPetInfo('"+userName+"','"+userName+"');p.setFuJi('"+userId+"');return false;\" title=查看>";
		// o+="<a style='cursor:hand' onclick=\"p.cmd('l "+userName+"');return
		// false;\" title=查看>";
	}
	o+=(isInRank?"<font color=green>":"")+lookStr+(isInRank?"</font>":"")
	+""
	+"<img src=img/blank.gif height=11 width=5 border=0>";
	if(showToolsButton==2&&!dotaAno){
		//o+="<a href=# onclick=\"p.cmd('l "+userName+"');return false;\" title=查看><img src=img/button/l.gif border=0></a> ";
		o+="<img src=img/button/t.gif border=0 onclick=\"p.talkTo("+userId+",'"+userName+"');event.cancelBubble=true;return false;\" title=交谈><img src=img/blank.gif height=11 width=3 border=0>";
			
		if(!isEYun||(isEYun&&ispartypk)){
			o+="<img src=img/button/f.gif border=0 onclick=\"p.cmd('follow "+userName+"');event.cancelBubble=true;return false;\" title=跟随><img src=img/blank.gif height=11 width=3 border=0>";
				
			o+="<img src=img/button/z.gif border=0 onclick=\"p.cmd('foo rank add "+userName+"');event.cancelBubble=true;return false;\" title=组队><img src=img/blank.gif height=11 width=2 border=0>";
		}
		if(!isEYun){
			o+="<img src=img/button/s.gif border=0 onclick=\"p.cmd('deal "+userName+"');event.cancelBubble=true;return false;\" title=交易><img src=img/blank.gif height=11 width=2 border=0>";
		}
		
				
		if(openPKButton==1){
			o+="<img src=img/button/a.gif border=0 onclick=\"p.cmd('bar34 "+userId+"');event.cancelBubble=true;return false;\" title=攻击>";
		}
		
	}
	
	if(dotaAno){
		
		if(openPKButton==1){
			o+="<img src=img/button/a.gif border=0 onclick=\"p.cmd('bar34 "+userId+"');event.cancelBubble=true;return false;\" title=攻击>";
		}
	}

	if(!dotaAno){
		if (isWinner==4){
		o+="<font color=blue>吸血鬼王子</font>";
		}else if (isWinner==5) {
			o+="<font color=blue>吸血鬼克星</font>";
		}

		o+=eYun;
	}
	
	o+="</a></dt>";
	
	// alert(o);
	return o;

}
//移动后执行事件
function eventOnMove(){
	offOpenWin('petInfoWin');
}
function addPetInfo(stringStr,pic,revealItems,parent,parentName,xxStatus,shls,maxhasshls,fate,shenzhuangimg
					,equipBuilder
					,zuoQiBuilder
					,zuoQiEquipBuilder){
	//装备显示
	if(equipBuilder != null
			&& equipBuilder.length > 0){
		stringStr += "<table border=0 style=color:#596075>" ;
		for(var i = 0 ; i < equipBuilder.length ; i++){
			stringStr += "<tr>" ;
				stringStr += "<td>" ;
					stringStr +="<img src="+equipBuilder[i][0] +" />";
				stringStr += "</td>" ;
				stringStr += "<td>" ;
					stringStr += "<a href=# onclick=\"p.cmd('helptools user "+ parent + " "+equipBuilder[i][1] +"');return false;\">";
					stringStr += equipBuilder[i][2] ;
					stringStr += "</a>(" + equipBuilder[i][3] +")"
				stringStr += "</td>" ;
				
			stringStr += "</tr>" ;
		}
 		stringStr += "</table>" ;
	}
	//坐骑显示
	if(zuoQiBuilder != null
			&& zuoQiBuilder.length > 0){
		if(equipBuilder != '')
			stringStr += "<hr size=1 color=\"#BCBCBC\" width=\"100%\">" ;
		stringStr += "<table border=0 style=color:#596075>" ;
			stringStr += "<tr>" ;
				stringStr += "<td>" ;
					stringStr +="<img src="+zuoQiBuilder[0][0] +" />";
				stringStr += "</td>" ;
				stringStr += "<td>" ;
					stringStr += "<a href=# onclick=\"p.cmd('helptools user "+ parent + " "+zuoQiBuilder[0][1] +"');return false;\">";
					stringStr += zuoQiBuilder[0][2] ;
					stringStr += "</a>(" + zuoQiBuilder[0][3] +")"
				stringStr += "</td>" ;
			stringStr += "</tr>" ;
 		stringStr += "</table>" ;
	}
	//坐骑装备显示
	if(zuoQiEquipBuilder != null 
			&& zuoQiEquipBuilder.length > 0){
		stringStr += "<table border=0 style=color:#596075>" ;
		for(var i = 0 ; i < zuoQiEquipBuilder.length ; i++){
			stringStr += "<tr>" ;
				stringStr += "<td>" ;
					stringStr +="<img src="+zuoQiEquipBuilder[i][0] +" />";
				stringStr += "</td>" ;
				stringStr += "<td>" ;
					stringStr += "<a href=# onclick=\"p.cmd('helptools user "+ parent + " "+zuoQiEquipBuilder[i][1] +"');return false;\">";
					stringStr += zuoQiEquipBuilder[i][2] ;
					stringStr += "</a>(" + zuoQiEquipBuilder[i][3] +")"
				stringStr += "</td>" ;
				
			stringStr += "</tr>" ;
		}
 		stringStr += "</table>" ;
	}
	document.getElementById('showPetInfoDiv').innerHTML=stringStr;
	// begin by zjm
	var xxObj=document.getElementById('xxSelectDiv');  // by zjm
	if (xxStatus==1) {
	  xxObj.innerHTML+= "<img src=/img/xixue.gif   alt=吸血>";
	  xxObj.innerHTML+= "<img src=/img/bulie.gif onclick=\"p.cmd('hunt "+parent+"');offOpenWin('petInfoWin');return false;\" style=\"cursor:pointer\" alt=捕猎>"; 
	}else if (xxStatus==2) {
      xxObj.innerHTML+= "<img src=/img/xixue.gif onclick=\"p.cmd('xixue "+parent+"');offOpenWin('petInfoWin');return false;\" style=\"cursor:pointer\" alt=吸血>";
	  xxObj.innerHTML+= "<img src=/img/bulie.gif   alt=捕猎>"; 
	}
	var shiyuanObj=document.getElementById('showshiyuanDiv');  // by zjm
	// /运势相关
	if (fate&&fate!=null&&fate!="null"&&fate!='br'){
		var yunshi=fate.split('@');
		if (yunshi[0]=='凶' ) {
				shiyuanObj.innerHTML+="<font color=black>今日运势:【凶：霉运缠身】</font><br/>"; 
		}else if (yunshi[2]=='无' || yunshi[2]=='') {
				shiyuanObj.innerHTML+="<font color=black>今日运势:【 "+yunshi[0]+" 】</font><br/>";
		}else if (yunshi[4] ==''&& yunshi[2]!='无' && yunshi[2]!='') {
			   shiyuanObj.innerHTML+="<font color=black>今日运势:</font> <span>【"+yunshi[0]+"】</span> <br /> <font color=black>关键词:</font> <span>【"+yunshi[2]+"】</span><br/>"; // Add
																																											// by
																																											// zjm
		}else{
				shiyuanObj.innerHTML+="<font color=black>今日运势:</font> <span style='cursor:pointer;' onmouseover=this.title=\""+yunshi[1]+"\">【"+yunshi[0]+"】</span> <br /> <font color=black>关键词:</font> <span style='cursor:pointer;' onmouseover=this.title=\""+yunshi[3]+",持续时间"+yunshi[4]+"\">【"+yunshi[2]+"】</span><br/>"; // Add
																																																																																// by
																																																																																// zjm
		}
    }
	// end by zjm  
	if(pic&&pic!=null&&pic!="null"){ 
		var o=document.getElementById('showPetPic');
		o.src=pic;
		o.style.display="";
		
		// alert(revealItems.length);
		// 新窗口显示展示位信息处理
		if(revealItems!=null && revealItems.length>0)
		{
			showReveal(revealItems,'showPetInfoDiv',parent);
		}
		else
		{
			// 关闭已打开窗口
			offOpenWin('showReveal');
		}

		// 新窗口显示守护灵信息处理
		if(shls!=null && shls.length>0)
		{
			showSHLs(shls,maxhasshls,'showPetInfoDiv',parent);
		}
		else
		{
			// 关闭已打开窗口
			offOpenWin('showSHL');
		}
		if(shenzhuangimg != ''
			&& shenzhuangimg != undefined)
		{
			showShenZhuang(shenzhuangimg,'showPetInfoDiv',parent);
		}
	}
}

var fuji = -1;
function setFuJi(index){
	fuji = index;
}
function showPetInfo(index,name,code,args){
	var has=args&&args!="undefined";
	if(has){
		var isPlayer=args[0];
		var isDie=args[1];
		var canTalk=args[2];
		var canKill=args[3];
	}
	var winObj=_getWin("petInfoWin");
	onOpenWin(winObj);
	var o="";
	o+="<table width=95% cellpadding=0 cellspacing=0 style=\"margin-top:14px;\" border=0>";
	o+="<tr ><td valign=top width=1></td><td id=showshiyuanDiv valign=top align=left></td></tr>";
	o+="<tr><td valign=top width=1><img src=img/blank.gif id=showPetPic style=\"filter:fliph;display:none;margin-right:5px;margin-bottom:10px;\">"
	+"</td><td valign=top align=left>"
	+"<font color=black><b>"+name+"</b></font> ";
	if(p.hasIM(name)==false){
		if(!has||isPlayer){
			o+=" <img src=/img/addf.gif onclick=\"p.cmd('foo im add "+name+"');offOpenWin('petInfoWin');\" style=\"cursor:pointer\" alt=加"+name+"为好友>";
			o+=" <img src=/img/hint.gif onclick=\"p.cmd('yy "+index+" "+name+"');offOpenWin('petInfoWin');return false;\" style=\"cursor:pointer\" alt="+name+"个人信息>";

		}
	}else{
        
		o+=" <img src=/img/hint.gif onclick=\"p.cmd('yy "+index+" "+name+"');offOpenWin('petInfoWin');return false;\" style=\"cursor:pointer\" alt="+name+"个人信息>";

	}
	o+= "<span id=xxSelectDiv style='margin-left:2px;'></span>";// update by zjm
	o+=(has&&!isDie&&canTalk?"<a href=# onclick=\"p.cmd('talk "+index+"');offOpenWin('petInfoWin');return false;\" title=交谈><img src=img/button/t.gif border=0></a> ":"")
	+(has&&!isDie&&canKill?"<a href=# onclick=\"p.cmd('45sr34 "+index+" "+code+"');offOpenWin('petInfoWin');return false;\" title=攻击 style=\"display:none\"><img src=img/button/a.gif border=0></a> ":"")
	+(has&&!isDie&&canKill?"<a href=# onclick=\"p.cmd('bar34 "+index+" "+code+"');offOpenWin('petInfoWin');return false;\" title=攻击><img src=img/button/a.gif border=0></a> ":"")
	+fakeBr(4)
	+"<div id=showPetInfoDiv></div>"
	+"</td></tr></table>"
	;

	with(winObj.style){
		try{
			top=petWin.event.y+petWin.document.body.scrollTop+91-13;
			left=petWin.event.x+petWin.document.body.scrollLeft+26-238;
		}catch(x){
			top=event.y+petWin.document.body.scrollTop-13;
			left=event.x+petWin.document.body.scrollLeft-238;
		}
		width="250";
		height="60";
		overflowY="";
		display='';
	}
	cmd('l '+index);
	_openWin("petInfoWin",o);
}
function _getNpc(index,npcName,code,lookStr,canTalk,noKill,isDie){
	

	var o= "<dt id='npc_"+index+"'>";
	if(showToolsButton==1){
		o+="<a style='cursor:hand' onclick=\"p._canTalk="+(canTalk>=0)+";p._noKill="+noKill+";p.npcAction("+index+",'"+npcName+"',"+code+",[false,"+isDie+","+(canTalk>=0)+","+!noKill+"]);return false;\">";
	}else if(showToolsButton==2){
		if(!isDie){
			if((canTalk==-1)){//&&noKill
				o+=("<a href=# onclick=\"return false;\" class=black hidefocus=true><span onclick=\"p.showPetInfo("+index+",'"+npcName+"',"+code+",[false,"+isDie+","+(canTalk>=0)+","+!noKill+"]);p.setFuJi('"+index+"');return false;\" title=查看>");
			}else{
				o+=("<a href=# onclick=\"return false;\" class=black hidefocus=true><span onclick=\"p.cmd('talk "+index+"');p.hideWelcome();p.setFuJi('"+index+"');return false;\" title=交谈>");				
			}
		}
		
	}

	if(isDie)o+="<font color=#A1A1A1 style='cursor:default'>";
	o+=lookStr;
	if(isDie)o+="</font>";
	o+="<img src=img/blank.gif height=11 width=5 border=0></span>";
	if(showToolsButton==2){
		o+=(!isDie&&(canTalk>=0)?"<a href=# onclick=\"p.cmd('talk "+index+"');event.cancelBubble=true;p.hideWelcome();return false;\" title=交谈><img src="+(canTalk==0?"img/button/t.gif":"img/button/"+canTalk+".gif")+" border=0><img src=img/blank.gif height=11 width=3 border=0></a>":"");
		o+=(!isDie&&!noKill?"<a href=# onclick=\"p.cmd('45sr34 "+index+" "+code+"');event.cancelBubble=true;return false;\" title=攻击 style=\"display:none\"><img src=img/button/a.gif border=0><img src=img/blank.gif height=11 width=3 border=0></a>":"");
		o+=(!isDie&&!noKill?"<a href=# onclick=\"p.cmd('bar34 "+index+" "+code+"');event.cancelBubble=true;return false;\" title=攻击><img src=img/button/a.gif border=0><img src=img/blank.gif height=11 width=3 border=0></a>":"");
	}
	o+="</a></dt>";
	return o;
}
function _getDiv(){	
	return ""
		+"<div id='shopButton' style='overflow-y:auto;height:67;width:172px;position: absolute; left: 450;top: 0;visibility:visible;z-index: 10;background-color:#c2e1eb;padding-bottom:5px;padding-top:5px;padding-left:10px;padding-right:10px;border:1px solid #58b1d8;' class=smallFont><table height=33 width=1 cellpadding=0 cellspacing=0><tr><td></td></tr></table><a href='#' onclick='javascript:parent.location.reload();' border='0' hidefocus=true><img src='images/p25_bkbut1.gif' border='0'/></a>"
	+"<a href='#' onclick='window.open(\"http://www.pet.imop.com/pet_map_all.html\",\"\",\"menubar=no,toolbar=no,location=no,directories=no,status=no,width=710,height=800,scrollbars=yes\");' border='0' hidefocus=true><img src='images/p25_bkbut2.gif' border='0'/></a><br></div>"
	
	+"<div id='npcList' style='overflow-y:auto;height:180;width:172px;position: absolute; left: 450;top:70;visibility:visible;z-index: 10;background-color:#c2e1eb;padding-bottom:5px;padding-top:5px;padding-left:10px;padding-right:10px;border:1px solid #58b1d8;' class=smallFont></div>"
	
	+"<div id='playerList' style='overflow-y:auto;height:190;width:172px;position: absolute; left: 450;top: 253;visibility:visible;z-index: 10;background-color:#c2e1eb;padding-bottom:5px;padding-top:5px;padding-left:10px;padding-right:10px;border:1px solid #58b1d8;' class=smallFont></div>"

	+"<div id='roomDescStr' style='height:50;width:172px;position: absolute; left: 3;top: 0;visibility:visible;z-index: 10;background-color:#b5e7ee;padding-bottom:0px;padding-top:0px;padding-left:0px;padding-right:0px;border:1px solid #58b1d8;class=smallFont'></div>";
}

function _roomDesc(thesn,desc,exit){
	//alert("_roomDesc" +desc);
	roomDesc(desc);
}

function _fbRoomDesc(desc){
	roomDesc("<a href=# onclick=\"p.showConfirm('你确定要离开当前副本么?','leaveFB','');return false;\">(离开副本)</a>");
}

function _showExit(arr){
	var o="";
	o+="<div class=showExit>";
	for(var i=0;i<arr.length-1;i++){
		o+="<a style='cursor:hand' onclick=\"p.cmd('gto "+arr[i]+"');return false;\"><nobr>【"+arr[i]+"】</nobr></a>";
	}
	o+="</div>";
	return o;
}

var leftFighterX=165;// 怪物left X位置(px)
var rightFighterX=408;// 怪物right X位置(px)
var leftFighterPicOffset;// 怪物图片
var rightFighterPicOffset;// 怪物图片

var leftSHLFighterX=165;// 守护灵怪物left X位置(px)
var rightSHLFighterX=408;// 守护灵怪物right X位置(px)
var leftSHLFighterPicOffset;// 守护灵怪物图片
var rightSHLFighterPicOffset;// 守护灵怪物图片

function getLeftFighterX(){
	return leftFighterX-leftFighterPicOffset;
}
function getRightFighterX(){
	return rightFighterX-rightFighterPicOffset;
}

function centerPicObj(vessel,picUri,posLeft){
	vessel.style.display="none";
	cachePic(vessel,picUri);
	if(vessel.side=="left"){
		leftFighterPicOffset=vessel.width/2;
		vessel.style.left = getLeftFighterX();
	}else if(vessel.side=="right"){
		rightFighterPicOffset=vessel.width/2;
		vessel.style.left = getRightFighterX();
	}
	vessel.style.display="";
}

function centerPicObjSHL(vessel,picUri,bignum){
	vessel.style.display="none";
	// cachePic(vessel,picUri);

	var f1 = petWin.document.getElementById("fighter_1");
	var f2 = petWin.document.getElementById("fighter_2");
	if(vessel.side=="left_shl"){
		if(f1!=null&&f1!="undefine"){
			
			var b = 155+f1.height;
			var l =  f1.style.left.replace("px","")-vessel.width-20;
			if(b>=387){
			   b =100;
			   l = 0
			}
			vessel.style.bottom = b;
			vessel.style.left = l;
		}else{
			vessel.style.bottom = 200;
			vessel.style.left = 100;
		}
		
	}else if(vessel.side=="right_shl"){
		if(f2!=null&&f2!="undefine"){

			var b = 155+f2.height;
			var l =  parseInt(f2.style.left.replace("px",""))+15+f2.width*bignum;
			if(b>=387){
			   b =100;
			   l = 410;
			}
			vessel.style.bottom = b;
			vessel.style.left = l;
		}else{
			vessel.style.bottom = 200;
			vessel.style.left = 100;
		}
	}
	vessel.style.display="";
}

function centerPicObjEGao(vessel,picUri,bignum){
	vessel.style.display="none";
	// cachePic(vessel,picUri);

	var f1 = petWin.document.getElementById("fighter_1");
	var f2 = petWin.document.getElementById("fighter_2");
	if(vessel.side=="left_egao"){
		if(f1!=null&&f1!="undefine"){
			
			var b = 155+f1.height;
			var l =  f1.style.left.replace("px","")-vessel.width;
			if(b>=387){
			   b =100;
			   l = 0
			}
			vessel.style.bottom = b;
			vessel.style.left = l;
		}else{
			vessel.style.bottom = 200;
			vessel.style.left = 105;
		}
		
	}else if(vessel.side=="right_egao"){
		if(f2!=null&&f2!="undefine"){

			var b = 155+f2.height;
			var l =  parseInt(f2.style.left.replace("px",""))+f2.width*bignum;
			if(b>=387){
			   b =100;
			   l = 410;
			}
			vessel.style.bottom = b;
			vessel.style.left = l;
		}else{
			vessel.style.bottom = 200;
			vessel.style.left = 105;
		}
	}
	vessel.style.display="";
}
function changeLeftFighter(pic){
	try{
		p._cachePic(petWin.document.getElementById("fighter_1"),pic);
		p._cachePic(petWin.document.getElementById("fighter_1s"),pic);
	}catch(x){}
}
function changeRightFighter(pic){
	try{
		p._cachePic(petWin.document.getElementById("fighter_2"),pic);
		p._cachePic(petWin.document.getElementById("fighter_2s"),pic);
	}catch(x){}
}
//out String// /for 战斗
function backCJ(){
	p.cmd('look');
	p.addRM("<font color=blue>点左上角的场景名称可以切换回战斗场景</font><br>");
}
function _combat(leftSHL,rightSHL,leftPic,rightPic,
	leftName,leftLv,leftHPWidth,leftHP,leftMaxHP,leftSPWidth,leftSP,leftMaxSP,
	rightName,rightLv,rightHPWidth,rightHP,rightMaxHP,rightSPWidth,rightSP,rightMaxSP,
	rightLvDesc,roomPic,
	eHashCode,
	leftEGaoPic,leftEGaoPicType,rightEGaoPic,rightEGaoPicType,
	leftbignum,rightbignum
){
	closeRenPic();
	cls();
	cps('combat');
	enemyHashCode=eHashCode;


	// addRM("<font
	// color=red><u>"+leftName+"</u>和<u>"+rightName+"</u>在战斗中...</font><br><br>");

	var rp;
	if(roomPic!=null&&"null"!=roomPic&&_getCombatPic()>0){
		rp="<img src=img/blank.gif width=615 height=385 style='margin-left:3px;filter:alpha(opacity="+_getCombatPic()+");' onload=\"p.cachePic(this,'"+roomPic+"');\">";
	}else{
		rp="";
	}

	var leftSHLImg = "";
	var rightSHLImg = "";	
		if(leftSHL&&leftSHL!=""){
		leftSHLImg = "<img src='"+leftSHL+"' onload=\"p.centerPicObjSHL(this,'"+leftSHL+"',"+leftbignum+");\" side='left_shl' id='fighter_1_SHL' style='filter:fliph alpha(opacity=75);position: absolute; left: 148;bottom: 155;visibility:visible;z-index: 10;'>";
	}
	if(rightSHL&&rightSHL!=""){
		rightSHLImg = "<img src='"+rightSHL+"' onload=\"p.centerPicObjSHL(this,'"+rightSHL+"',"+rightbignum+");\" side='right_shl' id='fighter_2_SHL' style='filter:alpha(opacity=75);position: absolute; left: 308;bottom: 155;visibility:visible;z-index: 10;'>";
	}

	var leftEGao = "";
	var rightEGao = "";	
	if(leftEGaoPic&&leftEGaoPic!=""){
		if(leftEGaoPicType==EGAOPICTYPE_ALL){
			leftPic=leftEGaoPic;
		}else if(leftEGaoPicType==EGAOPICTYPE_NOTALL){
			leftEGao="<img src='"+leftEGaoPic+"' onload=\"p.centerPicObjEGao(this,'"+leftEGaoPic+"',"+leftbignum+");\" side='left_egao' id='fighter_1_egao' style='filter:fliph alpha(opacity=75);position: absolute; left: 156;bottom: 215;visibility:visible;z-index: 10;'>";
		}
	}
	if(rightEGaoPic&&rightEGaoPic!=""){
		if(rightEGaoPicType==EGAOPICTYPE_ALL){
			rightPic=rightEGaoPic;
		}else if(rightEGaoPicType==EGAOPICTYPE_NOTALL){
			rightEGao = "<img src='"+rightEGaoPic+"' onload=\"p.centerPicObjEGao(this,'"+rightEGaoPic+"',"+leftbignum+");\" side='right_egao' id='fighter_r_egao' style='filter:alpha(opacity=75);position: absolute; left: 380;bottom: 215;visibility:visible;z-index: 10;'>";
		}
	}
	


	changePageBody(""
		+rp
		+"<INPUT TYPE=\"button\" value=\"逃跑\" style=\"position: absolute;left:545;top:329;bottom:155;visibility:visible;z-index:15;font-size:9pt;padding-top:2px;padding-left:2px;background-color:#5AA2BA;border:0px solid #FFFFFF;cursor:hand;color:#E9F2F5;\" onclick=\"p.cmd('tao');return false;\" hidefocus=true>"
		+"<INPUT TYPE=\"button\" value=\"返回\" style=\"position: absolute;left:580;top:329;bottom:155;visibility:visible;z-index:15;font-size:9pt;padding-top:2px;padding-left:2px;background-color:#5AA2BA;border:0px solid #FFFFFF;cursor:hand;color:#E9F2F5;\" onclick=\"p.backCJ();return false;\" hidefocus=true>"

		// +"<input type=button value=逃跑 style='position: absolute; left:
		// 440;top:200;bottom: 155;visibility:visible;z-index:
		// 15;font-size:9pt;' onclick=\"p.cmd('tao');return false;\">"
		// +"<input type=button value=返回 style='position: absolute; left:
		// 475;top:200;bottom: 155;visibility:visible;z-index:
		// 15;font-size:9pt;' onclick=\"p.backCJ();return false;\">"

		+"<img src='img/blank.gif' id=nextTask style='position: absolute; left: 30;top:100;bottom: 155;visibility:visible;z-index: 15;'>"
		+"<img src='img/blank.gif' id=enemyNextTask style='position: absolute; left: 440;top:100;bottom: 155;visibility:visible;z-index: 15;'>"
		
		+"<img src='"+leftPic+"' onload=\"p.centerPicObj(this,'"+leftPic+"',165);p.bigFighter(this,"+leftbignum+");\" side='left' id='fighter_1' style='filter:fliph;position: absolute; left: 148;bottom: 155;visibility:visible;z-index: 10;'>"
		+leftSHLImg
		+leftEGao
		// +"<img src='img/blank.gif' onload=\"p.cachePic(this,'"+leftPic+"');\"
		// id='fighter_1s' style='display:none;position: absolute; left:
		// 148;bottom: 155;visibility:visible;z-index: 9;'>"
		+"<img src='img/blank.gif' id='fighter_1s' style='display:none;position: absolute; left: 148;bottom: 155;visibility:visible;z-index: 9;'>"
		+"<img src='"+rightPic+"' onload=\"p.centerPicObj(this,'"+rightPic+"',358);p.bigFighter(this,"+rightbignum+");\" side='right' id='fighter_2' style='position: absolute; left: 308;bottom: 155;visibility:visible;z-index: 10;'>"
		
		// +"<img src='img/blank.gif'
		// onload=\"p.cachePic(this,'"+rightPic+"');\" id='fighter_2s'
		// style='display:none;filter:fliph;position: absolute; left:
		// 408;bottom: 155;visibility:visible;z-index: 9;'>"
		+"<img src='img/blank.gif' id='fighter_2s' style='display:none;filter:fliph;position: absolute; left: 408;bottom: 155;visibility:visible;z-index: 9;'>"
		+rightSHLImg
		+rightEGao
		+"<div style='height:65;width:200;position: absolute; left: 7;top: 45;visibility:visible;z-index: 7;background-color:#74B8C8;padding-bottom:5px;padding-top:5px;padding-left:10px;padding-right:10px;filter:alpha(opacity=60);'></div>"
		+"<div style='height:75;width:200;position: absolute; left: 7;top: 45;visibility:visible;z-index: 8;padding-bottom:5px;padding-top:5px;padding-left:10px;padding-right:10px;'>"
		+"	"+leftName+"  等级:"+leftLv+"<br>"
		+"	<table  border='0' cellpadding='0' cellspacing='0'><tr>"
		+"	<td width=20><b><font color='#004E5E' face=arial>HP</font></b></td>"
		+"	<td width=3></td>"
		+"	<td width=92>"
			+"<table width='92' border='0' cellpadding='0' cellspacing='1' bgcolor=#4797B2><tr>"
			+"<td width='100%' bgcolor=#247410 width=90>"
			+"<table style='width:"+leftHPWidth+";height:10;' bgcolor=#89E773 id='hpLine_left' name='hpLine_left'  border='0' cellpadding='0' cellspacing='0'><tr><td></td></tr></table>"
			+"</td>"
			+"</tr></table>"

		+"	</td>"
		+"	<td width=5></td>"
		+"	<td align=left><font face=arial style='font-size:7.5pt;'><span id='hpLine_left_no' name='hpLine_left_no'>"+leftHP+"</span>/"+leftMaxHP+"</font></td>"
		+"	</table>"

		+"	<table  border='0' cellpadding='0' cellspacing='0'><tr>"
		+"	<td width=20><b><font color='#004E5E' face=arial>SP</font></b></td>"
		+"	<td width=3></td>"
		+"	<td width=92>"

			+"<table width='92' border='0' cellpadding='0' cellspacing='1' bgcolor=#4797B2><tr>"
			+"<td width='100%' bgcolor=#035B9C width=90>"
			+"<table style='width:"+leftSPWidth+";height:10;' bgcolor=#63B2FF id='mpLine_left' name='mpLine_left'  border='0' cellpadding='0' cellspacing='0'><tr><td></td></tr></table>"
			+"</td>"
			+"</tr></table>"

		+"	</td>"
		+"	<td width=5></td>"
		+"	<td align=left><font face=arial style='font-size:7.5pt;'><span id='mpLine_left_no' name='mpLine_left_no'>"+leftSP+"</span>/"+leftMaxSP+"</font></td>"
		+"	</table>"
		+"</div>"

		+"<div style='height:65;width:200;position: absolute; left: 416;top: 45;visibility:visible;z-index: 7;background-color:#74B8C8;padding-bottom:5px;padding-top:5px;padding-left:10px;padding-right:10px;filter:alpha(opacity=60);'></div>"
		+"<div style='height:75;width:200;position: absolute; left: 416;top: 45;visibility:visible;z-index: 8;padding-bottom:5px;padding-top:5px;padding-left:10px;padding-right:10px;'>"
		+"	"+rightName+""
		+"  等级:"+replaceAll(rightLvDesc,"color=","")+"<br>"
		+"	<table  border='0' cellpadding='0' cellspacing='0'><tr>"
		+"	<td width=20><b><font color='#004E5E' face=arial>HP</font></b></td>"
		+"	<td width=3></td>"
		+"	<td width=92>"

			+"<table width='92' border='0' cellpadding='0' cellspacing='1' bgcolor=#4797B2><tr>"
			+"<td width='100%' bgcolor=#247410 width=90>"
			+"<table style='width:"+rightHPWidth+";height:10;' bgcolor=#89E773 id='hpLine_right' name='hpLine_right'  border='0' cellpadding='0' cellspacing='0'><tr><td></td></tr></table>"
			+"</td>"
			+"</tr></table>"

		+"	</td>"
		+"	<td width=5></td>"
		+"	<td align=left><font face=arial style='font-size:7.5pt;'><span id='hpLine_right_no' name='hpLine_right_no'>"+rightHP+"</span>/"+rightMaxHP+"</font></td>"
		+"	</table>"

		+"	<table  border='0' cellpadding='0' cellspacing='0'><tr>"
		+"	<td width=20><b><font color='#004E5E' face=arial>SP</font></b></td>"
		+"	<td width=3></td>"
		+"	<td width=92>"

			+"<table width='92' border='0' cellpadding='0' cellspacing='1' bgcolor=#4797B2><tr>"
			+"<td width='100%' bgcolor=#035B9C width=90>"
			+"<table style='width:"+rightSPWidth+";height:10;' bgcolor=#63B2FF id='mpLine_right' name='mpLine_right'  border='0' cellpadding='0' cellspacing='0'><tr><td></td></tr></table>"
			+"</td>"
			+"</tr></table>"

		+"	</td>"
		+"	<td width=5></td>"
		+"	<td align=left><font face=arial style='font-size:7.5pt;'><span id='mpLine_right_no' name='mpLine_right_no'>"+rightSP+"</span>/"+rightMaxSP+"</font></td>"
		+"	</table>"
		+"</div>"

		// +"<div id='innerReader'
		// style='padding-bottom:5px;padding-top:5px;padding-left:10px;padding-right:10px;word-break:break-all;overflow-y:scroll;height:125;width:508;background-color:#74B8C8;position:
		// absolute; left: 3;top: 225;visibility:visible;z-index:
		// 10;'><u>"+leftName+"</u>和<u>"+rightName+"</u>的在战斗中...<br><br></div>"

		+"<span id='fighter_1_hp' style='display:none;position: absolute; left: 144;top: 135;visibility:visible;z-index: 11;font-weight:bold;color:#FF0000;font-size:18pt;'></span>"
		+"<span id='fighter_2_hp' style='display:none;position: absolute; left: 324;top: 135;visibility:visible;z-index: 11;font-weight:bold;color:#FF0000;font-size:18pt;'></span>"

		+"<span id='fighter_1_status' name='fighter_1_status' style='display:none;position: absolute; left: 144;top: 100;visibility:visible;z-index: 11;color:#FF0000;font-size:9pt;'></span>"
		+"<span id='fighter_2_status'  name='fighter_2_status' style='display:none;position: absolute; left: 324;top: 100;visibility:visible;z-index: 11;color:#FF0000;font-size:10.5pt;font-weight:bold;'></span>"
	);
	showFightTaskImg();
}

function _getAddStr(num){
	if (num!=0){
		if(num>0){
			//t="<font color=green><b> +"+num+"</b></font>";
			return "+"+num+"";
		}else{
			//t="<font color=red><b> "+num+"</b></font>";
			return ""+num+"";
		}
	}
	return "";
}
function _getAddStrColor(num){
	if (num!=0){
		if(num>0){
			return "font-weight:bold;color:green;";
		}else{
			return "font-weight:bold;color:red;";
		}
	}
	return "hand;color:black;";
}

///////////
// var mapWin;
function openMapWin(){
	mapWin=window.open('http://mfl.imop.com/static/upload_pic/05/0824/1124869294749.gif');
}
//////////


// 如果isBack==true\, 不刷新伏击对象。
function setRoom(r,isBack){
	room=r;
	// addTitle(r);
	s_nowRoom.innerHTML=r;

	try{
		mapWin.move(getRoom());
	}catch(x){err(x);}
	eventOnMove();// 移动事件执行
	if(!isBack){
		fuji = -1;
	}
}

//function setRoom(r){/
// setRoom(r,false);
// }
function getRoom(){
	return room;
}

function buyItem(item,path,canAmount){
	if(!canAmount){
		if(confirm('确认要购买 ['+item+'] ?')){
			cmd("buy "+path+" 1");
		}
	}else{
		
		var input=prompt('请输入要购买 ['+item+'] 的数量',1);
		if(input!=null){
			if(checkInt(input)){
				if(input<1){
					alert("购买数量不能小于1个!");
					buyItem(item,path,canAmount);
				}else if(input>9999){
					alert("购买数量不能多于9999个!");
					buyItem(item,path,canAmount);
				}else{
					cmd("buy "+path+" "+input);
				}
			}else{
				alert("请输入正确的数字!");
				buyItem(item,path,canAmount);
			}
		}
	}
}



//积分商场兑换
function jiFenExchageItem(item,path,canAmount){
	//if(!canAmount){
		if(confirm('你确定要兑换 ['+item+'] ?')){
			cmd("JingJiChang shop "+path+" 1");
		}
	//}
	
	//else{

//		var input=prompt('请输入要兑换 ['+item+'] 的数量',1);
// if(input!=null){
// if(checkInt(input)){
// if(input<1){
// alert("兑换数量不能小于1个!");
// jiFenExchageItem(item,path,canAmount);
// }else if(input>9999){
// alert("兑换数量不能多于9999个!");
// jiFenExchageItem(item,path,canAmount);
// }else{
// cmd("JiFenShanCheng "+path+" "+input);
// }
// }else{
// alert("请输入正确的数字!");
// jiFenExchageItem(item,path,canAmount);
// }
// }
// }
}


function addCM(mes){
	addMessage('chatReader',mes);
}
function addMY(mes){
	addMessage('chatMyReader',mes);
}
function addRM(mes){
	addMessage('roomReader',mes);
}
function addIM(mes){
	addMessage('infoReader',mes);
}
function addNPCC(mes){
	addMessage('npcChatReader',mes);
}
function addNPTM(mes){
	var bg=document.getElementById("renPicBG");
	bg.style.display="none";
	document.getElementById('npcTaskReader').style.display="";
	addMessage('npcTaskReader',mes);
}

function _look(name){
	addRM("<font color=#760080>"+name+"盯着你左瞧右看,似乎又在动什么歪脑筋了.</font><br>");
}

//title:start

function changeTitle(){
	try{top.document.title=theTitle;}catch(x){}
}
//function addTitle(s){
//	top.document.title=theTitle+" 【"+s+"】";
// }

// 战斗效果


function combatDisply(){
	if(huaLi==true){
		huaLi=false;
		combatDisply_d.innerHTML="关";
	}else{
		huaLi=true;
		combatDisply_d.innerHTML="开";
	}
}
//title:end
function reOnlineNum(s,i,userId){
	try{
		//onlineNum.innerHTML=s;
		imEvent(i,userId);
	}catch(x){err("reOnlineNum(s)"+x);}
}
//debug:start
var isDebug=false;
function openDebug(){
	try{
		if(!isDebug){
			with(document.all){
				actionWin_1.width=50;
				actionWin_1.height=50;
				actionWin_2.width=50;
				actionWin_2.height=50;
				actionWin_3.width=50;
				actionWin_3.height=50;
				actionWin_my.width=50;
				actionWin_my.height=50;
				workerWin.width=50;
				workerWin.height=50;
				reWin.width=50;
				reWin.height=50;
			}
			isDebug=true;
		}else{
			with(document.all){
				actionWin_1.width=0;
				actionWin_1.height=0;
				actionWin_2.width=0;
				actionWin_2.height=0;
				actionWin_3.width=0;
				actionWin_3.height=0;
				actionWin_my.width=0;
				actionWin_my.height=0;
				workerWin.width=0;
				workerWin.height=0;
				reWin.width=0;
				reWin.height=0;
			}
			isDebug=false;
		}
	}catch(x){err("reOnlineNum(s)"+x);}
}
//debug:end
function _getShowIString(arr,coinStr,aItemNum){
	if (aItemNum==null || aItemNum<=0){
		aItemNum=25;	
	}
	var hasNum;
	if(arr==null){
		hasNum=0;
	}else{
		hasNum=arr.length;
	}


	var o=""
	// +"<font color=blue>携带道具:
	// "+arr.length+"</font><style>.sP{font-size:10px;}</style><div align=right
	// id='divItemBarCoin'>"+coinStr+"</div><div id='showItems'
	// style='margin-top:4px;'><table border=0 cellpadding='0' cellspacing='0'
	// width=100%>";
	+"<font color=blue>携带道具: <b style=\"color:"+(hasNum>=aItemNum?"red":"blue")+"\">"+hasNum+"</b> /"+aItemNum+"</font><style>.sP{font-size:10px;}</style><div id='divItemBarCoin' ><table width=100% border=0><tr><td align=left ><A HREF=./turnMaoYan.jsp target=_blank><FONT COLOR=blue>【兑换猫眼】</FONT></A></td><td align=right>"+coinStr+"</td></tr></table></div><div id='showItems' style='margin-top:4px;'><table border=0 cellpadding='0' cellspacing='0' width=100%>";
	// for(var i=0;i<arr.length;i++){
	for(var i=0;i<hasNum;i++){
		o+="<tr ";
		if(i%2==0){
			o+="bgcolor=#E1E1E1";
		}
		o+=" height=26 onclick=\"_toolName='"+arr[i][15]+"';_toolPath='"+arr[i][9]+"';_toolImg='"+arr[i][4]+"';_canEquip2='"+arr[i][5]+"';_canUse="+arr[i][6]+";_canEquip="+arr[i][7]+";_canFuHua="+arr[i][10]+"; _canFenJie="+arr[i][12]+";_canShow="+arr[i][13]+";_canXiu="+arr[i][14]+";_isSHLEgg="+arr[i][16]+";_canFeed="+arr[i][17]+"; toolsBar("+arr[i][3]+",this);\" style='cursor:hand;'>"
		+"<td><td width=32 valign=middle align=center><img src="+arr[i][8]+"></td><td width=5></td><td><font color="+arr[i][11]+">"+arr[i][0]+"</font></td><td width=30></td>"
		+"<td><font color=red><b>"+arr[i][1]+"</b>"+arr[i][2]+"</font></td>"
		+"</tr>"
		;
	}
	o+="</table></div>";
	
	return o;
}
function showIHide(arr,coinStr,aItemNum){
	//if(arr!=null){
	var winObj=_getWin("tools");
	if(winObj.style.display==""){
		_openWin("tools",_getShowIString(arr,coinStr,aItemNum));
	}
}
function showI(arr,coinStr,aItemNum){
	onOpenWin(_getWin("tools"));
	_openWin("tools",_getShowIString(arr,coinStr,aItemNum));
}

function showCoin(coinStr){
	var winObj=_getWin("tools");
	if(winObj.style.display==""){
		var divObj=document.getElementById("divItemBarCoin");
		try{
			if (divObj){
				divObj.innerHTML="<table width=100% border=0><tr><td align=left><A HREF=./turnMaoYan.jsp target=_blank><FONT COLOR=blue>【兑换猫眼】</FONT></A></td><td align=right>"+coinStr+"</td></tr></table>";
			}
		}catch(ex){
		}
	}
}


//show chat// ///////////////////////
function showOnChat(){
	document.all.showChatButton.style.backgroundColor="#b5e7ee";
	document.all.showChatButton.style.color="#3F8194";
	chatReaderOut.style.display="";
	showOffInfo();
	showOffThing();
	showOffFriend();
	showOffRank();
}
function showOffChat(){
	document.all.showChatButton.style.backgroundColor="#5AA2BA";
	document.all.showChatButton.style.color="#E9F2F5";
	chatReaderOut.style.display="none";
}
function showChat(){
	if(chatReaderOut.style.display=="none"){
		showOnChat();
	}else{
		//showOffChat();
	}
}
/////////////////////////
function showOnInfo(){
	document.all.showInfoButton.style.backgroundColor="#b5e7ee";
	document.all.showInfoButton.style.color="#3F8194";
	infoReaderOut.style.display="";
	showOffChat();
	showOffThing();
	showOffFriend();
	showOffRank();
}
function showOffInfo(){
	document.all.showInfoButton.style.backgroundColor="#5AA2BA";
	document.all.showInfoButton.style.color="#E9F2F5";
	infoReaderOut.style.display="none";
}
function showInfo(){
	if(infoReaderOut.style.display=="none"){
		showOnInfo();
	}else{
		//showOffInfo();
	}
}
/////////////////////////
// ///////////////////////
function showOnThing(){
	document.all.showThingButton.style.backgroundColor="#b5e7ee";
	document.all.showThingButton.style.color="#3F8194";
	thingReaderOut.style.display="";
	showOffChat();
	showOffInfo();
	showOffFriend();
	showOffRank();
}
function showOffThing(){
	document.all.showThingButton.style.backgroundColor="#5AA2BA";
	document.all.showThingButton.style.color="#E9F2F5";
	thingReaderOut.style.display="none";
}
function showThing(){
	if(thingReaderOut.style.display=="none"){
		showOnThing();
	}else{
		//showOffThing();
	}
}
/////////////////////////
// ///////////////////////
function showOnFriend(){
	document.all.showFriendButton.style.backgroundColor="#b5e7ee";
	document.all.showFriendButton.style.color="#3F8194";
	friendReaderOut.style.display="";
	showOffChat();
	showOffInfo();
	showOffThing();
	showOffRank();
}
function showOffFriend(){
	document.all.showFriendButton.style.backgroundColor="#5AA2BA";
	document.all.showFriendButton.style.color="#E9F2F5";
	friendReaderOut.style.display="none";
}
function showFriend(){
	if(friendReaderOut.style.display=="none"){
		showOnFriend();
	}else{
		//showOffThing();
	}
}
/////////////////////////
// ///////////////////////
function showOnRank(){
	document.all.showRankButton.style.backgroundColor="#b5e7ee";
	document.all.showRankButton.style.color="#3F8194";
	rankReaderOut.style.display="";
	showOffChat();
	showOffInfo();
	showOffThing();
	showOffFriend();
}
function showOffRank(){
	document.all.showRankButton.style.backgroundColor="#5AA2BA";
	document.all.showRankButton.style.color="#E9F2F5";
	rankReaderOut.style.display="none";
}
function showRank(){
	if(rankReaderOut.style.display=="none"){
		showOnRank();
	}else{
		//showOffThing();
	}
}
/////////////////////////
function changeChatAll(c){
	if(c.checked){
		addMY("<font color=#EC2313>全局聊天,全部玩家都可以看到你的话 <br><b>&nbsp;&nbsp;㊣ 频繁发表无用言论会被封掉 ㊣</b></font><br>");
		selectOption(-1);
		setTalkTo(-1);
	}else{
		addMY("<font color=#F16458>场景聊天模式,只有本场景的玩家可以看到你的话.</font><br>");
	}
	getObj("chat_rank").checked=false;
	getObj("chat_party").checked=false;
}
function changeChatPrivate(c){
	if(c.checked){
		addMY("<font color=#34792F>私聊模式,仅你和你的谈话对象可以看到.</font><br>");
	}else{
		addMY("<font color=#54BA4B>取消私聊模式,别人可以看到您的话.</font><br>");
	}
}
function changeChatRank(c){
	if(c.checked){
		addMY("<font color=#34792F>队伍聊天模式,仅队伍中的玩家可以看到.</font><br>");
		selectOption(-1);
		setTalkTo(-1);
	}else{
		addMY("<font color=#54BA4B>取消队伍聊天模式.</font><br>");
	}
	getObj("chat_all").checked=false;
	getObj("chat_party").checked=false;

}

function changeChatParty(c){
	if(c.checked){
		addMY("<font color=#34792F>公会聊天模式,公会中的玩家可以看到.</font><br>");
		selectOption(-1);
		setTalkTo(-1);
	}else{
		addMY("<font color=#54BA4B>取消公会聊天模式.</font><br>");
	}
	getObj("chat_all").checked=false;
	getObj("chat_rank").checked=false;
}

///////////////////////
function setTalkTo(userId){
	document.all("talkToId").value=userId;
}
function talkTo(id,name){
	try{
		if(id==myId){
			addMY("<font color=red>对自己说话?</font><br>");
			showOnChat();
			return;
		}
		getObj("chatChannel").value="";
		addTalkToUser(name,id);
		setTalkTo(id);
		focusMes();
	}catch(x){'talkTo()'+alert(x);}
}
function addTalkToUser(name, id) {
	addOption(id,name);
}
function selTalkTo(){
	var input=prompt('请输入交谈对象名',"");
	if(input!=null){
		if(""==input){
			alert("请输入正确的用户名!");
			selTalkTo();
			return;
		}else{
			getToTalkUser(input);
		}
	}else{
		//选到区域上:start
		setTalkTo(-1);
		listChatChannel="-1";
		getObj("chatChannel").value="";
		// :end
	}
}
function getToTalkUser(input){
	actionWin_my.location.href="action.jsp;jsessionid="+sessionId+"?action=getUser&name="+input;
		// 选到区域上:start
		setTalkTo(-1);
		listChatChannel="-1";
		getObj("chatChannel").value="";
		// :end

}
function huanZhongHong(){
	var input=prompt('你准备使用多少个小补血剂来合成中型补血剂',"全部");
	if(input!=null){
		cmd("hezhonghong "+input);
	}
}
function huanDaHong(){
	var input=prompt('你准备使用多少个中型补血剂来合成大型补血剂',"全部");
	if(input!=null){
		cmd("hedahong "+input);
	}
}

function huanZhongLan(){
	var input=prompt('你准备使用多少个小魔法剂来合成中魔法剂',"全部");
	if(input!=null){
		cmd("hezhonglan "+input);
	}
}
function huanDaLan(){
	var input=prompt('你准备使用多少个中魔法剂来合成大魔法剂',"全部");
	if(input!=null){
		cmd("hedalan "+input);
	}
}

//function askSellItem(){
//	var input=prompt('你准备卖什么道具?',"请输入道具名");
// if(input!=null){
// cmd("sellvalue "+input);
// }
// }
function yaoyan(){
	var input=prompt('你要发什么匿名消息?',"");
	if(input!=null){
		var len = input.length;
		if(len>100){
			alert("您输入的文字数量超过上限"+(len-100)+"字，不能发送！");
		}else{
			cmd("rumor "+input);
		}
	}
}
/*
function setNick(){
	var input=prompt('请输入你想设置的称号(清除输入cls):',"");
	if(input!=null){
		cmd("title "+input);
	}
}
*/
function dropItem(name,item){
	var input=prompt('请输入要丢弃 ['+name+'] 的数量',"全部");
	if(input!=null){
		if(checkInt(input)||"全部"==input){
			if(input<1){
				alert("丢弃数量不能小于1个!");
				dropItem(name,item);
			}else{
				if(confirm('确认要丢弃 ['+name+'] x '+input+' ?')){
					cmd("drop "+item+" "+input);
				}
			}
		}else{
			alert("请输入正确的数字!");
			dropItem(name,item);
		}
	}
}
function fuhuadan(){
	var input=prompt('你有白色宠物蛋吗?先给你的宝宝起个名字吧!',"");
	if(input!=null){
		if(input.trim()==""){
			alert("请输入你打算给你的宠物起的名字!");
			fuhuadan();
		}else{
			cmd("fuhua "+input);
		}
	}
}


function fakeBr(height){
	return "<table height="+height+" width=1 cellpadding=0 cellspacing=0><tr><td></td></tr></table>"
}

function _saveSet(){

	var pos="";
	for(var i=0;i<winList.length;i++){
		var winLeft=delPx(_getWin(winList[i]).style.left);
		var winTop=delPx(_getWin(winList[i]).style.top);
		if(winLeft<0){
			winLeft=0;
		}
		if(winTop<0){
			winTop=0;
		}
		pos+=winLeft+"$"+winTop+"}";
	}
	var channelString="";
	for(var i=0;i<channel.length;i++){
		channelString+=(i!=0?"}":"")+channel[i];
	}
	actionWin_my.location.href="action.jsp;jsessionid="+sessionId+"?action=saveSet&args="+huaLi+","+_getCombatPic()+","+getAutoCenter()+","+pos+","+lianJiNeng+","+kuaiJieJian+","+showToolsButton+","+openPKButton+","+channelString+","+noautofightwin+","+noShowTipWin+","+bosskey+","+getObj("chatReaderOut").height+","+openDISPLAYButton+","+openDisSecondCode+","+openAlertOnWindowClose+","+pingBiZhanDouInfo+",";
}

function setPetName(s){
	getObj("_petName").innerHTML=s;
	petName=s;
}
function getPetName(){
	return getObj("_petName").innerHTML;
}

function changeMap(s){
	document.all("mapWin").src="map/"+s+".html";
}

function changeLingHunMap(){
	petWin.playerList.style.display='none';
	document.all("mapWin").src="showlinghun.jsp";
}
function _keyPress(){
	try{
		var _code=-1;
		try{
			_code=event.keyCode;
		}catch(x){
			try{
				_code=mapWin.event.keyCode;
			}catch(x){
				_code=petWin.event.keyCode;
			}
		}
		//bossKey
		if(bosskey&&_code==192){
			var obj=document.all("bossPic");
			if(obj.style.display=="none"){
				obj.style.display="";
				try{parent.parent.document.getElementById("frameTop").rows="0,*";}catch(x){}
				try{top.document.title="新建文档 - Mickeysoft word";}catch(x){}
			}else{
				obj.style.display="none";
				changeTitle();
			}

			event.returnValue=false;
			event.cancelBubble=true;
			return;
		}

		if(_code==27){
			event.returnValue=false;
			event.cancelBubble=true;
			return;
		}
		if(event.ctrlKey&&_code==192){
			cmd("l");
			event.returnValue=false;
			event.cancelBubble=true;
			return;
		}
		if(getPageState()=="zone"){
			with(mapWin.document.body){
				if(_code==39||_code==37||_code==38||_code==40){//右
					// scrollLeft=scrollLeft+20;
				}else if(_code==37){//左
					// scrollLeft=scrollLeft-20;
				}else if(_code==38){//上
					// scrollTop=scrollTop-20;
				}else if(_code==40){//下
					// scrollTop=scrollTop+20;
				}
			}
		}
		//映射ctrl 1~0:start
		// alert(_code);
		var useIndex=-1;
		if(kuaiJieJian==2){
			if(_code>=48&&_code<=57){
				if(_code==48){
					useIndex=9;
				}else{
					useIndex=_code-49;
				}
			}
		}else if(kuaiJieJian==1){
			if(event.altKey){
				if(_code>=48&&_code<=57){
					if(_code==48){
						useIndex=9;
					}else{
						useIndex=_code-49;
					}
				}
			}
		}
		if(event.altKey){
			if(kuaiJieJian==1||kuaiJieJian==2){
				if(_code==81){
					useIndex=10;
				}else if(_code==87){
					useIndex=11;
				}else if(_code==69){
					useIndex=12;
				}else if(_code==82){
					useIndex=13;
				}else if(_code==84){
					useIndex=14;
				}else if(_code==89){
					useIndex=15;
				}else if(_code==85){
					useIndex=16;
				}
			}
		}

		if(useIndex!=-1){
			useCut(useIndex);
			event.returnValue=false;
			event.cancelBubble=true;
		}
		//映射ctrl 1~0:end
	}catch(x){
		err(x);
	}

	
		var _code111=-1;
		try{
			_code111=mapWin.event.keyCode;
			if(_code111==13){
				document.getElementById("inputid").focus();
				setRoom(getRoom(),true);
				event.returnValue=false;
				event.cancelBubble=true;
			}
			
		}catch(x){
			err(x);
		}
}
//左=37
// //
// 销售js
var sellTags=[];
function listSellTools(listArr,seled,str){
	var hasTags=listArr.length>0&&listArr[0].length==9;
	var isLimit=listArr.length>0&&listArr[0].length==10;
	
	if(hasTags){
		tags=sellTags;
		sellTags=[];
		/*
		 * var tags=[]; //生成select框 for(var i=0;i<listArr.length;i++){ var
		 * has=false;
		 * 
		 * for(var t=0;t<tags.length;t++){ if(tags[t]==listArr[i][8]){
		 * has=true; } } if(!has){ tags[tags.length]=listArr[i][8]; } }
		 */
	}

	var winObj=_getWin("listSellTools");
	onOpenWin(winObj);
	var o="";
	o+=fakeBr(4)
	if(str==undefined||str==null){
		o+="<font color=red>你想买什么?</font>";
	}else{
		o+=str;
	}

	//for tags select
	o+="<br>";
	if(hasTags){
		o+="<table width=100%><tr><td align=right>分类选择: <select onChange=\"cmd('list '+this.value);\">";
		for(var i=0;i<tags.length;i++){
			o+="<option "+(seled==tags[i]?"selected":"")+" value='"+tags[i]+"'>"+tags[i]+"</option>";
		}
		o+="</select></td></tr></table>";
	}

	o+="<table border=0 style='margin-top:3px;margin-bottom:6px;' width=100%>";
	var add;
	for(var i=0;i<listArr.length;i++){

		if(!hasTags||(hasTags&&listArr[i][8]==seled)){
			if (isLimit){
				add="<td title=销售个数>"+listArr[i][9]+"</td>";
				// o+="<tr><td><img src="+listArr[i][3]+"></td><td><a href=#
				// onclick=\"p.cmd('foo toolsSellTools
				// "+listArr[i][2]+"');return
				// false;\">"+listArr[i][0]+"</a></td><td
				// width=10></td><td>"+listArr[i][1]+"</td>"+add+"<td>&nbsp<a
				// href=#
				// onclick=\"p.buyItem('"+listArr[i][4]+"','"+listArr[i][2]+"',"+listArr[i][5]+");p.offOpenWin('listSellTools');
				// alert('aaaa');return false;\"><font
				// color=blue>【买】</font></a></td></tr>";
			}else{
				if(listArr[i].length==9){
					add="<td title=需要"+listArr[i][6]+"关系>"+listArr[i][7]+"</td>";
				}else if(listArr[i].length==8){
					add="<td title=需要"+listArr[i][6]+"关系>"+listArr[i][7]+"</td>";
				}else {
					add="";
				}			
			}
			o+="<tr><td><img src="+listArr[i][3]+"></td><td><a href=# onclick=\"p.cmd('foo toolsSellTools "+listArr[i][2]+"');return false;\">"+listArr[i][0]+"</a></td><td width=10></td><td>"+listArr[i][1]+"</td>"+add+"<td>&nbsp<a href=# onclick=\"p.buyItem('"+listArr[i][4]+"','"+listArr[i][2]+"',"+listArr[i][5]+");return false;\"><font color=blue>【买】</font></a></td></tr>";
		}
	}
	o+="</table>";
	_openWin("listSellTools",o);

}

//夺旗积分兑换
var exchangeTags=[];
function duoQiListExchangeTools(listArr){
	var winObj=_getWin("duoQiListExchangeTools");
	onOpenWin(winObj);
	with(winObj.style){
		width="300";	
		height="200";
	}
	var o="";
	o+=fakeBr(4);
	o+="<font color=red>你想换点什么?</font>";
	o+="<br>";
	o+="<table border=0 style='margin-top:3px;margin-bottom:6px;' width=100%>";
	for(var i=0;i<listArr.length;i++){		
			o+="<tr><td><img src="+listArr[i][0]+"></td><td><a href=# onclick=\"p.cmd('showItem "+listArr[i][1]+"');return false;\">"+listArr[i][2]+"</a></td><td width=10></td><td>"+listArr[i][3]+"积分</td><td>&nbsp<a href=# onclick=\"p.exchangeItem('"+listArr[i][4]+"','"+listArr[i][1]+"',"+listArr[i][5]+");return false;\"><font color=blue>【兑换】</font></a></td></tr>";
	}
	o+="</table>";
	_openWin("duoQiListExchangeTools",o);

}

function duoQiListExchangeTools2(listArr){
	var winObj=_getWin("duoQiListExchangeTools2");
	onOpenWin(winObj);
	with(winObj.style){
		width="400";	
		height="400";
	}
	var o="";
	o+=fakeBr(4);
	o+="<font color=red>你想换点什么?</font>";
	o+="<br>";
	o+="<table border=0 style='margin-top:3px;margin-bottom:6px;' width=100%>";
	for(var i=0;i<listArr.length;i++){		
			o+="<tr><td><img src="+listArr[i][0]+"></td><td><a  href=# onclick=\"p.cmd('showItem "+listArr[i][1]+"');return false;\">"+listArr[i][2]+"</a></td><td width=10></td><td>花费"+listArr[i][3]+"枚<a href=#  onclick=\"p.cmd('showItem fitems.duoqi.ZhanChangRongYuXunZhang');return false;\"><img src='img/itemlogo/duoqi/ZhanChangRongYuXunZhang.gif' style='border:0'/></a></td><td>&nbsp<a href=# onclick=\"p.exchangeItem('"+listArr[i][4]+"','"+listArr[i][1]+"',"+listArr[i][5]+");return false;\"><font color=blue>【兑换】</font></a></td></tr>";
	}
	o+="</table>";
	_openWin("duoQiListExchangeTools2",o);

}

function luXingShangRen(listArr){
	var winObj=_getWin("luXingShangRen");
	onOpenWin(winObj);
	with(winObj.style){
		width="400";	
		height="400";
	}
	var o="";
	o+=fakeBr(4);
	o+="<font color=red>随便看看，或许有你想要的?</font>";
	o+="<br>";
	o+="<table border=0 style='margin-top:3px;margin-bottom:6px;' width=100%>";
	for(var i=0;i<listArr.length;i++){		
			o+="<tr><td><img src="+listArr[i][0]+"></td><td><a  href=# onclick=\"p.cmd('showItemInBr "+listArr[i][1]+"');return false;\">"+listArr[i][2]+"</a></td><td width=10></td><td>花费<font color=red>"+listArr[i][3]+"</font>块矿石</td><td>&nbsp<a href=# onclick=\"p.cmd('exchangeinbr "+listArr[i][1]+"');return false;\"><font color=blue>【兑换】</font></a></td></tr>";
	}
	o+="</table>";
	_openWin("luXingShangRen",o);

}

//积分商城
var jiFenShanChengTypes=[];
function listJiFenShangChengTools(listArr,seled,str)
{
	var winObj=_getWin("listJiFenShangChengTools");
	onOpenWin(winObj);
	
	with(winObj.style){
		width="900";	
		height="550";
	}
	
	var o="";
	o+=fakeBr(4)
	
	o+="<br><table width='100%' height='95%' border='0' align='center' cellpadding='0' cellspacing='0' background='/img/jifenshop.jpg' style='margin-top:3px;margin-right:5px;margin-bottom:5px;'><tr><td valign='top'>";
	o=o+"<table border='0' cellpadding='0' cellspacing='0' height='100%' width='100%' background='/img/jifenshop.jpg' ><tr><td width='30%'>&nbsp;</td><td>";
	
	o=o+"<table><tr><td>";
	if(str==undefined||str==null){
		o+="<font color=red>你想兑换什么?</font>";
	}else{
		o+=str;
	}	
	o=o+"</td></tr></table>";
	tags = jiFenShanChengTypes;
	// for tags select
	o+="<br>";
	var hasTags = false;
	if(tags.length>0)
	{
		hasTags=true;
	}
		
	if(hasTags){
		o+="<table width=100%><tr><td align=right>分类选择: <select onChange=\"cmd('JingJiChang shop '+this.value);\">";
		for(var i=0;i<tags.length;i++){
			o+="<option "+(seled==tags[i][0]?"selected":"")+" value='"+tags[i][0]+"'>"+tags[i][1]+"</option>";
		}
		o+="</select></td></tr></table>";
	}

	o+="<table border=0  width=100% height=250;>";	
	
	  for(var i=0;i<listArr.length;i++)
	  {
		  if(listArr[i][6]==seled){
			o+="<tr><td><img src="+listArr[i][2]+"></td><td><a href=# onclick=\"p.cmd('JingJiChang shop desc "+listArr[i][1]+"');return false;\">"+listArr[i][0]+"</a></td><td width=10></td><td><font color=blue>"+listArr[i][5]+"积分</font></td>"+"<td>&nbsp<a href=# onclick=\"p.jiFenExchageItem('"+listArr[i][3]+"','"+listArr[i][1]+"',"+listArr[i][4]+");return false;\"><font color=blue>【兑换】</font></a></td></tr>";
		 }
	
	  }
	  o+="</td></tr></table>";
	
	o+="</td></tr></table>";
	
	
	_openWin("listJiFenShangChengTools",o);

}




//////////////by zjm
//
function listSellMMTools(listArr,seled,str){
	var hasTags=listArr.length>0&&listArr[0].length==9;
	var isLimit=listArr.length>0&&listArr[0].length==10;
	
	if(hasTags){
		tags=sellTags;
		sellTags=[];
		/*
		 * var tags=[]; //生成select框 for(var i=0;i<listArr.length;i++){ var
		 * has=false;
		 * 
		 * for(var t=0;t<tags.length;t++){ if(tags[t]==listArr[i][8]){
		 * has=true; } } if(!has){ tags[tags.length]=listArr[i][8]; } }
		 */
	}

	var winObj=_getWin("listSellTools");
	onOpenWin(winObj);
	var o="";
	o+=fakeBr(4)
	if(str==undefined||str==null){
		o+="<font color=red>你想买什么?</font>";
	}else{
		o+=str;
	}

	//for tags select
	o+="<br>";
	if(hasTags){
		o+="<table width=100%><tr><td align=right>分类选择: <select onChange=\"cmd('list '+this.value);\">";
		for(var i=0;i<tags.length;i++){
			o+="<option "+(seled==tags[i]?"selected":"")+" value='"+tags[i]+"'>"+tags[i]+"</option>";
		}
		o+="</select></td></tr></table>";
	}

	o+="<table border=0 style='margin-top:3px;margin-bottom:6px;' width=100%>";
	var add;
	for(var i=0;i<listArr.length;i++){

		if(!hasTags||(hasTags&&listArr[i][8]==seled)){
			if (isLimit){
				add="<td title=销售个数>"+listArr[i][9]+"</td>";
				// o+="<tr><td><img src="+listArr[i][3]+"></td><td><a href=#
				// onclick=\"p.cmd('foo toolsSellTools
				// "+listArr[i][2]+"');return
				// false;\">"+listArr[i][0]+"</a></td><td
				// width=10></td><td>"+listArr[i][1]+"</td>"+add+"<td>&nbsp<a
				// href=#
				// onclick=\"p.buyItem('"+listArr[i][4]+"','"+listArr[i][2]+"',"+listArr[i][5]+");p.offOpenWin('listSellTools');
				// alert('aaaa');return false;\"><font
				// color=blue>【买】</font></a></td></tr>";
			}else{
				if(listArr[i].length==9){
					add="<td title=需要"+listArr[i][6]+"关系>"+listArr[i][7]+"</td>";
				}else if(listArr[i].length==8){
					add="<td title=需要"+listArr[i][6]+"关系>"+listArr[i][7]+"</td>";
				}else {
					add="";
				}			
			}
			o+="<tr><td><img src="+listArr[i][3]+"></td><td><a href=# onclick=\"p.cmd('exchangeMMTools "+listArr[i][2]+"');return false;\">"+listArr[i][0]+"</a></td><td width=10></td><td>"+listArr[i][1]+"</td>"+add+"<td>&nbsp<a href=# onclick=\"p.buyItemMM('"+listArr[i][4]+"','"+listArr[i][2]+"',"+listArr[i][5]+");return false;\"><font color=blue>【买】</font></a></td></tr>";
		}
	}
	o+="</table>";
	_openWin("listSellTools",o);

}


function buyItemMM(item,path,canAmount){
	if(!canAmount){
		if(confirm('确认要购买 ['+item+'] ?')){
			cmd("buyMM "+path+" 1");
		}
	}else{

		var input=prompt('请输入要购买 ['+item+'] 的数量',1);
		if(input!=null){
			if(checkInt(input)){
				if(input<1){
					alert("购买数量不能小于1个!");
					buyItem(item,path,canAmount);
				}else{
					cmd("buyMM "+path+" "+input);
				}
			}else{
				alert("请输入正确的数字!");
				buyItem(item,path,canAmount);
			}
		}
	}
}
/////////// end by zjm


// //////////////////战斗背景

function selCombatPic(v){
	combatPicTouMing=v;
}
function _getCombatPic(){
	return combatPicTouMing;
}
///////////////////
// //////////////////自动局中


function setAutoCenter(v){
	_autoToCenter=v;
}
function getAutoCenter(){
	return _autoToCenter;
}
function setAutoAlert(obj){
	obj.checked=!confirm(""
	+"您目前取消了地图自动居中功能！ 　\n\n"
	+"这会导致您在移动时地图不会自动　\n\n"
	+"将您所在的场景居中，您可以在地　\n\n"
	+"图区域按住鼠标左键拖动来实现区　\n\n"
	+"域移动．\n\n"
	+"我们建议新手不要取消这个功能!\n\n\n"
	+"是否确认取消地图自动居中功能?"
	);
	setAutoCenter(obj.checked);
}
///////////////////

function playGame(){
	var winObj=_getWin("playGame");



	onOpenWin(winObj);
	var o="<table height=2 cellpadding='0' cellspacing='0'><tr><td></td></tr></table>";
	o+="<font color=blue>玩小游戏</font>";
	o+="<hr size=1 width='98%' align=left>";
		// o+="<div
		// style='background-color:#E1E1E1;height:28px;margin-right:5px;padding-top:4px;padding-left:5px;'>";//hr
		// o+="<a href=#
		// onclick=\"window.open('/game/apple/index.jsp;jsessionid='+sessionId+'?'+new
		// Date(),'','menubar=no,toolbar=no,location=no,directories=no,status=yes,width=567,height=563,left='+(p.event.screenX-360)+',top='+p.event.screenY+',scrollbars=yes,resizable=yes');return
		// false;\">【幸运苹果机】</a> (<font color=green>1银币1注</font>,开心转转)"
		// o+="</div>";

		// o+="<div
		// style=';height:28px;margin-right:5px;padding-top:4px;padding-left:5px;'>";//hr
		// o+="<a href=http://game.play.imop.com/apple/
		// target=_blank>【苹果机MP版】</a> (使用大杂烩MP玩)"
		// o+="</div>";

		// o+="<div
		// style='background-color:#E1E1E1;height:28px;margin-right:5px;padding-top:4px;padding-left:5px;'>";//hr
		// o+="<a href=http://game.play.imop.com/poke/
		// target=_blank>【扑克21点MP版】</a> (使用大杂烩MP玩)"
		// o+="</div>";

		// o+="<div
		// style=';height:28px;margin-right:5px;padding-top:4px;padding-left:5px;'>";//hr
		// o+="<a href=# onclick=\"cmd('chuo
		// show');offOpenWin('playGame');return false;\">【幸运戳戳乐】</a>
		// (戳出精彩,戳出未来)"
		// o+="</div>";

	try{
		_clickPos();
		with(winObj.style){
			top=p.eventY+15;
			left=p.eventX;
		}
	}catch(x){err(x);}
	_openWin("playGame",o);


	
}

///////////////////
function _optionButtonChange(b){
	if("set"==b){
		getObj("gameOptionButton").disabled=false;
		getObj("gameSetButton").disabled=true;
		getObj("gameHelpButton").disabled=false;
		getObj("gameSysButton").disabled=false;
		getObj("gameHuoDongButton").disabled=false;

		getObj('gameOption').style.display='none';
		getObj('gameSet').style.display='';
		getObj('gameHelp').style.display='none';
		getObj('gameSysOption').style.display='none';
		getObj('gameHuoDong').style.display='none';
	}
	if("option"==b){
		getObj("gameOptionButton").disabled=true;
		getObj("gameSetButton").disabled=false;
		getObj("gameHelpButton").disabled=false;
		getObj("gameSysButton").disabled=false;
		getObj("gameHuoDongButton").disabled=false;

		getObj('gameOption').style.display='';
		getObj('gameSet').style.display='none';
		getObj('gameHelp').style.display='none';
		getObj('gameSysOption').style.display='none';
		getObj('gameHuoDong').style.display='none';
	}
	if("help"==b){
		getObj("gameOptionButton").disabled=false;
		getObj("gameSetButton").disabled=false;
		getObj("gameHelpButton").disabled=true;
		getObj("gameSysButton").disabled=false;
		getObj("gameHuoDongButton").disabled=false;

		getObj('gameHelp').style.display='';
		getObj('gameSet').style.display='none';
		getObj('gameOption').style.display='none';
		getObj('gameSysOption').style.display='none';
		getObj('gameHuoDong').style.display='none';
	}
	if("sys"==b){
		getObj("gameOptionButton").disabled=false;
		getObj("gameSetButton").disabled=false;
		getObj("gameHelpButton").disabled=false;
		getObj("gameSysButton").disabled=true;
		getObj("gameHuoDongButton").disabled=false;


		getObj('gameHelp').style.display='none';
		getObj('gameSet').style.display='none';
		getObj('gameOption').style.display='none';
		getObj('gameSysOption').style.display='';
		getObj('gameHuoDong').style.display='none';
	}
	if("huodong"==b){
		getObj("gameOptionButton").disabled=false;
		getObj("gameSetButton").disabled=false;
		getObj("gameHelpButton").disabled=false;
		getObj("gameSysButton").disabled=false;
		getObj("gameHuoDongButton").disabled=true;

		getObj('gameHelp').style.display='none';
		getObj('gameSet').style.display='none';
		getObj('gameOption').style.display='none';
		getObj('gameSysOption').style.display='none';
		getObj('gameHuoDong').style.display='';
	}
}


//channel:start
function getChannel(index){
	return channel.length>=(index+1)?channel[index]:-1;
}
function changeChannel(index){
	channel[0]=document.getElementById("channel_0").checked?1:0;
	channel[1]=document.getElementById("channel_1").checked?1:0;
	channel[2]=document.getElementById("channel_2").checked?1:0;
	channel[3]=document.getElementById("channel_3").checked?1:0;
}
//channel:end
function changeLianJiNeng(a){
	lianJiNeng=a;
}

/*显示每个配方的学习条件*/
function showLearnRequire(sfName, sfKey, sfIndex, sfDesc){
	var divObj=document.getElementById("divFormulaLearn");
	if (divObj){
		divObj.innerHTML="【"+sfName+"】 <a href=# onclick=\"p.cmd('buyFormula "+sfKey+" "+sfIndex+"');return false;\"><font color=blue>[学习]</font></a>"
		+"<br><table height=7 cellpadding='0' cellspacing='0'><tr><td></td></tr></table>"
		+"<table border=0><tr><td valign=top>学习条件：</td><td><font color=red>"+sfDesc+"</font></td></tr></table>";
	}
}

/*显示配方*/
function _showComposeYuansu(sllArg){
	var showComposeYuansu=_getWin("showComposeYuansu");
	showComposeYuansu.style.height=150;
	onOpenWin(showComposeYuansu);
	var str="";
	str+="<b><font color=black>【合成列表】</font></b>";
	str+="<br><table border=0 style='margin-top:3px;margin-bottom:6px;'>";
	for(var i=0;i<sllArg.length;i++){
		str+="<tr>"
		+"<td colspan=3><a href=# onclick=\"p.cmd('helpFormula "+sllArg[i][2]+" false');return false;\">"+sllArg[i][3]+"</a></td><td width=10></td>"
		+"<td>&nbsp<a href=# onclick=\"p.cmd('helpFormula "+sllArg[i][2]+" false');return false;\"><font color=blue>[详情]</font></a></td>"
		+"<td>&nbsp<a href=# onclick=\"p.cmd('heChengYuanSu "+sllArg[i][2]+"');return false;\"><font color=green>[合成]</font></a></td>"
		+"</tr>"		
	}
	str+="</table>";
	_openWin("showComposeYuansu",str);
}


/*显示销售配方*/
function _sellFormula(sllArg){
	var formulaWin=_getWin("sellFormula");
	formulaWin.style.height=350;
	onOpenWin(formulaWin);
	var str="";
	str+="<b><font color=black>【配方学习列表】</font></b>";
	str+="<br><table border=0 style='margin-top:3px;margin-bottom:6px;'>";
	for(var i=0;i<sllArg.length;i++){
		str+="<tr><td colspan=3><a href=# onclick=\"p.cmd('helpFormula "+sllArg[i][2]+" false');return false;\">"+sllArg[i][3]+"</a></td><td width=10></td>"
		+"<td>&nbsp<a href=# onclick=\"showLearnRequire('"+sllArg[i][3]+"','"+sllArg[i][0]+"','"+sllArg[i][1]+"','"+sllArg[i][4]+"');return false;\"><font color=blue>[详情]</font></a></td>"
		// +"<td>&nbsp<a href=# onclick=\"p.cmd('buyFormula
		// "+sllArg[i][0]+"');return false;\"><font
		// color=blue>[学习]</font></a></td>"
		+"</tr>"
		// +"<tr valign=top><td></td><td valign=top>条件：</td><td colspan=3><font
		// color=red>"+sllArg[i][2]+"</font></td></tr>";
	}
	str+="</table>";
	str+="<hr size=1>"
	str+="<div id=divFormulaLearn></div>"
	_openWin("sellFormula",str);
}



/*显示某个合成术的配方*/
function _composeFormulas(skillarr,arr){
	var o="";
	o+="<b><font color=black>【"+skillarr[1]+" 配方】</font></b>"
	// +"<font face=Webdings style='cursor:hand' onclick=\"cmd('lookFormula
	// "+skillarr[0]+"');\" title=点我刷新>q</font> "
	// +"<hr size=1 width=98% align=left>";
	if (arr.length==0){
		//o+="<font color='red'>暂时没有学会任何配方</font>";
		addRM("<font color='red'>暂时没有学会任何配方</font><br>");
		return;
	}
	//onOpenWin(_getWin("composeFormulas"));
	for(var i=0;i<arr.length;i++){
		if (i%2==0)	o+="<br><table height=7 cellpadding='0' cellspacing='0'><tr><td></td></tr></table>";
		o+="<a href=# onclick=\"cmd('helpFormula "+arr[i][1]+" true');return false;\">"+arr[i][0]+"</a>  &nbsp; ";
	}
	//_openWin("composeFormulas",o);
	var listObj=document.getElementById("composeFormulaList");
	if (listObj){
		listObj.innerHTML=o;
	}
}


var _curFormulaPath="";
/* 显示配方信息,以及开始合成窗口, 如果 isDoAct==false 仅显示配方信息* */
function _helpFormula(fPath,fName,fDesc, addPlus, isDoAct){
	onOpenWin(_getWin("composeWin"));
	_curFormulaPath=fPath;
	var str="";
	str+="<font color=green>【"+fName+"】</font><br>"
		+fDesc
		+"<label id='spanAddPlus' style='display:'>"
		+(isDoAct?
			(addPlus=="true"?
			"<a href=# onclick=\"p.cmd('i');return false;\">[添加附加]</a> &nbsp;&nbsp;"
			:"合成<input type=text name='inputComposeNum' value='1' size='3'>份")
			:
			(addPlus=="true"?
			"可以添加附加物&nbsp;&nbsp;"
			:"")
		)
		+"</label>"
		+(isDoAct?
			"<div align='right'><a href=# onclick=\"p._toDoCompose('"+fPath+"','"+fName+"');return false;\">[开始合成]</a> <a href=# onclick='p.offOpenWin(\"composeWin\");_curFormulaPath=\"\";return false;'>[关闭]</a>&nbsp;&nbsp;</div>"
			:
			"<div align='right'><a href=# onclick='p.offOpenWin(\"composeWin\");_curFormulaPath=\"\";return false;'>[关闭]</a>&nbsp;&nbsp;</div>"
		)
		;
	_openWin("composeWin",str);
}


var composeTimeOut=0;
var composeIsLastOne=false;
function _toDoCompose(fPath, fName){
	var numObj=document.getElementById('inputComposeNum');
	var num=1;
	if (numObj){
		num=numObj.value;
		if (!checkInt(num)){
			alert("请输入正确的合成份数");
			numObj.select();
			return;
		}
	}
	p.cmd("compose");
	_showCompose(fName);
	composeTimeOut=window.setTimeout("_timeCompose('"+fPath+"','"+fName+"',"+num+");",3500);
}


function _timeCompose(fPath,fName, composeNum){
	if (composeNum<=0) return;
	p.cmd("compose "+fPath);
	if (composeNum>1){
		window.setTimeout("_showCompose('"+fName+"');",1500);
		composeTimeOut=window.setTimeout("_timeCompose('"+fPath+"','"+fName+"',"+(composeNum-1)+")",4500);
	}else{
		composeIsLastOne=true;
	}
}

/*增加物品到合成中*/
function addToPlus(itemName, itemIndex, itemUnit){
	if (isCompose()){
		var showSpan=document.getElementById('spanAddPlus');
		showSpan.innerHTML="<font color='#FF8000'>增加附加物："+itemName+"</font><br>"
			+"<a href=# onclick=\"p.cmd('compose "+_curFormulaPath+" "+itemIndex+"');return false;\">[开始合成]</a>";
	}
}


function isCompose(){//目前是否在合成中
	var dwin=document.all("composeWin");
	if(dwin){
		return dwin.style.display!="none";
	}else{
		return false;
	}
}

/*显示掌握的合成术*/
function _composeSkill(arrCompose){
	var str="";
	str+="<b><font color=black>【合成术】</font></b><hr size=1 width=98% align=left>";
	if (arrCompose.length==0){
		//str+="<font color='red'>现在没有掌握任何合成术</font>";
		addRM("<font color='red'>现在没有掌握任何合成术</font><br>");
		offOpenWin('composeSkill');
		return;
	}
	onOpenWin(_getWin("composeSkill"));
	// added for compose
	for(var i=0;i<arrCompose.length;i++){
		str+="<a href=# onclick=\"cmd('lookFormula "+arrCompose[i][1]+"');return false;\">"+arrCompose[i][0]+"</a> (熟练度:"+arrCompose[i][2]+") &nbsp;<a  href=# onclick=\"cmd('helpCompose "+arrCompose[i][1]+"');return false;\">[说明]</a> <a  href=# onclick=\"p._forgetSkill('"+arrCompose[i][1]+"','"+arrCompose[i][0]+"');return false;\">[忘记]</a>";
		str+="<br><table height=7 cellpadding='0' cellspacing='0'><tr><td></td></tr></table>";
	}
	str+="<hr size=1>"
	str+="<div id=composeFormulaList style='height:140;overflow:auto'></div>"
	_openWin("composeSkill",str);
}

function _forgetSkill(skillPath,skillName){
	if (confirm("忘记"+skillName+"将忘记其下所有配方，你真的要忘记吗？")){
		p.cmd("forgetCompose "+skillPath);
	}
}

//function _skillsubs(arr,arrCompose,ocp){
function _skillsubsOld(arr,ocp){
	if(arr.length==1){
		if(!arr[0][1].length>0){
			addRM("<font color=red>目前没有掌握任何绝技</font><br>");
			offOpenWin('skillsubs');
			return;
		}
	}
	var has=false;
	var o="";
	for(var i=0;i<arr.length;i++){
		if(arr[i][1].length>0){
			if(!has)has=true;
			o+=fakeBr(5)
			if("PET"==arr[i][0]){
				o+="<b><font color=black>【"+ocp+"】</font></b><hr size=1 width=98% align=left>";
			}else{
				o+="<b><a href=# onclick=\"cmd('skills "+arr[i][0]+"');return false;\"><font color=red>【"+arr[i][0]+"】</font></a></b><hr size=1 width=98% align=left>";
			}
			for(var a=0;a<arr[i][1].length;a++){
				o+="<a href=# onclick=\"cmd('helpsubs "+arr[i][1][a]+"');return false;\">"+arr[i][1][a]+"</a> ";
			}
			o+="<br><table height=7 cellpadding='0' cellspacing='0'><tr><td></td></tr></table>";
		}
	}
	if(has){
		onOpenWin(_getWin("skillsubs"));
		_openWin("skillsubs",o);
	}else{
		addRM("<font color=red>目前没有掌握任何绝技</font><br>");
		offOpenWin('skillsubs');
		return;
	}

}

function _skillsubs(arr,ocp,single,shlskill,shlspecialskill,ylskill,msskill,aqskill,hjskill){

	var arrN = ['十字剑','霸王枪','龙葵匕刃','幽冥爪','飓风刀法','火系法术','冰系法术','圣魔法','暗魔法','风系法术'];
	var has=false;
	var o="";
	if(ocp!=""){
		o+="<b><font color=black>【"+ocp+"】</font></b><hr size=1 width=98% align=left>";
	}
	
	
	for(var i=0;i<single.length;i++){
		if(!has) has =true;
		o+="<a href=# onclick=\"cmd('helpsubs "+single[i]+"');return false;\"><font color=#99CCFF><b>"+single[i]+"</b></font></a>&nbsp;&nbsp;";
	}
	
	for(var i=0;i<arr.length;i++){
		if(arr[i][1].length>0){
			if(!has)has=true;
			o+=fakeBr(5)
			
			var skillN = arr[i][2][0];
			var showFuWen=false;
			for(var s=0;s<arrN.length;s++)
			{
				if(skillN==arrN[s])
				{
					showFuWen=true;
					break;
				}			
			}
			
			var message="";
			if(showFuWen)
			{
				message="<a href=# onclick=\"cmd('equipskillFuWens "+arr[i][2][0]+"');return false;\">[符文]</a>";			
			}
			
			if(arr[i][2][5]){
					add="<a href=# onclick=\"cmd('equipskills "+arr[i][2][0]+"');return false;\">[卸下]</a>"+message;
					style="style='background-color:#D9D9D9;'";
			}else{
				if(arr[i][2][6]){
					add="<a href=# onclick=\"cmd('equipskills "+arr[i][2][0]+"');return false;\">[装备]</a>"+message;
				}else{
					add="";
				}
				style="";
			}
			var color="red";
			o+="<div "+style+"><b><a href=# onclick=\"cmd('skills "+arr[i][2][0]+"');return false;\"><font color=red><b>【"+arr[i][2][0]+"】</b></font></a></b>("+arr[i][2][1]+") <font face=arial>Lv:<font color=red>"+arr[i][2][2]+"</font> Exp:"+arr[i][2][3]+"/"+arr[i][2][4]+" "+add+"</font></div>";
			o+="<hr size=1 width=98% align=left>";
			if(arr[i][1].length>0){
				for(var a=0;a<arr[i][1].length;a++){
				o+="<a href=# onclick=\"cmd('helpsubs "+arr[i][1][a]+"');return false;\">"+arr[i][1][a]+"</a> ";
				}
			}
			o+="<br><table height=7 cellpadding='0' cellspacing='0'><tr><td></td></tr></table>";	
		}else{			
			var skillN = arr[i][2][0];
			var showFuWen=false;
			for(var s=0;s<arrN.length;s++)
			{
				if(skillN==arrN[s])
				{
					showFuWen=true;
					break;
				}			
			}
			
			var message="";
			if(showFuWen)
			{
				message="<a href=# onclick=\"cmd('equipskillFuWens "+arr[i][2][0]+"');return false;\">[符文]</a>";			
			}
		
			if(arr[i][2][5]){
					add="<a href=# onclick=\"cmd('equipskills "+arr[i][2][0]+"');return false;\">[卸下]</a>"+message;
					style="style='background-color:#D9D9D9;'";
			}else{
				if(arr[i][2][6]){
					add="<a href=# onclick=\"cmd('equipskills "+arr[i][2][0]+"');return false;\">[装备]</a>"+message;
				}else{
					add="";
				}
				style="";
			}
			o+="<div "+style+"><b><a href=# onclick=\"cmd('skills "+arr[i][2][0]+"');return false;\"><font color=red><b>【"+arr[i][2][0]+"】</b></font></a></b>("+arr[i][2][1]+") <font face=arial>Lv:<font color=red>"+arr[i][2][2]+"</font> Exp:"+arr[i][2][3]+"/"+arr[i][2][4]+" "+add+"</font></div>";
		}
	}
	if(shlskill!=''){
		if(!has)has=true;
		o+="<div><font color=green><b>【特有技能】</b></font>";
		for(var ss=0;ss<shlskill.length;ss++){
			o+="<a href=# onclick=\"cmd('helpsubs "+shlskill[ss]+"');return false;\">["+shlskill[ss]+"]</a>";
		}
		o+="</div>";
	}
	if(shlspecialskill!=''){
		if(!has)has=true;
		o+="<div><font color=green><b>【专有技能】</b></font>";
		for(var sss=0;sss<shlspecialskill.length;sss++){
			o+="<a href=# onclick=\"cmd('helpsubs "+shlspecialskill[sss]+"');return false;\">["+shlspecialskill[sss]+"]</a>";
		}
		o+="</div>";
	}
	if(ylskill!=''){
		if(!has)has=true;
		o+="<div><font color=green><b>【翼灵技能】</b></font>";
		for(var sss=0;sss<ylskill.length;sss++){
			o+="<a href=# onclick=\"cmd('helpsubs "+ylskill[sss]+"');return false;\">["+ylskill[sss]+"]</a>";
		}
		o+="</div>";
	}
	
	if(msskill!=''){
		if(!has)has=true;
		
		o+="<div><font color=#9900FF><b>【魔石技能】</b></font>";
		for(var sss=0;sss<msskill.length;sss++){
			o+="<a href=# onclick=\"cmd('helpsubs "+msskill[sss]+"');return false;\">["+msskill[sss]+"]</a>";
		}
		o+="</div>";
	}
	if(aqskill!=''){
		if(!has)has=true;
		
		o+="<div><font color=#9900FF><b>【暗器技能】</b></font>";
		for(var sss=0;sss<aqskill.length;sss++){
			if(aqskill[sss]=="万毒攻心(被动)"){
				o+="["+aqskill[sss]+"]";
			}else{
				o+="<a href=# onclick=\"cmd('helpsubs "+aqskill[sss]+"');return false;\">["+aqskill[sss]+"]</a>";
			}
		}
		o+="</div>";
	}
	if(hjskill!=''){
		if(!has)has=true;
		
		o+="<div><font color=#9900FF><b>【徽记技能】</b></font>";
		for(var sss=0;sss<hjskill.length;sss++){
			o+="<a href=# onclick=\"cmd('helpsubs "+hjskill[sss]+"');return false;\">["+hjskill[sss]+"]</a>";
		}
		o+="</div>";
	}
	if(has){
		onOpenWin(_getWin("skillsubs"));
		_openWin("skillsubs",o);
	}else{
		addRM("<font color=red>目前没有掌握任何绝技</font><br>");
		offOpenWin('skillsubs');
		return;
	}

}

//竞技场技能
function _jingJiChangskillsubs(single,xia,shang,current){
	var winObj=_getWin("jingJiChangskillsubs");
	onOpenWin(winObj);
	with(winObj.style){		
		width="900";	
		height="550";
	}
	
	var oo="<table border=\"0\" cellspacing=\"0\" cellpadding=\"0\" class=\"jingjicutlinenum\">"
		+"<tr ><td  width='78%'>&nbsp;</td><td id=jingjiskill0 width='28'>1</td><td id=jingjiskill1 width='28'>2</td><td id=jingjiskill2 width='28'>3</td><td id=jingjiskill3 width='28'>4</td><td id=jingjiskill4 width='28'>5</td><td id=jingjiskill5 width='28'>6</td></tr>"
    +" <tr>"
    +"<td  width='78%'>&nbsp;</td>";
    +" <td >1</td>"
    +" <td >2</td>"
    +" <td >3</td>"
    +" <td >4</td>"
    +" <td >5</td>"
    +" <td >6</td>"  
    +" </tr>"
    +"</table>";

	var has=false;
	
	var o='';
	o=o+"<style type=\"text/css\">"
    +".jingjicutlinenum {position:absolute;top:472px;left:65px}"
    +".pet25_num1u{width:3px;overflow:hidden}"
    +".pet25_num2u{width:8px;overflow:hidden}"
    +".pet25_num1,.pet25_num2,.pet25_num3,.pet25_num4,.pet25_num5,.pet25_num6,.pet25_num7,.pet25_num8,.pet25_num9,.pet25_num0{width:3px;height:5px;float:left;overflow:hidden;margin-right:1px;display:inline}"
    +".pet25_num1{ background:url(../images/pet_num.gif)}"
    +".pet25_num2{ background:url(../images/pet_num.gif) -3px 0}"
    +".pet25_num3{ background:url(../images/pet_num.gif) -6px 0}"
    +".pet25_num4{ background:url(../images/pet_num.gif) -9px 0}"
    +".pet25_num5{ background:url(../images/pet_num.gif) -12px 0}"
    +".pet25_num6{ background:url(../images/pet_num.gif) -15px 0}"
    +".pet25_num7{ background:url(../images/pet_num.gif) -18px 0}"
    +".pet25_num8{ background:url(../images/pet_num.gif) -21px 0}"
    +".pet25_num9{ background:url(../images/pet_num.gif) -24px 0}"
    +".pet25_num0{ background:url(../images/pet_num.gif) -27px 0}"
  +"</style>  ";

	
	o+="<br><table width='100%' height='95%' border='0' align='center' cellpadding='0' cellspacing='0'  background='/img/autoskill.jpg'><tr><td valign='top'>";
	o=o+"<table border='0' cellpadding='0' cellspacing='0' height='100%' width='100%' ><tr><td>&nbsp;</td><td>&nbsp;</td></tr><tr><td>&nbsp;</td><td>&nbsp;</td></tr><tr><td>&nbsp;</td><td>&nbsp;</td></tr><tr><td>&nbsp;</td><td>&nbsp;</td></tr>";
			
	o=o+"<tr><td width='100%'><table width='100%'>"
	for(var i=0;i<single.length;i=i+2){
		if(!has) has =true;
		o+="<tr><td width='40%'>&nbsp;</td><td width='30%' ><font color=black size=3><b>"+single[i]+"</b></font>&nbsp;&nbsp;<a href=# onclick=\"cmd('JingJiChang skillset "+single[i]+"');return false;\"><font color=black size=3>【装备】</font></a></td>" ;
				if(i+1<single.length){
					o+="<td width='30%'><font color=black size=3><b>"+single[i+1]+"</b></font>&nbsp;&nbsp;<a href=# onclick=\"cmd('JingJiChang skillset "+single[i+1]+"');return false;\"><font color=black size=3>【装备】</font></a></td>" ;
				}else{					
					o+="<td width='40%'>&nbsp;&nbsp;</td>";
				}				
		o+="</tr>";
	}
	
	var num=8;
	for(var i=1;i<num-single.length;i++)
	{
		o+="<tr><td>&nbsp;&nbsp;</td><td>&nbsp;&nbsp;</td><td>&nbsp;&nbsp;</td></tr>";
	}	
	o+="</td></tr>";
	
	o+="<tr><td colspan='3' align='center'><font color=black size=3><b>";
	if(shang)
	{
		o=o+"<a herf=# onclick=\"cmd('JingJiChang skill "+(current-1)+"')\" style=cursor:hand>上一页</a>";
	}else{
		o=o+"&nbsp;";
	}
	
	o=o+"</b></font>&nbsp;<font color=black size=3><b>";
	if(xia)
	{
		o=o+"<a herf=# onclick=\"cmd('JingJiChang skill "+(current+1)+"')\" style=cursor:hand>下一页</a>";
	}else{
		o=o+"&nbsp;";
	}
	
	o+="</td></tr>";
	o=o+"</table></td></tr>";
	

	o+=	"</table></td></tr>";
	o=o+"<tr><td>"+oo+"</td></tr>"+
			"</table>";
	
	if(has){
		onOpenWin(_getWin("jingJiChangskillsubs"));
		_openWin("jingJiChangskillsubs",o);
	}else{
		addRM("<font color=red>目前没有掌握任何绝技</font><br>");
		offOpenWin('jingJiChangskillsubs');
		return;
	}
}


function showSkillSub(arg)
{		
    var num = arg.length;
    for(var i=0;i<num;i++)
    {
    	if(arg[i].length==3)
    	{
    	  for(var k=0;k<3;k++)
    	  {   
    		 var index =  arg[i][2];
    		 if(checkInt(index)){    				
    			    index=parseInt(index);
    				var ob = document.getElementById("jingjiskill"+index);		    
    			    ob.innerHTML="<img src='"+arg[i][1]+"' title='"+arg[i][0]+"'>";
    			    continue;
    		  }else if(index=="#")// 未开
    		 {
    			 var ob = document.getElementById("jingjiskill"+i);		    
 			     ob.innerHTML="<a herf=# onclick=openCao("+i+") style=cursor:hand>开启</a>";
 			    continue;
    		 
    		 }else if(index=="null")// 空
    		 {
    			 var ob = document.getElementById("jingjiskill"+i);		    
 			     ob.innerHTML="空";
 			    continue;
    		 
    		 }
    	  }
    	}
    }
}


function openCao(index)
{
	for(var k=2;k<index;k++)
	{
		var ob = document.getElementById("jingjiskill"+k);		    
	     if(ob.innerHTML.indexOf("开启")>0)
	     {
	    	 alert('此技能槽无法被开启，前面有未开启的技能槽');
	    	 return;
	     }		
	 }	

	if(index==2)
	{
		if(confirm("你愿意使用10金币开启此技能槽吗？"))
	  	{
	  		cmd("JingJiChang openCao "+index);
	  	}	
	}else if(index==3)
	{
		if(confirm("你愿意使用5猫豆开启此技能槽吗？"))
	  	{
			cmd("JingJiChang openCao "+index);
	  	}	
	}else if(index==4)
	{
		if(confirm("你愿意使用20猫豆开启此技能槽吗？"))
	  	{
			cmd("JingJiChang openCao "+index);
	  	}	
	}else if(index==5)
	{
		if(confirm("你愿意使用50猫豆开启此技能槽吗？"))
	  	{
			cmd("JingJiChang openCao "+index);
	  	}	
	}
}


function _skills(arr){
	if(arr.length==0){
		addRM("<font color=red>你目前没有掌握任何技能!</font><br>");
		offOpenWin('skills');
		// _openWin("skills","<font color=red>你目前没有掌握任何技能!</font><br>");
	}else{
		onOpenWin(_getWin("skills"));
		var add="";
		var style="";
		var o="";
		for(var i=0;i<arr.length;i++){
			if(arr[i][5]){
				add="<a href=# onclick=\"cmd('equipskills "+arr[i][0]+"');return false;\">[卸下]</a>";
				style="style='background-color:#D9D9D9;'";
			}else{
				if(arr[i][6]){
					add="<a href=# onclick=\"cmd('equipskills "+arr[i][0]+"');return false;\">[装备]</a>";
				}else{
					add="";
				}
				style="";
			}
			var color="red";
			// if(arr[i][1]=="辅"){
			// color="#0461FB";
			// }
			o+="<div "+style+"><a href=# onclick=\"cmd('skills "+arr[i][0]+"');return false;\"><font color="+color+"><b>"+arr[i][0]+"</b></font></a>("+arr[i][1]+") <font size=-2 face=arial>Lv:<font color=red>"+arr[i][2]+"</font> Exp:"+arr[i][3]+"/"+arr[i][4]+" "+add+"</font></div>";
		}
		_openWin("skills",o);
	}
}

var _alert="";
var alertTimer=null;
function showAlert(mes){
	if(alertTimer!=null){
		window.clearTimeout(alertTimer);
	}
	_alert = '';
	addIM(mes);
	_alert+=mes;
	var winObj=_getWin("alert");
	onOpenWin(winObj);
	with(winObj.style){
		overflowY="";
	}
	winObj.closeEvent="_alert='';"
	_openWin("alert",_alert);
	alertTimer=setTimeout("try{_alert='';_openWin('alert',_alert);offOpenWin('alert');}catch(x){err(x);}",5000);
}


///openWin:start
function _openWin(name,body){
	var winObj=_getWin(name);
	var o="";
	if(name=="skills"){
		o+="<font style='cursor:hand' onclick=\"cmd('skills');\" title=点我刷新><img src=/img/button/w_1.gif></font> "
	}else if(name=="tools"){
		o+="<font style='cursor:hand' onclick=\"cmd('i');\" title=点我刷新><img src=/img/button/w_1.gif></font> "
	}else if(name=="petinfo"){
		o+="<font style='cursor:hand' onclick=\"cmd('pet');\" title=点我刷新><img src=/img/button/w_1.gif></font> "
	}else if(name=="onlineUsers"){
		o+="<font style='cursor:hand' onclick=\"cmd('who');\" title=点我刷新><img src=/img/button/w_1.gif></font> "
	}else if(name=="listStoreTools"){
		o+="<font style='cursor:hand' onclick=\"cmd('getItems');\" title=点我刷新><img src=/img/button/w_1.gif></font> "
	}else if (name=="composeSkill"){
		o+="<font style='cursor:hand' onclick=\"cmd('composeSkill');\" title=点我刷新><img src=/img/button/w_1.gif></font> "
	}else if (name=="consignList"){
		o+="<font style='cursor:hand' onclick=\"cmd('consignList');\" title=点我刷新><img src=/img/button/w_1.gif></font> "
	// }else if (name=="taskWin"){
	// o+="<font style='cursor:hand' onclick=\"cmd('showTask');\"
	// title=点我刷新><img src=/img/button/w_1.gif></font> "
	}else if (name=="amityWin"){
		o+="<font style='cursor:hand' onclick=\"cmd('foo amity');\" title=点我刷新><img src=/img/button/w_1.gif></font> "
	}else if(name=="roomTaskWin"){
		o+="<font style='cursor:hand' onclick=\"cmd('showRoomTask all');\" title=点我刷新><img src=/img/button/w_1.gif></font> "
	}else if(name=="roomJobWin"){
		o+="<font style='cursor:hand' onclick=\"cmd('listJob');\" title=点我刷新><img src=/img/button/w_1.gif></font> "
	}else if(name=="offlineExp"){
		o+="<font style='cursor:hand' onclick=\"cmd('dealOfflineExp');\" title=点我刷新><img src=/img/button/w_1.gif></font> "
	}

	var addHide="";
	if(name!="vimg"&&name!="dealWin" && name!="composeWin"&& name!="allotItem" && name !="fetchSelOcp"){
		var closeEvent="";
		
		// 添加精英任务刷新结果的删除功能
		var closePayToRereshedTasksEvent = "";
		if(winObj.closePayToRereshedTasksEvent) {
			closePayToRereshedTasksEvent = winObj.closePayToRereshedTasksEvent;
		}
		
		if(winObj.closeEvent){
			closeEvent=winObj.closeEvent;
		}
		addHide="<a style='cursor:hand;' hidefocus=true onclick=\"" + closePayToRereshedTasksEvent + "    offOpenWin('"+name+"');" +　closeEvent+";return false;\" title='点我隐藏'><img src=/img/button/w_3.gif></nobr></a>";
	}else if(name=="dealWin"){
		addHide="&nbsp;";
	}
	if(name!="petInfoWin"&&name!="selInnerOrGet" && name!="petHelpWin"&& name!="showtips"){
		o+="<a style='cursor:move' title=按住我拖动 onmousedown=\"drags(_getWin('"+name+"'));\" onmouseup='dragapproved=false;'><img src=/img/button/w_2.gif></a>";
	}
	winObj.innerHTML="<table width='1' align='right' cellpadding='0' cellspacing='0'><tr><td><nobr>"+o+" "+addHide+"</nobr></td></tr></table>"+body;
	// myAbb='canDrag' dragObj='"+name+"'
	// onmousedown=\"drags(_getWin('"+name+"'));\"
	// document.onmousedown=drags;
	// document.onmouseup=new Function("dragapproved=false");

}
//random winName:start// ////////////
var _arr=["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
function _rwin(){
	var rs="";
	var n=(5+parseInt(Math.random()*6));
	for(var i=0;i<n;i++){
		rs+=_arr[parseInt(Math.random()*_arr.length)];
	}
	return rs;
}
//random winName:end// ////////
function _hasWin(name){
	return getObj(name)!=null;
}
function _getWin(name,pxx){
	if(!pxx){
		pxx ="1px solid #000000";
	}
	var obj=getObj(name);
	if(obj==null){
		for(var i=0;i<winList.length;i++){
			if(winList[i]==name){
				return _createWin(name,winPos[name],winSize[name],pxx);
			}
		}
		return _createWin(name,winPos["default"],winSize["default"],pxx);
	}else{
		focusWin(obj);
		return obj;
	}
}
function _createWin(name,XYArr,WHArr,pxx){
	if(!pxx){
		pxx ="1px solid #000000";
	}
	var obj=getObj(name);
	if(obj==null){
		var obj=document.createElement(_rwin());
		obj.id=name;
		// obj.myAbb='canDrag';
		with(obj.style){
			border=pxx;// "1px solid #000000";
			position="absolute";
			// zIndex=_zindexWin;
			zIndex=2000;
			if(XYArr[0]<0){
				left=0;
			}else{
				left=XYArr[0];
			}
			if(XYArr[1]<0){
				top=0;
			}else{
			top=XYArr[1];
			}
			width=WHArr[0];
			if(WHArr[1]!=-1){
				height=WHArr[1];
			}
			backgroundColor="#eeeeee";
			if(WHArr[1]!=-1){
				overflowY="auto";
			}
			display="none";

			paddingBottom="5px";
			paddingTop="5px";
			paddingLeft="10px";
			paddingRight="5px";
		}
		obj.onmousedown=function(){focusWin(_getWin(name));}
		//obj.onclick=function(){focusWin(_getWin(name));}
		document.body.appendChild(obj);
	}
	focusWin(obj);
	return obj;
}
function offOpenWin(objWin){
	_getWin(objWin).style.display="none";
	hideParentMenu();
	if(objWin=="petinfo"||objWin=="petInfoWin"){//关闭宠物属性栏，同时关闭展示栏
		offOpenWin("showReveal");
		offOpenWin("showSHL");
		offOpenWin("showShenZhuang");
		offOpenWin("showTiShen");
	}
}
function onOpenWin(objWin){
	objWin.style.display="";
}
function getOpenWinDis(objWin){
	return objWin.style.display!="none";
}
var _zindexWin=20;
function focusWin(objWin){
	hideParentMenu();
	if(objWin.style.zIndex<_zindexWin){
		_zindexWin=_zindexWin+1;
		objWin.style.zIndex=_zindexWin;
	}
	//onOpenWin(objWin);
}
//openWin:end


// drag:start
var dragapproved=false;
var z,x,y;
var xiuleft,xiutop;
function move(){
	if (event.button==1&&dragapproved){
		var winLeft=temp1+event.clientX-x;
		if(winLeft<0){
			z.style.pixelLeft=0;	
		}else{
			z.style.pixelLeft=winLeft;
		}

		var winTop=temp2+event.clientY-y;
		if(winTop<0){
			z.style.pixelTop=0;
		}else{
			z.style.pixelTop=winTop;
		}
		if(z.id=="itemInfoDescWin"||z.id=="shlShowWin"){
		   xiuleft=z.style.pixelLeft;
		   xiutop=z.style.pixelTop;
		}

		return false;
	}
}
function drags(obj){
	//if (event.srcElement.myAbb=="canDrag"){
		//focusWin(document.all(event.srcElement.dragObj));
		dragapproved=true
		// z=event.srcElement
		// alert(event.srcElement.dragObj);
		z=obj;
		temp1=z.style.pixelLeft
		temp2=z.style.pixelTop
		x=event.clientX
		y=event.clientY
		document.onmousemove=move
	// }
}
//document.onmousedown=drags;
// document.onmouseup=new Function("dragapproved=false");
// drag:end

function delCut(){
	var input=prompt('请输入要删除快捷栏的第几格 (1到51格)或者字母',"全部清掉");
	if(input!=null){
		if("全部清掉"==input){
			cmd("delcut");
		}else{
			if(checkInt(input)){
				if(input==0){
					input=9;
				}else if(input<10){
					input-=1;
				}
				if(input<0){
					alert("格数不能小于0!");
					delCut();
				}if(input>51){
					alert("格数不能大于51!");
					delCut();
				}else{
					cmd("delcut "+input);
				}
			}else if(checkChar(input)){
				cmd("delcut "+input) ;
			}else{
				alert("请输入正确的数字或字母!");
				delCut();
			}
		}
	}
}

function GPRS(itemIndexNum){
	var input=prompt('请输入要查找的用户名（注意：请输入用户名，非宠物名）',"");
	if(input!=null){
		cmd("use "+itemIndexNum+" "+input);
	}
}

function testvimg(){
	vimg("../img/vimg","磔歼蚌笸尤,归丸,捆劐斋龇,店宜",true,60);
}
function vimgTimer(timerObj){
	var now=parseInt(timerObj.innerHTML);
	if(now-1>=0){
		timerObj.innerHTML=(now-1);
		setTimeout("vimgTimer("+timerObj.id+");",1000);
	}
}
function vimg(ma,answer,test,time){
	var rA=['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
	var winObjId="";
	var timerObjId="";
	for(var i=0;i<10;i++){
		winObjId+=rA[Math.floor(Math.random()*26)];
		timerObjId+=rA[Math.floor(Math.random()*26)];
	}
	var vimgWin=p._getWin(winObjId);
	with(vimgWin.style){
		left=Math.floor(Math.random()*514);
		top=Math.floor(Math.random()*269);
		width="295";
		height="242";
		overflowY="";
	}
	p.onOpenWin(vimgWin);
	var o=fakeBr(6)+"<font color=red size=3><b>此为Shoot验证图形!这不是乱码!</b></font>"+fakeBr(13)+"<img src=vimg/"+ma+".jpg width=250 height=50><br><br><font color=red>请立即在下面选择上图中的图形<Br><b>如果选择错误或超时你将被判定为Shoot!<br>如按答案无反映,请按F5刷新页面!<br><br></b></font>";

	var arr=answer.split(",");
	for(var vi=0;vi<arr.length;vi++){
		o+="<a href=# onclick=\"if(confirm('你确认图中所示为["+arr[vi]+"]?如果选错你将受到严厉的Shoot惩罚!')){"+(test==true?"p.testanswer('"+arr[vi]+"');":"p.cmd('answer "+arr[vi]+"');")+"p.offOpenWin('"+winObjId+"');}\"><font color=blue size=3><u><b>"+arr[vi]+"</b></u></font></a>&nbsp;&nbsp;&nbsp;";
	}
	o+="<br><br>剩余答题时间: <span id="+timerObjId+" name="+timerObjId+" style='color:red;font-size:12pt;'>"+time+"</span>　　　如看不到图 <a href=vimg/"+ma+".jpg target=_blank>[请点这里]</a>"+fakeBr(7);
	vimgWin.innerHTML=o;
	p.vimgTimer(document.getElementById(timerObjId));
}

//验证码测试:start
function testanswer(s){
	if(s=="磔歼蚌笸尤"){
		p.offOpenWin('vimg');
		p.clsMes("npcChatReader");
		addNPCC("好聪明的娃儿啊!.. 真正的游戏中的文字千变万化,你以后可得看仔细啊! <br><a href=# onclick=\"p.cmd('kaishi 62');return false;\">你多保重啊，我走了……</a>");
		cmd("ok");
	}else{
		p.offOpenWin('vimg');
		p.clsMes("npcChatReader");
		addNPCC("图片很难认没有错,但是仔细看还是可以看出来的啊..<br>"
		+"<a href=# onclick=\"p.cmd('kaishi 50');p.hide(this);return false;\">1, 我再学一学.</a><br>"
		// +"<a href=# onclick=\"p.addRM('猫扑猥琐男:
		// 555,你就这么走了,你这个负心的人儿啊~<br>');p.closeRenPic();return false;\">2,
		// 得我已经会了,我要闪了</a><br>"
		);
	}
}
//验证码测试:end

function cachePic(obj,file){ //载入背景图
	if(obj.src.indexOf('blank.gif')!=-1){
		_cachePic(obj,file);
	}
}
function _cachePic(obj,file){
	try{
		obj.src=cacheWin.getImg(file).src;
	}catch(x){
		obj.src=file;
	}
}

function alertJG(){
	alert(""
		+"郑重警告:\n\n"
		+"目前宠物游戏在开发阶段,任何行为规则尚处于研究阶段,\n"
		+"这期间协调用户为次,保证大局为主.在游戏成熟之前不对\n"
		+"用户做任何保证,这期间任何管理员有权无条件立刻封停,\n"
		+"删除用户帐号,无须理由和解释.\n\n"
		+"如你接受如上规则,请续游戏,否则请立即离开.\n"
		+"谢谢\n\n"
		+"Mopet宠物游戏(2005-7-30)"
	);
}

//nextTask
var nowFightTaskImg=null;
function setFightTaskImg(s){
	try{
		if(s==null||s=="null"||s==""){
			s=task_black_img;
		}
		nowFightTaskImg=s;
		_cachePic(petWin.nextTask,s);
	}catch(x){err("setFightTaskImg(s)"+x);}
}
function showFightTaskImg(){
	try{
		setFightTaskImg(nowFightTaskImg);
	}catch(x){err("showFightTaskImg(s)"+x);}
}

var nowEnemyTaskImg=null;
function setEnemyTaskImg(s){
	try{
		if(s==null||s=="null"||s==""){
			s=task_black_img;
		}
		nowEnemyTaskImg=s;
		_cachePic(petWin.enemyNextTask,s);
	}catch(x){err("setEnemyTaskImg(s)"+x);}
}
function showEnemyTaskImg(){
	try{
		setEnemyTaskImg(nowEnemyTaskImg);
	}catch(x){err("showEnemyTaskImg(s)"+x);}
}

//tip:start
var exitTipWinSave=false;
function _changeTipWinNoShow(show){
	noShowTipWin=show;
	exitTipWinSave=true;
}
function showTip(str,id){
	var tipWin=getObj("tipWin");
	tipWin.innerHTML=""
		+"<b><font color=#0C3670>游戏小提示</font></b>"
		+"<div style='padding-top:5px;padding-bottom:10px;padding-left:10px;padding-right:10px;line-height:20px;'>"+str+"</div>"
		+"<div style='text-align:right;padding-right:4px;'>"
		+(petLv>=15?"<input type=checkbox id=tipWinNoShow onclick='_changeTipWinNoShow(this.checked);'><label for=tipWinNoShow>以后不再显示</label>&nbsp;&nbsp;&nbsp;&nbsp;":"")
		+"<a href=# onclick=\"cmd('foo showTips "+id+"');return false;\"><u>下一个</u></a>&nbsp;&nbsp;&nbsp;"
		+"<a href=# onclick=\"getObj('tipWin').style.display='none';if(exitTipWinSave){_saveSet();}return false;\"><u>知道了</u></a>"
		+"</div>"
	;
	tipWin.style.display="";
}


preBtnObj=null;
function changeBtnPic(btnObj){
	if (preBtnObj==null){
		preBtnObj=document.getElementById("showChatButton");
	}
	if (preBtnObj!=null){
		preBtnObj.src="/img/button/"+preBtnObj.id+".png";
	}
	btnObj.src="/img/button/"+btnObj.id+"_1.png";
	preBtnObj=btnObj;
}
//tip:end
function initPet(){
	with(document.body){
		appendChild(document.createElement('<iframe width=0 height=0 id="actionWin_1" name="actionWin_1"></iframe>'));
		appendChild(document.createElement('<iframe width=0 height=0 id="actionWin_2" name="actionWin_2"></iframe>'));
		appendChild(document.createElement('<iframe width=0 height=0 id="actionWin_3" name="actionWin_3"></iframe>'));
		appendChild(document.createElement('<iframe width=0 height=0 id="actionWin_my" name="actionWin_my"></iframe>'));
		appendChild(document.createElement('<iframe width=0 height=0 id="workerWin" name="workerWin"></iframe>'));
		appendChild(document.createElement('<iframe width=0 height=0 id="reWin" name="reWin" src="re.jsp;jsessionid='+sessionId+'"></iframe>'));
		appendChild(document.createElement('<iframe width=0 height=0 id="cacheWin" name="cacheWin" src="cachepic.html"></iframe>'));
		/*
		 * appendChild(document.createElement('<INPUT TYPE="button" value="队伍"
		 * class="button" style="left: 625;top: 31;" onclick="showRank(this);"
		 * hidefocus=true id=showRankButton>'));
		 * appendChild(document.createElement('<INPUT TYPE="button" value="好友"
		 * class="button" style="left: 658;top: 31;" onclick="showFriend(this);"
		 * hidefocus=true id=showFriendButton>'));
		 * appendChild(document.createElement('<INPUT TYPE="button" value="事件"
		 * class="button" style="left: 691;top: 31;" onclick="showThing(this);"
		 * hidefocus=true id=showThingButton>'));
		 * appendChild(document.createElement('<INPUT TYPE="button" value="信息"
		 * class="button" style="left: 724;top: 31;" onclick="showInfo(this);"
		 * hidefocus=true id=showInfoButton>'));
		 * appendChild(document.createElement('<INPUT TYPE="button" value="聊天"
		 * class="button" style="left: 757;top:
		 * 31;color:#3F8194;background-color:#b5e7ee;" onclick="showChat(this);"
		 * hidefocus=true id=showChatButton>'));
		 */
		// appendChild(document.createElement('<img
		// src="/img/button/showRankButton.png" alt="队伍" class="button"
		// style="left: 505;top: 2631;"
		// onclick="changeBtnPic(this);showRank(this);" hidefocus=true
		// id=showRankButton display=none>'));
		// appendChild(document.createElement('<img
		// src="/img/button/showFriendButton.png" alt="好友" class="button"
		// style="left: 542;top: 2631;"
		// onclick="changeBtnPic(this);showFriend(this);" hidefocus=true
		// id=showFriendButton display=none>'));
		// appendChild(document.createElement('<img
		// src="/img/button/showThingButton.png" alt="事件" class="button"
		// style="left: 599;top: 2631;"
		// onclick="changeBtnPic(this);showThing(this);" hidefocus=true
		// id=showThingButton display=none>'));
		// appendChild(document.createElement('<img
		// src="/img/button/showInfoButton.png" alt=""信息" class="button"
		// style="left: 646;top: 2631;"
		// onclick="changeBtnPic(this);showInfo(this);" hidefocus=true
		// id=showInfoButton display=none>'));
		// appendChild(document.createElement('<img
		// src="/img/button/showChatButton_1.png" alt=""聊天" class="button"
		// style="left: 693;top: 2631;color:#3F8194;background-color:#b5e7ee;"
		// onclick="changeBtnPic(this);showChat(this);" hidefocus=true
		// id=showChatButton display=none>'));
		appendChild(document.createElement('<span id=showRankButton>'));
		appendChild(document.createElement('<span id=showFriendButton display=none>'));
		appendChild(document.createElement('<span id=showThingButton display=none>'));
		appendChild(document.createElement('<span id=showInfoButton display=none>'));
		appendChild(document.createElement('<span id=showChatButton display=none>'));
		appendChild(document.createElement('<span id="thisRoomText" style="width:172;height:18;position:absolute;left:450;top:48;overflow-y:hidden;text-align:center;vertical-align:middle;z-index:1000;display:block"></span>'));
				
		appendChild(document.createElement('<iframe style="position: absolute; left: 0;top: 27;border:3px solid #FFFFFF" height=381 width=448 src="map/loading.html" frameborder=0 id="mapWin"></iframe>'));

				appendChild(document.createElement('<label id=innerReader style="overflow-y:auto;overflow-x:hidden;height:80;width:453;position: absolute; left: '+(-23+pLeft)+';top: '+(376+pTop-51)+';visibility:visible;z-index: 10;background-color:#c2e1eb;padding-bottom:5px;padding-top:5px;padding-left:10px;padding-right:10px;WORD-BREAK:break-all;border:1px solid #58b1d8"></label>'));


		// appendChild(document.createElement('<img src=img/bar/barNum.gif
		// height=5 style="position: absolute; left: 29;top: 200;">'));
		appendChild(document.createElement('<label id=npcChatReader style="display:none;overflow-y:auto;height:220;width:258;border:5px solid #5AA2BA;position: absolute; left: '+(58+pLeft)+';top: '+(47+pTop)+';visibility:visible;z-index: 11;background-color:#b5e7ee;padding-bottom:5px;padding-top:14px;padding-left:15px;padding-right:13px;line-height:14pt;overflow-y:auto;word-break:break-all;"></label>'));
		appendChild(document.createElement('<label id=npcTaskReader style="display:none;overflow-y:auto;height:180;width:270;border:1px solid black;position: absolute; left: '+(23+pLeft)+';top: '+(120+pTop)+';visibility:visible;z-index: 11;background-color:#b5e7ee;padding-bottom:5px;padding-top:5px;padding-left:10px;padding-right:10px;"></label>'));
		appendChild(document.createElement('<label style="display:none;"><font color=red size=3><b>这不是乱码!此为Shoot验证图形!</b></label>'));
		appendChild(document.createElement('<img src=img/boss.gif style="position: absolute;left: 0;top: 0;z-index:999999999;display:none;" id=bossPic>'));
		appendChild(document.createElement('<INPUT TYPE="image" src="img/sm.gif"  style="position: absolute;left: 897;top: 460;" onmousedown="changeChatWin();" hidefocus=true>'));
		appendChild(document.createElement('<div id="divPetTalkAlert" style="position:absolute;"></div>'));

		appendChild(document.createElement('<img id="chunjie" src="/img/blank.gif" style="position: absolute; top: -999999px;left: 1000000px;z-index: 3000; display:none"/>'));
	}
		//alert:win
		var alertWin=document.createElement('div');
		alertWin.id="tipWin";
		with(alertWin.style){
			display="none";
			overflowY="auto";
			height="220";
			width="258";
			border="5px solid #5AA2BA";
			position="absolute"; 
			left="80";
			top="139";
			visibility="visible";
			zIndex="11";
			backgroundColor="#b5e7ee";
			paddingBottom="5px";
			paddingTop="14px";
			paddingLeft="15px";
			paddingRight="13px";
			lineHeight="14pt";
			wordBreak="break-all";	
		}
		alertWin.innerHTML="tip..";
		document.body.appendChild(alertWin);
		// alert:win

		// bg ren:start
		var obj=document.createElement('div');
		obj.id="renPicBG";
		with(obj.style){
			position="absolute";
			zIndex=10;
			left=0;
			top=27;
			width=450;
			height=385;
			backgroundColor="#5AA2BA";
			filter="alpha(opacity=50)";
			display="none";
		}
		document.body.appendChild(obj);

		// bg ren:start
		var obj=document.createElement('div');
		obj.id="secondCodeBG";
		with(obj.style){
			position="absolute";
			zIndex=20;
			left=0;
			top=0;
			width=910;
			height=590;
			backgroundColor="#5AA2BA";
			filter="alpha(opacity=50)";
			display="none";
		}
		document.body.appendChild(obj);

// bg go eyunmen:start
		var obj=document.createElement('div');
		obj.id="eyunmenBG";
		with(obj.style){
			position="absolute";
			zIndex=10;
			left=0;
			top=0;
			width=900;
			height=577;
			backgroundColor="#5AA2BA";
			filter="alpha(opacity=50)";
			display="none";
		}
		document.body.appendChild(obj);

		// bg input:camp
		var obj=document.createElement('div');
		obj.id="campCommandBG";
		with(obj.style){
			display="none";
			position="absolute";
			left="240";
			top="157";
			width="310px";
			visibility="visible";
			zIndex="21";
			border="1px solid black";
			padding="10px";
			backgroundColor="#FFFFE1";
		}
	    obj.innerHTML="请选择你的阵营：<FORM method=\"POST\" ACTION=\"action.jsp?\" target=\"actionWin_my\" id=\"campCommandForm\" name=\"campCommandForm\" onsubmit=\"campMessageSubmit();return false;\">"
			+"<INPUT TYPE=\"hidden\" name=\"action\" value=\"campCommand\"><table><tr><td>拖把护卫队:<INPUT TYPE=\"radio\"  value=1 name=\"campCommandRadio\"> 精灵守护者:<INPUT TYPE=\"radio\" value=2 name=\"campCommandRadio\"> 魔族潜伏者:<INPUT TYPE=\"radio\"  value=3 name=\"campCommandRadio\"><INPUT TYPE=\"submit\" value=\"输入\" style=\"margin-top:0px;\"></nobr></td></tr>"
			+"</table></form>";
		document.body.appendChild(obj);


		// bg ren:start
		var obj=document.createElement('div');
		obj.id="secondCodeCommandBG";
		with(obj.style){
			display="none";
			position="absolute";
			left="240";
			top="157";
			width="310px";
			visibility="visible";
			zIndex="21";
			border="1px solid black";
			padding="10px";
			backgroundColor="#FFFFE1";
		}
	    obj.innerHTML="请输入二级验证密码：<FORM method=\"POST\" ACTION=\"action.jsp?\" target=\"actionWin_my\" id=\"secondcodemesForm\" name=\"secondcodemesForm\" onsubmit=\"secondMessageSubmit();return false;\">"
		+"<INPUT TYPE=\"hidden\" name=\"action\" value=\"secondCodeCommand\"><table cellspacing=0 cellpadding=0 width=46 border=0 align=center><tr height=25><td valign=top ><INPUT TYPE=\"password\" NAME=\"secondcodeinput\" id=\"secondcodeinput\" style=\"height:21;margin-left:3px;\" onfocus=\"if(this.value=='请输入二级密码')this.value='';this.style.color='#000';\" size=\"26\" value=\"请输入二级密码\"></nobr></td><td valign=top><nobr><INPUT TYPE=\"submit\" value=\"输入\" name=\"secondvalue\" id=\"secondvalue\" style=\"margin-top:0px;\"></nobr></td></tr></table></form>";
		document.body.appendChild(obj);




		// var obj=document.createElement('div');
		var obj=document.createElement('img');
		obj.id="renPic";
		with(obj.style){
			position="absolute";
			zIndex=12;
			left=28;
			top=103;
			// width=71;
			// height=71;
			// backgroundImage="url(img/ren/weisuonan.gif)";
			backgroundRepeat="no-repeat";
			backgroundPositionY="bottom";
			backgroundPositionX="right";
			display="none";
		}
		document.body.appendChild(obj);
		var obj=document.createElement('div');
		obj.id="renPicX";
		with(obj.style){
			position="absolute";
			zIndex=12;
			left=320;
			top=146;
			width=71;
			height=71;
			backgroundRepeat="no-repeat";
			backgroundPositionY="bottom";
			backgroundPositionX="right";
			display="none";
		}
		obj.innerHTML="<img src=/img/button/w_3.gif style='cursor:hand' onclick='p.closeRenPic();return false;'>";
		document.body.appendChild(obj);
		// bg ren:end

	loadPetWin();
	changeTitle();
	loadMyIM();
	changeMap(nowMap);
	
	document.onkeydown=_keyPress;
}
//function changeAlertWin(b){
//	document.getElementById('alertWin').style.display=(b?"":"none");
// }
/*
 * function tryAlertWin(){ setTimeout("" +"var stopGame=false;"
 * +"try{if(workerWin.document.readyState=='interactive'){" +"
 * document.getElementById('loadState').style.color='#00E874';" +"
 * document.getElementById('loadState').title='连接状态正常';" +" tryAlertWin();"
 * +"}else{stopGame=true;}}catch(x){stopGame=true;}" +"if(stopGame){" +"
 * document.getElementById('loadState').style.color='#777777';" +"
 * document.getElementById('loadState').title='连接状态异常中止';" +"
 * changeAlertWin(true);" +"}" ,5000); }
 */
// ren:start
function showNpcChat(b){
	var npcChatReader=document.getElementById("npcChatReader");
	var bg=document.getElementById("renPicBG");
	var renPicX=document.getElementById("renPicX");

	if(b){
		var pic=document.getElementById("renPic");
		pic.style.display="none";
		clsMes("npcChatReader");

		npcChatReader.style.display="";
		bg.style.display="";
		 with(npcChatReader.style){
			left=83;
			top=139;
		}
			
		with(renPicX.style){
			left=320;
			top=146;
		}
		renPicX.style.display="";
	}else{
		npcChatReader.style.display="none";
		bg.style.display="none";
		renPicX.style.display="none";
	}
}
function showRenPic(url){

	showNpcChat(true);

	var pic=document.getElementById("renPic");
	// pic.style.backgroundImage="url("+url+")";
	pic.src=url;
	 with(pic.style){
	  	left=28;
		top=103;
	 }
	pic.style.display="";

}

function showNpcBigChat(b){
	var npcChatReader=document.getElementById("npcChatReader");
	var bg=document.getElementById("renPicBG");
	var renPicX=document.getElementById("renPicX");

	if(b){
		var pic=document.getElementById("renPic");
		pic.style.display="none";
		clsMes("npcChatReader");

		npcChatReader.style.display="";
		bg.style.display="";
		 with(npcChatReader.style){
			left="120";
			top="139";
		 }
		 
		 with(renPicX.style){
			left=360;
			top=146;
		}
		renPicX.style.display="";
	}else{
		npcChatReader.style.display="none";
		bg.style.display="none";
		renPicX.style.display="none";
	}
}

function showRenBigPic(url){

	showNpcBigChat(true);

	var pic=document.getElementById("renPic");
	// pic.style.backgroundImage="url("+url+")";
	pic.src=url;
	 with(pic.style){
	  left="0";
	  top="139";
	 }
	pic.style.display="";
}

function closeRenPic(){
	var pic=document.getElementById("renPic");
	pic.src="/img/blank.gif";
	pic.style.display="none";
	showNpcChat(false);
}
//ren:end


function closeTaskTalk(){
	/*
	var npcTaskReader=document.getElementById("npcTaskReader");
	var bg=document.getElementById("renPicBG");
	bg.style.display="none";
	npcTaskReader.style.display="none";
	*/
	closeRenPic();
}

function changeName(nowName){
	var input=prompt('输入新名字吧!(需要消耗[转生之炎]一个!)',nowName);
	if(input!=null){
		if(input!=""&&input!=nowName){
			cmd("rename "+input);
		}
	}
}
//快捷键
function useCut(index){
	//addRM("<font color=777777>快捷命令使用!</font><br>");
	if(cutArray[index]=="null"){
		addRM("<font color=red>无此快捷键!</font><br>");
	}else{
		if(cutArray[index].indexOf('perform')!=-1){
			cmd(cutArray[index]+" "+fuji);
		}else{
			cmd(cutArray[index]);
		}
	}
}

//浮动快捷键
function useCut1(index){
	//addRM("<font color=777777>快捷命令使用!</font><br>");
	if(cutArray1[index]=="null"){
		addRM("<font color=red>无此快捷键!</font><br>");
	}else{
		if(cutArray1[index].indexOf('perform')!=-1){
			cmd(cutArray1[index]+" "+fuji);
		}else{
			cmd(cutArray1[index]);
		}
	}
}

function changeKuaiJie(num){
	kuaiJieJian=num;
}
function showStoreItems(arr,mysize,max,curpage,maxpage){
	if(arr.length==0){
		//addRM("<font color=red>你没有寄存任何道具!</font><br>");
		p.offOpenWin('listStoreTools');
		return;
	}
	onOpenWin(_getWin("listStoreTools"));
	var o="<table height=2 cellpadding='0' cellspacing='0'><tr><td></td></tr></table>";
	o+="<font color=red>目前寄存 ("+mysize+" max "+max+") <a href=><a href=# onclick=\"cmd('kuorong');return false;\"><font color=blue>[扩容]</font></a></font><hr size=1>";

	o+="<table border=0>";
	for(var i=0;i<arr.length;i++){
		o+=("<tr><td width=150><a href=# onclick=\"p.cmd('helptools st_"+arr[i][3]+"');return false;\">"+arr[i][0]+"</a></td><td><nobr><font color=red>"+arr[i][1]+"</font></nobr></td><td width=5></td><td><nobr><a href=# onclick=\"getStoreItemsPop('"+arr[i][0]+"',"+arr[i][3]+","+curpage+");\">[取回]</a></nobr></td></tr>");
	}
	o+="</table>";
	if(curpage>1){
		o+="<hr size=1><a href=# onclick=\"cmd('getItems "+(curpage-1)+"');return false;\">上一页</a>";
	}
	else{
		o+="<hr size=1>上一页";
	}
	
	if(curpage==maxpage){
		o+="&nbsp;&nbsp;下一页";
	}
	else{
		o+="&nbsp;&nbsp;<a href=# onclick=\"cmd('getItems "+(curpage+1)+"');return false;\">下一页</a>";
	}
	o+="<table height=6 cellpadding='0' cellspacing='0'><tr><td></td></tr></table>";
_openWin("listStoreTools",o);

}
function killRedPlayer(toolPath){//用召唤道具杀红名
	var input=prompt('要杀的对象是?',"");
	if(input!=null){
		cmd("use "+toolPath+" "+input);
	}
}
function hide(s){
	s.style.display="none";
}

//交易
function addToDeal(toolName,toolIndex,unit){
	var input=prompt('要加入交易多少 '+unit+'['+toolName+'] ?','1');
	if(input!=null){
		cmd('deal '+toolIndex+' '+input);
		return;
	}
}
function yDeal(name){
	addRM("<font color=green><u>"+name+"</u>邀请你进行交易,是否同意? <a href=# onclick='p.cmd(\"deal "+name+"\");p.hide(this);return false;'>[同意]</a></font><br>");
}
function getDealItem(itemName,itemIndex){
	var input=prompt('要从交易中取回多少 ['+itemName+'] ?','全部');
	if(input!=null){
		cmd('deal getItems '+itemIndex+' '+input);
		return;
	}
}
function isDeal(){//目前是否在交易中
	var dwin=document.all("dealWin");
	if(dwin){
		return dwin.style.display!="none";
	}else{
		return false;
	}
}


var _dealAlert="<table height=2 cellpadding='0' cellspacing='0'><tr><td></td></tr></table><font color=#959BAE>打开[道具]栏,点选欲交易物品后点[交易]即可将物品加入交易框<br><br>确认两边交易物品适当后按[确认交易]按钮即可完成交易<br><br>请仔细确认对方物品属性和数量后再按[确认交易],谨防上当</font>";
function showDeal(names,items,locks, coinNums){//#FFD9D9
	onOpenWin(_getWin("dealWin"));
	var o="";
	o+="<table height=2 cellpadding='0' cellspacing='0'><tr><td></td></tr></table>";
	o+="<font color=red>交易中...</font><hr size=1 width='98%' align=left>";

	o+="<table height=200 cellpadding='0' cellspacing='0' border=0 width=98%>";
	o+="<tr>";

	var mySide="A";
	var isThis=(myName==names[1]);
	if(isThis){
		mySide="B";
	}
	var myLock;
	if(mySide=="A"){
		myLock=locks[0];
	}else{
		myLock=locks[1];
	}

		if(isThis){

			isThis=(myName==names[0]);
			o+="<td valign=top width=49% style='padding:5px;' bgcolor="+(locks[0]?"#FFD9D9":"e1e1e1")+"><b><font color=#596075>"+(isThis?"<font color=red>你</font>":names[0])+" 的物品:</font></b><br>"
				+"<table height=5 cellpadding='0' cellspacing='0'><tr><td></td></tr></table>";
				if(items[0].length<1){
					if(isThis==true){
						o+=_dealAlert;
					}
				}else{
					var tarr=items[0];
					for(var i=0;i<tarr.length;i++){
						o+="&nbsp;<a href=# onclick=\"p.cmd('helptools dealA_"+i+"');return false;\">"+tarr[i][0]+"</a> "+(tarr[i][1]>0?"("+tarr[i][1]+")":"")+"　"+(isThis?"<a href=# onclick=\"getDealItem('"+tarr[i][0]+"',"+i+");return false;\">[取回]</a>":"")+"<br>";
					}
				}
			o+="</td>";
			o+="<td width=5></td>"
			isThis=(myName==names[1]);
			o+="<td valign=top width=50% style='padding:5px;' bgcolor="+(locks[1]?"#FFD9D9":"e1e1e1")+"><b><font color=#596075>"+(isThis?"<font color=red>你</font>":names[1])+" 的物品:</font></b><br>"
			+"<table height=5 cellpadding='0' cellspacing='0'><tr><td></td></tr></table>";
				if(items[1].length<1){
					if(isThis==true){
						o+=_dealAlert;
					}
				}else{
					var tarr=items[1];
					for(var i=0;i<tarr.length;i++){
						o+="&nbsp;<a href=# onclick=\"p.cmd('helptools dealB_"+i+"');return false;\">"+tarr[i][0]+"</a> "+(tarr[i][1]>0?"("+tarr[i][1]+")":"")+"　"+(isThis?"<a href=# onclick=\"getDealItem('"+tarr[i][0]+"',"+i+");return false;\">[取回]</a>":"")+"<br>";
					}
				}
			o+="</td>";
		}else{
			isThis=(myName==names[1]);
			o+="<td valign=top width=49% style='padding:5px;' bgcolor="+(locks[1]?"#FFD9D9":"e1e1e1")+"><b><font color=#596075>"+(isThis?"<font color=red>你</font>":names[1])+" 的物品:</font></b><br><table height=5 cellpadding='0' cellspacing='0'><tr><td></td></tr></table>";
				if(items[1].length<1){
					if(isThis==true){
						o+=_dealAlert;
					}
				}else{
					var tarr=items[1];
					for(var i=0;i<tarr.length;i++){
						o+="&nbsp;<a href=# onclick=\"p.cmd('helptools dealB_"+i+"');return false;\">"+tarr[i][0]+"</a> "+(tarr[i][1]>0?"("+tarr[i][1]+")":"")+"　"+(isThis?"<a href=# onclick=\"getDealItem('"+tarr[i][0]+"',"+i+");return false;\">[取回]</a>":"")+"<br>";
					}
				}
			o+="</td>";
			o+="<td width=5></td>"
			isThis=(myName==names[0]);
			o+="<td valign=top width=50% style='padding:5px;' bgcolor="+(locks[0]?"#FFD9D9":"e1e1e1")+"><b><font color=#596075>"+(isThis?"<font color=red>你</font>":names[0])+" 的物品:</font></b><br><table height=5 cellpadding='0' cellspacing='0'><tr><td></td></tr></table>";
				if(items[0].length<1){
					if(isThis==true){
						o+=_dealAlert;
					}
				}else{
					var tarr=items[0];
					for(var i=0;i<tarr.length;i++){
						o+="&nbsp;<a href=# onclick=\"p.cmd('helptools dealA_"+i+"');return false;\">"+tarr[i][0]+"</a> "+(tarr[i][1]>0?"("+tarr[i][1]+")":"")+"　"+(isThis?"<a href=# onclick=\"getDealItem('"+tarr[i][0]+"',"+i+");return false;\">[取回]</a>":"")+"<br>";
					}
				}
			o+="</td>";
		}
	o+="</tr>";
	o+="</table>";
	o+="<table height=5 cellpadding='0' cellspacing='0'><tr><td></td></tr></table>";
	o+="<table height=40 cellpadding='0' cellspacing='0' border=0 width=98%>";
	o+="<tr>";
	
	var isThis=(myName==names[1]);
	if(isThis){
		o+="<td valign=top width=49% style='padding:5px;' bgcolor="+(locks[0]?"#FFD9D9":"e1e1e1")+">";
		o+=coinNums[0];
		o+="</td>";
		o+="<td width=5></td>"
		o+="<td valign=top width=50% style='padding:5px;' bgcolor="+(locks[1]?"#FFD9D9":"e1e1e1")+">";
		o+=(coinNums[1]==''?"":coinNums[1]+"　"+"<a href=# onclick=\"p.cmd('deal _cCoin');return false;\">[取回]</a>")+"<br>";
		o+="<input type='text' name='txtDealPrice_1' id='txtDealPrice_1' value='0' size='2'><img src='/img/itemlogo/jinb.gif'>"
		+"<input type='text' name='txtDealPrice_2'  id='txtDealPrice_2'  value='0' size='2'><img src='/img/itemlogo/yinb.gif'>"
		+"<input type='text' name='txtDealPrice_3' id='txtDealPrice_3'  value='0' size='2'><img src='/img/itemlogo/tongb.gif'> "
		+"<a href=# onclick=\"addDealCoin();return false;\">[加入]</a>"+"<br>";
		o+="</td>";
	}else{
		o+="<td valign=top width=49% style='padding:5px;' bgcolor="+(locks[1]?"#FFD9D9":"e1e1e1")+">";
		o+=coinNums[1];
		o+="</td>";
		o+="<td width=5></td>"
		o+="<td valign=top width=50% style='padding:5px;' bgcolor="+(locks[0]?"#FFD9D9":"e1e1e1")+">";
		o+=(coinNums[0]==''?"":coinNums[0]+"　"+"<a href=# onclick=\"p.cmd('deal _cCoin');return false;\">[取回]</a>")+"<br>";
			o+="<input type='text' name='txtDealPrice_1' id='txtDealPrice_1' value='0' size='2'><img src='/img/itemlogo/jinb.gif'>&nbsp;"
		+"<input type='text' name='txtDealPrice_2'  id='txtDealPrice_2'  value='0' size='2'><img src='/img/itemlogo/yinb.gif'>&nbsp;"
		+"<input type='text' name='txtDealPrice_3' id='txtDealPrice_3'  value='0' size='2'><img src='/img/itemlogo/tongb.gif'>&nbsp;"
		+"&nbsp;<a href=# onclick=\"addDealCoin();return false;\">[加入]</a>"+"<br>";
		o+="</td>";
	}
	o+="</tr></table>";
		

	o+="<table height=5 cellpadding='0' cellspacing='0'><tr><td></td></tr></table>";

	o+="<table cellpadding='0' cellspacing='0' border=0 width=98%>";
	o+="<tr><td align=right><input type=button value=确认交易 "+(myLock?"disabled":"")+" onclick=\"cmd('deal _"+mySide+"');\" class='smallFont'><input type=button value=取消 onclick=\"cmd('deal _c');\" class='smallFont'></td></tr>"
	o+="</table>";
	o+="<table height=3 cellpadding='0' cellspacing='0'><tr><td></td></tr></table>";
	_openWin("dealWin",o);
}

function getPriceStrByInput(txtNamePre){
		sellPrice="";
		for (var i=1; i<4; i++){
			var curPriceObj=document.getElementById(txtNamePre+i);
			var priceValue=curPriceObj.value;
			if (priceValue=="") priceValue="0";
			if (!checkNum(priceValue)){
				alert("请输入正确的数字");
				curPriceObj.select();
				return "";
			}else{
				sellPrice+=(i==1?"":",")+priceValue;
			}
		}
		return sellPrice;
}


//增加交易中的钱数
function addDealCoin(){
	var price=getPriceStrByInput("txtDealPrice_");
// alert(price);
	if (price!=""){
		p.cmd('deal coin '+price);
	}
	for (var i=1; i<4; i++){
		var curPriceObj=document.getElementById("txtDealPrice_"+i);
		curPriceObj.value=0;
	}
}



var scrollIndex=0;
var iIntervalID=0;

/**
 * 显示滚动条
 */
function scrollLine(scrollNum, scrollWidth){
	var goingObj=document.getElementById("composeWinGoing");
	goingObj.style.display="";
	if (scrollIndex==scrollNum){
		_setLine("composeScroll",120,120);
		scrollIndex=0;
		window.clearInterval(iIntervalID);
	}
	else{
		//alert(scrollIndex*scrollWidth);
		_setLine("composeScroll",scrollIndex*scrollWidth,100);
		scrollIndex++
	}
}

/*取消合成。用在合成的过程中。一般用于合成多个时，中途取消*/
function cancelCompose(){
	if (composeTimeOut>0) {
		window.clearTimeout(composeTimeOut);
		p.offOpenWin('composeWin');
	}
}


function showComposeResult(resultStr, itemName, itemNum, isAddExp){
	/*
	var winObj=_getWin("composeWinResult");
	winObj.style.height=70;
	var composeWinObj=_getWin("composeWin");
	if (composeWinObj.style.display==""){
		with (winObj.style){
			width=composeWinObj.style.width;
			left=composeWinObj.style.left;
			top=composeWinObj.style.pixelTop+100;
		}
	}
	onOpenWin(winObj);
	*/
	var o="<br><b>"+resultStr+"</b><br>";
	if (resultStr.indexOf("成功")>-1){
		o+="得到 "+ itemName+" x "+itemNum+"。";
	}
	if (isAddExp=="true"){
		o+="<br> 熟练度 +1 。";
	}

	var composeWinObj=_getWin("composeWin");
	if (composeWinObj.style.display==""){
		var goingObj=document.getElementById("composeWinGoing");
		goingObj.style.display="none";
		var divObj=document.getElementById("composeWinResult");
		divObj.innerHTML=o;
		divObj.style.display="";
		if (composeIsLastOne){
			document.getElementById("linkCancelCompose").innerHTML="[关闭]";
		}
	}
	else{
		var winObj=_getWin("composeWinResult");
		winObj.style.height=70;
		onOpenWin(winObj);
		_openWin("composeWinResult",o);
	}


	//_openWin("composeWinResult",o);
	// window.setTimeout("offOpenWin('composeWin')",2500);
}

/**
显示合成过程以及结果。
**/
function _showCompose(fName){
	onOpenWin(_getWin("composeWin"));
	var o="<br><p align='center'><div id='composeWinGoing' name='composeWinGoing' style='display: ' align=center>"
			+"<table width='122' border='0' cellpadding='0' cellspacing='1' bgcolor=#C0C0C0>"
			+"<tr><td  bgcolor=#247410 width=120><table style='width:1;height:7;' bgcolor=#C0C0C0 id='composeScroll' name='composeScroll'  border='0' cellpadding='0' cellspacing='0'><tr><td></td></tr></table></td></tr></table>"
			+"<br>"
			+"["+fName+"] 进行中……</div>"
			+"<div id='composeWinResult'></div>"
			+"<p align='center'><a href=# onclick='cancelCompose();return false;' id='linkCancelCompose'>[取消]</a></p>";

	_openWin("composeWin",o);
	iIntervalID=window.setInterval("scrollLine(12,10)",200);
	// window.setTimeout("showComposeResult('"+resultStr+"','"+itemName+"',
	// "+itemNum+",'"+isAddExp+"')",busyInt);
}

function changeSoundPlayer(){
	if(parent.frameset_top.rows=='*,0'){
		if(parent.location.host!=parent.frame_sound.location.host){
			parent.frame_sound.location.href='../soundplayer/';
		};
		parent.frameset_top.rows='*,35';
	}else{
		parent.frameset_top.rows='*,0';
	}
}

function getPetInfo(str){
	var winObj=_getWin("getPetInfoAdmin");
	with(winObj.style){
		width="240";
		height="10";
		overflowY="";
	}
	onOpenWin(winObj);
	_openWin("getPetInfoAdmin",str);
}

/*显示本人正在寄卖中的道具*/
function _showSoldList(arr){
	var o="";
	o+="<b><font color=black>【寄卖列表】</font></b>"
	+"<hr size=1 width=98% align=left>";
	if (arr.length==0){
		addRM("<font color='red'>暂时没有寄卖任何物品</font><br>");
		offOpenWin("consignList");
	}
	onOpenWin(_getWin("consignList"));
	o+="<table width='250' border='0' cellpadding='0' cellspacing='1' bgcolor=#C0C0C0><tr  bgcolor=#FFFFDF>"
			+"<td bgcolor=#FFFFDF>道具</td>"
			+"<td bgcolor=#FFFFDF>寄卖<br>数量</td>"
			+"<td bgcolor=#FFFFDF>剩余<br>数量</td>"
			+"<td bgcolor=#FFFFDF>单价</td>"
			+"<td bgcolor=#FFFFDF>操作</td>"
			+"</tr>";
	for(var i=0;i<arr.length;i++){
		o+="<tr  bgcolor=#FFFFFF>"
			+"<td  bgcolor=#FFFFFF><a href=# onclick=\"cmd('helpConsignItem "+arr[i][0]+"');return false;\">"+arr[i][1]+"</a></td> "
			+"<td  bgcolor=#FFFFFF>"+arr[i][2]
			+"</td><td  bgcolor=#FFFFFF>"+arr[i][3]
			+"</td><td  bgcolor=#FFFFFF>"+arr[i][4]
			+"</td><td  bgcolor=#FFFFFF><a href=# onclick=\"consignGetBack('"+arr[i][1]+"',"+arr[i][0]+");return false;\">取回</a>";
		o+="</tr>";
	}
	o+="</table>";
	_openWin("consignList",o);
}

/*寄卖时选择和隐藏用MP定价的方式*/
function openConsignOnMp(){
	var divObj=document.getElementById('divConsignOnMp');
	try{
		if (divObj.style.display=="none"){
			divObj.style.display="";
		}else{
			divObj.style.display="none";
			document.getElementById('txtPriceMp').value="0";
		}
	}catch (ex){
	}
}

/*选择物品进行寄卖后 输入寄卖价格和寄卖时间*/
function consign(itemName,itemIndex){
	var winObj=_getWin("consignInput");
	with(winObj.style){
		width="220";
		height="10";
		overflowY="";
	}

	onOpenWin(winObj);
	var str="<font color='green'>寄卖【"+itemName+"】</font><br>"
		+"<br>请输入想要寄卖的数量：<br>"
		+"  <input type='text' name='txtNum' value='全部' size='4'><br>"
		+" 请输入寄卖的<font color='red'>单价</font>：<br>"
		+"<input type='text' name='txtPrice_1' id='txtPrice_1' value='0' size='2'><img src='/img/itemlogo/jinb.gif'>"
		+"<input type='text' name='txtPrice_2'  id='txtPrice_2'  value='0' size='2'><img src='/img/itemlogo/yinb.gif'>"
		+"<input type='text' name='txtPrice_3' id='txtPrice_3'  value='0' size='2'><img src='/img/itemlogo/tongb.gif'><br> "
		// +"<a href='#' onclick='openConsignOnMp();return
		// false;'>其他定价方式>>>></a><br>"
		+"<div id='divConsignOnMp' style='display:none'><input type='text' name='txtPriceMp' value='0' size='5'>MP</div>"
		+"寄卖时间：<select name='selDayNum'><option value='1'>1天</option><option value='3'>3天</option><option value='7'>一周</option></select><br>"
		+"<input type='button' onclick='doSell("+itemIndex+")' value='确定'>"
		+"<input type='button' onclick='p.offOpenWin(\"consignInput\");' value='取消'>";
	_openWin("consignInput",str);
}
/*增加一种销售方式*/
/*
 * function appendPrice(){ var divObj=document.getElementById("divMorePrice");
 * divObj.innerHTML+="<input type='text' name='txtPrice' value='0' size='4'><select
 * name='txtPriceType'>" +priceTypeOption +"</select> &nbsp;<a href='#'
 * onclick='appendPrice()'>或</a><br>"; }
 */

/* 得到手续费的多少 */
function _getTaxNum(dayNum){
	var taxNum="";
	switch (dayNum){
		case '1': taxNum="10铜币"; break;
		case '3': taxNum="40铜币"; break;
		case '7': taxNum="1银币"; break;
		default: taxNum="";
	}
	return taxNum;
}

function doSell(itemIndex){
	var dayObj=document.getElementById("selDayNum");
	var dayNum=dayObj.options[dayObj.selectedIndex].value;
	var taxNum=_getTaxNum(dayNum);
	if (taxNum=="") {
		alert("请选择正确的寄卖时间");
		return false;
	}
	if (!confirm("根据寄卖的时间，将收取手续费 "+taxNum+"。\n\n你是否确定要寄卖？")){
		p.offOpenWin("consignInput");
		return false;
	}
	var sellNum="1";
	var sellPrice="";
	var priceMp="0";
	try{
		sellNum=document.getElementById("txtNum").value;
		sellPrice=getPriceStrByInput("txtPrice_");
		if (sellPrice==''){
			return false;
		}
		var mpPriceDiv=document.getElementById("divConsignOnMp");
		if (mpPriceDiv.style.display!="none") {
			var mpPriceObj=document.getElementById("txtPriceMp");
			priceMp=mpPriceObj.value;
			if (!checkNum(priceMp)){
				alert("请输入正确的MP数量");
				mpPriceObj.select();
				return false;
			}
		}
	}
	catch (excep){alert(excep); return false;}
	p.cmd("consign "+itemIndex+" "+sellNum+" "+dayNum+" "+sellPrice+" "+priceMp);
	p.offOpenWin("consignInput");

}

/*
function consign1(itemName,itemIndex, sellNum){
	var input2=prompt('请输入寄卖的价格，格式：m,n (m为银币数量，n为铜币数量)','0,0');
	if (input2==null){
		return;
	}
	if (!checkPrice(input2)){
		alert("请输入正确的价格");
		consign1(itemName,itemIndex, sellNum);
		return;
	}
	cmd("consign "+itemIndex+" "+sellNum+" "+input2);
}
*/

function consignGetBack(itemName, sellId){
	var input1=prompt('请输入取回 ['+itemName+'] 的数量:','1');
	if(input1==null){return;}
	if(!checkInt(input1)){
		alert("请输入正确的数量!");
		consign(itemName,itemIndex);
		return;
	}
	if(input1<1){
		alert("取回数量不能小于1个!");
		consignGetBack(itemName,itemIndex);
		return;
	}
	cmd("consignGetBack "+sellId+" "+input1);
}

function showFlyPoint(arg){
	/*
	var winObj=_getWin("showFlyPoint");
	winObj.closeEvent="p.addRM('专用空姐: 欢迎下次光临!<br>');p.closeRenPic();"
	onOpenWin(winObj);
	with(winObj.style){
		height="60";
		overflowY="";
		paddingBottom="10px";
		left="48";
		top="105";
	}
	*/
	var o=fakeBr(4);

	// o+=fakeBr(4)+"<font color=red>选择您欲飞往的城市 </font>"+fakeBr(6);


	o+="<table border=0 width=100%>";
	for(var i=0;i<arg.length;i++){
		if(arg[i][0]!="天空之城"){
		o+="<tr><td width=60%><a href=# onclick=\"if(confirm('确定要飞往 ["+arg[i][0]+"] ,花费"+arg[i][1]+"银币?')){p.closeRenPic();offOpenWin('showFlyPoint');p.cmd('flyto "+arg[i][0]+"');};return false;\";>"+arg[i][0]+"</a></td><td>价格: "+arg[i][2]+"</td></tr>";
		}
	}
	o+="</table>";
	addNPCC(o);
	// return o;
	// _openWin("showFlyPoint",o);
}


function startFavorite()
{

	   if(confirm("您已经踏上了猫游记的勇者之路，在此之前建议您收藏游戏地址"))
	   {
		   if (document.all)
		   {
		      window.external.addFavorite("http://"+location.host+"/mopet.html",'猫游记');
		   }
		   else if (window.sidebar)
		   {
		      window.sidebar.addPanel('猫游记', "http://"+location.host+"/mopet.html", "");
		   }
		  
		   startGo();		   
		}else{
		   startGo();		   
		}
}


function startGo(){//开始冒险
	if(getRoom()=="冒险大厅"||getRoom()=='新手村大门'){
		var winObj=_getWin("selectGo");
		onOpenWin(winObj);
		with(winObj.style){
			width="270";
			height="60";
			overflowY="";
			paddingBottom="10px";
			left="48";
			top="193";
		}
		var o="";

		o+=fakeBr(6)+"<font color=#0F3777><b>离开新手村，开始冒险之旅吧！</b></font><br>"+fakeBr(7)
		+"你即将到的地方是 <font color=#FF8040>猫隐村</font> ，在那里有热心的 <font color=#FF8040>戈多</font> 在等待你。好好的和她聊聊吧。<br>"+fakeBr(5)
		+fakeBr(10);
		o+="<table border=0>";
		o+="<tr><td><font color=blue>名字后面有<img src=img/button/1.gif border=0 />的人是有任务的！</font><br/><a href=# onclick=\"offOpenWin('selectGo');cmd('sheng 猫隐村');return false;\";><font color=red>确定开始冒险！</a></font><img src=img/point.gif onclick=\"offOpenWin('selectGo');cmd('sheng 猫隐村');return false;\"/></td></tr>";
		o+="</table>";
		_openWin2("selectGo",o);
	}else{
		addRM("<font color=red>无法走到那里!</font><br>");
	}
}

function showItemDesc(itemName,itemLogo,itemDesc,canEquip,itemKeZi,itemBigPic,lingHunPro){
	if(!itemKeZi){
		itemKeZi = "";
	}
	var winObj=_getWin("itemInfoWin");
	onOpenWin(winObj);
	winObj.style.lineHeight="14pt";
	var o=fakeBr(2)+"<img src="+itemLogo+"> <b>"+itemName+"</b>";
	if(""!=lingHunPro && undefined!=lingHunPro){
		o += "<font color=red>【"+lingHunPro+"】</font>"
	}
	o += fakeBr(4) ;
	if(!canEquip){
		o+="<font color=red>你目前无法装备!</font><br>"
	}
        o+="<FONT COLOR='#FF33FF'>"+itemKeZi+"</FONT>";
	o+=itemDesc+fakeBr(5);
	with(winObj.style){
		width="250";
		height="10";
		if(p.eventY-13<0){
			top=1;
		}else{
			top=p.eventY-13;
		}
		if(p.eventX-250+13<0){
			left=1;
		}else{
			left=p.eventX-250+13;
		}
		overflowY="";
		display='';
		winObj.closeEvent="_getWin('showBigPic').style.display='none'";
	}
	if(itemBigPic!=null && itemBigPic!='null' && itemBigPic!=''){
		showBigPic(itemBigPic,'itemInfoWin');
	}
	else
	{
		// 关闭已打开窗口
		offOpenWin('itemBigPic');
	}
	_openWin("itemInfoWin",o);

}

function showSkillDesc(itemName,itemLogo,itemDesc,canEquip,itemKeZi){
	if(!itemKeZi){
		itemKeZi = "";
	}
	var winObj=_getWin("skillInfoWin");
	onOpenWin(winObj);
	winObj.style.lineHeight="14pt";
	var o=fakeBr(2)+"<img src="+itemLogo+"> <b>"+itemName+"</b>"+fakeBr(4);

	if(!canEquip){
		o+="<font color=red>你目前无法装备!</font><br>"
	}
        o+="<FONT COLOR='#FF33FF'>"+itemKeZi+"</FONT>";
	o+=itemDesc+fakeBr(5);
	with(winObj.style){
		width="250";
		height="10";
		if(p.eventY-13<0){
			top=1;
		}else{
			top=p.eventY-13;
		}
		if(p.eventX-250+13<0){
			left=1;
		}else{
			left=p.eventX-250+13;
		}
		overflowY="";
		display='';
	}

	_openWin("skillInfoWin",o);

}

/*显示盒子里道具的详细信息 add by lj 100222*/
function showBoxItemDescDiv(event,dscpid)
{

  var el, x, y;
	
  el = document.getElementById("boxdesc_"+dscpid);
 
 with(el.style){
		border="1px solid #000000";
		position="absolute";
		backgroundColor="#eeeeee";

		paddingBottom="5px";
		paddingTop="5px";
		paddingLeft="10px";
		paddingRight="5px";
		
		width="250";
		height="10";
		overflowY="";
		
		top = 130;
		left = 130;
		
		display='';
	}
}
function hideBoxItemDescDiv(event,dscpid)
{
  var e1
  el = document.getElementById("boxdesc_"+dscpid);
  el.style.left = "0px";
  el.style.top  = "0px";
  el.style.display = "none";
}

/*对使用神奇药水的显示*/
function _showMiracle(str){
	var spanObj=document.getElementById("miracleShow");
	spanObj.innerHTML=str;
	spanObj.style.display="inline";
}


/*对宠物战斗中状态的显示*/
function _showFightStatus(spanName,showStr){
	var spanObj=p.petWin.document.getElementById(spanName);
	// alert(spanObj);
	if (spanObj!=null){
		spanObj.innerHTML=showStr;
		spanObj.style.display="inline";
	}
}

/* */
function _exchangeCoin(){
	var winObj=_getWin("changeCoinWin");
	onOpenWin(winObj);
	with(winObj.style){
		position:"absolute";
		width="200";
		height="50";
		top=100;
		left=100;
		overflowY="";
		display='';
	}
	var o="要将多少货币兑换成【现金支票】：<br>"
		+"<input type='text' name='txtChange_1' id='txtChange_1' value='0' size='2'><img src='/img/itemlogo/jinb.gif'>"
		+"<input type='text' name='txtChange_2'  id='txtChange_2'  value='0' size='2'><img src='/img/itemlogo/yinb.gif'>"
		+"<input type='text' name='txtChange_3' id='txtChange_3'  value='0' size='2'><img src='/img/itemlogo/tongb.gif'><br> "
		+"<input type='button' onclick='doExchangeCoin()' value='确定'>  "
		+"<input type='button' onclick='offOpenWin(\"changeCoinWin\");' value='取消'> ";
	_openWin("changeCoinWin",o);
}

function doExchangeCoin(){
	var sellPrice=getPriceStrByInput("txtChange_");
	if (sellPrice!=null && ''!=sellPrice){
		p.cmd("changeCoin "+sellPrice);
		offOpenWin("changeCoinWin");
	}
}


function showCanAddSheng(index,arr){
	//alert(arr);
	var winObj=_getWin("selBagSheng");
	onOpenWin(winObj);
	with(winObj.style){
		width="200";
		height="10";
		if(p.eventY-13<0){
			top=1;
		}else{
			top=p.eventY-13;
		}
		if(p.eventX-200+13<0){
			left=1;
		}else{
			left=p.eventX-200+13;
		}
		overflowY="";
		display='';
	}

	
	var o=fakeBr(2)+"<font color=#006A6A>选择要进行加密的容器</font>"+fakeBr(4);
	for(var i=0;i<arr.length;i++){
		o+="<a href=# onclick=\"var inputStr=prompt('请输入一个操作密码 (2-16英文,不能包含特殊字符和中文)','');if (inputStr!=null){cmd('use "+index+" "+arr[i][1]+" "+arr[i][2]+" '+inputStr);offOpenWin('selBagSheng');}return false;\">"+arr[i][0]+"</a><br>";
	}
	_openWin("selBagSheng",o);

}
function showCanAddCardItem(arg,arr){
	var winObj=_getWin("selItemInCard");
	onOpenWin(winObj);
	with(winObj.style){
		width="200";
		height="10";
		if(p.eventY-13<0){
			top=1;
		}else{
			top=p.eventY-13;
		}
		if(p.eventX-200+13<0){
			left=1;
		}else{
			left=p.eventX-200+13;
		}
		overflowY="";
		display='';
	}
	var o=fakeBr(2)+"<font color=#006A6A>选择要将卡片插入的道具</font>"+fakeBr(4);
	for(var i=0;i<arr.length;i++){
		o+="<a href=# onclick=\"cmd('use "+arg+" "+arr[i][1]+" "+arr[i][0]+"');offOpenWin('selItemInCard');return false;\">"+arr[i][2]+"</a><br>";
	}
	_openWin("selItemInCard",o);
}

function showCanAddCardItemHasOne(arg0,arg1,arg2){
	var winObj=_getWin("showCanAddCardItemHasOne");
	onOpenWin(winObj);
	with(winObj.style){
		width="400";
		height="50";
		if(p.eventY-13<0){
			top=1;
		}else{
			top=p.eventY-13;
		}
		if(p.eventX-200+13<0){
			left=1;
		}else{
			left=p.eventX-200+13;
		}
		overflowY="";
		display='';
	}
	var o = "<br><br><br>";
	 o = "<br><table width=100%><tr><td cospan='2' align=center>您指定的装备上已经镶嵌了卡片，若继续镶嵌，则新的卡片会将原有的卡片替换，您确定要这样做吗？</td></tr><tr><td align=center><a href=# onclick=\"p.cmd('use "+arg0+" "+arg1+" "+arg2+" OK');offOpenWin('showCanAddCardItemHasOne');return false;\" >确定</a>&nbsp;&nbsp;<a href=# onclick=\"offOpenWin('showCanAddCardItemHasOne');return false;\" >取消</a></td></tr></table>";
	_openWin("showCanAddCardItemHasOne",o);
}


function showCanUseQiangHuaItem(arg,arg11,arg22,arr){
	//alert(arr);
	var winObj=_getWin("showCanUseQiangHuaItem");
	onOpenWin(winObj);
	with(winObj.style){
		width="200";
		height="10";
		if(p.eventY-13<0){
			top=1;
		}else{
			top=p.eventY-13;
		}
		if(p.eventX-200+13<0){
			left=1;
		}else{
			left=p.eventX-200+13;
		}
		overflowY="";
		display='';
	}
	var o=fakeBr(2)+"<font color=#006A6A>"+arg11+"</font>强化的装备"+fakeBr(4);

	for(var i=0;i<arr.length;i++){
		o+="<a href=# onclick=\"cmd('helptools "+arr[i][1]+"');hideParentMenu();return false;\">"+arr[i][2]+"</a> "+"&nbsp;&nbsp;&nbsp;     <a href=# onclick=\"cmd('use "+arg+" "+arr[i][1]+" "+arr[i][0]+"');offOpenWin('showCanUseQiangHuaItem');return false;\">强化</a><br>";
	}
	_openWin("showCanUseQiangHuaItem",o);
}

//护甲片
function showCanUseHuJiaPianItem(arg,arg11,arg22,arr){
	//alert(arr);
	var winObj=_getWin("showCanUseQiangHuaItem");
	onOpenWin(winObj);
	with(winObj.style){
		width="200";
		height="10";
		if(p.eventY-13<0){
			top=1;
		}else{
			top=p.eventY-13;
		}
		if(p.eventX-200+13<0){
			left=1;
		}else{
			left=p.eventX-200+13;
		}
		overflowY="";
		display='';
	}
	var o=fakeBr(2)+"<font color=#006A6A>"+arg11+"</font>可镶嵌的装备"+fakeBr(4);

	for(var i=0;i<arr.length;i++){
		o+="<a href=# onclick=\"cmd('helptools "+arr[i][1]+"');hideParentMenu();return false;\">"+arr[i][2]+"</a> "+"&nbsp;&nbsp;&nbsp;     <a href=# onclick=\"huJiaPianConfirm('"+arg+"','"+arr[i][1]+"','"+arr[i][0]+"');offOpenWin('showCanUseQiangHuaItem');return false;\">镶嵌</a><br>";
	}
	_openWin("showCanUseQiangHuaItem",o);
}


function huJiaPianConfirm(arg1,arg2,arg3)
{
  	if(confirm("确定要在此装备上镶嵌护甲片吗？"))
  	{
  		cmd("use "+arg1+" "+arg2+" "+arg3+"");
  	}else{  		
  	return;
  	}

}



function listTianHuoShiEquips(tianHuoShiIndex,tianHuoShiName,equips) {
	var winObj=_getWin("listTianHuoShiEquips");
	onOpenWin(winObj);
	with(winObj.style){
		width="200";
		height="10";
		if(p.eventY-13<0){
			top=1;
		}else{
			top=p.eventY-13;
		}
		if(p.eventX-200+13<0){
			left=1;
		}else{
			left=p.eventX-200+13;
		}
		overflowY="";
		display='';
	}
	var o=fakeBr(2)+"<font color=#006A6A>"+tianHuoShiName+"</font>进行前缀名重塑"+fakeBr(4);
	for(var i=0;i<equips.length;i++){
		//equips: 装备index,装备名（带前缀名），装备名字
		var equipIndex = equips[i][0];
		var nameWithProfix = equips[i][1];
		var equipName = equips[i][2];
		o+="<a href=# onclick=\"cmd('helptools "+equipIndex+"');hideParentMenu();return false;\">"+equipName+"</a> "+"&nbsp;&nbsp;&nbsp;     <a href=# onclick=\"cmd('use "+tianHuoShiIndex+" "+equipIndex+" "+nameWithProfix+"');offOpenWin('listTianHuoShiEquips');return false;\">重塑</a><br>";
	}
	
	_openWin("listTianHuoShiEquips",o);
}

function showList(winName,title, raceInfos) {
	var winObj=_getWin(winName);
	onOpenWin(winObj);
	with(winObj.style){
		width="480";
		height="10";
		if(p.eventY-13<0){
			top=1;
		}else{
			if(!top)
				top=p.eventY-13;
		}
		if(p.eventX-467<0){
			left=1;
		}else{
			left=Math.abs(p.eventX-467);
		}
		overflowY="";
		display='';
	}
	var o=fakeBr(2)+title+fakeBr(4);
	o += "<table width=\"100%\" height=\"100%\" border=\"1\" cellpadding=\"0\" cellspacing=\"0\">";
	
	var columns = 3;
	var rows = (raceInfos.length + 2) / columns;
	var index = 0;
	for(var i = 0; i < rows && index < raceInfos.length; i++) {
		o += "<tr align=\"center\">";
		for(var j = 0; j < columns; j++) {
			if(index < raceInfos.length) {
				var info = raceInfos[index];
				o += "<td><label id=\"" + info[1] + "\">" + info[0] + "</label></td>";
				o += "<td><input name=\"pet_image\" type=\"radio\" value=\"" + info[1] + "\" " + (index==0 ? "checked=\"checked\"":"") + "/></td>";
			} else {
				o += "<td>&nbsp;</td>"
				o += "<td>&nbsp;</td>"
			}
			index++;
		}
		o += "</tr>";
	}
	
	o += "<tr align=\"center\">";
	o += "	  <td colspan=\"6\">" +
		 "		<lable width=\"50%\"><input name=\"submit_zhengrong\" type=\"button\" value=\"就整成这样吧\" align=\"center\" onclick=\"submitZhengRong(" + winName + ");\"/></lable>" +
		 "		<lable width=\"50%\"><input name=\"cancel_zhengrong\" type=\"button\" value=\"算了，我不想整容了\" align=\"center\" onclick=\"offOpenWin('" + winName + "');return false;\"/></lable>" +	
		 "	  </td>";
	o += "</tr>";
	
	o += "</table>";
	
	_openWin(winName,o);
}

//zuoqiInfos:zuoqiInfos[i][0]:在道具中的index，zuoqiInfos[i][1]:坐骑path
function showZuoQiList(winName,title, gaiPianIndex, zuoqiInfos) {
	var winObj=_getWin(winName);
	onOpenWin(winObj);
	with(winObj.style){
		width="200";
		height="10";
		if(p.eventY-13<0){
			top=1;
		}else{
			if(!top)
				top=p.eventY-13;
		}
		if(p.eventX-187<0){
			left=1;
		}else{
			left=Math.abs(p.eventX-187);
		}
		overflowY="";
		display='';
	}
	var o=fakeBr(2)+title+fakeBr(4);
	o += "<table width=\"100%\" height=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\">";
	
	for(var i = 0; i < zuoqiInfos.length; i ++) {
		o += "<tr align=\"left\">";
		o += "	<td><a href=\"#\" onclick=\"cmd('helptools " + zuoqiInfos[i][0] + " ')\"</a>" + zuoqiInfos[i][2] + "</td>";
		o += "	<td><a href=# onclick=\"cmd('use " + gaiPianIndex + " "  + zuoqiInfos[i][0] + " " + zuoqiInfos[i][1] + "');offOpenWin('" + winName + "');\" >选择</a></td>";
		o += "</tr>";
	}
	o += "</table>";
	
	_openWin(winName,o);
}

function showZuoQiSkills(winName,title, useindex, zuoqiInfos) {
	var winObj=_getWin(winName);
	onOpenWin(winObj);
	with(winObj.style){
		width="200";
		height="10";
		if(p.eventY-13<0){
			top=1;
		}else{
			if(!top)
				top=p.eventY-13;
		}
		if(p.eventX-187<0){
			left=1;
		}else{
			left=Math.abs(p.eventX-187);
		}
		overflowY="";
		display='';
	}
	var o=fakeBr(2)+title+fakeBr(4);
	o += "<table width=\"100%\" height=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\">";
	
	for(var i = 0; i < zuoqiInfos.length; i ++) {
		o += "<tr align=\"left\">";
		o += "	<td><a href=\"#\" onclick=\"cmd('helpskillsubs " + zuoqiInfos[i][3] + " ')\"</a>" + zuoqiInfos[i][3] + "</td>";
		o += "	<td><a href=# onclick=\"cmd('use " + useindex + " "  + zuoqiInfos[i][0] + " " + zuoqiInfos[i][1]+ " " + zuoqiInfos[i][3] + "');offOpenWin('" + winName + "');\" >抽取</a></td>";
		o += "</tr>";
	}
	o += "</table>";
	
	_openWin(winName,o);
}

function submitZhengRong(winName) {
	var rongmaos = document.getElementsByName("pet_image");
	var rongmao;
	for(var i = 0; i < rongmaos.length; i++) {
		rongmao = rongmaos[i];
		if(rongmao.checked) {
			break;
		}
	}
	
	if(!rongmao) {
		alert("请选择一个形象！");
		return false;
	}
	
	var lableElement = document.getElementById(rongmao.value);
	var text = lableElement.firstChild.nodeValue;
	if(!confirm("您确认整形为【" + text + "】吗？")) {
		return false;
	}
	
	cmd("petduihuan " + rongmao.value);
	offOpenWin("'" + winName + "'");
	return true;
}

function listTianJiShiEquips(tianJiShiIndex,tianJiShiName,equips) {
	var winObj=_getWin("listTianJiShiEquips");
	onOpenWin(winObj);
	with(winObj.style){
		width="200";
		height="10";
		if(p.eventY-13<0){
			top=1;
		}else{
			top=p.eventY-13;
		}
		if(p.eventX-200+13<0){
			left=1;
		}else{
			left=p.eventX-200+13;
		}
		overflowY="";
		display='';
	}
	var o=fakeBr(2)+"<font color=#006A6A>"+tianJiShiName+"</font>天赐属性"+fakeBr(4);
	for(var i=0;i<equips.length;i++){
		//equips: 装备index,装备名（带前缀名），装备名字
		var equipIndex = equips[i][0];
		var nameWithProfix = equips[i][1];
		var equipName = equips[i][2];
		o+="<a href=# onclick=\"cmd('helptools "+equipIndex+"');hideParentMenu();return false;\">"+equipName+"</a> "+"&nbsp;&nbsp;&nbsp;     <a href=# onclick=\"if(!confirm('你确定要改变戒指的隐藏属性吗？')) return false; cmd('use "+tianJiShiIndex+" "+equipIndex+" "+nameWithProfix+"');offOpenWin('listTianJiShiEquips');return false;\">天赐</a><br>";
	}
	
	_openWin("listTianJiShiEquips",o);
}

function showCanUseXueHongShiItem(arg,arg11,arg22,arr){
	//alert(arr);
	var winObj=_getWin("showCanUseXueHongShitem");
	onOpenWin(winObj);
	with(winObj.style){
		width="200";
		height="10";
		if(p.eventY-13<0){
			top=1;
		}else{
			top=p.eventY-13;
		}
		if(p.eventX-200+13<0){
			left=1;
		}else{
			left=p.eventX-200+13;
		}
		overflowY="";
		display='';
	}
	var o=fakeBr(2)+"请选择装备"+fakeBr(4);

	for(var i=0;i<arr.length;i++){
		o+="<a href=# onclick=\"cmd('helptools "+arr[i][1]+"');hideParentMenu();return false;\">"+arr[i][2]+"</a> "+"&nbsp;&nbsp;&nbsp;     <a href=# onclick=\"p.zhuangbeiJinJie('"+arg+"','"+arr[i][1]+"','"+arr[i][0]+"');return false;\">确定</a><br>";
	}
	_openWin("showCanUseXueHongShitem",o);
}

//显示神泪石
function showCanUseShenLeiShiItem(arg,arg11,arg22,arr){
	//alert(arr);
	var winObj=_getWin("showCanUseShenLeiShiItem");
	onOpenWin(winObj);
	with(winObj.style){
		width="200";
		height="10";
		if(p.eventY-13<0){
			top=1;
		}else{
			top=p.eventY-13;
		}
		if(p.eventX-200+13<0){
			left=1;
		}else{
			left=p.eventX-200+13;
		}
		overflowY="";
		display='';
	}
	var o=fakeBr(2)+"<font color=#006A6A>"+arg11+"</font>进阶的装备"+fakeBr(4);

	for(var i=0;i<arr.length;i++){
		o+="<a href=# onclick=\"cmd('helptools "+arr[i][1]+"');hideParentMenu();return false;\">"+arr[i][2]+"</a> "+"&nbsp;&nbsp;&nbsp;     <a href=# onclick=\"p.shenLeiShizhuangbeiJinJie('"+arg+"','"+arr[i][1]+"','"+arr[i][0]+"');return false;\">进阶</a><br>";
	}
	_openWin("showCanUseShenLeiShiItem",o);
}


function zhuangbeiJinJie(arg,itemidx,itemname){
	if(confirm('是否将【'+itemname+'】进阶提升？')){
		cmd("use "+arg+" "+itemidx+" "+itemname);
		offOpenWin('showCanUseXueHongShitem');
	}
	else{
		offOpenWin('showCanUseXueHongShitem');
	}
}

//神泪石进阶
function shenLeiShizhuangbeiJinJie(arg,itemidx,itemname){
	if(confirm('是否将【'+itemname+'】进阶提升？')){
		cmd("use "+arg+" "+itemidx+" "+itemname);
		offOpenWin('showCanUseShenLeiShiItem');
	}
	else{
		offOpenWin('showCanUseShenLeiShiItem');
	}
}



function showShengjiShiPinItem(arr){
	var winObj=_getWin("showShengjiShiPinItem");
	onOpenWin(winObj);
	with(winObj.style){
		width="200";
		height="10";
		if(p.eventY-13<0){
			top=100;
		}else{
			top=p.eventY-13;
		}
		if(p.eventX-200+13<0){
			
			left=100;
		}else{
			
			left=p.eventX-200+13;
		}
		overflowY="";
		display='';
	}
	var o=fakeBr(2)+"<font color=#006A6A>请选择需升级的饰品</font>"+fakeBr(4);
	for(var i=0;i<arr.length;i++){
		o+="<a href=# onclick=\"cmd('helptools "+arr[i][1]+"');hideParentMenu();return false;\">"+arr[i][2]+"</a> "+"&nbsp;&nbsp;&nbsp;     <a href=# onclick=\"cmd('showCanUpShipin shipin "+arr[i][1]+" "+arr[i][0]+"');offOpenWin('showShengjiShiPinItem');return false;\">升级</a><br>";
	}
	_openWin("showShengjiShiPinItem",o);
}

function showJingNengSuiPian(arr,index){
	var winObj=_getWin("showJingNengSuiPian");
	onOpenWin(winObj);
	with(winObj.style){
		width="200";
		height="10";
		if(p.eventY-13<0){
			top=100;
		}else{
			top=p.eventY-13;
		}
		if(p.eventX-200+13<0){
			
			left=100;
		}else{
			
			left=p.eventX-200+13;
		}
		overflowY="";
		display='';
	}
	var o=fakeBr(2)+"<font color=#006A6A>选择你要结合的晶能碎片：</font>"+fakeBr(4)+"<table>";
	for(var i=0;i<arr.length;i++){
		o+="<tr><td><a href=# onclick=\"cmd('helptools "+arr[i][1]+"');hideParentMenu();return false;\">"+arr[i][2]+"</a> "+"&nbsp;&nbsp;&nbsp;</td><td><a href=# onclick=\"if(confirm('将怪小孩发明和"+arr[i][0]+"结合成"+arr[i][3]+"，确定吗?')){cmd('use "+index+" "+arr[i][1]+" "+arr[i][0]+"');offOpenWin('showJingNengSuiPian');}return false;\">结合</a></td></tr>";
	}
	o+="</table>";
	_openWin("showJingNengSuiPian",o);
}

function showJNSP(arr,index){
	var winObj=_getWin("showJingNengSuiPian");
	onOpenWin(winObj);
	with(winObj.style){
		width="200";
		height="10";
		if(p.eventY-13<0){
			top=100;
		}else{
			top=p.eventY-13;
		}
		if(p.eventX-200+13<0){
			
			left=100;
		}else{
			
			left=p.eventX-200+13;
		}
		overflowY="";
		display='';
	}
	var o=fakeBr(2)+"<font color=#006A6A>选择你要结合的晶能碎片：</font>"+fakeBr(4)+"<table>";
	for(var i=0;i<arr.length;i++){
		o+="<tr><td><a href=# onclick=\"cmd('helptools "+arr[i][1]+"');hideParentMenu();return false;\">"+arr[i][2]+"</a> "+"&nbsp;&nbsp;&nbsp;</td><td><a href=# onclick=\"if(confirm('将晶能提炼器和"+arr[i][0]+"结合成"+arr[i][3]+"，确定吗?')){cmd('use "+index+" "+arr[i][1]+" "+arr[i][0]+"');offOpenWin('showJingNengSuiPian');}return false;\">结合</a></td></tr>";
	}
	o+="</table>";
	_openWin("showJingNengSuiPian",o);
}

function showSPJC(arr,index){
	var winObj=_getWin("showJingNengSuiPian");
	onOpenWin(winObj);
	with(winObj.style){
		width="200";
		height="10";
		if(p.eventY-13<0){
			top=100;
		}else{
			top=p.eventY-13;
		}
		if(p.eventX-200+13<0){
			
			left=100;
		}else{
			
			left=p.eventX-200+13;
		}
		overflowY="";
		display='';
	}
	var o=fakeBr(2)+"<font color=#006A6A>选择你要结合的饰品精粹：</font>"+fakeBr(4)+"<table>";
	for(var i=0;i<arr.length;i++){
		o+="<tr><td><a href=# onclick=\"cmd('helptools "+arr[i][1]+"');hideParentMenu();return false;\">"+arr[i][2]+"</a> "+"&nbsp;&nbsp;&nbsp;</td><td><a href=# onclick=\"if(confirm('将精粹搅拌机和"+arr[i][0]+"结合成混合型饰品精粹，确定吗?')){cmd('use "+index+" "+arr[i][1]+" "+arr[i][0]+"');offOpenWin('showJingNengSuiPian');}return false;\">结合</a></td></tr>";
	}
	o+="</table>";
	_openWin("showJingNengSuiPian",o);
}

function showUpShiPinItem(arr,index){
	var winObj=_getWin("showUpShiPinItem");
	onOpenWin(winObj);
	with(winObj.style){
		width="200";
		height="10";
		if(p.eventY-13<0){
			top=100;
		}else{
			top=p.eventY-13;
		}
		if(p.eventX-200+13<0){
			
			left=100;
		}else{
			
			left=p.eventX-200+13;
		}
		overflowY="";
		display='';
	}
	var o=fakeBr(2)+"<font color=#006A6A>选择你要升级的饰品：</font>"+fakeBr(4)+"<table>";
	for(var i=0;i<arr.length;i++){
		o+="<tr><td><a href=# onclick=\"cmd('helptools "+arr[i][1]+"');hideParentMenu();return false;\">"+arr[i][2]+"</a> "+"&nbsp;&nbsp;&nbsp;</td><td><a href=# onclick=\"if(confirm('将"+arr[i][0]+"升级为"+arr[i][3]+"，确定吗?')){cmd('use "+index+" "+arr[i][1]+" "+arr[i][0]+"');offOpenWin('showUpShiPinItem');}return false;\">升级</a></td></tr>";
	}
	o+="</table>";
	_openWin("showUpShiPinItem",o);
}

function showJiaXingShiPinItem(arr,index){
	var winObj=_getWin("showUpShiPinItem");
	onOpenWin(winObj);
	with(winObj.style){
		width="200";
		height="10";
		if(p.eventY-13<0){
			top=100;
		}else{
			top=p.eventY-13;
		}
		if(p.eventX-200+13<0){
			
			left=100;
		}else{
			
			left=p.eventX-200+13;
		}
		overflowY="";
		display='';
	}
	var o=fakeBr(2)+"<font color=#006A6A>选择你要升级的饰品：</font>"+fakeBr(4)+"<table>";
	for(var i=0;i<arr.length;i++){
		o+="<tr><td><a href=# onclick=\"cmd('helptools "+arr[i][1]+"');hideParentMenu();return false;\">"+arr[i][2]+"</a> "+"&nbsp;&nbsp;&nbsp;</td><td><a href=# onclick=\"if(confirm('将确定将"+arr[i][0]+"升级吗?')){cmd('use "+index+" "+arr[i][1]+" "+arr[i][0]+"');offOpenWin('showUpShiPinItem');}return false;\">升级</a></td></tr>";
	}
	o+="</table>";
	_openWin("showUpShiPinItem",o);
}

function showHuanShiPinItem(arr){
	var winObj=_getWin("showHuanShiPinItem");
	onOpenWin(winObj);
	with(winObj.style){
		width="200";
		height="10";
		if(p.eventY-13<0){
			top=100;
		}else{
			top=p.eventY-13;
		}
		if(p.eventX-200+13<0){
			
			left=100;
		}else{
			
			left=p.eventX-200+13;
		}
		overflowY="";
		display='';
	}
	var o=fakeBr(2)+"<font color=#006A6A>选择升级失灵的饰品：</font>"+fakeBr(4)+"<table>";
	for(var i=0;i<arr.length;i++){
		o+="<tr><td><a href=# onclick=\"cmd('helptools "+arr[i][1]+"');hideParentMenu();return false;\">"+arr[i][2]+"</a> "+"&nbsp;&nbsp;&nbsp;</td><td><a href=# onclick=\"if(confirm('确定要将"+arr[i][0]+"更换的吗？')){cmd('huanshipindo "+arr[i][1]+" "+arr[i][0]+"');offOpenWin('showHuanShiPinItem');}return false;\">兑换</a></td></tr>";
	}
	o+="</table>";
	_openWin("showHuanShiPinItem",o);
}

//守护灵喂食
function showCanWeiShiItem(arg,arg11,arg22,arr){
	//alert(arr);
	var winObj=_getWin("showCanWeiShiItem");
	onOpenWin(winObj);
	with(winObj.style){
		width="200";
		height="10";
		if(p.eventY-13<0){
			top=1;
		}else{
			top=p.eventY-13;
		}
		if(p.eventX-200+13<0){
			left=1;
		}else{
			left=p.eventX-200+13;
		}
		overflowY="";
		display='';
	}
	var o="<table width=160 style='z-index:99999999999'><tr><td colspan=2>"+fakeBr(2)+"可以喂给<font color=#006A6A>"+arg11+"</font>的食物:"+fakeBr(4)+"</td></tr>";
	if(arg22=='weishizuoqi'){
		for(var i=0;i<arr.length;i++){
			o+="<tr><td width=140 align=left>"
			o+="<a href=# onclick=\"cmd('helptools "+arr[i][1]+"');hideParentMenu();return false;\">"+arr[i][2]+"</a> </td><td align=center width=30><a href=# onclick=\"cmd('weishizuoqi "+arg+" "+arr[i][1]+" "+arr[i][0]+" "+arg22+"');offOpenWin('showCanWeiShiItem');return false;\">喂食</a></td></tr>";
		 
		}
	}else{
		for(var i=0;i<arr.length;i++){
			o+="<tr><td width=140 align=left>"
			o+="<a href=# onclick=\"cmd('helptools "+arr[i][1]+"');hideParentMenu();return false;\">"+arr[i][2]+"</a> </td><td align=center width=30><a href=# onclick=\"cmd('weishi "+arg+" "+arr[i][1]+" "+arr[i][0]+" "+arg22+"');offOpenWin('showCanWeiShiItem');return false;\">喂食</a></td></tr>";
		 
		}
	}
	o+="</table>";
	_openWin("showCanWeiShiItem",o);
}

//显示披风
function showPiFengItem(arr)
{
	var winObj=_getWin("showPiFengItem");
	onOpenWin(winObj);
		with(winObj.style){
		width="200";
		height="10";
		if(p.eventY-13<0){
			top=1;
		}else{
			top=p.eventY-13;
		}
		if(p.eventX-200+13<0){
			left=1;
		}else{
			left=p.eventX-200+13;
		}
		overflowY="";
		display='';
	}	
	
	var o="<table width=160 style='z-index:99999999999'><tr><td colspan=2>"+fakeBr(2)+"可以使用的披风"+fakeBr(4)+"</td></tr>";

	for(var i=0;i<arr.length;i++){
			o+="<tr><td width=140 align=left>"
			o+="<a href=# onclick=\"cmd('helptools "+arr[i][1]+"');hideParentMenu();return false;\">"+arr[i][2]+"</a> </td><td align=center width=30><a href=# onclick=\"cmd('use "+arr[i][3]+""+" "+arr[i][1]+"');offOpenWin('showPiFengItem');return false;\">使用</a></td></tr>";
		 
	}
	o+="</table>";	
	_openWin("showPiFengItem",o);

}



//显示可使用“雅典娜精华”道具的相关道具列表
function showYDNJHItem(arr)
{
	var winObj=_getWin("showYDNJHItem");
	onOpenWin(winObj);
		with(winObj.style){
		width="200";
		height="10";
		if(p.eventY-13<0){
			top=1;
		}else{
			top=p.eventY-13;
		}
		if(p.eventX-200+13<0){
			left=1;
		}else{
			left=p.eventX-200+13;
		}
		overflowY="";
		display='';
	}	
	
	var o="<table width=160 style='z-index:99999999999'><tr><td colspan=2>"+fakeBr(2)+"选择需要升级的装备"+fakeBr(4)+"</td></tr>";

	for(var i=0;i<arr.length;i++){
			o+="<tr><td width=140 align=left>"
			o+="<a href=# onclick=\"cmd('helptools "+arr[i][1]+"');hideParentMenu();return false;\">"+arr[i][2]+"</a> </td><td align=center width=30><a href=# onclick=\"cmd('use "+arr[i][3]+""+" "+arr[i][1]+" "+arr[i][0]+"');offOpenWin('showYDNJHItem');return false;\">确认</a></td></tr>";
		 
	}
	o+="</table>";	
	_openWin("showYDNJHItem",o);

}



//显示战斗力
function showZhanDouLi(isRefresh,petId,baoziImg,wuli,poli,zsp,skill,shl,other,total)
{
	var winObj=_getWin("showZhanDouLi");
	onOpenWin(winObj);
	with(winObj.style){		
		height="450";
	}
	
	var o="<br><table width='100%' height='95%' border='0' align='center' cellpadding='0' cellspacing='0' bgcolor='#BCBCBC' style='margin-top:3px;margin-right:5px;margin-bottom:5px;'><tr><td valign='top'>";	
		
	 o=o+"<table border='0' cellpadding='0' cellspacing='0' height='100%' width='100%' bgcolor='#BCBCBC'>"+
	// "<tr><td bgcolor='#E1E1E1' align='right' colspan='2'>"+
	// "<a style='cursor:move' title=按住我拖动
	// onmousedown=\"drags(_getWin('showZhanDouLi'));\"
	// onmouseup='dragapproved=false;'><img src=/img/button/w_2.gif></a>"+
   // "<a style='cursor:hand;' hidefocus=true
	// onclick=\"offOpenWin('showZhanDouLi');return false;\" title='点我隐藏'><img
	// src=/img/button/w_3.gif></nobr></a>"+
   // "</td></tr>"+
	
           // "<tr><td bgcolor='#E1E1E1' colspan='2'>"+
          // "<br>111"+
          // "</td></tr>"+
	  // "<tr bgcolor='#E1E1E1'><td bgcolor='#E1E1E1' align='right'
		// width='50%'></td><td bgcolor='#E1E1E1' align='left'
		// width='50%'></td></tr>"+
	 
	 
           "<tr><td bgcolor='#E1E1E1' align='right' width='50%'>"+
           "武&nbsp;&nbsp;&nbsp;&nbsp;力:</td><td bgcolor='#E1E1E1' align='left' width='50%'>"+wuli+
           "</td></tr>"+
           "<tr><td bgcolor='#E1E1E1' align='right'>"+
           "魄&nbsp;&nbsp;&nbsp;&nbsp;力:</td><td bgcolor='#E1E1E1' align='left' width='50%'>"+poli+
           "</td></tr>"+
           "<tr><td bgcolor='#E1E1E1' align='right'>"+
           "装饰品:</td><td bgcolor='#E1E1E1' align='left' width='50%'>"+zsp+           
           "</td></tr>"+
           "<tr><td bgcolor='#E1E1E1' align='right'>"+
           "技&nbsp;&nbsp;&nbsp;&nbsp;能:</td><td bgcolor='#E1E1E1' align='left' width='50%'>"+skill+
           "</td></tr>"+
           "<tr><td bgcolor='#E1E1E1' align='right'>"+
           "守护灵:</td><td bgcolor='#E1E1E1' align='left' width='50%'>"+shl+
           "</td></tr>"+
           "<tr><td bgcolor='#E1E1E1' align='right'>"+
           "其&nbsp;&nbsp;&nbsp;&nbsp;他:</td><td bgcolor='#E1E1E1' align='left' width='50%'>"+other+
           "</td></tr>"+
           "<tr><td bgcolor='#E1E1E1'colspan='2' >"+
           "<br>"+
           "</td></tr>"+
           "<tr><td bgcolor='#E1E1E1' style='font-size:20px' align='center' colspan='2'>"+
           "<font face='隶书'>总战斗力</font>"+
           "</td></tr>"+
           "<tr><td bgcolor='#E1E1E1' style='font-size:20px' align='center' colspan='2'>"+
           "<font color='red'><B>"+total+"</B></font>"+
           "</td></tr>"+
           "<tr><td bgcolor='#E1E1E1' colspan='2'>"+
           "<br>"+
           "</td></tr>";
	
	if(isRefresh=='y')
	{
	 o = o+ "<tr><td bgcolor='#E1E1E1' style='font-size:20px' align='center' colspan='2'>"+
           "<input type='button' value='刷新' onclick=\"cmd('zhandouli')\">"+
           "</td></tr>";
	}
	
	o=o+"<style type=\"text/css\">"+   
    ".grd { "+  
   // "border:0px solid #CECECE;"+
    "padding:50px;"+     
    "height:50px;"+     
    "width:147px;"+     
    "position:relative;"+    
    "}"+    
    ".grd span{"+    
    "background: url(/images/zhandoli.gif) no-repeat;"+   
    "position: absolute;"+    
    "width: 150px;"+    
    "height: 150px;"+    
    "top: 5px;"+    
    "left:14px;"+ 
   "}"+    
  "</style>  ";
	
		
	o = o+ "<tr><td bgcolor='#E1E1E1' style='font-size:20px' align='center' colspan='2'>"+
	          "<div class=\"grd\"><br><br>"+  
	          "<span></span>  "+  
	            "<img src=\""+baoziImg+"\" border=\"0\"/>"+  
	          "</div> "+ 
            "</td></tr>";	
	 o=o+   "</table>";	
	 
	 o=o+   "</td></tr></table>";	
	 
	_openWin("showZhanDouLi",o);
}

//刷新战斗力
function refreshZhanDouLi(petId,wuli,poli,zsp,skill,shl,other,total)
{
	offOpenWin('showZhanDouLi');
	showZhanDouLi(petId,wuli,poli,zsp,skill,shl,other,total);
}



function showCanUseYaoShuiItem(arg,arg11,arg22,arr){
	//alert(arr);
	var winObj=_getWin("showCanUseYaoShuiItem");
	onOpenWin(winObj);
	with(winObj.style){
		width="200";
		height="10";
		if(p.eventY-13<0){
			top=1;
		}else{
			top=p.eventY-13;
		}
		if(p.eventX-200+13<0){
			left=1;
		}else{
			left=p.eventX-200+13;
		}
		overflowY="";
		display='';
	}
	var o="<table style='z-index:99999999'>"+fakeBr(2)+"<font color=#006A6A>"+arg22+"</font>列表"+fakeBr(4);

	for(var i=0;i<arr.length;i++){
		o+="<img src="+arr[i][4]+">  <a href=# onclick=\"cmd('helptools "+arr[i][1]+"');hideParentMenu();return false;\">"+arr[i][2]+"Lv."+arr[i][3]+"</a> "+"&nbsp;&nbsp;&nbsp;     <a href=# onclick=\"cmd('use "+arg+" "+arr[i][1]+" "+arr[i][0]+"');offOpenWin('showCanUseYaoShuiItem');return false;\">[使用]</a><br>";
	}
	o+="</table>";
	_openWin("showCanUseYaoShuiItem",o);
}

function showAllSHLJ(title,cmd,button,arr){
	var winObj=_getWin("showAllSHLJ");
	onOpenWin(winObj);
	with(winObj.style){
		width="200";
		height="10";
		top="200";
		left="200";
		overflowY="";
		display='';
	}
	var o="<table style='z-index:99999999'>"+fakeBr(2)+"<font color=#006A6A>"+title+"</font>"+fakeBr(4);

	for(var i=0;i<arr.length;i++){
		o+="<img src="+arr[i][4]+">  <a href=# onclick=\"cmd('helptools "+arr[i][1]
			+"');hideParentMenu();return false;\">"+arr[i][2]+"Lv."+arr[i][3]+"</a> "
			+"&nbsp;&nbsp;&nbsp;     <a href=# onclick=\"cmd('"+cmd+" "
			+arr[i][0]+"');offOpenWin('showAllSHLJ');return false;\">["+button+"]</a><br>";
	}
	o+="</table>";
	_openWin("showAllSHLJ",o);
}

function showCanUseRepairItem(arg,arg11,arg22,arr){
	//alert(arr);
	var winObj=_getWin("showCanUseRepairItem");
	onOpenWin(winObj);
	with(winObj.style){
		width="200";
		height="10";
		if(p.eventY-13<0){
			top=1;
		}else{
			top=p.eventY-13;
		}
		if(p.eventX-200+13<0){
			left=1;
		}else{
			left=p.eventX-200+13;
		}
		overflowY="";
		display='';
	}
	var o=fakeBr(2)+"<font color=#006A6A>"+arg11+"</font>修复的装备"+fakeBr(4);

	for(var i=0;i<arr.length;i++){
		o+="<a href=# onclick=\"cmd('helptools "+arr[i][1]+"');hideParentMenu();return false;\">"+arr[i][2]+"</a> "+"&nbsp;&nbsp;&nbsp;     <a href=# onclick=\"cmd('use "+arg+" "+arr[i][1]+" "+arr[i][0]+"');offOpenWin('showCanUseRepairItem');return false;\">修复</a><br>";
	}
	_openWin("showCanUseRepairItem",o);
}

function showCanUseUpgradeStoneItem(arg,arr){
	//alert(arr);
	var winObj=_getWin("selItemCanUseUpgradeStone");
	onOpenWin(winObj);
	with(winObj.style){
		width="200";
		height="10";
		if(p.eventY-13<0){
			top=1;
		}else{
			top=p.eventY-13;
		}
		if(p.eventX-200+13<0){
			left=1;
		}else{
			left=p.eventX-200+13;
		}
		overflowY="";
		display='';
	}
	var o=fakeBr(2)+"<font color=#006A6A>选择用升级石锻造的武器道具</font>"+fakeBr(4);

	for(var i=0;i<arr.length;i++){
		o+="<a href=# onclick=\"cmd('helptools "+arr[i][1]+"');hideParentMenu();return false;\">"+arr[i][2]+"</a> "+"&nbsp;&nbsp;&nbsp;     <a href=# onclick=\"cmd('use "+arg+" "+arr[i][1]+" "+arr[i][0]+"');offOpenWin('selItemCanUseUpgradeStone');return false;\">使用升级石</a><br>";
	}
	_openWin("selItemCanUseUpgradeStone",o);
}

function showCanUseJiNengQiangHuaJi(arg,arr){
	//alert(arr);
	var winObj=_getWin("showCanUseJiNengQiangHuaJi");
	onOpenWin(winObj);
	with(winObj.style){
		width="200";
		height="10";
		if(p.eventY-13<0){
			top=1;
		}else{
			top=p.eventY-13;
		}
		if(p.eventX-200+13<0){
			left=1;
		}else{
			left=p.eventX-200+13;
		}
		overflowY="";
		display='';
	}
	var o=fakeBr(2)+"<font color=#006A6A>选择用护符强化剂的道具</font>"+fakeBr(4);

	for(var i=0;i<arr.length;i++){
		o+="<a href=# onclick=\"cmd('helptools "+arr[i][1]+"');hideParentMenu();return false;\">"+arr[i][2]+"</a> "+"&nbsp;&nbsp;&nbsp;     <a href=# onclick=\"cmd('use "+arg+" "+arr[i][1]+" "+arr[i][0]+"');offOpenWin('showCanUseJiNengQiangHuaJi');return false;\">强化</a><br>";
	}
	_openWin("showCanUseJiNengQiangHuaJi",o);
}


function showCanUseSkillBook(arg,arr){
	//alert(arr);
	var winObj=_getWin("selCanUseSkillBook");
	onOpenWin(winObj);
	with(winObj.style){
		width="200";
		height="10";
		if(p.eventY-13<0){
			top=1;
		}else{
			top=p.eventY-13;
		}
		if(p.eventX-200+13<0){
			left=1;
		}else{
			left=p.eventX-200+13;
		}
		overflowY="";
		display='';
	}
	var o=fakeBr(2)+"<font color=#006A6A>选择需要增加经验的技能</font>"+fakeBr(4);
	var itemname = "技能经验书";
	if(arguments[2]){
		itemname=arguments[2];
	}
	
	for(var i=0;i<arr.length;i++){
		o+=""+arr[i][2]+" &nbsp;&nbsp;&nbsp;     <a href=# onclick=\"cmd('use "+arg+" "+arr[i][1]+" "+arr[i][0]+"');offOpenWin('selCanUseSkillBook');return false;\">使用"+itemname+"</a><br>";
	}
	_openWin("selCanUseSkillBook",o);
}

function showCanUsedItemList(arg,arg11,arg22,arr){
	//alert(arr);
	var winObj=_getWin("showCanUsedItemList");
	onOpenWin(winObj);
	with(winObj.style){
		width="200";
		height="10";
		if(p.eventY-13<0){
			top=1;
		}else{
			top=p.eventY-13;
		}
		if(p.eventX-200+13<0){
			left=1;
		}else{
			left=p.eventX-200+13;
		}
		overflowY="";
		display='';
	}
	var o=fakeBr(2)+"<font color=#006A6A>"+arg11+"</font>可以"+arg22+"的列表"+fakeBr(4);

	for(var i=0;i<arr.length;i++){
		o+="<a href=# onclick=\"cmd('helptools "+arr[i][1]+"');hideParentMenu();return false;\">"+arr[i][2]+"</a> "+"&nbsp;&nbsp;&nbsp;     <a href=# onclick=\"cmd('use "+arg+" "+arr[i][1]+" "+arr[i][0]+"');offOpenWin('showCanUsedItemList');return false;\">"+arg22+"</a><br>";
	}
	_openWin("showCanUsedItemList",o);
}
/**
*带名称验证的道具选择框
*/
function canBUsedList(cmdname,arg,panname,selname,arr,bneedinput){
	var winObj=_getWin("canBUsedList");
	onOpenWin(winObj);
	with(winObj.style){
		width="200";
		height="10";
		if(p.eventY-13<0){
			top=1;
		}else{
			top=p.eventY-13;
		}
		if(p.eventX-200+13<0){
			left=1;
		}else{
			left=p.eventX-200+13;
		}
		overflowY="";
		display='';
	}
	var o=fakeBr(2)+"<font color=#006A6A>"+panname+"</font>"+fakeBr(4);
	if(bneedinput){
		for(var i=0;i<arr.length;i++){
			o+="<a href=# onclick=\"cmd('helptools "+arr[i][1]+"');hideParentMenu();return false;\">"
			+arr[i][2]+"</a> "+"&nbsp <input id='usebsnum"+i+"' value='1' "
			+"style='ime-mode:disabled' onkeydown='if(event.keyCode==13)event.keyCode=9'"
			+" onKeyPress='if((event.keyCode<48||event.keyCode>57))event.returnValue=false' size='3'"
			+" type='text'/>&nbsp &nbsp <a href=# onclick=\"getCmdWithInput('"+cmdname+"','"+arg+"','"+arr[i][1]+"','"+arr[i][0]+"','"+arr[i][3]+"','usebsnum"+i+"');offOpenWin('canBUsedList');return false;\">"+selname+"</a><br>";
		}
	}
	else{
		for(var i=0;i<arr.length;i++){
			o+="<a href=# onclick=\"cmd('helptools "+arr[i][1]+"');hideParentMenu();return false;\">"
			+arr[i][2]+"</a> "+"&nbsp;&nbsp;&nbsp;     <a href=# onclick=\"cmd('"+cmdname+" "+arg+" "
			+arr[i][1]+" "+arr[i][0]+" "+arr[i][3]+"');offOpenWin('canBUsedList');return false;\">"+selname+"</a><br>";
		}
	}
	_openWin("canBUsedList",o);
}

function getCmdWithInput(cmdname,arg,arg1,arg2,arg3,eid){
	cmd(cmdname+" "+arg+" "+arg1+" "+arg2+" "+arg3+" "+document.getElementById(eid).value);
}

function showCanUseMetalOfGodItem(arg,arr){
	//alert(arr);
	var winObj=_getWin("selItemCanUseMetalOfGod");
	onOpenWin(winObj);
	with(winObj.style){
		width="200";
		height="10";
		if(p.eventY-13<0){
			top=1;
		}else{
			top=p.eventY-13;
		}
		if(p.eventX-200+13<0){
			left=1;
		}else{
			left=p.eventX-200+13;
		}
		overflowY="";
		display='';
	}
	var o=fakeBr(2)+"<font color=#006A6A>选择用完璧宝玉保持升级石效果的武器道具</font>"+fakeBr(4);

	for(var i=0;i<arr.length;i++){
		o+="<a href=# onclick=\"cmd('helptools "+arr[i][1]+"');hideParentMenu();return false;\">"+arr[i][2]+"</a> "+"&nbsp;&nbsp;&nbsp;     <a href=# onclick=\"cmd('use "+arg+" "+arr[i][1]+" "+arr[i][0]+"');offOpenWin('selItemCanUseMetalOfGod');return false;\">使用完璧宝玉</a><br>";
	}
	_openWin("selItemCanUseMetalOfGod",o);
}
function jiandingwupin(arg,arr){
	//alert(arr);
	var winObj=_getWin("jianding");
	onOpenWin(winObj);
	with(winObj.style){
		width="200";
		height="10";
		if(p.eventY-13<0){
			top=1;
		}else{
			top=p.eventY-13;
		}
		if(p.eventX-200+13<0){
			left=1;
		}else{
			left=p.eventX-200+13;
		}
		overflowY="";
		display='';
	}
	var o=fakeBr(2)+"<font color=#006A6A>选择需要鉴定的道具</font>"+fakeBr(4);
	for(var i=0;i<arr.length;i++){
		o+="<a href=# onclick=\"cmd('use "+arg+" "+arr[i][1]+" "+arr[i][0]+"');offOpenWin('jianding');return false;\">"+arr[i][0]+"</a><br>";
	}
	_openWin("jianding",o);
}

///flashTitle// //////////////////
var nowTitle=null;
var step=1;
function flashTitle(b)
{
	if(nowTitle==null){
		try{nowTitle=top.document.title;}catch(x){}
	}
	if(b){
		if(step==0){
			step==1;
		}else{
			if(nowTitle!=null){
				step++
				if (step==3) {step=1;}
				if (step==1) {try{top.document.title='◆ '+nowTitle+' ◆';}catch(x){}}
				if (step==2) {try{top.document.title='◇ '+nowTitle+' ◇';}catch(x){}}
				setTimeout("flashTitle("+b+")",400);
			}
		}
	}else{
		try{top.document.title=nowTitle;}catch(x){}
		step=0;
	}
}
///////////////////////
function setNewMessage(b){
	var obj=getObj("newMessageImg");
	if(b){
		obj.src="img/pmes.gif";
		obj.style.display="";
		flashTitle(true);
	}else{
		obj.style.display="none";
		flashTitle(false);
	}
}
function getNow(){
	return new Date().getTime();
}
function getObj(objId){
	return document.getElementById(objId);
}
function hasObj(objId){
	return document.getElementById(objId)!=null;
}

function startBr(){
	if(confirm(""
	+"　　　　　　　　　　　　　　　　　　　　　　\n"
	+"进入大逃杀游戏后,会给你一个大逃杀专用宠物\n\n"
	+"尽快的杀一些你可以搞得定的怪物来升级吧!\n\n"
	+"这样才有更多生存下来的机率哦!\n\n"
	+"\n请问你是否都明白了?")){
		cmd('checkBr');
	}
}

function startMi(){
	if(confirm(""
	+"　　　　　　　　　　　　　　　　　　　　　　\n"
	+"进入魔物入侵游戏?")){
		cmd('checkMi');
	}
}

//:袋子:start
function selGetItems(selfIndex,bagid,pwd,arr){
	//alert(arr);
	var winObj=_getWin("selInnerItems");
	onOpenWin(winObj);
	with(winObj.style){
		width="200";
		height="10";
		if(p.eventY-13<0){
			top=1;
		}else{
			top=p.eventY-13;
		}
		if(p.eventX-200+13<0){
			left=1;
		}else{
			left=p.eventX-200+13;
		}
		overflowY="";
		display='';
	}
	var o=fakeBr(2)+"<font color=#006A6A>选择要取出的道具</font>"+fakeBr(4);
	if(arr.length>0){
		o+="<a href=# onclick=\"cmd('use "+selfIndex+" getAll "+pwd+"');offOpenWin('selInnerItems');return false;\">[全部取出]</a>";
	}
	o+="<table border=0>";
	for(var i=0;i<arr.length;i++){
		var inputStr="要拿出多少["+arr[i][0]+"](最多"+arr[i][0]+")?";
		o+="<tr><td><a href=# onclick=\"cmd('helptools bag "+bagid+" "+i+"');return false;\"><font color="+arr[i][3]+">"+arr[i][0]+"</font></a> x "+arr[i][2]+"</td><td><a href=# onclick=\"var getNum=_selGetItemsGetNum('"+arr[i][0]+"','"+arr[i][2]+"');cmd('use "+selfIndex+" get "+arr[i][0]+" "+arr[i][1]+" '+getNum+' "+pwd+"');return false;\">[取出]</a></td></tr>";
	}
	o+="</table>";
	
	_openWin("selInnerItems",o);
}

function selInnerItems(selfIndex,arr){
	//alert(arr);
	var winObj=_getWin("selInnerItems");
	onOpenWin(winObj);
	with(winObj.style){
		width="200";
		height="10";
		if(p.eventY-13<0){
			top=1;
		}else{
			top=p.eventY-13;
		}
		if(p.eventX-200+13<0){
			left=1;
		}else{
			left=p.eventX-200+13;
		}
		overflowY="";
		display='';
	}
	var o=fakeBr(2)+"<font color=#006A6A>选择要放入的道具</font>"+fakeBr(4);

	for(var i=0;i<arr.length;i++){
		var inputStr="要把多少["+arr[i][0]+"]放入(最多"+arr[i][0]+")?";
		o+="<a href=# onclick=\"var getNum=_selInnerItemsGetNum('"+arr[i][0]+"','"+arr[i][2]+"');cmd('use "+selfIndex+" "+arr[i][0]+" "+arr[i][1]+" '+getNum);offOpenWin('selInnerItems');return false;\"><font color="+arr[i][3]+">"+arr[i][0]+"</font></a> ["+arr[i][2]+"]<br>";
	}
	_openWin("selInnerItems",o);
}
function _selGetItemsGetNum(name,maxNum){
	var input=prompt("要取出多少["+name+"](最多"+maxNum+")?","全部");
	if(input!=null){
		input=parseInt(input);
		if(input<maxNum&&input>0){
			offOpenWin('selInnerItems');
			return input;
		}
		offOpenWin('selInnerItems');
		return maxNum;
	}
}
function _selInnerItemsGetNum(name,maxNum){
	var input=prompt("要把多少["+name+"]放入(最多"+maxNum+")?","全部");
	if(input!=null){
		input=parseInt(input);
		if(input<maxNum&&input>0){
			return input;
		}
		return maxNum;
	}
}


function _setAliansToBag(bagIndex){
	var inputStr=prompt("请输入新的名称（最多四个字，必须为中文字符）","");
	if (inputStr!=null){
		cmd("use "+bagIndex+" "+inputStr+" setAlians");
	}
}

function _setAliansToEquipBag(bagIndex){
	var inputStr=prompt("请输入新的名称（最多7个字，必须为中文字符）","");
	if (inputStr!=null){
		cmd("use "+bagIndex+" "+inputStr+" _setAliansToEquipBag");
	}
}


//_give("+index+","+canAmount+",getObj('giveToShowUser').innerHTML,getObj('giveItemNumInput').innerHTML);
function _giveTo(iIndex,canAmount,toUser,num){
	/*
	alert(iIndex);
	alert(canAmount);
	alert(toUser);
	alert(num);
	*/
	if(toUser==null||toUser==""){
		alert("转让对象不能为空!");
		return false;
	}

	if(canAmount&&(num==null||num==""||!checkInt(num)||num<1)){
		alert("请输入正确的转让数量!");
		return false;
	}else{
		cmd("give "+iIndex+" "+num+" "+toUser);
		offOpenWin("giveToWin");
	}
}
function giveTo(itemName,index,canAmount,pic,npcList,playerList){ //将itemName转让给当前场景的生物
	var winObj=_getWin("giveToWin");
	onOpenWin(winObj);
	with(winObj.style){
		width="210";
		height="10";
		if(p.eventY<0){
			top=1;
		}else{
			top=p.eventY;
		}
		if(p.eventX-210<0){
			left=1;
		}else{
			left=p.eventX-210;
		}
		overflowY="";
		display='';
	}

	var o="<div style='padding-top:2px;'>"
	+"<img src="+pic+"> <b>"+itemName+"</b><br>"
	// +"<div
	// style='margin-top:6px;margin-bottom:3px;'>"+(canAmount?"转让&nbsp;<input
	// value=1 onkeydown='event.cancelBubble=true;' type=text
	// id=giveItemNumInput style='border:0px;border-bottom:solid black
	// 1px;color:red;font-size:11px;font-family:arial;width:48px;background-color:#EEEEEE;'>
	// 个给:":"<input type=hidden id=giveItemNumInput value=1>转让给:")+" <span
	// id=giveToShowUser style='color:red;margin-right:5px'></span><a href=#
	// onclick=\"_giveTo("+index+","+canAmount+",getObj('giveToShowUser').innerHTML,getObj('giveItemNumInput').value);return
	// false;\">[确定]</a></div>"
	+"<div style='margin-top:6px;margin-bottom:3px;'>"+(canAmount?"转让&nbsp;<input value=1 onkeydown='event.cancelBubble=true;' type=text id=giveItemNumInput style='border:0px;border-bottom:solid black 1px;color:red;font-size:11px;font-family:arial;width:26px;background-color:#EEEEEE;' maxlength=4> 个给:":"<input type=hidden id=giveItemNumInput value=1>转让给:")+" <span id=giveToShowUser style='color:red;margin-right:5px'></span><a href=# onclick=\"_giveTo("+index+","+canAmount+",getObj('giveToShowUser').innerHTML,getObj('giveItemNumInput').value);return false;\"  id=giveBar style=\"display:none;\">[确定]</a></div>"
	
	+"<div style='margin-left:10px;'>"
	;
	for(var i=0;i<playerList.length;i++){
		o+="<a href=# onclick=\"getObj('giveToShowUser').innerHTML='"+playerList[i]+"';\">"+playerList[i]+"</a><br>";
	}

	o+="</div>"
	// +(npcList.length>0?"<div
	// style='margin-top:6px;margin-bottom:3px;'>非玩家:</div><div
	// style='margin-left:10px;'>":"")
	+(npcList.length>0?"<div style='margin-left:10px;margin-top:5px;'>":"")// <div
																			// style='margin-top:6px;margin-bottom:3px;'>非玩家:</div>
	;

	for(var i=0;i<npcList.length;i++){
		//o+="<a href=# onclick=\"getObj('giveToShowUser').innerHTML='"+npcList[i]+"';\">"+npcList[i]+"</a><br>";
		o+="<a href=# onclick=\"getObj('giveToShowUser').innerHTML='"+npcList[i]+"';getObj('giveBar').style.display='';\">"+npcList[i]+"</a><br>";
	}

	o+="</div>"
	+"</div>"
	+fakeBr(10);
	_openWin("giveToWin",o);
}

function selInnerOrGet(needPwd,inputPwd,index,changeName,canPutin,canGet,changePos){//index=bag索引值 changeName=此容器是否可以改名 canPutin目前是否可以放入东西 canGet 目前是否可以取出东西
	var winObj=_getWin("selInnerOrGet");
	onOpenWin(winObj);
	with(winObj.style){
		width="210";
		height="10";

		if(changePos){
			if(p.eventY-13<0){
				top=1;
			}else{
				top=p.eventY-25;
			}
			if(p.eventX-210+103<0){
				left=1;
			}else{
				left=p.eventX-210+110;
			}
		}
		overflowY="";
		display='';
	}
	var o="<div style='padding-top:10px;'>";

	if(needPwd){
		o+="&nbsp;&nbsp;请输入密码: <input type=password size=8 class=smallFont id=lockPwd> <a href=# onclick=\"if(getObj('lockPwd').value!=null&&getObj('lockPwd').value!=''&&getObj('lockPwd').value.trim()!=''){cmd('use "+index+" '+getObj('lockPwd').value);}return false;\">[确定]</a>";
	}else{
		o+=""
		+(canPutin?"&nbsp;&nbsp;&nbsp;&nbsp;<a href=# onclick=\"cmd('use "+index+" putin "+inputPwd+"');offOpenWin('selInnerOrGet');return false;\">放入道具</a>":"")
		+(canGet?"&nbsp;&nbsp;&nbsp;&nbsp;<a href=# onclick=\"cmd('use "+index+" get "+inputPwd+"');offOpenWin('selInnerOrGet');return false;\">取出道具</a>":"")
		+(changeName?"&nbsp;&nbsp;&nbsp;&nbsp;<a href=# onclick=\"_setAliansToBag("+index+");offOpenWin('selInnerOrGet');return false;\">重命名</a>":"")
		;
	}
	
	o+="</div>"
	+fakeBr(10);
	_openWin("selInnerOrGet",o);
}
//:袋子:end

function who(){
	window.open('online.jsp;jsessionid='+sessionId,'','menubar=no,toolbar=no,location=no,directories=no,status=no,width=350,height=410,left='+(p.event.screenX-360)+',top='+p.event.screenY+',scrollbars=yes');
}

function showTask(taskAry){
	onOpenWin(_getWin("taskWin"));
	
	var o="<table height=15 width='1' align=right cellpadding='0' cellspacing='0'><tr><td><nobr>";
	o+="<font align='right' style='cursor:hand' onclick=\"cmd('showTask');\" title=点我刷新><img src=/img/button/w_1.gif></font>&nbsp;</td></tr></table>";
	
	o+="<table height=2 cellpadding='0' cellspacing='0'><tr><td></td></tr></table>";
	o+="<font color=red>当前任务列表</font> <a href=# onclick='getTask(\"showCanBeginTask\");return false;'>可接任务</a>";
	o+="<hr size=1 width='98%' align=left>";
	
	if (taskAry!=null && taskAry.length>0){
		var posTags=[];
		for (var i=0; i<taskAry.length; i++){
			has=false;
			for(var t=0;t<posTags.length;t++){
				if(posTags[t]==taskAry[i][0]){
					has=true;
				}
			}
			if(!has){
				posTags[posTags.length]=taskAry[i][0];
			}
		}
		for(var t=0;t<posTags.length;t++){
			o+="<table cellpadding='0' cellspacing='0' "+(t!=0?"style='margin-top:7px;'":"")+"><tr><td valign=top style='padding-top:2px;'><img src=/img/t2.gif></td><td width=4></td><td><b><font color=#002146>"+posTags[t]+"</font></b></td></tr></table>";
			o+="<table width=200 cellpadding='2' cellspacing='2' style='margin-left:15px;margin-top:1px;'>";
			for (var i=0; i<taskAry.length; i++){
				if(taskAry[i][0]==posTags[t]){
					o+="<tr bgcolor=#E5E5E5>"
					+"<td><font color=#316832><a href='#' onclick='p._showTaskInfo(\""+taskAry[i][2]+"\","+taskAry[i][3]+"); p.cmd(\"showTaskInfo "+taskAry[i][2]+"\"); return false;'><font color='"+taskAry[i][4]+"'>"+taskAry[i][1]+"</font></a>"+taskAry[i][5]+"</font></td>"
					+"</tr>"
					;
				}
			}
			o+="</table>";
		}
	}else{
		o+="<font color=#616161>当前没有任何任务</font>";
	}

	//o+="<tr><td  width=1 style='padding-left:5px;padding-right:10px;'><nobr><font color=#153A64>盖亚之城</font></font></nobr></td><td><font color=#316832>小花的忧伤</font></td></tr>";
	// o+="<tr bgcolor=#E1E1E1><td width=1
	// style='padding-left:5px;padding-right:10px;'><nobr><font
	// color=#153A64>猫隐村</font></nobr></td><td><font
	// color=#316832>小花的忧伤</font></td></tr>";
	
	_openWin("taskWin",o);
}

function getTask(cmdstr){
	cmd(cmdstr);
}

function showCanBeginTask(taskAry){
	onOpenWin(_getWin("taskWin"));
	
	var o="<table height=15 width='1' align=right cellpadding='0' cellspacing='0'><tr><td><nobr>";
	o+="<font align='right' style='cursor:hand' onclick=\"cmd('showCanBeginTask');\" title=点我刷新><img src=/img/button/w_1.gif></font>&nbsp;</td></tr></table>";
	
	o+="<table height=2 cellpadding='0' cellspacing='0'><tr><td></td></tr></table>";
	o+="<a href=# onclick='getTask(\"showTask\");return false;'>当前任务列表</a> <font color=red>可接任务</font>";
	o+="<hr size=1 width='98%' align=left>";

	if (taskAry!=null && taskAry.length>0){
		o+="<table width=200 cellpadding='2' cellspacing='2' style='margin-left:2px;margin-top:1px;'>";
		for (var i=0; i<taskAry.length; i++){
			o+="<tr bgcolor=#E5E5E5>"
			+"<td><font color=#316832><a href='#' onclick='p._showCanBeginTaskInfo(\""+taskAry[i][1]+"\",\""+taskAry[i][2]+"\"); return false;'><font color='"+taskAry[i][3]+"'> "+taskAry[i][0]+taskAry[i][1]+"</font></a></font></td>"
			+"</tr>"
			;
			
		}
		o+="</table>";
	}else{
		o+="<font color=#616161>当前没有可接任务</font>";
	}
	_openWin("taskWin",o);
}

function _showCanBeginTaskInfo(taskName,taskDesc){
	var winObj=_getWin("taskInfoWin");
	onOpenWin(winObj);
	
	var o=fakeBr(4)+"<font color=green><b>"+taskName+"</b></font><br>";
	o+=taskDesc;
	
	with(winObj.style){
		try{
			top=petWin.event.y+petWin.document.body.scrollTop+91-13;
			left=petWin.event.x+petWin.document.body.scrollLeft+26-138;
		}catch(x){
			top=event.y+petWin.document.body.scrollTop-13;
			left=event.x+petWin.document.body.scrollLeft-138;
		}
		width="200";
		height="80";
		overflowY="";
		display='';
	}
	
	_openWin("taskInfoWin",o);
}

/*
function showOldTask(){
	window.open('OldTask.jsp','','menubar=no,toolbar=no,location=no,directories=no,status=no,width=350,height=410,left='+(p.event.screenX-360)+',top='+p.event.screenY+',scrollbars=yes');
}
*/
function openBlindWin(){
	window.open('blind/blindlist.jsp;jsessionid='+sessionId,'','menubar=no,toolbar=no,location=no,directories=no,status=no,width=350,height=410,left='+(p.event.screenX-360)+',top='+p.event.screenY+',scrollbars=yes');
}

function _showTaskInfo(taskName,fangqi){
	var winObj=_getWin("taskInfoWin");
	onOpenWin(winObj);
	var o=fakeBr(4)+"<div id=showTaskInfoDiv></div>"
	+"<div id=showTaskInfoDiv1></div>"
		+"<div align=right style='margin-top:5px'><span id=taskinfospan></span>&nbsp;&nbsp;&nbsp;"
	+(fangqi==true?"<a href='#' onclick='if (confirm(\""+((taskName=="pettask.ring.ReXinZhuRen")?"你的连续完成次数将会清空，":"")+"你确认要放弃此任务吗？\")) {p.offOpenWin(\"taskInfoWin\");p.cmd(\"showTask "+taskName+" giveup\");} return false;' >放弃任务</a>":"")
	+"</div>";
	with(winObj.style){
		try{
			top=petWin.event.y+petWin.document.body.scrollTop+91-13;
			left=petWin.event.x+petWin.document.body.scrollLeft+26-138;
		}catch(x){
			top=event.y+petWin.document.body.scrollTop-13;
			left=event.x+petWin.document.body.scrollLeft-138;
		}
		width="200";
		height="80";
		overflowY="";
		display='';
	}
	cmd('showTask '+taskName);
	_openWin("taskInfoWin",o);
}
function _showTaskInfoDetail1(taskName,descDetail){	
	try{
	document.getElementById("taskinfospan").innerHTML="<a href='#' onclick='_closeTaskInfoDetail(\""+taskName+"\");return false;' >返回</a>";
	document.getElementById("showTaskInfoDiv1").innerHTML=descDetail;
	}catch(err){}
}
function _closeTaskInfoDetail(taskName){
	try{
	document.getElementById("showTaskInfoDiv1").innerHTML = ''; 
	document.getElementById("taskinfospan").innerHTML = "<a href='#' onclick='p.cmd(\"showTaskInfo "+taskName+"\"); return false;' >任务描述</a>";	
	}catch(err){};
}
function _showTaskInfoDetail(descDetail){
	document.getElementById("showTaskInfoDiv").innerHTML=descDetail;
}

function showKuaiDi(a){//猫扑快递公司
	var pBoxLeft=300;
	var pBoxTop=150;
	var pBoxWidth=410;
	var pBoxHeight=350;
	var urlA;
	var curDate=new Date();
	if(a==1){

		urlA="postoffice/kuaidi.jsp;jsessionid="+sessionId+"?"+curDate;
	}else if(a==2){
		urlA="postoffice/kuaidi.jsp;jsessionid="+sessionId+"?action=postPackage&"+curDate;
	}
	window.open(urlA,'','menubar=no,toolbar=no,location=no,directories=no,status=no,width='+pBoxHeight+',height='+pBoxWidth+',left='+pBoxLeft+',top='+pBoxTop+',scrollbars=yes');
}

function showReceive(){//接受道具
	var pBoxLeft=300;
	var pBoxTop=150;
	var pBoxWidth=410;
	var pBoxHeight=350;
	var urlA;
	var curDate=new Date();
	urlA="receiveitem/receive.jsp;jsessionid="+sessionId+"?"+curDate;
	window.open(urlA,'','menubar=no,toolbar=no,location=no,directories=no,status=no,width='+pBoxHeight+',height='+pBoxWidth+',left='+pBoxLeft+',top='+pBoxTop+',scrollbars=yes');
}
function showSchoolInvest(){//接受学校调查
	var pBoxLeft=300;
	var pBoxTop=150;
	var pBoxWidth=650;
	var pBoxHeight=420;
	var urlA;
	var curDate=new Date();
	urlA="xuexiao/schoolInput.jsp;jsessionid="+sessionId+"?"+curDate;
	window.open(urlA,'','menubar=no,toolbar=no,location=no,directories=no,status=no,width='+pBoxWidth+',height='+pBoxHeight+',left='+pBoxLeft+',top='+pBoxTop+',scrollbars=yes');
}
function showInvest(){//接受道具
	var pBoxLeft=300;
	var pBoxTop=150;
	var pBoxWidth=510;
	var pBoxHeight=500;
	var urlA;
	var curDate=new Date();
	urlA="diaocha/receive.jsp;jsessionid="+sessionId+"?"+curDate;
	window.open(urlA,'','menubar=no,toolbar=no,location=no,directories=no,status=no,width='+pBoxWidth+',height='+pBoxHeight+',left='+pBoxLeft+',top='+pBoxTop+',scrollbars=yes');
}

function showShopIndex(){// 打开宝库首页
	var pBoxLeft=350;
	var pBoxTop=150;
	var pBoxWidth=450;
	var pBoxHeight=300;
	var urlA;
	var curDate=new Date();
	urlA="shop/index.jsp;jsessionid="+sessionId+"?"+curDate;
	window.open(urlA,'','menubar=yes,toolbar=yes,location=yes,directories=yes,status=yes,width='+pBoxWidth+',height='+pBoxHeight+',left='+pBoxLeft+',top='+pBoxTop+',scrollbars=yes,resizable=yes');
}

function showMaoYanIndex(){// 打开猫眼专区链接
	var pBoxLeft=350;
	var pBoxTop=150;
	var pBoxWidth=450;
	var pBoxHeight=300;
	var urlA;
	var curDate=new Date();
	urlA="shop/index.jsp?show=9";
	window.open(urlA,'','menubar=yes,toolbar=yes,location=yes,directories=yes,status=yes,width='+pBoxWidth+',height='+pBoxHeight+',left='+pBoxLeft+',top='+pBoxTop+',scrollbars=yes,resizable=yes');
}

function showMaoZhuaIndex(){// 打开猫爪专区链接
	var pBoxLeft=350;
	var pBoxTop=150;
	var pBoxWidth=450;
	var pBoxHeight=300;
	var urlA;
	var curDate=new Date();
	urlA="shop/index.jsp?show=12";
	window.open(urlA,'','menubar=yes,toolbar=yes,location=yes,directories=yes,status=yes,width='+pBoxWidth+',height='+pBoxHeight+',left='+pBoxLeft+',top='+pBoxTop+',scrollbars=yes,resizable=yes');
}
function showUserCardIdvest(){//接受道具
	var pBoxLeft=300;
	var pBoxTop=150;
	var pBoxWidth=510;
	var pBoxHeight=500;
	var urlA;
	var curDate=new Date();
	urlA="diaocha/UserCardId.jsp;jsessionid="+sessionId+"?"+curDate;
	window.open(urlA,'','menubar=no,toolbar=no,location=no,directories=no,status=no,width='+pBoxWidth+',height='+pBoxHeight+',left='+pBoxLeft+',top='+pBoxTop+',scrollbars=yes');
}

function showDaShenInvest(){//接受道具
	var pBoxLeft=300;
	var pBoxTop=150;
	var pBoxWidth=510;
	var pBoxHeight=500;
	var urlA;
	var curDate=new Date();
	urlA="diaocha/DaShenReceive.jsp;jsessionid="+sessionId+"?"+curDate;
	window.open(urlA,'','menubar=no,toolbar=no,location=no,directories=no,status=no,width='+pBoxWidth+',height='+pBoxHeight+',left='+pBoxLeft+',top='+pBoxTop+',scrollbars=yes');
}
function showbigevent(){//接受道具
	var pBoxLeft=300;
	var pBoxTop=150;
	var pBoxWidth=410;
	var pBoxHeight=500;
	var urlA;
	var curDate=new Date();
	urlA="bigevent/receive.jsp;jsessionid="+sessionId+"?"+curDate;
	window.open(urlA,'','menubar=no,toolbar=no,location=no,directories=no,status=no,width='+pBoxWidth+',height='+pBoxHeight+',left='+pBoxLeft+',top='+pBoxTop+',scrollbars=yes');
}
function showDongGanInvest(){//接受道具
	var pBoxLeft=300;
	var pBoxTop=150;
	var pBoxWidth=510;
	var pBoxHeight=500;
	var urlA;
	var curDate=new Date();
	urlA="diaocha/DongGanReceive.jsp;jsessionid="+sessionId+"?"+curDate;
	window.open(urlA,'','menubar=no,toolbar=no,location=no,directories=no,status=no,width='+pBoxWidth+',height='+pBoxHeight+',left='+pBoxLeft+',top='+pBoxTop+',scrollbars=yes');
}

function inRank(tId){
	for(var i=0;i<myRank.length;i++){
		if(tId==myRank[i][1]){
			return true;
		}
	}
	return false;
}
function yaoqingRank(){
	var input=prompt('请输入要邀请加入队伍的玩家',"");
	if(input!=null){
		cmd("foo rank add "+input);
	}
}
var myRank=[[]];
function rankList(arr){
	myRank=arr;
	// p.rankList([['村长的儿媳妇',293488,true],['一剑一个',11647678,false]]);
	var o="";
	var captain=false;

	if(arr.length>0){
		getObj("rankLogo").style.display="";
	}
	for(var i=0;i<arr.length;i++){
		if(arr[i][2]&&myId==arr[i][1]){
			captain=true;
			break;
		}
	}
	for(var i=0;i<arr.length;i++){
		o+=(myId!=arr[i][1]?"<a href=# onclick=\"p.talkTo("+arr[i][1]+",'"+arr[i][0]+"');return false;\">":"")+"<font color="+(myId!=arr[i][1]?"000000":"blue")+">"+arr[i][0]+"</font></a>"+(arr[i][2]?" <img src=img/captain.gif alt=队长>":"")
			+(myId!=arr[i][1]?" <a href=# onclick=\"cmd('foo rank check "+arr[i][1]+"');return false;\">[查位置]</a>":"")
		+(captain==true&&!arr[i][2]?" <a href=# onclick=\"cmd('foo rank remove "+arr[i][1]+"');return false;\">[取消邀请]</a>":"")+"<br>";
	}
	getObj("showRank").innerHTML=o;
}
function rankClear(){
	getObj("showRank").innerHTML="<font color=#3F8194>目前并未在任何队伍中</font>";
	getObj("rankLogo").style.display="none";
	changeAllot(-1);
}

function changeAllot(allot){
	try{
	if(allot==2){
		getObj("rank_roll").checked=true;
		getObj("rank_captain").checked=false;
	}else if(allot==1){
		getObj("rank_roll").checked=false;
		getObj("rank_captain").checked=true;
	}else{
		getObj("rank_roll").checked=false;
		getObj("rank_captain").checked=false;
	}
	}catch(x){}
}

//allot:start
var allotItemNum=0;
var initAllotWin=false;
function allotObj(allotId,name,pic,desc){
	var cleartime;
	cleartime = window.setTimeout('try{allotHide();getObj("allot_'+allotId+'").style.display="none";}catch(x){}',60000);
	
	var o= ""
	+"<table border=0 width=90% cellpadding=0 cellspacing=0 id=allot_"+allotId+"><tr><td>"
	+"<img src="+pic+"> <font color=#006A6A><b>"+name+"</b></font>"
	+"<br>"+desc
	+"<table style='margin-top:7px;' width=130 height=7 cellpadding='0' cellspacing='0'><tr><td bgcolor=#B6B6B6 align=left>"
	+"<img src=img/line/allotline.gif width=130 height=7>"
	// +"<span id=allotLine_"+allotItemNum+"
	// style='font-size:1px;height:100%;width:100%;background-color:#FF8040;'></span>"
	+"</td></tr></table>"
	+"</td><td width=10></td><td width=1>"
	+"<img src=img/sezi.gif title=需求 style='cursor:pointer;margin-bottom:10px;' onclick=\"cmd('foo rank allot "+allotId+" 2');allotHide("+cleartime+");parentElement.parentElement.style.display='none';return false;\"><br>"
	+"<input type=button value=放弃 onclick=\"cmd('foo rank allot "+allotId+" 1');allotHide("+cleartime+");parentElement.parentElement.style.display='none';return false;\" style='margin-bottom:8px;'>"
	+"</td>"
	+"</tr></table>"
	;
	
	// window.setTimeout('try{_loopJian("allotLine_'+allotItemNum+'")}catch(x){}',500);
	return o;
}

function allotObjAllRoll(allotId,name,pic,desc){
	var cleartime;
	cleartime = window.setTimeout('try{allotHide();getObj("allot_'+allotId+'").style.display="none";}catch(x){}',60000);

	var o= ""
	+"<table border=0 width=90% cellpadding=0 cellspacing=0 id=allot_"+allotId+"><tr><td>"
	+"<img src="+pic+"> <font color=#006A6A><b>"+name+"</b></font>"
	+"<br>"+desc
	+"<table style='margin-top:7px;' width=130 height=7 cellpadding='0' cellspacing='0'><tr><td bgcolor=#B6B6B6 align=left>"
	+"<img src=img/line/allotline.gif width=130 height=7>"
	// +"<span id=allotLine_"+allotItemNum+"
	// style='font-size:1px;height:100%;width:100%;background-color:#FF8040;'></span>"
	+"</td></tr></table>"
	+"</td><td width=10></td><td width=1>"
	+"<img src=img/sezi.gif title=需求 style='cursor:pointer;margin-bottom:10px;' onclick=\"cmd('foo allroll "+allotId+" 2');allotHide("+cleartime+");parentElement.parentElement.style.display='none';return false;\"><br>"
	+"<input type=button value=放弃 onclick=\"cmd('foo allroll "+allotId+" 1');allotHide("+cleartime+");parentElement.parentElement.style.display='none';return false;\" style='margin-bottom:8px;'>"
	+"</td>"
	+"</tr></table>"
	;
	
	// window.setTimeout('try{_loopJian("allotLine_'+allotItemNum+'")}catch(x){}',500);
	return o;
}
function _loopJian(name){
	var obj=getObj(name);
	obj.style.pixelWidth-=1;
	if(obj.style.pixelWidth>0){
		window.setTimeout("_loopJian('"+name+"')",450);
	}
}
function showAllotWin(astr){
	var winObj=_getWin("allotItem");
	if(!initAllotWin){
		with(winObj.style){
			width="260";
			height="100";
			overflowY="";
			top="172";
			left="321";
		}
		onOpenWin(winObj);
		initAllotWin=true;
		_openWin("allotItem","请选择需求:<hr width=98% size=1 align=left color=#B6B6B6><span id=allotItemWin></span>");
	}
	if(allotItemNum<=0){
		getObj("allotItemWin").innerHTML="";
	}
	allotItemNum++;
	getObj("allotItemWin").innerHTML+=astr;
	onOpenWin(winObj);
}
function allotHide(cleartime){
	if(cleartime!=null && cleartime!=""){
		window.clearTimeout(cleartime);
	}
	allotItemNum--;
	if(allotItemNum<=0){
		offOpenWin('allotItem');
		allotItemNum=0;
	}
}
//allot:end

function showNewPetLesson(){
	var lessonWin=_getWin("newLessonWin");
	with(lessonWin.style){
			width="320";
			height="80";
			overflowY="";
			top="150";
			left="221";
			backgroundColor="#FFFFE1";
		}
	var str;
	if(getRoom()=="休息室") {
		str="<b><font color=red>新手重要提示：</font></b>"
			+"<div style='padding-top:5px;padding-bottom:10px;padding-left:10px;padding-right:10px;line-height:20px;'>"
			+"你好，我是<b><u>猫仙人</u></b>。欢迎你来到这个神奇的国度。作为一个猫游世界的冒险者，你需要学习一些基本的生存技能，<font color=orange>否则在冒险的过程中可能会困难重重啊</font>。"
			+"<br>现在就让我们开始熟悉一些基本操作方法和功能吧。认真学习还可以得到<font color=green>额外奖励</font>哦。"
			+"</div>"
			+"<div style='text-align:center;padding-right:4px;'>"
			+""
			+"<a href=# onclick=\"var lessonWin=_getWin('newLessonWin');lessonWin.style.display='none'; cmd('beginNLTalk');return false;\"><u><b>1. 听听，开始学习吧。</b></u></a>&nbsp;&nbsp;&nbsp;"
			+"&nbsp;&nbsp;&nbsp;&nbsp;<a href=# onclick=\"_noLesson();return false;\"><u>2. 我已经了解，不再学。</u></a><br>"
			+"<br></div>"
		;
	}
	else{
		str="<b><font color=red>新手重要提示：</font></b>"
			+"<div style='padding-top:5px;padding-bottom:10px;padding-left:10px;padding-right:10px;line-height:20px;'>"
			+"如果还没有进行过新手教学，请到花花幼稚园的[休息室]找<font color=blue><u>猫仙人</u></font>，先了解一下基本的功能吧。认真学习还会有<font color=green>额外奖励</font>哦。<br>"
			+"</div>"
			+"<div style='text-align:center;padding-right:4px;'>"
			+"<a href=# onclick=\"offOpenWin('newLessonWin');\">知道了。</a>"
			+"<br></div>"
	}
	onOpenWin(lessonWin);
	_openWin("newLessonWin",str);

}

function _noLesson(){
	if (confirm("你确认已经了解基本操作,不再跟猫仙人学习吗? 学习新手教程还能得到额外的收获哦。")) {
		var lessonWin=_getWin("newLessonWin");
		if (lessonWin){
			lessonWin.style.display="none";
		}
		cmd('foo newLesson 0');
		return true;
	}
	return false;
}

function wuduwawa(myIndex,zhenArr){
	var winName="wuduwawa";
	var winObj=_getWin(winName);
	onOpenWin(winObj);
	var o=fakeBr(4)
	+"<font color=red><b>怨灵的诅咒</b></font><br>"
	+"诅咒的对象: <input type=text id=targetNameZ><br>"
	+"针对部位: <select id=selQiguan>"
	+"<option value=-1>请选择</option>"
	+"<option value='小腿'>小腿</option>"
	+"<option value='脚'>脚</option>"
	+"<option value='眼球'>眼球</option>"
	+"<option value='肺'>肺</option>"
	+"<option value='鞭'>鞭</option>"
	+"<option value='头'>头</option>"
	+"<option value='耳朵'>耳朵</option>"
	+"<option value='鼻子'>鼻子</option>"
	+"<option value='胳膊'>胳膊</option>"
	+"<option value='大腿'>大腿</option>"
	+"<option value='中指'>中指</option>"
	+"<option value='心脏'>心脏</option>"
	+"<option value='肾'>肾</option>"
	+"<option value='阑尾'>阑尾</option>"
	+"<option value='淋巴'>淋巴</option>"
	+"<option value='舌头'>舌头</option>"
	+"<option value='扁桃体'>扁桃体</option>"
	+"<option value='气管'>气管</option>"
	+"<option value='胃'>胃</option>"
	+"<option value='大肠'>大肠</option>"
	+"<option value='百叶'>百叶</option>"
	+"<option value='腰子'>腰子</option>"
	+"<option value='板筋'>板筋</option>"
	+"<option value='奶'>奶</option>"
	+"<option value='肝'>肝</option>"
	+"<option value='菊花'>菊花</option>"
	+"</select><br>"
	+"使用针: <select id=selZhen>"
	;
	for(var i=0;i<zhenArr.length;i++){
		o+="<option value='"+zhenArr[i][1]+"'>"+zhenArr[i][0]+"</option>"
	}
	o+="</select><br>"
	+"<input type=button value=实施诅咒 onclick=\'"
	// "+getObj('selQiguan').value+" "+getObj('selZhen').value+"
	// +"alert(getObj('targetNameZ').value);
	// p.cmd(\"use "+index+" \"+(getObj('targetNameZ').value)+\" \");"
	+"p.cmd(\"use "+myIndex+" \"+(getObj(\"targetNameZ\").value)+\" \"+(getObj(\"selQiguan\").value)+\" \"+(getObj(\"selZhen\").value));"
	+"p.offOpenWin(\""+winName+"\");return false;\'>"
	;
	with(winObj.style){
		width="210";
		height="100";
		if(p.eventY-13<0){
			top=1;
		}else{
			top=p.eventY-25;
		}
		if(p.eventX-parseInt(width)+103<0){
			left=1;
		}else{
			left=p.eventX-parseInt(width)+110;
		}
		overflowY="";
		display='';
	}
	_openWin(winName,o);
}

function party_sel_qm(itemIndex){
	var input=prompt('输入要在公会铭牌上签字的朋友(对方必须没有公会,并且和你在同一场景)',"");
	if(input!=null){
		cmd("use "+itemIndex+" "+input);
	}
}
function showParty(showTime){
	window.open('party.jsp;jsessionid='+sessionId+'?'+(showTime?"action=checkTime&":"")+new Date(),'','menubar=no,toolbar=no,location=no,directories=no,status=no,width=316,height=410,left='+(p.event.screenX-360)+',top='+p.event.screenY+',scrollbars=yes');
}
function showPMes(sendTo){
	var urlStr;
	if(sendTo==undefined){
		//urlStr='./pmes/index.jsp;jsessionid='+sessionId+'?action=new&'+new Date();
		urlStr='./pmes/index.jsp?action=new';
	}else{
		urlStr='./pmes/index.jsp?action=sendnew&uname='+sendTo;
	}
	window.open(urlStr,'','menubar=no,toolbar=no,location=no,directories=no,status=no,width=318,height=400,left='+(p.event.screenX-318)+',top='+p.event.screenY+',scrollbars=yes');
}

//,271
var chatWinArr=[1,60,115,170,225,280,350];
var chatWinMaxH=450;
function changeChatWin(){
	var objT=getObj("chatReaderOut");
	var objD=getObj("chatReaderMyOut");
	var topOff=objT.style.pixelTop;
	var nowT=getObj("chatReaderOut").height;

	var maxWinSize=chatWinArr.length;
	var nowWinIndex=-1;
	var needWinIndex=-1;
	for(var i=0;i<maxWinSize;i++){
		if(chatWinArr[i]==nowT){
			nowWinIndex=i;
			break;
		}
	}
	if(nowWinIndex!=-1){
		if(nowWinIndex<maxWinSize-1){
			needWinIndex=nowWinIndex+1;
		}else{
			needWinIndex=0;
		}
		var needT=chatWinArr[needWinIndex];
		var needD=chatWinMaxH-chatWinArr[needWinIndex];

		objT.height=needT;
		if(needT==1){
			getObj("chatReaderTable").style.display="none";
		}else{
			getObj("chatReaderTable").style.display="";
		}
		objD.height=needD;
		objD.style.pixelTop=topOff+needT+5;

		goDown(getObj("chatReaderTable"));
		goDown(getObj("chatReaderMyTable"));

		addRM("如需聊天保存窗口位置 <a href=# onclick=\"p._saveSet();p.hide(this);return false;\">[请点这里]</a><br>");
	}else{
		err("changeChatWin错误,nowWinIndex为-1");
	}
}


/*输入必要信息后，[确认孵化,同时用于所有产生宠物的地方]*/
function fuhuaPetEgg(aItemIndex){
	var thisCmdStr="use "+aItemIndex;
	// 职业
	var zhiYeObjs=document.getElementsByName("baobaoZhiYe");
	var zhiYeValue="";
	for (var i=0; i<zhiYeObjs.length; i++){
		if (zhiYeObjs[i].checked){
			zhiYeValue=zhiYeObjs[i].value;
			break;
		}
	}
	if (zhiYeValue=="") {
		alert("先为宝宝选择一个职业吧。");
		return false;
	}
	thisCmdStr+=" "+zhiYeValue;
	// 名字
	var bbNameObj=document.getElementById("txtBaoBaoName");
	if (bbNameObj){
		var bbName=bbNameObj.value;
		if (bbName=="") {
			alert("先给宝宝取个名字吧。");
			bbNameObj.focus();
			return false;
		}
		thisCmdStr+=" "+bbName;
	}
	p.cmd(thisCmdStr);
	offOpenWin("fuHuaChongWu");
}

function selOcp(aItemIndex, aItemPath, arr){
	var winName="fuHuaChongWu";
	var winObj=_getWin(winName);
	onOpenWin(winObj);
	var str="<font color=green>【宠物基本属性】</font><br><br>"
	// if ("fitems.pet.egg.PetEgg"==aItemPath){ //白色宠物蛋
		str+="先给宝宝取个名字吧：<br>"
		+"<input type=text name=txtBaoBaoName value=''><br>";
	// }
	str+="希望宝宝选择什么职业呢：<br><font color=red>请谨慎选择职业，职业直接关系到宠物的成长。且选定后无法更改。</font><br>";
	for (var i=0; i<arr.length; i++){
		str+="<input type=radio name=baobaoZhiYe value='"+arr[i][0]+"'>"+arr[i][1]+"  <br>";
	}
	str+="<input type=button value=确认 onclick=\"fuhuaPetEgg('"+aItemIndex+"');p.closeRenPic();\">";
	_openWin(winName,str);
}

/*取回宝宝时选择宝宝职业*/
function selOcpOnFetch(aPetId,aPetName,arr,aFunctionName){
	var winName="fetchSelOcp";
	var winObj=_getWin(winName);
	onOpenWin(winObj);
	var str="<font color=green>【宠物基本属性】</font><br><br>"
	str+="你的宝宝 【"+aPetName+"】还没有职业呢，为它选择一个职业吧：<br>";
	str+="<br><font color=red>请谨慎选择职业，职业直接关系到宠物的成长。且选定后无法更改。</font><br>";
	for (var i=0; i<arr.length; i++){
		str+="<input type=radio name=selOcp value='"+arr[i][0]+"'>"+arr[i][1]+"  <br>";
	}
	str+="<input type=button value=确认 onclick=\""+aFunctionName+"('"+aPetId+"');\"> &nbsp; ";
	str+="<input type=button value=关闭 onclick=\"offOpenWin('fetchSelOcp');p.closeRenPic();\">";
	_openWin(winName,str);
}
/*给要取回的宝宝选择了职业之后，确定取回宝宝*/
function fetchAferSelOcp(aPetId){
	//职业
	var zhiYeObjs=document.getElementsByName("selOcp");
	var zhiYeValue="";
	for (var i=0; i<zhiYeObjs.length; i++){
		if (zhiYeObjs[i].checked){
			zhiYeValue=zhiYeObjs[i].value;
			break;
		}
	}
	if (zhiYeValue=="") {
		alert("先为宝宝选择一个职业吧。");
		return false;
	}
	thisCmdStr="getpet "+aPetId+" "+zhiYeValue;
	p.cmd(thisCmdStr);
	offOpenWin("fetchSelOcp");
}

/*进入页面的时候，如果宠物没有选择正确的职业，则出现窗口选择*/
function selOcpWhenIn(aPetName, arr){
	var bg=document.getElementById("renPicBG");
	bg.style.display="";
	selOcpOnFetch(-1, aPetName, arr, 'doSelOcpWhenIn');
}

/*进入页面，选择职业之后的操作*/
function doSelOcpWhenIn(aPetId){
	//职业
	var zhiYeObjs=document.getElementsByName("selOcp");
	var zhiYeValue="";
	for (var i=0; i<zhiYeObjs.length; i++){
		if (zhiYeObjs[i].checked){
			zhiYeValue=zhiYeObjs[i].value;
			break;
		}
	}
	if (zhiYeValue=="") {
		alert("先为宝宝选择一个职业吧。");
		return false;
	}
	p.cmd("foo setOcp "+zhiYeValue);
	offOpenWin("fetchSelOcp");
	var bg=document.getElementById("renPicBG");
	bg.style.display="none";
}


/*换取装备——看可以换取的装备*/
function _showChangeArm(anItemIndex, arr){

}


function openOnlineHelp(){
	window.open('onlinehelp.jsp;jsessionid='+sessionId,'','menubar=no,toolbar=no,location=no,directories=no,status=no,width=350,height=410,left='+(p.event.screenX-360)+',top='+p.event.screenY+',scrollbars=yes');
}
function autoReply(mes){
	var input=prompt('请输入自动回复的信息(清除自动回复输入cls):',mes);
	if(input!=null){
		cmd("foo setAutoReply "+input);
	}
}

//castWin:start
var castMaxTime=0;
function getCastWin(){
	return document.getElementById('castWin');
}
function getCastObj(){
	return document.getElementById('yongchang_line');
}
function getCastNameObj(){
	return document.getElementById('castName');
}
function _castTime(lw){
	var obj=getCastObj();
	if(obj.style.pixelWidth==lw){
		var nowWidth=obj.style.pixelWidth+(200*150)/castMaxTime;
		if(nowWidth>200){
			nowWidth=200;
		}
		obj.style.pixelWidth=nowWidth;

		if(obj.style.pixelWidth<200){
			window.setTimeout("_castTime("+obj.style.pixelWidth+")",150);
		}else{
			_castOver();
			window.setTimeout("hideCastWin();",200);

		}
	}
}

function showCastTimer(time,name,isrm,isSucceed){
	if(isrm==null){
		addRM("<font color=#2669B3><b><font color=red>你</font></b>开始施放<b>"+name+"</b></font><br>");
	}else{
		var bg=document.getElementById("eyunmenBG");
		bg.style.display="";
	}
	getCastNameObj().innerHTML=name;
	getCastObj().style.pixelWidth=0;
	castMaxTime=time;
	getCastWin().style.display="";

	_castTime(0);
	
	if(isSucceed!=null){
		setTimeout('showCaptureSHL('+isSucceed+')',6000);
	}

}


function showCarryFlag(time,name,isrm){
	if(isrm==null){
		addRM("<font color=#2669B3><b><font color=red>你</font></b>开始施放<b>"+name+"</b></font><br>");
	}else{
		var bg=document.getElementById("eyunmenBG");
		bg.style.display="";
	}
	getCastNameObj().innerHTML=name;
	getCastObj().style.pixelWidth=0;
	castMaxTime=time;
	getCastWin().style.display="";
	_castTime(0);
	
	setTimeout('showCarryFlagEnd('+isSucceed+')',6000);
}


function showCarryFlagEnd(){	
		var bg=document.getElementById("eyunmenBG");
		bg.style.display="none";
}

function showCaptureSHL(isSucceed){
	if(isSucceed!=null){
		if(isSucceed){
			addRM("<font color=#2669B3><b><font color=red>搞定！成功的封印了守护灵！守护灵晶已经在背包里啦，想要孵化的话就要去守护灵媒那里购买孵化器哦！</font></b></font><br>");
		}else{
			addRM("<font color=#2669B3><b><font color=red>好可惜，差一点就成功了，别灰心继续加油啊。</b></font><br>");
		}
		var bg=document.getElementById("eyunmenBG");
		bg.style.display="none";
	}
}
function hideCastWin(){
	getCastWin().style.display='none';
}
function _castOver(){
	getCastObj().style.pixelWidth=200;
}
//castWin:end

// talk:start
function _getLeftTalk(){
	return document.getElementById("left_talk");
}
function _getRightTalk(){
	return document.getElementById("right_talk");
}

var leftTalkOverTime;
function showLeftTalk(mes){
	var obj=_getLeftTalk();
	obj.innerHTML=mes;
	obj.style.display="";
	leftTalkOverTime=getNow()+2000;
	window.setTimeout('tryHideLeftTalk();',2000);
}
function tryHideLeftTalk(){
	if(leftTalkOverTime<=getNow()){
		_getLeftTalk().style.display="none";
	}
}

var rightTalkOverTime;
function showRightTalk(mes){
	var obj=_getRightTalk();
	obj.innerHTML=mes;
	obj.style.display="";
	rightTalkOverTime=getNow()+2000;
	window.setTimeout('tryHideRightTalk();',2000);
}
function tryHideRightTalk(){
	if(rightTalkOverTime<=getNow()){
		_getRightTalk().style.display="none";
	}
}
//talk:end

function xiuliSel(totalPrice,equips){
	var winObj=_getWin("selXiuli");
	with(winObj.style){
		width="200";
		height="10";
		overflowY="";
		if(!getOpenWinDis(winObj)){
			if(p.eventY-13<0){
				top=1;
			}else{
				top=p.eventY-13;
			}
			if(p.eventX-200+13<0){
				left=1;
			}else{
				left=p.eventX-200+13;
			}
		}
	}
	onOpenWin(winObj);
	var o=fakeBr(5)
		
	if(totalPrice!=null){
		o+="全部修理需要: "+totalPrice+" <br><a href=# onclick=\"offOpenWin('selXiuli');cmd('xiuli all');return false;\">[全部修理]</a>";
		if(equips.length>0){
			o+="<hr size=1 width='98%' align=left color=aaaaaa><font color=#006A6A>选择要修理的装备</font>"+fakeBr(4);
		}
		for(var i=0;i<equips.length;i++){
			o+=""+equips[i][0]+" "+equips[i][2]+" <a href=# onclick=\"cmd('xiuli "+equips[i][1]+"');return false;\">[修理]</a><br>";
		}
	}else{
		o+="<font color=green>没有任何需要修理的装备!</font>";
	}

	o+=fakeBr(6);
	_openWin("selXiuli",o);
}

//显示可学的绝技
// 最后一个参数 skillType， 可能的值为
// 1(单独的绝技)
// 2(技能下的绝技)
function showLearnSkillSub(npcName,arr_ok, arr_not,skillType){
	//alert(npcName+" "+arr_ok.length+" "+arr_not.length+" "+skillType);
	var winObj=_getWin("learnSkillSub");
	winObj.closeEvent="p.addRM('"+npcName+": 以后有机会我们也切磋切磋!<br>');p.closeRenPic();"
	with(winObj.style){
		height="60";
		overflowY="";
		paddingBottom="10px";
		left="48";
		width=270;
		top="105";
	}
	
	onOpenWin(winObj);
	str="【绝技训练】<br><div style='width:195; height:200; overflow-y:auto; display:' d ><table border=0 align=center width=230>";
		var totalIndex=0;
		for (var i=0; i<arr_ok.length; i++){
			str+="<tr "+(totalIndex%2==0?"bgcolor=#f0f0f0":"")+">";
			str+="<td><a href=# onclick='showLearnDetail([\""+arr_ok[i][0]+"\",\""+arr_ok[i][1]+"\",\""+arr_ok[i][2]+"\",\""+arr_ok[i][3]+"\",\""
				+(arr_ok[i].length>3?arr_ok[i][4]:"")
				+"\"],true,"+skillType+")'><font color=green>"+arr_ok[i][0]+"</font></a></td>"
				// +"<td>"+arr_ok[i][1]+"</td>"
				+"<td>"+arr_ok[i][2]+"</td>";
				if(npcName=="狂风刀客"){
					str+="<td><a href=# onclick='"	
					+(skillType==1?"p.cmd(\"learnSkillSub_KuangFeng "+arr_ok[i][0]+"\");":"p.cmd(\"learnSkillSub_KuangFeng "+arr_ok[i][4]+" "+arr_ok[i][0]+"\");")
					+"offOpenWin(\"learnSkillSub\");p.closeRenPic();return false;'>【学习】</a>";
				}else if(npcName=="龙葵刺客"){
					str+="<td><a href=# onclick='"	
					+(skillType==1?"p.cmd(\"learnSkillSub "+arr_ok[i][0]+"\");":"p.cmd(\"learnSkillSub "+arr_ok[i][4]+" "+arr_ok[i][0]+"\");")
					+"offOpenWin(\"learnSkillSub\");p.closeRenPic();return false;'>【学习】</a>";
				}else if(npcName=="霸王枪教头"){
					str+="<td><a href=# onclick='"	
					+(skillType==1?"p.cmd(\"learnSkillSub_Qiang "+arr_ok[i][0]+"\");":"p.cmd(\"learnSkillSub_Qiang "+arr_ok[i][4]+" "+arr_ok[i][0]+"\");")
					+"offOpenWin(\"learnSkillSub\");p.closeRenPic();return false;'>【学习】</a>";
				}else if(npcName=="十字骑士统帅"){
					str+="<td><a href=# onclick='"	
					+(skillType==1?"p.cmd(\"learnSkillSub_ShiZi "+arr_ok[i][0]+"\");":"p.cmd(\"learnSkillSub_ShiZi "+arr_ok[i][4]+" "+arr_ok[i][0]+"\");")
					+"offOpenWin(\"learnSkillSub\");p.closeRenPic();return false;'>【学习】</a>";
				}else if(npcName=="龙爪镖头"){
					str+="<td><a href=# onclick='"	
					+(skillType==1?"p.cmd(\"learnSkillSub_LongZhua "+arr_ok[i][0]+"\");":"p.cmd(\"learnSkillSub_LongZhua "+arr_ok[i][4]+" "+arr_ok[i][0]+"\");")
					+"offOpenWin(\"learnSkillSub\");p.closeRenPic();return false;'>【学习】</a>";
				}
				else if(npcName=="光之魔导士"){
					str+="<td><a href=# onclick='"	
					+(skillType==1?"p.cmd(\"learnSkillSub "+arr_ok[i][0]+"\");":"p.cmd(\"learnSkillSub "+arr_ok[i][4]+" "+arr_ok[i][0]+"\");")
					+"offOpenWin(\"learnSkillSub\");p.closeRenPic();return false;'>【学习】</a>";
				}else if(npcName=="风之魔导士"){
					str+="<td><a href=# onclick='"	
					+(skillType==1?"p.cmd(\"learnSkillSub_Feng "+arr_ok[i][0]+"\");":"p.cmd(\"learnSkillSub_Feng "+arr_ok[i][4]+" "+arr_ok[i][0]+"\");")
					+"offOpenWin(\"learnSkillSub\");p.closeRenPic();return false;'>【学习】</a>";
				}else if(npcName=="冰之魔导士"){
					str+="<td><a href=# onclick='"	
					+(skillType==1?"p.cmd(\"learnSkillSub_Bing "+arr_ok[i][0]+"\");":"p.cmd(\"learnSkillSub_Bing "+arr_ok[i][4]+" "+arr_ok[i][0]+"\");")
					+"offOpenWin(\"learnSkillSub\");p.closeRenPic();return false;'>【学习】</a>";
				}else if(npcName=="炎之魔导士"){
					str+="<td><a href=# onclick='"	
					+(skillType==1?"p.cmd(\"learnSkillSub_Yan "+arr_ok[i][0]+"\");":"p.cmd(\"learnSkillSub_Yan "+arr_ok[i][4]+" "+arr_ok[i][0]+"\");")
					+"offOpenWin(\"learnSkillSub\");p.closeRenPic();return false;'>【学习】</a>";
				}else if(npcName=="暗之魔导士"){
					str+="<td><a href=# onclick='"	
					+(skillType==1?"p.cmd(\"learnSkillSub_An "+arr_ok[i][0]+"\");":"p.cmd(\"learnSkillSub_An "+arr_ok[i][4]+" "+arr_ok[i][0]+"\");")
					+"offOpenWin(\"learnSkillSub\");p.closeRenPic();return false;'>【学习】</a>";
				}
				else{
					str+="<td><a href=# onclick='"	
					+(skillType==1?"p.cmd(\"learnSingleSub "+arr_ok[i][0]+"\");":"p.cmd(\"learnSkillSub "+arr_ok[i][4]+" "+arr_ok[i][0]+"\");")
					+"offOpenWin(\"learnSkillSub\");p.closeRenPic();return false;'>【学习】</a>";
				}
				+"</td></tr>";
			totalIndex++;
		}
		for (var i=0; i<arr_not.length; i++){
			str+="<tr "+(totalIndex%2==0?"bgcolor=#f0f0f0":"")+">";
			str+="<td><a href=# onclick='showLearnDetail([\""+arr_not[i][0]+"\",\""+arr_not[i][1]+"\",\""+arr_not[i][2]+"\",\""+arr_not[i][3]+"\",\"\"],false,"+skillType+")'><font color=red>"+arr_not[i][0]+"</font></a></td>"
				+"</tr>";
			totalIndex++;
		}
		if (totalIndex<1){
			str+="<tr><td colspan=3>没有新的绝技可传授。</td></tr>";
		}
	str+="</table></div><div style='height:60' id='div_learnSkillInfo'></div>";
	// alert(str);
	_openWin("learnSkillSub",str);
}


function showLearnDetail(arrInfo,isCanLearn, skillType){
	var divObj=document.getElementById("div_learnSkillInfo");
	if (divObj!=null){
		var str="<hr size=1 color=gray>";
		if (!isCanLearn){
			str+="<font color=red><b>"+arrInfo[0]+"</b></font>";
		}else{
			str+="<font color=green><b>"+arrInfo[0]+"</b></font> &nbsp;&nbsp;&nbsp;&nbsp;"
			+"<a href=# onclick='p.cmd(\""
			+(skillType==1?"learnSingleSub "+arrInfo[0]:"learnSkillSub "+arrInfo[4]+" "+arrInfo[0])
			+"\");offOpenWin(\"learnSkillSub\");p.closeRenPic();return false;'>【学习】</a>"
			;
		}
		str+="<font color=#56562C><br>需要："
			+"<br>级别："+arrInfo[1]
			+(arrInfo[3]=="null"?"":"<br>掌握："+arrInfo[3])
			+"<br>学费："+arrInfo[2]
			+"</font>"
		divObj.innerHTML=str;
	}
}


function zengyimofa(){
	var winObj=_getWin("showFlyPoint");
	winObj.closeEvent="p.addRM('魔法增益师: 希望你再回来.<br>');p.closeRenPic();"
	onOpenWin(winObj);
	with(winObj.style){
		height="60";
		width="200";
		overflowY="";
		paddingBottom="10px";
		left="48";
		top="105";
	}
	var o="";

	o+=fakeBr(4)+"<font color=red>你想购买何种魔法增益: </font>"+fakeBr(6);

	o+="<table border=0 width=100%>";

	o+="<tr><td width=60%><a href=# onclick=\"if(true){p.cmd('zeng str');};return false;\";>力量增益(力量+1)</a></td><td>价格:<font color=red>"+1+"</font> 矿石</td></tr>";
	o+="<tr><td width=60%><a href=# onclick=\"if(true){p.cmd('zeng dex');};return false;\";>敏捷增益(敏捷+1)</a></td><td>价格:<font color=red>"+1+"</font> 矿石</td></tr>";
	o+="<tr><td width=60%><a href=# onclick=\"if(true){p.cmd('zeng vit');};return false;\";>体力增益(体力+1)</a></td><td>价格:<font color=red>"+1+"</font> 矿石</td></tr>";
	o+="<tr><td width=60%><a href=# onclick=\"if(true){p.cmd('zeng int');};return false;\";>智力增益(智力+1)</a></td><td>价格:<font color=red>"+1+"</font> 矿石</td></tr>";
	o+="<tr><td width=60%><a href=# onclick=\"if(true){p.cmd('zeng spi');};return false;\";>精神增益(精神+1)</a></td><td>价格:<font color=red>"+1+"</font> 矿石</td></tr>";


	o+="</table>";
	_openWin("showFlyPoint",o);
}


function cleanCookie() {
	var cookies = document.cookie.split(";");
	for (var i = 0; i < cookies.length; i++) {
		var cookie = cookies[i];
		var eqPos = cookie.indexOf("=");
		var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
		document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
	}
}


function beiDing(ip){

	cleanCookie();

	var winObj=_getWin("dingWin");
	onOpenWin(winObj);
	with(winObj.style){
		height="60";
		width="300";
		overflowY="";
		paddingLeft="15px";
		paddingBottom="13px";
		left="248";
		top="165";
	}
	var o="";

	o+=fakeBr(4)+"<font color=red><b>您已经掉线!</b> </font>"+fakeBr(10);

	o+="帐号 <font color=#145EC0><b>"+myUserName+"</b></font> 目前在 <font color=#145EC0>"+ip+"</font> 被登录!"+fakeBr(5);
	o+="请重新登录!"+fakeBr(5);
	o+="<font size=-2 face=arial color=#145EC0>"+new Date()+"</font>"+fakeBr(10);

	o+="<a href=http://pet.imop.com/ target=_top>[返回官网]<a> <a href=# onclick=\"top.window.location.reload();\" >[确定]</a>";
	_openWin("dingWin",o);
}

function showAmity(arr){
	if(arr.length==0){
		addRM("<font color=red>没有找到任何关系!</font><br>");
		return;
	}

	var reWin=document.all("amityWin")==null;
	if(!reWin){
		reWin=document.all("amityWin").style.display=="none";
	}


	var winObj=_getWin("amityWin");
	onOpenWin(winObj);

	if(reWin){
		with(winObj.style){
			height="60";
			width="200";
			overflowY="";
			paddingLeft="12px";
			paddingBottom="13px";
			left=p.eventX;
			top=p.eventY;
		}
	}
	var o="";

	o+=fakeBr(4)+"<font color=black><b>【关系】</b> </font><hr size=1 width=98% align=left>";

	o+="<table>";
	for(var i=0;i<arr.length;i++){
		o+="<tr><td><b><font color=#072163>"+arr[i][0]+"</font></b></td><td><font color=#008800>"+arr[i][1]+": <b>"+arr[i][2]+"</b> </font></td><td><font size=-2 face=arial color=#008800>/ "+arr[i][3]+"</font></font></td></tr>";
	}
	o+="</table>";

	_openWin("amityWin",o);	
}

//展示离线经验 xzh
function showOfflineExp(arr){
	//alert(arr);
	var reWin=document.all("offlineExp")==null;

	if(!reWin){
		reWin=document.all("offlineExp").style.display=="none";
	}
	var winObj=_getWin("offlineExp");
	onOpenWin(winObj);
	// alert(arr);
	if(reWin){
		with(winObj.style){
			height="120";
			width="300";
			overflowY="";
			paddingLeft="12px";
			paddingBottom="13px";
			left=p.eventX;
			top=p.eventY;
		}
	}
	var o="";
	o+=fakeBr(4)+"<font color=black><b>【离线经验信息】</b> </font><hr size=1 width=98% align=left>";

	o+="<table>";
	o+=arr;
	o+="</table>";
	
	_openWin("offlineExp",o);	
	
	
}

//护镖，送货任务列表。
function showRoomJob(jobName,arr){
	 var winObj=_getWin("roomJobWin");
	 onOpenWin(winObj);
	 with(winObj.style){
	  height="60";
	  width="300";
	  overflowY="";
	  paddingLeft="15px";
	  paddingBottom="13px";
	  left="248";
	  top="165";
	 }
	 var str="";
	 str="【"+jobName+"任务】<br><div style='width:275; height:200; overflow-y:auto; display:' d ><table border=0 align=center width=270>";
	 str+="<tr bgcolor=#f0f0f0><td>级别</td><td width=100>目的地</td><td>报酬</td><td>抵押金</td>";
	  var totalIndex=0;
	  for (var i=0; i<arr.length; i++){
	  	var isOk=(arr[i][5]=="true");
	   str+="<tr "+(totalIndex%2==0?"bgcolor=#f0f0f0":"")+">";
	   str+=
	    "<td>"+(isOk?"<font color=#004D99>":"<font color=#808080>")+arr[i][1]+"</font></td>" // 级别
	    +"<td><a href=# onclick='if (confirm(\"你确定要交付抵押金，接收这个"+jobName+"工作吗？\")) {p.cmd(\"getJob "+arr[i][0]+"\");"
	    +"offOpenWin(\"roomJobWin\");p.closeRenPic();return false;}'>"
	    +(isOk?"<font color=#004D99>":"<font color=#808080>")+arr[i][2]+"</font></a></td>" // 目的地
	    +"<td>"+(isOk?"<font color=#004D99>":"<font color=#808080>")+arr[i][3]+"</font></td>" // 报酬
	    +"<td>"+(isOk?"<font color=#004D99>":"<font color=#808080>")+arr[i][4]+"</font></td>" // 抵押金
	    +"</tr>";
	   totalIndex++;
	  }
	  if (totalIndex==0){
	   str+="<tr "+(totalIndex%2==0?"bgcolor=#f0f0f0":"")+">";
	   str+="<td colspan='4'><font color=red>当前没有"+jobName+"任务.</font></td></tr>"
	  }  
	 str+="</table>";
	 _openWin("roomJobWin",str);
}

function showJingyingLevel(level) {
	var showStr = ""
	for(var i = 0; i < level; i++) {
		showStr+="<img src=img/jingyingstar.jpg >";
	}
	
	return showStr;
}

function showTaskType(level) {
	var showStr = "";
	if(level == 0) {
		showStr = "[普通]";
	} else {				
		showStr = "[精英]" + showJingyingLevel(level);
	}
	
	return showStr;
}

//使命任务列表。
function showRoomTask(arr){
	 var winObj=_getWin("roomTaskWin");
	 
	 onOpenWin(winObj);
	 with(winObj.style){
	  height="100";
	  width="400";
	  overflowY="";
	  paddingLeft="15px";
	  paddingBottom="13px";
	  left="248";
	  top="40";
	 }
	 var str="";
	 str=fakeBr(5)+"<b>【使命任务】</b><br>"+fakeBr(3)+"<table border=0 cellpadding='1' cellspacing='2' align=center width=370 align=left height=25>";
	 str += "<tr bgcolor=#f0f0f0><td width=60><b><font color=#002146>任务名称</font></b></td>";
	 str += "<td><b><nobr><font color=#002146>任务类型</font></nobr></b></td>";
	 str += "<td><b><font color=#002146>任务内容</font></b></td>"
	 str += "<td align='center'><b><nobr><font color='#FF0000'><a href=# onclick='if (confirm(\"刷新任务列表需要花费1猫豆，您确认刷新吗？\")) {p.cmd(\"refreshRoomTask\");}'>【刷新】</a></font></nobr></b></td>";
	  var totalIndex=0;
	  for (var i=0; i<arr.length; i++){
	  	var taskColor=arr[i][3];
	   str+="<tr "+(true?"bgcolor=#E5E5E5":"")+" height=36>"
	    // +"<td ><font color='"+taskColor+"'><b>["+arr[i][1]+"]
		// "+(arr[i][2]=="item"?"收集物资":(arr[i][2]=="kill"?"消灭敌人":""))+"</b></td>"//类型
	    +"<td ><font color='"+taskColor+"'><b>["+arr[i][1]+"] "+arr[i][4]+"</b></td>"// 任务名称
	    + "<td ><font color='"+taskColor+"'><b>" + showTaskType(arr[i][6]) + "</b></td>"
	    +"<td><font color='"+taskColor+"'>"+arr[i][5]+"</font></a></td>" // 任务详细情况
			// +"<td></td>"
			+"<td align=center><a href=# onclick='if (confirm(\"你确定要接受这个使命吗？\")) {p.cmd(\"getRoomTask "+arr[i][0]+"\"); "
			+"offOpenWin(\"roomTaskWin\");p.closeRenPic();return false;}'>【领取】</td>"
	    +"</tr>";
	   totalIndex++;
	  }
	  if (totalIndex==0){
	   str+="<tr "+(true?"bgcolor=#f0f0f0":"")+" height=30>";
	   str+="<td colspan='3'><font color=red>当前没有任务</font></td></tr>"
	  }  
	 str+="</table>";
	 _openWin("roomTaskWin",str);
	 
	 	 // 刷新失败后的提示
	 
	 if(arguments[1] && "refresh_failed" == arguments[1]) {
	 	alert("您的猫豆不足，无法刷新任务列表。请您及时充值。");
	 	return;
	 }
	 
	 	 //增加一个标志，以便关闭窗口的时候可以清除任务版
	 if(arguments[1] && "refresh_success" == arguments[1]) {
	 	alert("您刷新成功！");
	 }
	 
}
//禅房列表
function showZhangLao(){
	 var winObj=_getWin("_ZhangLao");
	 onOpenWin(winObj);
	 with(winObj.style){
	  height="100";
	  width="200";
	  overflowY="";
	  paddingLeft="15px";
	  paddingBottom="13px";
	  left="248";
	  top="40";
	 }
	 var str="";
	 str=fakeBr(5)+"<b>【禅房列表】</b><br>"+fakeBr(3)+"<table border=0 cellpadding='1' cellspacing='2' align=center width=170 align=left height=25>";
	 str+="<tr bgcolor=#f0f0f0><td width=60><b><font color=#002146>禅房名称</font></b></td><td width=40></td>";

     str+="<tr bgcolor=#E5E5E5 height=20>"	    
	    +"<td><font color=red><b>[禅壹] 禅房</b></td>"
	 	+"<td align=center><a href=# onclick='if (confirm(\"你确定要进入这个禅房吗？\")) {p.cmd(\"gto 禅壹\"); "
		+"offOpenWin(\"_ZhangLao\");p.closeRenPic();return false;}'>【进入】</td>"
	    +"</tr>";
     str+="<tr bgcolor=#E5E5E5 height=20>"	    
	    +"<td><font color=red><b>[禅贰] 禅房</b></td>"
	 	+"<td align=center><a href=# onclick='if (confirm(\"你确定要进入这个禅房吗？\")) {p.cmd(\"gto 禅贰\"); "
		+"offOpenWin(\"_ZhangLao\");p.closeRenPic();return false;}'>【进入】</td>"
	    +"</tr>";
	 str+="<tr bgcolor=#E5E5E5 height=20>"	    
	    +"<td><font color=red><b>[禅叁] 禅房</b></td>"
	 	+"<td align=center><a href=# onclick='if (confirm(\"你确定要进入这个禅房吗？\")) {p.cmd(\"gto 禅叁\"); "
		+"offOpenWin(\"_ZhangLao\");p.closeRenPic();return false;}'>【进入】</td>"
	    +"</tr>";
	 str+="<tr bgcolor=#E5E5E5 height=20>"	    
	    +"<td><font color=red><b>[禅肆] 禅房</b></td>"
	 	+"<td align=center><a href=# onclick='if (confirm(\"你确定要进入这个禅房吗？\")) {p.cmd(\"gto 禅肆\"); "
		+"offOpenWin(\"_ZhangLao\");p.closeRenPic();return false;}'>【进入】</td>"
	    +"</tr>";
	 str+="<tr bgcolor=#E5E5E5 height=20>"	    
	    +"<td><font color=red><b>[禅伍] 禅房</b></td>"
	 	+"<td align=center><a href=# onclick='if (confirm(\"你确定要进入这个禅房吗？\")) {p.cmd(\"gto 禅伍\"); "
		+"offOpenWin(\"_ZhangLao\");p.closeRenPic();return false;}'>【进入】</td>"
	    +"</tr>";
	 str+="<tr bgcolor=#E5E5E5 height=20>"	    
	    +"<td><font color=red><b>[禅陆] 禅房</b></td>"
	 	+"<td align=center><a href=# onclick='if (confirm(\"你确定要进入这个禅房吗？\")) {p.cmd(\"gto 禅陆\"); "
		+"offOpenWin(\"_ZhangLao\");p.closeRenPic();return false;}'>【进入】</td>"
	    +"</tr>";
	 str+="<tr bgcolor=#E5E5E5 height=20>"	    
	    +"<td><font color=red><b>[禅柒] 禅房</b></td>"
	 	+"<td align=center><a href=# onclick='if (confirm(\"你确定要进入这个禅房吗？\")) {p.cmd(\"gto 禅柒\"); "
		+"offOpenWin(\"_ZhangLao\");p.closeRenPic();return false;}'>【进入】</td>"
	    +"</tr>";
	 str+="<tr bgcolor=#E5E5E5 height=20>"	    
	    +"<td><font color=red><b>[禅捌] 禅房</b></td>"
	 	+"<td align=center><a href=# onclick='if (confirm(\"你确定要进入这个禅房吗？\")) {p.cmd(\"gto 禅捌\"); "
		+"offOpenWin(\"_ZhangLao\");p.closeRenPic();return false;}'>【进入】</td>"
	    +"</tr>";
	 str+="<tr bgcolor=#E5E5E5 height=20>"	    
	    +"<td><font color=red><b>[禅玖] 禅房</b></td>"
	 	+"<td align=center><a href=# onclick='if (confirm(\"你确定要进入这个禅房吗？\")) {p.cmd(\"gto 禅玖\"); "
		+"offOpenWin(\"_ZhangLao\");p.closeRenPic();return false;}'>【进入】</td>"
	    +"</tr>";
	 str+="</table>";
	// alert(str);
	 _openWin("_ZhangLao",str);
}


/*在有新消息时，显示提示框*/
function alertPetTalk(isShow){
	var racePicObj=document.getElementById("_petRace");
	var alertDiv=document.getElementById("divPetTalkAlert");
	// alert(isShow);
	// if (isShow){
		if(false){
		//racePicObj.style.filter='alpha(opacity=40)';
		alertDiv.innerHTML="<a href=# onclick='p.cmd(\"foo petTalk 0\");p.hideWelcome();return false;'><img src='/img/pettalk.gif' border=0></a>";
		alertDiv.style.left="316px";
		alertDiv.style.top="35px";
		alertDiv.style.display="block";
	}
	else{
		//racePicObj.style.filter='alpha(opacity=100)';
		alertDiv.style.display="none";
	}
}

/*显示宠物情景对话。*/
function showPetTalk(picStr,aPetName,msg){
	var winName="showPetTalkWin";
	var winObj=_getWin(winName);

	try{
		if(winObj.style.display!=""){
			with(winObj.style){
				top=p.eventY;
				left=p.eventX;
				width="266";
				height="123";
				overflowY="";
			}
		}
	}catch(x){alert(x);}

	onOpenWin(winObj);

	var str=fakeBr(6);
	str+="<a href=# onclick=\"p.cmd('pet');return false;\"><img src='"+picStr+"' border=0></a> "+aPetName+":<br>"+fakeBr(2);
	str+="<div style='background-color:#E4E4E4;height:100;margin-right:5px;margin-bottom:5px;padding:9px;line-height:14pt;'>　"+msg+"</div>";
	// alert(str);
	_openWin(winName,str);
	p.alertPetTalk(false);
	// var bg=document.getElementById("renPicBG");
	// bg.style.display="";
}


function hint(left,top,width){
	var o=getObj("alertHint");
	if(o==null){
		document.body.appendChild(document.createElement('<img src=img/yuan.gif style="position: absolute;left: 0;top: 0;z-index:9999999999;display:none;" id=alertHint>'));
		o=getObj("alertHint");
	}
	o.style.display="";
	o.style.top=top;
	o.style.left=left;
	o.src="img/yuan.gif";
	// o.style.width=50;
	// o.style.height=50;
	setTimeout("try{getObj('alertHint').style.display='none';}catch(x){if(debug)alert(x);}",1650);
}

function hint_xiao(left,top,width){
	var o=getObj("alertHint");
	// if(o==null){
		document.body.appendChild(document.createElement('<img src=img/yuan03.gif style="position: absolute;left: 0;top: 0;z-index:9999999999;display:none;" id=alertHint>'));
		o=getObj("alertHint");
	// }
	o.style.display="";
	o.style.top=top;
	o.style.left=left;
	o.src="img/yuan03.gif";
	// o.style.width=50;
	// o.style.height=50;
	setTimeout("try{getObj('alertHint').style.display='none';}catch(x){if(debug)alert(x);}",1650);
}

function hint_xiao2(left1,top1,width1,cmdname,imgsrc){
	var o1=getObj("alertHint1");
	if(o1==null){
		o1 = document.createElement('div');
	}
	with(o1.style){
		position="absolute";
		left=left1;
		top=top1;
		width=width1;
		display="";
	}
	o1.innerHTML="<table><a href=# onclick=\"cmd('"+cmdname+"');return false;\"><img src='"+imgsrc+"' border=0></a></table>";
	o1.id="alertHint1";
	document.body.appendChild(o1);
}

function hint_img(left,top,width,imgsrc){
	var o=getObj("alertHint");
	document.body.appendChild(document.createElement('<img src='+imgsrc+' style="position: absolute;left: 0;top: 0;z-index:9999999999;display:none;" id=alertHint>'));
	o=getObj("alertHint");
	o.style.display="";
	o.style.top=top;
	o.style.left=left;
	o.style.width=width;
	o.src=imgsrc;
}

function hide_alertimg(objname){
	var o=getObj(objname);
	if(o!=null){
		o.style.display="none";
	}
}

function hideWelcome(){
	//第一次,关闭welcome窗
	var welcomeWin=getObj("welcomeWin");
	if(welcomeWin!=null){
		welcomeWin.style.display="none";
		document.body.removeChild(welcomeWin);
	}
}
function showWelcome(){
	var alertWin=document.createElement('div');
	alertWin.id="welcomeWin";
	with(alertWin.style){
		position="absolute";
		left="230";
		top="180";
		width="310px";
		visibility="visible";
		zIndex="15";
		border="1px solid black";
		padding="10px";
		backgroundColor="#FFFFE1";
	}
	alertWin.innerHTML=""
		+"<table width=400><tr><td></td><td><a href=# hidefocus=true onclick=\"hideWelcome();hint(350,70,250);return false;\"><img align=right src=/img/button/w_3.gif border=0></a></td></tr><tr><td style='padding-left:20px;padding-right:10px;'>"
		+"<img src=/img/welcome.png width=130 height=180>"
		+"</td><td valign=top align=left style='padding-top:5px;'>"
		+"<b><font color=#0C3670>欢迎来到猫游记!【这边看过来!】</font></b>"
		+"<div style='padding-top:5px;padding-bottom:10px;padding-left:10px;padding-right:10px;line-height:20px;'>"
		+"你的位置在新手村<font color=gren>休息室</font>"
		+"<a href=# hidefocus=true onclick=\"hint(137,145,100);return false;\">【点我显示位置<img src=/img/hint.gif border=0>】</a><br>"
		+fakeBr(7)
		// +"先和<font color=gren>猫仙人</font>聊聊吧~"
		// +"<a href=# hidefocus=true onclick=\"hint(350,70,250);return
		// false;\">【点击显示位置<img src=/img/hint.gif border=0>】</a><br>"
		// +fakeBr(7)
		// +"点<a href=# hidefocus=true onclick=\"hint(350,70,250);return
		// false;\">猫仙人</a>或者名字后面的<a href=# hidefocus=true
		// onclick=\"hint(350,70,250);return false;\"><img src=/img/button/2.gif
		// border=0></a>号就可以和他对话了~~<Br>"
		+"</div>"
		+"</td></tr></table>";
	document.body.appendChild(alertWin);
}


function overTaskCmd(cmdName){
		var selEncObj=document.getElementsByName("radTaskEncSel");
		var selEncIndex=-1;
		if (selEncObj!=null && selEncObj.length>0){
			 for (var i=0;i <selEncObj.length; i++){
			 	if (selEncObj[i].checked)  {
			 			selEncIndex=selEncObj[i].value;
		 		 		break;
		 		 	}
			 }
			 if (selEncIndex==-1) {
			 	alert("请选择任务奖励！");
			 	return false;
			 	}
		}
		if (selEncIndex!=-1){
			p.cmd(cmdName+" "+selEncIndex);
		}else {
			p.cmd(cmdName);
		}
}


var reliveS;
function reliveSel(notcheck,reliveTime,isAnon){
	if(reliveTime&&reliveTime>0){
		reliveS=reliveTime/1000;
	}
	if(!notcheck&&!petIsDie)return;
	var winObj=getObj("reliveWin");
	if(winObj==null){
		//alert:win
		var alertWin=document.createElement('div');
		alertWin.id="reliveWin";
		with(alertWin.style){
			//display="none";
			position="absolute";
			left="270";
			top="160";
			// width="310px";
			visibility="visible";
			zIndex="999999";
			border="1px solid black";
			padding="10px";
			backgroundColor="#FFFFE1";
			display="none";
		}
		//alert:win
		document.body.appendChild(alertWin);
	}

	winObj=getObj("reliveWin");
	var strAnon="";
	if(isAnon!=null&&isAnon){
		strAnon="<a href=# onclick=\"p.cmd('use fitems.pet.other.XiaoShiJuanZhou');p.getObj('reliveWin').style.display='none';return false;\">【使用消失卷轴复活】</a><br>";
	}
	winObj.innerHTML=""
		+"<table width=230 border=0><tr><td valign=top width=40><img src="+getObj("_petRace").src+" style='filter: Gray'></td><td valign=top align=left style='padding-top:7px;'>"
			+"<b><font color=#0C3670>"+getPetName()+"已经死亡!</font></b>"
			+"<div style='padding-top:13px;padding-bottom:3px;padding-left:10px;padding-right:10px;'>"
			+"<span id=reliveBar></span><br>"// <a href=#
												// onclick=\"p.cmd('relive');p.getObj('reliveWin').style.display='none';return
												// false;\">【在最近的复活点复活】</a>
			+fakeBr(4)
			+"<a href=# onclick=\"p.cmd('look 1 1');p.getObj('reliveWin').style.display='none';return false;\">【原地不动等待救治】</a><br>"
			+fakeBr(2)
			+strAnon
			+"</div>"
		+"</td></tr></table>"
	;
	winObj.style.display="";

	if(reliveS>0){
		if(reliveTimer==null){
		reliveStartSow();
		}
	}else{
		reliveShowButton();
	}
}
var reliveTimer=null;
function reliveStartSow(){
	
	if(reliveS>0){
		reliveTimer=setTimeout("reliveS-=1;p.reliveStartSow();",1000);
		getObj("reliveBar").innerHTML="<b><font color=red>"+reliveS+"</font></b> 秒后可以复活";
	}else{
		reliveShowButton();
	
	}
}
function reliveShowButton(){
	getObj("reliveBar").innerHTML="<a href=# onclick=\"p.cmd('relive');p.getObj('reliveWin').style.display='none';return false;\">【在最近的复活点复活】</a>";
	reliveTimer=null;
}


function flySel(nowPos,canTo){
	var winObj=getObj("flyWin");
	if(winObj==null){
		//alert:win
		winObj=document.createElement('div');
		winObj.id="flyWin";
		with(winObj.style){
			//display="none";
			position="absolute";
			left="260";
			top="75";
			// width="310px";
			visibility="visible";
			zIndex="999999";
			border="1px solid black";
			padding="1px";
			backgroundColor="#FFFFE1";
		}
		document.body.appendChild(winObj);
		// alert:win
	}else{}
	var o="";
	for(var i=0;i<canTo.length;i++){
		o+="<span title='价格:"+parseInt(canTo[i][3])/100+"银币' class=mapTag style='left:"+canTo[i][1]+";top:"+canTo[i][2]+";' onclick=\"if(confirm('确定要飞往 ["+canTo[i][0]+"] ,花费"+(canTo[i][3]/100)+"银币?'))return flyTo(this.innerText);\"><img src=/img/t2.gif><span class=mapText>"+canTo[i][0]+"</span></span>";
	}
	winObj.innerHTML=""
	+"<table width=350 height=350 cellpadding='0' cellspacing='3' background=/img/map/all/"+nowPos[1]+".jpg><tr><td align=right valign=top>"+"<img src=/img/button/w_4.gif style='cursor:hand;' hidefocus=true onclick=\"p.offOpenWin('flyWin');p.closeRenPic();return false;\">"
	+"<span class=mapTag style='left:"+nowPos[2]+";top:"+nowPos[3]+";'><img src=/img/t2.gif><span class=mapTextAt>"+nowPos[0]+"</span></span>"
	+o
	+"</td></tr></table>"
	;
	winObj.style.display="";
}

function flySelNoPay(nowPos,canTo){
	var winObj=getObj("flyWin");
	if(winObj==null){
		//alert:win
		winObj=document.createElement('div');
		winObj.id="flyWin";
		with(winObj.style){
			//display="none";
			position="absolute";
			left="260";
			top="75";
			// width="310px";
			visibility="visible";
			zIndex="999999";
			border="1px solid black";
			padding="1px";
			backgroundColor="#FFFFE1";
		}
		document.body.appendChild(winObj);
		// alert:win
	}else{}
	var o="";
	for(var i=0;i<canTo.length;i++){
		o+="<span title='价格:"+parseInt(canTo[i][3])/100+"银币' class=mapTag style='left:"+canTo[i][1]+";top:"+canTo[i][2]+";' onclick=\"if(confirm('确定要免费飞往 ["+canTo[i][0]+"] 么?'))return flyTo(this.innerText);\"><img src=/img/t2.gif><span class=mapText>"+canTo[i][0]+"</span></span>";
	}
	winObj.innerHTML=""
	+"<table width=350 height=350 cellpadding='0' cellspacing='3' background=/img/map/all/"+nowPos[1]+".jpg><tr><td align=right valign=top>"+"<img src=/img/button/w_4.gif style='cursor:hand;' hidefocus=true onclick=\"p.offOpenWin('flyWin');p.closeRenPic();return false;\">"
	+"<span class=mapTag style='left:"+nowPos[2]+";top:"+nowPos[3]+";'><img src=/img/t2.gif><span class=mapTextAt>"+nowPos[0]+"</span></span>"
	+o
	+"</td></tr></table>"
	;
	winObj.style.display="";
}

function flyTo(pos){
	cmd('flyto '+pos);
	offOpenWin('flyWin');
	closeRenPic();
	return false;
}
//loadScript:start
function loadScript(scriptPath){
	var s=document.createElement('script');
	// s.id=id;
	s.src=scriptPath;
	document.body.appendChild(s);
}
var loadScriptEventMap=new JsMap();
function loadScriptEvent(scriptId,eventScript){
	loadScriptEventMap.put(scriptId,eventScript)
}
function getLoadScriptEvent(scriptId){
	return ""+loadScriptEventMap.get(scriptId);
}
function hasScript(scriptId){
	return loadedMap.get(scriptId)!="";
}
var loadedMap=new JsMap();
function loadedScript(scriptId){
	eval(getLoadScriptEvent(scriptId));
	loadedMap.put(scriptId,'o');
}
//loadScript:end

function showRefineStone(equipIndex, itemArr){
	//alert(arr);
	var winObj=_getWin("refineStone");
	onOpenWin(winObj);
	with(winObj.style){
		width="200";
		height="10";
		if(p.eventY-13<0){
			top=1;
		}else{
			top=p.eventY-13;
		}
		if(p.eventX-200+13<0){
			left=1;
		}else{
			left=p.eventX-200+13;
		}
		overflowY="";
		display='';
	}
	var o=fakeBr(2)+"<font color=#006A6A>选择精炼石</font>"+fakeBr(4);

	for(var i=0;i<itemArr.length;i++){
		o+="<a href=# onclick=\"if (confirm('确定要使用"+itemArr[i][0]+"来精炼吗？')) { p.cmd('refine "+equipIndex+" "+itemArr[i][4]+"');offOpenWin('refineStone');return false;}\"><font color="+itemArr[i][3]+">"+itemArr[i][0]+"</font></a> ["+itemArr[i][2]+"]<br>";
	}
	_openWin("refineStone",o);
}


//	if(name!="petInfoWin"&&name!="selInnerOrGet"&& name!="petHelpWin"){
//		o+="<a style='cursor:move' title=按住我拖动 onmousedown=\"drags(_getWin('"+name+"'));\" onmouseup='dragapproved=false;'><img src=/img/button/w_2.gif></a>";
// }


function showPetHelp(anEvent){
	var winObj=_getWin("petHelpWin");
	var curLvNum=10;
	try{
		curLvNum=nowLv.innerText;
	}catch (ex){}
	onOpenWin(winObj);
	var str=""
				+"<br>"
				// +"<div style='position:relative;filter:alpha(opacity=100)'>"
				+"<img style='cursor:hand;filter:alpha(opacity=100)' src='/img/button/chongwu.png' onclick=\"p.cmd('pet');offOpenWin('petHelpWin');\" alt='宠物信息' title='宠物信息'><br>"
				+"<img  style='cursor:hand' src='/img/button/renwu.png'   onclick=\"p.cmd('showTask');offOpenWin('petHelpWin');\" alt='任务列表'><br>"
				+(curLvNum<20?"<img  style='cursor:hand' src='/img/button/tishi.gif'  onclick=\"p.cmd('foo petTalk 0'); offOpenWin('petHelpWin');\" alt='剧情提示'><br>":"")
				+(curLvNum>15?"<img  style='cursor:hand' src='/img/button/yincang.gif'   onclick=\"offOpenWin('petHelpWin');p.hideImgHelp();\" alt='在地图上隐藏宠物头像'><br>":"")
				// +"</div>";
	
	with(winObj.style){
		try{
			top=anEvent.y+petWin.document.body.scrollTop+91-13;
			left=anEvent.x+petWin.document.body.scrollLeft+40;
		}catch(x){
			top=anEvent.y+petWin.document.body.scrollTop-13;
			left=anEvent.x+petWin.document.body.scrollLeft;
		}
		width="80";
	// background="transparent";
		filter="alpha( style=3,opacity=100,finishOpacity=70)";
		if (curLvNum<15){
			height="100";
		}else if (curLvNum<20){
			height="120";
		}else {
			height="80";
		}
		overflowY="";
	}
	
	_openWin("petHelpWin",str);
}




function hideImgHelp(){
	if (confirm("隐藏地图上显示的宠物形象？")){
			openDISPLAYButton=0;
			_saveSet();
			p.cmd("l");
			alert("可以通过页面左上方的“功能”-“设置”，在地图上显示宠物形象");
	}	
	//
}

function showWelcome_begin(){
	var curWidth=860;// document.body.offsetWidth;
	var curHight=600;// document.body.offsetHeight;
	abg=document.createElement('div');
	abg.id="totalBg";
	with(abg.style){
			position="absolute";
			left="0px";
			top="0px";
			visibility="visible";
			display="";
			zIndex="90";
			// border="1px solid black";
			width=curWidth?curWidth:"2000px";
			height=curHight?curHight:"2000px";
			backgroundColor="#FFFFE1";
			filter="alpha(opacity=60)";
		}
		document.body.appendChild(abg);		
		var aImgDiv=document.createElement('div');
		aImgDiv.id="pageHelp";
		with(aImgDiv.style){
			position="absolute";
			left="0px";
			top="0px";
			display="";
			visibility="visible";
			zIndex="99";
			// border="1px solid black";
			backgroundColor="transparent";
		}
		document.body.appendChild(aImgDiv);
		aImgDiv.innerHTML="<img src=/img/pageHelp01.gif border=0>";
		window.setTimeout(showClose,6000);
		window.setTimeout(closeWelcome_begin,10000);
		timeoutWelcome=window.setTimeout(showWelcome,10000);
}

var timeoutWelcome=null;
function showClose(){
		var aImgDiv=document.createElement('div');
		aImgDiv.id="pageClose";
		with(aImgDiv.style){
			position="absolute";
			left="370px";
			top="220px";
			display="";
			visibility="visible";
			zIndex="999";			
			backgroundColor="transparent";
		}
		document.body.appendChild(aImgDiv);
		aImgDiv.innerHTML="<img src=/img/button/pageClose.gif border=0 style='cursor:hand' onclick=' closeWelcome_begin();showWelcome(); if (timeoutWelcome) {window.clearTimeout(timeoutWelcome);}'>";
}
function closeWelcome_begin(){
		document.getElementById("pageClose").style.display="none";
		document.getElementById("totalBg").style.display="none";
		document.getElementById("pageHelp").style.display="none";
}
var timeoutLeverUP=null;
function showLeverUp(){
	var upgradeleverwin = document.getElementById("showLeverUp");
	if(upgradeleverwin==null){		
		var aImgDiv = document.createElement('div');
		aImgDiv.id="showLeverUp";		
		document.getElementById("renPicBG").style.display="";
		with(aImgDiv.style){
			position="absolute";
			left="140px";
			top="110px";
			display="";
			visibility="visible";
			zIndex="999";			
			backgroundColor="transparent";			
		}
		document.body.appendChild(aImgDiv);
		aImgDiv.innerHTML="<img src=/img/leverup.gif border=0 style='cursor:hand' onclick=' closeLeverUp();if(timeoutLeverUP) {window.clearTimeout(timeoutLeverUP);}'>";
	}else{
		upgradeleverwin.style.display="";
	}
}
function closeLeverUp(){
	try{
		document.getElementById("showLeverUp").style.display="none";
		document.getElementById("renPicBG").style.display="none";
	}catch(err){}
}

//用同一道具兑换多个道具
function listHuanTools(listArr,picstr){
	var winObj=_getWin("listSellTools");
	onOpenWin(winObj);
	var o="";
	o+=fakeBr(4)
	o+="<font color=red>你想交换什么?</font>";
	o+="<br>";
	o+="<table border=0 style='margin-top:3px;margin-bottom:6px;' width=100%>";
	var add="";
	for(var i=0;i<listArr.length;i++){
		o+="<tr><td><img src="+listArr[i][3]+"></td><td><a href=# onclick=\"p.cmd('toolsChangeTools "+listArr[i][2]+"');return false;\">"+listArr[i][0]+"</a></td><td width=10></td><td><img src=img/itemlogo/"+picstr+"></td><td>x</td><td>"+listArr[i][1]+"</td>"+add+"<td>&nbsp<a href=# onclick=\"p.exchangeItem('"+listArr[i][4]+"','"+listArr[i][2]+"',"+listArr[i][5]+");return false;\"><font color=blue>【换】</font></a></td></tr>";	
	}
	o+="</table>";
	_openWin("listSellTools",o);

}
//不同道具互换
function listExchangeTools(listArr,listBrr){
	var winObj=_getWin("listExchangeTools");
	onOpenWin(winObj);
	var o="";
	var b="";
	o+=fakeBr(4)
	o+="<font color=red>你想交换什么?</font>";
	o+="<br>";
	o+="<table border=0 style='margin-top:3px;margin-bottom:6px;' width=100%>";
	var add="";
	for(var i=0;i<listArr.length;i++){
		if(listBrr[i][5]>0){
			b = "<td width=30>"+listBrr[i][5]+"<img border=0 title=\""+listBrr[i][5]+"金\" src=img/itemlogo/jinb.gif></td>";
		}else{
			b = "<td width=10></td>";	
		}
		o+="<tr><td><img src="+listArr[i][3]+"></td><td><a href=# onclick=\"p.cmd('toolsChangeTools "+listArr[i][2]+"');return false;\">"+listArr[i][0]+"</a></td>"+b+"<td><a href=# onclick=\"p.cmd('toolsChangeTools "+listBrr[i][2]+"');return false;\"><img border=0 title=\""+listBrr[i][0]+"\" src="+listBrr[i][3]+"></a></td><td>x"+listArr[i][1]+"</td><td><a href=# border=0 onclick=\"p.exchangeItem('"+listArr[i][4]+"','"+listArr[i][2]+"',"+listArr[i][5]+");return false;\"><font color=blue>【换】</font></a></td></tr>";	
	}
	o+="</table>";
	_openWin("listExchangeTools",o);
}

/**
*不同道具互换
*helpcmd:道具信息命令
*excmd:兑换命令
*title:标题
*exbut:兑换按钮名称
**/
function showExchangeList(listArr,listBrr,helpcmd,excmd,title,exbut){
	var winObj=_getWin("showExchangeList");
	onOpenWin(winObj);
	var o="";
	var b="";
	o+=fakeBr(4)
	o+="<font color=red>"+title+"</font>";
	o+="<br>";
	o+="<table border=0 width='250' style='margin-top:3px;margin-bottom:6px;'>";
	var add="";
	for(var i=0;i<listArr.length;i++){
		if(listBrr[i][5]>0){
			b = "<td>"+listBrr[i][5]+"<img border=0 title=\""
			+listBrr[i][5]+"金\" src=img/itemlogo/jinb.gif></td>";
		}else{
			b = "<td></td>";	
		}
		o+="<tr><td width=><img src="+listArr[i][3]
			+"></td><td><a href=# onclick=\"p.cmd('"+helpcmd+" "
			+listArr[i][2]+"');return false;\">"+listArr[i][0]
			+"</a></td>"+b+"<td><a href=# onclick=\"p.cmd('"
			+helpcmd+" "+listBrr[i][2]+"');return false;\"><img border=0 title=\""
			+listBrr[i][0]+"\" src="+listBrr[i][3]+"></a></td><td>x"+listArr[i][1]
			+"</td><td><a href=# border=0 onclick=\"p.doExchange('"+listArr[i][4]
			+"','"+listArr[i][2]+"',"+listArr[i][5]+",'"+excmd
			+"');return false;\"><font color=blue>【"+exbut+"】</font></a></td></tr>";	
	}
	o+="</table>";
	_openWin("showExchangeList",o);
}

function doExchange(item,path,canAmount,doexcmd){
	if(!canAmount){
		if(confirm('确认要购买 ['+item+'] ?')){
			cmd(doexcmd+" "+path+" 1");
		}
	}else{

		var input=prompt('请输入要购买 ['+item+'] 的数量',1);
		if(input!=null){
			if(checkInt(input)){
				if(input<1){
					alert("购买数量不能小于1个!");
					exchangeItem(item,path,canAmount,doexcmd);
				}else if(input > 99){
					alert("购买数量不能大于99个");
					exchangeItem(item,path,canAmount,doexcmd);
				}else{
					cmd(doexcmd+" "+path+" "+input);
				}
			}else{
				alert("请输入正确的数字!");
				exchangeItem(item,path,canAmount,doexcmd);
			}
		}
	}
}

function exchangeItem(item,path,canAmount){
	if(!canAmount){
		if(confirm('确认要购买 ['+item+'] ?')){
			cmd("exchange "+path+" 1");
		}
	}else{

		var input=prompt('请输入要购买 ['+item+'] 的数量',1);
		if(input!=null){
			if(checkInt(input)){
				if(input<1){
					alert("购买数量不能小于1个!");
					exchangeItem(item,path,canAmount);
				}else{
					cmd("exchange "+path+" "+input);
				}
			}else{
				alert("请输入正确的数字!");
				exchangeItem(item,path,canAmount);
			}
		}
	}
}
//用户使用狮子吼
function shizihou(index){
	var input = prompt('你要吼什么?','');
	var re = /[ ]/g;
	input = input.replace(re,"");
	if(input==""){
		alert("不能空吼！");
		return ;
	}else if(input.length>120){
		alert("超过了120个字");
		return ;
	}
	
	cmd("use "+index+" "+input);
}

//列出打孔装备
function showDaKong(desc,itemName,pic,itemList,index){ //将itemName转让给当前场景的生物
	var winObj=_getWin("showDaKongWin");
	onOpenWin(winObj);
	with(winObj.style){
		width="210";
		height="10";
		if(p.eventY<0){
			top=1;
		}else{
			top=p.eventY;
		}
		if(p.eventX-210<0){
			left=1;
		}else{
			left=p.eventX-210;
		}
		overflowY="";
		display='';
	}
	var o="<div style='padding-top:2px;'>"
	+"<img src="+pic+"> <b>"+desc+"：</b><br>"
	+"<div style='margin-top:6px;margin-bottom:3px;'>选择装备： <span id=daKongShowUser style='color:red;margin-right:5px'></span><span id=giveToShowUserIndex style='display:none'></span> <a href=#  onclick=\"cmd(createCmd("+index+"));offOpenWin('showDaKongWin');return false;\"  id=showDaKongBar style=\"display:none;\">[确定]</a></div>"
	
	+"<div style='margin-left:10px;'>";
	+(itemList.length>0?"<div style='margin-left:10px;margin-top:5px;'>":"")
	;
	
	if(itemList.length<=0){
		o+="没有可打孔的装备";
	}else{
		for(var i=0;i<itemList.length;i++){
			var ary = itemList[i].split("|");
			o+="<img src='"+ary[1]+"'/>&nbsp;&nbsp;&nbsp;<a href=# onclick=\"getObj('daKongShowUser').innerHTML='"+ary[0]+"';getObj('giveToShowUserIndex').innerHTML='"+ary[2]+"';getObj('showDaKongBar').style.display='';\">"+ary[0]+"</a><br>";
		}
	}
	

	o+="</div>"
	+"</div>"
	+fakeBr(10);
	_openWin("showDaKongWin",o);
}


//列出可摘除宝石的装备
function showBaoShiItem(desc,itemName,pic,itemList,index){ 
	var winObj=_getWin("showBaoShiItem");
	onOpenWin(winObj);
	with(winObj.style){
		width="270";
		height="10";
		if(p.eventY<0){
			top=1;
		}else{
			top=p.eventY;
		}
		if(p.eventX-210<0){
			left=1;
		}else{
			left=p.eventX-210;
		}
		overflowY="";
		display='';
	}
	var o="<div style='padding-top:2px;'>"	
	+"<div style='margin-top:6px;margin-bottom:3px;'>请选择需要进行配饰的装备： <span id=daKongShowUser style='color:red;margin-right:5px'></span><span id=giveToShowUserIndex style='display:none'></span> <a href=#  onclick=\"cmd(createCmd("+index+"));offOpenWin('showBaoShiItem');return false;\"  id=showDaKongBar style=\"display:none;\">[确定]</a></div>"
	
	+"<div style='margin-left:10px;'>";
	+(itemList.length>0?"<div style='margin-left:10px;margin-top:5px;'>":"")
	;
	
	if(itemList.length<=0){
		o+="没有可摘除宝石的装备";
	}else{		
		o+="<table width='100%'>"
		for(var i=0;i<itemList.length;i++){
			var ary = itemList[i].split("|");
			var k = ary[3];
			if(k.substring(ary[3].length-1,ary[3].length)==',')
			{
				k=k.substring(0,ary[3].length-1);
			}						
			var str = "<a href=# onclick=\"p.cmd('helptools "+ary[2]+"');\">"+ary[0]+"</a>"+'('+k+')';
			"<a href=# onclick=\"p.cmd('helptools "+ary[2]+"');\">"+ary[0]+"</a>"
			o+="<tr valign='middle'><td width='10%'><img src='"+ary[1]+"'/></td><td width='60%'>"+str+"</td><td width='20%'><a href=# onclick=\"cmd('use "+index+" "+ary[2]+"');offOpenWin('showBaoShiItem');return true;\">确定</a></td></tr>";
		}
		o+="</table>"
	}
	

	o+="</div>"
	+"</div>"
	+fakeBr(10);
	_openWin("showBaoShiItem",o);
}


function showBaoShiItem2(desc,baoshiList,index,baoshiIndex)
{
		var winObj=_getWin("showBaoShiItem2");
		onOpenWin(winObj);
		with(winObj.style){
			width="270";
			height="10";
			if(p.eventY<0){
				top=1;
			}else{
				top=p.eventY;
			}
			if(p.eventX-210<0){
				left=1;
			}else{
				left=p.eventX-210;
			}
			overflowY="";
			display='';
		}

		var o="<div style='padding-top:2px;'>"	
			+"<div style='margin-top:6px;margin-bottom:3px;'>请选择要摘除的宝石： </div>"
			
			+"<div style='margin-left:10px;'>";
			+(baoshiList.length>0?"<div style='margin-left:10px;margin-top:5px;'>":"")
			;
			
			if(baoshiList.length<=0){
				o+="没有可摘除的宝石";
			}else{		
				o+="<table width='100%'>"
				for(var i=0;i<baoshiList.length;i++){
					var ary = baoshiList[i].split("|");
				    var str = ary[1]+ ' ';				    
					o+="<tr valign='middle'><td width='10%'><img src='"+ary[0]+"'/></td><td width='60%'>"+str+"</td><td width='20%'><a href=# onclick=\"confirmBaoShiZhaiChu('"+index+"','"+baoshiIndex+"','"+ary[2]+"');return true;\">确定</a></td></tr>";
				}
				o+="</table>"
			}
			

			o+="</div>"
			+"</div>"
			+fakeBr(10);
			_openWin("showBaoShiItem2",o);

}


//列出技能可镶嵌的符文
function showFuWenItem(skillName,yiQian,canOpen){ 

	offOpenWin('skillsubs')
	var winObj=_getWin("showFuWenItem");
	onOpenWin(winObj);
	with(winObj.style){
		width="320";
		height="320";
		
		
	}
	var o="";
	o=o+"<style type=\"text/css\">"+   
           ".tabBG {background: url(/img/itemlogo/fuwen/fuWenBG.jpg) no-repeat;}"+
           ".sy1 {font-size:12px;font-weight:bold}"+
         "</style>  ";
	
	o+="<br>";	
	o+="<div class='tabBG'>";	
	o+="<table height='300' width='300'>";	
	if(canOpen=='true')
	{
	    o+="<tr height='30'><td align='center'></td><td align='center'></td><td align='center'></td><td align='center' width='60'><a href=# onclick=\"cmd('equipskillFuWens "+skillName+" " +"1')\"><div id='item1' class='sy1'>空</div></a></td><td></td><td></td><td></td></tr>";
		o+="<tr height='25'><td align='center'></td><td align='center' valign='top' width='60'><a href=# onclick=\"cmd('equipskillFuWens "+skillName+" " +"2')\"><div id='item2' class='sy1'>空</div></a></td><td align='center'></td><td align='center'></td><td align='center'></td><td align='center' valign='top' width='60'><a href=# onclick=\"cmd('equipskillFuWens "+skillName+" " +"3')\"><div id='item3' class='sy1' >空</div></a></td><td align='center'></td></tr>";
		o+="<tr height='28'><td align='center'></td><td align='center' valign='bottom' width='60'><a href=# onclick=\"cmd('equipskillFuWens "+skillName+" " +"4')\"><div id='item4' class='sy1'>空</div></a></td><td align='center'></td><td align='center' valign='top' width='60'><a href=# onclick=\"cmd('equipskillFuWens "+skillName+" " +"5')\"><div id='item5' class='sy1'>空</div></a></td><td></td><td align='center' valign='bottom' width='60'><a href=# onclick=\"cmd('equipskillFuWens "+skillName+" " +"6')\"><div id='item6' class='sy1' >空</div></td></a><td align='center'></td></tr>";
		o+="<tr height='25'><td align='center'></td><td align='center'></td><td align='center'></td><td align='center' valign='bottom' width='60'><a href=# onclick=\"cmd('equipskillFuWens "+skillName+" " +"7')\"><div id='item7' class='sy1' class='sy1'>空</div></a></td><td></td><td align='center'></td><td align='center'></td></tr>";
		o+="<tr height='25'><td align='center'></td><td align='center'></td><td align='center'></td><td align='center'></td><td></td><td align='center'></td><td align='center'></td></tr>";
	}else{
		o+="<tr height='30'><td align='center'></td><td align='center'></td><td align='center'></td><td align='center' width='60'><div id='item1' class='sy1'>空</div></td><td></td><td></td><td></td></tr>";
		o+="<tr height='25'><td align='center'></td><td align='center' valign='top' width='60'><div id='item2' class='sy1'>空</div></td><td align='center'></td><td align='center'></td><td align='center'></td><td align='center' valign='top' width='60'><div id='item3' class='sy1' >空</div></td><td align='center'></td></tr>";
		o+="<tr height='28'><td align='center'></td><td align='center' valign='bottom' width='60'><div id='item4' class='sy1'>空</div></td><td align='center'></td><td align='center' valign='top' width='60'><div id='item5' class='sy1'>空</div></td><td></td><td align='center' valign='bottom' width='60'><div id='item6' class='sy1' >空</div></td><td align='center'></td></tr>";
		o+="<tr height='25'><td align='center'></td><td align='center'></td><td align='center'></td><td align='center' valign='bottom' width='60'><div id='item7' class='sy1' class='sy1'>空</div></td><td></td><td align='center'></td><td align='center'></td></tr>";
		o+="<tr height='25'><td align='center'></td><td align='center'></td><td align='center'></td><td align='center'></td><td></td><td align='center'></td><td align='center'></td></tr>";
	
	}
	o+="</table>";
	o+="</tr></table>";
	o+="</div>";		
	_openWin("showFuWenItem",o);
	
	if(yiQian!="")
	{
		var ary = yiQian.split(",");		
		if(ary.length>0)
		{
			for(var i=0;i<ary.length;i++){
			    var temp = ary[i].split("|");
			    var ob = document.getElementById("item"+temp[1]);	
			    ob.innerHTML=temp[0];
			}			
		}
	}	
}

//列出技能可镶嵌的符文
function showKeQianFuWenItem(fuWenNames,skillName,post){ 

	offOpenWin('skillsubs')
	var winObj=_getWin("showKeQianFuWenItem");
	with(winObj.style){
		width="270";
		height="80";
		if(p.eventY<0){
			top=1;
		}else{
			top=p.eventY;
		}
		if(p.eventX-210<0){
			left=1;
		}else{
			left=p.eventX-210;
		}
		overflowY="";
		display='';
	}
	onOpenWin(winObj);
	var o="<div>";		
	if(fuWenNames!="")
	{
		var ary = fuWenNames.split(",");		
		if(ary.length>0)
		{
			o+="<div>可镶嵌符文</div>";			
			o+="<table>";		
			for(var i=0;i<ary.length;i++){				
				o+="<tr><td>"+ary[i]+"&nbsp;<a href=# onclick=\"cmd('equipskillFuWens "+ary[i]+" "+skillName+" " +post+"');offOpenWin('showKeQianFuWenItem')\">镶嵌</a></td></tr>";
			}			
			o+="</table>";
		}	
	
	}else{
		o+="没有可镶嵌的符文";	
	}	
	o+="</div>";
	_openWin("showKeQianFuWenItem",o);
}

function showConfirmFuWenItem(fuWenName,skillName,post,yuanName)
{
	if(yuanName!="空")
	{
		if(confirm('是否用'+fuWenName+'将已安装的'+yuanName+'替换掉？'))
		{	
		   cmd('equipskillFuWens '+fuWenName+' '+skillName+' '+post +' '+yuanName);
		   return;		  
		}	
	}else{		
		 cmd('equipskillFuWens '+fuWenName+' '+skillName+' '+post+' '+yuanName);
		 return;
	}	
}


function confirmBaoShiZhaiChu(arg1,arg2,arg3)
{
	if(confirm('摘除操作将解除您的选定的装备配饰，并将卸下的宝石与您绑定，您确定么？'))
	{	
	   cmd('use '+arg1+' '+arg2+' '+arg3);
	   offOpenWin('showBaoShiItem2');
	}

}


function createCmd(index){
	var t = "use ";
	t += index;
	t +=" ";
	t+= getObj('giveToShowUserIndex').innerHTML;
	return t;
}

//列出孔
function showKong(eyeletO,kongIndex,targetItemIndex){ 
	var winObj=_getWin("showKongWin");
	onOpenWin(winObj);
	with(winObj.style){
		width="210";
		height="10";
		if(p.eventY<0){
			top=1;
		}else{
			top=p.eventY;
		}
		if(p.eventX-210<0){
			left=1;
		}else{
			left=p.eventX-210;
		}
		overflowY="";
		display='';
	}
	var o="<div style='padding-top:2px;'>"
	+"<img src='img/itemlogo/other/mm/QiangLiRongJi.gif'> <b>选择要失效的孔：</b><br>"
	+"<div style='margin-top:6px;margin-bottom:3px;'>选择孔： <span id=showKongUser style='color:red;margin-right:5px'></span><span id=showKongUserIndex style='display:none'></span> <a href=#  onclick=\"cmd(createCmd1("+kongIndex+","+targetItemIndex+"));offOpenWin('showKongWin');return false;\"  id=showKonggiveBar style=\"display:none;\">[确定]</a></div>"
	
	+"<div style='margin-left:10px;'>";
// alert(o);
	var list = eyeletO.split(",");
	if(list.length<=0){
		o+="没有可选的孔。";
	}else{
		for(var j=0;j<list.length;j++){
			var ary = list[j].split("#");
			if(ary.length==3){
				var imgsrc = "";
				if(ary[1]=="体力"){
					imgsrc = "img/button/TiLi.gif";
				}else if(ary[1]=="智力"){
					imgsrc = "img/button/ZhiLi.gif";				
				}else if(ary[1]=="力量"){
					imgsrc = "img/button/LiLiang.gif";
				}
				o+="<a href=# onclick=\"getObj('showKongUser').innerHTML='孔"+ary[0]+"';getObj('showKongUserIndex').innerHTML='"+ary[0]+"';getObj('showKonggiveBar').style.display='';\"><img src="+imgsrc+" border=0 /><b><font color=green>(+"+ary[2]+")</font></b></a><br>";
				// o+="<input type='radio' name='kong' id=''
				// value='"+ary[0]+"'/> "+ary[1]+"+"+ary[2];
				o+="</br>";
				// alert(o);
			}
		}
	}
	
	o+="</div>"
	+"</div>"
	+fakeBr(10);
	_openWin("showKongWin",o);
}

function createCmd1(index,targetItemIndex){
	var t = "use ";
	t += index;
	t +=" ";
	t += targetItemIndex;
	t +=" ";
	t+= getObj('showKongUserIndex').innerHTML;
	return t;
}

//二次密码认证
function showSecondCode(picStr,aPetName,msg){	
	var winName="showSecondCodeWin";
	var winObj=_getWin(winName);
	try{
		if(winObj.style.display!=""){
			with(winObj.style){
				position="absolute";
				top=p.eventY+80;
				left=p.eventX+80;
				width="266";
				height="123";
				overflowY="";
			}
		}
	}catch(x){alert(x);}
	onOpenWin(winObj);
	var str=fakeBr(6);
	str+="<a href=# onclick=\"p.cmd('pet');return false;\"><img src='"+picStr+"' border=0></a> "+aPetName+":<br>"+fakeBr(2);	
	str+="<div style='background-color:#E4E4E4;height:100;margin-right:5px;margin-bottom:5px;padding:9px;line-height:14pt;'>　"+msg+" <a href=# onclick=\"showInputDetail();return false;\" target=_blank><u>设置二级密码</u></a></div>";
	str = str 
		+"<div style='text-align:right;padding-right:4px;'>"
		+"<input type=checkbox "+(openDisSecondCode?"checked":"")+" id=secondCodeWinNoShow onclick='_changeSecondCodeWinNoShow(this.checked);'><label for=secondCodeWinNoShow>以后不再显示</label>&nbsp;&nbsp;&nbsp;&nbsp;"
		+"<a href=# onclick=\"getObj('showSecondCodeWin').style.display='none';if(exitSecondCodeWinSave){_saveSet();}return false;\"><u>知道了</u></a>"
		+"</div>"
	_openWin(winName,str);
}
var exitSecondCodeWinSave=false;
function _changeSecondCodeWinNoShow(show){
	openDisSecondCode=show;
	exitSecondCodeWinSave=true;
}
function showHasSecondCode(b){
	var bg=document.getElementById("secondCodeBG");
	var inputbg = document.getElementById("secondCodeCommandBG");
	if(b){
		bg.style.display="";
		inputbg.style.display="";
	}else{
		bg.style.display="none";
		inputbg.style.display="none";
		document.getElementById("secondcodeinput").value='';
	}
}
function showCampWindows(b){
	var bg=document.getElementById("secondCodeBG");
	var inputbg = document.getElementById("campCommandBG");
	if(b){
		bg.style.display="";
		inputbg.style.display="";
	}else{
		bg.style.display="none";
		inputbg.style.display="none";		
	}
}
//个人性息
function showPersonDetail(msg){	
	var winName = "showPersonDetailWin";
	var winObj = _getWin(winName);
	try{
		if(winObj.style.display!=""){
			with(winObj.style){
				position="absolute";
				top="100";
				left="100";
				width="270";
				height="358";
				overflowY="";
			}
		}
	}catch(x){alert(x);}
	onOpenWin(winObj);	
	var str=fakeBr(6);
	msg = "无法显示";
	str+="<div style='background-color:#E1E1E1;height:338;margin-right:5px;margin-top:10px;margin-bottom:5px;padding:9px;line-height:14pt;'>　"+msg+" </div>";
	_openWin(winName,str);
}
function showInputDetail(){
	showTime = new Date();
	window.open('/person/box.jsp;jsessionid='+sessionId+'?'+(showTime?"action=checkTime&":"")+new Date(),'','menubar=no,toolbar=no,location=no,directories=no,status=no,width=446,height=520,left='+(p.event.screenX-360)+',top='+p.event.screenY+',scrollbars=yes');
}
//二次密码认证

function revealPutNum(name){
	var input = prompt('输入展示的数量','全部');
	if((input!='全部'&&input<0)||input==''){
		alert("请输入正确的数量");
		return;
	}
	if(input!=null){
		cmd("reveal "+name+" "+input);
	}
}

function inputCaiPiaoQuantity(arg){
	var input = prompt('输入要兑换的数量','全部');
	if((input!='全部'&&input<0)||input==''){
		alert("请输入正确的数量");
		return;
	}
	
	if(input!=null){
		cmd(arg+" "+input);
	}
}

function lunpanjiangli(){
	window.open("/lunpan/index.jsp","_blank","height=150,width=500,status=no,toolbar=no,menubar=no,location=no");
}


//pvp
function sellpvpequip(listArr){
	var winObj=_getWin("listSellTools");
	onOpenWin(winObj);
	var o="";
	o+=fakeBr(4)
	// for tags select
	o+="<br>";
	o+="<table border=0 style='margin-top:3px;margin-bottom:6px;' width=100%>";
	for(var i=0;i<listArr.length;i++){
			o+="<tr><td><img src="+listArr[i][3]+"></td><td><a href=# onclick=\"p.cmd('helptools "+listArr[i][2]+"');\">"+listArr[i][0]+"</a></td><td width=10></td><td>"+listArr[i][1]+"</td><td width=10></td><td>"+listArr[i][6]+"<img src='/img/itemlogo/rongyudianshu.gif'></td><td>"+listArr[i][7]+"<img src='/img/itemlogo/rongyuhuizhang.gif'></td><td>&nbsp<a href=# onclick=\"p.buyPvpItem('"+listArr[i][4]+"','"+listArr[i][2]+"',"+listArr[i][8]+");return false;\"><font color=blue>【买】</font></a></td></tr>";
		}
	o+="</table>";
	_openWin("listSellTools",o);

}

function buyPvpItem(item,path,key){
		if(confirm('确认要购买 ['+item+'] ?')){
			cmd("buypvp "+path+" "+key);
		}
}

function showFriend(id){
	if(document.getElementById(id).style.display == "block"){
	document.getElementById(id).style.display = "none";
	}else{
	document.getElementById(id).style.display = "block";
	}
}
function showCanUseYuanSuJingHuaItem(arg,arr){
	
	var winObj=_getWin("selItemCanUseYuanSuJingHua");
	onOpenWin(winObj);
	with(winObj.style){
		width="200";
		height="10";
		if(p.eventY-13<0){
			top=1;
		}else{
			top=p.eventY-13;
		}
		if(p.eventX-200+13<0){
			left=1;
		}else{
			left=p.eventX-200+13;
		}
		overflowY="";
		display='';
	}
	var o=fakeBr(2)+"<font color=#006A6A>选择用元素精华升级的道具</font>"+fakeBr(4);

	for(var i=0;i<arr.length;i++){
		o+="<a href=# onclick=\"cmd('helptools "+arr[i][1]+"');hideParentMenu();return false;\">"+arr[i][2]+"</a> "+"&nbsp;&nbsp;&nbsp;     <a href=# onclick=\"if (confirm('你想让"+arr[i][0]+"(等级"+arr[i][3]+")变得更强大吗？这会有一定危险性的！')){cmd('use "+arg+" "+arr[i][1]+" "+arr[i][0]+"');offOpenWin('selItemCanUseYuanSuJingHua');return false;}\">使用元素精华</a><br>";
	}
	_openWin("selItemCanUseYuanSuJingHua",o);
}

function showNvWangZhuFuItem(arg,arr){
	
	var winObj=_getWin("selItemCanUseNvWangZhuFu");
	onOpenWin(winObj);
	with(winObj.style){
		width="200";
		height="10";
		if(p.eventY-13<0){
			top=1;
		}else{
			top=p.eventY-13;
		}
		if(p.eventX-200+13<0){
			left=1;
		}else{
			left=p.eventX-200+13;
		}
		overflowY="";
		display='';
	}
	var o=fakeBr(2)+"<font color=#006A6A>选择用女王的祝福的道具</font>"+fakeBr(4);

	for(var i=0;i<arr.length;i++){
		o+="<a href=# onclick=\"cmd('helptools "+arr[i][1]+"');hideParentMenu();return false;\">"+arr[i][2]+"</a> "+"&nbsp;&nbsp;&nbsp;     <a href=# onclick=\"cmd('use "+arg+" "+arr[i][1]+" "+arr[i][0]+"');offOpenWin('selItemCanUseNvWangZhuFu');return false;\">使用女王的祝福</a><br>";
	}
	_openWin("selItemCanUseNvWangZhuFu",o);
}

// Edit by Coolin 去掉弹出框的关闭按钮
function _openWin2(name,body){
	var winObj=_getWin(name);
	var o="";
	if(name=="skills"){
		o+="<font style='cursor:hand' onclick=\"cmd('skills');\" title=点我刷新><img src=/img/button/w_1.gif></font> "
	}else if(name=="tools"){
		o+="<font style='cursor:hand' onclick=\"cmd('i');\" title=点我刷新><img src=/img/button/w_1.gif></font> "
	}else if(name=="petinfo"){
		o+="<font style='cursor:hand' onclick=\"cmd('pet');\" title=点我刷新><img src=/img/button/w_1.gif></font> "
	}else if(name=="onlineUsers"){
		o+="<font style='cursor:hand' onclick=\"cmd('who');\" title=点我刷新><img src=/img/button/w_1.gif></font> "
	}else if(name=="listStoreTools"){
		o+="<font style='cursor:hand' onclick=\"cmd('getItems');\" title=点我刷新><img src=/img/button/w_1.gif></font> "
	}else if (name=="composeSkill"){
		o+="<font style='cursor:hand' onclick=\"cmd('composeSkill');\" title=点我刷新><img src=/img/button/w_1.gif></font> "
	}else if (name=="consignList"){
		o+="<font style='cursor:hand' onclick=\"cmd('consignList');\" title=点我刷新><img src=/img/button/w_1.gif></font> "
	}else if (name=="taskWin"){
		o+="<font style='cursor:hand' onclick=\"cmd('showTask');\" title=点我刷新><img src=/img/button/w_1.gif></font> "
	}else if (name=="amityWin"){
		o+="<font style='cursor:hand' onclick=\"cmd('foo amity');\" title=点我刷新><img src=/img/button/w_1.gif></font> "
	}else if(name=="roomTaskWin"){
		o+="<font style='cursor:hand' onclick=\"cmd('showRoomTask all');\" title=点我刷新><img src=/img/button/w_1.gif></font> "
	}else if(name=="roomJobWin"){
		o+="<font style='cursor:hand' onclick=\"cmd('listJob');\" title=点我刷新><img src=/img/button/w_1.gif></font> "
	}

	var addHide="";
	if(name!="vimg"&&name!="dealWin" && name!="composeWin"&& name!="allotItem" && name !="fetchSelOcp"){
		var closeEvent="";
		if(winObj.closeEvent){
			closeEvent=winObj.closeEvent;
		}
		//addHide="<a style='cursor:hand;' hidefocus=true onclick=\"offOpenWin('"+name+"');"+closeEvent+";return false;\" title='点我隐藏'><img src=/img/button/w_3.gif></nobr></a>";
	}else if(name=="dealWin"){
		addHide="&nbsp;";
	}
	if(name!="petInfoWin"&&name!="selInnerOrGet" && name!="petHelpWin"){
		o+="<a style='cursor:move' title=按住我拖动 onmousedown=\"drags(_getWin('"+name+"'));\" onmouseup='dragapproved=false;'><img src=/img/button/w_2.gif></a>";
	}
	winObj.innerHTML="<table width='1' align=right cellpadding='0' cellspacing='0'><tr><td><nobr>"+o+" "+addHide+"</td></tr></table>"+body;
	// myAbb='canDrag' dragObj='"+name+"'
	// onmousedown=\"drags(_getWin('"+name+"'));\"
	// document.onmousedown=drags;
	// document.onmouseup=new Function("dragapproved=false");

}

// 钢铁护甲片精练显示列表 Edit by Coolin
function ListWeapon(desc,itemName,pic,itemList,index)
{
	var winObj=_getWin("listWeaponWin");
	onOpenWin(winObj);
	with(winObj.style){
		width="210";
		height="10";
		if(p.eventY<0){
			top=1;
		}else{
			top=p.eventY;
		}
		if(p.eventX-210<0){
			left=1;
		}else{
			left=p.eventX-210;
		}
		overflowY="";
		display='';
	}
	var o="<div style='padding-top:2px;'>"
	+"<img src="+pic+"> <b>"+desc+"：</b><br>"
	+"<div style='margin-top:6px;margin-bottom:3px;'><a href=#  onclick=\"cmd(getToolsHelp());return false;\"><span id=listWeapon style='color:red;margin-right:5px'></span></a><span id=giveToShowUserIndex style='display:none'></span><a href=#  onclick=\"cmd(createCmd("+index+"));offOpenWin('listWeaponWin');return false;\" id=listWeaponBar style=\"display:none;\">[确定]</a></div>"
	+"<div style='margin-left:10px;'>";
	+(itemList.length>0?"<div style='margin-left:10px;margin-top:5px;'>":"");
	
	if(itemList.length<=0)
	{
		o+="没有可精练的装备";
	}
	else
	{
		for(var i=0;i<itemList.length;i++)
		{
			var ary = itemList[i].split("|");
			o+="<img src='"+ary[1]+"'/>&nbsp;&nbsp;&nbsp;<a href=# onclick=\"getObj('listWeapon').innerHTML='"+ary[0]+"';getObj('giveToShowUserIndex').innerHTML='"+ary[2]+"';getObj('listWeaponBar').style.display='';\">"+ary[0]+"</a><br>";
		}
	}
	o+="</div></div>"+fakeBr(10);
	_openWin("listWeaponWin",o);
}

// 钢铁护甲片精练 显示对选中装备的[说明]操作 Edit By Coolin
function getToolsHelp()
{
	var index = getObj('giveToShowUserIndex').innerText;
	if (index==null||index==''||index=='undefined')
	{
		return;
	}
	return "helptools "+index;
}

function showCanUseTuGaiYeItem(arg,arr){
	
	var winObj=_getWin("selItemCanUseTuGaiYe");
	onOpenWin(winObj);
	with(winObj.style){
		width="200";
		height="10";
		if(p.eventY-13<0){
			top=1;
		}else{
			top=p.eventY-13;
		}
		if(p.eventX-200+13<0){
			left=1;
		}else{
			left=p.eventX-200+13;
		}
		overflowY="";
		display='';
	}
	var o=fakeBr(2)+"<font color=#006A6A>选择用溜的滑涂改液的道具</font>"+fakeBr(4);

	for(var i=0;i<arr.length;i++){
		o+="<a href=# onclick=\"cmd('helptools "+arr[i][1]+"');hideParentMenu();return false;\">"+arr[i][2]+"</a> "+"&nbsp;&nbsp;&nbsp;     <a href=# onclick=\"cmd('use "+arg+" "+arr[i][1]+" "+arr[i][0]+"');offOpenWin('selItemCanUseTuGaiYe');return false;\">使用溜的滑涂改液</a><br>";
	}
	_openWin("selItemCanUseTuGaiYe",o);
}
function showCanUseGongJiangKeDaoItem(arg,arr){
	
	var winObj=_getWin("selItemCanUseGongJiangKeDao");
	onOpenWin(winObj);
	with(winObj.style){
		width="200";
		height="10";
		if(p.eventY-13<0){
			top=1;
		}else{
			top=p.eventY-13;
		}
		if(p.eventX-200+13<0){
			left=1;
		}else{
			left=p.eventX-200+13;
		}
		overflowY="";
		display='';
	}
	var o=fakeBr(2)+"<font color=#006A6A>选择用工匠刻刀的道具</font>"+fakeBr(4);

	for(var i=0;i<arr.length;i++){
		o+="<a href=# onclick=\"cmd('helptools "+arr[i][1]+"');hideParentMenu();return false;\">"+arr[i][2]+"</a> "+"&nbsp;&nbsp;&nbsp;     <a href=# onclick=\"inputstr('"+arg+"','"+arr[i][1]+"','"+arr[i][0]+"');offOpenWin('selItemCanUseGongJiangKeDao');return false;\">使用工匠刻刀</a><br>";
	}
	_openWin("selItemCanUseGongJiangKeDao",o);
}
function inputstr(arg,a1,a0){
	var inputStr=prompt("请输入要在道具与装备下加入的自定义文字(不超过12个字)","");		
	if (inputStr!=null&&inputStr.trim().length<=12&&inputStr.trim()!=""){
		inputStr=inputStr.trim();
		p.cmd("use "+arg+" "+a1+" "+a0+" "+inputStr);
	}else if(inputStr.trim().length>12){
	alert("您输入的文字过长，无法刻字！");
	}else if(inputStr.trim()==""){
	alert("请输入要刻的文字！");
	}
}
// 使用[小扑整形锤]道具，改变用户头像 Edit by Coolin
function changeFace(itemName,pic,itemIndex,picLst){ //将itemName转让给当前场景的生物
	var winObj=_getWin("giveToWin");
	onOpenWin(winObj);
	with(winObj.style){
		width="210";
		height="10";
		if(p.eventY<0){
			top=1;
		}else{
			top=p.eventY;
		}
		if(p.eventX-210<0){
			left=1;
		}else{
			left=p.eventX-210;
		}
		overflowY="";
		display='';
	}

	var o="<div style='padding-top:2px;'>"
	+"<img src="+pic+"> <b>"+itemName+"</b><br>"
	+"<div style='margin-top:6px;margin-bottom:3px;'>请选择新头像: <img id=giveToShowUser src='' picpath='' style='display:none'><a href=# onclick=\"_changeFace("+itemIndex+",getObj('giveToShowUser').picpath);return false;\" id=giveBar>[确定]</a></div>"
	+"<div style='margin-left:10px;'>";

	for(var i=0;i<picLst.length;i++)
	{
		if (i%3==0)
		{
			o += '<br/>';
		}
		o+="<a href=# onclick=\"getObj('giveToShowUser').style.display='';getObj('giveToShowUser').picpath='"+picLst[i]+"';getObj('giveToShowUser').src='"+picLst[i]+"';return false;\"><img src="+picLst[i]+" border=0 /></a>";
	}

	o+="</div></div>"
	+fakeBr(10);
	_openWin("giveToWin",o);
}
function _changeFace(iIndex,pic)
{
	//alert(iIndex+" "+pic)

	if(pic==null||pic=="")
	{
		alert("请选择头像!");
		return false;
	}
	else
	{
		//alert (pic);
		mapWin.changeLogo(pic);
		cmd("use "+iIndex+" "+pic);
		offOpenWin("giveToWin");
	}
}

//////////////////////////////////////////////////////////////////////
// 同时修改look命令执行的函数，添加函数showReveal() Edit By Coolin
function _petinfo(petBatteEffect,petId,petName,petLv,petExp,petNextExp,HPWidth,HP,maxHP,SPWidth,SP,maxSP,
	pstr,pdex,pvit,pint,pspi,
	patk,pdef,pmatk,pmdef,BangHitRate,aspd,lookLv,
	addPoint,zili,guaJi,
	minDamage,maxDamage,
	ordernum,
	redName,
	married,marryUser,marryPet,xindong,xinnum,
	equipSkills,
	equipItems,
	zqequips,
	equipArr,
	autoHide,
	sortNum,
	magicBang,
	revealItems,
	creerTitle,
	xingYunZhi,
	fate,
	chengjiu,    //Add by zjm
	isVIP,    //Add by zjm
    shls,shlsmaxnum
    ,shenzhuangimg
    ,tishen
    ,tishenequips
	){
		if(autoHide==1&&_getWin("petinfo").style.display=="none"){
			return;
		}

		if(autoHide==2&&_getWin("petinfo").style.display!="none"){//点击弹出，再点
			offOpenWin("petinfo");
			return;
		}
  
		var isRed=redName[0]!=-1;

		onOpenWin(_getWin("petinfo"));
		var o="<a href=# onclick=\"cmd('subs');return false;\"><font color=blue>[技能]</font></a>";
		o+="<a href=# onclick=\"cmd('composeSkill');return false;\"><font color=blue>[合成]</font></a> ";
		o+="<a href=# onclick=\"cmd('foo amity');return false;\"><font color=blue>[关系]</font></a> ";
		// o+="<a href=# onclick=\"cmd('dealOfflineExp');return false;\"><font
		// color=blue>[离线经验]</font></a> ";
		o+="<a href=# onclick=\"cmd('showExpAward');return false;\"><font color=blue>[经验奖励]</font></a> ";
		o+="<a href=# onclick=\"cmd('showJingMai');return false;\"><font color=blue>[经脉]</font></a> ";
		o+="<a href=# onclick=\"cmd('xiuxiancmd showxiuxian');return false;\"><font color=blue>[修仙]</font></a> ";
		o+="<a href=# onclick=\"cmd('liandan showliandanpro');return false;\"><font color=blue>[炼丹属性]</font></a> ";
		o+="<a href=# onclick=\"cmd('qixingcmd showqixing');return false;\"><font color=blue>[七星连珠]</font></a> ";
		if(petLv >= 40)
			o+="<a href=# onclick=\"cmd('dj show');return false;\"><font color=blue>[渡劫]</font></a> ";
		if(petLv >= 40){
			o+="<a href=# onclick=\"cmd('lilian show');return false;\"><font color=blue>[历练]</font></a>";
		}
		if (creerTitle != '')
		{
			o+="<a href=# onclick=\"cmd('career');return false;\"><font color=blue>[称号]</font></a> ";
		}
		if (isVIP && isVIP!=null && isVIP!="null" && isVIP=='isvip')
        {
			o+="<a href=# onclick=\"cmd('showVIP');return false;\"><font color=#FF4000>[VIP]</font></a> ";
        }
		o+="<br><table width='100%' border='0' cellpadding='0' cellspacing='0' style='margin-top:3px;margin-right:5px;margin-bottom:5px;'>";
		o+="<tr><td valign=top>";

		// ////////

		o+="	<table width='235' border='0' align='center' cellpadding='0' cellspacing='1' bgcolor='#BCBCBC'>";
		o+="	<tr><td bgcolor='#E1E1E1' style='padding-top:8px;padding-bottom:10px;padding-left:22px;padding-right:22px;'>";
		
		// /////显示运势相关 Add by zjm
		if (fate&&fate!=null&&fate!="null"&&fate!='br') {
		    var yunshi=fate.split('@');
			if (yunshi[0]=='凶' ) {
				o+="<font color=black>今日运势:</font>【凶：霉运缠身】<br/>"; 
			}else if (yunshi[2]=='无' || yunshi[2]=='') {
				o+="<font color=black>今日运势:</font>【 "+yunshi[0]+" 】<br/>";
			}else if (yunshi[4]=='' && yunshi[2]!='无' && yunshi[2]!='') {
				o+="<font color=black>今日运势:</font>【"+yunshi[0]+"】<font color=black>关键词:</font> <span>【"+yunshi[2]+"】</span><br/>"; // Add
																																	// by
																																	// zjm
			}else{
				o+="<font color=black>今日运势:</font> <span style='cursor:pointer;' onmouseover=this.title=\""+yunshi[1]+"\">【"+yunshi[0]+"】</span>  <font color=black>关键词:</font> <span style='cursor:pointer;' onmouseover=this.title=\""+yunshi[3]+",持续时间"+yunshi[4]+"\">【"+yunshi[2]+"】</span><br/>"; // Add
																																																																										// by
																																																																										// zjm
			}
		}
        //////end by zjm
		o+="<b>"+(isRed?"<font color=red>":"")+petName+"</font></b> ";
		o+=(isRed?"<font color=red>(<b>"+redName[0]+"</b> "+redName[1]+")</font> ":"");
		o+="<a href=# onclick='p.cmd(\"foo petTalk 1\");return false;'><img src='/img/button/t.gif' border=0 title='与"+petName+"聊聊'></a>　";
		o+="<font color=#2747A7>"+petExp+" <font face=arial style='font-size:7.5pt;'>Lv <font color=red><b>"+petLv+"</b></font></font><br>"+creerTitle;
		// 战斗力
		o+="<a href='#' onclick=\"cmd('zhandouli s "+petId+"')\" style='cursor:pointer;' >战斗力:"+petBatteEffect+"</a>";
		o+="<hr size=1 color='#BCBCBC' width='100%'>";
		o+="<table width='100%' border='0' cellpadding='1' cellspacing='0' style='";
		var t=0;

		t=_getAddStr(equipArr["力量"]);
		o+="'><tr><td title='"+t+"'>力量: <font style='"+_getAddStrColor(t)+"'>"+pstr+"</font>";// <=Equip.getName("力量")>
		t=_getAddStr(equipArr["敏捷"]);
		o+="</td><td title='"+t+"'>敏捷: <font style='"+_getAddStrColor(t)+"'>"+pdex+"</font>";
		t=_getAddStr(equipArr["体力"]);
		o+="</td></tr><tr><td title='"+t+"'>体力: <font style='"+_getAddStrColor(t)+"'>"+pvit+"</span>";
		t=_getAddStr(equipArr["智力"]);
		o+="</td><td title='"+t+"'>智力: <font style='"+_getAddStrColor(t)+"'>"+pint+"</font>";
		t=_getAddStr(equipArr["精神"]);
		o+="</td></tr><tr><td title='"+t+"'>精神: <font style='"+_getAddStrColor(t)+"'>"+pspi+"</font>";
		o+="</td><td>";
		o+="</td></tr></table>";
		o+="<hr size=1 color='#BCBCBC' width='100%'>"
		+"<table width='100%' border='0' cellpadding='1' cellspacing='0'>"
		+"<tr><td width='50%'>伤害: <b><font color=#105E8B>"+minDamage+" - "+maxDamage+"</font></b></td>"
		+"<td width='50%'>秒伤: <font color=#FF4000>"+parseFloat(((minDamage+maxDamage)/2/aspd).toFixed(1))+"</font></td>"
		+"</tr>"
		+"<tr><td width='50%'>攻击: <font color=#F32C77>"+patk+"</font>"// "+_getAddStr(equipArr["攻击"])+"
		+"</td><td width='50%'>防御: <font color=#217081>"+pdef+"</font></td></tr>"// "+_getAddStr(equipArr["防御"])+"
		+"<tr><td width='50%'>重击: "+BangHitRate+"%"
		+"</td><td width='50%'>攻速: "+(aspd)+"</td></tr>"// "+_getAddStr(equipArr["攻速"])+"
		+"<tr>"
		+(petExp.indexOf("魔法师")==0?("<td width='50%'>法术重击: "+magicBang+"%</td>"):"")
		+"<td width='50%'  colspan=2>资历: <font color=green>"+parseInt(zili/1000/60/5)+"</font></td>"
		;
		/*
		 * if (sortNum>0){ o+="<td colspan=2>排名: "+sortNum+"</td>"; }
		 */
		o+="</tr>";
		if(xingYunZhi>0){
			o+="<tr><td width='50%'>幸运: <b><font color=red>"+xingYunZhi+"</b></font></b></td>"
			+"<td width='50%' colspan=2> <font color=green></font></td></tr>";
		}
		if(guaJi>0){
			o+="<tr><td width='50%'>Shoot: <b><font color=#000000><b>"+guaJi+"</b></font></b></td>"
			+"<td width='50%' colspan=2> <font color=green></font></td></tr>";
		}//ordernum
		if(married){
			o+="<tr><td colspan=2>配偶: <font color=#E100E1>"+marryPet+"</font></td></tr>";
			o+="<tr><td colspan=3>心动关系: "+getXinDongStr(xindong,xinnum)+" </td></tr>";
		}
		o+="</table>";
		
		if(chengjiu > 0){			
			o+="<table border=0 cellpadding='0' cellspacing='0' width='100%'>";
			t=getChenjiuStr(chengjiu);
			o+="<tr><td width='100%'>成就: "+t+" [<a href='#' onclick=showChengJiu() style='cursor:pointer;' >展开</a>]</td></tr>";
			o+="</table>";
		}

		if(isOpenPvp){
			o+="<hr size=1 color='#BCBCBC' width='100%'>";
			o+="<table border=0 cellpadding='0' cellspacing='0' width='100%'>";
			o+="<tr><td width='50%'>PVP荣誉: <b><font color=green><b>"+ordernum[0]+"</b></font></b></td>"
			+"<td width='50%' colspan=2> <font color=green></font></td></tr>";
			o+="<tr><td width='50%'>总杀人数: <b><font color=green><b>"+ordernum[1]+"</b></font></b></td>"
			+"<td width='50%' colspan=2> <font color=green></font></td></tr>";
			o+="<tr><td width='50%'>今日杀人数: <b><font color=green><b>"+ordernum[2]+"</b></font></b></td>"
			+"<td width='50%' colspan=2> <font color=green></font></td></tr>";
			o+="</table>";
		}
		//+"<hr size=1 color='#BCBCBC' width='100%'>"
		// +"<table width='100%' border='0' cellpadding='0' cellspacing='0'>"
		// +"</table>";
		if(equipItems.length>0)
		{
			o+="<hr size=1 color='#BCBCBC' width='100%'>";
			o+="<table border=0 cellpadding='0' cellspacing='0' width='100%'>";
			o+="<tr><td colspan=5 ><font title='当某件武器或装备的耐久到10%以下时，战斗后自动使用一个锉金石修理全身装备。'>自动修理<font>&nbsp;&nbsp;&nbsp;&nbsp;<input type=checkbox name=zdxlcheck "+(zidongxiuli?"checked":"")+"  onclick=onzidongxiuli();></td></tr>";
			var zuoqi="";
			for(var i=0;i<equipItems.length;i++)
			{
				var k=equipItems[i][1];			
			
				if(k.indexOf("坐骑")!=-1){
					zuoqi=equipItems[i];
					continue;
				}
				if(k.substring(equipItems[i][1].length-1,equipItems[i][1].length)==',')
				{
					k=k.substring(0,equipItems[i][1].length-1);
				}
				o+="<tr height=24><td width=24><img src="+equipItems[i][2]+"></td><td width=4></td><td><a href=# onclick=\"p.cmd('helptools se_"+equipItems[i][5]+"');return false;\">"+equipItems[i][0]+"</a>("+k+") </td><td><a href=# onclick=\"p.cmd('removeequip "+equipItems[i][5]+"');return false;\" title=卸除><img src=/img/t3.gif border=0></a></td><td><a href=# onclick=\"showItemName("+equipItems[i][5]+",'equic');return false;\" title=秀><img src=/img/xiu.gif border=0></a></td><td>"+(equipItems[i][3]?"<a href=# onclick=\"putCut('use}}"+equipItems[i][4]+"','"+equipItems[i][2]+"');return false;\" title=快捷><img src=/img/kuaijie.gif border=0></a>":'')+"</td></tr>";// equipItems[i][0]
				
			}
			o+="</table>";
			if(zuoqi!=""){
				if(equipItems.length>1){
					o+="<hr size=1 color='#BCBCBC' width='100%'>";
				}
				o+="<table border=0 cellpadding='0' cellspacing='0' width='100%'>";
				o+="<tr height=24><td width=24><img src="+zuoqi[2]+"  ></td><td width=4></td><td><a href=# onclick=\"p.cmd('helptools se_"+zuoqi[5]+"');return false;\">"+zuoqi[0]+"</a>("+zuoqi[1]+") </td><td><a href=# onclick=\"p.cmd('removeequip "+zuoqi[5]+"');return false;\" title=卸除><img src=/img/t3.gif border=0></a></td><td><a href=# onclick=\"showItemName("+zuoqi[5]+",'equic');return false;\" title=秀><img src=/img/xiu.gif border=0></a></td><td>"+(zuoqi[3]?"<a href=# onclick=\"putCut('use}}"+zuoqi[4]+"','"+zuoqi[2]+"');return false;\" title=快捷><img src=/img/kuaijie.gif border=0></a>":'')+"</td></tr>";// equipItems[i][0]
				
				o+="</table>";
				o+="<table border=0 cellpadding='0' cellspacing='0' width='100%'>";
				if(zqequips.length>0){
					for(var i=0;i<zqequips.length;i++)
					{	
						var k=zqequips[i][1];	
						if(k.substring(zqequips[i][1].length-1,zqequips[i][1].length)==',')
						{
							k=k.substring(0,zqequips[i][1].length-1);
						}
						o+="<tr height=24><td width=24><img src="+zqequips[i][2]
							+"></td><td width=4></td><td><a href=# onclick=\"p.cmd('helptools se_"
							+zqequips[i][5]+"');return false;\">"+zqequips[i][0]+"</a>("+k
							+") </td><td><a href=# onclick=\"p.cmd('removeequip "+zqequips[i][5]
							+"');return false;\" title=卸除><img src=/img/t3.gif border=0></a></td><td><a href=# onclick=\"showItemName("
							+zqequips[i][5]+",'equic');return false;\" title=秀><img src=/img/xiu.gif border=0></a></td><td>"
							+(zqequips[i][3]?"<a href=# onclick=\"putCut('use}}"+equipItems[i][4]
							+"','"+zqequips[i][2]+"');return false;\" title=快捷><img src=/img/kuaijie.gif border=0></a>":'')+"</td></tr>";
					}
				}
				o+="</table>";
			}
			
			
			
			//+"<br><b>装备技能</b>"
		}
			
		if(revealItems.length>0)
		{
			showReveal(revealItems,'petinfo');
		}
		else
		{
			// 关闭已打开窗口
			offOpenWin('showReveal');
		}

		if(shenzhuangimg != "")
		{
			showShenZhuang(shenzhuangimg,'petinfo');
		}

		if(shls.length>0)
		{
			showSHLs(shls,shlsmaxnum,'petinfo');
		}
		else
		{
			// 关闭已打开窗口
			offOpenWin('showSHL');
		}
		
		if(tishen.length > 0){
			showTiShen(tishenequips,shenzhuangimg,tishen,'petinfo') ;
		}else{
			offOpenWin('showTiShen') ;
		}


		if(equipSkills.length>0)
		{
			o+="<hr size=1 color='#BCBCBC' width='100%'>";
			o+="<table border=0>";
			for(var i=0;i<equipSkills.length;i++)
			{
				if (equipSkills[i][2] == -1)
				{
					o+="<tr><td><a href=# onclick=\"cmd('skills "+equipSkills[i][0]+"');return false;\"><font color=red><b>"+equipSkills[i][0]+"</b></font></a>("+equipSkills[i][1]+") &nbsp;<font face=arial style='font-size:7.5pt;'>&nbsp;Lv <font color=red>"+equipSkills[i][2]+"</font> <span title=经验:"+equipSkills[i][3]+">Next <font color=blue>N/a </font></font></font></td></tr>";
				}
				else
				{
					o+="<tr><td><a href=# onclick=\"cmd('skills "+equipSkills[i][0]+"');return false;\"><font color=red><b>"+equipSkills[i][0]+"</b></font></a>("+equipSkills[i][1]+") &nbsp;<font face=arial style='font-size:7.5pt;'>&nbsp;Lv <font color=red>"+equipSkills[i][2]+"</font> <span title=经验:"+equipSkills[i][3]+">Next <font color=blue>"+(equipSkills[i][4]-equipSkills[i][3])+"</font></font></font></td></tr>";
				}
			}
			o+="</table>"
		}

		+"	</td></tr>"
		+"	</table>"

		+"</td></tr>"
		+"</table>"
		;
	_openWin("petinfo",o);
}

function getChenjiuStr(dengji) {
   var imgStr="<span style='cursor:pointer;' title='成就个数:"+dengji+"' onmouseover=this.title>";
   var sunnum = parseInt(dengji/100);
   var moonnum = parseInt((dengji%100)/10);
   var starnum =	(dengji%100)%10;
   if (sunnum>0)
   {  
		for (var i=0;i<sunnum ;i++ )
		{
			imgStr+="<img src=images/sun.gif >";
		}
   }
   if (moonnum>0)
   {
		for (var j=0;j<moonnum ;j++ )
		{
			imgStr+="<img src=images/moon.gif >";
		}
   }
   if (starnum>0)
   {   
		for (var zx=0;zx<starnum ;zx++ )
		{
			imgStr+="<img src=images/star.gif >";
		}
   }	
   imgStr+="</span>";
   return imgStr;
}
function getXinDongStr(xindong,xinnum) {
   var imgStr="<span style='cursor:pointer;' title='"+xindong+"/999' onmouseover=this.title>";
 
	for (var i=0;i<xinnum ;i++ )
	{
		imgStr+="<img src=images/xin.gif >";
	}
 
   imgStr+="</span>";
   return imgStr;
}

function showChengJiu() {
	window.open('chengjiu/index.jsp;jsessionid='+sessionId+'?','','menubar=no,toolbar=no,location=no,directories=no,status=no,width=316,height=410,left='+(p.event.screenX-360)+',top='+p.event.screenY+',scrollbars=yes');
}



// 单独弹出展示位窗口处理 Edit By Coolin
function showReveal(revealItems,parentWin,parent)
{
	// 定义显示窗口
	var obj=getObj("showReveal");
	if(obj==null){
		for(var i=0;i<winList.length;i++){
			if(winList[i]=="showReveal"){
				obj = _createWin("showReveal",winPos[name],winSize[name]);
			}
		}
		if (obj == null)
		{
			obj = _createWin("showReveal",winPos["default"],winSize["default"]);
		}
	}
	var petinfo = getObj(parentWin);
	var t = petinfo.offsetTop;
	var l = petinfo.offsetLeft;
	var e = petinfo;
	while(e=e.offsetParent)
	{
		t += e.offsetTop;
		l += e.offsetLeft;
	}
	if (parentWin == 'showPetInfoDiv')
	{
		t -= 50;
		l += 238;
	}
	else
	{
		l = 10+parseInt(petinfo.style.left.replace('px',''))+parseInt(petinfo.style.width.replace('px',''));
	}

	//alert(l+' '+t);
	with(obj.style)
	{
		width="200";
		height="200";
		top = t+"px";
		var tmp = 10+parseInt(petinfo.style.left.replace('px',''))+parseInt(petinfo.style.width.replace('px',''));
		left = l+"px";
		overflowY="";
		display='';
	}

	var show = "<font color=blue>展示位</font><br/>";
	show += "<table width='100%' border='0' cellpadding='0' cellspacing='0' style='margin-top:3px;margin-right:5px;margin-bottom:5px;'><tr><td valign=top>"
	show += "<table width='100%' border='0' align='center' cellpadding='0' cellspacing='1' bgcolor='#BCBCBC'>"
	show += "<tr><td bgcolor='#E1E1E1' style='overflow:hidden;line-height:4em;height:4em;'>"
	show += "<table border=0 cellpadding='0' cellspacing='0' width='100%'>";
	for(var i=0;i<revealItems.length;i++)
	{
		var k=revealItems[i][1];
		if(revealItems[i][1]<=1)
		{
			k = "";
		}
		else
		{
			k = "<h><font color=green> x "+k+"</font></h>";
		}
		if (parentWin == 'showPetInfoDiv')
		{
			show += "<tr height=24><td width=24><img src="+revealItems[i][2]+" /></td><td width=4></td><td><a href=# onclick=\"p.cmd('helptools zhanshi "+parent+' '+i+"');return false;\">"+revealItems[i][0]+"</a> "+k+" </td><td></td></tr>";
		}
		else
		{
			show += "<tr height=24><td width=24><img src="+revealItems[i][2]+" /></td><td width=4></td><td><a href=# onclick=\"p.cmd('helptools re_"+i+"');return false;\">"+revealItems[i][0]+"</a> "+k+" </td><td><a href=# onclick=\"p.cmd('removereveal "+i+"');return false;\" title=卸除><img src=/img/t3.gif border=0></a></td><td><a href=# onclick=\"showItemName("+i+",'reveal');return false;\" title=秀><img src=/img/xiu.gif border=0></a></td></tr>";// equipItems[i][0]
		}
	}
	show += "</table></td></tr></table></table>";

	onOpenWin(obj);
	_openWin("showReveal",show);
	focusWin(obj);
}


function showShenZhuang(shenzhuangimg,parentWin,parent)
{
	// 定义显示窗口
	var obj=getObj("showShenZhuang");
	if(obj==null){
		for(var i=0;i<winList.length;i++){
			if(winList[i]=="showShenZhuang"){
				obj = _createWin("showShenZhuang",winPos[name],winSize[name]);
			}
		}
		if (obj == null)
		{
			obj = _createWin("showShenZhuang",winPos["default"],winSize["default"]);
		}
	}
	var petinfo = getObj(parentWin);
	var t = petinfo.offsetTop;
	var l = petinfo.offsetLeft;
	var e = petinfo;
	while(e=e.offsetParent)
	{
		t += e.offsetTop;
		l -= e.offsetLeft;
	}
	if (parentWin == 'showPetInfoDiv')
	{
		t -= 50;
		l += 360;
	}
	else
	{
		l = 44+parseInt(petinfo.style.left.replace('px',''))-parseInt(petinfo.style.width.replace('px',''));
	}

	//alert(l+' '+t);
	with(obj.style)
	{
		width="200";
		height="200";
		top = t+"px";
		var tmp = 10+parseInt(petinfo.style.left.replace('px',''))+parseInt(petinfo.style.width.replace('px',''));
		left = l+"px";
		overflowY="";
		display='';
	}

	var show = "<font color=blue>神装位</font><br/>";
	show += "<table width='100%' border='0' cellpadding='0' cellspacing='0' style='margin-top:3px;margin-right:5px;margin-bottom:5px;'><tr><td valign=top>"
	show += "<table width='100%' border='0' align='center' cellpadding='0' cellspacing='1' bgcolor='#BCBCBC'>"
	show += "<tr><td bgcolor='#E1E1E1' style='overflow:hidden;line-height:4em;height:4em;'>"
	show += "<table border=0 cellpadding='0' cellspacing='0' width='100%'>";
	show += "<tr height=24 align=right><td width=24 colspan=2><img src=img/shenzhuang/"+shenzhuangimg+" /></td></tr>" ;
	show += "</table></td></tr></table></table>";

	onOpenWin(obj);
	_openWin("showShenZhuang",show);
	focusWin(obj);
}

function showTiShen(tishenequips,shenzhuangimg,tishen,parentWin,parent)
{
	// 定义显示窗口
	var obj=getObj("showTiShen");
	if(obj==null){
		for(var i=0;i<winList.length;i++){
			if(winList[i]=="showTiShen"){
				obj = _createWin("showTiShen",winPos[name],winSize[name]);
			}
		}
		if (obj == null)
		{
			obj = _createWin("showTiShen",winPos["default"],winSize["default"]);
		}
	}
	var petinfo = getObj(parentWin);
	var t = petinfo.offsetTop;
	var l = petinfo.offsetLeft;
	var e = petinfo;
	while(e=e.offsetParent)
	{
		t += e.offsetTop;
		l -= e.offsetLeft;
	}
	if(shenzhuangimg != ""){
		t += 260 ;
	}
	if (parentWin == 'showPetInfoDiv')
	{
		t -= 50;
		l += 360;
	}
	else
	{
		l = 44+parseInt(petinfo.style.left.replace('px',''))-parseInt(petinfo.style.width.replace('px',''));
	}

	//alert(l+' '+t);
	with(obj.style)
	{
		width="200";
		height="150";
		top = t+"px";
		var tmp = 10+parseInt(petinfo.style.left.replace('px',''))+parseInt(petinfo.style.width.replace('px',''));
		left = l+"px";
		overflowY="";
		display='';
	}

	var o="<font color='black'><b>【替身】</b></font>";
		o+="<br><table width='100%' bgcolor='#E1E1E1' border='0' cellpadding='0' cellspacing='0' style='margin-top:3px;margin-right:5px;margin-bottom:5px;'>";
		o+="<tr><td  style='padding-left:10px;padding-right:10px;padding-bottom:5px;' ><font style='font-weight:bold;color:green;'>"+tishen[0]+"</font></td></tr>";
		o+="<tr><td  style='padding-left:10px;padding-right:10px;padding-bottom:5px;'>等级:<font style='font-weight:bold;color:green;'>"+tishen[1]+"</font></td></tr>";
		o+="<tr><td  style='padding-left:10px;padding-right:10px;padding-bottom:5px;'>经验:<font style='font-weight:bold;color:green;'>"+tishen[2]+"/"+tishen[3]+"" +
				"</font>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href=# onclick=\"cmd('weishits');return false;\"><font color=blue>喂食</font></a></td></tr>";
		o+="<tr><td  style='padding-left:10px;padding-right:10px;padding-bottom:5px;'>力量:<font style='font-weight:bold;color:green;'>"+tishen[4]+"</font></td></tr>";
		o+="<tr><td  style='padding-left:10px;padding-right:10px;padding-bottom:5px;'>体力:<font style='font-weight:bold;color:green;'>"+tishen[5]+"</font></td></tr>";
		o+="<tr><td  style='padding-left:10px;padding-right:10px;padding-bottom:5px;'>智力:<font style='font-weight:bold;color:green;'>"+tishen[6]+"</font></td></tr>";
		o+="<tr><td></td></tr>" ;
		o+="<tr><td></td></tr>" ;
		o+="<tr><td  style='padding-left:10px;padding-right:10px;padding-bottom:5px;'> <font color='blue'><b>【替身装备】</b></font><td></tr>" ;
		if(tishenequips.length>0){
				for(var i=0;i<tishenequips.length;i++)
				{	
					var k=tishenequips[i][1];	
					if(k.substring(tishenequips[i][1].length-1,tishenequips[i][1].length)==',')
					{
						k=k.substring(0,tishenequips[i][1].length-1);
					}
					o+="<tr><td style='padding-left:10px;padding-right:10px;padding-bottom:5px;'><img src="+tishenequips[i][2]
						+"><a href=# onclick=\"p.cmd('helptools se_"
						+tishenequips[i][5]+"');return false;\">"+tishenequips[i][0]+"</a>("+k
						+") <a href=# onclick=\"p.cmd('removeequip "+tishenequips[i][5]
						+"');return false;\" title=卸除><img src=/img/t3.gif border=0></a><a href=# onclick=\"showItemName("
						+tishenequips[i][5]+",'equic');return false;\" title=秀><img src=/img/xiu.gif border=0></a></td></tr>";
				}
		}
		o+="</table>" ;

	onOpenWin(obj);
	_openWin("showTiShen",o);
	focusWin(obj);
}

// 职业称号 选择列表窗口显示 Edit By Coolin
function careerTitle(titleLst,cur)
{
	var obj=getObj("careertitle");
	if(obj==null){
		for(var i=0;i<winList.length;i++){
			if(winList[i]=="careertitle"){
				obj = _createWin("careertitle",winPos[name],winSize[name]);
			}
		}
		if (obj == null)
		{
			obj = _createWin("careertitle",winPos["default"],winSize["default"]);
		}

		with(obj.style)
		{
			width="400";
			height="200";
			if(p.eventY-13<0){
				top=1;
			}else{
				top=p.eventY-13;
			}
			if(p.eventX-250-80<0){
				left=1;
			}else{
				left=p.eventX-250-80;
			}
			overflowY="";
			display='';
		}
	}

	var content = "<br/>";
	content += "<table width='100%' border='0' cellpadding='0' cellspacing='0' style='margin-top:3px;margin-right:5px;margin-bottom:5px;'><tr><td valign=top>"
	content += "<table width='100%' border='0' align='center' cellpadding='0' cellspacing='1' bgcolor='#BCBCBC'>"
	content += "<tr><td bgcolor='#E1E1E1' style='padding-top:8px;padding-bottom:10px;padding-left:22px;padding-right:22px;'>"
	if (cur != -1)
	{
		title = titleLst[cur][0];
	}
	else
	{
		title = '无';
	}
	
	content += "当前职业称号 ："+title;
	content += "<hr size=1 color='#BCBCBC' width='100%'>"
	content += "可选职业称号 ：<br/>";
	content += "<a href='#' onclick='cmd(\"career -1\");return false;'>【无】</a><br/>";
	for (var j=0;j<titleLst.length;j++)
	{
		content += "<a href='#' onclick='cmd(\"career "+j+"\");return false;'>"+titleLst[j][0]+"</a>";

		var arr = titleLst[j][1];
		for(var i=0;i<arr.length;i++)
		{
			add = '';style='';
			if(arr[5] && cur==j)
			{
				add="<a href=# onclick=\"cmd('equipskills 0 "+arr[0]+"');return false;\">[卸下]</a>";
				style="style='background-color:#D9D9D9;'";
			}
			else
			{
				if (cur==j)
				{
					add="<a href=# onclick=\"cmd('equipskills 0 "+arr[0]+"');return false;\">[装备]</a>";
				}
				
			}
		}
		if (arr[2]>9)
		{
			content += "&nbsp;&nbsp;&nbsp;<a href=# onclick=\"cmd('skills "+arr[0]+"');return false;\"><font color=red><b>【"+arr[0]+"】</b></font></a>("+arr[1]+") <font face=arial>Lv:<font color=red>"+arr[2]+"</font> Exp: N/a "+add+"</font>";
		}
		else
		{
			content += "&nbsp;&nbsp;&nbsp;<a href=# onclick=\"cmd('skills "+arr[0]+"');return false;\"><font color=red><b>【"+arr[0]+"】</b></font></a>("+arr[1]+") <font face=arial>Lv:<font color=red>"+arr[2]+"</font> Exp:"+arr[3]+"/"+arr[4]+" "+add+"</font>";
		}

		content += "<br/>";

	}
	content += "</td></tr></table></table>";

	onOpenWin(obj);
	_openWin("careertitle",content);
	focusWin(obj);
}
function showItemName(itemIndex,type){//090202 upt by lc
	setItemType(type);
	setItemIndex(itemIndex);
	messageSubmit();
}

function showItemInfoDesc(itemName,itemLogo,itemDesc,itemKeZi,itemBigPic){
	if(!itemKeZi){
		itemKeZi = "";
	}
	var winObj=_getWin("itemInfoDescWin");
	onOpenWin(winObj);
	winObj.style.lineHeight="14pt";
	var o=fakeBr(2)+"<img src="+itemLogo+"> <b>"+itemName+"</b> "+fakeBr(4);
  
	o+="<FONT COLOR='#FF33FF'>"+itemKeZi+"</FONT>";
	o+=itemDesc+fakeBr(5);
	
	with(winObj.style){
		width="250";
		height="10";

		if(xiutop!=null){
		top=xiutop;
		}else{
		top=p.event.y;
		}

		if(xiuleft!=null){
		left=xiuleft;
		}else{
		left=p.event.x;
		}
		
		overflowY="";
		display='';
		winObj.closeEvent="_getWin('showBigPic').style.display='none'";
	}
	if(itemBigPic!=null && itemBigPic!='null' && itemBigPic!=''){
		showBigPic(itemBigPic,'itemInfoDescWin');
	}
	else
	{
		// 关闭已打开窗口
		offOpenWin('itemBigPic');
	}
	_openWin("itemInfoDescWin",o);

}
function showCunList(showTime){
	window.open('cunList.jsp;jsessionid='+sessionId+'?'+(showTime?"action=checkTime&":"")+new Date(),'','menubar=no,toolbar=no,location=no,directories=no,status=no,width=280,height=410,left='+(p.event.screenX-360)+',top='+p.event.screenY+',scrollbars=yes');
}

function showSaleItemList(showTime){
	window.open('showSaleItem.jsp;jsessionid='+sessionId+'?'+(showTime?"action=checkTime&":"")+new Date(),'','menubar=no,toolbar=no,location=no,directories=no,status=no,width=380,height=410,left='+(p.event.screenX-360)+',top='+p.event.screenY+',scrollbars=yes');
}

function showBakPetItemList(showTime){
	window.open('showPetItemList.jsp;jsessionid='+sessionId+'?'+(showTime?"action=checkTime&":"")+new Date(),'','menubar=no,toolbar=no,location=no,directories=no,status=no,width=280,height=410,left='+(p.event.screenX-360)+',top='+p.event.screenY+',scrollbars=yes');
}

// 显示找回物品列表 Edit By Coolin 2008-7-8
function ShowLostItemList()
{
	window.open('ShowLostItemList.jsp?t='+new Date(),'','menubar=no,toolbar=no,location=no,directories=no,status=no,width=280,height=410,left='+(p.event.screenX-360)+',top='+p.event.screenY+',scrollbars=yes');
}
function xiuliMoDaoShi(arg,equips){
	var winObj=_getWin("XiuliMoDaoShi");
	with(winObj.style){
		width="200";
		height="10";
		overflowY="";
		if(!getOpenWinDis(winObj)){
			if(p.eventY-13<0){
				top=1;
			}else{
				top=p.eventY-13;
			}
			if(p.eventX-200+13<0){
				left=1;
			}else{
				left=p.eventX-200+13;
			}
		}
	}
	onOpenWin(winObj);
	var o=fakeBr(5)
		
	if(equips!=null){
		if(equips.length>0){
			o+="<font color=#006A6A>选择要修理的装备</font>"+fakeBr(4);
		}
		for(var i=0;i<equips.length;i++){
			o+="<a href=# onclick=\"cmd('helptools "+equips[i][1]+"');hideParentMenu();return false;\">"+equips[i][2]+"</a> "+" <a href=# onclick=\"cmd('use "+arg+" "+equips[i][1]+" "+equips[i][0]+"');offOpenWin('XiuliMoDaoShi');return false;\">[修理]</a><br>";
		}
	}else{
		o+="<font color=green>没有任何需要修理的装备!</font>";
	}

	o+=fakeBr(6);
	_openWin("XiuliMoDaoShi",o);
}

// 提示使用高级升级石窗口 Edit By Coolin 2008-7-31
function showUpgradeStoneWin(cmdstr,fName,fDesc)
{
	var winObj = _getWin("UpgradeStoneWin");
	onOpenWin(winObj);
	var str = "<font color=green>【"+fName+"】</font><br>"+fDesc+"<label id='spanAddPlus' style='display:'>"+"<br/>使用<input type=text cmdstr='"+cmdstr+"' name='UpgradeStoneNum' value='1' size='3'>块</label><div align='right'><a href=# onclick='p.cmd(getObj(\"UpgradeStoneNum\").cmdstr+getObj(\"UpgradeStoneNum\").value);p.offOpenWin(\"UpgradeStoneWin\");return false;'>[使用]</a> <a href=# onclick='p.offOpenWin(\"UpgradeStoneWin\");return false;'>[关闭]</a>&nbsp;&nbsp;</div>";
	with(winObj.style)
	{
		height="150";
	}
	_openWin("UpgradeStoneWin",str);
}

//紫装换橙装

function showZHC(desc,itemList){ //将itemName转让给当前场景的生物
	var winObj=_getWin("showDaKongWin");
	onOpenWin(winObj);
	with(winObj.style){
		width="210";
		height="10";
		if(p.eventY<0){
			top=1;
		}else{
			top=p.eventY;
		}
		if(p.eventX-210<0){
			left=1;
		}else{
			left=p.eventX-210;
		}
		overflowY="";
		display='';
	}
	var o="<div style='padding-top:2px;'>"
	+"<b>"+desc+"：</b><br>"
	+"<div style='margin-top:6px;margin-bottom:3px;'>选择装备:</div>"
	
	+"<div style='margin-left:10px;'>";
	+(itemList.length>0?"<div style='margin-left:10px;margin-top:5px;'>":"")
	;
	
	if(itemList.length<=0){
		o+="没有可换的装备";
	}else{
		for(var i=0;i<itemList.length;i++){
			var ary = itemList[i].split("|");
			o+="<img src='"+ary[1]+"'/>&nbsp;&nbsp;&nbsp;<a href='#' onclick=\"cmd('helptools "+ary[2]+"');return false;\">"+ary[0]+"</a>&nbsp;&nbsp;&nbsp;<a href='#' onclick=\"cmd('changeChengSe "+ary[2]+"');offOpenWin('showDaKongWin');return false;\">我要换这件</a><br>";
		}
	}
	
	
	o+="</div>"
	+"</div>"
	+fakeBr(10);
	_openWin("showDaKongWin",o);
}
function useReChenZhiXin(arg,equips){
	var winObj=_getWin("useReChenZhiXin");
	with(winObj.style){
		width="200";
		height="10";
		overflowY="";
		if(!getOpenWinDis(winObj)){
			if(p.eventY-13<0){
				top=1;
			}else{
				top=p.eventY-13;
			}
			if(p.eventX-200+13<0){
				left=1;
			}else{
				left=p.eventX-200+13;
			}
		}
	}
	onOpenWin(winObj);
	var o=fakeBr(5)
		
	if(equips!=null){
		if(equips.length>0){
			o+="<font color=#006A6A>选择要结合热忱之心的装备</font>"+fakeBr(4);
		}
		for(var i=0;i<equips.length;i++){
			o+="<a href=# onclick=\"cmd('helptools "+equips[i][1]+"');hideParentMenu();return false;\">"+equips[i][2]+"</a> "+" <a href=# onclick=\"cmd('use "+arg+" "+equips[i][1]+" "+equips[i][0]+"');offOpenWin('useReChenZhiXin');return false;\">[结合]</a><br>";
		}
	}else{
		o+="<font color=green>没有任何可以结合热忱之心的装备!</font>";
	}

	o+=fakeBr(6);
	_openWin("useReChenZhiXin",o);
}

//在宠物面板展示经验奖励信息 xzh
function showExpAward(offlineExp,offlineHours,lgtfT,tjlgtfT,lgfT,gjlgfT){
		//离线经验 离线时间 旅馆套房 特级旅馆套房 练功房 高级练功房
		var kuaisuchongzhi = isxiaonei?"/pay/index.jsp":"http://gc.imop.com/account/pet/pay.php' target='_blank";
		var duirumm = isxiaonei?"/turnXiaoNeiCoin.jsp":"/turnMP.jsp";

		var winObj=_getWin("expAwardWin");
		onOpenWin(winObj);
		with(winObj.style){
			width="250";
			height="10";
			if(p.eventY<0){
				top=1;
			}else{
				top=p.eventY;
			}
			if(p.eventX-210<0){
				left=1;
			}else{
				left=p.eventX-210;
			}
			overflowY="";
			display='';
		}
		
//		var o="<div style='padding-top:2px;'>
		var o="<font color='black'><b>【经验奖励】</b></font>";
		o+="<br><table width='100%' bgcolor='#E1E1E1' border='1' cellpadding='0' cellspacing='0' style='margin-top:3px;margin-right:5px;margin-bottom:5px;'>";
		o+="<tr><td valign=top>";
		
		
		o+="<table width='235' border='0' align='center' cellpadding='0' cellspacing='1'>";
		o+="<tr><td align=left>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp<a href='http://www.pet.imop.com/html/maoyouji8195/changjianwenti1298/200808111632375341.html' target='_blank'><font color=black>离线经验</font></a></td><td align=center>"+offlineExp+"(剩"+offlineHours+"小时)</td></tr>";
		o+="<tr><td></td><td align='right'><a href=# onclick=\"cmd('dealOfflineExp');return false;\"><font color=blue>【领取】</font></a>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp";
		o+="</td></tr></table>";

        	o+="<hr size=1 color='#BCBCBC' width='80%'>";

		o+="<table width='100%' border='0' cellpadding='1' cellspacing='0'>";
		o+="<tr><td align='left'>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp<a href='http://www.pet.imop.com/html/maoyouji8195/changjianwenti1298/200808111632375341.html' target='_blank'><font color=black>旅馆套房</font></a></td><td align=center>" +lgtfT+"</td></tr>";
		o+="<tr><td></td><td align='right'> <a href=# onclick=\"p.cmd('buyLvGuan_Gao');p.closeTaskTalk();return false;\"><font color='blue'>【充值】</font></a>&nbsp&nbsp&nbsp&nbsp<a href=# onclick=\"p.cmd('goinLvGuan_Gao');p.closeTaskTalk();return false;\"><font color='blue'>【进入】</font></a>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp</td></tr>";
		o+="</table>";
		
		o+="<hr size=1 color='#BCBCBC' width='80%'>";

		o+="<table width='100%' border='0' cellpadding='1' cellspacing='0'>";
		o+="<tr><td align='left'>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp<a href='http://www.pet.imop.com/html/maoyouji8195/changjianwenti1298/200808111632375341.html' target='_blank'><font color=black>特级旅馆套房</font></a></td><td align=center>" +tjlgtfT+"</td></tr>";
		o+="<tr><td></td><td align='right'> <a href=# onclick=\"p.cmd('buyLvGuan_Te');p.closeTaskTalk();return false;\"><font color='blue'>【充值】</font></a>&nbsp&nbsp&nbsp&nbsp<a href=# onclick=\"p.cmd('goinLvGuan_Te');p.closeTaskTalk();return false;\"><font color='blue'>【进入】</font></a>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp</td></tr>";
		o+="</table>";

		o+="<hr size=1 color='#BCBCBC' width='80%'>";

		o+="<table width='100%' border='0' cellpadding='1' cellspacing='0'>";
		o+="<tr><td align='left'>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp<a href='http://www.pet.imop.com/html/maoyouji8195/changjianwenti1298/200808111632375341.html' target='_blank'><font color=black>练功房</font></a></td><td align=center>" +lgfT+"</td></tr>";
		o+="<tr><td></td><td align='right'><a href=# onclick=\"p.cmd('lianGongFangChongZhi 1');p.closeTaskTalk();return false;\"><font color='blue'>【充值】</font></a>&nbsp&nbsp&nbsp&nbsp<a href=# onclick=\"p.cmd('useLianGongFang 1');p.closeTaskTalk();return false;\"><font color='blue'>【进入】</font></a>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp</td></tr>";
		o+="</table>";

		o+="<hr size=1 color='#BCBCBC' width='80%'>";

		o+="<table width='100%' border='0' cellpadding='1' cellspacing='0'>";
		o+="<tr><td align='left'>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp<a href='http://www.pet.imop.com/html/maoyouji8195/changjianwenti1298/200808111632375341.html' target='_blank'><font color=black>高级练功房</font></a></td><td align=center>" +gjlgfT+"</td></tr>";
		o+="<tr><td></td><td align='right'> <a href=# onclick=\"p.cmd('lianGongFangChongZhi 2');p.closeTaskTalk();return false;\"><font color='blue'>【充值】</font></a>&nbsp&nbsp&nbsp&nbsp<a href=# onclick=\"p.cmd('useLianGongFang 2');p.closeTaskTalk();return false;\"><font color='blue'>【进入】</font></a>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp</td></tr>";
		o+="</table>";

		o+="<hr size=1 color='#BCBCBC' width='80%'>";

		o+="<table width='100%' border='0' cellpadding='1' cellspacing='0'>";
		o+="<tr><td align=center>&nbsp&nbsp<a href='/turnMaoYan.jsp' target='_blank'><font color=blue>【兑入猫眼】</font></a></td>";
		o+="<td align=center><a href='"+kuaisuchongzhi+"' target='_blank'><font color=blue>【快速冲值】</font></a></td>";
		o+="<td align=center><a href='"+duirumm+"' target='_blank'><font color=blue>【兑入MM】</font></a></td>";
		o+="</tr>";
		
		o+="</table>";


		o+="</td></tr>";
		o+="</table>";
	_openWin("expAwardWin",o);
}
//展示充值 xzh
function showChongZhi(arr){
	//alert(arr);
	var reWin=document.all("chongZhi")==null;

	if(!reWin){
		reWin=document.all("chongZhi").style.display=="none";
	}
	var winObj=_getWin("chongZhi");
	onOpenWin(winObj);
	// alert(arr);
	if(reWin){
		with(winObj.style){
			height="120";
			width="250";
			overflowY="";
			paddingLeft="12px";
			paddingBottom="13px";
			// left=p.eventX;
			// top=p.eventY;
		}
	}
	var o="";
	o+=fakeBr(4)+"<font color=black><b>【充值信息】</b> </font><hr size=1 width=98% align=left>";

	o+="<table>";

	o+=arr;

	o+="</table>";
	
	_openWin("chongZhi",o);	
	
	
}
function onzidongxiuli(){
if(zdxlcheck.checked){
if(confirm("你确定要自动修理全身装备吗？")){
zidongxiuli=zdxlcheck.checked;
p.cmd("zidongxiuli "+zdxlcheck.checked);
}else{
zdxlcheck.checked=false;
}
}else{
if(confirm("你确定要去除自动修理功能吗？")){
zidongxiuli=zdxlcheck.checked;
p.cmd("zidongxiuli "+zdxlcheck.checked);
}else{
zdxlcheck.checked=true;
}
}
}
function onfrienddrop(){
if(frienddropcheck.checked){
if(confirm("你确定要屏蔽好友获得物品信息吗？")){
frienddrop=frienddropcheck.checked;
p.cmd("frienddrop "+frienddropcheck.checked);
}else{
frienddropcheck.checked=false;
}
}else{
if(confirm("你确定要取消屏蔽好友获得物品信息吗？")){
frienddrop=frienddropcheck.checked;
p.cmd("frienddrop "+frienddropcheck.checked);
}else{
frienddropcheck.checked=true;
}
}
}
function onfriendup(){
if(friendupcheck.checked){
if(confirm("升级消息每10级发送一次，您确定要屏蔽吗？好友面板可以选择开启。")){
friendup=friendupcheck.checked;
p.cmd("friendup "+friendupcheck.checked);
}else{
friendupcheck.checked=false;
}
}else{
if(confirm("您确定要取消屏蔽好友升级消息吗？")){
friendup=friendupcheck.checked;
p.cmd("friendup "+friendupcheck.checked);
}else{
friendupcheck.checked=true;
}
}
}

function shilianhuanexp(maoyan,beishu,exp){
	var winObj=_getWin("shilianhuanexp");
	with(winObj.style){
		width="200";
		height="150";
	}
	onOpenWin(winObj);
	var o=fakeBr(5);
	// alert(maoyan+beishu+exp);
	o+="您已经完成了本次试炼！本次试炼您一共获得了";
	o+=exp+"点经验，是否使用"+maoyan+"个猫眼将获得额外的"+beishu+"倍经验？<br>";
	// o+="30秒自动离开。<br>";
	o+="[<a href=# onclick=\"cmd('duihuanshilianexp 1');offOpenWin('shilianhuanexp');return false;\">使用猫眼</a>]";
	o+="&nbsp;&nbsp[<a href=# onclick=\"cmd('duihuanshilianexp');offOpenWin('shilianhuanexp');return false;\">离开</a>]";
	o+=fakeBr(6);
	// o+="<script>setTimeout(autoLeaveShiLianHuanExp(),10000);</script>"
	// alert(o);
	_openWin("shilianhuanexp",o);
}

function autoLeaveShiLianHuanExp(){
	alert(" i am here");
	cmd('duihuanshilianexp');
	offOpenWin('shilianhuanexp');
}

//指定时间显示
function showAlert_n(mes,time){//xzh
	if(alertTimer!=null){
		window.clearTimeout(alertTimer);
		
	}
	addIM(mes);
	_alert='';
	_alert+=mes;
	offOpenWin('alert');
	var winObj=_getWin("alert");
	onOpenWin(winObj);
	with(winObj.style){
		overflowY="";
	}
	winObj.closeEvent="_alert='';"
	_openWin("alert",_alert);
	alertTimer=setTimeout("try{_alert='';_openWin('alert',_alert);offOpenWin('alert');}catch(x){err(x);}",time);
}
function showFriendEvent(events){
	var winObj=_getWin("friendEventWin");
	onOpenWin(winObj);
	winObj.style.lineHeight="14pt";

	var o=""
	+"<table border=0 cellpadding='0' cellspacing='0' width=90%>";

	for(var i=0;i<events.length;i++){
		o+="<tr ";
		// if(i%2==0){
		// o+="bgcolor=#E1E1E1";
		// }
		o+=" height=26 >"
		+"<td>"+events[i]+"</td>"
		+"</tr>"
		;
	}
	o+="</table>";

	with(winObj.style){
		width="300";
		height="200";
				

		// overflowY="";
		display='';
	}
if(events.length==0){
o="暂无记录！";
}
	_openWin("friendEventWin",o);

}
function friendEvent(petid,showTime){
//if(petid==-1){
//p.cmd("showfriendevent");
// }else{
// p.cmd("showfriendevent "+petid);
// }
window.open('friendevents.jsp;jsessionid='+sessionId+'?'+(showTime?"action=checkTime&":"")+new Date()+'&fid='+petid,'','menubar=no,toolbar=no,location=no,directories=no,status=no,width=280,height=410,left='+(p.event.screenX-360)+',top='+p.event.screenY+',scrollbars=yes');

}
	
function showPetInfoFriend(index,name,code,args){
	var has=args&&args!="undefined";
	if(has){
		var isPlayer=args[0];
		var isDie=args[1];
		var canTalk=args[2];
		var canKill=args[3];
	}
	var winObj=_getWin("petInfoWin");
	onOpenWin(winObj);
	var o="";
	o+="<table width=95% cellpadding=0 cellspacing=0 style=\"margin-top:14px;\" border=0><tr><td valign=top width=1><img src=img/blank.gif id=showPetPic style=\"filter:fliph;display:none;margin-right:5px;margin-bottom:10px;\">"
	+"</td><td valign=top align=left>"
	+"<font color=black><b>"+name+"</b></font> ";
	if(p.hasIM(name)==false){
		if(!has||isPlayer){
			o+=" <img src=/img/addf.gif onclick=\"p.cmd('foo im add "+name+"');offOpenWin('petInfoWin');\" style=\"cursor:pointer\" alt=加"+name+"为好友>";
			o+=" <img src=/img/hint.gif onclick=\"p.cmd('yy "+index+" "+name+"');offOpenWin('petInfoWin');return false;\" style=\"cursor:pointer\" alt="+name+"个人信息>";

		}
	}else{
        
		o+=" <img src=/img/hint.gif onclick=\"p.cmd('yy "+index+" "+name+"');offOpenWin('petInfoWin');return false;\" style=\"cursor:pointer\" alt="+name+"个人信息>";

	}
	
	o+=(has&&!isDie&&canTalk?"<a href=# onclick=\"p.cmd('talk "+index+"');offOpenWin('petInfoWin');return false;\" title=交谈><img src=img/button/t.gif border=0></a> ":"")
	+(has&&!isDie&&canKill?"<a href=# onclick=\"p.cmd('45sr34 "+index+" "+code+"');offOpenWin('petInfoWin');return false;\" title=攻击 style=\"display:none\"><img src=img/button/a.gif border=0></a> ":"")
	+(has&&!isDie&&canKill?"<a href=# onclick=\"p.cmd('bar34 "+index+" "+code+"');offOpenWin('petInfoWin');return false;\" title=攻击><img src=img/button/a.gif border=0></a> ":"")
	+fakeBr(4)
	+"<div id=showPetInfoDiv></div>"
	+"</td></tr></table>"
	;

	with(winObj.style){
		try{
			top=petWin.event.y+petWin.document.body.scrollTop+91-13;
			left=petWin.event.x+petWin.document.body.scrollLeft+26-238;
		}catch(x){
			top=event.y+petWin.document.body.scrollTop-13;
			left=event.x+petWin.document.body.scrollLeft-238;
		}
		width="250";
		height="60";
		overflowY="";
		display='';
	}
	cmd('l '+index+' 1 2');
	_openWin("petInfoWin",o);
}
function disableHaoYouPos(hrefid){
if(document.getElementById(hrefid)!=null){
document.getElementById(hrefid).onclick="";
document.getElementById(hrefid).disabled=true;
}
}

function xxgShowNameColor(msg){
/*
	var result='';
	var tt= msg.split('(+');
	if(tt.length==2){
		result=tt[0]+'</font>';
	}else{
		result+=tt[0];
		for (var i=1;i<tt.length-1;i++){
			result+='(+'+tt[i];
		}
		result+='<font>';
	}
*/
	document.getElementById('userNameTopLine').innerHTML=msg;
	
}

//
function jianzaopaotai(){
	var input = prompt('输入要建造炮台的数量！','');
	if(input==null||input==""){
		return ;
	}
	var re = /^[1-9]+[0-9]*]*$/;
	if(!re.test(input)){
		alert("请输入正确的数量！");
		return ;
	}else if(input<=0||input>5){
		alert("一次最多能建造5个炮台");
		return ;
	}
	
	if(confirm('建造'+input+'个炮台，需要'+(input*10+(input-1)*5)+'金币，确认建造？')){
		cmd("shengjipaotai "+input);
	}
}

function lixiantuoguan(first,discount){
	var f = first?"您今天是第一次离线托管，可以获得1小时免费时间":"";
	var input = prompt(f+' 输入要托管的时间！','');
	if(input==null||input==""){
		return ;
	}
	var re = /^[1-9]+[0-9]*]*$/;
	if(!re.test(input)){
		alert("请输入正确的数量！");
		return ;
	}else if(input<=0||input>8){
		alert("请选择1-8小时");
		return ;
	}


	var title = "";
	if(first&&input==1){
		title = "确认托管？";
	}else if(first&&input>1){
		title = '离线托管'+input+'个小时，确认托管？';
	}else{
		title = '离线托管'+input+'个小时，确认托管？';
	}
	
	if(confirm(title)){
		cmd("tuoguan 0 "+input);
	}
}

function weirenpengyou(){
	var input = prompt('输入角色名！','');
	if(input!=null&&input!=''){
		cmd("tuoguan 2 "+input);
	}

}

function showFortune(f){
	//alert(f);
}

function showCanUsePos(arg,arr){
	//alert(arr);
	var winObj=_getWin("niMingPos");
	onOpenWin(winObj);
	with(winObj.style){
		width="200";
		height="10";
		if(p.eventY-13<0){
			top=1;
		}else{
			top=p.eventY-13;
		}
		if(p.eventX-200+13<0){
			left=1;
		}else{
			left=p.eventX-200+13;
		}
		overflowY="";
		display='';
	}
	var o=fakeBr(2)+"<font color=#006A6A>选择要传送的塔点</font>"+fakeBr(4);

	for(var i=0;i<arr.length;i++){
		o+="<a href=# onclick=\"cmd('use "+arg+" "+i+" "+arr[i]+"');offOpenWin('niMingPos');return false;\">"+arr[i]+"</a><br>";
	}
	_openWin("niMingPos",o);
}
function confirmXiaoShi(arg,pos){
	//alert(arr);
	if(confirm("您确定要使用消失卷轴回到"+pos+"吗？这是您最后一次使用神秘身份符文的地点。")){
	cmd("use "+arg+" true");
	}
}
function showDCardCanUsePos(arg,arr){
	//alert(arr);
	var winObj=_getWin("DCardPos");
	onOpenWin(winObj);
	with(winObj.style){
		width="200";
		height="10";
		if(p.eventY-13<0){
			top=1;
		}else{
			top=p.eventY-13;
		}
		if(p.eventX-200+13<0){
			left=1;
		}else{
			left=p.eventX-200+13;
		}
		overflowY="";
		display='';
	}
	var o=fakeBr(2)+"<font color=#006A6A>选择要使用道具的塔点</font>"+fakeBr(4);

	for(var i=0;i<arr.length;i++){
		o+="<a href=# onclick=\"cmd('use "+arg+" "+i+" "+arr[i]+"');offOpenWin('DCardPos');return false;\">"+arr[i]+"</a><br>";
	}
	_openWin("DCardPos",o);
}

function showMaBiPlayerList(arg,desc,arr){
	//alert(arr);
	var winObj=_getWin("showMaBiPlayerList");
	onOpenWin(winObj);
	with(winObj.style){
		width="200";
		height="10";
		if(p.eventY-13<0){
			top=1;
		}else{
			top=p.eventY-13;
		}
		if(p.eventX-200+13<0){
			left=1;
		}else{
			left=p.eventX-200+13;
		}
		overflowY="";
		display='';
	}
	var o=fakeBr(2)+"<font color=#006A6A>"+desc+"</font>"+fakeBr(4);
	if(arr.length>0){
		for(var i=0;i<arr.length;i++){
			o+=arr[i][0]+"	<a href=# onclick=\"cmd('use "+arg+" "+arr[i][1]+"');offOpenWin('showMaBiPlayerList');return false;\">使用</a><br>";
		}
	}else{
		o="没有可以麻痹的玩家";
	}

	
	_openWin("showMaBiPlayerList",o);
}
function listFreeTools(listArr){
	var winObj=_getWin("listFreeTools");
	onOpenWin(winObj);
	var o="<br>";	
	o+="<table border=0 style='margin-top:3px;margin-bottom:6px;' width=100%>";
	for(var i=0;i<listArr.length;i++){		
		o+="<tr><td><img src="+listArr[i][2]+"></td><td><a href=# onclick=\"p.cmd('helptools "+listArr[i][1]+"');return false;\">"+listArr[i][0]+"</a></td><td width=10></td><td>&nbsp<a href=# onclick=\"p.getFreeItem('"+listArr[i][3]+"','"+listArr[i][1]+"');return false;\"><font color=blue>【选择】</font></a></td></tr>";
		}
	o+="</table>";
	o+="<span id=getitemslist style='margin-right:5px'></span><input type=hidden name=selitemspath /><br>";
	o+="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href=# onclick=\"p.delFreeItem();return false;\"><font color=blue>清除所选</font></a>";
    o+="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href=# onclick=\"p.getFreeItemOver();return false;\"><font color=blue>选择完毕</font></a>";
	
_openWin("listFreeTools",o);
}
function getFreeItem(itemName,path){ 
	var innerstr=getObj('getitemslist').innerHTML;
	var innerpath=getObj('selitemspath').value;
	if(innerstr.split(",").length>=3){
	alert("最多只能选择3个道具！");
	return;
	}
	if(innerstr==""){
	getObj('getitemslist').innerHTML=itemName;
	getObj('selitemspath').value=path;
	}else{
	getObj('getitemslist').innerHTML=innerstr+","+itemName;
	getObj('selitemspath').value=innerpath+","+path;
	}	
}
function delFreeItem(){ 	
	getObj('getitemslist').innerHTML="";
	getObj('selitemspath').value="";
	}	

function getFreeItemOver(){ 
var num=getObj('getitemslist').innerHTML.split(",").length;
if(num<3){
	alert("最多可以选择3个道具,您只选择了"+num+"个！");
	return;
	}
cmd("giveFreeItem "+getObj('selitemspath').value);	
offOpenWin('listFreeTools');
}
function onGoToEYunMen(shengtime){
shengtime++;
var bg=document.getElementById("eyunmenBG");
	bg.style.display="";

var winObj=p._getWin("eyunmendaoshu");
	onOpenWin(winObj);		
	with(winObj.style){
		width="200";
		height="10";		
		overflowY="";
		display='';
	}
	var o="正在跳转，请稍后...<span id=stime style='color:red;'>"+shengtime+"</span>";
					
_openWin("eyunmendaoshu",o);

	daoshu();
}
function daoshu(){
var timerObj=document.getElementById("stime");
var now=p.parseInt(timerObj.innerHTML);
var delnum=now-1;
if(delnum>=0){
	timerObj.innerHTML=delnum;
	setTimeout("daoshu()",1000);
}
}
function releaseState(){
var bg=document.getElementById("eyunmenBG");
	bg.style.display="none";
	offOpenWin('eyunmendaoshu');
}
function goeyunmengURL(petid,serverid,dname,qihao,lv){
window.top.location.href="http://"+dname+"/setCurrent.jsp?petid="+petid+"&serverid="+serverid+"&qihao="+qihao+"&lv="+lv;
}
function showNewWinners(dname){
	window.open('http://'+dname+'/eyun/NewWinnerPaiHang.jsp;jsessionid='+sessionId,'','menubar=no,toolbar=no,location=no,directories=no,status=no,width=280,height=410,left='+(p.event.screenX-360)+',top='+p.event.screenY+',scrollbars=yes');
}
function showBestWinners(dname){
	window.open('http://'+dname+'/eyun/BestWinnerPaiHang.jsp;jsessionid='+sessionId,'','menubar=no,toolbar=no,location=no,directories=no,status=no,width=280,height=410,left='+(p.event.screenX-360)+',top='+p.event.screenY+',scrollbars=yes');
}
function showMyPaiHang(dname,serid,petname){
	window.open('http://'+dname+'/eyun/GeRenPaiHang.jsp;jsessionid='+sessionId+"?serid="+serid+"&petname="+petname,'','menubar=no,toolbar=no,location=no,directories=no,status=no,width=280,height=410,left='+(p.event.screenX-360)+',top='+p.event.screenY+',scrollbars=yes');
}
function comeBackURL(petid,dname){
window.top.location.href=dname+"/setCurrent.jsp?petid="+petid;
}
//单击：如果win开着，将其关闭；如果未开，执行 commond
function doclick(curcommond,win){	
if(_getWin(win).style.display!="none"){
	offOpenWin(win);
	}else{
	cmd(curcommond);
	}
}
 function showSHLDiv(event,dscpid)
{
  var el;
  el = document.getElementById("div_"+dscpid);
  el.style.display = "";
}
 
function hideSHLDiv(event,dscpid)
{
  var e1;
 el = document.getElementById("div_"+dscpid);
  el.style.display = "none";
}
// 弹出守护灵窗口处理 Edit By lc
function showSHLs(shls,shlsmaxnum,parentWin,parent)
{
	// 定义显示窗口
	var obj=getObj("showSHL");
	if(obj==null){
		for(var i=0;i<winList.length;i++){
			if(winList[i]=="showSHL"){
				obj = _createWin("showSHL",winPos[name],winSize[name]);
			}
		}
		if (obj == null)
		{
			obj = _createWin("showSHL",winPos["default"],winSize["default"]);
		}
	}
	var petinfo = getObj(parentWin);
	var t = petinfo.offsetTop;
	var l = petinfo.offsetLeft;
	var e = petinfo;
	while(e=e.offsetParent)
	{
		t += e.offsetTop;
		l += e.offsetLeft;
	}

	if(_getWin("showReveal").style.display!="none"){//有展示栏
		if (parentWin == 'showPetInfoDiv')// 被别人看
		{
			t -= 50;
			l += 447;
		}
		else// 自己看自己
		{
			l = 218+parseInt(petinfo.style.left.replace('px',''))+parseInt(petinfo.style.width.replace('px',''));
		}
	}else{//没有展示栏
		if (parentWin == 'showPetInfoDiv')// 被别人看
		{
				t -= 50;
				l += 236;
		}
		else// 自己看自己
		{
			l = 10+parseInt(petinfo.style.left.replace('px',''))+parseInt(petinfo.style.width.replace('px',''));
		}
	}

	//alert(l+' '+t);
	with(obj.style)
	{
		width="220";
		height="200";
		top = t+"px";
		var tmp = 10+parseInt(petinfo.style.left.replace('px',''))+parseInt(petinfo.style.width.replace('px',''));
		left = l+"px";
		overflowY="";
		display='';
	}

	var show = "<font color=blue>守护灵栏&nbsp;&nbsp;&nbsp;&nbsp;"+shls.length+"/"+shlsmaxnum+"</font><br/>";
	show += "<table width='100%' border='0' cellpadding='0' cellspacing='0' style='margin-top:3px;margin-right:5px;margin-bottom:5px;'><tr><td valign=top>"
	show += "<table width='100%' border='0' align='center' cellpadding='0' cellspacing='1' bgcolor='#BCBCBC'>"
	show += "<tr><td bgcolor='#E1E1E1' style='overflow:hidden;line-height:4em;height:4em;'>"
	show += "<table border=0 cellpadding='0' cellspacing='0' width='100%'>";
	for(var i=0;i<shls.length;i++)
	{
		var isworking=shls[i][7];// 是否是打工状态
		var canfinish=shls[i][8];// 是否可以完成
		var workdesc=shls[i][9];// 打工描述 如：送信
		var spaceworktime=shls[i][10];// 剩余时间

		var istuoguan;// 是否是托管状态
		var canfinishtuoguan;// 是否可以完成
		var spacetuoguantime;// 剩余时间

		var state="待机";
		
		var zhongzu;
		
		if(shls[i][5]){
			state="战斗";
			zhongzu=shls[i][11];// 战斗状态下的守护灵种族
		}
		else{
			zhongzu=shls[i][14];
			istuoguan=shls[i][11];// 是否是托管状态
			canfinishtuoguan=shls[i][12];// 是否可以完成
			spacetuoguantime=shls[i][13];// 剩余时间
		}
		
		var statehref="";
		if (parentWin != 'showPetInfoDiv')// 自己看自己
		{	
			if(isworking){//打工
				
				if(canfinish){
					statehref="<a href=# onclick=\"p.cmd('wangong "+shls[i][6]+"');return false;\">[完成]</a>";
				}else{
					statehref="<a href=# onclick=\"p.cmd('zhongduan "+shls[i][6]+"');return false;\">[中断]</a>";
				}
				
			}else if(istuoguan){//托管
				
				if(canfinishtuoguan){
					statehref="<a href=# onclick=\"p.cmd('tuoguanover "+shls[i][6]+"');return false;\">[完成]</a>";
				}else{
					statehref="<a href=# onclick=\"if(confirm('你确定要取消托管让守护灵回到身边吗?')){p.cmd('tuoguanover "+shls[i][6]+"');return false;}\">[取消]</a>";
				}
				
			}else{
				statehref="<a href=# onclick=\"p.cmd('changestate "+shls[i][6]+"');return false;\">["+state+"]</a>";
			}

			
		}
		
		cor="";
		if(i%2==1){
			cor="bgcolor=#EEEEEE";
		}
		
		var weishihref="";
		if (parentWin != 'showPetInfoDiv')// 自己看自己
		{
			if(isworking){//打工
				weishihref="<td width=30  onmouseover=showSHLDiv(event,'"+shls[i][6]+"') onmouseout=hideSHLDiv(event,'"+shls[i][6]+"') onmousemove=showSHLDiv(event,'"+shls[i][6]+"')>["+workdesc+"]<div style='position:absolute;display:none; border:1px solid #004080; z-index:90' id='div_"+shls[i][6]+"' ><table width='180' border='0' cellpadding='8' cellspacing='1' bgcolor='#FFFFC8'><tr><td colspan='2'><font color=blue>"+spaceworktime+"</font></td></tr></table></div></td>";
			}else if(istuoguan){//托管
				weishihref="<td width=30  onmouseover=showSHLDiv(event,'"+shls[i][6]+"') onmouseout=hideSHLDiv(event,'"+shls[i][6]+"') onmousemove=showSHLDiv(event,'"+shls[i][6]+"')>[托管]<div style='position:absolute;display:none; border:1px solid #004080; z-index:90' id='div_"+shls[i][6]+"' ><table width='180' border='0' cellpadding='8' cellspacing='1' bgcolor='#FFFFC8'><tr><td colspan='2'><font color=blue>"+spacetuoguantime+"</font></td></tr></table></div></td>";
			}else{
				weishihref="<td width=30 ><a href=# onclick=\"p.cmd('weishi "+shls[i][6]+" quick');return false;\">[喂食]</a></td>";
			}
		}
		var imgclick="<img src="+shls[i][2]+" BORDER=0 width=48 height=48 onclick=\"shlsBar('"+shls[i][0]+"','"+shls[i][6]+"');\" style='cursor:hand;'/>";
		if(isworking||istuoguan){
			imgclick="<img src="+shls[i][2]+" BORDER=0 width=48 height=48 style='filter:progid:DxImageTransform.Microsoft.BasicImage(grayscale=1);'/>";
		}
		if (parentWin == 'showPetInfoDiv')// 被别人看
		{
			imgclick="<img src="+shls[i][2]+" BORDER=0 width=48 height=48 onclick=\"cmd('helpshls zhanshi "+parent+" "+shls[i][6]+"');\" style='cursor:hand;'/>";
			show += "<tr "+cor+"><td ><table border=0 cellpadding='0' cellspacing='0' width='100%' ><tr height=12><td rowspan=4 width=48 >"+imgclick+"</td><td width=30>名字:</td><td width=100 colspan=2 align=left>"+shls[i][0]+"</td></tr><tr  height=12><td width=30>等级:</td><td width=70 align=left>"+shls[i][1]+"</td><td width=30>"+statehref+"</td></tr><tr  height=12><td width=30>肚子:</td><td width=70 align=left>"+shls[i][3]+"</td>"+weishihref+"</tr><tr height=12><td width=30>心情:</td><td align=left width=70>"+shls[i][4]+"</td><td width=30></td></tr></table></td></tr>";
		}
		else{//看自己
			show += "<tr "+cor+"><td ><table border=0 cellpadding='0' cellspacing='0' width='100%' ><tr height=12><td rowspan=3 width=48 >"+imgclick+"</td><td width=30>名字:</td><td width=100 colspan=2 align=left>"+shls[i][0]+"</td></tr><tr  height=12><td width=30>等级:</td><td width=70 align=left>"+shls[i][1]+" "+"<font color=#105E8B>"+zhongzu+"</font></td><td width=30>"+statehref+"</td></tr><tr  height=12><td width=30>肚子:</td><td width=70 align=left>"+shls[i][3]+"</td>"+weishihref+"</tr><tr height=12><td align=center width=48><a href=# onclick=\"p.cmd('zhuanhua "+shls[i][6]+"');return false;\">[转化]</a></td><td width=30>心情:</td><td align=left width=70>"+shls[i][4]+"</td><td width=30></td></tr></table></td></tr>";
		}
	}
	show += "</table></td></tr></table></td></tr></table>";

	onOpenWin(obj);
	_openWin("showSHL",show);
	focusWin(obj);
}
function shlsBar(name,shlid){
var str="";
	str+="<nobr>";
	str+="<input type=button value='说明' onclick=\"cmd('helpshls "+shlid+"');hideParentMenu();return false;\" class=smallFont>";
	str+="<input type=button value='丢弃' onclick=\"dropSHL('"+name+"','"+shlid+"');hideParentMenu();return false;\" class=smallFont>";
	str+="<input type=button value=' 秀 ' onclick=\"showItemName("+shlid+",'shl');hideParentMenu();return false;\" class=smallFont>";
    str+="</nobr>";
    
	showParentMenu(str);
}
function shlsBar(name,shlid){
var str="";
	str+="<nobr>";
	str+="<input type=button value='说明' onclick=\"cmd('helpshls "+shlid+"');hideParentMenu();return false;\" class=smallFont>";
	str+="<input type=button value='丢弃' onclick=\"dropSHL('"+name+"','"+shlid+"');hideParentMenu();return false;\" class=smallFont>";
	str+="<input type=button value=' 秀 ' onclick=\"showItemName("+shlid+",'shl');hideParentMenu();return false;\" class=smallFont>";
    str+="</nobr>";
    
	showParentMenu(str);
}
function dropSHL(name,shlid){
if(confirm("你确定要丢弃守护灵 "+name+" 吗？")){
cmd("dropshl "+shlid);
}
}

var refreshlinfo;
function showSHLDesc(shlDesc,shlid){
	var win="shlInfoWin";
	if(!shlid){//守护灵秀 未传此参数
		win="shlShowWin";
	}

	var winObj=_getWin(win);
	onOpenWin(winObj);
	winObj.style.lineHeight="14pt";

	var o="";
	

	if(!shlid){//守护灵秀 未传此参数	

		o+=shlDesc+fakeBr(5);

		with(winObj.style){
			width="250";
			height="10";
			if(xiutop!=null){
			top=xiutop;
			}else{
			top=p.event.y;
			}

			if(xiuleft!=null){
			left=xiuleft;
			}else{
			left=p.event.x;
			}

			overflowY="";
			display='';
		}		
	}else{//守护灵说明	
	    o+="<table width='208' border='0' cellpadding='0' cellspacing='0' style='margin-top:1px;'>";
		o+="<tr ><td align=left><a href=# onclick=\"cmd('shlskillsort "+shlid+"');return false;\"><font color=blue>[技能]</font></a>" +
				"<a href=# onclick=\"cmd('shlHunHua "+shlid+"');return false;\"><font color=blue>[魂化]</font></a></td>" +
				"<td align=right><font style='cursor:hand' onclick=\"cmd('helpshls "+shlid+"');refreshlinfo='r';\" title=点我刷新><img src=/img/button/w_1.gif></font></td></tr></table>";
		o+="<table width='100%' border='0' cellpadding='0' cellspacing='0' style='margin-top:3px;margin-right:5px;margin-bottom:5px;'>";
		o+="<tr><td valign=top>";
		o+="<table width='190' border='0' align='center' cellpadding='0' cellspacing='1' bgcolor='#BCBCBC'><tr><td align='center' bgcolor='#E1E1E1' style='padding-top:8px;padding-bottom:10px;padding-left:22px;padding-right:22px;'>";
		o+=shlDesc;
		o+="</td></tr></table></td></tr></table>";

	   with(winObj.style){
		width="250";
		height="10";
		
		winObj.closeEvent="_getWin('showDaKongWin').style.display='none'";
		
		zIndex="2000";
		if(!refreshlinfo){//正常点说明显示
	/*
	 * if(p.eventY-13<0){ top=1; }else{ top=p.eventY-13; } if(p.eventX-250+13<0){
	 * left=1; }else{ left=p.eventX-250+13; }
	 */
			top=200;
			left=500;
		}else{//点刷新显示
			refreshlinfo=null;
		}
		overflowY="";
		display='';
	 }
  }

	
	_openWin(win,o);
}

function showSHLDescOtherLook(shlDesc){
	var win="othershlInfoWin";	
	
	var winObj=_getWin(win);
	onOpenWin(winObj);
	winObj.style.lineHeight="14pt";

	var o="";
	
		o+=shlDesc+fakeBr(5);

		with(winObj.style){
		width="250";
		height="10";
		if(p.eventY-13<0){
			top=1;
		}else{
			top=p.eventY-13;
		}
		if(p.eventX-250+13<0){
			left=1;
		}else{
			left=p.eventX-250+13;
		}
		overflowY="";
		display='';
	}

	
	_openWin(win,o);
}
/* 封印NPC当成守护灵 */
function showCanCatch(arg,arr){
	
	var winObj=_getWin("showCanCatch");
	onOpenWin(winObj);
	with(winObj.style){
		width="200";
		height="100";
		if(p.eventY-13<0){
			top=1;
		}else{
			top=p.eventY-13;
		}
		if(p.eventX-200+13<0){
			left=1;
		}else{
			left=p.eventX-200+13;
		}
		overflowY="";
		display='';
	}

	var o="<div style='padding-top:2px;'><b>【封印列表】</b>";
	o+="<br><table width='100%' bgcolor='#E1E1E1' border='0' cellpadding='0' cellspacing='0' style='margin-top:3px;margin-right:5px;margin-bottom:5px;'>";
	o+="<tr><td valign=top>";
	for(var i=0;i<arr.length;i++){
		o+="<tr valign=top>";
		o+="<td><img src='"+arr[i][4]+"'/></td><td>"+arr[i][5]+"</td><td>("+arr[i][2]+"级)</td><td><a href=# onclick=\"cmd('use "+arg+" "+arr[i][0]+" "+arr[i][1]+" "+arr[i][2]+" "+arr[i][3]+"');offOpenWin('showCanCatch');offOpenWin('tools');return false;\">封印</a></td>";
		o+="</tr>";
	}

	o+="</table>";
	o+="</div>";
	_openWin("showCanCatch",o);
}

//给守护灵起个名字
function shlqiming(index){
	var input = prompt('请输入守护灵的新名字，长度为4-12个字符。','');
	var re = /[ ]/g;
	input = input.replace(re,"");
	if(input==""){
		alert("名字不能为空");
		return ;
	}else if(input.length>12){
		alert("长度不要超过12");
		return ;
	}
	
	cmd("shlfuhua "+index+" "+input);
}

//给守护灵重新起个名字
function shlgaiming(index,shlid,itemid){
	var input = prompt('请输入守护灵的新名字，长度为4-12个字符。','');
	var re = /[ ]/g;
	input = input.replace(re,"");
	if(input==""){
		alert("名字不能为空");
		return ;
	}else if(input.length>12){
		alert("长度不要超过12");
		return ;
	}
	
	cmd("use "+index+" "+shlid+" "+itemid+" "+input);
}

// 弹出图鉴页面处理 Edit By Coolin
function tujian(petid)
{
	var url = "http://"+location.hostname+"/tujian/tujian.jsp?p="+petid;
	window.open(url,'','menubar=no,toolbar=no,location=no,directories=no,status=no,width=467px,height=450,scrollbars=yes');
}

// 弹出成就页面处理 Edit By Coolin
function openChengJiu(petid)
{
	var url = "http://"+location.hostname+"/chengjiu/chengjiu.jsp?p="+petid;
	window.open(url,'','menubar=no,toolbar=no,location=no,directories=no,status=no,width=820px,height=603,scrollbars=yes');
}


//战斗力排行显示
function openPaiHang(petid,type)
{
	var url = "http://"+location.hostname+"/zhandouli/paihang.jsp?p="+petid+"&type="+type;
	window.open(url,'','menubar=no,toolbar=no,location=no,directories=no,status=no,width=440px,height=633,scrollbars=yes');
}

//竞技场显示
function openJingJiChang(petid,petLv)
{
	if(petLv && petLv < 20) {
		p.addMessage('roomReader','<font color = red>你的级别不足</font><br/>');
		return ;
	}
	var url = "http://"+location.hostname+"/jingjichang/jingjichang.jsp;jsessionid=" + sessionId;
	window.open(url,'','menubar=no,toolbar=no,location=no,directories=no,status=no,width=920px,height=530px,scrollbars=no');
}
//扭蛋显示
function openNiuDan(petid)
{
	var url = "http://"+location.hostname+"/game/niudanji/NiuDanJi.jsp;jsessionid=" + sessionId;
	var ndjwin = window.open(url,'猫猫扭蛋机'+petid,'width=410px,height=310px,scrollbars=no');
	if(ndjwin!=null){
		ndjwin.focus();
		ndjwin.opener = p;
		ndjwin.location.reload();
	}
}

//命格显示
function openMingGe(petid)
{
	var url = "http://"+location.hostname+"/game/mingge/mingge.jsp;jsessionid=" + sessionId;
	var mingge = window.open(url,'命格'+petid,'width=450px,height=460px,scrollbars=no');
	if(mingge != null){
		mingge.focus();
		mingge.opener = p;
		mingge.location.reload();
	}
}

//守护灵技能调顺序
function shlskillsort(arrs,bornSkills,forgetSkill,lingqi,maxlanweinum,shlbossskill,shlspecialkill){

	var winObj=_getWin("showDaKongWin");
	 onOpenWin(winObj);
	with(winObj.style){
		width="220";
		height="10";
		top=200;
		left=272;
		overflowY="";
		display='';
	}

	var o="<div style='padding-top:2px;'><b>【技能列表】</b>";
	o+="<br><table width='100%' bgcolor='#E1E1E1' border='0' cellpadding='0' cellspacing='0' style='margin-top:3px;margin-right:5px;margin-bottom:5px;'>";
	o+="<tr><td valign=top>";
	if(arrs.length<=0){
		o+="还没有学到技能呢.";
	}else{
		for(var i=0;i<arrs.length;i++){
			o+="<table width='100%'><tr><td align='left' width='20%'><img src='"+arrs[i][0]+"'/></td>"
				+"<td align='left' width='30%'><a href='#' onClick=\"cmd('shlhelpsubs false "+arrs[i][4]+"');return false;\">"+arrs[i][1]+"</a></td>";
			if(forgetSkill==null){
				o+="<td align='center' width='30%'><a href='#' onclick=\"cmd('shlskillsort "+arrs[i][2]+" "+arrs[i][3]+" true');offOpenWin('showDaKongWin');return false;\">上移</a></td>"
				+"<td align='right' width='20%'><a href='#' onclick=\"cmd('shlskillsort "+arrs[i][2]+" "+arrs[i][3]+" false');offOpenWin('showDaKongWin');return false;\">下移</a></td>";

			}else{
				if(forgetSkill=='true'){
					o+="<td align='center' width='50%'><a href='#' onclick=\"forgetSHLSkillConfirm("+arrs[i][2]+","+arrs[i][3]+");offOpenWin('showDaKongWin');return false;\"><font color=red>【选择遗忘】</font></a></td>";
				}else{
					
				}
			}

			+"</tr></table>";
		}
	}
	
	//专有技能显示[名称，图片，信息，SHLID]
	if(shlspecialkill!=null){
		o+="</td></tr></table>";
		o+="</div>"
		o+=fakeBr(10);
		o+="<div style='padding-top:2px;'><b>【专有技能】</b>";
		o+="<table width='100%'><tr>"
		+"<td align='left' width='10%'><img src='"+shlspecialkill[1]+"'/></td>"
		+"<td align='left'>"
		if(shlspecialkill[5]==true){
			o+="<a href='#' onClick=\"showItemDesc('"
			+shlspecialkill[0]
			+"','"+shlspecialkill[1]
			+"','"+shlspecialkill[2]
			+"','true');return false;\">"+shlspecialkill[0]+"</a></td>";
		}
		else{
			o+=shlspecialkill[0];
		}
		//不开放专有技能刷新
		if(shlspecialkill[4]==true){
			o+="<td align='right' width='20%'><a href='#' onclick=\"cmd('shlSpecialSkillRefresh "+shlspecialkill[3]+"');offOpenWin('showDaKongWin');return false;\">刷新</a></td>";
		}

		o+="</tr></table>";
	}
	
	//特有技能显示[名称，图片，信息，SHLID]
	if(shlbossskill!=null){
		o+="</td></tr></table>";
		o+="</div>"
		o+=fakeBr(10);
		o+="<div style='padding-top:2px;'><b>【特有技能】</b>";
		o+="<table width='100%'><tr>"
		+"<td align='left' width='10%'><img src='"+shlbossskill[1]+"'/></td>"
		+"<td align='left' width='30%'><a href='#' onClick=\"showItemDesc('"
		+shlbossskill[0]
		+"','"+shlbossskill[1]
		+"','"+shlbossskill[2]
		+"','true');return false;\">"+shlbossskill[0]+"</a></td>";
		if(shlbossskill[4]==true){
			o+="<td align='right' width='20%'><a href='#' onclick=\"cmd('shlSkillRefresh "+shlbossskill[3]+" "+shlbossskill[0]+"');offOpenWin('showDaKongWin');return false;\">刷新</a></td>";
		}
		o+="</tr></table>";
	}

	
	//天生技能显示
	if(maxlanweinum<1){
		
	}else{
		o+="</td></tr></table>";
		o+="</div>"
		o+=fakeBr(10);
		o+="<div style='padding-top:2px;'><b>【天生技能】</b>";
		for(var i=0;i<bornSkills.length;i++){
			o+="<table width='100%'><tr>"
			+"<td align='left' width='10%'><img src='"+bornSkills[i][1]+"'/></td>"// 有图片后使用
			// +"<td align='left' width='10%'><img src=''/></td>"
			+"<td align='left' width='30%'><a href='#' onClick=\"cmd('shlhelpsubs true "
			+bornSkills[i][0]		// 技能ID
			+" "+bornSkills[i][3]	// 技能LV
			+" "+bornSkills[i][4]	// 技能升级所需灵气值
			+" "+bornSkills[i][5]	// 守护灵id
			+"');return false;\">"+bornSkills[i][6]+"</a></td>"
			+"<td align='right' width='20%'><a href='#' onclick=\"changeBornSkillLv("+bornSkills[i][3]+","+bornSkills[i][4]+","+bornSkills[i][0]+","+bornSkills[i][5]+",1,"+i+");return false;\">提升</a></td>"
			+"</tr></table>";
		}
		for(var i=0;i<(maxlanweinum-bornSkills.length);i++){
			o+="<table width='100%'><tr><td align='left' width='100%'><img src='img/shouhuling/bornskillimg/skill/default.gif'/></td>"
			+"</tr></table>";
		}
		o+=fakeBr(5);
		o+="<table width='100%'><tr><td align='left' width='100%'><font color=blue>天生技能栏位:    "+bornSkills.length+"/"+maxlanweinum+"</font></td></tr><tr><td align='left' width='100%'><font color=blue>"
			+" 现有灵气:   "+lingqi+"</font></td></tr></table>";
	}
	
	o+="</div>"
	_openWin("showDaKongWin",o);
}

function showHunHuaImg(trnum,type){
	var kqs = new Array("jin.gif",
		"mu.gif",
		"shui.gif",
		"huo.gif",
		"tu.gif"
	) ;
	var eps = new Array("HunShi_Jin.gif",
		"HunShi_Mu.gif" ,
		"HunShi_Shui.gif" ,
		"HunShi_Huo.gif" ,
		"HunShi_Tu.gif" 
	) ;
	var mes = "<img src=img/shl/hunhua/" ;
	if(type=="wkq"){
		mes += "what.gif title=尚未开启" ;
	}else if(type=="kq"){
		for(var i=1;i<6;i++){
			if(i==trnum){
				mes += kqs[i-1] ;
			}
		}
	}else{
		for(var i=1;i<6;i++){
			if(i==trnum){
				mes += eps[i-1] ;
			}
		}
	}
	
	return mes + " />"  ;
}

function addNum(){
	var numshow = 0 ;
	var cglshow = 0 ;
	if(null != document.getElementById("numshow")){
		numshow = document.getElementById("numshow").innerHTML ;
	}
	if(null != document.getElementById("cglshow")){
		cglshow = document.getElementById("cglshow").innerHTML ;
		if(cglshow.length > 0) {
			cglshow = cglshow.substring(0,cglshow.length-1) ;
		}
	}
	if(Number(numshow) < 3
		&& Number(cglshow) < 100) {
		numshow = Number(numshow) + Number(1) ;
		cglshow = Number(cglshow) + Number(25) ;
		if(Number(cglshow) > 100) {
			cglshow = 100 ;
		}
		document.getElementById("numshow").innerHTML = numshow ;
		document.getElementById("cglshow").innerHTML = cglshow + "%";
	}else{
		if(Number(numshow) >= 3){
			alert("已达最大添加个数！") ;
			return ;
		}
		if(Number(cglshow) >= 100) {
			alert("成功率已达100%！") ;
			return ;
		}
	}
}

function actionHunHua(shlId,shlindex,shlname){
	if(shlindex=='undefined' || shlname=='undefined'){
		alert("请先选择守护灵晶！") ;
		return ;
	}
	if(null == document.getElementById("numshow")){
		alert("暂时不能魂化！") ;
		return ;
	}else{
		var numshow = document.getElementById("numshow").innerHTML ;
		if(numshow >=0 && numshow <=3){
			p.cmd("shlHunHua "+shlId+" "+shlindex+" "+numshow+" "+shlname) ;
		}
	}
}

function shlHunHua(shlId,hunHuaInfo,img,gailu,shlname,shlindex){
	var hunHuaPro = hunHuaInfo.split(",") ;
	if(hunHuaPro.length == 5){
		var winObj=_getWin("shlHunHua");
		onOpenWin(winObj);
		with(winObj.style){
			width="220";
			height="10";
			top=200;
			left=760;
			overflowY="";
			display='';
		}
		
		var o="<div style='padding-top:2px;'><b>【魂化】</b>";
		o+="<br><table width='100%' bgcolor='#E1E1E1' border='0' cellpadding='0' cellspacing='0' style='margin-top:3px;margin-right:5px;margin-bottom:5px;'>";
		o+="<tr style='padding-top:1px;'>" +
				"<td rowspan=5 width=35% align=center><img src=" + img + " /></td>" +
				"<td align=center>"+showHunHuaImg(1,hunHuaPro[0])+"</td>" +
				"<td align=center><a href=# onclick=\"p.cmd('hsequip 0 0 "+shlId+"');return false;\">装备</a></td>" +
				"<td align=center><a href=# onclick=\"p.cmd('hsequip 1 0 "+shlId+"');return false;\">卸载</a></td>" +
		   "</tr>"  ;
		for(var k=1;k<5;k++){
			o +=
			"<tr style='padding-top:1px;'>" +
			"<td align=center>"+showHunHuaImg(k+1,hunHuaPro[k])+"</td>" +
			"<td align=center><a href=# onclick=\"p.cmd('hsequip 0 "+k+" "+shlId+"');return false;\">装备</a></td>" +
			"<td align=center><a href=# onclick=\"p.cmd('hsequip 1 "+k+" "+shlId+"');return false;\">卸载</a></td>" +
			"</tr>"
		}
		o +=
		"<tr style='padding-top:10px;'>" +
			"<td colspan=3>选择守护灵晶：</td>" +
			"<td colspan=1 align=left>" +
			"<a href=# onclick=\"p.cmd('shlHunHua "+shlId+" choose');return false;\">" +
			"<font color=#006699>[加入]</font>" +
			"</td>" +
		"</tr>" ;
		if(shlname==undefined && shlindex==undefined){
			o +=
			"<tr style='padding-top:10px;'>" +
			"<td colspan=2></td>" +
			"<td align=right>成功率</td>" +
			"<td align=left id=cglshow>"+gailu+"%</td>" +
			"</tr>" ;
		}else{
			o += 
			"<tr style='padding-top:10px;'>" +
			"<td colspan=2><a href=# onclick=\"p.cmd('helptools "+shlindex+"');return false;\">"+shlname+"</a></td>" +
			"<td align=right>成功率</td>" +
			"<td align=left id=cglshow>"+gailu+"%</td>" +
			"</tr>" ; 
		}
		o +=
		"<tr style='padding-top:10px;'>" +
			"<td colspan=3>使用销魂石提高成功率</td>" +
			"<td align=left><a href=# onclick=\"actionHunHua('"+shlId+"','"+shlindex+"','"+shlname+"');return false;\"><font color=#006699>[魂化]</font></a></td>" +
		"</tr>" +
		"<tr style='padding-top:10px;'>" +
			"<td align=right id=numshow>0</td>" +
			"<td align=left>/3</td>" +
			"<td colspan=2 align=left><a href=# onclick=addNum() ><font size=5 color=#006699>+</font></a></td>" +
		"</tr>" ;
		
		o +=
		"</table>" +
		"</div>" ;
		_openWin("shlHunHua",o);
	}else{
		alert("暂时不能魂化！") ;
	}
}

function mingGeShow(mingGeInfo){
	var mingGePro = mingGeInfo.split(",") ;
	if(mingGePro.length == 4){
		var winObj=_getWin("mingGeShow");
		onOpenWin(winObj);
		with(winObj.style){
			width="220";
			height="10";
			top=200;
			left=760;
			overflowY="";
			display='';
		}
		var o="<div style='padding-top:2px;'><b>【命格】</b>";
		o+="<br><table width='100%' bgcolor='#E1E1E1' border='0' cellpadding='0' cellspacing='0' style='margin-top:3px;margin-right:5px;margin-bottom:5px;background-image:img/mingge/back.gif'>";
		o += "</table></div>" ;
		_openWin("mingGeShow",o);
	}else{
		alert("命格系统暂时关闭，请稍后再试！") ;
		return ;
	}
}

function changeBornSkillLv(skillLv,needLingQi,skillId,shlId,changeLvNum,skillIndex){
	if(skillLv>9){
		alert("该技能已达到最高等级,无法提升!");
	}
	else{
		cmd("changeBornSkillLv "+shlId+" "+skillId+" 1 "+skillIndex);
	}
}

function forgetSHLSkillConfirm(shlId,skillId){
	var yes=confirm('确定要遗忘该技能？');
	if(yes){
		//alert('forgeted');
		cmd("forgetshlskill "+shlId+" "+skillId);
		offOpenWin('showDaKongWin');
	}else{
		//alert('failed');
	}
}

function forgetAllSHLSkillConfirm(shlId){
	var yes=confirm('确定要遗忘该守护灵的所有技能？');
	if(yes){
		//alert('forgeted');
		cmd("forgetshlskill "+shlId+" forget all");
		offOpenWin('showDaKongWin');
	}else{
		//alert('failed');
	}
}


var chunjietime ;
function openChunJie(img,disappear){
	clearTimeout(chunjietime);
	var width = document.body.scrollWidth;
	var height = document.body.scrollHeight;
	var chunjie = document.getElementById("chunjie");
	chunjie.src = img;
	chunjie.style.left = 50;
	chunjie.style.top = height/5-80;
	chunjie.style.display = "block";
	var t = parseInt(disappear);
	chunjietime = setTimeout("closeChunJie()",t);
}

function openShengDan(img,disappear){
	clearTimeout(chunjietime);
	var width = document.body.scrollWidth;
	var height = document.body.scrollHeight;
	var chunjie = document.getElementById("chunjie");
	chunjie.src = img;
	chunjie.style.left = 2;
	chunjie.style.top = height/5-84.7;
	chunjie.style.display = "block";
	var t = parseInt(disappear);
	chunjietime = setTimeout("closeChunJie()",t);
}

//攻击者效果
function openShenZhuang(img,disappear){
	clearTimeout(chunjietime);
	var width = document.body.scrollWidth;
	var height = document.body.scrollHeight;
	var chunjie = document.getElementById("chunjie");
	chunjie.src = img;
	chunjie.style.left = 0;
	chunjie.style.top = height/5;
	chunjie.style.display = "block";
	var t = parseInt(disappear);
	chunjietime = setTimeout("closeChunJie()",t);
}

//被攻击者效果
function openShenZhuanged(img,disappear){
	clearTimeout(chunjietime);
	var width = document.body.scrollWidth;
	var height = document.body.scrollHeight;
	var chunjie = document.getElementById("chunjie");
	chunjie.src = img;
	chunjie.style.left = 400;
	chunjie.style.top = height/5;
	chunjie.style.display = "block";
	var t = parseInt(disappear);
	chunjietime = setTimeout("closeChunJie()",t);
}

function closeChunJie(){
	var chunjie = document.getElementById("chunjie");
	chunjie.style.display = "none";
	chunjie.src = "/img/blank.gif";
	chunjie.style.top = 99999;
}
  
function showFriends(ipath){	
	var input=prompt('请输入一个玩家角色的名字',"");
	if(input!=null){
		cmd("use "+ipath+" "+input);
	}
}
function confirmUse(iname,ipath){
	if(confirm("对所有在线好友使用【"+iname+"】，将你的祝福带给他们？")){
		cmd("use "+ipath+" true");
	}
}
function inputLover(ipath){	
	var input=prompt('请输入你的爱人的名字',"");
	if(input!=null){
		cmd("use "+ipath+" "+input);
	}
}

function showHuiJiDuiHuan(arg){	
	var input=prompt('输入你希望给予的宠物，一个魂灯需要消耗245个勇士徽记。',"");
	if(input!=null){
		cmd("HuiJiDuiHuan "+input+" "+arg);
	}
}


function zhenxinren(mes,ipath){	
	var input=prompt(mes,"");
	if(input!=null){
		cmd("use "+ipath+" "+input);
	}
}
function inputBiaoBai(ipath){	
	var input=prompt('请输入你想要对心上人说的话，45字以内',"");
	if(input!=null){
		if(input.trim().length>45){
			alert("您输入的字数超过限制，请重新输入！");
			inputBiaoBai(ipath);
			return;
		}
		var lname=prompt('请输入心上人的名字',"");
		if(lname!=null){
			cmd("use "+ipath+" "+lname.trim()+" "+input.trim());
		}
	}
}
function inputBiaoBaiRen(ipath){	
	var input=prompt('你需要向谁表白？',"");
	if(input!=null){
		cmd("use "+ipath+" "+input);
	}
}
/*输入真心人*/
function inputZhenXinRen(){
	var input=prompt('唐僧：哦？那个人是谁？（输入名字前请确保你对方正在组队）',"");
	if(input!=null){
		cmd("findZhenXinRen "+input);
	}
}

function shlZhongDuan(shlid){
	var input=confirm('是否确定让守护灵中断当前工作并回到身边？');
	if(input==true){
		cmd("zhongduan "+shlid+" y");
	}
}
function showSelSHLs(shls,shlsmaxnum,worktypestr){
// 定义显示窗口
	var obj=getObj("showSelSHLs");
	if(obj==null){
		for(var i=0;i<winList.length;i++){
			if(winList[i]=="showSelSHLs"){
				obj = _createWin("showSelSHLs",winPos[name],winSize[name]);
			}
		}
		if (obj == null)
		{
			obj = _createWin("showSelSHLs",winPos["default"],winSize["default"]);
		}
	}
   var parentWin = getObj('npcChatReader');
	var t = parentWin.offsetTop;
	var l = parentWin.offsetLeft;
	var e = parentWin;
	while(e=e.offsetParent)
	{
		t += e.offsetTop;
		l += e.offsetLeft;
	}
	l = 18+parseInt(parentWin.style.left.replace('px',''))+parseInt(parentWin.style.width.replace('px',''));
	t = parseInt(parentWin.style.top.replace('px',''))+parseInt(parentWin.style.height.replace('px',''))-50;
	with(obj.style)
	{
		width="220";
		height="200";
		top = t+"px";
		left = l+"px";
		overflowY="";
		display='';
	}

	var show = "<font color=blue>守护灵栏&nbsp;&nbsp;&nbsp;&nbsp;"+shls.length+"/"+shlsmaxnum+"</font><br/>";
	show += "<table width='100%' border='0' cellpadding='0' cellspacing='0' style='margin-top:3px;margin-right:5px;margin-bottom:5px;'><tr><td valign=top>"
	show += "<table width='100%' border='0' align='center' cellpadding='0' cellspacing='1' bgcolor='#BCBCBC'>"
	show += "<tr><td bgcolor='#E1E1E1' style='overflow:hidden;line-height:4em;height:4em;'>"
	show += "<table border=0 cellpadding='0' cellspacing='0' width='100%'>";
	for(var i=0;i<shls.length;i++)
	{
		
		var imgclick="<img src="+shls[i][2]+" BORDER=0 width=48 height=48 />";
		
		var cor="";
		if(i%2==1){
			cor="bgcolor=#EEEEEE";
		}
		show += "<tr "+cor+"><td ><table border=0 cellpadding='0' cellspacing='0' width='100%' ><tr height=12><td rowspan=4 width=48 >"+imgclick+"</td><td width=30>名字:</td><td width=100 colspan=2 align=left>"+shls[i][0]+"</td></tr><tr  height=12><td width=30>等级:</td><td width=70 align=left>"+shls[i][1]+"</td><td width=30></td></tr><tr  height=12><td width=30>肚子:</td><td width=70 align=left>"+shls[i][3]+"</td><td width=30></td></tr><tr height=12><td width=30>心情:</td><td align=left width=70>"+shls[i][4]+"</td><td width=30><a href=# onclick=\"if(confirm('您确定要让这只守护灵来进行工作么?')){p.cmd('giveshlwork select "+shls[i][5]+" "+worktypestr+"');offOpenWin('showSelSHLs');return false;}\">[选择]</a></td></tr></table></td></tr>";
		
	}
	show += "</table></td></tr></table></td></tr></table>";

	onOpenWin(obj);
	_openWin("showSelSHLs",show);
	focusWin(obj);
}
function openWenDa(){
	var urlStr='./dati/index.jsp;jsessionid='+sessionId+'?'+new Date();
	
	var wendawin=window.open(urlStr,'wenda_'+myId,'menubar=no,toolbar=no,location=no,directories=no,status=no,width=310,height=455,left='+(p.event.screenX-318)+',top='+p.event.screenY+',scrollbars=yes');
	if(wendawin!=null){
		wendawin.focus();
	}
}

function showBiaoQing(id,isVIPbq) {
 var isshow=document.getElementById(id).style.display;
 if (isshow=='none') {
	document.getElementById(id).style.display='block';
 }else {
	document.getElementById(id).style.display='none';
 }
 if (isVIPbq)
 {
	document.getElementById('buttonbiaoqingvip').style.display='block';
 }else {
	document.getElementById('buttonbiaoqingvip').style.display='none';
 }
}

function selectBQ(obj) {
  if (obj.src!='') {
    var str=obj.src.substring(obj.src.lastIndexOf('/')+1,obj.src.lastIndexOf('.'));
	document.getElementById('inputid').value+='#'+str;
	document.getElementById('biaoQingReaderOut').style.display='none';
	document.getElementById('inputid').focus();
  }
}
function inputNameByUse(ipath){	
	var input=prompt('请输入想要使用对象的名称',"");
	if(input!=null){
		cmd("use "+ipath+" "+input);
	}
}
function changeEGao(egaopic,showtype){
	mapWin.changeEGao(egaopic,showtype);
}
function resetEGao(){
	mapWin.resetEGao();
}


/****************************add by zjm*******************************************************/
/* 显示 */
function _showXiaoPuFormula(strArg){
	var formulaWin=_getWin("showXiaoPuFormula");
	formulaWin.style.height=350;
	formulaWin.style.width=150;
	onOpenWin(formulaWin);
	var str="";
	str+="<b><font color=black>【合成列表】</font></b>";
	str+="<br><table border=0 style='margin-top:3px;margin-bottom:6px;'>";
	for(var i=0;i<strArg.length;i++){
		str+="<tr><td width=10><img src="+strArg[i][0]+"></td><td ><a href=# onclick=\"p.cmd('helpXiaoPuFormula "+strArg[i][2]+" true');return false;\">"+strArg[i][3]+"</a></td></tr>";
		
		
	}
	str+="</table>";
	
	
	_openWin("showXiaoPuFormula",str);
}

/*显示合成信息,以及开始合成窗口, 如果 isDoAct==false 仅显示合成信息**/
function _helpXiaoPuFormula(fPath,fName,fDesc,isDoAct){
	var formulaWin=_getWin("composeXiaoPuWin");
	formulaWin.style.width=280;
	onOpenWin(formulaWin);
	// _curFormulaPath=fPath;
	var str="";
	str+="<font color=green>【合成"+fName+"】</font><br>"
		+fDesc
		+(isDoAct?
			"<div align='right'><a href=# onclick=\"p.cmd('helpXiaoPuFormula "+fPath+" "+fName+" true');p.closeTaskTalk();return false;\">[合成]</a> <a href=# onclick='p.offOpenWin(\"composeXiaoPuWin\");return false;'>[取消]</a>&nbsp;&nbsp;</div>"
			:
			"<div align='right'><a href=# onclick='p.offOpenWin(\"composeXiaoPuWin\");return false;'>[取消]</a>&nbsp;&nbsp;</div>"
		)
		;
	_openWin("composeXiaoPuWin",str);
}
function showCanUseMoFaShiItem(arg,arr){
	//alert(arr);
	var winObj=_getWin("selItemCanUseMoFaShi");
	onOpenWin(winObj);
	with(winObj.style){
		width="200";
		height="10";
		if(p.eventY-13<0){
			top=1;
		}else{
			top=p.eventY-13;
		}
		if(p.eventX-200+13<0){
			left=1;
		}else{
			left=p.eventX-200+13;
		}
		overflowY="";
		display='';
	}
	var o=fakeBr(2)+"<font color=#006A6A>选择要使用魔法石的武器道具</font>"+fakeBr(4);

	for(var i=0;i<arr.length;i++){
		o+="<a href=# onclick=\"cmd('helptools "+arr[i][1]+"');hideParentMenu();return false;\">"+arr[i][2]+"</a> "+"&nbsp;&nbsp;&nbsp;     <a href=# onclick=\"cmd('use "+arg+" "+arr[i][1]+" "+arr[i][0]+"');offOpenWin('selItemCanUseMoFaShi');return false;\">使用魔法石</a><br>";
	}
	_openWin("selItemCanUseMoFaShi",o);
}
function showPartyPKDuiHuan(strArg){
	var ppduihuanWin=_getWin("showPartyPKDuiHuan");
	ppduihuanWin.style.height=200;
	ppduihuanWin.style.width=250;
	onOpenWin(ppduihuanWin);
	var str="";
	str+="<font color=blue>你想兑换什么？</font>";
	str+="<br><table border=0 style='margin-top:3px;margin-bottom:6px;'>";
	for(var i=0;i<strArg.length;i++){
		if(strArg[i][0]=="货币"){
			str+="<tr><td colspan=2 align=center>"+strArg[i][1]+"</td><td width=60 align=right>"+strArg[i][3]+"机油</td><td width=60><a href=# onclick=\"p.cmd('duihuan "+strArg[i][0]+" "+i+"');return false;\">【兑换】</a></td></tr>";		
		}else{
			str+="<tr><td><img src="+strArg[i][1]+"></td><td><a href=# onclick=\"p.cmd('helpt "+strArg[i][4]+"');return false;\">"+strArg[i][0]+"</a>x"+strArg[i][2]+"</td><td width=60 align=right>"+strArg[i][3]+"机油</td><td  width=60><a href=# onclick=\"p.cmd('duihuan "+strArg[i][0]+" "+i+"');return false;\">【兑换】</a></td></tr>";		
		}			
	}
	str+="</table>";
	
	
	_openWin("showPartyPKDuiHuan",str);
}
function isShangJiaoAll(itemnum){
	if(confirm("你一共有"+itemnum+"个测试用零件，是否全部上交？")){
		cmd("shangjiao all");
	}
}
function showPartyPKPaiHang(strArg){
	var ppduihuanWin=_getWin("showPartyPKPaiHang");
	ppduihuanWin.style.height=160;
	ppduihuanWin.style.width=200;
	onOpenWin(ppduihuanWin);
	var str="";
	str+="<font color=blue>道具上交排行</font>";
	str+="<br><table border=0 style='margin-top:3px;margin-bottom:6px;'>";
	for(var i=0;i<strArg.length;i++){		
		str+="<tr><td width=150>"+(i+1)+".&nbsp;"+strArg[i][0]+"</td><td width=50>"+strArg[i][1]+"个</td></tr>";						
	}
	str+="</table>";
	
	
	_openWin("showPartyPKPaiHang",str);
}

function showGongHuiPK() {
	window.open('gonghuiPK/index.jsp;jsessionid='+sessionId,'','menubar=no,toolbar=no,location=no,directories=no,status=no,width=316,height=410,left='+(p.event.screenX-360)+',top='+p.event.screenY+',scrollbars=yes');
}
function showFlyList(strArg){
	var flylistWin=_getWin("showFlyList");
	flylistWin.style.height=200;
	flylistWin.style.width=250;
	onOpenWin(flylistWin);
	var str="可传送的人员名单";
	if(strArg.length==0){
		str+="<p><a href=# onclick=\"p.cmd('flyother all true');p.closeTaskTalk();offOpenWin('showFlyList');return false;\">无人在场内，选择将把所有队员一同传送入场上随机点</a>";
	}else{
		str+="<br><table border=0 style='margin-top:3px;margin-bottom:6px;' width=90%>";
		for(var i=0;i<strArg.length;i++){
			str+="<tr><td>"+strArg[i]+"</td><td width=50 align=center><a href=# onclick=\"p.cmd('flyother "+strArg[i]+"');p.closeTaskTalk();offOpenWin('showFlyList');return false;\">传送</a></td></tr>";						
		}
		str+="</table>";
	}	
	_openWin("showFlyList",str);
	
}
function openZhuan(){
	var urlStr='./dashenjiangli/index.jsp';
	var dasjliwin=window.open(urlStr,'dasjli_'+myId,'menubar=no,toolbar=no,location=no,directories=no,status=no,width=485,height=455,left='+(p.event.screenX-318)+',top='+p.event.screenY+',scrollbars=yes');
	if(dasjliwin!=null){
		dasjliwin.focus();
	}
}

function showNewPartyWinner(dname){
	window.open('http://'+dname+'/eyun/partypk/newestPartyWinner.jsp;jsessionid='+sessionId,'','menubar=no,toolbar=no,location=no,directories=no,status=no,width=280,height=410,left='+(p.event.screenX-360)+',top='+p.event.screenY+',scrollbars=yes');
}
function showTopPartyPaihang(dname){
	window.open('http://'+dname+'/eyun/partypk/topPartyPaihang.jsp;jsessionid='+sessionId,'','menubar=no,toolbar=no,location=no,directories=no,status=no,width=280,height=410,left='+(p.event.screenX-360)+',top='+p.event.screenY+',scrollbars=yes');
}
function showBestWinnerPlayer(dname){
	window.open('http://'+dname+'/eyun/partypk/bestWinnerPlayer.jsp;jsessionid='+sessionId,'','menubar=no,toolbar=no,location=no,directories=no,status=no,width=280,height=410,left='+(p.event.screenX-360)+',top='+p.event.screenY+',scrollbars=yes');
}


function showTuoGuanSHLs(shls,shlsmaxnum,needmoney){
// 定义显示窗口
	var obj=getObj("showTuoGuanSHLs");
	if(obj==null){
		for(var i=0;i<winList.length;i++){
			if(winList[i]=="showTuoGuanSHLs"){
				obj = _createWin("showTuoGuanSHLs",winPos[name],winSize[name]);
			}
		}
		if (obj == null)
		{
			obj = _createWin("showTuoGuanSHLs",winPos["default"],winSize["default"]);
		}
	}
   var parentWin = getObj('npcChatReader');
	var t = parentWin.offsetTop;
	var l = parentWin.offsetLeft;
	var e = parentWin;
	while(e=e.offsetParent)
	{
		t += e.offsetTop;
		l += e.offsetLeft;
	}
	l = 18+parseInt(parentWin.style.left.replace('px',''))+parseInt(parentWin.style.width.replace('px',''));
	t = parseInt(parentWin.style.top.replace('px',''))+parseInt(parentWin.style.height.replace('px',''))-50;
	with(obj.style)
	{
		width="220";
		height="200";
		top = t+"px";
		left = l+"px";
		overflowY="";
		display='';
	}

	var show = "<font color=blue>选择守护灵&nbsp;&nbsp;&nbsp;&nbsp;"+shls.length+"/"+shlsmaxnum+"</font><br/>";
	show += "<table width='100%' border='0' cellpadding='0' cellspacing='0' style='margin-top:3px;margin-right:5px;margin-bottom:5px;'><tr><td valign=top>"
	show += "<table width='100%' border='0' align='center' cellpadding='0' cellspacing='1' bgcolor='#BCBCBC'>"
	show += "<tr><td bgcolor='#E1E1E1' style='overflow:hidden;line-height:4em;height:4em;'>"
	show += "<table border=0 cellpadding='0' cellspacing='0' width='100%'>";
	for(var i=0;i<shls.length;i++)
	{
		
		var imgclick="<img src="+shls[i][2]+" BORDER=0 width=48 height=48 />";
		
		var cor="";
		if(i%2==1){
			cor="bgcolor=#EEEEEE";
		}
		show += "<tr "+cor+"><td ><table border=0 cellpadding='0' cellspacing='0' width='100%' ><tr height=12><td rowspan=4 width=48 >"+imgclick+"</td><td width=30>名字:</td><td width=100 colspan=2 align=left>"+shls[i][0]+"</td></tr><tr  height=12><td width=30>等级:</td><td width=70 align=left>"+shls[i][1]+"</td><td width=30></td></tr><tr  height=12><td width=30>肚子:</td><td width=70 align=left>"+shls[i][3]+"</td><td width=30></td></tr><tr height=12><td width=30>心情:</td><td align=left width=70>"+shls[i][4]+"</td><td width=30><a href=# onclick=\"selectTuoGuanSHL('"+shls[i][5]+"',"+needmoney+");offOpenWin('showTuoGuanSHLs');return false;\">[选择]</a></td></tr></table></td></tr>";
		
	}
	show += "</table></td></tr></table></td></tr></table>";

	onOpenWin(obj);
	_openWin("showTuoGuanSHLs",show);
	focusWin(obj);
}

function showJianDingSHLs(shls,shlsmaxnum,arg){
// 定义显示窗口
	var obj=getObj("showJianDingSHLs");
	if(obj==null){
		for(var i=0;i<winList.length;i++){
			if(winList[i]=="showJianDingSHLs"){
				obj = _createWin("showJianDingSHLs",winPos[name],winSize[name]);
			}
		}
		if (obj == null)
		{
			obj = _createWin("showJianDingSHLs",winPos["default"],winSize["default"]);
		}
	}
   var parentWin = getObj('npcChatReader');
	var t = parentWin.offsetTop;
	var l = parentWin.offsetLeft;
	var e = parentWin;
	while(e=e.offsetParent)
	{
		t += e.offsetTop;
		l += e.offsetLeft;
	}
	l = 18+parseInt(parentWin.style.left.replace('px',''))+parseInt(parentWin.style.width.replace('px',''));
	t = parseInt(parentWin.style.top.replace('px',''))+parseInt(parentWin.style.height.replace('px',''))-50;
	with(obj.style)
	{
		width="220";
		height="200";
		top = t+"px";
		left = l+"px";
		overflowY="";
		display='';
	}

	var show = "<font color=blue>选择守护灵&nbsp;&nbsp;&nbsp;&nbsp;"+shls.length+"/"+shlsmaxnum+"</font><br/>";
	show += "<table width='100%' border='0' cellpadding='0' cellspacing='0' style='margin-top:3px;margin-right:5px;margin-bottom:5px;'><tr><td valign=top>"
	show += "<table width='100%' border='0' align='center' cellpadding='0' cellspacing='1' bgcolor='#BCBCBC'>"
	show += "<tr><td bgcolor='#E1E1E1' style='overflow:hidden;line-height:4em;height:4em;'>"
	show += "<table border=0 cellpadding='0' cellspacing='0' width='100%'>";
	if(arg==null)// 鉴定技能
	{
		for(var i=0;i<shls.length;i++)
		{
			
			var imgclick="<img src="+shls[i][2]+" BORDER=0 width=48 height=48 />";
			
			var cor="";
			if(i%2==1){
				cor="bgcolor=#EEEEEE";
			}
			show += "<tr "+cor+"><td ><table border=0 cellpadding='0' cellspacing='0' width='100%' ><tr height=12><td rowspan=4 width=48 >"+imgclick
			+"</td><td width=30>名字:</td><td width=100 colspan=2 align=left>"+shls[i][0]
			+"</td></tr><tr  height=12><td width=30>等级:</td><td width=70 align=left>"+shls[i][1]
			+"</td><td width=30></td></tr><tr  height=12><td width=30>肚子:</td><td width=70 align=left>"
			+shls[i][3]+"</td><td width=30></td></tr><tr height=12><td width=30>心情:</td><td align=left width=70>"
			+shls[i][4]+"</td><td width=30><a href=# onclick=\"p.cmd('jiandingshl "+shls[i][5]+"');offOpenWin('showJianDingSHLs');return false;\">[确定]</a></td></tr></table></td></tr>";
		}
	}
	else// 刷新天生技能
	{
		for(var i=0;i<shls.length;i++)
		{
			
			var imgclick="<img src="+shls[i][2]+" BORDER=0 width=48 height=48 />";
			
			var cor="";
			if(i%2==1){
				cor="bgcolor=#EEEEEE";
			}
			show += "<tr "+cor+"><td ><table border=0 cellpadding='0' cellspacing='0' width='100%' ><tr height=12><td rowspan=4 width=48 >"+imgclick
			+"</td><td width=30>名字:</td><td width=100 colspan=2 align=left>"+shls[i][0]
			+"</td></tr><tr  height=12><td width=30>等级:</td><td width=70 align=left>"+shls[i][1]
			+"</td><td width=30></td></tr><tr  height=12><td width=30>肚子:</td><td width=70 align=left>"
			+shls[i][3]+"</td><td width=30></td></tr><tr height=12><td width=30>心情:</td><td align=left width=70>"
			+shls[i][4]+"</td><td width=30><a href=# onclick=\"refreshBornSkill('"+ arg +"','"+shls[i][6]+"','"+shls[i][5]+"','"+shls[i][7]+"','"+shls[i][8]+"');offOpenWin('showJianDingSHLs');return false;\">[确定]</a></td></tr></table></td></tr>";
		}
	
	}
	show += "</table></td></tr></table></td></tr></table>";

	onOpenWin(obj);
	_openWin("showJianDingSHLs",show);
	focusWin(obj);
}

function selectTuoGuanSHL(shlid,needmoney){
	
		var input=prompt('请输入要托管的小时数（最低1小时，最多8小时）',1);
		if(input!=null){
			if(checkInt(input)){
				if(input<1){
					alert("托管的小时数不能低于1小时!");
					selectTuoGuanSHL(shlid);
				}else if(input>8){
					alert("托管的小时数不能高于8小时!");
					selectTuoGuanSHL(shlid);
				}else{
					if(confirm("你确认要托管守护灵"+input+"小时，花费"+(input*needmoney)+"猫眼吗？")){
						cmd("tuoguanshl select "+shlid+" "+input);
					}
				}
			}else{
				alert("请输入正确的数字!");
				selectTuoGuanSHL(shlid);
			}
		}
	
}
function showCanUse(arg,arr){
	//alert(arr);
	var winObj=_getWin("selItemCanUseChuLiYi");
	onOpenWin(winObj);
	with(winObj.style){
		width="200";
		height="10";
		if(p.eventY-13<0){
			top=1;
		}else{
			top=p.eventY-13;
		}
		if(p.eventX-200+13<0){
			left=1;
		}else{
			left=p.eventX-200+13;
		}
		overflowY="";
		display='';
	}
	var o=fakeBr(2)+"<font color=#006A6A>选择道具</font>"+fakeBr(4);

	for(var i=0;i<arr.length;i++){
		o+="<a href=# onclick=\"cmd('helptools "+arr[i][1]+"');hideParentMenu();return false;\">"+arr[i][2]+"</a> "+"&nbsp;&nbsp;&nbsp;     <a href=# onclick=\"if(confirm('升级之后原装备上的额外增益属性（如打孔，塞菲之星等）将会消失，确认要升级吗？')){cmd('use "+arg+" "+arr[i][1]+" "+arr[i][0]+"');offOpenWin('selItemCanUseChuLiYi');return false;}\">选择</a><br>";
	}
	_openWin("selItemCanUseChuLiYi",o);
}
function showCanUseQiangNeng(arg,arr){
	//alert(arr);
	var winObj=_getWin("selItemCanUseQiangNeng");
	onOpenWin(winObj);
	with(winObj.style){
		width="200";
		height="10";
		if(p.eventY-13<0){
			top=1;
		}else{
			top=p.eventY-13;
		}
		if(p.eventX-200+13<0){
			left=1;
		}else{
			left=p.eventX-200+13;
		}
		overflowY="";
		display='';
	}
	var o=fakeBr(2)+"<font color=#006A6A>选择道具</font>"+fakeBr(4);

	for(var i=0;i<arr.length;i++){
		o+="<a href=# onclick=\"cmd('helptools "+arr[i][1]+"');hideParentMenu();return false;\">"+arr[i][2]+"</a> "+"&nbsp;&nbsp;&nbsp;     <a href=# onclick=\"if(confirm('升级后属性将有极大提升，是否将"+arr[i][0]+"到70级？')){cmd('use "+arg+" "+arr[i][1]+" "+arr[i][0]+"');offOpenWin('selItemCanUseQiangNeng');return false;}\">选择</a><br>";
	}
	_openWin("selItemCanUseQiangNeng",o);
}
function buykey(keypath,needcoin){
	
		var input=prompt('请输入要购买钥匙的个数(1-99)',1);
		if(input!=null){
			if(checkInt(input)){
				if(input<1){
					alert("购买钥匙个数不能低于1把!");
					buykey(keypath,needcoin);
				}else if(input>99){
					alert("购买钥匙个数不能高于99把!");
					buykey(keypath,needcoin);
				}else{
					if(confirm("该钥匙"+needcoin+"1把，你确定要买"+input+"把这种钥匙吗？")){
						cmd("buykey "+keypath+" "+input);
					}
				}
			}else{
				alert("请输入正确的数字!");
				buykey(keypath,needcoin);
			}
		}	
}
//针对类似方法冗余，特写一个可应用于该类型道具的通用方法  lc 2009-09-09
function showCanUseUtil(arg,arr,title,act,needconfirm,confcontent){
	//alert(arr);
	var winObj=_getWin("selItemCanUseUtil");
	onOpenWin(winObj);
	with(winObj.style){
		width="200";
		height="10";
		if(p.eventY-13<0){
			top=1;
		}else{
			top=p.eventY-13;
		}
		if(p.eventX-200+13<0){
			left=1;
		}else{
			left=p.eventX-200+13;
		}
		overflowY="";
		display='';
	}
	var o=fakeBr(2)+"<font color=#006A6A>"+title+"</font>"+fakeBr(4);
	
	if(needconfirm){
		for(var i=0;i<arr.length;i++){
			o+="<a href=# onclick=\"cmd('helptools "+arr[i][1]+"');hideParentMenu();return false;\">"+arr[i][2]+"</a> "+"&nbsp;&nbsp;&nbsp;     <a href=# onclick=\"if(confirm('"+confcontent+"')){cmd('use "+arg+" "+arr[i][1]+" "+arr[i][0]+"');offOpenWin('selItemCanUseUtil');return false;}\">"+act+"</a><br>";
		}
	}else{
		for(var i=0;i<arr.length;i++){
			o+="<a href=# onclick=\"cmd('helptools "+arr[i][1]+"');hideParentMenu();return false;\">"+arr[i][2]+"</a> "+"&nbsp;&nbsp;&nbsp;     <a href=# onclick=\"cmd('use "+arg+" "+arr[i][1]+" "+arr[i][0]+"');offOpenWin('selItemCanUseUtil');return false;\">"+act+"</a><br>";
		}
	}
	
	_openWin("selItemCanUseUtil",o);
}
function showCanUseJiLvShi(arg,arr){
	//alert(arr);
	var winObj=_getWin("selItemCanUseJiLvShi");
	onOpenWin(winObj);
	with(winObj.style){
		width="200";
		height="10";
		if(p.eventY-13<0){
			top=1;
		}else{
			top=p.eventY-13;
		}
		if(p.eventX-200+13<0){
			left=1;
		}else{
			left=p.eventX-200+13;
		}
		overflowY="";
		display='';
	}
	var o=fakeBr(2)+"<font color=#006A6A>选择道具</font>"+fakeBr(4);
	
	
	for(var i=0;i<arr.length;i++){
		if(arr[i][3]){
			o+="<a href=# onclick=\"cmd('helptools "+arr[i][1]+"');hideParentMenu();return false;\">"+arr[i][2]+"</a> "+"&nbsp;&nbsp;&nbsp;     <a href=# onclick=\"if(confirm('是否用新的触发增效石替换原有的效果？')){cmd('use "+arg+" "+arr[i][1]+" "+arr[i][0]+"');offOpenWin('selItemCanUseJiLvShi');return false;}\">使用</a><br>";
		}else{
			o+="<a href=# onclick=\"cmd('helptools "+arr[i][1]+"');hideParentMenu();return false;\">"+arr[i][2]+"</a> "+"&nbsp;&nbsp;&nbsp;     <a href=# onclick=\"cmd('use "+arg+" "+arr[i][1]+" "+arr[i][0]+"');offOpenWin('selItemCanUseJiLvShi');return false;\">使用</a><br>";		
		}
	}
		
	_openWin("selItemCanUseJiLvShi",o);
}
/*显示VIP的功能模块*/
function _showVIPModules(petname,petlv,setVip,exptimeStr,arr){

	var reWin=document.all("amityWin")==null;
	if(!reWin){
		reWin=document.all("amityWin").style.display=="none";
	}


	
	var winObj=_getWin("selshowVIPModules");
	onOpenWin(winObj);
	winObj.style.height=180;
	
	
	var str="<b><font color=black>【VIP】</font></b>";

	str+="<br><table width='100%' hight=110 bgcolor='#E1E1E1' border='1' cellpadding='0' cellspacing='0' style='margin-top:3px;margin-right:5px;'>";
		str+="<tr><td valign=top>";
		

	str+="<table width='135' border='0' align='center' cellpadding='0' cellspacing='1'>";
	str+="<tr><td align=left>      "+petname+"  Lv<font color=red>"+petlv+"</font></td></tr>";
	

	str+="<tr><td>VIP设置 <INPUT TYPE='radio' NAME='vipkaiguan' value=true "+(setVip?"checked":"")+" onclick=\"cmd('showVIP setvip true');hideParentMenu();return false;\">开";
	str+="<input TYPE='radio' NAME='vipkaiguan' value=false "+(!setVip?"checked":"")+" onclick=\"cmd('showVIP setvip false');hideParentMenu();return false;\">关</td></tr>";
	str+="<tr><td align=left>------VIP功能------</td></tr>";
	for(var i=0;i<arr.length;i++){
		str+="<tr><td>"+arr[i][0]+"    <a href=# onclick=\"cmd('showVIP "+arr[i][1]+"');hideParentMenu();return false;\">查看</a></td></tr>";
	}
	str+="<tr><td>VIP剩余时间："+exptimeStr+"</td></tr>";
	str+="</table>";
	str+="<hr size=1 color='#BCBCBC' width='80%'>";
	str+="</td></tr></table>";
	_openWin("selshowVIPModules",str);
}

function showStoreVIPCangKuItems(arr,max,pageflag,canCun,itemSize){
	onOpenWin(_getWin("listVIPCangkuStoreTools"));
	
	
	var o="<table height=2 cellpadding='0' cellspacing='0'><tr><td></td></tr></table>";
	o+="<font color=red>目前寄存 ("+itemSize+" max "+max+") <hr size=1>";
	if (canCun && canCun!=null&& canCun!='null' && canCun=='canCun')
	{
		o+="<a href=# onclick=\"showVIPCunList();\">[放入]</a>";
	}
	
	o+="<table border=0>";
	for(var i=0;i<arr.length;i++){
		o+=("<tr><td width=150><a href=# onclick=\"p.cmd('helptools sv_"+arr[i][3]+"');return false;\">"+arr[i][0]+"</a></td><td><nobr><font color=red>"+arr[i][1]+"</font></nobr></td><td width=5></td><td><nobr><a href=# onclick=\"getVIPStoreItemsPop('"+arr[i][0]+"',"+arr[i][3]+");\">[取回]</a></nobr></td></tr>");
	}
	o+="</table>";
	if (pageflag && pageflag!=null&& pageflag!='null' )
	{
		if (pageflag=='hasNext') {
			o+="<table align=right height=6 cellpadding='0' cellspacing='0'><tr><td ><a href=# onclick=\"p.cmd('viewVIPCangku next');return false;\">下一页</a></td></tr></table>";
		}else if (pageflag=='hasPre') {
			o+="<table align=right height=6 cellpadding='0' cellspacing='0'><tr><td ><a href=# onclick=\"p.cmd('viewVIPCangku pre');return false;\">上一页</a></td></tr></table>";
		}
	}else {
		o+="<table height=6 cellpadding='0' cellspacing='0'><tr><td></td></tr></table>";
	}
	_openWin("listVIPCangkuStoreTools",o);

}
function getVIPStoreItemsPop(toolName,index){
	var input=prompt('请输入要取回 ['+toolName+'] 的数量','全部');
	if(input!=null){
		cmd('viewVIPCangku '+index+' '+input);
		return;
	}
}
function showVIPCunList(){
	window.open('vipCangKu.jsp;jsessionid='+sessionId+'?'+new Date(),'','menubar=no,toolbar=no,location=no,directories=no,status=no,width=280,height=410,left='+(p.event.screenX-360)+',top='+p.event.screenY+',scrollbars=yes');
}

function showBiaoQingList(id1,id2) {
	
	document.getElementById(id1).style.display='block';
	document.getElementById(id2).style.display='none';

}
function showVIPFlyFriends(){
var winObj=_getWin("VIPFlyFriends");
	onOpenWin(winObj);
	with(winObj.style){
		width="200";
		height="10";
		if(p.eventY-13<0){
			top=1;
		}else{
			top=p.eventY-13;
		}
		if(p.eventX-200+13<0){
			left=1;
		}else{
			left=p.eventX-200+13;
		}
		overflowY="";
		display='';
	}
	var o="<table width=90%><tr><td colspan=2 align=center><font color=#006A6A>好友传送</font></td></tr>";
	
	for(var i=0;i<myIM.length;i++){
			if(myIM[i][2]){
				o+="<tr><td align=center><font color=000000>"+myIM[i][1]+"</font></td>";
				o+="<td align=center>[<a href=# onClick=\"cmd('vipflyfrd "+myIM[i][0]+"');offOpenWin('VIPFlyFriends');return false;\"><font color=blue>传送</font></a>]</td></tr>";
			}
		}
		o+="</table>";
		_openWin("VIPFlyFriends",o);

}

function showMMBuy(arg,itemid,renum,arr){ 
	var winObj=_getWin("showMMBuyWin");
	onOpenWin(winObj);
	with(winObj.style){
		width="400";
		height="10";
		if(p.eventY<0){
			top=1;
		}else{
			top=p.eventY;
		}
		if(p.eventX-400<0){
			left=1;
		}else{
			left=p.eventX-400;
		}
		overflowY="";
		display='';
	}

	var o="<table width=98% border=0 style='margin-top=14;'>";
	o+="<tr><td align=center colspan=3><a href=# onClick=\"dazheshuaxin('"+arg+"','"+itemid+"',"+renum+");\">刷新</a></td></tr><tr><td align=center colspan=3>点击刷新有三次刷新打折道具的机会</td></tr>";
	for(var i=0;i<arr.length;i++){
		if(i%2==0){
			o+="<tr>";
		}
		o+="<td width=50% align=center style='border: 1px solid #B9B9B9;'><table width=100% border=0 style='background-color:#E2E2E2;margin=1;'>";
		o+="<tr><td width=32 valign=middle align=center rowspan=4><img src="+arr[i][7]+"></td><td colspan=2 align=left valign=bottom class=bt_09A8C8>"+arr[i][2]+(arr[i][3]>1?"x"+arr[i][3]:"")+"</td></tr>";
		o+="<tr><td valign=top class=bt_E73600 >原价：</td><td valign=top class=bt_E73600 >"+arr[i][4]+" MM</td></tr>";
		o+="<tr><td valign=top class=bt_E73601 >打折价：</td><td valign=top class=bt_E73601 >"+arr[i][5]+" MM</td></tr>";
		o+="<tr><td valign=top >数量：</td><td valign=top><input name=buynum"+arr[i][1]+" type=text value=1 style='border: 1px solid #333333; width:30px; height:18px;'/><a href=# onClick=buydazhe('"+arg+"','"+itemid+"','"+arr[i][0]+"',"+arr[i][1]+","+arr[i][5]+","+arr[i][3]+",'"+arr[i][6]+"');event.cancelBubble=true;><img src=shop/images/buy.gif  height=15 hspace=5 border=0/></a></td></tr>";
		// o+="<tr><td colspan=3 align=center valign=bottom class=bt_E73600><a
		// href=#
		// onClick=buydazhe('"+arg+"','"+itemid+"','"+arr[i][0]+"',"+arr[i][1]+","+arr[i][5]+","+arr[i][3]+",'"+arr[i][6]+"');event.cancelBubble=true;><img
		// src=shop/images/buy.gif height=15 hspace=5 border=0/></a></td></tr>";
		o+="</table></td>";
		if(i%2==1){
			o+="</tr>";
		}
	}

	
	o+="</table>";
	_openWin("showMMBuyWin",o);
}
function buydazhe(arg,itemid,name,index,mm,amount,isamout){
	var s=getObj("buynum"+index).value;
	var msg="";
	if(s<=0||isNaN(s))s=1;
	if(isamout == "false"&&s>1){
		s=1;
		getObj("buynum"+index).value = 1;
		msg =  "此种道具一次只能购买"+(s*amount)+"个，";
	}
	if(s>999){
		alert('最多一次购买999个');
		return;
	}
	
	if(confirm(msg+'确认要购买 ['+name+'] x '+(s*amount)+' 共花费: '+(s*mm)+' MM ')){
		cmd('use '+arg+' '+itemid+' '+name+' '+index+' '+s);
		offOpenWin('showMMBuyWin');
	}
}
function dazheshuaxin(arg,itemid,renum){
	if(renum>=3){
		alert('3次刷新打折道具的机会已经用完，不能刷新');
		return;
	}
	cmd('use '+arg+' '+itemid);
	offOpenWin('showMMBuyWin');
}
function bigFighter(obj,bignum){
	if(bignum!=1){
		obj.style.zoom=bignum;
	}
}
//:袋子:start
function selGetEquip(selfIndex,bagid,arr){
	//alert(arr);
	var winObj=_getWin("selInnerEquip");
	onOpenWin(winObj);
	with(winObj.style){
		width="200";
		height="10";
		if(p.eventY-13<0){
			top=1;
		}else{
			top=p.eventY-13;
		}
		if(p.eventX-200+13<0){
			left=1;
		}else{
			left=p.eventX-200+13;
		}
		overflowY="";
		display='';
	}
	var o=fakeBr(2)+"<font color=#006A6A>选择要取出的装备</font>"+fakeBr(4);
	if(arr.length>0){
		o+="<a href=# onclick=\"cmd('use "+selfIndex+" getAll');offOpenWin('selInnerEquip');return false;\">[全部取出]</a>";
	}
	o+="<table border=0>";
	for(var i=0;i<arr.length;i++){
		o+="<tr><td><a href=# onclick=\"cmd('helptools bag "+bagid+" "+i+"');return false;\"><font color="+arr[i][2]+">"+arr[i][0]+"</font></a></td><td><a href=# onclick=\"cmd('use "+selfIndex+" get "+arr[i][0]+" "+arr[i][1]+"');offOpenWin('selInnerEquip');return false;\">[取出]</a></td></tr>";
	}
	o+="</table>";
	
	_openWin("selInnerEquip",o);
}

function selInnerEquips(selfIndex,arr){
	//alert(arr);
	var winObj=_getWin("selInnerEquips");
	onOpenWin(winObj);
	with(winObj.style){
		width="200";
		height="10";
		if(p.eventY-13<0){
			top=1;
		}else{
			top=p.eventY-13;
		}
		if(p.eventX-200+13<0){
			left=1;
		}else{
			left=p.eventX-200+13;
		}
		overflowY="";
		display='';
	}
	var o=fakeBr(2)+"<font color=#006A6A>选择要放入的装备</font>"+fakeBr(4);

	for(var i=0;i<arr.length;i++){
		o+="<font color="+arr[i][2]+">"+arr[i][0]+"</font>&nbsp;&nbsp;&nbsp;&nbsp;<a href=# onclick=\"cmd('use "+selfIndex+" putin "+arr[i][1]+" "+arr[i][0]+" ');offOpenWin('selInnerEquips');return false;\">[放入]</a><br>";
	}
	_openWin("selInnerEquips",o);
}
function selInnerOrGetEquip(index,canPutin,canGet,canChangeName){//index=bag索引 canPutin目前是否可以放入东西 canGet 目前是否可以取出东西
	var winObj=_getWin("selInnerOrGetEquip");
	onOpenWin(winObj);
	with(winObj.style){
		width="210";
		height="50";


		if(p.eventY-13<0){
			top=1;
		}else{
			top=p.eventY-25;
		}
		if(p.eventX-210+103<0){
			left=1;
		}else{
			left=p.eventX-210+110;
		}
	}
		overflowY="";
		display='';
	
	var o="";
		o+=""
		+(canPutin?"&nbsp;&nbsp;&nbsp;&nbsp;<a href=# onclick=\"cmd('use "+index+" putin');offOpenWin('selInnerOrGetEquip');return false;\">放入</a>":"")
		+(canGet?"&nbsp;&nbsp;&nbsp;&nbsp;<a href=# onclick=\"cmd('use "+index+" get');offOpenWin('selInnerOrGetEquip');return false;\">取出</a>":"")
		+"&nbsp;&nbsp;&nbsp;&nbsp;<a href=# onclick=\"cmd('use "+index+" equipall');offOpenWin('selInnerOrGetEquip');return false;\">换装</a>"
		+(canChangeName?"&nbsp;&nbsp;&nbsp;&nbsp;<a href=# onclick=\"_setAliansToEquipBag("+index+");offOpenWin('selInnerOrGetEquip');return false;\">重命名</a>":"")
		;
	
	
	o+=fakeBr(10);
	_openWin("selInnerOrGetEquip",o);
}
function showZiShenPaiHang(servername,myorder,pagenum,cannext,canpre,arr){
var winObj=_getWin("showZiShenPaiHang");
	onOpenWin(winObj);
	with(winObj.style){
		width="200";
		height="10";
		// if(p.eventY-13<0){
		// top=1;
		// }else{
		// top=p.eventY-13;
		// }
		// if(p.eventX-200+13<0){
		// left=1;
		// }else{
		// left=p.eventX-200+13;
		// }
		overflowY="";
		display='';
	}
	var o=fakeBr(2)+"<font color=#006A6A>纪念编号排行</font>";
	o+="<br>服务器："+servername+fakeBr(4);
	o+="<table border=0 width=90%>";
	o+="<tr><td align=center><b>编号</b></td><td align=center><b>名称</b></td></tr>";
	for(var i=0;i<arr.length;i++){
		o+="<tr><td align=center>"+(arr[i][0].length<2?"0"+arr[i][0]:arr[i][0])+"、</td><td align=center>"+arr[i][1]+"</td></tr>";
	}
	o+="<tr><td align=center>"+(canpre?("<a href=# onclick=\"cmd('chakanhkph "+(pagenum-1)+"');offOpenWin('showZiShenPaiHang');return false;\">上一页</a>"):"")+"</td><td align=center>"+(cannext?("<a href=# onclick=\"cmd('chakanhkph "+(pagenum+1)+"');offOpenWin('showZiShenPaiHang');return false;\">下一页</a>"):"")+"</td></tr>";
	o+="</table>";
	o+="<br><font color=red>"+(myorder>0?("你的纪念编号为："+(myorder<10?"0"+myorder:myorder)):"你还没有资深排行数据，请登记猫游高级证书后再进行排行查询")+"</font>";
	_openWin("showZiShenPaiHang",o);
}

function showShengXiaoZuoQi(index,arr){
var winObj=_getWin("showShengXiaoZuoQi");
	onOpenWin(winObj);
	with(winObj.style){
		width="200";
		height="10";
		overflowY="";
		display='';
	}
	var o="请选择要更换的生肖坐骑"+fakeBr(2);
	o+="<table border=0 width=90%>";
	for(var i=0;i<arr.length;i++){
		o+="<tr><td align=center><a href=# onclick=\"cmd('npchelptools "+arr[i][0]+"');return false;\">"+arr[i][1]+"</a></td><td align=center><a href=# onclick=\"p.exchangeZuoQi('"+index+"','"+arr[i][0]+"','"+arr[i][2]+"');return false;\"><font color=blue>【替换】</font></a></td></tr>";
	}
	o+="</table>";
	_openWin("showShengXiaoZuoQi",o);
}

function exchangeZuoQi(index,zqPath,zqName){
	if(confirm('确认要替换为【'+zqName+'】吗?')){
		cmd("exchangezuoqi "+index+" "+zqPath);
	}
}

function listShuiJingDaoSell(listArr){

	var winObj=_getWin("listSellTools");
	onOpenWin(winObj);
	var o="";
	o+=fakeBr(4);
	o+="<font color=red>你想买什么?</font>";
	

	// for tags select
	o+="<br>";

	o+="<table border=0 style='margin-top:3px;margin-bottom:6px;' width=100%>";
	for(var i=0;i<listArr.length;i++){
		var need=listArr[i][2]>0?"<font color=blue>"+listArr[i][2]+"声望</font>":listArr[i][1];
		o+="<tr><td><img src="+listArr[i][4]+"></td><td><a href=# onclick=\"p.cmd('helptools "+listArr[i][3]+"');return false;\">"+listArr[i][0]+"</a></td><td width=50 align=center>"+need+"</td><td width=28>"+listArr[i][8]+"</td><td><a href=# onclick=\"p.buySJDItem('"+listArr[i][5]+"','"+listArr[i][3]+"',"+listArr[i][6]+",'"+(listArr[i][2]>0)+"');return false;\"><font color=blue>【买】</font></a></td></tr>";
	}
	o+="</table>";
	_openWin("listSellTools",o);

}

function exchangeShuiJingSuiPian(title,properties) {
	var winObj=_getWin("exchangeShuiJingSuiPian");
	onOpenWin(winObj);
	var o="";
	o+=fakeBr(4);
	o+="<font color=red>" + title + "</font>";
	
	o+="<br>";

	o+="<table border=0 style='margin-top:3px;margin-bottom:6px;' width=100%>";
	for(var i=0;i<properties.length;i++){
		o+="<tr><td><img src="+properties[i][0]+"></td><td><a href=# onclick=\"p.cmd('helptools "+properties[i][1]+"');return false;\"><nobr>"+properties[i][2]+"</nobr></a></td><td width=28><nobr><img style=\"border:none\" src="+properties[i][3]+" >"+properties[i][4]+"</nobr></td><td><a href=# onclick=\"javascript:if(confirm('" + properties[i][6] +"')) p.cmd('exchangeItem "+properties[i][5]+"');return false;\"><font color=blue><nobr>【兑换】</onbr></font></a></td></tr>";
	}
	o+="</table>";
	_openWin("exchangeShuiJingSuiPian",o);
} 

function buySJDItem(item,path,canAmount,isShengWang){
	if(!canAmount||"true"==isShengWang){
		if(confirm('确认要购买 ['+item+'] ?')){
			cmd("buy "+path+" 1");
		}
	}else{

		var input=prompt('请输入要购买 ['+item+'] 的数量',1);
		if(input!=null){
			if(checkInt(input)){
				if(input<1){
					alert("购买数量不能小于1个!");
					buySJDItem(item,path,canAmount,isShengWang);
				}else if(input>9999){
					alert("购买数量不能多于9999个!");
					buySJDItem(item,path,canAmount,isShengWang);
				}else{
					cmd("buy "+path+" "+input);
				}
			}else{
				alert("请输入正确的数字!");
				buySJDItem(item,path,canAmount,isShengWang);
			}
		}
	}
}
function listSiSiTuanDuiHuan(msg,img,listArr){

	var winObj=_getWin("listSellTools");
	onOpenWin(winObj);
	var o="";
	o+=fakeBr(4);
	o+="<font color=red>"+msg+"</font>";
	

	// for tags select
	o+="<br>";

	o+="<table border=0 style='margin-top:3px;margin-bottom:6px;' width=100%>";
	for(var i=0;i<listArr.length;i++){
		o+="<tr><td><img src="+listArr[i][3]+"></td><td><a href=# onclick=\"p.cmd('helptools "+listArr[i][2]+"');return false;\">"+listArr[i][0]+"</a></td><td width=70 align=center>"+listArr[i][1]+"<img src="+img+"></td><td><a href=# onclick=\"p.cmd('huansisituan "+listArr[i][2]+"');return false;\"><font color=blue>【兑换】</font></a></td></tr>";
	}
	o+="</table>";
	_openWin("listSellTools",o);

}

function listDuanWuDuiHuan(msg,img,listArr){

	var winObj=_getWin("listSellTools");
	onOpenWin(winObj);
	var o="";
	o+=fakeBr(4);
	o+="<font color=red>"+msg+"</font>";
	

	// for tags select
	o+="<br>";

	o+="<table border=0 style='margin-top:3px;margin-bottom:6px;' width=100%>";
	for(var i=0;i<listArr.length;i++){
		o+="<tr><td><img src="+listArr[i][3]+"></td><td><a href=# onclick=\"p.cmd('helptools "+listArr[i][2]+"');return false;\">"+listArr[i][0]+"</a></td><td width=70 align=center>"+listArr[i][1]+"<img src="+img+"></td><td><a href=# onclick=\"if(confirm('确认要兑换【"+listArr[i][4]+"】吗?')){p.cmd('huanzongzi "+listArr[i][2]+"');}return false;\"><font color=blue>【兑换】</font></a></td></tr>";
	}
	o+="</table>";
	_openWin("listSellTools",o);

}

function listYongShiHuiJiHuan(listArr){

	var winObj=_getWin("listSellTools");
	onOpenWin(winObj);
	var o="";
	o+=fakeBr(4);
	o+="<font color=red>你想换什么?</font>";
	

	// for tags select
	o+="<br>";

	o+="<table border=0 style='margin-top:3px;margin-bottom:6px;' width=100%>";
	for(var i=0;i<listArr.length;i++){
		var need=listArr[i][1]+"勇士徽记";
		o+="<tr><td><img src="+listArr[i][4]+"></td><td><a href=# onclick=\"p.cmd('helptools "+listArr[i][2]+"');return false;\">"+listArr[i][0]+"</a></td><td width=70 align=center>"+need+"</td><td><a href=# onclick=\"p.huanrankgameconf('"+listArr[i][3]+"','"+listArr[i][2]+"');return false;\"><font color=blue>【兑换】</font></a></td></tr>";
	}
	o+="</table>";
	_openWin("listSellTools",o);

}

function huanrankgameconf(itemaname,itempath){
	if(confirm('确认要兑换【'+itemaname+'】吗?')){
		cmd("huanrankgame "+itempath)
	}
}
function getSelectedRadioItem(radioName){
	var itemObjs=document.getElementsByName(radioName);
	var itemPath="";
	for (var i=0; i<itemObjs.length; i++){
		if (itemObjs[i].checked){
			itemPath=itemObjs[i].value;
			break;
		}
	}
	if(itemPath==""){
		alert("请至少选择一项");
		return;
	}
	p.offOpenWin('alert');
	p.cmd("boxselectitem "+itemPath);
}
/**更换图片方法
*参数1:imgTagName 图片所在连接IdName
*参数2:imgOldSrc 原图片地址
*参数3:imgNewSrc 新图片地址
*参数4:bFlash 是否闪烁,同时用于替换回原图片
*
*/
function swapImg(imgTagName,imgOldSrc,imgNewSrc,bFlash,cmdname){
	var obj=document.getElementById(imgTagName);
	if(obj!=null){
		if(bFlash){
			obj.innerHTML ="<td id="+imgTagName+"align='center'><a href='#' onClick=\"swapImg('"+imgTagName+"','"+imgOldSrc+"','"+imgNewSrc+"',"+false+",'"+cmdname+"');\" hidefocus=true><img src=" + imgNewSrc + " width='45' height='45' /></a></td>";
		}
		else{
			cmd(cmdname);
			obj.innerHTML ="<td id="+imgTagName+"align='center'><a href='#' onClick=\"doclick('"+cmdname+"','tools');\" hidefocus=true><img src=" + imgOldSrc + " width='45' height='45' /></a></td>";
		}
	}
}
function showDaJuan(){//显示用户调查问卷
	var pBoxLeft=300;
	var pBoxTop=150;
	var pBoxWidth=510;
	var pBoxHeight=500;
	var urlA;
	var curDate=new Date();
	urlA="yonghudiaocha/receive.jsp;jsessionid="+sessionId+"?"+curDate;
	window.open(urlA,'','menubar=no,toolbar=no,location=no,directories=no,status=no,width='+pBoxWidth+',height='+pBoxHeight+',left='+pBoxLeft+',top='+pBoxTop+',scrollbars=yes');
}
function listFengJieDuiHuan(msg,img,listArr){

	var winObj=_getWin("listSellTools");
	onOpenWin(winObj);
	var o="";
	o+=fakeBr(4);
	o+="<font color=red>"+msg+"</font>";
	

	// for tags select
	o+="<br>";

	o+="<table border=0 style='margin-top:3px;margin-bottom:6px;' width=100%>";
	for(var i=0;i<listArr.length;i++){
		o+="<tr><td><img src="+listArr[i][3]+"></td><td><a href=# onclick=\"p.cmd('helptools "+listArr[i][2]+"');return false;\">"+listArr[i][0]+"</a></td>"
		+"<td width=70 align=center>"+listArr[i][1]+"<img src="+img+"></td><td><a href=# onclick=\"if(confirm('确认要兑换【"+listArr[i][4]+"】吗?')){p.cmd('huanfengjie "+listArr[i][2]+"')};return false;\"><font color=blue>【兑换】</font></a></td></tr>";
	}
	o+="</table>";
	_openWin("listSellTools",o);

}
/**
*刷新天生技能
* 参数2 type:刷新类型:1,刷新单个技能;2,刷新全部技能;3,刷新技能栏和技能
* 参数3 shlid:守护灵ID
*/
function refreshBornSkill(arg,type,shlid,itemid,skillmaxlv){
	if(type==1){
		cmd("use "+ arg +" "+shlid +" "+itemid);
	}
	else{
		confirmBornSkill(arg,type,shlid,0,0,itemid,skillmaxlv);
	}
	
}
/**显示天生技能刷新界面
* 参数4 bornskills:天生技能数组 0,skillid;1,skillimg;2,skillmsg;3,skilllv;4,needlingqi;5,skillname;
*/
function showBornSkill(arg,type,shlid,itemid,bornSkills){
	var winObj=_getWin("showBornSkill");
	onOpenWin(winObj);
	with(winObj.style){
		width="220";
		height="10";
		top=180;
		left=200;
		overflowY="";
		display='';
	}
	var o="<div style='padding-top:2px;'><b>【天生技能】</b>";
	o+="<br><table width='100%' bgcolor='#E1E1E1' border='0' cellpadding='0' cellspacing='0' style='margin-top:3px;margin-right:5px;margin-bottom:5px;'>";
	o+="<tr><td valign=top>";

	if(bornSkills.length<=0){
		
	}else{
		for(var i=0;i<bornSkills.length;i++){
			o+="<table width='100%'><tr>"
			+"<td align='left' width='10%'><img src='"+bornSkills[i][1]+"'/></td>"
			+"<td align='left' width='30%'><a href='#' onClick=\"cmd('shlhelpsubs true "
			+bornSkills[i][0]		// 技能ID
			+" "+bornSkills[i][3]	// 技能LV
			+" "+bornSkills[i][4]	// 技能升级所需灵气值
			+" "+bornSkills[i][5]	// 守护灵id
			+"');return false;\">"+bornSkills[i][6]+"</a></td>"
			+"<td align='right' width='20%'><a href='#' onclick=\"confirmBornSkill('"+arg +"','"+ type +"','"+ shlid +"','"+ bornSkills[i][0]+"','"+bornSkills[i][3]+"','"+itemid+"','0');offOpenWin('showBornSkill');return false;\">刷新</a></td>"
			+"</tr></table>";
		}
	}

	o+=fakeBr(5);

	o+="</div>"
	_openWin("showBornSkill",o);
}

/**
*刷新天生技能询问信息
* 参数2 type:刷新类型:1,刷新单个技能;2,刷新全部技能;3,刷新技能栏和技能
* 参数3 shlid:守护灵ID
* 参数4 skillid:守护灵技能ID
* 参数5 skilllv:守护灵技能级别
*/
function confirmBornSkill(arg,type,shlid,skillid,skilllv,itemid,skillmaxlv){
	var msg = "";
	if(type==1){
		if(skillid>0){//非空技能栏位
			if(skilllv>1){
				msg = "刷新将重置该技能,您确定刷新该技能么?";
			}
			else{
				msg = "刷新将重置该技能,您确定刷新该技能么?";
			}
			var yes=confirm(msg);
			if(yes){
				cmd("use "+ arg +" "+shlid +" "+ skillid+" "+ itemid+" "+skilllv);
			}
		}
		else{//空技能栏位,不用提示
			cmd("use "+ arg +" "+shlid +" "+ skillid+" "+ itemid+" "+skilllv);
		}
	}
	else if(type==2){
		if(skillmaxlv>1){
			msg = "使用全技能刷新符将刷新该守护灵全部天生技能,您确定使用吗?";
		}
		else{
			msg = "使用全技能刷新符将刷新该守护灵全部天生技能,您确定使用吗?";
		}
		var yes=confirm(msg);
		if(yes){
			cmd("use "+arg+" "+shlid+" "+itemid);
		}
	}
	else if(type==3){
		if(skillmaxlv>1){
			msg = "守护灵具有等级大于1的技能,刷新将使您失去该技能,您确定刷新吗";
		}
		else{
			msg = "技能栏刷新符不仅刷新技能个数,还同时刷新天生技能,您确定要使用吗?";
		}
		var yes=confirm(msg);
		if(yes){
			cmd("use "+arg+" "+shlid+" "+itemid);
		}
	}
}

function showReZiZhi(shls,shlsmaxnum,arg){
// 定义显示窗口
	var obj=getObj("showReZiZhi");
	if(obj==null){
		for(var i=0;i<winList.length;i++){
			if(winList[i]=="showReZiZhi"){
				obj = _createWin("showReZiZhi",winPos[name],winSize[name]);
			}
		}
		if (obj == null)
		{
			obj = _createWin("showReZiZhi",winPos["default"],winSize["default"]);
		}
	}
   var parentWin = getObj('npcChatReader');
	var t = parentWin.offsetTop;
	var l = parentWin.offsetLeft;
	var e = parentWin;
	while(e=e.offsetParent)
	{
		t += e.offsetTop;
		l += e.offsetLeft;
	}
	l = 18+parseInt(parentWin.style.left.replace('px',''))+parseInt(parentWin.style.width.replace('px',''));
	t = parseInt(parentWin.style.top.replace('px',''))+parseInt(parentWin.style.height.replace('px',''))-50;
	with(obj.style)
	{
		width="220";
		height="200";
		top = t+"px";
		left = l+"px";
		overflowY="";
		display='';
	}

	var show = "<font color=blue>选择守护灵&nbsp;&nbsp;&nbsp;&nbsp;"+shls.length+"/"+shlsmaxnum+"</font><br/>";
	show += "<table width='100%' border='0' cellpadding='0' cellspacing='0' style='margin-top:3px;margin-right:5px;margin-bottom:5px;'><tr><td valign=top>"
	show += "<table width='100%' border='0' align='center' cellpadding='0' cellspacing='1' bgcolor='#BCBCBC'>"
	show += "<tr><td bgcolor='#E1E1E1' style='overflow:hidden;line-height:4em;height:4em;'>"
	show += "<table border=0 cellpadding='0' cellspacing='0' width='100%'>";
	if(arg!=null)
	{
		for(var i=0;i<shls.length;i++)
		{
			
			var imgclick="<img src="+shls[i][2]+" BORDER=0 width=48 height=48 />";
			
			var cor="";
			if(i%2==1){
				cor="bgcolor=#EEEEEE";
			}
			show += "<tr "+cor+"><td ><table border=0 cellpadding='0' cellspacing='0' width='100%' ><tr height=12><td rowspan=4 width=48 >"+imgclick
			+"</td><td width=30>名字:</td><td width=100 colspan=2 align=left>"+shls[i][0]
			+"</td></tr><tr  height=12><td width=30>等级:</td><td width=70 align=left>"+shls[i][1]
			+"</td><td width=30></td></tr><tr  height=12><td width=30>肚子:</td><td width=70 align=left>"
			+shls[i][3]+"</td><td width=30></td></tr><tr height=12><td width=30>心情:</td><td align=left width=70>"
			+shls[i][4]+"</td><td width=30><a href=# onclick=\"if(confirm('刷新守护灵资质将导致守护灵属性变化，您确定刷新吗？')){p.cmd('use "+ arg +" "+shls[i][5]+" "+shls[i][6]+"')};offOpenWin('showReZiZhi');return false;\">[确定]</a></td></tr></table></td></tr>";
		}
	
	}
	show += "</table></td></tr></table></td></tr></table>";

	onOpenWin(obj);
	_openWin("showReZiZhi",show);
	focusWin(obj);
}

/**
*显示需要刷新的PANEL
* 参数1 面版名称
* 参数2 面版命令
* 参数3 命令参数
* 参数4 是否显示面版
*/
function showRefreshPanel(objName,cmdName,arg,bOpen){
	var winObj=_getWin(objName);
	if(winObj.style.display!='none'){
		if(!bOpen){
			winObj.style.display ='none';
		}
		else{
			p.cmd(cmdName+" "+arg);
		}
	}
}
/**
*守护灵精华转化为灵气精华列表
*1：道具INDEX
*2：守护灵精华ID
*3：守护灵精华名称
*/
function showJinghuaZhuanHua(shlJHs){
	var winObj=_getWin("showJinghuaZhuanHua");
	onOpenWin(winObj);
	with(winObj.style){
		width="200";
		height="10";
		if(p.eventY-13<0){
			top=1;
		}else{
			top=p.eventY-13;
		}
		if(p.eventX-200+13<0){
			left=1;
		}else{
			left=p.eventX-200+13;
		}
		overflowY="";
		display='';
	}
	var o="<table width=160 style='z-index:99999999999'><tr><td colspan=2>"+fakeBr(2)+"请选择守护灵精华:"+fakeBr(4)+"</td></tr>";

	for(var i=0;i<shlJHs.length;i++){
		o+="<tr><td width=140 align=left>"
		o+="<a href=# onclick=\"cmd('helptools "+shlJHs[i][1]+"');hideParentMenu();return false;\">"+shlJHs[i][2]+"</a> </td><td align=center width=30><a href=# onclick=\"cmd('use "+shlJHs[i][0]+" "+shlJHs[i][1]+"');offOpenWin('showJinghuaZhuanHua');return false;\">转化</a></td></tr>";
	 
	}
	o+="</table>";
	_openWin("showJinghuaZhuanHua",o);
}

function showCanUseShenFuShiItems(arr,shenfushiId,shenfushiPath,houhuiNum){
	var winObj=_getWin("showCanUseShenFuShiItems");
	onOpenWin(winObj);
	with(winObj.style){
		width="200";
		height="10";
		if(p.eventY-13<0){
			top=100;
		}else{
			top=p.eventY-13;
		}
		if(p.eventX-200+13<0){
			
			left=100;
		}else{
			
			left=p.eventX-200+13;
		}
		overflowY="";
		display='';
	}
	var o=fakeBr(2)+"<font color=#006A6A>选择你要抽取的装备：</font>"+fakeBr(4)+"<table>";
		o+="<tr><td><font color=#006A6A>使用 神符后悔药</font><input type=checkbox name=cqbhcheck ></td></tr>";
	for(var i=0;i<arr.length;i++){
		o+="<tr><td><nobr><a href=# onclick=\"cmd('helptools "+arr[i][1]+"');hideParentMenu();return false;\">"+arr[i][2]+"</a> "+"&nbsp;&nbsp;&nbsp;</nobr></td><td><nobr><a href=# onclick=\"useShenFuShi('"+shenfushiPath+"','"+shenfushiId+"','"+arr[i][0]+"','"+arr[i][3]+"','"+arr[i][4]+"');offOpenWin('showCanUseShenFuShiItems');return false;\">抽取</a></nobr></td></tr>";
	}
	o+="<tr><td><font color=blue>您现有"+houhuiNum+"个神符后悔药</font></td><td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td></tr>";
	_openWin("showCanUseShenFuShiItems",o);
}


function useShenFuShi(shenfushiPath,shenfushiId,itemname,itemId,itempath){
	if(confirm("您确定抽取"+itemname+"的属性吗？如果抽取成功，该装备都将被消耗，请您确认。")){
		var isChouQuBaoHu = false;
		if(cqbhcheck.checked){
			isChouQuBaoHu = true;
		}
		cmd("use "+shenfushiPath+" "+shenfushiId+" "+itemId+" "+itempath+" "+isChouQuBaoHu);
	}
}

function showAlertWin(mes){
	alert(mes);
}

function chouquComfirm(msg,shenfushiPath,shenfushiId,itemId,itempath,propName){
	var isQueDing = false;
	if(confirm(msg)){
		isQueDing = true;
	}
	cmd("use "+shenfushiPath+" "+shenfushiId+" "+itemId+" "+itempath+" "+propName+" "+isQueDing);
}


function showShenFuShiWithProp(arr,caoidx,itemid){
	var winObj=_getWin("showShenFuShiWithProp");
	onOpenWin(winObj);
	with(winObj.style){
		width="200";
		height="10";
		if(p.eventY-13<0){
			top=100;
		}else{
			top=p.eventY-13;
		}
		if(p.eventX-200+13<0){
			
			left=100;
		}else{
			
			left=p.eventX-200+13;
		}
		overflowY="";
		display='';
	}
	var o=fakeBr(2)+"<font color=#006A6A>请选择要镶嵌的神符石：</font>"+fakeBr(4)+"<table>";
	for(var i=0;i<arr.length;i++){
		//o+="<tr><td><nobr><a href=# onclick=\"cmd('helptools "+arr[i][1]+"');hideParentMenu();return false;\">"+arr[i][2]+"</a> "+"&nbsp;&nbsp;&nbsp;</nobr></td><td><nobr><a href=# onclick=\"cmd('shenfucmd "+itemid+" xianqian "+shenfuidx+" "+caoidx+" "+arr[i][1]+" "+arr[i][0]+"');offOpenWin('showShenFuShiWithProp');return false;\">选择</a></nobr></td></tr>";
		o+="<tr><td><img src="+arr[i][3]+"></td><td width=5></td><td><nobr>"+arr[i][4]+"</nobr></td><td width=5></td><td><nobr><a href=# onclick=\"cmd('shenfucmd "+itemid+" xianqian "+caoidx+" "+arr[i][5]+" "+arr[i][6]+"');offOpenWin('showShenFuShiWithProp');return false;\">选择</a></nobr></td></tr>";
	}
	
	o+="</table>";
	_openWin("showShenFuShiWithProp",o);
}


//add 无属性神符石界面
function showShenFuShiNoPropList(body) {
	body = fakeBr(12) + body;
	var winObj=_getWin("sfsNoPropList");
		onOpenWin(winObj);
	with(winObj.style){
		width="200";
		height="10";
		if(p.eventY-13<0){
			top=100;
		}else{
			top=p.eventY;
		}
		if(p.eventX-200+13<0){
			
			left=100;
		}else{
			
			left=p.eventX;
		}
		overflowY="";
		display='block';
	}
	
	_openWin("sfsNoPropList",body);
}

function showMoZhangs(arr){
// 定义显示窗口
	var winObj=_getWin("showMoZhangs");
	onOpenWin(winObj);
	with(winObj.style){
		width="180";
		height="10";
		if(p.eventY+35<0){
			top=100;
		}else{
			top=p.eventY+35;
		}
		if(p.eventX-200+13<0){
			
			left=100;
		}else{
			
			left=p.eventX-200+13;
		}
		overflowY="";
		display='';
	}

	var o=fakeBr(2)+"<font color=#006A6A>选择道具</font>"+fakeBr(4);

	for(var i=0;i<arr.length;i++){
		o+="<a href=# onclick=\"cmd('helptools "+arr[i][1]+"');hideParentMenu();return false;\">"+arr[i][2]+"</a> "+"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;     <a href=# onclick=\"cmd('addpro "+arr[i][1]+" "+arr[i][0]+"');offOpenWin('showMoZhangs');return false;\">选择</a><br>";
	}


	_openWin("showMoZhangs",o);
	focusWin(obj);
}

function showBaoShiPeiShiList(peiShiFuIndex,baoShiArr) {
	var winObj=_getWin("showBaoShiPeiShiList");
	onOpenWin(winObj);
	with(winObj.style){
		width="200";
		height="10";
		if(p.eventY-13<0){
			top=100;
		}else{
			top=p.eventY-13;
		}
		if(p.eventX-200+13<0){
			
			left=100;
		}else{
			
			left=p.eventX-200+13;
		}
		overflowY="";
		display='';
	}
	var o=fakeBr(2)+"<font color=#006A6A>请选择需要使用的宝石：</font>"+fakeBr(4);
	o += "<table width=\"100%\">"
	// 【logo,name,个数,index】
	for(var i=0;i<baoShiArr.length;i++){
		var baoshiIndex = baoShiArr[i][3];
		o += "<tr>";
			o += "<td><img src=\""+baoShiArr[i][0]+"\"/>&nbsp;</td>";
			o += "<td><a href=\"#\" onclick=\"p.cmd('helptools " + baoshiIndex + "')\">"　+ baoShiArr[i][1] + "</a></td>";
			o += "<td><nobr>X&nbsp;" + baoShiArr[i][2] + "</nobr></td>";
			o += "<td><a href=# onclick=\"p.cmd('use " + peiShiFuIndex + " " + baoshiIndex + "');offOpenWin('showBaoShiPeiShiList');return false;\">确定</a></td>";
	    o += "</tr>"
	}
	o+="</table>";
	_openWin("showBaoShiPeiShiList",o);
}

function showBaoShiEquipList(peiShiFuIndex,baoShiIndex,equipInfoArr) {
	var winObj=_getWin("showBaoShiEquipList");
	onOpenWin(winObj);
	var o=fakeBr(2)+"<font color=#006A6A><nobr>请选择需要进行配饰的装备：</nobr></font>"+fakeBr(4);
	o += "<table width=\"1\">"
	// 格式：【logo,name,部位，【已经加上的宝石的属性】，index】
	 // 已经加上的宝石的属性：【logo,name,级别】
	var baoShiDisplayWidth = 0;
	for(var i=0;i<equipInfoArr.length;i++){
		var equipIndex = equipInfoArr[i][4];
		o += "<tr>";
			o += "<td><img src=\""+equipInfoArr[i][0]+"\"/>&nbsp;</td>";
			o += "<td><nobr><a href=\"#\" onclick=\"p.cmd('helptools " + equipIndex + "')\">" + equipInfoArr[i][1] + "(" + equipInfoArr[i][2] + ")</a></nobr></td>";
			o += "<td valign=\"middle\"><nobr>";
			
			var baoShiInfoArr = equipInfoArr[i][3];
			for(var j = 0; j<baoShiInfoArr.length; j++) {
				o += "<span><img src=\""+baoShiInfoArr[j][0]+"\"/>";
				o += baoShiInfoArr[j][1] +  "&nbsp;&nbsp;</span>";
				baoShiDisplayWidth += 80;
			}
			
			o += "</nobr></td>";
			o += "<td><a href=# onclick=\"p.cmd('use " + peiShiFuIndex + " " + baoShiIndex + " " + equipIndex + " false');offOpenWin('showBaoShiEquipList');return false;\"><nobr>确定</nobr></a></td>";
	    o += "</tr>"
	}
	o+="</table>";
	
	with(winObj.style){
		width = 200 + baoShiDisplayWidth + "";
		height="10";
		if(p.eventY-13<0){
			top=100;
		}else{
			top=p.eventY-13;
		}
		if(p.eventX-200+13<0){
			
			left=100;
		}else{
			
			left=p.eventX-200+13;
		}
		overflowY="";
		display='';
	}
	
	_openWin("showBaoShiEquipList",o);
}

function showReNameSHL(shls,shlsmaxnum,arg,btname){
// 定义显示窗口
	var obj=getObj("showReNameSHL");
	if(obj==null){
		for(var i=0;i<winList.length;i++){
			if(winList[i]=="showReNameSHL"){
				obj = _createWin("showReNameSHL",winPos[name],winSize[name]);
			}
		}
		if (obj == null)
		{
			obj = _createWin("showReNameSHL",winPos["default"],winSize["default"]);
		}
	}
   var parentWin = getObj('npcChatReader');
	var t = parentWin.offsetTop;
	var l = parentWin.offsetLeft;
	var e = parentWin;
	while(e=e.offsetParent)
	{
		t += e.offsetTop;
		l += e.offsetLeft;
	}
	l = 18+parseInt(parentWin.style.left.replace('px',''))+parseInt(parentWin.style.width.replace('px',''));
	t = parseInt(parentWin.style.top.replace('px',''))+parseInt(parentWin.style.height.replace('px',''))-50;
	with(obj.style)
	{
		width="220";
		height="200";
		top = t+"px";
		left = l+"px";
		overflowY="";
		display='';
	}

	var show = "<font color=blue>选择守护灵&nbsp;&nbsp;&nbsp;&nbsp;"+shls.length+"/"+shlsmaxnum+"</font><br/>";
	show += "<table width='100%' border='0' cellpadding='0' cellspacing='0' style='margin-top:3px;margin-right:5px;margin-bottom:5px;'><tr><td valign=top>"
	show += "<table width='100%' border='0' align='center' cellpadding='0' cellspacing='1' bgcolor='#BCBCBC'>"
	show += "<tr><td bgcolor='#E1E1E1' style='overflow:hidden;line-height:4em;height:4em;'>"
	show += "<table border=0 cellpadding='0' cellspacing='0' width='100%'>";
	if(arg!=null)
	{
		for(var i=0;i<shls.length;i++)
		{
			
			var imgclick="<img src="+shls[i][2]+" BORDER=0 width=48 height=48 />";
			
			var cor="";
			if(i%2==1){
				cor="bgcolor=#EEEEEE";
			}
			show += "<tr "+cor+"><td ><table border=0 cellpadding='0' cellspacing='0' width='100%' ><tr height=12><td rowspan=4 width=48 >"+imgclick
			+"</td><td width=30>名字:</td><td width=100 colspan=2 align=left>"+shls[i][0]
			+"</td></tr><tr  height=12><td width=30>等级:</td><td width=70 align=left>"+shls[i][1]
			+"</td><td width=30></td></tr><tr  height=12><td width=30>肚子:</td><td width=70 align=left>"
			+shls[i][3]+"</td><td width=30></td></tr><tr height=12><td width=30>心情:</td><td align=left width=70>"
			+shls[i][4]+"</td><td width=30><a href=# onclick=\"p.cmd('use "+ arg +" "+shls[i][5]+" "+shls[i][6]+"');offOpenWin('showReNameSHL');return false;\">["+btname+"]</a></td></tr></table></td></tr>";
		}
	
	}
	show += "</table></td></tr></table></td></tr></table>";

	onOpenWin(obj);
	_openWin("showReNameSHL",show);
	focusWin(obj);
}
/**
*显示可升级的武器列表
*/
function showWeapon(arr,duihuan){

	var winObj=_getWin("showWeapon");
	onOpenWin(winObj);
	with(winObj.style){
		width="200";
		height="10";
		if(p.eventY-13<0){
			top=1;
		}else{
			top=p.eventY-13;
		}
		if(p.eventX-13<0){
			left=1;
		}else{
			left=p.eventX-13;
		}
		overflowY="";
		display='';
	}
	var o = "";
	if(duihuan==0){
		o=fakeBr(2)+"<font color=red>兑换以后，你的升级石等级，武器上的龙珠和卡片将会保留。武器前缀会根据升级石的等级发生改变，不过附魔效果等就会消失了</font><br/>";
		o+=fakeBr(2)+"<font color=#006A6A>请选择用来兑换的武器:</font>"+fakeBr(4);
		for(var i=0;i<arr.length;i++){
			//战士
			if(arr[i][4]==1){
				o+="<a href=# onclick=\"cmd('helptools "+arr[i][1]+"');hideParentMenu();return false;\">"+arr[i][2]+"</a> "+"&nbsp;&nbsp;&nbsp;     <a href=# onclick=\"cmd('wuqiduihuan "+arr[i][3]+"|"+arr[i][0]+"');offOpenWin('showWeapon');return false;\">兑换</a><br>";
			}
			//法师
			else{
				o+="<a href=# onclick=\"cmd('helptools "+arr[i][1]+"');hideParentMenu();return false;\">"+arr[i][2]+"</a> "+"&nbsp;&nbsp;&nbsp;     <a href=# onclick=\"cmd('wuqiduihuan "+arr[i][0]+"');offOpenWin('showWeapon');return false;\">兑换</a><br>";
			}
		}
	}
	else if(duihuan==1){
		o=fakeBr(2)+"<font color=red>兑换以后，你的升级石等级，武器上的龙珠和卡片将会保留。武器前缀会根据升级石的等级发生改变，不过附魔效果等就会消失了</font>";
		o+=fakeBr(2)+"<font color=#006A6A>请选择要兑换的武器:</font>"+fakeBr(4);
		for(var i=0;i<arr.length;i++){
			o+="<a href=# onclick=\"p.showItemDesc('"+arr[i][2]+"','"+arr[i][5]+"','"+arr[i][6]+"','"+arr[i][7]+"','"+arr[i][8]+"');hideParentMenu();return false;\">"+arr[i][2]+"</a> "+"&nbsp;&nbsp;&nbsp;     <a href=# onclick=\"cmd('wuqiduihuan "+arr[i][3]+" "+arr[i][0]+"');offOpenWin('showWeapon');return false;\">兑换</a><br>";
		}
	}
	//兑换装备（蓝换紫）
	else if(duihuan==2){
		o+=fakeBr(2)+"<font color=#006A6A>请选择要提升品质的装备:</font>"+fakeBr(4);
		for(var i=0;i<arr.length;i++){
			o+="<a href=# onclick=\"cmd('helptools "+arr[i][2]+"');hideParentMenu();return false;\">"+arr[i][0]+"</a> "+"&nbsp;&nbsp;&nbsp;     <a href=# onclick=\"cmd('changecolor "+arr[i][2]+"');offOpenWin('showWeapon');return false;\">确定</a><br>";
		}
	}
	
	_openWin("showWeapon",o);
}
/**
*守护灵精华强化
*/
function showSHLJingHua(index,topname,arr){

	var winObj=_getWin("showSHLJingHua");
	onOpenWin(winObj);
	with(winObj.style){
		width="200";
		height="10";
		if(p.eventY-13<0){
			top=1;
		}else{
			top=p.eventY-13;
		}
		if(p.eventX-200+13<0){
			left=1;
		}else{
			left=p.eventX-200+13;
		}
		overflowY="";
		display='';
	}
	var o="<table style='z-index:99999999'>"+fakeBr(2)+"<font color=#006A6A>"+topname+"</font>列表"+fakeBr(4);

	for(var i=0;i<arr.length;i++){
		o+="<a href=# onclick=\"cmd('helptools "+arr[i][1]+"');hideParentMenu();return false;\">"+arr[i][2]+"</a> "+"&nbsp;&nbsp;&nbsp;     <a href=# onclick=\"cmd('use "+index+" "+arr[i][1]+" "+arr[i][0]+"');offOpenWin('showSHLJingHua');return false;\">[使用]</a><br>";
	}
	o+="</table>";
	_openWin("showSHLJingHua",o);
}

/**
*显示可兑换的装备列表
*80级套装对换
*/
function showDuiHuanItem(arr,select){

	var winObj=_getWin("showDuiHuanItem");
	onOpenWin(winObj);
	with(winObj.style){
		width="200";
		height="10";
		if(p.eventY-13<0){
			top=1;
		}else{
			top=p.eventY-13;
		}
		if(p.eventX-13<0){
			left=1;
		}else{
			left=p.eventX-13;
		}
		overflowY="";
		display='';
	}
	var o = "";
	
	
	// 选择装备
	if(select==0){
		o+=fakeBr(2)+"<font color=#006A6A>请选择用来兑换的装备:</font>"+fakeBr(4);
		for(var i=0;i<arr.length;i++){
			o+="<a href=# onclick=\"cmd('helptools "+arr[i][1]+"');hideParentMenu();return false;\">"+
				arr[i][2]+"</a> "+"&nbsp;&nbsp;&nbsp;     <a href=# onclick=\"cmd('fangjuduihuan80 "+
				arr[i][3]+"|"+arr[i][0]+"|"+arr[i][4]+"');offOpenWin('showDuiHuanItem');return false;\">兑换</a><br>";
		}
	}
	else{
		o+=fakeBr(2)+"<font color=#006A6A>请选择要兑换的装备:</font>"+fakeBr(4);
		for(var i=0;i<arr.length;i++){
			o+="<a href=# onclick=\"p.showItemDesc('"+arr[i][2]+"','"+arr[i][5]+"','"+arr[i][6]+"','"+arr[i][7]+"','"+arr[i][8]+"');hideParentMenu();return false;\">"+
				arr[i][2]+"</a> "+"&nbsp;&nbsp;&nbsp;     <a href=# onclick=\"cmd('fangjuduihuan80 "+
				arr[i][3]+" "+arr[i][0]+"');offOpenWin('showDuiHuanItem');return false;\">兑换</a><br>";
		}
	}

	_openWin("showDuiHuanItem",o);
}
function showTips(){

	var winObj=_getWin("showtips","0.5px #000000");
	onOpenWin(winObj);
	with(winObj.style){
		width="100%";
		height="3";
		top=0;
		left=0;
		overflowY="";
		display='';
		backgroundColor="#FFFFCC";
	}
	
	_openWin("showtips","<font size=1>对不起，您的Flash Player版本过低或尚未安装Flash Player。<a href='http://www.adobe.com/go/getflashplayer' target=_blank>访问adobe官方网站下载Flash Player</font></a>");
}
//显示每日奖励
function showMeiRiJL(title,msg){
	var winObj=_getWin("showMeiRiJL","0.5px #000000");
	onOpenWin(winObj);
	with(winObj.style){
		width="290";
		height="100";
		if(p.eventY-13<0){
			top=1;
		}else{
			top=p.eventY-13;
		}
		if(p.eventX-13<0){
			left=1;
		}else{
			left=p.eventX-13;
		}
		overflowY="";
		display='';
		backgroundColor="#FFFFCC";
	}
	var o="<table style='z-index:99999999'>"+fakeBr(2)+"<font color=#006A6A>"+title+"</font>"+fakeBr(4);
	o+=msg;
	o+="</table>";
	_openWin("showMeiRiJL",o);
}

function submitSFSChongNeng(shenFuShiAttr, shenFuId) {
	var color = shenFuShiAttr[0];
	var shenFuShiName = shenFuShiAttr[1];
	var effect = shenFuShiAttr[2];
	var shenFuShiPath = shenFuShiAttr[3];
	var type = shenFuShiAttr[4];
	var shenFuNumElement = document.getElementById(shenFuShiPath + ".num");
	var shenFuNum = shenFuNumElement.value;
	if(!shenFuNumElement || shenFuNum < 1) {
		alert("输入的神符石数量不合法！请重新输入！");
		
		return;
	}
	
	if("神符石无属性" == type) {
		if(confirm("使用" + color + shenFuShiName + " X " + shenFuNum + "充能，能够延长激活时间" +　shenFuNum * effect + "分钟，你确定吗？")) {
			cmd('shenfucmd ' + shenFuId + ' chongneng ' + shenFuShiPath + ' ' + shenFuNum);
			offOpenWin('sfsNoPropList');
		}
	} else {
		if(confirm("使用" +　color + shenFuShiName + " X " + shenFuNum + "充能，能够提高神符成长值" + shenFuNum * effect + "点，你确定使用吗？"　)) {
			cmd('shenfucmd ' + shenFuId + ' chongneng ' + shenFuShiPath + ' ' + shenFuNum);
			offOpenWin('sfsNoPropList');
		}
	}
}

//关闭每日奖励
function closeMeiRiJL(){

	var meirijl=document.getElementById("showMeiRiJL");
	meirijl.style.display="none";

}

//愿灵泉水
function showYuanLingQuanShuiMessage(index)
{

	var m=prompt('请在此输入你的祝福语言','');
	
	if(m!=null)
	{
		if(m=='')
		{
			alert('请输入祝福内容');		
		}else{
			cmd('use ' + index +  ' message '+m);		
		}		
	}	
}

//愿灵泉水
function showYuanLingQuanShuiUser(index,message)
{

	var m=prompt('输入对方角色名称','');
	
	if(m!=null)
	{		
			cmd('use ' + index +  ' toUser '+m+' '+message);
	}	
}
//指定时间显示,带倒计时的ALERT
function showAlert_withtimer(mes,time){
	if(alertTimer!=null){
		window.clearTimeout(alertTimer);
		
	}
	addIM(mes);
	_alert='';
	offOpenWin('alert');
	var winObj=_getWin("alert");
	onOpenWin(winObj);
	with(winObj.style){
		overflowY="";
	}
	_openWin("alert",_alert);
	winObj.closeEvent="_alert='';"
	winObj.innerHTML="<font color=green>窗口在</font><span id='acceptmooncake' name='acceptmooncake' style='color:red;'>10</span><font color=green>秒后自动关闭</font>"+mes;
	vimgTimer2(document.getElementById('acceptmooncake'));
	alertTimer=setTimeout("try{_alert='';winObj='';_openWin('alert',_alert);offOpenWin('alert');}catch(x){err(x);}",time);
}
var innerhtmltimer=null;
function vimgTimer2(timerObj){
	if(innerhtmltimer!=null){
		window.clearTimeout(innerhtmltimer);
	}
	try{
		var now=parseInt(timerObj.innerHTML);
		if(now-1>=0){
			timerObj.innerHTML=(now-1);
			innerhtmltimer=setTimeout("vimgTimer2("+timerObj.id+");",1000);
		}
	}
	catch(ex){}
}
//合成宝石，宝石选择
function showBaoShiList(arr,index){
	var winObj=_getWin("showBaoShiList");
	onOpenWin(winObj);
	with(winObj.style){
		width="200";
		height="10";
		if(p.eventY-13<0){
			top=1;
		}else{
			top=p.eventY-13;
		}
		if(p.eventX-13<0){
			left=1;
		}else{
			left=p.eventX-13;
		}
		overflowY="";
		display='';
	}
	var o = "";
	o=fakeBr(2)+"<font color=green>请选择要用来合成的宝石</font><br/>";
	for(var i=0;i<arr.length;i++){
		o+="<a href=# onclick=\"cmd('helptools "+arr[i][1]+"');hideParentMenu();return false;\">"+arr[i][2]+"</a> "+arr[i][3]+"&nbsp;&nbsp;&nbsp;     <a href=# onclick=\"cmd('changebaoshi "+index+" "+arr[i][4]+" "+arr[i][0]+"');offOpenWin('showBaoShiList');return false;\">放入</a><br>";
	}

	_openWin("showBaoShiList",o);
}


function showConfirmShlSkillRefresh(arg1,arg2,arg3,arg4)
{
	if(confirm("您确定要刷新该守护灵的"+arg3+"“"+arg4+"”？"))
  	{
  		cmd(arg1+" "+arg2+" "+arg4+" OK");
  	}else{  		
  	    return;
  	}

}

function showConfirmShlSkillRefresh2(arg1,arg2,arg3,arg4,arg5)
{
	if(confirm(arg4+"刷新成功，获得"+arg4+arg3+",您确定应用吗？"))
  	{
  		cmd(arg1+" "+arg2+" OK "+arg3+" "+arg5);
  	}else{  		
  	    return;
  	}

}

/**
*坐骑融合
*zuoqis：所有坐骑列表
*zzq:主坐骑，fzq:副坐骑
**/
function zuoQiRongHe(zuoqis,zzq,fzq,arg){
	var winObj=_getWin("zuoQiRongHe");
	onOpenWin(winObj);
	with(winObj.style){
		width="200";
		height="10";
		overflowY="";
		display='';
	}
	var o = "";
	o=fakeBr(2)+"<font color=blue>您拥有的坐骑</font><br/>";
	for(var i=0;i<zuoqis.length;i++){
		if(zzq==null){
			o+="<a href=# onclick=\"cmd('helptools "+zuoqis[i][0]+"');hideParentMenu();return false;\">"+zuoqis[i][1]+"</a><a href=# onclick=\"cmd('use "+arg+" "+zuoqis[i][0]+" 0');return false;\">&nbsp;&nbsp;&nbsp;     选择</a><br>";
		}
		else if(fzq==null){
			o+="<a href=# onclick=\"cmd('helptools "+zuoqis[i][0]+"');hideParentMenu();return false;\">"+zuoqis[i][1]+"</a><a href=# onclick=\"cmd('use "+arg+" "+zuoqis[i][0]+" 1 "+zzq[0]+"');return false;\">&nbsp;&nbsp;&nbsp;     选择</a><br>";
		}
		else{
			o+="<a href=# onclick=\"cmd('helptools "+zuoqis[i][0]+"');hideParentMenu();return false;\">"+zuoqis[i][1]+"</a><br>";
		}
	}
	o+=fakeBr(2)+"<br/><font color=blue>主坐骑(保留造型)</font><br/>";
	o+="<font color=red>(强烈建议属性好坐骑放置此处)</font><br/>";
	if(zzq!=null){
		o+="<a href=# onclick=\"cmd('helptools "+zzq[0]+"');hideParentMenu();return false;\">"+zzq[1]+"</a><a href=# onclick=\"cmd('use "+arg+" "+zzq[0]+" 2');return false;\">&nbsp;&nbsp;&nbsp;     取消</a><br>";
	}
	
	o+=fakeBr(2)+"<br/><font color=blue>副坐骑</font><br/>";
	if(fzq!=null && zzq!=null){
		o+="<a href=# onclick=\"cmd('helptools "+fzq[0]+"');hideParentMenu();return false;\">"+fzq[1]+"</a><a href=# onclick=\"cmd('use "+arg+" "+zzq[0]+" 3');return false;\">&nbsp;&nbsp;&nbsp;     取消</a><br>";
		o+="<br/>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<a href=# onclick=\"cmd('use "+arg+" "+zzq[0]+" 4 "+fzq[0]+" "+zzq[2]+" "+fzq[2]+"');offOpenWin('zuoQiRongHe');return false;\">融合</a>";
	}
	else{
		o+="<br/>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;融合";
	}
	o+="&nbsp;&nbsp;&nbsp;     <a href=# onclick=\"offOpenWin('zuoQiRongHe');return false;\">取消</a><br>";
	_openWin("zuoQiRongHe",o);
}

function xiuLi(item,arg) {
	var winObj=_getWin("xiuLi");
	onOpenWin(winObj);
	with(winObj.style){
		width="200";
		height="100";
		overflowY="";
		display='';
	}	
	var o = "";
	o=fakeBr(2)+"<font color=blue>需要修理的装备列表</font><br/>";
	for(var i=0;i<item.length;i++){
		
		o+="<a href=# onclick=\"cmd('helptools "+item[i][0]+"');hideParentMenu();return false;\">"+item[i][1]+"</a><a href=# onclick=\"cmd('use "+arg+" "+item[i][0]+" 0');offOpenWin('xiuLi');return false;\">&nbsp;&nbsp;&nbsp;     选择</a><br>";
	
	}
	_openWin("xiuLi",o);
}

function zuoqishuaxin(item,arg){
	var winObj=_getWin("zuoqishuaxin");
	onOpenWin(winObj);
	with(winObj.style){
		width="200";
		height="100";
		overflowY="";
		display='';
	}	
	var o = "";
	o=fakeBr(2)+"<font color=blue>坐骑装备列表</font><br/>";
	for(var i=0;i<item.length;i++){
		
		o+="<a href=# onclick=\"cmd('helptools "+item[i][0]+"');hideParentMenu();return false;\">"+item[i][1]+"</a><a href=# onclick=\"cmd('use "+arg+" "+item[i][0]+"');offOpenWin('zuoqishuaxin');return false;\"><font style='text-decoration:none'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;选择</font></a><br>";
	
	}
	_openWin("zuoqishuaxin",o);
}

function xuanzepro(item,index,arg){
	var winObj=_getWin("xuanzepro");
	onOpenWin(winObj);
	with(winObj.style){
		width="200";
		height="100";
		overflowY="";
		display='';
	}	
	var o = "";
	o=fakeBr(2)+"<font color=blue>请选择的其中一项进行刷新</font><br/>";
	for(var i=0;i<item.length;i++){
		
		o+=item[i]+"<a href=# onclick=\"cmd('use "+arg+" "+ index + " " +item[i]+"');offOpenWin('xuanzepro');return false;\"><font style='text-decoration:none'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;选择</font></a><br>";
	
	}
	_openWin("xuanzepro",o);
}

function showAlertWithColor(mes,co,time){
	if(alertTimer!=null){
		window.clearTimeout(alertTimer);
	}
	_alert = '';
	addIM(mes);
	_alert+=mes;
	var winObj=_getWin("alert");
	onOpenWin(winObj);
	with(winObj.style){
		width="220";
		height="10";
		overflowY="";
		display='';
		backgroundColor=co;
	}
	winObj.closeEvent="_alert='';"
	_openWin("alert",_alert);
	alertTimer=setTimeout("try{_alert='';_openWin('alert',_alert);offOpenWin('alert');}catch(x){err(x);}",time);
}

function showEnterCopyOk(captionId,petId,copyid){
	
	var winObj=_getWin("showEnterCopyOk");
	onOpenWin(winObj);
	with(winObj.style){
		width="220";
		height="100";
	}
	var o = "";
	 o = "<table><tr><td>队长请求进入副本活动，是否确定？<br><a href=# onclick=\"p.cmd('enterCopyOk OK "+captionId+" "+petId+" "+copyid+"');offOpenWin('showEnterCopyOk');return false;\" >确定</a>&nbsp;&nbsp;<a href=# onclick=\"p.cmd('enterCopyOk CANCEL "+captionId+" "+petId+"');offOpenWin('showEnterCopyOk');return false;\" >取消</a></td>"+"</tr></table>";
	_openWin("showEnterCopyOk",o);
}

function showEnterCopyCancel(arg){
	var winObj=_getWin("showEnterCopyCancel");
	onOpenWin(winObj);
	with(winObj.style){
		width="220";
		height="100";
	}
	offOpenWin('showEnterCopyOk');
	var o = "";
	 o = "<table><tr><td>"+arg+"，所以不能进入副本<br><a href=# onclick=\"offOpenWin('showEnterCopyCancel');return false;\" >确定</a>&nbsp;&nbsp;</td>"+"</tr></table>";
	_openWin("showEnterCopyCancel",o);
}

function showCanUseHenShiItem(arg,arr){
	//alert(arr);
	var winObj=_getWin("selItemCanUseHenShi");
	onOpenWin(winObj);
	with(winObj.style){
		width="200";
		height="10";
		if(p.eventY-13<0){
			top=1;
		}else{
			top=p.eventY-13;
		}
		if(p.eventX-200+13<0){
			left=1;
		}else{
			left=p.eventX-200+13;
		}
		overflowY="";
		display='';
	}
	var o=fakeBr(2)+"<font color=#006A6A>选择武器道具</font>"+fakeBr(4);

	for(var i=0;i<arr.length;i++){
		o+="<a href=# onclick=\"cmd('helptools "+arr[i][1]+"');hideParentMenu();return false;\">"+arr[i][2]+"</a> "+"&nbsp;&nbsp;&nbsp;     <a href=# onclick=\"cmd('use "+arg+" "+arr[i][1]+" "+arr[i][0]+"');offOpenWin('selItemCanUseHenShi');return false;\">使用</a><br>";
	}
	_openWin("selItemCanUseHenShi",o);
}


function useRongLianShi(arg,index,name)
{
	
	var winObj=_getWin("useRongLianShi");
	onOpenWin(winObj);
	with(winObj.style){
		width="240";
		height="100";
	}
	var o = "<br><br><br>";
	 o = ""+arg+"<br><br><table width=100%><tr><td align=center><a href=# onclick=\"p.cmd('use "+index+" "+"OK "+name+"');offOpenWin('useRongLianShi');return false;\" >确定</a>&nbsp;&nbsp;<a href=# onclick=\"offOpenWin('useRongLianShi');return false;\" >取消</a></td></tr></table>";
	_openWin("useRongLianShi",o);
}

function showGuaiZhangTang(info,index)
{
	var winObj=_getWin("showGuaiZhangTang");
	onOpenWin(winObj);
	with(winObj.style){
		width="240";
		height="100";
	}
	var o = "<br><br><br>";
	 o = ""+info+"<br><br><table width=100%><tr><td align=center><a href=# onclick=\"p.cmd('use "+index+" "+"OK');offOpenWin('showGuaiZhangTang');return false;\" >确定</a>&nbsp;&nbsp;<a href=# onclick=\"offOpenWin('showGuaiZhangTang');return false;\" >取消</a></td></tr></table>";
	_openWin("showGuaiZhangTang",o);

}
function changePingBi()
{
	pingBiZhanDouInfo=!pingBiZhanDouInfo;
	if(pingBiZhanDouInfo)
	{
		var ping = document.getElementById("pingBiInfo");
		ping.src="/images/pingBi.gif";
	
	}else{
		var ping = document.getElementById("pingBiInfo");
		ping.src="/images/pingBi1.gif";	
	}
	cmd('pingBiZhanDouInfo');
	return;
}

function showCardHeCheng(imgArr,pathArr,nameArr,info)
{
	var winObj=_getWin("showCardHeCheng");
	onOpenWin(winObj);
	with(winObj.style){
		width="300";
		height="240";
	}
	var hasA = false;
	var hasB = false;
	
	var o = "<div id='caHe'>卡片合成<br><table><tr height=50px><td align=center style=\"border:1px double #44cef2;width:26px;height:26px;backgroud-color:#95d4ef;\">";	
	
	    if(imgArr!=null && imgArr[0]!=null && imgArr[0]!='null'){
	    	o+="<img src='"+imgArr[0]+"'>" ;
	    	hasA =true;
	    	 }else{
	    		 o+="&nbsp;" ;
	    	 }
	    o+="</td><td>+</td><td align=center style=\"border:1px double #44cef2;width:26px;height:26px;backgroud-color:#95d4ef;\">";
	    if(imgArr!=null && imgArr[1]!=null && imgArr[1]!='null'){
	    	o+="<img src='"+imgArr[1]+"'>";
	    	hasB = true;
	    	 }else{
	    		 o+="&nbsp;" ;
	    	 }
	    o+="</td><td>=</td><td align=center style=\"border:1px double #44cef2;width:26px;height:26px;backgroud-color:#95d4ef;\">";
	    if(imgArr!=null && imgArr[2]!=null && imgArr[2]!='null'){
	    	o+="<img src='"+imgArr[2]+"'>" ;
	    }else{
   		 o+="&nbsp;" ;
   	 }
	    	 
	     var aPath = "null";
	     if(pathArr!=null && pathArr[0]!=null)
	     {	    	
	    	 aPath = pathArr[0];	      
	     }
	     
	     var bPath = "null";
	     if(pathArr!=null && pathArr[1]!=null)
	     {	    	
	    	 bPath = pathArr[1];	      
	     }
	     
	     var cPath = "null";
	     if(pathArr!=null && pathArr[2]!=null)
	     {	    	
	    	 cPath = pathArr[2];	      
	     }     
	     
	     o+="</td></tr><tr><td>";
	     if(!hasA)
	     {
	    	 o+="<a href=# onclick=\"p.cmd('cardHeCheng fang A "+bPath+"')\">放入卡片</a>";
	     }else{
	    	 o+="<a href=# onclick=\"p.cmd('cardHeCheng qu A "+bPath+"')\">取出卡片</a>";
	     }
	     o+="</td><td></td><td>";
	     if(!hasB)
	     {
	    	 o+="<a href=# onclick=\"p.cmd('cardHeCheng fang B "+aPath+"')\">放入卡片</a>";
	     }else{
	    	 o+="<a href=# onclick=\"p.cmd('cardHeCheng qu B "+aPath+"')\">取出卡片</a>";
	     }
	     o+="</td><td></td><td><a href=# onclick=\"p.cmd('cardHeCheng he "+aPath+" "+bPath+" "+cPath+"')\">&nbsp;&nbsp;&nbsp;&nbsp;合成&nbsp;&nbsp;&nbsp;&nbsp;</a></td></tr></table></div>";
	
	     o += "<br><div id='caInfo'>卡片信息<br><table>";
	     
	     var isShow = false;
	     if(info!=null)
	     {
	        for(var i=0;i<info.length;i++){
	        	
	        if(hasA && hasB)
	        {
	        	if(info[i][0]==nameArr[0] && info[i][1]==nameArr[1])
	        	{
	        		
	        	    if(!isShow)
	        	    {
	        		    o+="<tr><td><a href=# onclick=\"cmd('cardHeCheng showItem "+info[i][3]+"');return false;\">"+info[i][0]+"</a></td></tr>";
	        		    isShow=true;
	        	    }
	        		if(info[i][1]!='')
	        		{	        			
	        	      o+="<tr><td><a href=# onclick=\"cmd('cardHeCheng showItem "+info[i][3]+"');return false;\">"+info[i][0]+"</a>可与<a href=# onclick=\"cmd('cardHeCheng showItem "+info[i][4]+"');return false;\">"+info[i][1]+"</a>组合，形成<a href=# onclick=\"cmd('cardHeCheng showItem "+info[i][5]+"');return false;\">"+info[i][2]+"</a></td></tr>";
	        	    }
	        	}
	        }
	        if(hasA && !hasB)
	        {
	        	if(info[i][0]==nameArr[0])
	        	{
	        		
	        		if(!isShow)
	        	    {
	        		    o+="<tr><td><a href=# onclick=\"cmd('cardHeCheng showItem "+info[i][3]+"');return false;\">"+info[i][0]+"</a></td></tr>";
	        		    isShow=true;
	        	    }
	        		if(info[i][1]!='')
	        		{
	        	     o+="<tr><td><a href=# onclick=\"cmd('cardHeCheng showItem "+info[i][3]+"');return false;\">"+info[i][0]+"</a>可与<a href=# onclick=\"cmd('cardHeCheng showItem "+info[i][4]+"');return false;\">"+info[i][1]+"</a>组合，形成<a href=# onclick=\"cmd('cardHeCheng showItem "+info[i][5]+"');return false;\">"+info[i][2]+"</a></td></tr>";
	        		}
	        	}
	        }
	        if(!hasA && hasB)
	        {
	        	if(info[i][0]==nameArr[1])
	        	{
	        		if(!isShow)
	        	    {	        	
	        		  o+="<tr><td><a href=# onclick=\"cmd('cardHeCheng showItem "+info[i][3]+"');return false;\">"+info[i][0]+"</a></td></tr>";
	        		 isShow=true;
	        	    }
	        		if(info[i][1]!='')
	        		{
	        	       o+="<tr><td><a href=# onclick=\"cmd('cardHeCheng showItem "+info[i][3]+"');return false;\">"+info[i][0]+"</a>可与<a href=# onclick=\"cmd('cardHeCheng showItem "+info[i][4]+"');return false;\">"+info[i][1]+"</a>组合，形成<a href=# onclick=\"cmd('cardHeCheng showItem "+info[i][5]+"');return false;\">"+info[i][2]+"</a></td></tr>";
	        		}
	        	}
	        }
	        if(!hasA && !hasB)
	        {
	        	if(!isShow)
        	    {
	        		o+="<tr><td><a href=# onclick=\"cmd('cardHeCheng showItem "+info[i][3]+"');return false;\">"+info[i][0]+"</a></td></tr>";
	        		 isShow=true;
        	    }
	        		if(info[i][1]!='')
	        		{
	        	       o+="<tr><td><a href=# onclick=\"cmd('cardHeCheng showItem "+info[i][3]+"');return false;\">"+info[i][0]+"</a>可与<a href=# onclick=\"cmd('cardHeCheng showItem "+info[i][4]+"');return false;\">"+info[i][1]+"</a>组合，形成<a href=# onclick=\"cmd('cardHeCheng showItem "+info[i][5]+"');return false;\">"+info[i][2]+"</a></td></tr>";
	        		}
	        		
	        }
	        
	        	
	 	    }
	     }
	     o += "</table></div>";
	     
	_openWin("showCardHeCheng",o);

}



function showCardList(post,arr,path){
	var winObj=_getWin("showCardList");
	onOpenWin(winObj);
	with(winObj.style){
		width="200";
		height="10";
		if(p.eventY-13<0){
			top=1;
		}else{
			top=p.eventY-13;
		}
		if(p.eventX-200+13<0){
			left=1;
		}else{
			left=p.eventX-200+13;
		}
		overflowY="";
		display='';
	}
	if(path==null)
	{
		path = "null";
	}
	var o=fakeBr(2)+"<font color=#006A6A>选择卡片</font>"+fakeBr(4);
	for(var i=0;i<arr.length;i++){
		o+=arr[i][2]+"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href=# onclick=\"cmd('cardHeCheng chice "+post+" "+arr[i][0]+" "+arr[i][1]+" "+path+"');offOpenWin('showCardList');return false;\">确定</a><br>";
	}
	_openWin("showCardList",o);
}

function closeCardHeCheng()
{	
	offOpenWin('showCardHeCheng');
}


function showHeChengList(itemList,currentPage,totalPage){
	var winObj=_getWin("showHeChengList");
	onOpenWin(winObj);
	with(winObj.style){
		width="200";
		height="300";		
	}
	
	var o=fakeBr(2)+"<font color=#006A6A>卡片信息</font>"+fakeBr(4);
	
	o+="<table align=center>";
	
	for(var i=0;i<itemList.length;i++){
		o+="<tr><td  align=center><a href=# onclick=\"cmd('cardHeCheng showItem "+itemList[i][1]+"');return false;\"><font color=blue>"+itemList[i][0]+"</font></a></td></tr>";
	}
	o+="<tr><td>&nbsp;</td></tr>";
	o+="<tr><td align=center>"+currentPage+"/"+totalPage+"</td></tr>";
	o+="<tr><td align=center><a href=# onclick=\"cmd('heChengList "+(currentPage-1)+"');return false;\">上一页</a>&nbsp;&nbsp;&nbsp;&nbsp;<a href=# onclick=\"cmd('heChengList "+(currentPage+1)+"');return false;\">下一页</a></td></tr>";
	o+="</table>";
	_openWin("showHeChengList",o);
}

function showDropCardList(itemList,currentPage,totalPage){
	var winObj=_getWin("showHeChengList");
	onOpenWin(winObj);
	with(winObj.style){
		width="300";
		height="300";		
	}
	
	var o=fakeBr(2)+"<font color=#006A6A>卡片掉落信息</font>"+fakeBr(4);
	
	o+="<table align=center>";
	
	for(var i=0;i<itemList.length;i++){
		o+="<tr><td><a href=# onclick=\"cmd('cardHeCheng showItem "+itemList[i][1]+"');return false;\"><font color=blue>"+itemList[i][0]+"</font></a>&nbsp;&nbsp;"+itemList[i][2]+"</td></tr>";
	}
	o+="<tr><td>&nbsp;</td></tr>";
	o+="<tr><td align=center>"+currentPage+"/"+totalPage+"</td></tr>";
	o+="<tr><td align=center><a href=# onclick=\"cmd('diaoLuoList "+(currentPage-1)+"');return false;\">上一页</a>&nbsp;&nbsp;&nbsp;&nbsp;<a href=# onclick=\"cmd('diaoLuoList "+(currentPage+1)+"');return false;\">下一页</a></td></tr>";
	o+="</table>";
	_openWin("showHeChengList",o);
}


function showFuBenMessage(roomName)
{
	
	var winObj=_getWin("showFuBenMessage");
	onOpenWin(winObj);
	with(winObj.style){
		width="200";
		height="100";
	}
	var o = "<br><br><br>";
	 o = "<br><br><table width=100%><tr><td align=center><a href=# onclick=\"p.cmd('gto "+roomName+" "+"OK');offOpenWin('showFuBenMessage');return false;\" >离开副本</a>&nbsp;&nbsp;<a href=# onclick=\"offOpenWin('showFuBenMessage');return false;\" >取消</a></td></tr></table>";
	_openWin("showFuBenMessage",o);

}



function listJuDuZhaoZeSellTools(listArr,seled,str){
	
	var isLimit=listArr.length>0&&listArr[0].length==10;
	var winObj=_getWin("listJuDuZhaoZeSellTools");
	onOpenWin(winObj);
	with(winObj.style){
		width="450";
		height="400";
	}
	var o="";
	o+=fakeBr(4)
	if(str==undefined||str==null){
		o+="<font color=red>你想买什么?</font>";
	}else{
		o+=str;
	}
	o+="<br>";

	o+="<table border=0 style='margin-top:3px;margin-bottom:6px;' width=100%>";
	var add;
	for(var i=0;i<listArr.length;i++){	
		add=""+listArr[i][9]+"  ";
			o+="<tr><td><img src="+listArr[i][3]+"></td><td><a href=# onclick=\"p.cmd('foo toolsSellTools "+listArr[i][2]+"');return false;\">"+listArr[i][0]+"</a></td><td width=10></td><td>"+listArr[i][1]+"</td><td>"+add+"</td><td>&nbsp<a href=# onclick=\"p.buyItem('"+listArr[i][4]+"','"+listArr[i][2]+"',"+listArr[i][5]+");return false;\"><font color=blue>【买】</font></a></td></tr>";
		
	}
	o+="</table>";
	_openWin("listJuDuZhaoZeSellTools",o);

}

function showXinShouTip(taskpath){
	showXinShouTipNoMap(taskpath);
	mapWin.showXinShouTip();
}

function closeXinShouTip(taskpath){
	closeXinShouTipNoMap();
	mapWin.closeXinShouTip(taskpath);
}

function showXinShouTipNoMap(taskpath){
	xinshoutask = taskpath;
}

function closeXinShouTipNoMap(){
	xinshoutask = "";
}

function showJiNengYuanJianList(zuoqis,muokuais,itemIndex){
	var winObj=_getWin("showJiNengYuanJianList");
	onOpenWin(winObj);
	with(winObj.style){
		width="200";
		height="10";
		overflowY="";
		display='';
	}
	var o = "";
	if(zuoqis.length<1 && muokuais.length<1)
	{
		o+=fakeBr(2)+"<font color=blue>无坐骑与空技能模块</font><br/>";		
		
	}else{	
		o+=fakeBr(2)+"<font color=blue>请选择坐骑或者空白技能模块</font><br/>";
	   if(zuoqis.length>0)
	   {			
	         for(var i=0;i<zuoqis.length;i++){	
			      o+="<a href=# onclick=\"cmd('helptools "+zuoqis[i][0]+"');hideParentMenu();return false;\">"+zuoqis[i][1]+"</a>&nbsp;&nbsp;&nbsp;&nbsp;<a href=# onclick=\"cmd('use "+itemIndex+" "+zuoqis[i][0]+" skill');offOpenWin('showJiNengYuanJianList');return false;\">增加</a><br>";
	        }
	   }	
       if(muokuais.length>0)
	   {			
	         for(var i=0;i<muokuais.length;i++){	
			      o+="<a href=# onclick=\"cmd('helptools "+muokuais[i][0]+"');hideParentMenu();return false;\">"+muokuais[i][1]+"</a>&nbsp;&nbsp;&nbsp;&nbsp;<a href=# onclick=\"cmd('use "+itemIndex+" "+muokuais[i][0]+" muokuai');offOpenWin('showJiNengYuanJianList');return false;\">融合</a><br>";
	        }
	   }
	}
	_openWin("showJiNengYuanJianList",o);
}


function showZuoQiSkillList(skills,maxSum,skillSum,itemIndex,zuoqiIndex,newName)
{
	if(maxSum>0)
	{
	   var winObj=_getWin("showZuoQiSkillList");
	   onOpenWin(winObj);
	   with(winObj.style){
		width="200";
		height="10";
		overflowY="";
		display='';
	   }
	   var o = "";
	
		o+=fakeBr(2)+"<font color=blue>请选择要替换或要填充的技能</font><br/>";		
		 for(var i=0;i<maxSum-skillSum;i++){	
			      o+="<a href=# onclick=\"\">空</a>&nbsp;&nbsp;&nbsp;&nbsp;<a href=# onclick=\"cmd('use "+itemIndex+" "+zuoqiIndex+" null addSkill');offOpenWin('showZuoQiSkillList');return false;\">填充</a><br>";
	        }
	 
       for(var i=0;i<skills.length;i++){	
			      o+="<a href=# onclick=\"\">"+skills[i][1]+"</a>&nbsp;&nbsp;&nbsp;&nbsp;<a href=# onclick=\"showReplace('"+itemIndex+"',"+zuoqiIndex+",'"+skills[i][1]+"','"+newName+"');offOpenWin('showZuoQiSkillList');return false;\">替换</a><br>";
	        }	
	    if(o!="")
	    {
	       _openWin("showZuoQiSkillList",o);	
	    }
		
	}
}

function showReplace(itemIndex,zuoqiIndex,skills,newName)
{
	
	var winObj=_getWin("showReplace");
	onOpenWin(winObj);
	with(winObj.style){
		width="380";
		height="100";
	}
	var o = "<br><br>";
	 o = "<br><table width=100%><tr><td>要用【<font color=red>"+newName+"技能</font>】替换掉坐骑上原有的【<font color=blue>"+skills+"技能</font>】吗？</td></tr><tr><td>&nbsp;</td></tr><tr><td align=center><a href=# onclick=\"cmd('use "+itemIndex+" "+zuoqiIndex+" "+skills+" replace');offOpenWin('showReplace');return false;\" >是</a>&nbsp;&nbsp;&nbsp;&nbsp;<a href=# onclick=\"offOpenWin('showReplace');return false;\" >否</a></td></tr></table>";
	_openWin("showReplace",o);
}

function showMuoKuaiList(zuoqis,itemIndex)
{
	var winObj=_getWin("showMuoKuaiList");
	onOpenWin(winObj);
	with(winObj.style){
		width="200";
		height="10";
		overflowY="";
		display='';
	}
	var o = "";
	if(zuoqis.length<1)
	{
		o+=fakeBr(2)+"<font color=blue>无坐骑</font><br/>";		
		
	}else{	
		o+=fakeBr(2)+"<font color=blue>请选择需要附加模块的坐骑</font><br/>";	  		
	         for(var i=0;i<zuoqis.length;i++){	
	         	  if(!zuoqis[i][2])
	         	  {
			         o+="<a href=# onclick=\"cmd('helptools "+zuoqis[i][0]+"');hideParentMenu();return false;\">"+zuoqis[i][1]+"</a>&nbsp;&nbsp;&nbsp;&nbsp;<a href=# onclick=\"cmd('use "+itemIndex+" "+zuoqis[i][0]+" add');offOpenWin('showMuoKuaiList');return false;\">填充</a><br>";
	         	  }else{
	         	  	 o+="<a href=# onclick=\"cmd('helptools "+zuoqis[i][0]+"');hideParentMenu();return false;\">"+zuoqis[i][1]+"</a>&nbsp;&nbsp;&nbsp;&nbsp;<a href=# onclick=\"cmd('use "+itemIndex+" "+zuoqis[i][0]+" replace');offOpenWin('showMuoKuaiList');return false;\">替换</a><br>";
	         	  }
	        }
	   
     
	}
	if(o!="")
	{
    	_openWin("showMuoKuaiList",o);
	}
	
}
//显示“雄雕”或“雌雕”
function showSongBaiXiaoMess(cmdName,itemPath)
{
	var winObj=_getWin("showSongBaiXiaoMess");
	onOpenWin(winObj);
	with(winObj.style){
		width="250";
		height="100";		
	}
	var o = "";
	if(cmdName!=null)
	{
		o+=fakeBr(2)+"<font color=blue>请选择“雄雕”或“雌雕”</font><br/><br>";	
		o+="<table>";
		o+="<tr><td align=center><a href=# onclick=\"showMessToUser('"+cmdName+"', '"+itemPath+"', 'xiong');offOpenWin('showSongBaiXiaoMess');return false;\">雄雕</a></td></tr>";
	    o+="<tr><td align=center><a href=# onclick=\"showMessToUser('"+cmdName+"', '"+itemPath+"', 'ci');offOpenWin('showSongBaiXiaoMess');return false;\">雌雕</a></td></tr>";
	    o+="</table>";
	}
	if(o!="")
	{
    	_openWin("showSongBaiXiaoMess",o);
	}
}
//显示“青鸾”或“火凤”
function showSongLuanFengMess(cmdName,itemPath)
{
	var winObj=_getWin("showSongLuanFengMess");
	onOpenWin(winObj);
	with(winObj.style){
		width="250";
		height="100";		
	}
	var o = "";
	if(cmdName!=null)
	{
		o+=fakeBr(2)+"<font color=blue>请选择“青鸾”或“火凤”</font><br/><br>";	
		o+="<table>";
		o+="<tr><td align=center><a href=# onclick=\"showMessToUser('"+cmdName+"', '"+itemPath+"', 'qing');offOpenWin('showSongLuanFengMess');return false;\">青鸾</a></td></tr>";
	    o+="<tr><td align=center><a href=# onclick=\"showMessToUser('"+cmdName+"', '"+itemPath+"', 'huo');offOpenWin('showSongLuanFengMess');return false;\">火凤</a></td></tr>";
	    o+="</table>";
	}
	if(o!="")
	{
    	_openWin("showSongLuanFengMess",o);
	}
}
//选择玩家
function showMessToUser(cmdName,itemPath,message)
{
	var m=prompt('请输入爱人的角色名称','');	
	if(m!=null)
	{		
			cmd(cmdName +  ' toUser '+m+' '+message+" "+itemPath);
	}	
}

function showXingLianItems(arr,baoShiIndex){
	var winObj=_getWin("showXingLianItems");
	onOpenWin(winObj);
	with(winObj.style){
		width="200";
		height="10";
		if(p.eventY-13<0){
			top=100;
		}else{
			top=p.eventY-13;
		}
		if(p.eventX-200+13<0){			
			left=100;
		}else{
			
			left=p.eventX-200+13;
		}
		overflowY="";
		display='';
	}
	
	var o="";
	if(arr==null || arr.length<1)
	{
		o+=fakeBr(2)+"<font color=blue>你身上没有项链，请您重新确认后再尝试。</font><br/>";		
	}else{	
	   o+=fakeBr(2)+"<font color=#006A6A>选择你要镶嵌的项链：</font>"+fakeBr(4)+"<table>";
	   for(var i=0;i<arr.length;i++){
		   o+="<tr><td><nobr><a href=# onclick=\"cmd('helptools "+arr[i][1]+"');hideParentMenu();return false;\">"+arr[i][2]+"</a> "+"&nbsp;&nbsp;&nbsp;</nobr></td><td><nobr><a href=# onclick=\"cmd('use "+baoShiIndex+" "+arr[i][0]+" "+arr[i][3]+" "+arr[i][4]+"');offOpenWin('showXingLianItems');return false;\">镶嵌</a></nobr></td></tr>";
	   }
	}
	_openWin("showXingLianItems",o);
}

function showZhaiChuXingLianItems(arr,zhaiChuFuIndex){
	var winObj=_getWin("showZhaiChuXingLianItems");
	onOpenWin(winObj);
	with(winObj.style){
		width="200";
		height="10";
		if(p.eventY-13<0){
			top=100;
		}else{
			top=p.eventY-13;
		}
		if(p.eventX-200+13<0){			
			left=100;
		}else{
			
			left=p.eventX-200+13;
		}
		overflowY="";
		display='';
	}
	
	var o="";
	if(arr==null || arr.length<1)
	{
		o+=fakeBr(2)+"<font color=blue>您的背包中没有镶嵌宝石的项链，请您重新确认。</font><br/>";		
	}else{	
	   o+=fakeBr(2)+"<font color=#006A6A>选择你要摘除的项链：</font>"+fakeBr(4)+"<table>";
	   for(var i=0;i<arr.length;i++){
		   o+="<tr><td><nobr><a href=# onclick=\"cmd('helptools "+arr[i][1]+"');hideParentMenu();return false;\">"+arr[i][2]+"</a> "+"&nbsp;&nbsp;&nbsp;</nobr></td><td><nobr><a href=# onclick=\"cmd('use "+zhaiChuFuIndex+" "+arr[i][0]+" "+arr[i][3]+" "+arr[i][4]+"');offOpenWin('showZhaiChuXingLianItems');return false;\">确定</a></nobr></td></tr>";
	   }
	}
	_openWin("showZhaiChuXingLianItems",o);
}

function showZhaiChuXingLianBaoShiItems(arr,itemName,itemId){
	
	var winObj=_getWin("showZhaiChuXingLianBaoShiItems");
	onOpenWin(winObj);
	with(winObj.style){
		width="200";
		height="10";
		if(p.eventY-13<0){
			top=100;
		}else{
			top=p.eventY-13;
		}
		if(p.eventX-200+13<0){			
			left=100;
		}else{
			
			left=p.eventX-200+13;
		}
		overflowY="";
		display='';
	}	
	var o="";
	if(arr==null || arr.length<1)
	{
		o+=fakeBr(2)+"<font color=blue>你身上没有项链，请您重新确认后再尝试。</font><br/>";		
	}else{	
	   o+=fakeBr(2)+"<font color=#006A6A>选择你要摘除的宝石：</font>"+fakeBr(4)+"<table>";
	   for(var i=0;i<arr.length;i++){
	   	   o = o + "<img src=" + arr[i][0] + ">&nbsp;&nbsp;&nbsp;&nbsp;" + arr[i][1]  + ":<font color=green>+" + arr[i][2]  + "</font>&nbsp;&nbsp;&nbsp;&nbsp;<a href=# onclick=\"p.cmd('BaoShiZhaiChu " + itemName + " " + itemId + " " + arr[i][3]  + " confirm');offOpenWin('showZhaiChuXingLianBaoShiItems')\">确定</a><br/><br/>";
	   }
	}
	_openWin("showZhaiChuXingLianBaoShiItems",o);
}



function confirmZhaiChuBaoShi(cmdName,itemName,itemId,baoShiIndex){
	
	var winObj=_getWin("confirmZhaiChuBaoShi");
	onOpenWin(winObj);
	with(winObj.style){
		width="220";
		height="100";
	}
	var o = "";
	 o = "<table><tr><td>您确定要摘除指定的幻彩宝石吗？<br><a href=# onclick=\"p.cmd('"+cmdName+" "+itemName+" "+itemId+" "+baoShiIndex+"');offOpenWin('confirmZhaiChuBaoShi');return false;\" >确定</a>&nbsp;&nbsp;<a href=# onclick=\"offOpenWin('confirmZhaiChuBaoShi');return false;\" >取消</a></td>"+"</tr></table>";
	_openWin("confirmZhaiChuBaoShi",o);
}

function ZhaiChuBaoShiIsEquipted(){
	
	var winObj=_getWin("ZhaiChuBaoShiIsEquipted");
	onOpenWin(winObj);
	with(winObj.style){
		width="260";
		height="100";
	}
	var o = "";
	 o = "<table><tr><td>请先将装备卸下，再尝试摘除宝石</td>"+"</tr></table>";
	_openWin("ZhaiChuBaoShiIsEquipted",o);
}


function showXingLianBindItem(arg0,arg1,arg2,arg3)
{
	var winObj=_getWin("showXingLianBindItem");
	onOpenWin(winObj);
	with(winObj.style){
		width="220";
		height="100";
	}
	var o = "";
	 o = "<table><tr><td>您所选用的宝石是绑定的，<font color=red>镶嵌会导致装备属性变为绑定</font>，您确认要继续该操作吗？<br><a href=# onclick=\"p.cmd('use "+arg0+" "+arg1+" "+arg2+" "+arg3+" bind');offOpenWin('showXingLianBindItem');return false;\" >确定</a>&nbsp;&nbsp;<a href=# onclick=\"offOpenWin('showXingLianBindItem');return false;\" >取消</a></td>"+"</tr></table>";
	_openWin("showXingLianBindItem",o);
	
}
function showBossZhanDou(arr){
	
 var dis = _getWin("showBossZhanDou").style.display;
 if(dis=="none")
 {	
	var winObj=_getWin("showBossZhanDou");
	onOpenWin(winObj);
	with(winObj.style){
		width="225";
		height="350";
		if(p.eventY-13<0){
			top=100;
		}else{
			top=p.eventY-13;
		}
		if(p.eventX-200+13<0){			
			left=100;
		}else{
			left=p.eventX-200+13;
		}
		overflowY="";
		display='';
	 }	
	 var o="";
	 if(arr==null || arr.length<1)
	 {
		 o+="<table><tr><td align=center><font color=#006A6A style='font-size:20px'>组队战斗记录</font></td></tr></table>";		
	 }else{	
	    o+="<table width=90% height=90%><tr><td align=center><font color=#006A6A style='font-size:20px'>组队战斗记录</font></td></tr>";
	    for(var i=0;i<arr.length;i++){
	    	   o = o + "<tr><td>"+arr[i]+"</td></tr>";
	    }	   
	   o+="</table>"
	 }
	 _openWin("showBossZhanDou",o);
	}else{		
		offOpenWin('showBossZhanDou');
	}
}

function closeBossZhanDouInfo()
{	
	var dis = _getWin("showBossZhanDou").style.display;
	if(dis=="none")
	{		
	}else{		
		cmd('bossZhanDou close');
	}	
}

function changeTimePrizeImg(arg)
{	
	var divObj=document.getElementById("logingiftid");
	if(arg == "none"){
		with(divObj.style){
			display='none';
		}	
	}
	else{
		if(arg == "00:00"){
			document.getElementById("login_gift").innerHTML = "<img style='cursor:hand' onClick=\"p.cmd('fetchtimeprize');\" src=images/login_gift.gif></img>";
		}
		else{
			document.getElementById("login_gift").innerHTML = "<img src=images/login_ungift.gif></img>";
		}
		document.getElementById("login_count_down").innerHTML = arg;
		
		with(divObj.style){
			display='';
		}	
		setLoginInteval();
	}
}

function getTimePrizeCloseDesc()
{	
	var divObj=document.getElementById("logingiftid");
	if(divObj.style.display == ""){
		var countdown =document.getElementById("login_count_down").innerHTML;
		if(countdown == "00:00"){
			return '您有奖品未领取，是否关闭？';
		}
		else{
			return '您继续在线 '+countdown+' 将可领取一份奖励，是否关闭？';
		}
	}
	return '';
}
function showDianJuanMsg(num,msg,snum,fannum,maxnum){
	var winObj = _getWin("showDianJuanMsg");
	onOpenWin(winObj);
	with(winObj.style){
		width="355";
		height="255";
		overflowY="";
		background = "url(/images/huodongban.jpg) no-repeat";
		display='';
	}
	var o ="" ;
	o += "在活动期间每兑换1个猫豆，可获得1点券。使用点券可领取多种好礼。 </br>  ";
//	o +="<div style=\"margin:0 auto;text-align:center;\">";
//	o +="<div style=\"left:100px;\">";
	o +="<div style=\"position:absolute;margin-top:20px;margin-left:60px;\">";
	if(msg ==null || msg=="" || msg.length<=0){
		o += "暂时没有返还活动！";
	}else{
		for(var i=0;i<msg.length ;i++){
			o += "<img src=img/button/talk.gif style=border-width:0px;height=12px;/>"+"<a href=# onclick=\"p.cmd('dianquancmd dianquan_do "+msg[i][0]+"');return false;\">"+msg[i][0]+" 点券领取"+msg[i][1] + " 猫豆</a><br>";
		}
	}
	o += "</div><div style=psition:absolute;margin-top:180px;margin-left:55px;>";
	if(snum != 0){
		if(num >= maxnum){
			o +="您目前的点券为<font color=red >"+ num + "</font>,可领取所有档次的返还猫豆.";
		}else{
			o +="您目前的点券为<font color=red >"+ num + "</font>,只要再兑换<font color=red>" + (snum-num) + "</font>点就可以领取<font color=red>" + fannum +"</font>猫豆了 ";
		}
	}else{
		o +="您目前可以领取<font color=red>"+ fannum + "</font>猫豆了</div>";
	}
	_openWin("showDianJuanMsg",o);
}
//活动信息  此方法活动条数不能太多
//normal:普通活动列表，jieri:节日活动列表，type:节日类型（0/1），index：第几页 （从第一页开始）
//每页显示8条

function showHuoDongMsg(msg,currenthuodongpage,hasnext,type){
	var winObj=_getWin("showHuoDongMsg");
	onOpenWin(winObj);
	with(winObj.style){
		width="355";
		height="255";
		//top = "200";
		//left = "200";
		overflowY="";
		background = "url(/images/huodongbanbg.gif) no-repeat";
		display='';
	}
	var o="";
	//普通活动
	o += "<br><br><table><tr><td width=80 height=10 valign=top><br>";
	o += "<a href=# onclick=\"p.cmd('showhuodonginfo 0 1');return false;\"><img src=/images/hdinfo_jintian.gif style=border-width:0px></img></a><br><br>";
	o += "<a href=# onclick=\"p.cmd('showhuodonginfo 1 1');return false;\"><img src=/images/hdinfo_jieri.gif style=border-width:0px></img></a>";
	o += "</td><td width=280 align=left><br><font color=blue  size=2pt>";

	if(msg==null || msg=="" || msg.length<=0){
		o += "暂时没有任何活动！";
	}
	else{
		if(msg.length<1){
			o += "暂时没有任何活动！";
		}
		else{
			for(var i=0;i<msg.length;i++){
				o += msg[i];
			}
			if(msg.length<9){
				for(var ai=0;ai<(9-msg.length);ai++){
					o += "<br/>";
				}
			}
		}
	}
	o += "</font></td></tr><tr><td width=80 height=10 valign=top></td>";
	//显示上一页/下一页
	if(currenthuodongpage>1){
		o += "<td align=center width=200 valign=bottom height=30>";
		o += "<a href=# onclick=\"p.cmd('showhuodonginfo "+type+" "+(currenthuodongpage-1)+"');return false;\"><img src=/images/pageup.gif style=border-width:0px></img></a>";
		if(hasnext){
			o += "&nbsp; &nbsp; &nbsp; &nbsp;<a href=# onclick=\"p.cmd('showhuodonginfo "+type+" "+(currenthuodongpage+1)+"');return false;\"><img src=/images/pagedown.gif style=border-width:0px></img></a></td>";
		}
		else{
			o += "</td>";
		}
	}
	else{
		if(hasnext){
			o += "<td align=center width=200 valign=bottom height=30>";
			o += "<a href=# onclick=\"p.cmd('showhuodonginfo "+type+" "+(currenthuodongpage+1)+"');return false;\"><img src=/images/pagedown.gif style=border-width:0px></img></a></td>";
		}
	}
	o += "</tr></table>";
	_openWin("showHuoDongMsg",o);
}

function shlRongHePanel(zshlArr,fshlArr,arg,addJhd){
	var winObj=_getWin("shlRongHe");
	onOpenWin(winObj);
	with(winObj.style){
		width="250";
		height="50";
		overflowY="";
		display='';
	}
	var o = "";
	//alert(zshlArr);
	o=fakeBr(2)+"<font color=blue>主守护灵信息</font><br/>";
	o+="<table width='100%' border='0'><tr><td width=30%>";
	if(zshlArr !=null){
		o+="<img src="+zshlArr[3]+"></img>";
	}
	else{
		o+="<img src=/img/itemlogo/shlrhkb.gif></img>";
	}
	
	o+="</td><td width=20%>&nbsp;</td><td width=50%>";
	if(zshlArr !=null){
		o+="<table width='100%' border='0' ><tr><td>"+zshlArr[1]+"</td></tr><tr><td>Lv <font color=red>"+zshlArr[2]+"</font>   "+zshlArr[4]+"</td></tr>";
		o+="<tr><td><font color=#0066FF>资质："+zshlArr[5]+"</font></td></tr><tr><td><font color=#0066FF>进化阶段："+zshlArr[6]+"</font></td></tr><tr><td><font color=#0066FF>进化度："+zshlArr[7]+"</font></td></tr></table>";
	}
    o+="</td></tr></table>";  
   
	o+="<a href=# onclick=\"cmd('use "+arg+" addzhu');\">放入主守护灵</a>";
	o+=fakeBr(2)+"<br/><font color=blue>副守护灵信息</font><br/>";
	o+="<table width='100%' border='0' ><tr><td width=30%>";
	if(fshlArr !=null){
		o+="<img src="+fshlArr[3]+"></img>";
	}
	else{
		o+="<img src=/img/itemlogo/shlrhkb.gif></img>";
	}
	o+="</td><td width=20%>&nbsp;</td><td width=50%>";
	if(fshlArr !=null){
		o+="<table width='100%' border='0'><tr><td>"+fshlArr[1]+"</td></tr><tr><td>Lv <font color=red>"+fshlArr[2]+"</font>   "+fshlArr[4]+"</td></tr>";
		o+="<tr><td><font color=#0066FF>资质："+fshlArr[5]+"</font></td></tr><tr><td><font color=#0066FF>进化阶段："+fshlArr[6]+"</font></td></tr><tr><td><font color=#0066FF>进化度："+fshlArr[7]+"</font></td></tr></table>";
	}
    o+="</td></tr></table>";  
	o+="<a href=# onclick=\"cmd('use "+arg+" addfu');\">放入副守护灵</a>";
	o+="<br/><br/>主守护灵将获得<font color=red>"+addJhd+"</font>点进化度<table width='100%' border='0'><tr><td align=right style=font-size:14px>";
	if(zshlArr !=null && fshlArr !=null){
		o+="<a href=# onclick=\"if(confirm('确定要融合吗？')){p.cmd('use "+ arg +" "+zshlArr[0]+" "+fshlArr[0]+" ok')};offOpenWin('shlRongHe');return false;\">融合</a></td></tr></table>";
	}
	else{
		o+="融合</td></tr></table>";
	}
	_openWin("shlRongHe",o);
}

function shlTongHuaPanel(zshlArr,fshlArr,arg,skillname,bUseProtect){

	var winObj=_getWin("shlTongHua");
	onOpenWin(winObj);
	with(winObj.style){
		width="250";
		height="50";
		overflowY="";
		display='';
	}
	var o = "";
	//alert(zshlArr);
	o=fakeBr(2)+"<font color=blue>主守护灵信息</font><br/>";
	o+="<table width='100%' border='0'><tr><td width=30%>";
	if(zshlArr !=null){
		o+="<img src="+zshlArr[3]+"></img>";
	}
	else{
		o+="<img src=/img/itemlogo/shlrhkb.gif></img>";
	}
	
	o+="</td><td width=20%>&nbsp;</td><td width=50%>";
	if(zshlArr !=null){
		o+="<table width='100%' border='0' ><tr><td>"+zshlArr[1]+"</td></tr><tr><td>Lv <font color=red>"+zshlArr[2]+"</font>   "+zshlArr[4]+"</td></tr>";
		o+="<tr><td><font color=#0066FF>资质："+zshlArr[5]+"</font></td></tr><tr><td><font color=#0066FF>特有技能：";
		for(var i = 0; i < zshlArr[6].length; i ++) {
			o+="<br/>"+zshlArr[6][i];
		}
		o+="</font></td></tr></table>";
	}
    o+="</td></tr></table>";  
   
	o+="<a href=# onclick=\"cmd('use "+arg+" addzhu');\">放入主守护灵</a>";
	o+=fakeBr(2)+"<br/><font color=blue>副守护灵信息</font><br/>";
	o+="<table width='100%' border='0' ><tr><td width=30%>";
	if(fshlArr !=null){
		o+="<img src="+fshlArr[3]+"></img>";
	}
	else{
		o+="<img src=/img/itemlogo/shlrhkb.gif></img>";
	}
	o+="</td><td width=20%>&nbsp;</td><td width=50%>";
	if(fshlArr !=null){
		o+="<table width='100%' border='0'><tr><td>"+fshlArr[1]+"</td></tr><tr><td>Lv <font color=red>"+fshlArr[2]+"</font>   "+fshlArr[4]+"</td></tr>";
		o+="<tr><td><font color=#0066FF>资质："+fshlArr[5]+"</font></td></tr><tr><td><font color=#0066FF>特有技能："
		for(var i = 0; i < fshlArr[6].length; i ++) {
			o+="<br/>"+fshlArr[6][i];
		}
		o+="</font></td></tr></table>";
	}
    o+="</td></tr></table>";  
	o+="<a href=# onclick=\"cmd('use "+arg+" addfu');\">放入副守护灵</a>";
	if(zshlArr !=null && fshlArr !=null){
		if(skillname==''||skillname==null){
			o+="<br/><br/><font color=blue>选择要进行替换的主守护灵技能</font><br/>";
			o+="<a href=# onclick=\"cmd('use "+arg+" addskill');\">选择技能</a>";
		}
		else{
			o+="<br/><br/><font color=blue>将要进行替换的主守护灵技能</font><br/>";
			o+="<font color=red>"+skillname+"</font>&nbsp; &nbsp; &nbsp; &nbsp; <a href=# onclick=\"cmd('use "+arg+" cancelskill');\">取消</a>";
			if(!bUseProtect){
				o+="<br/><br/><font color=red><b>未使用保护符</b>&nbsp; &nbsp; &nbsp; &nbsp; </font><a href=# onclick=\"cmd('use "+arg+" useprotect');\">使用</a>";
			}
			else{
				o+="<br/><br/><font color=green><b>已用保护符</b></font>&nbsp; &nbsp; &nbsp; &nbsp; <a href=# onclick=\"cmd('use "+arg+" cancelprotect');\">取消</a>";
			}
		}
	}
	else{
		o+="<br/><br/><font color=red>请先放入进行同化的主副守护灵</font><br/>";
	}
	if(zshlArr !=null && fshlArr !=null && skillname!=''&& skillname!=null){
		o+="<br/><table width='100%' border='0'><tr><td align=right style=font-size:14px><a href=# onclick=\"if(confirm('确定要同化吗？')){p.cmd('use "+ arg +" "+zshlArr[0]+" "+fshlArr[0]+" "+skillname+" ok')};offOpenWin('shlTongHua');return false;\">同化</a></td></tr></table>";
	}
	else{
		o+="<br/><table width='100%' border='0'><tr><td align=right style=font-size:14px>同化</td></tr></table>";
	}
	_openWin("shlTongHua",o);
}


function showSHLSkills(winName,title, useindex, skillInfos,zhuid,fuid) {
	var winObj=_getWin(winName);
	onOpenWin(winObj);
	with(winObj.style){
		width="200";
		height="10";
		if(p.eventY-13<0){
			top=1;
		}else{
			if(!top)
				top=p.eventY-13;
		}
		if(p.eventX-187<0){
			left=1;
		}else{
			left=Math.abs(p.eventX-187);
		}
		overflowY="";
		display='';
	}
	var o=fakeBr(2)+title+fakeBr(4);
	o += "<table width=\"100%\" height=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\">";
	
	for(var i = 0; i < skillInfos.length; i ++) {
		o += "<tr align=\"left\">";
		o += "	<td><a href=\"#\" onclick=\"cmd('helpskillsubs " + skillInfos[i] + " ')\"</a>" + skillInfos[i] + "</td>";
		o += "	<td><a href=# onclick=\"cmd('use " + useindex + " " + zhuid + " " + fuid+ " " + skillInfos[i] + "');offOpenWin('" + winName + "');\" >选择</a></td>";
		o += "</tr>";
	}
	o += "</table>";
	
	_openWin(winName,o);
}


function shlrhlist(shls,args){
// 定义显示窗口
	var obj=getObj("shlrhlist");
	if(obj==null){
		for(var i=0;i<winList.length;i++){
			if(winList[i]=="shlrhlist"){
				obj = _createWin("shlrhlist",winPos[name],winSize[name]);
			}
		}
		if (obj == null)
		{
			obj = _createWin("shlrhlist",winPos["default"],winSize["default"]);
		}
	}
   var parentWin = getObj('npcChatReader');
	var t = parentWin.offsetTop;
	var l = parentWin.offsetLeft;
	var e = parentWin;
	while(e=e.offsetParent)
	{
		t += e.offsetTop;
		l += e.offsetLeft;
	}
	l = 18+parseInt(parentWin.style.left.replace('px',''))+parseInt(parentWin.style.width.replace('px',''));
	t = parseInt(parentWin.style.top.replace('px',''))+parseInt(parentWin.style.height.replace('px',''))-50;
	with(obj.style)
	{
		width="220";
		height="200";
		top = t+"px";
		left = l+"px";
		overflowY="";
		display='';
	}

	var show = "<font color=blue>选择守护灵</font><br/>";
	show += "<table width='100%' border='0' cellpadding='0' cellspacing='0' style='margin-top:3px;margin-right:5px;margin-bottom:5px;'><tr><td valign=top>"
	show += "<table width='100%' border='0' align='center' cellpadding='0' cellspacing='1' bgcolor='#BCBCBC'>"
	show += "<tr><td bgcolor='#E1E1E1' style='overflow:hidden;line-height:4em;height:4em;'>"
	show += "<table border=0 cellpadding='0' cellspacing='0' width='100%'>";
	if(args!=null && args.length >=2)
	{
		for(var i=0;i<shls.length;i++)
		{
			
			var imgclick="<img src="+shls[i][2]+" BORDER=0 width=48 height=48 />";
			
			var cor="";
			if(i%2==1){
				cor="bgcolor=#EEEEEE";
			}
			show += "<tr "+cor+"><td ><table border=0 cellpadding='0' cellspacing='0' width='100%' ><tr height=12><td rowspan=4 width=48 >"+imgclick
			+"</td><td width=30>名字:</td><td width=100 colspan=2 align=left>"+shls[i][0]
			+"</td></tr><tr  height=12><td width=30>等级:</td><td width=70 align=left>"+shls[i][1]
			+"</td><td width=30></td></tr><tr  height=12><td width=30>资质:</td><td width=70 align=left>"
			+shls[i][3]+"</td><td width=30><a href=# onclick=\"p.cmd('use "+ args[0]+" "+args[1]+" "+shls[i][4]+"');offOpenWin('shlrhlist');return false;\">[确定]</a></td></tr></table></td></tr>";
		}
	
	}
	show += "</table></td></tr></table></td></tr></table>";

	onOpenWin(obj);
	_openWin("shlrhlist",show);
	focusWin(obj);
}
function showCanUseFaBaoWanBiBaoYu(arg,arr){
	//alert(arr);
	var winObj=_getWin("showCanUseFaBaoWanBiBaoYu");
	onOpenWin(winObj);
	with(winObj.style){
		width="200";
		height="10";
		if(p.eventY-13<0){
			top=1;
		}else{
			top=p.eventY-13;
		}
		if(p.eventX-200+13<0){
			left=1;
		}else{
			left=p.eventX-200+13;
		}
		overflowY="";
		display='';
	}
	var o=fakeBr(2)+"<font color=#006A6A>选择用法宝完璧宝玉的法宝道具</font>"+fakeBr(4);

	for(var i=0;i<arr.length;i++){
		o+="<a href=# onclick=\"cmd('helptools "+arr[i][1]+"');hideParentMenu();return false;\">"+arr[i][2]+"</a>"+"&nbsp;&nbsp;&nbsp;<a href=# onclick=\"cmd('use "+arg+" "+arr[i][1]+" "+arr[i][0]+"');offOpenWin('showCanUseFaBaoWanBiBaoYu');return false;\">使用法宝完璧宝玉</a><br>";
			}
	_openWin("showCanUseFaBaoWanBiBaoYu",o);
}
function showCanUseJingHuaShi(arg,arr){
	//alert(arr);
	var winObj=_getWin("showCanUseJingHuaShi");
	onOpenWin(winObj);
	with(winObj.style){
		width="150";
		height="10";
		if(p.eventY-13<0){
			top=1;
		}else{
			top=p.eventY-13;
		}
		if(p.eventX-200+13<0){
			left=1;
		}else{
			left=p.eventX-200+13;
		}
		overflowY="";
		display='';
	}
	var o=fakeBr(2)+"<font color=#006A6A>请选择法宝</font>"+fakeBr(4);

	for(var i=0;i<arr.length;i++){
		o+="<a href=# onclick=\"cmd('helptools "+arr[i][1]+"');hideParentMenu();return false;\">"+arr[i][2]+"</a>"+"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href=# onclick=\"cmd('use "+arg+" "+arr[i][1]+" "+arr[i][0]+"');offOpenWin('showCanUseJingHuaShi');return false;\">使用</a><br>";
			}
	_openWin("showCanUseJingHuaShi",o);
}

function showCanUseDianJingShi(arg,arr){
	//alert(arr);
	var winObj=_getWin("showCanUseDianJingShi");
	onOpenWin(winObj);
	with(winObj.style){
		width="200";
		height="10";
		if(p.eventY-13<0){
			top=1;
		}else{
			top=p.eventY-13;
		}
		if(p.eventX-200+13<0){
			left=1;
		}else{
			left=p.eventX-200+13;
		}
		overflowY="";
		display='';
	}
	var o=fakeBr(2)+"<font color=#006A6A>选择用法宝点精石的法宝道具</font>"+fakeBr(4);

	for(var i=0;i<arr.length;i++){
		o+="<a href=# onclick=\"cmd('helptools "+arr[i][1]+"');hideParentMenu();return false;\">"+arr[i][2]+"</a>"+"&nbsp;&nbsp;&nbsp;     <a href=# onclick=\"cmd('use "+arg+" "+arr[i][1]+" "+arr[i][0]+"');offOpenWin('showCanUseDianJingShi');return false;\">使用法宝点精石</a><br>";
			}
	_openWin("showCanUseDianJingShi",o);
}

function faBaoCmd(cmdName,type,itemName,itemId,target)
{	
	if(type=='faBaoFenPei')
	{
	   var input=prompt('请输入给 ['+target+'] 分配的数量','');
	   if(input!=null){
		if(checkInt(input)){
			if(input<1){
				alert("分配的数量不能小于1!");
			}else if(input>9999){
				alert("分配的数量不能大于9999!");
			}
			else{
				if(confirm('确认要分配 ['+target+'] '+input+' ?')){
					cmd(cmdName+" "+type+" "+itemName+" "+itemId+" "+target+" "+input);
				}
			}
		}else{
			alert("请输入正确的数字!");
			faBaoCmd(cmdName,type,itemName,itemId,target);
		}
	  }	
	}else{
		cmd(cmdName+" "+type+" "+itemName+" "+itemId+" "+target);
	}
}

function showCanUseXiDianFu(arg,arr){
	//alert(arr);
	var winObj=_getWin("showCanUseXiDianFu");
	onOpenWin(winObj);
	with(winObj.style){
		width="200";
		height="10";
		if(p.eventY-13<0){
			top=1;
		}else{
			top=p.eventY-13;
		}
		if(p.eventX-200+13<0){
			left=1;
		}else{
			left=p.eventX-200+13;
		}
		overflowY="";
		display='';
	}
	var o=fakeBr(2)+"<font color=#006A6A>选择用法宝洗点符的法宝道具</font>"+fakeBr(4);

	for(var i=0;i<arr.length;i++){
		o+="<a href=# onclick=\"cmd('helptools "+arr[i][1]+"');hideParentMenu();return false;\">"+arr[i][2]+"</a>"+"&nbsp;&nbsp;&nbsp;     <a href=# onclick=\"cmd('use "+arg+" "+arr[i][1]+" "+arr[i][0]+"');offOpenWin('showCanUseXiDianFu');return false;\">使用法宝洗点符</a><br>";
			}
	_openWin("showCanUseXiDianFu",o);
}


function showTieedJingHuaShi(arg1,arg2,arg3)
{	
	var winObj=_getWin("showTieedJingHuaShi");
	onOpenWin(winObj);
	with(winObj.style){
		width="220";
		height="100";
	}
	var o = "";
	 o = "<table><tr><td>使用后将使法宝与你的角色绑定，您确定要这样做吗？<br><a href=# onclick=\"p.cmd('use "+arg1+" "+arg2+" "+arg3+" bind');offOpenWin('showTieedJingHuaShi');return false;\" >确定</a>&nbsp;&nbsp;<a href=# onclick=\"offOpenWin('showTieedJingHuaShi');return false;\" >取消</a></td>"+"</tr></table>";	_openWin("showTieedJingHuaShi",o);	
}

function showNinHuaFu(arg1,arg2,arg3)
{	
	var winObj=_getWin("showNinHuaFu");
	onOpenWin(winObj);
	with(winObj.style){
		width="220";
		height="100";
	}
	var o = "";
	 o = "<table><tr><td>使用凝化符将摧毁指定的法宝，并获得一枚法宝点精石，您确定要这么做？<br><a href=# onclick=\"p.cmd('use "+arg1+" "+arg2+" "+arg3+" OK');offOpenWin('showNinHuaFu');return false;\" >确定</a>&nbsp;&nbsp;<a href=# onclick=\"offOpenWin('showNinHuaFu');return false;\" >取消</a></td>"+"</tr></table>";	_openWin("showNinHuaFu",o);
	 }

function showCanUseNingHuaFu(arg,arr){
	//alert(arr);
	var winObj=_getWin("showCanUseNingHuaFu");
	onOpenWin(winObj);
	with(winObj.style){
		width="200";
		height="10";
		if(p.eventY-13<0){
			top=1;
		}else{
			top=p.eventY-13;
		}
		if(p.eventX-200+13<0){
			left=1;
		}else{
			left=p.eventX-200+13;
		}
		overflowY="";
		display='';
	}
	var o=fakeBr(2)+"<font color=#006A6A>选择用法宝凝化符的法宝道具</font>"+fakeBr(4);

	for(var i=0;i<arr.length;i++){
		o+="<a href=# onclick=\"cmd('helptools "+arr[i][1]+"');hideParentMenu();return false;\">"+arr[i][2]+"</a>"+"&nbsp;&nbsp;&nbsp;     <a href=# onclick=\"cmd('use "+arg+" "+arr[i][1]+" "+arr[i][0]+"');offOpenWin('showCanUseNingHuaFu');return false;\">使用法宝凝化符</a><br>";
			}
	_openWin("showCanUseNingHuaFu",o);
}

function guessNum(){
	var input=prompt('请输入你猜到的数',1);
	if(input!=null){
		if(checkInt(input)){
			if(input<1 || input>99){
				alert("价格是1-99中的一个哦!");
				guessNum();
			}else{
				cmd("checkguessnum "+input);
			}
		}else{
			alert("请输入正确的数字!");
			guessNum();
		}
	}
}

//显示道具的大图片
function showBigPic(picsrc,parentWin)
{
	// 定义显示窗口
	var obj=getObj("showBigPic");
	if(obj==null){
		for(var i=0;i<winList.length;i++){
			if(winList[i]=="showBigPic"){
				obj = _createWin("showBigPic",winPos[name],winSize[name]);
			}
		}
		if (obj == null)
		{
			obj = _createWin("showBigPic",winPos["default"],winSize["default"]);
		}
	}
	var iteminfo = getObj(parentWin);
	var t = iteminfo.offsetTop;
	var l = iteminfo.offsetLeft;
	var e = iteminfo;
	while(e=e.offsetParent)
	{
		t += e.offsetTop;
		l += e.offsetLeft;
	}
	if (parentWin == 'itemInfoWin' || parentWin == 'itemInfoDescWin' )
	{
		l += 252;
	}
	else
	{
		l = 10+parseInt(iteminfo.style.left.replace('px',''))+parseInt(iteminfo.style.width.replace('px',''));
	}
	with(obj.style)
	{
		width="180";
		height="230";
		top = t+"px";
		var tmp = 10+parseInt(iteminfo.style.left.replace('px',''))+parseInt(iteminfo.style.width.replace('px',''));
		left = l+"px";
		overflowY="";
		display='';
	}

	var show = "<br/>";
	show += "<table width='100%' border='0' cellpadding='0' cellspacing='0' style='margin-top:3px;margin-right:5px;margin-bottom:5px;'><tr><td valign=top>"
	show += "<tr><td><img src="+picsrc+" /></td></tr>";
	show += "</table>";

	onOpenWin(obj);
	_openWin("showBigPic",show);
	focusWin(obj);
}
/**
*提示框
*参数msg:提示信息
*参数cmdname:点击确定后的执行命令
*参数args:命令相关参数
**/
function showConfirm(msg,cmdname,args)
{
	if(confirm(msg))
  	{
  		p.cmd(cmdname+" "+args);
  	}else{  		
  	    return;
  	}

}

/**
*提示框
*参数msg:提示信息
*参数cmdname:点击确定后的执行命令
*参数cmdname2:点击取消后的执行命令
*参数args:命令相关参数
*参数args2:命令2相关参数
**/
function showConfirmWith2Cmd(msg,cmdname,args,cmdname2,args2)
{
	if(confirm(msg))
  	{
		p.cmd(cmdname+" "+args);
  	}else{  		
		p.cmd(cmdname2+" "+args2);
  	}

}

function showConfirmWithColor(msg,okcmd,args,nocmd,args2,arr)
{
	var winObj=_getWin("showConfirmWithColor");
	onOpenWin(winObj);
	with(winObj.style){
		width="300";
		height="50";
		if(p.eventY-13<0){
			top=1;
		}else{
			top=p.eventY-13;
		}
		if(p.eventX-200+13<0){
			left=1;
		}else{
			left=p.eventX-200+13;
		}
		overflowY="";
		display='';
	}
	var o=fakeBr(2)+"<font color=#006A6A>命格的随机属性发生了如下变化:</font>"+fakeBr(4);

	o += "<table>";
	
	o += msg;
	o += "<tr><td><font color=red>你确定要保存随机属性么？</font></td></tr>";
	o += "<tr><td align=center><a href=# onclick=\"cmd('"+okcmd+" "+args+"');offOpenWin('showConfirmWithColor');return false;\">确定</a></td><td align=center>"
		+"<a href=# onclick=\"cmd('"+nocmd+" "+args2+"');offOpenWin('showConfirmWithColor');return false;\">取消</a></td><tr>";
	o += "</table>";
	_openWin("showConfirmWithColor",o);
}

function resetYiLingPorp(yilingId){
	if(confirm("重置属性将消耗"+getResetYiLingPrize()+"猫豆，确认么？")){
		var checkstr = "";
		for(var i=0;i<8;i++)
		{
			var ylcheck = document.getElementById('ylcheck_'+i);
			if(ylcheck.checked){
				checkstr+="1,";
			}
			else{
				checkstr+="0,";
			}
		}
		cmd("yilingcmd "+yilingId+" resetporp "+checkstr);
		offOpenWin('itemInfoWin');
		offOpenWin('showBigPic');
	}
}

function getResetYiLingPrize()
{	
	var checknum = 0;
	for(var i=0;i<8;i++)
	{
		var ylcheck = document.getElementById('ylcheck_'+i);
		if(ylcheck.checked){
			checknum++;
		}
		
	}
	var prize = 3;
	if(checknum != 0){
		prize=10*checknum;
	}
	return prize;
}

function showYiLingMsg()
{	
	var prize = getResetYiLingPrize();
	var ylshow =document.getElementById("ylshow").innerHTML;
	document.getElementById("ylshow").innerHTML = "重置消耗<font size=5>"+prize+"</font>猫豆";
}

function resetHuiJiPorp(huiJiId){
	var huijimm = getResetHuiJiPrize() ;
	if(huijimm >= 30){
		alert("属性不能全部锁定！") ;
		return ;
	}
	if(confirm("重置属性将消耗"+huijimm+"猫豆，确认么？")){
		var checkstr = "";
		for(var i=0;i<3;i++)
		{
			var hjcheck = document.getElementById('hjcheck_'+i);
			if(hjcheck.checked){
				checkstr+="1,";
			}
			else{
				checkstr+="0,";
			}
		}
		cmd("huijicmd "+huiJiId+" resetpros "+checkstr);
		offOpenWin('itemInfoWin');
	}
}

function getResetHuiJiPrize()
{	
	var checknum = 0;
	for(var i=0;i<3;i++)
	{
		var hjcheck = document.getElementById('hjcheck_'+i);
		if(hjcheck.checked){
			checknum++;
		}
		
	}
	if(checknum == 0)
		return 5 ;
	return 10*checknum;
}

function showHuiJiMsg()
{
	var huijimm = getResetHuiJiPrize() ;
	document.getElementById("huijishow").innerHTML = "重置消耗<font size=3>"+huijimm+"</font>猫豆";
}

function luoPanYingYong(luopanitemid){
	var hexins = document.getElementsByName("hexinofluopan") ;
	var checkNum = -2 ;
	for(var i = 0 ; i < hexins.length ; i++){
		if(hexins[i].checked){
			checkNum = i ;
			break ;			
		}
	}
	
	if(checkNum == -2){
		alert("请先选择一个元素核心!") ;
		return ;
	}
	
	if(checkNum == 4){
		alert("不能选择光元素核心!") ;
		return ;
	}
	
	cmd("yuansuluopan_cmd "+luopanitemid+" yingyong "+(checkNum+1)) ;
}

function showInputWin(title,cmdname,args){
	var input=prompt(title,1);
	if(input!=null){
		cmd(cmdname +" "+args+" "+input);
	}
}

function showInputWinDefault(title,cmdname,args,defnum){
	var input=prompt(title,defnum);
	if(input!=null){
		cmd(cmdname +" "+args+" "+input);
	}
}

/**
*针对类似方法冗余，特写一个可应用于该类型道具的通用方法
*同类型方法请参阅 showCanUseUtil 
*arg 可为任意多个的参数 arr只用index内容验证，title为弹出框标签，act为按钮名称
*fangjz 2011-06-20
**/
function showCanUseUtil2(arg,arr,title,act,helpcmd,maincmd){
	var winObj=_getWin("selItemCanUseUtil");
	onOpenWin(winObj);
	with(winObj.style){
		width="200";
		height="10";
		if(p.eventY-13<0){
			top=1;
		}else{
			top=p.eventY-13;
		}
		if(p.eventX-200+13<0){
			left=1;
		}else{
			left=p.eventX-200+13;
		}
		overflowY="";
		display='';
	}
	var o=fakeBr(2)+"<font color=#006A6A>"+title+"</font>"+fakeBr(4);
	for(var i=0;i<arr.length;i++){
		if(helpcmd !=''){
			o+="<a href=# onclick=\"cmd('"+helpcmd+" "+arr[i][1]+"');hideParentMenu();return false;\">"+arr[i][2]+"</a> "+"&nbsp;&nbsp;&nbsp;     <a href=# onclick=\"cmd('"+maincmd+" "+arg+" "+arr[i][1]+"');offOpenWin('selItemCanUseUtil');return false;\">"+act+"</a><br>";
		}
		else{
			o+=arr[i][2]+" "+"&nbsp;&nbsp;&nbsp;     <a href=# onclick=\"cmd('"+maincmd+" "+arg+" "+arr[i][1]+"');offOpenWin('selItemCanUseUtil');return false;\">"+act+"</a><br>";
		}
	}
	_openWin("selItemCanUseUtil",o);
}

//arr 给道具的名称，path,扣除道具的名称，数量
function showExchangeList2(arg,arr,title,act,helpcmd,maincmd){
	var winObj=_getWin("showExchangeList2");
	onOpenWin(winObj);
	with(winObj.style){
		width="400";
		height="10";
		if(p.eventY-13<0){
			top=1;
		}else{
			top=p.eventY-13;
		}
		if(p.eventX-200+13<0){
			left=1;
		}else{
			left=p.eventX-200+13;
		}
		overflowY="";
		display='';
	}
	var o=fakeBr(2)+"<font color=#006A6A>"+title+"</font>" ;
		o += "</br>" ;
		o += "<table width='100%' border='0' cellpadding='0' cellspacing='0' style='margin-top:3px;margin-right:5px;margin-bottom:5px;'>" ;
		for(var i=0;i<arr.length;i++){
			if(helpcmd !=''){
				o += "<tr>" ;
				o += "<td><a href=# onclick=\"cmd('"+helpcmd+" "+arr[i][1]+"');hideParentMenu();return false;\">"+arr[i][0]+"</a><td>" ;
				o += "<td>花费"+arr[i][2]+"x"+arr[i][3]+"</td>" ; 
				o += "<td><a href=# onclick=\"cmd('"+maincmd+" "+arg+" "+arr[i][1]+"');offOpenWin('showExchangeList2');return false;\">"+act+"</a></td>";
				o += "</tr>" ;
			}
			else{
				o += "<tr>" ;
				o += "<td>" +arr[i][0]+"</td>" ;
				o += "<td>花费"+arr[i][2]+"x"+arr[i][3]+"</td>" ; 
				o +="<td><a href=# onclick=\"cmd('"+maincmd+" "+arg+" "+arr[i][1]+"');offOpenWin('showExchangeList2');return false;\">"+act+"</a></td>";
				o += "</tr>" ;
			}
		}
		o += "</table>" ;
	_openWin("showExchangeList2",o);
}

/**
*扭蛋机提交
*winName:窗口名称
*type:0-领道具，1-扭一下，2-换小豆
**/
function submitDoNiu(winName,type) {
	var niuniu_uses = document.getElementsByName("niuniu_use");
	var niuniu_use;
	for(var i = 0; i < niuniu_uses.length; i++) {
		niuniu_use = niuniu_uses[i];
		if(niuniu_use.checked) {
			break;
		}
	}
	if(!niuniu_use) {
		alert("请选择要使用什么来扭！");
		return false;
	}
	if(type==1){
		if(!confirm("你确定要使用【" + niuniu_use.value + "】来扭一次吗？")) {
			return false;
		}
	}
	cmd("useniudanji " + niuniu_use.id +" "+type);
	offOpenWin("'" + winName + "'");
	return true;
}
/**
*显示经脉系统
*parentWin:父窗口
*colorid:需要闪烁的经脉ID(1-8)
**/
function showJingMaiInfo(parentWin,colorid,jieduan,jmid)
{
	// 定义显示窗口
	var obj=getObj("showJingMaiInfo");
	if(obj==null){
		for(var i=0;i<winList.length;i++){
			if(winList[i]=="showJingMaiInfo"){
				obj = _createWin("showJingMaiInfo",winPos[name],winSize[name]);
			}
		}
		if (obj == null)
		{
			obj = _createWin("showJingMaiInfo",winPos["default"],winSize["default"]);
		}
		var petinfo = getObj(parentWin);
		var t = petinfo.offsetTop;
		var l = petinfo.offsetLeft;
		var e = petinfo;
		while(e=e.offsetParent)
		{
			t += e.offsetTop;
			l += e.offsetLeft;
		}
		if (parentWin == 'petinfo')
		{
			l -= 261;
		}
		else
		{
			l = 10+parseInt(petinfo.style.left.replace('px',''))+parseInt(petinfo.style.width.replace('px',''));
		}
		with(obj.style)
		{
			width="257";
			height="400";
			top = t+"px";
			left = l+"px";
			overflowY="";
			background = "url(img/jingmai/JMBack_M.gif)";
			display='';
		}
	}
	var nsrc = "img/jingmai/NormalXW.gif";
	var csrc = "img/jingmai/FlashXW.gif";
	var show = "<font color=blue><b>【经脉】</b>";
	if(jmid==0){
		show += " <a href=# onclick=\"cmd('showJingMai firstopen "+jieduan+"');return false;\"><font color=yellow>「开启第"+jieduan+"阶」</font></a>";
	}
	show += "</font><br/><table width='100%'>"
	show += "<table width='100%'><tr><td align='center' valign='bottom' style='height:65px;'><a href=# onclick=\"cmd('showJingMai 1');return false;\"><img src="+(colorid==1?csrc:nsrc)+" border='0'/></a></td><td style='width:2px;'></td></tr>";
	show += "<tr><td align='center' valign='bottom' style='height:35px;'><a href=# onclick=\"cmd('showJingMai 2');return false;\"><img src="+(colorid==2?csrc:nsrc)+"  border='0'/></a></td><td style='width:2px;'></td></tr>";
	show += "</table><table width='100%'><tr>"
		 +"<td valign='top' align='center' style='height:38px;width=142px'><a href=# onclick=\"cmd('showJingMai 3');return false;\"><img src="+(colorid==3?csrc:nsrc)+"  border='0'/></a></td>"
		 +"<td valign='bottom' align='left' style='height:38px;width=90px'><a href=# onclick=\"cmd('showJingMai 4');return false;\"><img src="+(colorid==4?csrc:nsrc)+"  border='0'/></a></td>"
		 +"<td valign='top' align='center' style='height:38px;width=38px'><a href=# onclick=\"cmd('showJingMai 5');return false;\"><img src="+(colorid==5?csrc:nsrc)+"  border='0'/></a></td>";
	show += "</table><table width='100%'>"
	show += "<tr><td align='right' style='height:72px;'><a href=# onclick=\"cmd('showJingMai 6');return false;\"><img src="+(colorid==6?csrc:nsrc)+"  border='0'/></a></td><td style='width:76px;'></td></tr>";
	show += "</table><table width='100%'>"
	show += "<tr><td align='center' valign='top' style='height:40px;'><a href=# onclick=\"cmd('showJingMai 7');return false;\"><img src="+(colorid==7?csrc:nsrc)+"  border='0'/></a></td><td style='width:2px;'></td></tr>";
	show += "</table><table width='100%'>"
	show += "<tr><td align='right' style='height:40px;'><a href=# onclick=\"cmd('showJingMai 8');return false;\"><img src="+(colorid==8?csrc:nsrc)+"  border='0'/></a></td><td style='width:90px;'></td></tr>";
	show += "</table>";
	onOpenWin(obj);
	_openWin("showJingMaiInfo",show);
	focusWin(obj);
}
function showXueWeiInfo(parentWin,canopen,jmdesc,jmid,qixue,fxinfo,sxinfo)
{
	// 定义显示窗口
	var obj=getObj("showXueWeiInfo");
	
	if(obj==null){
		for(var i=0;i<winList.length;i++){
			if(winList[i]=="showJingMaiInfo"){
				obj = _createWin("showXueWeiInfo",winPos[name],winSize[name]);
			}
		}
		if (obj == null)
		{
			obj = _createWin("showXueWeiInfo",winPos["default"],winSize["default"]);
		}
		var showJingMaiInfo = getObj(parentWin);
		var t = showJingMaiInfo.offsetTop;
		var l = showJingMaiInfo.offsetLeft;
		var e = showJingMaiInfo;
		while(e=e.offsetParent)
		{
			t += e.offsetTop;
			l += e.offsetLeft;
		}
		if (parentWin == 'showJingMaiInfo')
		{
			l += 261;
		}
		else
		{
			l = 10+parseInt(showJingMaiInfo.style.left.replace('px',''))+parseInt(showJingMaiInfo.style.width.replace('px',''));
		}
		with(obj.style)
		{
			width="200";
			height="350";
			top = t+"px";
			left = l+"px";
			overflowY="";
			display='';
		}
	}
	var tsrc = "img/jingmai/CanUp.gif";
	var fsrc = "img/jingmai/CannotUp.gif";
	var cqf = "img/jingmai/CanQF.gif";
	var cnqf = "img/jingmai/CannotQF.gif";
	var show = "<font color=blue><b>"+jmdesc+"</b>";
	if(canopen){
		show += " <a href=# onclick=\"cmd('showJingMai open "+jmid+"');return false;\"><font color=blue>「打通经脉」</font></a>";
	}
	show += "</font><br/><font color=green>当前气血值:"+qixue+"</font>";
	show+="<hr size=1 width='100%'>";
	show += "<table width='100%'>"
	show += "<tr><td>"+fxinfo[0]+"("+fxinfo[1]+"级)</td></tr>";
	show += "<tr><td>效果:<font color=green>"+fxinfo[2]+"</font></td></tr>";
	show += "<tr><td>下级效果:<font color=blue>"+fxinfo[3]+"</font></td></tr>";
	show += "<tr><td>需要等级:"+fxinfo[4]+"</td></tr>";
	show += "<tr><td>需要气血:"+fxinfo[5]+"</td></tr>";
	show += "<tr><td><a href=# onclick=\"cmd('showJingMai uplv "+fxinfo[8]+"');offOpenWin('showXueWeiInfo');return false;\"><img src='"
		 +(fxinfo[6]==true?tsrc:fsrc)+"' border='0'/></a>&nbsp &nbsp <a href=# onclick=\"cmd('showJingMai finish "+fxinfo[8]+"');offOpenWin('showXueWeiInfo');return false;\"><img src='"
		 +(fxinfo[7]>0?cqf:cnqf)+"' border='0'/></a></td></tr>";
	show += "<tr><td>修炼剩余时间:"+Math.floor(fxinfo[7]/3600)+"小时"+Math.floor((fxinfo[7]%3600)/60)+"分"+(fxinfo[7]%60)+"秒</td></tr></table>";
	show+="<hr size=1 width='100%'>";
	show += "<table><tr><td>"+sxinfo[0]+"("+sxinfo[1]+"级)</td></tr>";
	show += "<tr><td>效果:<font color=green>"+sxinfo[2]+"</font></td></tr>";
	show += "<tr><td>下级效果:<font color=blue>"+sxinfo[3]+"</font></td></tr>";
	show += "<tr><td>需要等级:"+sxinfo[4]+"</td></tr>";
	show += "<tr><td>需要气血:"+sxinfo[5]+"</td></tr>";
	show += "<tr><td><a href=# onclick=\"cmd('showJingMai uplv "+sxinfo[8]+"');offOpenWin('showXueWeiInfo');return false;\"><img src='"
		 +(sxinfo[6]==true?tsrc:fsrc)+"' border='0'/></a>&nbsp &nbsp <a href=# onclick=\"cmd('showJingMai finish "+sxinfo[8]+"');offOpenWin('showXueWeiInfo');return false;\"><img src='"
		 +(sxinfo[7]>0?cqf:cnqf)+"' border='0'/></a></td></tr>";
	show += "<tr><td>修炼剩余时间:"+Math.floor(sxinfo[7]/3600)+"小时"+Math.floor((sxinfo[7]%3600)/60)+"分"+(sxinfo[7]%60)+"秒</td></tr>";
	show += "</table>";
	onOpenWin(obj);
	_openWin("showXueWeiInfo",show);
	focusWin(obj);
}

/**
 * 修仙显示主界面
 * qitype:处于哪个期，如练气期等等(此为玩家点击的期)
 * smalltype:表示如练气期中哪一期
 * occtype:职业类型
 * realtype:处于哪个期，如练气期等等(实际玩家已经修炼到的期)
 * tjstatus:是否冲破天极 0为关闭,1为开启
 */
function showXiuXian(qitype,smalltype,occtype,realtype,tjstatus,curexp,needexp,expwidth){
	var winObj=_getWin("showXiuXianInfo") ;
	onOpenWin(winObj) ;
	with(winObj.style){
		width="380";
		height="450";
		overflowY="";
		background = "url(img/xiuxian/back.gif)";
	}

	var show = "<table width='80%' border='0' cellpadding='0' cellspacing='0' style='margin-top:52px;margin-right:10px;margin-left:10px'>" ;
		show += "<tr>" ;
		for(var i = 1 ;i <= 5;i++){
			show += "<td>" 
			if(i==qitype){
				show += "<img style=border-width:0px 0px 0px 0px src=img/xiuxian/xiuxian"+i+".gif />" ;
			}else{
				show += "<a href=# onclick=\"cmd('xiuxiancmd showxiuxian "+i+"');return false;\"><img style=border-width:0px 0px 0px 0px src=img/xiuxian/xiuxian"+i+"_1.gif /></a>"  ;
			}
			show += "</td>" ;
		}
		show += "</tr>" ;
		show += "</table>" ;
		
		
		show += "<table width=92% style='margin-top:8px;margin-left:20px'><tr><td>"
		//显示大图
		show += "<table width='100%' border='0' cellpadding='0' cellspacing='0'>" ;
		show += "<tr><td>" ;
		show += "<img style=border-width:0px 0px 0px 0px src=img/xiuxian/bigimg"+qitype+".gif />" ;
		show += "</td></tr>" ;
		show += "</table>" ;
		show += "</td>" ;
		
		//数据储存
		var lianqiarray = new Array("6","100","6","2%","14","100","2%","2%","2%","14") ;
		var zhuqiarray = new Array("10","200","10","2%","16","200","2%","2%","2%","16") ;
		var jiedanarray = new Array("16","300","16","3%","30","300","3%","3%","2%","30") ;
		var yuanyingarray = new Array("28","400","28","6%","60","400","6%","6%","2%","60") ;
		var huashenarray = new Array("40","800","40","7%","130","800","7%","7%","2%","130") ;
		//属性效果显示
		show += "<td>"
		show += "<table width='100%' border='0' cellpadding='0' cellspacing='0'>" ;
		for(var i = 1 ; i <= 10 ; i++ ){
			var num = 0 ;
			show += "<tr>" ;
			show += "<td>" ;
			if(i <= 3 ){
				show += "<img style=border-width:0px 0px 0px 0px src=img/xiuxian/smalltype"+qitype+"1.gif />" ;
			}else if(i <= 6){
				show += "<img style=border-width:0px 0px 0px 0px src=img/xiuxian/smalltype"+qitype+"2.gif />" ;
			}else{
				show += "<img style=border-width:0px 0px 0px 0px src=img/xiuxian/smalltype"+qitype+"3.gif />" ;
			}
			show += "</td>" ;
			show += "<td>" ;
			
			var pro = "" ;
			if(i == 1){
				pro = "法抗+"
			}
			if(i == 2){
				pro = "HP+" ;
			}
			if(i == 3){
				pro = "物抗+" ;
			}
			if(i == 4){
				if(occtype==1){
					pro = "减物理重击" ;
				}else{
					pro = "减法术重击" ;
				}
			}
			if(i == 5){
				if(occtype==1){
					pro = "力量+" ;
				}else{
					pro = "智力+" ;
				}
			}
			if(i == 6){
				pro = "SP+" ;
			}
			if(i == 7){
				pro = "减对方闪避" ;
			}
			if(i == 8){
				pro = "减对方命中" ;
			}
			if(i == 9){
				pro = "减对方防御" ;
			}
			if(i == 10){
				if(occtype==1){
					pro = "攻击+" ;
				}else{
					pro = "法伤+" ;
				}
			}
			
			if(qitype == 1){
				pro += 	lianqiarray[i-1] ;
			}
			if(qitype == 2){
				pro += 	zhuqiarray[i-1] ;
			}
			if(qitype == 3){
				pro += 	jiedanarray[i-1] ;
			}
			if(qitype == 4){
				pro += 	yuanyingarray[i-1] ;
			}
			if(qitype == 5){
				pro += 	huashenarray[i-1] ;
			}
			if(qitype < realtype){
				show += "<font color=#66FF00>"+pro+"</font>" ;
			}else if(qitype == realtype){
				if(i < smalltype || (smalltype == 10 && i == smalltype && curexp-needexp>=0)){
					show += "<font color=#66FF00>"+pro+"</font>" ; //亮色
				}else{
					show += "<font color=#CCCCCC>"+pro+"</font>" ; 
				}
			}else{
				show += "<font color=#CCCCCC>"+pro+"</font>" ; 
			}
			
			
			show += "</td>" ;
			show += "</tr>" ;
		}
		show += "</table>" ;
		show += "</td></tr></table>" ;
		
		//丹值
		show += "<table width=260 style='margin-top:10px;margin-left:75px;height:12;' cellpadding='0' cellspacing='0' border='0' background=img/xiuxian/expbg.png >" ;
		show += "<tr><td width='100%'><table title="+curexp+"/"+needexp+" style=width:"+expwidth+";height:12 background=img/xiuxian/exp.jpg border='0' cellpadding='0' cellspacing='0'><tr><td></td></tr></table></td></tr>" ;
		show += "</table>" ;
		
		show += "<table width=80% style='margin-top:2px;margin-left:68px'><tr>" ;
		show += "<td style=font-weight:700;>修仙丹</td>" ;
		show += "<td><a href=# onclick=xiuXianDanMinus()><img style=border-width:0px 0px 0px 0px src=img/xiuxian/jian.gif /></a></td>" ;
		show += "<td><input id=xiuxiandan onchange=checkXiuXianNum(1,99,'xiuxiandan') style=width:40px type=text value=1 /></td>" ;
		show += "<td><a href=# onclick=xiuXianDanPlus()><img style=border-width:0px 0px 0px 0px src=img/xiuxian/jia.gif /></a></td>" ;
		show += "<td><a href=# onclick=addxiuxianzhi("+qitype+","+realtype+","+curexp+","+smalltype+") ><img style=border-width:0px 0px 0px 0px src=img/xiuxian/addnum.gif /></a></td>" ;
		show += "</tr></table>" ;
		
		var tianji1 = new Array("30","30","15") ;
		var tianji2 = new Array("30","30","15") ;
		var tianji3 = new Array("40","40","25") ;
		var tianji4 = new Array("60","60","25") ;
		var tianji5 = new Array("90","90","30") ;
		
		show += "<table width=95% style='margin-top:20px;margin-left:10px'>" ;
		show += "<tr><td width=17% style=font-weight:700;>天极属性</td>" ;
		show += "<td width=83% colspan=5 rowspan=3 style=font-weight:700;>仙期修炼完毕之后，需要使用“天极丹”冲破天极，得到天极属性。每次使用的“天极丹”越多，冲破天极的成功率越大。</td>" ;
		show += "</tr>" ;
		for(var i = 1 ; i <= 3 ;i ++){
			var tianjipro = "" ;
			if(i == 1){
				if(occtype==1){
					tianjipro = "力量+" ;
				}else{
					tianjipro = "智力+" ;
				}
			}
			if(i == 2){
				if(occtype==1){
					tianjipro = "攻击+" ;
				}else{
					tianjipro = "法伤+" ;
				}
			}
			if(i == 3){
				tianjipro = "体力+" ;
			}
			if(qitype == 1){
				tianjipro += 	tianji1[i-1] ;
			}
			if(qitype == 2){
				tianjipro += 	tianji2[i-1] ;
			}
			if(qitype == 3){
				tianjipro += 	tianji3[i-1] ;
			}
			if(qitype == 4){
				tianjipro += 	tianji4[i-1] ;
			}
			if(qitype == 5){
				tianjipro += 	tianji5[i-1] ;
			}
			if(qitype < realtype ||(qitype==realtype && tjstatus==1)){
				show += "<tr><td><font color=#66FF00>"+tianjipro+"</font></td>" ;
			}else{
				show += "<tr><td><font color=#CCCCCC>"+tianjipro+"</font></td>" ;
			}
			
			if(i == 3){
				show += "<td style=font-weight:700;>天极丹</td>" ;
				show += "<td><a href=# onclick=tianjidanMinus()><img style=border-width:0px 0px 0px 0px src=img/xiuxian/jian.gif /></a></td>" ;
				show += "<td><input id=tianjidan onchange=checkXiuXianNum(1,10,'tianjidan') style=width:40px type=text value=1 /></td>" ;
				show += "<td><a href=# onclick=tianjidanPlus()><img style=border-width:0px 0px 0px 0px src=img/xiuxian/jia.gif /></a></td>" ;
				show += "<td><a href=# onclick=opentianji("+qitype+","+realtype+") ><img style=border-width:0px 0px 0px 0px src=img/xiuxian/opentianji.gif /></a></td></tr>" ;
			}else{
				show += "</tr>" ;
			}
		}
		
		show += "</table>" ;
	
	_openWin("showXiuXianInfo",show);
}

function showQiXing(count,xings,desc,prodesc){
	var winObj=_getWin("showXiuXian") ;
	onOpenWin(winObj) ;
	with(winObj.style){
		width="400";
		height="419";
		overflowY="";
		background = "url(img/qixing/back.gif)";
	}
	var show = "<table width='80%' border='0' cellpadding='0' cellspacing='0' style='margin-top:80px;margin-left:62px'>" ;
			show += "<tr>" ;
				show += "<td width=25%><font color=red>剩"+count+"次</font></td>" ;
				show += "<td width=25% ><div id=showqixingimg1><img src=img/qixing/xing_"+xings[0]+".gif /></div></td>" ;
				show += "<td width=25% ><div id=showqixingimg2><img src=img/qixing/xing_"+xings[1]+".gif /></div></td>" ;
				show += "<td width=25% ><div id=showqixingimg3><img src=img/qixing/xing_"+xings[2]+".gif /></div></td>" ;
				show += "<td width=25%><a href=# onclick=lianzhu("+count+")><img style=border-width:0px 0px 0px 0px src=img/qixing/lianzhu.gif /></a></td>" ;
			show += "</tr>" ;
		show += "</table>"

		show += "<div style=position:relative >" ;
		show += "<div style=position:absolute;margin-top:85px;margin-left:80px;><img title="+desc[0]+" src=img/qixing/xing_0.gif /></div>" ;
		show += "<div style=position:absolute;margin-top:94px;margin-left:125px;><img title="+desc[1]+"  src=img/qixing/xing_1.gif /></div>" ;
		show += "<div style=position:absolute;margin-top:120px;margin-left:162px;><img title="+desc[2]+" src=img/qixing/xing_2.gif /></div>" ;
		show += "<div style=position:absolute;margin-top:85px;margin-left:225px;><img title="+desc[3]+" src=img/qixing/xing_3.gif /></div>" ;
		show += "<div style=position:absolute;margin-top:140px;margin-left:235px;><img title="+desc[4]+" src=img/qixing/xing_4.gif /></div>" ;
		show += "<div style=position:absolute;margin-top:140px;margin-left:280px;><img title="+desc[5]+" src=img/qixing/xing_5.gif /></div>" ;
		show += "<div style=position:absolute;margin-top:88px;margin-left:305px;><img title="+desc[6]+" src=img/qixing/xing_6.gif /></div>" ;
		show += "</div>" ;
		
		show +="<div>"
			show += "<div style=position:absolute;margin-top:217px;margin-left:25px;>"+prodesc+"</div>" ;
		show +="</div>" ;
		
	_openWin("showXiuXian",show);
}


function lianzhu(count){
	if(parseInt(count) < 1){
		alert("没有连珠次数了！") ;
		return false ;
	}
	if(confirm("是否确认消耗2猫豆连珠？\n(前5次免费)")){
		setTimeout("p.cmd('qixingcmd lianzhu') ;",1000);
		qixingimg('showqixingimg1') ;
		qixingimg('showqixingimg2') ;
		qixingimg('showqixingimg3') ;
	}
}

function qixingimg(id){
	document.getElementById(id).innerHTML="<img src=img/qixing/"+id+".gif />";
}

/**
 * 召唤兽界面
 */
function showZhaoHuanShouRongHe(zhuItemId,zhuImg,fuImg,fuIndex,upImg){
	var winObj=_getWin("showZhaoHuanShouRongHe") ;
	onOpenWin(winObj) ;
	with(winObj.style){
		width="480";
		height="360";
		overflowY="";
		background = "url(img/zhaohuanshou/rongheback.gif)";
	}
	var show = "<div style=position:relative >" ;
			show += "<div style=position:absolute;margin-top:18px;margin-left:12px;><img title=主召唤兽 src=img/zhaohuanshou/"+zhuImg+" /></div>" ;
			show += "<div style=position:absolute;margin-top:18px;margin-left:294px;>" +
					"<a href=# onclick=\"cmd('zhs_cmd "+zhuItemId+" zhs_ronghe fus');return false;\"><img style=border-width:0px 0px 0px 0px " +
					"title=副召唤兽 src=img/zhaohuanshou/"+fuImg+" /></a></div>" ;
		show += "</div>" ;
		if(null != upImg){
			show += "<div style=position:relative >" ;
				show += "<div style=position:absolute;margin-top:170px;margin-left:155px;><img title=新的召唤兽 src=img/zhaohuanshou/"+upImg+" /></div>" ;
				show += "<div style=position:absolute;margin-top:300px;margin-left:355px;>" +
						"<a href=# onclick=\"cmd('zhs_cmd "+zhuItemId+" zhs_ronghe fus "+fuIndex+" hecheng');return false;\">" +
						"<img style=border-width:0px 0px 0px 0px " +
						"title=进化 src=img/zhaohuanshou/hecheng.gif /></a></div>" ;
			show += "</div>" ;
		}
		
	_openWin("showZhaoHuanShouRongHe",show);
}
/**
 * 翻牌
 */
function showFanPai(itemIndex,fanpainame,checkIndex,items){
	var winObj=_getWin("showFanPai") ;
	onOpenWin(winObj) ;
	with(winObj.style){
		width="640";
		height="480";
		overflowY="";
		background = "url(img/fanpai/back.gif)";
	}
	
	var show = "" ;
			//第一行
			if(checkIndex != null
					&& items != null
						&& items.length == 5){
				show += "<div style=position:relative >" ;
					show += "<div style=position:absolute;margin-top:100px;margin-left:10px;>" +
							"<a href=# onclick=\"cmd('use "+itemIndex+" reset');return false;\">" +
							"<img  style=border-width:0px 0px 0px 0px src=img/fanpai/zhengback.gif /></a></div>" ;
					show += "<div style=position:absolute;margin-top:223px;margin-left:52px;><img  src="+items[0][0]+" /></div>" ;
					show += "<div style=position:absolute;margin-top:100px;margin-left:132px;>" +
							"<a href=# onclick=\"cmd('use "+itemIndex+" reset');return false;\">" +
							"<img  style=border-width:0px 0px 0px 0px src=img/fanpai/zhengback.gif /></a></div>" ;
					show += "<div style=position:absolute;margin-top:223px;margin-left:174px;><img src="+items[1][0]+" /></div>" ;
					show += "<div style=position:absolute;margin-top:100px;margin-left:254px;>" +
							"<a href=# onclick=\"cmd('use "+itemIndex+" reset');return false;\">" +
							"<img  style=border-width:0px 0px 0px 0px src=img/fanpai/zhengback.gif /></a></div>" ;
					show += "<div style=position:absolute;margin-top:223px;margin-left:296px;><img src="+items[2][0]+" /></div>" ;
					show += "<div style=position:absolute;margin-top:100px;margin-left:379px;>" +
							"<a href=# onclick=\"cmd('use "+itemIndex+" reset');return false;\">" +
							"<img  style=border-width:0px 0px 0px 0px src=img/fanpai/zhengback.gif /></a></div>" ;
					show += "<div style=position:absolute;margin-top:223px;margin-left:421px;><img src="+items[3][0]+" /></div>" ;
					show += "<div style=position:absolute;margin-top:100px;margin-left:504px;>" +
							"<a href=# onclick=\"cmd('use "+itemIndex+" reset');return false;\">" +
							"<img  style=border-width:0px 0px 0px 0px src=img/fanpai/zhengback.gif /></a></div>" ;
					show += "<div style=position:absolute;margin-top:223px;margin-left:546px;><img src="+items[4][0]+" /></div>" ;
				show += "</div>" ;
				show += "<div style=position:relative >" ;
					show += "<table width='600' border='0' cellpadding='0' cellspacing='0' style='margin-top:380px;'>" ;
						show += "<tr>" ;
							show += "<td width=120 align=center>" ;
							show += items[0][1] ;
							show += "</td>" ;
							show += "<td width=120 align=center>" ;
							show += items[1][1] ;
							show += "</td>" ;
							show += "<td width=120 align=center>" ;
							show += items[2][1] ;
							show += "</td>" ;
							show += "<td width=120 align=center>" ;
							show += items[3][1] ;
							show += "</td>" ;
							show += "<td width=120 align=center>" ;
							show += items[4][1] ;
							show += "</td>" ;
						show += "</tr>" ;
					show += "</table>" ;
				show += "</div>" ;
				show += "<div style=position:relative >" ;
				show += "<table width='100%' border='0' cellpadding='0' cellspacing='0' style='margin-top:20px;'>" ;
					show += "<tr>" ;
						show += "<td align=center>" ;
						show += "<a href=# onclick=\"cmd('use "+itemIndex+" reset');return false;\">" ;
						show += "<img style=border-width:0px 0px 0px 0px src=img/fanpai/reset.gif />" ;
						show += "</a>" ;
 						show += "</td>" ;
						show += "<td align=center>" ;
						show += "<a href=# onclick=\"cmd('use "+itemIndex+" reset');return false;\">" ;
						show += "<img style=border-width:0px 0px 0px 0px src=img/fanpai/reset.gif />" ;
						show += "</a>" ;
						show += "</td>" ;
						show += "<td align=center>" ;
						show += "<a href=# onclick=\"cmd('use "+itemIndex+" reset');return false;\">" ;
						show += "<img style=border-width:0px 0px 0px 0px src=img/fanpai/reset.gif />" ;
						show += "</a>" ;
						show += "</td>" ;
						show += "<td align=center>" ;
						show += "<a href=# onclick=\"cmd('use "+itemIndex+" reset');return false;\">" ;
						show += "<img style=border-width:0px 0px 0px 0px src=img/fanpai/reset.gif />" ;
						show += "</a>" ;
						show += "</td>" ;
						show += "<td align=center>" ;
						show += "<a href=# onclick=\"cmd('use "+itemIndex+" reset');return false;\">" ;
						show += "<img style=border-width:0px 0px 0px 0px src=img/fanpai/reset.gif />" ;
						show += "</a>" ;
						show += "</td>" ;
					show += "</tr>" ;
				show += "</table>" ;
				show += "</div>" ;
			}else{
				show += "<div style=position:relative >" ;
				show += "<div style=position:absolute;margin-top:100px;margin-left:10px; id=fanpaichangeimg1 >" +
						"<a href=# onclick=\"fanPaiChangImg("+itemIndex+",1,'"+fanpainame+"');return false;\">" +
						"<img style=border-width:0px 0px 0px 0px src=img/fanpai/fanback.gif /></a></div>" ;
				show += "<div style=position:absolute;margin-top:100px;margin-left:132px; id=fanpaichangeimg2 >" +
						"<a href=# onclick=\"fanPaiChangImg("+itemIndex+",2,'"+fanpainame+"');return false;\">" +
						"<img style=border-width:0px 0px 0px 0px src=img/fanpai/fanback.gif /></a></div>" ;
				show += "<div style=position:absolute;margin-top:100px;margin-left:254px; id=fanpaichangeimg3 >" +
						"<a href=# onclick=\"fanPaiChangImg("+itemIndex+",3,'"+fanpainame+"');return false;\">" +
						"<img style=border-width:0px 0px 0px 0px src=img/fanpai/fanback.gif /></a></div>" ;
				show += "<div style=position:absolute;margin-top:100px;margin-left:379px; id=fanpaichangeimg4 >" +
						"<a href=# onclick=\"fanPaiChangImg("+itemIndex+",4,'"+fanpainame+"');return false;\">" +
						"<img style=border-width:0px 0px 0px 0px src=img/fanpai/fanback.gif /></a></div>" ;
				show += "<div style=position:absolute;margin-top:100px;margin-left:504px; id=fanpaichangeimg5 >" +
						"<a href=# onclick=\"fanPaiChangImg("+itemIndex+",5,'"+fanpainame+"');return false;\">" +
						"<img style=border-width:0px 0px 0px 0px src=img/fanpai/fanback.gif /></a></div>" ;
				show += "</div>" ;
				show += "<div style=position:relative >" ;
				show += "<table width='100%' border='0' cellpadding='0' cellspacing='0' style='margin-top:400px;'>" ;
					show += "<tr>" ;
						show += "<td align=center>" ;
						show += "<a href=# onclick=\"fanPaiChangImg("+itemIndex+",1,'"+fanpainame+"');return false;\">" +
							"<img style=border-width:0px 0px 0px 0px src=img/fanpai/xuanze.gif /></a>" ;
						show += "</td>" ;
						show += "<td align=center>" ;
						show += "<a href=# onclick=\"fanPaiChangImg("+itemIndex+",2,'"+fanpainame+"');return false;\">" +
							"<img style=border-width:0px 0px 0px 0px src=img/fanpai/xuanze.gif /></a>" ;
						show += "</td>" ;
						show += "<td align=center>" ;
						show += "<a href=# onclick=\"fanPaiChangImg("+itemIndex+",3,'"+fanpainame+"');return false;\">" +
							"<img style=border-width:0px 0px 0px 0px src=img/fanpai/xuanze.gif /></a>" ;
						show += "</td>" ;
						show += "<td align=center>" ;
						show += "<a href=# onclick=\"fanPaiChangImg("+itemIndex+",4,'"+fanpainame+"');return false;\">" +
							"<img style=border-width:0px 0px 0px 0px src=img/fanpai/xuanze.gif /></a>" ;
						show += "</td>" ;
						show += "<td align=center>" ;
						show += "<a href=# onclick=\"fanPaiChangImg("+itemIndex+",5,'"+fanpainame+"');return false;\">" +
							"<img style=border-width:0px 0px 0px 0px src=img/fanpai/xuanze.gif /></a>" ;
						show += "</td>" ;
					show += "</tr>" ;
				show += "</table>" ;
				show += "</div>" ;
			}
			
			
	_openWin("showFanPai",show);
}

function fanPaiChangImg(itemIndex,num,fanpainame){
	if(confirm("将消耗一个"+fanpainame+",是否继续？")){
		setTimeout("p.cmd('use "+itemIndex+" "+num+"');",1000) ;
		document.getElementById("fanpaichangeimg"+num).innerHTML="<img src='img/fanpai/fanpai.gif'  />";
	}
}

/**
 * 抓娃娃机
 */
function zhuaWaWaJi(){
	var winObj=_getWin("zhuaWaWaJi") ;
	onOpenWin(winObj) ;
	with(winObj.style){
		width="646";
		height="485";
		overflowY="";
		background = "url(img/zhuawawa/back.gif)";
	}
	var show = "<div>" ;
			show += "<table width='560' height='375' border='0' cellpadding='0' cellspacing='0' style='margin-top:30px;margin-left:30px'>" ;
				show += "<tr height='300' >" ;
					show += "<td align=center>" ;
						show += "<div id=zhua1 ></div>" ;
					show += "</td>" ;
					show += "<td align=center>" ;
						show += "<div id=zhua2 ></div>" ;
					show += "</td>" ;
					show += "<td align=center>" ;
						show += "<div id=zhua3 ></div>" ;
					show += "</td>" ;
					show += "<td align=center>" ;
						show += "<div id=zhua4 ></div>" ;
					show += "</td>" ;
					show += "<td align=center>" ;
						show += "<div id=zhua5 ></div>" ;
					show += "</td>" ;
				show += "</tr>" ;
				show += "<tr height='80' >" ;
					show += "<td align=center>" ;
						show += "<img src=img/zhuawawa/gift1.gif />" ;
					show += "</td>" ;
					show += "<td align=center>" ;
						show += "<img src=img/zhuawawa/gift2.gif />" ;
					show += "</td>" ;
					show += "<td align=center>" ;
						show += "<img src=img/zhuawawa/gift3.gif />" ;
					show += "</td>" ;
					show += "<td align=center>" ;
						show += "<img src=img/zhuawawa/gift4.gif />" ;
					show += "</td>" ;
					show += "<td align=center>" ;
						show += "<img src=img/zhuawawa/gift5.gif />" ;
					show += "</td>" ;
				show += "</tr>" ;
			show += "</table>" ;
	    show += "</div>" ;
	    show += "<div style=position:absolute;margin-left:315px;>" +
	    		"<a href=# onclick=\"doZhuaWaWa();return false;\">" +
	    		"<img style=border-width:0px 0px 0px 0px src=img/zhuawawa/anniu.gif /></a></div>" ;
	_openWin("zhuaWaWaJi",show);
}

function doZhuaWaWa(){
	if(confirm("将消耗10代币，是否继续？")){
		//随机1~5
		var num = parseInt(Math.random() * 5 + 1) ;
		setTimeout("p.cmd('zhawawa "+num+"');",1500) ;
		document.getElementById("zhua"+num).innerHTML="<img src='img/zhuawawa/zhua.gif'  />";
	}
}


/**
 * 炼丹界面
 * currZhenQiNum：宠物身上当前的真气值
 */
function showLianDan(currZhenQiNum){
	var winObj=_getWin("showXiuXianInfo") ;
	onOpenWin(winObj) ;
	with(winObj.style){
		width="380";
		height="440";
		overflowY="";
		background = "url(img/liandan/back.gif)";
	}
	var show = "<div style=margin-top:60px;margin-left:167px;><a href=# onclick=changeLianDanIMG('qian',"+currZhenQiNum+")><img id=qian style=border-width:0px 0px 0px 0px src=img/liandan/qian.gif /></a></div>" ;
	show += "<div style=position:relative >" ;
	show += "<div style=position:absolute;margin-top:10px;margin-left:90px;><a href=# onclick=changeLianDanIMG('dui',"+currZhenQiNum+")><img id=dui style=border-width:0px 0px 0px 0px src=img/liandan/dui.gif /></a></div>" ;
	show += "<div style=position:absolute;margin-top:10px;margin-left:240px;><a href=# onclick=changeLianDanIMG('xun',"+currZhenQiNum+")><img id=xun style=border-width:0px 0px 0px 0px src=img/liandan/xun.gif /></a></div>" ;
	show += "</div>" ;
	show += "<div style=position:relative >" ;
	show += "<div style=position:absolute;margin-top:72px;margin-left:70px;><a href=# onclick=changeLianDanIMG('li',"+currZhenQiNum+")><img id=li style=border-width:0px 0px 0px 0px src=img/liandan/li.gif /></a></div>" ;
	show += "<div style=position:absolute;margin-top:72px;margin-left:260px;><a href=# onclick=changeLianDanIMG('kan',"+currZhenQiNum+")><img id=kan style=border-width:0px 0px 0px 0px src=img/liandan/kan.gif /></a></div>" ;
	show += "</div>" ;
	show += "<div style=position:relative >" ;
	show += "<div style=position:absolute;margin-top:130px;margin-left:90px;><a href=# onclick=changeLianDanIMG('zheng',"+currZhenQiNum+")><img id=zheng style=border-width:0px 0px 0px 0px src=img/liandan/zheng.gif /></a></div>" ;
	show += "<div style=position:absolute;margin-top:130px;margin-left:240px;><a href=# onclick=changeLianDanIMG('gen',"+currZhenQiNum+")><img id=gen style=border-width:0px 0px 0px 0px src=img/liandan/gen.gif /></a></div>" ;
	show += "</div>" ;
	show += "<div style=position:relative >" ;
	show += "<div style=position:absolute;margin-top:175px;margin-left:8px;><table><tr><td><font style=font-weight:700; color=#FFFFFF>已输入真气值:</font></td><td id=zhenqinum style=color:#FFFFFF; >0</td></tr></table></div>" ;
	show += "<div style=position:absolute;margin-top:175px;margin-left:167px;><a href=# onclick=changeLianDanIMG('kun',"+currZhenQiNum+")><img id=kun style=border-width:0px 0px 0px 0px src=img/liandan/kun.gif /></a></div>" ;
	show += "<div style=position:absolute;margin-top:180px;margin-left:265px;><a href=# onclick=lianDan()><img id=kun style=border-width:0px 0px 0px 0px src=img/liandan/liandan.gif /></a></div>" ;
	show += "</div>" ;
	show += "<div style=position:absolute;margin-top:190px;margin-left:10px;><font style=font-weight:700;color=#FFFFFF>体内真气值: "+currZhenQiNum+"</font></div>" ;
	_openWin("showXiuXianInfo",show);
}

var oldLianDanId = "" ;
function changeLianDanIMG(id,currZhenQiNum){
	var oldIMG = document.getElementById(id) ;
	if(null != oldIMG){
		if(inputLianDanZhenQi(currZhenQiNum)){
			if(oldIMG.src != "img/liandan/zhen.gif"){
				oldLianDanId = id ;
				var allIMG = "qian,dui,xun,li,kan,zheng,gen,kun".split(",") ;
				for(var i = 0 ; i < allIMG.length ; i ++){
					if(id != allIMG[i])
						document.getElementById(allIMG[i]).src = "img/liandan/" + allIMG[i] + ".gif" ;
				}
				oldIMG.src = "img/liandan/zhen.gif" ;
			}
		}
	}
}

function inputLianDanZhenQi(currZhenQiNum){
	var input=prompt('请输入本次炼丹的真气值(1000-10000)',1000);
	if(input!=null){
		if(checkInt(input)){
			if(input<1000){
				alert("冲入的真气值要大于等于1000才行哦");
				inputLianDanZhenQi(currZhenQiNum);
			}else if(input>10000){
				alert("冲入的真气值太多了，你不怕炼丹炉爆掉吗？");
				inputLianDanZhenQi(currZhenQiNum);
			}else{
				if(Number(input) > Number(currZhenQiNum)){
					alert("你没有"+input+"真气值!");
					inputLianDanZhenQi(currZhenQiNum);
				}else{
					document.getElementById("zhenqinum").innerHTML = input ;
					return true;
				}
			}
		}else{
			alert("请输入正确的数字!");
			inputLianDanZhenQi(currZhenQiNum);
		}
	}
	return false ;
}

function lianDan(){
	var zhenqinum = document.getElementById("zhenqinum") ;
	if(null != zhenqinum){
		if(oldLianDanId == ""){
			alert("丹药凝结需要真气，先点击任一八卦方位，冲入真气吧") ;
			return ;
		}
		if(Number(zhenqinum.innerHTML) < Number(1000) || Number(zhenqinum.innerHTML) > Number(10000)){
			alert("请输入1000-10000之间的真气值！") ;
			return ;
		}else{
			cmd("liandan doliandan " + zhenqinum.innerHTML + " " + getBaGuaName()) ;
		}
	}
}

function getBaGuaName(){
	var baGua = oldLianDanId ;
	if(baGua == "qian")
		return "乾" ;
	if(baGua == "dui")
		return "兑" ;
	if(baGua == "xun")
		return "巽" ;
	if(baGua == "kan")
		return "坎" ;
	if(baGua == "zheng")
		return "震" ;
	if(baGua == "gen")
		return "艮" ;
	if(baGua == "kun")
		return "坤" ;
	if(baGua == "qian")
		return "乾" ;
	return "艮" ;
}

function xiuXianDanPlus(){
	var xiuxiandan = document.getElementById("xiuxiandan") ;
	var num = 0 ;
	if(null != xiuxiandan){
		num = xiuxiandan.value ;
	}
	if(Number(num) >= 99){
		xiuxiandan.value = 99 ;
	}else{
		xiuxiandan.value = Number(num) + Number(1) ;
	}
}

function xiuXianDanMinus(){
	var xiuxiandan = document.getElementById("xiuxiandan") ;
	var num = 0 ;
	if(null != xiuxiandan){
		num = xiuxiandan.value ;
	}
	if(Number(num) > 1){
		xiuxiandan.value = Number(num) - Number(1) ;
	}else{
		xiuxiandan.value = 1 ;
	}
}

function tianjidanPlus(){
	var tianjidan = document.getElementById("tianjidan") ;
	var num = 0 ;
	if(null != tianjidan){
		num = tianjidan.value ;
	}
	if(Number(num) >= 99){
		tianjidan.value = 99 ;
	}else{
		tianjidan.value = Number(num) + Number(1) ;
	}
}

function tianjidanMinus(){
	var tianjidan = document.getElementById("tianjidan") ;
	var num = 0 ;
	if(null != tianjidan){
		num = tianjidan.value ;
	}
	if(Number(num) > 1){
		tianjidan.value = Number(num) - Number(1) ;
	}else{
		tianjidan.value = 1 ;
	}
}

function checkXiuXianNum(min,max,str){
	var obj = document.getElementById(str) ;
	var num = 0 ;
	if(null != obj){
		num = obj.value ;
	}
	if(!checkInt(num) || Number(num) < Number(min) || Number(num) > Number(max)){
		alert("请输入"+min+"-"+max+"数字！")
		obj.value = 1 ;
		return ;
	}
}

function addxiuxianzhi(qitype,realtype,curexp,smalltype){
	var xiuxiandan = document.getElementById("xiuxiandan") ;
	if(null == xiuxiandan){
		alert("请先输入修仙丹的数量！") ;
		return ;
	}
	if(qitype < realtype){
		alert("该阶段已修炼过了~") ;
		return  ;
	}else if(qitype == realtype){
		//化神期
		if(Number(curexp) < 1800 && realtype == 5 && smalltype == 10 && (Number(curexp) + Number(xiuxiandan.value * 10) - 1800) >= 10){
			if(confirm("你提升的修仙值已经超过了需要的最大修仙值，\n\n超过的部分不保留哦，你确定要这么做吗？")){
				cmd("xiuxiancmd addxiuxiannum " + qitype + " " + xiuxiandan.value) ;
			}
		}else{
			cmd("xiuxiancmd addxiuxiannum " + qitype + " " + xiuxiandan.value) ;
		}
	}else{
		alert("还是先将前面的修炼好吧") ;
		return  ;
	}
}

function opentianji(qitype,realtype){
	var tianjidan = document.getElementById("tianjidan") ;
	if(null == tianjidan){
		alert("请先输入天极丹的数量！") ;
		return ;
	}
	if(qitype < realtype){
		alert("该天极已开辟了~") ;
		return  ;
	}else if(qitype == realtype){
		cmd("xiuxiancmd opentianji " + qitype + " " + tianjidan.value) ;
	}else{
		alert("还是先将前面的修炼好吧") ;
		return  ;
	}
}

/**渡劫界面
 * currJieShu:当前是在第几劫
 * currJingJieDian:当前有的境界点数
 */
function showDuJie(currJieShu,currJingJieDian){
	var winObj=_getWin("showDuJie") ;
	onOpenWin(winObj) ;
	with(winObj.style){
		width="320";
		height="200";
		overflowY="";
	}
	
	var show = "<font color=#6600FF ><b>渡劫</b></font></br>" ;
		show += "<img src=img/itemlogo/duqian.gif /></br>" ;
		show += "<table width='100%' bgcolor='#E1E1E1' border='1' cellpadding='0' " +
			"cellspacing='0' style='margin-top:3px;'>" ;
			 for(var i = 0 ; i < 10 ; i++){
				show += "<tr>" ;
					show += "<td align=center height=24>" ;
						show += "第" + (i+1) + "劫" ;
					show += "</td>" ; 
					show += "<td align=center height=24>" ;
						show += getJieNanName(i,currJieShu) ;
					show += "</td>" ; 
					show += "<td align=center height=24>" ;
						show += getDuJieTag(i,currJieShu,currJingJieDian) ;
					show += "</td>" ; 
 				show += "</tr>" ;
			 }
		show += "</table>" ;
		show += "<font color=blue>当前境界点数：" + currJingJieDian + "</font>" ;
	
	_openWin("showDuJie",show);
}

var duJieName = new Array("满月抛江","双叉岭上","四圣显化","被魔化身","路逢大水","棘林吟咏","诸天神遭","七情迷没","路阻狮驼","救世热忱") ;
/*
 * 获得劫难名称
 */
function getJieNanName(jieNanNum,currJieShu){
	if(jieNanNum == 0)
		return "<font color=blue>" +duJieName[0]+"</font>" ;
	else if(jieNanNum <= currJieShu)
		return "<font color=blue>" +duJieName[jieNanNum]+"</font>" ;
	else 
		return "&nbsp;" ;
}

/*
 * 获得渡劫的tag
 */
function getDuJieTag(jieNanNum,currJieShu,currJingJieDian){
	if(jieNanNum  == currJieShu){
		return "<a href=# onclick=doDuJie("+currJingJieDian+","+jieNanNum+")>【渡劫】</a>" ;
	}
	else if(jieNanNum < currJieShu){
		return "<img src=img/itemlogo/du.gif />" ;
	}
	else{
		return "&nbsp;" ;
	}
}

var jingJieDians = new Array(100,200,400,800,1600,3200,6400,12800,25600,51200) ;
function doDuJie(currJingJieDian,jieNanNum){
	//是否足够
	if(currJingJieDian < jingJieDians[jieNanNum]){
		alert("你的境界点数不足"+jingJieDians[jieNanNum]+",无法渡劫！") ;
		return ;
	}
	
	if(confirm("是否消耗"+jingJieDians[jieNanNum]+"境界点进行渡劫？")){
		cmd("dj do") ;
	}
}

/*
 * text:默认的说明文字
 * defaultText:默认的数量
 * min:最小值
 * max:最大值
 * type:1为正常模式，2为默认
 */
function reprompt(text,defaultText,min,max,cmd1,args,type){
	if(type == 1){
		var input=prompt(text,defaultText); 
		if(null != input){
			if(checkInt(input)){
				if(Number(input) < Number(min)){
					alert("输入的最小值为" + min) ;
					reprompt(text,defaultText,min,max,cmd1,args,type) ;
				}else if(Number(input) > Number(max)){
					alert("输入的最大值为" + max) ;
					reprompt(text,defaultText,min,max,cmd1,args,type) ;
				}else{
					cmd(cmd1 + " " + args + " " + input) ;
				}
			}else{
				alert("请入正确的数字！") ;
				reprompt(text,defaultText,min,max,cmd1,args,type) ;
			}
		}	
	}else{
		cmd(cmd1 + " " + args + " 1") ;
	}
}	

function showliandanpro(pros){
	var winObj=_getWin("showliandanpro");
		onOpenWin(winObj);
		with(winObj.style){
			width="150";
			height="10";
			if(p.eventY<0){
				top=1;
			}else{
				top=p.eventY;
			}
			if(p.eventX-210<0){
				left=1;
			}else{
				left=p.eventX-210;
			}
			overflowY="";
			display='';
		}
	var o="<font color='black'><b>【炼丹属性】</b></font>";
		o+="<br><table width='100%' bgcolor='#E1E1E1' border='1' cellpadding='0' cellspacing='0' style='margin-top:3px;margin-right:5px;margin-bottom:5px;'>";
		o+="<tr><td  style='padding-top:10px;padding-left:10px;padding-right:10px;padding-bottom:5px;'>"+pros+"</td></tr></table>";
	_openWin("showliandanpro",o);
}
function showLiLian(left,marginTop,imgpath,lilianDian,shaiZiNum){
		var winObj=_getWin("showlilian") ;
		onOpenWin(winObj) ;
		with(winObj.style){
			width="600";
			height="420";
			overflowY="";
		}
		
		var show = "历练";
		show += "<div style=background:url(img/itemlogo/lilian.gif);width:580px;height:400px>";
		if(left != 0 && marginTop != 0 ){
			show += "<div style=position:absolute;margin-top:"
							+ marginTop + "px;margin-left:" + left
							+ "px;>"
			show += "<img src="+imgpath+"  style=border-width:0px 0px 0px 0px />";
//			show += "<div style=position:absolute;margin-top:39px;margin-left:40px;>"				
//			show += "<img src=img/pet/map/nianshou.gif  style=border-width:0px 0px 0px 0px />";
			show += "</div>";
		}
		show += "</div>";
//		show += "<div>";
//		show +="<div style=position:absolute;margin-top:0px;margin-left:0px;><font color=blue>历练点数："+lilianDian+"</font><br>";
//		show +="<font color=blue>剩余次数："+shaiZiNum+"</font></div>";
//		show +="<div style=position:absolute;margin-top:0px;margin-left:300px;>";
//		show +="<button onclick=ranShaiZi('"+shaiZiNum+"') type=button style='height:34px;'>骰子</button>";
//		show +="</div>";
//		show += "</div>";
		show += "<table cellpadding='15' cellspacing='0'>";
			show +="<tr>"
					show += "<td align=left height=34>" ;
						show +="<font color=blue>历练点数："+lilianDian+"</font><br>";
						show +="<font color=blue>剩余次数："+shaiZiNum+"</font>";
					show += "</td>" ; 
					show += "<td align=center height=34>" ;
						show +="&nbsp;";
					show += "</td>" ; 
					show += "<td align=center height=34>" ;
						show +="&nbsp;";
					show += "</td>" ; 
					show += "<td align=center height=34>" ;
						show +="&nbsp;";
					show += "</td>" ; 
					show += "<td align=center height=34>" ;
						show +="&nbsp;";
					show += "</td>" ; 
//		show +="<font color=blue>历练点数：</font><br>";
//		show +="<font color=blue>剩余次数：</font>";
					show += "<td align=center height=34>" ;
						show +="<button onclick=ranShaiZi('"+shaiZiNum+"') type=button style='height:34px;'>行动</button>";
					show += "</td>" ;
					show += "<td align=center height=34>" ;
						show +="&nbsp;";
					show += "</td>" ; 
					show += "<td align=center height=34>" ;
						show +="&nbsp;";
					show += "</td>" ; 
					show += "<td align=center height=34>" ;
						show +="&nbsp;";
					show += "</td>" ; 
					show += "<td align=center height=34>" ;
						show +="&nbsp;";
					show += "</td>" ; 
					show += "<td align=center height=34>" ;
						show +="<button onclick=beforeShowAdd() type=button style='height:34px;'>增加属性</button>";
					show += "</td>" ;  
		show +="</tr></table>";
//		show +="<button type=button style='left:90px;height:34px;'>骰子</button>";
		_openWin("showlilian",show);
}
function ranShaiZi(shaiziNum){
	if(shaiziNum == 0){
		alert("你的移动次数已经没有了！");
		return ;
	}
	cmd("lilian go") ;
}
function beforeShowAdd(){
	cmd("lilian lilianAddShow");
}
function showLLAdd(li,ti,zhi,min,jing,lilianNum,canAddNum){
		var winObj=_getWin("showLLAdd") ;
		onOpenWin(winObj) ;
		with(winObj.style){
			width="150";
			height="200";
			overflowY="";
		}
		var a = 100;
		var show = "<div><font color=blue>增加属性</font></div>";
				show += "<table cellpadding='0' cellspacing='0'>";
					show +="<tr>"
					show += "<td align=left height=1 weight=10>" ;
						show +="<font color=green>历练点数:</font></br>";
						show +="<font color=green>剩余点数:</font>";
					show += "</td>" ; 
		show +="<td>";
		show +="<font id=lilianNum color=green>"+lilianNum+"</font></br>";
		show +="<font id=canAddNum color=green>"+canAddNum+"</font>";
		show +="<tr>";
		show +="<td align =left heifht=2 >";
		show +="<font color=green>力量+</fotn><font id='lilian_1' color=green>"+li+"</font>";
		show +="</td>";
		show +="<td align =left heifht=1 weight=1>";
		show +="<button onclick=add('lilian_1',"+li+","+lilianNum+","+canAddNum+"); type=button >&nbsp;+&nbsp;</button>"
		show +="<button onclick=min('lilian_1',"+li+","+lilianNum+","+canAddNum+"); type=button >&nbsp;-&nbsp;</button>";
		show +="</td>";
		show +="</tr>";
		show +="<tr>";
		show +="<td align =left heifht=2>";
		show +="<font color=green>体力+</fotn><font id='lilian_2' color=green>"+ti+"</font>";
		show +="</td>";
		show +="<td align =left heifht=1 weight=1>";
		show +="<button onclick=add('lilian_2',"+ti+","+lilianNum+","+canAddNum+"); type=button >&nbsp;+&nbsp;</button>"
		show +="<button onclick=min('lilian_2',"+ti+","+lilianNum+","+canAddNum+"); type=button >&nbsp;-&nbsp;</button>";
		show +="</td>";
		show +="</tr>";
		show +="<tr>";
		show +="<td align =left heifht=2>";
		show +="<font color=green>智力+</fotn><font id='lilian_3' color=green>"+zhi+"</font>";
		show +="</td>";
		show +="<td align =left heifht=1 weight=1>";
		show +="<button onclick=add('lilian_3',"+zhi+","+lilianNum+","+canAddNum+"); type=button >&nbsp;+&nbsp;</button>"
		show +="<button onclick=min('lilian_3',"+zhi+","+lilianNum+","+canAddNum+"); type=button >&nbsp;-&nbsp;</button>";
		show +="</td>";
		show +="</tr>";
		show +="<tr>";
		show +="<td align =left heifht=2>";
		show +="<font color=green>敏捷+</fotn><font id='lilian_4' color=green>"+min+"</font>";
		show +="</td>";
		show +="<td align =left heifht=1 weight=1>";
		show +="<button onclick=add('lilian_4',"+min+","+lilianNum+","+canAddNum+"); type=button >&nbsp;+&nbsp;</button>"
		show +="<button onclick=min('lilian_4',"+min+","+lilianNum+","+canAddNum+"); type=button >&nbsp;-&nbsp;</button>";
		show +="</td>";
		show +="</tr>";
		show +="<tr>";
		show +="<td align =left heifht=2>";
		show +="<font color=green>精神+</fotn><font id='lilian_5' color=green>"+jing+"</font>";
		show +="</td>";
		show +="<td align =left heifht=1 weight=1>";
		show +="<button onclick=add('lilian_5',"+jing+","+lilianNum+","+canAddNum+"); type=button >&nbsp;+&nbsp;</button>"
		show +="<button onclick=min('lilian_5',"+jing+","+lilianNum+","+canAddNum+"); type=button >&nbsp;-&nbsp;</button>";
		show +="</td>";
		show +="</tr>";
		show +="</table>";
		show +="<div align=center><button onclick=saveLL() type=button >保存属性</button></div>"
		_openWin("showLLAdd",show);
}
function saveLL(){
	var saveStr = "";
		saveStr += document.getElementById("lilian_1").innerHTML.toString();
	for(var index=2; index<6; index++) {
		saveStr += "," + document.getElementById("lilian_"+index).innerHTML.toString();
	}
	cmd("lilian liliansave"+" "+saveStr);
}
function add(id,num,lilianNum,canAddNum){
	var s = document.getElementById(id);
	var number = new Number(s.innerHTML.toString()) + 1;
	if(number > 500){
		alert("单项属性最高加成为500！");
		return;
	}
	var canAdd = document.getElementById("canAddNum");
	var afterCanAdd = new Number(canAdd.innerHTML.toString()) - 1;
	if(afterCanAdd < 0){
		return;
	}
	var lilian = document.getElementById("lilianNum");
	var afterLilian = new Number(lilian.innerHTML.toString()) - 1000;
	if(number > num){
		s.style.color = "blue";
	}else{
		s.style.color = "green";
	}
	s.innerHTML = number;
	lilian.innerHTML = afterLilian;
	canAdd.innerHTML = afterCanAdd;
}
function min(id,num,lilianNum,canAddNum){
	var s = document.getElementById(id);
	var number = new Number(s.innerHTML.toString()) - 1;
	if(number > num){
		s.style.color = "blue";
	}else if(number == num){
		s.style.color = "green";
	}else{
		s.style.color = "green";
		return;
	}
	var canAdd = document.getElementById("canAddNum");
	var afterCanAdd = new Number(canAdd.innerHTML.toString()) + 1;
//	if(afterCanAdd < 0){
//		return;
//	}
	var lilian = document.getElementById("lilianNum");
	var afterLilian = new Number(lilian.innerHTML.toString()) + 1000;
	s.innerHTML = number;
	lilian.innerHTML = afterLilian;
	canAdd.innerHTML = afterCanAdd;
}
function showExchangeListForJifen(listArr,listBrr,helpcmd,excmd,title,exbut){
	var winObj=_getWin("showExchangeListForJifen");
	onOpenWin(winObj);
	with(winObj.style){
			width="280";
			height="200";
			overflowY="";
		}
	var o="";
	var b="";
	o+=fakeBr(4)
	o+="<font color=red>"+title+"</font>";
	o+="<br>";
	o+="<table border=0 width='250' style='margin-top:3px;margin-bottom:6px;'>";
	var add="";
	for(var i=0;i<listArr.length;i++){
//		if(listBrr[i][5]>0){
//			b = "<td>"+listBrr[i][5]+"<img border=0 title=\""
//			+listBrr[i][5]+"金\" src=img/itemlogo/jinb.gif></td>";
//		}else{
			b = "<td></td>";	
//		}
		o+="<tr><td width=><img src="+listArr[i][3]
			+"></td><td><a href=# onclick=\"p.cmd('"+helpcmd+" "
			+listArr[i][2]+"');return false;\">"+listArr[i][0]
			+"</a></td>"+b+"<td><a href=# >积分</a></td><td>x"+listArr[i][1]
			+"</td><td><a href=# border=0 onclick=\"p.doExchangeBaYue('"+listArr[i][4]
			+"','"+listArr[i][2]+"',"+listArr[i][5]+",'"+excmd
			+"');return false;\"><font color=blue>【"+exbut+"】</font></a></td></tr>";	
	}
	o+="</table>";
	_openWin("showExchangeListForJifen",o);
}
function doExchangeBaYue(item,path,canAmount,doexcmd){
	if(!canAmount){
		if(confirm('确认要购买 ['+item+'] ?')){
			cmd(doexcmd+" "+path+" 1");
		}
	}else{
		var input=prompt('请输入要购买 ['+item+'] 的数量',1);
		if(input!=null){
			if(checkInt(input)){
				if(input<1){
					alert("购买数量不能小于1个!");
					doExchangeBaYue(item,path,canAmount,doexcmd);
				}else if(input > 99){
					alert("购买数量不能大于99个");
					doExchangeBaYue(item,path,canAmount,doexcmd);
				}else{
					cmd(doexcmd+" "+path+" "+input);
				}
			}else{
				alert("请输入正确的数字!");
				doExchangeBaYue(item,path,canAmount,doexcmd);
			}
		}
	}
}
	


