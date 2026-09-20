#!/usr/bin/env python3
"""测试页任务系统：NPC 任务图标 + 原版风格接任务对话框。"""

import re
import sys
from pathlib import Path


TARGET = Path(r"D:\maoyouji\测试\游戏主界面.html")


CSS = """
/* NPC 任务对话框（原版 npcChatReader：#b5e7ee 底 + 5px #5AA2BA 粗边） */
#npcq-mask{position:absolute;inset:0;z-index:20;background:rgba(90,162,186,.5);display:none}
#npcq-mask.show{display:block}
#npcq-box{
  position:absolute;z-index:21;left:50%;top:50%;transform:translate(-50%,-50%);
  width:258px;min-height:120px;max-height:300px;overflow-y:auto;
  background:#b5e7ee;border:5px solid #5AA2BA;
  padding:14px 15px 5px 13px;line-height:14pt;font-size:12px;color:#000;
}
#npcq-box .q-say{margin-bottom:8px}
#npcq-box .q-say b{color:#00364a}
#npcq-box table{border-collapse:collapse;margin:2px 0}
#npcq-box td{padding:3px 4px 3px 0;vertical-align:top}
#npcq-box td.qi{width:22px}
#npcq-box td.qi img{width:14px;height:14px;vertical-align:middle}
#npcq-box a{color:#0000FF;cursor:pointer;text-decoration:underline}
#npcq-box a:hover{color:#d40}
#npcq-box .q-done{color:#888;text-decoration:none;cursor:default}
#npcq-close{position:absolute;right:6px;top:4px;cursor:pointer;color:#456;padding:2px 4px;font-weight:bold}
#npc-list img.qicon{width:13px;height:13px;vertical-align:-2px;cursor:pointer}
"""


HTML = """<!-- NPC 任务对话层（原版 npcChatReader 风格） -->
<div id="npcq-mask"><div id="npcq-box"></div></div>"""


JS = r"""
/* ---------- NPC 任务系统（图标:领取/归还按任务状态切换；对话按原版 npcChatReader 复刻） ---------- */
const QUESTS={
 '肥猫':{say:'嘿，新手！猫隐村最近不太平，需要你帮忙做点事情。',list:[
   {n:'精华需求',d:'收集 3 个虚空精华交给肥猫。'},
   {n:'村长的委托',d:'去广场小道找老赵谈谈。'}]},
 '任务板':{say:'猫隐村的治安靠大家和我一起努力。同时，我们也需要收集物资作为日常开销。',list:[
   {n:'任务列表',d:'查看当前可接的全部任务。'},
   {n:'收集物资',d:'收集 5 个肉松面包。'}]},
 '道具店老板':{say:'你好！戈多向我介绍过你，我来告诉你一些道具店的知识。',list:[
   {n:'肉松面包',d:'战斗中被怪物攻击需要消耗HP，买 2 个肉松面包带着吧！'}]},
 '明美':{say:'想让你的宠物学会骑乘吗？先从基础训练开始吧。',list:[
   {n:'骑乘训练',d:'完成一次基础骑乘训练。'}]},
};
const taken=new Set();
const questState=n=>{const q=QUESTS[n];if(!q)return 'none';return q.list.every(t=>taken.has(t.n))?'done':'has';};
const QICON='../assets/原版参考/图标/';
function npcIcon(n,pos){
 const st=questState(n);
 if(st==='has')return `<img class="qicon" src="${QICON}领取任务按钮.gif" title="可接任务" onclick="openNpcChat('${n}')">`;
 if(st==='done')return `<img class="qicon" src="${QICON}归还任务按钮.gif" title="任务已接完" onclick="openNpcChat('${n}')">`;
 if(QUESTS[n])return `<img class="qicon" src="${QICON}领取任务按钮.gif" title="交谈" onclick="openNpcChat('${n}')">`;
 return pos<0?IC.atk:IC.talk;
}
function openNpcChat(n){
 const q=QUESTS[n];if(!q)return;
 const rows=q.list.map(t=>{
  const ok=taken.has(t.n);
  return `<tr><td class="qi"><img src="${QICON}${ok?'归还任务按钮':'领取任务按钮'}.gif"></td>`
   +`<td>${ok?`<span class="q-done" title="${t.d}">${t.n}（已接取）</span>`
   :`<a title="${t.d}" onclick="takeQuest('${n}','${t.n}')">${t.n}</a>`}</td></tr>`;
 }).join('');
 $('#npcq-box').innerHTML=`<span id="npcq-close" onclick="closeNpcChat()">×</span>`
  +`<div class="q-say"><b>${n}</b>: ${q.say}</div><table>${rows}</table>`;
 $('#npcq-mask').classList.add('show');
}
function closeNpcChat(){$('#npcq-mask').classList.remove('show')}
function takeQuest(n,tn){
 taken.add(tn);
 toast(`已接取任务【${tn}】`);
 addChat(`<span class="sys">你接取了任务：${tn}</span>`);
 closeNpcChat();renderNpcs();
}
$('#npcq-mask').addEventListener('click',e=>{if(e.target.id==='npcq-mask')closeNpcChat()});
"""


def main():
    sys.stdout.reconfigure(encoding="utf-8")
    t = TARGET.read_text(encoding="utf-8")

    # 1) CSS
    t = t.replace("</style>", CSS + "\n</style>", 1)

    # 2) 对话层 HTML：放在 #battle 前（同属 #scene）
    i = t.find('<!-- ⚔ 战斗画面')
    assert i > 0, "战斗注释锚点未找到"
    t = t[:i] + HTML + "\n  " + t[i:]

    # 3) JS：追加到玩家列表渲染之后（renderPlayers 定义之后）
    anchor = "renderPlayers();"
    j = t.find(anchor)
    assert j > 0, "renderPlayers 锚点未找到"
    end = j + len(anchor)
    t = t[:end] + "\n" + JS + t[end:]

    # 4) renderNpcs 图标逻辑：替换原有 icons 选择（怪物攻击图 / 聊天气泡）
    old_icon = 'const icon=pos<0?`<img class="atk-ico" src="${ATK_IMG}" alt="攻击" title="攻击">`:IC.talk;'
    assert old_icon in t, "icons 逻辑未找到"
    t = t.replace(old_icon, "const icon=npcIcon(n,pos);")
    TARGET.write_text(t, encoding="utf-8")
    print("✓ 任务系统已注入（图标/对话框/接取逻辑）")


if __name__ == "__main__":
    main()
