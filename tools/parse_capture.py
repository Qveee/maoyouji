#!/usr/bin/env python3
"""解析 pktmon --hex 输出，重组 TCP 流并提取明文 HTTP 内容。"""

import re
import sys
from pathlib import Path


HEX_LINE = re.compile(r"^\s*0x([0-9A-Fa-f]{4}):\s+((?:[0-9A-Fa-f]{4}\s*)+)$")
EVENT_LINE = re.compile(r"PktGroupId")
FLOW_LINE = re.compile(r"(\d+\.\d+\.\d+\.\d+)\.(\d+) > (\d+\.\d+\.\d+\.\d+)\.(\d+).*?seq (\d+):(\d+).*?length (\d+)")


def parse_packets(path: Path):
    """从 pktmon hex 文本中提取去重后的 TCP payload。"""
    packets = {}  # (src_port, dst_port, seq) -> payload bytes
    current_hex = bytearray()
    current_flow = None

    def flush():
        nonlocal current_hex, current_flow
        if current_flow is None or not current_hex:
            current_hex, current_flow = bytearray(), None
            return
        src_ip, src_port, dst_ip, dst_port, seq = current_flow
        data = bytes(current_hex)
        key = (src_ip, src_port, dst_ip, dst_port, seq)
        if key not in packets:
            # 以太网 14B + IP 20B + TCP 头
            if len(data) >= 54:
                ip_total = int.from_bytes(data[16:18], "big")
                tcp_off = (data[46] >> 4) * 4
                payload = data[34 + tcp_off: 14 + ip_total]
                if payload:
                    packets[key] = payload
        current_hex, current_flow = bytearray(), None

    raw = path.read_bytes()
    if raw[:2] in (b"\xff\xfe", b"\xfe\xff"):
        text = raw.decode("utf-16")
    else:
        text = raw.decode("utf-8", errors="replace")

    with __import__("io").StringIO(text) as f:
        for line in f:
            if EVENT_LINE.search(line):
                flush()
                continue
            m = FLOW_LINE.search(line)
            if m and current_flow is None:
                current_flow = (
                    m.group(1), int(m.group(2)),
                    m.group(3), int(m.group(4)),
                    int(m.group(5)),
                )
                continue
            m = HEX_LINE.match(line)
            if m and current_flow is not None:
                hexpart = m.group(2).replace(" ", "")
                current_hex.extend(bytes.fromhex(hexpart))
        flush()
    return packets


def reassemble(packets):
    """按方向重组 TCP 流（按 seq 排序）。"""
    streams = {}  # (src_ip,sport,dst_ip,dport) -> {seq: payload}
    for (sip, sp, dip, dp, seq), payload in packets.items():
        streams.setdefault((sip, sp, dip, dp), {})[seq] = payload
    out = {}
    for key, chunks in streams.items():
        buf = bytearray()
        last_end = None
        for seq in sorted(chunks):
            payload = chunks[seq]
            if last_end is None:
                buf.extend(payload)
            elif seq == last_end:
                buf.extend(payload)
            elif seq > last_end:
                gap = seq - last_end
                if gap > 1_000_000:  # 巨大空隙(丢包/中途入网), 截断重对齐
                    buf.extend(b"\n...\n")
                else:
                    buf.extend(b"\x00" * gap)
                buf.extend(payload)
            # seq < last_end: 乱序重复，跳过（简化处理）
            last_end = seq + len(payload)
        out[key] = bytes(buf)
    return out


def try_decode(data: bytes) -> str:
    for enc in ("utf-8", "gb18030"):
        try:
            return data.decode(enc)
        except UnicodeDecodeError:
            continue
    return data.decode("utf-8", errors="replace")


def main():
    sys.stdout.reconfigure(encoding="utf-8")
    src = Path(sys.argv[1])
    packets = parse_packets(src)
    print(f"去重后数据包: {len(packets)}")
    streams = reassemble(packets)
    print(f"TCP 流数: {len(streams)}")

    out_dir = src.parent / "streams"
    out_dir.mkdir(exist_ok=True)

    for key, data in streams.items():
        sip, sp, dip, dp = key
        if len(data) < 4:
            continue
        name = f"{sip.replace('.', '-')}_{sp}_to_{dip.replace('.', '-')}_{dp}.bin"
        (out_dir / name).write_bytes(data)
        preview = try_decode(data[:200]).replace("\n", "\\n")[:160]
        size = len(data)
        print(f"  {sip}:{sp} -> {dip}:{dp}  {size}B  {preview!r}")


if __name__ == "__main__":
    main()
