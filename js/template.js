/// =================== template part
const tpls = {
    
    equipmentButton: `<button class="equipment" @click.left="onclick" @click.right.prevent="oncancel"></button>`,
    data: `
        <div class="dataspan">
            <div class="green">{{detail.propname}}</div>
            <div class="gray">{{detail.value}}</div>
        </div>
          `
};

// 装备图像地址
const Emage = {
    BLACK_CROSSBOW: "img/equipment/black_crossbow.png",
    BLACK_HAT: "img/equipment/black_hat.png",
    BLACK_OUTFIT: "img/equipment/black_outfit.png",
    BLACK_CAPE: "img/equipment/black_cape.png",
    BLACK_RESTRAIN: "img/equipment/black_restrain.png",

    _FENSA_GLOVE: "img/equipment/fs_glove.png",
    _FENSA_CAPE: "img/equipment/fs_cape.png",
    _FENSA_SHOE: "img/equipment/fs_shoe.png",
    FENSA_ZS_HAT: "img/equipment/fs_zs_hat.png",
    FENSA_ZS_OUTFIT: "img/equipment/fs_zs_outfit.png",
    // FENSA_ZS_GLOVE: Emage._FENSA_GLOVE,
    // FENSA_ZS_CAPE: Emage._FENSA_CAPE,
    // FENSA_ZS_SHOE: Emage._FENSA_SHOE,
    FENSA_SWORD_TH: "img/equipment/fs_sword_th.png",
    FENSA_SWORD_OH: "img/equipment/fs_sword_oh.png",
    FENSA_AXE_OH: "img/equipment/fs_axe_oh.png",
    FENSA_AXE_TH: "img/equipment/fs_axe_th.png",
    FENSA_RESTRAIN: "img/equipment/fs_restrain.png",

    _MUSI_GLOVE: "img/equipment/ms_glove.png",
    // _MUSI_CAPE: "img/equipment/ms_cape.png",
    _MUSI_SHOE: "img/equipment/ms_shoe.png",
    MUSI_ZS_HAT: "img/equipment/ms_zs_hat.png",
    MUSI_ZS_OUTFIT: "img/equipment/ms_zs_outfit.png",
    // MUSI_ZS_GLOVE: Emage._MUSI_GLOVE,
    // // MUSI_ZS_CAPE: this._MUSI_CAPE,
    // MUSI_ZS_SHOE: Emage._MUSI_SHOE,
    MUSI_SWORD_TH: "img/equipment/ms_sword_th.png",
    MUSI_SWORD_OH: "img/equipment/ms_sword_oh.png",
    MUSI_AXE_OH: "img/equipment/ms_axe_oh.png",
    MUSI_AXE_TH: "img/equipment/ms_axe_th.png",

    BLD_BELT_0: "img/equipment/bld_belt_0.png",
    BLD_RING_0: "img/equipment/bld_ring_0.png",
    BLD_PENDANT_0: "img/equipment/bld_pendant_0.png",
    BLD_EARRING_0: "img/equipment/bld_earring_1.png",
};

const Translate = {
    hat: "帽子", ring: "戒指", emblem: "符号",
    pendant: "吊坠", eye: "眼饰", pocket: "口袋", badge: "徽章",
    face: "前额", earring: "耳饰", medal: "奖牌",
    weapon: "武器", top: "衣服", shoulder: "肩部", secondary: "副手",
    belt: "腰带", bottom: "裤子", glove: "手套", cape: "披风",
    shoe: "鞋子", android: "机器人", heart: "心"
};
const HAT = "hat",RING="ring",EMBLEM="emblem",PENDANT="pendant",EYE="eye",POCKET="pocket",BADGE="badge",OUTFIT="outfit";
const FACE="face",EARRING="earring",MEDAL="medal",WEAPON="weapon",TOP="top",SHOULDER="shoulder",SECONDARY="secondary";
const BELT="belt",BOTTOM="bottom",GLOVE="glove",CAPE="cape",SHOE="shoe",ANDROID="android",HEART="heart";
const RESTRAIN="restrain";

const JOB = {ALL:"全部",FIGHT:"战士",MAGE:"魔法师",ARC:"弓箭手",ROGUE:"飞侠",PIRATE:"海盗"};

