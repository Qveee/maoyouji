#!/usr/bin/env python3
"""生成猫隐村地图的独立预览版（去除对游戏主框架的依赖）。"""

import re
import sys
from pathlib import Path


def main():
    sys.stdout.reconfigure(encoding="utf-8")
    src = Path("prototype/样式参考-猫隐村/map.maoyin.html")
    text = src.read_bytes().decode("gb18030")

    # 去掉 map.js 引用与 onLoad（依赖 parent 框架，独立打开会报错）
    text = text.replace('<script src="include/map.js"></script>', "")
    text = re.sub(r'\s*onLoad="[^"]*"', "", text)
    # 补充说明样式：标注这是静态参考版
    text = text.replace(
        "<body",
        "<!-- 独立静态预览版：去除 map.js/onLoad，样式与原版一致 -->\n<body",
    )
    out = Path("prototype/样式参考-猫隐村/独立预览.html")
    out.write_bytes(text.encode("gb18030"))
    print(f"已生成: {out}")

    # 资源完整性检查
    base = src.parent
    refs = [
        r for r in re.findall(r"(?:src|href)=['\"]?([^'\" >\)]+)", text)
        if not r.startswith(("http", "#", "javascript"))
    ]
    missing = [r for r in refs if not (base / r).exists()]
    print("资源检查:", "全部就绪 ✓" if not missing else f"缺失 {missing}")


if __name__ == "__main__":
    main()
