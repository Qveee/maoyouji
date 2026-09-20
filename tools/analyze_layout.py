#!/usr/bin/env python3
"""解析 pet.jsp 主页面快照，提取游戏界面完整布局结构。"""

import re
import sys
from pathlib import Path


SNAPSHOT = Path("assets/原版参考/页面快照/游戏主页面-实时快照.html")


def main():
    sys.stdout.reconfigure(encoding="utf-8")
    text = SNAPSHOT.read_text(encoding="utf-8", errors="replace")
    print(f"快照大小: {len(text)} 字符")

    # 1) 所有 iframe
    print("\n===== iframe 列表 =====")
    for m in re.finditer(r"<iframe([^>]*)>", text):
        attrs = m.group(1)
        idm = re.search(r'id=["\']?([\w-]+)', attrs)
        srcm = re.search(r'src=["\']?([^"\'> ]+)', attrs)
        wh = re.search(r'width=["\']?(\d+)', attrs), re.search(r'height=["\']?(\d+)', attrs)
        print(f"  id={idm.group(1) if idm else '?':20s} "
              f"src={srcm.group(1) if srcm else '(动态)':30s} "
              f"w={wh[0].group(1) if wh[0] else '?':4s} h={wh[1].group(1) if wh[1] else '?'}")

    # 2) 所有带 id 的块级元素（div/span/table/td），提取定位样式
    print("\n===== 带定位样式的元素 =====")
    seen = set()
    for m in re.finditer(r"<(div|td|table|span|dt|dl|form|input)([^>]*)>", text):
        tag, attrs = m.group(1), m.group(2)
        idm = re.search(r'\bid=["\']?([\w-]+)', attrs)
        if not idm or idm.group(1) in seen:
            continue
        eid = idm.group(1)
        style = re.search(r'style=["\']([^"\']+)', attrs)
        cls = re.search(r'class=["\']?([\w-]+)', attrs)
        if style and any(k in style.group(1) for k in ("left", "top", "width", "height", "position")):
            seen.add(eid)
            s = re.sub(r"\s+", "", style.group(1))
            print(f"  #{eid:22s} <{tag:5s}> {s[:110]}")

    # 3) 样式表中的区域类
    print("\n===== <style> 内的区域规则（节选）=====")
    for m in re.finditer(r"<style[^>]*>(.*?)</style>", text, re.S):
        css = m.group(1)
        for rule in re.finditer(r"([.#][\w-]+|#\w+)[^{}]*\{([^}]{10,260})\}", css):
            sel, body = rule.group(1), re.sub(r"\s+", "", rule.group(2))
            if any(k in body for k in ("left", "top", "width", "height", "position", "background", "border")):
                print(f"  {sel:28s} {body[:120]}")


if __name__ == "__main__":
    main()
