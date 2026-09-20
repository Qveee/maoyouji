from PIL import Image
import sys
sys.stdout.reconfigure(encoding='utf-8')
from pathlib import Path
for n in ['领取任务按钮','归还任务按钮']:
    im = Image.open(Path(r'D:\maoyouji\assets\原版参考\图标')/f'{n}.gif')
    print(f'{n}: {im.size}')
