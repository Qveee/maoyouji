function getQueryValue(sorStr,panStr) 
{ 
	var vStr=""; 
	if (sorStr==null || sorStr=="" || panStr==null || panStr==""){
		return vStr; 
	}
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
function getParameter(panStr,def){
	try{
		var k=getQueryValue(location.href,panStr);
		if(k==null||k==""){
			return def;
		}
		return k;
	}catch(e){
		return null;
	}
}

function getSessionId(def){
	var str=location.href;
	//alert(str);
	if (str==null || str=="" ){
		return def;
	}
	var markIndex=str.indexOf("?");
	if (markIndex>0){
		str=str.substring(0,markIndex);
	}
	//alert(str);
	var splitIndex=str.indexOf(";jsessionid=");
	if (splitIndex>0 && str.length>11){
		//alert(splitIndex);
		return str.substring(splitIndex+12, str.length);
	}
	return def;
}