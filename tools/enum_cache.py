#!/usr/bin/env python3
"""枚举 WinINET 缓存（URL → 本地文件），按关键词筛选。"""

import ctypes
import ctypes.wintypes as wt
import sys


wininet = ctypes.windll.wininet


class ENTRY(ctypes.Structure):
    _fields_ = [
        ("dwStructSize", wt.DWORD),
        ("lpszSourceUrlName", ctypes.c_wchar_p),
        ("lpszLocalFileName", ctypes.c_wchar_p),
        ("CacheEntryType", wt.DWORD),
        ("dwUseCount", wt.DWORD),
        ("dwHitRate", wt.DWORD),
        ("dwSizeLow", wt.DWORD),
        ("dwSizeHigh", wt.DWORD),
        ("LastModifiedTime", wt.FILETIME),
        ("ExpireTime", wt.FILETIME),
        ("LastAccessTime", wt.FILETIME),
        ("LastSyncTime", wt.FILETIME),
        ("lpHeaderInfo", ctypes.c_wchar_p),
        ("dwHeaderInfoSize", wt.DWORD),
        ("lpszFileExtension", ctypes.c_wchar_p),
        ("dwExemptDelta", wt.DWORD),
    ]


def call_first():
    size = wt.DWORD(0)
    wininet.FindFirstUrlCacheEntryW(None, None, ctypes.byref(size))
    buf = ctypes.create_string_buffer(size.value)
    handle = wininet.FindFirstUrlCacheEntryW(None, buf, ctypes.byref(size))
    return handle, buf, size


def entries():
    handle, buf, size = call_first()
    if not handle:
        raise SystemExit(f"FindFirstUrlCacheEntryW 失败: {ctypes.GetLastError()}")
    try:
        while True:
            e = ctypes.cast(buf, ctypes.POINTER(ENTRY)).contents
            url = e.lpszSourceUrlName or ""
            local = e.lpszLocalFileName or ""
            sz = (e.dwSizeHigh << 32) | e.dwSizeLow
            if url.startswith("http"):
                yield url, local, sz
            # next: 先查大小
            nsize = wt.DWORD(0)
            wininet.FindNextUrlCacheEntryW(handle, None, ctypes.byref(nsize))
            if nsize.value == 0:
                break
            nbuf = ctypes.create_string_buffer(nsize.value)
            if not wininet.FindNextUrlCacheEntryW(handle, nbuf, ctypes.byref(nsize)):
                break
            buf = nbuf
    finally:
        wininet.FindCloseUrlCache(handle)


def main():
    sys.stdout.reconfigure(encoding="utf-8")
    kws = [k.lower() for k in (sys.argv[1:] or ["battle"])]
    n = total = 0
    for url, local, size in entries():
        total += 1
        low = url.lower()
        if any(k in low for k in kws):
            print(f"{size:>9}  {url}\n          {local}")
            n += 1
    print(f"\n缓存总数 {total}，匹配 {n}")


if __name__ == "__main__":
    main()
