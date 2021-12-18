class Skill {
    constructor(id) {
        this.id = id;
        this.tarNum = 1;  // default target num is 1
        this.target = [];
    }
    addTarget(t) {
        this.target.push(t);
    }
    removeTarget() {
        this.target.shift();
    }
    clearTarget() {
        this.target = [];
    }
    loadData(data) {
        // data = JSON.parse(JSON.stringify(data));
        let tp = data[0];
        if (tp < 2) {
            this._loadDamage(data);
        } else {
            this._loadBianhua(data);
        }
    }
     /**
     * load damageData
     * [wuli/fashu/bianhua(type), self/friends/enemies/all/random(permit_target),...]    [0,1]
     * [0/1/2]                    [0/1/2/3/4]
     * [...target_num, length,          area,     area_gd, ap, sp, base_damage,...]      [2,3,4,5,6,7,8]
     *     [>0]        [-1self,0all]   [1<=a<=4]
     * [...addition_damage, addition_ct, addition_cte, addition_ct_damage,...]           [9,10,11,12]
     * [...df_ignore, buff_list, spe_list,...]                                           [13,14,15]
     * [...target_num_add, length_add, area_add, ap_add, sp_add, bd_add,...]             [16,17,18,19,20,21]
     * [...ad_add, ad_ct_add, ad_cte_add, ad_ct_d_add, df_ig_add,...]                    [22,23,24,25,26]
     * [...hpdrink_p, hprecr, hpd_add, hpr_add,...]  negtive means damage retaken        [27,28,29,30]  
     * [...name, handler, after_handlers]                                                [31,32,33]
     */  
    _loadDamage(data) {
        this.tp = data[0]; this.tarType = data[1];

        this.tarNum = data[2]; this.len = data[3]; this.area = data[4]; this.areaGd = data[5];
        this.ap = data[6];  this.sp = data[7]; this.bd = data[8];

        this.ad = data[9]; this.act = data[10];  this.acte = data[11]; this.actd = data[12];
        this.ig = data[13]; this.bfs = data[14]; this.spes = data[15];

        this.tarNumA = data[16];  this.lenA = data[17];
        this.areaA = data[18];  this.apA = data[19];
        this.spA = data[20];  this.bdA = data[21];

        this.adA = data[22];  this.actA = data[23];
        this.acteA = data[24]; this.actdA = data[25]; this.igA = data[26];

        this.hpd = data[27]; this.hpr = data[28];  this.hpdA = data[29]; this.hprA = data[30];
        this.Name = data[31]; this.handler = data[32];  this.afterHandler = data[33];
    }
    _loadBianhua(data) {}
    loadLv(lvData) {
        this.Exp = lvData.Exp;
        this.Lv = lvData.Lv;
    }
    bindUser(role) {
        this.role = role;
    }
    cast() {
        let castSpell = this.Name;
        if (this.castSpell) {
            castSpell = this.castSpell;
        }
        console.log(this.role.Name + "使用了" + castSpell + "LV" + this.Lv);
        // this.Exp += 1;
        this.handler(this);
        this.gainExp(1);
        // this._checkUpdate();
    }
    _checkUpdate() {
        if (this.Exp > Math.pow(2, this.Lv) + 9) {
            this.lvUp();
        }
    }
    gainExp(exp) {
        this.Exp += exp;
        console.log(this.Exp);
        this._checkUpdate();
    }
    lvUp() {
        console.log(this.Name + " level up!")
        this.Lv += 1;
    }
    /**
     * load damageData
     * [wuli/fashu/bianhua(type), self/friends/enemies/all/random(permit_target),...]    [0,1]
     * [0/1/2]                    [0/1/2/3/4]
     * [...target_num, length,          area,     area_gd, ap, sp, base_damage,...]      [2,3,4,5,6,7,8]
     *     [>0]        [-1self,0all]   [1<=a<=4]
     * [...addition_damage, addition_ct, addition_cte, addition_ct_damage,...]           [9,10,11,12]
     * [...df_ignore, buff_list, spe_list,...]                                           [13,14,15]
     * [...target_num_add, length_add, area_add, ap_add, sp_add, bd_add,...]             [16,17,18,19,20,21]
     * [...ad_add, ad_ct_add, ad_cte_add, ad_ct_d_add, df_ig_add,...]                    [22,23,24,25,26]
     * [...hpdrink_p, hprecr, hpd_add, hpr_add,...]  negtive means damage retaken        [27,28,29,30]  
     * [...name, handler, after_handlers]                                                [31,32,33]
     */    
}

