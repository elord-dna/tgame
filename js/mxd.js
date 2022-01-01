/// ============================ component part

const cpnEquipment = {
    data() {
        return {
        }
    },
    props: ['value'],
    emits: ['showType', 'cancel'],
    template: tpls.equipmentButton,
    methods: {
        onclick: function() {
            this.$emit('showType');  // 显示
        },
        oncancel: function() {
            this.$emit('cancel');    // 取消显示
        }
    },
    computes: {
        //
    }
};

const cpnData = {
    data() {
        return {}
    },
    props: ['detail'],
    template: tpls.data
};

/// ======================== Logic part
class Attr {
    constructor(base) {
        this.base = base;
        this.p = 0;
        this.f = 0;
    }
    total() {
        return this.base * (1+this.p/100) + this.f;
    }
}

class MxdRole {
    constructor(job) {
        this.lv = 200;  // 等级
        this.setJob(job);
    }

    getAtkType() {
        let type = this.job.type;
        if (type == "法师") {
            this.atkType = 2;
        } else {
            this.atkType = 1;
        }
    }

    getStatsWeight() {
        let type = this.job.type;
        let name = this.job.name;
        if (type == "法师") {
            this.statsWeight = statsW.MAG;
            this.mainStats = "int";
            this.ArcT = ArcW.INT;
        } else if (type == "弓箭手") {
            this.statsWeight = statsW.ARCHER;
            this.mainStats = "dex";
            this.ArcT = ArcW.DEX;
        } else if (type == "飞侠") {
            this.statsWeight = statsW.THIEF;
            this.mainStats = "luk";
            if (name == "侠盗" || name == "暗影双刀" || name == "魔链影士") {
                this.statsWeight = statsW.SHUANGDAO;
            }
            this.ArcT = ArcW.LUK;
        } else if (type == "海盗") {
            this.statsWeight = statsW.PIRATE_STR;
            this.mainStats = "str";
            this.ArcT = ArcW.STR;
            if (name == "爆莉萌天使" || name == "机械师" || name == "船长") {
                this.statsWeight = statsW.PIRATE_DEX;
                this.mainStats = "dex";
                this.ArcT = ArcW.DEX;
            }
        } else if (type == "战士") {
            this.statsWeight = statsW.FIGHT;
            this.mainStats = "str";
            this.ArcT = ArcW.STR;
            if (name == "恶魔复仇者") {
                this.statsWeight = statsW.HP;
                this.mainStats = "hp";
                this.ArcT = ArcW.HP;
            }
        } else {
            this.statsWeight = statsW.XEN;
            this.mainStats = null;
            this.ArcT = ArcW.XEN;
        }
    }

    setLv(lv) {
        this.lv = lv;
        this.updateBornData();
        this.updateDetail();
    }

    setJob(job) {
        this.job = job;
        this.init();  // 再次初始化
    }

