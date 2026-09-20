#!/usr/bin/env python3
"""解析 8080 推送流，生成猫隐村 NPC 全量数据文档。

关联三层：setRoom(地点) → addNpcs(NPC列表) → addNPCC(对话+选项)。
"""

import json
import re
import sys
from pathlib import Path


ROOM_PAT = re.compile(r"p\.setRoom\('([^']+)'")
NPC_PAT = re.compile(r"p\._getNpc\((\d+),'([^']*)',(\d+),'([^']*)',(-?\d+)")
CHAT_PAT = re.compile(r'p\.addNPCC\("((?:[^"\\]|\\.)*)"')
TITLE_PAT = re.compile(r"<font color=(\w+)>([^<]+)</font>\s*(.*)")
OPT_IMG_PAT = re.compile(r"img/button/(\w+)\.gif")
OPT_A_PAT = re.compile(r"<a[^>]*onclick=\\?\"([^\\\"]*)\\?\"[^>]*>([^<]*)</a>")


def unescape(s: str) -> str:
    return s.replace('\\"', '"').replace("\\'", "'")


def parse(stream_file: Path):
    if isinstance(stream_file, list):
        text = "".join(f.read_bytes().decode("gb18030", errors="replace") for f in stream_file)
    else:
        text = stream_file.read_bytes().decode("gb18030", errors="replace")
    # 事件按出现顺序扫描
    events = []
    for m in ROOM_PAT.finditer(text):
        events.append((m.start(), "room", m.group(1)))
    for m in NPC_PAT.finditer(text):
        events.append((m.start(), "npc", m.groups()))
    for m in CHAT_PAT.finditer(text):
        events.append((m.start(), "chat", unescape(m.group(1))))
    events.sort(key=lambda e: e[0])

    places = {}
    order = []
    cur = None
    for _, kind, val in events:
        if kind == "room":
            cur = val
            if cur not in places:
                places[cur] = {"npcs": [], "chats": {}}
                order.append(cur)
        elif kind == "npc" and cur:
            idx, raw_name, uid, display, pos = val
            tm = TITLE_PAT.match(display)
            title, color = "", ""
            name = raw_name
            if tm:
                color, title, real = tm.group(1), tm.group(2), tm.group(3).strip()
                name = real or raw_name
            # 去重（重复推送）
            if not any(n["idx"] == int(idx) and n["name"] == name for n in places[cur]["npcs"]):
                places[cur]["npcs"].append({
                    "idx": int(idx), "name": name, "raw": raw_name,
                    "title": title, "title_color": color,
                    "uid": int(uid), "pos": int(pos),
                })
        elif kind == "chat" and cur:
            # addNPCC("NPC名: 对话...") → 归属当前房间同名 NPC
            if ":" in val:
                npc_name, _, body = val.partition(":")
                npc_name = npc_name.strip()
                places[cur]["chats"][npc_name] = body.strip()
    return order, places


def parse_options(body: str):
    """解析对话体中的选项（图标 + 文字 + 命令）。"""
    body = unescape(body)
    # 选项在 <table>...<tr>...<img ...><a onclick=...>文字</a> 结构中
    rows = re.split(r"<tr>|</table>", body)
    options = []
    for row in rows:
        img = OPT_IMG_PAT.search(row)
        a = OPT_A_PAT.search(row)
        if a:
            options.append({
                "icon": img.group(1) if img else "",
                "text": re.sub(r"<[^>]+>", "", a.group(2)).strip(),
                "cmd": a.group(1).strip(),
            })
    return options


def clean_dialog(body: str) -> str:
    """提取对话正文（选项表格之前的部分）。"""
    body = unescape(body)
    cut = body.find("<table")
    text = body[:cut] if cut >= 0 else body
    text = re.sub(r"<br\s*/?>", "\n", text)
    text = re.sub(r"<[^>]+>", "", text)
    return text.strip()


