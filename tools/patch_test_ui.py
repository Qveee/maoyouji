#!/usr/bin/env python3
"""给 测试/游戏主界面.html 添加点击玩家弹出信息面板（鼠标下侧紧贴定位）。"""

import re
import sys
from pathlib import Path


TARGET = Path(r"D:\maoyouji\测试\游戏主界面.html")


CSS = """
/* ---------- 玩家信息弹窗（按游戏截图：372px 单列白底黑边） ---------- */
#pi-panel{
  position:fixed;z-index:9999;display:none;
  background:#eeeeee;border:1px solid #000;
  padding:5px 5px 5px 10px;
  width:372px;max-height:72vh;overflow-y:auto;
  font:12px/16px SimSun,"宋体",serif;color:#333;
}
#pi-panel .fate{color:#000;padding-bottom:2px}
#pi-panel table{border-collapse:collapse}
#pi-panel td{vertical-align:top;font-size:12px}
#pi-panel td.ico{width:26px}
#pi-panel td.ico img{width:22px;height:22px;image-rendering:pixelated;display:block;margin-top:1px}
#pi-panel img.avatar{filter:fliph;image-rendering:pixelated;margin-right:6px;margin-bottom:4px}
#pi-panel .guild{color:green}
#pi-panel .pname{color:#0000FF}
#pi-panel .power{color:#0000FF;text-decoration:underline;cursor:pointer}
#pi-panel .spouse{color:#E100E1}
#pi-panel .q-b{color:#0070DD}#pi-panel .q-p{color:#A335EE}#pi-panel .q-w{color:#333}
#pi-panel .pislot{color:#7a7a7a}
#pi-panel hr{border:none;border-top:1px solid #BCBCBC;margin:4px 0;margin-right:-5px}
#pi-panel .close-x{position:absolute;right:4px;top:2px;cursor:pointer;color:#666;padding:2px}
"""