    init() {
        this.equipments = {};
        this.total = null;
        this.luck = {hatLuck:false,shoulderLuck:false,
            gloveLuck:false,weaponLuck:false,ringLuck:false};
        this.suitCount = {}; // {suitname: count}
        this.ese = []; // 已有的套装属性加成
        // base 基础 p 百分比 f 最终加成 t 总和
        // 重写的 {hp:{base:10,p:0,f:0,t:10}}
        this.attr = {
            hp:     {born:0, base:0, p:0, f:0, t:0},
            mp:     {born:0, base:0, p:0, f:0, t:0},
            def:    {born:0, base:0, p:0, f:0, t:0},
            atk:    {born:0, base:0, p:0, f:0, t:0},
            matk:   {born:0, base:0, p:0, f:0, t:0},
            str:    {born:0, base:0, p:0, f:0, t:0},
            int:    {born:0, base:0, p:0, f:0, t:0},
            dex:    {born:0, base:0, p:0, f:0, t:0},
            luk:    {born:0, base:0, p:0, f:0, t:0},
            damage: {born:0, base:0, p:0, f:0, t:0},
            normal: {born:0, base:0, p:0, f:0, t:0},
            boss:   {born:0, base:0, p:0, f:0, t:0},
            final:  {born:0, base:0, p:0, f:0, t:0},
            ign:    {born:0, base:0, p:0, f:0, t:0},
            ctr:    {born:0, base:0, p:0, f:0, t:0},
            ctd:    {born:0, base:0, p:0, f:0, t:0},
        };
        this.star = 0;
        this.arc = 0;
        this.yua = 0;
        this.getStatsWeight();  // 属性权
        this.updateBornData();  // 与等级相关  等级、职业
        this.loadSkill(); // 加载技能
        this.updateDetail();
    }
    /**
     * 更新出生数据
     */
    updateBornData() {
        let born = {atk:0,matk:0,hp:0,mp:0, str:4,dex:4,int:4,luk:4};
        let l = this.lv;
        let name = this.job.name;
        if (name != "林之灵" || name != "恶魔复仇者") {
            if (l > 59) l += 1;
            if (l > 100) l += 1;
        }
        let ms = this.mainStats;
        if (ms) {
            if (ms != 'HP') {
                born[this.mainStats] = 4 + 5 * l;
            } else {
                if (l<30) {
                    born['hp'] = 220 + 90 * l;
                } else if (l<60) {
                    born['hp'] = 395 + 90 * l;
                } else if (l<100) {
                    born['hp'] = 470 + 90 * l;
                } else {
                    born['hp'] = 545 + 90 * l;
                }
            }
        } else {
            // todo XEN
        }
        for (let key in born) {
            this._updateBorn(key, born[key]);
        }
    }
    updateSkillData() {
        // 
    }
    updateOtherAllyData() {
    }
    updateBuffData() {
    }

    /**
     * 更新所有属性的最终值
     */
    _updateTotals() {
        let a = this.attr;
        for (let key in a) {
            this.__updateTotal(key);
        }
    }
    _updateArc() {
        let t = this.ArcT, lv = this.arc;
        let d = this.detail;
        if (typeof(t.p) == 'number') {
            d[t.p].value += t.v * lv;
        } else {
            for (let p in t.p) {
                d[p].value += t.v * lv;
            }
        }
    }
    /**
     * 更新对应属性的最终值
     * @param {shuxing} key 
     */
    __updateTotal(key) {
        let k = this.attr[key];
        let b = k.base, p = k.p, f = k.f;
        k.t = b * (1 + p/100) + f;
    }
    _countSxGjl() {
        // todo
    }
    updateDetail() {
        this._updateTotals();
        let a = this.attr;
        this.detail = [
            {propname: "攻击力", value: a.atk.t},               
            {propname: "魔法力", value: a.matk.t},               
            {propname: "力量", value: a.str.t},
            {propname: "敏捷", value: a.dex.t},
            {propname: "智力", value: a.int.t},
            {propname: "运气", value: a.luk.t},
            {propname: "血量",  value: a.hp.t},
            {propname: "伤害", value: a.damage.t},
            {propname: "Boss伤", value: a.boss.t},
            {propname: "最终伤", value: a.final.t},
            {propname: "无视防御", value: a.ign.t},
            {propname: "暴击率", value: a.ctr.t},
            {propname: "暴击伤害", value: a.ctd.t},        
            {propname: "星之力", value: this.star},
            {propname: "神秘", value: this.arc},
            {propname: "基础攻击力", value: a.atk.base},
            {propname: "基础魔法力", value: a.matk.base},
            {propname: "基础力量", value: a.str.base},
            {propname: "基础敏捷", value: a.dex.base},             
            {propname: "基础智力", value: a.int.base},
            {propname: "基础运气", value: a.luk.base},
            {propname: "基础血量", value: a.hp.base},
            {propname: "属性攻击力", value: 0},
            {propname: "怪物攻击力", value: 0},                 
            {propname: "Boss攻击力", value: 0}
        ];
        this._updateArc();  // 添加Arc数据
    }
    /**
     * 加载技能
     */
    loadSkill() {
        let ss = skill[this.job.name];
        if (ss) { // 避免默认职业的问题
            this.buff=ss.b; this.debuff=ss.d; this.passive=ss.p; this.active=ss.a;
            this._loadPassive();
        }
    }
    /**
     * 加载被动技能
     */
    _loadPassive() {
        let p = this.passive;
        for (let i in p) {
            let s = p[i];
            if (typeof(s.effect)=='object') {
                this._updateAttrs(s.effect, 1);
            } else {
                s.effect(this); 
            }
        }
    }
    /**
     * 更新已有数据
     * @param {新属性} n 
     * @param {加减} w 1 or -1
     */
    _updateAttrs(n, w) {
        for (let key in n) {
            let a = this.attr[key];
            let v = n[key] * w;
            if (a) {
                a.base += v;
            } else {
                if (key.endsWith('p')) {
                    if (key == 'hpp') {
                        this.attr.hp.p += v;
                    } else if (key == 'asp') {
                        this.attr.str.p += v;
                        this.attr.int.p += v;
                        this.attr.dex.p += v;
                        this.attr.luk.p += v;
                    } else {
                        key = key.substring(0, 3);
                        this.attr[key].p += v;
                    }
                }
            }
        }
    }

