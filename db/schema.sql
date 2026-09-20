-- ============================================================
-- 《喵游记》数据库结构（第一版：核心单机循环）
-- 适用：MySQL 8.0.16+ / utf8mb4 / InnoDB / 单服单库
-- 说明：DDL + 每表示例数据（示例为随机编造，仅演示外键链，
--       不依赖 docs/清单 内容；正式种子数据后续由清单生成）
-- ============================================================

CREATE DATABASE IF NOT EXISTS maoyouji
  DEFAULT CHARACTER SET utf8mb4
  DEFAULT COLLATE utf8mb4_0900_ai_ci;

USE maoyouji;

-- ① 配置表：技能 / 道具 / 装备 / 品种 / 等级 / 套装 --------------------

-- 道具模板（8 章道具系统；装备也在此登记一条，扩展见 cfg_equipment_templates）
CREATE TABLE cfg_item_templates (
  id                BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY COMMENT '自增主键',
  code              VARCHAR(64)  NOT NULL COMMENT '道具编码，如 FOOD_001 / EQP_W001',
  name              VARCHAR(64)  NOT NULL COMMENT '名称',
  category          ENUM('food','battle','toy','growth','quest','material','equipment') NOT NULL COMMENT '道具分类：食物/战斗消耗/玩具/成长/任务/材料/装备',
  max_stack         SMALLINT UNSIGNED NOT NULL DEFAULT 99 COMMENT '堆叠上限，装备/任务道具=1',
  use_effect        JSON NULL COMMENT '使用效果参数，如 {"hp_percent":30}',
  sellable          TINYINT(1) NOT NULL DEFAULT 1 COMMENT '可否出售商店',
  sell_price_copper BIGINT UNSIGNED NOT NULL DEFAULT 0 COMMENT '商店回收价（铜币）',
  droppable         TINYINT(1) NOT NULL DEFAULT 1 COMMENT '可否掉落',
  can_discard       TINYINT(1) NOT NULL DEFAULT 1 COMMENT '任务道具=0 不可丢弃',
  usable            TINYINT(1) NOT NULL DEFAULT 1 COMMENT '可否主动使用（材料/任务道具=0）',
  can_shortcut      TINYINT(1) NOT NULL DEFAULT 0 COMMENT '可否放入快捷栏快捷使用',
  quality           ENUM('black','green','blue','purple','orange') NOT NULL DEFAULT 'black' COMMENT '品质展示色：黑<绿<蓝<紫<橙',
  unit              VARCHAR(8)  NOT NULL DEFAULT '个' COMMENT '数量单位量词：个/块/支/枚/只/本…（开放集合，策划可自由扩展）',
  icon              VARCHAR(128) NOT NULL DEFAULT '' COMMENT '图标资源名',
  description       VARCHAR(500) NOT NULL DEFAULT '' COMMENT '描述',
  created_at        DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间（UTC）',
  updated_at        DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间（UTC）',
  UNIQUE KEY uk_cfg_item_templates_code (code)
) ENGINE=InnoDB COMMENT='道具模板';

-- 技能模板（5 章技能系统）
CREATE TABLE cfg_skills (
  id                BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY COMMENT '自增主键',
  code              VARCHAR(64)  NOT NULL COMMENT '技能编码，如 SKL_001',
  name              VARCHAR(64)  NOT NULL COMMENT '技能名称',
  skill_type        ENUM('active','passive','talent') NOT NULL COMMENT '主动/被动/天赋',
  element           ENUM('none','fire','water','wind','earth','light','dark') NOT NULL DEFAULT 'none' COMMENT '元素：无/火/水/风/地/光/暗',
  target_scope      ENUM('single','all','self') NOT NULL DEFAULT 'single' COMMENT '单体/全体/自身',
  hit_count         TINYINT UNSIGNED NOT NULL DEFAULT 1 COMMENT '段数，如二连击=2',
  base_rate_perc    DECIMAL(6,2) UNSIGNED NOT NULL DEFAULT 0 COMMENT '每段基础倍率%（如 120.00）',
  mp_cost           SMALLINT UNSIGNED NOT NULL DEFAULT 0 COMMENT 'MP 消耗',
  cooldown_rounds   TINYINT UNSIGNED NOT NULL DEFAULT 0 COMMENT '冷却回合数',
  status_effects    JSON NULL COMMENT '附加状态参数，如 [{"type":"burn","chance_perc":30,"rounds":2}]',
  growth_perc       DECIMAL(5,2) UNSIGNED NOT NULL DEFAULT 8.00 COMMENT '每级成长：倍率相对提升%',
  required_level    TINYINT UNSIGNED NOT NULL DEFAULT 1 COMMENT '学习需求等级',
  learn_gold_cost_copper BIGINT UNSIGNED NOT NULL DEFAULT 0 COMMENT '学习金币消耗（最小单位铜币）',
  learn_book_item_id     BIGINT UNSIGNED NULL COMMENT '学习所需技能书道具，NULL=无需技能书',
  description       VARCHAR(500) NOT NULL DEFAULT '' COMMENT '描述',
  created_at        DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间（UTC）',
  updated_at        DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间（UTC）',
  UNIQUE KEY uk_cfg_skills_code (code),
  CONSTRAINT fk_cfg_skills_book_item FOREIGN KEY (learn_book_item_id) REFERENCES cfg_item_templates (id)
) ENGINE=InnoDB COMMENT='技能配置';

-- 套装配置（装备清单套装体系）
CREATE TABLE cfg_suits (
  id                BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY COMMENT '自增主键',
  code              VARCHAR(64)  NOT NULL COMMENT '编码，全局唯一',
  name              VARCHAR(64)  NOT NULL COMMENT '名称',
  bonuses           JSON NOT NULL COMMENT '按件数触发效果，如 {"2":{"atk":10},"4":{"hp":200}}',
  created_at        DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间（UTC）',
  updated_at        DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间（UTC）',
  UNIQUE KEY uk_cfg_suits_code (code)
) ENGINE=InnoDB COMMENT='装备套装配置';

