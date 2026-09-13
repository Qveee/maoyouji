# 宠物栏示例3青铜浮雕风 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 将 `prototype/宠物栏示例3-Q版卡通风.html` 从暖木/Q 版视觉改为「深木 + 青铜浮雕」的老 MMO 风格，同时保留全部现有交互。

**Architecture:** 这是一个单文件 HTML 原型，视觉集中在 `<style>` 和内联宠物 SVG；数据与交互集中在底部原生 JavaScript。实施时只替换视觉 token、相关选择器、标题文案和宠物立绘，不改装备数据、属性公式或事件逻辑。

**Tech Stack:** HTML5、CSS3、内联 SVG、原生 JavaScript；无构建步骤、无外部依赖。

---

### Task 1: 建立青铜浮雕视觉基调

**Files:**
- Modify: `prototype/宠物栏示例3-Q版卡通风.html`

- [ ] **Step 1: 替换设计 token、页面氛围和窗口壳**

将 `<title>` 改为：

```html
<title>猫游记 · 宠物栏（示例3 · 青铜浮雕风）</title>
```

将 `:root` 整块替换为：

```css
:root{
  --panel:#251c13;
  --panel-2:#17110a;
  --panel-3:#20180f;
  --paper:#1d150d;
  --ink:#d9c698;
  --ink-2:#a58f61;
  --line:#7d5f30;
  --line-deep:#4a3618;
  --gold:#e5c778;
  --gold-dim:#a58f61;
  --hover:#3a2b18;
  --mut:#8d754d;
  --dash:#57431f;
  --r-gray:#9b948a; --r-green:#6f9a6d; --r-blue:#6f89ad;
  --r-purple:#9177ab; --r-orange:#c2864b;
  --hp1:#8ebf70; --hp2:#4b7c42;
  --mp1:#88b7d7; --mp2:#446c8c;
  --hei:"SimHei","Microsoft YaHei",sans-serif;
  --song:"SimSun","NSimSun",serif;
}
```

将 `body`、`body::before`、`body::after`、`#cap`、`#win`、`#tbar`、`#close` 的视觉属块替换为：

```css
body{
  min-height:100vh;
  display:flex;align-items:center;justify-content:center;
  padding:34px 20px;
  font:12px/1.6 var(--song);
  color:var(--ink);
  background:radial-gradient(1100px 640px at 50% 40%,#312415 0%,#1d150c 52%,#0b0805 100%);
  overflow:auto;
}
body::before{
  content:'';position:fixed;inset:0;pointer-events:none;
  background:
    radial-gradient(circle at 18% 16%,rgba(229,199,120,.055),transparent 34%),
    radial-gradient(circle at 84% 24%,rgba(125,95,48,.075),transparent 38%);
}
body::after{
  content:'';position:fixed;inset:0;pointer-events:none;
  background:radial-gradient(ellipse at 50% 44%,rgba(0,0,0,0) 48%,rgba(0,0,0,.68) 100%);
}
#cap{
  position:fixed;top:16px;left:20px;z-index:2;
  font-size:12px;color:rgba(217,198,152,.52);letter-spacing:1px;
}
#win{
  position:relative;z-index:5;
  width:664px;
  background:linear-gradient(180deg,var(--panel),var(--panel-2) 72%,#120d07);
  border:1px solid var(--line);
  border-radius:4px;
  box-shadow:0 0 0 1px #0a0704,inset 0 1px 0 rgba(229,199,120,.12),
             inset 0 0 0 1px rgba(125,95,48,.42),0 26px 62px rgba(0,0,0,.68),
             0 5px 12px rgba(0,0,0,.5);
  animation:winin .4s cubic-bezier(.3,1.1,.5,1) backwards;
}
#tbar{
  height:40px;display:flex;align-items:center;gap:9px;padding:0 10px 0 14px;
  background:linear-gradient(180deg,#5b421f 0%,#3b2a12 52%,#2a1d0c 100%);
  box-shadow:inset 0 1px 0 rgba(229,199,120,.24),inset 0 -1px 0 rgba(0,0,0,.72);
  border-bottom:1px solid var(--line);
  border-radius:3px 3px 0 0;
  cursor:move;user-select:none;touch-action:none;
}
#tbar h1{
  font:bold 15px/1 var(--hei);color:var(--gold);letter-spacing:3px;
  text-shadow:0 1px 1px rgba(0,0,0,.8);
}
#close{
  margin-left:auto;width:22px;height:22px;flex:none;
  border-radius:2px;border:1px solid #61431f;
  background:linear-gradient(180deg,#4b361a,#241809);
  color:#dcc291;font:bold 13px/1 Verdana;cursor:pointer;
  display:flex;align-items:center;justify-content:center;
  transition:filter .15s,border-color .15s;
}
#close:hover{filter:brightness(1.35);border-color:var(--gold)}
```