    updateEquiment() {
        _seprate(this.base, this.base.edv);
        this.base = _merge(this.base, this.edv);
        this.base.edv = JSON.parse(JSON.stringify(this.edv));
    }
    // loadBuff(buff) {
    //     this._bind(buff, this.bdv);
    // }
    // rmBuff(buff) {
    //     this._unbind(buff, this.bdv);
    // }

    /**
     * @param {MxdEquip} e 
     */
    equip(e, p) {
        let t = e.base.type;
        let old_t_list = [];
        if (!p) {old_t_list.push(t);} // ring or pendant
        if (t == OUTFIT) {
            old_t_list.push('top');
            old_t_list.push('bottom');
        } else if (t == "top" || t == "bottom") {
            old_t_list.push('outfit');
        }
        for (let old_t in old_t_list) {
            let otype = old_t_list[old_t];
            let old_e = this.equipments[otype];
            if (old_e && old_e != "") {
                this.unequip(otype);
            }
        }
        if (!p) {
            this.equipments[t] = e;
        } else {
            if (!this.equipments[t]) {
                this.equipments[t] = {};
            }
            this.unequip(t, p);
            this.equipments[t][p] = e;
        }
        if (e.base.luck) {
            this.luck[e.base.luck] = true;
        }
        this.addSuit(e.base);
        this._bindE(e);
        this.suitEffectCheck();
        this.updateEquiment();
        this._updateDetail();
    }
    unequip(t, p) {
        let e = this.equipments[t];
        if (t == TOP && e == null) {
            e = this.equipments[OUTFIT];
        } else if (p) { // ring or pendant
            e = this.equipments[t][p];
        }
        if (e) {
            this.deSuit(e.base);
            this._unbindE(e);
            if (e.base.luck) {
                this.luck[e.base.luck] = false;
            }
        }
        if (t == TOP) {
            this.equipments[OUTFIT] = null;
        }
        if (p) {
            this.equipments[t][p] = null;
        } else {
            this.equipments[t] = null;
        }
        this.suitEffectCheck();
        this.updateEquiment();
        this._updateDetail();
    }
    hasEquip(t, p) {  // 是否有装备 t 装备类型 装备满了
        if (t==TOP) {
            return this.equipments[t] != null || this.equipments[OUTFIT] != null;
        }
        if (p) {
            return this.equipments[t] ? this.equipments[t][p] != null : false;
        }
        return this.equipments[t] != null;
    }
    getEquip(t, p) {
        if (p) {
            return this.equipments[t][p];
        }
        return this.equipments[t] == null ? this.equipments[OUTFIT] : this.equipments[t];
    }
    /**
     * 更新出生属性
     */
    _updateBorn(attrKey, bornValue) {
        let origin = this.attr[attrKey].born;
        this.attr[attrKey].born = bornValue;
        this.attr[attrKey].base += bornValue - origin;
        this._updateAttr(attrKey);
    }
    /**
     * 更新具体属性
     */
    _updateAttr(attrKey) {
        let attr = this.attr[attrKey];
        attr.t = attr.base * (1 + attr.p/100) + attr.f;
    }
    /**
     * 绑定上装备e的属性
     * @param {*} e 
     */
    _bindE(e) {
        this._bind(e.total, this.edv);
        let potential = e.potential;  // 绑定潜能和附加潜能
        let addPotential = e.addPotential;
        for (let p in potential) {
            let t = this.__convertPotential(potential[p]);
            this._bind(t, this.edv);
        }
        for (let p in addPotential) {
            let t = this.__convertPotential(addPotential[p]);
            this._bind(t, this.edv);
        }
    }
    __convertPotential(p) {
        let a = p.split('+');
        if (a.length < 2) return {};
        let b = {};
        b[a[0]] = parseInt(a[1]);
        return b;
    }
    _unbindE(e) {
        this._unbind(e.total, this.edv);
        let potential = e.potential;
        let addPotential = e.addPotential;
        for (let p in potential) {
            let t = this.__convertPotential(potential[p]);
            this._unbind(t, this.edv);
        }
        for (let p in addPotential) {
            let t = this.__convertPotential(addPotential[p]);
            this._unbind(t, this.edv);
        }
    }
    _bind(e, ev) {
        // 装备绑定的属性都是基础属性，受到加成
        let atk = this.atkType == 1 ? 'atk' : 'matk';
        let stats = this._get(e, 'stats'); // 全属性
        let jobstats = this._get(e, 'jobstats');  // 职业属性
        // let ev = this.edv;
        ev.ATK += this._get(e, atk) + this._get(e, 'satk');
        ev.HP  += this._get(e, 'hp');
        ev.STR += this._get(e, 'str') + stats;
        ev.DEX += this._get(e, 'dex') + stats;
        ev.INT += this._get(e, 'int') + stats;
        ev.LUK += this._get(e, 'luk') + stats;
        this[this.mainStats] += jobstats;
        ev.HPP += this._get(e, 'hpp');
        let asp = this._get(e, 'asp');
        ev.ATKP += this._get(e, 'atkp');
        ev.STRP += this._get(e, 'strp') + asp;
        ev.DEXP += this._get(e, 'dexp') + asp;
        ev.INTP += this._get(e, 'intp') + asp;
        ev.LUKP += this._get(e, 'lukp') + asp;

        ev.CTR += this._get(e, "ctr");
        ev.CTD += this._get(e, "ctd");
        ev.Damage += this._get(e, "damage");
        ev.Boss += this._get(e, "boss");
        let f = this._get(e, 'final');
        if (ev.Final > 0) {
            ev.Final += ev.Final * f / 100 + f;
        } else {
            ev.Final = f;
        }
        ev.Ign += this._get(e, 'ign');

        ev.NDAMAGE += this._get(e, 'ndamage');
    }
    _unbind(e, ev) {
        // 卸下装备移除基础属性
        let atk = this.atkType == 1 ? 'atk' : 'matk';
        let stats = this._get(e, 'stats'); // 全属性
        let jobstats = this._get(e, 'jobstats');  // 职业属性
        ev.ATK -= this._get(e, atk) + this._get(e, 'satk');
        ev.HP  -= this._get(e, 'hp');
        ev.STR -= this._get(e, 'str') + stats;
        ev.DEX -= this._get(e, 'dex') + stats;
        ev.INT -= this._get(e, 'int') + stats;
        ev.LUK -= this._get(e, 'luk') + stats;
        this[this.mainStats] -= jobstats;
        ev.HPP -= this._get(e, 'hpp');
        ev.ATKP -= this._get(e, 'atkp');
        ev.STRP -= this._get(e, 'strp');
        ev.DEXP -= this._get(e, 'dexp');
        ev.INTP -= this._get(e, 'intp');
        ev.LUKP -= this._get(e, 'lukp');

        ev.CTR -= this._get(e, "ctr");
        ev.CTE -= this._get(e, "cte");
        ev.Boss -= this._get(e, "boss");
        ev.Ign -= this._get(e, 'ign');

        ev.NDAMAGE -= this._get(e, 'ndamage');
    }
    suitLuckCheck(sp,v) {
        if (v < 3) {
            return false;
        }
        return (sp.includes(HAT) && this.luck.hatLuck) ||
          (sp.includes(WEAPON) && this.luck.weaponLuck) ||
          (sp.includes(GLOVE) && this.luck.gloveLuck) ||
          (sp.includes(SHOULDER) && this.luck.shoulderLuck) ||
          (sp.includes(RING) && this.luck.ringLuck);
    }
    suitEffectCheck() {
        this._rmAllEse();
        let sc = this.suitCount;
        for (let s in sc) {
            let v = sc[s];
            let se = suitEffect[s].e;
            let sp = suitEffect[s].p;
            if (this.suitLuckCheck(sp, v)) {
                v += 1;
            }
            for (let i=0;i<v&&i<se.length;i++) {
                this.ese.push(se[i]);
            }
        }
        this._addAllEse();
    }
    addSuit(e) {
        if (e.suit) {
            this._addSuitCount(e.suit);
        }
    }
    deSuit(e) {
        if (e.suit) {
            this._deSuitCount(e.suit);
        }
    }
    _addSuitCount(suitname) {
        let sc = this.suitCount;
        if (sc[suitname]) {
            sc[suitname] += 1;
        } else {
            sc[suitname] = 1;
        }
    }
    _deSuitCount(sn) { // sn->suitname
        let sc = this.suitCount;
        if (sc[sn]) {
            sc[sn] -= 1;
        }
    }
    _addAllEse() {
        for (let i in this.ese) {
            this._bind(this.ese[i], this.edv);
        }
    }
    _rmAllEse() {
        for (let i in this.ese) {
            this._unbind(this.ese[i], this.edv);
        }
        this.ese = [];
    }
    /**
     * 从对象中获取key的value，如果没有，返回0
     * @param {\} e 
     * @param {*} key 
     * @returns 
     */
    _get(e, key) {
        return e[key] ? e[key] : 0;
    }
    
