
function setInviteCookie(name,value)
{
	var exp  = new Date();
    exp.setTime(exp.getTime() + 24*60*60*1000);
    document.cookie = name + "="+ escape (value) + ";path=/;domain=mop.com";
}
function getQueryValue(sorStr,panStr) 
{ 
	var vStr=""; 
	if (sorStr==null || sorStr=="" || panStr==null || panStr==""){
		return vStr; 
	}
	//sorStr = sorStr.toLowerCase();
	panStr += "="; 
	var itmp=sorStr.indexOf(panStr); 
	if (itmp<0){
		return vStr;
	} 
	sorStr = sorStr.substr(itmp + panStr.length); 
	itmp=sorStr.indexOf("&"); 
	if (itmp<0){
		return sorStr; 
	}else{
		sorStr=sorStr.substr(0,itmp); 
		return sorStr;
	} 
}

var inviteId=parseInt(getQueryValue(location.href,"u"));
if(inviteId>0){
	setInviteCookie("inviteUser",inviteId);
}

var winurl = unescape(window.location.href);
var tempUserName=getQueryValue(winurl,"un");
if (tempUserName!=null && tempUserName!=""){
	setInviteCookie("registe_name",tempUserName);
}