保留 `@keyframes winin`、拖动相关 JavaScript 和窗口结构。

- [ ] **Step 2: 更新页面说明**

将 `#cap` 文案替换为：

```html
<div id="cap">《猫游记》宠物栏原型 · 示例3 青铜浮雕风 —— 可拖动窗口 · 点击装备格穿 / 卸</div>
```

---

### Task 2: 重塑装备格、属性区与浮层

**Files:**
- Modify: `prototype/宠物栏示例3-Q版卡通风.html`

- [ ] **Step 1: 替换装备格与稀有度视觉**

将 `.slot` 相关规则替换为：

```css
.slot{
  position:relative;width:58px;height:58px;
  display:flex;flex-direction:column;align-items:center;justify-content:center;
  background:linear-gradient(180deg,#100c07,#231a10 58%,#171009);
  border:1px solid #61431f;border-radius:2px;
  box-shadow:inset 0 3px 6px rgba(0,0,0,.72),inset 0 -1px 0 rgba(229,199,120,.08),
             0 1px 0 rgba(125,95,48,.16);
  cursor:pointer;transition:border-color .15s,box-shadow .15s,filter .15s;
}
.slot:hover{
  border-color:var(--gold-dim);filter:brightness(1.14);
  box-shadow:inset 0 3px 6px rgba(0,0,0,.72),0 0 8px rgba(229,199,120,.13);
}
.slot .ic{width:28px;height:28px;margin-bottom:1px}
.slot .ic path,.slot .ic rect,.slot .ic circle,.slot .ic ellipse,.slot .ic line{stroke:#d9c698}
.slot .ic [stroke="none"]{stroke:none}
.slot .part{font-size:9px;line-height:1.2;color:#a58f61;letter-spacing:1px}
.slot .glyph{font:bold 15px/1.2 var(--hei);color:#6d5936}
.slot.empty{border-style:dashed;border-color:#4b381d}
.slot.empty .part{color:#7d673e}
.slot .plus{
  position:absolute;top:-6px;right:-6px;min-width:17px;height:14px;padding:0 4px;
  background:linear-gradient(180deg,#62774d,#3d4e30);color:#f0e5c5;
  font:bold 9px/11px Verdana;text-shadow:0 1px 1px rgba(0,0,0,.72);
  border:1px solid #2b3820;border-radius:2px;
  display:flex;align-items:center;justify-content:center;
}
```

在 JavaScript 中确认装备格仍然通过 `RARITY[it.rarity].c` 设置 `borderColor` 与 `boxShadow`，不修改该逻辑；若需要调整，只把原内阴影保留为：

```javascript
d.style.boxShadow = `inset 0 3px 6px rgba(0,0,0,.72), 0 0 8px ${r.c}44`;
```

- [ ] **Step 2: 替换信息区、条形与浮层**

将 `#mhead`、`#pet-name`、`#lvtag`、`.sub`、`.bar`、`.sec`、`.stat`、`#tip`、`.pop`、`#reopen` 的视觉规则替换为：

