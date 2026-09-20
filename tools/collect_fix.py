#!/usr/bin/env python3
"""补采缺失地点：先离开再返回以触发 setRoom 推送。"""

import sys
import time
from pathlib import Path

sys.path.insert(0, "tools")
from game_client import GameClient, extract_cookie


SEQ = [
    # (地点, 是否 talk 遍历)
    ("广场小道", False),      # 先离开广场
    ("猫隐村广场", True),     # 返回触发推送
    ("旅馆", True),
    ("旅馆套房", True),
    ("生死竞技场", True),
    ("猫隐西村", True),
    ("后村谷地", True),
    ("北牧野草原01", True),
    ("猫隐村广场", False),    # 回城
]


def main():
    sys.stdout.reconfigure(encoding="utf-8")
    client = GameClient(extract_cookie(Path("streams")))
    for place, do_talk in SEQ:
        client.cmd(f"/gto {place}")
        print(f"gto {place} OK", flush=True)
        time.sleep(2.0)
        if do_talk:
            for idx in range(7):
                client.cmd(f"/talk {idx}")
                time.sleep(0.9)
            print(f"  talk 0..6 完成", flush=True)
    print("补采完成")


if __name__ == "__main__":
    main()
