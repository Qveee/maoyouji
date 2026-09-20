#!/usr/bin/env python3
"""批量采集猫隐村全部地点的 NPC 列表与对话。

流程：/gto 进入地点 → 等待推送 → /talk 0..N 遍历 NPC 对话。
全程只读：不执行任务、交易、战斗命令。
"""

import sys
import time

sys.path.insert(0, "tools")
from game_client import GameClient, extract_cookie
from pathlib import Path


# 猫隐村全部点位（来自 map.maoyin.html 的 title），村内在前、野外在后
PLACES = [
    "猫隐村广场", "广场小道", "村长小屋", "装备店", "道具店",
    "教堂", "仓库", "旅馆", "旅馆套房", "猫隐村驿站",
    "街道办事处", "比武场", "宠物托儿所", "宠物研究所",
    "村口", "猫隐村小径", "池边小道", "后村小道",
    "后村谷地", "后村林地", "猫隐西村",
    "生死竞技场", "牧野草原03", "北牧野草原01",
]

MAX_NPC_INDEX = 6  # 猫隐村单房间 NPC 最多 6 个（索引 0-5），+1 冗余


def main():
    sys.stdout.reconfigure(encoding="utf-8")
    cookie = extract_cookie(Path("streams"))
    client = GameClient(cookie)

    total_cmds = 0
    for pi, place in enumerate(PLACES, 1):
        print(f"[{pi}/{len(PLACES)}] 进入: {place}")
        try:
            client.cmd(f"/gto {place}")
        except Exception as e:
            print(f"  gto 失败: {e}")
            continue
        total_cmds += 1
        time.sleep(2.0)
        for idx in range(MAX_NPC_INDEX + 1):
            try:
                client.cmd(f"/talk {idx}")
                total_cmds += 1
            except Exception as e:
                print(f"  talk {idx} 失败: {e}")
            time.sleep(0.9)
    print(f"\n完成，共发送 {total_cmds} 条命令")


if __name__ == "__main__":
    main()
