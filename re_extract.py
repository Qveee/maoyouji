import re, sys
sys.stdout.reconfigure(encoding='utf-8')
t = open(r'D:\maoyouji\测试\游戏主界面.html', encoding='utf-8').read()
body = re.search(r'<script>(.*)</script>', t, re.S).group(1)
open('_check_script.js', 'w', encoding='utf-8').write(body)
print('script 提取:', len(body), '字符')
