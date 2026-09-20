import sys
sys.stdout.reconfigure(encoding='utf-8')
t = open(r'D:\maoyouji\docs\游戏规则设计.md', encoding='utf-8').read()
i = t.find('## 4. 地图系统')
j = t.find('## 5.', i)
print(t[i:j if j > 0 else i+6000])