    _countArcDetail() {
        let v = this.Arc * this.ArcT.v;
        if (this.ArcT != ArcW.XEN) {
            this.detail[this.ArcT.p].value += v;
        } else {
            this.detail[1].value += v;
            this.detail[2].value += v;
            this.detail[4].value += v;
        }
    }
    _countStarDetail() {
        if (this.job.name == "恶魔复仇者") {
            // todo
        }
    }
    _computeSxGjl() {
        let w = this.statsWeight;
        let d = this.detail, ndamage = this.base.NDAMAGE + this.odv.NDAMAGE;
        let wp = this.equipments[WEAPON];
        let shuxing = d[1].value * w.STR + d[2].value * w.DEX + d[3].value * w.INT + d[4].value * w.LUK;
        let xishu = 0;
        if (wp) {
            xishu = equipPermission[this.job.name][wp.base.wtype];
        }
        let gjl = Math.floor(xishu * shuxing * d[0].value / 100);
        let sxgjl = Math.floor(gjl * (1+d[6].value/100) * (1+d[8].value/100));
        let gwgjl = Math.floor(gjl * (1+(d[6].value+ndamage)/100) * (1+d[8].value/100));
        let bossgjl = Math.floor(gjl * (1+(d[6].value+d[7].value)/100) * (1+d[8].value/100));

        this.detail[20].value = sxgjl;
        this.detail[21].value = gwgjl;
        this.detail[22].value = bossgjl;
    }
}

