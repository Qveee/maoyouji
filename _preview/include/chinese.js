//加密
if("Microsoft Internet Explorer"==navigator.appName){
document.domain='pet.imop.com';
}
function CodeCookie(str){
	var strRtn="";
	for (var i=str.length-1;i>=0;i--){
		strRtn+=str.charCodeAt(i);
		if (i) strRtn+="O"; //用a作分隔符
	}
	return strRtn;
}

//解码
//解码程序：
function DecodeCookie(str){
	var strArr;
	var strRtn="";
	
	strArr=str.split("O");
	for (var i=strArr.length-1;i>=0;i--) 
		strRtn+=String.fromCharCode(eval(strArr[i]));

	return strRtn;
}
//设置cookie中文
function SetCookie(name,value){
	var exp=new Date();
	document.cookie=name+"="+escape(CodeCookie(value))+" ; maxage=-1 ; path=/ ; domain=pet.imop.com";
}

var status2 = "";
//取得用户信息
function CheckCookie(){

    var allcookie = document.cookie.split('; ');
	//var isautologin = false;
    var islogon = false;
    for(var i=0;i<allcookie.length;i++){
        var cookiename = allcookie[i].split('=')[0];
        if(cookiename=='mopet_logon'){
            islogon = true;
        }
        if(cookiename == 'mopet_status'){
          var tmpString = unescape(allcookie[i].split('=')[1]);
          status2 = DecodeCookie(tmpString);
        }
    }

    if(islogon == true){
        return true;
    }else{
        return false;
    }

}
//取得用户信息
function GetInfo(){
  if(CheckCookie()){
    return status2.replace('?','O').replace('?','O').replace('?','O');
  }
  return status2;
}
//判断是否登录
function IsLogon(){
    var allcookie = document.cookie.split('; ');
    for(var i=0;i<allcookie.length;i++){
        var cookiename = allcookie[i].split('=')[0];
        if(cookiename=='mopet_logon'){
            return true;
        }
    }
    return false;
}
//判断是否有自动登录的cookie
function IsAutoLogin(){
    var allcookie = document.cookie.split('; ');
    for(var i=0;i<allcookie.length;i++){
        var cookiename = allcookie[i].split('=')[0];
        if(cookiename=='mopet_auto_login'){
            return true;
        }
    }
    return false;
}

var loginFailed;
if(!IsLogon() && IsAutoLogin()){
	try{
	window.location='http://passport.mop.com/AutoLogin?url='+nowURL;
	}catch(x){}
	loginFailed=false;
}else{
	loginFailed=true;
}