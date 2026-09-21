#!/usr/bin/env python3
"""协议批量采集一张地图的怪物卡片（配合 pktmon 抓包使用）。

用法:
    python collect_map.py --map 万马草原 --start 万马草原_01 [--cells 01,02,15]
                         [--sweep-max 19] [--cookie-file <bin>]

流程: 每格 /gto 走入 -> 盲扫 /l 0..N -> 服务器推送 setRoom/addNpcs/addPetInfo
      (由 pktmon 抓包落盘, 事后用 parse_round.py 解析配对)。

纪律: 只发只读命令(/gto 移动, /l 查看)。绝不发送攻击(bar34/45sr34)/交易/任务命令。
"""

import argparse
import json
import re
import sys
import time
from pathlib import Path

sys.path.insert(0, r"D:\maoyouji\tools")
from game_client import GameClient  # noqa: E402

sys.stdout.reconfigure(encoding="utf-8")

STREAMS = Path(r"D:\maoyouji\streams\streams")
ADJ_GRAPH = Path(r"C:\Users\Administrator\AppData\Local\Temp\adj_graph.json")


def newest_cookie_file() -> Path:
    cands = sorted(
        STREAMS.glob("192-168-2-226_*_to_182-92-226-45_80.bin"),
        key=lambda p: p.stat().st_mtime,
    )
    if not cands:
        raise SystemExit(f"未找到抓包流文件于 {STREAMS}")
    return cands[-1]


def get_cookie(cookie_file: Path) -> str:
    text = cookie_file.read_bytes().decode("gb18030", errors="replace")
    m = re.search(r"Cookie: ([^\r\n]+)", text)
    if not m:
        raise SystemExit("流文件中无 Cookie")
    return m.group(1).strip()


def load_cells(map_name: str, start: str, cells_arg: str | None) -> list[str]:
    graph = json.loads(ADJ_GRAPH.read_text(encoding="utf-8"))
    if cells_arg:
        parts = [c.strip() for c in cells_arg.split(",")]
        cells = []
        for c in parts:
            # 支持简写(00)与全名(低矮林地00); 按邻接图校验正确拼法
            for cand in ([c] if c.startswith(map_name) else [f"{map_name}_{c}", f"{map_name}{c}"]):
                if cand in graph:
                    cells.append(cand)
                    break
            else:
                raise SystemExit(f"格名无法匹配: {c} (试过 {map_name}_{c} / {map_name}{c})")
        if start not in cells:
            cells.insert(0, start)
        return cells
    nodes = sorted(n for n in graph if n.startswith(map_name))
    if not nodes:
        raise SystemExit(f"邻接图中无 {map_name} 节点")
    # BFS from start, 优先走近的格子
    from collections import deque

    order, seen, q = [], {start}, deque([start])
    while q:
        cur = q.popleft()
        order.append(cur)
        for nb in sorted(graph.get(cur, [])):
            if nb not in seen and nb.startswith(map_name):
                seen.add(nb)
                q.append(nb)
    order.extend(n for n in nodes if n not in seen)
    return order


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("--map", required=True)
    ap.add_argument("--start", required=True)
    ap.add_argument("--cells", default=None)
    ap.add_argument("--sweep-max", type=int, default=19)
    ap.add_argument("--cookie-file", default=None)
    ap.add_argument("--settle", type=float, default=6.0, help="走格后等待名单推送秒数")
    ap.add_argument("--gap", type=float, default=1.5, help="两次 /l 间隔秒数")
    args = ap.parse_args()

    cfile = Path(args.cookie_file) if args.cookie_file else newest_cookie_file()
    print(f"Cookie 来源: {cfile.name}")
    client = GameClient(get_cookie(cfile))
    cells = load_cells(args.map, args.start, args.cells)
    print(f"计划 {len(cells)} 格: {cells[0]} .. {cells[-1]}")

    t0 = time.strftime("%H:%M:%S")
    for i, cell in enumerate(cells, 1):
        print(f"[{time.strftime('%H:%M:%S')}] ({i}/{len(cells)}) /gto {cell}", flush=True)
        client.cmd(f"/gto {cell}")
        time.sleep(args.settle)
        for idx in range(args.sweep_max + 1):
            client.cmd(f"/l {idx}")
            time.sleep(args.gap)
        print(f"[{time.strftime('%H:%M:%S')}]   盲扫 /l 0..{args.sweep_max} 完成", flush=True)
    print(f"[{t0} -> {time.strftime('%H:%M:%S')}] 全部格子扫描结束")


if __name__ == "__main__":
    main()
