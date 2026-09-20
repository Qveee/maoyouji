import re, sys
sys.stdout.reconfigure(encoding='utf-8')
t = open(r'D:\maoyouji\测试\游戏主界面.html', encoding='utf-8').read()
# 顺序验证：QUESTS < NPCS < renderNpcs < renderPlayers
pos = {k: t.find(k) for k in ['const QUESTS=', 'const NPCS=', 'function renderNpcs', 'renderPlayers();']}
print('定义顺序:', sorted(pos, key=lambda k: pos[k]))
ok = pos['const QUESTS='] < pos['const NPCS='] < pos['function renderNpcs']
print('✓ 顺序正确' if ok else '✗ 顺序错误')
# 语法粗检：任务块内引号/反引号配对
block = t[t.find('/* ---------- NPC 任务系统'):t.find('function takeQuest')]
print('任务块反引号数(应为偶数):', block.count('`'))
