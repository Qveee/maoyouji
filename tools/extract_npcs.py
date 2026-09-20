#!/usr/bin/env python3
"""从 8080 推送流提取各房间的 NPC 列表。"""

import re
import sys
from pathlib import Path


def main():
    sys.stdout.reconfigure(encoding="utf-8")
    fn = Path(sys.argv[1])
    text = fn.read_bytes().decode("gb18030", errors="replace")

    npc_pat = re.compile(r"p\._getNpc\((\d+),'([^']*)',(\d+),'([^']*)',(-?\d+)")
    set_room_pat = re.compile(r"p\.setRoom\('([^']+)'")
    title_pat = re.compile(r"<font color=(\w+)>([^<]+)</font>\s*(.*)")

    # 顺序扫描：setRoom 开新房间，_getNpc 归属当前房间
    events = []
    for m in set_room_pat.finditer(text):
        events.append((m.start(), "room", m.group(1)))
    for m in npc_pat.finditer(text):
        events.append((m.start(), "npc", m.groups()))
    events.sort(key=lambda e: e[0])

    rooms = {}
    order = []
    cur = None
    for _, kind, val in events:
        if kind == "room":
            cur = val
            if cur not in rooms:
                rooms[cur] = []
                order.append(cur)
        elif cur is not None:
            rooms[cur].append(val)

    for room in order:
        print(f"== 房间: {room} ==")
        seen_names = set()
        for idx, name1, uid, name2, pos in rooms[room]:
            if name1 in seen_names:
                continue  # 重复推送去重
            seen_names.add(name1)
            tm = title_pat.match(name2)
            if tm:
                color, title, real = tm.group(1), tm.group(2), tm.group(3)
                print(f"   {title}｜{real or name1}   (称号颜色:{color})")
            else:
                print(f"   {name1}")
        print()
    if not order:
        print("未找到任何 setRoom 事件")


if __name__ == "__main__":
    main()
