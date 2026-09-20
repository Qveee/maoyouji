import sys
sys.stdout.reconfigure(encoding='utf-8')
t = open(r'D:\maoyouji\测试\游戏主界面.html', encoding='utf-8').read()
print('HTML 层 <div id="npcq-mask"> 出现:', t.count('<div id="npcq-mask">'), '次')
print('CSS 规则出现:', t.count('#npcq-mask{') + t.count('#npcq-mask.show{'), '次')
print('JS 引用:', t.count("$('#npcq-mask')"), '次 + 判断', t.count("e.target.id==='npcq-mask'"), '次')