class MxdEquip {
    constructor(base) {
        this.base = base; // 装备底材
        this.scrolling = {};  // 痕迹、卷轴
        this.bonus = {};      // 火花
        this.star = {star:0};          // 星之力 star 星之力 str 其他具体的一些属性 根据底材计算出来
        this.total = this._total();
        this.potential = [];     // 潜能
        this.addPotential = [];  // 附潜
    }
    // 加载强化数据
    loadScrolling(det) {
        this.scrolling = det.scrolling;
        this.bonus = det.bonus; this.star = det.star;
    }
    loadPotential(p1, p2) {
        this.potential = p1; this.addPotential = p2;
    }
    fresh() {
        this.total = this._total();
        // console.log(this.total);
    }
    /**
     * 返回装备的全属性
     */
    _total() {
        let t = this.total;
        if (t) return t;
        t = _merge(this.base, this.scrolling);
        t = _merge(t, this.bonus);
        t = _merge(t, this.star);
        if (t.stats) {
            t.str ? t.str += t.stats : t.str = t.stats;
            t.dex ? t.dex += t.stats : t.dex = t.stats;
            t.int ? t.int += t.stats : t.int = t.stats;
            t.luk ? t.luk += t.stats : t.luk = t.stats;
            t.stats = 0;
        }
        return t;
    }