var t_handler = {
    _isCt: function(t, skill) {
        let r = skill.role.Ct;
        let lv = skill.Lv - 1;
        r = r.base + r.buff + skill.act + skill.actA * lv;
        if (r<0) {
            return {"isCt": false};
        }
        if (r>100) {
            r = 100;
        }
        if (Math.random()*100 < r) {
            let re = skill.role.Cte;
            re = re.base + re.buff + skill.acte + skill.acteA * lv;
            return {"isCt": true, "cte": re};
        }
        return {"isCt": false};
    },
    _defaultHandler: function(t, skill) {
        // t和skill只读取，不修改值
        let tp = skill.tp;
        let def = t.getDefValue(tp);
        let lv = skill.Lv - 1;  // the lv factor which to calculate the accumulation
        let ig = skill.ig + skill.igA * lv;  // 计算减防
        def *= 1 - ig;
        let u = skill.role;
        let a1 = u.getAtkValue();
        let a2 = u.getSAtkValue();
        let atk = (skill.ap + skill.apA * lv) * a1 + (skill.sp + skill.spA * lv) * a2;
        let atdDdef = atk/(def + 1);
        let damage = 0;
        if (atdDdef < 0.01) {
            damage = 1;
        } else {
            let bd = skill.bd + skill.bdA * lv; // 基础伤害
            let ad = skill.ad + skill.adA * lv; // 额外伤害
            let t = atdDdef - 1/atdDdef;
            if (atdDdef < 1) {
                let d2 = 1.5;
                damage = (bd + ad) * Math.pow(d2, t);
            } else {
                let d1 = 1.5;
                let d2 = 1.4;
                damage = bd * Math.pow(d1, atdDdef) + (bd + ad) * Math.pow(d2, t);
            }
            damage = parseInt(damage);
        }
        let isCt = this._isCt(t, skill);
        if (isCt['isCt']) {
            damage = damage * (1 + isCt['cte']/100);
            damage = parseInt(damage);
        }
        return {"damage": damage, "isCt": isCt['isCt']};
    },
    wlHandler: function(skill) {
        let tar = skill.target;
        for (let i=0;i<tar.length;i++) {
            let t = tar[i];
            let d = t_handler._defaultHandler(t, skill);
            console.log(d);
            t.receiveDamage(d);
            // data change and animation
            // reset target
            skill.target = [];
        }
    }
};

var testSkill = [
    0, 2, 1, 1, 1, [], 1, 0.1,      // 8
    11, 2, 20, 10, 0.1, 0.1, [], [],     // 8  16
    0, 0, 0, 0.1, 0.02, 2, 0.5, 0,   // 8 24
    0, 0, 0,
    0,0,0,0,
    "wuli", t_handler.wlHandler, []
];
var testSkill2 = [
    0, 2, 2, 1, 1, [], 1, 0.1,      // 8
    10, 2, 20, 10, 20, 0.15, [], [],     // 8  16
    0, 0, 0, 0.1, 0.02, 3, 0.5, 0,   // 8 24
    0, 0, 0,
    0,0,0,0,
    "wuli", t_handler.wlHandler, []
];
var testLvData = {Exp: 0, Lv: 1};

// this.tp = data[0];
// this.tarType = data[1];
// this.tarNum = data[2];
// this.len = data[3];
// this.area = data[4];
// this.areaGd = data[5];
// this.ap = data[6];  this.sp = data[7];
// this.bd = data[8];  this.ad = data[9];
// this.act = data[10];  this.acte = data[11];
// this.actd = data[12];
// this.ig = data[13];
// this.bfs = data[14];
// this.spes = data[15];
// this.tarNumA = data[16];  this.lenA = data[17];
// this.areaA = data[18];  this.apA = data[19];
// this.spA = data[20];  this.bdA = data[21];
// this.adA = data[22];  this.actA = data[23];
// this.acteA = data[24];
// this.actdA = data[25];
// this.igA = data[26];
// this.Name = data[27];
// this.handler = data[28];