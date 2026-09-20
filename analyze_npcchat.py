from PIL import Image
import sys
sys.stdout.reconfigure(encoding='utf-8')
img = Image.open(r'D:\maoyouji\游戏内截图\npc聊天界面.png').convert('RGB')
W,H = img.size
print(f'尺寸: {W}x{H}')
px = img.load()
from collections import Counter
cnt = Counter()
for y in range(0,H,4):
    for x in range(0,W,4): cnt[(px[x,y][0]//16*16,px[x,y][1]//16*16,px[x,y][2]//16*16)] += 1
print('主色:', cnt.most_common(6))
# 行分布
print('行分布:')
prev=None
for y in range(0,H,6):
    rowc = Counter()
    for x in range(0,W,3):
        c=px[x,y]
        rowc[('blue' if c[2]>150 and c[0]<120 else 'green' if c[1]>130 and c[0]<110 else 'red' if c[0]>160 and c[1]<100 else 'dark' if sum(c)<200 else 'bg1' if (230,224,230)<=(c[0]//16*16,c[1]//16*16,c[2]//16*16)<(255,255,255) else 'other')] += 1
    top=[k for k,v in rowc.most_common(3) if v>W//12]
    if top and top!=prev:
        print(f'  y={y:3d}: {rowc.most_common(3)}')
        prev=top
