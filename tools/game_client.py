#!/usr/bin/env python3
"""猫游记协议客户端：发送游戏命令并监听服务器推送。

仅执行只读命令（/gto 移动、/talk 打开 NPC 对话）。
对话选项只记录，绝不执行（不接任务/不交易/不战斗）。
"""

import queue
import re
import sys
import threading
import time
import urllib.parse
import urllib.request
from pathlib import Path


HOST = "s92.pet.imop.com"
BASE = f"http://{HOST}"


def extract_cookie(stream_dir: Path) -> str:
    """从抓包流中提取最近一次 action.jsp 请求的 Cookie。"""
    latest, latest_mtime = None, 0
    for fn in stream_dir.glob("192-168-2-226_*_to_124-250-115-219_80.bin"):
        text = fn.read_bytes().decode("gb18030", errors="replace")
        m = re.search(r"Cookie: ([^\r]+)", text)
        if m and fn.stat().st_mtime > latest_mtime:
            latest, latest_mtime = m.group(1), fn.stat().st_mtime
    if not latest:
        raise SystemExit("未在抓包流中找到 Cookie")
    return latest


def extract_jsessionid(cookie: str) -> str:
    m = re.search(r"JSESSIONID=([^;]+)", cookie)
    return m.group(1) if m else ""


class PushListener(threading.Thread):
    """建立 re.jsp 长连接，持续接收服务器推送的 script 事件。"""

    def __init__(self, cookie: str):
        super().__init__(daemon=True)
        self.cookie = cookie
        self.events: "queue.Queue[str]" = queue.Queue()
        self.buffer = bytearray()
        self.running = True
        self.connected = False

    def run(self):
        url = f"{BASE}/re.jsp;jsessionid={extract_jsessionid(self.cookie)}?&{int(time.time()*1000)}&"
        req = urllib.request.Request(url, headers={
            "Host": HOST,
            "User-Agent": "Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 6.2; WOW64; Trident/7.0)",
            "Cookie": self.cookie,
            "Referer": f"{BASE}/pet.jsp?",
        })
        try:
            with urllib.request.urlopen(req, timeout=30) as resp:
                self.connected = True
                while self.running:
                    chunk = resp.read(4096)
                    if not chunk:
                        break
                    self.buffer.extend(chunk)
                    self._extract_scripts()
        except Exception as e:
            self.connected = False
            self.events.put(f"<LISTEN_ERROR>{type(e).__name__}: {e}")

    def _extract_scripts(self):
        while True:
            start = self.buffer.find(b"<script>")
            if start < 0:
                break
            end = self.buffer.find(b"</script>", start)
            if end < 0:
                break
            body = self.buffer[start + 8:end]
            del self.buffer[:end + 9]
            try:
                self.events.put(body.decode("gbk", errors="replace"))
            except Exception:
                pass

    def wait_event(self, keyword: str, timeout: float = 8.0) -> str | None:
        """等待包含 keyword 的推送事件。"""
        deadline = time.time() + timeout
        pending = []
        while time.time() < deadline:
            try:
                ev = self.events.get(timeout=0.5)
            except queue.Empty:
                continue
            if keyword in ev:
                for p in pending:
                    self.events.put(p)
                return ev
            pending.append(ev)
        for p in pending:
            self.events.put(p)
        return None


class GameClient:
    def __init__(self, cookie: str):
        self.cookie = cookie

    def cmd(self, command: str) -> str:
        encoded = urllib.parse.quote(command, encoding="gbk")
        body = (
            "action=inputCommand"
            f"&inputCommand={encoded}"
            "&chatChannel=&talkToId=-1&input=&itemname=&itemindex="
        ).encode()
        req = urllib.request.Request(
            f"{BASE}/action.jsp?",
            data=body,
            headers={
                "Host": HOST,
                "User-Agent": "Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 6.2; WOW64; Trident/7.0)",
                "Content-Type": "application/x-www-form-urlencoded",
                "Cookie": self.cookie,
                "Referer": f"{BASE}/pet.jsp?",
                "Cache-Control": "no-cache",
            },
            method="POST",
        )
        with urllib.request.urlopen(req, timeout=10) as resp:
            return resp.read().decode("gbk", errors="replace")


def main():
    sys.stdout.reconfigure(encoding="utf-8")
    cookie = extract_cookie(Path("streams"))
    client = GameClient(cookie)
    if len(sys.argv) > 1:
        # 命令行模式：直接执行传入的命令
        for i, c in enumerate(sys.argv[1:], 1):
            client.cmd(c)
            print(f"[{i}] 已发送: {c}")
            if i < len(sys.argv) - 1:
                time.sleep(1.5)
        return
    listener = PushListener(cookie)
    listener.start()
    time.sleep(2)
    print(f"推送连接: {'已建立' if listener.connected else '失败'}")

    # 实验：发 /talk 0，看自建连接能否收到 addNPCC
    print("发送: /talk 0")
    client.cmd("/talk 0")
    ev = listener.wait_event("addNPCC", timeout=8)
    if ev:
        print("✓ 自建连接收到推送:")
        print(ev[:500])
    else:
        print("✗ 8 秒内未收到 addNPCC 推送")
        drain = []
        while not listener.events.empty():
            drain.append(listener.events.get_nowait()[:120])
        print("收到的其他事件:", drain[:10])


if __name__ == "__main__":
    main()
