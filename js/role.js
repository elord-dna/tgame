class Role {
    constructor(id) {
        this.id = id;
        this.j = $('#'+id);
        this.toux = $("#"+id+" .toux");
        this.state = this.j.find('.state');
    }
    // 初始化 生成某些数据
    init() {}
    setTouxiang(img) {
        this.toux.css("background-image","url("+img+")");
    }
    loadData(data) {
        data = JSON.parse(JSON.stringify(data));
        this.Name = data.Name;
        this.MaxHp = data.MaxHp;   // {base: xx, shield: xx}
        this.MaxMp = data.MaxMp;
        this.Hp = data.Hp;         // {base: xx, shield: xx}
        this.Mp = data.Mp;
        this.Exp = data.Exp;

        this.Energy = data.Energy; // 与读条有关
        this.Speed = data.Speed;   // 速度
        this.Atk = data.Atk;       // {base: xx, buff: xx}
        this.Def = data.Def;

        this.SAtk = data.SAtk;
        this.SDef = data.SDef;

        this.Ct = data.Ct;         // {base: xx, buff: xx}
        this.Cte = data.Cte;

        this.SkillList = data.SkillList;  // [{id:id1, lv:xx}...]
        this.bag = data.bag;              // [{itemId: {}}]

        this._stateShow();
        // console.log(this);
    }
    loadRole(role) {}
    getDefValue(type) {
        if (type == 0) { return this.Def.base + this.Def.buff;}
        return this.SDef.base + this.SDef.buff;
    }
    getAtkValue() {
        let atk = this.Atk.base + this.Atk.buff;
        if (atk < 0) {atk = 0;}
        return atk;
    }
    getSAtkValue() {
        let atk = this.SAtk.base + this.SAtk.buff;
        if (atk < 0) {atk = 0;}
        return atk;
    }
    showState() {}
    openBag() {
        if (!this.bag) {
            this.bag = {};
        }
        // show bag
        return this.bag;
    }
    openStorage() {}
    /**
     * 将物品放入背包
     * @param {objId} obj 
     * @param {数量} num 
     */
    putBag(obj, num) {
        if (!this.bag) {
            this.bag = {};
        }
        let o = this.bag[obj];
        let n = num;
        if (o) {n += o.num}
        else {}
        this.bag[obj].num = n;
    }
    getBag(obj, num) {}
    putStorage(obj, num) {}
    getStorage(obj, num) {}
    useCost(obj, num) {}
    discardBag(obj, num) {}
    discardStorage(obj, num) {}

    preCastSkill(skill) {
        t_skill_L.maxChooseNum = skill.targetsNum;
        t_skill_L.skillEffect = skill.effect;
    }
    castSkill(skill, objs) {}

    /**
     * 
     * @param {*} damage {damage: xx, isCt: xx}
     */
    receiveDamage(damage) {
        this.Hp.base -= damage.damage;
        if (this.Hp.base < 0) {
            this.Hp.base = 0;
        }
        this._stateShow();
    }

    _stateShow() {
        let l_hp = this.Hp.base / this.MaxHp.base * 100;
        // this.state.find('.hp').css('width', l_hp + "%");
        this.state.find('.hp').animate({'width': l_hp + "%"});
        let l_mp = this.Mp / this.MaxMp * 100;
        this.state.find('.mp').css('width', l_mp + "%");

        let v = this.state.find('.v').find('span');
        $(v[0]).text(this.Hp.base + "/" + this.MaxHp.base);
        $(v[1]).text(this.Mp + "/" + this.MaxMp);
    }

    save(t) {
        if(t==null) {
            // save all
        }
        if (t=='bag') {
            let sid = '';
            if (user.id!==null) {sid = user.id}
            if (this.name!=null) {
                localStorage.setItem(sid+"_"+this.name+"_bag", JSON.stringify(this.bag));
            }
        }
    }
}