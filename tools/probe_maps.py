#!/usr/bin/env python3
"""探测猫隐村子地图 URL 是否存在。"""

import sys
import urllib.request


BASE = "http://s92.pet.imop.com/map/map.{}.html"
CANDIDATES = [
    "cunzhang", "cunzhangxiaowu", "cunzhangwu",
    "zhuangbeidian", "zbd", "wuqidian",
    "daojudian", "djd", "yaodian",
    "jiaotang", "jitang",
    "lvguan", "luguan", "kezhan",
    "cangku", "ck",
    "biwuchang", "bwc",
    "jiaochang", "jingjichang",
    "tuoyesuo", "chongwutuoyesuo",
    "yanjiusuo", "chongwuyanjiusuo",
    "yizhan", "maoyinyizhan",
    "guangchang", "maoyinguangchang",
    "cunkou", "xicunkou",
    "gonghuishifu", "jiedaobanshichu",
    "houcun", "chiubian", "guangchangxiaodao",
]


def main():
    sys.stdout.reconfigure(encoding="utf-8")
    found = []
    for name in CANDIDATES:
        url = BASE.format(name)
        req = urllib.request.Request(
            url,
            headers={"User-Agent": "Mozilla/4.0"},
            method="HEAD",
        )
        try:
            with urllib.request.urlopen(req, timeout=8) as resp:
                print(f"✓ {name}  {resp.status}  {resp.headers.get('Content-Length')}B")
                found.append(name)
        except urllib.error.HTTPError as e:
            if e.code != 404:
                print(f"? {name}  {e.code}")
        except Exception as e:
            print(f"x {name}  {type(e).__name__}: {e}")
    print("\n存在:", found)


if __name__ == "__main__":
    main()
