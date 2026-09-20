import sys
sys.stdout.reconfigure(encoding='utf-8')
path = r'D:\maoyouji\测试\游戏主界面.html'
t = open(path, encoding='utf-8').read()
# 1) 摘出任务 JS 块
start = t.find('/* ---------- NPC 任务系统')
end_marker = "closeNpcChat();renderNpcs();\n}"
end = t.find(end_marker, start)
assert start > 0 and end > 0, '任务 JS 块定位失败'
block = t[start:end + len(end_marker)]
t = t[:start] + t[end + len(end_marker):]
# 2) 插入到 const NPCS 之前
anchor = 'const NPCS='
i = t.find(anchor)
assert i > 0
t = t[:i] + block + '\n\n' + t[i:]
open(path, 'w', encoding='utf-8').write(t)
print('✓ 任务 JS 已前移到 NPCS 数据之前')