-- 装备部位配置（可扩展：新增「饰品」「守护之星」等只需插一行配置，零 DDL）
CREATE TABLE cfg_equipment_slots (
  id                BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY COMMENT '自增主键',
  code              VARCHAR(32)  NOT NULL COMMENT '部位编码，如 main_hand',
  name              VARCHAR(32)  NOT NULL COMMENT '部位中文名，如 主手',
  sort_order        SMALLINT UNSIGNED NOT NULL DEFAULT 0 COMMENT 'UI 装备栏展示顺序',
  created_at        DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间（UTC）',
  updated_at        DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间（UTC）',
  UNIQUE KEY uk_cfg_equipment_slots_code (code)
) ENGINE=InnoDB COMMENT='装备部位配置';

-- 装备模板（道具模板的装备扩展：一行道具模板对应零或一行）
CREATE TABLE cfg_equipment_templates (
  id                BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY COMMENT '自增主键',
  item_template_id  BIGINT UNSIGNED NOT NULL COMMENT '关联道具模板 id',
  slot_id           BIGINT UNSIGNED NOT NULL COMMENT '装备部位，引用 cfg_equipment_slots（12 基础部位+扩展部位）',
  quality           ENUM('gray','green','blue','purple','orange') NOT NULL COMMENT '装备品质：灰<绿<蓝<紫<橙',
  required_level    TINYINT UNSIGNED NOT NULL DEFAULT 1 COMMENT '需求等级',
  required_class    ENUM('all','warrior','mage') NOT NULL DEFAULT 'all' COMMENT '职业限制：不限/战士/魔法师',
  weapon_type       VARCHAR(32) NULL COMMENT '武器细类（刀/剑/爪…），非武器为 NULL',
  base_stats        JSON NOT NULL COMMENT '基础属性，如 {"patk":8} / {"pdef":25,"hp":50}',
  suit_id           BIGINT UNSIGNED NULL COMMENT '所属套装，NULL=无套装',
  description       VARCHAR(500) NOT NULL DEFAULT '' COMMENT '描述',
  created_at        DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间（UTC）',
  updated_at        DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间（UTC）',
  UNIQUE KEY uk_cfg_equipment_templates_item (item_template_id),
  CONSTRAINT fk_cfg_equipment_templates_item FOREIGN KEY (item_template_id) REFERENCES cfg_item_templates (id),
  CONSTRAINT fk_cfg_equipment_templates_suit  FOREIGN KEY (suit_id) REFERENCES cfg_suits (id),
  CONSTRAINT fk_cfg_equipment_templates_slot  FOREIGN KEY (slot_id) REFERENCES cfg_equipment_slots (id)
) ENGINE=InnoDB COMMENT='装备模板';

-- 品种配置（3.2 节：6 品种=职业出身，品种不锁玩法）
CREATE TABLE cfg_breeds (
  id                BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY COMMENT '自增主键',
  code              VARCHAR(32)  NOT NULL COMMENT '编码，全局唯一',
  name              VARCHAR(32)  NOT NULL COMMENT '名称',
  role              VARCHAR(32)  NOT NULL DEFAULT '' COMMENT '定位描述，如 物理输出',
  bonus_attribute   ENUM('vit','str','agi','int','spr','luk') NOT NULL COMMENT '初始加成属性',
  bonus_value       TINYINT UNSIGNED NOT NULL DEFAULT 3 COMMENT '初始加成数值',
  main_attribute    ENUM('vit','str','agi','int','spr','luk') NOT NULL COMMENT '升级自动 +1 的主属性',
  talent_skill_id   BIGINT UNSIGNED NOT NULL COMMENT '品种天赋技能（不可替换）',
  description       VARCHAR(500) NOT NULL DEFAULT '' COMMENT '描述',
  created_at        DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间（UTC）',
  updated_at        DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间（UTC）',
  UNIQUE KEY uk_cfg_breeds_code (code),
  CONSTRAINT fk_cfg_breeds_talent_skill FOREIGN KEY (talent_skill_id) REFERENCES cfg_skills (id)
) ENGINE=InnoDB COMMENT='品种配置';

-- 等级配置（2.3 节公式落地为表，便于调平衡）
CREATE TABLE cfg_levels (
  level             TINYINT UNSIGNED PRIMARY KEY COMMENT '1~60',
  exp_to_next       INT UNSIGNED NOT NULL COMMENT '升到下一级所需经验',
  created_at        DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间（UTC）',
  updated_at        DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间（UTC）',
  CONSTRAINT chk_cfg_levels_exp CHECK (exp_to_next > 0)
) ENGINE=InnoDB COMMENT='等级经验配置';

-- ② 配置表：怪物 / 地图 / NPC / 商店 -------------------------------

-- 怪物模板（11 章数值模板生成后可微调）
CREATE TABLE cfg_monsters (
  id                BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY COMMENT '自增主键',
  code              VARCHAR(64)  NOT NULL COMMENT '编码，全局唯一',
  name              VARCHAR(64)  NOT NULL COMMENT '名称',
  monster_type      ENUM('normal','elite','boss') NOT NULL DEFAULT 'normal' COMMENT '怪物类型：普通/精英/BOSS',
  element           ENUM('none','fire','water','wind','earth','light','dark') NOT NULL DEFAULT 'none' COMMENT '元素：无/火/水/风/地/光/暗',
  level             TINYINT UNSIGNED NOT NULL COMMENT '等级',
  hp                INT UNSIGNED NOT NULL COMMENT '生命上限',
  patk              SMALLINT UNSIGNED NOT NULL COMMENT '物理攻击',
  matk              SMALLINT UNSIGNED NOT NULL COMMENT '魔法攻击',
  pdef              SMALLINT UNSIGNED NOT NULL COMMENT '物理防御',
  mdef              SMALLINT UNSIGNED NOT NULL COMMENT '魔法防御',
  speed             SMALLINT UNSIGNED NOT NULL COMMENT '速度',
  exp_reward        INT UNSIGNED NOT NULL DEFAULT 0 COMMENT '击杀经验奖励',
  gold_reward_copper INT UNSIGNED NOT NULL DEFAULT 0 COMMENT '击杀金币奖励（铜币）',
  skills            JSON NULL COMMENT '可用技能，如 [{"skill_id":3,"phase":1}]（BOSS 按 phase 切换技能组）',
  recommended_level TINYINT UNSIGNED NOT NULL DEFAULT 1 COMMENT '推荐挑战等级',
  description       VARCHAR(500) NOT NULL DEFAULT '' COMMENT '描述',
  created_at        DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间（UTC）',
  updated_at        DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间（UTC）',
  UNIQUE KEY uk_cfg_monsters_code (code)
) ENGINE=InnoDB COMMENT='怪物模板';

