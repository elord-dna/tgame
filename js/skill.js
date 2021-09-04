class Skill {
    constructor(id) {
        this.id = id;
        this.num = 1;  // default target num is 1
        this.target = [];
    }
    addTarget(t) {
        this.target.push(t);
    }
    removeTarget() {
        this.target.shift();
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
        if (this.Exp > Math.pow(2, this.Lv) + 9) {
            this.lvUp();
        }
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
    _defaultHandler: function(t, skill) {
        let tp = skill.tp;
        if (tp == 0) {
            let def = t.Def;
        } else if (tp == 1) {
            let def = t.SDef;
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
        if (atdDdef < 0.01) {
            return 1;
        }
        let bd = skill.bd + skill.bdA * lv;
        let ad = skill.ad + skill.adA * lv;
        let t = atdDdef - 1/atdDdef;
        if (atdDdef < 1) {
            let d2 = 1.5;
            let damage = (bd + ad) * Math.pow(d2, t);
            damage = parseInt(damage);
            return damage;
        }
        let d1 = 1.5;
        let d2 = 1.4;
        let damage = bd * Math.pow(d1, atdDdef) + (bd + ad) * Math.pow(d2, t);
        damage = parseInt(damage);
        return damage;
    },
    wlHandler: function(skill) {
        let tar = skill.target;
        for (let i=0;i<len(tar);i++) {
            let d = this._defaultHandler(tar[i], skill);
            // data change and animation
        }
    }
};

var testSkill = [
    0, 2, 1, 1, 1, [], [],
    1, 0.1, 11, 0, 0.1, 0.1, 0,
    0, [], [],
    0, 0, 0, 
    0.02, 0, 0, 0, 0,
    "wuli", wlHandler
];