    // 计算星之力增加的属性
    _countStarForceStats(lv, n) {
        if(n<=5) {
            return n * 2;
        }
        if(n<=15) {
            return n * 3 - 5;
        }
        let p = 7;
        if(lv<140) {p=7;}
        else if(lv<150) {p=9;}
        else if(lv<160) {p=11;}
        else if(lv<200) {p=13;}
        else {
            p = 15;
        }
        return 40 + (n-15) * p;
    }
    // 计算星之力增加的攻击
    _countStarForceAtt(lv, n, isWeapon) {
        if(isWeapon) {
            let base = this.base;
            let att = 0;
            let type = base.type;
            let isWuli = true;
            switch(type) {
                case "staff":
                case "wand": isWuli = false; break;
            }
            let sc = this.scrolling;
            if (isWuli) {
                att = base.atk;
                if(sc.atk != null) {
                    att += sc.atk;
                }
            } else {
                att = base.matk;
                if(sc.matk != null) {
                    att += sc.matk;
                }
            }
            for(let i=0;i<n;i++) {
                att += parseInt(Math.ceil(att/50));
            }
            return att;
        } else {
            let isGlove = this.base.type == "glove";
            let att = 0;
            if (isGlove && n>4) {
                if(n<12) {
                    att += Math.floor((n-3)/2);
                } else if(n<16) {
                    att += n - 8;
                } else {
                    att += 7;
                }
            }
            let p = 0;
            if (lv<140) {p=7;}
            else if(lv<150) {p=8;}
            else if(lv<160) {p=9;}
            else if(lv<200) {p=10;}
            else {p=12;}
            if(n<=20 && n>15) {
                // todo
            }
            return att;
        }
    }

    copy() {
        // 返回一个复制的元对象
        let base = JSON.parse(JSON.stringify(this.base));
        let scrolling = JSON.parse(JSON.stringify(this.scrolling));
        let bonus = JSON.parse(JSON.stringify(this.bonus));
        let star = JSON.parse(JSON.stringify(this.star));
        let total = JSON.parse(JSON.stringify(this.total));
        let potential = JSON.parse(JSON.stringify(this.potential));
        let addPotential = JSON.parse(JSON.stringify(this.addPotential));
        validatePotential(potential);
        validatePotential(addPotential);
        return {base:base,scrolling:scrolling,bonus:bonus,
            star:star,total:total,potential:potential,addPotential:addPotential};
    }
}


let role = new MxdRole(jobList[0]);



// ======================================= utils 
/**
 * merge two dicts
 * @param {dict1} d1 based on d1
 * @param {dict2} d2 not covered
 * return merge result: dict, a new object that doesn't affect either of d1 or d2
 */
function _merge(d1, d2) {
    if (typeof(d1) != "object" || typeof(d2) != "object") {
        return null;
    }
    let key2 = Object.keys(d2);
    if (key2.length == 0) {
        return Object.assign({}, d1);
    }
    let rt = Object.assign({}, d2, d1);
    for (let i in d1) {
        for (let j in d2) {
            if (i == j && typeof(rt[i]) == "number") {
                rt[i] += d2[j];
            } 
        }
    }
    return rt;
}
/**
 * d1 - d2, d1.keys must cover d2's
 * @param {*} d1 
 * @param {*} d2 
 * changed d1 directly, but the value cannot be lower than 0, usually d1 >= d2
 */
function _seprate(d1, d2) {
    for (let k in d2) {
        d1[k] -= d2[k];
        if(d1[k] < 0) {
            d1[k] = 0;
        }
    }
}

/**
 * 选取符合条件的所有装备
 * @param {*} t equipment type
 * @param {*} g job group
 */