-- 怪物掉落（独立表：支持「按道具反查来源怪物」）
CREATE TABLE cfg_monster_drops (
  id                BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY COMMENT '自增主键',
  monster_id        BIGINT UNSIGNED NOT NULL COMMENT '关联怪物 id',
  item_template_id  BIGINT UNSIGNED NOT NULL COMMENT '关联道具模板 id',
  drop_rate_perc    DECIMAL(6,3) UNSIGNED NOT NULL COMMENT '基础掉率%（受幸运/怪物类型修正）',
  min_qty           SMALLINT UNSIGNED NOT NULL DEFAULT 1 COMMENT '最小掉落数量',
  max_qty           SMALLINT UNSIGNED NOT NULL DEFAULT 1 COMMENT '最大掉落数量',
  created_at        DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间（UTC）',
  updated_at        DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间（UTC）',
  UNIQUE KEY uk_cfg_monster_drops (monster_id, item_template_id),
  CONSTRAINT chk_cfg_monster_drops_qty CHECK (min_qty <= max_qty),
  CONSTRAINT fk_cfg_monster_drops_monster FOREIGN KEY (monster_id) REFERENCES cfg_monsters (id),
  CONSTRAINT fk_cfg_monster_drops_item   FOREIGN KEY (item_template_id) REFERENCES cfg_item_templates (id)
) ENGINE=InnoDB COMMENT='怪物掉落配置';

-- 地图（4 章世界结构：多城市网络）
CREATE TABLE cfg_maps (
  id                BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY COMMENT '自增主键',
  code              VARCHAR(64)  NOT NULL COMMENT '编码，全局唯一',
  name              VARCHAR(64)  NOT NULL COMMENT '名称',
  map_type          ENUM('field','town') NOT NULL COMMENT '野外/城镇安全区',
  level_min         TINYINT UNSIGNED NOT NULL DEFAULT 1 COMMENT '地图最低等级',
  level_max         TINYINT UNSIGNED NOT NULL DEFAULT 60 COMMENT '地图最高等级',
  adjacent_map_ids  JSON NULL COMMENT '相邻地图 id 数组（传送/解锁网络）',
  unlock_condition  JSON NULL COMMENT '解锁条件，如 {"min_level":10,"quest_id":7,"item_id":3,"qty":3}',
  spawn_config      JSON NULL COMMENT '刷怪参数，如 {"no_monster_perc":50,"min_count":1,"max_count":3,"respawn_seconds":180}',
  created_at        DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间（UTC）',
  updated_at        DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间（UTC）',
  UNIQUE KEY uk_cfg_maps_code (code)
) ENGINE=InnoDB COMMENT='地图配置';

-- 地图节点（4.2 网格：编号乱序、不规则分布、视野迷雾）
CREATE TABLE cfg_map_nodes (
  id                BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY COMMENT '自增主键',
  map_id            BIGINT UNSIGNED NOT NULL COMMENT '关联地图 id',
  node_code         VARCHAR(8)   NOT NULL COMMENT '图内两位编号，同图不重复',
  grid_x            TINYINT UNSIGNED NOT NULL COMMENT '网格 X 坐标',
  grid_y            TINYINT UNSIGNED NOT NULL COMMENT '网格 Y 坐标',
  node_type         ENUM('normal','town','boss','treasure','gather','bush','npc','empty') NOT NULL DEFAULT 'normal' COMMENT '节点类型：普通/城镇/BOSS/宝箱/采集/草丛/NPC/空地',
  is_walkable       TINYINT(1) NOT NULL DEFAULT 1 COMMENT '是否可通行（空地/障碍=0）',
  neighbors         JSON NULL COMMENT '相邻可达节点 id 数组',
  created_at        DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间（UTC）',
  updated_at        DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间（UTC）',
  UNIQUE KEY uk_cfg_map_nodes (map_id, node_code),
  CONSTRAINT fk_cfg_map_nodes_map FOREIGN KEY (map_id) REFERENCES cfg_maps (id)
) ENGINE=InnoDB COMMENT='地图节点配置';

-- 节点怪物池（隐藏随机刷怪：抵达格子时按权重抽取）
CREATE TABLE cfg_node_spawns (
  id                BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY COMMENT '自增主键',
  node_id           BIGINT UNSIGNED NOT NULL COMMENT '关联节点 id',
  monster_id        BIGINT UNSIGNED NOT NULL COMMENT '关联怪物 id',
  weight            SMALLINT UNSIGNED NOT NULL DEFAULT 100 COMMENT '抽取权重',
  created_at        DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间（UTC）',
  updated_at        DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间（UTC）',
  UNIQUE KEY uk_cfg_node_spawns (node_id, monster_id),
  CONSTRAINT fk_cfg_node_spawns_node    FOREIGN KEY (node_id) REFERENCES cfg_map_nodes (id),
  CONSTRAINT fk_cfg_node_spawns_monster FOREIGN KEY (monster_id) REFERENCES cfg_monsters (id)
) ENGINE=InnoDB COMMENT='节点刷怪池';

-- 商店（4.4 节装备店/道具店等）
CREATE TABLE cfg_shops (
  id                BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY COMMENT '自增主键',
  code              VARCHAR(64)  NOT NULL COMMENT '编码，全局唯一',
  name              VARCHAR(64)  NOT NULL COMMENT '名称',
  created_at        DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间（UTC）',
  updated_at        DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间（UTC）',
  UNIQUE KEY uk_cfg_shops_code (code)
) ENGINE=InnoDB COMMENT='商店配置';

