
/* ==========================================================
   数据：地点（800×600 原图坐标）与 NPC（docs/猫隐村NPC全量数据）
   ========================================================== */
const MAPS={
  '猫隐村':{
    bg:'../assets/原版参考/地图/猫隐村/猫隐村-官方预览图.jpg',
    locs:[
      /* 坐标(x,y)=标签中心：源码 .pos 标签点 + 显示微调累计右移（+25，猫隐村广场 +35） */
      {k:'街道办事处', n:'街道办', x:213, y:157},
      {k:'村长小屋',   n:'村长小屋', x:306, y:116},
      {k:'装备店',     n:'装备店', x:412, y:160},
      {k:'教堂',       n:'教堂', x:561, y:178},
      {k:'后村小道',   n:'后村小道', x:298, y:198},
      {k:'猫隐村小径', n:'猫隐村小径', x:244, y:366},
      {k:'比武场',     n:'比武场', x:118, y:196},
      {k:'猫隐村广场', n:'猫隐村广场', x:341, y:340}, // 源码点 306，累计右移 35px
      {k:'村口',       n:'村口', x:338, y:494},
      {k:'道具店',     n:'道具店', x:435, y:270},
      {k:'宠物托儿所', n:'宠物托儿所', x:70,  y:293},
      {k:'宠物研究所', n:'宠物研究所', x:470, y:499},
      {k:'仓库',       n:'仓库', x:522, y:419},
      {k:'广场小道',   n:'广场小道', x:444, y:379},
      {k:'后村林地',   n:'后村林地', x:173, y:53},
      {k:'后村谷地',   n:'后村谷地', x:76,  y:90},
      {k:'池边小道',   n:'池边小道', x:241, y:292},
      {k:'猫隐村驿站', n:'驿站', x:210, y:449},
      {k:'牧野草原03', n:'牧野草原', x:374, y:570, map:'牧野草原'},
      {k:'西村口',     n:'西村口', x:215, y:538},
    ]
  },
  '牧野草原':{
    bg:'../assets/原版参考/地图/牧野草原/牧野草原-官方预览图.jpg',
    locs:[
      {k:'牧野草原12', n:'12', x:445, y:179},
      {k:'牧野草原14', n:'14', x:603, y:264},
      {k:'牧野草原13', n:'13', x:542, y:162},
      {k:'万马草原_03', n:'万马草原', x:17, y:19},
      {k:'牧野草原02', n:'02', x:455, y:78},
      {k:'牧野草原25', n:'25', x:568, y:339},
      {k:'牧野草原24', n:'24', x:449, y:307},
      {k:'牧野草原16', n:'16', x:152, y:287},
      {k:'牧野草原11', n:'11', x:354, y:172},
      {k:'牧野草原05', n:'05', x:213, y:98},
      {k:'牧野草原06', n:'06', x:111, y:79},
      {k:'牧野草原07', n:'07', x:284, y:115},
      {k:'牧野草原08', n:'08', x:115, y:234},
      {k:'牧野草原26', n:'26', x:83, y:441},
      {k:'牧野草原28', n:'28', x:663, y:413},
      {k:'牧野草原27', n:'27', x:547, y:407},
      {k:'牧野草原36', n:'36', x:488, y:457},
      {k:'牧野草原18', n:'18', x:534, y:297},
      {k:'牧野草原17', n:'17', x:379, y:260},
      {k:'牧野草原00', n:'00', x:292, y:44},
      {k:'牧野草原31', n:'31', x:203, y:512},
      {k:'牧野草原15', n:'15', x:29, y:285},
      {k:'牧野草原04', n:'04', x:145, y:161},
      {k:'牧野草原10', n:'10', x:271, y:181},
      {k:'牧野草原01', n:'01', x:378, y:54},
      {k:'村口', n:'猫隐村', x:700, y:108, map:'猫隐村'},
      {k:'牧野草原03', n:'03', x:667, y:193},
      {k:'牧野草原34', n:'34', x:569, y:473},
      {k:'牧野草原21', n:'21', x:184, y:424},
      {k:'矮林边界', n:'低矮林地', x:704, y:527},
      {k:'牧野草原22', n:'22', x:281, y:402},
      {k:'牧野草原32', n:'32', x:285, y:504},
      {k:'牧野草原23', n:'23', x:390, y:384},
      {k:'牧野草原33', n:'33', x:419, y:487},
      {k:'牧野草原20', n:'20', x:78, y:356},
      {k:'牧野草原30', n:'30', x:125, y:499},
      {k:'牧野草原35', n:'35', x:673, y:483},
      {k:'牧野草原09', n:'09', x:328, y:358},
    ]
  }
};
/* ---------- NPC 任务系统（图标:领取/归还按任务状态切换；对话按原版 npcChatReader 复刻） ---------- */
const NPCQ={
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
const questState=n=>{const q=NPCQ[n];if(!q)return 'none';return q.list.every(t=>taken.has(t.n))?'done':'has';};
const QICON='../assets/原版参考/图标/';
function npcIcon(n,pos){
 const st=questState(n);
 if(st==='has')return `<img class="qicon" src="${QICON}领取任务按钮.gif" title="可接任务" onclick="openNpcChat('${n}')">`;
 if(st==='done')return `<img class="qicon" src="${QICON}归还任务按钮.gif" title="任务已接完" onclick="openNpcChat('${n}')">`;
 if(NPCQ[n])return `<img class="qicon" src="${QICON}领取任务按钮.gif" title="交谈" onclick="openNpcChat('${n}')">`;
 return pos<0?IC.atk:IC.talk;
}
function openNpcChat(n){
 const q=NPCQ[n];if(!q)return;
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

const NPCS={"广场小道":[["老赵","","",0],["任务板","使命","green",0],["衙役","官衙","blue",0]],"村长小屋":[["肥猫","猫隐村村长","blue",1]],"装备店":[["欧老板","","",0],["李金斗","当铺老板","green",0]],"道具店":[["道具店老板","","",2],["李金斗","当铺老板","green",0],["王小二","道具店跑堂","blue",1]],"教堂":[["圣殿守护者","","",-1],["修女","","",0]],"仓库":[["物品保管员","","",0],["娜娜的虫","想","red",0]],"猫隐村驿站":[["专用空姐","","",0],["猫扑快递公司","","",0],["客房经理","旅馆","orange",0],["焦急的大妈","","",0]],"街道办事处":[["张大娘","","",0],["狱卒","","",0],["mop.com","","",0],["梅姊姊","绝世媚妞","red",0],["公会专员","","",0]],"比武场":[["修女","","",0],["mop.com","","",0],["mop.com","","",0],["mop.com","","",0],["mop.com","","",0]],"宠物托儿所":[["明美","骑乘训练师","blue",0]],"宠物研究所":[["洛克洛","帝国研究师","blue",0],["封印师","","",0],["守护灵媒","","",2],["物化灵媒","","",0],["守护灵保姆","","",1],["克拉拉","守护灵研究师","blue",0]],"村口":[["流浪歌手小牙","","",0],["衙役","官衙","blue",0],["衙役","官衙","blue",0]],"猫隐村小径":[["吾善贴图","微缩神教","red",0],["衙役","官衙","blue",0]],"池边小道":[["小胖","","",0],["小明","","",0]],"后村小道":[["傻二","","",1],["范坚强","","",0],["衙役","官衙","blue",0]],"后村谷地":[],"后村林地":[["懒得动的小臭","","",0],["衙役","官衙","blue",0],["衙役","官衙","blue",0]],"牧野草原03":[["小牧童","","",1]],"猫隐村广场":[["木静静","美女教官","red",0],["新手福音-戈多","","",1],["钱大伯","双倍经验","orange",1],["宝石手工艺人","","",0],["饰品大师","","",2]],"西村口":[["绿毛虫","","",-1],["绿毛虫","","",-1],["绿毛虫","","",-1],["泡泡","","",-1],["泡泡","","",-1],["泡泡","","",-1],["泡泡","","",-1],["绿毛虫","","",-1],["绿毛虫","","",-1],["泡泡","","",-1],["泡泡","","",-1],["泡泡","","",-1],["泡泡","","",-1],["泡泡","","",-1],["泡泡","","",-1],["泡泡","","",-1],["绿毛虫","","",-1],["绿毛虫","","",-1],["绿毛虫","","",-1],["泡泡","","",-1],["焦虑的爷爷","","",0],["泡泡","","",-1]]};

/* ---------- 怪物图鉴（牧野草原五种怪；精灵图暂统一用绿毛虫，后续逐只替换。
   role=定位（怪物清单 §1.1 定位类型表：输出/平衡/辅助/坦克），战斗数值按 §1.1 公式计算 ---------- */
const MON_IMG='../assets/原版参考/怪物/LuMaoChong.gif';
const ATK_IMG='../assets/原版参考/图标/攻击按钮.gif';
const MONSTERS={
 '绿毛虫'  :{lv:3,role:'辅助',type:'战士 昆虫辅助',desc:'牧野草原最常见的小虫，圆滚滚的身子行动迟缓，靠啃食嫩草为生，最适合新手练手。'},
 '泡泡'    :{lv:2,role:'辅助',type:'法师 水系辅助',desc:'随风飘荡的水泡泡，看似一戳就破，破裂时溅出的水花却常让人猝不及防。'},
 '草原蝎'  :{lv:5,role:'输出',type:'战士 昆虫输出',desc:'潜伏在草丛深处的毒蝎，尾针闪着寒光，靠近时千万小心它的突然袭击。'},
 '机警小鸡':{lv:4,role:'平衡',type:'平衡 动物速度',desc:'总是竖着耳朵四处张望的小鸡，一有风吹草动就撒腿狂奔，想打到它可不容易。'},
 '黑蘑菇'  :{lv:6,role:'输出',type:'法师 植物输出',desc:'生长在背阴处的黑色毒蘑菇，伞盖下飘散的麻痹孢子能让冒犯者晕头转向。'},
};
/* 牧野草原野怪：每个格子首次进入时随机生成 3~8 只（五种怪内随机、同名可重复），
   生成后缓存到 SPAWNS——反复进出同一格子结果保持稳定（对应怪物清单 §1.2 驻留式刷新） */
const SPAWNS={};
function ensureMonsters(k){
  if(SPAWNS[k])return;
  const kinds=Object.keys(MONSTERS);
  SPAWNS[k]=Array.from({length:rnd(3,8)},()=>[kinds[rnd(0,kinds.length-1)],'','',-1]);
}

/* ---------- 小图标（内联 SVG，无外部资源） ---------- */
const IC={
  talk:'<svg viewBox="0 0 12 12" title="交谈"><path d="M1 2h10v7H7l-3 3v-3H1z" fill="#e8f4fc" stroke="#2f7fc4" stroke-width="1.2"/><circle cx="4" cy="5.2" r=".8" fill="#2f7fc4"/><circle cx="6" cy="5.2" r=".8" fill="#2f7fc4"/><circle cx="8" cy="5.2" r=".8" fill="#2f7fc4"/></svg>',
  heart:'<svg viewBox="0 0 12 12" title="情侣"><path d="M6 10.4C2.2 7.6 1 5.6 2.4 4 3.8 2.4 5.4 3.4 6 4.6 6.6 3.4 8.2 2.4 9.6 4 11 5.6 9.8 7.6 6 10.4z" fill="#e8452c" stroke="#a12010" stroke-width=".8"/></svg>',
  guild:'<svg viewBox="0 0 12 12" title="公会"><path d="M2 1h8v6l-4 4-4-4z" fill="#3f78c8" stroke="#1c4470" stroke-width=".9"/><path d="M4.4 4.4l1.6 2 1.6-2" fill="none" stroke="#fff" stroke-width="1.1"/></svg>',
  coin:'<svg viewBox="0 0 12 12" title="财富"><circle cx="6" cy="6" r="4.6" fill="#f2c14e" stroke="#b8862f" stroke-width="1"/><circle cx="6" cy="6" r="2.4" fill="none" stroke="#b8862f" stroke-width=".9"/></svg>',
};
/* 底栏功能按钮（原版图标素材 assets/原版参考/图标/，文字已内嵌） */
const FBTNS=['任务','技能','道具','宝库','宠物','好友','队伍','公会'];
/* 玩家按格子分布（移动格子时切换对应玩家集合） */
const PL=(g,n)=>({g,n});
const PLAYERS_LOC={
 '猫隐村广场':[PL('龙巢','果冻我果冻'),PL('烈焰盟','龙之焱'),PL('','樱桃丸子'),PL('微缩神教','蓝色蒲公英')],
 '村口':[PL('龙巢','夏季罢别团'),PL('','YYYes！')],
 '装备店':[PL('浪漫满屋','剑神归来'),PL('','铁头娃')],
 '村长小屋':[PL('','小鱼干万岁')],
 '牧野草原12':[PL('烈焰盟','加点盐i'),PL('','三鲜味辣条丶'),PL('龙巢','果冻我果冻')],
 '牧野草原13':[PL('','小寡妇')],
};

/* ==========================================================
   渲染与交互
   ========================================================== */
const $=s=>document.querySelector(s);
let mapId='猫隐村',cur='猫隐村广场';
let toastTimer;
function toast(msg){
  const t=$('#toast');t.textContent=msg;t.classList.add('show');
  clearTimeout(toastTimer);toastTimer=setTimeout(()=>t.classList.remove('show'),1800);
}
function now(){const d=new Date(),p=x=>String(x).padStart(2,'0');return `[${p(d.getHours())}:${p(d.getMinutes())}]`}

/* ---------- 地图：格子（地点名称标签，坐标取自源码 .pos 标签点）与玩家移动 ---------- */
const GW=800,GH=600;
const ZOOM=1.8; // 视野拉远10%：可见范围约为全图的 55.6%（此前 ZOOM=2 为 50%）
let camX=0,camY=0;
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
function setCam(cx,cy){
  const vw=GW/ZOOM,vh=GH/ZOOM;
  camX=clamp(cx-vw/2,0,GW-vw);camY=clamp(cy-vh/2,0,GH-vh);
}
function applyView(){
  const mv=$('#mapview');
  mv.style.transform=`translate(${-(camX/GW)*mv.clientWidth}px,${-(camY/GH)*mv.clientHeight}px)`;
}
function renderCells(){ // 生成地点名称标签格子（大小自动紧贴文字）
  const mv=$('#mapview');
  mv.querySelectorAll('.cell').forEach(cell=>cell.remove());
  mv.style.background=`url("${MAPS[mapId].bg}") center/100% 100% no-repeat`;
  MAPS[mapId].locs.forEach(l=>{
    const d=document.createElement('div');
    d.className='cell'+(l.k===cur?' cur':'');
    d.textContent=l.n;d.dataset.k=l.k;d.title=l.n; // 原生 title 提示（悬停延迟出现）
    d.style.left=(l.x/GW*100)+'%';d.style.top=(l.y/GH*100)+'%';
    mv.appendChild(d);l.el=d;
  });
}
function fitMap(){ // 场景面板内按 4:3 精确放置地图（修复此前 0×0 塌缩导致背景不显示）
  const s=$('#scene'),m=$('#mapbox'),mv=$('#mapview');
  const mw=Math.min(s.clientWidth,s.clientHeight*4/3);
  m.style.width=mw+'px';m.style.height=(mw*3/4)+'px';
  mv.style.width=(ZOOM*100)+'%';mv.style.height=(ZOOM*100)+'%'; // 视图缩放与 ZOOM 常量保持同步
  applyView();
}
window.addEventListener('resize',fitMap);

function setMap(id,k){
  mapId=id;
  renderCells();
  setLoc(k);
}

function setLoc(k){
  const to=MAPS[mapId].locs.find(l=>l.k===k);
  if(!to)return;
  if(to.map){setMap(to.map,to.k);return} // 出入口：切换整张地图并进入对应格子
  const c=[to.x,to.y]; // 宠物落点=格子（标签）中心，允许盖住文字
  cur=k;
  if(mapId==='牧野草原')ensureMonsters(k); // 草原每个格子：进入时随机刷怪（结果缓存）
  const pl=$('#player');
  pl.style.left=(c[0]/GW*100)+'%';pl.style.top=(c[1]/GH*100)+'%';
  setCam(c[0],c[1]);applyView();
  MAPS[mapId].locs.forEach(l=>l.el.classList.toggle('cur',l.k===k));
  $('#npc-room').textContent = mapId!=='猫隐村' ? mapId+' · '+to.n : to.n;
  renderNpcs(); renderPlayers();


$('#npcq-mask').addEventListener('click',e=>{if(e.target.id==='npcq-mask')closeNpcChat()});

}
$('#mapbox').addEventListener('click',e=>{
  const c=e.target.closest('.cell');
  if(c)setLoc(c.dataset.k);
});

/* NPC 列表（称号颜色：blue 功能 / green 商业 / red 个性 / orange 场所；pos<0 为怪物，红笔=攻击；
   牧野草原格子额外合并随机生成的野怪 SPAWNS） */
function renderNpcs(){
  const list=[...(NPCS[cur]||[]),...(SPAWNS[cur]||[])],box=$('#npc-list');

  box.innerHTML=list.map(([n,t,c,pos])=>{
    const icon=npcIcon(n,pos);
    return `<div class="npc" data-mon="${pos<0?1:0}">${t?`<span class="tt ${c}">${t}</span>`:''}<b title="${pos<0?'查看怪物详情':'交谈'}">${n}</b>${icon}</div>`;
  }).join('')||'<div class="npc"><b>这里静悄悄的，没有 NPC。</b></div>';
  box.innerHTML+= (corpses[cur]||[]).map(n=>`<div class="npc corpse" title="击杀后稍候原地刷新">${n}的尸体</div>`).join('');
  box.scrollTop=0;
}
$('#npc-list').addEventListener('click',e=>{
  const it=e.target.closest('.npc');if(!it||!it.querySelector('b'))return;
  const name=it.querySelector('b').textContent;
  if(it.dataset.mon==='1'){ // 怪物行：名字开详情，红笔发起攻击
    e.stopPropagation();
    if(e.target.classList.contains('atk-ico'))attackMonster(name);
    else monShow(name,e);
    return;
  }
  toast(`与【${name}】交互（功能预留）`);
});

/* ---------- 怪物信息浮窗（对齐 游戏内截图/怪物信息.png：左图右文 + 底部描述） ---------- */
const monPanel=document.createElement('div');monPanel.id='mon-pop';document.body.appendChild(monPanel);
function monShow(name,ev){
  const d=MONSTERS[name]||{lv:'?',type:'未知',desc:'（图鉴暂未收录此怪物。）'};
  monPanel.dataset.n=name;
  monPanel.innerHTML=`<span class="mx" title="关闭">✕</span>`
   +`<table><tr><td class="mi"><img src="${MON_IMG}" alt="${name}"></td><td>`
   +`<div class="mn">${name}<img src="${ATK_IMG}" alt="攻击" title="攻击"></div>`
   +`<div class="ml">Lv.${d.lv} (${d.type})</div></td></tr></table>`
   +`<div class="md">${d.desc}</div>`;
  monPanel.style.display='block';
  piPanel.style.display='none';                    // 与玩家信息浮窗互斥
  const w=monPanel.offsetWidth,h=monPanel.offsetHeight;
  let x=ev.clientX+2,y=ev.clientY+14;              // 紧贴鼠标下侧
  if(x+w>innerWidth-8)x=ev.clientX-w-2;            // 右溢出翻到左侧
  if(y+h>innerHeight-8)y=ev.clientY-h-6;           // 底溢出翻到上侧
  if(x<8)x=8;if(y<8)y=8;
  monPanel.style.left=x+'px';monPanel.style.top=y+'px';
}
function attackMonster(n){ // 发起攻击：进入战斗画面（战斗模式参考 prototype/猫游记界面UI.html）
  monPanel.style.display='none';
  openBattle(mkInst(n));
}
monPanel.addEventListener('click',e=>{
  e.stopPropagation();
  if(e.target.className==='mx')monPanel.style.display='none';
  else if(e.target.tagName==='IMG'&&e.target.title==='攻击')attackMonster(monPanel.dataset.n);
});

/* ==========================================================
   ⚔ 战斗系统：回合制自动战斗（战斗模式参考 prototype/猫游记界面UI.html v1.4）
   ========================================================== */
/* 怪物战斗实例：数值照录 docs/清单/怪物清单.md §1.1 普通怪公式与定位系数
   HP=floor((60+12×Lv)×血量系数) 物攻=floor((10+3×Lv)×攻击修正) EXP=20+6×Lv 金币=10+4×Lv */
const ROLE_MOD={输出:{hp:.8,atk:1.2},平衡:{hp:1,atk:1},辅助:{hp:1,atk:1},坦克:{hp:1.6,atk:.8}};
let uidSeq=0;
function mkInst(name){
  const t=MONSTERS[name],mod=ROLE_MOD[t.role]||ROLE_MOD.平衡;
  const m={uid:++uidSeq,name,lv:t.lv,maxHp:Math.floor((60+12*t.lv)*mod.hp),
           atk:Math.floor((10+3*t.lv)*mod.atk),exp:20+6*t.lv,gold:10+4*t.lv}; m.maxMp=30+4*t.lv; m.hp=m.maxHp; m.mp=m.maxMp;return m;
}
const P_MAXHP=160,P_MAXMP=60; // 演示用玩家面板值（宠物成长数值口径待宠物清单定稿后替换）
let battle=null,battleTimer=null;
function bBars(){
  const b=battle;if(!b)return;
  $('#b-php').style.width=Math.max(0,b.php)/P_MAXHP*100+'%';
  $('#b-phpt').textContent=`${Math.max(0,Math.round(b.php))}/${P_MAXHP}`;
  $('#b-pmp').style.width=Math.max(0,b.pmp)/P_MAXMP*100+'%';
  $('#b-pmpt').textContent=`${Math.max(0,Math.round(b.pmp))}/${P_MAXMP}`;
  $('#b-mhp').style.width=Math.max(0,b.m.hp)/b.m.maxHp*100+'%';
  $('#b-mhpt').textContent=`${Math.max(0,b.m.hp)}/${b.m.maxHp}`; $('#b-mmp').style.width=b.m.mp/b.m.maxMp*100+'%'; $('#b-mmpt').textContent=`${b.m.mp}/${b.m.maxMp}`; }
function unitAnim(sel,cls){
  const u=document.querySelector(sel);if(!u)return;
  u.classList.remove(cls);void u.offsetWidth;u.classList.add(cls);
  setTimeout(()=>u.classList.remove(cls),600);
}
function spawnFloat(sel,text,cls){
  const u=document.querySelector(sel),stage=document.querySelector('.bt-stage');if(!u||!stage)return;
  const f=document.createElement('div');
  f.className='bt-float '+(cls||'');f.textContent=text;
  f.style.left=(u.offsetLeft+u.offsetWidth/2-34+rnd(-12,12))+'px';
  f.style.top=(u.offsetTop-10)+'px';
  stage.appendChild(f);setTimeout(()=>f.remove(),1000);
}
function openBattle(m){
  if(battle&&!battle.over){toast('战斗进行中！');return}
  battle={m,php:P_MAXHP,pmp:P_MAXMP,over:false,nextSkill:null};
  const loc=MAPS[mapId].locs.find(l=>l.k===cur);
  $('#b-loc').textContent=(mapId!=='猫隐村'?mapId+' · ':'')+(loc?loc.n:'');
  $('#b-mname').innerHTML=`${m.name} Lv.${m.lv} <span style="font:12px SimSun;color:#39617c">(${MONSTERS[m.name].type})</span>`;
  $('#bt-player').className='bt-unit bt-player';
  $('#bt-monster').className='bt-unit bt-monster';
  $('#battle').classList.add('show');
  bBars();
  addChat(`<span class="you">你</span>向<span class="mk">${m.name}</span>发起攻击！`);
  battleTimer=setTimeout(battleLoop,650);
}
function playerHit(mult,skill){ // skill=释放的技能名（可空）
  const b=battle,m=b.m;
  const crit=Math.random()<0.2;
  const dmg=Math.round(rnd(24,36)*mult*(crit?1.8:1));
  unitAnim('#bt-player','atk');setTimeout(()=>{
    if(!battle||battle.over)return;
    m.hp-=dmg;
    spawnFloat('#bt-monster','-'+dmg,crit?'crit':'');
    addChat(`<span class="you">你</span>对<span class="mk">${m.name}</span>`
      +(skill?`释放【${skill}】,造成${dmg} 点伤害！`:`发出${crit?'致命':''}一击,造成${dmg} 点伤害！`));
    bBars();
    if(m.hp<=0){m.hp=0;bVictory()}
  },180);
}
function monsterTurn(){
  const b=battle,m=b.m;
  if(b.over)return;
  const dmg=Math.round(m.atk*rnd(60,100)/100);
  unitAnim('#bt-monster','atk');setTimeout(()=>{
    if(!battle||battle.over)return;
    b.php-=dmg;
    spawnFloat('#bt-player','-'+dmg,'foe');
    addChat(`<span class="mk">${m.name}</span>向你发起攻击,造成${dmg} 点伤害！`);
    bBars();
    if(b.php<=0){b.php=0;bDefeat();return}
  },180);
}
/* 自动战斗循环：玩家普攻/技能 → 怪物反击 → 循环，直到一方倒下 */
function battleLoop(){
  if(!battle||battle.over)return;
  const sk=battle.nextSkill;battle.nextSkill=null;
  if(sk)playerHit(1.7,sk);
  else playerHit(1);
  battleTimer=setTimeout(()=>{
    if(!battle||battle.over)return;
    monsterTurn();
    battleTimer=setTimeout(battleLoop,1500);
  },800);
}
/* 尸体与刷新（参考原型节奏：击杀后列表显示尸体，8 秒后原地刷新该怪） */
const corpses={}; // 格子 -> [尸体名,...]
const KILLS={},KEXP={}; // 各种类累计斩数 / 累计经验（结算消息「总斩数/总经验」口径）
function bVictory(){
  const b=battle,m=b.m,cell=cur;
  b.over=true;clearTimeout(battleTimer);
  document.querySelector('#bt-monster').classList.add('dead');
  const src=SPAWNS[cell]||NPCS[cell];
  const i=src?src.findIndex(e=>Array.isArray(e)&&e[0]===m.name&&e[3]<0):-1;
  if(i>-1){
    const dead=src.splice(i,1)[0];
    (corpses[cell]=corpses[cell]||[]).push(m.name);
    if(cur===cell)renderNpcs();
    setTimeout(()=>{
      const cl=corpses[cell],ci=cl?cl.indexOf(m.name):-1;
      if(ci>-1)cl.splice(ci,1);
      src.push(dead);
      if(cur===cell)renderNpcs();
    },8000);
  }
  KILLS[m.name]=(KILLS[m.name]||0)+1;
  KEXP[m.name]=(KEXP[m.name]||0)+m.exp;
  addChat(`<span class="mk">${m.name}</span>被你杀死了...`);
  addChat(`<span class="mk">${m.name}</span>(总斩数:${KILLS[m.name]} 总经验:${KEXP[m.name]})被杀死了!`);
  addChat(`【结算】获得经验+${m.exp} · 金币+${m.gold}`);
  const bt=battle;
  setTimeout(()=>{if(battle===bt){$('#battle').classList.remove('show');battle=null;}},1100);
}
function bDefeat(){
  const b=battle,m=b.m;
  b.over=true;clearTimeout(battleTimer);
  document.querySelector('#bt-player').classList.add('dead');
  addChat(`【战斗失败】你被 <b>${m.name}</b>(Lv.${m.lv}) 打败了，被路过的商队救回猫隐村…`);
  const bt=battle;
  setTimeout(()=>{ // 参考原型：战败回城
    if(battle===bt){$('#battle').classList.remove('show');battle=null;setMap('猫隐村','猫隐村广场');}
  },1100);
}

/* 左下聊天记录（某某向某地离开/走来） */
function addChat(html){
  const box=$('#chat-body'),d=document.createElement('div');
  d.className='sysline';d.innerHTML=`<span class="t">${now()}</span> ${html}`;
  box.appendChild(d);box.scrollTop=box.scrollHeight;
}
['<b>龙之焱</b> 向【西村口】离开。','<b>果冻我果冻</b> 向【猫隐村广场】走来。','<b>樱桃丸子</b> 向【道具店】走来。','【系统】欢迎来到猫隐村，输入文字后按回车即可聊天。']
  .forEach(addChat);

/* 世界 / 系统消息 */
function addDrop(html){
  const box=$('#drop-list'),d=document.createElement('div');
  d.className='drop';d.innerHTML=`${html} <span class="t">${now()}</span>`;
  box.appendChild(d);box.scrollTop=box.scrollHeight;
  while(box.children.length>60)box.removeChild(box.firstChild);
}
[
  '<span class="pn">喵小游</span> 击败 绿毛虫，获得 <span class="it">12 经验</span>、<span class="it">5 银币</span>',
  '<span class="pn">果冻我果冻</span> 获得了 <span class="it">初级红药水×2</span>',
  '<span class="pn">龙之焱</span> 获得了 <span class="it rare">精铁长剑</span>',
  '<span class="sys">【系统】</span>第九届宠物<span class="gold">竞技场</span>报名开始啦！',
  '<span class="pn b">樱桃丸子</span>：收猫粮啦，价格好商量～',
  '<span class="pn r">铁头娃</span> 完成了成就 <span class="it">初出茅庐</span>',
].forEach(addDrop);
/* 演示：定时模拟一条掉落公告，验证滚动区效果 */
const DEMO=[
  ()=>`<span class="pn">小鱼干万岁</span> 获得了 <span class="it">烤面包×3</span>`,
  ()=>`<span class="pn">阿呆不呆</span> 获得了 <span class="it rare">回城卷轴</span>`,
  ()=>`<span class="pn b">迷路的猫叔</span>：组队刷牧野草原，来人～`,
  ()=>`<span class="sys">【系统】</span><span class="pn r">樱桃小丸子</span> 的宠物升到了 <span class="it">Lv.20</span>`,
];
let demoIdx=0;
setInterval(()=>addDrop(DEMO[demoIdx++%DEMO.length]()),9000);

/* 私人信息：自己的输入与对方私聊均显示在此窗口 */
function addPrivate(html){
  const box=$('#private-list'),d=document.createElement('div');
  d.className='drop';d.innerHTML=`${html} <span class="t">${now()}</span>`;
  box.appendChild(d);box.scrollTop=box.scrollHeight;
}
[
  '<span class="pn b">喵小游</span>：晚上一起去牧野草原练级吗？',
  '<span class="pn">小蜜糖</span>：好呀，我在村口等你～',
].forEach(addPrivate);

/* 玩家列表：公会名 玩家名 + 聊天/跟随/组队/交易/攻击（按格子渲染） */
const ICO='../assets/原版参考/图标/';
function renderPlayers(){
 const list=PLAYERS_LOC[cur]||[];
 $('#player-list').innerHTML=list.map(p=>
 `<div class="pl">${p.g?`<span class="pg">${p.g}</span>`:''}<b>${p.n}</b>`+
 `<span class="pbtns">`+
 `<img src="${ICO}聊天按钮.gif" title="聊天" onclick="toast('私聊：${p.n}')">`+
 `<img src="${ICO}跟随按钮.gif" title="跟随" onclick="toast('跟随 ${p.n}')">`+
 `<img src="${ICO}组队按钮.gif" title="组队" onclick="toast('邀请 ${p.n} 组队')">`+
 `<img src="${ICO}交易按钮.gif" title="交易" onclick="toast('与 ${p.n} 交易')">`+
 `<img src="${ICO}攻击按钮.gif" title="攻击" onclick="toast('攻击 ${p.n}')" class="atk">`+
 `</span></div>`).join('');
}
renderPlayers();






/* ---------- 玩家信息弹窗（数据源自原版 addPetInfo 抓包） ---------- */
// 宠物形象池（assets/原版参考/宠物/朝右）——按玩家名哈希稳定分配
const PET_IMGS=['包子','恶魔波利','火星人','猫','蘑菇宝宝','年兽','沙地仙人掌','水母','水獭','天使波利','土包子','小恶魔','小木猴(灵猴)','熊宝宝','鸭嘴兽','野兔','猪猪'];
const petImgOf=n=>{let h=0;for(const c of n)h=(h*31+c.charCodeAt(0))>>>0;return '../assets/原版参考/宠物/朝右/'+PET_IMGS[h%PET_IMGS.length]+'.gif';};
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
 const pic='<img class="avatar" src="'+(d.pic?PETPIC(d):petImgOf(name))+'" onerror="this.style.display=\'none\'">';
 const eq=d.eq.map(e=>'<tr><td class="ico">'+EQICO({i:e[0]})+'</td><td><a class="q-'+e[2]+'">'+e[1]+'</a><span class="pislot">（'+e[3]+'）</span></td></tr>').join('');
 return '<div class="fate">今日运势：<b>'+(d.fate[0]||'—')+'</b>'+(d.fate[1]?'　关键人物：'+d.fate[1]:'')+'</div>'
  +'<table><tr><td class="av">'+pic+'</td><td>'
  +(d.guild?'<span class="guild">'+d.guild+'</span><br>':'')
  +'<span class="pname">'+name+'</span><br>'
  +'<span class="power">战斗力:'+d.power+'</span><br>'
  +d.lv+'<br>'
  +(d.spouse?'<span class="spouse">配偶:'+d.spouse+'</span>':'')
  +'</td></tr></table><hr><table class="eq">'+eq+'</table>';
}
var piPanel=document.createElement('div');piPanel.id='pi-panel';document.body.appendChild(piPanel);
function piAlignBox(){ /* 装备栏左边距=形象 box 实际宽度（图片加载后自动对齐名字列） */
 const av=piPanel.querySelector('td.av'),eqT=piPanel.querySelector('table.eq'),img=piPanel.querySelector('img.avatar');
 if(!av||!eqT)return;
 const fit=()=>{eqT.style.marginLeft=av.offsetWidth+'px'};
 if(img&&!(img.complete&&img.naturalWidth))img.onload=fit;
 fit();
}
function piShow(name,ev){
 piPanel.innerHTML='<span class="close-x" onclick="piPanel.style.display=\'none\'">✕</span>'+piRender(name);
 piPanel.style.display='block';
 monPanel.style.display='none';                     // 与怪物信息浮窗互斥
 piAlignBox();
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
document.addEventListener('click',()=>{piPanel.style.display='none';monPanel.style.display='none'});
// 在玩家列表追加抓包样本“剑神归来”
(function(){const box=document.getElementById('player-list');
 if(box&&! [...box.querySelectorAll('.pl b')].some(b=>b.textContent==='剑神归来')){
  const d=document.createElement('div');d.className='pl';d.innerHTML='<b>剑神归来</b><span class="lv">Lv.72</span>';box.prepend(d);}
})();

/* 聊天输入 */
function sendChat(){
  const inp=$('#chat-text'),v=inp.value.trim();
  if(!v){toast('请输入聊天内容');return}
  addPrivate(`<span class="pn b">喵小游</span>：${v.replace(/</g,'&lt;')}`);
  inp.value='';inp.focus();
}
$('#btn-send').onclick=sendChat;
$('#chat-text').addEventListener('keydown',e=>{if(e.key==='Enter')sendChat()});

/* 技能栏（格面在 底栏素材/skillbar.png 内，此处只渲染透明命中区；快捷键 1~9、0、10、11、12） */
const SLOT_KEYS=[1,2,3,4,5,6,7,8,9,0,10,11,12];
$('#slots').innerHTML=SLOT_KEYS.map((k,i)=>
  `<div class="slot" data-n="技能格${i+1}" title="快捷键 ${k}"></div>`).join('');
$('#slots').addEventListener('click',e=>{
  const s=e.target.closest('.slot');if(!s)return;
  if(battle&&!battle.over){ // 战斗中点技能栏：强化下一击（参考原型 nextSkill 机制）
    battle.nextSkill=s.dataset.n;
    toast(`将在下一击释放【${s.dataset.n}】`);
  }else toast(`使用【${s.dataset.n}】（功能预留）`);
});
$('#pagebtns').addEventListener('click',e=>{
  const z=e.target.closest('i');
  toast(z&&z.dataset.p==='up'?'技能栏上一页（功能预留）':'技能栏下一页（功能预留）');
});

/* 底部功能按钮（原版 GIF 图标，文字已内嵌） */
$('#fbtns').innerHTML=FBTNS.map(n=>
  `<div class="fbtn" data-n="${n}" title="${n}"><img src="../assets/原版参考/图标/${n}按钮.gif" alt="${n}"></div>`).join('');
$('#fbtns').addEventListener('click',e=>{
  const b=e.target.closest('.fbtn');if(!b)return;
  const n=b.dataset.n;
  if(n==='任务')openQuest();
  else if(n==='道具')openBag();
  else if(n==='公会')openGuild();
  else if(n==='好友')openFriends();
  else if(n==='队伍')openTeam();
  else if(n==='宠物')openPet();
  else toast(`【${n}】面板建设中～`);
});

/* ==========================================================
   ⑥ 功能窗口逻辑（自 prototype/猫游记界面UI.html 迁移）
   ========================================================== */
const rnd=(a,b)=>a+Math.floor(Math.random()*(b-a+1));
const pad=n=>String(n).padStart(2,'0');
function openModal(html){ $('#modal').innerHTML=html; $('#modal-mask').classList.add('show'); }
function closeModal(){ $('#modal-mask').classList.remove('show'); }
$('#modal-mask').addEventListener('click',e=>{ if(e.target.id==='modal-mask') closeModal(); });
function openPlayer(p){
  openModal(`
    <div class="m-head">【玩家信息】${p.name} <span style="font:12px SimSun;color:#39617c">Lv.${p.lv} ${p.job}</span><span class="x" onclick="closeModal()">✕</span></div>
    <div class="m-body">
      <div class="kv">
        <b>公会</b><span>${p.guild}</span>
        <b>所在节点</b><span>猫隐村${p.cell}</span>
        <b>装备</b><span>${p.gear}</span>
        <b>状态</b><span style="color:#1c8a2e">在线 · 同场景</span>
      </div>
    </div>
    <div class="m-foot"><button class="cbtn" onclick="closeModal()">关 闭</button></div>`);
}

/* ---------- 道具背包 ---------- */
const BAG_MAX=300;
const CRISP='shape-rendering="crispEdges"';
const BAG_ITEMS=[
  {name:'传送石',qty:1,unit:'块',desc:'点击使用,可传送到已记录的传送点。',icon:`<svg viewBox="0 0 32 32" ${CRISP}><rect x="8" y="6" width="16" height="4" fill="#b8c2cc"/><rect x="5" y="10" width="22" height="4" fill="#9aa5b0"/><rect x="4" y="14" width="24" height="12" fill="#8a95a0"/><rect x="7" y="26" width="18" height="4" fill="#75808c"/><rect x="10" y="10" width="6" height="3" fill="#d8e0e6"/><rect x="15" y="12" width="2" height="10" fill="#3aa0e8"/><rect x="11" y="16" width="10" height="2" fill="#3aa0e8"/><rect x="15" y="16" width="2" height="2" fill="#8fd8ff"/><rect x="19" y="13" width="2" height="2" fill="#8fd8ff"/><rect x="11" y="21" width="2" height="2" fill="#8fd8ff"/></svg>`},
  {name:'金刚锉',qty:642,unit:'个',desc:'打造装备的材料,可提升强化成功率。',icon:`<svg viewBox="0 0 32 32" ${CRISP}><rect x="20" y="4" width="7" height="4" fill="#c8ccd4"/><rect x="16" y="8" width="9" height="4" fill="#aeb6c0"/><rect x="12" y="12" width="9" height="4" fill="#aeb6c0"/><rect x="8" y="16" width="9" height="4" fill="#98a2ac"/><rect x="18" y="8" width="1" height="4" fill="#5a626e"/><rect x="14" y="12" width="1" height="4" fill="#5a626e"/><rect x="10" y="16" width="1" height="4" fill="#5a626e"/><rect x="22" y="5" width="1" height="2" fill="#5a626e"/><rect x="4" y="20" width="7" height="8" fill="#8a5a2a"/><rect x="3" y="24" width="4" height="6" fill="#6e4620"/></svg>`},
  {name:'练功房门卡',qty:1264,unit:'张',desc:'进入练功房修炼的通行凭证。',icon:`<svg viewBox="0 0 32 32" ${CRISP}><rect x="6" y="7" width="20" height="18" fill="#e8f0f6" stroke="#8aa0b4"/><rect x="6" y="7" width="20" height="4" fill="#3a6a9a"/><rect x="9" y="14" width="9" height="2" fill="#9ab4c8"/><rect x="9" y="18" width="13" height="2" fill="#9ab4c8"/><rect x="21" y="13" width="3" height="3" fill="#3a6a9a"/><rect x="12" y="5" width="8" height="2" fill="#6a8aa4"/></svg>`},
  {name:'竹蜻蜓',qty:491,unit:'支',desc:'双手一搓就能飞上天空的古老玩具。',icon:`<svg viewBox="0 0 32 32" ${CRISP}><rect x="3" y="7" width="12" height="3" fill="#7ab848"/><rect x="17" y="7" width="12" height="3" fill="#5a9a34"/><rect x="6" y="10" width="9" height="2" fill="#8fcf5a"/><rect x="17" y="10" width="9" height="2" fill="#6aae3e"/><rect x="14" y="6" width="4" height="5" fill="#6e4a1e"/><rect x="15" y="11" width="2" height="17" fill="#c9a24a"/><rect x="13" y="26" width="6" height="2" fill="#a8843a"/></svg>`},
  {name:'元素碎片',qty:1946,unit:'块',desc:'蕴含元素之力的晶体碎片,合成材料。',icon:`<svg viewBox="0 0 32 32" ${CRISP}><rect x="11" y="5" width="2" height="4" fill="#59d8d0"/><rect x="10" y="9" width="4" height="12" fill="#59d8d0"/><rect x="14" y="12" width="5" height="10" fill="#3ab8b0"/><rect x="7" y="13" width="3" height="9" fill="#7fe8e0"/><rect x="7" y="22" width="13" height="3" fill="#2a8880"/><rect x="21" y="7" width="2" height="2" fill="#ffffff"/><rect x="24" y="10" width="2" height="2" fill="#cdfaf6"/></svg>`},
  {name:'虚空碎片',qty:901,unit:'块',desc:'来自虚空魔窟的暗紫色结晶。',icon:`<svg viewBox="0 0 32 32" ${CRISP}><rect x="13" y="4" width="2" height="3" fill="#c9a0f0"/><rect x="12" y="7" width="4" height="10" fill="#a86ae0"/><rect x="16" y="10" width="5" height="12" fill="#7a3ab8"/><rect x="9" y="12" width="3" height="9" fill="#c9a0f0"/><rect x="8" y="21" width="14" height="3" fill="#4a2470"/><rect x="14" y="8" width="2" height="2" fill="#e8d0ff"/><rect x="23" y="6" width="2" height="2" fill="#c9a0f0"/></svg>`},
  {name:'中级守护灵饲料',qty:126,unit:'个',desc:'守护灵最爱吃的口粮,可提升经验。',icon:`<svg viewBox="0 0 32 32" ${CRISP}><rect x="12" y="7" width="8" height="4" fill="#c9a45a"/><rect x="11" y="10" width="10" height="2" fill="#8a6a30"/><rect x="9" y="12" width="14" height="14" fill="#d9b46a"/><rect x="20" y="12" width="3" height="14" fill="#c9a45a"/><rect x="11" y="26" width="10" height="2" fill="#b8934a"/><rect x="12" y="16" width="8" height="7" fill="#f4e6c8"/><rect x="14" y="18" width="4" height="2" fill="#b06a2e"/><rect x="23" y="24" width="2" height="2" fill="#e8c87a"/><rect x="26" y="26" width="2" height="2" fill="#e8c87a"/></svg>`},
  {name:'神符石',qty:2314,unit:'枚',desc:'刻有古老符文的石片,技能升级材料。',icon:`<svg viewBox="0 0 32 32" ${CRISP}><rect x="8" y="5" width="16" height="21" fill="#98a2ae"/><rect x="8" y="5" width="3" height="21" fill="#b8c0ca"/><rect x="24" y="5" width="2" height="21" fill="#7a8490"/><rect x="13" y="9" width="6" height="2" fill="#f5a524"/><rect x="11" y="13" width="10" height="2" fill="#f5a524"/><rect x="13" y="17" width="6" height="2" fill="#f5a524"/><rect x="11" y="21" width="10" height="2" fill="#d9821a"/><rect x="10" y="26" width="12" height="3" fill="#6a7480"/></svg>`}
];
function renderBag(){
  $('#bag-count').textContent=`携带道具: ${BAG_ITEMS.length} / ${BAG_MAX}`;
  $('#bag-capbar i').style.width=(BAG_ITEMS.length/BAG_MAX*100).toFixed(1)+'%';
  $('#bag-capbar span').textContent=`${BAG_ITEMS.length} / ${BAG_MAX}`;
  $('#bag-list').innerHTML=BAG_ITEMS.map((it,i)=>`
    <div class="bag-row" data-i="${i}">
      <span class="ic" title="${it.desc}">${it.icon}</span>
      <a class="nm" data-i="${i}" title="${it.desc}">${it.name}</a>
      <span class="qt">${it.qty} ${it.unit}</span>
    </div>`).join('');
}
function openBag(){ renderBag();$('#bag-win').classList.remove('min');$('#bag-win').classList.add('show'); }
$('#bag-close').onclick=()=>{$('#bag-win').classList.remove('show');$('#item-detail-win').classList.remove('show')};
$('#bag-min').onclick=()=>$('#bag-win').classList.toggle('min');
$('#bag-refresh').onclick=()=>{ renderBag();toast('背包已刷新喵~ (=^･ω･^=)'); };
$('#bag-exchange').onclick=()=>toast('【兑换猫眼】功能建设中,敬请期待喵~');
let bagCur=null;
function closeBagActions(){
  document.querySelectorAll('.bag-row.active').forEach(row=>row.classList.remove('active'));
  $('#bag-menu').classList.remove('show');
}
function showBagMenu(item,e){ /* 紧贴鼠标右侧弹出；边缘自动翻转 */
  bagCur=item;
  const m=$('#bag-menu');
  m.innerHTML=`<button data-act="desc">说明</button><button data-act="transfer">转让</button><button data-act="drop">丢弃</button><button data-act="show">秀</button>`;
  m.classList.add('show');
  let x=e.clientX+6,y=e.clientY-12;
  if(x+m.offsetWidth>innerWidth-8)x=e.clientX-m.offsetWidth-6;
  if(y+m.offsetHeight>innerHeight-8)y=e.clientY-m.offsetHeight;
  if(y<8)y=8;
  m.style.left=x+'px';m.style.top=y+'px';
}
function showItemDetail(item){
  $('#item-detail-icon').innerHTML=item.icon;
  $('#item-detail-name').textContent=item.name;
  $('#item-detail-desc').textContent=item.desc;
  $('#item-detail-win').classList.add('show');
}
function bagAction(act,item){
  if(act==='desc')showItemDetail(item);
  else if(act==='transfer')toast(`转让【${item.name}】（功能预留）`);
  else if(act==='drop')toast(`丢弃【${item.name}】（功能预留）`);
  else if(act==='show')addDrop(`<span class="pn b">喵小游</span> 向大家展示了 <span class="it">${item.name}</span>`);
}
$('#bag-list').addEventListener('click',e=>{
  if(e.target.closest('#bag-menu'))return;
  const row=e.target.closest('.bag-row');if(!row)return;
  const active=row.classList.contains('active');
  closeBagActions();
  if(!active){row.classList.add('active');showBagMenu(BAG_ITEMS[+row.dataset.i],e);}
});
$('#bag-menu').addEventListener('click',e=>{
  const btn=e.target.closest('button');if(!btn)return;
  e.stopPropagation();
  if(bagCur)bagAction(btn.dataset.act,bagCur);
  closeBagActions();
});
document.addEventListener('click',e=>{if(!e.target.closest('#bag-list')&&!e.target.closest('#bag-menu'))closeBagActions()});
$('#item-detail-close').onclick=()=>$('#item-detail-win').classList.remove('show');
/* 背包窗口拖动(限制在游戏窗口内) */
(function(){
  const win=$('#bag-win'),title=win.querySelector('.bag-title');
  let drag=null;
  title.addEventListener('mousedown',e=>{
    if(e.target.closest('.win-btn'))return;
    const r=win.getBoundingClientRect(),g=$('#game').getBoundingClientRect();
    drag={dx:e.clientX-r.left,dy:e.clientY-r.top,g:g};
    e.preventDefault();
  });
  document.addEventListener('mousemove',e=>{
    if(!drag)return;
    let x=e.clientX-drag.g.left-drag.dx,y=e.clientY-drag.g.top-drag.dy;
    x=Math.max(0,Math.min(drag.g.width-win.offsetWidth,x));
    y=Math.max(0,Math.min(drag.g.height-win.offsetHeight,y));
    win.style.left=x+'px';win.style.top=y+'px';
  });
  document.addEventListener('mouseup',()=>drag=null);
})();

/* ---------- 任务列表 ---------- */
const QUESTS=[
  {region:'拖把城',tasks:[
    {lv:45,name:'寻找还猪哥哥',done:'1/1',desc:'在拖把城周边打听还猪哥哥的下落,他已经失踪三天了。'},
    {lv:10,name:'银月帝国宝石交易',desc:'帮银月帝国的商人护送一批宝石,酬劳丰厚,小心劫匪。'}
  ]},
  {region:'镖局',tasks:[
    {lv:15,name:'护镖(to 雪原城)',desc:'接受镖局的委托,护送镖车前往雪原城,路上不太平。'},
    {lv:20,name:'需求原料',desc:'镖局铁匠需要 20 块雪狼皮修理护具,收集后交给他。'}
  ]},
  {region:'猫隐村 猫隐广场',tasks:[
    {lv:1,name:'捕捉试验',desc:'在猫隐广场协助捕兽人完成一次捕捉试验。'}
  ]},
  {region:'猫隐村',tasks:[
    {lv:1,name:'帝国需要你的帮助',desc:'帝国正在招募新兵,去军营报到,开始你的冒险吧!'}
  ]}
];
function renderQuests(){
  $('#q-body').innerHTML=QUESTS.map(g=>`
    <div class="q-group">
      <div class="q-ghead" title="点击折叠/展开"><span class="tri"></span><b>${g.region}</b></div>
      ${g.tasks.map(t=>`
        <div class="q-task${t.done?' done':''}" title="${t.desc}">
          <span class="lv">[${t.lv}]</span>
          <span class="nm">${t.name}</span>
          ${t.done?`<span class="done-suffix">（完成: ${t.done}）</span>`:''}
        </div>`).join('')}
    </div>`).join('');
}
function openQuest(){ renderQuests();$('#quest-win').classList.remove('min');$('#quest-win').classList.add('show'); }
$('#q-close').onclick=()=>$('#quest-win').classList.remove('show');
$('#q-min').onclick=()=>$('#quest-win').classList.toggle('min');
$('#q-avail').onclick=()=>toast('可接任务列表建设中,敬请期待喵~ (=^･ω･^=)');
$('#q-body').addEventListener('click',e=>{
  const ghead=e.target.closest('.q-ghead');
  if(ghead){ ghead.parentElement.classList.toggle('closed');return; }
  const task=e.target.closest('.q-task');
  if(task&&!task.classList.contains('done'))toast(task.title);
});
/* 任务窗口拖动 */
(function(){
  const win=$('#quest-win'),head=win.querySelector('.q-head');
  let drag=null;
  head.addEventListener('mousedown',e=>{
    if(e.target.closest('.win-btn')||e.target.closest('.q-avail'))return;
    const r=win.getBoundingClientRect(),g=$('#game').getBoundingClientRect();
    drag={dx:e.clientX-r.left,dy:e.clientY-r.top,g:g};
    e.preventDefault();
  });
  document.addEventListener('mousemove',e=>{
    if(!drag)return;
    let x=e.clientX-drag.g.left-drag.dx,y=e.clientY-drag.g.top-drag.dy;
    x=Math.max(0,Math.min(drag.g.width-win.offsetWidth,x));
    y=Math.max(0,Math.min(drag.g.height-win.offsetHeight,y));
    win.style.left=x+'px';win.style.top=y+'px';
  });
  document.addEventListener('mouseup',()=>drag=null);
})();

/* ---------- 公会信息 ---------- */
const GUILD_NAME='傲世喵盟';
const GUILD_MEMBERS=[
  {n:'多多动物园',lv:70,pos:'会长',cls:'nm-org'},
  {n:'不是不想一直很安静',lv:99,pos:'管理员',cls:'nm-org'},
  {n:'独孤求败',lv:95,pos:'管理员',cls:'nm-org'},
  {n:'Klay',lv:71,pos:'会员',cls:'nm-me'},
  {n:'Caesar',lv:71,pos:'会员',cls:'nm-blk'},
  {n:'『暗影狼』',lv:89,pos:'会员',cls:'nm-blk'},
  {n:'战神刑天',lv:85,pos:'会员',cls:'nm-blk'},
  {n:'一剑霜寒',lv:82,pos:'会员',cls:'nm-blk'},
  {n:'月落乌啼',lv:80,pos:'会员',cls:'nm-blk'},
  {n:'岁月如歌',lv:78,pos:'会员',cls:'nm-blk'},
  {n:'夺命归来',lv:77,pos:'会员',cls:'nm-blk'},
  {n:'花涯狠走天涯',lv:75,pos:'会员',cls:'nm-blk'},
  {n:'大橘为重',lv:74,pos:'会员',cls:'nm-blk'},
  {n:'咸鱼翻身',lv:73,pos:'会员',cls:'nm-blk'},
  {n:'猫爪轻轻',lv:72,pos:'会员',cls:'nm-blk'},
  {n:'雪原之狐',lv:71,pos:'会员',cls:'nm-blk'},
  {n:'挞天涯',lv:69,pos:'会员',cls:'nm-blk'},
  {n:'叙石',lv:66,pos:'会员',cls:'nm-blk'},
  {n:'小寡妇',lv:63,pos:'会员',cls:'nm-blk'},
  {n:'吴子颜',lv:60,pos:'会员',cls:'nm-blk'}
];
const GUILD_OFFLINE=[
  {n:'那里…不可以',lv:88,pos:'会员',cls:'nm-blk'},
  {n:'许我财经',lv:76,pos:'会员',cls:'nm-blk'},
  {n:'鲤鱼王本王',lv:64,pos:'会员',cls:'nm-blk'},
  {n:'夜半歌声',lv:58,pos:'会员',cls:'nm-blk'}
];
let guildShowOffline=false;
function renderGuild(){
  const rows=guildShowOffline?GUILD_MEMBERS.concat(GUILD_OFFLINE.map(m=>({...m,off:true}))):GUILD_MEMBERS;
  $('#g-list').innerHTML=rows.map((m,i)=>`
    <div class="g-member${m.off?' off':''}" data-i="${m.off?20+GUILD_OFFLINE.findIndex(o=>o.n===m.n):i}" data-off="${m.off?1:0}">
      <span class="mn ${m.cls}">${m.n}</span>
      <span class="mlv">Lv.${m.lv}</span>
      <span class="mpos">${m.pos}</span>
    </div>`).join('');
  $('#g-off-toggle').textContent=guildShowOffline?'[隐藏离线]':'[显示离线]';
}
function openGuild(){ renderGuild();$('#guild-win').classList.remove('min');$('#guild-win').classList.add('show'); }
$('#g-close').onclick=()=>$('#guild-win').classList.remove('show');
$('#g-min').onclick=()=>$('#guild-win').classList.toggle('min');
$('#g-refresh').onclick=()=>{ renderGuild();toast('公会信息已刷新喵~ (=^･ω･^=)'); };
$('#g-leave').onclick=()=>toast('离开公会将失去城战奖励,确定要离开吗喵?(建设中)');
$('#g-self').onclick=()=>toast('这就是你自己喵~');
$('#g-off-toggle').onclick=()=>{ guildShowOffline=!guildShowOffline;renderGuild(); };
document.querySelectorAll('.g-nav a').forEach(a=>a.onclick=()=>{
  if(a.textContent==='[信息]')return;
  toast(`公会${a.textContent}页面建设中,敬请期待喵~`);
});
$('#g-list').addEventListener('click',e=>{
  const row=e.target.closest('.g-member');if(!row)return;
  if(row.dataset.off==='1')return;
  const m=GUILD_MEMBERS[+row.dataset.i];if(!m)return;
  if(m.cls==='nm-me'){ toast('这就是你自己喵~');return; }
  openPlayer({name:m.n,lv:m.lv,job:m.pos,guild:GUILD_NAME,cell:pad(rnd(0,29)),gear:'猫爪匕首 +7 · 水晶腰带 +5'});
});
/* 公会窗口拖动 */
(function(){
  const win=$('#guild-win'),head=win.querySelector('.g-head');
  let drag=null;
  head.addEventListener('mousedown',e=>{
    if(e.target.closest('a')||e.target.closest('.win-btn'))return;
    const r=win.getBoundingClientRect(),g=$('#game').getBoundingClientRect();
    drag={dx:e.clientX-r.left,dy:e.clientY-r.top,g:g};
    e.preventDefault();
  });
  document.addEventListener('mousemove',e=>{
    if(!drag)return;
    let x=e.clientX-drag.g.left-drag.dx,y=e.clientY-drag.g.top-drag.dy;
    x=Math.max(0,Math.min(drag.g.width-win.offsetWidth,x));
    y=Math.max(0,Math.min(drag.g.height-win.offsetHeight,y));
    win.style.left=x+'px';win.style.top=y+'px';
  });
  document.addEventListener('mouseup',()=>drag=null);
})();

/* ---------- 好友栏 ---------- */
const FRIENDS=[
  {n:'漩旋蘋貝',favor:0},
  {n:'☆黑白猪★',favor:0},
  {n:'IMS杰克',favor:0},
  {n:'肖丶自在',favor:0}
];
const FRIEND_DEEDS=[
  '刚刚在银光森林击败了 BOSS 火魂,爆出了虚空宝石!',
  '把猫爪匕首强化到了 +9,今天是欧皇附体的一天。',
  '在跳蚤市场淘到了一张练功房门卡,笑得合不拢嘴。',
  '公会城战中一马当先,拿下了三座箭塔。'
];
function renderFriends(){
  $('#f-body').innerHTML=`<table>
    <tr><th>好友</th><th>事迹</th><th>好感度</th></tr>
    ${FRIENDS.map((f,i)=>`
      <tr>
        <td class="fname" data-i="${i}" title="点击查看好友信息">${f.n}</td>
        <td><span class="deed" data-i="${i}">[事迹]</span></td>
        <td class="favor">${f.favor}</td>
      </tr>`).join('')}
  </table>`;
}
function openFriends(){ renderFriends();$('#friend-win').classList.remove('min');$('#friend-win').classList.add('show'); }
$('#f-close').onclick=()=>$('#friend-win').classList.remove('show');
$('#f-min').onclick=()=>$('#friend-win').classList.toggle('min');
$('#f-deeds').onclick=()=>toast('好友事迹汇总页面建设中,敬请期待喵~');
$('#f-add').onclick=()=>toast('输入对方名字即可发送好友申请喵~(建设中)');
$('#f-chat').onclick=()=>toast('与 JR 的私聊窗口建设中喵~');
$('#f-blk-blue').onchange=e=>toast(e.target.checked?'已屏蔽爆蓝消息':'已恢复爆蓝消息');
$('#f-blk-up').onchange=e=>toast(e.target.checked?'已屏蔽升级消息':'已恢复升级消息');
$('#f-body').addEventListener('click',e=>{
  const deed=e.target.closest('.deed');
  if(deed){ toast(`${FRIENDS[+deed.dataset.i].n} ${FRIEND_DEEDS[+deed.dataset.i]}`);return; }
  const fn=e.target.closest('.fname');
  if(fn){
    const f=FRIENDS[+fn.dataset.i];
    openPlayer({name:f.n,lv:rnd(62,80),job:'剑士',guild:GUILD_NAME,cell:pad(rnd(0,29)),gear:'猫爪匕首 +6 · 水晶腰带 +4'});
  }
});
/* 好友窗口拖动 */
(function(){
  const win=$('#friend-win'),head=win.querySelector('.f-head');
  let drag=null;
  head.addEventListener('mousedown',e=>{
    if(e.target.closest('a')||e.target.closest('.win-btn'))return;
    const r=win.getBoundingClientRect(),g=$('#game').getBoundingClientRect();
    drag={dx:e.clientX-r.left,dy:e.clientY-r.top,g:g};
    e.preventDefault();
  });
  document.addEventListener('mousemove',e=>{
    if(!drag)return;
    let x=e.clientX-drag.g.left-drag.dx,y=e.clientY-drag.g.top-drag.dy;
    x=Math.max(0,Math.min(drag.g.width-win.offsetWidth,x));
    y=Math.max(0,Math.min(drag.g.height-win.offsetHeight,y));
    win.style.left=x+'px';win.style.top=y+'px';
  });
  document.addEventListener('mouseup',()=>drag=null);
})();

/* ---------- 队伍列表 ---------- */
const TEAM_MEMBERS=[]; /* 预留:加入队伍后填充,如 {name:'Klay', lv:71, leader:true} */
function renderTeam(){
  const body=$('#t-body');
  if(!TEAM_MEMBERS.length){
    body.innerHTML=`<div class="t-empty">目前并未在任何队伍中</div>`;
    return;
  }
  body.innerHTML=TEAM_MEMBERS.map((m,i)=>`
    <div class="t-member">
      <span class="tn" data-i="${i}" title="点击查看队员信息">${m.name}${m.leader?` <b>[队长]</b>`:''}</span>
      <span class="tlv">Lv.${m.lv}</span>
      <a class="t-view" data-i="${i}">[查看]</a>
      ${m.leader?'':`<a class="t-kick" data-i="${i}">[请离]</a>`}
    </div>`).join('');
}
function openTeam(){ renderTeam();$('#team-win').classList.remove('min');$('#team-win').classList.add('show'); }
$('#t-close').onclick=()=>$('#team-win').classList.remove('show');
$('#t-min').onclick=()=>$('#team-win').classList.toggle('min');
$('#t-boss').onclick=()=>toast('Boss 伤害统计页面建设中,敬请期待喵~');
$('#t-invite').onclick=()=>toast('你目前没有队伍,先创建或加入一支再邀请好友喵~');
$('#t-quit').onclick=()=>toast('你目前并未在任何队伍中喵~');
$('#t-body').addEventListener('click',e=>{
  const view=e.target.closest('.t-view'),kick=e.target.closest('.t-kick'),tn=e.target.closest('.tn');
  if(view||tn){
    const m=TEAM_MEMBERS[+((view||tn).dataset.i)];if(!m)return;
    openPlayer({name:m.name,lv:m.lv,job:'剑士',guild:GUILD_NAME,cell:pad(rnd(0,29)),gear:'猫爪匕首 +6 · 水晶腰带 +4'});
  } else if(kick){
    const m=TEAM_MEMBERS[+kick.dataset.i];
    toast(`已将 ${m.name} 请离队伍(演示)`);
    TEAM_MEMBERS.splice(+kick.dataset.i,1);
    renderTeam();
  }
});
/* 队伍窗口拖动 */
(function(){
  const win=$('#team-win'),head=win.querySelector('.t-head');
  let drag=null;
  head.addEventListener('mousedown',e=>{
    if(e.target.closest('a')||e.target.closest('.win-btn'))return;
    const r=win.getBoundingClientRect(),g=$('#game').getBoundingClientRect();
    drag={dx:e.clientX-r.left,dy:e.clientY-r.top,g:g};
    e.preventDefault();
  });
  document.addEventListener('mousemove',e=>{
    if(!drag)return;
    let x=e.clientX-drag.g.left-drag.dx,y=e.clientY-drag.g.top-drag.dy;
    x=Math.max(0,Math.min(drag.g.width-win.offsetWidth,x));
    y=Math.max(0,Math.min(drag.g.height-win.offsetHeight,y));
    win.style.left=x+'px';win.style.top=y+'px';
  });
  document.addEventListener('mouseup',()=>drag=null);
})();

/* ---------- 宠物栏·装备列表（自 prototype/宠物面板示例.html 迁移） ---------- */
const PET_ICO={
  amulet1:'<svg width="31" height="31" viewBox="0 0 30 30"><rect x="1.5" y="1.5" width="27" height="27" rx="3" fill="#F6C400" stroke="#6A5A00"/><rect x="4.5" y="4.5" width="9.5" height="9.5" rx="2.5" fill="#C4788E" stroke="#7E3E56"/><rect x="16" y="4.5" width="9.5" height="9.5" rx="2.5" fill="#B86A82" stroke="#7E3E56"/><rect x="4.5" y="16" width="9.5" height="9.5" rx="2.5" fill="#B86A82" stroke="#7E3E56"/><rect x="16" y="16" width="9.5" height="9.5" rx="2.5" fill="#AC5E78" stroke="#7E3E56"/><circle cx="7" cy="7" r="1" fill="#F2D8E0"/><circle cx="19" cy="7" r="1" fill="#F2D8E0"/><circle cx="7" cy="19" r="1" fill="#F2D8E0"/><circle cx="19" cy="19" r="1" fill="#F2D8E0"/><rect x="13.5" y="27" width="3" height="2.5" fill="#3A3020"/></svg>',
  amulet2:'<svg width="31" height="31" viewBox="0 0 30 30"><path d="M15 1.5 L27.5 5.5 V15 Q27.5 24.5 15 28.5 Q2.5 24.5 2.5 15 V5.5 Z" fill="#8E2430" stroke="#D8B830" stroke-width="1.6"/><circle cx="15" cy="7" r="3" fill="#E23448" stroke="#F2D060"/><path d="M7 20 V13 Q7 10.5 9.25 10.5 Q11.5 10.5 11.5 13 V20 Q9.25 21 7 20 Z" fill="#C05060" stroke="#F2D060" stroke-width=".8"/><path d="M23 20 V13 Q23 10.5 20.75 10.5 Q18.5 10.5 18.5 13 V20 Q20.75 21 23 20 Z" fill="#C05060" stroke="#F2D060" stroke-width=".8"/></svg>',
  hammer:'<svg width="31" height="31" viewBox="0 0 30 30"><rect x="10.8" y="4" width="3.8" height="25" rx="1.9" transform="rotate(-40 12.7 16.5)" fill="#9A6632" stroke="#54350F"/><path d="M9 8 Q16 0.5 27.5 4 Q26.5 12.5 17.5 15.5 Q11.5 13.5 9 8 Z" fill="#EFC832" stroke="#8A6A10" stroke-width="1.2"/><path d="M11 8 Q16.5 2.5 25.5 5" fill="none" stroke="#FFF0A0" stroke-width="1.2"/></svg>',
  needle:'<svg width="31" height="31" viewBox="0 0 30 30"><rect x="13.4" y="2" width="3.2" height="24" rx="1.6" transform="rotate(35 15 14)" fill="#3E4854" stroke="#171D26"/><rect x="14" y="4" width="1" height="20" transform="rotate(35 15 14)" fill="#9FB4C8"/><rect x="9" y="22.5" width="6" height="2.4" rx="1" transform="rotate(35 12 23.7)" fill="#2A3038"/><circle cx="7" cy="25.5" r="2.2" fill="#D06898"/></svg>',
  orb:'<span class="ic-orb"></span>',
  ph:'<span class="ph"></span>'
};
const PET_EQS=[
  ['强效拦截者护符','p','护符','amulet1'],
  ['强效暗杀者护符','p','护符','amulet2'],
  ['魔法之泉(Lv4)','b','治愈之力','orb'],
  ['魔法之泉(Lv4)','b','治愈之力','orb'],
  ['鬼斧神工','b','鬼斧神工','hammer'],
  ['暴雨梨花针','p','暗器','needle'],
  ['万象图','p','万象图'],['朗基努斯枪','b','圣之赐'],['昆仑镜','w','法宝'],
  ['八卦神符','p','神符'],['斥候披风','p','背'],['堕落之伤','p','颈'],
  ['水鱼龙','p','召唤兽'],['强效剑圣护符','p','护符'],['魂器','p','命格'],
  ['闪光指环','p','手指'],['战神魔轮','p','魔轮'],['碧空指环','p','手指'],
  ['Mophone','b','手机'],['打工护符','p','护符'],['基因改造射线','p','饰品'],
  ['铁拳火箭炮','p','饰品'],['携带版破甲炮','p','饰品'],['复制人手套','p','饰品'],
  ['恶魔翼灵','p','翼灵'],['普通的盖亚护手','p','手套'],['精致的拯救肩铠','p','肩'],
  ['良好的盖亚护臂','p','腕'],['良好的拯救腰带','p','腰'],['元神·六合纵横','p','元神'],
  ['元素罗盘','b','元素'],['燃烧宝石','p','燃烧宝石'],['星月神话','b','星月神话'],
  ['命运女神','b','命运女神'],['水晶球','p','水晶球'],['守护之星(战士)','p','守护之星'],
  ['霸者之核','p','霸者之核'],['英雄徽记','b','徽记'],['催化神石','p','催化神石'],
  ['和谐圣杯Lv9','p','圣杯'],['轮舞之剑','p','左手,右手'],['融合而成的青龙','p','坐骑'],
  ['完美的骑士缰绳','p','骑士缰绳'],['完美的沙花守甲','p','沙花守甲'],['完美的蹄铁','p','蹄铁'],
  ['完美的马鞍','p','马鞍'],['完美的面具','p','面具'],['替身胸甲','b','替身胸部'],
  ['替身腿甲','b','替身腿部'],['替身头盔','b','替身头部'],
];
function renderPet(){
  $('#pet-cnt').textContent=`装备 ${PET_EQS.length} 件`;
  $('#pet-eqs').innerHTML=PET_EQS.map(([n,q,slot,ic])=>`
    <tr><td class="ic">${PET_ICO[ic||'ph']}</td><td class="nm"><a class="q-${q}">${n}</a><span class="pislot">(${slot})</span></td><td class="ops"><span class="b-repair" title="修理"></span><span class="b-swap" title="放入快捷栏"></span></td></tr>`).join('');
}
function openPet(){ renderPet();$('#pet-win').classList.remove('min');$('#pet-win').classList.add('show'); }
$('#pet-close').onclick=()=>$('#pet-win').classList.remove('show');
$('#pet-min').onclick=()=>$('#pet-win').classList.toggle('min');
$('#pet-eqs').addEventListener('click',e=>{
  const nm=e.target.closest('.nm a');
  if(nm)toast(`${nm.textContent}（装备操作功能预留）`);
});
/* 宠物窗口拖动 */
(function(){
  const win=$('#pet-win'),head=win.querySelector('.pet-head');
  let drag=null;
  head.addEventListener('mousedown',e=>{
    if(e.target.closest('.win-btn'))return;
    const r=win.getBoundingClientRect(),g=$('#game').getBoundingClientRect();
    drag={dx:e.clientX-r.left,dy:e.clientY-r.top,g:g};
    e.preventDefault();
  });
  document.addEventListener('mousemove',e=>{
    if(!drag)return;
    let x=e.clientX-drag.g.left-drag.dx,y=e.clientY-drag.g.top-drag.dy;
    x=Math.max(0,Math.min(drag.g.width-win.offsetWidth,x));
    y=Math.max(0,Math.min(drag.g.height-win.offsetHeight,y));
    win.style.left=x+'px';win.style.top=y+'px';
  });
  document.addEventListener('mouseup',()=>drag=null);
})();

/* 顶部导航与工具按钮 */
$('#menus').addEventListener('click',e=>{
  const a=e.target.closest('a');if(a)toast(`【${a.textContent}】功能建设中～`);
});
$('#btn-refresh').onclick=()=>{toast('断线刷新成功，与服务器重新同步完毕！');addChat('【系统】断线刷新成功。')};
$('#btn-worldmap').onclick=()=>toast('世界地图（功能预留）');

/* ==========================================================
   ⑦ 窗口/面板大小调整
   ========================================================== */
/* 浮动窗口：右下角手柄拖动调整宽高（最小化时手柄隐藏） */
function makeResizable(win,minW,minH){
  const h=document.createElement('i');h.className='win-rsz';h.title='拖动调整窗口大小';
  win.appendChild(h);
  let st=null;
  h.addEventListener('mousedown',e=>{
    e.preventDefault();e.stopPropagation();
    const g=win.offsetParent.getBoundingClientRect(),r=win.getBoundingClientRect();
    st={x:e.clientX,y:e.clientY,w:r.width,h:r.height,l:r.left,t:r.top,g};
  });
  document.addEventListener('mousemove',e=>{
    if(!st)return;
    const w=Math.round(Math.max(minW,Math.min(st.g.right-st.l,st.w+e.clientX-st.x)));
    const hh=Math.round(Math.max(minH,Math.min(st.g.bottom-st.t,st.h+e.clientY-st.y)));
    win.style.width=w+'px';win.style.height=hh+'px';
  });
  document.addEventListener('mouseup',()=>st=null);
}
makeResizable($('#bag-win'),300,240);
makeResizable($('#quest-win'),280,200);
makeResizable($('#guild-win'),420,240);
makeResizable($('#friend-win'),360,220);
makeResizable($('#team-win'),360,200);
makeResizable($('#pet-win'),400,240);

/* 停靠面板：顶缘分隔条上下拖动，上方面板自动吸收剩余高度 */
function makeDockResizable(bottomEl,minH,topMinH,after){
  const h=document.createElement('i');h.className='dock-rsz';h.title='拖动调整面板高度';
  bottomEl.appendChild(h);
  let st=null;
  h.addEventListener('mousedown',e=>{
    e.preventDefault();
    const col=bottomEl.parentElement.getBoundingClientRect(),r=bottomEl.getBoundingClientRect();
    st={y:e.clientY,h:r.height,col};
    const top=bottomEl.previousElementSibling;
    if(top){top.style.flex='1 1 0';top.style.aspectRatio='auto';}
  });
  document.addEventListener('mousemove',e=>{
    if(!st)return;
    const nh=Math.round(Math.max(minH,Math.min(st.col.height-topMinH-4,st.h+st.y-e.clientY)));
    bottomEl.style.flex='none';bottomEl.style.height=nh+'px';
    if(after)after();
  });
  document.addEventListener('mouseup',()=>st=null);
}
makeDockResizable($('#chatlog'),120,160,fitMap);      /* 场景 / 聊天记录 */
makeDockResizable($('#panel-players'),100,120);       /* NPC列表 / 同地图玩家 */
makeDockResizable($('#panel-private'),100,120);       /* 世界消息 / 私人信息 */

fitMap();renderCells();setLoc(cur);