function selectEquipment(t, g, job) {
    let el = [];
    let temp;
    switch (t) {
        case HAT: temp = AllHats; break;
        case TOP: temp = AllTops.concat(AllOutfits); break;
        case BOTTOM: temp = AllBottoms; break;
        case CAPE: temp = AllCapes; break;
        case GLOVE: temp = AllGloves; break;
        case SHOE: temp = AllShoes; break;
        case PENDANT: temp = AllPendants; break;
        case RING: temp = AllRings; break;
        case EARRING: temp = AllEarrings; break;
        case BELT: temp = AllBelts; break;
        case EYE: temp = AllEyes; break;
        case FACE: temp = AllFaces; break;
        case ANDROID: temp = AllAndroids; break;
        case HEART: temp = Allhearts; break;
        case EMBLEM: temp = AllEmblems; break;
        case POCKET: temp = AllPockets; break;
        case BADGE: temp = AllBadges; break;
        case MEDAL: temp = AllMedals; break;
        case SHOULDER: temp = AllShoulders; break;
        case SECONDARY: temp = AllSecondaries; break;
        // case WEAPON: temp = AllWeapons; break;
        default: temp = []; break;
    }
    if (t == WEAPON) {
        let ep = equipPermission[job.name];
        console.log(job.name, ep, temp);
        for (let i in ep) {
            temp = temp.concat(AllWeapons[i]);
        }
    }
    for (let i=0;i<temp.length;i++) {
        if (temp[i].job == JOB.ALL || temp[i].job == g) {
            el.push(temp[i]);
        }
    }
    return el;
}

function validatePotential(p) {
    if (!p) p = ['','',''];
    while (p.length < 3) {
        p.push('');
    }
}
function updateTotal(eq) {
    let t = eq.total;
    t = _merge(eq.base, eq.scrolling);
    t = _merge(t, eq.bonus);
    t = _merge(t, eq.star);
    if (t.stats) {
        t.str ? t.str += t.stats : t.str = t.stats;
        t.dex ? t.dex += t.stats : t.dex = t.stats;
        t.int ? t.int += t.stats : t.int = t.stats;
        t.luk ? t.luk += t.stats : t.luk = t.stats;
        t.stats = 0;
    }
    eq.total = t;
    // console.log(t, eq.total);
}

function toEquipmentDetail(eq) {
    let d = [];
    updateTotal(eq); // 避免修改了部分属性没有更新到total
    let t = eq.total,b=eq.base,s=eq.scrolling,h=eq.bonus,star=eq.star;
    for (let k in t) {
        if (typeof(t[k]) == 'number' && getV(t, k) >= 0) {
            d.push({pp:k,base:getV(b, k),scroll:getV(s, k),bonus:getV(h, k),star:getV(star, k)});
        }
    }
    return d;
}

function toEquipmentData(se, det) {
    let base = Vue.toRaw(se.base);
    let me = new MxdEquip(base);
    if (det) {
        me.loadScrolling(det);
    }
    validatePotential(se.potential);
    validatePotential(se.addPotential);
    me.loadPotential(se.potential, se.addPotential);
    me.fresh();
    return me;
}

function getD(obj, key) {
    return obj[key] ? obj[key] : 0;
}

function getV(obj, key) {
    let v = -1;
    switch(key) {
        case 'atk': v =     getD(obj,key) + getD(obj,'satk'); break;
        case 'matk': v =    getD(obj,key) + getD(obj,'satk'); break;
        case 'str': v =     getD(obj,key) + getD(obj,'stats'); break;
        case 'dex': v =     getD(obj,key) + getD(obj,'stats'); break;
        case 'int': v =     getD(obj,key) + getD(obj,'stats'); break;
        case 'luk': v =     getD(obj,key) + getD(obj,'stats'); break;
        case 'hp' : v =     getD(obj,key); break;
        case 'asp' : v =    getD(obj,key); break;
        case 'damage' : v = getD(obj,key); break;
        case 'boss' : v =   getD(obj,key); break;
        case 'ign' : v =    getD(obj,key); break;
        default: break;
    }
    return v;
}

