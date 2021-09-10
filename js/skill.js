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
        this.tp = data[0];
        this.tarType = data[1];
        this.tarNum = data[2];
        this.len = data[3];
        this.area = data[4];
        this.areaGd = data[5];
        this.ap = data[6];  this.sp = data[7];
        this.bd = data[8];  this.ad = data[9];
        this.act = data[10];  this.acte = data[11];
        this.actd = data[12];
        this.ig = data[13];
        this.bfs = data[14];
        this.spes = data[15];
        this.tarNumA = data[16];  this.lenA = data[17];
        this.areaA = data[18];  this.apA = data[19];
        this.spA = data[20];  this.bdA = data[21];
        this.adA = data[22];  this.actA = data[23];
        this.acteA = data[24];
        this.actdA = data[25];
        this.igA = data[26];
        this.Name = data[27];
        this.handler = data[28];
    }
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
        this.Exp += 1;
        this.handler(this);
        this._checkUpdate();
    }
    _checkUpdate() {
        if (this.Exp > Math.pow(2, this.Lv) + 9) {
            this.lvUp();
        }
    }
    gainExp(exp) {
        this.Exp += exp;
        this._checkUpdate();
    }
    lvUp() {
        console.log(this.Name + " level up!")
        this.Lv += 1;
    }
    /**
     * load data
     * [wuli/fashu/bianhua(type), self/friends/enemies/all/random(permit_target),...]
     * [0/1/2]                    [0/1/2/3/4]
     * [...target_num, length,          area,     area_gd, ap, sp, base_damage,...]
     *     [>0]        [-1self,0all]   [1<=a<=4]
     * [...addition_damage, addition_ct, addition_cte, addition_ct_damage,...]
     * [...df_ignore, buff_list, spe_list,...]
     * [...target_num_add, length_add, area_add, ap_add, sp_add, bd_add,...]
     * [...ad_add, ad_ct_add, ad_cte_add, ad_ct_d_add, df_ig_add,...]
     * [...name, handler]
     */    
}

var t_handler = {
    _isCt: function(t, skill) {
        let r = skill.role.Ct;
        r = r.base + r.buff + skill.act + skill.actA * skill.Lv;
        if (r<0) {
            return {"isCt": false};
        }
        if (r>100) {
            r = 100;
        }
        if (Math.random()*100 < r) {
            let re = skill.role.Cte;
            re = re.base + re.buff + skill.acte + skill.acteA * skill.Lv;
            return {"isCt": true, "cte": re};
        }
        return {"isCt": false};
    },
    _defaultHandler: function(t, skill) {
        let tp = skill.tp;
        let def = {};
        if (tp == 0) {
            def = t.Def;
        } else if (tp == 1) {
            def = t.SDef;
        }
        def = def.base + def.buff;
        let lv = skill.Lv;
        let ig = skill.ig + skill.igA * lv;
        def *= 1 - ig;
        let u = skill.role;
        let a1 = u.Atk.base + u.Atk.buff;
        let a2 = u.SAtk.base + u.SAtk.buff;
        if (a1 < 0) {a1 = 0;}
        if (a2 < 0) {a2 = 0;}
        let atk = (skill.ap + skill.apA * lv) * a1 + (skill.sp + skill.spA * lv) * a2;
        let atdDdef = atk/(def + 1);
        let damage = 0;
        if (atdDdef < 0.01) {
            damage = 1;
        } else {
            let bd = skill.bd + skill.bdA * lv;
            let ad = skill.ad + skill.adA * lv;
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
    "wuli", t_handler.wlHandler
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