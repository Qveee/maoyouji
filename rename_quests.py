import sys
sys.stdout.reconfigure(encoding='utf-8')
path = r'D:\maoyouji\测试\游戏主界面.html'
t = open(path, encoding='utf-8').read()
# 只在任务系统注入块范围内替换 QUESTS -> NPCQ
start = t.find('/* ---------- NPC 任务系统')
end = t.find('const NPCS=', start)
assert start > 0 and end > start
block = t[start:end]
n = block.count('QUESTS')
block = block.replace('QUESTS', 'NPCQ')
t = t[:start] + block + t[end:]
open(path, 'w', encoding='utf-8').write(t)
print(f'✓ 注入块内 {n} 处 QUESTS 已改名 NPCQ（原有任务列表面板不受影响）')
