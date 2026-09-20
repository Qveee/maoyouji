#!/usr/bin/env python3
"""解析 addPetInfo 推送数据，下载图片资源，生成玩家信息面板示例。

数据来源：点击玩家"剑神归来"抓取的 8080 推送。
"""

import json
import re
import sys
import urllib.request
from pathlib import Path


BASE = "http://s92.pet.imop.com/"
RAW = Path("player_info_raw.txt").read_text(encoding="utf-8")
OUT = Path("prototype")


TITLE_PAT = re.compile(r"<font color=(\w+)>([^<]+)</font>")


def strip_font(s: str):
    m = TITLE_PAT.search(s)
    if m:
        return m.group(2), m.group(1)
    return re.sub(r"<[^>]+>", "", s), ""


def parse_arrays(raw: str):
    """把 JS 数组字面量转为 JSON 后解析。"""
    try:
        s = raw.strip()
        s = re.sub(
            r"'((?:[^'\\]|\\.)*)'",
            lambda m: '"' + m.group(1).replace("\\", "\\\\").replace('"', '\\"') + '"',
            s,
        )
        return json.loads(s)
    except Exception:
        return None


def collect_images(items, bag):
    if isinstance(items, list):
        if items and isinstance(items[0], str) and items[0].startswith("img"):
            bag.add(items[0].replace("\\", "/").lstrip("/"))
        for it in items:
            collect_images(it, bag)
    elif isinstance(items, str) and items.startswith("img"):
        bag.add(items.replace("\\", "/").lstrip("/"))


def download_images(paths):
    ok, fail = 0, []
    for rel in sorted(paths):
        url = BASE + rel
        dst = OUT / rel
        if dst.exists():
            ok += 1
            continue
        dst.parent.mkdir(parents=True, exist_ok=True)
        try:
            req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/4.0"})
            data = urllib.request.urlopen(req, timeout=10).read()
            dst.write_bytes(data)
            ok += 1
        except Exception:
            fail.append(rel)
    return ok, fail


def render(data):
    (info_html, pic, reveal, uid, name, xx, shls, shl_max, fate, _sz,
     equips, zuoqi, zuoqi_eq) = data[:13]

    def eq_rows(items):
        rows = []
        for it in items or []:
            img, slot, name_html, slot_name = it[0], it[1], it[2], it[3]
            img = img.replace("\\", "/").lstrip("/")
            nm, color = strip_font(name_html)
            rows.append((img, nm, color, slot_name))
        return rows

    def reveal_rows(items):
        rows = []
        for it in items or []:
            name_html, cnt, img = it[0], it[1], str(it[2])
            nm, color = strip_font(name_html)
            rows.append((img.replace("\\", "/").lstrip("/"), f"{nm}×{cnt}", color, ""))
        return rows

    # 基础信息解析
    guild = re.search(r"<font color=green>([^<]+)</font>", info_html)
    pname = re.search(r"<font color=blue>([^<]+)</font>", info_html)
    power = re.search(r"战斗力[:：]?\s*(\d+)", info_html)
    level = re.search(r"(Lv\.\d+[^<]*)", info_html)
    spouse = re.search(r"<font color=#E100E1>配偶[:：]?([^<]+)</font>", info_html)
    fate_parts = fate.split("@") if fate else []

    shls_rows = []
    for sh in shls or []:
        shls_rows.append({
            "name": sh[0], "lv": sh[1], "img": str(sh[2]).replace("\\", "/"),
            "state": sh[3], "rare": sh[4], "active": sh[5],
        })

    return {
        "guild": guild.group(1) if guild else "",
        "name": pname.group(1) if pname else name,
        "power": power.group(1) if power else "",
        "level": level.group(1) if level else "",
        "spouse": spouse.group(1) if spouse else "",
        "pic": pic,
        "uid": uid,
        "fate_luck": fate_parts[0] if fate_parts else "",
        "fate_person": fate_parts[2] if len(fate_parts) > 2 else "",
        "equips": eq_rows(equips),
        "zuoqi": eq_rows(zuoqi),
        "zuoqi_eq": eq_rows(zuoqi_eq),
        "shls": shls_rows, "shl_max": shl_max,
        "reveal": reveal_rows(reveal),
    }