-- NPC（城市设施/任务派发/野外 NPC）
CREATE TABLE cfg_npcs (
  id                BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY COMMENT '自增主键',
  code              VARCHAR(64)  NOT NULL COMMENT '编码，全局唯一',
  name              VARCHAR(64)  NOT NULL COMMENT '名称',
  npc_type          ENUM('shop','quest','service','dialog') NOT NULL COMMENT 'NPC 类型：商店/任务/功能/对话',
  map_id            BIGINT UNSIGNED NOT NULL COMMENT '关联地图 id',
  node_id           BIGINT UNSIGNED NULL COMMENT '所在节点，NULL=未固定位置',
  shop_id           BIGINT UNSIGNED NULL COMMENT 'npc_type=shop 时关联商店',
  description       VARCHAR(500) NOT NULL DEFAULT '' COMMENT '描述',
  created_at        DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间（UTC）',
  updated_at        DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间（UTC）',
  UNIQUE KEY uk_cfg_npcs_code (code),
  CONSTRAINT fk_cfg_npcs_map  FOREIGN KEY (map_id) REFERENCES cfg_maps (id),
  CONSTRAINT fk_cfg_npcs_node FOREIGN KEY (node_id) REFERENCES cfg_map_nodes (id),
  CONSTRAINT fk_cfg_npcs_shop FOREIGN KEY (shop_id) REFERENCES cfg_shops (id)
) ENGINE=InnoDB COMMENT='NPC 配置';

-- 商店货架（价格统一存最小单位铜币，金银只是展示换算）
CREATE TABLE cfg_shop_items (
  id                BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY COMMENT '自增主键',
  shop_id           BIGINT UNSIGNED NOT NULL COMMENT '关联商店 id',
  item_template_id  BIGINT UNSIGNED NOT NULL COMMENT '关联道具模板 id',
  price_copper      BIGINT UNSIGNED NOT NULL COMMENT '售价（铜币）',
  currency_type     VARCHAR(32) NOT NULL DEFAULT 'copper' COMMENT 'copper/silver/gold，预留新货币',
  daily_limit       INT UNSIGNED NULL COMMENT '每日限购数，NULL=无限购',
  sort_order        SMALLINT UNSIGNED NOT NULL DEFAULT 0 COMMENT '展示排序',
  created_at        DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间（UTC）',
  updated_at        DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间（UTC）',
  UNIQUE KEY uk_cfg_shop_items (shop_id, item_template_id),
  CONSTRAINT fk_cfg_shop_items_shop FOREIGN KEY (shop_id) REFERENCES cfg_shops (id),
  CONSTRAINT fk_cfg_shop_items_item FOREIGN KEY (item_template_id) REFERENCES cfg_item_templates (id)
) ENGINE=InnoDB COMMENT='商店货架配置';

-- ③ 配置表：任务 -----------------------------------------------

-- 任务模板（10 章 + 任务清单；对话字段对应清单三段对话）
CREATE TABLE cfg_quest_templates (
  id                BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY COMMENT '自增主键',
  code              VARCHAR(64)  NOT NULL COMMENT '任务 ID，如 MQ-001',
  name              VARCHAR(128) NOT NULL COMMENT '任务名称',
  quest_type        ENUM('main','side','daily','weekly','achievement') NOT NULL COMMENT '任务类型：主线/支线/日常/周常/成就',
  start_npc_id      BIGINT UNSIGNED NULL COMMENT '接取 NPC，NULL=任务板/系统',
  end_npc_id        BIGINT UNSIGNED NULL COMMENT '交付 NPC',
  min_level         TINYINT UNSIGNED NOT NULL DEFAULT 1 COMMENT '接取最低等级',
  prerequisite_quest_ids JSON NULL COMMENT '前置任务 id 数组',
  accept_conditions JSON NULL COMMENT '额外接取条件（道具/成就等）',
  rewards           JSON NOT NULL COMMENT '奖励，如 {"exp":120,"copper":10000,"items":[{"item_id":2,"qty":1}]}',
  accept_dialog     TEXT NULL COMMENT '接取任务对话',
  progress_dialog   TEXT NULL COMMENT '进行中对话',
  complete_dialog   TEXT NULL COMMENT '交付对话',
  description       VARCHAR(1000) NOT NULL DEFAULT '' COMMENT '描述',
  created_at        DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间（UTC）',
  updated_at        DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间（UTC）',
  UNIQUE KEY uk_cfg_quest_templates_code (code),
  CONSTRAINT fk_cfg_quest_templates_start_npc FOREIGN KEY (start_npc_id) REFERENCES cfg_npcs (id),
  CONSTRAINT fk_cfg_quest_templates_end_npc   FOREIGN KEY (end_npc_id) REFERENCES cfg_npcs (id)
) ENGINE=InnoDB COMMENT='任务模板';

-- 任务目标（通用目标：type + params JSON，支持杀怪/收集/对话/到达/使用）
CREATE TABLE cfg_quest_objectives (
  id                BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY COMMENT '自增主键',
  quest_id          BIGINT UNSIGNED NOT NULL COMMENT '关联任务模板 id',
  objective_type    ENUM('kill','collect','talk','reach','use') NOT NULL COMMENT '目标类型：杀怪/收集/对话/到达/使用',
  target            JSON NOT NULL COMMENT '目标参数，如 {"monster_id":1} / {"npc_id":3} / {"node_id":5}',
  required_count    INT UNSIGNED NOT NULL DEFAULT 1 COMMENT '目标所需数量',
  sort_order        TINYINT UNSIGNED NOT NULL DEFAULT 0 COMMENT '目标排序',
  created_at        DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间（UTC）',
  updated_at        DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间（UTC）',
  CONSTRAINT fk_cfg_quest_objectives_quest FOREIGN KEY (quest_id) REFERENCES cfg_quest_templates (id)
) ENGINE=InnoDB COMMENT='任务目标配置';

-- ④ 玩家数据：账号 / 角色 ------------------------------------------