const statsW = {
    FIGHT: {STR:4, INT:0, DEX: 1, LUK: 0},  // 普通战士
    MAG: {STR:0, INT:4, DEX: 0, LUK: 1},    // 普通法师
    ARCHER: {STR:1, INT:0, DEX: 4, LUK: 0},
    THIEF: {STR:0, INT:0, DEX: 1, LUK: 4},
    PIRATE_STR: {STR:4, INT:0, DEX: 1, LUK: 0},
    PIRATE_DEX: {STR:1, INT:0, DEX: 4, LUK: 0},

    SHUANGDAO: {STR:1, INT:0, DEX: 1, LUK: 4},
    // XIADAO: {STR:1, INT:0, DEX: 1, LUK: 4},
    HP: {STR:1, INT:0, DEX: 0, LUK: 0},
    XEN: {STR:3, INT:0, DEX: 3, LUK: 3}
};
const ArcW = {
    STR: {p: 1, v: 100},
    DEX: {p: 2, v: 100},
    INT: {p: 3, v: 100},
    LUK: {p: 4, v: 100},
    HP:  {p: 5, v: 1750},
    XEN: {p: [1,2,4], v: 39}
};

const jobList = [
    {name: "墨玄", group: "武神", type: "海盗", eName: ""},
    {name: "虎影", group: "阿尼玛", type: "飞侠", eName: "Ho Young"},
    {name: "御剑骑士", group: "翼人", type: "战士", eName: "Adele"},
    {name: "圣晶使徒", group: "翼人", type: "法师", eName: "Illium"},
    {name: "魂影翼人", group: "翼人", type: "海盗", eName: "Ark"},
    {name: "超能力者", group: "超能力者", type: "法师", eName: "Kinesis"},
    {name: "林之灵", group: "林之灵", type: "法师", eName: "BeastTame"},
    {name: "神之子", group: "神之子", type: "战士", eName: "Zero"},
    {name: "狂龙战士", group: "诺巴", type: "战士", eName: "Kaiser"},
    {name: "炼狱黑客", group: "诺巴", type: "弓箭手", eName: "Kain"},
    {name: "魔链影士", group: "诺巴", type: "飞侠", eName: "Cadena"},
    {name: "爆莉萌天使", group: "诺巴", type: "海盗", eName: "Angelic Burster"},
    {name: "剑豪", group: "晓之阵", type: "战士", eName: "Hayato"},
    {name: "阴阳师", group: "晓之阵", type: "法师", eName: "Kanna"},
    {name: "战神", group: "英雄", type: "战士", eName: "Aran"},
    {name: "龙神", group: "英雄", type: "法师", eName: "Evan"},
    {name: "双弩精灵", group: "英雄", type: "弓箭手", eName: "Mercedes"},
    {name: "幻影", group: "英雄", type: "飞侠", eName: "Phantom"},
    {name: "隐月", group: "英雄", type: "海盗", eName: "EunWol"},
    {name: "夜光法师", group: "英雄", type: "法师", eName: "Luminous"},
    {name: "恶魔猎手", group: "反抗者", type: "战士", eName: "Demon Slayer"},
    {name: "恶魔复仇者", group: "反抗者", type: "战士", eName: "Demon Avenger"},
    {name: "唤灵斗师", group: "反抗者", type: "法师", eName: "Battle Mage"},
    {name: "豹弩游侠", group: "反抗者", type: "弓箭手", eName: "Wild Hunter"},
    {name: "尖兵", group: "反抗者", type: "尖兵", eName: "Xenon"},
    {name: "机械师", group: "反抗者", type: "海盗", eName: "Mechanic"},
    {name: "爆破手", group: "反抗者", type: "战士", eName: "Blaster"},
    {name: "魂骑士", group: "骑士团", type: "战士", eName: "Soul Master"},
    {name: "炎术士", group: "骑士团", type: "法师", eName: "Flame Wizard"},
    {name: "风灵使者", group: "骑士团", type: "弓箭手", eName: "Wind Breaker"},
    {name: "夜行者", group: "骑士团", type: "飞侠", eName: "Night Walker"},
    {name: "奇袭者", group: "骑士团", type: "海盗", eName: "Striker"},
    {name: "米哈尔", group: "骑士团", type: "战士", eName: "Mihile"},
    {name: "英雄", group: "冒险家", type: "战士", eName: "Hero"},
    {name: "圣骑士", group: "冒险家", type: "战士", eName: "Paladin"},
    {name: "黑骑士", group: "冒险家", type: "战士", eName: "Dark Knight"},
    {name: "火毒魔导士", group: "冒险家", type: "法师", eName: "Arch Mage (Fire, Poison)"},
    {name: "冰雷魔导士", group: "冒险家", type: "法师", eName: "Arch Mage (Ice, Lightning)"},
    {name: "主教", group: "冒险家", type: "法师", eName: "Bishop"},
    {name: "神射手", group: "冒险家", type: "弓箭手", eName: "Bowmaster"},
    {name: "箭神", group: "冒险家", type: "弓箭手", eName: "Crossbow Master"},  // CM
    {name: "古迹猎人", group: "冒险家", type: "弓箭手", eName: "Pathfinder"},
    {name: "隐士", group: "冒险家", type: "飞侠", eName: "Night Lord"},
    {name: "侠盗", group: "冒险家", type: "飞侠", eName: "Shadower"},
    {name: "暗影双刀", group: "冒险家", type: "飞侠", eName: "Dual Blade"},
    {name: "冲锋队长", group: "冒险家", type: "海盗", eName: "Viper"},
    {name: "船长", group: "冒险家", type: "海盗", eName: "Captain"},
    {name: "火炮手", group: "冒险家", type: "海盗", eName: "Cannon Shooter"}
  ];

