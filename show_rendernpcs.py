import re, sys
sys.stdout.reconfigure(encoding='utf-8')
t = open(r'D:\maoyouji\测试\游戏主界面.html', encoding='utf-8').read()
i = t.find('function renderNpcs')
print(re.sub(r'\s+',' ', t[i:i+600])[:560])
