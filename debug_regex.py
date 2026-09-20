import re, sys
sys.stdout.reconfigure(encoding='utf-8')
t = open(r'D:\maoyouji\测试\游戏主界面.html', encoding='utf-8').read()
i = t.find('const icon=pos<0')
print(repr(t[i:i+120]))
pat = re.compile(r"const icon=pos<0\?`<img class=\"atk-ico\"[^`]*`>:IC\.talk;")
print('匹配:', bool(pat.search(t)))
