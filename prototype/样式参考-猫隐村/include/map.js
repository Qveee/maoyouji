var _allPos=null;
function getAllPos(){
	if(_allPos==null){
		_allPos=document.getElementsByTagName("span");
	}
	return _allPos;
}

var p=parent;

var curObj=null;		//当前所处的场景
var oObj=null;			//前一个场景，当处理完毕后，当前场景就变为前一个场景了。
var oBg=null;
var oName=null;

function go(obj,r){
	if(r!=p.room){
		p.cmd('gto '+r);
		curObj=obj;
	}
}
var jian="<img src=/img/th.gif width=26 height=13>";
if (p.baoziImg!=""){
	jian="<img src="+p.baoziImg+" onclick=\"p.showPetHelp(event);\" style='cursor:hand' border=0>";	
}

var baoziDiv=document.createElement('<div id="baozi_show"  style="position:absolute;display:none;background:transparent"></div>');
baoziDiv.innerHTML=jian;

var baoziBgDiv=document.createElement('<div id="baozi_bg"  style="position:absolute;display:none;background:#FFFFE1"></div>');

//若为恶搞状态 显示恶搞图片
changeEGaoPic();

function move(r,isF){
	if(oObj!=null){
		
		with(oObj.style){
			if(backgroundColor!="brown"){
			//if(backgroundColor!="#A52A2A"&&backgroundColor!="#a52a2a"){
				backgroundColor="#FFFFE1";	
			}
//			backgroundColor="#FFFFE1";
			color="#000000";
			fontSize="9pt";
			paddingTop="1px";
			paddingBottom="0px";
			paddingLeft="2px";
			paddingRight="2px";
			border="1px solid #000000";
			filter="alpha(opacity=100)";
			cursor="hand";
		}
		

		var oldStr=oObj.innerHTML;
		//oObj.innerHTML=oObj.title;
	}
	var tds=getAllPos();
	if (curObj==null || curObj.title!=r){
		for(var i=0;i<tds.length;i++){
			if(tds[i].title==r){
				curObj=tds[i];
				break;
			}
		}
	}
	if (curObj!=null){
		if ( p.openDISPLAYButton==1){
			try{
					 curObj.style.filter="alpha(opacity=40)";
						baoziDiv.style.zIndex=5;
						baoziDiv.style.position="absolute";
						baoziDiv.style.display="";
						//baoziDiv.style.left=curObj.style.left;
						//baoziDiv.style.top=curObj.style.top;
						baoziDiv.style.left=curObj.offsetLeft-20;
						baoziDiv.style.top=curObj.offsetTop-20;
						baoziDiv.style.filter="alpha(opacity=100)";
						baoziBgDiv.style.zIndex=4;
						//baoziBgDiv.style.display="";
						baoziBgDiv.style.left=curObj.style.left;
						baoziBgDiv.style.top=curObj.style.top;
						baoziBgDiv.style.width=baoziDiv.offsetWidth+10;
						baoziBgDiv.style.height=baoziDiv.offsetHeight+10;			
						baoziBgDiv.style.filter="alpha(opacity=40)";
			}catch (ex){alert(ex);}
		}
		else{
				with(curObj.style){
					
					if(backgroundColor!="brown"){
					//if(backgroundColor!="#A52A2A"&&backgroundColor!="#a52a2a"){
						backgroundColor="#338EE1";
					}
					
					color="#FFFFFF";
					cursor="default";
					fontSize="10.5pt";
					paddingTop="3px";
					paddingBottom="1px";
					paddingLeft="3px";
					paddingRight="2px";	
				}
				if (baoziDiv.style.display==""){
					baoziDiv.style.display="none";
				}
		}
		try{
					if(isF||p.getAutoCenter()){
						document.body.scrollLeft=p.delPx(curObj.style.left)-200;
						document.body.scrollTop=p.delPx(curObj.style.top)-200;
					}
		}catch(x){}
		try{br(r);}catch(x){}
		oObj=curObj;
		curObj=null;
	}
	showXinShouTip();
}

function mapInit(){
	move(p.getRoom());
}

function initMap(){
	try{
		document.body.appendChild(baoziDiv);
		document.body.appendChild(baoziBgDiv);
		//alert(document.getElementById("baozi_show"));
		move(p.room,true);
		//move("荒草地",true);
	}catch(x){alert(x);}
}
document.onkeydown=p._keyPress;

function changeBG(s){
	if(!document.body.background||document.body.background==""){
		try{
			document.body.background=p.cacheWin.getImg(s).src;
		}catch(x){}
		if(!document.body.background||document.body.background==""){
			setTimeout("changeBG('"+s+"');",10000);
		}
	}
}

// 使用[小扑整形锤]道具，改变用户在地图中的显示 Edit by Coolin
function changeLogo (logo)
{
	p.baoziImg = "/"+logo;
	jian="<img id=logoPic src=/img/th.gif width=26 height=13>";
	if (logo!="")
	{
		jian="<img id=logoPic src=/"+logo+" onclick=\"p.showPetHelp(event);\" style='cursor:hand' border=0>";	
	}
	baoziDiv.innerHTML=jian;
}
function showLuBiaoDiv(event,dscpid)
{
  var el;

  el = document.getElementById(dscpid);
  
  
  el.style.left = -18 + "px";
  el.style.top  = 20 + "px";
  el.style.display = "";
}

function hideLuBiaoDiv(event,dscpid)
{
  var e1
 el = document.getElementById(dscpid);
  el.style.left = "0px";
  el.style.top  = "0px";
  el.style.display = "none";
}

function changeBoZiPic(img){
	jian="<img src="+img+" onclick=\"p.showPetHelp(event);\" style='cursor:hand' border=0>";	
}
//变为恶搞状态
function changeEGao(egaopic,showtype){
	p.eGaoPic=egaopic;
	p.eGaoPicType=showtype;
	changeEGaoPic();
}
//小扑科技恶搞状态图片地图显示
function changeEGaoPic(){	
	if(p.eGaoPic!="null"){
		if(p.eGaoPicType==p.EGAOPICTYPE_ALL){//图片整张替换
			changeBoZiPic("/"+p.eGaoPic);
			baoziDiv.innerHTML=jian;
		}else if(p.eGaoPicType==p.EGAOPICTYPE_NOTALL){//图片部分替换
			jian="<img src=/img/th.gif width=26 height=13>";
			if (p.baoziImg!=""){
				changeBoZiPic(p.baoziImg);
			}
			baoziDiv.innerHTML="<table border=0><tr><td align=center><img src=/"+p.eGaoPic+" ></td></tr><tr><td align=center>"+jian+"</td></tr></table>";
		}
	}
}
//恶搞状态消失 还原显示
function resetEGao(){
	p.eGaoPic="null";
	p.eGaoPicType=-1;
	jian="<img src=/img/th.gif width=26 height=13>";
	if (p.baoziImg!=""){
		changeBoZiPic(p.baoziImg);
	}
	baoziDiv.innerHTML=jian;
}

//新手地图箭头提示-显示
function showXinShouTip(){	
	//alert(document.all(p.xinshoutask)+"[map.js]taskpath="+p.xinshoutask);
	if(p.xinshoutask != null && p.xinshoutask != "null"){
		if(document.all(p.xinshoutask)!=null){
			document.all(p.xinshoutask).style.display = '';
		}
	}
	
}


//新手地图箭头提示-不显示
function closeXinShouTip(xinshoutask){	
	//alert(document.all(xinshoutask)+"[close]taskpath="+xinshoutask);
	if(document.all(xinshoutask)!=null){
		document.all(xinshoutask).style.display = 'none';
	}
}
