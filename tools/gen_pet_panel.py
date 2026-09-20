#!/usr/bin/env python3
"""生成宠物面板示例（按 Pet.js _petinfo 渲染逻辑 + 真实抓包数据）。"""

import re
import sys
import urllib.request
from pathlib import Path


RAW = Path("pet__petinfo_full.txt").read_text(encoding="utf-8")
OUT = Path("prototype")


def dl(rel):
    rel = rel.lstrip("/").replace("\\", "/")
    dst = OUT / rel
    if dst.exists():
        return rel
    dst.parent.mkdir(parents=True, exist_ok=True)
    try:
        req = urllib.request.Request(
            f"http://s92.pet.imop.com/{rel}", headers={"User-Agent": "Mozilla/4.0"})
        dst.write_bytes(urllib.request.urlopen(req, timeout=10).read())
        return rel
    except Exception:
        return None


def main():
    sys.stdout.reconfigure(encoding="utf-8")
    items = re.findall(
        r"\['(<font[^>]+>[^<]+</font>)','([^']*)','([^']+)',(false|true),'([^']*)',(\d+)\]", RAW)
    rows = []
    for name_html, slot, img, flag, path, idx in items:
        rel = dl(img)
        nm = re.sub(r"<[^>]+>", "", name_html)
        color = "q-p" if "A335EE" in name_html else "q-b" if "0070DD" in name_html else "q-w"
        slot = slot.rstrip(",")
        rows.append((rel, nm, color, slot))
    print(f"装备 {len(rows)} 件")

    eq_rows = "".join(
        f'<tr height="24"><td width="24">{f"<img src={i}>" if i else ""}</td>'
        f'<td width="4"></td><td><a class="{c}">{n}</a><span class="pislot">（{s}）</span></td>'
        f'<td class="ops">[卸下][修][捷]</td></tr>'
        for i, n, c, s in rows)

    html = f"""<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<title>宠物面板示例 - Caesar（按原版 _petinfo 复刻）</title>
<style>
body{{background:#3a5566;font-family:"宋体",SimSun,serif;margin:0;padding:24px;color:#333}}
.win{{background:#E0E0E0;border:1px solid #000;width:330px;padding:6px 8px;font-size:12px;line-height:16px}}
.fns a{{color:#0000FF;margin-right:2px}}
.card{{width:235px;margin:4px auto;background:#E1E1E1;
  outline:1px solid #BCBCBC;padding:8px 14px 10px 14px}}
.fname{{font-weight:bold}}
.expline{{color:#2747A7}}
.lv{{font-family:arial;font-size:7.5pt}}
.lv b{{color:red}}
.zdl{{cursor:pointer}}
hr{{border:none;border-top:1px solid #BCBCBC;margin:4px 0}}
.attr td{{padding:1px 2px;width:50%}}
.add{{color:green}}
.q-b{{color:#0070DD}}.q-p{{color:#A335EE}}.q-w{{color:#333}}
.pislot{{color:#7a7a7a}}
.dmg{{color:#105E8B;font-weight:bold}}.dps{{color:#FF4000}}
.atk{{color:#F32C77}}.def{{color:#217081}}
.bar{{display:inline-block;width:90px;height:7px;background:#888;vertical-align:middle;margin:0 4px}}
.bar i{{display:block;height:100%}}
.hp i{{background:green}}.sp i{{background:#1a6fd4}}
.ops{{color:#999}}
.skill{{background:#D9D9D9;padding:2px 3px;margin-top:4px}}
.skill .sn{{color:red;font-weight:bold}}
.skill .sm{{font-family:arial}}
.skill .sm b{{color:red}}
.cap{{color:#dde;font-size:12px;margin:4px 2px}}
</style>
</head>
<body>
<div class="win">
  <div class="fns"><a>[技能]</a><a>[合成]</a><a>[友好]</a><a>[宠物抽奖]</a><a>[经脉]</a><a>[修炼]</a><a>[炼丹]</a><a>[七星]</a><a>[登山]</a><a>[历练]</a><a>[称号]</a></div>
  <div class="card">
    <div>今日运势: <span>【上吉】</span>　关键人物: <span>【流年】</span></div>
    <div><span class="fname">Caesar</span> <a title="和Caesar说话">💬</a>·<span class="expline">战士 <span class="lv">Lv <b>71</b></span></span><br>巴哈姆特</div>
    <div><a class="zdl">战斗力:12117</a></div>
    <hr>
    <table class="attr" width="100%"><tr>
      <td>力量: <span class="add">20077</span></td><td>敏捷: <span class="add">6642</span></td></tr><tr>
      <td>体质: <span class="add">11800</span></td><td>智力: <span class="add">7704</span></td></tr><tr>
      <td>精神: <span class="add">3031</span></td><td></td></tr></table>
    <hr>
    <table class="attr" width="100%"><tr>
      <td>伤害: <b class="dmg">14825 - 18442</b></td><td>秒伤: <span class="dps">5750.8</span></td></tr><tr>
      <td>攻击: <span class="atk">41507</span></td><td>防御: <span class="def">30692</span></td></tr><tr>
      <td>暴击: 362.91%</td><td>攻速: 2.9</td></tr><tr>
      <td colspan="2">智力: <span style="color:green">273</span></td></tr></table>
  </div>
  <hr>
  <table width="100%">{eq_rows}</table>
  <hr>
  <div class="skill"><a class="sn">【十字剑】</a>(术) <span class="sm">Lv:<b>72</b> Exp:0/11300 [出动]</span>
    <div style="margin-top:2px"><a>十字斩[基础级]</a> <a>十字斩[1级]</a> <a>撕裂[1级]</a> <a>圣盾</a> <a>盾牌猛击</a> <a>压制</a> …</div>
  </div>
  <div style="margin-top:4px"><a class="sn">【禅】</a>(辅) <span class="sm">Lv:<b>25</b> Exp:8286/9071 [装备]</span></div>
</div>
<div class="cap" style="width:330px">宠物面板（petinfo 窗）· 数据取自真实抓包 Caesar·Lv71·巴哈姆特</div>
</body>
</html>"""
    out = OUT / "宠物面板示例.html"
    out.write_text(html, encoding="utf-8")
    print(f"已生成: {out}")


if __name__ == "__main__":
    main()