def build_html(d):
    eq_html = "".join(
        f'<tr><td class="ico"><img src="{i}" onerror="this.style.visibility=\'hidden\'"></td>'
        f'<td><a class="it c-{c or "w"}">{n}</a><span class="slot">（{s}）</span></td></tr>'
        for i, n, c, s in d["equips"])
    zq_html = "".join(
        f'<tr><td class="ico"><img src="{i}" onerror="this.style.visibility=\'hidden\'"></td>'
        f'<td><a class="it c-{c or "w"}">{n}</a><span class="slot">（{s}）</span></td></tr>'
        for i, n, c, s in d["zuoqi"] + d["zuoqi_eq"])
    shl_html = "".join(
        f'<div class="shl {"on" if s["active"] else "off"}">'
        f'<img src="{s["img"]}" onerror="this.style.visibility=\'hidden\'">'
        f'<div><b>{s["name"]}</b> Lv.{s["lv"]}<br><span class="st">{s["state"]}</span></div></div>'
        for s in d["shls"])
    rev_html = "".join(
        f'<div class="rev"><img src="{i}" onerror="this.style.visibility=\'hidden\'"><br><span class="c-{c}">{n}</span></div>'
        for i, n, c, s in d["reveal"])

    return f"""<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<title>玩家信息面板 - {d['name']}（按游戏截图复刻）</title>
<style>
body{{background:#3a5566;font-family:"宋体",SimSun,serif;margin:0;padding:24px;display:flex;gap:14px;align-items:flex-start;flex-wrap:wrap}}
.win{{background:#eeeeee;border:1px solid #000;width:372px;padding:5px 5px 5px 10px;font-size:12px;color:#333;line-height:16px}}
.fate{{color:#000;padding-bottom:2px}}
table{{border-collapse:collapse}}
td{{vertical-align:top;font-size:12px}}
td.ico{{width:26px}}
td.ico img{{width:22px;height:22px;image-rendering:pixelated;display:block;margin-top:1px}}
img.avatar{{filter:fliph;image-rendering:pixelated;margin-right:6px;margin-bottom:4px}}
.guild{{color:green}}
.pname{{color:#0000FF}}
.power{{color:#0000FF;text-decoration:underline;cursor:pointer}}
.spouse{{color:#E100E1}}
.it{{cursor:pointer}}
.c-0070DD{{color:#0070DD}}.c-A335EE{{color:#A335EE}}.c-000000,.c-w{{color:#333}}.c-green{{color:green}}
.slot{{color:#7a7a7a}}
hr{{border:none;border-top:1px solid #BCBCBC;margin:4px 0;margin-right:-5px}}
.sub{{background:#eeeeee;border:1px solid #000;width:230px;padding:5px 5px 5px 10px;font-size:12px;line-height:16px}}
.subttl{{color:blue;margin-bottom:3px}}
.shl{{display:flex;gap:8px;padding:3px 0;border-bottom:1px dashed #bbb}}
.shl img{{width:30px;height:30px;image-rendering:pixelated}}
.shl.off{{opacity:.6}}
.shl .st{{color:#666}}
.rev{{text-align:center;width:70px;display:inline-block;font-size:11px;margin:2px;vertical-align:top}}
.rev img{{width:30px;height:30px;image-rendering:pixelated}}
.cap{{color:#dde;font-size:12px;margin:4px 2px;width:372px}}
</style>
</head>
<body>
<div>
<div class="win">
  <div class="fate">今日运势：<b>{d['fate_luck']}</b>　关键人物：{d['fate_person']}</div>
  <table><tr>
    <td width="1"><img class="avatar" src="{d['pic']}" onerror="this.style.display='none'"></td>
    <td>
      <span class="guild">{d['guild']}</span><br>
      <span class="pname">{d['name']}</span><br>
      <span class="power">战斗力:{d['power']}</span><br>
      {d['level']}<br>
      <span class="spouse">配偶:{d['spouse']}</span>
    </td>
  </tr></table>
  <hr>
  <table>{eq_html}</table>
  <hr>
  <table>{zq_html}</table>
</div>
<div class="cap">↑ 主窗（游戏内截图同款：372px 单列 · 白底黑边 · 头像左上 + 装备长列表）</div>
</div>
<div>
<div class="sub">
  <div class="subttl">守护灵　{len(d['shls'])}/{d['shl_max']}</div>
  {shl_html}
</div>
<div class="sub" style="margin-top:10px">
  <div class="subttl">携带展示</div>
  {rev_html}
</div>
<div class="cap" style="width:230px">↑ 原版为跟随主窗右侧弹出的独立浮窗</div>
</div>
</body>
</html>"""


def main():
    sys.stdout.reconfigure(encoding="utf-8")
    # 第一参数是带引号的字符串，其余是数组 → 手工切分
    # 找非转义的结束单引号（跳过 \' ）
    q1 = RAW.find("'")
    q2 = q1 + 1
    while q2 < len(RAW):
        if RAW[q2] == "'" and RAW[q2 - 1] != "\\":
            break
        q2 += 1
    info_html = RAW[q1 + 1:q2]
    rest = RAW[q2 + 1:]
    arr = parse_arrays("[" + rest.strip().strip(",") + "]")
    data = [info_html] + (arr if isinstance(arr, list) else [])
    d = render(data)

    imgs = set()
    collect_images(data, imgs)
    ok, fail = download_images(imgs)
    print(f"图片: 成功 {ok} / 总 {len(imgs)}，失败 {len(fail)}")
    if fail:
        print("失败列表(前10):", fail[:10])

    out = OUT / "玩家信息面板示例.html"
    out.write_text(build_html(d), encoding="utf-8")
    (OUT / "玩家信息数据.json").write_text(
        json.dumps(d, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"已生成: {out}")
    print(f"已生成: {OUT / '玩家信息数据.json'}")
    print(f"玩家: {d['name']}  公会:{d['guild']}  战斗力:{d['power']}  装备:{len(d['equips'])}件  守护灵:{len(d['shls'])}")


if __name__ == "__main__":
    main()