-- 账号（登录凭证与游戏数据分离）
CREATE TABLE accounts (
  id                BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY COMMENT '自增主键',
  username          VARCHAR(32)  NOT NULL COMMENT '登录用户名（唯一）',
  password_hash     VARCHAR(255) NOT NULL COMMENT 'bcrypt/argon2，由后端决定',
  last_login_at     DATETIME(0) NULL COMMENT '最后登录时间（UTC）',
  created_at        DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间（UTC）',
  updated_at        DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间（UTC）',
  UNIQUE KEY uk_accounts_username (username)
) ENGINE=InnoDB COMMENT='账号';

-- 角色（宠物即角色：一账号最多 5 角色，上限由应用层校验）
CREATE TABLE characters (
  id                BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY COMMENT '自增主键',
  account_id        BIGINT UNSIGNED NOT NULL COMMENT '所属账号 id',
  name              VARCHAR(32)  NOT NULL COMMENT '全服唯一；软删时应用层改名释放昵称',
  breed_id          BIGINT UNSIGNED NOT NULL COMMENT '品种 id',
  level             TINYINT UNSIGNED NOT NULL DEFAULT 1 COMMENT '等级（1~60）',
  exp               BIGINT UNSIGNED NOT NULL DEFAULT 0 COMMENT '当前等级内经验',
  vit               SMALLINT UNSIGNED NOT NULL DEFAULT 5 COMMENT '以下六维存当前总值（初始+品种+升级+自由分配）',
  str               SMALLINT UNSIGNED NOT NULL DEFAULT 5 COMMENT 'STR 力量',
  agi               SMALLINT UNSIGNED NOT NULL DEFAULT 5 COMMENT 'AGI 敏捷',
  intel             SMALLINT UNSIGNED NOT NULL DEFAULT 5 COMMENT 'INT 智力（int 为关键字，列名用 intel）',
  spr               SMALLINT UNSIGNED NOT NULL DEFAULT 5 COMMENT 'SPR 精神',
  luk               SMALLINT UNSIGNED NOT NULL DEFAULT 5 COMMENT 'LUK 幸运',
  free_attribute_points SMALLINT UNSIGNED NOT NULL DEFAULT 0 COMMENT '可分配自由属性点',
  fatigue           TINYINT UNSIGNED NOT NULL DEFAULT 0 COMMENT '疲劳 0~100（3.4 节）',
  loyalty           TINYINT UNSIGNED NOT NULL DEFAULT 50 COMMENT '忠诚 0~100（3.5 节）',
  evolution_stage   TINYINT UNSIGNED NOT NULL DEFAULT 1 COMMENT '1幼猫/2少年猫/3成年猫/4猫侠/5传说猫侠',
  fur_color         VARCHAR(32) NULL COMMENT '毛色，纯外观',
  current_node_id   BIGINT UNSIGNED NULL COMMENT '当前所在地图节点',
  deleted_at        DATETIME(0) NULL COMMENT '软删除时间',
  created_at        DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间（UTC）',
  updated_at        DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间（UTC）',
  UNIQUE KEY uk_characters_name (name),
  CONSTRAINT chk_characters_level   CHECK (level BETWEEN 1 AND 60),
  CONSTRAINT chk_characters_fatigue CHECK (fatigue <= 100),
  CONSTRAINT chk_characters_loyalty CHECK (loyalty <= 100),
  CONSTRAINT fk_characters_account FOREIGN KEY (account_id) REFERENCES accounts (id),
  CONSTRAINT fk_characters_breed   FOREIGN KEY (breed_id) REFERENCES cfg_breeds (id),
  CONSTRAINT fk_characters_node    FOREIGN KEY (current_node_id) REFERENCES cfg_map_nodes (id)
) ENGINE=InnoDB COMMENT='角色（玩家的小猫）';

-- ⑤ 玩家数据：货币 / 技能 / 背包 / 装备 ------------------------------

-- 货币钱包（金银铜各一行；金银铜展示换算由应用层定义）
CREATE TABLE character_currencies (
  id                BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY COMMENT '自增主键',
  character_id      BIGINT UNSIGNED NOT NULL COMMENT '所属角色 id',
  currency_type     VARCHAR(32)  NOT NULL COMMENT 'copper/silver/gold',
  amount            BIGINT UNSIGNED NOT NULL DEFAULT 0 COMMENT '持有数量（最小单位）',
  created_at        DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间（UTC）',
  updated_at        DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间（UTC）',
  UNIQUE KEY uk_character_currencies (character_id, currency_type),
  CONSTRAINT chk_character_currencies_amount CHECK (amount >= 0),
  CONSTRAINT fk_character_currencies_character FOREIGN KEY (character_id) REFERENCES characters (id)
) ENGINE=InnoDB COMMENT='角色货币';

-- 已学技能（技能等级上限=角色等级，由应用层校验）
CREATE TABLE character_skills (
  id                BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY COMMENT '自增主键',
  character_id      BIGINT UNSIGNED NOT NULL COMMENT '所属角色 id',
  skill_id          BIGINT UNSIGNED NOT NULL COMMENT '关联技能 id',
  skill_level       TINYINT UNSIGNED NOT NULL DEFAULT 1 COMMENT '技能等级',
  learned_at        DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '学会时间（UTC）',
  created_at        DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间（UTC）',
  updated_at        DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间（UTC）',
  UNIQUE KEY uk_character_skills (character_id, skill_id),
  CONSTRAINT fk_character_skills_character FOREIGN KEY (character_id) REFERENCES characters (id),
  CONSTRAINT fk_character_skills_skill     FOREIGN KEY (skill_id) REFERENCES cfg_skills (id)
) ENGINE=InnoDB COMMENT='角色已学技能';