JS = r"""
/* ---------- 玩家信息弹窗（数据源自原版 addPetInfo 抓包） ---------- */
const PETPIC=p=>'../prototype/img/pet/map/'+p.pic;
const EQICO=p=>p.i?'<img src="../prototype/img/'+p.i+'" onerror="this.style.display=\'none\'">':'';
const PLAYER_INFO={
 '剑神归来':{pic:'BaHaMuTe.gif',guild:'浪漫满屋',power:'6877',lv:'Lv.72 (战士 动物 巴哈姆特)',spouse:'一起去旅行',fate:['上吉',''],
  eq:[['arm/weapon/xinyue/BaseXinYueShenHua.gif','星月神话','b','星月神话'],['itemlogo/BaseZhanShiShouHuZhiXing.gif','守护之星(战士)','b','守护之星'],['itemlogo/yuanshen/BaseYuanShen.gif','元神·七星斗转','b','元神'],['itemlogo/BaseNvShen.gif','命运女神','b','命运女神'],['guifu/futou.gif','鬼斧神工','b','鬼斧神工'],['itemlogo/BaseBaZheZhiHe.gif','霸者之核','p','霸者之核'],['arm/suit/lv60/plate/ZhengFuZheXiongJia.gif','完美的征服者胸甲','p','胸'],['arm/suit/lv60/plate/ZhengFuZheJianJia.gif','完美的征服者肩甲','p','肩'],['arm/suit/lv60/plate/ZhengFuZheYaoDai.gif','完美的征服者腰带','p','腰'],['arm/weapon/jian/GuoWangHuWeiZhe.gif','精致的国王护卫者','p','武器']],
  shls:[['铁头小老弟','Lv.72','shouhuling/bornskillimg/normal/JingJinBoLi.gif','正常消化',1],['矿工泡泡','Lv.40','shouhuling/bornskillimg/normal/PaoPao.gif','要撑到了',0]]},
 '果冻我果冻':{pic:'GuoDong.gif',guild:'龙巢',power:'1942',lv:'Lv.28 (法师 植物 果冻)',spouse:'',fate:['中吉',''],
  eq:[['arm/weapon/xinyue/BaseXinYueShenHua.gif','月光法杖','b','武器'],['itemlogo/BaseBaZheZhiHe.gif','霸者之核','p','霸者之核']],
  shls:[['小果冻','Lv.25','shouhuling/bornskillimg/normal/JingJinBoLi.gif','开心地晃悠',1]]},
 '龙之焱':{pic:'LongZhiYan.gif',guild:'烈焰盟',power:'3210',lv:'Lv.35 (战士 龙族 火龙)',spouse:'',fate:['小吉',''],
  eq:[['arm/weapon/jian/GuoWangHuWeiZhe.gif','火焰之刃','b','武器']],
  shls:[]},
};
function piRender(name){
 const d=PLAYER_INFO[name]||{pic:'',guild:'',power:'?',lv:'Lv.?',spouse:'',fate:['',''],eq:[],shls:[]};
 const pic=d.pic?'<img class="avatar" src="'+PETPIC(d)+'" onerror="this.style.display=\'none\'">':'';
 const eq=d.eq.map(e=>'<tr><td class="ico">'+EQICO({i:e[0]})+'</td><td><a class="q-'+e[2]+'">'+e[1]+'</a><span class="pislot">（'+e[3]+'）</span></td></tr>').join('');
 return '<div class="fate">今日运势：<b>'+(d.fate[0]||'—')+'</b>'+(d.fate[1]?'　关键人物：'+d.fate[1]:'')+'</div>'
  +'<table><tr><td width="1">'+pic+'</td><td>'
  +(d.guild?'<span class="guild">'+d.guild+'</span><br>':'')
  +'<span class="pname">'+name+'</span><br>'
  +'<span class="power">战斗力:'+d.power+'</span><br>'
  +d.lv+'<br>'
  +(d.spouse?'<span class="spouse">配偶:'+d.spouse+'</span>':'')
  +'</td></tr></table><hr><table>'+eq+'</table>';
}
var piPanel=document.createElement('div');piPanel.id='pi-panel';document.body.appendChild(piPanel);
function piShow(name,ev){
 piPanel.innerHTML='<span class="close-x" onclick="piPanel.style.display=\'none\'">✕</span>'+piRender(name);
 piPanel.style.display='block';
 const w=piPanel.offsetWidth,h=piPanel.offsetHeight;
 let x=ev.clientX+2,y=ev.clientY+14;                 // 紧贴鼠标下侧
 if(x+w>innerWidth-8)x=ev.clientX-w-2;               // 右溢出翻到左侧
 if(y+h>innerHeight-8)y=ev.clientY-h-6;              // 底溢出翻到上侧
 if(x<8)x=8;if(y<8)y=8;
 piPanel.style.left=x+'px';piPanel.style.top=y+'px';
}
document.getElementById('player-list').addEventListener('click',e=>{
 const pl=e.target.closest('.pl');if(!pl)return;
 e.stopPropagation();
 const name=pl.querySelector('b').textContent;
 piShow(name,e);
});
piPanel.addEventListener('click',e=>e.stopPropagation());
document.addEventListener('click',()=>piPanel.style.display='none');
// 在玩家列表追加抓包样本“剑神归来”
(function(){const box=document.getElementById('player-list');
 if(box&&! [...box.querySelectorAll('.pl b')].some(b=>b.textContent==='剑神归来')){
  const d=document.createElement('div');d.className='pl';d.innerHTML='<b>剑神归来</b><span class="lv">Lv.72</span>';box.prepend(d);}
})();
"""


def main():
    sys.stdout.reconfigure(encoding="utf-8")
    text = TARGET.read_text(encoding="utf-8")

    if "pi-panel" in text:
        print("已打过补丁，先移除旧补丁")
        text = text.replace(CSS, "").replace(JS, "")

    # CSS 插入到 </style> 前
    text = text.replace("</style>", CSS + "\n</style>", 1)
    # JS 插入到玩家列表渲染之后（聊天输入注释之前）
    anchor = "/* 聊天输入 */"
    idx = text.find(anchor)
    if idx < 0:
        raise SystemExit("找不到 JS 锚点")
    text = text[:idx] + JS + "\n" + text[idx:]

    TARGET.write_text(text, encoding="utf-8")
    print(f"已更新: {TARGET}  ({len(text)} 字符)")


if __name__ == "__main__":
    main()
