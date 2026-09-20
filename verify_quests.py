import sys
sys.stdout.reconfigure(encoding='utf-8')
t = open(r'D:\maoyouji\测试\游戏主界面.html', encoding='utf-8').read()
checks = [
    ('任务数据 QUESTS', 'const QUESTS={' in t),
    ('接取状态 taken', 'const taken=new Set()' in t),
    ('图标切换 npcIcon', 'function npcIcon(' in t and 'const icon=npcIcon(n,pos);' in t),
    ('领取任务按钮', '领取任务按钮.gif' in t),
    ('归还任务按钮', '归还任务按钮.gif' in t),
    ('对话层 HTML', 'id="npcq-mask"' in t),
    ('原版对话框样式', 'border:5px solid #5AA2BA' in t),
    ('接取函数', 'function takeQuest(' in t),
    ('对话层只注入一次', t.count('id="npcq-mask"') == 2),  # CSS 无 id=、HTML 1 + JS getElementById? 检查
]
for n, ok in checks: print(('✓' if ok else '✗'), n)
print('npcq-mask 出现次数:', t.count('npcq-mask'))