const ET = {
    CROSSBOW: "crossbow",
    SWORD: "sword",
    SWORD_T: "sword_towhands"
};

// const POTENTIAL_OPTIONS = [
//     {value:'str+6', label:'力量+6'},
//     {value:'dex+6', label:'敏捷+6'},
//     {value:'int+6', label:'智力+6'},
//     {value:'luk+6', label:'运气+6'},
// ];
const ADDPOTENTIAL_OPTIONS = [];

const equipPermission = {
    "箭神": {crossbow:1.35},
    "英雄": {sword_th: 1.44,axe_th:1.44,sword_oh:1.30,axe_on:1.30},
    "御剑骑士": {restrain: 1.3},
};
const coef = {};
// const Crossbow_Master_Equipment = {
//     CM: {}
// };
const scrollEnhance = {"100%":[], "70%": [], "30%": []};

const equipments = {};
const black_crossbow = {v: 4, atk: 118, updateMax: 8, type:WEAPON, suit: "black", images: Emage.BLACK_CROSSBOW, lv:100, job:JOB.ARC};
const black_outfit = {stats: 27, atk: 1, matk: 1, def: 315, updateMax: 10, type: "outfit", suit: "black", images: Emage.BLACK_CROSSBOW, lv:100,job:JOB.ALL};   // stats = all stats
const black_hat = {stats: 23, hp: 270, mp: 270, satk: 1, def:293, updateMax: 10, type: "hat", suit:"black", images: Emage.BLACK_HAT, lv:100,job:JOB.ALL};  // satk = atk + matk
const black_cape = {stats: 7, satk: 7, def:180, updateMax: 7, type: "cape", suit:"black", images: Emage.BLACK_CAPE, lv:100,job:JOB.ALL};
const black_banzhi = {str: 8, dex:8, atk:5, type: "banzhi", suit:"black", images: Emage.BLACK_CROSSBOW, lv:100,job:JOB.ARC};
const black_restrain = {atk:123,type:WEAPON,wtype:RESTRAIN,suit:"black", images: Emage.BLACK_RESTRAIN, lv:100,job:JOB.FIGHT};

const musi_zs_hat = {type:HAT,str:16,dex:10,updateMax:9,suit:"musi_zs",images:Emage.MUSI_ZS_HAT,lv:140,job:JOB.FIGHT};
const musi_zs_outfit = {type:OUTFIT,str:20,dex:20,updateMax:10,suit:"musi_zs",images:Emage.MUSI_ZS_OUTFIT,lv:140,job:JOB.FIGHT};
// const musi_zs_cape = {type:CAPE,str:4,dex:4,updateMax:7,suit:"musi_zs",images:Emage.MUSI_ZS_CAPE,lv:140,job:JOB.FIGHT};
const musi_zs_glove = {type:GLOVE,str:11,dex:10,atk:2,updateMax:6,suit:"musi_zs",images:Emage._MUSI_GLOVE,lv:140,job:JOB.FIGHT};
const musi_zs_shoe = {type:SHOE,str:15,dex:9,atk:1,updateMax:6,suit:"musi_zs",images:Emage._MUSI_SHOE,lv:140,job:JOB.FIGHT};
const musi_zs_sword_oh = {type:WEAPON,atk:118,updateMax:8,suit:"musi_zs",images:Emage.MUSI_SWORD_OH,lv:140,job:JOB.FIGHT};
const musi_zs_sword_th = {type:WEAPON,atk:122,updateMax:8,suit:"musi_zs",images:Emage.MUSI_SWORD_TH,lv:140,job:JOB.FIGHT};
const musi_zs_axe_oh = {type:WEAPON,atk:118,updateMax:8,suit:"musi_zs",images:Emage.MUSI_AXE_OH,lv:140,job:JOB.FIGHT};
const musi_zs_axe_th = {type:WEAPON,atk:124,updateMax:8,suit:"musi_zs",images:Emage.MUSI_AXE_TH,lv:140,job:JOB.FIGHT};