-- 背包（格子制：slot_index 唯一；已穿戴装备 slot_index 为 NULL）
CREATE TABLE character_inventory (
  id                BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY COMMENT '自增主键',
  character_id      BIGINT UNSIGNED NOT NULL COMMENT '所属角色 id',
  item_template_id  BIGINT UNSIGNED NOT NULL COMMENT '关联道具模板 id',
  slot_index        SMALLINT UNSIGNED NULL COMMENT '背包格子 0~299（容量 300 由应用层校验）；NULL=已穿戴',
  quantity          SMALLINT UNSIGNED NOT NULL DEFAULT 1 COMMENT '堆叠数量',
  enhance_level     TINYINT UNSIGNED NOT NULL DEFAULT 0 COMMENT '装备强化 +0~+15',
  enhance_fail_streak TINYINT UNSIGNED NOT NULL DEFAULT 0 COMMENT '连续强化失败次数（3 次保底必成）',
  socket_count      TINYINT UNSIGNED NOT NULL DEFAULT 0 COMMENT '孔位 0~2',
  socket_gems       JSON NULL COMMENT '已镶嵌宝石的道具模板 id 数组',
  affixes           JSON NULL COMMENT '随机词条，如 [{"attr":"crit_perc","value":3}]',
  created_at        DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间（UTC）',
  updated_at        DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间（UTC）',
  UNIQUE KEY uk_character_inventory_slot (character_id, slot_index),
  CONSTRAINT chk_character_inventory_quantity CHECK (quantity >= 1),
  CONSTRAINT chk_character_inventory_enhance CHECK (enhance_level <= 15),
  CONSTRAINT chk_character_inventory_socket  CHECK (socket_count <= 2),
  CONSTRAINT fk_character_inventory_character FOREIGN KEY (character_id) REFERENCES characters (id),
  CONSTRAINT fk_character_inventory_item     FOREIGN KEY (item_template_id) REFERENCES cfg_item_templates (id)
) ENGINE=InnoDB COMMENT='角色背包';

-- 装备位（12 部位一行一格；穿戴=背包实例 slot_index 置 NULL 并登记在此）
CREATE TABLE character_equipment (
  id                BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY COMMENT '自增主键',
  character_id      BIGINT UNSIGNED NOT NULL COMMENT '所属角色 id',
  slot_id           BIGINT UNSIGNED NOT NULL COMMENT '装备部位，引用 cfg_equipment_slots',
  inventory_id      BIGINT UNSIGNED NOT NULL COMMENT '背包实例 id（穿戴的装备）',
  equipped_at       DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '穿戴时间（UTC）',
  created_at        DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间（UTC）',
  updated_at        DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间（UTC）',
  UNIQUE KEY uk_character_equipment_slot (character_id, slot_id),
  UNIQUE KEY uk_character_equipment_inventory (inventory_id),
  CONSTRAINT fk_character_equipment_character FOREIGN KEY (character_id) REFERENCES characters (id),
  CONSTRAINT fk_character_equipment_inventory FOREIGN KEY (inventory_id) REFERENCES character_inventory (id),
  CONSTRAINT fk_character_equipment_slot FOREIGN KEY (slot_id) REFERENCES cfg_equipment_slots (id)
) ENGINE=InnoDB COMMENT='角色装备位';

-- ⑥ 玩家数据：商店限购 / 任务进度 ------------------------------------

-- 每日限购计数（配合 cfg_shop_items.daily_limit）
CREATE TABLE character_shop_buys (
  id                BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY COMMENT '自增主键',
  character_id      BIGINT UNSIGNED NOT NULL COMMENT '所属角色 id',
  shop_item_id      BIGINT UNSIGNED NOT NULL COMMENT '关联货架条目 id',
  buy_date          DATE NOT NULL COMMENT '购买日期（按天限购）',
  buy_count         INT UNSIGNED NOT NULL DEFAULT 1 COMMENT '当日累计购买数',
  created_at        DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间（UTC）',
  updated_at        DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间（UTC）',
  UNIQUE KEY uk_character_shop_buys (character_id, shop_item_id, buy_date),
  CONSTRAINT fk_character_shop_buys_character FOREIGN KEY (character_id) REFERENCES characters (id),
  CONSTRAINT fk_character_shop_buys_shop_item FOREIGN KEY (shop_item_id) REFERENCES cfg_shop_items (id)
) ENGINE=InnoDB COMMENT='商店限购计数';

-- 角色任务（周期任务 cycle_key：日常=日期、周常=ISO 周、非周期=''）
CREATE TABLE character_quests (
  id                BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY COMMENT '自增主键',
  character_id      BIGINT UNSIGNED NOT NULL COMMENT '所属角色 id',
  quest_id          BIGINT UNSIGNED NOT NULL COMMENT '关联任务模板 id',
  status            ENUM('accepted','ready','completed','abandoned') NOT NULL DEFAULT 'accepted' COMMENT '进行中/待交付/已完成/已放弃',
  cycle_key         VARCHAR(16)  NOT NULL DEFAULT '' COMMENT '如 2026-09-16 / 2026-W37',
  accepted_at       DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '接取时间（UTC）',
  completed_at      DATETIME(0) NULL COMMENT '完成时间（UTC）',
  created_at        DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间（UTC）',
  updated_at        DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间（UTC）',
  UNIQUE KEY uk_character_quests (character_id, quest_id, cycle_key),
  CONSTRAINT fk_character_quests_character FOREIGN KEY (character_id) REFERENCES characters (id),
  CONSTRAINT fk_character_quests_quest     FOREIGN KEY (quest_id) REFERENCES cfg_quest_templates (id)
) ENGINE=InnoDB COMMENT='角色任务状态';

-- 任务目标进度（每个目标一行计数）
CREATE TABLE character_quest_progress (
  id                BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY COMMENT '自增主键',
  character_quest_id BIGINT UNSIGNED NOT NULL COMMENT '关联角色任务 id',
  objective_id      BIGINT UNSIGNED NOT NULL COMMENT '关联任务目标 id',
  current_count     INT UNSIGNED NOT NULL DEFAULT 0 COMMENT '当前完成计数',
  created_at        DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间（UTC）',
  updated_at        DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间（UTC）',
  UNIQUE KEY uk_character_quest_progress (character_quest_id, objective_id),
  CONSTRAINT fk_character_quest_progress_quest     FOREIGN KEY (character_quest_id) REFERENCES character_quests (id),
  CONSTRAINT fk_character_quest_progress_objective FOREIGN KEY (objective_id) REFERENCES cfg_quest_objectives (id)
) ENGINE=InnoDB COMMENT='任务目标进度';

