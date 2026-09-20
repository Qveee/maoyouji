import re, sys
sys.stdout.reconfigure(encoding='utf-8')
t = open(r'D:\maoyouji\测试\游戏主界面.html', encoding='utf-8').read()
i = t.find('const NPCS')
print('== NPCS 数据（前800字）==')
print(re.sub(r'\s+',' ', t[i:i+900])[:850])
print()
# NPC 点击逻辑
for m in re.finditer(r"npc-list'\)\.addEventListener|#npc-list .npc\{|\.npc\{", t):
    print(re.sub(r'\s+',' ', t[max(0,m.start()-100):m.start()+400])[:450])
    print('=====')
    break
# IC 图标定义
m = re.search(r'const IC=\{[^}]*\}|const IC=', t)
if m: print('IC 定义:', re.sub(r'\s+',' ', t[m.start():m.start()+400])[:380])