```css
#mhead{
  display:flex;align-items:center;gap:20px;padding:12px 20px 10px;
  border-bottom:1px solid var(--line-deep);
  background:linear-gradient(180deg,rgba(229,199,120,.05),rgba(0,0,0,.12));
}
#pet-name{font:bold 21px/1.2 var(--hei);letter-spacing:2px;color:var(--gold)}
#lvtag{
  font:bold 11px/1 Verdana;padding:2px 6px;border-radius:2px;
  border:1px solid #8a6a2d;color:#f2dfae;
  background:linear-gradient(180deg,#6d5024,#3a2911);
  text-shadow:0 1px 1px rgba(0,0,0,.78);
}
.sub{font-size:12px;color:var(--ink-2);letter-spacing:1px}
.bar{
  height:12px;border:1px solid #6b4f26;border-radius:2px;
  background:#0f0b06;overflow:hidden;
  box-shadow:inset 0 2px 4px rgba(0,0,0,.72),inset 0 -1px 0 rgba(229,199,120,.07);
}
.bar i{
  display:block;height:100%;
  box-shadow:inset 0 1px 0 rgba(255,246,214,.24);
  transition:width .45s ease-out;
}
.bar.exp i{background:linear-gradient(90deg,#8a622b,#e5c778)}
.bar.hp i{background:linear-gradient(90deg,var(--hp1),var(--hp2))}
.bar.mp i{background:linear-gradient(90deg,var(--mp1),var(--mp2))}
.sec{
  display:flex;align-items:center;gap:7px;
  font:bold 13px/1 var(--hei);color:var(--gold);letter-spacing:2px;
  margin:15px 0 6px;
}
.sec::before{content:'◆';font-size:9px;color:#b98d43}
.sec::after{content:'';flex:1;border-top:1px dashed var(--dash);margin-left:5px}
.stat{
  display:flex;justify-content:space-between;align-items:baseline;
  padding:4px 2px;border-bottom:1px dashed #443217;font-size:12px;
}
.stat .lab{color:var(--ink-2);display:flex;align-items:center;gap:6px}
.stat b{font:bold 13px Verdana;color:var(--ink)}
#tip{
  position:fixed;z-index:90;display:none;pointer-events:none;
  min-width:150px;max-width:225px;padding:8px 12px 9px;
  background:rgba(18,13,7,.97);
  border:1px solid #7d5f30;border-radius:3px;
  box-shadow:0 0 0 1px #0a0704,0 10px 24px rgba(0,0,0,.68);
}
.pop{
  position:fixed;z-index:95;display:none;min-width:196px;max-width:250px;
  padding:7px;background:linear-gradient(180deg,#231a10,#17110a);
  border:1px solid #7d5f30;border-radius:3px;
  box-shadow:0 0 0 1px #0a0704,0 14px 30px rgba(0,0,0,.66);
  animation:popin .16s ease-out;
}
.pk-row:hover{background:#31240f}
#reopen{
  position:fixed;left:50%;bottom:36px;transform:translateX(-50%);z-index:8;
  display:none;align-items:center;gap:8px;
  padding:9px 20px;border-radius:2px;cursor:pointer;
  background:linear-gradient(180deg,#5b421f,#2a1d0c);
  border:1px solid #7d5f30;box-shadow:0 0 0 1px #0a0704,inset 0 1px 0 rgba(229,199,120,.2),0 8px 20px rgba(0,0,0,.6);
  color:#e5c778;font:bold 13px/1 var(--hei);
  letter-spacing:3px;
  transition:filter .15s,border-color .15s;
}
#reopen:hover{filter:brightness(1.16);border-color:var(--gold)}
```

同步把浮层内的文字颜色改为 `--ink` / `--ink-2`，确保深底可读；不改变浮层定位和事件绑定。

---

### Task 3: 替换宠物身份与立绘

**Files:**
- Modify: `prototype/宠物栏示例3-Q版卡通风.html`

- [ ] **Step 1: 更新静态身份文案**

将 HTML 中显示值改为：

```html
<div id="pet-name">大橘为重</div>
<span id="lvtag">Lv.20</span>
<span class="sub">橘猫 · 战士系</span>
```

将底部数据对象改为：

```javascript
const PET = { name:'大橘为重', race:'橘猫', job:'战士系', lv:20,
```

保留该行后续基础属性、经验和装备数据不变。

- [ ] **Step 2: 用沉稳橘猫替换天使波利 SVG**

将 `#pet-svg` 的 `aria-label` 改为 `橘猫立绘`，并用以下内联 SVG 替换原天使波利主体、光环与星光：