-- ⑦ 玩家数据：怪物统计 ---------------------------------------------

-- 角色怪物斩杀统计（战斗胜利时 UPSERT 递增；结算界面按「角色×怪物」读取展示）
CREATE TABLE character_monster_stats (
  id                BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY COMMENT '自增主键',
  character_id      BIGINT UNSIGNED NOT NULL COMMENT '所属角色 id',
  monster_id        BIGINT UNSIGNED NOT NULL COMMENT '关联怪物 id',
  kill_count        BIGINT UNSIGNED NOT NULL DEFAULT 0 COMMENT '该怪物累计斩杀数',
  total_exp_gained  BIGINT UNSIGNED NOT NULL DEFAULT 0 COMMENT '击杀该怪物累计获得经验值',
  created_at        DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间（UTC）',
  updated_at        DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间（UTC）',
  UNIQUE KEY uk_character_monster_stats (character_id, monster_id),
  CONSTRAINT chk_character_monster_stats_kill CHECK (kill_count >= 0),
  CONSTRAINT chk_character_monster_stats_exp  CHECK (total_exp_gained >= 0),
  CONSTRAINT fk_character_monster_stats_character FOREIGN KEY (character_id) REFERENCES characters (id),
  CONSTRAINT fk_character_monster_stats_monster  FOREIGN KEY (monster_id) REFERENCES cfg_monsters (id)
) ENGINE=InnoDB COMMENT='角色怪物斩杀统计';

-- ============================================================
-- 示例数据（随机编造，仅演示外键链与 JSON 形态；
-- 大多数表 2 条，道具/背包为串起装备链路给 3 条）
-- ============================================================

-- 技能（品种天赋与主动技各 1）
INSERT INTO cfg_skills (code, name, skill_type, element, target_scope, hit_count, base_rate_perc, mp_cost, cooldown_rounds, status_effects, growth_perc, required_level, learn_gold_cost_copper, description) VALUES
('SKL_TALENT_001', '野性直觉', 'talent', 'none', 'self', 1, 0.00, 0, 0, NULL, 4.00, 1, 0, '物理技能伤害 +8%（随进化阶段成长）'),
('SKL_ACTIVE_001', '猫爪击',   'active', 'none', 'single', 1, 120.00, 0, 0, NULL, 8.00, 1, 0, '基础物理攻击，无 MP 消耗');

-- 道具（2 件装备 + 1 件食物，串起装备/背包/掉落链路）
INSERT INTO cfg_item_templates (code, name, category, max_stack, use_effect, sellable, sell_price_copper, can_discard, usable, can_shortcut, quality, unit, icon, description) VALUES
('FOOD_999', '小鱼干示例', 'food', 99, JSON_OBJECT('hp_percent', 30), 1, 200, 1, 1, 1, 'green',  '条', 'icon_food_fish', '示例食物：HP 回复 30%，可快捷'),
('EQP_W999', '木爪子示例', 'equipment', 1, NULL, 1, 400, 1, 0, 0, 'black', '支', 'icon_weapon_claw', '示例武器：物攻 +8'),
('EQP_C999', '软甲示例',   'equipment', 1, NULL, 1, 600, 1, 0, 0, 'blue',  '件', 'icon_armor_cloth', '示例身体防具');

-- 套装
INSERT INTO cfg_suits (code, name, bonuses) VALUES
('SUIT_999', '星辉示例套装', JSON_OBJECT('2', JSON_OBJECT('patk', 10), '4', JSON_OBJECT('hp', 200))),
('SUIT_998', '鱼干示例套装', JSON_OBJECT('2', JSON_OBJECT('luk', 3)));

-- 装备部位（12 基础部位 + 2 个扩展示例：饰品、守护之星，新增部位只需插行）
INSERT INTO cfg_equipment_slots (code, name, sort_order) VALUES
('main_hand', '主手', 1),
('off_hand', '副手', 2),
('head', '头部', 3),
('chest', '胸部', 4),
('shoulder', '肩部', 5),
('hands', '爪子', 6),
('waist', '腰带', 7),
('legs', '护腿', 8),
('feet', '鞋', 9),
('ring', '戒指', 10),
('necklace', '项链', 11),
('cloak', '披风', 12),
('accessory', '饰品', 13),
('guardian_star', '守护之星', 14);

-- 装备模板
INSERT INTO cfg_equipment_templates (item_template_id, slot_id, quality, required_level, required_class, weapon_type, base_stats, suit_id, description) VALUES
(2, 1, 'gray', 1, 'all', '爪', JSON_OBJECT('patk', 8), NULL, '新手武器示例'),
(3, 4, 'green', 10, 'warrior', NULL, JSON_OBJECT('pdef', 25, 'hp', 50), 1, '身体防具示例');

-- 品种（品种天赋技能引用上面第 1 条天赋）
INSERT INTO cfg_breeds (code, name, role, bonus_attribute, bonus_value, main_attribute, talent_skill_id, description) VALUES
('BREED_LIHUA', '狸花猫', '物理输出', 'str', 3, 'str', 1, '野性直觉：物理技能伤害 +8%'),
('BREED_JU',    '橘猫',   '坦克',     'vit', 3, 'vit', 1, '厚实皮毛：受到伤害 -8%（天赋示例暂共用技能 1）');

-- 等级（正式版按 floor(100×lv^1.5) 生成 1~60）
INSERT INTO cfg_levels (level, exp_to_next) VALUES
(1, 100),
(2, 283);

-- 怪物
INSERT INTO cfg_monsters (code, name, monster_type, element, level, hp, patk, matk, pdef, mdef, speed, exp_reward, gold_reward_copper, skills, recommended_level) VALUES
('MOB_999', '田鼠示例', 'normal', 'none', 2, 84, 16, 10, 8, 8, 10, 32, 18, JSON_ARRAY(JSON_OBJECT('skill_id', 2)), 1),
('MOB_998', '狼王示例', 'boss',   'none', 12, 864, 46, 46, 23, 23, 18, 92, 58, JSON_ARRAY(JSON_OBJECT('skill_id', 2, 'phase', 1)), 10);

