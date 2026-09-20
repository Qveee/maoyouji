#!/usr/bin/env python3
"""解析猫游记地图 HTML，提取点位（NPC/传送点/区域）。"""

import re
import sys
from pathlib import Path


def main():
    sys.stdout.reconfigure(encoding="utf-8")
    path = Path(sys.argv[1])
    text = path.read_bytes().decode("gb18030", errors="replace")
    out = path.with_suffix(".decoded.txt")
    out.write_text(text, encoding="utf-8")

    pattern = re.compile(
        r"<span class=.pos. style=.left:\s*(\d+)px;\s*top:\s*(\d+)px;[^>]*?"
        r"title=.([^'\"]*).[^>]*>(.*?)</span>",
        re.S,
    )
    spans = pattern.findall(text)
    print(f"共 {len(spans)} 个点位：")
    for x, y, title, label in spans:
        label = re.sub(r"<[^>]+>|\s|&nbsp;", "", label)
        print(f"  ({x:>3},{y:>3}) {title}  显示:{label or title}")


if __name__ == "__main__":
    main()
