function _map_struct(key, value){
	this.key = key;
	this.value = value;
}
function _map_setAt(key, value){
	this.map[this.map.length] = new _map_struct(key, value);
}
function _map_lookUp(key){
	var arr = new Array();
	var j = 0;
	for (var i = 0; i < this.map.length; i++){
		if ( this.map[i].key === key ){
			arr[j++] = this.map[i].value;
		}
	}
	return arr;
}
function _map_clear(){
	this.map	= new Array();
}
function _map_removeKey(key){
	var v;
	for (var i = 0; i < this.map.length; i++)
	{
		v = this.map.pop();
		if ( v.key === key ){
			continue;
		}
		this.map.unshift(v);
	}
}
function _map_getCount(){
	return this.map.length;
}
function _map_isEmpty(){
	return this.map.length <= 0;
}
function JsMap(){
	this.map	= new Array();
	this.get	= _map_lookUp;
	this.put	= _map_setAt;
	this.clear	= _map_clear;
	this.remove	= _map_removeKey;
	this.size	= _map_getCount;
	this.isEmpty= _map_isEmpty;
}