function starForcePossibility(n) {
    let success = 85, fail = 15;
    if (n < 6) {
        success -= 5 * n;
        fail += 5*n;
        return {success:success, fail: fail};
    }
    if (n < 11) {
        success -= 5 * n - 5;
        fail += 5*n - 5;
        return {success:success, fail: fail};
    }
    switch(n) {
        case 11: success = 30, fail = 68.8; break;
        case 12: success = 25, fail = 72.6; break;
        case 13: success = 25, fail = 71.8; break;
        case 14: success = 20, fail = 76; break;
        case 15: success = 20, fail = 75.2; break;
        case 16: success = 20, fail = 74.4; break;
        case 17: success = 20, fail = 73.6; break;
        case 18: success = 15, fail = 77.3; break;
        case 19: success = 15, fail = 76.5; break;
        case 20: success = 15, fail = 74.8; break;
        case 21: success = 10, fail = 76.5; break;
        case 22: success = 3, fail = 77.6; break;
        case 23: success = 2, fail = 68.6; break;
        case 24: success = 1, fail = 59.4; break;
    }
    return {success:success, fail: fail};
}

function starForceUpValue(n, lv, jizhen=false) {
    let m = 2, a = 0, wa = 0;
    if (n < 6) {
        m = 2;
        return {m:m, a:a, wa:wa};
    }
    if (n < 16) {
        m = 3;
        return {m:m, a:a, wa:wa};
    }
    switch(n+lv) {
        case 146: m=7, a=7, wa=6; break;
        case 156: m=9, a=8, wa=7; break;
        case 166: m=11, a=9, wa=8; break;
        case 176: m=13, a=10, wa=9; break;
        case 216: m=15, a=12, wa=13; break;

        case 147: m=7, a=8, wa=7; break;
        case 157: m=9, a=9, wa=8; break;
        case 167: m=11, a=10, wa=9; break;
        case 177: m=13, a=11, wa=9; break;
        case 217: m=15, a=13, wa=13; break;

        case 148: m=7, a=9, wa=7; break;
        case 158: m=9, a=10, wa=8; break;
        case 168: m=11, a=11, wa=9; break;
        case 178: m=13, a=12, wa=10; break;
        case 218: m=15, a=14, wa=14; break;
        
        case 149: m=7, a=10, wa=8; break;
        case 159: m=9, a=11, wa=9; break;
        case 169: m=11, a=12, wa=10; break;
        case 179: m=13, a=13, wa=11; break;
        case 219: m=15, a=15, wa=14; break;

        case 150: m=7, a=11, wa=9; break;
        case 160: m=9, a=12, wa=10; break;
        case 170: m=11, a=13, wa=11; break;
        case 180: m=13, a=14, wa=12; break;
        case 220: m=15, a=16, wa=15; break;

        case 161: m=9, a=13, wa=11; break;
        case 171: m=11, a=14, wa=12; break;
        case 181: m=13, a=15, wa=13; break;
        case 221: m=15, a=17, wa=16; break;

        case 162: m=9, a=15, wa=12; break;
        case 172: m=11, a=16, wa=13; break;
        case 182: m=13, a=17, wa=14; break;
        case 222: m=15, a=19, wa=17; break;

        case 163: m=0, a=17, wa=30; break;
        case 173: m=0, a=18, wa=31; break;
        case 183: m=0, a=19, wa=32; break;
        case 223: m=0, a=21, wa=34; break;

        case 164: m=0, a=19, wa=31; break;
        case 174: m=0, a=20, wa=32; break;
        case 184: m=0, a=21, wa=33; break;
        case 224: m=0, a=23, wa=35; break;
        
        case 165: m=0, a=21, wa=32; break;
        case 175: m=0, a=22, wa=33; break;
        case 185: m=0, a=23, wa=34; break;
        case 225: m=0, a=25, wa=36; break;
    }
    return {m:m, a:a, wa:wa};
}

// function updateDetailTotal(detail, upv, upatk) {
//     for (let i in detail) {
//         let d = detail[i];
//         if (['str','dex','int','luk'].includes(d.pp)) {
//             d.
//         }
//     }
// }