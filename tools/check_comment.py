#!/usr/bin/env python3
"""检查地图点位是否在 HTML 注释内（废弃入口）。"""

import re
import sys
from pathlib import Path


def spans(text: str) -> set:
    pat = re.compile(r"<span[^>]*title=[\"']([^\"']+)[\"']")
    return {m for m in pat.findall(text)}


def main():
    sys.stdout.reconfigure(encoding="utf-8")
    text = Path("map_maoyin.decoded.txt").read_text(encoding="utf-8")
    no_comment = re.sub(r"<!--.*?-->", "", text, flags=re.S)
    all_pts, valid = spans(text), spans(no_comment)
    dead = sorted(all_pts - valid)
    print(f"全部点位 {len(all_pts)}，有效 {len(valid)}，注释废弃 {len(dead)}：")
    for p in dead:
        print("  ✗", p)
    print()
    print("有效点位：")
    for p in sorted(valid):
        print("  ✓", p)


if __name__ == "__main__":
    main()