def render_markdown(order, places, map_points):
    lines = []
    lines.append("# 猫隐村 NPC 全量数据")
    lines.append("")
    lines.append("> 采集方式：协议捕获（/gto 遍历 24 个地点 + /talk 遍历 NPC 对话）")
    lines.append("> 数据来源：s92.pet.imop.com 服务器 8080 推送流（p.setRoom / p.addNpcs / p.addNPCC）")
    lines.append("")

    total_npcs = sum(len(p["npcs"]) for p in places.values())
    total_chats = sum(len(p["chats"]) for p in places.values())
    lines.append(f"- 地点数：{len(order)}")
    lines.append(f"- NPC 记录数：{total_npcs}")
    lines.append(f"- 对话记录数：{total_chats}")
    lines.append("")
    lines.append("**地图废弃入口**（存在于地图 HTML 但被注释，无法进入，服务器忽略 gto 命令）：")
    lines.append("")
    lines.append("- 旅馆、旅馆套房、生死竞技场、北牧野草原01")
    lines.append("")
    lines.append("**字段说明**：`位置参数 pos=0/1/2` 为站桩 NPC；`pos=-1` 为怪物/动态单位；称号颜色 blue=功能型、green=商业型、red=个性型、orange=场所型。")
    lines.append("")
    lines.append("## 目录")
    lines.append("")
    for place in order:
        pt = map_points.get(place, {})
        coord = f"（地图坐标 {pt['x']},{pt['y']}）" if pt else ""
        lines.append(f"- [{place}](#{place}) {coord} — {len(places[place]['npcs'])} 个 NPC")
    lines.append("")
    lines.append("---")
    lines.append("")

    for place in order:
        data = places[place]
        pt = map_points.get(place, {})
        coord = f"（地图坐标 {pt['x']},{pt['y']}）" if pt else "（无地图点位：可能为子区域/野外）"
        lines.append(f"## {place}")
        lines.append("")
        lines.append(coord)
        lines.append("")
        if not data["npcs"]:
            lines.append("*本地点未捕获到 NPC 数据*")
            lines.append("")
            continue
        lines.append("| 索引 | 名称 | 称号 | 称号颜色 | 位置参数 | UID |")
        lines.append("|---|---|---|---|---|---|")
        for n in data["npcs"]:
            lines.append(f"| {n['idx']} | {n['name']} | {n['title'] or '—'} | {n['title_color'] or '—'} | {n['pos']} | {n['uid']} |")
        lines.append("")
        for name, body in data["chats"].items():
            lines.append(f"### 💬 {name}")
            lines.append("")
            dialog = clean_dialog(body)
            lines.append(f"> {dialog}" if dialog else "*(无开场白)*")
            lines.append("")
            options = parse_options(body)
            if options:
                lines.append("| 类型 | 选项 | 命令 |")
                lines.append("|---|---|---|")
                for o in options:
                    icon = {"task1": "📜任务", "talk": "💬对话"}.get(o["icon"], o["icon"] or "—")
                    lines.append(f"| {icon} | {o['text']} | `{o['cmd']}` |")
                lines.append("")
        lines.append("")
    return "\n".join(lines)


def load_map_points(map_html: Path):
    text = map_html.read_bytes().decode("gb18030", errors="replace")
    pat = re.compile(r"<span class=.pos. style=.left:\s*(\d+)px;\s*top:\s*(\d+)px;[^>]*?title=.([^'\"]*).")
    pts = {}
    for x, y, title in pat.findall(text):
        # title 可能带编号后缀（如 牧野草原03），取原文与去尾号两个键
        pts.setdefault(title, {"x": int(x), "y": int(y)})
        base = re.sub(r"\d+$", "", title)
        if base not in pts:
            pts[base] = {"x": int(x), "y": int(y)}
    return pts


def main():
    sys.stdout.reconfigure(encoding="utf-8")
    streams = [Path(a) for a in sys.argv[1:]] or [
        Path("streams/124-250-115-219_8080_to_192-168-2-226_59156.bin")]
    order, places = parse(streams)
    map_points = load_map_points(Path("map_maoyin.html"))
    print(f"地点 {len(order)} 个：")
    for p in order:
        print(f"  {p}: {len(places[p]['npcs'])} NPC, {len(places[p]['chats'])} 对话")
    md = render_markdown(order, places, map_points)
    out = Path("docs/猫隐村NPC全量数据.md")
    out.write_text(md, encoding="utf-8")
    print(f"\n已生成: {out} ({len(md)} 字符)")
    # 同时存一份 JSON 便于程序处理
    json_out = Path("docs/猫隐村NPC全量数据.json")
    json_out.write_text(
        json.dumps({p: places[p] for p in order}, ensure_ascii=False, indent=2),
        encoding="utf-8")
    print(f"已生成: {json_out}")


if __name__ == "__main__":
    main()