const fensa_zs_hat = {type:HAT,str:16,dex:10,updateMax:9,suit:"fensa_zs",images:Emage.FENSA_ZS_HAT,lv:140,job:JOB.FIGHT};
const fensa_zs_outfit = {type:OUTFIT,str:20,dex:20,updateMax:10,suit:"fensa_zs",images:Emage.FENSA_ZS_OUTFIT,lv:140,job:JOB.FIGHT};
const fensa_zs_cape = {type:CAPE,stats:4,updateMax:7,suit:"fensa_zs",images:Emage._FENSA_CAPE,lv:140,job:JOB.FIGHT};
const fensa_zs_glove = {type:GLOVE,str:11,dex:10,atk:2,updateMax:6,suit:"fensa_zs",images:Emage._FENSA_GLOVE,lv:140,job:JOB.FIGHT};
const fensa_zs_shoe = {type:SHOE,str:15,dex:9,atk:1,updateMax:6,suit:"fensa_zs",images:Emage._FENSA_SHOE,lv:140,job:JOB.FIGHT};
const fensa_zs_sword_oh = {type:WEAPON,atk:118,updateMax:8,suit:"fensa_zs",images:Emage.FENSA_SWORD_OH,lv:140,job:JOB.FIGHT};
const fensa_zs_sword_th = {type:WEAPON,atk:122,updateMax:8,suit:"fensa_zs",images:Emage.FENSA_SWORD_TH,lv:140,job:JOB.FIGHT};
const fensa_zs_axe_oh = {type:WEAPON,atk:118,updateMax:8,suit:"fensa_zs",images:Emage.FENSA_AXE_OH,lv:140,job:JOB.FIGHT};
const fensa_zs_axe_th = {type:WEAPON,atk:124,updateMax:8,suit:"fensa_zs",images:Emage.FENSA_AXE_TH,lv:140,job:JOB.FIGHT};
const fensa_restrain = {type:WEAPON,wtype:RESTRAIN,atk:122,updateMax:8,suit:"fensa_zs",images:Emage.FENSA_RESTRAIN,lv:140,job:JOB.FIGHT};

const bld_belt_0 = {type:BELT,stats:8,hp:200,updateMax:3,suit:"bld0",images:Emage.BLD_BELT_0,lv:120,job:JOB.ALL};
const bld_pendant_0 = {type:PENDANT,stats:15,satk:3,hp:200,updateMax:3,suit:"bld0",images:Emage.BLD_PENDANT_0,lv:120,job:JOB.ALL};
const bld_ring_0 = {type:RING,stats:4,satk:2,hp:50,updateMax:1,suit:"bld0",images:Emage.BLD_RING_0,lv:120,job:JOB.ALL};
const bld_earring_0 = {type:EARRING,stats:9,satk:4,hp:80,updateMax:3,suit:"bld0",images:Emage.BLD_EARRING_0,lv:120,job:JOB.ALL};

const AllHats = [black_hat,musi_zs_hat,fensa_zs_hat];
const AllOutfits = [black_outfit,musi_zs_outfit,fensa_zs_outfit];
const AllCapes = [black_cape,fensa_zs_cape];
const AllGloves = [musi_zs_glove,fensa_zs_glove];
const AllShoes = [musi_zs_shoe,fensa_zs_shoe];
const AllTops = [], AllBottoms = [];
const AllPendants = [bld_pendant_0];
const AllRings = [bld_ring_0];
const AllEarrings = [bld_earring_0];
const AllBelts = [bld_belt_0];
const AllEyes = [];
const AllFaces = [];
const AllAndroids = [], Allhearts = [];
const AllEmblems=[], AllPockets=[], AllBadges=[], AllMedals=[], AllShoulders=[];

const AllSwordThs = [fensa_zs_sword_th];
const AllCrossbows = [black_crossbow];
const AllRestrain = [black_restrain,fensa_restrain];
const AllWeapons = {crossbow:AllCrossbows,sword_th:AllSwordThs,restrain:AllRestrain};
const AllSecondaries = [];

// 黑色套
const blackSuitEffect = [{},{},{stats:7, atk:8, matk:8}, {hpp: 20, mpp: 20, atk: 14, matk:14, damage: 9}, {stats: 20, atk: 20, matk: 20, ign: 30}];
// 穆斯战士套
const musiZsEffect = [{},{},{ndamage:2,hpp:8},{ndamage:4,str:8,atk:8},{ndamage:6,stats:10,ign:10}];
// 芬撒战士套 ndamage 普通怪物伤
const fensaZsEffect = [{},{},{ndamage:2,hpp:9},{ndamage:4,str:9,atk:9},{ndamage:6,stats:15,ign:10},{ndamage:8,atk:10,ign:10}];
// 低贝
const bld0Effect = [{},{stats:10,hp:500},{hpp:5,satk:12},{ign:15}];
const suitEffect = {
    black: {e:blackSuitEffect,p:[HAT,WEAPON]},
    fensa_zs: {e:fensaZsEffect,p:[HAT,WEAPON,GLOVE]},
    bld0: {e:bld0Effect,p:[RING]}
};