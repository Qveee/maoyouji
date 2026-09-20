import re, sys
sys.stdout.reconfigure(encoding='utf-8')
t = open(r'D:\maoyouji\测试\游戏主界面.html', encoding='utf-8').read()
i = t.find('const QUESTS=[')
print('== 原有 QUESTS（前900字）==')
print(re.sub(r'\s+',' ', t[i:i+1000])[:900])
print()
print('引用处:')
for m in re.finditer(r'QUESTS(?![A-Za-z])', t):
    line = t[max(0,m.start()-60):m.start()+80].replace('\n',' ')
    print('  ...', line[-130:])
