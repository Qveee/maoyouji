#!/usr/bin/env python3
"""解析 collect_map.py 轮次的 pktmon 抓包，重建怪物卡片数据。

用法:
    python parse_round.py <etl2txt输出.txt...> [--map 万马草原] [--download <目标目录>]

输出:
    - 按时间线重建 setRoom / addNpcs 名单 / addPetInfo 卡片 事件
    - 按精灵图路径归并物种: Lv/标签/说明候选 + 出现格子 + 名字候选
    - JSON 落盘 streams/parsed_<地图>.json
"""

import argparse
import json
import re
import sys
from pathlib import Path

sys.path.insert(0, r"D:\maoyouji\tools")
from parse_capture import parse_packets, reassemble  # noqa: E402

sys.stdout.reconfigure(encoding="utf-8")

SETROOM_PAT = re.compile(r"p\.setRoom\('([^']+)'")
NPC_PAT = re.compile(r"p\._getNpc\((\d+),'([^']*)',(\d+),'([^']*)',(-?\d+),null,(true|false)\)")
CARD_PAT = re.compile(r"p\.addPetInfo\('((?:[^'\\]|\\.)*)','((?:[^'\\]|\\.)*)'\)")
NONE_PAT = re.compile(r"没有这个生物")


def unescape(s: str) -> str:
    return s.replace("\\'", "'").replace('\\"', '"')


def parse_card(body: str) -> dict:
    """卡片正文: 'Lv.9 (战士 动物 物防)<br>说明.<br>' 或 '的尸体<br>'。"""
    body = unescape(body)
    if body.startswith("的尸体"):
        return {"corpse": True}
    lv = re.search(r"Lv\.(\d+)", body)
    tags = re.search(r"\(([^)]+)\)", body)
    desc = ""
    parts = [p.strip() for p in body.split("<br>") if p.strip()]
    if len(parts) >= 2:
        desc = parts[1]
    return {
        "corpse": False,
        "lv": int(lv.group(1)) if lv else None,
        "tags": tags.group(1).split() if tags else [],
        "desc": desc,
    }


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("txts", nargs="+")
    ap.add_argument("--map", default="万马草原")
    ap.add_argument("--download", default=None)
    args = ap.parse_args()

    # 汇总所有 txt 的推送流: re.jsp 重连可能落 8080 或 80 端口,
    # 按 "p. 事件数最多" 选流, 而非固定端口/最长流
    EVENT_HINT = re.compile(rb"p\.(?:setRoom|addNpcs|addPetInfo|_getNpc|cls|addMessage)")
    best, best_n, best_key = b"", -1, None
    for t in args.txts:
        packets = parse_packets(Path(t))
        for key, data in reassemble(packets).items():
            n = len(EVENT_HINT.findall(data))
            if n > best_n:
                best, best_n, best_key = data, n, key
    text = best.decode("gb18030", errors="replace")
    print(f"推送流: {best_key[0]}:{best_key[1]} -> {best_key[3]}  {len(best)}B  事件数~{best_n}")

    events = []  # (pos, kind, payload)
    for m in SETROOM_PAT.finditer(text):
        events.append((m.start(), "room", m.group(1)))
    for m in NPC_PAT.finditer(text):
        events.append((m.start(), "roster", {"idx": int(m.group(1)), "name": m.group(2),
                                             "uid": m.group(3), "die": m.group(6) == "true"}))
    for m in CARD_PAT.finditer(text):
        events.append((m.start(), "card", {"pic": unescape(m.group(2)), **parse_card(m.group(1))}))
    for m in NONE_PAT.finditer(text):
        events.append((m.start(), "none", None))
    events.sort(key=lambda e: e[0])

    # 重建: 当前格子 -> 事件分组
    cell, cell_events, segments = None, [], []
    for pos, kind, payload in events:
        if kind == "room":
            if cell and cell_events:
                segments.append((cell, cell_events))
            cell, cell_events = payload, []
            continue
        if cell:
            cell_events.append((kind, payload))
    if cell and cell_events:
        segments.append((cell, cell_events))

    # 物种归并: pic -> 记录
    species: dict[str, dict] = {}
    for cell, evs in segments:
        roster = {}
        for kind, payload in evs:
            if kind == "roster":
                roster[payload["idx"]] = payload
            elif kind == "card" and not payload.get("corpse"):
                rec = species.setdefault(payload["pic"], {
                    "pic": payload["pic"], "lv": set(), "tags": set(), "desc": set(),
                    "cells": set(), "names": set()})
                if payload["lv"]:
                    rec["lv"].add(payload["lv"])
                rec["tags"].update(payload["tags"])
                if payload["desc"]:
                    rec["desc"].add(payload["desc"])
                rec["cells"].add(cell)
                # 名字候选: 该格名单中与卡片同段出现的活怪名
                alive = {r["name"] for r in roster.values() if not r["die"]}
                rec["names"] |= alive

    # 后处理: set -> list
    out = {}
    for pic, rec in species.items():
        out[pic] = {
            "lv": sorted(rec["lv"]),
            "tags": sorted(rec["tags"]),
            "desc": sorted(rec["desc"]),
            "cells": sorted(rec["cells"]),
            "names": sorted(rec["names"]),
        }

    print(f"\n格子段: {len(segments)} 个; 物种(精灵图): {len(out)} 种")
    for pic, rec in sorted(out.items()):
        lv = f"Lv.{min(rec['lv'])}-{max(rec['lv'])}" if rec["lv"] else "?"
        print(f"  {pic:28s} {lv:10s} [{'/'.join(rec['tags'])}] 名字候选: {rec['names']}")

    outpath = Path(f"D:/maoyouji/streams/parsed_{args.map}.json")
    outpath.write_text(json.dumps({"segments": len(segments), "species": out},
                                  ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"\n已写入: {outpath}")


if __name__ == "__main__":
    main()