```html
<svg id="pet-svg" viewBox="0 0 220 220" width="232" height="222" aria-label="橘猫立绘">
  <ellipse id="p-shadow" cx="110" cy="203" rx="55" ry="9" fill="rgba(0,0,0,.45)"/>
  <g id="p-bounce">
    <path d="M158 178 C 191 169, 199 137, 179 121" fill="none" stroke="#b78838" stroke-width="14" stroke-linecap="round"/>
    <path d="M158 178 C 186 170, 194 143, 178 126" fill="none" stroke="#7c5a22" stroke-width="4" stroke-linecap="round"/>
    <ellipse cx="110" cy="152" rx="52" ry="45" fill="#c48f3d"/>
    <ellipse cx="110" cy="164" rx="29" ry="24" fill="#dfc188"/>
    <path d="M64 140 q-9 15 2 27 M156 140 q9 15 -2 27" stroke="#8e6626" stroke-width="5" fill="none" stroke-linecap="round"/>
    <path d="M75 53 L64 14 L101 35 Z" fill="#c48f3d" stroke="#6d4c1b" stroke-width="3" stroke-linejoin="round"/>
    <path d="M145 53 L156 14 L119 35 Z" fill="#c48f3d" stroke="#6d4c1b" stroke-width="3" stroke-linejoin="round"/>
    <path d="M79 45 L73 24 L94 37 Z" fill="#d7a653"/>
    <path d="M141 45 L147 24 L126 37 Z" fill="#d7a653"/>
    <circle cx="110" cy="74" r="40" fill="#c48f3d" stroke="#6d4c1b" stroke-width="3"/>
    <path d="M92 40 q4 10 -1 17 M110 35 q2 10 0 18 M128 40 q-4 10 1 17" stroke="#8e6626" stroke-width="5" fill="none" stroke-linecap="round"/>
    <ellipse cx="94" cy="74" rx="5.4" ry="7.2" fill="#2c1c0a"/>
    <ellipse cx="126" cy="74" rx="5.4" ry="7.2" fill="#2c1c0a"/>
    <circle cx="96" cy="71.5" r="1.5" fill="#e8d3a5"/>
    <circle cx="128" cy="71.5" r="1.5" fill="#e8d3a5"/>
    <ellipse cx="110" cy="91" rx="14" ry="10" fill="#e5d3ad"/>
    <path d="M106 86 h8 l-4 5 Z" fill="#8a5a33"/>
    <path d="M104 95 q6 5 12 0" stroke="#5e3d1b" stroke-width="2.2" fill="none" stroke-linecap="round"/>
    <path d="M69 84 h-25 M71 92 l-23 6 M151 84 h25 M149 92 l23 6" stroke="#8e6626" stroke-width="2" stroke-linecap="round"/>
    <rect x="86" y="187" width="20" height="14" rx="6" fill="#b78838" stroke="#6d4c1b" stroke-width="2"/>
    <rect x="114" y="187" width="20" height="14" rx="6" fill="#b78838" stroke="#6d4c1b" stroke-width="2"/>
  </g>
</svg>
```

删除不再使用的 `#p-halo`、`.tw`、`.tw2` 动画规则；保留 `#p-bounce` 与 `#p-shadow` 的轻量呼吸动画。

---

### Task 4: 回归验证与提交

**Files:**
- Modify: `prototype/宠物栏示例3-Q版卡通风.html`

- [ ] **Step 1: 静态检查旧视觉残留**

运行：

```powershell
Select-String -LiteralPath 'D:\maoyouji\prototype\宠物栏示例3-Q版卡通风.html' -Pattern '暖木页游风|天使波利|啵啵利|#f8f0dc|#f2e7cd'
```

预期：无输出。文件名中的 `Q版卡通风` 是既有路径，按设计文档暂不修改。

- [ ] **Step 2: 检查关键选择器和数据**

运行：

```powershell
Select-String -LiteralPath 'D:\maoyouji\prototype\宠物栏示例3-Q版卡通风.html' -Pattern '青铜浮雕风|--panel:#251c13|大橘为重|橘猫立绘|function renderAll'
```

预期：每一项均能匹配。

- [ ] **Step 3: 浏览器手动回归**

在浏览器打开：

```text
file:///D:/maoyouji/prototype/宠物栏示例3-Q版卡通风.html
```

按以下顺序验证：

1. 1400×832 视口下窗口完整，无横向滚动。
2. 打开开发者工具 Console，无错误。
3. 悬停任意装备格，出现青铜色高亮。
4. 点击已装备格，菜单可打开；「更换装备」能显示同部位背包列表。
5. 从列表选择装备后，12 格与右侧属性同步更新。
6. 「卸下装备」后装备回到背包，空格恢复虚线。
7. 悬停装备格，Tooltip 跟随且文字可读。
8. 稀有度灰、绿、蓝、紫、橙边框仍可区分。
9. 拖动标题栏窗口可移动。
10. 点击关闭，再点击「打开宠物信息」，窗口恢复。

- [ ] **Step 4: 检查空白错误**

运行：

```powershell
git -c safe.directory=D:/maoyouji diff --check
```

预期：无输出。

- [ ] **Step 5: 提交实现**

运行：

```powershell
git -c safe.directory=D:/maoyouji add -- 'prototype/宠物栏示例3-Q版卡通风.html'
git -c safe.directory=D:/maoyouji commit -m 'prototype: 宠物栏示例3改为青铜浮雕风'
```

预期：生成一个只包含该原型文件的提交。