-- 怪物掉落
INSERT INTO cfg_monster_drops (monster_id, item_template_id, drop_rate_perc, min_qty, max_qty) VALUES
(1, 1, 25.000, 1, 2),
(2, 2, 100.000, 1, 1);

-- 地图（野外 + 城镇）
INSERT INTO cfg_maps (code, name, map_type, level_min, level_max, adjacent_map_ids, unlock_condition, spawn_config) VALUES
('MAP_GRASS', '新手草原示例', 'field', 1, 10, JSON_ARRAY(2), NULL, JSON_OBJECT('no_monster_perc', 50, 'min_count', 1, 'max_count', 3, 'respawn_seconds', 180)),
('MAP_TOWN',  '草原小镇示例', 'town',  1, 10, JSON_ARRAY(1), NULL, NULL);

-- 地图节点
INSERT INTO cfg_map_nodes (map_id, node_code, grid_x, grid_y, node_type, is_walkable, neighbors) VALUES
(1, '00', 2, 2, 'normal', 1, JSON_ARRAY(2)),
(2, '07', 5, 3, 'town',  1, JSON_ARRAY(1));

-- 节点怪物池
INSERT INTO cfg_node_spawns (node_id, monster_id, weight) VALUES
(1, 1, 90),
(1, 2, 10);

-- 商店
INSERT INTO cfg_shops (code, name) VALUES
('SHOP_ITEM', '道具店示例'),
('SHOP_EQUIP', '装备店示例');

-- NPC（道具店老板挂商店 1；领养站管理员为功能 NPC）
INSERT INTO cfg_npcs (code, name, npc_type, map_id, node_id, shop_id, description) VALUES
('NPC_SHOP01', '道具店老板示例', 'shop',    2, 2, 1, '草原小镇道具店'),
('NPC_ADOPT',  '领养站管理员示例', 'service', 2, 2, NULL, '领养小猫');

-- 商店货架
INSERT INTO cfg_shop_items (shop_id, item_template_id, price_copper, currency_type, daily_limit, sort_order) VALUES
(1, 1, 20000, 'copper', NULL, 1),
(1, 2, 80000, 'copper', 2, 2);

-- 任务模板（主线 + 支线各 1）
INSERT INTO cfg_quest_templates (code, name, quest_type, start_npc_id, end_npc_id, min_level, prerequisite_quest_ids, accept_conditions, rewards, accept_dialog, progress_dialog, complete_dialog) VALUES
('MQ-999', '初出猫窝示例', 'main', 2, 2, 1, NULL, NULL, JSON_OBJECT('exp', 120, 'copper', 10000, 'items', JSON_ARRAY(JSON_OBJECT('item_id', 2, 'qty', 1))), '去练练爪子喵。', '还差几只田鼠？', '干得漂亮！'),
('SQ-999', '蛛丝收集示例', 'side', 1, 1, 5, JSON_ARRAY(1), NULL, JSON_OBJECT('exp', 200, 'copper', 20000), '帮我收集些材料。', '收集得如何？', '多谢！');

-- 任务目标
INSERT INTO cfg_quest_objectives (quest_id, objective_type, target, required_count, sort_order) VALUES
(1, 'kill',   JSON_OBJECT('monster_id', 1), 3, 1),
(1, 'collect', JSON_OBJECT('item_id', 1),   2, 2);

-- 账号
INSERT INTO accounts (username, password_hash, last_login_at) VALUES
('cat_master', '$2b$12$examplehashvalue0000000000000000000000000000000000000000', NULL),
('fish_lover', '$2b$12$examplehashvalue1111111111111111111111111111111111111111', NULL);

-- 角色（同账号 2 只猫）
INSERT INTO characters (account_id, name, breed_id, level, exp, vit, str, agi, intel, spr, luk, free_attribute_points, fur_color, current_node_id) VALUES
(1, '大橘为重', 2, 20, 4500, 12, 8, 10, 5, 5, 5, 2, '橘白', 1),
(1, '夜行者喵', 1, 8, 900, 6, 10, 12, 5, 5, 5, 0, '狸花', 2);

-- 货币（角色 1 的铜币与金币钱包）
INSERT INTO character_currencies (character_id, currency_type, amount) VALUES
(1, 'copper', 123456),
(1, 'gold', 3);

-- 已学技能
INSERT INTO character_skills (character_id, skill_id, skill_level) VALUES
(1, 1, 20),
(1, 2, 3);

-- 背包（猫粮 1 组 + 2 件装备）
INSERT INTO character_inventory (character_id, item_template_id, slot_index, quantity, affixes) VALUES
(1, 1, 0, 5, NULL),
(1, 2, NULL, 1, JSON_ARRAY(JSON_OBJECT('attr', 'crit_perc', 'value', 3))),
(1, 3, NULL, 1, NULL);

-- 装备位（两件装备穿戴中：对应背包行 slot_index 为 NULL）
INSERT INTO character_equipment (character_id, slot_id, inventory_id) VALUES
(1, 1, 2),
(1, 4, 3);

-- 商店限购计数
INSERT INTO character_shop_buys (character_id, shop_item_id, buy_date, buy_count) VALUES
(1, 2, '2026-09-15', 1),
(1, 2, '2026-09-16', 2);

-- 角色任务
INSERT INTO character_quests (character_id, quest_id, status, cycle_key) VALUES
(1, 1, 'ready', ''),
(1, 2, 'accepted', '');

-- 任务进度
INSERT INTO character_quest_progress (character_quest_id, objective_id, current_count) VALUES
(1, 1, 3),
(1, 2, 1);

-- 怪物统计（角色 1：田鼠与狼王）
INSERT INTO character_monster_stats (character_id, monster_id, kill_count, total_exp_gained) VALUES
(1, 1, 37, 1184),
(1, 2, 3, 276);
