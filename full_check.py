import re, sys
sys.stdout.reconfigure(encoding='utf-8')
t = open(r'D:\maoyouji\测试\游戏主界面.html', encoding='utf-8').read()
body = re.search(r'<script>(.*)</script>', t, re.S).group(1)
errs = []
# 自查2: NPCQ 定义与引用
npcq_def = len(re.findall(r'const NPCQ=', body))
npcq_ref = len(re.findall(r'NPCQ\[', body))
print(f'✓ NPCQ 定义 {npcq_def} 处（应1），引用 {npcq_ref} 处')
if npcq_def != 1: errs.append('NPCQ 重复定义')
# 自查3: 原有 QUESTS 完好
if 'const QUESTS=[' not in body or 'renderQuests' not in body: errs.append('原任务面板数据受损')
else: print('✓ 原有 QUESTS 任务面板数据完好')
# 自查4: 关键函数定义
for fn in ['npcIcon','openNpcChat','closeNpcChat','takeQuest','renderNpcs','renderPlayers','renderQuests','setLoc']:
    if f'function {fn}' not in body: errs.append(f'缺函数 {fn}')
print('✓ 8 个关键函数齐全' if not [e for e in errs if '函数' in e] else errs)
# 自查5: JS 引用的 id 都存在于 HTML
html = t[:t.find('<script>')]
ids = set(re.findall(r"\$\('#([\w-]+)'\)", body)) | set(re.findall(r"getElementById\('([\w-]+)'\)", body))
html_ids = set(re.findall(r'id="([\w-]+)"', html))
missing = ids - html_ids
print(f'✓ JS 引用的 {len(ids)} 个 id 全部存在于 HTML' if not missing else f'✗ 缺失 id: {missing}')
if missing: errs.append(f'id缺失{missing}')
# 自查6: 地图背景引用完好
for bg in ['猫隐村/猫隐村-官方预览图.jpg', '牧野草原/牧野草原-官方预览图.jpg']:
    if bg not in t: errs.append(f'地图背景缺失 {bg}')
print('✓ 地图背景图引用完好' if not [e for e in errs if '背景' in e] else '')
print()
print('=== 自查结果:', '全部通过 ✓' if not errs else errs, '===')
