function getXMLHTTP(){
    var ajax=false; 
    try { 
    	ajax = new ActiveXObject("Msxml2.XMLHTTP"); 
    } catch (e) { 
   	 	try { 
    		ajax = new ActiveXObject("Microsoft.XMLHTTP"); 
    	} catch (e) { 
    		ajax = false; 
    	} 
    }
    if (!ajax && typeof XMLHttpRequest!='undefined') { 
    	ajax = new XMLHttpRequest(); 
    } 
    return ajax;
}



function requestPage(ajaxObj, serverPage){
	try{
		var timeStr=Math.random( );//(new Date()).getUTCMilliseconds();
		//alert(timeStr);
		ajaxObj.open("GET", serverPage+"&"+timeStr, true); 
	}catch(x){
		alert(x+":"+serverPage);		
		return;
	}
	ajaxObj.onreadystatechange = function() {
		//alert( ajaxObj.readyState+"  "+ajaxObj.status);
        if (ajaxObj.readyState == 4 && ajaxObj.status == 200) { 
        	setBody(ajaxObj.responseXML);
        }
    } 
	ajaxObj.send(null); 
}
