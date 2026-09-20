import re, sys
sys.stdout.reconfigure(encoding='utf-8')
t = open(r'D:\maoyouji\测试\游戏主界面.html', encoding='utf-8').read()
# 提取 script 内容做语法检查准备 + 找可疑残片
body = re.search(r'<script>(.*)</script>', t, re.S).group(1)
open('_check_script.js', 'w', encoding='utf-8').write(body)
print('script 长度:', len(body))
# 检查任务块移动后原位置残留
i = t.find('renderPlayers();')
seg = t[i:i+400]
print('== renderPlayers 调用后 400 字 ==')
print(re.sub(r'\s+', ' ', seg)[:380])
